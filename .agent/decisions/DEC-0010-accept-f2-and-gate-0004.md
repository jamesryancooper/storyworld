---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0010",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Accept the F2 governed foundation and evaluate GATE-0004 as passed",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28 with one rider: the CI-side restore drill moves from O1 to F3 tranche 1.",
  "owner": "ryan-cooper (project owner)",
  "scope": "The F2 governed foundation: monorepo toolchain (DEC-0009); four migrations (tenancy+RLS, custody, principals+capability leases, asset lineage); content-addressed storage (fs + S3/MinIO adapters); Ed25519-signed portable package export/verify/import; VS0 round-trip and restore-drill proofs; CI running all of it (harness, contracts, and platform jobs with Postgres and MinIO services). On acceptance: GATE-0004 records passed on EVD-0009; PLAN-0004 completes; F3 (PLAN-0005) unblocks.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Disclosed deferrals as amended at acceptance: telemetry baseline arrives with the engine-api application (F3 entry); feature flags at first need; production signing-key custody remains O1; the CI-side restore drill is pulled forward to F3 tranche 1 per the owner rider. F3 kernel tables adopt the same RLS/append-only pattern and re-run VS0 at full product scope.",
    "Structural and behavioral proofs only; no production readiness is implied."
  ]
}
---

## GATE-0004 criterion mapping

| Exit criterion | Satisfied by |
|---|---|
| Export, local deletion, re-import preserves identifiers, hashes, lineage, rights, approvals | VS0 test (EVD-0009): signed canonical package, deleted local copy, verified re-import with identical hashes/IDs/receipts; tamper rejection |
| Failed jobs cannot partially mutate; replay creates no duplicates | Transactional migration runner (rollback on failure, tamper rejection); transactional outbox; inbox dedupe test |
| Every accepted asset traces to source material and transformations | content_blobs + asset_versions + derivations (append-only, trigger-enforced) with recursive lineage test |
| A restore drill succeeds | infra/scripts/restore-drill.sh: PASS with identical counts and a green post-restore test suite |

## Consequences

- F3 (headless narrative kernel) unblocks on acceptance; its tables inherit
  the proven RLS + append-only + lineage pattern.
- The deferrals above are recorded, not forgotten.

## Validation and rollback

- Evidence: EVD-0009; CI green across three jobs.
- Reversal: revise named items before acceptance; after, supersession.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session: "accept with the CI-drill rider." Rider recorded: the CI-side
restore drill is pulled forward from O1 into F3 tranche 1 (implemented
immediately upon acceptance). Recorded by claude-agent.
