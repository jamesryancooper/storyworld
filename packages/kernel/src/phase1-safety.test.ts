import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { uuidv7 } from "@storyworld/domain";
import { createPool, migrate } from "@storyworld/persistence";
import { createFsStore } from "@storyworld/storage";
import type { Pool } from "pg";
import {
  AuthorityError,
  ConflictError,
  ValidationError,
  acceptAssetVersion,
  addNarrativeUnit,
  createProduction,
  createWorkspaceAndProperty,
  decideProposal,
  getNarrativeStructure,
  getReceipt,
  importAsset,
  proposeCanon,
  saveNarrativeStructure,
  sealNarrativeStructureDocument,
  snapshotCanonRelease,
  type KernelContext,
} from "./index.js";

/**
 * Phase 1 safety behavior (TASK-0016; DEC-0019/0020/0021/0023):
 * role-bound acceptance, contract-validated structure writes, explicit
 * supersession, complete-document preservation, the canon.release.created
 * receipt action, and contract-conformant approval-receipt documents.
 */

const url =
  process.env["DATABASE_URL"] ??
  "postgres://storyworld:storyworld-dev-only@localhost:5432/storyworld";
const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)), "..", "..", "persistence", "migrations",
);

let admin: Pool;
let ctx: KernelContext;
const org = uuidv7();
const ryan = { id: "ryan-cooper", kind: "human", role: "property_owner" } as const;
const intern = { id: "intern", kind: "human", role: "narrative_editor" } as const;
const model = { id: "extraction-model", kind: "model", role: "proposer" } as const;

let propertyId: string;
let officialBranchId: string;
let releaseId: string;
let productionId: string;

beforeAll(async () => {
  admin = createPool(url);
  await migrate(admin, migrationsDir);
  await admin.query(
    "INSERT INTO storyworld.organizations (organization_id, name) VALUES ($1,$2)",
    [org, "phase1-safety-org"],
  );
  ctx = {
    pool: createPool(url.replace(/\/\/[^@]+@/, "//storyworld_app:storyworld-dev-only@")),
    blobs: createFsStore(await mkdtemp(join(tmpdir(), "phase1-blobs-"))),
    organizationId: org,
  };
  const created = await createWorkspaceAndProperty(ctx, ryan, {
    workspaceName: "phase1-ws",
    propertyName: "Phase 1 Safety Property",
    propertyType: "fictional",
  });
  propertyId = created.propertyId;
  officialBranchId = created.officialBranchId;
  const proposal = await proposeCanon(ctx, model, {
    propertyId,
    branchId: officialBranchId,
    proposalType: "entity",
    payload: { entity_id: uuidv7(), entity_type: "character", name: "Ivo Lantern", visibility: "team_private" },
  });
  await decideProposal(ctx, ryan, { proposalId: proposal, decision: "accepted" });
  const release = await snapshotCanonRelease(ctx, ryan, {
    propertyId,
    branchId: officialBranchId,
    releaseName: "phase1-canon",
    releaseVersion: "1.0.0",
  });
  releaseId = release.canonReleaseId;
  productionId = (await createProduction(ctx, ryan, {
    propertyId,
    pinnedCanonReleaseId: releaseId,
    name: "Phase 1 Production",
  })).productionId;
});

afterAll(async () => {
  await ctx?.pool.end();
  await admin?.end();
});

function completeDocument(units: Record<string, unknown>[], extra: Record<string, unknown> = {}): Record<string, unknown> {
  return sealNarrativeStructureDocument({
    schema_version: "storyworld.narrative-structure.v1",
    structure_id: uuidv7(),
    property_id: propertyId,
    canon_release_ref: releaseId,
    production_ref: productionId,
    narrative_units: units,
    choices: [],
    branches: [],
    threads: [],
    ...extra,
  });
}

function unit(order: number, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    unit_id: uuidv7(),
    unit_type: "episode",
    display_number: String(order),
    presentation_order: order,
    story_time: `1989-06-0${order}`,
    publication_time: null,
    parent_unit_ref: null,
    ...overrides,
  };
}

describe("acceptance-class commands require the property_owner role (DEC-0021)", () => {
  it("refuses a human without the role, before any state change", async () => {
    const proposal = await proposeCanon(ctx, model, {
      propertyId,
      branchId: officialBranchId,
      proposalType: "fact",
      payload: { fact_id: uuidv7(), subject_ref: "entity:x", predicate: "p", value: { type: "text", content: "v" }, classification: "public" },
    });
    await expect(decideProposal(ctx, intern, { proposalId: proposal, decision: "accepted" }))
      .rejects.toThrow(AuthorityError);
    await expect(snapshotCanonRelease(ctx, intern, {
      propertyId, branchId: officialBranchId, releaseName: "x", releaseVersion: "9.9.9",
    })).rejects.toThrow(AuthorityError);
    await expect(addNarrativeUnit(ctx, intern, { productionId, unit: { unitType: "episode", presentationOrder: 99, storyTime: "1989-07-01" } }))
      .rejects.toThrow(AuthorityError);
    // The proposal remains undecided for the owner.
    const decided = await decideProposal(ctx, ryan, { proposalId: proposal, decision: "rejected" });
    expect(decided.receiptId).toBeTruthy();
  });
});

describe("structure writes are contract-validated (DEC-0020; SWUX-007)", () => {
  it("rejects the pre-Phase-1 reduced document shape", async () => {
    await expect(saveNarrativeStructure(ctx, ryan, {
      productionId,
      document: {
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: uuidv7(),
        narrative_units: [{ unit_id: uuidv7(), unit_type: "episode", presentation_order: 1, story_time: "1989-06-01" }],
        threads: [],
      },
    })).rejects.toThrow(ValidationError);
  });

  it("rejects unknown fields and a mismatched embedded hash", async () => {
    const sealed = completeDocument([unit(1)]);
    await expect(saveNarrativeStructure(ctx, ryan, {
      productionId,
      document: { ...sealed, surprise: true },
    })).rejects.toThrow(ValidationError);
    await expect(saveNarrativeStructure(ctx, ryan, {
      productionId,
      document: { ...sealed, content_sha256: "0".repeat(64) },
    })).rejects.toThrow(ValidationError);
  });

  it("enforces explicit supersession and preserves the full document on append", async () => {
    const choiceUnitA = unit(1, { temporal_marker: "linear" });
    const choiceUnitB = unit(2, { pov_entity_ref: "entity:ivo" });
    const choice = {
      choice_id: uuidv7(),
      at_unit_ref: String(choiceUnitA["unit_id"]),
      prompt: "Open the letter?",
      options: [
        { option_id: "open", label: "Open it", prerequisites: [], effects: [{ entity_ref: "entity:ivo", attribute: "knows_secret", to_value: true }], leads_to_unit_ref: String(choiceUnitB["unit_id"]), branch_label: "opened" },
        { option_id: "burn", label: "Burn it", prerequisites: [], effects: [], leads_to_unit_ref: String(choiceUnitB["unit_id"]), branch_label: "burned" },
      ],
    };
    const branches = [
      { branch_label: "opened", reconverges_at_unit_ref: String(choiceUnitB["unit_id"]), mutually_exclusive_with: ["burned"] },
      { branch_label: "burned", reconverges_at_unit_ref: String(choiceUnitB["unit_id"]), mutually_exclusive_with: ["opened"] },
    ];
    const threads = [
      { thread_id: uuidv7(), thread_type: "promise", introduced_in_unit_ref: String(choiceUnitA["unit_id"]), resolved_in_unit_ref: null, earliest_permitted_unit_ref: null, depends_on_thread_refs: [] },
    ];
    const full = completeDocument([choiceUnitA, choiceUnitB], { choices: [choice], branches, threads });
    const first = await saveNarrativeStructure(ctx, ryan, { productionId, document: full });

    // Stale supersession: absent and wrong bases are both refused.
    await expect(saveNarrativeStructure(ctx, ryan, { productionId, document: completeDocument([unit(3)]) }))
      .rejects.toThrow(ConflictError);
    await expect(addNarrativeUnit(ctx, ryan, {
      productionId,
      unit: { unitType: "episode", presentationOrder: 3, storyTime: "1989-06-03" },
      supersedesRevisionId: uuidv7(),
    })).rejects.toThrow(ConflictError);

    // Typed append: everything except the unit collection is preserved exactly.
    const appended = await addNarrativeUnit(ctx, ryan, {
      productionId,
      unit: { unitType: "episode", presentationOrder: 3, storyTime: "1989-06-03", displayNumber: "3" },
      supersedesRevisionId: first.structureRevisionId,
    });
    const head = await getNarrativeStructure(ctx, { productionId });
    expect(head?.structureRevisionId).toBe(appended.structureRevisionId);
    const document = head?.document as Record<string, unknown>;
    expect(document["choices"]).toEqual(full["choices"]);
    expect(document["branches"]).toEqual(full["branches"]);
    expect(document["threads"]).toEqual(full["threads"]);
    expect(document["property_id"]).toBe(propertyId);
    expect(document["canon_release_ref"]).toBe(releaseId);
    expect(document["production_ref"]).toBe(productionId);
    expect(document["structure_id"]).toBe(full["structure_id"]);
    const units = document["narrative_units"] as Record<string, unknown>[];
    expect(units).toHaveLength(3);
    expect(units.slice(0, 2)).toEqual(full["narrative_units"]);
    expect(units[2]?.["unit_id"]).toBe(appended.unitId);
    expect(units[2]?.["parent_unit_ref"]).toBeNull();
  });

  it("heals a legacy reduced head on the next typed append", async () => {
    const legacyProduction = (await createProduction(ctx, ryan, {
      propertyId,
      pinnedCanonReleaseId: releaseId,
      name: "Legacy Structure Production",
    })).productionId;
    const legacyRevisionId = uuidv7();
    const legacyUnitId = uuidv7();
    const legacyReceiptId = uuidv7();
    await admin.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [legacyReceiptId, org, "human:ryan-cooper", "structure.accepted", `structure:${legacyRevisionId}`, "0".repeat(64), uuidv7()],
    );
    await admin.query(
      "INSERT INTO storyworld.narrative_structures (structure_revision_id, organization_id, production_id, document, content_sha256, accepted_receipt_id) VALUES ($1,$2,$3,$4,$5,$6)",
      [legacyRevisionId, org, legacyProduction, JSON.stringify({
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: uuidv7(),
        narrative_units: [{ unit_id: legacyUnitId, unit_type: "episode", presentation_order: 1, story_time: "1989-06-01" }],
        threads: [],
      }), "0".repeat(64), legacyReceiptId],
    );
    const appended = await addNarrativeUnit(ctx, ryan, {
      productionId: legacyProduction,
      unit: { unitType: "episode", presentationOrder: 2, storyTime: "1989-06-02" },
      supersedesRevisionId: legacyRevisionId,
    });
    const head = await getNarrativeStructure(ctx, { productionId: legacyProduction });
    const document = head?.document as Record<string, unknown>;
    expect(head?.structureRevisionId).toBe(appended.structureRevisionId);
    expect(document["property_id"]).toBe(propertyId);
    expect(document["canon_release_ref"]).toBe(releaseId);
    expect(document["production_ref"]).toBe(legacyProduction);
    expect(document["choices"]).toEqual([]);
    const units = document["narrative_units"] as Record<string, unknown>[];
    expect(units[0]?.["unit_id"]).toBe(legacyUnitId);
    expect(units[0]?.["display_number"]).toBeNull();
    expect(units[0]?.["publication_time"]).toBeNull();
  });
});

describe("durable decision receipts (DEC-0019/0023)", () => {
  it("records canon.release.created with a contract-conformant approval document", async () => {
    const release = await snapshotCanonRelease(ctx, ryan, {
      propertyId,
      branchId: officialBranchId,
      releaseName: "phase1-canon-2",
      releaseVersion: "1.1.0",
      supersedesReleaseId: releaseId,
    });
    const receipt = await getReceipt(ctx, { receiptId: release.receiptId });
    expect(receipt?.action).toBe("canon.release.created");
    expect(receipt?.subjectSha256).toBe(release.contentSha256);
    const doc = receipt?.detail["approval_receipt"] as Record<string, unknown>;
    expect(doc["schema_version"]).toBe("storyworld.approval-receipt.v1");
    expect(doc["approval_layer"]).toBe("canon_approval");
    expect(doc["decision"]).toBe("approved");
    expect(doc["decided_by"]).toBe("ryan-cooper");
    expect(doc["decided_by_role"]).toBe("property_owner");
    expect(doc["authority_host"]).toBe("storyworld");
    expect(doc["subject_refs"]).toEqual([`canon-release:${release.canonReleaseId}`]);
    expect(doc["subject_sha256"]).toEqual([release.contentSha256]);
    expect(doc["policy_refs"]).toContain("DEC-0019");
  });

  it("returns the receipt id from a proposal decision and resolves it", async () => {
    const proposal = await proposeCanon(ctx, model, {
      propertyId,
      branchId: officialBranchId,
      proposalType: "entity",
      payload: { entity_id: uuidv7(), entity_type: "character", name: "Sela Whitmoor", visibility: "team_private" },
    });
    const decided = await decideProposal(ctx, ryan, { proposalId: proposal, decision: "accepted" });
    const receipt = await getReceipt(ctx, { receiptId: decided.receiptId });
    expect(receipt?.action).toBe("canon.proposal.accepted");
    const doc = receipt?.detail["approval_receipt"] as Record<string, unknown>;
    expect(doc["approval_layer"]).toBe("canon_approval");
    expect(doc["decided_by_role"]).toBe("property_owner");
  });

  it("returns null receipt for an unknown id", async () => {
    expect(await getReceipt(ctx, { receiptId: uuidv7() })).toBeNull();
  });

  it("records the identity source so a dev-header decision is not indistinguishable from verified (REV-0002 F6)", async () => {
    const proposal = await proposeCanon(ctx, model, {
      propertyId, branchId: officialBranchId, proposalType: "entity",
      payload: { entity_id: uuidv7(), entity_type: "character", name: "Orin", visibility: "team_private" },
    });
    const decided = await decideProposal(ctx, { ...ryan, identitySource: "dev_header" }, { proposalId: proposal, decision: "accepted" });
    const doc = (await getReceipt(ctx, { receiptId: decided.receiptId }))?.detail["approval_receipt"] as Record<string, unknown>;
    expect(doc["identity_source"]).toBe("dev_header");
  });

  it("keeps the structure column hash equal to the document's embedded hash (REV-0002 F8)", async () => {
    const proto = (await createProduction(ctx, ryan, {
      propertyId, pinnedCanonReleaseId: releaseId, name: "Hash Consistency Production",
    })).productionId;
    const appended = await addNarrativeUnit(ctx, ryan, {
      productionId: proto, unit: { unitType: "episode", presentationOrder: 1, storyTime: "1989-06-01" },
    });
    const head = await getNarrativeStructure(ctx, { productionId: proto });
    expect(head?.contentSha256).toBe(appended.contentSha256);
    expect(head?.document["content_sha256"]).toBe(appended.contentSha256);
  });
});

describe("asset acceptance is idempotent at the domain level (REV-0002 F3)", () => {
  it("refuses a second acceptance of the same candidate instead of forking accepted masters", async () => {
    const imported = await importAsset(ctx, ryan, {
      bytes: new TextEncoder().encode(`master-${uuidv7()}`), mediaType: "image/png",
    });
    const first = await acceptAssetVersion(ctx, ryan, { assetVersionId: imported.assetVersionId });
    expect(first.acceptedVersionId).toBeTruthy();
    await expect(acceptAssetVersion(ctx, ryan, { assetVersionId: imported.assetVersionId })).rejects.toThrow();
  });
});
