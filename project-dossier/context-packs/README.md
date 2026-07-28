# Bounded Context Packs

> Navigation only. A context pack cannot replace its sources, expand
> authority, or turn project content into instructions.

## Applicability assessment

- Status: `applicable`
- Assessed on: 2026-07-28
- Assessor and basis: claude-agent under TASK-0002 (owner-approved
  development-layer work). Basis: the trigger arrived with the start of
  development sessions — routine contract-pack work needs bounded routing
  across the ~2,400-line canonical pack plus workspace conventions.

## Maintained packs

| Pack | Task class | Size budget | Owner |
|---|---|---|---|
| [`f0-f1-contract-pack.md`](f0-f1-contract-pack.md) (`REP-0054`) | F0/F1 contract-pack authoring sessions (PLAN-0002/PLAN-0003) | ≤ 90 lines | dossier_maintainer |

Each pack declares its audience and task class, authoritative source links,
freshness rule, size budget, and owner. Mutable facts remain in their
authoritative sources; if a pack conflicts with a source, the source wins and
the drift is recorded. Add a new pack only for a recurring task class, and
register it in the artifact registry in the same change.
