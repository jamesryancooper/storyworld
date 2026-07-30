---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0019",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "DEC-0026 follow-on: scoped read-only cross-domain search (PROP-FG-10)",
  "authority_basis": "authority:DEC-0026 — the accepted decision plans PROP-FG-10 search as a bounded follow-on after the Phase 2 exit gate under fixed authority conditions; opened on the owner's 2026-07-30 standing instruction to run the program sequence through search",
  "owner": "claude-agent (improvement program lead)",
  "created_at": "2026-07-30",
  "updated_at": "2026-07-30",
  "dependencies": ["TASK-0018", "DEC-0022", "DEC-0026"],
  "scope": "In scope: a read-only, tenant-scoped cross-domain search over properties, current canon entities, narrative units, continuity findings, canon proposals, productions, and canon releases, returning typed results that name their type, property/production, and state and carry a stable DEC-0022 deep link; visibility filtering so restricted canon never appears and spoiler canon is labeled; distinct no-results/unavailable/malformed states; and an accessible Studio search combobox that is navigation-only. Out of scope: any mutation, approval, AI answer, ranking beyond simple recency/text match, cross-tenant results, graph (DEC-0024), and reserved crossings.",
  "acceptance_criteria": [
    "Search is read-only and tenant-scoped: it performs no mutation and returns only the acting tenant's records; restricted-visibility canon is never returned and spoiler canon is labeled.",
    "Each result names its type, property (and production where applicable), and state, and carries a stable deep link that restores context via the Phase 2 URL model; a superseded subject is never labeled current.",
    "The Studio search is an accessible combobox/listbox with full keyboard operation (arrow keys, Enter to navigate, Escape to close) and is navigation-only — selecting a result navigates, never mutates.",
    "No-results, loading, unavailable, and empty-query states are distinct; declared validation passes (pnpm -r typecheck/test/lint, contract validation, harness check/suite, git diff --check).",
    "Backend search behavior is covered by tests including tenant isolation, restricted-exclusion, and typed deep-link shape."
  ],
  "validation_plan": [
    "pnpm -r typecheck",
    "pnpm -r test",
    "pnpm -r lint",
    "python3 -B packages/contracts/tests/validate_contracts.py",
    "python3 -B .agent/scripts/validate.py --check",
    "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check",
    "focused rendered check of the search combobox and result navigation against loopback services"
  ],
  "implementation_result": null,
  "review_evidence": ["REV-0001", "DEC-0026"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "repository_local",
  "limitations": [
    "Created in progress; search is navigation-only and additive — it opens no reserved crossing and changes no existing surface's authority.",
    "Ranking is simple text/recency match, not relevance scoring; index freshness is live-query (no separate index) at alpha scale.",
    "Browser coverage is bounded to locally executable tooling; the EVD-0026 rendered-matrix gaps carry forward and no WCAG conformance is claimed."
  ]
}
---

## Scope

See frontmatter. Search is a read-only kernel query with visibility
filtering, exposed at a single GET route, consumed by an accessible Studio
combobox whose results are DEC-0022 deep links.

## Acceptance criteria

See frontmatter; each requires test evidence.

## Risks and gates

- Side effects: repository-local read-only query, one GET route, a Studio
  combobox, tests, and records.
- Required approvals: DEC-0026 (accepted) plus the standing sequence
  instruction; reserved crossings stay closed.
- Sensitive data: none; restricted canon is excluded and spoiler labeled.
- Rollback: version-control reversal; search is additive and isolated.

## Evidence and closure

- Evidence: to be recorded.
- Review: pending — focused audit at task end (spoiler/tenant leakage,
  navigation-only).
- External effects: repository-local only.
- Residual limitations: recorded at closure.
- Next action: implement the search query + route + tests, then the Studio
  combobox; validate, rendered check, focused audit, close.
