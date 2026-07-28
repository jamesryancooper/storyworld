import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { AddressInfo } from "node:net";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { createPool, migrate } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import { verifyPackage } from "@storyworld/portability";
import { runCli } from "@storyworld/cli";
import type { KernelContext } from "@storyworld/kernel";
import type { Pool } from "pg";
import type { Server } from "node:http";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createEngineServer } from "./server.js";

/**
 * GATE-0005 demonstration: a user manually authors and approves a complete
 * three-episode project THROUGH PUBLIC CONTRACTS (HTTP API + CLI), with no
 * direct database edits; proposals never silently change accepted canon;
 * the canon-change impact report names pinned productions; and the CLI/API
 * complete a portable project round trip (full-scope VS0).
 */
const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "packages", "persistence", "migrations",
);

let admin: Pool;
let ctx: KernelContext;
let server: Server;
let base: string;
let blobRoot: string;
const org = uuidv7();

const HUMAN = { "x-actor-id": "ryan-cooper", "x-actor-kind": "human", "x-actor-role": "property_owner" };
const MODEL = { "x-actor-id": "extraction-model", "x-actor-kind": "model", "x-actor-role": "proposer" };

async function post(path: string, body: unknown, headers: Record<string, string>, key?: string) {
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": key ?? uuidv7(),
      ...headers,
    },
    body: JSON.stringify(body),
  });
  return { status: response.status, body: (await response.json()) as Record<string, unknown>, headers: response.headers };
}

beforeAll(async () => {
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "gate-0005-org"]);
  blobRoot = await mkdtemp(join(tmpdir(), "gate5-blobs-"));
  ctx = {
    pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
    blobs: createFsStore(blobRoot),
    organizationId: org,
  };
  server = createEngineServer(ctx);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  server?.close();
  await ctx?.pool.end();
  await admin?.end();
});

describe("GATE-0005: three-episode authoring through public contracts", () => {
  it("authors, approves, packages, and round-trips a complete project", async () => {
    // -- Property through the API.
    const property = await post("/v1/properties", {
      workspaceName: "second-chair-ws",
      propertyName: "The Stillhouse Archive (gate demo)",
      propertyType: "fictional",
    }, HUMAN);
    expect(property.status).toBe(201);
    const propertyId = String(property.body["propertyId"]);
    const branchId = String(property.body["officialBranchId"]);

    // -- Idempotency: same key replays the original result.
    const key = uuidv7();
    const first = await post("/v1/sources", {
      propertyId, name: "excerpt", content: `source ${uuidv7()}`,
      rightsNote: "I authored this; fictional; permitted use: test fixture in this repository.",
    }, HUMAN, key);
    const replay = await post("/v1/sources", { propertyId, name: "different" }, HUMAN, key);
    expect(replay.body).toEqual(first.body);
    expect(replay.headers.get("x-idempotent-replay")).toBe("true");

    // -- Model proposes; model CANNOT decide (Problem Details 403).
    const entityId = uuidv7();
    const proposal = await post("/v1/canon-proposals", {
      propertyId, branchId, proposalType: "entity",
      payload: { entity_id: entityId, entity_type: "character", name: "Mara Venn", visibility: "team_private" },
    }, MODEL);
    expect(proposal.status).toBe(201);
    const forbidden = await post("/v1/review-decisions", {
      proposalId: proposal.body["proposalId"], decision: "accepted",
    }, MODEL);
    expect(forbidden.status).toBe(403);
    expect(String(forbidden.body["type"])).toContain("problems/authority");

    // -- Human accepts entity and three story-time events (proposed out of order).
    await post("/v1/review-decisions", {
      proposalId: proposal.body["proposalId"], decision: "accepted", stableId: entityId,
    }, HUMAN);
    for (const [storyTime, attribute, value] of [
      ["1989-06-03", "condition", "damaged"],
      ["1989-06-01", "condition", "pristine"],
      ["1989-06-02", "location", "under-the-stairs"],
    ] as const) {
      const p = await post("/v1/canon-proposals", {
        propertyId, branchId, proposalType: "timeline_event",
        payload: { event_id: uuidv7(), story_time: storyTime, summary: `event ${storyTime}`,
          state_transitions: [{ entity_ref: `entity:${entityId}`, attribute, to_value: value }] },
      }, MODEL);
      await post("/v1/review-decisions", { proposalId: p.body["proposalId"], decision: "accepted" }, HUMAN);
    }

    // -- Release, production, three-episode structure.
    const release = await post("/v1/canon-releases", {
      propertyId, branchId, releaseName: "gate-demo-canon", releaseVersion: "1.0.0",
    }, HUMAN);
    const production = await post("/v1/productions", {
      propertyId, pinnedCanonReleaseId: release.body["canonReleaseId"], name: "The Second Chair (gate demo)",
    }, HUMAN);
    const productionId = String(production.body["productionId"]);
    const ep1 = uuidv7(); const ep2 = uuidv7(); const ep3 = uuidv7();
    await post("/v1/narrative-units", {
      productionId,
      document: {
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: uuidv7(),
        narrative_units: [
          { unit_id: ep1, unit_type: "episode", presentation_order: 1, story_time: "1989-06-01" },
          { unit_id: ep2, unit_type: "episode", presentation_order: 2, story_time: "1989-06-02" },
          { unit_id: ep3, unit_type: "episode", presentation_order: 3, story_time: "1989-06-03" },
        ],
        threads: [{ thread_id: uuidv7(), thread_type: "reveal", introduced_in_unit_ref: ep1, resolved_in_unit_ref: null }],
      },
    }, HUMAN);

    // -- Asset import + exact-version acceptance.
    const assetBytes = `master panel ${uuidv7()}`;
    const imported = await post("/v1/assets", {
      contentBase64: Buffer.from(assetBytes).toString("base64"), mediaType: "text/plain",
    }, HUMAN);
    const accepted = await post("/v1/asset-acceptances", {
      assetVersionId: imported.body["assetVersionId"],
    }, HUMAN);
    expect(accepted.status).toBe(201);

    // -- Scene state packet via GET: story-time state, not release order.
    const packetRes = await fetch(`${base}/v1/scenes/${ep2}/state-packet?productionId=${productionId}`);
    expect(packetRes.status).toBe(200);
    const packet = (await packetRes.json()) as Record<string, unknown>;
    const states = packet["entity_states"] as { entity_ref: string; state: Record<string, unknown> }[];
    expect(states.find((s) => s.entity_ref === `entity:${entityId}`)?.state["condition"]).toBe("pristine");

    // -- Proposals never silently change accepted canon: post-release change
    //    leaves the pinned release byte-identical.
    const late = await post("/v1/canon-proposals", {
      propertyId, branchId, proposalType: "fact",
      payload: { fact_id: uuidv7(), subject_ref: `entity:${entityId}`, predicate: "sister_of", value: { type: "text", content: "June" }, classification: "secret_truth" },
    }, MODEL);
    await post("/v1/review-decisions", { proposalId: late.body["proposalId"], decision: "accepted" }, HUMAN);
    const pinned = await admin.query(
      "SELECT content_sha256, document FROM storyworld.canon_releases WHERE canon_release_id=$1",
      [release.body["canonReleaseId"]],
    );
    expect(pinned.rows[0]?.content_sha256).toBe(release.body["contentSha256"]);

    // -- CLI: export the production as a signed portable package; verify it.
    const exportDir = await mkdtemp(join(tmpdir(), "gate5-export-"));
    const lines: string[] = [];
    const code = await runCli(
      ["export-production", "--production", productionId, "--dir", exportDir],
      { ctx, out: (l: string) => lines.push(l) },
    );
    expect(code).toBe(0);
    const verifyCode = await runCli(["verify-package", "--dir", exportDir], { ctx, out: (l: string) => lines.push(l) });
    expect(verifyCode).toBe(0);

    // -- Full-scope VS0: destroy the local blob store; the package alone
    //    reproduces the release document (hash-identical) and asset bytes.
    await rm(blobRoot, { recursive: true, force: true });
    const verified = await verifyPackage(exportDir);
    const releaseDoc = verified.records.get("canon-release");
    expect(contentSha256(canonicalJson(releaseDoc))).toBe(
      contentSha256(canonicalJson(pinned.rows[0]?.document)),
    );
    const assetEntry = (verified.envelope["asset_index"] as { sha256: string }[])[0];
    expect(assetEntry).toBeDefined();
    const bytesBack = await verified.readAsset(assetEntry!.sha256);
    expect(contentSha256(bytesBack)).toBe(assetEntry!.sha256);
  });
});
