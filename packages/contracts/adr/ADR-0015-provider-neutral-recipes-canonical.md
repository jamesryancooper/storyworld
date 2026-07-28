# ADR-0015 — Provider-neutral recipes are canonical; provider prompts and embeddings are derivatives

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: generation specification and provider attachment semantics
- Canonical sources: part 03 §8.5, §10.2, Appendix A ADR-015

## Context

Media providers and models are the fastest-changing layer in the stack;
native character-consistency and reference-conditioning capabilities shift
quarterly. If canonical data encoded any provider's prompt dialect, LoRA,
seed, or persistent ID, every provider improvement would demand a data
migration — and provider lock-in would be structural.

## Decision

The canonical generation specification is the structured recipe: scene
purpose, entering/exiting state, pinned canon facts, cast/location/object
references, locked and flexible attributes, negative references, fidelity
and disclosure requirements, format rules, cost ceiling, evaluation plan.
Reference packs are provider-neutral. Provider-specific artifacts — rendered
prompts, embeddings, LoRAs, seeds, control networks, persistent IDs —
attach to recipes and reference packs as replaceable implementation
details. Replacing a provider changes attachments and adapters, never
canonical data (B1 exit gate).

## Consequences

- Provider competition is harvested rather than suffered.
- Recipes are auditable: any output answers "which facts, references, and
  parameters produced this."
- Adapter authors carry the translation burden — by design.

## Alternatives considered

- Prompt-string canonical storage: rejected — opaque, unauditable,
  provider-coupled.
- Standardizing on one provider's workflow format: rejected — same lock-in
  with extra steps.
