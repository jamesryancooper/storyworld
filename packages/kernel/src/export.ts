import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { withTenant } from "@storyworld/persistence";
import { exportPackage, type SigningKeyPair } from "@storyworld/portability";
import type { KernelContext } from "./commands.js";

/**
 * Export a production as a signed portable package: the pinned canon
 * release document, the current narrative structure, receipts for the
 * production's accepted assets, and the asset bytes (ADR-0014).
 */
export async function exportProductionPackage(
  ctx: KernelContext,
  input: { productionId: string; dir?: string; pair: SigningKeyPair },
): Promise<{ dir: string }> {
  const dir = input.dir ?? (await mkdtemp(join(tmpdir(), "sw-export-")));
  const data = await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const production = (await c.query(
      `SELECT p.production_id, p.property_id, p.name, p.authority_host,
              r.document AS release, r.canon_release_id,
              w.workspace_id
         FROM storyworld.productions p
         JOIN storyworld.canon_releases r ON r.canon_release_id = p.pinned_canon_release_id
         JOIN storyworld.properties pr ON pr.property_id = p.property_id
         JOIN storyworld.workspaces w ON w.workspace_id = pr.workspace_id
        WHERE p.production_id = $1`,
      [input.productionId],
    )).rows[0];
    if (!production) throw new Error(`production ${input.productionId} not found`);
    const structure = (await c.query(
      `SELECT document FROM storyworld.narrative_structures s
        WHERE s.production_id=$1
          AND NOT EXISTS (SELECT 1 FROM storyworld.narrative_structures t
                           WHERE t.supersedes_revision_id = s.structure_revision_id)`,
      [input.productionId],
    )).rows[0];
    const accepted = (await c.query(
      `SELECT av.asset_version_id, av.content_sha256, cb.media_type
         FROM storyworld.asset_versions av
         JOIN storyworld.content_blobs cb ON cb.sha256 = av.content_sha256
        WHERE av.organization_id = $1 AND av.state = 'accepted_master'`,
      [ctx.organizationId],
    )).rows;
    return { production, structure, accepted };
  });
  const assets = [];
  for (const row of data.accepted) {
    assets.push({
      assetVersionRef: `asset-version:${row.asset_version_id}`,
      bytes: await ctx.blobs.get(row.content_sha256),
      mediaType: row.media_type,
    });
  }
  const records = [
    { ref: "canon-release", document: data.production.release as Record<string, unknown> },
  ];
  if (data.structure) {
    records.push({ ref: "narrative-structure", document: data.structure.document as Record<string, unknown> });
  }
  await exportPackage(
    dir,
    {
      workspaceId: data.production.workspace_id,
      propertyId: data.production.property_id,
      canonReleaseRef: data.production.canon_release_id,
      authorityHost: data.production.authority_host,
      originSystemVersion: "0.1.0-f3",
      createdAt: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
      sensitivity: "internal",
      records,
      assets,
    },
    input.pair,
  );
  return { dir };
}
