---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0009",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "F2 implementation stack (ASM-0001 resolution)",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) confirmation 2026-07-28 in the operator session (\"confirmed\") of the recommended stack set, resolving ASM-0001 at F2 entry as planned.",
  "owner": "ryan-cooper (project owner)",
  "scope": "Implementation toolchain for F2 onward, within the accepted ADRs (ADR-0003/0004/0005/0006).",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "ORM/query-layer choice deliberately deferred to actual need; migrations are plain SQL with a thin runner.",
    "Local Node is 24.x within the engines range; CI pins Node 22 LTS as the reference runtime."
  ]
}
---

## Context

The canonical stack intent (part 03 §9.2) was held as assumption ASM-0001
pending owner confirmation at F2 entry. The owner confirmed the recommended
set with no amendments.

## Decision

- **TypeScript** on **Node ≥22** (CI reference: Node 22 LTS), strict mode.
- **pnpm workspaces** for the monorepo, `packageManager`-pinned, with the
  **hoisted node linker**: one real `node_modules` directory, no symlink
  forest — chosen so the harness's repository-symlink and fingerprint
  discipline holds with a single reasoned exclusion (`node_modules`,
  reproducible from the committed lockfile). Turborepo deferred until build
  times justify it.
- **Vitest** for tests; **ESLint (flat config) + Prettier** for lint/format.
- **Docker Compose** dev profile: PostgreSQL 16, MinIO, Temporal dev server
  (auto-setup) per ADR-0004/0005/0006.
- **Migrations as plain SQL** files with a thin TypeScript runner (lands
  with the persistence tranche).

## Consequences

- F2 scaffolding proceeds immediately; CI gains a Node job alongside the
  harness and contract jobs.
- The lockfile is source (fingerprinted); `node_modules` is excluded from
  fingerprint/scan with the recorded reason.

## Validation and rollback

- Evidence: first green typecheck/test/lint run locally and in CI on the
  scaffold; compose file validated.
- Reversal: successor decision; scaffold-stage switching costs are low.
