import type { KernelContext } from "@storyworld/kernel";
import { CredentialDeniedError, issueCredential } from "./service.js";

/**
 * The credential broker — the single runtime path to provider secret
 * material (CF broker pattern). Chain: encrypted store first, operator
 * environment second, resolved PER REQUEST so plaintext lifetime is one
 * call and a newly entered key needs no restart. A revoked/expired stored
 * credential DENIES and never falls back to an environment copy.
 */

export interface CredentialBroker {
  resolve(name: string, scope: string): Promise<string | null>;
}

const ENV_NAMES: Record<string, string[]> = {
  fal: ["FAL_KEY"],
};

export function createCredentialBroker(
  ctx: KernelContext,
  env: Record<string, string | undefined> = process.env,
): CredentialBroker {
  return {
    async resolve(name, _scope) {
      let stored: string | null;
      try {
        stored = await issueCredential(ctx, name);
      } catch (error) {
        if (error instanceof CredentialDeniedError) return null; // denial stops the chain
        stored = null; // degraded store: fall through to env
      }
      if (stored !== null) return stored;
      for (const variable of ENV_NAMES[name] ?? []) {
        const value = env[variable];
        if (value && value.trim()) return value.trim();
      }
      return null;
    },
  };
}
