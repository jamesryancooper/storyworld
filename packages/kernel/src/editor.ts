import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import { requireHuman, type Actor } from "./actors.js";
import type { KernelContext } from "./commands.js";

/**
 * Editor round trip (B1): check an exact asset version out to an external
 * editor and re-import the edited result as a new candidate version with
 * derivation transformation 'external_edit'. The checkout manifest binds to
 * the exact content hash; re-import against a superseded version is refused
 * (stale-checkout guard) so external edits cannot silently discard newer
 * accepted work.
 */
export async function editorCheckout(
  ctx: KernelContext,
  actor: Actor,
  input: { assetVersionId: string },
): Promise<{ bytes: Uint8Array; manifest: Record<string, unknown> }> {
  const row = await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const r = (await c.query(
      `SELECT v.asset_id, v.version, v.content_sha256, b.media_type
         FROM storyworld.asset_versions v
         JOIN storyworld.content_blobs b ON b.sha256 = v.content_sha256
        WHERE v.asset_version_id=$1`,
      [input.assetVersionId],
    )).rows[0];
    if (!r) throw new Error(`asset version ${input.assetVersionId} not found`);
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`, "asset.editor.checkout",
       `asset-version:${input.assetVersionId}`, r.content_sha256, uuidv7()],
    );
    return r;
  });
  const bytes = await ctx.blobs.get(row.content_sha256);
  const manifest: Record<string, unknown> = {
    checkout_of_asset_version_id: input.assetVersionId,
    asset_id: row.asset_id,
    base_version: Number(row.version),
    base_sha256: row.content_sha256,
    media_type: row.media_type,
  };
  manifest["manifest_sha256"] = contentSha256(canonicalJson(manifest));
  return { bytes, manifest };
}

export async function editorReimport(
  ctx: KernelContext,
  actor: Actor,
  input: {
    checkoutAssetVersionId: string;
    baseSha256: string;
    bytes: Uint8Array;
    mediaType: string;
  },
): Promise<{ assetVersionId: string; sha256: string; version: number }> {
  requireHuman(actor, "editor re-import");
  const stored = await ctx.blobs.put(input.bytes, input.mediaType);
  const assetVersionId = uuidv7();
  const version = await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const base = (await c.query(
      "SELECT asset_id, content_sha256 FROM storyworld.asset_versions WHERE asset_version_id=$1",
      [input.checkoutAssetVersionId],
    )).rows[0];
    if (!base) throw new Error(`asset version ${input.checkoutAssetVersionId} not found`);
    if (base.content_sha256 !== input.baseSha256) {
      throw new Error("stale checkout: base hash does not match the checked-out version");
    }
    const newer = await c.query(
      `SELECT 1 FROM storyworld.derivations d
         JOIN storyworld.asset_versions v ON v.asset_version_id = d.to_asset_version_id
        WHERE d.from_asset_version_id=$1 AND v.state IN ('accepted_master','candidate')`,
      [input.checkoutAssetVersionId],
    );
    if ((newer.rowCount ?? 0) > 0) {
      throw new Error("stale checkout: the checked-out version has been superseded");
    }
    await c.query(
      "INSERT INTO storyworld.content_blobs (sha256, organization_id, size_bytes, media_type, storage_uri) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (sha256) DO NOTHING",
      [stored.sha256, ctx.organizationId, stored.sizeBytes, stored.mediaType, stored.uri],
    );
    const max = await c.query(
      "SELECT coalesce(max(version),0) AS v FROM storyworld.asset_versions WHERE asset_id=$1",
      [base.asset_id],
    );
    const v = Number(max.rows[0]?.v ?? 0) + 1;
    await c.query(
      "INSERT INTO storyworld.asset_versions (asset_version_id, organization_id, asset_id, version, content_sha256, state) VALUES ($1,$2,$3,$4,$5,'candidate')",
      [assetVersionId, ctx.organizationId, base.asset_id, v, stored.sha256],
    );
    await c.query(
      "INSERT INTO storyworld.derivations (derivation_id, organization_id, from_asset_version_id, to_asset_version_id, transformation, provider_provenance) VALUES ($1,$2,$3,$4,'external_edit',$5)",
      [uuidv7(), ctx.organizationId, input.checkoutAssetVersionId, assetVersionId,
       JSON.stringify({ base_sha256: input.baseSha256 })],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`, "asset.editor.reimported",
       `asset-version:${assetVersionId}`, stored.sha256, uuidv7(),
       JSON.stringify({ checkout_of: input.checkoutAssetVersionId, base_sha256: input.baseSha256 })],
    );
    return v;
  });
  return { assetVersionId, sha256: stored.sha256, version };
}
