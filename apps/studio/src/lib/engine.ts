/**
 * Engine API client: the Studio's only path to state. Every mutation
 * carries an Idempotency-Key and the acting identity; reads are plain
 * GETs. Dev identity headers pending real federation (O1) — the engine
 * accepts them only in explicit development mode (DEC-0021), so the
 * identity is labeled unverified wherever it is shown.
 *
 * Error contract (SWUX-001): a non-2xx answer parses the RFC 9457
 * problem document into EngineError; a transport failure throws
 * EngineUnknownOutcomeError because the command may or may not have been
 * recorded. Callers pass a retained idempotency key so an uncertain
 * retry replays instead of duplicating.
 */
export interface StudioActor {
  id: string;
  kind: "human" | "model" | "service";
  role: string;
}

export class EngineError extends Error {
  readonly status: number;
  readonly problemType: string;
  readonly detail: string;
  constructor(status: number, problemType: string, detail: string) {
    super(`engine ${status} ${problemType}: ${detail}`);
    this.name = "EngineError";
    this.status = status;
    this.problemType = problemType;
    this.detail = detail;
  }
}

export class EngineUnknownOutcomeError extends Error {
  readonly status = 0;
  constructor(path: string) {
    super(
      `the engine did not answer for ${path} — the command may or may not have been recorded`,
    );
    this.name = "EngineUnknownOutcomeError";
  }
}

export interface EngineCallOptions {
  idempotencyKey?: string;
}

export interface PropertySummary {
  propertyId: string;
  name: string;
  propertyType: string;
  officialBranchId: string;
  createdAt: string;
}

export interface ProductionSummary {
  productionId: string;
  propertyId: string;
  name: string;
  pinnedCanonReleaseId: string;
  releaseVersion: string;
}

export interface CanonReleaseView {
  canonReleaseId: string;
  releaseName: string;
  releaseVersion: string;
  contentSha256: string;
  document: {
    entities?: Record<string, unknown>[];
    timeline_events?: Record<string, unknown>[];
    [key: string]: unknown;
  };
}

export interface NarrativeStructureView {
  structureRevisionId: string;
  contentSha256: string;
  document: {
    structure_id?: string;
    narrative_units?: Record<string, unknown>[];
    choices?: Record<string, unknown>[];
    branches?: Record<string, unknown>[];
    threads?: Record<string, unknown>[];
    [key: string]: unknown;
  };
}

export interface NarrativeUnitDraft {
  unitType: string;
  presentationOrder: number;
  storyTime: string;
  displayNumber?: string | null;
  publicationTime?: string | null;
  parentUnitRef?: string | null;
  povEntityRef?: string | null;
  temporalMarker?: "linear" | "flashback" | "flash_forward" | "replay_alternate_perspective";
}

export type AuthoringMode = "direct" | "queued";

export interface StructureProposalView {
  proposalId: string;
  productionId: string;
  productionName: string;
  summary: string;
  contentSha256: string;
  baseRevisionId: string | null;
  submittedBy: string;
  submitterKind: string;
  createdAt: string;
  decision: string | null;
  appliedRevisionId: string | null;
}

export interface ScenePacketView {
  packet_id: string;
  scene_ref: string;
  story_time: string;
  entering_state_summary: string;
  entity_states: { entity_ref: string; state: Record<string, unknown> }[];
  active_threads: Record<string, unknown>[];
  content_sha256: string;
  [key: string]: unknown;
}

export interface GenerationCandidateView {
  assetVersionId: string;
  contentSha256: string;
  state: string;
  createdAt: string;
  generationRunId: string;
  provenance: {
    provider?: string;
    endpoint?: string;
    seed?: number;
    latency_ms?: number;
    locked_attributes?: string[];
    [key: string]: unknown;
  };
}

export interface ReceiptView {
  receiptId: string;
  actor: string;
  action: string;
  subjectRef: string;
  subjectSha256: string | null;
  correlationId: string;
  recordedAt: string;
  detail: {
    approval_receipt?: {
      schema_version: string;
      approval_layer: string;
      decision: string;
      subject_refs: string[];
      subject_sha256: string[];
      policy_refs: string[];
      decided_by: string;
      decided_by_role: string;
      decided_at: string;
      authority_host: string;
      waiver?: { reason: string; scope: string; expiry: string | null };
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

export interface EngineClient {
  health(): Promise<boolean>;
  listProperties(): Promise<PropertySummary[]>;
  createProperty(
    input: { workspaceName: string; propertyName: string; propertyType: string },
    opts?: EngineCallOptions,
  ): Promise<{ propertyId: string }>;
  listProductions(propertyId: string): Promise<ProductionSummary[]>;
  latestCanonRelease(propertyId: string): Promise<CanonReleaseView | null>;
  getNarrativeStructure(productionId: string): Promise<NarrativeStructureView | null>;
  saveNarrativeStructure(
    input: { productionId: string; document: Record<string, unknown>; supersedesRevisionId?: string },
    opts?: EngineCallOptions,
  ): Promise<{ structureRevisionId: string; contentSha256: string; receiptId: string }>;
  addNarrativeUnit(
    input: { productionId: string; unit: NarrativeUnitDraft; supersedesRevisionId?: string },
    opts?: EngineCallOptions,
  ): Promise<{ structureRevisionId: string; contentSha256: string; receiptId: string; unitId: string }>;
  getAuthoringMode(propertyId: string): Promise<{ mode: AuthoringMode }>;
  setAuthoringMode(
    input: { propertyId: string; mode: AuthoringMode },
    opts?: EngineCallOptions,
  ): Promise<{ mode: AuthoringMode; from: AuthoringMode; receiptId: string }>;
  submitStructureProposal(
    input: { productionId: string; unit: NarrativeUnitDraft; supersedesRevisionId?: string },
    opts?: EngineCallOptions,
  ): Promise<{ proposalId: string; contentSha256: string; summary: string }>;
  listStructureProposals(propertyId: string): Promise<StructureProposalView[]>;
  decideStructureProposal(
    input: { proposalId: string; decision: "accepted" | "rejected" },
    opts?: EngineCallOptions,
  ): Promise<{ decisionId: string; appliedRevisionId: string | null; receiptId: string }>;
  getScenePacket(productionId: string, unitId: string): Promise<ScenePacketView>;
  runGeneration(
    input: {
      productionId: string;
      unitId: string;
      prompt: string;
      scenePurpose: string;
      emotionalObjective: string;
      lockedAttributes: string[];
      seed: number;
      adapterId: "mock" | "fal";
      endpoint?: string;
    },
    opts?: EngineCallOptions,
  ): Promise<{ generationRunId: string; candidateAssetVersionIds: string[] }>;
  listGenerationCandidates(): Promise<GenerationCandidateView[]>;
  listCanonProposals(propertyId: string): Promise<ProposalView[]>;
  getProposalContext(proposalId: string): Promise<ProposalContext | null>;
  canonChangeImpact(propertyId: string, targetRef: string): Promise<{ productionId: string }[]>;
  /** Read-only, navigation-only cross-domain search (DEC-0026). */
  search(query: string, propertyId?: string): Promise<SearchResult[]>;
  proposeCanon(
    input: {
      propertyId: string;
      branchId: string;
      proposalType: "entity" | "timeline_event";
      payload: Record<string, unknown>;
    },
    opts?: EngineCallOptions,
  ): Promise<{ proposalId: string }>;
  decideProposal(
    input: {
      proposalId: string;
      decision: "accepted" | "rejected" | "revision_requested";
      stableId?: string;
    },
    opts?: EngineCallOptions,
  ): Promise<{ decisionId: string; revisionId: string | null; receiptId: string }>;
  listCanonReleases(propertyId: string): Promise<ReleaseSummary[]>;
  snapshotCanonRelease(
    input: {
      propertyId: string;
      branchId: string;
      releaseName: string;
      releaseVersion: string;
      supersedesReleaseId?: string;
    },
    opts?: EngineCallOptions,
  ): Promise<{ canonReleaseId: string; contentSha256: string; receiptId: string }>;
  createProduction(
    input: { propertyId: string; pinnedCanonReleaseId: string; name: string },
    opts?: EngineCallOptions,
  ): Promise<{ productionId: string; receiptId: string }>;
  runEvaluation(
    input: { productionId: string; unitId: string; assetVersionId?: string },
    opts?: EngineCallOptions,
  ): Promise<{ findings: { findingId: string; document: Record<string, unknown> }[] }>;
  listContinuityFindings(productionId: string): Promise<FindingView[]>;
  disposeFinding(
    input: {
      findingId: string;
      disposition: "resolved" | "waived" | "intentional_exception" | "canon_change_proposed";
      waiver?: { reason: string; scope: string; expiry: string | null };
    },
    opts?: EngineCallOptions,
  ): Promise<{ findingRevisionId: string; receiptId: string }>;
  listGenerationProviders(): Promise<ProviderCatalogView[]>;
  listCredentials(): Promise<{ storeEnabled: boolean; credentials: CredentialStatusView[] }>;
  setCredential(
    input: { name: string; value: string },
    opts?: EngineCallOptions,
  ): Promise<{ credentialRevisionId: string; hint: string; receiptId: string }>;
  revokeCredential(
    input: { name: string },
    opts?: EngineCallOptions,
  ): Promise<{ credentialRevisionId: string; receiptId: string }>;
  getReceipt(receiptId: string): Promise<ReceiptView | null>;
}

export interface ProviderCatalogView {
  adapterId: "mock" | "fal";
  label: string;
  models: { id: string; label: string; costPerImage: number }[];
}

export interface CredentialStatusView {
  name: string;
  provider: string;
  label: string;
  note: string;
  scopes: string[];
  status: "absent" | "active" | "revoked" | "expired";
  hint: string | null;
  updatedAt: string | null;
}

export interface ProposalView {
  proposalId: string;
  branchId: string;
  proposalType: string;
  payload: Record<string, unknown>;
  sourceRef: string | null;
  proposedBy: string;
  proposerKind: string;
  createdAt: string;
  decision: string | null;
}

/** Deep provenance + before/after context for one proposal (SWUX-011). */
export interface ProposalContext {
  proposalId: string;
  branchId: string;
  proposalType: string;
  payload: Record<string, unknown>;
  proposedBy: string;
  proposerKind: string;
  sourceRef: string | null;
  sourceName: string | null;
  subjectStableId: string | null;
  currentValue: Record<string, unknown> | null;
  decision: string | null;
  decisionReceiptId: string | null;
}

export interface ReleaseSummary {
  canonReleaseId: string;
  releaseName: string;
  releaseVersion: string;
  contentSha256: string;
  createdAt: string;
  supersedesReleaseId: string | null;
}

/** A single read-only cross-domain search hit (DEC-0026); deepLink is a ready contextual URL. */
export interface SearchResult {
  type:
    | "property"
    | "entity"
    | "timeline_event"
    | "unit"
    | "finding"
    | "proposal"
    | "production"
    | "release";
  id: string;
  title: string;
  subtitle: string;
  propertyId: string;
  productionId: string | null;
  state: string;
  visibility: string | null;
  deepLink: string;
}

export interface FindingView {
  findingId: string;
  findingRevisionId: string;
  checkLayer: string;
  severity: string;
  disposition: string;
  document: {
    description?: string;
    suggested_remediation?: string | null;
    confidence?: number;
    evidence_refs?: string[];
    subject_refs?: string[];
    subject_sha256?: string[];
    waiver?: { reason?: string; scope?: string; expiry?: string | null; [key: string]: unknown };
    found_at?: string;
    [key: string]: unknown;
  };
  createdAt: string;
}

export const DEV_ACTOR: StudioActor = {
  id: "ryan-cooper",
  kind: "human",
  role: "property_owner",
};

/** The exact actor/authority line shown in every consequence review. */
export function actorLine(actor: StudioActor = DEV_ACTOR): string {
  return `${actor.id} · ${actor.role} · development identity — not verified · authority host: storyworld`;
}

export function engineBaseUrl(): string {
  return process.env["NEXT_PUBLIC_ENGINE_URL"] ?? "http://localhost:4400";
}

async function problemError(response: Response, path: string): Promise<EngineError> {
  let problemType = "unknown";
  let detail = `engine ${response.status} for ${path}`;
  try {
    const problem = (await response.json()) as Record<string, unknown>;
    const type = String(problem["type"] ?? "");
    problemType = type.includes("/") ? type.slice(type.lastIndexOf("/") + 1) : type || "unknown";
    if (typeof problem["detail"] === "string" && problem["detail"].length > 0) {
      detail = problem["detail"];
    }
  } catch {
    // Non-problem body; keep the generic detail.
  }
  return new EngineError(response.status, problemType, detail);
}

export function createEngineClient(
  base: string = engineBaseUrl(),
  actor: StudioActor = DEV_ACTOR,
): EngineClient {
  const identity = {
    "x-actor-id": actor.id,
    "x-actor-kind": actor.kind,
    "x-actor-role": actor.role,
  };

  async function get<T>(path: string): Promise<T> {
    const response = await fetch(`${base}${path}`, { headers: identity });
    if (!response.ok) {
      throw await problemError(response, path);
    }
    return (await response.json()) as T;
  }

  async function post<T>(path: string, body: unknown, opts?: EngineCallOptions): Promise<T> {
    let response: Response;
    try {
      response = await fetch(`${base}${path}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": opts?.idempotencyKey ?? crypto.randomUUID(),
          ...identity,
        },
        body: JSON.stringify(body),
      });
    } catch {
      throw new EngineUnknownOutcomeError(path);
    }
    if (!response.ok) {
      throw await problemError(response, path);
    }
    return (await response.json()) as T;
  }

  return {
    async health() {
      try {
        const response = await fetch(`${base}/v1/properties`, { headers: identity });
        return response.ok;
      } catch {
        return false;
      }
    },
    async listProperties() {
      const out = await get<{ properties: PropertySummary[] }>("/v1/properties");
      return out.properties;
    },
    async createProperty(input, opts) {
      return post<{ propertyId: string }>("/v1/properties", input, opts);
    },
    async listProductions(propertyId) {
      const out = await get<{ productions: ProductionSummary[] }>(
        `/v1/productions?propertyId=${encodeURIComponent(propertyId)}`,
      );
      return out.productions;
    },
    async latestCanonRelease(propertyId) {
      const out = await get<{ release: CanonReleaseView | null }>(
        `/v1/properties/${encodeURIComponent(propertyId)}/canon-releases/latest`,
      );
      return out.release;
    },
    async getNarrativeStructure(productionId) {
      const out = await get<{ structure: NarrativeStructureView | null }>(
        `/v1/productions/${encodeURIComponent(productionId)}/narrative-structure`,
      );
      return out.structure;
    },
    async saveNarrativeStructure(input, opts) {
      return post<{ structureRevisionId: string; contentSha256: string; receiptId: string }>(
        "/v1/narrative-units",
        input,
        opts,
      );
    },
    async addNarrativeUnit(input, opts) {
      return post<{ structureRevisionId: string; contentSha256: string; receiptId: string; unitId: string }>(
        "/v1/narrative-unit-additions",
        input,
        opts,
      );
    },
    async getAuthoringMode(propertyId) {
      return get<{ mode: AuthoringMode }>(
        `/v1/properties/${encodeURIComponent(propertyId)}/authoring-mode`,
      );
    },
    async setAuthoringMode(input, opts) {
      return post<{ mode: AuthoringMode; from: AuthoringMode; receiptId: string }>(
        "/v1/authoring-modes",
        input,
        opts,
      );
    },
    async submitStructureProposal(input, opts) {
      return post<{ proposalId: string; contentSha256: string; summary: string }>(
        "/v1/structure-proposals",
        input,
        opts,
      );
    },
    async listStructureProposals(propertyId) {
      const out = await get<{ proposals: StructureProposalView[] }>(
        `/v1/structure-proposals?propertyId=${encodeURIComponent(propertyId)}`,
      );
      return out.proposals;
    },
    async decideStructureProposal(input, opts) {
      return post<{ decisionId: string; appliedRevisionId: string | null; receiptId: string }>(
        "/v1/structure-proposal-decisions",
        input,
        opts,
      );
    },
    async getScenePacket(productionId, unitId) {
      return get<ScenePacketView>(
        `/v1/scenes/${encodeURIComponent(unitId)}/state-packet?productionId=${encodeURIComponent(productionId)}`,
      );
    },
    async runGeneration(input, opts) {
      return post<{ generationRunId: string; candidateAssetVersionIds: string[] }>(
        "/v1/generation-runs",
        input,
        opts,
      );
    },
    async listGenerationCandidates() {
      const out = await get<{ candidates: GenerationCandidateView[] }>("/v1/generation-candidates");
      return out.candidates;
    },
    async proposeCanon(input, opts) {
      return post<{ proposalId: string }>("/v1/canon-proposals", input, opts);
    },
    async listCanonProposals(propertyId) {
      const out = await get<{ proposals: ProposalView[] }>(
        `/v1/canon-proposals?propertyId=${encodeURIComponent(propertyId)}`,
      );
      return out.proposals;
    },
    async getProposalContext(proposalId) {
      try {
        const out = await get<{ context: ProposalContext }>(
          `/v1/canon-proposals/${encodeURIComponent(proposalId)}/context`,
        );
        return out.context;
      } catch (cause) {
        if (cause instanceof EngineError && cause.status === 404) return null;
        throw cause;
      }
    },
    async canonChangeImpact(propertyId, targetRef) {
      const out = await get<{ impact: { productionId: string }[] }>(
        `/v1/canon-change-impact?propertyId=${encodeURIComponent(propertyId)}&targetRef=${encodeURIComponent(targetRef)}`,
      );
      return out.impact;
    },
    async search(query, propertyId) {
      const term = query.trim();
      if (term.length < 2) return [];
      const params = new URLSearchParams({ q: term });
      if (propertyId) params.set("propertyId", propertyId);
      const out = await get<{ results: SearchResult[] }>(`/v1/search?${params.toString()}`);
      return out.results;
    },
    async decideProposal(input, opts) {
      return post<{ decisionId: string; revisionId: string | null; receiptId: string }>(
        "/v1/review-decisions",
        input,
        opts,
      );
    },
    async listCanonReleases(propertyId) {
      const out = await get<{ releases: ReleaseSummary[] }>(
        `/v1/canon-releases?propertyId=${encodeURIComponent(propertyId)}`,
      );
      return out.releases;
    },
    async snapshotCanonRelease(input, opts) {
      return post<{ canonReleaseId: string; contentSha256: string; receiptId: string }>(
        "/v1/canon-releases",
        input,
        opts,
      );
    },
    async createProduction(input, opts) {
      return post<{ productionId: string; receiptId: string }>("/v1/productions", input, opts);
    },
    async runEvaluation(input, opts) {
      return post<{ findings: { findingId: string; document: Record<string, unknown> }[] }>(
        "/v1/evaluations",
        input,
        opts,
      );
    },
    async listContinuityFindings(productionId) {
      const out = await get<{ findings: FindingView[] }>(
        `/v1/continuity-findings?productionId=${encodeURIComponent(productionId)}`,
      );
      return out.findings;
    },
    async disposeFinding(input, opts) {
      return post<{ findingRevisionId: string; receiptId: string }>(
        "/v1/finding-dispositions",
        input,
        opts,
      );
    },
    async listGenerationProviders() {
      const out = await get<{ providers: ProviderCatalogView[] }>("/v1/generation-providers");
      return out.providers;
    },
    async listCredentials() {
      return get<{ storeEnabled: boolean; credentials: CredentialStatusView[] }>("/v1/credentials");
    },
    async setCredential(input, opts) {
      return post<{ credentialRevisionId: string; hint: string; receiptId: string }>(
        "/v1/credentials",
        input,
        opts,
      );
    },
    async revokeCredential(input, opts) {
      return post<{ credentialRevisionId: string; receiptId: string }>(
        "/v1/credential-revocations",
        input,
        opts,
      );
    },
    async getReceipt(receiptId) {
      try {
        const out = await get<{ receipt: ReceiptView }>(`/v1/receipts/${encodeURIComponent(receiptId)}`);
        return out.receipt;
      } catch (cause) {
        if (cause instanceof EngineError && cause.status === 404) return null;
        throw cause;
      }
    },
  };
}
