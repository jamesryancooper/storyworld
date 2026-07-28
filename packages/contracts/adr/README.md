# Product Architecture Decision Records (F0)

Product ADRs for the Storyworld platform. These are distinct from the
harness's governance decisions in `.agent/decisions/`:

- **ADR-#### here** = what the *platform* is (deployment boundary, identity,
  assets, approvals, publication, runtime state, analytics, portability…).
- **DEC-#### there** = how this *repository* is governed.

## Current set

| ADR | Decision | Status |
|---|---|---|
| [ADR-0001](ADR-0001-independent-deployment-and-database.md) | Independent deployment; owns its database | accepted |
| [ADR-0002](ADR-0002-studio-uses-public-contracts-only.md) | Studio uses public contracts only | accepted |
| [ADR-0003](ADR-0003-modular-monolith-plus-workers.md) | Modular monolith plus async workers | accepted |
| [ADR-0004](ADR-0004-postgresql-authoritative-projections-rebuildable.md) | PostgreSQL authoritative; projections rebuildable | accepted |
| [ADR-0005](ADR-0005-immutable-object-storage.md) | Immutable content-addressed object storage | accepted |
| [ADR-0006](ADR-0006-durable-workflow-orchestration.md) | Temporal for durable orchestration; orchestrator-neutral contracts | accepted |
| [ADR-0007](ADR-0007-governed-agent-execution.md) | Capability-leased agent execution; Octon non-blocking | accepted |
| [ADR-0008](ADR-0008-models-propose-humans-authorize.md) | Models and tools propose only | accepted |
| [ADR-0009](ADR-0009-immutable-versions-explicit-supersession.md) | Immutable versions; explicit supersession | accepted |
| [ADR-0010](ADR-0010-commerce-foundry-contract-integration.md) | CF integration by snapshots, packages, events, receipts | accepted |
| [ADR-0011](ADR-0011-commerce-foundry-final-commercial-authority.md) | CF final commercial authority | accepted |
| [ADR-0012](ADR-0012-runtime-content-boundary.md) | Runtime imports immutable releases; owns player state | accepted |
| [ADR-0013](ADR-0013-instagram-first-adapter-not-core.md) | Instagram is an adapter, not core domain | accepted |
| [ADR-0014](ADR-0014-portable-export-always-works.md) | Portable export always works | accepted |
| [ADR-0015](ADR-0015-provider-neutral-recipes-canonical.md) | Provider-neutral recipes canonical | accepted |
| [ADR-0016](ADR-0016-evidence-gated-service-extraction.md) | Evidence-gated service extraction | accepted |

Seeded from canonical Appendix A (ADR-1..16 → ADR-0001..0016) and accepted
2026-07-28 via DEC-0006 (GATE-0002). At acceptance the owner revised
ADR-0006 to select Temporal directly (rather than deferring to an F2
comparison) and confirmed ADR-0007's Octon-non-blocking capability-lease
interface as drafted.

## Record format

Each ADR contains: status line (`proposed` | `accepted` | `superseded by
ADR-####`, with date and accepting authority), scope, canonical sources,
context, decision, consequences, and alternatives considered.

## Acceptance rule

This set was accepted through GATE-0002 via `DEC-0006` (accepted
2026-07-28). Changing an accepted ADR requires a successor record and a
harness decision; supersession never deletes a record.
