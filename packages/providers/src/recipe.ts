import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import { compileScenePacket, type KernelContext } from "@storyworld/kernel";
import type { GenerationRequestNormalized } from "./types.js";

/**
 * Compile a provider-neutral generation recipe (F1 contract
 * generation-recipe.v1) from the production's pinned canon via the scene
 * state packet. Locked attributes always reach the recipe (B1 gate).
 */
export async function compileGenerationRecipe(
  ctx: KernelContext,
  input: {
    productionId: string;
    unitId: string;
    scenePurpose: string;
    emotionalObjective: string;
    prompt: string;
    negativePrompt?: string;
    lockedAttributes: string[];
    flexibleAttributes?: string[];
    width?: number;
    height?: number;
    numImages?: number;
    seed?: number;
    costCeiling?: { amount: number; currency: string };
  },
): Promise<{ document: Record<string, unknown>; sha256: string }> {
  const packet = await compileScenePacket(ctx, {
    productionId: input.productionId,
    unitId: input.unitId,
  });
  const document: Record<string, unknown> = {
    schema_version: "storyworld.generation-recipe.v1",
    recipe_id: uuidv7(),
    scene_purpose: input.scenePurpose,
    emotional_objective: input.emotionalObjective,
    entering_state_summary: String(packet["entering_state_summary"]),
    scene_state_packet_ref: String(packet["packet_id"]),
    canon_release_ref: String(packet["canon_release_ref"]),
    pinned_entity_states: packet["entity_states"],
    prompt: input.prompt,
    negative_prompt: input.negativePrompt ?? null,
    locked_attributes: input.lockedAttributes,
    flexible_attributes: input.flexibleAttributes ?? [],
    reference_pack_refs: packet["reference_pack_refs"],
    format_rules: {
      width: input.width ?? 1024,
      height: input.height ?? 1024,
      num_images: input.numImages ?? 1,
    },
    seed: input.seed ?? null,
    provider_capability_requirements: ["txt2img"],
    cost_ceiling: input.costCeiling ?? { amount: 0.5, currency: "USD" },
    evaluation_plan_refs: [],
    created_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  };
  return { document, sha256: contentSha256(canonicalJson(document)) };
}

export function normalizeRecipe(
  document: Record<string, unknown>,
  sha256: string,
): GenerationRequestNormalized {
  const format = document["format_rules"] as Record<string, number>;
  const ceiling = document["cost_ceiling"] as { amount: number; currency: string };
  return {
    recipeSha256: sha256,
    prompt: String(document["prompt"]),
    negativePrompt: (document["negative_prompt"] as string | null) ?? null,
    seed: (document["seed"] as number | null) ?? null,
    numImages: format["num_images"] ?? 1,
    width: format["width"] ?? 1024,
    height: format["height"] ?? 1024,
    lockedAttributes: (document["locked_attributes"] as string[]) ?? [],
    costCeiling: ceiling,
  };
}
