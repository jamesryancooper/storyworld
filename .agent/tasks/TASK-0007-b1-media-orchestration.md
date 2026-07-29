---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0007",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "B1 — media orchestration and continuity pipeline (PLAN-0011)",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) — DEC-0012 B-run authorization: proceed through B1-B4 with staged gates to the V1 review.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": ["TASK-0006"],
  "scope": "In scope per canonical part 06 section 19.5 and DEC-0012: provider gateway with recipe compiler (pinned canon + scene state -> generation-recipe contract instances), replaceable hosted adapters (deterministic mock; fal.ai queue adapter with mocked transport, key-activated later as a reserved crossing), staging/quarantine/candidate ingestion with full provenance, Temporal generation workflows (budget/cancel/retry/resume), evaluation framework (deterministic layers real; model-assisted pluggable and mocked), focused regeneration, editor-checkout round trip (InvokeAI-local pattern per SRC-0004/SRC-0005), provider telemetry. Out of scope: live billable generation (needs owner key + budget), B2-B4 content, gate self-acceptance beyond DEC-0012's provisional staging.",
  "acceptance_criteria": [
    "B1 exit criteria per the canonical gate, evidenced tranche by tranche; provider-swap proof between two adapters without canonical-data changes; failed/canceled work cannot corrupt accepted state; every candidate carries complete provenance; locked attributes reach every recipe; single-panel revision without episode regeneration.",
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
    "External effect detail: pushes to the owner-provided remote; no live provider calls without an owner-supplied key (reserved crossing per DEC-0012)."
  ]
}
---

## Scope

B1 in ship-check-gated tranches under DEC-0012.

## Evidence and closure

- Filled per tranche and at closure.
