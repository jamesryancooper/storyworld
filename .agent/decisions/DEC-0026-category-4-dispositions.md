---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0026",
  "status": "proposed",
  "previous_status": null,
  "title": "Phase 0 D8: PROP-FG-09 accepted for planning only; PROP-FG-10 deferred",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; acceptance is reserved to the project owner",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Disposition of REV-0001's two category 4 (genuinely new capability) proposals: PROP-FG-09 durable unit-to-asset associations and PROP-FG-10 cross-domain creator search. Neither disposition authorizes implementation.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Acceptance for planning is not implementation authorization: PROP-FG-09 implementation requires a separate owner authorization and its own bounded task after the Phase 3 design exists.",
    "Deferral of PROP-FG-10 is re-evaluable on participant evidence; nothing here rejects it permanently."
  ]
}
---

## Context

REV-0001 classifies two mockup-implied capabilities as category 4:
PROP-FG-09 (associate an exact asset version with an exact narrative unit
and show it in the unit's inspector; confidence medium) and PROP-FG-10
(read-only cross-domain search with contextual deep links; confidence
medium-low, participant value unknown). The program requires each to be
accepted for planning, deferred, rejected, or sent back for more evidence.

## Decision

1. **PROP-FG-09 — accepted for planning only.** Phase 3 may produce a
   bounded domain/contract/UI design honoring REV-0001's proposal record:
   exact unit and exact asset version/hash visible before association;
   candidate/imported/accepted state and provenance preserved; links never
   change asset acceptance state; AI-created associations remain proposals;
   removal/replacement reports affected reviews and releases without
   changing them; keyboard and non-drag association; restricted assets fail
   closed. Until that design is separately authorized and implemented,
   Studio shows only truthful non-durable generation context and implies no
   durable association.
2. **PROP-FG-10 — deferred.** Route-local filters and the DEC-0022 URL/deep
   link work cover alpha-scale navigation, and the deep links search would
   need are a Phase 2 product anyway. Re-evaluate through a successor
   decision if participant evidence after Phase 2 shows navigation failure
   that filters do not resolve. Any future search must be
   authorization-filtered, tenant-scoped, spoiler-safe, typed by state and
   version, navigation-only, and free of mutation side effects.

## Consequences

- Benefits: the credible capability advances at design speed without
  implying acceptance; the speculative one waits for evidence instead of
  consuming Phase 3.
- Costs: creators keep using the tenant-wide candidate table until
  PROP-FG-09 ships under its own authorization.
- Risks: planning work on PROP-FG-09 could drift into implementation —
  its Phase 3 task must be explicitly design-only.
- What remains undecided: PROP-FG-09's domain relation, contract, and API
  shape (the Phase 3 design's job); PROP-FG-10 entirely.

## Validation and rollback

- Evidence: REV-0001 §13 proposal records; EVD-0022 (candidates are global
  and unlinked today). The Phase 3 design task must end with a reviewable
  proposal record and no repository implementation.
- Reversal or successor path: either disposition reverses through a
  successor decision without code impact.
