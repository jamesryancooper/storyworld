---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0009",
  "title": "F2 custody proofs: VS0 signed round trip, restore drill, lineage, isolation",
  "task": "TASK-0005",
  "recorded_at": "2026-07-28",
  "authority_source": "authority:TASK-0005",
  "owner": "claude-agent (session 2026-07-28)",
  "scope": "F2 tranches 2-3: @storyworld/persistence (4 migrations), @storyworld/storage (fs + MinIO adapters), @storyworld/portability (Ed25519-signed package export/verify/import); 21 tests across 4 packages against live PostgreSQL 16 and MinIO; restore drill via infra/scripts/restore-drill.sh",
  "method": "pnpm -r typecheck/test/lint (exit codes verified); test suite executed twice consecutively to prove re-runnability; bash infra/scripts/restore-drill.sh (pg_dump -Fc, DROP SCHEMA CASCADE, pg_restore, count verification) inside the version-matched compose container",
  "environment": "Local: macOS (darwin 25.5.0), Node 24 (pnpm 10.20), Docker compose profile (postgres:16, minio). CI: observation recorded in the event log after push",
  "subject_revision_or_fingerprint": "working tree at F2 tranche-3 completion, 2026-07-28",
  "result": "pass",
  "fresh_until": "2026-08-28",
  "supersedes": null,
  "limitations": [
    "VS0 exercised at the custody layer (fixture canon-release + audit receipt + binary asset through signed export -> local deletion -> verified re-import with identical hashes/IDs); the full product VS0 re-runs when F3 kernel tables exist.",
    "Signing keys are test-ephemeral; production key custody is an O1 concern.",
    "Restore drill executed locally with PASS; a CI-side drill is deferred to O1."
  ]
}
---

## Results

- **VS0 round trip: PASS** — real Stillhouse canon-release record + audit
  receipt + binary asset exported as an Ed25519-signed canonical package;
  local blob files deleted; package verified (signature, canonical form,
  record hashes, asset integrity) and re-imported with identical content
  hashes, receipt identity, and blob addresses. Tampered-envelope rejection
  verified deterministically.
- **Restore drill: PASS** — dump/destroy/restore with identical
  migration/organization/receipt counts (3/8/4); full application test
  suite green against the restored database.
- **Custody invariants: PASS** — RLS cross-tenant invisibility and forged
  insert rejection; append-only enforcement on receipts, blobs, asset
  versions, and derivations (admin included); migration tamper rejection;
  inbox dedupe; recursive lineage query resolves derivation chains.
- 21 tests green twice consecutively (re-runnable against a persistent dev
  database).
