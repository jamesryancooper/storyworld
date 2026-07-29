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
  };
}
