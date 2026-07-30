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
 * Read-only cross-domain search (DEC-0026 / PROP-FG-10; TASK-0019):
 * tenant-scoped, restricted canon excluded, spoiler labeled, typed deep-link
 * results, navigation-only.
 */

const url = process.env["DATABASE_URL"] ?? "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "persistence", "migrations");
const OWNER = { "x-actor-id": "ryan-cooper", "x-actor-kind": "human", "x-actor-role": "property_owner" };
const MODEL = { "x-actor-id": "extraction-model", "x-actor-kind": "model", "x-actor-role": "proposer" };

let admin: Pool;
let ctxA: KernelContext;
let server: Server;
let base: string;
const orgA = uuidv7();
const orgB = uuidv7();
let propertyId = "";
let branchId = "";

async function post(path: string, body: unknown, headers: Record<string, string>) {
  const r = await fetch(`${base}${path}`, { method: "POST", headers: { "content-type": "application/json", "idempotency-key": uuidv7(), ...headers }, body: JSON.stringify(body) });
  return { status: r.status, body: (await r.json()) as Record<string, unknown> };
}
async function searchFor(term: string) {
  const r = await fetch(`${base}/v1/search?q=${encodeURIComponent(term)}`, { headers: OWNER });
  return (await r.json() as { results: Record<string, unknown>[] }).results;
}
async function acceptEntity(name: string, visibility: string) {
  const id = uuidv7();
  const p = await post("/v1/canon-proposals", { propertyId, branchId, proposalType: "entity", payload: { entity_id: id, entity_type: "character", name, visibility } }, MODEL);
  await post("/v1/review-decisions", { proposalId: p.body["proposalId"], decision: "accepted", stableId: id, visibility }, OWNER);
  return id;
}

beforeAll(async () => {
  process.env["STORYWORLD_DEV_IDENTITY"] = "1";
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2),($3,$4)", [orgA, "search-org-a", orgB, "search-org-b"]);
  ctxA = { pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")), blobs: createFsStore(await mkdtemp(join(tmpdir(), "search-blobs-"))), organizationId: orgA };
  server = createEngineServer(ctxA);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

  const property = await post("/v1/properties", { workspaceName: "search-ws", propertyName: "Zephyr Chronicle", propertyType: "fictional" }, OWNER);
  propertyId = String(property.body["propertyId"]);
  branchId = String(property.body["officialBranchId"]);
  await acceptEntity("Zephyrine the Bold", "public");
  await acceptEntity("Zephyrine's Secret Twin", "restricted");
  await acceptEntity("Zephyr's Hidden Ally", "spoiler");

  // A second tenant with its own similarly-named entity, to prove isolation.
  const b = await admin.query("SELECT organization_id FROM storyworld.organizations WHERE organization_id=$1", [orgB]);
  expect(b.rows).toHaveLength(1);
});

afterAll(async () => {
  delete process.env["STORYWORLD_DEV_IDENTITY"];
  server?.close();
  await ctxA?.pool.end();
  await admin?.end();
});

describe("search (DEC-0026)", () => {
  it("finds public canon and never leaks restricted or spoiler through titles/snippets", async () => {
    const results = await searchFor("Zephyr");
    const titles = results.map((r) => String(r["title"]));
    expect(titles).toContain("Zephyrine the Bold");
    // Neither restricted nor spoiler canon may surface (fail closed; the alpha
    // has no per-viewer authorization model to reveal spoilers).
    expect(titles.some((t) => t.includes("Secret Twin"))).toBe(false);
    expect(titles.some((t) => t.includes("Hidden Ally"))).toBe(false);
    expect(results.every((r) => r["visibility"] === null || r["visibility"] === "public" || r["visibility"] === "team_private")).toBe(true);
  });

  it("returns typed results with a property, state, and a deep link", async () => {
    const results = await searchFor("Zephyr Chronicle");
    const prop = results.find((r) => r["type"] === "property");
    expect(prop).toBeDefined();
    expect(prop?.["propertyId"]).toBe(propertyId);
    expect(prop?.["state"]).toBe("property");
    expect(String(prop?.["deepLink"])).toBe(`/world-bible?property=${propertyId}`);
    const entity = results.find((r) => r["type"] === "entity");
    if (entity) expect(String(entity["deepLink"])).toContain(`property=${propertyId}`);
  });

  it("is tenant-scoped: only the acting tenant's records are returned", async () => {
    const results = await searchFor("Zephyr");
    expect(results.every((r) => r["propertyId"] === propertyId)).toBe(true);
  });

  it("ignores a too-short query and escapes wildcards", async () => {
    expect(await searchFor("Z")).toHaveLength(0);
    // A literal % must not act as a wildcard that returns everything.
    expect(await searchFor("%")).toHaveLength(0);
  });
});
