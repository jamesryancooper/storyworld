---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0038",
  "title": "Owner questionnaire F-10 workflow taxonomy validated",
  "task": "TASK-0028",
  "recorded_at": "2026-08-04",
  "authority_source": "external:operator instruction from the project owner on 2026-08-04",
  "owner": "codex-agent (documentation correction)",
  "scope": "Finding F-10 standard workflow categories, custom-state mapping behavior, example mappings, and authority boundaries in project-dossier-intake/owner-input/storyworld-owner-decision-questionnaire.md plus required local governance and generated integrity records.",
  "method": "Used the exact pre-F-10 working-tree questionnaire blob, defined the owner's eight non-authoritative workflow categories and mapping contract, reconciled only mechanically dependent Question 25 register and research wording, rechecked every specified term, performed a focused read-only change review, compared exact pre/post hashes for protected F-04, F-09, F-11, Question 18, and Question 22 passages, refreshed generated integrity records, ran the structural validator and all 51 unit tests, and checked the complete diff for whitespace errors.",
  "environment": "Local Storyworld Platform workspace; Python 3.14.0; no network, provider, deployment, publication, credential, participant, charging, or other external action.",
  "subject_revision_or_fingerprint": "sha256:2231932a70e9f02acf8fb23e1d74411f09a3a6d6f19aae4cac3189b58fd4b33d",
  "result": "pass",
  "fresh_until": "2026-09-04",
  "supersedes": null,
  "limitations": [
    "Structural validation and internal document review do not establish implementation or production readiness.",
    "F-11 remains unresolved pending explicit owner direction.",
    "Questions 18 and 22 remain Undecided, and the purpose-statement version remains unrecorded pending formal sign-off.",
    "The workflow categories are a target non-authoritative overlay and do not create or modify an object-specific lifecycle, action, gate, state, or receipt."
  ]
}
---

## Method

- Used Git blob `339cd56a57ccff23eb6479b5f4264058fc831688`, whose
  SHA-256 is the prior validated questionnaire fingerprint
  `e49f454ec3256a5b6029166b07c849e66140bf9d7d967d276ecdb47664da805e`,
  as the exact pre-F-10 working-tree source.
- Defined Workflow—Pending, Workflow—In Progress, Workflow—Blocked,
  Workflow—Review Pending, Workflow—Revision Required, Workflow—Decision
  Pending, Workflow—Complete, and Workflow—Inactive.
- Required every custom workflow state to map to exactly one category while
  allowing several states to share a category and preserving both label and
  category in inspection, search, export, APIs, and audit history.
- Defined custom-state schema fields, ordinary mapping-controlled behavior,
  template-specific transitions, migration and stale-version requirements,
  example mappings, and authoritative-status precedence.
- Preserved separate canon, asset, document, review, release, publication,
  rights, runtime, commerce, and disposition lifecycles and actions.
- Updated only the Question 25 milestone clarification, current-state
  qualification, OD-14, RP-13, detailed summary, research list, and successor
  inclusion wording mechanically dependent on the taxonomy.
- Performed a focused read-only change review against the exact pre-F-10 blob;
  no correctness, regression, authority-boundary, or missing-validation finding
  remained.
- Confirmed exact pre/post hashes remained identical for protected passages:
  - Question 15 / F-04 access model: `641512347b7ad0f8b939af63d0aa65d2a1269646d1787852837537187852feb5`
  - Question 18: `9ef07c44c96f84dc4a4830b09488e0dafc3716f92f28f97eea97938dce0085e7`
  - Question 19 / F-04 retention model: `07ddf6e5944817c0cd82e79c6f9450918f2163b27a28cf57f152b6779e6bf03a`
  - Question 22: `a749b55afde278f8d3ea1a1bbf650b346ee089127dd5fb4197e8b4b4170911cb`
  - Question 24 / F-09 mobile model: `8d20c7ece5ecbfe6f9b15f67b48f35715f6ada8852d2eb45a0af1a144a6a6ddf`
  - F-09 capability milestone table: `d70a62a7ecee124f43b65551dfff98abe2433d795f86633013cca2a1556a6676`
  - Question 26 / F-11 rollout passage: `c2e94871dab2d2c773b223764e3a8d12eb6a1d22ef51f0c52563d52085e865af`
- Ran `python -B .agent/scripts/refresh.py --refresh`.
- Ran `python -B .agent/scripts/validate.py --check`.
- Ran `python -B -m unittest discover -s .agent/tests -p "test_*.py"`.
- Ran `git diff --check`.

## Result

- Generated integrity refresh: passed.
- Harness and dossier structural contracts: passed.
- Agent tests: passed (`51` tests in `491.960s`).
- Whitespace/error-marker check: passed.
- External effects: none; repository-local changes only.

## Limitations

This evidence supports only the internal coherence and structural validity of
the scoped F-10 documentation correction. It does not establish implementation,
resolve F-11, select Questions 18 or 22, create a global lifecycle, or authorize
any external action.
