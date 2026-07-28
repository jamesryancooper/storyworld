import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "./index.js";
import type { Pool } from "pg";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");

let admin: Pool;
let app: Pool;
const orgA = uuidv7();
const orgB = uuidv7();

beforeAll(async () => {
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2),($3,$4) ON CONFLICT DO NOTHING",
    [orgA, "fixture-org-a", orgB, "fixture-org-b"]);
  app = createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@"));
});

afterAll(async () => {
  await admin?.end();
  await app?.end();
});

describe("migration runner", () => {
  it("is idempotent and refuses tampered applied migrations", async () => {
    const again = await migrate(admin, migrationsDir);
    expect(again).toEqual([]);
    await admin.query("UPDATE public.schema_migrations SET sha256 = repeat('0',64) WHERE filename = '0001_foundation.sql'");
    await expect(migrate(admin, migrationsDir)).rejects.toThrow(/immutable history/);
    await admin.query("UPDATE public.schema_migrations SET sha256 = $1 WHERE filename = '0001_foundation.sql'",
      [(await import("node:crypto")).createHash("sha256")
        .update(await (await import("node:fs/promises")).readFile(join(migrationsDir, "0001_foundation.sql"), "utf8"))
        .digest("hex")]);
  });
});

describe("tenant isolation (RLS)", () => {
  it("hides tenant A rows from tenant B through the app role", async () => {
    const wsId = uuidv7();
    await withTenant(app, orgA, async (c) => {
      await c.query("INSERT INTO storyworld.workspaces (workspace_id, organization_id, name) VALUES ($1,$2,$3)",
        [wsId, orgA, "ws-a"]);
    });
    const seenByA = await withTenant(app, orgA, (c) =>
      c.query("SELECT workspace_id FROM storyworld.workspaces WHERE workspace_id = $1", [wsId]));
    const seenByB = await withTenant(app, orgB, (c) =>
      c.query("SELECT workspace_id FROM storyworld.workspaces WHERE workspace_id = $1", [wsId]));
    expect(seenByA.rows).toHaveLength(1);
    expect(seenByB.rows).toHaveLength(0);
  });
  it("blocks cross-tenant inserts through the app role", async () => {
    await expect(
      withTenant(app, orgB, (c) =>
        c.query("INSERT INTO storyworld.workspaces (workspace_id, organization_id, name) VALUES ($1,$2,$3)",
          [uuidv7(), orgA, "forged"]),
      ),
    ).rejects.toThrow();
  });
});

describe("append-only custody", () => {
  it("rejects UPDATE and DELETE on audit receipts even as admin", async () => {
    const id = uuidv7();
    await withTenant(app, orgA, (c) =>
      c.query("INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, correlation_id) VALUES ($1,$2,$3,$4,$5,$6)",
        [id, orgA, "test-human", "test.acceptance", "synthetic:subject", uuidv7()]));
    await expect(admin.query("UPDATE storyworld.audit_receipts SET action='forged' WHERE receipt_id=$1", [id]))
      .rejects.toThrow(/append-only/);
    await expect(admin.query("DELETE FROM storyworld.audit_receipts WHERE receipt_id=$1", [id]))
      .rejects.toThrow(/append-only/);
  });
});

describe("outbox and inbox", () => {
  it("stores events transactionally and dedupes inbox messages", async () => {
    const msg = uuidv7();
    await withTenant(app, orgA, async (c) => {
      await c.query("INSERT INTO storyworld.outbox (outbox_id, organization_id, event_type, envelope) VALUES ($1,$2,$3,$4)",
        [uuidv7(), orgA, "world.storyworld.CanonReleasePublished", JSON.stringify({ synthetic: true })]);
      await c.query("INSERT INTO storyworld.inbox (message_id, organization_id, source) VALUES ($1,$2,$3)",
        [msg, orgA, "test"]);
    });
    await expect(
      withTenant(app, orgA, (c) =>
        c.query("INSERT INTO storyworld.inbox (message_id, organization_id, source) VALUES ($1,$2,$3)", [msg, orgA, "test"])),
    ).rejects.toThrow(/duplicate key/);
  });
});

describe("asset lineage (ADR-0009)", () => {
  it("chains immutable versions through the derivation graph and rejects mutation", async () => {
    const shaSource = (await import("node:crypto"))
      .createHash("sha256").update(`lineage-src-${uuidv7()}`).digest("hex");
    const shaDerived = (await import("node:crypto"))
      .createHash("sha256").update(`lineage-out-${uuidv7()}`).digest("hex");
    const assetId = uuidv7();
    const v1 = uuidv7();
    const v2 = uuidv7();
    await withTenant(app, orgA, async (c) => {
      for (const sha of [shaSource, shaDerived]) {
        await c.query(
          "INSERT INTO storyworld.content_blobs (sha256, organization_id, size_bytes, media_type, storage_uri) VALUES ($1,$2,$3,$4,$5)",
          [sha, orgA, 1, "application/octet-stream", `file:///dev/null#${sha.slice(0, 8)}`],
        );
      }
      await c.query(
        "INSERT INTO storyworld.asset_versions (asset_version_id, organization_id, asset_id, version, content_sha256, state) VALUES ($1,$2,$3,1,$4,'source_imported')",
        [v1, orgA, assetId, shaSource],
      );
      await c.query(
        "INSERT INTO storyworld.asset_versions (asset_version_id, organization_id, asset_id, version, content_sha256, state) VALUES ($1,$2,$3,2,$4,'candidate')",
        [v2, orgA, assetId, shaDerived],
      );
      await c.query(
        "INSERT INTO storyworld.derivations (derivation_id, organization_id, from_asset_version_id, to_asset_version_id, transformation) VALUES ($1,$2,$3,$4,'test.generation')",
        [uuidv7(), orgA, v1, v2],
      );
    });
    const lineage = await withTenant(app, orgA, (c) =>
      c.query(
        `WITH RECURSIVE chain AS (
           SELECT to_asset_version_id AS node, from_asset_version_id AS parent
             FROM storyworld.derivations WHERE to_asset_version_id = $1
           UNION ALL
           SELECT d.to_asset_version_id, d.from_asset_version_id
             FROM storyworld.derivations d JOIN chain ON d.to_asset_version_id = chain.parent)
         SELECT parent FROM chain`,
        [v2],
      ));
    expect(lineage.rows.map((r) => r.parent)).toContain(v1);
    await expect(
      admin.query("UPDATE storyworld.asset_versions SET state='accepted_master' WHERE asset_version_id=$1", [v2]),
    ).rejects.toThrow(/append-only/);
  });
});
