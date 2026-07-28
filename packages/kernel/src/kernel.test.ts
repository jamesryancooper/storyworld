import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import type { Pool } from "pg";
import {
  AuthorityError,
  canonChangeImpact,
  compileScenePacket,
  createProduction,
  createWorkspaceAndProperty,
  currentCanon,
  decideProposal,
  ingestSource,
  proposeCanon,
  saveNarrativeStructure,
  snapshotCanonRelease,
  type KernelContext,
} from "./index.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);

let admin: Pool;
let ctx: KernelContext;
const org = uuidv7();
const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;
const model = { id: "extraction-model", kind: "model", role: "proposer" } as const;

beforeAll(async () => {
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query(
    "INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)",
    [org, "kernel-test-org"],
  );
  ctx = {
    pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
    blobs: createFsStore(await mkdtemp(join(tmpdir(), "kernel-blobs-"))),
    organizationId: org,
  };
});

afterAll(async () => {
  await ctx?.pool.end();
  await admin?.end();
});

describe("F3 kernel: source-to-canon with authority enforcement", () => {
  it("runs the full flow; models propose but can never accept (ADR-0008)", async () => {
    const { propertyId, officialBranchId } = await createWorkspaceAndProperty(ctx, ryan, {
      workspaceName: "stillhouse-ws",
      propertyName: "The Stillhouse Archive (kernel test)",
      propertyType: "fictional",
    });

    const source = await ingestSource(ctx, ryan, {
      propertyId,
      name: "mini-season source excerpt",
      bytes: new TextEncoder().encode(`stillhouse source ${uuidv7()}`),
      rightsNote: "I authored this; fictional; permitted use: test fixture in this repository.",
    });

    // Model proposes an entity from the source.
    const entityStableId = uuidv7();
    const proposal = await proposeCanon(ctx, model, {
      propertyId,
      branchId: officialBranchId,
      proposalType: "entity",
      payload: { entity_id: entityStableId, entity_type: "character", name: "Mara Venn", visibility: "team_private" },
      sourceRef: source.sourceId,
    });

    // The model cannot decide its own proposal.
    await expect(
      decideProposal(ctx, model, { proposalId: proposal, decision: "accepted" }),
    ).rejects.toThrow(AuthorityError);
    // Nothing entered canon.
    expect(await currentCanon(ctx, officialBranchId)).toHaveLength(0);

    // The human accepts; canon now holds one entity revision.
    const decided = await decideProposal(ctx, ryan, {
      proposalId: proposal,
      decision: "accepted",
      stableId: entityStableId,
    });
    expect(decided.revisionId).not.toBeNull();
    const canon = await currentCanon(ctx, officialBranchId);
    expect(canon).toHaveLength(1);
    expect(canon[0]?.payload["name"]).toBe("Mara Venn");

    // Timeline events, deliberately proposed OUT of story order.
    for (const [storyTime, attribute, value] of [
      ["1989-06-03", "condition", "damaged"],
      ["1989-06-01", "condition", "pristine"],
      ["1989-06-02", "location", "under-the-stairs"],
    ] as const) {
      const p = await proposeCanon(ctx, model, {
        propertyId,
        branchId: officialBranchId,
        proposalType: "timeline_event",
        payload: {
          event_id: uuidv7(),
          story_time: storyTime,
          summary: `event at ${storyTime}`,
          state_transitions: [{ entity_ref: `entity:${entityStableId}`, attribute, to_value: value }],
        },
      });
      await decideProposal(ctx, ryan, { proposalId: p, decision: "accepted" });
    }

    // Snapshot the release; pin a production; accept a 3-episode structure.
    const release = await snapshotCanonRelease(ctx, ryan, {
      propertyId,
      branchId: officialBranchId,
      releaseName: "kernel-test-canon",
      releaseVersion: "1.0.0",
    });
    const productionId = await createProduction(ctx, ryan, {
      propertyId,
      pinnedCanonReleaseId: release.canonReleaseId,
      name: "The Second Chair (kernel test)",
    });
    const ep1 = uuidv7();
    const ep2 = uuidv7();
    const ep3 = uuidv7();
    await saveNarrativeStructure(ctx, ryan, {
      productionId,
      document: {
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: uuidv7(),
        narrative_units: [
          { unit_id: ep1, unit_type: "episode", presentation_order: 1, story_time: "1989-06-01" },
          { unit_id: ep2, unit_type: "episode", presentation_order: 2, story_time: "1989-06-02" },
          { unit_id: ep3, unit_type: "episode", presentation_order: 3, story_time: "1989-06-03" },
        ],
        threads: [
          { thread_id: uuidv7(), thread_type: "reveal", introduced_in_unit_ref: ep1, resolved_in_unit_ref: null },
        ],
      },
    });

    // Scene state packet for episode 2: state derives from STORY TIME.
    const packet = await compileScenePacket(ctx, { productionId, unitId: ep2 });
    expect(packet["canon_release_ref"]).toBe(release.canonReleaseId);
    const states = packet["entity_states"] as { entity_ref: string; state: Record<string, unknown> }[];
    const entity = states.find((s) => s.entity_ref === `entity:${entityStableId}`);
    expect(entity?.state["condition"]).toBe("pristine");
    expect(entity?.state["location"]).toBe("under-the-stairs");
    expect((packet["active_threads"] as unknown[]).length).toBe(1);
    const packet3 = await compileScenePacket(ctx, { productionId, unitId: ep3 });
    const entity3 = (packet3["entity_states"] as typeof states).find(
      (s) => s.entity_ref === `entity:${entityStableId}`,
    );
    expect(entity3?.state["condition"]).toBe("damaged");

    // Canon change after the release: production stays pinned; impact names it.
    const laterProposal = await proposeCanon(ctx, model, {
      propertyId,
      branchId: officialBranchId,
      proposalType: "fact",
      payload: { fact_id: uuidv7(), subject_ref: `entity:${entityStableId}`, predicate: "sister_of", value: { type: "text", content: "June" }, classification: "secret_truth" },
    });
    await decideProposal(ctx, ryan, { proposalId: laterProposal, decision: "accepted" });
    const pinned = await admin.query(
      "SELECT content_sha256 FROM storyworld.canon_releases WHERE canon_release_id=$1",
      [release.canonReleaseId],
    );
    expect(pinned.rows[0]?.content_sha256).toBe(release.contentSha256);
    const impact = await canonChangeImpact(ctx, { propertyId, targetRef: entityStableId });
    expect(impact.map((i) => i.productionId)).toContain(productionId);

    // Supersede the entity: new revision chains, current canon has one entity.
    const revise = await proposeCanon(ctx, model, {
      propertyId,
      branchId: officialBranchId,
      proposalType: "entity",
      payload: { entity_id: entityStableId, entity_type: "character", name: "Mara Venn (the Archivist)", visibility: "team_private" },
    });
    const superseded = await decideProposal(ctx, ryan, {
      proposalId: revise,
      decision: "accepted",
      stableId: entityStableId,
      ...(decided.revisionId ? { supersedesRevisionId: decided.revisionId } : {}),
    });
    expect(superseded.revisionId).not.toBeNull();
    const canonNow = await currentCanon(ctx, officialBranchId);
    const entities = canonNow.filter((r) => r.concern === "entity");
    expect(entities).toHaveLength(1);
    expect(entities[0]?.payload["name"]).toBe("Mara Venn (the Archivist)");
  });
});
