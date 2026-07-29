import { uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import type { KernelContext } from "@storyworld/kernel";
import { normalizeRecipe } from "./recipe.js";
import { ProviderRequestError, type ProviderAdapter } from "./types.js";

/**
 * Run a generation through the gateway: recipe -> adapter -> staged
 * candidates, transactionally, with complete provenance (ADR-0008/0015).
 * A failed adapter call stages nothing; budget ceilings are enforced
 * before submission cost is accepted.
 */
export async function runGeneration(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: {
    recipeDocument: Record<string, unknown>;
    recipeSha256: string;
    adapter: ProviderAdapter;
    endpoint: string;
    /** Focused regeneration: derive the new candidates from an existing version, replacing only the named focus. */
    regenerateOf?: { assetVersionId: string; focus: string };
  },
): Promise<{ generationRunId: string; candidateAssetVersionIds: string[] }> {
  const request = normalizeRecipe(input.recipeDocument, input.recipeSha256);
  const startedAt = performance.now();
  const outcome = await input.adapter.generate(input.endpoint, request);
  const latencyMs = Math.round(performance.now() - startedAt);
  if (outcome.costEstimate.amount > request.costCeiling.amount) {
    throw new ProviderRequestError(
      `estimated cost ${outcome.costEstimate.amount} exceeds recipe ceiling ${request.costCeiling.amount}`,
    );
  }
  const generationRunId = uuidv7();
  const candidateAssetVersionIds: string[] = [];
  const stored: { candidate: (typeof outcome.candidates)[number]; blob: Awaited<ReturnType<typeof ctx.blobs.put>> }[] = [];
  for (const candidate of outcome.candidates) {
    stored.push({ candidate, blob: await ctx.blobs.put(candidate.bytes, candidate.mediaType) });
  }
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    for (const { candidate, blob } of stored) {
      const assetVersionId = uuidv7();
      await c.query(
        "INSERT INTO storyworld.content_blobs (sha256, organization_id, size_bytes, media_type, storage_uri) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (sha256) DO NOTHING",
        [blob.sha256, ctx.organizationId, blob.sizeBytes, blob.mediaType, blob.uri],
      );
      await c.query(
        "INSERT INTO storyworld.asset_versions (asset_version_id, organization_id, asset_id, version, content_sha256, state) VALUES ($1,$2,$3,1,$4,'candidate')",
        [assetVersionId, ctx.organizationId, uuidv7(), blob.sha256],
      );
      await c.query(
        "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, causation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`, "generation.candidate.staged",
         `asset-version:${assetVersionId}`, blob.sha256, generationRunId, null,
         JSON.stringify({
           provider: outcome.providerId,
           endpoint: outcome.endpoint,
           provider_request_id: outcome.providerRequestId,
           recipe_sha256: input.recipeSha256,
           seed: candidate.seed,
           cost_estimate: outcome.costEstimate,
           locked_attributes: request.lockedAttributes,
           latency_ms: latencyMs,
           ...(input.regenerateOf
             ? { regenerate_of: input.regenerateOf.assetVersionId, focus: input.regenerateOf.focus }
             : {}),
         })],
      );
      if (input.regenerateOf) {
        await c.query(
          "INSERT INTO storyworld.derivations (derivation_id, organization_id, from_asset_version_id, to_asset_version_id, transformation, provider_provenance) VALUES ($1,$2,$3,$4,'generation.focused_regeneration',$5)",
          [uuidv7(), ctx.organizationId, input.regenerateOf.assetVersionId, assetVersionId,
           JSON.stringify({ focus: input.regenerateOf.focus, recipe_sha256: input.recipeSha256 })],
        );
      }
      candidateAssetVersionIds.push(assetVersionId);
    }
  });
  return { generationRunId, candidateAssetVersionIds };
}
