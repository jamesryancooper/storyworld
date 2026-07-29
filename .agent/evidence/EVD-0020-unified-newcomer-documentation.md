---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0020",
  "title": "Unified newcomer documentation integration and validation",
  "task": "TASK-0013",
  "recorded_at": "2026-07-29",
  "authority_source": "external:operator delegation 2026-07-29 to integrate the completed newcomer-docs worktree into the synchronized V1 documentation set and commit the result locally without push",
  "owner": "codex-agent (documentation integration)",
  "scope": "Intentional integration of the newcomer task's README and agent-start-page changes with the broader TASK-0012 documentation synchronization; generated-integrity refresh and bounded validation of the unified working tree",
  "method": "Inspected the completed newcomer worktree and direct main-tree diff; retained its plain-language explanation while preserving TASK-0012 accepted-alpha and production-readiness corrections; refreshed generated integrity; ran read-only harness validation, contract-pack validation, strict JSON parsing, git diff whitespace validation, and the 51-case harness unit/mutation suite; after closure records, ran the complete unpiped ship check covering workspace typechecks/tests/lints, Studio production build, contracts, refresh/check, and a second 51-case harness run",
  "environment": "Local macOS workspace; repository working tree based on main/origin-main at 23d305070993702952526420dd7d7b4d7f528c35; no production environment or live external provider inspected",
  "subject_revision_or_fingerprint": "Unified TASK-0012/TASK-0013 documentation working tree based on 23d305070993702952526420dd7d7b4d7f528c35; final generated fingerprint recorded by the refreshed manifest",
  "result": "pass",
  "fresh_until": "2026-10-29",
  "supersedes": null,
  "limitations": [
    "Validation proves documentation, record, reference, lifecycle, generated-integrity, and contract-pack structure on this working tree; it does not establish production readiness.",
    "A standalone 51-case mutation suite ran after the newcomer merge and first generated-artifact refresh; the complete ship check then ran after the EVD-0020/TASK-0013/event closure records and included a second 51-case run. A final refresh and read-only check cover the evidence-only result wording added after ship-check completion.",
    "The local ship check covered workspace typecheck/test/lint, Studio production build, contracts, refresh/check, and harness tests. Docker Compose validation and the restore drill were not rerun because implementation and runtime configuration did not change; their prior exact-commit CI evidence remains EVD-0018 context.",
    "No push, deployment, publication, credential use, live crossing, or other external effect occurred."
  ]
}
---

## Method

- Inspected the newcomer task's uncommitted `README.md` and
  `.agent/START_HERE.md` changes in its isolated Codex worktree.
- Resolved the overlap intentionally: the root README owns the canonical
  newcomer explanation; the agent start page links to it and retains only
  internal routing and authority boundaries.
- Preserved the completed TASK-0012 V1 status, current-state, conformance,
  planning, gate, and production-readiness corrections.
- Ran `python3 -B .agent/scripts/refresh.py --refresh`; result: PASS.
- Ran `python3 -B .agent/scripts/validate.py --check`; result: PASS.
- Ran `python3 -B -m unittest discover -s .agent/tests -p "test_*.py"`;
  result: 51 tests passed in 366.493 seconds.
- Ran `python3 -B packages/contracts/tests/validate_contracts.py`; result:
  PASS.
- Parsed all 227 repository JSON files strictly and ran `git diff --check`;
  result: PASS.
- Ran the complete unpiped `bash infra/scripts/ship-check.sh` after closure
  records; all workspace typechecks/tests/lints, Studio production build,
  contracts, refresh/check, and a second 51-case harness run passed. The final
  harness run completed in 361.656 seconds and the script printed
  `SHIP-CHECK: all layers green`.

## Result

- The README begins with a plain-language explanation of the product, human
  governance, and the accepted V1 dual-use alpha boundary.
- Technical implementation status and explicit production gaps follow that
  newcomer explanation without overstating readiness.
- The agent guide links to the README as canonical and stays concise.
- Generated integrity and structural validation agree with the unified source
  tree.

## Limitations

- This is documentation integration evidence, not a new runtime, security,
  operations, accessibility, compliance, or production-readiness assessment.
- The authorized local commit and its hash are reported from Git after the
  governed closure tree is refreshed and staged; they are not self-referenced
  from within this evidence record.
