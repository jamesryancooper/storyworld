---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0005",
  "title": "F0 pack drafting validation and CI observation",
  "task": "TASK-0003",
  "recorded_at": "2026-07-28",
  "authority_source": "authority:TASK-0003",
  "owner": "claude-agent (session 2026-07-28)",
  "scope": "Commit 895e2f5 (F0 charter and authority pack draft): local refresh + read-only check + 51-test suite, and the GitHub Actions validate run on the pushed commit",
  "method": "python3 -B .agent/scripts/refresh.py --refresh; python3 -B .agent/scripts/validate.py --check; python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"; git push; gh run list polling until completion",
  "environment": "Local: macOS (darwin 25.5.0), Python 3.14.0. CI: GitHub Actions ubuntu-latest, Python 3.11 and 3.12",
  "subject_revision_or_fingerprint": "commit 895e2f5 on main",
  "result": "pass",
  "fresh_until": "2026-08-28",
  "supersedes": null,
  "limitations": [
    "Structural validation and CI only; the F0 pack's substance is unreviewed until the owner evaluates GATE-0002 via DEC-0006.",
    "packages/contracts/ content is outside the dossier registry scope by design; it is covered by the repository-wide source fingerprint and CI, not by dossier path authority."
  ]
}
---

## Method

Local cycle green at 2026-07-28T13:11Z (refresh PASS, check PASS, 51 tests
OK); commit 895e2f5 pushed; CI validate run on 895e2f5 observed to
completion.

## Result

- Local: PASS / PASS / OK.
- CI on 895e2f5: **success**.

## Limitations

- Proves structure and repeatability, not the correctness or acceptance of
  any ADR or charter artifact.
