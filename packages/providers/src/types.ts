/**
 * Provider gateway contracts (B1; ADR-0015): the canonical specification is
 * the generation-recipe document; adapters translate it and return
 * candidates with complete provenance. Replacing an adapter never changes
 * canonical data.
 */
export interface GenerationRequestNormalized {
  recipeSha256: string;
  prompt: string;
  negativePrompt: string | null;
  seed: number | null;
  numImages: number;
  width: number;
  height: number;
  lockedAttributes: string[];
  costCeiling: { amount: number; currency: string };
}

export interface GeneratedCandidate {
  bytes: Uint8Array;
  mediaType: string;
  seed: number | null;
  providerMetadata: Record<string, string | number | null>;
}

export interface GenerationOutcome {
  candidates: GeneratedCandidate[];
  providerId: string;
  endpoint: string;
  providerRequestId: string | null;
  costEstimate: { amount: number; currency: string };
}

export interface ProviderAdapter {
  providerId: string;
  /** Endpoints this adapter is allowlisted to call. */
  endpoints: string[];
  generate(endpoint: string, request: GenerationRequestNormalized): Promise<GenerationOutcome>;
}

export class ProviderRequestError extends Error {}
export class ProviderCapabilityError extends Error {}
export class ProviderRateLimitError extends Error {
  constructor(message: string, public readonly retryAfterSeconds: number | null) {
    super(message);
  }
}
