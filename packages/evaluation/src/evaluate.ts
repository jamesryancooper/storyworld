import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import {
  approvalReceiptDetail,
  compileScenePacket,
  requireOwner,
  ValidationError,
  type Actor,
  type KernelContext,
} from "@storyworld/kernel";
import { checkStructural, checkTechnicalMedia, checkTemporalState } from "./deterministic.js";
import { findingDocument, type FindingDraft } from "./findings.js";
import { createMockNarrativeEvaluator, type ModelAssistedEvaluator } from "./model-assisted.js";

export interface RecordedFinding {
  findingId: string;
  findingRevisionId: string;
  document: Record<string, unknown>;
  sha256: string;
}

/**
 * Run the continuity evaluation for one narrative unit of a production:
 * deterministic layers over the pinned release and current structure, the
 * model-assisted layer(s) over the compiled scene packet, and (optionally)
 * technical checks over a specific asset version. Every finding is recorded
 * append-only with a binding receipt; dispositions are separate human
 * decisions (ADR-0008).
 */
export async function runEvaluation(
  ctx: KernelContext,
  actor: Actor,
  input: {
    productionId: string;
    unitId: string;
    assetVersionId?: string;
    modelEvaluators?: ModelAssistedEvaluator[];
  },
): Promise<RecordedFinding[]> {
  const evaluators = input.modelEvaluators ?? [createMockNarrativeEvaluator()];
  const { release, releaseSha256, structure, structureSha256 } = await withTenant(
    ctx.pool, ctx.organizationId, async (c) => {
      const row = (await c.query(
        `SELECT r.document AS release, r.content_sha256 AS release_sha
           FROM storyworld.productions p
           JOIN storyworld.canon_releases r ON r.canon_release_id = p.pinned_canon_release_id
          WHERE p.production_id=$1`,
        [input.productionId],
      )).rows[0];
      if (!row) throw new Error(`production ${input.productionId} not found`);
      const structureRow = (await c.query(
        `SELECT s.document, s.content_sha256 FROM storyworld.narrative_structures s
          WHERE s.production_id=$1
            AND NOT EXISTS (SELECT 1 FROM storyworld.narrative_structures t
                             WHERE t.supersedes_revision_id = s.structure_revision_id)`,
        [input.productionId],
      )).rows[0];
      if (!structureRow) throw new Error(`production ${input.productionId} has no structure`);
      return {
        release: row.release as Record<string, unknown>,
        releaseSha256: String(row.release_sha),
        structure: structureRow.document as Record<string, unknown>,
        structureSha256: String(structureRow.content_sha256),
      };
    });

  const drafts: FindingDraft[] = [
    ...checkStructural(release, structure, releaseSha256, structureSha256),
    ...checkTemporalState(release, releaseSha256),
  ];

  const packet = await compileScenePacket(ctx, { productionId: input.productionId, unitId: input.unitId });
  const packetSha256 = String(packet["content_sha256"]);
  for (const evaluator of evaluators) {
    drafts.push(...(await evaluator.evaluate(packet, packetSha256)));
  }

  if (input.assetVersionId) {
    const blob = await withTenant(ctx.pool, ctx.organizationId, async (c) =>
      (await c.query(
        `SELECT b.sha256, b.size_bytes AS "sizeBytes", b.media_type AS "mediaType"
           FROM storyworld.asset_versions v
           JOIN storyworld.content_blobs b ON b.sha256 = v.content_sha256
          WHERE v.asset_version_id=$1`,
        [input.assetVersionId],
      )).rows[0] ?? null);
    drafts.push(...(await checkTechnicalMedia(
      blob ? { sha256: String(blob.sha256), sizeBytes: Number(blob.sizeBytes), mediaType: String(blob.mediaType) } : null,
      (sha) => ctx.blobs.verify(sha),
      `asset-version:${input.assetVersionId}`,
    )));
  }

  const recorded: RecordedFinding[] = [];
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    for (const draft of drafts) {
      const { findingId, document, sha256 } = findingDocument(draft);
      const findingRevisionId = uuidv7();
      await c.query(
        "INSERT INTO storyworld.continuity_findings (finding_revision_id, organization_id, finding_id, production_id, check_layer, severity, disposition, document, content_sha256) VALUES ($1,$2,$3,$4,$5,$6,'open',$7,$8)",
        [findingRevisionId, ctx.organizationId, findingId, input.productionId,
         draft.check_layer, draft.severity, JSON.stringify(document), sha256],
      );
      await c.query(
        "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`, "continuity.finding.recorded",
         `continuity-finding:${findingId}`, sha256, uuidv7(),
         JSON.stringify({ check_layer: draft.check_layer, severity: draft.severity, unit_id: input.unitId })],
      );
      recorded.push({ findingId, findingRevisionId, document, sha256 });
    }
  });
  return recorded;
}

/** Human disposition of a finding: a new append-only revision plus its receipt. */
export async function disposeFinding(
  ctx: KernelContext,
  actor: Actor,
  input: {
    findingId: string;
    disposition: "resolved" | "waived" | "intentional_exception" | "canon_change_proposed";
    waiver?: { reason: string; scope: string; expiry: string | null };
  },
): Promise<{ findingRevisionId: string; receiptId: string }> {
  requireOwner(actor, "continuity disposition");
  if (input.disposition === "waived" || input.disposition === "intentional_exception") {
    // The waiver rationale is the reviewer's own statement (DEC-0021;
    // SWUX-003): a missing or empty reason/scope is refused, never filled in.
    if (!input.waiver) {
      throw new ValidationError(`${input.disposition} requires a waiver (reason, scope, expiry)`);
    }
    if (!input.waiver.reason?.trim() || !input.waiver.scope?.trim()) {
      throw new ValidationError(
        `${input.disposition} requires a reviewer-authored waiver reason and scope; empty values are refused`,
      );
    }
  }
  const findingRevisionId = uuidv7();
  const receiptId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const current = (await c.query(
      `SELECT f.finding_revision_id, f.production_id, f.document
         FROM storyworld.continuity_findings f
        WHERE f.finding_id=$1
          AND NOT EXISTS (SELECT 1 FROM storyworld.continuity_findings s
                           WHERE s.supersedes_revision_id = f.finding_revision_id)`,
      [input.findingId],
    )).rows[0];
    if (!current) throw new Error(`finding ${input.findingId} not found`);
    const document = { ...(current.document as Record<string, unknown>) };
    document["disposition"] = input.disposition;
    document["disposition_receipt_ref"] = `receipt:${receiptId}`;
    if (input.waiver) {
      document["waiver"] = { ...input.waiver, approver_receipt_ref: `receipt:${receiptId}` };
    }
    const sha256 = contentSha256(canonicalJson(document));
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "continuity.finding.disposed",
       `continuity-finding:${input.findingId}`, sha256, uuidv7(),
       JSON.stringify(approvalReceiptDetail({
         receiptId,
         layer: "continuity_disposition",
         decision:
           input.disposition === "resolved" ? "approved"
           : input.disposition === "canon_change_proposed" ? "escalated"
           : "waived",
         subjectRefs: [`continuity-finding:${input.findingId}`],
         subjectSha256: [sha256],
         policyRefs: ["DEC-0021", "DEC-0023"],
         actor,
         ...(input.waiver ? { waiver: input.waiver } : {}),
         context: { disposition: input.disposition },
       }))],
    );
    await c.query(
      "INSERT INTO storyworld.continuity_findings (finding_revision_id, organization_id, finding_id, production_id, check_layer, severity, disposition, document, content_sha256, supersedes_revision_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [findingRevisionId, ctx.organizationId, input.findingId, current.production_id,
       String(document["check_layer"]), String(document["severity"]), input.disposition,
       JSON.stringify(document), sha256, current.finding_revision_id],
    );
  });
  return { findingRevisionId, receiptId };
}
