---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0015",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "B3 gate: integration substrate complete; provisionally passed per DEC-0012, consolidated review at V1",
  "created_at": "2026-07-29",
  "authority_source": "external:project-owner (Ryan Cooper) DEC-0012 standing authorization: stage each B gate with evidence, treat it as provisionally passed, and consolidate owner review at the V1 boundary (hard stop). Accepted in-session by the owner on 2026-07-29 (DEC-0017 consolidated acceptance).",
  "owner": "ryan-cooper (project owner; decision staged by claude-agent per DEC-0012)",
  "scope": "B3 (PLAN-0013) completion on EVD-0015: the three normative adapter interfaces implemented and behavior-proven (CF connector with simulator + exportable conformance, runtime compiler, Instagram export-first channel adapter) plus the mock-IdP SSO boundary. On (provisional) passage: PLAN-0013 completes and B4 (PLAN-0014, evaluation and regression harness) opens.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Provisional passage only: staged for the consolidated owner review at the V1 boundary.",
    "CF-side CI is the simulator per the DEC-0012 deferral; live CF, live channels, and a real IdP remain out of scope."
  ]
}
---

## B3 exit criterion mapping

| Exit criterion | Satisfied by |
|---|---|
| Connector conformance green in CI and exportable | Fixture loop + conformance.mjs run in CI against the simulator; standalone runner ships in-repo (EVD-0015) |
| Drift detection flags source changes | receive_source_change marks campaigns stale with proposed actions; published work retained |
| Deterministic runtime packages from pinned releases | Identical inputs -> identical content hash; validation refusals typed |
| Instagram-first renditions with provenance | Accepted-masters-only renditions, lineage derivations, receipts, signed envelope |

## Validation and rollback

- Evidence: EVD-0015; CI green on f4874e5 (follow-up event).
- Reversal: reopen at the V1 consolidated review.
