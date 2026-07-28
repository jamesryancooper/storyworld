# ADR-0006 — Temporal coordinates durable production workflows; contracts stay orchestrator-neutral

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: durable workflow orchestration for production, review, release, and reconciliation
- Canonical sources: part 03 §9.2, §10.1, Appendix A ADR-006
- Revision note: the drafted record deferred engine selection to F2; at
  acceptance the project owner decided the selection directly. Temporal is
  chosen now.

## Context

Generation, review, and release workflows are long-running, cancellable,
budget-capped, and gated by humans. Losing workflow state on restart, or
double-executing side effects, would violate the platform's custody
guarantees. The draft of this record proposed comparing Temporal against
lighter PostgreSQL-native durable-execution options at F2 entry; the owner
reviewed that framing and elected to commit, consistent with canonical
Appendix A.

## Decision

1. **Temporal is the platform's durable workflow orchestrator**, per the
   owner's acceptance decision of 2026-07-28: durable retries, waits and
   human gates, cancellation, resumability, budget/priority controls for
   production workflows (part 03 §10.1).
2. All contracts (APIs, events, packages) remain **orchestrator-neutral**:
   correlation, idempotency, and lifecycle semantics never expose the
   engine's identity. Workflow definitions derive from the contract-pack
   lifecycle state machines, not vice versa. This preserves portability
   (ADR-0014) and keeps a future engine change an implementation migration,
   not a contract migration.
3. Deployment shape (self-hosted dev-server vs. managed/Temporal Cloud) is
   an F2 operational decision within this ADR, not a reopening of it.

## Consequences

- F2/B1 build directly on Temporal (dev server in the local Compose
  profile); no comparison phase is scheduled.
- Operational responsibility for a Temporal deployment is accepted as part
  of the platform's cost.
- Orchestrator-neutral contracts remain enforceable in review: any schema or
  API leaking Temporal identifiers is a defect.

## Alternatives considered

- Deferring selection to an F2 comparison (this record's drafted position):
  rejected by the owner in favor of certainty and alignment with Appendix A.
- PostgreSQL-native durable execution (DBOS-/graphile-worker-style) or
  hosted equivalents: not selected; revisiting would require a successor
  record with operational evidence.
- Ad-hoc cron plus queues: rejected — reinvents durable execution poorly.
