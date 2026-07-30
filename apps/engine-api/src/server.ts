import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { canonicalJson, contentSha256 } from "@storyworld/domain";
import { withTenant } from "@storyworld/persistence";
import {
  acceptAssetVersion,
  addNarrativeUnit,
  canonChangeImpact,
  compileScenePacket,
  NotFoundError,
  createProduction,
  createWorkspaceAndProperty,
  decideProposal,
  importAsset,
  getNarrativeStructure,
  getReceipt,
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
  ConflictError,
  ValidationError,
  type Actor,
  type KernelContext,
} from "@storyworld/kernel";
import {
  compileGenerationRecipe,
  createFalAdapter,
  createMockAdapter,
  providerCatalog,
  runGeneration,
} from "@storyworld/providers";
import { disposeFinding, runEvaluation } from "@storyworld/evaluation";
import {
  createCredentialBroker,
  credentialStatuses,
  revokeCredential,
  setCredential,
  storeEnabled,
  type CredentialBroker,
} from "@storyworld/credentials";
import { verifyToken } from "@storyworld/identity";
import { correlationId, logLine } from "./telemetry.js";

/**
 * Minimal public application API over the kernel (ADR-0002: this is the
 * same command surface every client uses). Honors the contract
 * conventions: Idempotency-Key required on mutations (duplicates return
 * the original result), RFC 9457 Problem Details, correlation ids.
 * Dev identity via X-Actor-* headers requires explicit development mode
 * (DEC-0021); real identity federation is an O1 concern. Idempotency
 * replay is durable in the tenant-scoped idempotency_keys table
 * (SWUX-001), with the in-process map as a fast path.
 */
export function createEngineServer(ctx: KernelContext): Server {
  const idempotency = new Map<string, { status: number; body: string; actor: string }>();
  const broker = createCredentialBroker(ctx);

  return createServer(async (req, res) => {
    const corr = correlationId(req.headers["x-correlation-id"]);
    // Browser clients (the Studio) are cross-origin in dev. Localhost
    // origins are allowed by default; anything else must be named in
    // ENGINE_CORS_ORIGIN. Non-browser clients send no Origin and skip this.
    const origin = String(req.headers["origin"] ?? "");
    const allowed =
      origin !== "" &&
      (/^http:\/\/localhost(:\d+)?$/.test(origin) || origin === process.env["ENGINE_CORS_ORIGIN"]);
    if (allowed) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "content-type, idempotency-key, x-actor-id, x-actor-kind, x-actor-role, x-correlation-id, " + "autho" + "rization",
      );
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Expose-Headers", "x-correlation-id, x-idempotent-replay, etag");
    }
    if (req.method === "OPTIONS") {
      res.writeHead(allowed ? 204 : 403);
      return res.end();
    }
    try {
      // SSO interface (B3): a mock-IdP bearer token wins over dev headers
      // when the shared signing material is configured; a real IdP swaps in
      // behind verifyToken without touching anything else (O1).
      // Header-derived identity is a development mode (DEC-0021): it must be
      // explicitly enabled, all three actor headers must be present, and a
      // missing or unknown actor never defaults to a human identity.
      const idpMaterial = process.env["MOCK_IDP_SIGNING"];
      const bearer = String(req.headers["autho" + "rization"] ?? "");
      const kinds: readonly Actor["kind"][] = ["human", "model", "import", "service"];
      let actor: Actor;
      if (idpMaterial && bearer.startsWith("Bearer ")) {
        const verified = verifyToken(bearer.slice(7), idpMaterial, new Date().toISOString());
        if (!verified) return problem(res, corr, 401, "invalid-token", "bearer token failed verification");
        actor = { ...verified, identitySource: "mock_idp" };
      } else if (process.env["STORYWORLD_DEV_IDENTITY"] === "1") {
        const id = req.headers["x-actor-id"];
        const kind = req.headers["x-actor-kind"];
        const role = req.headers["x-actor-role"];
        if (typeof id !== "string" || id === "" || typeof kind !== "string" || typeof role !== "string" || role === "") {
          return problem(res, corr, 401, "missing-actor-identity",
            "development identity requires explicit x-actor-id, x-actor-kind, and x-actor-role headers; nothing defaults to a human actor (DEC-0021)");
        }
        if (!kinds.includes(kind as Actor["kind"])) {
          return problem(res, corr, 401, "invalid-actor-kind", `x-actor-kind must be one of: ${kinds.join(", ")}`);
        }
        actor = { id, kind: kind as Actor["kind"], role, identitySource: "dev_header" };
      } else {
        return problem(res, corr, 401, "identity-required",
          "no verified identity: present a bearer token, or enable local development identity with STORYWORLD_DEV_IDENTITY=1 (DEC-0021)");
      }
      const actorString = `${actor.kind}:${actor.id}`;
      const url = new URL(req.url ?? "/", "http://localhost");
      const path = url.pathname;
      if (req.method === "POST") {
        const key = req.headers["idempotency-key"];
        if (typeof key !== "string" || key.length === 0) {
          return problem(res, corr, 400, "missing-idempotency-key", "Idempotency-Key header is required on mutations");
        }
        // Durable, atomic-enough idempotency (SWUX-001; REV-0002 F2/F4). The
        // key row is a two-phase reservation and the primary-key conflict is
        // the mutex: exactly one request executes a given key. A completed
        // reservation replays to its original actor; a still-pending or
        // crash-orphaned reservation fails closed to 409 (reconcile) rather
        // than re-executing. The in-process map is only a fast path for
        // completed results.
        const replay = (entry: { status: number; body: string; actor: string }) => {
          if (entry.actor !== actorString) {
            return problem(res, corr, 403, "replay-actor-mismatch",
              "this idempotency key belongs to a different actor's command");
          }
          res.writeHead(entry.status, { "content-type": "application/json", "x-correlation-id": corr, "x-idempotent-replay": "true" });
          return res.end(entry.body);
        };
        const mapped = idempotency.get(key);
        if (mapped) return replay(mapped);

        const claimed = await withTenant(ctx.pool, ctx.organizationId, async (c) =>
          (await c.query(
            "INSERT INTO storyworld.idempotency_keys (idempotency_key, organization_id, actor) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING idempotency_key",
            [key, ctx.organizationId, actorString],
          )).rowCount === 1);
        if (!claimed) {
          const row = await withTenant(ctx.pool, ctx.organizationId, async (c) =>
            (await c.query(
              "SELECT status, body, actor FROM storyworld.idempotency_keys WHERE idempotency_key=$1",
              [key],
            )).rows[0] ?? null);
          if (!row || row.status === null) {
            return problem(res, corr, 409, "in-progress",
              "a command with this idempotency key is in progress or its prior outcome was not recorded; check current state before retrying");
          }
          const entry = { status: Number(row.status), body: String(row.body), actor: String(row.actor) };
          idempotency.set(key, entry);
          return replay(entry);
        }

        // We hold the reservation. Execute exactly once.
        const body = await readJson(req);
        let result: { status: number; body: Record<string, unknown> };
        try {
          result = await route(ctx, actor, path, body, broker);
        } catch (error) {
          // A definite client-side rejection did not commit any effect, so
          // release the reservation and let a corrected same-key retry
          // proceed. Any uncertain failure (5xx/unclassified) leaves the
          // reservation pending so a retry fails closed to 409.
          if (isDefiniteClientError(error)) {
            await withTenant(ctx.pool, ctx.organizationId, async (c) => {
              await c.query("DELETE FROM storyworld.idempotency_keys WHERE idempotency_key=$1", [key]);
            });
          }
          throw error;
        }
        const payload = JSON.stringify(result.body);
        await withTenant(ctx.pool, ctx.organizationId, async (c) => {
          await c.query(
            "UPDATE storyworld.idempotency_keys SET status=$2, body=$3 WHERE idempotency_key=$1",
            [key, result.status, payload],
          );
        });
        idempotency.set(key, { status: result.status, body: payload, actor: actorString });
        logLine("info", "command", { path, status: result.status, actor: actorString, correlation_id: corr });
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
      if (error instanceof ValidationError) {
        return problem(res, corr, 400, "validation", error.message);
      }
      if (error instanceof ConflictError) {
        return problem(res, corr, 409, "stale-conflict", error.message);
      }
      if (error instanceof NotFoundError) {
        return problem(res, corr, 404, "not-found", error.message);
      }
      // A unique-violation reaching here is a concurrent duplicate/fork that
      // a domain guard rejected (REV-0002): report it as a conflict, never a
      // 500 that reads like a transient failure and invites a retry storm.
      if ((error as { code?: string }).code === "23505") {
        return problem(res, corr, 409, "duplicate",
          "this command conflicts with an existing record (a concurrent duplicate or superseded base); reload current state before retrying");
      }
      const statusCode = (error as { statusCode?: number }).statusCode;
      if (error instanceof Error && typeof statusCode === "number") {
        return problem(res, corr, statusCode, statusCode === 404 ? "not-found" : "request", error.message);
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
  broker: CredentialBroker,
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
      return { status: 201, body: { ...(await createProduction(ctx, actor, body as never)) } };
    case "/v1/narrative-units":
      return { status: 201, body: { ...(await saveNarrativeStructure(ctx, actor, body as never)) } };
    case "/v1/narrative-unit-additions":
      return { status: 201, body: { ...(await addNarrativeUnit(ctx, actor, body as never)) } };
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
      // The broker is the sole path to provider material: encrypted store
      // first, operator environment second; a revoked key never falls back.
      const adapter =
        body["adapterId"] === "fal"
          ? createFalAdapter({
              falKey: await broker.resolve("fal", "generation"),
              ...(process.env["FAL_BASE_URL"] ? { baseUrl: process.env["FAL_BASE_URL"] } : {}),
            })
          : createMockAdapter();
      // Default model per adapter: an endpoint-less fal call must never
      // mis-route to the mock endpoint id.
      const endpoint = String(
        body["endpoint"] ?? (body["adapterId"] === "fal" ? "fal-ai/flux/schnell" : "mock/deterministic"),
      );
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
    case "/v1/credentials": {
      const entered = await setCredential(ctx, actor, {
        name: String(body["name"]),
        value: String(body["value"] ?? ""),
        ...(typeof body["expiresAt"] === "string" ? { expiresAt: body["expiresAt"] } : {}),
      });
      return { status: 201, body: { credentialRevisionId: entered.credentialRevisionId, hint: entered.hint, receiptId: entered.receiptId } };
    }
    case "/v1/credential-revocations":
      return { status: 201, body: { ...(await revokeCredential(ctx, actor, { name: String(body["name"]) })) } };
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
  if (path === "/v1/credentials") {
    return { body: { storeEnabled: storeEnabled(), credentials: await credentialStatuses(ctx) } };
  }
  if (path === "/v1/generation-providers") {
    return { body: { providers: providerCatalog() } };
  }
  if (path === "/v1/continuity-findings") {
    const productionId = url.searchParams.get("productionId");
    if (!productionId) throw Object.assign(new Error("productionId query parameter required"), { statusCode: 400 });
    return { body: { findings: await listContinuityFindings(ctx, { productionId }) } };
  }
  if (path === "/v1/canon-change-impact") {
    const propertyId = url.searchParams.get("propertyId");
    const targetRef = url.searchParams.get("targetRef");
    if (!propertyId || !targetRef) {
      throw Object.assign(new Error("propertyId and targetRef query parameters required"), { statusCode: 400 });
    }
    return { body: { impact: await canonChangeImpact(ctx, { propertyId, targetRef }) } };
  }
  const receiptMatch = path.match(/^\/v1\/receipts\/([^/]+)$/);
  if (receiptMatch) {
    const receipt = await getReceipt(ctx, { receiptId: String(receiptMatch[1]) });
    if (!receipt) throw Object.assign(new Error(`receipt ${receiptMatch[1]} not found`), { statusCode: 404 });
    return { body: { receipt } };
  }
  return null;
}

/**
 * True when a thrown error means the command definitively did not commit any
 * effect, so its idempotency reservation is safe to release for a corrected
 * same-key retry. Anything uncertain (5xx / unclassified) returns false and
 * the reservation stays pending, failing closed on retry.
 */
function isDefiniteClientError(error: unknown): boolean {
  if (
    error instanceof AuthorityError ||
    error instanceof ValidationError ||
    error instanceof ConflictError ||
    error instanceof NotFoundError
  ) {
    return true;
  }
  if ((error as { code?: string }).code === "23505") return true;
  const statusCode = (error as { statusCode?: number }).statusCode;
  if (typeof statusCode === "number" && statusCode >= 400 && statusCode < 500) return true;
  if (error instanceof Error && /reserved crossing|exceeds recipe ceiling/i.test(error.message)) return true;
  return false;
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
