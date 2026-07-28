# ADR-0006 — Durable workflow orchestration coordinates production; contracts stay orchestrator-neutral

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: the orchestration category commitment and its selection checkpoint
- Canonical sources: part 03 §9.2, §10.1, Appendix A ADR-006

## Context

Generation, review, and release workflows are long-running, cancellable,
budget-capped, and gated by humans. Losing workflow state on restart, or
double-executing side effects, would violate the platform's custody
guarantees. Appendix A named Temporal; since that writing, credible
lighter-weight durable-execution options (PostgreSQL-native job/workflow
runners and hosted services) have matured, and the operator burden of a
dedicated orchestration cluster matters for a small team.

## Decision

1. Durable workflow execution is a required architectural capability:
   resumable across restarts, at-least-once activities with idempotent
   effects, explicit cancellation, human-gate waits, budget and priority
   controls.
2. All F1 contracts (APIs, events, packages) are orchestrator-neutral:
   correlation and idempotency semantics never expose an engine's identity.
3. **Temporal is the leading candidate**, consistent with Appendix A. Final
   selection is an F2-entry decision comparing Temporal against
   PostgreSQL-native durable execution (e.g., DBOS- or graphile-worker-style)
   and hosted equivalents, on operational burden, human-gate ergonomics,
   testing/replay, and exit cost. The comparison and selection will be
   recorded as a successor or amending decision with evidence.

## Consequences

- F1 proceeds without waiting on the engine choice.
- The selection is reversible in design: workflow definitions compile from
  domain state machines, not vice versa.
- A deliberate second decision point exists at F2 entry.

## Alternatives considered

- Locking Temporal now: rejected — no F0/F1 work needs it, and the 2025–26
  alternative field justifies one evidence-based comparison at the point of
  real need.
- Ad-hoc cron plus queues: rejected — reinvents durable execution poorly.
