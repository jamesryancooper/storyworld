// @vitest-environment node
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import { createEngineServer } from "@storyworld/engine-api";
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import { createEngineClient, type EngineClient } from "./engine.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..", "packages", "persistence", "migrations",
);

describe("Studio engine client against a live engine-api", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let server: Server;
  let client: EngineClient;
  const org = uuidv7();

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b2-studio-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b2-studio-blobs-"))),
      organizationId: org,
    };
    server = createEngineServer(ctx).listen(0);
    const port = (server.address() as AddressInfo).port;
    client = createEngineClient(`http://localhost:${port}`);
  });

  afterAll(async () => {
    server?.close();
    await ctx?.pool.end();
    await admin?.end();
  });

  async function post(path: string, body: unknown): Promise<Record<string, unknown>> {
    const base = (server.address() as AddressInfo).port;
    const response = await fetch(`http://localhost:${base}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": uuidv7(),
        "x-actor-id": "ryan-cooper",
        "x-actor-kind": "human",
        "x-actor-role": "property_owner",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`${path}: ${response.status} ${await response.text()}`);
    return (await response.json()) as Record<string, unknown>;
  }

  it("drives the property flow end to end over HTTP", async () => {
    expect(await client.health()).toBe(true);
    const before = await client.listProperties();
    const { propertyId } = await client.createProperty({
      workspaceName: "studio-int workspace",
      propertyName: "Studio Integration",
      propertyType: "fictional",
    });
    expect(propertyId).toBeTruthy();
    const after = await client.listProperties();
    expect(after.length).toBe(before.length + 1);
    expect(after.some((p) => p.propertyId === propertyId)).toBe(true);
    expect(await client.latestCanonRelease(propertyId)).toBeNull();
    expect(await client.listProductions(propertyId)).toEqual([]);
  });

  it("drives arc + generation end to end: canon, structure, packet, governed run", async () => {
    const { propertyId, officialBranchId } = (await post("/v1/properties", {
      workspaceName: "b2t2 ws",
      propertyName: "B2 Tranche Two",
      propertyType: "fictional",
    })) as { propertyId: string; officialBranchId: string };
    const entityId = uuidv7();
    const { proposalId } = await post("/v1/canon-proposals", {
      propertyId, branchId: officialBranchId, proposalType: "entity",
      payload: { entity_id: entityId, entity_type: "character", name: "Mara", visibility: "team_private" },
    });
    await post("/v1/review-decisions", { proposalId, decision: "accepted", stableId: entityId });
    const { canonReleaseId } = (await post("/v1/canon-releases", {
      propertyId, branchId: officialBranchId, releaseName: "b2t2-canon",
      releaseVersion: `1.0.${Date.now()}`,
    })) as { canonReleaseId: string };
    const { productionId } = (await post("/v1/productions", {
      propertyId, pinnedCanonReleaseId: canonReleaseId, name: "b2t2-production",
    })) as { productionId: string };

    // Arc Board path: structure revision through the client.
    const unitId = uuidv7();
    await client.saveNarrativeStructure({
      productionId,
      document: {
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: uuidv7(),
        narrative_units: [{ unit_id: unitId, unit_type: "episode", presentation_order: 1, story_time: "1989-06-01" }],
        threads: [],
      },
    });
    const structure = await client.getNarrativeStructure(productionId);
    expect(structure?.document.narrative_units).toHaveLength(1);

    // Workbench path: packet then a governed mock generation.
    const packet = await client.getScenePacket(productionId, unitId);
    expect(packet.scene_ref).toBe(unitId);
    const run = await client.runGeneration({
      productionId, unitId,
      prompt: "the archive at dusk",
      scenePurpose: "integration", emotionalObjective: "calm",
      lockedAttributes: ["character:mara:appearance"], seed: 7,
      adapterId: "mock",
    });
    expect(run.candidateAssetVersionIds).toHaveLength(1);
    const candidates = await client.listGenerationCandidates();
    const staged = candidates.find((c) => c.generationRunId === run.generationRunId);
    expect(staged?.provenance.provider).toBe("mock");
    expect(typeof staged?.provenance.latency_ms).toBe("number");

    // Reserved crossing surfaces as a 403 problem, never a silent failure.
    delete process.env["FAL_KEY"];
    await expect(
      client.runGeneration({
        productionId, unitId, prompt: "dusk",
        scenePurpose: "integration", emotionalObjective: "calm",
        lockedAttributes: [], seed: 7, adapterId: "fal",
        endpoint: "fal-ai/flux/schnell",
      }),
    ).rejects.toThrow(/403/);
  });
});
