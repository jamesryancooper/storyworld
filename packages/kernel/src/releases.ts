import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import { requireHuman, type Actor } from "./actors.js";
import { currentCanon, type KernelContext } from "./commands.js";

/**
 * Snapshot the branch's current working canon into an immutable
 * canon-release document conforming to the F1 contract shape, hash it with
 * the shared canonical form, and store it append-only (ADR-0009).
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
): Promise<{ canonReleaseId: string; contentSha256: string }> {
  requireHuman(actor, "canon release");
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
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "canon.release.published", `canon-release:${canonReleaseId}`, hash, uuidv7()],
    );
    await c.query(
      "INSERT INTO storyworld.canon_releases (canon_release_id, organization_id, property_id, branch_id, release_name, release_version, document, content_sha256, accepted_receipt_id, supersedes_release_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [canonReleaseId, ctx.organizationId, input.propertyId, input.branchId, input.releaseName, input.releaseVersion, JSON.stringify(document), hash, receiptId, input.supersedesReleaseId ?? null],
    );
  });
  return { canonReleaseId, contentSha256: hash };
}

export async function createProduction(
  ctx: KernelContext,
  actor: Actor,
  input: { propertyId: string; pinnedCanonReleaseId: string; name: string; authorityHost?: string },
): Promise<string> {
  requireHuman(actor, "production creation");
  const productionId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.productions (production_id, organization_id, property_id, pinned_canon_release_id, name, authority_host) VALUES ($1,$2,$3,$4,$5,$6)",
      [productionId, ctx.organizationId, input.propertyId, input.pinnedCanonReleaseId, input.name, input.authorityHost ?? "storyworld"],
    );
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [uuidv7(), ctx.organizationId, `${actor.kind}:${actor.id}`, "production.pinned", `production:${productionId}`, null, uuidv7()],
    );
  });
  return productionId;
}

export async function saveNarrativeStructure(
  ctx: KernelContext,
  actor: Actor,
  input: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string },
): Promise<{ structureRevisionId: string; contentSha256: string }> {
  requireHuman(actor, "structure acceptance");
  const structureRevisionId = uuidv7();
  const hash = contentSha256(canonicalJson(input.document));
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const receiptId = uuidv7();
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`, "structure.accepted", `structure:${structureRevisionId}`, hash, uuidv7()],
    );
    await c.query(
      "INSERT INTO storyworld.narrative_structures (structure_revision_id, organization_id, production_id, document, content_sha256, supersedes_revision_id, accepted_receipt_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [structureRevisionId, ctx.organizationId, input.productionId, JSON.stringify(input.document), hash, input.supersedesRevisionId ?? null, receiptId],
    );
  });
  return { structureRevisionId, contentSha256: hash };
}
