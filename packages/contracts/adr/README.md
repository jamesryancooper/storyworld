# Product Architecture Decision Records (F0)

Product ADRs for the Storyworld platform. These are distinct from the
harness's governance decisions in `.agent/decisions/`:

- **ADR-#### here** = what the *platform* is (deployment boundary, identity,
  assets, approvals, publication, runtime state, analytics, portability…).
- **DEC-#### there** = how this *repository* is governed.

## Current set

| ADR | Decision | Status |
|---|---|---|
| [ADR-0001](ADR-0001-independent-deployment-and-database.md) | Independent deployment; owns its database | proposed |
| [ADR-0002](ADR-0002-studio-uses-public-contracts-only.md) | Studio uses public contracts only | proposed |
| [ADR-0003](ADR-0003-modular-monolith-plus-workers.md) | Modular monolith plus async workers | proposed |
| [ADR-0004](ADR-0004-postgresql-authoritative-projections-rebuildable.md) | PostgreSQL authoritative; projections rebuildable | proposed |
| [ADR-0005](ADR-0005-immutable-object-storage.md) | Immutable content-addressed object storage | proposed |
| [ADR-0006](ADR-0006-durable-workflow-orchestration.md) | Durable orchestration; orchestrator-neutral contracts; selection at F2 | proposed |
| [ADR-0007](ADR-0007-governed-agent-execution.md) | Capability-leased agent execution; Octon non-blocking | proposed |
| [ADR-0008](ADR-0008-models-propose-humans-authorize.md) | Models and tools propose only | proposed |
| [ADR-0009](ADR-0009-immutable-versions-explicit-supersession.md) | Immutable versions; explicit supersession | proposed |
| [ADR-0010](ADR-0010-commerce-foundry-contract-integration.md) | CF integration by snapshots, packages, events, receipts | proposed |
| [ADR-0011](ADR-0011-commerce-foundry-final-commercial-authority.md) | CF final commercial authority | proposed |
| [ADR-0012](ADR-0012-runtime-content-boundary.md) | Runtime imports immutable releases; owns player state | proposed |
| [ADR-0013](ADR-0013-instagram-first-adapter-not-core.md) | Instagram is an adapter, not core domain | proposed |
| [ADR-0014](ADR-0014-portable-export-always-works.md) | Portable export always works | proposed |
| [ADR-0015](ADR-0015-provider-neutral-recipes-canonical.md) | Provider-neutral recipes canonical | proposed |
| [ADR-0016](ADR-0016-evidence-gated-service-extraction.md) | Evidence-gated service extraction | proposed |

Seeded from canonical Appendix A (ADR-1..16 → ADR-0001..0016). ADR-0006 and
ADR-0007 are deliberately framed as category/interface commitments with
selection checkpoints, reflecting the 2026 tooling landscape review recorded
in this repository's session history; every other record formalizes Appendix
A directly.

## Record format

Each ADR contains: status line (`proposed` | `accepted` | `superseded by
ADR-####`, with date and accepting authority), scope, canonical sources,
context, decision, consequences, and alternatives considered.

## Acceptance rule

An ADR becomes authoritative only through the F0 exit-gate evaluation
(GATE-0002) and an umbrella harness decision in `.agent/decisions/`
recording the owner's acceptance of the ADR set — proposed as `DEC-0006`.
Until then every record stays `proposed`. Supersession never deletes a
record; it links a successor.
