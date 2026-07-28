---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0005",
  "status": "in_progress",
  "previous_status": "ready",
  "title": "F2 — governed foundation (PLAN-0004): monorepo, persistence, custody, portability",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) — stack \"confirmed\" (DEC-0009) with the standing instruction to record the decision and start PLAN-0004; continue-to-blocker mode remains in effect.",
  "owner": "claude-agent (storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": ["TASK-0004"],
  "scope": "In scope: F2 per canonical part 06 section 19.3 under DEC-0009 — monorepo scaffolding (pnpm workspaces, TypeScript strict, vitest, eslint/prettier), Docker Compose dev profile (PostgreSQL 16, MinIO, Temporal), migrations framework, PostgreSQL persistence with tenant isolation/RLS, immutable revisions, content-addressed object storage, rights/consent/policy hooks, identity and capability boundaries, audit receipts, outbox/inbox, deterministic signed export/import (VS0), telemetry baseline, backup/restore drill. Delivered in validated tranches, each committed with CI green. Out of scope: F3 kernel features, media providers (B1), Studio (B2), GATE-0004 evaluation (owner).",
  "acceptance_criteria": [
    "Tranche 1: workspace tooling green locally and in CI (typecheck, test, lint on a first real domain package); compose profile validates.",
    "Later tranches per PLAN-0004 acceptance criteria, culminating in the VS0 round trip and restore drill.",
    "Every tranche lands with all validation layers green, pushed, CI green."
  ],
  "validation_plan": [
    "pnpm -r typecheck && pnpm -r test && pnpm -r lint",
    "docker compose config -q",
    "python -B packages/contracts/tests/validate_contracts.py",
    "python -B .agent/scripts/refresh.py --refresh && python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git push; observe CI"
  ],
  "implementation_result": "Tranche 1 (2026-07-28): pnpm workspace monorepo (packageManager-pinned, hoisted linker per DEC-0009), strict TypeScript base config, ESLint flat config + Prettier, vitest; first domain package @storyworld/domain with identity/integrity primitives (UUIDv7 gen/validate/timestamp, content sha256, semver guards, canonical JSON byte-compatible with the contract validator) and 7 passing tests; infra/compose.yaml dev profile (PostgreSQL 16, MinIO, Temporal auto-setup) validated; CI platform job added (Node 22, corepack/pnpm, typecheck/test/lint/compose). Harness adaptation: reasoned fingerprint exclusions now also scope the hygiene/secret walk (node_modules .bin symlinks), 51-test conformance suite green. project.json hooks configured (project_build, project_lint).",
  "review_evidence": [],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: pushes to the owner-provided remote; pnpm registry fetches for dependency installation (read-only, lockfile-pinned).",
    "GATE-0004 evaluation is the owner boundary at phase end."
  ]
}
---

## Scope

F2 implementation in tranches under DEC-0009. Tranche 1: monorepo tooling +
first domain package + compose profile + CI node job.

## Evidence and closure

- Filled per tranche and at closure.
