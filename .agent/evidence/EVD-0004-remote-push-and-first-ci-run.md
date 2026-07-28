---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0004",
  "title": "Push to owner-provided remote and first green CI run",
  "task": "TASK-0002",
  "recorded_at": "2026-07-28",
  "authority_source": "authority:TASK-0002",
  "owner": "claude-agent (session 2026-07-28)",
  "scope": "Branch main (commits 99d95e8 baseline, 3e49a82 development layer) pushed to https://github.com/jamesryancooper/storyworld.git; CI workflow 'validate' run 30359885658",
  "method": "git push -u origin main; gh run watch 30359885658 --exit-status",
  "environment": "Local: macOS (darwin 25.5.0), git over HTTPS. CI: GitHub Actions ubuntu-latest, Python 3.11 and 3.12 matrix",
  "subject_revision_or_fingerprint": "commit 3e49a82 (main); CI run 30359885658",
  "result": "pass",
  "fresh_until": "2026-08-28",
  "supersedes": null,
  "limitations": [
    "First-run observation; CI re-evaluates every push. Branch protection and required-check settings are GitHub-side owner configuration and were not verified.",
    "CI actions pinned by version tag (checkout@v4, setup-python@v5), not commit SHA; revisit at the SUP-0001 supply-chain assessment."
  ]
}
---

## Method

- `git push -u origin main` published commits `99d95e8` and `3e49a82` to the
  owner-provided remote (verified empty beforehand via `git ls-remote`).
- `gh run watch 30359885658 --exit-status --compact` observed the first
  `validate` workflow run to completion.

## Result

- Push accepted; `main` tracks `origin/main`.
- CI run 30359885658: **both jobs green** — `harness (3.11)` and
  `harness (3.12)` each ran the read-only structural check and the 51-test
  harness suite in ~13s.

## Limitations

- Proves the pushed tree passes structural validation in a clean external
  environment; proves nothing about project readiness.
