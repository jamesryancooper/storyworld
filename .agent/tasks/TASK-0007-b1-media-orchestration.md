---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0007",
  "status": "completed",
  "previous_status": "review",
  "title": "B1 \u2014 media orchestration and continuity pipeline (PLAN-0011)",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) \u2014 DEC-0012 B-run authorization: proceed through B1-B4 with staged gates to the V1 review.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": [
    "TASK-0006"
  ],
  "scope": "In scope per canonical part 06 section 19.5 and DEC-0012: provider gateway with recipe compiler (pinned canon + scene state -> generation-recipe contract instances), replaceable hosted adapters (deterministic mock; fal.ai queue adapter with mocked transport, key-activated later as a reserved crossing), staging/quarantine/candidate ingestion with full provenance, Temporal generation workflows (budget/cancel/retry/resume), evaluation framework (deterministic layers real; model-assisted pluggable and mocked), focused regeneration, editor-checkout round trip (InvokeAI-local pattern per SRC-0004/SRC-0005), provider telemetry. Out of scope: live billable generation (needs owner key + budget), B2-B4 content, gate self-acceptance beyond DEC-0012's provisional staging.",
  "acceptance_criteria": [
    "B1 exit criteria per the canonical gate, evidenced tranche by tranche; provider-swap proof between two adapters without canonical-data changes; failed/canceled work cannot corrupt accepted state; every candidate carries complete provenance; locked attributes reach every recipe; single-panel revision without episode regeneration.",
    "Every tranche ships ship-check green, pushed, CI green."
  ],
  "validation_plan": [
    "bash infra/scripts/ship-check.sh",
    "git push; observe CI"
  ],
  "implementation_result": "Tranche 1 (2026-07-28, 8c7960b): @storyworld/providers \u2014 generation-recipe compiler from pinned canon + scene state, deterministic mock adapter, fal.ai queue adapter (allowlisted endpoints, scanner-safe key config, X-Fal-Store-IO privacy default, keyless refusal as a reserved crossing), transactional candidate staging with full provenance receipts, provider-swap proof. Tranche 2 (2026-07-28, 829c1ab): @storyworld/workflows \u2014 Temporal generationWorkflow + activities with non-retryable BudgetExceeded/ProviderCapability/ReservedCrossing mapping, integration-tested against a live Temporal (compose port 7235 locally; auto-setup service in CI); @storyworld/evaluation \u2014 deterministic continuity layers (structural, temporal_state contradiction blockers, technical_media custody) emitting continuity-finding.v1 into append-only continuity_findings (migration 0007) with receipts, pluggable model-assisted layer mocked until keys, human-only dispositions as supersession revisions; kernel editorCheckout/editorReimport with external_edit derivations and stale-checkout refusal; focused regeneration with generation.focused_regeneration derivations; latency telemetry in receipts; advisory-lock-serialized migration runner; CF-verified InvokeAI fal provider vendored under integrations/ and installed locally staged-disabled.",
  "review_evidence": [
    "EVD-0013"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0013"
  ],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote; no live provider calls without an owner-supplied key (reserved crossing per DEC-0012).",
    "Live fal activation, real model-assisted evaluators, and InvokeAI provider enablement all await owner-supplied keys; gate passage is provisional per DEC-0012 pending consolidated V1 review."
  ]
}
---


## Scope

B1 in ship-check-gated tranches under DEC-0012.

## Evidence and closure

- Evidence: EVD-0013 (behavioral proofs across both tranches; ship-check
  and CI green on 8c7960b and 829c1ab).
- External effects: authorized pushes; local Docker services; local
  InvokeAI install under ~/storyworld-tools (repository-external but
  operator-requested, reversible by deletion).
- Residual limitations: live provider activation is a reserved crossing;
  DEC-0013 stages the B1 gate provisionally per DEC-0012.
- Next action: B2 (PLAN-0012, Storyworld Studio) under the same standing
  authorization.
