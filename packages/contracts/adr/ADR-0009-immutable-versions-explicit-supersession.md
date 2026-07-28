# ADR-0009 — Canon, artifact, approval, and package versions are immutable and explicitly superseded

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: version semantics for all accepted and published work
- Canonical sources: part 01 §3.1 (principles 4–5), part 03 §8.2, Appendix A ADR-009

## Context

Approvals bind to exact content; lineage and audit require that what was
approved never changes underneath its receipt. Destructive overwrite of
accepted work makes exact-version review meaningless and reconciliation
with external authorities (Commerce Foundry, runtimes) impossible.

## Decision

Every material change to accepted canon, assets, approvals, or packages
creates a new immutable version with derivation lineage; predecessors are
explicitly superseded, never edited or deleted. Identifiers are UUIDv7/ULID;
concurrency is optimistic with expected-version checks; content carries
hashes. A material change invalidates only the affected approval layers.
Rejection and failure preserve their evidence.

## Consequences

- Exact-version approval, drift detection, and cross-system reconciliation
  become mechanical.
- Storage grows monotonically; retention and archive policy (not deletion
  of accepted lineage) manage cost.
- Every "edit" surface in Studio is actually "propose new version."

## Alternatives considered

- Mutable head with history table: rejected — receipts would bind to a
  moving target.
- Git-style content trees for all state: rejected — right instinct,
  wrong granularity for relational invariants; hashes are used where they
  pay (assets, packages).
