import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import type { Pool } from "pg";
import { editorCheckout, editorReimport } from "./editor.js";
import { importAsset } from "./assets.js";
import type { KernelContext } from "./commands.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);

describe("B1 editor round trip", () => {
  let admin: Pool;
  let ctx: KernelContext;
  const org = uuidv7();
  const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b1-editor-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b1-editor-blobs-"))),
      organizationId: org,
    };
  });

  afterAll(async () => {
    await ctx?.pool.end();
    await admin?.end();
  });

  it("checkout exports exact bytes; re-import lands as a derived candidate", async () => {
    const original = new TextEncoder().encode(`master-frame-${uuidv7()}`);
    const master = await importAsset(ctx, ryan, { bytes: original, mediaType: "image/png" });
    const checkout = await editorCheckout(ctx, ryan, { assetVersionId: master.assetVersionId });
    expect(new TextDecoder().decode(checkout.bytes)).toBe(new TextDecoder().decode(original));
    expect(checkout.manifest["base_sha256"]).toBe(master.sha256);

    const edited = new TextEncoder().encode(`master-frame-retouched-${uuidv7()}`);
    const reimported = await editorReimport(ctx, ryan, {
      checkoutAssetVersionId: master.assetVersionId,
      baseSha256: master.sha256, bytes: edited, mediaType: "image/png",
    });
    expect(reimported.version).toBe(master.version + 1);
    const rows = await withTenant(ctx.pool, org, (c) =>
      c.query(
        "SELECT d.transformation, v.state FROM storyworld.derivations d JOIN storyworld.asset_versions v ON v.asset_version_id = d.to_asset_version_id WHERE d.from_asset_version_id=$1",
        [master.assetVersionId],
      ));
    expect(rows.rows[0]?.transformation).toBe("external_edit");
    expect(rows.rows[0]?.state).toBe("candidate");
    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT count(*)::int AS n FROM storyworld.audit_receipts WHERE action IN ('asset.editor.checkout','asset.editor.reimported')"));
    expect(receipts.rows[0]?.n).toBeGreaterThanOrEqual(2);
  });

  it("stale checkouts are refused: wrong base hash and superseded versions", async () => {
    const master = await importAsset(ctx, ryan, {
      bytes: new TextEncoder().encode(`frame-${uuidv7()}`), mediaType: "image/png",
    });
    await expect(editorReimport(ctx, ryan, {
      checkoutAssetVersionId: master.assetVersionId,
      baseSha256: "0".repeat(64), bytes: new Uint8Array([1]), mediaType: "image/png",
    })).rejects.toThrow(/stale checkout/);

    await editorReimport(ctx, ryan, {
      checkoutAssetVersionId: master.assetVersionId,
      baseSha256: master.sha256,
      bytes: new TextEncoder().encode(`frame-edit-a-${uuidv7()}`), mediaType: "image/png",
    });
    await expect(editorReimport(ctx, ryan, {
      checkoutAssetVersionId: master.assetVersionId,
      baseSha256: master.sha256,
      bytes: new TextEncoder().encode(`frame-edit-b-${uuidv7()}`), mediaType: "image/png",
    })).rejects.toThrow(/superseded/);
  });

  it("re-import is a human action", async () => {
    const master = await importAsset(ctx, ryan, {
      bytes: new TextEncoder().encode(`frame-${uuidv7()}`), mediaType: "image/png",
    });
    await expect(editorReimport(ctx, { id: "steward", kind: "service", role: "operator" }, {
      checkoutAssetVersionId: master.assetVersionId,
      baseSha256: master.sha256, bytes: new Uint8Array([1]), mediaType: "image/png",
    })).rejects.toThrow(/human/i);
  });
});
