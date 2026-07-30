---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0016",
  "status": "completed",
  "previous_status": "review",
  "title": "Phase 1: repair safety-critical Studio and Engine behavior (SWUX-001..007)",
  "authority_basis": "external:operator improvement-program request 2026-07-29 and the owner's Phase 0 acceptance of 2026-07-30 (DEC-0019..0027; EVD-0024). This task implements only the accepted Phase 1 scope under those decisions; reserved crossings stay closed and no readiness claim results.",
  "owner": "claude-agent (improvement program lead)",
  "created_at": "2026-07-30",
  "updated_at": "2026-07-30",
  "dependencies": ["TASK-0015", "DEC-0019", "DEC-0020", "DEC-0021", "DEC-0023"],
  "scope": "In scope: the smallest coherent remediation of the reverified P0 findings SWUX-001..006 and P1 finding SWUX-007 per the accepted Phase 0 decisions — shared safe-command state machine with retained idempotency keys and reconciliation; shared pre-decision consequence review for acceptance-class actions; reviewer-authored continuity waivers; complete-document Arc preservation with server-side contract validation and stale-supersession rejection (direct mode only); canon.release.created rename with legacy display and explicit non-publication statements; credential save/replace/revoke confirmation; dev-mode identity gating with role and tenant enforcement; contract-aligned receipts with a read path for the actions this task touches; and the Phase 1 test matrix. Out of scope: queued Arc mode and the authoring-mode toggle (bounded follow-on after this task's exit gate per DEC-0020); all Phase 2/3 scope; category 4 capabilities; live providers or real credential values; publication, deployment, integrations, production identity, or any external effect.",
  "acceptance_criteria": [
    "Every reverified P0 finding (SWUX-001..006) and SWUX-007 is remediated per the accepted decisions, or the affected action fails closed, with test evidence.",
    "No acceptance-class action occurs from a single click or keypress; the shared consequence review names subject, exact version/hash, actor/role/authority host, impact or explicit unknown, state transition, and the resulting receipt.",
    "The same idempotency key survives retry and reconciliation for one logical operation; unknown outcomes block duplicates and offer explicit reconcile; success renders only on a confirmed authoritative result; safe creator input survives every recoverable failure.",
    "Intentional-exception waivers require reviewer-authored rationale and scope (expiry where applicable); the fabricated default rationale is removed and cannot recur.",
    "New canon-release receipts use canon.release.created; stored legacy receipts render their exact recorded action name with a clarifying label; no internal action or UI stage uses publication language.",
    "Header-derived identity is refused for acceptance-class commands outside explicit development mode; missing headers never default to human; role and tenant binding are enforced; the negative authorization matrix (forged, missing, wrong-tenant, wrong-role, model/service actors, dev-mode off) passes with no state change.",
    "A contract-complete narrative-structure fixture (choices, branches, POV, parent links, hashes) proves byte-for-byte preservation of untouched fields; the Engine rejects contract-nonconforming documents and stale supersession while preserving attempted input.",
    "Receipts for this task's actions embed contract-conformant approval-receipt documents and are reachable read-only from Studio without secret values.",
    "A focused post-change storyworld-ux audit of the implemented scope finds no unresolved false-authority, accidental acceptance-class action, ambiguous duplicate-mutation, fabricated-provenance, or lost-work path.",
    "Declared validation passes: pnpm -r typecheck/test/lint, contract validation, harness structural check and suite, and git diff --check."
  ],
  "validation_plan": [
    "pnpm -r typecheck",
    "pnpm -r test",
    "pnpm -r lint",
    "python3 -B packages/contracts/tests/validate_contracts.py",
    "python3 -B .agent/scripts/validate.py --check",
    "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check",
    "focused rendered checks of every changed surface against loopback services with synthetic data: mutation states (success, validation failure, permission denial, stale/conflict, unavailable, unknown, refresh-failed), keyboard paths for consequence reviews, and both themes"
  ],
  "implementation_result": "Remediated SWUX-001..007 across kernel, engine-api, evaluation, credentials, persistence, and Studio (EVD-0025); a two-agent adversarial post-change audit found 14 findings, 13 remediated in-session with new negative tests (REV-0002); the rendered browser pass verified the acceptance surfaces and caught and fixed one load-time defect (EVD-0026). All five exit-gate classes pass; workspace green (kernel 15, engine-api 14, studio 65, all others). Reserved crossings stayed closed; one governed test mutation was written to the local synthetic fixture.",
  "review_evidence": ["REV-0001", "EVD-0022", "EVD-0025", "REV-0002", "EVD-0026"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": ["EVD-0025", "REV-0002", "EVD-0026"],
  "external_effects": "repository_local",
  "limitations": [
    "Implementation (EVD-0025), the focused post-change audit and remediation (REV-0002, all five gate classes pass), and the rendered browser pass (EVD-0026) are complete. REV-0002 S6 was dispositioned by the owner on 2026-07-30: no generation confirmation step for the alpha; the cost preview and per-recipe ceiling stand.",
    "Rendered-matrix tooling gaps recorded in EVD-0026 and not covered: dark theme (no prefers-color-scheme emulation), true ~320 px reflow (OS clamped to 606 px), screen reader, 200% page zoom, forced colors, reduced motion, and live failure-state rendering (covered by the component suite). No WCAG conformance is claimed.",
    "The pre-existing narrow-navigation (SWUX-008) and ~320 px overflow (SWUX-014) gaps are unchanged and remain Phase 2 scope, not Phase 1 regressions.",
    "Browser and assistive-technology coverage is bounded to locally executable tooling; untested configurations are recorded and no WCAG conformance claim results.",
    "This task hardens the local development alpha within the DEC-0017 boundary; it creates no production identity, transport security, or readiness claim.",
    "Queued Arc authoring mode and the per-property toggle are explicitly the bounded follow-on task after this task's exit gate (DEC-0020)."
  ]
}
---

## Scope

In scope (work order → primary findings → governing decisions):

1. Safe-command state machine in the Studio client and Engine contract —
   SWUX-001 — DEC-0023. Operation-scoped idempotency key created before
   submission and retained through retry; explicit states (idle, submitting,
   confirmed, rejected, validation failure, permission denied,
   stale/conflict, unavailable, unknown, reconciling, refresh-failed);
   mutation and refresh errors separated; duplicate blocking while busy or
   unknown; reconciliation read (receipt/state lookup) before any retry of
   an unknown outcome; safe input preservation. Address the process-local
   replay limitation with durable replay protection or a proven safe
   reconciliation design.
2. Shared pre-decision consequence review — SWUX-002, SWUX-005 —
   DEC-0019/0020/0021/0023. Applied to canon proposal decisions, Arc
   structure saves (direct mode), continuity dispositions, canon release
   creation, and credential save/replace/revoke. Shows subject, before and
   after, exact version/hash, actor/role/authority host, direct and
   explicitly-unknown impact, state transition, reversibility, and the
   receipt that will result; explicit "does not publish externally" where
   applicable.
3. Continuity disposition safety — SWUX-003 — DEC-0021/0023. Remove the
   canned waiver values; require reviewer-authored rationale and scope with
   optional expiry; show finding evidence, confidence, and suggested
   remediation at the decision point (decision-critical subset; full detail
   panels are Phase 2).
4. Narrative-structure preservation — SWUX-007 — DEC-0020. Complete-document
   editing, Engine-side schema validation against
   narrative-structure.schema.json, explicit supersession with stale-base
   rejection, input preservation; contract-complete fixtures replacing the
   reduced test shapes.
5. Release/publication vocabulary — SWUX-004 — DEC-0019. Rename new
   receipts to canon.release.created with legacy display labeling; show
   pinned productions with their exact pinned versions relative to the
   latest release in the release flow; expose the existing kernel
   canonChangeImpact query read-only if it fits the smallest coherent
   change, otherwise record the deferral explicitly.
6. Identity and authorization boundary — SWUX-006 — DEC-0021. Development
   mode flag; refusal of header identity outside it; no human default for
   missing headers; role and tenant enforcement in the kernel authorization
   helper; visible "development identity — not verified" labeling in
   Studio; negative authorization matrix.
7. Receipts — DEC-0023 — for every action above: contract-conformant
   approval-receipt documents in receipt detail, receipt id in mutation
   responses, tenant-scoped read route, and read-only display from the
   confirmation surfaces.

Out of scope: queued Arc mode and the toggle; Phase 2 navigation, loading,
context, and detail-panel work; Phase 3 workspace adaptation; PROP-FG-09/10;
graph; workspace switching; live providers, real credentials, publication,
deployment, integrations, or production identity.

## Acceptance criteria

See frontmatter. Every criterion requires test or recorded-inspection
evidence at closure; the post-change focused audit produces a successor
review record rather than editing REV-0001.

## Risks and gates

- Side effects: repository-local code, tests, and records; local loopback
  services and disposable synthetic data during validation.
- Required approvals: none beyond the standing program authorization and
  accepted decisions this task cites; anything touching a reserved crossing
  stops for explicit owner authorization.
- Sensitive data: none; only fake local credential values in tests; secret
  values never rendered, logged, or committed.
- Rollback: version-control reversal; receipts and revisions remain
  append-only so no destructive migration is involved.

## Evidence and closure

- Evidence: EVD-0025 (implementation and engineering validation); REV-0002
  (focused post-change audit: 14 adversarial findings, 13 remediated
  in-session, per-class gate assessment pass); EVD-0026 (rendered browser
  pass: acceptance surfaces verified, one load-time defect found and fixed).
- Review: REV-0002 recorded as a successor review; REV-0001 unmodified.
- External effects: repository-local; loopback compose postgres and
  in-process engine only; one governed test mutation to the local synthetic
  fixture; reserved crossings stayed closed.
- Residual limitations: rendered-matrix tooling gaps (dark theme, 320 px,
  AT, zoom — EVD-0026); S2 reload recovery is disclosure-only; E6/E7
  identity-crossing deferrals; E5 legacy-throw cleanup (Phase 2).
- Next action: TASK-0016 complete. The queued-Arc-mode + toggle follow-on
  task (DEC-0020) may open next; Phase 2 (SWUX-008..015, incl. the deferred
  narrow-navigation and overflow gaps) follows the program sequence.
