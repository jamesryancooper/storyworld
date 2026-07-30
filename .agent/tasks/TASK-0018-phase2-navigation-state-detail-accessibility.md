---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0018",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "Phase 2: navigation, loading/state, URL-owned context, detail panels, and accessibility (SWUX-008..015, SWUX-017 recorded facts)",
  "authority_basis": "external:operator improvement-program request 2026-07-30 to run the sequence after the DEC-0020 follow-on; governed by accepted DEC-0022 (URL-owned context), DEC-0023 (receipts), DEC-0025 (recorded-facts collaboration), and the Phase 2 scope of the TASK-0015 program map",
  "owner": "claude-agent (improvement program lead)",
  "created_at": "2026-07-30",
  "updated_at": "2026-07-30",
  "dependencies": ["TASK-0016", "TASK-0017", "DEC-0022", "DEC-0023", "DEC-0025"],
  "scope": "In scope, in four groups: (A) accessible narrow-screen navigation with a current-route indicator and a skip link, plus shared accessibility primitives (status/error live regions, form-error association, 24x24 InfoHint with Escape); (B) loading/empty/unavailable discipline so no surface renders authoritative emptiness before its query resolves, with stable geometry; (C) URL-owned property/production/subject context with reconciliation and single-candidate auto-select (DEC-0022); (D) overview/detail panels for continuity findings and canon proposals (evidence, provenance, diff, impact, receipt) with the smallest backend reads to support them, recorded-facts attribution (DEC-0025), and near-320px overflow fixes. Out of scope: graph/canvas (DEC-0024, Phase 3); cross-domain search (DEC-0026, its own follow-on); live-presence/locks/assignments (DEC-0025 defers them); any reserved crossing.",
  "acceptance_criteria": [
    "The connected creator journey stays navigable at narrow widths and by keyboard: a reachable navigation control below the md breakpoint, a visible current-route indicator, and a working skip-to-main link; overlays (if any) contain focus, close on Escape, and return focus.",
    "No surface renders authoritative empty/absent text before its relevant query resolves; loading, empty, and unavailable states are distinct and geometry is stable.",
    "Property/production (and, where a route has one, the selected subject) live in the URL; direct entry, reload, Back, and Forward restore them; missing/stale/unauthorized context reconciles explicitly rather than silently substituting; auto-select happens only when exactly one candidate exists.",
    "Continuity findings and canon proposals expose an overview/detail disclosure with the finding/proposal evidence, provenance, diff-or-current-value, impact-or-explicit-unknown, decider/role/receipt, using data the Engine returns; near-320px routes do not force page-level horizontal overflow.",
    "Shared accessibility primitives are in place (status/alert live regions, field-error association, 24x24 targets with Escape-dismiss); declared validation passes (pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check) and untested assistive-technology/config gaps are recorded with no WCAG claim."
  ],
  "validation_plan": [
    "pnpm -r typecheck",
    "pnpm -r test",
    "pnpm -r lint",
    "python3 -B packages/contracts/tests/validate_contracts.py",
    "python3 -B .agent/scripts/validate.py --check",
    "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check",
    "focused rendered check of narrow navigation, loading states, deep-link restore, and a detail panel against loopback services"
  ],
  "implementation_result": null,
  "review_evidence": ["REV-0001"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "repository_local",
  "limitations": [
    "Created in progress; implemented in groups (A navigation/a11y, B loading, C URL context, D detail panels) with incremental commits and a phase-level validation, rendered check, and focused audit before closure.",
    "SWUX-010's decision-point evidence already shipped in Phase 1; Group D adds the list-level overview/detail disclosure and prior-disposition lineage.",
    "Browser coverage is bounded to locally executable tooling; the EVD-0026 rendered-matrix gaps (dark theme, true 320px, screen reader, zoom, forced colors) carry forward and no WCAG conformance is claimed.",
    "SWUX-012 graph and SWUX-016 attention Command Center and the Phase-3 half of SWUX-017 are out of Phase 2 scope."
  ]
}
---

## Scope

Four groups (see frontmatter). Group order: A (navigation + accessibility
primitives) and B (loading discipline) are self-contained Studio work; C
(URL context, DEC-0022) reworks the shared picker and routes; D (detail
panels) adds the smallest Engine reads plus read-only panels.

## Acceptance criteria

See frontmatter; each requires test evidence, and the rendered check covers
narrow navigation, loading, deep-link restore, and a detail panel.

## Risks and gates

- Side effects: repository-local Studio code, a few additive Engine reads,
  tests, and records.
- Required approvals: none beyond the accepted Phase 2 decisions; reserved
  crossings stay closed.
- Sensitive data: none.
- Rollback: version-control reversal; each group commits independently.

## Evidence and closure

- Evidence: to be recorded.
- Review: pending — focused audit at phase end.
- External effects: repository-local only.
- Residual limitations: recorded at closure.
- Next action: implement Group A+B, then C, then D; validate, rendered
  check, focused audit, close.
