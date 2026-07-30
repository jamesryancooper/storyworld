import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import type { PoolClient } from "pg";
import { requireOwner, ConflictError, ValidationError, type Actor } from "./actors.js";
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
 * SWUX-007) and must name the exact revision it supersedes.
 */
export async function saveNarrativeStructure(
  ctx: KernelContext,
  actor: Actor,
  input: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string },
): Promise<{ structureRevisionId: string; contentSha256: string; receiptId: string }> {
  requireOwner(actor, "structure acceptance");
  validateNarrativeStructureDocument(input.document);
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
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

/**
 * Typed unit append (DEC-0020): the kernel loads the current complete
 * document, changes only the unit collection, preserves every other
 * field, heals contract fields older reduced revisions lack, reseals the
 * embedded hash, validates, and stores the supersession — so the client
 * never reconstructs the document (SWUX-007).
 */
export async function addNarrativeUnit(
  ctx: KernelContext,
  actor: Actor,
  input: { productionId: string; unit: NarrativeUnitInput; supersedesRevisionId?: string },
): Promise<{ structureRevisionId: string; contentSha256: string; receiptId: string; unitId: string }> {
  requireOwner(actor, "structure acceptance");
  const unitId = uuidv7();
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const production = (await c.query(
      "SELECT property_id, pinned_canon_release_id FROM storyworld.productions WHERE production_id=$1",
      [input.productionId],
    )).rows[0];
    if (!production) throw new ValidationError(`production ${input.productionId} not found`);
    const head = await structureHead(c, input.productionId);
    requireCurrentBase(head, input.supersedesRevisionId, input.productionId);

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
    // Heal contract fields that pre-validation reduced revisions lack;
    // fields already present are preserved exactly.
    base["property_id"] = base["property_id"] ?? String(production.property_id);
    base["canon_release_ref"] = base["canon_release_ref"] ?? String(production.pinned_canon_release_id);
    base["production_ref"] = base["production_ref"] ?? input.productionId;
    base["choices"] = base["choices"] ?? [];
    base["branches"] = base["branches"] ?? [];
    base["threads"] = base["threads"] ?? [];
    const units = Array.isArray(base["narrative_units"]) ? [...(base["narrative_units"] as Record<string, unknown>[])] : [];
    const healedUnits: Record<string, unknown>[] = units.map((unit) => ({
      display_number: null,
      publication_time: null,
      parent_unit_ref: null,
      ...unit,
    }));
    healedUnits.push({
      unit_id: unitId,
      unit_type: input.unit.unitType,
      display_number: input.unit.displayNumber ?? null,
      presentation_order: input.unit.presentationOrder,
      story_time: input.unit.storyTime,
      publication_time: input.unit.publicationTime ?? null,
      parent_unit_ref: input.unit.parentUnitRef ?? null,
      ...(input.unit.povEntityRef !== undefined ? { pov_entity_ref: input.unit.povEntityRef } : {}),
      ...(input.unit.temporalMarker !== undefined ? { temporal_marker: input.unit.temporalMarker } : {}),
    });
    base["narrative_units"] = healedUnits;
    const { created_at: _restamped, ...unstamped } = base;
    const sealed = sealNarrativeStructureDocument(unstamped);
    const out = await insertStructureRevision(c, ctx, actor, input.productionId, sealed, input.supersedesRevisionId);
    return { ...out, unitId };
  });
}
