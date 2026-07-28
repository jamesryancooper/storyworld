# ADR-0004 — PostgreSQL is authoritative; search, graph, vector, and caches are rebuildable projections

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: authoritative persistence and derived stores
- Canonical sources: part 03 §9.2, Appendix A ADR-004

## Context

The domain is relational and transactional: immutable versions, optimistic
concurrency, row-level security, receipts, lineage. Similarity search and
graph traversal are useful but derived needs; separate engines for them add
consistency and operational burden before scale demands it.

## Decision

PostgreSQL holds all authoritative state: canon, entities, narrative units,
assets metadata, reviews, approvals, packages, audit. Vector similarity uses
pgvector as a rebuildable projection. Redis (when introduced) is cache and
ephemeral coordination only. Any search/graph/vector store must be fully
rebuildable from PostgreSQL and object storage; loss of a projection is an
inconvenience, never data loss.

## Consequences

- One backup/restore story covers all authoritative state (F2 exit gate).
- Projection rebuild paths must exist and be tested.
- A dedicated vector or graph database waits for measured need (ADR-0016).

## Alternatives considered

- Separate vector database now: rejected — premature operational surface.
- Document store for canon: rejected — invariants, transactions, and RLS are
  load-bearing here.
