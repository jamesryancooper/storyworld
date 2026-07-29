/**
 * Engine API client: the Studio's only path to state. Every mutation
 * carries an Idempotency-Key and the acting identity; reads are plain
 * GETs. Dev identity headers pending real federation (O1).
 */
export interface StudioActor {
  id: string;
  kind: "human" | "model" | "service";
  role: string;
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
  document: {
    structure_id?: string;
    narrative_units?: Record<string, unknown>[];
    threads?: Record<string, unknown>[];
    [key: string]: unknown;
  };
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

export interface EngineClient {
  health(): Promise<boolean>;
  listProperties(): Promise<PropertySummary[]>;
  createProperty(input: {
    workspaceName: string;
    propertyName: string;
    propertyType: string;
  }): Promise<{ propertyId: string }>;
  listProductions(propertyId: string): Promise<ProductionSummary[]>;
  latestCanonRelease(propertyId: string): Promise<CanonReleaseView | null>;
  getNarrativeStructure(productionId: string): Promise<NarrativeStructureView | null>;
  saveNarrativeStructure(input: {
    productionId: string;
    document: Record<string, unknown>;
    supersedesRevisionId?: string;
  }): Promise<{ structureRevisionId: string }>;
  getScenePacket(productionId: string, unitId: string): Promise<ScenePacketView>;
  runGeneration(input: {
    productionId: string;
    unitId: string;
    prompt: string;
    scenePurpose: string;
    emotionalObjective: string;
    lockedAttributes: string[];
    seed: number;
    adapterId: "mock" | "fal";
    endpoint?: string;
  }): Promise<{ generationRunId: string; candidateAssetVersionIds: string[] }>;
  listGenerationCandidates(): Promise<GenerationCandidateView[]>;
  listCanonProposals(propertyId: string): Promise<ProposalView[]>;
  decideProposal(input: {
    proposalId: string;
    decision: "accepted" | "rejected" | "revision_requested";
    stableId?: string;
  }): Promise<{ decisionId: string }>;
  listCanonReleases(propertyId: string): Promise<ReleaseSummary[]>;
  snapshotCanonRelease(input: {
    propertyId: string;
    branchId: string;
    releaseName: string;
    releaseVersion: string;
    supersedesReleaseId?: string;
  }): Promise<{ canonReleaseId: string }>;
  createProduction(input: {
    propertyId: string;
    pinnedCanonReleaseId: string;
    name: string;
  }): Promise<{ productionId: string }>;
  runEvaluation(input: {
    productionId: string;
    unitId: string;
    assetVersionId?: string;
  }): Promise<{ findings: { findingId: string; document: Record<string, unknown> }[] }>;
  listContinuityFindings(productionId: string): Promise<FindingView[]>;
  disposeFinding(input: {
    findingId: string;
    disposition: "resolved" | "waived" | "intentional_exception" | "canon_change_proposed";
    waiver?: { reason: string; scope: string; expiry: string | null };
  }): Promise<{ findingRevisionId: string }>;
}

export interface ProposalView {
  proposalId: string;
  branchId: string;
  proposalType: string;
  payload: Record<string, unknown>;
  proposedBy: string;
  proposerKind: string;
  createdAt: string;
  decision: string | null;
}

export interface ReleaseSummary {
  canonReleaseId: string;
  releaseName: string;
  releaseVersion: string;
  contentSha256: string;
  createdAt: string;
  supersedesReleaseId: string | null;
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
    [key: string]: unknown;
  };
  createdAt: string;
}

export const DEV_ACTOR: StudioActor = {
  id: "ryan-cooper",
  kind: "human",
  role: "property_owner",
};

export function engineBaseUrl(): string {
  return process.env["NEXT_PUBLIC_ENGINE_URL"] ?? "http://localhost:4400";
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
      throw new Error(`engine GET ${path} failed: ${response.status}`);
    }
    return (await response.json()) as T;
  }

  async function post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": crypto.randomUUID(),
        ...identity,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`engine POST ${path} failed: ${response.status}`);
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
    async createProperty(input) {
      return post<{ propertyId: string }>("/v1/properties", input);
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
    async saveNarrativeStructure(input) {
      return post<{ structureRevisionId: string }>("/v1/narrative-units", input);
    },
    async getScenePacket(productionId, unitId) {
      return get<ScenePacketView>(
        `/v1/scenes/${encodeURIComponent(unitId)}/state-packet?productionId=${encodeURIComponent(productionId)}`,
      );
    },
    async runGeneration(input) {
      return post<{ generationRunId: string; candidateAssetVersionIds: string[] }>(
        "/v1/generation-runs",
        input,
      );
    },
    async listGenerationCandidates() {
      const out = await get<{ candidates: GenerationCandidateView[] }>("/v1/generation-candidates");
      return out.candidates;
    },
    async listCanonProposals(propertyId) {
      const out = await get<{ proposals: ProposalView[] }>(
        `/v1/canon-proposals?propertyId=${encodeURIComponent(propertyId)}`,
      );
      return out.proposals;
    },
    async decideProposal(input) {
      return post<{ decisionId: string }>("/v1/review-decisions", input);
    },
    async listCanonReleases(propertyId) {
      const out = await get<{ releases: ReleaseSummary[] }>(
        `/v1/canon-releases?propertyId=${encodeURIComponent(propertyId)}`,
      );
      return out.releases;
    },
    async snapshotCanonRelease(input) {
      return post<{ canonReleaseId: string }>("/v1/canon-releases", input);
    },
    async createProduction(input) {
      return post<{ productionId: string }>("/v1/productions", input);
    },
    async runEvaluation(input) {
      return post<{ findings: { findingId: string; document: Record<string, unknown> }[] }>(
        "/v1/evaluations",
        input,
      );
    },
    async listContinuityFindings(productionId) {
      const out = await get<{ findings: FindingView[] }>(
        `/v1/continuity-findings?productionId=${encodeURIComponent(productionId)}`,
      );
      return out.findings;
    },
    async disposeFinding(input) {
      return post<{ findingRevisionId: string }>("/v1/finding-dispositions", input);
    },
  };
}
