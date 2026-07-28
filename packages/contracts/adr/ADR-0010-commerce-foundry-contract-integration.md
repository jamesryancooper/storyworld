# ADR-0010 — Commerce Foundry integration uses snapshots, signed packages, events, and receipts; no shared business tables

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: the Storyworld ↔ Commerce Foundry exchange mechanism
- Canonical sources: part 01 §3.2, part 04 §11, §14.3–14.5, Appendix A ADR-010

## Context

The commerce integration is the deepest in the platform — briefs, product
snapshots, placement contracts, asset bundles, typed findings, publication
receipts, performance observations — and therefore the strongest temptation
for shared state. Shared tables or dual writes would fuse two authority
systems and make each unreleasable without the other.

## Decision

Storyworld and Commerce Foundry exchange only immutable, versioned
artifacts: signed `NarrativeCampaignBrief` in, signed `NarrativeAssetBundle`
out, CloudEvents-enveloped events with correlation/causation IDs, and
receipts. Product, claim, policy, and reference data enter Storyworld as
pinned snapshots that Storyworld can never mutate. Delivery is at-least-once
through transactional outbox/inbox with idempotent consumers. No shared
business tables, no dual writes, no distributed transactions, no credentials
for each other's stores.

## Consequences

- Either system can deploy, fail, or restore independently; replay is safe.
- Source drift is explicit: changed products/claims mark associations stale
  for revalidation rather than silently updating.
- Contract fixtures must run in both systems' CI (B3 exit gate).

## Alternatives considered

- Shared database or schema: rejected — fused failure and authority
  domains.
- Synchronous RPC coupling: rejected — availability coupling and no replay.
