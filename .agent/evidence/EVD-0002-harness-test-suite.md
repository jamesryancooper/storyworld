---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0002",
  "title": "Harness unit and mutation test suite on the adopted tree",
  "task": "TASK-0001",
  "recorded_at": "2026-07-28",
  "authority_source": "authority:TASK-0001",
  "owner": "claude-agent (session 2026-07-28)",
  "scope": ".agent/tests/test_validate.py (51 tests: schema, lifecycle, policy-mutation, extension confinement, integrity, recovery)",
  "method": "python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
  "environment": "macOS (darwin 25.5.0), Python 3.14.0 (pyenv), temp-dir clones, no network",
  "subject_revision_or_fingerprint": "uncommitted working tree 2026-07-28, refresh generation a2f35dcf4f32d63592da1cc74bccc758 (no git commits exist)",
  "result": "pass",
  "fresh_until": "2026-08-28",
  "supersedes": null,
  "limitations": [
    "Two generated tests were adapted during adoption (recorded in TASK-0001): the fixture clone now excludes the live .git directory (the governed tree never included one), and the adoption-coherence mutation now derives its mismatched status from the repository's actual adoption status instead of assuming the pristine scaffold value. Test intent (mutation must be detected) is unchanged.",
    "Executed at 2026-07-28T11:33Z (UTC): Ran 51 tests, OK."
  ]
}
---

## Method

- Command: `python3 -B -m unittest discover -s .agent/tests -p "test_*.py"`.
- The suite clones the repository into temp directories and mutates the
  clones; the working tree is not modified.

## Result

- `Ran 51 tests ... OK` — including negative/mutation coverage: forbidden
  policy mutations fail, invalid lifecycle transitions fail, extension
  confinement holds, stale generated evidence is detected, interrupted
  refresh and corrupted event recovery are exercised.

## Limitations

- The suite validates harness contracts, not Storyworld product behavior
  (none exists yet).
