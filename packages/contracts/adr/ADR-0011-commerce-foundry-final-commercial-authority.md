# ADR-0011 — Commerce Foundry is final authority for CF-originated commercial publication

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: commercial approval and publication authority for connected campaigns
- Canonical sources: part 01 §4.2, part 04 §11.5–11.7, §13.2, Appendix A ADR-011

## Context

A campaign touches two kinds of truth: narrative (Storyworld's) and
commercial — products, claims, compliance, offers, marketplaces (Commerce
Foundry's). If creative approval could slide into commercial release, an
unreviewed claim or stale product version could publish.

## Decision

For any Commerce Foundry-originated work, Commerce Foundry holds final
commercial approval and publication authority. Storyworld's creative and
rights approvals travel as evidence inside the bundle; the receiving system
imports every bundle as unapproved and performs its own review. Storyworld
cannot bypass a CF rejection; a rejection targets the exact commercial-use
association, not necessarily the master asset. Publication credentials for
CF-owned channels live only with Commerce Foundry; any delegation to
Storyworld is a narrow, constrained capability.

## Consequences

- The authority-host rule has teeth: initiator never implies authority.
- The rejection → focused revision → re-submission loop (part 04 §11.7) is
  the integration's acceptance test.
- Creative teams get fast internal iteration without commercial risk.

## Alternatives considered

- Trust Storyworld approvals transitively: rejected — collapses two review
  regimes with different legal exposure.
- Joint approval records: rejected — shared mutable state (ADR-0010).
