---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0036",
  "title": "Owner questionnaire F-04 access and retention model validated",
  "task": "TASK-0026",
  "recorded_at": "2026-08-04",
  "authority_source": "external:operator instruction from the project owner on 2026-08-04",
  "owner": "codex-agent (documentation correction)",
  "scope": "Finding F-04 access, embargo, retention, Legal Hold, and conflict-handling definitions in project-dossier-intake/owner-input/storyworld-owner-decision-questionnaire.md plus required local governance and generated integrity records.",
  "method": "Applied the owner's four-class access model and structured retention model, reconciled the access crosswalk and dependent derivative, search, encryption, audit, deletion, and Question 19 passages, rechecked every specified term, compared exact pre/post hashes for Questions 24 through 26, refreshed generated integrity records, ran the structural validator and all 51 unit tests, and checked the complete diff for whitespace errors.",
  "environment": "Local Storyworld Platform workspace; Python 3.14.0; no network, provider, deployment, publication, credential, participant, or other external action.",
  "subject_revision_or_fingerprint": "sha256:5d0fa4ac10af8d3167851e8cd951b6e28fd50d2c959bc7f6f44d4fc14c4d9ba7",
  "result": "pass",
  "fresh_until": "2026-09-04",
  "supersedes": null,
  "limitations": [
    "Structural validation and internal document review do not establish implementation or production readiness.",
    "F-09, F-10, and F-11 remain unresolved pending explicit owner direction.",
    "Questions 18 and 22 remain Undecided, and the purpose-statement version remains unrecorded pending formal sign-off.",
    "Detailed durations for operational records remain intentionally delegated to applicable retention policies."
  ]
}
---

## Method

- Defined exactly four ranked base access classes and made missing, invalid, or
  uncertain base classification fail closed as Access—Restricted.
- Defined Access—Embargoed as an additive temporary overlay with its required
  underlying class, active access, release condition, and intended post-embargo
  class fields.
- Replaced linear access-conflict shorthand with permission intersection and
  overriding-prohibition rules while preserving the independent provider-egress
  dimension and its four existing classes.
- Defined five structured retention profiles, required policy fields, Legal
  Hold, bounded retention-window calculation, and unresolved conflict handling
  without inventing operational-record durations.
- Reconciled derivative inheritance, crosswalk defaults, search disclosure,
  encryption, logging, administrative access, deletion, and Question 19.
- Preserved the 30-day recoverable property-deletion period and protected
  minimum receipt, hash, tombstone, or deletion record option.
- Rechecked every owner-specified term and dependent passage.
- Confirmed exact pre/post section hashes remained identical:
  - Question 24 / F-09: `ca71d72952ead4b43ea2bb1de1eea882eb1295b5d08ea7bada20242422b707a9`
  - Question 25 / F-10: `6e9904307c64a1416830c70c028d973af63affecf1546038d611bb6d4835cda5`
  - Question 26 / F-11: `4ffbccb8c260be6f3688a7acf28514c9de1745f96af032af8e3f44be448b182c`
- Ran `python -B .agent/scripts/refresh.py --refresh`.
- Ran `python -B .agent/scripts/validate.py --check`.
- Ran `python -B -m unittest discover -s .agent/tests -p "test_*.py"`.
- Ran `git diff --check`.

## Result

- Generated integrity refresh: passed.
- Harness and dossier structural contracts: passed.
- Agent tests: passed (`51` tests in `587.260s`).
- Whitespace/error-marker check: passed.
- External effects: none; repository-local changes only.

## Limitations

This evidence supports only the internal coherence and structural validity of
the scoped F-04 documentation correction. It does not establish implementation,
select any remaining owner choice, or authorize an external action.
