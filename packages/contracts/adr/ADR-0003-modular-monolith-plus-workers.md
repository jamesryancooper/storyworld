# ADR-0003 — Initial architecture is a modular monolith plus async workers

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: initial implementation shape; extraction governed by ADR-0016
- Canonical sources: part 03 §9.1, §9.3, §9.5, Appendix A ADR-003

## Context

The hardest early problems are narrative semantics and human workflow, not
horizontal scale. Canon, artifact, review, and release invariants benefit
from one transactional boundary; a small AI-assisted team benefits from one
deployable and simple local development.

## Decision

Build one repository containing an independently deployable modular
monolith (application API) plus asynchronous workers (durable workflows,
media execution). Modules own their tables and application commands;
cross-module access goes through application interfaces or domain events,
never arbitrary table queries. Network services are introduced only under
ADR-0016's evidence rule.

## Consequences

- One transaction boundary protects multi-aggregate invariants.
- Clear extraction seams remain (workers, transformations, connectors,
  analytics) without paying distributed-systems costs now.
- Discipline is required to keep module boundaries real inside one process.

## Alternatives considered

- Microservices first: rejected — operational sprawl before semantics are
  proven (part 03 §9.5).
- Single undifferentiated monolith: rejected — no extraction seams, module
  ownership erodes.
