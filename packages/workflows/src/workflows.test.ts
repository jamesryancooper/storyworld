import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { Client, Connection } from "@temporalio/client";
import { NativeConnection, Worker } from "@temporalio/worker";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import {
  createProduction,
  createWorkspaceAndProperty,
  decideProposal,
  proposeCanon,
  saveNarrativeStructure,
  sealNarrativeStructureDocument,
  snapshotCanonRelease,
  type KernelContext,
} from "@storyworld/kernel";
import { compileGenerationRecipe } from "@storyworld/providers";
import type { Pool } from "pg";
import { buildActivities } from "./activities.js";

const temporalAddress = process.env["TEMPORAL_ADDRESS"] ?? "localhost:7235";
const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);
const TASK_QUEUE = `sw-generation-test-${process.pid}`;

let reachable = false;
try {
  const probe = await Connection.connect({ address: temporalAddress, connectTimeout: "3s" });
  await probe.close();
  reachable = true;
} catch {
  reachable = false;
}

describe.skipIf(!reachable)("B1 Temporal generation workflow", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let worker: Worker;
  let client: Client;
  let runPromise: Promise<void>;
  let recipe: { document: Record<string, unknown>; sha256: string };
  const org = uuidv7();
  const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b1-wf-org"]);
    const blobRoot = await mkdtemp(join(tmpdir(), "b1-wf-blobs-"));
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(blobRoot),
      organizationId: org,
    };
    const { propertyId, officialBranchId } = await createWorkspaceAndProperty(ctx, ryan, {
      workspaceName: "wf-ws", propertyName: "wf-property", propertyType: "fictional",
    });
    const entityId = uuidv7();
    const p = await proposeCanon(ctx, ryan, {
      propertyId, branchId: officialBranchId, proposalType: "entity",
      payload: { entity_id: entityId, entity_type: "character", name: "Mara", visibility: "team_private" },
    });
    await decideProposal(ctx, ryan, { proposalId: p, decision: "accepted", stableId: entityId });
    const release = await snapshotCanonRelease(ctx, ryan, {
      propertyId, branchId: officialBranchId, releaseName: "wf-canon", releaseVersion: `1.0.${Date.now()}`,
    });
    const { productionId } = await createProduction(ctx, ryan, {
      propertyId, pinnedCanonReleaseId: release.canonReleaseId, name: "wf-production",
    });
    const unitId = uuidv7();
    await saveNarrativeStructure(ctx, ryan, {
      productionId,
      document: sealNarrativeStructureDocument({
        schema_version: "storyworld.narrative-structure.v1", structure_id: uuidv7(),
        property_id: propertyId,
        canon_release_ref: release.canonReleaseId,
        production_ref: productionId,
        narrative_units: [{ unit_id: unitId, unit_type: "episode", display_number: "1", presentation_order: 1, story_time: "1989-06-01", publication_time: null, parent_unit_ref: null }],
        choices: [],
        branches: [],
        threads: [],
      }),
    });
    recipe = await compileGenerationRecipe(ctx, {
      productionId, unitId,
      scenePurpose: "wf demo", emotionalObjective: "calm",
      prompt: "the archive at dusk", lockedAttributes: ["character:mara:appearance"], seed: 7,
    });

    const connection = await NativeConnection.connect({ address: temporalAddress });
    worker = await Worker.create({
      connection,
      taskQueue: TASK_QUEUE,
      workflowsPath: new URL("./workflows.ts", import.meta.url).pathname,
      activities: buildActivities(() => ctx),
    });
    runPromise = worker.run();
    const clientConnection = await Connection.connect({ address: temporalAddress });
    client = new Client({ connection: clientConnection });
  });

  afterAll(async () => {
    worker?.shutdown();
    await runPromise?.catch(() => undefined);
    await ctx?.pool.end();
    await admin?.end();
  });

  it("runs a durable generation to staged candidates with provenance", async () => {
    const result = await client.workflow.execute("generationWorkflow", {
      taskQueue: TASK_QUEUE,
      workflowId: `wf-gen-${uuidv7()}`,
      args: [{
        recipeDocument: recipe.document, recipeSha256: recipe.sha256,
        adapterId: "mock", endpoint: "mock/deterministic",
        organizationId: org, actor: ryan,
      }],
    });
    expect(result.candidateAssetVersionIds).toHaveLength(1);
    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT detail FROM storyworld.audit_receipts WHERE correlation_id=$1", [result.generationRunId]));
    expect((receipts.rows[0]?.detail as Record<string, unknown>)["recipe_sha256"]).toBe(recipe.sha256);
  });

  async function failureCause(input: Record<string, unknown>, id: string) {
    try {
      await client.workflow.execute("generationWorkflow", {
        taskQueue: TASK_QUEUE, workflowId: id, args: [input],
      });
    } catch (err) {
      // Activity failures nest one level deeper than workflow-thrown ones:
      // WorkflowFailedError -> ActivityFailure -> ApplicationFailure.
      let cause = (err as { cause?: unknown }).cause as
        | { type?: string | null; message?: string; cause?: unknown }
        | undefined;
      while (cause && !cause.type && cause.cause) {
        cause = cause.cause as typeof cause;
      }
      return cause;
    }
    throw new Error("expected the workflow to fail");
  }

  it("refuses a recipe without a positive budget ceiling, non-retryably", async () => {
    const badRecipe = { ...recipe.document, cost_ceiling: { amount: 0, currency: "USD" } };
    const cause = await failureCause({
      recipeDocument: badRecipe, recipeSha256: recipe.sha256,
      adapterId: "mock", endpoint: "mock/deterministic",
      organizationId: org, actor: ryan,
    }, `wf-gen-budget-${uuidv7()}`);
    expect(cause?.type).toBe("BudgetExceeded");
    expect(cause?.message).toMatch(/no positive cost ceiling/);
  });

  it("reserved crossing surfaces as a non-retryable failure (fal without a key)", async () => {
    delete process.env["FAL_KEY"];
    const cause = await failureCause({
      recipeDocument: recipe.document, recipeSha256: recipe.sha256,
      adapterId: "fal", endpoint: "fal-ai/flux/schnell",
      organizationId: org, actor: ryan,
    }, `wf-gen-nokey-${uuidv7()}`);
    expect(cause?.type).toBe("ReservedCrossing");
    expect(cause?.message).toMatch(/reserved crossing/i);
  });
});

describe.skipIf(reachable)("B1 Temporal generation workflow (skipped)", () => {
  it("skips when no Temporal server is reachable", () => {
    expect(reachable).toBe(false);
  });
});
