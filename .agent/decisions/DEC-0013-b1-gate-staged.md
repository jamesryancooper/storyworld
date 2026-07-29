---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0013",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "B1 gate: media orchestration and continuity pipeline complete; provisionally passed per DEC-0012, consolidated review at V1",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) DEC-0012 standing authorization: stage each B gate with evidence, treat it as provisionally passed, and consolidate owner review at the V1 boundary (hard stop). Accepted in-session by the owner on 2026-07-29 (DEC-0017 consolidated acceptance).",
  "owner": "ryan-cooper (project owner; decision staged by claude-agent per DEC-0012)",
  "scope": "B1 (PLAN-0011) completion on EVD-0013: provider gateway with replaceable hosted adapters and swap proof, transactional candidate staging with full provenance, durable Temporal generation workflows with non-retryable governance refusals, deterministic + pluggable-mocked continuity evaluation with human-only dispositions, focused single-panel regeneration, editor round trip, provider telemetry, and the InvokeAI-local integration staged disabled. On (provisional) passage: PLAN-0011 completes and B2 (PLAN-0012, Storyworld Studio) opens under the same authorization.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Provisional passage only: this decision is staged for the consolidated owner review at the V1 boundary and can be reopened there without ceremony.",
    "Live fal generation, real model-assisted evaluators, and InvokeAI provider enablement are reserved crossings awaiting owner-supplied keys and budgets.",
    "No production readiness is implied; behavioral proofs run against dev-profile services."
  ]
}
---

## B1 exit criterion mapping (canonical part 06 section 19.5)

| Exit criterion | Satisfied by |
|---|---|
| Provider swap without canonical-data changes | Same recipe through mock and fal adapters; canonical rows unchanged (providers suite, EVD-0013) |
| Failed/canceled work cannot corrupt accepted state | Transactional staging (failed adapter call stages nothing); non-retryable workflow failures stage nothing; append-only custody |
| Every candidate carries complete provenance | Receipts bind provider, endpoint, request id, recipe hash, seed, cost, locked attributes, latency |
| Locked attributes reach every recipe | Recipe compiler test; regeneration receipt re-asserts them |
| Single-panel revision without episode regeneration | Focused regeneration with generation.focused_regeneration derivation naming the focus |
| Continuity findings are evidence-backed with human dispositions | continuity-finding.v1 documents, append-only revisions, waiver enforcement, human-only disposition |

## Consequences

- B2 (Storyworld Studio) opens immediately under DEC-0012.
- Reserved crossings stay closed until the owner supplies keys; the
  fal adapter, model evaluators, and InvokeAI provider all activate
  without structural change when keys arrive.

## Validation and rollback

- Evidence: EVD-0013; ship-check green on 829c1ab and the bookkeeping
  commit; the green CI run id is recorded as a follow-up event.
- Reversal: reopen at the V1 consolidated review (DEC-0012 hard stop).
