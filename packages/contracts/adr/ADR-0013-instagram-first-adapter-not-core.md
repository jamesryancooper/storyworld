# ADR-0013 — Instagram is the first adapter, not a core domain

- Status: proposed (2026-07-28); acceptance via DEC-0006 at GATE-0002
- Scope: channel strategy and the adapter boundary
- Canonical sources: part 01 §3.1 (principle 7), part 04 §13.1, Appendix A ADR-013

## Context

The recovered properties are Instagram-native (carousels, Stories, Reels,
grid rhythm), which makes Instagram the right first delivery target — and
exactly the platform whose constraints must not leak into canon. Aspect
ratios, carousel limits, caption rules, and API quotas change on the
platform's schedule, not the story's.

## Decision

The canonical Engine models narrative intent, sequence, assets, copy,
accessibility, and disclosure — channel-independent masters. An Instagram
adapter owns every platform specific: renditions, safe zones, duration and
caption constraints, account capabilities, rate limits, publication
receipts, platform metrics. Later adapters (TikTok, Pinterest, YouTube
Shorts, web, email, owned apps) follow the same pattern. A platform-rule
change may never require a narrative-domain migration (C2 exit gate).

## Consequences

- One accepted episode yields many renditions from one lineage tree.
- Adapter versioning is independent of Engine versioning.
- Manual export always works even when a platform API breaks (ADR-0014).

## Alternatives considered

- Instagram-shaped canonical model: rejected — every future channel would
  fight the schema; the product would be an Instagram tool, not a platform.
