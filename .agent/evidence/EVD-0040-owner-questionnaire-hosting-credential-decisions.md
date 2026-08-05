---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0040",
  "title": "Owner questionnaire hosting and provider-credential decisions validated",
  "task": "TASK-0030",
  "recorded_at": "2026-08-05",
  "authority_source": "external:operator instruction from the project owner on 2026-08-05",
  "owner": "codex-agent (owner-direction recording)",
  "scope": "Question 18 Mature Product hosting selection and Question 22 provider-credential selection in project-dossier-intake/owner-input/storyworld-owner-decision-questionnaire.md plus mechanically dependent metadata, queue, register, summary, and required local governance and generated integrity records.",
  "method": "Used the exact dirty-working-tree questionnaire snapshot, recorded both Mature Product hosting modes and the hybrid workspace-managed-default credential model in their controlling owner-resolution fields, changed Questions 18 and 22 to Answered and their choices to Selected, reconciled only dependent status and register passages, performed a focused read-only change review, confirmed formal approval remained pending and completed F-02, F-04, F-09, F-10, and F-11 direction was unchanged, refreshed generated records, ran structural validation and all 51 unit tests, and checked the complete diff for whitespace errors.",
  "environment": "Local Storyworld Platform workspace; Python 3.14.0; no real credentials, provider calls, network operation, deployment, publication, participant contact, charging, or other external action.",
  "subject_revision_or_fingerprint": "sha256:b4281f0aa49683a357e6bd0a430ceb54681a9b49a973b213032ada17aa29e81e",
  "result": "pass",
  "fresh_until": "2026-09-05",
  "supersedes": null,
  "limitations": [
    "This evidence records owner target direction and internal structural consistency; it does not establish implementation, security compliance, production readiness, or permission to operate either hosting mode.",
    "No provider credential was created, stored, read, activated, rotated, or used.",
    "Formal owner approval remains pending the exact questionnaire version, included purpose-statement version, and explicit sign-off.",
    "The selected optional Storyworld-hosted mode remains subject to operational and commercial evidence, successor decisions, and a separately authorized external rollout stage."
  ]
}
---

## Method

- Stored Git blob `d98f1387dc3a6ffc20380b845e7a51db2ee53c7e`, whose
  SHA-256 is `32eadc9799c45614090a4a4c12382b98e252f47760dc6481d53aab703902e466`,
  as the exact pre-change dirty-working-tree questionnaire.
- Changed Question 18 to `Answered`, marked the optional Storyworld-hosted
  service as selected, and recorded both complete customer-managed/private
  deployment and an optional Stavium-operated hosted service as Mature Product
  targets.
- Preserved the private-deployment-first sequence and required evidence,
  successor operating decisions, and separate rollout authorization before
  offering the hosted mode externally.
- Changed Question 22 to `Answered` and recorded a hybrid model with one
  workspace-admin-managed credential per provider, workspace, and environment
  as the Proof and Useful Internal Version default.
- Required server-side secret storage, individual member authentication and
  authorization, per-member budgets and attribution, provider-egress policy,
  short-lived scoped tokens where supported, static-secret rotation, audit,
  expiry where available, and revocation.
- Preserved isolated member-owned credentials as a later optional capability
  only for a specifically justified billing, custody, or contractual need;
  prohibited global cross-workspace or cross-environment secrets and silent
  credential fallback; and introduced no automatic milestone switch.
- Updated questionnaire completeness, the formal-sign-off prerequisite, the
  owner-action queue, Question 26's dependency cross-reference, OD-07, OD-09,
  GH-05, GH-20, and detailed summary/sign-off passages. Removed resolved
  unresolved-decision rows UD-01 and UD-02.
- Performed a focused read-only change review. It identified that the initial
  draft omitted the owner-supplied security rationale and reference anchors;
  those were restored before validation. No correctness, regression,
  authority-boundary, or missing-validation finding remained.
- Compared the final questionnaire with the exact pre-change blob. The source
  diff is `43` insertions and `35` deletions, limited to the two controlling
  responses and mechanically dependent metadata, queue, cross-reference,
  register, summary, and sign-off passages.
- Confirmed the F-02 authority normalization, F-04 access and retention model,
  F-09 mobile and customization milestones, F-10 workflow taxonomy, and F-11
  rollout measurement rules have no substantive diff.
- Ran `python -B .agent/scripts/refresh.py --refresh`.
- Ran `python -B .agent/scripts/validate.py --check`.
- Ran `python -B -m unittest discover -s .agent/tests -p "test_*.py"`.
- Ran `git diff --check`.

## Result

- Final questionnaire: `4,349` lines;
  SHA-256 `b4281f0aa49683a357e6bd0a430ceb54681a9b49a973b213032ada17aa29e81e`.
- Questions 18 and 22: `Answered`; local owner choices: `Selected`.
- Substantive choices remaining in Questions 1–26: none.
- Formal owner approval: still pending.
- Generated integrity refresh: passed.
- Harness and dossier structural contracts: passed.
- Agent tests: passed (`51` tests in `396.503s`).
- Whitespace/error-marker check: passed.
- Intermediate validation failures: none.
- External effects: none; repository-local changes only.

## Limitations

This evidence supports only the accurate recording and internal consistency of
the two owner decisions. It does not formally approve the questionnaire,
identify the included purpose-statement version, implement a secret manager or
hosting service, create or use credentials, deploy software, or authorize an
external rollout action.
