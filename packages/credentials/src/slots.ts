/**
 * Provider-credential slots: an explicit allowlist, never a free-form
 * secret bag (CF provider_slots pattern). Adding a slot is a reviewed
 * code change. The InvokeAI install keeps its own key inside InvokeAI's
 * External Providers settings — it is deliberately NOT a slot here.
 */

export interface ProviderSlot {
  name: string;
  provider: string;
  scopes: string[];
  label: string;
  note: string;
}

export const PROVIDER_SLOTS: Record<string, ProviderSlot> = {
  fal: {
    name: "fal",
    provider: "fal.ai",
    scopes: ["generation"],
    label: "fal.ai key (engine generation)",
    note: "Entering a key opens the hosted-generation reserved crossing: real egress and per-image spend, ceiling-checked per recipe.",
  },
};

export class ProviderSlotError extends Error {}

export function requireSlot(name: string): ProviderSlot {
  const slot = PROVIDER_SLOTS[name];
  if (!slot) {
    throw new ProviderSlotError(
      `"${name}" is not a provider-credential slot; slots are an allowlisted, reviewed set`,
    );
  }
  return slot;
}

/** Redacted display hint: enough to recognize a key, never enough to use one. */
export function credentialHint(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= 8) return `${trimmed.slice(0, 2)}… (${trimmed.length} chars)`;
  return `${trimmed.slice(0, 4)}…${trimmed.slice(-2)} (${trimmed.length} chars)`;
}
