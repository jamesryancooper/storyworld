# ADR-0016 — Service extraction requires measured scale, isolation, or release-cadence evidence

- Status: accepted (2026-07-28) via DEC-0006 (GATE-0002 passed)
- Scope: the standing rule governing departures from ADR-0003
- Canonical sources: part 03 §9.5, part 06 §19.15, Appendix A ADR-016

## Context

Modular monoliths erode through casual extraction: a service pulled out for
aesthetics or résumé reasons imposes permanent network, versioning, and
operational costs. The dossier defines the pressure signals that justify
extraction; without a standing rule they get forgotten at the first
tempting moment.

## Decision

A module may be extracted into a network service only when at least one is
measured and recorded in a decision: three or more independent products
consume it; materially different hardware or scaling needs; security or
compliance isolation requirements; separate teams needing independent
release cadence; failure blast-radius threatening unrelated availability;
or an unmaintainable in-process vendor boundary. Likely first candidates
(media workers, transformation/rendition, publishing connectors, analytics
ingestion) are acknowledged, not pre-approved. Canon and continuity remain
co-located until a compelling domain or team boundary appears.

## Consequences

- Extraction proposals arrive with evidence or not at all.
- The monolith's module seams are maintained as if extraction were
  imminent — which keeps them honest.
- Conditional phase X1 stays conditional.

## Alternatives considered

- Pre-planned service decomposition: rejected — guesses ossify; evidence
  arrives later and disagrees.
