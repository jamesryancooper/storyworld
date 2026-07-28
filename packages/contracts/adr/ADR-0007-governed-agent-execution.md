# ADR-0007 — Agent execution is capability-leased and mission-scoped; Octon is not an authority store

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: how agentic work executes against Storyworld
- Canonical sources: part 03 §9.2, part 05 §15.2, Appendix A ADR-007

## Context

Agentic reasoning accelerates planning, extraction, evaluation, and
adaptation, but an agent with standing write access to canon or approvals
would break the governance model. Octon (the intended governed execution
platform) does not yet exist; waiting on it would block agent-assisted work,
and integrating it as a data owner would create a second authority.

## Decision

Every agent or tool mission receives a revocable capability lease scoped to
exact tenant/workspace/project/assets/versions, permitted commands and
staging destinations, provider and cost budgets, expiry, and required
evidence. Agents write only to proposal and staging commands; they can
never accept canon, approve rights, waive blockers, authorize publication,
or modify another authority system. Storyworld defines this
capability/policy interface locally first; Octon, when available, becomes an
implementation of it holding missions, leases, and execution receipts —
never Storyworld business records.

## Consequences

- Agent assistance is available from the first build phase without Octon
  (dependency DEP-0002 stays non-blocking).
- The lease model appears in F1 contracts as first-class records.
- Octon adoption later is an implementation swap, not a data migration.

## Alternatives considered

- Wait for Octon: rejected — blocks agent-assisted development and pilots.
- Direct agent DB access with prompt-level rules: rejected — policy without
  enforcement surface.
