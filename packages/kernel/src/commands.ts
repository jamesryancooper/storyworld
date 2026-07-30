import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import type { BlobStore } from "@storyworld/storage";
import type { Pool, PoolClient } from "pg";
import { requireHuman, requireOwner, type Actor } from "./actors.js";
import { approvalReceiptDetail } from "./receipts.js";

export interface KernelContext {
  pool: Pool;
  blobs: BlobStore;
  organizationId: string;
}

async function receipt(
  client: PoolClient,
  organizationId: string,
  actor: Actor,
  action: string,
  subjectRef: string,
  subjectSha256: string | null,
  correlationId: string,
  detail?: Record<string, unknown>,
): Promise<string> {
  const receiptId = uuidv7();
  await client.query(
    "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    [receiptId, organizationId, `${actor.kind}:${actor.id}`, action, subjectRef, subjectSha256, correlationId,
     JSON.stringify(detail ?? {})],
  );
  return receiptId;
}

export async function createWorkspaceAndProperty(
  ctx: KernelContext,
  actor: Actor,
  input: { workspaceName: string; propertyName: string; propertyType: string },
): Promise<{ workspaceId: string; propertyId: string; officialBranchId: string }> {
  requireHuman(actor, "property creation");
  const workspaceId = uuidv7();
  const propertyId = uuidv7();
  const officialBranchId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.workspaces (workspace_id, organization_id, name) VALUES ($1,$2,$3)",
      [workspaceId, ctx.organizationId, input.workspaceName],
    );
    await c.query(
      "INSERT INTO storyworld.properties (property_id, organization_id, workspace_id, name, property_type) VALUES ($1,$2,$3,$4,$5)",
      [propertyId, ctx.organizationId, workspaceId, input.propertyName, input.propertyType],
    );
    await c.query(
      "INSERT INTO storyworld.canon_branches (branch_id, organization_id, property_id, branch_name, branch_type) VALUES ($1,$2,$3,'official','official')",
      [officialBranchId, ctx.organizationId, propertyId],
    );
  });
  return { workspaceId, propertyId, officialBranchId };
}

export async function ingestSource(
  ctx: KernelContext,
  actor: Actor,
  input: { propertyId: string; name: string; bytes: Uint8Array; rightsNote: string },
): Promise<{ sourceId: string; sha256: string }> {
  const stored = await ctx.blobs.put(input.bytes, "text/markdown");
  const sourceId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.content_blobs (sha256, organization_id, size_bytes, media_type, storage_uri) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (sha256) DO NOTHING",
      [stored.sha256, ctx.organizationId, stored.sizeBytes, stored.mediaType, stored.uri],
    );
    await c.query(
      "INSERT INTO storyworld.source_records (source_id, organization_id, property_id, name, content_sha256, rights_note) VALUES ($1,$2,$3,$4,$5,$6)",
      [sourceId, ctx.organizationId, input.propertyId, input.name, stored.sha256, input.rightsNote],
    );
    await receipt(c, ctx.organizationId, actor, "source.ingested", `source:${sourceId}`, stored.sha256, uuidv7());
  });
  return { sourceId, sha256: stored.sha256 };
}

export interface ProposalInput {
  propertyId: string;
  branchId: string;
  proposalType: "entity" | "relationship" | "fact" | "timeline_event" | "retcon";
  payload: Record<string, unknown>;
  sourceRef?: string;
}

export async function proposeCanon(
  ctx: KernelContext,
  actor: Actor,
  input: ProposalInput,
): Promise<string> {
  const proposalId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.canon_proposals (proposal_id, organization_id, property_id, branch_id, proposal_type, payload, source_ref, proposed_by, proposer_kind) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [proposalId, ctx.organizationId, input.propertyId, input.branchId, input.proposalType,
       JSON.stringify(input.payload), input.sourceRef ?? null, actor.id,
       actor.kind === "human" ? "human" : actor.kind === "import" ? "import" : "model"],
    );
  });
  return proposalId;
}

export async function decideProposal(
  ctx: KernelContext,
  actor: Actor,
  input: {
    proposalId: string;
    decision: "accepted" | "rejected" | "revision_requested";
    stableId?: string;
    supersedesRevisionId?: string;
    visibility?: "public" | "spoiler" | "team_private" | "restricted";
  },
): Promise<{ decisionId: string; revisionId: string | null; receiptId: string }> {
  requireOwner(actor, "canon decision");
  const decisionId = uuidv7();
  const receiptId = uuidv7();
  let revisionId: string | null = null;
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const proposal = await c.query(
      "SELECT property_id, branch_id, proposal_type, payload FROM storyworld.canon_proposals WHERE proposal_id=$1",
      [input.proposalId],
    );
    const row = proposal.rows[0];
    if (!row) throw new Error(`proposal ${input.proposalId} not found`);
    const payloadHash = contentSha256(canonicalJson(row.payload));
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, `canon.proposal.${input.decision}`,
       `proposal:${input.proposalId}`, payloadHash, uuidv7(),
       JSON.stringify(approvalReceiptDetail({
         receiptId,
         layer: "canon_approval",
         decision: input.decision === "accepted" ? "approved" : input.decision === "rejected" ? "rejected" : "revision_requested",
         subjectRefs: [`proposal:${input.proposalId}`],
         subjectSha256: [payloadHash],
         policyRefs: ["DEC-0020", "DEC-0021", "DEC-0023"],
         actor,
         context: { proposal_type: String(row.proposal_type) },
       }))],
    );
    await c.query(
      "INSERT INTO storyworld.proposal_decisions (decision_id, organization_id, proposal_id, decision, decided_by, receipt_id) VALUES ($1,$2,$3,$4,$5,$6)",
      [decisionId, ctx.organizationId, input.proposalId, input.decision, actor.id, receiptId],
    );
    if (input.decision === "accepted" && row.proposal_type !== "retcon") {
      revisionId = uuidv7();
      await c.query(
        "INSERT INTO storyworld.canon_revisions (revision_id, organization_id, property_id, branch_id, concern, stable_id, payload, visibility, supersedes_revision_id, accepted_receipt_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [revisionId, ctx.organizationId, row.property_id, row.branch_id, row.proposal_type,
         input.stableId ?? uuidv7(), JSON.stringify(row.payload),
         input.visibility ?? "team_private", input.supersedesRevisionId ?? null, receiptId],
      );
    }
  });
  return { decisionId, revisionId, receiptId };
}

/** Current working canon of a branch: revisions with no successor. */
export async function currentCanon(
  ctx: KernelContext,
  branchId: string,
): Promise<{ concern: string; stable_id: string; revision_id: string; payload: Record<string, unknown>; visibility: string }[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT r.concern, r.stable_id, r.revision_id, r.payload, r.visibility
         FROM storyworld.canon_revisions r
        WHERE r.branch_id = $1
          AND NOT EXISTS (SELECT 1 FROM storyworld.canon_revisions s
                           WHERE s.supersedes_revision_id = r.revision_id)
        ORDER BY r.concern, r.stable_id`,
      [branchId],
    );
    return rows.rows;
  });
}
