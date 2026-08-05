---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0037",
  "title": "Owner questionnaire F-09 capability milestones validated",
  "task": "TASK-0027",
  "recorded_at": "2026-08-04",
  "authority_source": "external:operator instruction from the project owner on 2026-08-04",
  "owner": "codex-agent (documentation correction)",
  "scope": "Finding F-09 mobile, template, typed-custom-field, declarative-validator, lifecycle-mapping, governed-extension, and adapter milestone assignments in project-dossier-intake/owner-input/storyworld-owner-decision-questionnaire.md plus required local governance and generated integrity records.",
  "method": "Recovered the exact pre-F-09 questionnaire blob from the prior validated source fingerprint, applied the owner's capability-specific Basic and Full support horizons, reconciled Question 24, Question 25, the cross-cutting register, summaries, and prototype register, performed a focused read-only change review, compared exact pre/post hashes for Questions 18 and 22 and the F-10 and F-11 protected passages, refreshed generated integrity records, ran the structural validator and all 51 unit tests, and checked the complete diff for whitespace errors.",
  "environment": "Local Storyworld Platform workspace; Python 3.14.0; no network, provider, deployment, publication, credential, participant, charging, or other external action.",
  "subject_revision_or_fingerprint": "sha256:e49f454ec3256a5b6029166b07c849e66140bf9d7d967d276ecdb47664da805e",
  "result": "pass",
  "fresh_until": "2026-09-04",
  "supersedes": null,
  "limitations": [
    "Structural validation and internal document review do not establish implementation or production readiness.",
    "F-10 and F-11 remain unresolved pending explicit owner direction.",
    "Questions 18 and 22 remain Undecided, and the purpose-statement version remains unrecorded pending formal sign-off.",
    "These milestone assignments establish target support horizons only and do not authorize rollout or another external action."
  ]
}
---

## Method

- Used Git blob `a376c9ddaeb4cddc2e4e16018f72a5e0ddcb5115`, whose
  SHA-256 is the prior validated questionnaire fingerprint
  `5d0fa4ac10af8d3167851e8cd951b6e28fd50d2c959bc7f6f44d4fc14c4d9ba7`,
  as the exact pre-F-09 source.
- Assigned the Mobile Decision Inbox to Basic support by Reliable Internal
  Version and Full support by Limited Paid Beta, without accelerating an
  underlying capability or requiring desktop parity.
- Preserved Review assignments as a Mature Product dependency and linked
  Basic mobile evidence to Internal Qualification and bounded pilot use.
- Assigned templates and typed custom fields to Useful Internal Version /
  Limited Paid Beta; declarative validators and lifecycle mappings to Reliable
  Internal Version / Limited Paid Beta; and governed extensions and adapters to
  Limited Paid Beta / Mature Product.
- Reconciled the controlling answers, cross-cutting owner-direction register,
  research/prototype register, detailed summary, research list, and successor
  inclusion list.
- Rechecked every owner-specified mobile, customization, and milestone term.
- Performed a focused read-only change review against the exact pre-F-09 blob;
  no correctness, regression, authority-boundary, or missing-validation finding
  remained.
- Confirmed exact pre/post hashes remained identical for protected passages:
  - Question 18: `9ef07c44c96f84dc4a4830b09488e0dafc3716f92f28f97eea97938dce0085e7`
  - Question 22: `17e490ef189ef21241de642b2b287ef01ee514d816d3f3effc81cfb77e412f8c`
  - F-10 lifecycle-state subsection: `4bece58e63e90eb7ee05ff328b576665ac260f4b28a3797ca1988a186c4ad129`
  - Question 26 / F-11 rollout passage: `c2e94871dab2d2c773b223764e3a8d12eb6a1d22ef51f0c52563d52085e865af`
- Ran `python -B .agent/scripts/refresh.py --refresh`.
- Ran `python -B .agent/scripts/validate.py --check`.
- Ran `python -B -m unittest discover -s .agent/tests -p "test_*.py"`.
- Ran `git diff --check`.

## Result

- Generated integrity refresh: passed.
- Harness and dossier structural contracts: passed.
- Agent tests: passed (`51` tests in `567.288s`).
- Whitespace/error-marker check: passed.
- External effects: none; repository-local changes only.

## Limitations

This evidence supports only the internal coherence and structural validity of
the scoped F-09 documentation correction. It does not establish implementation,
resolve F-10 or F-11, select Questions 18 or 22, authorize rollout, or authorize
any other external action.
