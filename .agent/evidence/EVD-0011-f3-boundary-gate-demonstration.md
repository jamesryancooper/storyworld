---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0011",
  "title": "F3 boundary: gate demonstration and kernel proofs green locally and in CI",
  "task": "TASK-0006",
  "recorded_at": "2026-07-28",
  "authority_source": "authority:TASK-0006",
  "owner": "claude-agent (session 2026-07-28)",
  "scope": "F3 tranches 1-3: migrations 0005-0006, @storyworld/kernel, @storyworld/engine-api, @storyworld/cli; 25 tests across 6 packages incl. the GATE-0005 three-episode demonstration and full-scope VS0",
  "method": "bash infra/scripts/ship-check.sh (strict exit codes across typecheck, tests, lint, contract validator, harness refresh/check, harness suite); CI observation recorded in the event log after push",
  "environment": "Local: macOS, Node 24/pnpm, compose Postgres 16 + MinIO. CI: ubuntu, Node 22, Postgres+MinIO services, restore drill every push",
  "subject_revision_or_fingerprint": "working tree at F3 boundary, 2026-07-28",
  "result": "pass",
  "fresh_until": "2026-08-28",
  "supersedes": null,
  "limitations": [
    "Behavioral proofs of the kernel and public surfaces; disclosed scope notes in DEC-0011."
  ]
}
---

## Results

GATE-0005 demonstration PASS: three-episode project authored and approved
entirely through the HTTP API and CLI — model proposals accepted only by a
human (403 with Problem Details otherwise), idempotent mutation replay,
story-time state packets (state independent of release order), pinned
release byte-identical through later canon change, CLI signed export +
verification, and the package alone reproducing release document and asset
bytes after local blob destruction. Kernel test additionally proves
supersession chaining and impact analysis. 25 tests green.
