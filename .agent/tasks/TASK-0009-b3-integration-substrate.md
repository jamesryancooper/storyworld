---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0009",
  "status": "completed",
  "previous_status": "review",
  "title": "B3 \u2014 integration substrate and portable packages (PLAN-0013)",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) \u2014 DEC-0012 B-run authorization with the Commerce-Foundry deferral: CF-side verification via a simulator in CI plus an exportable conformance suite.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-29",
  "updated_at": "2026-07-29",
  "dependencies": [
    "TASK-0008"
  ],
  "scope": "In scope per canonical part 06 section 19.7 and DEC-0012: Commerce Foundry connector developed against contract fixtures with a CF-simulator exercised in CI and an exportable conformance suite CF can run later; source-drift detection; mock-IdP SSO interface (real IdP is O1); runtime compiler from canon releases; export renditions Instagram-first; portable-package round trips at product scope. Out of scope: live CF integration, real IdP, B4 content.",
  "acceptance_criteria": [
    "Connector conformance suite green against the simulator in CI and exportable as a standalone artifact; drift detection flags source changes; runtime compiler produces deterministic runtime packages from pinned releases; Instagram-first renditions with provenance.",
    "Every tranche ships ship-check green, pushed, CI green."
  ],
  "validation_plan": [
    "bash infra/scripts/ship-check.sh",
    "git push; observe CI (resolve the run by head SHA)"
  ],
  "implementation_result": "Two ship-check-gated tranches (baaf36c, f4874e5): @storyworld/commerce-connector (signed-brief intake with interface-declared idempotency, append-only connected_campaigns lifecycle with legal-transition map \u2014 migration 0008, HTTP bundle submission with outbox + hash-bound receipts, commercial review/approval/publication receipts with CF authority kept CF-side, source-drift staleness with proposed actions and published work retained) + CF simulator enforcing import-as-unapproved/idempotent-replay/typed-422s + exportable zero-dependency conformance runner executed in CI; @storyworld/runtime-compiler (deterministic runtime-content-release compilation with dangling-ref and circular-mission refusal, embedded asset index, runtime acceptance receipts, hotfix-reconcile records); @storyworld/channel-instagram (versioned capabilities, accepted-masters-only renditions with lineage, Ed25519-signed common-package-envelope, C2 platform-rule-isolation proof, export-only posture); @storyworld/identity mock-IdP with bearer verification at the engine boundary (401 forgeries). Incident: tranche 1 pushed stale manifests because ship-check was piped through tail \u2014 root-caused, fixed, and the unpiped invocation recorded as working practice.",
  "review_evidence": [
    "EVD-0015"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0015"
  ],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote; lockfile-pinned registry fetches.",
    "CF-side CI runs the simulator, not Commerce Foundry itself (DEC-0012 deferral); the conformance suite ships for CF to execute when ready."
  ]
}
---

## Scope

B3 in ship-check-gated tranches under DEC-0012.

## Evidence and closure

- Evidence: EVD-0015. CI green on f4874e5 (follow-up event records the run).
- Residual: CF simulator stands in for CF (deferral); export-only
  publication; mock IdP only.
- Next action: B4 (PLAN-0014, TASK-0010).
