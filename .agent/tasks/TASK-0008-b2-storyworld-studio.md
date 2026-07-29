---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0008",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "B2 \u2014 Storyworld Studio workbench (PLAN-0012)",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) \u2014 DEC-0012 B-run authorization (Next.js accepted; design system delegated); continue-without-stopping instruction of 2026-07-28.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": [
    "TASK-0007"
  ],
  "scope": "In scope per canonical part 06 section 19.6 and DEC-0012: Next.js Studio application over engine-api in the canonical dependency order (auth/Command Center -> World Bible -> Arc Board -> Generation Workbench -> Continuity Console/Review Room -> Release Builder), a recorded design-system choice (shadcn/ui-class, delegated), automated accessibility checks, and ship-check-gated tranches. Out of scope: owner usability walkthrough (deferred to V1 per DEC-0012), live provider calls, B3/B4 content.",
  "acceptance_criteria": [
    "Studio surfaces operate the proven kernel flows end to end against engine-api; every mutation goes through the governed command path with receipts; automated accessibility checks pass in CI.",
    "Every tranche ships ship-check green, pushed, CI green."
  ],
  "validation_plan": [
    "bash infra/scripts/ship-check.sh",
    "git push; observe CI"
  ],
  "implementation_result": null,
  "review_evidence": [],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote; npm registry fetches lockfile-pinned.",
    "Owner Studio usability walkthrough is deferred to the V1 consolidated review (DEC-0012)."
  ]
}
---

## Scope

B2 in ship-check-gated tranches under DEC-0012.

## Evidence and closure

- Filled per tranche and at closure.
