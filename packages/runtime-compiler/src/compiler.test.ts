import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import {
  createProduction,
  createWorkspaceAndProperty,
  decideProposal,
  importAsset,
  acceptAssetVersion,
  proposeCanon,
  snapshotCanonRelease,
  type KernelContext,
} from "@storyworld/kernel";
import type { Pool } from "pg";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);
import { compileRuntimeRelease, receiveRuntimeAcceptance, RuntimeValidationError } from "./compiler.js";

describe("B3 runtime compiler", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let productionId: string;
  let maraId: string;
  let archiveId: string;
  const org = uuidv7();
  const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;
  const TARGET = { runtime: "bekindrewind_runtime", target_version: "0.9", capability_requirements: ["dialogue", "missions"] };

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b3-rt-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b3-rt-blobs-"))),
      organizationId: org,
    };
    const { propertyId, officialBranchId } = await createWorkspaceAndProperty(ctx, ryan, {
      workspaceName: "rt-ws", propertyName: "rt-property", propertyType: "fictional",
    });
    maraId = uuidv7();
    archiveId = uuidv7();
    for (const [id, type, name] of [[maraId, "character", "Mara"], [archiveId, "location", "The Archive"]] as const) {
      const p = await proposeCanon(ctx, ryan, {
        propertyId, branchId: officialBranchId, proposalType: "entity",
        payload: { entity_id: id, entity_type: type, name, visibility: "team_private" },
      });
      await decideProposal(ctx, ryan, { proposalId: p, decision: "accepted", stableId: id });
    }
    const release = await snapshotCanonRelease(ctx, ryan, {
      propertyId, branchId: officialBranchId, releaseName: "rt-canon", releaseVersion: `1.0.${Date.now()}`,
    });
    productionId = await createProduction(ctx, ryan, {
      propertyId, pinnedCanonReleaseId: release.canonReleaseId, name: "rt-production",
    });
  });

  afterAll(async () => {
    await ctx?.pool.end();
    await admin?.end();
  });

  it("compiles canon + authored content into a deterministic runtime release", async () => {
    const missionA = uuidv7();
    const missionB = uuidv7();
    const authored = {
      missions: [
        { mission_id: missionA, name: "Find the ledger", prerequisites: [], authored_outcomes: ["found"], state_effects: ["ledger_found=true"] },
        { mission_id: missionB, name: "Decode the ledger", prerequisites: [missionA], authored_outcomes: ["decoded"], state_effects: ["ledger_decoded=true"] },
      ],
      sound_zones: [{ zone_id: uuidv7(), location_ref: archiveId, intent: "dust and paper", source_asset_refs: [] }],
    };
    const still = await importAsset(ctx, ryan, {
      bytes: new TextEncoder().encode(`master-${uuidv7()}`), mediaType: "image/png",
    });
    const accepted = await acceptAssetVersion(ctx, ryan, { assetVersionId: still.assetVersionId });
    const input = {
      productionId, target: TARGET, authored,
      assetVersionIds: [accepted.acceptedVersionId],
      compiledAt: "2026-07-29T00:00:00Z",
    };
    const first = await compileRuntimeRelease(ctx, input);
    const second = await compileRuntimeRelease(ctx, input);
    expect(first.sha256).toBe(second.sha256);
    expect(first.document["schema_version"]).toBe("storyworld.runtime-content-release.v1");
    const entities = first.document["entities"] as { entity_id: string }[];
    expect(entities.map((e) => e.entity_id)).toContain(maraId);
    const locations = first.document["locations"] as { location_id: string }[];
    expect(locations.map((l) => l.location_id)).toContain(archiveId);
    const assets = first.document["asset_index"] as { sha256: string }[];
    expect(assets).toHaveLength(1);
    expect(assets[0]?.sha256).toBe(still.sha256);

    const acceptance = await receiveRuntimeAcceptance(ctx, ryan, {
      releaseSha256: first.sha256, runtime: TARGET.runtime, receipt: { accepted: true },
    });
    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT detail FROM storyworld.audit_receipts WHERE receipt_id=$1", [acceptance.receiptId]));
    expect((receipts.rows[0]?.detail as Record<string, unknown>)["authority_host"]).toBe(TARGET.runtime);
  });

  it("refuses dangling references and circular missions", async () => {
    const a = uuidv7();
    const b = uuidv7();
    await expect(compileRuntimeRelease(ctx, {
      productionId, target: TARGET, compiledAt: "2026-07-29T00:00:00Z",
      authored: {
        missions: [
          { mission_id: a, name: "A", prerequisites: [b], authored_outcomes: ["done"], state_effects: [] },
          { mission_id: b, name: "B", prerequisites: [a], authored_outcomes: ["done"], state_effects: [] },
        ],
      },
    })).rejects.toThrow(RuntimeValidationError);
    await expect(compileRuntimeRelease(ctx, {
      productionId, target: TARGET, compiledAt: "2026-07-29T00:00:00Z",
      authored: { sound_zones: [{ zone_id: uuidv7(), location_ref: uuidv7(), intent: "void", source_asset_refs: [] }] },
    })).rejects.toThrow(/unknown location/);
  });
});
