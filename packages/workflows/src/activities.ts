import { heartbeat } from "@temporalio/activity";
import { ApplicationFailure } from "@temporalio/common";
import { createCredentialBroker } from "@storyworld/credentials";
import type { KernelContext } from "@storyworld/kernel";
import {
  createFalAdapter,
  createMockAdapter,
  ProviderCapabilityError,
  ProviderRequestError,
  runGeneration,
  type ProviderAdapter,
} from "@storyworld/providers";
import type { GenerationWorkflowInput, GenerationWorkflowResult } from "./workflows.js";

/**
 * Activity implementations. The worker constructs these with a live kernel
 * context; adapters resolve per input. Failed activities stage nothing —
 * runGeneration is transactional (B1 gate: failure cannot corrupt accepted
 * state).
 */
export function buildActivities(makeCtx: (organizationId: string) => KernelContext): {
  runGenerationActivity(input: GenerationWorkflowInput): Promise<GenerationWorkflowResult>;
} {
  return {
    async runGenerationActivity(input) {
      heartbeat("starting");
      const ctx = makeCtx(input.organizationId);
      const adapter: ProviderAdapter =
        input.adapterId === "mock"
          ? createMockAdapter()
          : createFalAdapter({
              // Broker chain: encrypted store first, environment second; a
              // revoked key denies and never falls back (reserved crossing).
              falKey: await createCredentialBroker(ctx).resolve("fal", "generation"),
              ...(process.env["FAL_BASE_URL"] ? { baseUrl: process.env["FAL_BASE_URL"] } : {}),
            });
      try {
        const result = await runGeneration(ctx, input.actor, {
          recipeDocument: input.recipeDocument,
          recipeSha256: input.recipeSha256,
          adapter,
          endpoint: input.endpoint,
        });
        heartbeat("staged");
        return result;
      } catch (error) {
        if (error instanceof ProviderCapabilityError) {
          throw ApplicationFailure.create({ type: "ProviderCapability", message: error.message, nonRetryable: true });
        }
        if (error instanceof ProviderRequestError && /reserved crossing/.test(error.message)) {
          throw ApplicationFailure.create({ type: "ReservedCrossing", message: error.message, nonRetryable: true });
        }
        if (error instanceof ProviderRequestError && /exceeds recipe ceiling/.test(error.message)) {
          throw ApplicationFailure.create({ type: "BudgetExceeded", message: error.message, nonRetryable: true });
        }
        throw error;
      }
    },
  };
}
