---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0013",
  "status": "completed",
  "previous_status": "review",
  "title": "Unify the newcomer explanation with the synchronized V1 documentation",
  "authority_basis": "external:operator delegation 2026-07-29 — integrate the completed newcomer-docs worktree into main, preserve the accepted-alpha and not-production-ready corrections, validate, and commit locally without push or deployment.",
  "owner": "codex-agent (documentation integration)",
  "created_at": "2026-07-29",
  "updated_at": "2026-07-29",
  "dependencies": ["TASK-0012", "DEC-0017"],
  "scope": "In scope: merge the newcomer task's root README and agent-start-page intent into the completed TASK-0012 documentation synchronization; keep the root README as the canonical plain-language explanation and .agent/START_HERE.md as concise internal routing; refresh generated integrity; validate; commit the unified documentation change on main if checks pass. Out of scope: product behavior changes, durable-intent changes, production-readiness approval, push, deployment, publication, credential use, or any reserved crossing.",
  "acceptance_criteria": [
    "The root README is the canonical plain-language newcomer explanation and accurately identifies the accepted V1 dual-use alpha.",
    ".agent/START_HERE.md links to the root explanation and remains concise internal onboarding and authority routing.",
    "The broader TASK-0012 corrections remain intact, including explicit production-readiness and reserved-crossing limits.",
    "Generated integrity is refreshed, relevant validation passes, and the unified documentation update is prepared for a bounded local commit on main without push."
  ],
  "validation_plan": [
    "bash infra/scripts/ship-check.sh",
    "python3 -B .agent/scripts/refresh.py --refresh",
    "python3 -B .agent/scripts/validate.py --check",
    "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "python3 -B packages/contracts/tests/validate_contracts.py",
    "git diff --check"
  ],
  "implementation_result": "Integrated the newcomer task's plain-language product explanation into the synchronized V1 documentation set. The root README now owns that canonical explanation and separates current accepted-alpha status, implemented scope, and production gaps; .agent/START_HERE.md links to it and remains concise internal governance/onboarding routing. Preserved all TASK-0012 conformance, planning, validation, and not-production-ready corrections; refreshed generated integrity and prepared the unified change for a bounded local main commit.",
  "review_evidence": ["EVD-0020"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": ["EVD-0020"],
  "external_effects": "none",
  "limitations": [
    "Documentation integration does not establish production readiness or open any reserved crossing."
  ]
}
---

## Scope

In scope:

- Preserve the newcomer task's plain-language product explanation.
- Preserve the completed TASK-0012 V1 status, conformance, planning, and
  production-readiness corrections.
- Refresh, validate, and commit the unified documentation set locally.

Out of scope:

- Canonical product-definition or implementation changes.
- Production, credential, publication, deployment, or external-integration
  activation.
- Push or other external repository action.

## Acceptance criteria

- [x] Root README is the canonical newcomer explanation.
- [x] Agent start page routes to it without duplicating it.
- [x] Alpha and production-readiness boundaries remain coherent throughout.
- [x] Refresh, read-only validation, mutation tests, contract validation, and
      whitespace checks pass.
- [x] Unified documentation is prepared for a bounded local commit on `main`;
      no push occurs.

## Risks and gates

- Side effects: repository-local documentation, generated-integrity, staging,
  and local commit writes.
- Required approvals: current delegated integration and local-commit request;
  no external authority is implied.
- Sensitive data: none.
- Rollback: ordinary version-control reversal of the bounded local commit.

## Evidence and closure

- Evidence: EVD-0020.
- Review: complete ship check PASS, including all workspace typechecks, tests,
  lints, Studio production build, contracts, refresh/check, and 51 harness
  tests; the standalone 51-case run, strict JSON parsing, and
  `git diff --check` also PASS.
- External effects: none.
- Residual limitations: documentation integration does not establish
  production readiness.
- Next action: create the authorized local commit on `main` without pushing.
