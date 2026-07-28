# Validation

A passing structural check proves only its stated scope. It does not prove
business, legal, privacy, security, accessibility, operational, or production
readiness.

`../machine-readable/evidence-index.json` owns evidence metadata; this file
owns validation methods, commands, interpretation, and limitations.
`QUALITY_GATES.json` is a project-maintained proposed gate store, not
generated evidence and not an approval record.

## Declared validation commands

Authoritative command declarations live in `.agent/validators.json`:

```text
python -B .agent/scripts/validate.py --check     # read-only structural check
python -B -m unittest discover -s .agent/tests -p "test_*.py"
python -B .agent/scripts/refresh.py --refresh    # only writer of derived files
```

`refresh` regenerates `ARTIFACT_CATALOG.json`,
`machine-readable/path-authority.json`, `MANIFEST.json`,
`CHECKSUMS.sha256`, and `.agent/generated/*` from the authoritative sources;
run it after any source or registry change, then re-run the check.

## Project-specific validators

None yet. Real project validation (contract round-trip tests, fixture
compatibility, replay/restore drills) arrives with the F1/F2 phases; the
canonical test-layer catalog is
`../canonical/storyworld/05_governance_operations_and_quality.md`
(section 17.2), and the gates it feeds are in `QUALITY_GATES.json`.

## Interpretation and limitations

- Structural pass = the harness/dossier contracts held on the exact tree at
  the recorded time; nothing more.
- Evidence records are immutable after recording; corrections use successors.
- Generated reports are bound to a generation ID and go stale on any managed
  source change; a stale report is re-derived by refresh, never hand-edited.
