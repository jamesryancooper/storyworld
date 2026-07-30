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
 * Queued Arc authoring mode and structure proposals (DEC-0020; TASK-0017)
 * at the HTTP boundary: the per-property mode toggle, mode-mismatch guards,
 * queued submit -> review -> accept, and moved-base reconciliation.
 */

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "persistence", "migrations",
);

const OWNER = { "x-actor-id": "ryan-cooper", "x-actor-kind": "human", "x-actor-role": "property_owner" };
const EDITOR = { "x-actor-id": "kay-editor", "x-actor-kind": "human", "x-actor-role": "narrative_editor" };

let admin: Pool;
let ctx: KernelContext;
let server: Server;
let base: string;
const org = uuidv7();

async function post(path: string, body: unknown, headers: Record<string, string>) {
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "idempotency-key": uuidv7(), ...headers },
    body: JSON.stringify(body),
  });
  return { status: response.status, body: (await response.json()) as Record<string, unknown> };
}
async function get(path: string, headers: Record<string, string>) {
  const response = await fetch(`${base}${path}`, { headers });
  return { status: response.status, body: (await response.json()) as Record<string, unknown> };
}

let propertyId: string;
let branchId: string;
let productionId: string;

beforeAll(async () => {
  process.env["STORYWORLD_DEV_IDENTITY"] = "1";
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "queued-authoring-org"]);
  ctx = {
    pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
    blobs: createFsStore(await mkdtemp(join(tmpdir(), "queued-blobs-"))),
    organizationId: org,
  };
  server = createEngineServer(ctx);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

  const property = await post("/v1/properties", { workspaceName: "q-ws", propertyName: "Queued Property", propertyType: "fictional" }, OWNER);
  propertyId = String(property.body["propertyId"]);
  branchId = String(property.body["officialBranchId"]);
  const release = await post("/v1/canon-releases", { propertyId, branchId, releaseName: "q-canon", releaseVersion: "1.0.0" }, OWNER);
  productionId = String((await post("/v1/productions", { propertyId, pinnedCanonReleaseId: release.body["canonReleaseId"], name: "Queued Production" }, OWNER)).body["productionId"]);
});

afterAll(async () => {
  delete process.env["STORYWORLD_DEV_IDENTITY"];
  server?.close();
  await ctx?.pool.end();
  await admin?.end();
});

describe("authoring mode toggle (DEC-0020)", () => {
  it("defaults to direct, flips only for the owner, and receipts the change", async () => {
    const initial = await get(`/v1/properties/${propertyId}/authoring-mode`, OWNER);
    expect(initial.body["mode"]).toBe("direct");

    const byEditor = await post("/v1/authoring-modes", { propertyId, mode: "queued" }, EDITOR);
    expect(byEditor.status).toBe(403);

    const flip = await post("/v1/authoring-modes", { propertyId, mode: "queued" }, OWNER);
    expect(flip.status).toBe(201);
    expect(flip.body["mode"]).toBe("queued");
    expect(flip.body["from"]).toBe("direct");
    const receipt = await get(`/v1/receipts/${flip.body["receiptId"]}`, OWNER);
    expect((receipt.body["receipt"] as Record<string, unknown>)["action"]).toBe("structure.authoring_mode.changed");
    const detail = (receipt.body["receipt"] as { detail: Record<string, unknown> }).detail;
    expect(detail["from"]).toBe("direct");
    expect(detail["to"]).toBe("queued");
    expect(detail["decided_by_role"]).toBe("property_owner");
    expect(await get(`/v1/properties/${propertyId}/authoring-mode`, OWNER).then((r) => r.body["mode"])).toBe("queued");
  });
});

describe("mode-mismatch guards and the queued proposal lifecycle (DEC-0020)", () => {
  it("refuses a direct save in queued mode, submits/reviews/accepts, and reconciles a moved base", async () => {
    // The property is queued (from the previous test's flip). A direct save
    // must be refused, preserving the mode boundary.
    const directInQueued = await post("/v1/narrative-unit-additions", {
      productionId, unit: { unitType: "episode", presentationOrder: 1, storyTime: "1989-06-01" },
    }, OWNER);
    expect(directInQueued.status).toBe(409);
    expect(String(directInQueued.body["detail"])).toContain("queued");

    // Queued submit creates a pending proposal and changes no accepted structure.
    const submit = await post("/v1/structure-proposals", {
      productionId, unit: { unitType: "episode", presentationOrder: 1, storyTime: "1989-06-01" },
    }, OWNER);
    expect(submit.status).toBe(201);
    expect(submit.body["proposalId"]).toBeTruthy();
    const beforeAccept = await get(`/v1/productions/${productionId}/narrative-structure`, OWNER);
    expect(beforeAccept.body["structure"]).toBeNull();

    // It appears in the property's structure-proposal queue as pending.
    const queue = await get(`/v1/structure-proposals?propertyId=${propertyId}`, OWNER);
    const pending = (queue.body["proposals"] as Record<string, unknown>[]).filter((p) => p["decision"] === null);
    expect(pending.map((p) => p["proposalId"])).toContain(submit.body["proposalId"]);

    // Accepting applies it as an accepted structure revision with a receipt.
    const accept = await post("/v1/structure-proposal-decisions", { proposalId: submit.body["proposalId"], decision: "accepted" }, OWNER);
    expect(accept.status).toBe(201);
    expect(accept.body["appliedRevisionId"]).toBeTruthy();
    expect(accept.body["receiptId"]).toBeTruthy();
    const afterAccept = await get(`/v1/productions/${productionId}/narrative-structure`, OWNER);
    const head = afterAccept.body["structure"] as Record<string, unknown>;
    expect(head["structureRevisionId"]).toBe(accept.body["appliedRevisionId"]);
    expect((head["document"] as Record<string, unknown[]>)["narrative_units"]).toHaveLength(1);

    // Double-decide is a typed conflict, not a 500.
    const again = await post("/v1/structure-proposal-decisions", { proposalId: submit.body["proposalId"], decision: "accepted" }, OWNER);
    expect(again.status).toBe(409);
    expect(String(again.body["type"])).not.toContain("internal");

    // Moved base: two proposals off the same head; accept the first (head
    // advances), then the second must fail closed and stay preserved.
    const s1 = await post("/v1/structure-proposals", { productionId, unit: { unitType: "episode", presentationOrder: 2, storyTime: "1989-06-02" }, supersedesRevisionId: accept.body["appliedRevisionId"] }, OWNER);
    const s2 = await post("/v1/structure-proposals", { productionId, unit: { unitType: "episode", presentationOrder: 3, storyTime: "1989-06-03" }, supersedesRevisionId: accept.body["appliedRevisionId"] }, OWNER);
    const a1 = await post("/v1/structure-proposal-decisions", { proposalId: s1.body["proposalId"], decision: "accepted" }, OWNER);
    expect(a1.status).toBe(201);
    const a2 = await post("/v1/structure-proposal-decisions", { proposalId: s2.body["proposalId"], decision: "accepted" }, OWNER);
    expect(a2.status).toBe(409);
    expect(String(a2.body["detail"])).toContain("base");
    // The stale proposal is preserved (still pending in the queue).
    const queue2 = await get(`/v1/structure-proposals?propertyId=${propertyId}`, OWNER);
    const stillPending = (queue2.body["proposals"] as Record<string, unknown>[]).find((p) => p["proposalId"] === s2.body["proposalId"]);
    expect(stillPending?.["decision"]).toBeNull();
  });

  it("refuses a queued submit once the property returns to direct mode", async () => {
    const back = await post("/v1/authoring-modes", { propertyId, mode: "direct" }, OWNER);
    expect(back.status).toBe(201);
    const submitInDirect = await post("/v1/structure-proposals", {
      productionId, unit: { unitType: "episode", presentationOrder: 9, storyTime: "1989-07-01" },
    }, OWNER);
    expect(submitInDirect.status).toBe(409);
    expect(String(submitInDirect.body["detail"])).toContain("direct");
  });
});
