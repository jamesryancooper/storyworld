---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0008",
  "status": "completed",
  "previous_status": "review",
  "title": "B2 \u2014 Storyworld Studio workbench (PLAN-0012)",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) \u2014 DEC-0012 B-run authorization (Next.js accepted; design system delegated); continue-without-stopping instruction of 2026-07-28.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-29",
  "dependencies": [
    "TASK-0007"
  ],
  "scope": "In scope per canonical part 06 section 19.6 and DEC-0012: Next.js Studio application over engine-api in the canonical dependency order (auth/Command Center -> World Bible -> Arc Board -> Generation Workbench -> Continuity Console/Review Room -> Release Builder), a recorded design-system choice (shadcn/ui-class, delegated), automated accessibility checks, and ship-check-gated tranches. Out of scope: owner usability walkthrough (deferred to V1 per DEC-0012), live provider calls, B3/B4 content.",
  "acceptance_criteria": [
    "Studio surfaces operate the proven kernel flows end to end against engine-api; every mutation goes through the governed command path with receipts; automated accessibility checks pass in CI.",
    "Every tranche ships ship-check green, pushed, CI green."
  ],
  "validation_plan": [
    "bash infra/scripts/ship-check.sh",
    "git push; observe CI"
  ],
  "implementation_result": "Three ship-check-gated tranches (b4401f0, 2b9fc5f, b7baa75 + manifest fix ca6a7b8): Next.js 15 Studio at apps/studio with a vendored shadcn/ui-pattern design system (Tailwind v4 tokens, CVA; decision recorded in the app README per the DEC-0012 delegation); six surfaces in canonical dependency order \u2014 Command Center (portfolio + governed property creation), World Bible (pinned release, entities, story-time timeline), Arc Board (supersession-revisioned structures, nonlinear-safe), Generation Workbench (scene packets, governed generation with provenance ledger, reserved-crossing refusal in the UI), Continuity Console (evaluations, blocker-first findings, human dispositions), Review Room (pending/decided proposal queues with stable-id acceptance), Release Builder (hash-bound releases, snapshot supersession, pinned productions); engine-api grew the read surface (properties/productions/releases/structures/candidates/proposals/findings) plus POST generation-runs, evaluations, finding-dispositions with reserved-crossing 403 and budget 409 problem mappings; kernel gained the corresponding tenant-scoped list queries; axe-core zero-violation gate on every surface; 27 studio tests incl. a full HTTP E2E across all flows; Studio production build wired into ship-check and CI.",
  "review_evidence": [
    "EVD-0014"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0014"
  ],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote; npm registry fetches lockfile-pinned.",
    "Owner Studio usability walkthrough is deferred to the V1 consolidated review (DEC-0012)."
  ]
}
---

## Scope

B2 in ship-check-gated tranches under DEC-0012.

## Evidence and closure

- Evidence: EVD-0014 (27 suites incl. full HTTP E2E; CI green per tranche
  after the harness-manifest fixes).
- Residual limitations: owner usability walkthrough at V1; dev identity
  until the B3 mock-IdP interface; jsdom-excluded axe rules documented.
- Next action: B3 (PLAN-0013, TASK-0009) under DEC-0012.
