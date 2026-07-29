---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0010",
  "status": "completed",
  "previous_status": "review",
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
  "implementation_result": "Single tranche (b00302a): @storyworld/regression with golden-corpus executor over the four owner fixture families through the real deterministic layers (all clean), 4-case defect-injection matrix across the structured families with 100% required catch at owning-layer severity (12 runs), recorded fal queue transcript replayed through the real adapter (byte-identical staging, zero live calls), recorded baseline asserted by the suite, and human-evaluation rubrics R1-R5 with V1 release-gate thresholds. The corpus immediately caught a real evaluation defect (entity_ref convention mismatch between kernel and fixtures), fixed in @storyworld/evaluation and logged in contracts DESIGN_NOTES \u2014 the harness demonstrably works.",
  "review_evidence": [
    "EVD-0016"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0016"
  ],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote.",
    "Model-assisted layers remain mocked (DEC-0012 deferral); baselines cover deterministic layers and mocked plumbing."
  ]
}
---

## Scope

B4 under DEC-0012.

## Evidence and closure

- Evidence: EVD-0016; CI green on b00302a (follow-up event).
- Next action: V1 consolidated owner review (DEC-0017) — HARD STOP.
