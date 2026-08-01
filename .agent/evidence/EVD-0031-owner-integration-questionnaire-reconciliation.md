---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0031",
  "title": "Owner-directed integration questionnaire reconciliation",
  "task": "TASK-0021",
  "recorded_at": "2026-08-01",
  "authority_source": "external:operator instruction from the project owner on 2026-08-01 to update the integration questionnaire with confirmed clarifications",
  "owner": "codex-agent (documentation update)",
  "scope": "Reconciled the owner-input questionnaire's control layers, provider-data boundaries, custody and reversibility rules, canon authority, scheduling and publication boundary, integration priorities, small-creator scope, runtime choices, Commerce Foundry path, and final summary.",
  "method": "Direct questionnaire review and repository-local documentation update; refreshed generated integrity outputs; ran harness structural validation, the 51-test harness suite, and git diff --check.",
  "environment": "Local macOS repository; no live provider calls, credentials, publication, deployment, Commerce Foundry activation, or external communication.",
  "subject_revision_or_fingerprint": "sha256:ec41ea72c94bf188dc4c30c53b759afdaf75af6b153239e9b2404331eee3ceef",
  "result": "pass",
  "fresh_until": "2026-09-01",
  "supersedes": null,
  "limitations": [
    "Markdown diagnostics still report the questionnaire's pre-existing multi-title, duplicate-heading, and emphasis-heading warnings; no new substantive markdown defect was identified.",
    "The first sandboxed harness-suite attempt could not copy a protected node_modules/.idea path; the exact suite was rerun outside the sandbox and passed."
  ]
}
---

## Result

The questionnaire now distinguishes advisory recommendations from owner
authority and carries the owner's confirmed direction through professional
controls, data policy, asset custody, runtime authority, publishing,
scheduling, print-on-demand, deployment, and the final configuration summary.

## Validation

- `python -B .agent/scripts/refresh.py --refresh` — PASS
- `python -B .agent/scripts/validate.py --check` — PASS
- `python -B -m unittest discover -s .agent/tests -p "test_*.py"` — PASS
- `git diff --check` — PASS
