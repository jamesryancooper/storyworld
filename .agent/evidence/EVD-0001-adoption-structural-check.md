---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0001",
  "title": "Read-only structural check of the adopted tree",
  "task": "TASK-0001",
  "recorded_at": "2026-07-28",
  "authority_source": "authority:TASK-0001",
  "owner": "claude-agent (session 2026-07-28)",
  "scope": "Full repository source scope per .agent/generated/validation-report.json; excludes .git internals",
  "method": "python3 -B .agent/scripts/refresh.py --refresh (source validation, staged derivation, final read-only check) followed by python3 -B .agent/scripts/validate.py --check",
  "environment": "macOS (darwin 25.5.0), Python 3.14.0 (pyenv), repository-local, no network",
  "subject_revision_or_fingerprint": "uncommitted working tree 2026-07-28, refresh generation a2f35dcf4f32d63592da1cc74bccc758 (no git commits exist)",
  "result": "pass",
  "fresh_until": "2026-08-28",
  "supersedes": null,
  "limitations": [
    "Structural contracts only; proves no project readiness, quality, or safety.",
    "A subsequent bookkeeping refresh (recording this evidence and the event log) re-derived generated outputs under a new generation ID; its final read-only check is reported by that refresh command's exit status and .agent/generated/validation-report.json.",
    "Executed at 2026-07-28T11:33Z (UTC)."
  ]
}
---

## Method

- Commands: `python3 -B .agent/scripts/refresh.py --refresh` then
  `python3 -B .agent/scripts/validate.py --check`; Python 3.14.0.
- Managed scope: full repository per the generated report; 124 files in the
  dossier manifest at generation `a2f35dcf4f32d63592da1cc74bccc758`.
- Dirty/untracked scope: the entire tree is uncommitted (no commits exist);
  the check operates on file content, not git state.

## Result

- refresh: `[PASS] refreshed registry-derived metadata and profile integrity
  outputs` with `[INFO] final read-only harness check completed on the exact
  tree`.
- check: `[PASS] harness and dossier structural contracts` with `[INFO]
  project adoption, implementation, and readiness remain unassessed`.
- Output artifact: `.agent/generated/validation-report.json` (regenerated on
  every refresh; point-in-time, non-authoritative).

## Limitations

- Skipped checks: none reported by the validator for this profile.
- This evidence does not prove: correctness of canonical content, owner
  acceptance of any decision, or any readiness claim.
