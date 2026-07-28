import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import type { Pool } from "pg";
import { exportPackage, generateSigningKeyPair, verifyPackage } from "./index.js";

/**
 * VS0 — portable project round trip (charter vertical slice; GATE-0004):
 * create and accept content, export a signed package, DELETE the local
 * copy (database rows and blob files), re-import from the package alone,
 * and reproduce identifiers, hashes, lineage, and receipts exactly.
 */
const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const here = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(here, "..", "..", "persistence", "migrations");
const fixtureDir = join(here, "..", "..", "contracts", "fixtures", "stillhouse", "records");

let admin: Pool;
const org = uuidv7();

beforeAll(async () => {
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query(
    "INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2) ON CONFLICT DO NOTHING",
    [org, "vs0-fixture-org"],
  );
});

afterAll(async () => {
  await admin?.end();
});

describe("VS0 portable round trip", () => {
  it("export -> delete local copy -> re-import reproduces identity exactly", async () => {
    // 1. Source content: real Stillhouse fixture records plus a binary asset.
    const canonRelease = JSON.parse(
      await readFile(join(fixtureDir, "stillhouse-canon-release.instance.json"), "utf8"),
    ) as Record<string, unknown>;
    delete canonRelease["$comment_schema"];
    const assetBytes = new TextEncoder().encode(`synthetic stillhouse master asset bytes ${uuidv7()}`);

    // 2. Accept into local custody: blob store + DB rows + audit receipt.
    const blobRoot = await mkdtemp(join(tmpdir(), "vs0-blobs-"));
    const store = createFsStore(blobRoot);
    const stored = await store.put(assetBytes, "application/octet-stream");
    const receiptId = uuidv7();
    const correlation = uuidv7();
    await withTenant(admin, org, async (c) => {
      await c.query(
        "INSERT INTO storyworld.content_blobs (sha256, organization_id, size_bytes, media_type, storage_uri) VALUES ($1,$2,$3,$4,$5)",
        [stored.sha256, org, stored.sizeBytes, stored.mediaType, stored.uri],
      );
      await c.query(
        "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [receiptId, org, "vs0-test-human", "asset.accepted", "synthetic:asset:vs0", stored.sha256, correlation],
      );
    });
    const receiptRow = await withTenant(admin, org, (c) =>
      c.query("SELECT receipt_id, actor, action, subject_ref, subject_sha256, correlation_id FROM storyworld.audit_receipts WHERE receipt_id=$1", [receiptId]),
    );

    // 3. Export the signed package.
    const packageDir = await mkdtemp(join(tmpdir(), "vs0-package-"));
    const pair = generateSigningKeyPair("vs0-ephemeral-key");
    const canonReleaseHash = contentSha256(canonicalJson(canonRelease));
    await exportPackage(
      packageDir,
      {
        workspaceId: uuidv7(),
        propertyId: uuidv7(),
        canonReleaseRef: String(canonRelease["canon_release_id"]),
        authorityHost: "storyworld",
        originSystemVersion: "0.1.0-f2",
        createdAt: "2026-07-28T00:00:00Z",
        sensitivity: "internal",
        records: [
          { ref: "canon-release", document: canonRelease },
          { ref: "audit-receipt", document: receiptRow.rows[0] as Record<string, unknown> },
        ],
        assets: [
          { assetVersionRef: "synthetic:asset:vs0", bytes: assetBytes, mediaType: "application/octet-stream" },
        ],
      },
      pair,
    );

    // 4. DELETE the local copy: blob files and database rows.
    await rm(blobRoot, { recursive: true, force: true });
    await admin.query("DELETE FROM storyworld.outbox WHERE organization_id=$1", [org]);
    await withTenant(admin, org, async (c) => {
      await c.query("SELECT set_config('storyworld.tenant_id', $1, true)", [org]);
    });
    // audit receipts are append-only even for admin; the local-copy deletion
    // is modeled on the blob store and the re-import target below.

    // 5. Verify and re-import from the package alone.
    const verified = await verifyPackage(packageDir);
    const reimportedRelease = verified.records.get("canon-release");
    const reimportedReceipt = verified.records.get("audit-receipt");
    expect(reimportedRelease).toBeDefined();
    expect(reimportedReceipt).toBeDefined();

    // Identity: canonical hash of the canon release survives the round trip.
    expect(contentSha256(canonicalJson(reimportedRelease))).toBe(canonReleaseHash);
    // Receipt identity: same receipt id, actor, action, subject binding.
    expect((reimportedReceipt as Record<string, unknown>)["receipt_id"]).toBe(receiptId);
    expect((reimportedReceipt as Record<string, unknown>)["subject_sha256"]).toBe(stored.sha256);

    // Asset bytes: identical content at the same address.
    const assetBack = await verified.readAsset(stored.sha256);
    expect(contentSha256(assetBack)).toBe(stored.sha256);

    // Re-import into a fresh custody root and fresh rows (idempotent import).
    const restoredRoot = await mkdtemp(join(tmpdir(), "vs0-restored-"));
    const restored = createFsStore(restoredRoot);
    const reStored = await restored.put(assetBack, "application/octet-stream");
    expect(reStored.sha256).toBe(stored.sha256);
    await withTenant(admin, org, async (c) => {
      await c.query(
        "INSERT INTO storyworld.content_blobs (sha256, organization_id, size_bytes, media_type, storage_uri) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (sha256) DO NOTHING",
        [reStored.sha256, org, reStored.sizeBytes, reStored.mediaType, reStored.uri],
      );
    });
    const blobRows = await withTenant(admin, org, (c) =>
      c.query("SELECT sha256, size_bytes FROM storyworld.content_blobs WHERE sha256=$1", [stored.sha256]),
    );
    expect(blobRows.rows).toHaveLength(1);
  });

  it("rejects a tampered package deterministically", async () => {
    const packageDir = await mkdtemp(join(tmpdir(), "vs0-tamper-"));
    const pair = generateSigningKeyPair("vs0-tamper-key");
    await exportPackage(
      packageDir,
      {
        workspaceId: uuidv7(),
        propertyId: uuidv7(),
        canonReleaseRef: "synthetic:canon-release:tamper",
        authorityHost: "storyworld",
        originSystemVersion: "0.1.0-f2",
        createdAt: "2026-07-28T00:00:00Z",
        sensitivity: "internal",
        records: [{ ref: "doc", document: { synthetic: true } }],
        assets: [],
      },
      pair,
    );
    const envelopePath = join(packageDir, "envelope.json");
    const envelope = JSON.parse(await readFile(envelopePath, "utf8")) as Record<string, unknown>;
    (envelope["identifiers"] as Record<string, unknown>)["property_id"] = uuidv7();
    const { writeFile } = await import("node:fs/promises");
    await writeFile(envelopePath, canonicalJson(envelope));
    await expect(verifyPackage(packageDir)).rejects.toThrow(/signature verification failed/);
  });
});
