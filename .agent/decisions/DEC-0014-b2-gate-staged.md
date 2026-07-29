---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0014",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "B2 gate: Storyworld Studio complete; provisionally passed per DEC-0012, consolidated review at V1",
  "created_at": "2026-07-29",
  "authority_source": "external:project-owner (Ryan Cooper) DEC-0012 standing authorization: stage each B gate with evidence, treat it as provisionally passed, and consolidate owner review at the V1 boundary (hard stop). Accepted in-session by the owner on 2026-07-29 (DEC-0017 consolidated acceptance).",
  "owner": "ryan-cooper (project owner; decision staged by claude-agent per DEC-0012)",
  "scope": "B2 (PLAN-0012) completion on EVD-0014: the six Studio surfaces in canonical dependency order over engine-api's public contracts, the delegated design-system decision (vendored shadcn/ui pattern), and the CI-enforced accessibility gate. On (provisional) passage: PLAN-0012 completes and B3 (PLAN-0013, integration substrate and portable packages) opens under the same authorization.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Provisional passage only: staged for the consolidated owner review at the V1 boundary, where the deferred Studio usability walkthrough also happens.",
    "Dev identity headers until B3's mock-IdP SSO interface; no production readiness implied."
  ]
}
---

## B2 exit criterion mapping

| Exit criterion | Satisfied by |
|---|---|
| Studio operates kernel flows end to end through public contracts | Integration E2E: propose -> human decision -> snapshot -> pin -> structure -> packet -> generation -> evaluation -> disposition, all via the Studio client over HTTP (EVD-0014) |
| Every mutation through the governed command path with receipts | All client mutations POST with Idempotency-Key + actor identity; kernel receipts asserted in suites |
| Canonical surface dependency order | Built and navigable in order; later surfaces were stubbed visibly until ready |
| Design system recorded (delegated) | shadcn/ui-pattern vendored; rationale in apps/studio/README.md |
| Automated accessibility | axe-core zero-violation gate on all six surfaces in CI |

## Consequences

- B3 opens: CF connector against fixtures with a CF-simulator in CI and an
  exportable conformance suite, source-drift detection, mock-IdP SSO
  interface, runtime compiler, Instagram-first export renditions.

## Validation and rollback

- Evidence: EVD-0014; ship-check green per tranche; CI green on b7baa75
  (run id recorded as a follow-up event).
- Reversal: reopen at the V1 consolidated review.
