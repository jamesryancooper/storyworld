# ADR-0001 — Storyworld is independently deployable and owns its own database

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: platform deployment boundary and data ownership
- Canonical sources: part 01 (executive decision, §2.1, §3.2), part 03 §9.1, Appendix A ADR-001

## Context

The recovered direction weighed hosting Storyworld inside Commerce Foundry.
BeKindRewind clarified the stakes: it needs the same canon, characters, and
continuity as social properties, but nothing commerce-shaped. Any host
system's concerns would contaminate the narrative domain, and any shared
database would entangle release cadence, migrations, and authority.

## Decision

Storyworld Engine is an independently deployable platform with its own
public API and its own PostgreSQL database. No other system hosts it, reads
its tables, or writes its state. All integration is contract-based: signed
packages, events, receipts, and snapshots.

## Consequences

- One narrative authority can serve Commerce Foundry, BeKindRewind,
  editorial properties, and future Stavium media without contamination.
- Integration always costs a contract (brief, bundle, release, receipt) —
  deliberate friction that keeps boundaries honest.
- Storyworld carries its own operational burden (deploy, backup, restore).

## Alternatives considered

- Commerce Foundry-hosted module: rejected — commerce concerns would leak
  into canon; BeKindRewind and editorial use would inherit a commerce host.
- Shared database with schema separation: rejected — couples migrations,
  authority, and failure domains (see also ADR-0010).
