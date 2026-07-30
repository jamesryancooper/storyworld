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
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import { createEngineServer } from "./server.js";

/**
 * Proposal provenance and before/after context (SWUX-011; TASK-0018 Group D):
 * a proposal that supersedes an existing entity exposes the current accepted
 * value as the "before", the proposed payload as the "after", and its source
 * provenance.
 */

const url = process.env["DATABASE_URL"] ?? "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "persistence", "migrations");
const OWNER = { "x-actor-id": "ryan-cooper", "x-actor-kind": "human", "x-actor-role": "property_owner" };
const MODEL = { "x-actor-id": "extraction-model", "x-actor-kind": "model", "x-actor-role": "proposer" };

let admin: Pool;
let ctx: KernelContext;
let server: Server;
let base: string;
const org = uuidv7();

async function post(path: string, body: unknown, headers: Record<string, string>) {
  const r = await fetch(`${base}${path}`, { method: "POST", headers: { "content-type": "application/json", "idempotency-key": uuidv7(), ...headers }, body: JSON.stringify(body) });
  return { status: r.status, body: (await r.json()) as Record<string, unknown> };
}
async function get(path: string, headers: Record<string, string>) {
  const r = await fetch(`${base}${path}`, { headers });
  return { status: r.status, body: (await r.json()) as Record<string, unknown> };
}

beforeAll(async () => {
  process.env["STORYWORLD_DEV_IDENTITY"] = "1";
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "proposal-context-org"]);
  ctx = { pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")), blobs: createFsStore(await mkdtemp(join(tmpdir(), "pc-blobs-"))), organizationId: org };
  server = createEngineServer(ctx);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  delete process.env["STORYWORLD_DEV_IDENTITY"];
  server?.close();
  await ctx?.pool.end();
  await admin?.end();
});

describe("proposal context (SWUX-011)", () => {
  it("exposes current value, proposed payload, provenance, and 404s unknown ids", async () => {
    const property = await post("/v1/properties", { workspaceName: "pc-ws", propertyName: "Context Property", propertyType: "fictional" }, OWNER);
    const propertyId = String(property.body["propertyId"]);
    const branchId = String(property.body["officialBranchId"]);
    const entityId = uuidv7();

    // Accept an initial entity so a "current value" exists.
    const first = await post("/v1/canon-proposals", {
      propertyId, branchId, proposalType: "entity",
      payload: { entity_id: entityId, entity_type: "character", name: "Mara Venn", visibility: "team_private" },
    }, MODEL);
    await post("/v1/review-decisions", { proposalId: first.body["proposalId"], decision: "accepted", stableId: entityId }, OWNER);

    // A revision proposal for the same entity is still pending.
    const revision = await post("/v1/canon-proposals", {
      propertyId, branchId, proposalType: "entity",
      payload: { entity_id: entityId, entity_type: "character", name: "Mara Venn (the Archivist)", visibility: "team_private" },
    }, MODEL);

    const ctxRes = await get(`/v1/canon-proposals/${revision.body["proposalId"]}/context`, OWNER);
    expect(ctxRes.status).toBe(200);
    const context = ctxRes.body["context"] as Record<string, unknown>;
    expect(context["subjectStableId"]).toBe(entityId);
    expect((context["currentValue"] as Record<string, unknown>)["name"]).toBe("Mara Venn");
    expect((context["payload"] as Record<string, unknown>)["name"]).toBe("Mara Venn (the Archivist)");
    expect(context["proposerKind"]).toBe("model");
    expect(context["decision"]).toBeNull();

    // A brand-new subject has no current value.
    const fresh = await post("/v1/canon-proposals", {
      propertyId, branchId, proposalType: "entity",
      payload: { entity_id: uuidv7(), entity_type: "location", name: "The Stillhouse", visibility: "team_private" },
    }, MODEL);
    const freshCtx = await get(`/v1/canon-proposals/${fresh.body["proposalId"]}/context`, OWNER);
    expect((freshCtx.body["context"] as Record<string, unknown>)["currentValue"]).toBeNull();

    const unknown = await get(`/v1/canon-proposals/${uuidv7()}/context`, OWNER);
    expect(unknown.status).toBe(404);
  });
});
