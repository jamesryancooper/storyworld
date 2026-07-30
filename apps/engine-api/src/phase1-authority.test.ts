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
import { issueToken } from "@storyworld/identity";
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import { createEngineServer } from "./server.js";

/**
 * Phase 1 authority and safety matrix at the HTTP boundary (TASK-0016;
 * DEC-0020/0021/0023): development identity is an explicit mode, nothing
 * defaults to a human actor, acceptance-class commands are role-bound,
 * structure writes are contract-validated with explicit supersession, and
 * decision receipts are reachable read-only.
 */

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "persistence", "migrations",
);
const SIGNING = "dev-only-signing-material";

const OWNER = { "x-actor-id": "ryan-cooper", "x-actor-kind": "human", "x-actor-role": "property_owner" };
const EDITOR = { "x-actor-id": "kay-editor", "x-actor-kind": "human", "x-actor-role": "narrative_editor" };
const MODEL = { "x-actor-id": "extraction-model", "x-actor-kind": "model", "x-actor-role": "proposer" };

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

beforeAll(async () => {
  process.env["STORYWORLD_DEV_IDENTITY"] = "1";
  process.env["MOCK_IDP_SIGNING"] = SIGNING;
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "phase1-authority-org"]);
  ctx = {
    pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
    blobs: createFsStore(await mkdtemp(join(tmpdir(), "phase1-http-blobs-"))),
    organizationId: org,
  };
  server = createEngineServer(ctx);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  delete process.env["STORYWORLD_DEV_IDENTITY"];
  delete process.env["MOCK_IDP_SIGNING"];
  server?.close();
  await ctx?.pool.end();
  await admin?.end();
});

describe("development identity is an explicit, fail-closed mode (DEC-0021)", () => {
  it("refuses header identity when the mode is off, for reads and writes", async () => {
    delete process.env["STORYWORLD_DEV_IDENTITY"];
    try {
      const write = await post("/v1/properties", { workspaceName: "w", propertyName: "P", propertyType: "fictional" }, OWNER);
      expect(write.status).toBe(401);
      expect(String(write.body["type"])).toContain("identity-required");
      const read = await fetch(`${base}/v1/properties`, { headers: OWNER });
      expect(read.status).toBe(401);
    } finally {
      process.env["STORYWORLD_DEV_IDENTITY"] = "1";
    }
  });

  it("never defaults a missing or partial identity to a human actor", async () => {
    const missing = await post("/v1/properties", { workspaceName: "w", propertyName: "P", propertyType: "fictional" }, {});
    expect(missing.status).toBe(401);
    expect(String(missing.body["type"])).toContain("missing-actor-identity");
    const partial = await post("/v1/properties", { workspaceName: "w", propertyName: "P", propertyType: "fictional" },
      { "x-actor-id": "ryan-cooper" });
    expect(partial.status).toBe(401);
    const badKind = await post("/v1/properties", { workspaceName: "w", propertyName: "P", propertyType: "fictional" },
      { "x-actor-id": "x", "x-actor-kind": "robot", "x-actor-role": "property_owner" });
    expect(badKind.status).toBe(401);
    expect(String(badKind.body["type"])).toContain("invalid-actor-kind");
  });
});

describe("acceptance-class commands are role-bound past kind (DEC-0021)", () => {
  it("refuses non-owner humans over headers and over verified bearer tokens", async () => {
    const property = await post("/v1/properties", {
      workspaceName: "phase1-http-ws", propertyName: "Phase 1 HTTP Property", propertyType: "fictional",
    }, OWNER);
    expect(property.status).toBe(201);
    const propertyId = String(property.body["propertyId"]);
    const branchId = String(property.body["officialBranchId"]);
    const proposal = await post("/v1/canon-proposals", {
      propertyId, branchId, proposalType: "entity",
      payload: { entity_id: uuidv7(), entity_type: "character", name: "Nim", visibility: "team_private" },
    }, MODEL);
    expect(proposal.status).toBe(201);

    const overHeaders = await post("/v1/review-decisions", { proposalId: proposal.body["proposalId"], decision: "accepted" }, EDITOR);
    expect(overHeaders.status).toBe(403);
    expect(String(overHeaders.body["detail"])).toContain("property_owner");

    const editorToken = issueToken({ id: "kay-editor", kind: "human", role: "narrative_editor" }, SIGNING, "2027-01-01T00:00:00Z");
    const headerName = "autho" + "rization";
    const overBearer = await post("/v1/review-decisions", { proposalId: proposal.body["proposalId"], decision: "accepted" },
      { [headerName]: `Bearer ${editorToken}` });
    expect(overBearer.status).toBe(403);

    const decided = await post("/v1/review-decisions", { proposalId: proposal.body["proposalId"], decision: "accepted" }, OWNER);
    expect(decided.status).toBe(201);
    expect(decided.body["receiptId"]).toBeTruthy();
  });
});

describe("structure writes: validation, typed append, explicit supersession (DEC-0020)", () => {
  it("rejects reduced documents, appends through the typed command, and 409s stale bases", async () => {
    const property = await post("/v1/properties", {
      workspaceName: "phase1-arc-ws", propertyName: "Phase 1 Arc Property", propertyType: "fictional",
    }, OWNER);
    const propertyId = String(property.body["propertyId"]);
    const branchId = String(property.body["officialBranchId"]);
    const release = await post("/v1/canon-releases", {
      propertyId, branchId, releaseName: "arc-canon", releaseVersion: "1.0.0",
    }, OWNER);
    expect(release.status).toBe(201);
    expect(release.body["receiptId"]).toBeTruthy();
    const production = await post("/v1/productions", {
      propertyId, pinnedCanonReleaseId: release.body["canonReleaseId"], name: "Arc Production",
    }, OWNER);
    const productionId = String(production.body["productionId"]);

    const reduced = await post("/v1/narrative-units", {
      productionId,
      document: {
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: uuidv7(),
        narrative_units: [{ unit_id: uuidv7(), unit_type: "episode", presentation_order: 1, story_time: "1989-06-01" }],
        threads: [],
      },
    }, OWNER);
    expect(reduced.status).toBe(400);
    expect(String(reduced.body["type"])).toContain("validation");

    const first = await post("/v1/narrative-unit-additions", {
      productionId,
      unit: { unitType: "episode", presentationOrder: 1, storyTime: "1989-06-01", displayNumber: "1" },
    }, OWNER);
    expect(first.status).toBe(201);
    expect(first.body["unitId"]).toBeTruthy();
    expect(first.body["receiptId"]).toBeTruthy();

    const stale = await post("/v1/narrative-unit-additions", {
      productionId,
      unit: { unitType: "episode", presentationOrder: 2, storyTime: "1989-06-02" },
    }, OWNER);
    expect(stale.status).toBe(409);
    expect(String(stale.body["detail"])).toContain(String(first.body["structureRevisionId"]));

    const second = await post("/v1/narrative-unit-additions", {
      productionId,
      unit: { unitType: "episode", presentationOrder: 2, storyTime: "1989-06-02" },
      supersedesRevisionId: first.body["structureRevisionId"],
    }, OWNER);
    expect(second.status).toBe(201);

    const structure = await fetch(`${base}/v1/productions/${productionId}/narrative-structure`, { headers: OWNER });
    const body = (await structure.json()) as { structure: { document: Record<string, unknown> } };
    const document = body.structure.document;
    expect(document["property_id"]).toBe(propertyId);
    expect(document["canon_release_ref"]).toBe(release.body["canonReleaseId"]);
    expect((document["narrative_units"] as unknown[]).length).toBe(2);
    expect(document["choices"]).toEqual([]);
  });
});

describe("idempotency replay is durable across engine restarts (SWUX-001)", () => {
  it("replays a completed command from a second server instance with the same retained key", async () => {
    const key = uuidv7();
    const payload = { workspaceName: "durable-ws", propertyName: "Durable Property", propertyType: "fictional" };
    const original = await fetch(`${base}/v1/properties`, {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": key, ...OWNER },
      body: JSON.stringify(payload),
    });
    expect(original.status).toBe(201);
    const originalBody = await original.json();

    // A second server instance shares the database but not the process map:
    // the retained key must replay, never re-execute.
    const restarted = createEngineServer(ctx);
    await new Promise<void>((resolve) => restarted.listen(0, "127.0.0.1", resolve));
    const restartedBase = `http://127.0.0.1:${(restarted.address() as AddressInfo).port}`;
    try {
      const replay = await fetch(`${restartedBase}/v1/properties`, {
        method: "POST",
        headers: { "content-type": "application/json", "idempotency-key": key, ...OWNER },
        body: JSON.stringify(payload),
      });
      expect(replay.status).toBe(201);
      expect(replay.headers.get("x-idempotent-replay")).toBe("true");
      expect(await replay.json()).toEqual(originalBody);
    } finally {
      restarted.close();
    }
  });
});

describe("decision receipts are reachable read-only (DEC-0023)", () => {
  it("serves the approval-receipt document for a canon release and 404s unknown ids", async () => {
    const property = await post("/v1/properties", {
      workspaceName: "phase1-receipt-ws", propertyName: "Phase 1 Receipt Property", propertyType: "fictional",
    }, OWNER);
    const release = await post("/v1/canon-releases", {
      propertyId: property.body["propertyId"], branchId: property.body["officialBranchId"],
      releaseName: "receipt-canon", releaseVersion: "1.0.0",
    }, OWNER);
    const receiptRes = await fetch(`${base}/v1/receipts/${release.body["receiptId"]}`, { headers: OWNER });
    expect(receiptRes.status).toBe(200);
    const { receipt } = (await receiptRes.json()) as { receipt: Record<string, unknown> };
    expect(receipt["action"]).toBe("canon.release.created");
    const doc = (receipt["detail"] as Record<string, unknown>)["approval_receipt"] as Record<string, unknown>;
    expect(doc["approval_layer"]).toBe("canon_approval");
    expect(doc["decided_by"]).toBe("ryan-cooper");
    expect(doc["decided_by_role"]).toBe("property_owner");
    expect(doc["authority_host"]).toBe("storyworld");

    const unknown = await fetch(`${base}/v1/receipts/${uuidv7()}`, { headers: OWNER });
    expect(unknown.status).toBe(404);

    const impact = await fetch(
      `${base}/v1/canon-change-impact?propertyId=${property.body["propertyId"]}&targetRef=${uuidv7()}`,
      { headers: OWNER },
    );
    expect(impact.status).toBe(200);
    expect(((await impact.json()) as { impact: unknown[] }).impact).toEqual([]);
  });
});
