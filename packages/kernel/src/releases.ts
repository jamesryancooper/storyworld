import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import type { PoolClient } from "pg";
import { requireOwner, ConflictError, NotFoundError, ValidationError, type Actor } from "./actors.js";
import { currentCanon, type KernelContext } from "./commands.js";
import { approvalReceiptDetail } from "./receipts.js";
import { sealNarrativeStructureDocument, validateNarrativeStructureDocument } from "./narrative-structure.js";

/**
 * Snapshot the branch's current working canon into an immutable
 * canon-release document conforming to the F1 contract shape, hash it with
 * the shared canonical form, and store it append-only (ADR-0009).
 * Creating a canon release is an internal snapshot act (DEC-0019): the
 * receipt action is canon.release.created and never implies publication.
 */
export async function snapshotCanonRelease(
  ctx: KernelContext,
  actor: Actor,
  input: {
    propertyId: string;
    branchId: string;
    releaseName: string;
    releaseVersion: string;
    supersedesReleaseId?: string;
  },
): Promise<{ canonReleaseId: string; contentSha256: string; receiptId: string }> {
  requireOwner(actor, "canon release");
  const canon = await currentCanon(ctx, input.branchId);
  const canonReleaseId = uuidv7();
  const receiptId = uuidv7();
  const document: Record<string, unknown> = {
    schema_version: "storyworld.canon-release.v1",
    canon_release_id: canonReleaseId,
    property_id: input.propertyId,
    branch: "official",
    release_name: input.releaseName,
    release_version: input.releaseVersion,
    created_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    accepted_by_receipt_ref: receiptId,
    supersedes_ref: input.supersedesReleaseId ?? null,
    facts: canon.filter((r) => r.concern === "fact").map((r) => r.payload),
    entities: canon.filter((r) => r.concern === "entity").map((r) => r.payload),
    relationships: canon.filter((r) => r.concern === "relationship").map((r) => r.payload),
    timeline_events: canon.filter((r) => r.concern === "timeline_event").map((r) => r.payload),
    reference_pack_refs: [],
    content_sha256: "0".repeat(64),
  };
  const { content_sha256: _omitted, ...unsigned } = document;
  const hash = contentSha256(canonicalJson(unsigned));
  document["content_sha256"] = hash;
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "canon.release.created", `canon-release:${canonReleaseId}`, hash, uuidv7(),
       JSON.stringify(approvalReceiptDetail({
         receiptId,
         layer: "canon_approval",
         decision: "approved",
         subjectRefs: [`canon-release:${canonReleaseId}`],
         subjectSha256: [hash],
         policyRefs: ["DEC-0019", "DEC-0021", "DEC-0023"],
         actor,
         context: { release_version: input.releaseVersion, external_publication: "not implied; publication is a separately authorized authority-host action" },
       }))],
    );
    await c.query(
      "INSERT INTO storyworld.canon_releases (canon_release_id, organization_id, property_id, branch_id, release_name, release_version, document, content_sha256, accepted_receipt_id, supersedes_release_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [canonReleaseId, ctx.organizationId, input.propertyId, input.branchId, input.releaseName, input.releaseVersion, JSON.stringify(document), hash, receiptId, input.supersedesReleaseId ?? null],
    );
  });
  return { canonReleaseId, contentSha256: hash, receiptId };
}

export async function createProduction(
  ctx: KernelContext,
  actor: Actor,
  input: { propertyId: string; pinnedCanonReleaseId: string; name: string; authorityHost?: string },
): Promise<{ productionId: string; receiptId: string }> {
  requireOwner(actor, "production creation");
  const productionId = uuidv7();
  const receiptId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const release = (await c.query(
      "SELECT content_sha256 FROM storyworld.canon_releases WHERE canon_release_id=$1",
      [input.pinnedCanonReleaseId],
    )).rows[0];
    if (!release) {
      throw new ValidationError(`canon release ${input.pinnedCanonReleaseId} not found; a production pins an exact existing release`);
    }
    const releaseHash = String(release.content_sha256);
    await c.query(
      "INSERT INTO storyworld.productions (production_id, organization_id, property_id, pinned_canon_release_id, name, authority_host) VALUES ($1,$2,$3,$4,$5,$6)",
      [productionId, ctx.organizationId, input.propertyId, input.pinnedCanonReleaseId, input.name, input.authorityHost ?? "storyworld"],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "production.pinned", `production:${productionId}`, releaseHash, uuidv7(),
       JSON.stringify(approvalReceiptDetail({
         receiptId,
         layer: "creative_plan_approval",
         decision: "approved",
         subjectRefs: [`production:${productionId}`, `canon-release:${input.pinnedCanonReleaseId}`],
         subjectSha256: [releaseHash],
         policyRefs: ["DEC-0019", "DEC-0021", "DEC-0023"],
         actor,
         context: { pinned_canon_release_id: input.pinnedCanonReleaseId },
       }))],
    );
  });
  return { productionId, receiptId };
}

/** Per-property Arc authoring mode (DEC-0020). Default is direct. */
export type AuthoringMode = "direct" | "queued";

async function authoringModeFor(c: PoolClient, propertyId: string): Promise<AuthoringMode> {
  const row = (await c.query(
    "SELECT mode FROM storyworld.property_authoring_modes WHERE property_id=$1",
    [propertyId],
  )).rows[0];
  return (row?.mode as AuthoringMode) ?? "direct";
}

/**
 * Assert a production's property is in the expected authoring mode
 * (DEC-0020 mode-mismatch guard) and return its property id. A direct save
 * in queued mode, or a queued submit in direct mode, fails closed so the
 * client re-reads the mode instead of writing under a stale assumption.
 */
async function requireMode(c: PoolClient, productionId: string, expected: AuthoringMode): Promise<string> {
  const prod = (await c.query(
    "SELECT property_id FROM storyworld.productions WHERE production_id=$1",
    [productionId],
  )).rows[0];
  if (!prod) throw new ValidationError(`production ${productionId} not found`);
  const mode = await authoringModeFor(c, String(prod.property_id));
  if (mode !== expected) {
    throw new ConflictError(
      expected === "direct"
        ? "this property is in queued authoring mode; submit the structure change for review instead of saving it directly"
        : "this property is in direct authoring mode; save the structure change directly instead of submitting it for review",
    );
  }
  return String(prod.property_id);
}

export async function getAuthoringMode(
  ctx: KernelContext,
  input: { propertyId: string },
): Promise<{ mode: AuthoringMode }> {
  return withTenant(ctx.pool, ctx.organizationId, async (c) => ({
    mode: await authoringModeFor(c, input.propertyId),
  }));
}

/** Change a property's authoring mode (DEC-0020). property_owner only; receipted. */
export async function setAuthoringMode(
  ctx: KernelContext,
  actor: Actor,
  input: { propertyId: string; mode: AuthoringMode },
): Promise<{ mode: AuthoringMode; from: AuthoringMode; receiptId: string }> {
  requireOwner(actor, "authoring-mode change");
  if (input.mode !== "direct" && input.mode !== "queued") {
    throw new ValidationError(`unknown authoring mode "${String(input.mode)}"`);
  }
  const receiptId = uuidv7();
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const prop = (await c.query(
      "SELECT property_id FROM storyworld.properties WHERE property_id=$1",
      [input.propertyId],
    )).rows[0];
    if (!prop) throw new NotFoundError(`property ${input.propertyId} not found`);
    const from = await authoringModeFor(c, input.propertyId);
    await c.query(
      "INSERT INTO storyworld.property_authoring_modes (property_id, organization_id, mode, updated_at) VALUES ($1,$2,$3, now()) ON CONFLICT (property_id) DO UPDATE SET mode=$3, updated_at=now()",
      [input.propertyId, ctx.organizationId, input.mode],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,NULL,$6,$7)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "structure.authoring_mode.changed", `property:${input.propertyId}`, uuidv7(),
       JSON.stringify({ property_id: input.propertyId, from, to: input.mode, decided_by: actor.id, decided_by_role: actor.role })],
    );
    return { mode: input.mode, from, receiptId };
  });
}

interface StructureHead {
  structureRevisionId: string;
  document: Record<string, unknown>;
}

async function structureHead(c: PoolClient, productionId: string): Promise<StructureHead | null> {
  const row = (await c.query(
    `SELECT s.structure_revision_id AS "structureRevisionId", s.document
       FROM storyworld.narrative_structures s
      WHERE s.production_id=$1
        AND NOT EXISTS (SELECT 1 FROM storyworld.narrative_structures t
                         WHERE t.supersedes_revision_id = s.structure_revision_id)`,
    [productionId],
  )).rows[0];
  return row ? { structureRevisionId: String(row.structureRevisionId), document: row.document as Record<string, unknown> } : null;
}

/**
 * Explicit supersession (DEC-0020): a structure write must name the exact
 * revision it replaces. A stale or missing base is a ConflictError so the
 * client can reconcile without losing the creator's input.
 */
function requireCurrentBase(head: StructureHead | null, supersedesRevisionId: string | undefined, productionId: string): void {
  if (head && supersedesRevisionId !== head.structureRevisionId) {
    throw new ConflictError(
      `stale supersession for production ${productionId}: current structure revision is ${head.structureRevisionId}` +
        (supersedesRevisionId ? `, not ${supersedesRevisionId}` : ", but no supersedesRevisionId was named") +
        "; reload the current structure and re-apply the change",
    );
  }
  if (!head && supersedesRevisionId) {
    throw new ConflictError(
      `stale supersession for production ${productionId}: no structure revision exists yet, but ${supersedesRevisionId} was named`,
    );
  }
}

async function insertStructureRevision(
  c: PoolClient,
  ctx: KernelContext,
  actor: Actor,
  productionId: string,
  document: Record<string, unknown>,
  supersedesRevisionId: string | undefined,
): Promise<{ structureRevisionId: string; contentSha256: string; receiptId: string }> {
  const structureRevisionId = uuidv7();
  const receiptId = uuidv7();
  // Use the document's own embedded content hash (computed over the document
  // without its content_sha256 field) so the stored column, the receipt
  // subject hash, and the embedded hash all agree (REV-0002 F8), matching the
  // canon-release convention. Callers always pass a sealed/validated document.
  const hash = String(document["content_sha256"]);
  await c.query(
    "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "structure.accepted", `structure:${structureRevisionId}`, hash, uuidv7(),
     JSON.stringify(approvalReceiptDetail({
       receiptId,
       layer: "creative_plan_approval",
       decision: "approved",
       subjectRefs: [`structure:${structureRevisionId}`, `production:${productionId}`],
       subjectSha256: [hash],
       policyRefs: ["DEC-0020", "DEC-0021", "DEC-0023"],
       actor,
       context: { supersedes_revision_id: supersedesRevisionId ?? null },
     }))],
  );
  await c.query(
    "INSERT INTO storyworld.narrative_structures (structure_revision_id, organization_id, production_id, document, content_sha256, supersedes_revision_id, accepted_receipt_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [structureRevisionId, ctx.organizationId, productionId, JSON.stringify(document), hash, supersedesRevisionId ?? null, receiptId],
  );
  return { structureRevisionId, contentSha256: hash, receiptId };
}

/**
 * Store a complete narrative-structure document as a new accepted
 * revision. The document must conform to the contract (DEC-0020;
 * SWUX-007) and must name the exact revision it supersedes. Direct-mode
 * only: a property in queued mode routes through the proposal path.
 */
export async function saveNarrativeStructure(
  ctx: KernelContext,
  actor: Actor,
  input: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string },
): Promise<{ structureRevisionId: string; contentSha256: string; receiptId: string }> {
  requireOwner(actor, "structure acceptance");
  validateNarrativeStructureDocument(input.document);
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await requireMode(c, input.productionId, "direct");
    const head = await structureHead(c, input.productionId);
    requireCurrentBase(head, input.supersedesRevisionId, input.productionId);
    return insertStructureRevision(c, ctx, actor, input.productionId, input.document, input.supersedesRevisionId);
  });
}

export interface NarrativeUnitInput {
  unitType: string;
  presentationOrder: number;
  storyTime: string;
  displayNumber?: string | null;
  publicationTime?: string | null;
  parentUnitRef?: string | null;
  povEntityRef?: string | null;
  temporalMarker?: "linear" | "flashback" | "flash_forward" | "replay_alternate_perspective";
}

interface ProductionRow {
  property_id: string;
  pinned_canon_release_id: string;
}

async function loadProduction(c: PoolClient, productionId: string): Promise<ProductionRow> {
  const production = (await c.query(
    "SELECT property_id, pinned_canon_release_id FROM storyworld.productions WHERE production_id=$1",
    [productionId],
  )).rows[0];
  if (!production) throw new ValidationError(`production ${productionId} not found`);
  return production as ProductionRow;
}

/**
 * Build the complete, sealed, validated document for appending one unit to
 * a production's current structure (DEC-0020; SWUX-007). Shared by the
 * direct-accept and queued-submit paths so neither reconstructs a reduced
 * document: the current document is loaded, only the unit collection
 * changes, every other field is preserved, and reduced legacy revisions are
 * healed to the contract shape.
 */
function buildAppendedStructure(
  head: StructureHead | null,
  production: ProductionRow,
  productionId: string,
  unit: NarrativeUnitInput,
  unitId: string,
): Record<string, unknown> {
  const base: Record<string, unknown> = head
    ? { ...head.document }
    : {
        schema_version: "storyworld.narrative-structure.v1",
        structure_id: uuidv7(),
        narrative_units: [],
        choices: [],
        branches: [],
        threads: [],
      };
  base["property_id"] = base["property_id"] ?? String(production.property_id);
  base["canon_release_ref"] = base["canon_release_ref"] ?? String(production.pinned_canon_release_id);
  base["production_ref"] = base["production_ref"] ?? productionId;
  base["choices"] = base["choices"] ?? [];
  base["branches"] = base["branches"] ?? [];
  base["threads"] = base["threads"] ?? [];
  const units = Array.isArray(base["narrative_units"]) ? [...(base["narrative_units"] as Record<string, unknown>[])] : [];
  const healedUnits: Record<string, unknown>[] = units.map((existing) => ({
    display_number: null,
    publication_time: null,
    parent_unit_ref: null,
    ...existing,
  }));
  healedUnits.push({
    unit_id: unitId,
    unit_type: unit.unitType,
    display_number: unit.displayNumber ?? null,
    presentation_order: unit.presentationOrder,
    story_time: unit.storyTime,
    publication_time: unit.publicationTime ?? null,
    parent_unit_ref: unit.parentUnitRef ?? null,
    ...(unit.povEntityRef !== undefined ? { pov_entity_ref: unit.povEntityRef } : {}),
    ...(unit.temporalMarker !== undefined ? { temporal_marker: unit.temporalMarker } : {}),
  });
  base["narrative_units"] = healedUnits;
  const { created_at: _restamped, ...unstamped } = base;
  return sealNarrativeStructureDocument(unstamped);
}

/**
 * Typed unit append in direct authoring mode (DEC-0020): builds the
 * complete document and records it as an accepted structure.accepted
 * revision. Refused when the property is in queued mode.
 */
export async function addNarrativeUnit(
  ctx: KernelContext,
  actor: Actor,
  input: { productionId: string; unit: NarrativeUnitInput; supersedesRevisionId?: string },
): Promise<{ structureRevisionId: string; contentSha256: string; receiptId: string; unitId: string }> {
  requireOwner(actor, "structure acceptance");
  const unitId = uuidv7();
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const production = await loadProduction(c, input.productionId);
    if ((await authoringModeFor(c, String(production.property_id))) !== "direct") {
      throw new ConflictError(
        "this property is in queued authoring mode; submit the unit for review instead of saving it directly",
      );
    }
    const head = await structureHead(c, input.productionId);
    requireCurrentBase(head, input.supersedesRevisionId, input.productionId);
    const sealed = buildAppendedStructure(head, production, input.productionId, input.unit, unitId);
    const out = await insertStructureRevision(c, ctx, actor, input.productionId, sealed, input.supersedesRevisionId);
    return { ...out, unitId };
  });
}

/**
 * Submit a unit append as a pending structure proposal (DEC-0020 queued
 * mode). Builds and validates the same complete document as the direct
 * path but stores it for review instead of accepting it; nothing changes
 * the accepted structure until the proposal is accepted. Refused when the
 * property is in direct mode.
 */
export async function submitStructureProposal(
  ctx: KernelContext,
  actor: Actor,
  input: { productionId: string; unit: NarrativeUnitInput; supersedesRevisionId?: string },
): Promise<{ proposalId: string; contentSha256: string; summary: string }> {
  requireOwner(actor, "structure proposal");
  const unitId = uuidv7();
  const proposalId = uuidv7();
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const production = await loadProduction(c, input.productionId);
    if ((await authoringModeFor(c, String(production.property_id))) !== "queued") {
      throw new ConflictError(
        "this property is in direct authoring mode; save the unit directly instead of submitting it for review",
      );
    }
    const head = await structureHead(c, input.productionId);
    requireCurrentBase(head, input.supersedesRevisionId, input.productionId);
    const sealed = buildAppendedStructure(head, production, input.productionId, input.unit, unitId);
    const hash = String(sealed["content_sha256"]);
    const summary = `add ${input.unit.unitType} at story time ${input.unit.storyTime}`;
    await c.query(
      "INSERT INTO storyworld.structure_proposals (proposal_id, organization_id, production_id, proposed_document, base_revision_id, content_sha256, submitted_by, submitter_kind, summary) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [proposalId, ctx.organizationId, input.productionId, JSON.stringify(sealed), input.supersedesRevisionId ?? null, hash, actor.id,
       actor.kind === "human" ? "human" : actor.kind === "import" ? "import" : "model", summary],
    );
    return { proposalId, contentSha256: hash, summary };
  });
}

/**
 * Decide a pending structure proposal (DEC-0020 queued mode). Accepting
 * applies the stored document as a structure.accepted revision — but only
 * if its base is still the current head; a moved base fails closed and
 * preserves the proposal for resubmission. Rejecting records the decision
 * with no structure change. property_owner only; one decision per proposal.
 */
export async function decideStructureProposal(
  ctx: KernelContext,
  actor: Actor,
  input: { proposalId: string; decision: "accepted" | "rejected" },
): Promise<{ decisionId: string; appliedRevisionId: string | null; receiptId: string }> {
  requireOwner(actor, "structure proposal decision");
  const decisionId = uuidv7();
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const proposal = (await c.query(
      "SELECT production_id, proposed_document, base_revision_id FROM storyworld.structure_proposals WHERE proposal_id=$1",
      [input.proposalId],
    )).rows[0];
    if (!proposal) throw new NotFoundError(`structure proposal ${input.proposalId} not found`);
    let appliedRevisionId: string | null = null;
    let receiptId: string;
    if (input.decision === "accepted") {
      const head = await structureHead(c, String(proposal.production_id));
      const currentHead = head?.structureRevisionId ?? null;
      const base = (proposal.base_revision_id as string | null) ?? null;
      if (currentHead !== base) {
        throw new ConflictError(
          "the accepted structure changed since this proposal was submitted (its base has moved); the proposal is preserved — resubmit the change against the current structure",
        );
      }
      const document = proposal.proposed_document as Record<string, unknown>;
      validateNarrativeStructureDocument(document);
      const applied = await insertStructureRevision(
        c, ctx, actor, String(proposal.production_id), document, base ?? undefined,
      );
      appliedRevisionId = applied.structureRevisionId;
      receiptId = applied.receiptId;
    } else {
      receiptId = uuidv7();
      await c.query(
        "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,$4,$5,NULL,$6,$7)",
        [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "structure.proposal.rejected", `structure-proposal:${input.proposalId}`, uuidv7(),
         JSON.stringify({ decided_by: actor.id, decided_by_role: actor.role })],
      );
    }
    await c.query(
      "INSERT INTO storyworld.structure_proposal_decisions (decision_id, organization_id, proposal_id, decision, applied_revision_id, decided_by, receipt_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [decisionId, ctx.organizationId, input.proposalId, input.decision, appliedRevisionId, actor.id, receiptId],
    );
    return { decisionId, appliedRevisionId, receiptId };
  });
}
