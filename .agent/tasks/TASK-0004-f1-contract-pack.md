---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0004",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "F1 contract pack (PLAN-0003): schemas, lifecycles, contracts, fixtures, tests",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) — acceptance of DEC-0005/DEC-0006 with the ADR-0006 revision, and \"Continue working through everything you can until you get to a blocker where a decision needs to be made.\"",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": ["TASK-0003"],
  "scope": "In scope: the F1 artifacts per Appendix B under accepted DEC-0005 formats — lifecycle state machines, the eleven record/package JSON Schemas, OpenAPI application contract, event catalog, adapter interfaces, contract validator and tests, fixture structure and synthetic smoke fixture, TS SDK config placeholder; wiring the contract validator into .agent/project.json project_test and CI. Out of scope: the four real golden fixtures' creative content (owner-supplied, PLAN-0007), any implementation code, GATE-0003 evaluation.",
  "acceptance_criteria": [
    "Lifecycle state machines for canon/plans, media artifacts, reviews, and connected commerce exist as strict JSON with canonical source references.",
    "Record/package schemas exist per Appendix B (tranche-by-tranche; each schema-valid, strict, and $id-stable).",
    "A stdlib contract validator runs schema well-formedness, reference resolution, lifecycle well-formedness, and fixture round-trip checks; wired into project_test and CI.",
    "A synthetic smoke fixture (clearly non-creative) validates end to end.",
    "Every tranche lands with local validation green, pushed, CI green."
  ],
  "validation_plan": [
    "python -B packages/contracts/tests/validate_contracts.py",
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git push; observe CI"
  ],
  "implementation_result": "Tranche 1 complete: four lifecycle state machines (canon-and-plans, media-artifacts, reviews, connected-commerce) with documented inferred transitions and gates; common-package-envelope, canon-release, scene-state-packet, and approval-receipt schemas (2020-12, tag-URI $ids, charter-coherent enums); stdlib contract validator (strict JSON, schema well-formedness, $ref resolution, lifecycle reachability, charter coherence, fixture round-trip) wired into project_test and CI; synthetic smoke fixtures passing. Remaining: seven schemas, OpenAPI, event catalog, adapter interfaces, SDK config, real fixtures (blocked on PLAN-0007).",
  "review_evidence": [],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided GitHub remote under the standing session authorization.",
    "Real fixtures blocked on PLAN-0007 owner content; F1 exit gate (GATE-0003) cannot be evaluated until they exist."
  ]
}
---

## Scope

First F1 tranche this session: the four lifecycle machines, the common
package envelope plus first record schemas, the contract validator with a
synthetic smoke fixture, and the project_test/CI wiring. Remaining schemas,
OpenAPI, and the event catalog continue in subsequent tranches on this same
task.

## Acceptance criteria

Tracked in frontmatter; per-tranche progress in implementation_result.

## Risks and gates

- Side effects: repository-local plus authorized pushes.
- Gate: GATE-0003 evaluation is out of scope until fixtures exist.

## Evidence and closure

- Filled at closure.
