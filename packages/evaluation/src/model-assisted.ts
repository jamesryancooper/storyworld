import type { FindingDraft } from "./findings.js";

/**
 * Model-assisted continuity evaluation is a pluggable boundary (DEC-0012
 * deferral): real evaluators arrive when the owner supplies provider keys;
 * until then the deterministic mock exercises the identical plumbing so the
 * disposition workflow, persistence, and receipts are proven now.
 */
export interface ModelAssistedEvaluator {
  evaluatorId: string;
  layer: "narrative" | "visual_continuity";
  evaluate(scenePacket: Record<string, unknown>, packetSha256: string): Promise<FindingDraft[]>;
}

/** Deterministic mock: flags scenes that enter with no established state. */
export function createMockNarrativeEvaluator(): ModelAssistedEvaluator {
  return {
    evaluatorId: "mock-narrative-v0",
    layer: "narrative",
    async evaluate(scenePacket, packetSha256) {
      const states = (scenePacket["entity_states"] ?? []) as unknown[];
      if (states.length > 0) return [];
      return [{
        check_layer: "narrative",
        severity: "advisory",
        confidence: 0.5,
        description: `Scene ${String(scenePacket["scene_ref"])} enters with no established entity state; verify the scene is intended to precede all canonical timeline events.`,
        evidence_refs: [`scene-state-packet:${String(scenePacket["packet_id"])}`],
        subject_refs: [`unit:${String(scenePacket["scene_ref"])}`],
        subject_sha256: [packetSha256],
        suggested_remediation: null,
      }];
    },
  };
}
