import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import type { KernelContext } from "@storyworld/kernel";

/**
 * Runtime compiler (interface runtime-compiler.v1; ADR-0012): pinned canon
 * release + authored runtime content -> immutable runtime-content-release
 * document. Deterministic for identical inputs; validation refuses
 * dangling refs and circular missions before anything ships. Compiled
 * files never silently become canon (hotfixes reconcile via explicit
 * import).
 */

export class RuntimeValidationError extends Error {
  readonly findings: string[];
  constructor(findings: string[]) {
    super(`runtime compilation refused: ${findings.join("; ")}`);
    this.findings = findings;
  }
}

export interface AuthoredRuntimeContent {
  locations?: { location_id: string; name: string; era_rules: string[]; attributes?: Record<string, unknown> }[];
  spatial_relationships?: { from_location_ref: string; to_location_ref: string; relation: string }[];
  dialogue?: Record<string, unknown>[];
  missions?: { mission_id: string; name: string; prerequisites: string[]; authored_outcomes: string[]; state_effects: string[] }[];
  items?: Record<string, unknown>[];
  triggers?: { trigger_id: string; condition: string; effect_refs: string[] }[];
  sound_zones?: { zone_id: string; location_ref: string; intent: string; source_asset_refs: string[] }[];
}

export async function compileRuntimeRelease(
  ctx: KernelContext,
  input: {
    productionId: string;
    target: { runtime: string; target_version: string; capability_requirements: string[] };
    authored?: AuthoredRuntimeContent;
    assetVersionIds?: string[];
    releaseNotes?: string | null;
    compiledAt: string;
  },
): Promise<{ document: Record<string, unknown>; sha256: string }> {
  const { release, propertyId } = await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const row = (await c.query(
      `SELECT r.document AS release, r.property_id AS "propertyId"
         FROM storyworld.productions p
         JOIN storyworld.canon_releases r ON r.canon_release_id = p.pinned_canon_release_id
        WHERE p.production_id=$1`,
      [input.productionId],
    )).rows[0];
    if (!row) throw new Error(`production ${input.productionId} not found`);
    return { release: row.release as Record<string, unknown>, propertyId: String(row.propertyId) };
  });

  const authored = input.authored ?? {};
  const canonEntities = (release["entities"] ?? []) as Record<string, unknown>[];
  const entities = canonEntities
    .filter((e) => e["entity_type"] !== "location")
    .map((e) => ({
      entity_id: String(e["entity_id"]),
      name: String(e["name"]),
      role: (e["entity_type"] as string | null) ?? null,
      appearance_asset_refs: [],
      runtime_metadata: { visibility: e["visibility"] ?? "team_private" },
    }));
  const locations = [
    ...canonEntities
      .filter((e) => e["entity_type"] === "location")
      .map((e) => ({ location_id: String(e["entity_id"]), name: String(e["name"]), era_rules: [] as string[] })),
    ...(authored.locations ?? []),
  ];

  const findings: string[] = [];
  const locationIds = new Set(locations.map((l) => l.location_id));
  const entityIds = new Set(entities.map((e) => e.entity_id));
  const missionIds = new Set((authored.missions ?? []).map((m) => m.mission_id));

  for (const rel of authored.spatial_relationships ?? []) {
    for (const ref of [rel.from_location_ref, rel.to_location_ref]) {
      if (!locationIds.has(ref)) findings.push(`spatial relationship references unknown location ${ref}`);
    }
  }
  for (const zone of authored.sound_zones ?? []) {
    if (!locationIds.has(zone.location_ref)) findings.push(`sound zone ${zone.zone_id} references unknown location ${zone.location_ref}`);
  }
  for (const mission of authored.missions ?? []) {
    for (const prerequisite of mission.prerequisites) {
      if (!missionIds.has(prerequisite)) findings.push(`mission ${mission.name} prerequisite ${prerequisite} is not a mission`);
    }
    if (mission.authored_outcomes.length === 0) findings.push(`mission ${mission.name} has no authored outcomes`);
  }
  // Circular missions: DFS over the prerequisite graph.
  const visiting = new Set<string>();
  const done = new Set<string>();
  const byId = new Map((authored.missions ?? []).map((m) => [m.mission_id, m]));
  function visit(id: string, trail: string[]): void {
    if (done.has(id)) return;
    if (visiting.has(id)) {
      findings.push(`circular mission prerequisites: ${[...trail, id].join(" -> ")}`);
      return;
    }
    visiting.add(id);
    for (const prerequisite of byId.get(id)?.prerequisites ?? []) visit(prerequisite, [...trail, id]);
    visiting.delete(id);
    done.add(id);
  }
  for (const mission of authored.missions ?? []) visit(mission.mission_id, []);
  for (const dialogue of authored.dialogue ?? []) {
    const ref = dialogue["entity_ref"];
    if (typeof ref === "string" && !entityIds.has(ref.replace(/^entity:/, ""))) {
      findings.push(`dialogue ${String(dialogue["dialogue_id"])} references unknown entity ${ref}`);
    }
  }
  if (findings.length > 0) throw new RuntimeValidationError(findings);

  const assetIndex = await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const out: Record<string, unknown>[] = [];
    for (const assetVersionId of input.assetVersionIds ?? []) {
      const row = (await c.query(
        `SELECT v.content_sha256, b.size_bytes, b.media_type FROM storyworld.asset_versions v
           JOIN storyworld.content_blobs b ON b.sha256 = v.content_sha256
          WHERE v.asset_version_id=$1`,
        [assetVersionId],
      )).rows[0];
      if (!row) throw new RuntimeValidationError([`asset version ${assetVersionId} not found`]);
      out.push({
        asset_version_ref: `asset-version:${assetVersionId}`,
        location: `assets/${String(row.content_sha256)}`,
        content_type: String(row.media_type),
        size_bytes: Number(row.size_bytes),
        sha256: String(row.content_sha256),
        embedding: "embedded",
      });
    }
    return out;
  });

  const document: Record<string, unknown> = {
    schema_version: "storyworld.runtime-content-release.v1",
    release_id: uuidv7(),
    property_id: propertyId,
    canon_release_ref: String(release["canon_release_id"]),
    target: input.target,
    compiler: { name: "storyworld-runtime-compiler", version: "0.1.0" },
    locations,
    spatial_relationships: authored.spatial_relationships ?? [],
    entities,
    dialogue: authored.dialogue ?? [],
    missions: authored.missions ?? [],
    items: authored.items ?? [],
    triggers: authored.triggers ?? [],
    sound_zones: authored.sound_zones ?? [],
    asset_index: assetIndex,
    governance_metadata: {
      rights_evidence_refs: [],
      provenance_complete: true,
      disclosure_obligations: [],
      sensitivity: "internal",
    },
    release_notes: input.releaseNotes ?? null,
    created_at: input.compiledAt,
    content_sha256: "0".repeat(64),
  };
  const { content_sha256: _omitted, release_id: _rid, ...stable } = document;
  const sha256 = contentSha256(canonicalJson(stable));
  document["content_sha256"] = sha256;
  return { document, sha256 };
}

/** Runtime acceptance: an approval receipt hosted by the runtime authority. */
export async function receiveRuntimeAcceptance(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { releaseSha256: string; runtime: string; receipt: Record<string, unknown> },
): Promise<{ receiptId: string }> {
  const receiptId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,'runtime.acceptance.received',$4,$5,$6,$7)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`,
       `runtime-release:${input.releaseSha256}`, input.releaseSha256, uuidv7(),
       JSON.stringify({
         approval_layer: "publication_or_runtime_acceptance",
         authority_host: input.runtime,
         receipt: input.receipt,
       })],
    );
  });
  return { receiptId };
}

/** Hotfix reconcile: recorded for explicit later import — compiled files never silently become canon. */
export async function reconcileHotfix(
  ctx: KernelContext,
  actor: { id: string; kind: string; role: string },
  input: { releaseSha256: string; hotfix: Record<string, unknown> },
): Promise<{ receiptId: string }> {
  const receiptId = uuidv7();
  await withTenant(ctx.pool, ctx.organizationId, async (c) => {
    await c.query(
      "INSERT INTO storyworld.audit_receipts (receipt_id, organization_id, actor, action, subject_ref, subject_sha256, correlation_id, detail) VALUES ($1,$2,$3,'runtime.hotfix.recorded',$4,$5,$6,$7)",
      [receiptId, ctx.organizationId, `${actor.kind}:${actor.id}`,
       `runtime-release:${input.releaseSha256}`, input.releaseSha256, uuidv7(),
       JSON.stringify({ hotfix: input.hotfix, note: "reconciles through a later explicit import; not canon" })],
    );
  });
  return { receiptId };
}
