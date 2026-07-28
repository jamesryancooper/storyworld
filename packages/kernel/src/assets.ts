import { uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import { requireHuman, type Actor } from "./actors.js";
import type { KernelContext } from "./commands.js";

/**
 * Manual asset import and exact-version acceptance (F3; ADR-0008/0009).
 * Import lands as a candidate; acceptance is a human decision producing an
 * immutable receipt bound to the content hash; supersession is a new
 * version row.
 */
export async function importAsset(
  ctx: KernelContext,
  actor: Actor,
  input: { bytes: Uint8Array; mediaType: string; assetId?: string; sourceVersionId?: string },
): Promise<{ assetId: string; assetVersionId: string; sha256: string; version: number }> {
  const stored = await ctx.blobs.put(input.bytes, input.mediaType);
  const assetId = input.assetId ?? uuidv7();
  const assetVersionId = uuidv7();
  let version = 1;
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.content_blobs (sha256, organization_id, size_bytes, media_type, storage_uri) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (sha256) DO NOTHING",
      [stored.sha256, ctx.organizationId, stored.sizeBytes, stored.mediaType, stored.uri],
    );
    const max = await c.query(
      "SELECT coalesce(max(version), 0) AS v FROM storyworld.asset_versions WHERE asset_id=$1",
      [assetId],
    );
    version = Number(max.rows[0]?.v ?? 0) + 1;
    await c.query(
      "INSERT INTO storyworld.asset_versions (asset_version_id, organization_id, asset_id, version, content_sha256, state) VALUES ($1,$2,$3,$4,$5,'candidate')",
      [assetVersionId, ctx.organizationId, assetId, version, stored.sha256],
    );
    if (input.sourceVersionId) {
      await c.query(
        "INSERT INTO storyworld.derivations (derivation_id, organization_id, from_asset_version_id, to_asset_version_id, transformation) VALUES ($1,$2,$3,$4,'manual.revision')",
        [uuidv7(), ctx.organizationId, input.sourceVersionId, assetVersionId],
      );
    }
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`, "asset.imported", `asset-version:${assetVersionId}`, stored.sha256, uuidv7()],
    );
  });
  return { assetId, assetVersionId, sha256: stored.sha256, version };
}

/**
 * Exact-version creative acceptance. Because asset_versions rows are
 * append-only, acceptance is recorded as a new version row in state
 * accepted_master superseding the candidate via the derivation graph,
 * plus the binding receipt.
 */
export async function acceptAssetVersion(
  ctx: KernelContext,
  actor: Actor,
  input: { assetVersionId: string },
): Promise<{ acceptedVersionId: string; receiptId: string }> {
  requireHuman(actor, "asset acceptance");
  const acceptedVersionId = uuidv7();
  const receiptId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const candidate = (await c.query(
      "SELECT asset_id, content_sha256 FROM storyworld.asset_versions WHERE asset_version_id=$1",
      [input.assetVersionId],
    )).rows[0];
    if (!candidate) throw new Error(`asset version ${input.assetVersionId} not found`);
    const max = await c.query(
      "SELECT coalesce(max(version),0) AS v FROM storyworld.asset_versions WHERE asset_id=$1",
      [candidate.asset_id],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "asset.accepted", `asset-version:${acceptedVersionId}`, candidate.content_sha256, uuidv7()],
    );
    await c.query(
      "INSERT INTO storyworld.asset_versions (asset_version_id, organization_id, asset_id, version, content_sha256, state, accepted_receipt_id) VALUES ($1,$2,$3,$4,$5,'accepted_master',$6)",
      [acceptedVersionId, ctx.organizationId, candidate.asset_id, Number(max.rows[0]?.v ?? 0) + 1, candidate.content_sha256, receiptId],
    );
    await c.query(
      "INSERT INTO storyworld.derivations (derivation_id, organization_id, from_asset_version_id, to_asset_version_id, transformation) VALUES ($1,$2,$3,$4,'acceptance')",
      [uuidv7(), ctx.organizationId, input.assetVersionId, acceptedVersionId],
    );
  });
  return { acceptedVersionId, receiptId };
}
