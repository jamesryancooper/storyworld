import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate, withTenant } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import type { Pool } from "pg";
import {
  createProduction,
  createWorkspaceAndProperty,
  decideProposal,
  importAsset,
  proposeCanon,
  saveNarrativeStructure,
  sealNarrativeStructureDocument,
  snapshotCanonRelease,
  type KernelContext,
} from "@storyworld/kernel";
import { disposeFinding, runEvaluation } from "./evaluate.js";

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);

const REQUIRED_KEYS = [
  "schema_version", "finding_id", "check_layer", "severity", "confidence",
  "description", "evidence_refs", "subject_refs", "subject_sha256",
  "suggested_remediation", "disposition", "disposition_receipt_ref", "found_at",
];

describe("B1 continuity evaluation", () => {
  let admin: Pool;
  let ctx: KernelContext;
  let productionId: string;
  let unitId: string;
  const org = uuidv7();
  const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;
  const agentActor = { id: "steward", kind: "service", role: "operator" } as const;

  beforeAll(async () => {
    admin = createPool(url);
    await migrate(admin, migrationsDir);
    await admin.query("INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)", [org, "b1-eval-org"]);
    ctx = {
      pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
      blobs: createFsStore(await mkdtemp(join(tmpdir(), "b1-eval-blobs-"))),
      organizationId: org,
    };
    const { propertyId, officialBranchId } = await createWorkspaceAndProperty(ctx, ryan, {
      workspaceName: "eval-ws", propertyName: "eval-property", propertyType: "fictional",
    });
    const maraId = uuidv7();
    const entity = await proposeCanon(ctx, ryan, {
      propertyId, branchId: officialBranchId, proposalType: "entity",
      payload: { entity_id: maraId, entity_type: "character", name: "Mara", visibility: "team_private" },
    });
    await decideProposal(ctx, ryan, { proposalId: entity, decision: "accepted", stableId: maraId });
    // Flaw 1 (structural): a transition referencing an entity canon does not contain.
    const dangling = await proposeCanon(ctx, ryan, {
      propertyId, branchId: officialBranchId, proposalType: "timeline_event",
      payload: {
        event_id: uuidv7(), story_time: "1989-06-02", summary: "dangling ref",
        state_transitions: [{ entity_ref: `entity:${uuidv7()}`, attribute: "mood", to_value: "grim" }],
      },
    });
    await decideProposal(ctx, ryan, { proposalId: dangling, decision: "accepted" });
    // Flaw 2 (temporal_state): contradictory values at the same story time.
    for (const value of ["scarred", "unmarked"]) {
      const p = await proposeCanon(ctx, ryan, {
        propertyId, branchId: officialBranchId, proposalType: "timeline_event",
        payload: {
          event_id: uuidv7(), story_time: "1989-06-03", summary: `sets ${value}`,
          state_transitions: [{ entity_ref: `entity:${maraId}`, attribute: "left_hand", to_value: value }],
        },
      });
      await decideProposal(ctx, ryan, { proposalId: p, decision: "accepted" });
    }
    const release = await snapshotCanonRelease(ctx, ryan, {
      propertyId, branchId: officialBranchId, releaseName: "eval-canon", releaseVersion: `1.0.${Date.now()}`,
    });
    productionId = (await createProduction(ctx, ryan, {
      propertyId, pinnedCanonReleaseId: release.canonReleaseId, name: "eval-production",
    })).productionId;
    unitId = uuidv7();
    // Unit precedes every timeline event (empty entering state -> narrative advisory);
    // thread resolves in a unit that does not exist (structural).
    await saveNarrativeStructure(ctx, ryan, {
      productionId,
      document: sealNarrativeStructureDocument({
        schema_version: "storyworld.narrative-structure.v1", structure_id: uuidv7(),
        property_id: propertyId,
        canon_release_ref: release.canonReleaseId,
        production_ref: productionId,
        narrative_units: [{ unit_id: unitId, unit_type: "episode", display_number: "1", presentation_order: 1, story_time: "1989-01-01", publication_time: null, parent_unit_ref: null }],
        choices: [],
        branches: [],
        threads: [{ thread_id: uuidv7(), thread_type: "mystery", introduced_in_unit_ref: unitId, resolved_in_unit_ref: uuidv7(), earliest_permitted_unit_ref: null, depends_on_thread_refs: [] }],
      }),
    });
  });

  afterAll(async () => {
    await ctx?.pool.end();
    await admin?.end();
  });

  it("deterministic and mock model layers emit persisted contract findings", async () => {
    const findings = await runEvaluation(ctx, ryan, { productionId, unitId });
    const layers = findings.map((f) => f.document["check_layer"]).sort();
    expect(layers).toEqual(["narrative", "structural", "structural", "temporal_state"]);
    const blocker = findings.find((f) => f.document["severity"] === "blocker");
    expect(blocker?.document["check_layer"]).toBe("temporal_state");
    expect(String(blocker?.document["description"])).toMatch(/Contradictory state/);
    for (const finding of findings) {
      for (const key of REQUIRED_KEYS) expect(finding.document).toHaveProperty(key);
      expect(finding.document["schema_version"]).toBe("storyworld.continuity-finding.v1");
      expect(finding.document["disposition"]).toBe("open");
      const rows = await withTenant(ctx.pool, org, (c) =>
        c.query("SELECT content_sha256 FROM storyworld.continuity_findings WHERE finding_id=$1", [finding.findingId]));
      expect(rows.rows[0]?.content_sha256).toBe(finding.sha256);
    }
    const receipts = await withTenant(ctx.pool, org, (c) =>
      c.query("SELECT count(*)::int AS n FROM storyworld.audit_receipts WHERE action='continuity.finding.recorded'"));
    expect(receipts.rows[0]?.n).toBeGreaterThanOrEqual(findings.length);
  });

  it("technical_media flags unsupported media and passes clean stills", async () => {
    const junk = await importAsset(ctx, ryan, {
      bytes: new TextEncoder().encode(`not-an-image-${uuidv7()}`), mediaType: "application/octet-stream",
    });
    const flagged = await runEvaluation(ctx, ryan, {
      productionId, unitId, assetVersionId: junk.assetVersionId, modelEvaluators: [],
    });
    const media = flagged.filter((f) => f.document["check_layer"] === "technical_media");
    expect(media).toHaveLength(1);
    expect(media[0]?.document["severity"]).toBe("major");

    const still = await importAsset(ctx, ryan, {
      bytes: new TextEncoder().encode(`png-bytes-${uuidv7()}`), mediaType: "image/png",
    });
    const clean = await runEvaluation(ctx, ryan, {
      productionId, unitId, assetVersionId: still.assetVersionId, modelEvaluators: [],
    });
    expect(clean.filter((f) => f.document["check_layer"] === "technical_media")).toHaveLength(0);
  });

  it("disposition is a human decision recorded as an append-only revision", async () => {
    const findings = await runEvaluation(ctx, ryan, { productionId, unitId, modelEvaluators: [] });
    const target = findings[0]!;
    await expect(disposeFinding(ctx, agentActor, { findingId: target.findingId, disposition: "resolved" }))
      .rejects.toThrow(/human/i);
    await expect(disposeFinding(ctx, ryan, { findingId: target.findingId, disposition: "waived" }))
      .rejects.toThrow(/waiver/);
    // Empty or whitespace rationale/scope is refused — a waiver is the
    // reviewer's own statement, never a filled-in default (SWUX-003).
    await expect(disposeFinding(ctx, ryan, {
      findingId: target.findingId, disposition: "intentional_exception",
      waiver: { reason: "  ", scope: "", expiry: null },
    })).rejects.toThrow(/reviewer-authored/);
    const disposed = await disposeFinding(ctx, ryan, {
      findingId: target.findingId, disposition: "waived",
      waiver: { reason: "intentional era inconsistency", scope: "this production", expiry: null },
    });
    const revisions = await withTenant(ctx.pool, org, (c) =>
      c.query(
        "SELECT disposition, document, supersedes_revision_id FROM storyworld.continuity_findings WHERE finding_id=$1 ORDER BY created_at",
        [target.findingId],
      ));
    expect(revisions.rows).toHaveLength(2);
    expect(revisions.rows[1]?.disposition).toBe("waived");
    expect(revisions.rows[1]?.supersedes_revision_id).toBe(target.findingRevisionId);
    const doc = revisions.rows[1]?.document as Record<string, unknown>;
    expect(doc["disposition_receipt_ref"]).toBe(`receipt:${disposed.receiptId}`);
    expect((doc["waiver"] as Record<string, unknown>)["reason"]).toBe("intentional era inconsistency");
  });
});
