import { withTenant } from "@storyworld/persistence";
import type { PoolClient } from "pg";
import type { KernelContext } from "./commands.js";

/**
 * Scoped, read-only cross-domain search (DEC-0026 / PROP-FG-10). Every query
 * runs inside withTenant, so RLS confines results to the acting tenant.
 * Restricted AND spoiler canon are excluded from titles and snippets — the
 * decision requires neither to leak, and the alpha has no per-viewer
 * authorization model to safely reveal spoilers, so search fails closed on
 * both and returns only public and team_private canon (including via the
 * proposals that carry a visibility). Results are navigation targets only —
 * search performs no mutation — and each names its type, property/production,
 * and state with a stable DEC-0022 deep link (?property=&production=).
 */
export type SearchResultType =
  | "property"
  | "entity"
  | "timeline_event"
  | "unit"
  | "finding"
  | "proposal"
  | "production"
  | "release";

export interface SearchResult {
  type: SearchResultType;
  id: string;
  title: string;
  subtitle: string;
  propertyId: string;
  productionId: string | null;
  state: string;
  visibility: string | null;
  deepLink: string;
}

function link(path: string, params: Record<string, string | null | undefined>): string {
  const q = Object.entries(params)
    .filter(([, v]) => typeof v === "string" && v.length > 0)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("&");
  return q ? `${path}?${q}` : path;
}

async function searchProperties(c: PoolClient, like: string): Promise<SearchResult[]> {
  const rows = await c.query(
    `SELECT property_id AS "propertyId", name, property_type AS "propertyType"
       FROM storyworld.properties WHERE name ILIKE $1 ORDER BY created_at DESC LIMIT 10`,
    [like],
  );
  return rows.rows.map((r) => ({
    type: "property", id: String(r.propertyId), title: String(r.name), subtitle: String(r.propertyType),
    propertyId: String(r.propertyId), productionId: null, state: "property", visibility: null,
    deepLink: link("/world-bible", { property: String(r.propertyId) }),
  }));
}

async function searchEntities(c: PoolClient, like: string, propertyId?: string): Promise<SearchResult[]> {
  // Current (unsuperseded) named canon; restricted is excluded so it never
  // leaks through a title or snippet.
  const rows = await c.query(
    `SELECT r.stable_id AS "stableId", r.property_id AS "propertyId", r.visibility,
            r.payload->>'name' AS name, r.payload->>'entity_type' AS "entityType"
       FROM storyworld.canon_revisions r
      WHERE r.concern = 'entity' AND r.visibility NOT IN ('restricted','spoiler')
        AND (r.payload->>'name') ILIKE $1
        AND ($2::uuid IS NULL OR r.property_id = $2::uuid)
        AND NOT EXISTS (SELECT 1 FROM storyworld.canon_revisions s
                         WHERE s.supersedes_revision_id = r.revision_id)
      ORDER BY r.payload->>'name' LIMIT 10`,
    [like, propertyId ?? null],
  );
  return rows.rows.map((r) => ({
    type: "entity", id: String(r.stableId), title: String(r.name ?? "(unnamed)"),
    subtitle: String(r.entityType ?? "entity"),
    propertyId: String(r.propertyId), productionId: null, state: "working canon", visibility: String(r.visibility),
    deepLink: link("/world-bible", { property: String(r.propertyId) }),
  }));
}

async function searchTimelineEvents(c: PoolClient, like: string, propertyId?: string): Promise<SearchResult[]> {
  const rows = await c.query(
    `SELECT r.stable_id AS "stableId", r.property_id AS "propertyId", r.visibility,
            r.payload->>'summary' AS summary, r.payload->>'story_time' AS "storyTime"
       FROM storyworld.canon_revisions r
      WHERE r.concern = 'timeline_event' AND r.visibility NOT IN ('restricted','spoiler')
        AND ((r.payload->>'summary') ILIKE $1 OR (r.payload->>'story_time') ILIKE $1)
        AND ($2::uuid IS NULL OR r.property_id = $2::uuid)
        AND NOT EXISTS (SELECT 1 FROM storyworld.canon_revisions s
                         WHERE s.supersedes_revision_id = r.revision_id)
      ORDER BY r.payload->>'story_time' LIMIT 10`,
    [like, propertyId ?? null],
  );
  return rows.rows.map((r) => ({
    type: "timeline_event", id: String(r.stableId), title: String(r.summary ?? "(event)"),
    subtitle: `story time ${String(r.storyTime ?? "?")}`,
    propertyId: String(r.propertyId), productionId: null, state: "working canon", visibility: String(r.visibility),
    deepLink: link("/world-bible", { property: String(r.propertyId) }),
  }));
}

async function searchUnits(c: PoolClient, like: string, propertyId?: string): Promise<SearchResult[]> {
  const rows = await c.query(
    `SELECT s.production_id AS "productionId", p.property_id AS "propertyId", p.name AS "productionName",
            u->>'unit_id' AS "unitId", u->>'unit_type' AS "unitType", u->>'story_time' AS "storyTime"
       FROM storyworld.narrative_structures s
       JOIN storyworld.productions p ON p.production_id = s.production_id
       CROSS JOIN LATERAL jsonb_array_elements(s.document->'narrative_units') u
      WHERE NOT EXISTS (SELECT 1 FROM storyworld.narrative_structures t
                         WHERE t.supersedes_revision_id = s.structure_revision_id)
        AND ((u->>'story_time') ILIKE $1 OR (u->>'unit_type') ILIKE $1)
        AND ($2::uuid IS NULL OR p.property_id = $2::uuid)
      LIMIT 10`,
    [like, propertyId ?? null],
  );
  return rows.rows.map((r) => ({
    type: "unit", id: String(r.unitId), title: `${String(r.unitType)} · ${String(r.storyTime)}`,
    subtitle: `in ${String(r.productionName)}`, propertyId: String(r.propertyId), productionId: String(r.productionId),
    state: "narrative unit", visibility: null,
    deepLink: link("/arc-board", { property: String(r.propertyId), production: String(r.productionId) }),
  }));
}

async function searchFindings(c: PoolClient, like: string, propertyId?: string): Promise<SearchResult[]> {
  const rows = await c.query(
    `SELECT f.finding_id AS "findingId", f.production_id AS "productionId", p.property_id AS "propertyId",
            p.name AS "productionName", f.disposition, f.document->>'description' AS description
       FROM storyworld.continuity_findings f
       JOIN storyworld.productions p ON p.production_id = f.production_id
      WHERE NOT EXISTS (SELECT 1 FROM storyworld.continuity_findings s
                         WHERE s.supersedes_revision_id = f.finding_revision_id)
        AND (f.document->>'description') ILIKE $1
        AND ($2::uuid IS NULL OR p.property_id = $2::uuid)
      ORDER BY f.created_at DESC LIMIT 10`,
    [like, propertyId ?? null],
  );
  return rows.rows.map((r) => ({
    type: "finding", id: String(r.findingId), title: String(r.description ?? "(finding)").slice(0, 80),
    subtitle: `in ${String(r.productionName)}`, propertyId: String(r.propertyId), productionId: String(r.productionId),
    state: String(r.disposition), visibility: null,
    deepLink: link("/continuity", { property: String(r.propertyId), production: String(r.productionId) }),
  }));
}

async function searchProposals(c: PoolClient, like: string, propertyId?: string): Promise<SearchResult[]> {
  const rows = await c.query(
    `SELECT p.proposal_id AS "proposalId", p.property_id AS "propertyId", p.proposal_type AS "proposalType",
            p.payload->>'name' AS name, p.payload->>'summary' AS summary, d.decision
       FROM storyworld.canon_proposals p
       LEFT JOIN storyworld.proposal_decisions d ON d.proposal_id = p.proposal_id
      WHERE ((p.payload->>'name') ILIKE $1 OR (p.payload->>'summary') ILIKE $1)
        AND (p.payload->>'visibility' IS NULL OR p.payload->>'visibility' NOT IN ('restricted','spoiler'))
        AND ($2::uuid IS NULL OR p.property_id = $2::uuid)
      ORDER BY p.created_at DESC LIMIT 10`,
    [like, propertyId ?? null],
  );
  return rows.rows.map((r) => ({
    type: "proposal", id: String(r.proposalId), title: String(r.name ?? r.summary ?? "(proposal)"),
    subtitle: String(r.proposalType), propertyId: String(r.propertyId), productionId: null,
    state: r.decision ? String(r.decision) : "pending", visibility: null,
    deepLink: link("/review", { property: String(r.propertyId) }),
  }));
}

async function searchProductions(c: PoolClient, like: string, propertyId?: string): Promise<SearchResult[]> {
  const rows = await c.query(
    `SELECT p.production_id AS "productionId", p.property_id AS "propertyId", p.name,
            r.release_version AS "releaseVersion"
       FROM storyworld.productions p
       JOIN storyworld.canon_releases r ON r.canon_release_id = p.pinned_canon_release_id
      WHERE p.name ILIKE $1 AND ($2::uuid IS NULL OR p.property_id = $2::uuid)
      ORDER BY p.created_at DESC LIMIT 10`,
    [like, propertyId ?? null],
  );
  return rows.rows.map((r) => ({
    type: "production", id: String(r.productionId), title: String(r.name),
    subtitle: `pinned canon v${String(r.releaseVersion)}`, propertyId: String(r.propertyId),
    productionId: String(r.productionId), state: `pinned v${String(r.releaseVersion)}`, visibility: null,
    deepLink: link("/arc-board", { property: String(r.propertyId), production: String(r.productionId) }),
  }));
}

async function searchReleases(c: PoolClient, like: string, propertyId?: string): Promise<SearchResult[]> {
  // A release is superseded when another release names it as its predecessor;
  // the result state says so rather than implying every release is current.
  const rows = await c.query(
    `SELECT r.canon_release_id AS "releaseId", r.property_id AS "propertyId", r.release_name AS "releaseName",
            r.release_version AS "releaseVersion",
            EXISTS (SELECT 1 FROM storyworld.canon_releases s WHERE s.supersedes_release_id = r.canon_release_id) AS superseded
       FROM storyworld.canon_releases r
      WHERE (r.release_name ILIKE $1 OR r.release_version ILIKE $1)
        AND ($2::uuid IS NULL OR r.property_id = $2::uuid)
      ORDER BY r.created_at DESC LIMIT 10`,
    [like, propertyId ?? null],
  );
  return rows.rows.map((r) => ({
    type: "release", id: String(r.releaseId), title: `${String(r.releaseName)} v${String(r.releaseVersion)}`,
    subtitle: r.superseded ? "superseded" : "latest",
    propertyId: String(r.propertyId), productionId: null,
    state: r.superseded ? "superseded canon release" : "canon release", visibility: null,
    deepLink: link("/release-builder", { property: String(r.propertyId) }),
  }));
}

export async function search(
  ctx: KernelContext,
  input: { query: string; propertyId?: string },
): Promise<SearchResult[]> {
  const term = input.query.trim();
  if (term.length < 2) return [];
  const like = `%${term.replace(/[%_\\]/g, (ch) => `\\${ch}`)}%`;
  return withTenant(ctx.pool, ctx.organizationId, async (c) => {
    const groups = await Promise.all([
      searchProperties(c, like),
      searchEntities(c, like, input.propertyId),
      searchTimelineEvents(c, like, input.propertyId),
      searchUnits(c, like, input.propertyId),
      searchFindings(c, like, input.propertyId),
      searchProposals(c, like, input.propertyId),
      searchProductions(c, like, input.propertyId),
      searchReleases(c, like, input.propertyId),
    ]);
    return groups.flat().slice(0, 40);
  });
}
