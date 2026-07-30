---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0017",
  "status": "completed",
  "previous_status": "review",
  "title": "DEC-0020 follow-on: queued Arc authoring mode and the per-property toggle",
  "authority_basis": "authority:DEC-0020 — the accepted decision phases queued Arc authoring mode plus the governed per-property toggle as a bounded task after the Phase 1 exit gate; opened on the owner's 2026-07-30 instruction to start the DEC-0020 follow-on and continue the program sequence",
  "owner": "claude-agent (improvement program lead)",
  "created_at": "2026-07-30",
  "updated_at": "2026-07-30",
  "dependencies": ["TASK-0016", "DEC-0020", "DEC-0021", "DEC-0023"],
  "scope": "In scope: a per-property authoring-mode setting (direct default | queued) changeable only by property_owner and receipted (structure.authoring_mode.changed); a structure-proposal submission path used when a property is in queued mode (build the complete validated document, store as a pending proposal against its base revision); accept/reject of structure proposals through the shared consequence review, applying an accepted proposal as a structure.accepted revision only if its base is still current (moved base fails closed and preserves the proposal); mode-mismatch guards so a submission is validated against the current server-side mode; the Studio wiring (mode-aware Arc Board save control and copy, the governed toggle, the Review Room structure-proposal queue); and tests. Out of scope: multi-author roles beyond property_owner (DEC-0025); per-role forced modes; unit edit/delete beyond add; any Phase 2/3 surface; reserved crossings.",
  "acceptance_criteria": [
    "A property defaults to direct mode; only property_owner may change it; each change records a structure.authoring_mode.changed receipt naming actor, role, property, and old/new mode.",
    "In queued mode, an Arc save submits a structure proposal (complete validated document + base revision) and changes no accepted structure; the Arc save control reads 'Submit for review' and names the queued mode.",
    "In direct mode, an Arc save records an accepted revision as before and the control reads 'Save as accepted revision'; a direct save is refused when the current mode is queued, and a queued submit is refused when the current mode is direct (mode-mismatch fails closed, input preserved).",
    "Accepting a structure proposal applies it as a structure.accepted revision with the same receipt shape only if its base is the current head; a moved base fails closed (409) and preserves the proposal; double-decide is a typed conflict.",
    "The Review Room surfaces pending structure proposals and decides them through the shared consequence review; declared validation passes (pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check)."
  ],
  "validation_plan": [
    "pnpm -r typecheck",
    "pnpm -r test",
    "pnpm -r lint",
    "python3 -B packages/contracts/tests/validate_contracts.py",
    "python3 -B .agent/scripts/validate.py --check",
    "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check",
    "focused rendered check of the mode toggle, queued submit, and structure-proposal review against loopback services with synthetic data"
  ],
  "implementation_result": "Implemented DEC-0020 queued authoring mode additively over the default direct mode: per-property receipted toggle (property_owner-only), structure-proposal submit/decide with moved-base fail-closed reconciliation, mode-mismatch guards both directions, and the Studio mode-aware Arc Board + Review Room structure-proposal queue. Full workspace green (engine-api 17, studio 70 incl. live integration, kernel 15); focused rendered check confirmed the governed two-activation flip and mode-adaptive save control (EVD-0027).",
  "review_evidence": ["DEC-0020", "EVD-0027"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": ["EVD-0027"],
  "external_effects": "repository_local",
  "limitations": [
    "Created in progress; queued mode is additive to the accepted Phase 1 direct mode and does not change the default (direct).",
    "Single-owner alpha (DEC-0025): both submitting and deciding a structure proposal require property_owner, so queued mode is deferred self-review; multi-author submission is out of scope.",
    "Browser coverage is bounded to locally executable tooling; recorded gaps carry the EVD-0026 limitations."
  ]
}
---

## Scope

See frontmatter. The build mirrors the canon-proposal/decision pattern for
structure proposals, reuses the Phase 1 shared consequence review and
receipt substrate (DEC-0023), and keeps direct mode (the accepted Phase 1
behavior) the default.

## Acceptance criteria

See frontmatter; each requires test evidence.

## Risks and gates

- Side effects: repository-local code, migrations, tests, and records; a
  new per-property setting and two proposal tables.
- Required approvals: none beyond DEC-0020 (accepted); reserved crossings
  stay closed.
- Sensitive data: none.
- Rollback: version-control reversal; migrations are additive; queued mode
  is opt-in per property so reverting leaves direct-mode properties intact.

## Evidence and closure

- Evidence: EVD-0027 (implementation, full-workspace validation, focused
  rendered check).
- Review: focused self-review proportionate to a bounded additive follow-on
  reusing the Phase 1 safety primitives; governance-critical paths are
  HTTP-test-covered.
- External effects: repository-local; loopback only; one governed test
  mutation (an authoring-mode flip round-trip, left at default direct) to
  the local Stillhouse fixture.
- Residual limitations: see EVD-0027 (focused vs adversarial audit; rendered
  matrix tooling gaps carried from EVD-0026).
- Next action: TASK-0017 complete. Program sequence continues with Phase 2
  (SWUX-008..015).
