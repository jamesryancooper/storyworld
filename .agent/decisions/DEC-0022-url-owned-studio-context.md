---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0022",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Phase 0 D4: shared Studio context is URL-owned and explicitly reconciled",
  "created_at": "2026-07-29",
  "authority_source": "external:operator request 2026-07-29 — TASK-0015 Phase 0 requires bounded proposals for decisions implementation cannot safely infer; accepted by the project owner (Ryan Cooper) in-session on 2026-07-30: “I accept all nine as written.”",
  "owner": "ryan-cooper (project owner)",
  "scope": "Ownership and representation of property, production, and selected-subject context across Studio routes; persistence and reconciliation rules for stale, deleted, or unauthorized context. Unblocks SWUX-013 and the navigation half of Phase 2.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-30: implementation is Phase 2 scope.",
    "Workspace/organization switching (mockup 'Main Workspace'; FG-23) stays deferred — the alpha has one implicit workspace."
  ]
}
---

## Context

REV-0001 SWUX-013 (P2): every route owns local selection state, auto-selects
the first list item, and no URL carries property, production, or subject
identity (EVD-0022: zero router-param usage in `apps/studio/src`; flat
`page.tsx` routes). With more than one property or production, changing
routes can silently change the subject under interpretation. The mockups show
a persistent project selector but do not specify ownership or recovery.

## Decision

1. **URL is the canonical carrier** of shared context: property, production,
   and — where a route has one — the selected subject (unit, proposal,
   finding, release) appear as route or query parameters on every route to
   which they apply. Navigation links carry current context forward; direct
   entry, reload, Back, and Forward restore it. No hidden client-side global
   store and no localStorage/sessionStorage context persistence in the alpha.
2. **One implicit workspace** in the alpha. Tenant scoping stays server-side;
   a workspace selector appears only if a successor decision defines
   workspace switching.
3. **Reconciliation, not substitution**: on load, URL context is validated
   against Engine state.
   - Absent context: explicit selection prompt.
   - Unknown, deleted, or unauthorized context: an explicit
     "context unavailable" state naming what failed, with safe re-selection —
     never silent substitution of another item.
   - Stale subject (for example a superseded release): labeled stale with
     the successor reachable.
4. **Auto-selection is permitted only when exactly one candidate exists**,
   and the UI states that it was auto-selected. With multiple candidates the
   route asks for an explicit choice once; the URL then carries it.

## Consequences

- Benefits: deep links, safe reload/Back/Forward, no silent subject swaps,
  and the prerequisite for any future search or cross-linking.
- Costs: route-param plumbing on all Studio routes, link updates, and
  reconciliation states; multi-property fixtures for tests.
- Risks: URL schema churn — Phase 2 should fix parameter names once and
  treat them as a compatibility surface.
- What remains undecided: filter/disclosure state in URLs (Phase 3
  ergonomics), breadcrumb presentation, and any workspace model.

## Validation and rollback

- Evidence: EVD-0022. Phase 2 must add multi-property/multi-production
  fixtures exercised through direct entry, in-app navigation, reload, Back,
  and Forward, plus explicit tests for unknown, unauthorized, deleted, and
  stale context states showing reconciliation rather than substitution.
- Reversal or successor path: successor decision; URL ownership can be
  narrowed or extended without destroying stored state because none is
  persisted client-side.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-30 in the operator
session — “I accept all nine as written” — covering DEC-0019 through DEC-0027
as amended (DEC-0020/0024/0026 amended 2026-07-30 on owner direction).
Recorded by claude-agent on the owner's instruction.
