import type { FindingDraft } from "@storyworld/evaluation";

/**
 * Defect-injection matrix: each injector seeds one violation into a golden
 * document; the named layer must catch it. An injector that comes back
 * clean is a regression in the evaluation framework, not in the corpus.
 */

export interface DefectCase {
  id: string;
  description: string;
  owningLayer: FindingDraft["check_layer"];
  minimumSeverity: "blocker" | "major";
  inject(release: Record<string, unknown>, structure: Record<string, unknown>): {
    release: Record<string, unknown>;
    structure: Record<string, unknown>;
  };
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const DEFECT_MATRIX: DefectCase[] = [
  {
    id: "dangling-entity-ref",
    description: "timeline transition references an entity canon does not contain",
    owningLayer: "structural",
    minimumSeverity: "major",
    inject(release: Record<string, unknown>, structure: Record<string, unknown>): { release: Record<string, unknown>; structure: Record<string, unknown> } {
      const r = clone(release);
      const events = (r["timeline_events"] ?? []) as Record<string, unknown>[];
      events.push({
        event_id: "00000000-0000-7000-8000-00000000dead",
        story_time: "2099-01-01",
        summary: "injected dangling reference",
        state_transitions: [{ entity_ref: "entity:00000000-0000-7000-8000-00000000beef", attribute: "mood", to_value: "wrong" }],
      });
      r["timeline_events"] = events;
      return { release: r, structure: clone(structure) };
    },
  },
  {
    id: "same-moment-contradiction",
    description: "two transitions set the same attribute to different values at one story time",
    owningLayer: "temporal_state",
    minimumSeverity: "blocker",
    inject(release: Record<string, unknown>, structure: Record<string, unknown>): { release: Record<string, unknown>; structure: Record<string, unknown> } {
      const r = clone(release);
      const events = (r["timeline_events"] ?? []) as Record<string, unknown>[];
      const entities = (r["entities"] ?? []) as Record<string, unknown>[];
      const target = entities[0] ? `entity:${String(entities[0]["entity_id"])}` : "entity:00000000-0000-7000-8000-000000000001";
      for (const value of ["alpha", "omega"]) {
        events.push({
          event_id: `00000000-0000-7000-8000-0000000${value === "alpha" ? "1" : "2"}bad`,
          story_time: "2098-06-01",
          summary: `injected ${value}`,
          state_transitions: [{ entity_ref: target, attribute: "injected_state", to_value: value }],
        });
      }
      r["timeline_events"] = events;
      return { release: r, structure: clone(structure) };
    },
  },
  {
    id: "event-without-story-time",
    description: "timeline event missing story_time cannot participate in derived state",
    owningLayer: "temporal_state",
    minimumSeverity: "major",
    inject(release: Record<string, unknown>, structure: Record<string, unknown>): { release: Record<string, unknown>; structure: Record<string, unknown> } {
      const r = clone(release);
      const events = (r["timeline_events"] ?? []) as Record<string, unknown>[];
      events.push({
        event_id: "00000000-0000-7000-8000-00000000face",
        summary: "injected event with no story time",
        state_transitions: [],
      });
      r["timeline_events"] = events;
      return { release: r, structure: clone(structure) };
    },
  },
  {
    id: "thread-to-missing-unit",
    description: "narrative thread resolves in a unit that does not exist",
    owningLayer: "structural",
    minimumSeverity: "major",
    inject(release: Record<string, unknown>, structure: Record<string, unknown>): { release: Record<string, unknown>; structure: Record<string, unknown> } {
      const s = clone(structure);
      const threads = (s["threads"] ?? []) as Record<string, unknown>[];
      threads.push({
        thread_id: "00000000-0000-7000-8000-00000000feed",
        thread_type: "mystery",
        resolved_in_unit_ref: "00000000-0000-7000-8000-00000000f00d",
      });
      s["threads"] = threads;
      return { release: clone(release), structure: s };
    },
  },
];
