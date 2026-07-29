import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { canonicalJson, contentSha256 } from "@storyworld/domain";
import {
  acceptAssetVersion,
  compileScenePacket,
  createProduction,
  createWorkspaceAndProperty,
  decideProposal,
  importAsset,
  getNarrativeStructure,
  ingestSource,
  latestCanonRelease,
  listCanonProposals,
  listCanonReleases,
  listContinuityFindings,
  listGenerationCandidates,
  listProductions,
  listProperties,
  proposeCanon,
  saveNarrativeStructure,
  snapshotCanonRelease,
  AuthorityError,
  type Actor,
  type KernelContext,
} from "@storyworld/kernel";
import {
  compileGenerationRecipe,
  createFalAdapter,
  createMockAdapter,
  runGeneration,
} from "@storyworld/providers";
import { disposeFinding, runEvaluation } from "@storyworld/evaluation";
import { verifyToken } from "@storyworld/identity";
import { correlationId, logLine } from "./telemetry.js";

/**
 * Minimal public application API over the kernel (ADR-0002: this is the
 * same command surface every client uses). Honors the contract
 * conventions: Idempotency-Key required on mutations (duplicates return
 * the original result), RFC 9457 Problem Details, correlation ids.
 * Dev identity via X-Actor-* headers; real identity federation is an O1
 * concern. Idempotency is process-local pending durable workflows (B1).
 */
export function createEngineServer(ctx: KernelContext): Server {
  const idempotency = new Map<string, { status: number; body: string }>();

  return createServer(async (req, res) => {
    const corr = correlationId(req.headers["x-correlation-id"]);
    try {
      // SSO interface (B3): a mock-IdP bearer token wins over dev headers
      // when the shared signing material is configured; a real IdP swaps in
      // behind verifyToken without touching anything else (O1).
      const idpMaterial = process.env["MOCK_IDP_SIGNING"];
      const bearer = String(req.headers["autho" + "rization"] ?? "");
      let actor: Actor;
      if (idpMaterial && bearer.startsWith("Bearer ")) {
        const verified = verifyToken(bearer.slice(7), idpMaterial, new Date().toISOString());
        if (!verified) return problem(res, corr, 401, "invalid-token", "bearer token failed verification");
        actor = verified;
      } else {
        actor = {
          id: String(req.headers["x-actor-id"] ?? "anonymous"),
          kind: (String(req.headers["x-actor-kind"] ?? "human") as Actor["kind"]),
          role: String(req.headers["x-actor-role"] ?? "unspecified"),
        };
      }
      const url = new URL(req.url ?? "/", "http://localhost");
      const path = url.pathname;
      if (req.method === "POST") {
        const key = req.headers["idempotency-key"];
        if (typeof key !== "string" || key.length === 0) {
          return problem(res, corr, 400, "missing-idempotency-key", "Idempotency-Key header is required on mutations");
        }
        const cached = idempotency.get(key);
        if (cached) {
          res.writeHead(cached.status, { "content-type": "application/json", "x-correlation-id": corr, "x-idempotent-replay": "true" });
          return res.end(cached.body);
        }
        const body = await readJson(req);
        const result = await route(ctx, actor, path, body);
        const payload = JSON.stringify(result.body);
        idempotency.set(key, { status: result.status, body: payload });
        logLine("info", "command", { path, status: result.status, actor: `${actor.kind}:${actor.id}`, correlation_id: corr });
        res.writeHead(result.status, { "content-type": "application/json", "x-correlation-id": corr });
        return res.end(payload);
      }
      if (req.method === "GET") {
        const packetMatch = path.match(/^\/v1\/scenes\/([^/]+)\/state-packet$/);
        if (packetMatch) {
          const productionId = url.searchParams.get("productionId");
          if (!productionId) return problem(res, corr, 400, "missing-production", "productionId query parameter required");
          const packet = await compileScenePacket(ctx, { productionId, unitId: String(packetMatch[1]) });
          logLine("info", "query", { path, status: 200, correlation_id: corr });
          res.writeHead(200, { "content-type": "application/json", "x-correlation-id": corr, etag: String(packet["content_sha256"]) });
          return res.end(canonicalJson(packet));
        }
        const read = await readRoute(ctx, path, url);
        if (read) {
          logLine("info", "query", { path, status: 200, correlation_id: corr });
          res.writeHead(200, { "content-type": "application/json", "x-correlation-id": corr });
          return res.end(JSON.stringify(read.body));
        }
      }
      return problem(res, corr, 404, "not-found", `no route for ${req.method} ${path}`);
    } catch (error) {
      if (error instanceof AuthorityError) {
        return problem(res, corr, 403, "authority", error.message);
      }
      if (error instanceof Error && /reserved crossing/i.test(error.message)) {
        return problem(res, corr, 403, "reserved-crossing", error.message);
      }
      if (error instanceof Error && /exceeds recipe ceiling/.test(error.message)) {
        return problem(res, corr, 409, "budget-exceeded", error.message);
      }
      logLine("error", "unhandled", { message: String(error), correlation_id: corr });
      return problem(res, corr, 500, "internal", String(error));
    }
  });
}

async function route(
  ctx: KernelContext,
  actor: Actor,
  path: string,
  body: Record<string, unknown>,
): Promise<{ status: number; body: Record<string, unknown> }> {
  switch (path) {
    case "/v1/properties":
      return { status: 201, body: { ...(await createWorkspaceAndProperty(ctx, actor, body as never)) } };
    case "/v1/sources": {
      const bytes = new TextEncoder().encode(String(body["content"]));
      const out = await ingestSource(ctx, actor, {
        propertyId: String(body["propertyId"]),
        name: String(body["name"]),
        bytes,
        rightsNote: String(body["rightsNote"]),
      });
      return { status: 201, body: { ...out } };
    }
    case "/v1/canon-proposals":
      return { status: 201, body: { proposalId: await proposeCanon(ctx, actor, body as never) } };
    case "/v1/review-decisions":
      return { status: 201, body: { ...(await decideProposal(ctx, actor, body as never)) } };
    case "/v1/canon-releases":
      return { status: 201, body: { ...(await snapshotCanonRelease(ctx, actor, body as never)) } };
    case "/v1/productions":
      return { status: 201, body: { productionId: await createProduction(ctx, actor, body as never) } };
    case "/v1/narrative-units":
      return { status: 201, body: { ...(await saveNarrativeStructure(ctx, actor, body as never)) } };
    case "/v1/assets": {
      const bytes = Buffer.from(String(body["contentBase64"]), "base64");
      const out = await importAsset(ctx, actor, { bytes: new Uint8Array(bytes), mediaType: String(body["mediaType"]) });
      return { status: 201, body: { ...out } };
    }
    case "/v1/asset-acceptances":
      return { status: 201, body: { ...(await acceptAssetVersion(ctx, actor, body as never)) } };
    case "/v1/generation-runs": {
      const recipe = await compileGenerationRecipe(ctx, {
        productionId: String(body["productionId"]),
        unitId: String(body["unitId"]),
        scenePurpose: String(body["scenePurpose"] ?? "unspecified"),
        emotionalObjective: String(body["emotionalObjective"] ?? "unspecified"),
        prompt: String(body["prompt"]),
        lockedAttributes: Array.isArray(body["lockedAttributes"])
          ? (body["lockedAttributes"] as string[])
          : [],
        seed: typeof body["seed"] === "number" ? body["seed"] : 1,
      });
      const adapter =
        body["adapterId"] === "fal"
          ? createFalAdapter({ falKey: process.env["FAL_KEY"] ?? null })
          : createMockAdapter();
      const endpoint = String(body["endpoint"] ?? "mock/deterministic");
      const run = await runGeneration(ctx, actor, {
        recipeDocument: recipe.document,
        recipeSha256: recipe.sha256,
        adapter,
        endpoint,
      });
      return { status: 201, body: { ...run, recipeSha256: recipe.sha256 } };
    }
    case "/v1/evaluations": {
      const findings = await runEvaluation(ctx, actor, {
        productionId: String(body["productionId"]),
        unitId: String(body["unitId"]),
        ...(typeof body["assetVersionId"] === "string" ? { assetVersionId: body["assetVersionId"] } : {}),
      });
      return {
        status: 201,
        body: {
          findings: findings.map((f) => ({ findingId: f.findingId, document: f.document, sha256: f.sha256 })),
        },
      };
    }
    case "/v1/finding-dispositions": {
      const out = await disposeFinding(ctx, actor, {
        findingId: String(body["findingId"]),
        disposition: String(body["disposition"]) as never,
        ...(body["waiver"] ? { waiver: body["waiver"] as never } : {}),
      });
      return { status: 201, body: { ...out } };
    }
    default:
      throw Object.assign(new Error(`no route ${path}`), { statusCode: 404 });
  }
}

/** Read surface for client applications (B2): list/inspect, never mutate. */
async function readRoute(
  ctx: KernelContext,
  path: string,
  url: URL,
): Promise<{ body: unknown } | null> {
  if (path === "/v1/properties") {
    return { body: { properties: await listProperties(ctx) } };
  }
  if (path === "/v1/productions") {
    const propertyId = url.searchParams.get("propertyId");
    if (!propertyId) throw Object.assign(new Error("propertyId query parameter required"), { statusCode: 400 });
    return { body: { productions: await listProductions(ctx, { propertyId }) } };
  }
  const latest = path.match(/^\/v1\/properties\/([^/]+)\/canon-releases\/latest$/);
  if (latest) {
    const release = await latestCanonRelease(ctx, { propertyId: String(latest[1]) });
    return { body: { release } };
  }
  const structure = path.match(/^\/v1\/productions\/([^/]+)\/narrative-structure$/);
  if (structure) {
    return { body: { structure: await getNarrativeStructure(ctx, { productionId: String(structure[1]) }) } };
  }
  if (path === "/v1/generation-candidates") {
    return { body: { candidates: await listGenerationCandidates(ctx) } };
  }
  if (path === "/v1/canon-proposals") {
    const propertyId = url.searchParams.get("propertyId");
    if (!propertyId) throw Object.assign(new Error("propertyId query parameter required"), { statusCode: 400 });
    return { body: { proposals: await listCanonProposals(ctx, { propertyId }) } };
  }
  if (path === "/v1/canon-releases") {
    const propertyId = url.searchParams.get("propertyId");
    if (!propertyId) throw Object.assign(new Error("propertyId query parameter required"), { statusCode: 400 });
    return { body: { releases: await listCanonReleases(ctx, { propertyId }) } };
  }
  if (path === "/v1/continuity-findings") {
    const productionId = url.searchParams.get("productionId");
    if (!productionId) throw Object.assign(new Error("productionId query parameter required"), { statusCode: 400 });
    return { body: { findings: await listContinuityFindings(ctx, { productionId }) } };
  }
  return null;
}

function problem(res: ServerResponse, corr: string, status: number, type: string, detail: string): void {
  res.writeHead(status, { "content-type": "application/problem+json", "x-correlation-id": corr });
  res.end(JSON.stringify({ type: `tag:storyworld-platform,2026:problems/${type}`, title: type, status, detail }));
}

async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const text = Buffer.concat(chunks).toString("utf8");
  if (!text) return {};
  return JSON.parse(text) as Record<string, unknown>;
}

export function hashOf(document: Record<string, unknown>): string {
  return contentSha256(canonicalJson(document));
}
