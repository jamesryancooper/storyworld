import { contentSha256 } from "@storyworld/domain";
import type { GenerationOutcome, ProviderAdapter } from "./types.js";

/**
 * Deterministic mock adapter: output bytes derive from the recipe hash and
 * seed, so identical recipes yield identical candidates — the fixed point
 * for provider-swap and revision tests. Costs nothing; proves the gateway.
 */
export function createMockAdapter(): ProviderAdapter {
  return {
    providerId: "mock",
    endpoints: ["mock/deterministic"],
    async generate(endpoint, request): Promise<GenerationOutcome> {
      const candidates = [];
      for (let index = 0; index < request.numImages; index += 1) {
        const seed = (request.seed ?? 0) + index;
        const payload = `mock-image|${request.recipeSha256}|${seed}|${request.width}x${request.height}|${request.prompt}`;
        candidates.push({
          bytes: new TextEncoder().encode(
            `${payload}|${contentSha256(payload)}`,
          ),
          mediaType: "image/png",
          seed,
          providerMetadata: { deterministic: 1 },
        });
      }
      return {
        candidates,
        providerId: "mock",
        endpoint,
        providerRequestId: `mock-${request.recipeSha256.slice(0, 12)}`,
        costEstimate: { amount: 0, currency: "USD" },
      };
    },
  };
}
