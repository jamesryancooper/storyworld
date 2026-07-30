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
 * Per-property attention summary (SWUX-016; TASK-0020): defined facts only —
 * pending proposals and the latest release reflect real Engine state.
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

beforeAll(async () => {
  process.env["STORYWORLD_DEV_IDENTITY"] = "1";
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "attention-org"]);
  ctx = { pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")), blobs: createFsStore(await mkdtemp(join(tmpdir(), "att-blobs-"))), organizationId: org };
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

describe("attention summary (SWUX-016)", () => {
  it("reflects pending proposals and the latest release per property", async () => {
    const property = await post("/v1/properties", { workspaceName: "att-ws", propertyName: "Attentive Property", propertyType: "fictional" }, OWNER);
    const propertyId = String(property.body["propertyId"]);
    const branchId = String(property.body["officialBranchId"]);
    // Two pending proposals; one accepted (so it no longer counts as pending).
    await post("/v1/canon-proposals", { propertyId, branchId, proposalType: "entity", payload: { entity_id: uuidv7(), entity_type: "character", name: "A", visibility: "public" } }, MODEL);
    await post("/v1/canon-proposals", { propertyId, branchId, proposalType: "entity", payload: { entity_id: uuidv7(), entity_type: "character", name: "B", visibility: "public" } }, MODEL);
    const accepted = await post("/v1/canon-proposals", { propertyId, branchId, proposalType: "entity", payload: { entity_id: uuidv7(), entity_type: "character", name: "C", visibility: "public" } }, MODEL);
    await post("/v1/review-decisions", { proposalId: accepted.body["proposalId"], decision: "accepted" }, OWNER);
    await post("/v1/canon-releases", { propertyId, branchId, releaseName: "att-canon", releaseVersion: "2.3.0" }, OWNER);

    const res = await fetch(`${base}/v1/attention`, { headers: OWNER });
    const rows = ((await res.json()) as { attention: Record<string, unknown>[] }).attention;
    const mine = rows.find((r) => r["propertyId"] === propertyId);
    expect(mine).toBeDefined();
    expect(mine?.["pendingProposals"]).toBe(2);
    expect(mine?.["latestReleaseVersion"]).toBe("2.3.0");
    expect(mine?.["openFindings"]).toBe(0);
    expect(mine?.["pendingStructureProposals"]).toBe(0);
  });
});
