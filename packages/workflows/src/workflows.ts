import {
  ApplicationFailure,
  proxyActivities,
} from "@temporalio/workflow";

/**
 * Durable generation workflow (B1; ADR-0006). Orchestrator-neutral
 * semantics live in the contracts; this file is the Temporal-specific
 * derivation. Budget is enforced before staging cost is accepted; retries
 * are bounded; cancellation propagates to the activity.
 */
export interface GenerationWorkflowInput {
  recipeDocument: Record<string, unknown>;
  recipeSha256: string;
  adapterId: "mock" | "fal";
  endpoint: string;
  organizationId: string;
  actor: { id: string; kind: string; role: string };
}

export interface GenerationWorkflowResult {
  generationRunId: string;
  candidateAssetVersionIds: string[];
}

const { runGenerationActivity } = proxyActivities<{
  runGenerationActivity(input: GenerationWorkflowInput): Promise<GenerationWorkflowResult>;
}>({
  startToCloseTimeout: "5 minutes",
  heartbeatTimeout: "1 minute",
  retry: {
    maximumAttempts: 3,
    initialInterval: "2 seconds",
    backoffCoefficient: 2,
    nonRetryableErrorTypes: ["BudgetExceeded", "ProviderCapability", "ReservedCrossing"],
  },
});

export async function generationWorkflow(
  input: GenerationWorkflowInput,
): Promise<GenerationWorkflowResult> {
  const ceiling = (input.recipeDocument["cost_ceiling"] ?? {}) as { amount?: number };
  if (!ceiling.amount || ceiling.amount <= 0) {
    throw ApplicationFailure.create({
      type: "BudgetExceeded",
      message: "recipe carries no positive cost ceiling; refusing to run",
      nonRetryable: true,
    });
  }
  return runGenerationActivity(input);
}
