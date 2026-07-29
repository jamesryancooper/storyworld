# Validation

A passing structural check proves only its stated scope. It does not prove
business, legal, privacy, security, accessibility, operational, or production
readiness.

`../machine-readable/evidence-index.json` owns evidence metadata; this file
owns validation methods, commands, interpretation, and limitations.
`QUALITY_GATES.json` is the project-maintained quality-gate store. Gate
transitions cite their approval source and evidence; the file itself is not
permission and passing an alpha gate is not production readiness.

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

The implementation closure gate is `bash infra/scripts/ship-check.sh`. It
runs:

```text
pnpm -r typecheck
pnpm -r test
pnpm -r lint
pnpm --filter @storyworld/studio build
python3 -B packages/contracts/tests/validate_contracts.py
python3 -B .agent/scripts/refresh.py --refresh
python3 -B .agent/scripts/validate.py --check
python3 -B -m unittest discover -s .agent/tests -p "test_*.py"
```

CI additionally validates the compose profile and runs the restore drill
against its service environment. Contract round trips, fixtures, provider
replay, regression/defect injection, accessibility, and the V1 owner
walkthrough are indexed by EVD-0007–EVD-0018 and the applicable gate records.

## Interpretation and limitations

- Structural pass = the harness/dossier contracts held on the exact tree at
  the recorded time; nothing more.
- Evidence records are immutable after recording; corrections use successors.
- Generated reports are bound to a generation ID and go stale on any managed
  source change; a stale report is re-derived by refresh, never hand-edited.
- V1 alpha acceptance proves only the recorded development/CI behaviors and
  owner walkthrough. Production security, operations, compliance, reliability,
  live integrations, and unrestricted publication remain separately gated.
