---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0016",
  "status": "proposed",
  "previous_status": null,
  "title": "B4 gate: evaluation and regression harness complete; provisionally passed per DEC-0012, consolidated review at V1",
  "created_at": "2026-07-29",
  "authority_source": "external:project-owner (Ryan Cooper) DEC-0012 standing authorization.",
  "owner": "ryan-cooper (project owner; decision staged by claude-agent per DEC-0012)",
  "scope": "B4 (PLAN-0014) completion on EVD-0016: golden corpus green, 100% defect catch, deterministic provider replay, rubrics and baseline recorded. On (provisional) passage the B run is complete and the V1 consolidated review (DEC-0017) becomes the sole open boundary.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Provisional passage only, consolidated at V1.",
    "Model-assisted layers mocked until keys (DEC-0012)."
  ]
}
---

## B4 exit criterion mapping

| Exit criterion | Satisfied by |
|---|---|
| Golden corpus executes green through the real pipeline | 4 families clean through the deterministic layers (EVD-0016) |
| Injected defects caught by the owning layers | 12/12 at required severity; suite fails below 100% |
| Provider fixtures replay without live calls | Recorded fal transcript; byte-identical staging across replays |
| Rubrics and baselines recorded | R1-R5 with thresholds; baseline JSON asserted by the suite |

## Validation and rollback

- Evidence: EVD-0016; CI on b00302a (follow-up event).
- Reversal: reopen at the V1 consolidated review.
