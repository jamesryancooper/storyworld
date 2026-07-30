---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0026",
  "status": "proposed",
  "previous_status": null,
  "title": "Phase 0 D8: PROP-FG-09 planned in Phase 3; PROP-FG-10 deferred with a planned post-Phase-2 build",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; amended 2026-07-30 on the owner's instruction to record the post-program implementation intent for cross-domain search; acceptance is reserved to the project owner",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Disposition of REV-0001's two category 4 (genuinely new capability) proposals: PROP-FG-09 durable unit-to-asset associations and PROP-FG-10 cross-domain creator search. Neither disposition authorizes implementation.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Acceptance for planning is not implementation authorization: PROP-FG-09 implementation requires a separate owner authorization and its own bounded task after the Phase 3 design exists.",
    "Recording the PROP-FG-10 build intent does not authorize it: the search follow-on requires its own bounded, owner-authorized task once its Phase 2 substrate exists."
  ]
}
---

## Context

REV-0001 classifies two mockup-implied capabilities as category 4:
PROP-FG-09 (associate an exact asset version with an exact narrative unit
and show it in the unit's inspector; confidence medium) and PROP-FG-10
(read-only cross-domain search with contextual deep links; confidence
medium-low). The program requires each to be accepted for planning,
deferred, rejected, or sent back for more evidence.

Amended 2026-07-30 on the owner's instruction: both capabilities are wanted
after the current program of work, so PROP-FG-10 moves from an open-ended,
evidence-gated deferral to a deferral with a planned follow-on build.

## Decision

1. **PROP-FG-09 — accepted for planning.** Phase 3 produces a bounded
   domain/contract/UI design honoring REV-0001's proposal record: exact
   unit and exact asset version/hash visible before association;
   candidate/imported/accepted state and provenance preserved; links never
   change asset acceptance state; AI-created associations remain proposals;
   removal/replacement reports affected reviews and releases without
   changing them; keyboard and non-drag association; restricted assets fail
   closed. Implementation follows under its own owner-authorized task after
   the design review. Until then, Studio shows only truthful non-durable
   generation context and implies no durable association.
2. **PROP-FG-10 — deferred during this program, with a planned build.**
   No search is built in Phases 1–3. After the Phase 2 exit gate — which
   supplies the URL-owned context and stable deep links search results must
   navigate to (DEC-0022) — a bounded, separately owner-authorized
   follow-on task designs and implements scoped read-only search. Its
   authority conditions are fixed now:
   - results are authorization-filtered and tenant-scoped before rendering;
   - restricted/spoiler content never leaks through titles or snippets;
   - every result names its type, property/production, state, and exact
     version, and never implies "current" for a superseded subject;
   - results navigate via stable contextual deep links; stale, no-result,
     unavailable, and malformed states are distinct;
   - search is navigation-only — it never performs or implies a mutation,
     approval, or publication;
   - the interaction uses an accessible combobox/listbox or dialog pattern
     with full keyboard operation.
   Participant evidence informs scope and ranking design; it is no longer a
   precondition for starting the follow-on.

## Consequences

- Benefits: the credible association capability advances at design speed;
  search gets a committed slot with its prerequisites in place instead of
  an indefinite deferral; both keep authority boundaries fixed in advance.
- Costs: creators keep using the tenant-wide candidate table and
  route-local navigation until the follow-ons ship under their own
  authorizations.
- Risks: planning work on PROP-FG-09 could drift into implementation — its
  Phase 3 task must be explicitly design-only; the search follow-on must
  not begin before the Phase 2 exit gate or it lacks the deep links it
  needs.
- What remains undecided: PROP-FG-09's domain relation, contract, and API
  shape (the Phase 3 design's job); PROP-FG-10's index/scope/ranking design
  (the follow-on task's job).

## Validation and rollback

- Evidence: REV-0001 §13 proposal records; EVD-0022 (candidates are global
  and unlinked today). The Phase 3 design task must end with a reviewable
  proposal record and no repository implementation. The search follow-on
  must validate the authority conditions above, including
  authorization-filtering tests, spoiler/restricted non-leak tests, typed
  state/version labeling, deep-link restoration, and no-mutation
  guarantees.
- Reversal or successor path: either disposition reverses through a
  successor decision without code impact; the owner may cancel or re-defer
  each follow-on at its authorization point.
