import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import {
  createProduction,
  createWorkspaceAndProperty,
  decideProposal,
  proposeCanon,
  saveNarrativeStructure,
  snapshotCanonRelease,
  type KernelContext,
} from "@storyworld/kernel";
import type { Pool } from "pg";
import {
  compileGenerationRecipe,
  createFalAdapter,
  createMockAdapter,
  normalizeRecipe,
  ProviderRateLimitError,
  ProviderRequestError,
  runGeneration,
} from "./index.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);

let admin: Pool;
let ctx: KernelContext;
let productionId: string;
let unitId: string;
const org = uuidv7();
const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;

beforeAll(async () => {
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b1-test-org"]);
  ctx = {
    pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
    blobs: createFsStore(await mkdtemp(join(tmpdir(), "b1-blobs-"))),
    organizationId: org,
  };
  const { propertyId, officialBranchId } = await createWorkspaceAndProperty(ctx, ryan, {
    workspaceName: "b1-ws", propertyName: "b1-property", propertyType: "fictional",
  });
  const entityId = uuidv7();
  const p1 = await proposeCanon(ctx, ryan, {
    propertyId, branchId: officialBranchId, proposalType: "entity",
    payload: { entity_id: entityId, entity_type: "character", name: "Mara", visibility: "team_private" },
  });
  await decideProposal(ctx, ryan, { proposalId: p1, decision: "accepted", stableId: entityId });
  const p2 = await proposeCanon(ctx, ryan, {
    propertyId, branchId: officialBranchId, proposalType: "timeline_event",
    payload: { event_id: uuidv7(), story_time: "1989-06-01", summary: "start",
      state_transitions: [{ entity_ref: `entity:${entityId}`, attribute: "condition", to_value: "pristine" }] },
  });
  await decideProposal(ctx, ryan, { proposalId: p2, decision: "accepted" });
  const release = await snapshotCanonRelease(ctx, ryan, {
    propertyId, branchId: officialBranchId, releaseName: "b1-canon", releaseVersion: `1.0.${Date.now()}`,
  });
  productionId = await createProduction(ctx, ryan, {
    propertyId, pinnedCanonReleaseId: release.canonReleaseId, name: "b1-production",
  });
  unitId = uuidv7();
  await saveNarrativeStructure(ctx, ryan, {
    productionId,
    document: {
      schema_version: "storyworld.narrative-structure.v1",
      structure_id: uuidv7(),
      narrative_units: [{ unit_id: unitId, unit_type: "episode", presentation_order: 1, story_time: "1989-06-01" }],
      threads: [],
    },
  });
});

afterAll(async () => {
  await ctx?.pool.end();
  await admin?.end();
});

function recipeInput() {
  return {
    productionId, unitId,
    scenePurpose: "establish the archive",
    emotionalObjective: "quiet unease",
    prompt: "the archivist at the desk, dusk light",
    lockedAttributes: ["character:mara:appearance", "location:stillhouse:signage"],
    seed: 42,
  };
}

describe("B1 recipe compiler", () => {
  it("locked attributes and pinned state always reach the recipe", async () => {
    const recipe = await compileGenerationRecipe(ctx, recipeInput());
    expect(recipe.document["locked_attributes"]).toEqual(recipeInput().lockedAttributes);
    expect((recipe.document["pinned_entity_states"] as unknown[]).length).toBeGreaterThan(0);
    expect(contentSha256(canonicalJson(recipe.document))).toBe(recipe.sha256);
  });
});

describe("B1 gateway with mock adapter", () => {
  it("stages candidates transactionally with complete provenance", async () => {
    const recipe = await compileGenerationRecipe(ctx, recipeInput());
    const run = await runGeneration(ctx, ryan, {
      recipeDocument: recipe.document, recipeSha256: recipe.sha256,
      adapter: createMockAdapter(), endpoint: "mock/deterministic",
    });
    expect(run.candidateAssetVersionIds).toHaveLength(1);
    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT detail FROM storyworld.audit_receipts WHERE correlation_id=$1", [run.generationRunId]));
    const detail = receipts.rows[0]?.detail as Record<string, unknown>;
    expect(detail["provider"]).toBe("mock");
    expect(detail["recipe_sha256"]).toBe(recipe.sha256);
    expect(detail["locked_attributes"]).toEqual(recipeInput().lockedAttributes);
    expect(detail["provider_request_id"]).toBeTruthy();
  });
  it("identical recipes are deterministic through the mock adapter (revision fixed point)", async () => {
    const recipe = await compileGenerationRecipe(ctx, recipeInput());
    const request = normalizeRecipe(recipe.document, recipe.sha256);
    const a = await createMockAdapter().generate("mock/deterministic", request);
    const b = await createMockAdapter().generate("mock/deterministic", request);
    expect(contentSha256(a.candidates[0]!.bytes)).toBe(contentSha256(b.candidates[0]!.bytes));
  });
});

describe("B1 fal adapter against a fake queue", () => {
  let server: Server;
  let base: string;
  const png = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 1, 2, 3, 4]);

  beforeAll(async () => {
    server = createServer((req, res) => {
      const path = req.url ?? "";
      if (req.method === "POST" && path.startsWith("/fal-ai/")) {
        if (req.headers["x-fal-store-io"] !== "0") {
          res.writeHead(500); return res.end("missing privacy header");
        }
        if (req.headers.authorization !== "Key test-key") {
          res.writeHead(401); return res.end();
        }
        res.writeHead(200, { "content-type": "application/json" });
        return res.end(JSON.stringify({
          request_id: "req-123",
          status_url: `${base}/status/req-123`,
          response_url: `${base}/result/req-123`,
        }));
      }
      if (path === "/status/req-123") {
        res.writeHead(200, { "content-type": "application/json" });
        return res.end(JSON.stringify({ status: "COMPLETED" }));
      }
      if (path === "/result/req-123") {
        res.writeHead(200, { "content-type": "application/json" });
        return res.end(JSON.stringify({
          seed: 42,
          images: [{ url: `${base}/image/1`, width: 1024, height: 1024 }],
        }));
      }
      if (path === "/image/1") {
        res.writeHead(200, { "content-type": "image/png" });
        return res.end(Buffer.from(png));
      }
      if (path === "/ratelimited") {
        res.writeHead(429, { "retry-after": "7" });
        return res.end();
      }
      res.writeHead(404); res.end();
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  afterAll(() => { server?.close(); });

  it("provider swap: same recipe, different adapter, canonical data unchanged", async () => {
    const recipe = await compileGenerationRecipe(ctx, recipeInput());
    const before = canonicalJson(recipe.document);
    const adapter = createFalAdapter({ falKey: "test-key", baseUrl: base, pollIntervalMs: 1 });
    const run = await runGeneration(ctx, ryan, {
      recipeDocument: recipe.document, recipeSha256: recipe.sha256,
      adapter, endpoint: "fal-ai/flux/schnell",
    });
    expect(run.candidateAssetVersionIds).toHaveLength(1);
    expect(canonicalJson(recipe.document)).toBe(before);
    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT detail FROM storyworld.audit_receipts WHERE correlation_id=$1", [run.generationRunId]));
    const detail = receipts.rows[0]?.detail as Record<string, unknown>;
    expect(detail["provider"]).toBe("fal");
    expect(detail["provider_request_id"]).toBe("req-123");
    expect(detail["seed"]).toBe(42);
  });
  it("refuses unknown endpoints, missing keys, and maps rate limits", async () => {
    const adapter = createFalAdapter({ falKey: "test-key", baseUrl: base, pollIntervalMs: 1 });
    const recipe = await compileGenerationRecipe(ctx, recipeInput());
    const request = normalizeRecipe(recipe.document, recipe.sha256);
    await expect(adapter.generate("fal-ai/not-allowlisted", request)).rejects.toThrow(ProviderRequestError);
    const keyless = createFalAdapter({ falKey: null, baseUrl: base });
    await expect(keyless.generate("fal-ai/flux/schnell", request)).rejects.toThrow(/reserved crossing/);
    await expect(
      (async () => {
        const response = await fetch(`${base}/ratelimited`);
        if (response.status === 429) {
          throw new ProviderRateLimitError("fal rate limit", Number(response.headers.get("retry-after")));
        }
      })(),
    ).rejects.toThrow(ProviderRateLimitError);
  });
});
