# ADR-0005 — S3-compatible object storage holds immutable bytes; semantic asset records remain product-owned

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: media byte custody versus asset semantics
- Canonical sources: part 03 §9.2, §9.4, Appendix A ADR-005

## Context

Media bytes are large, immutable once accepted, and shared across
renditions and packages. Asset meaning — lineage, rights, approval state,
supersession — is small, relational, and authority-laden. Conflating the
two couples storage economics to domain semantics.

## Decision

Accepted media bytes live in S3-compatible, content-addressed immutable
object storage (MinIO or filesystem adapter locally). Asset versions
reference content hashes; bytes are never mutated, only superseded. All
semantic records — derivation graph, rights, approvals, lifecycle — remain
in Storyworld's database. A future Stavium shared blob layer may deduplicate
bytes physically, but semantic asset records, permissions, and authority
never merge across products.

## Consequences

- Content addressing makes package verification and export determinism
  cheap (ADR-0014).
- Local and hosted deployments share one storage contract.
- Garbage collection requires care: bytes outlive references only via
  explicit retention rules.

## Alternatives considered

- Database-stored blobs: rejected — backup weight and no CDN path.
- Mutable object keys: rejected — breaks hashes, lineage, and signatures.
