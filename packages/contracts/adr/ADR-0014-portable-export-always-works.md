# ADR-0014 — Portable export and verification remain supported independently of connected integrations

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: portability guarantee for all project data
- Canonical sources: part 01 §3.1 (principle 8), part 04 §13.2, §14.4, Appendix A ADR-014

## Context

Users entrust the platform with worlds, rights records, and approval
history. Connected integrations (channels, Commerce Foundry, runtimes) can
break, change policy, or be discontinued; a platform whose data is only
reachable through live integrations holds its users hostage and cannot be
trusted with long-lived properties.

## Decision

Signed, deterministic, portable package export — content, metadata,
lineage, rights, approvals — is a permanent capability, exercised in CI and
gated at F2 (export → delete local copy → re-import preserves identifiers,
hashes, lineage, rights, receipts). Package verification is deterministic
and independent of any connected system. Portable packages embed assets;
connected packages may reference immutable object URIs. Packages exclude
secrets, credentials, unnecessary personal information, and hidden provider
reasoning. Export functions even during noncritical connector outages.

## Consequences

- The F2 round-trip (VS0) becomes the platform's first hard proof.
- Every schema addition must ask "does this survive export/import?"
- Users can leave — which is precisely why they can commit.

## Alternatives considered

- Export as a later feature: rejected — portability retrofitted is
  portability broken; it shapes identifier and hashing design now.
