---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0006",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "F3 — headless narrative kernel (PLAN-0005)",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) — \"accept with the CI-drill rider\" (DEC-0010), with the standing continue-to-blocker instruction in effect.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": ["TASK-0005"],
  "scope": "In scope: the DEC-0010 rider (CI-side restore drill) first; then F3 per canonical part 06 section 19.4 — canon foundation tables (properties, branches, releases) and the narrative kernel (entities, relationships, timeline/state, productions, narrative units, scenes, state packets, manual asset import, reviews/acceptance, canon change impact) on the proven RLS + append-only pattern, aligned byte-for-byte with the F1 contracts; full-scope VS0 re-run; telemetry baseline with the API surface. Delivered in ship-check-gated tranches. Out of scope: media generation (B1), Studio (B2), GATE-0005 evaluation (owner).",
  "acceptance_criteria": [
    "Rider: restore drill runs in CI on every push.",
    "Tranches per PLAN-0005 acceptance criteria, culminating in the three-episode manual authoring flow through public contracts and the full-scope VS0 round trip.",
    "Every tranche lands ship-check green, pushed, CI green."
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
    "External effect detail: pushes to the owner-provided remote under the standing session authorization.",
    "GATE-0005 evaluation is the owner boundary at phase end."
  ]
}
---

## Scope

F3 in ship-check-gated tranches; rider first.

## Evidence and closure

- Filled per tranche and at closure.
