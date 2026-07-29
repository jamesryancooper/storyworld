import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";

export type CheckLayer =
  | "structural"
  | "technical_media"
  | "temporal_state"
  | "narrative"
  | "visual_continuity"
  | "commerce_fidelity"
  | "rights_safety";

export type Severity = "blocker" | "major" | "minor" | "advisory";

/** A finding before persistence assigns identity and disposition workflow. */
export interface FindingDraft {
  check_layer: CheckLayer;
  severity: Severity;
  confidence: number;
  description: string;
  evidence_refs: string[];
  subject_refs: string[];
  subject_sha256: string[];
  suggested_remediation: string | null;
}

/** Materialize a draft as a full continuity-finding.v1 contract document. */
export function findingDocument(draft: FindingDraft): {
  findingId: string;
  document: Record<string, unknown>;
  sha256: string;
} {
  const findingId = uuidv7();
  const document: Record<string, unknown> = {
    schema_version: "storyworld.continuity-finding.v1",
    finding_id: findingId,
    ...draft,
    disposition: "open",
    disposition_receipt_ref: null,
    found_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  };
  return { findingId, document, sha256: contentSha256(canonicalJson(document)) };
}
