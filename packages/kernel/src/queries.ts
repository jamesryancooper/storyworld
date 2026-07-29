import { withTenant } from "@storyworld/persistence";
import type { KernelContext } from "./commands.js";

/**
 * Read queries for client surfaces (B2). Reads never mutate; they see the
 * same tenant-scoped rows the command path writes — no separate read model.
 */
export async function listProperties(
  ctx: KernelContext,
): Promise<{ propertyId: string; name: string; propertyType: string; officialBranchId: string; createdAt: string }[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT p.property_id AS "propertyId", p.name, p.property_type AS "propertyType",
              b.branch_id AS "officialBranchId", p.created_at AS "createdAt"
         FROM storyworld.properties p
         JOIN storyworld.canon_branches b ON b.property_id = p.property_id AND b.branch_type = 'official'
        ORDER BY p.created_at DESC`,
    );
    return rows.rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt as string).toISOString() }));
  });
}

export async function listProductions(
  ctx: KernelContext,
  input: { propertyId: string },
): Promise<{ productionId: string; name: string; pinnedCanonReleaseId: string; releaseVersion: string }[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT p.production_id AS "productionId", p.name,
              p.pinned_canon_release_id AS "pinnedCanonReleaseId", r.release_version AS "releaseVersion"
         FROM storyworld.productions p
         JOIN storyworld.canon_releases r ON r.canon_release_id = p.pinned_canon_release_id
        WHERE p.property_id = $1
        ORDER BY p.created_at DESC`,
      [input.propertyId],
    );
    return rows.rows;
  });
}

/** The property's newest official-branch canon release with its full document. */
export async function latestCanonRelease(
  ctx: KernelContext,
  input: { propertyId: string },
): Promise<{
  canonReleaseId: string;
  releaseName: string;
  releaseVersion: string;
  contentSha256: string;
  document: Record<string, unknown>;
} | null> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const row = (await c.query(
      `SELECT r.canon_release_id AS "canonReleaseId", r.release_name AS "releaseName",
              r.release_version AS "releaseVersion", r.content_sha256 AS "contentSha256", r.document
         FROM storyworld.canon_releases r
        WHERE r.property_id = $1
          AND NOT EXISTS (SELECT 1 FROM storyworld.canon_releases s
                           WHERE s.supersedes_release_id = r.canon_release_id)
        ORDER BY r.created_at DESC
        LIMIT 1`,
      [input.propertyId],
    )).rows[0];
    return row ?? null;
  });
}

/** Current (unsuperseded) narrative structure of a production, with its revision id. */
export async function getNarrativeStructure(
  ctx: KernelContext,
  input: { productionId: string },
): Promise<{ structureRevisionId: string; document: Record<string, unknown> } | null> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const row = (await c.query(
      `SELECT s.structure_revision_id AS "structureRevisionId", s.document
         FROM storyworld.narrative_structures s
        WHERE s.production_id=$1
          AND NOT EXISTS (SELECT 1 FROM storyworld.narrative_structures t
                           WHERE t.supersedes_revision_id = s.structure_revision_id)`,
      [input.productionId],
    )).rows[0];
    return row ?? null;
  });
}

/** Recent staged generation candidates with their binding provenance receipts. */
export async function listGenerationCandidates(
  ctx: KernelContext,
): Promise<{
  assetVersionId: string;
  contentSha256: string;
  state: string;
  createdAt: string;
  provenance: Record<string, unknown>;
  generationRunId: string;
}[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT v.asset_version_id AS "assetVersionId", v.content_sha256 AS "contentSha256",
              v.state, v.created_at AS "createdAt", r.detail AS provenance,
              r.correlation_id AS "generationRunId"
         FROM storyworld.asset_versions v
         JOIN storyworld.audit_receipts r
           ON r.subject_ref = 'asset-version:' || v.asset_version_id
          AND r.action = 'generation.candidate.staged'
        WHERE v.state = 'candidate'
        ORDER BY v.created_at DESC
        LIMIT 50`,
    );
    return rows.rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt as string).toISOString() }));
  });
}
