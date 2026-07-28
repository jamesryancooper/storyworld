import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import type { KernelContext } from "./commands.js";

interface TimelineEventPayload {
  event_id?: string;
  story_time?: string;
  summary?: string;
  entity_refs?: string[];
  state_transitions?: { entity_ref: string; attribute: string; to_value: unknown }[];
}

/**
 * Compile a scene state packet (F1 contract scene-state-packet.v1) from a
 * production's PINNED canon release and its current narrative structure.
 * State derives from story time, never presentation order (nonlinear-time
 * probe invariant): all timeline state_transitions with story_time <= the
 * scene's story_time apply, in story-time order.
 */
export async function compileScenePacket(
  ctx: KernelContext,
  input: { productionId: string; unitId: string },
): Promise<Record<string, unknown>> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const production = (await c.query(
      "SELECT p.pinned_canon_release_id, r.document AS release FROM storyworld.productions p JOIN storyworld.canon_releases r ON r.canon_release_id = p.pinned_canon_release_id WHERE p.production_id=$1",
      [input.productionId],
    )).rows[0];
    if (!production) throw new Error(`production ${input.productionId} not found`);
    const structureRow = (await c.query(
      `SELECT s.document FROM storyworld.narrative_structures s
        WHERE s.production_id=$1
          AND NOT EXISTS (SELECT 1 FROM storyworld.narrative_structures t
                           WHERE t.supersedes_revision_id = s.structure_revision_id)`,
      [input.productionId],
    )).rows[0];
    if (!structureRow) throw new Error(`production ${input.productionId} has no structure`);
    const release = production.release as Record<string, unknown>;
    const structure = structureRow.document as Record<string, unknown>;
    const units = (structure["narrative_units"] ?? []) as Record<string, unknown>[];
    const unit = units.find((u) => u["unit_id"] === input.unitId);
    if (!unit) throw new Error(`unit ${input.unitId} not in structure`);
    const storyTime = String(unit["story_time"]);

    const events = ((release["timeline_events"] ?? []) as TimelineEventPayload[])
      .filter((e) => typeof e.story_time === "string" && e.story_time <= storyTime)
      .sort((a, b) => (a.story_time! < b.story_time! ? -1 : 1));
    const state = new Map<string, Record<string, unknown>>();
    for (const event of events) {
      for (const transition of event.state_transitions ?? []) {
        const entity = state.get(transition.entity_ref) ?? {};
        entity[transition.attribute] = transition.to_value;
        state.set(transition.entity_ref, entity);
      }
    }
    const threads = ((structure["threads"] ?? []) as Record<string, unknown>[])
      .filter((t) => t["resolved_in_unit_ref"] === null || t["resolved_in_unit_ref"] === undefined)
      .map((t) => ({
        thread_ref: String(t["thread_id"]),
        thread_type: String(t["thread_type"]),
        ...(t["earliest_permitted_unit_ref"] ? { earliest_permitted_reveal_ref: String(t["earliest_permitted_unit_ref"]) } : {}),
      }));

    const packet: Record<string, unknown> = {
      schema_version: "storyworld.scene-state-packet.v1",
      packet_id: uuidv7(),
      scene_ref: input.unitId,
      canon_release_ref: String(release["canon_release_id"]),
      narrative_branch: String(release["branch"]),
      story_time: storyTime,
      entity_states: [...state.entries()].map(([entityRef, attrs]) => ({
        entity_ref: entityRef,
        state: attrs,
      })),
      entering_state_summary: `Computed state at story time ${storyTime} from ${events.length} timeline event(s) of pinned release ${String(release["release_version"])}.`,
      expected_effects: [],
      audience_knowledge_refs: [],
      character_knowledge: [],
      active_threads: threads,
      reference_pack_refs: [],
      policy_refs: [],
      created_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
      content_sha256: "0".repeat(64),
    };
    const { content_sha256: _omitted, ...unsignedPacket } = packet;
    packet["content_sha256"] = contentSha256(canonicalJson(unsignedPacket));
    return packet;
  });
}

/** Canon change impact: which productions pin releases whose documents contain the target stable id. */
export async function canonChangeImpact(
  ctx: KernelContext,
  input: { propertyId: string; targetRef: string },
): Promise<{ productionId: string; pinnedCanonReleaseId: string; name: string }[]> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const rows = await c.query(
      `SELECT p.production_id AS "productionId", p.pinned_canon_release_id AS "pinnedCanonReleaseId", p.name
         FROM storyworld.productions p
         JOIN storyworld.canon_releases r ON r.canon_release_id = p.pinned_canon_release_id
        WHERE p.property_id = $1 AND r.document::text LIKE '%' || $2 || '%'`,
      [input.propertyId, input.targetRef],
    );
    return rows.rows;
  });
}
