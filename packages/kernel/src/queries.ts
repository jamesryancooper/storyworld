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
): Promise<{ productionId: string; propertyId: string; name: string; pinnedCanonReleaseId: string; releaseVersion: string }[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT p.production_id AS "productionId", p.property_id AS "propertyId", p.name,
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
): Promise<{ structureRevisionId: string; contentSha256: string; document: Record<string, unknown> } | null> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const row = (await c.query(
      `SELECT s.structure_revision_id AS "structureRevisionId",
              s.content_sha256 AS "contentSha256", s.document
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

/** Canon proposals with their decision state; undecided ones are the review queue. */
export async function listCanonProposals(
  ctx: KernelContext,
  input: { propertyId: string },
): Promise<{
  proposalId: string;
  branchId: string;
  proposalType: string;
  payload: Record<string, unknown>;
  proposedBy: string;
  proposerKind: string;
  createdAt: string;
  decision: string | null;
}[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT p.proposal_id AS "proposalId", p.branch_id AS "branchId",
              p.proposal_type AS "proposalType", p.payload, p.proposed_by AS "proposedBy",
              p.proposer_kind AS "proposerKind", p.created_at AS "createdAt", d.decision
         FROM storyworld.canon_proposals p
         LEFT JOIN storyworld.proposal_decisions d ON d.proposal_id = p.proposal_id
        WHERE p.property_id = $1
        ORDER BY p.created_at DESC
        LIMIT 100`,
      [input.propertyId],
    );
    return rows.rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt as string).toISOString() }));
  });
}

/** All canon releases of a property, newest first, without full documents. */
export async function listCanonReleases(
  ctx: KernelContext,
  input: { propertyId: string },
): Promise<{
  canonReleaseId: string;
  releaseName: string;
  releaseVersion: string;
  contentSha256: string;
  createdAt: string;
  supersedesReleaseId: string | null;
}[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT r.canon_release_id AS "canonReleaseId", r.release_name AS "releaseName",
              r.release_version AS "releaseVersion", r.content_sha256 AS "contentSha256",
              r.created_at AS "createdAt", r.supersedes_release_id AS "supersedesReleaseId"
         FROM storyworld.canon_releases r
        WHERE r.property_id = $1
        ORDER BY r.created_at DESC`,
      [input.propertyId],
    );
    return rows.rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt as string).toISOString() }));
  });
}

/** Structure proposals for a property's productions (DEC-0020 queued mode). */
export async function listStructureProposals(
  ctx: KernelContext,
  input: { propertyId: string },
): Promise<{
  proposalId: string;
  productionId: string;
  productionName: string;
  summary: string;
  contentSha256: string;
  baseRevisionId: string | null;
  submittedBy: string;
  submitterKind: string;
  createdAt: string;
  decision: string | null;
  appliedRevisionId: string | null;
}[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT sp.proposal_id AS "proposalId", sp.production_id AS "productionId",
              pr.name AS "productionName", sp.summary, sp.content_sha256 AS "contentSha256",
              sp.base_revision_id AS "baseRevisionId", sp.submitted_by AS "submittedBy",
              sp.submitter_kind AS "submitterKind", sp.created_at AS "createdAt",
              d.decision, d.applied_revision_id AS "appliedRevisionId"
         FROM storyworld.structure_proposals sp
         JOIN storyworld.productions pr ON pr.production_id = sp.production_id
         LEFT JOIN storyworld.structure_proposal_decisions d ON d.proposal_id = sp.proposal_id
        WHERE pr.property_id = $1
        ORDER BY sp.created_at DESC
        LIMIT 100`,
      [input.propertyId],
    );
    return rows.rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt as string).toISOString() }));
  });
}

/**
 * One durable decision receipt, tenant-scoped (DEC-0023). Read-only: the
 * receipt row is immutable evidence and its detail may embed a
 * storyworld.approval-receipt.v1 document for acceptance-class decisions.
 */
export async function getReceipt(
  ctx: KernelContext,
  input: { receiptId: string },
): Promise<{
  receiptId: string;
  actor: string;
  action: string;
  subjectRef: string;
  subjectSha256: string | null;
  correlationId: string;
  recordedAt: string;
  detail: Record<string, unknown>;
} | null> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const row = (await c.query(
      `SELECT r.receipt_id AS "receiptId", r.actor, r.action, r.subject_ref AS "subjectRef",
              r.subject_sha256 AS "subjectSha256", r.correlation_id AS "correlationId",
              r.recorded_at AS "recordedAt", r.detail
         FROM storyworld.audit_receipts r
        WHERE r.receipt_id = $1`,
      [input.receiptId],
    )).rows[0];
    if (!row) return null;
    return { ...row, recordedAt: new Date(row.recordedAt as string).toISOString() };
  });
}

/** Current (unsuperseded) continuity-finding revisions for a production. */
export async function listContinuityFindings(
  ctx: KernelContext,
  input: { productionId: string },
): Promise<{
  findingId: string;
  findingRevisionId: string;
  checkLayer: string;
  severity: string;
  disposition: string;
  document: Record<string, unknown>;
  createdAt: string;
}[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT f.finding_id AS "findingId", f.finding_revision_id AS "findingRevisionId",
              f.check_layer AS "checkLayer", f.severity, f.disposition, f.document,
              f.created_at AS "createdAt"
         FROM storyworld.continuity_findings f
        WHERE f.production_id = $1
          AND NOT EXISTS (SELECT 1 FROM storyworld.continuity_findings s
                           WHERE s.supersedes_revision_id = f.finding_revision_id)
        ORDER BY CASE f.severity WHEN 'blocker' THEN 0 WHEN 'major' THEN 1 WHEN 'minor' THEN 2 ELSE 3 END,
                 f.created_at DESC
        LIMIT 200`,
      [input.productionId],
    );
    return rows.rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt as string).toISOString() }));
  });
}
