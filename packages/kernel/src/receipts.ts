import type { Actor } from "./actors.js";

/**
 * Contract-conformant decision documents for audit receipts (DEC-0023).
 * Every acceptance-class command embeds a complete
 * storyworld.approval-receipt.v1 document under the receipt's detail so a
 * durable decision names its layer, subjects, hashes, policy basis, human
 * decider, role, and authority host. A receipt from one layer never
 * implies another layer's approval.
 */

export type ApprovalLayer =
  | "canon_approval"
  | "creative_plan_approval"
  | "asset_creative_approval"
  | "continuity_disposition";

export type ApprovalDecision =
  | "approved"
  | "rejected"
  | "revision_requested"
  | "waived"
  | "escalated";

export interface ApprovalWaiver {
  reason: string;
  scope: string;
  expiry: string | null;
}

export function approvalReceiptDetail(input: {
  receiptId: string;
  layer: ApprovalLayer;
  decision: ApprovalDecision;
  subjectRefs: string[];
  subjectSha256: string[];
  policyRefs: string[];
  actor: Actor;
  waiver?: ApprovalWaiver;
  context?: Record<string, unknown>;
}): Record<string, unknown> {
  return {
    ...(input.context ?? {}),
    approval_receipt: {
      schema_version: "storyworld.approval-receipt.v1",
      receipt_id: input.receiptId,
      approval_layer: input.layer,
      decision: input.decision,
      subject_refs: input.subjectRefs,
      subject_sha256: input.subjectSha256,
      policy_refs: input.policyRefs,
      ...(input.waiver ? { waiver: input.waiver } : {}),
      decided_by: input.actor.id,
      decided_by_role: input.actor.role,
      decided_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
      authority_host: "storyworld",
      invalidated_by: null,
      expiry: null,
    },
  };
}
