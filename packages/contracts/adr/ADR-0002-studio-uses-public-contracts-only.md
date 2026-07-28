# ADR-0002 — Studio uses only public Engine application contracts

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: relationship between Storyworld Studio and Storyworld Engine
- Canonical sources: part 01 §2.2, part 02 §6, part 04 §14.1, Appendix A ADR-002

## Context

First-party clients drift toward privileged back doors: direct table reads,
internal endpoints, client-side caches that quietly become truth. Every such
shortcut creates a second source of truth and makes the public API a
second-class citizen that external consumers cannot trust.

## Decision

Storyworld Studio is a client. It issues commands and renders state
exclusively through the public Engine application contracts. It keeps no
independent copy of domain state and holds no independent authority. A
Studio-specific backend-for-frontend may aggregate views but cannot bypass
the application service, authorization, or invariants available through
public commands.

## Consequences

- The public API is exercised by the most demanding client from day one;
  contract gaps surface immediately.
- Every Studio feature costs API work first — accepted as the price of one
  source of truth.
- CLI, SDK, and integration consumers get the same power as Studio.

## Alternatives considered

- Privileged internal API for Studio: rejected — divergent capability tiers
  and untested public contracts.
- Studio-owned working copies with sync: rejected — dual-write hazard and
  approval-state ambiguity.
