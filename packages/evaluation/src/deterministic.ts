import type { FindingDraft } from "./findings.js";

interface TimelineEvent {
  event_id?: string;
  story_time?: string;
  summary?: string;
  state_transitions?: { entity_ref: string; attribute: string; to_value: unknown }[];
}

/**
 * Deterministic continuity layers (B1). These run real checks over the
 * pinned canon release and current narrative structure — no model calls.
 * Model-assisted layers are pluggable and mocked until the owner supplies
 * provider keys (DEC-0012 deferral).
 */

/** structural: every reference must resolve within the pinned release/structure. */
export function checkStructural(
  release: Record<string, unknown>,
  structure: Record<string, unknown>,
  releaseSha256: string,
  structureSha256: string,
): FindingDraft[] {
  const findings: FindingDraft[] = [];
  // The contract leaves entity_ref an opaque non-empty string; both the
  // kernel's `entity:<uuid>` form and the fixtures' bare-uuid form must
  // resolve (caught by the B4 golden corpus).
  const entityIds = new Set(
    ((release["entities"] ?? []) as Record<string, unknown>[]).flatMap((e) => {
      const id = String(e["entity_id"]);
      return [id, `entity:${id}`];
    }),
  );
  const releaseRef = `canon-release:${String(release["canon_release_id"])}`;
  for (const event of (release["timeline_events"] ?? []) as TimelineEvent[]) {
    for (const transition of event.state_transitions ?? []) {
      if (!entityIds.has(transition.entity_ref)) {
        findings.push({
          check_layer: "structural",
          severity: "major",
          confidence: 1,
          description: `Timeline event ${event.event_id ?? "?"} transitions ${transition.entity_ref}, which resolves to no entity in the pinned canon release.`,
          evidence_refs: [releaseRef],
          subject_refs: [releaseRef],
          subject_sha256: [releaseSha256],
          suggested_remediation: "Propose the missing entity into canon or correct the entity_ref.",
        });
      }
    }
  }
  const unitIds = new Set(
    ((structure["narrative_units"] ?? []) as Record<string, unknown>[]).map((u) => String(u["unit_id"])),
  );
  const structureRef = `narrative-structure:${String(structure["structure_id"])}`;
  for (const thread of (structure["threads"] ?? []) as Record<string, unknown>[]) {
    for (const field of ["resolved_in_unit_ref", "earliest_permitted_unit_ref"] as const) {
      const ref = thread[field];
      if (typeof ref === "string" && ref.length > 0 && !unitIds.has(ref)) {
        findings.push({
          check_layer: "structural",
          severity: "major",
          confidence: 1,
          description: `Thread ${String(thread["thread_id"])} ${field} points at unit ${ref}, which is not in the narrative structure.`,
          evidence_refs: [structureRef],
          subject_refs: [structureRef],
          subject_sha256: [structureSha256],
          suggested_remediation: "Point the thread at an existing narrative unit.",
        });
      }
    }
  }
  return findings;
}

/** temporal_state: story-time-derived state must be well defined. */
export function checkTemporalState(
  release: Record<string, unknown>,
  releaseSha256: string,
): FindingDraft[] {
  const findings: FindingDraft[] = [];
  const releaseRef = `canon-release:${String(release["canon_release_id"])}`;
  const events = (release["timeline_events"] ?? []) as TimelineEvent[];
  for (const event of events) {
    if (typeof event.story_time !== "string" || event.story_time.length === 0) {
      findings.push({
        check_layer: "temporal_state",
        severity: "major",
        confidence: 1,
        description: `Timeline event ${event.event_id ?? "?"} has no story_time; its transitions cannot participate in story-time-derived state.`,
        evidence_refs: [releaseRef],
        subject_refs: [releaseRef],
        subject_sha256: [releaseSha256],
        suggested_remediation: "Assign the event a story_time.",
      });
    }
  }
  const byMoment = new Map<string, Set<unknown>>();
  for (const event of events) {
    if (typeof event.story_time !== "string") continue;
    for (const transition of event.state_transitions ?? []) {
      const key = `${event.story_time}|${transition.entity_ref}|${transition.attribute}`;
      const values = byMoment.get(key) ?? new Set();
      values.add(JSON.stringify(transition.to_value ?? null));
      byMoment.set(key, values);
    }
  }
  for (const [key, values] of byMoment) {
    if (values.size > 1) {
      const [storyTime, entityRef, attribute] = key.split("|");
      findings.push({
        check_layer: "temporal_state",
        severity: "blocker",
        confidence: 1,
        description: `Contradictory state: ${entityRef ?? "?"}.${attribute ?? "?"} transitions to ${values.size} different values at the same story time ${storyTime ?? "?"} — derived state is nondeterministic.`,
        evidence_refs: [releaseRef],
        subject_refs: [releaseRef],
        subject_sha256: [releaseSha256],
        suggested_remediation: "Order the transitions in story time or merge them into one canonical transition.",
      });
    }
  }
  return findings;
}

/** technical_media: candidate bytes must exist, verify, and be a supported media type. */
export async function checkTechnicalMedia(
  blob: { sha256: string; sizeBytes: number; mediaType: string } | null,
  verify: (sha256: string) => Promise<boolean>,
  assetVersionRef: string,
): Promise<FindingDraft[]> {
  const findings: FindingDraft[] = [];
  if (!blob) {
    return [{
      check_layer: "technical_media",
      severity: "blocker",
      confidence: 1,
      description: `${assetVersionRef} has no content blob row; custody is broken.`,
      evidence_refs: [assetVersionRef],
      subject_refs: [assetVersionRef],
      subject_sha256: ["0".repeat(64)],
      suggested_remediation: "Re-import the asset; investigate the custody gap.",
    }];
  }
  if (blob.sizeBytes <= 0) {
    findings.push({
      check_layer: "technical_media",
      severity: "blocker",
      confidence: 1,
      description: `${assetVersionRef} content is empty (0 bytes).`,
      evidence_refs: [assetVersionRef],
      subject_refs: [assetVersionRef],
      subject_sha256: [blob.sha256],
      suggested_remediation: "Regenerate or re-import the asset.",
    });
  }
  const supported = new Set(["image/png", "image/jpeg", "image/webp"]);
  if (!supported.has(blob.mediaType)) {
    findings.push({
      check_layer: "technical_media",
      severity: "major",
      confidence: 1,
      description: `${assetVersionRef} media type ${blob.mediaType} is outside the supported still-image set.`,
      evidence_refs: [assetVersionRef],
      subject_refs: [assetVersionRef],
      subject_sha256: [blob.sha256],
      suggested_remediation: "Convert to PNG, JPEG, or WebP on import.",
    });
  }
  if (!(await verify(blob.sha256))) {
    findings.push({
      check_layer: "technical_media",
      severity: "blocker",
      confidence: 1,
      description: `${assetVersionRef} stored bytes no longer match their content address — custody tamper or corruption.`,
      evidence_refs: [assetVersionRef],
      subject_refs: [assetVersionRef],
      subject_sha256: [blob.sha256],
      suggested_remediation: "Restore from backup; audit the object store.",
    });
  }
  return findings;
}
