---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0007",
  "title": "F1-boundary validation: full contract pack green locally and in CI",
  "task": "TASK-0004",
  "recorded_at": "2026-07-28",
  "authority_source": "authority:TASK-0004",
  "owner": "claude-agent (session 2026-07-28)",
  "scope": "Commits 995bfb9 (fixture-packet integration), cc221fe (design notes), 2a337bb (OpenAPI/events/interfaces/SDK): contract validator (schemas, lifecycles, charter coherence, fixtures, invalid cases, registry coverage, restricted-source separation, MET-F1 metamorphics, OpenAPI, event catalog, interfaces), harness refresh/check, 51-test harness suite",
  "method": "python3 -B packages/contracts/tests/validate_contracts.py; python3 -B .agent/scripts/refresh.py --refresh; python3 -B .agent/scripts/validate.py --check; python3 -B -m unittest discover -s .agent/tests -p \"test_*.py\"; git push; gh run list polling",
  "environment": "Local: macOS (darwin 25.5.0), Python 3.14.0. CI: GitHub Actions ubuntu-latest, Python 3.11 and 3.12",
  "subject_revision_or_fingerprint": "commit 2a337bb on main; CI runs through 30382310094",
  "result": "pass",
  "fresh_until": "2026-08-28",
  "supersedes": null,
  "limitations": [
    "Structural validation only; GATE-0003 remains not_assessed until the owner decides DEC-0007 and DEC-0008.",
    "Semantic enforcement items are documented F3-kernel scope (DESIGN_NOTES)."
  ]
}
---

## Result

All layers green at the F1 boundary, locally and in CI (final run
30382310094 on 2a337bb): contract validator PASS across 13 schema documents,
4 lifecycle machines, 4 production fixtures, 8 probes, 6 active MET-F1
transformations, the OpenAPI contract (33 paths), the 24-event catalog, and
3 interface contracts; harness check PASS; 51 tests OK.
