---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0027",
  "status": "proposed",
  "previous_status": null,
  "title": "Phase 0 D9: ambiguous mockup implications are explicitly deferred, not defects and not scope",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; acceptance is reserved to the project owner",
  "owner": "ryan-cooper (project owner) — acceptance pending",
  "scope": "Explicit deferral of every mockup concept REV-0001 classified as too ambiguous to infer, so later phases neither implement them from pixels nor report them as alpha defects.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Proposal only; each deferred concept re-enters scope solely through its own successor decision.",
    "Deferral is a scope statement, not a judgment that the concepts are undesirable."
  ]
}
---

## Context

REV-0001 classifies several depicted concepts as category 5 (too ambiguous
to infer): their pixels do not establish outcome, behavior, state ownership,
or product need. The program requires deciding or explicitly deferring them
and forbids reporting deferred mockup concepts as alpha defects.

## Decision

The following are **deferred**: absent from Studio, excluded from phase
scope, and excluded from defect reporting until a successor decision defines
each one.

1. Live-presence avatars and status dots (with DEC-0025).
2. Activity-feed semantics — entries like "approved by Narrative Editor"
   stay unbuilt until their source, exact-version binding, and receipt
   linkage are defined (DEC-0023 provides the receipt substrate).
3. Graph edge meanings and all spatial canvas semantics (with DEC-0024).
4. The mockup `PUBLISHED` lifecycle stage and the "Published Assets" metric
   (with DEC-0019's reservation of "published").
5. Hero-image and thumbnail authority — imagery may represent a unit only
   when exact asset version, state, provenance, and rights visibility are
   known; ties to PROP-FG-09 planning (DEC-0026).
6. Campaign creation (FG-26): outcome and authority host unknown.
7. Commerce, Reports, and Published Assets navigation (FG-29): outside the
   accepted alpha and this program.
8. Inspector tab/accordion content-ownership and persistence semantics
   (FG-27) beyond what DEC-0024's structured inspector defines.
9. Lock-icon meanings (FG-30; vocabulary reserved by DEC-0025).

Studio must not add UI whose meaning is unresolved; a deferred concept
appearing in a future mockup or request is routed to a successor decision,
not into implementation.

## Consequences

- Benefits: later phases stay inside decided meaning; no invented semantics
  reach creators or auditors.
- Costs: parts of the mockups' texture are consciously not pursued now.
- Risks: none material; deferral is reversible per concept.
- What remains undecided: each listed concept, by design.

## Validation and rollback

- Evidence: REV-0001 §12 category 5 classifications. Post-change mockup
  comparisons in Phase 3 must record each concept as adopted, adapted,
  rejected, deferred, or still ambiguous — with these nine starting as
  deferred.
- Reversal or successor path: per-concept successor decisions.
