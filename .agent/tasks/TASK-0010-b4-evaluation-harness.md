---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0010",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "B4 \u2014 evaluation and regression harness (PLAN-0014)",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) \u2014 DEC-0012 B-run authorization; model-assisted evaluation stays mocked until keys.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-29",
  "updated_at": "2026-07-29",
  "dependencies": [
    "TASK-0009"
  ],
  "scope": "In scope per canonical part 06 section 19.8 and DEC-0012: golden-corpus execution over the owner fixture families (stillhouse, editorial, bekindrewind, commerce, probes), defect-injection proving the deterministic layers catch seeded violations, recorded provider fixtures for regression without live calls, human-evaluation rubric definitions, and baseline metrics recorded as evidence. Out of scope: live model-assisted scoring (needs keys), V1 assembly.",
  "acceptance_criteria": [
    "Golden corpus executes green through the real pipeline; injected defects are caught by the layers that own them; provider fixtures replay deterministically; rubrics and baselines recorded.",
    "Every tranche ships ship-check green (unpiped), pushed, CI green (run resolved by head SHA)."
  ],
  "validation_plan": [
    "bash infra/scripts/ship-check.sh (unpiped; exit code checked)",
    "git push; observe CI by head SHA"
  ],
  "implementation_result": null,
  "review_evidence": [],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote.",
    "Model-assisted layers remain mocked (DEC-0012 deferral); baselines cover deterministic layers and mocked plumbing."
  ]
}
---

## Scope

B4 in ship-check-gated tranches under DEC-0012.

## Evidence and closure

- Filled per tranche and at closure.
