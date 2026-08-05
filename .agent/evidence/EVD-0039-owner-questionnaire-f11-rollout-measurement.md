---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0039",
  "title": "Owner questionnaire F-11 rollout measurement rules validated",
  "task": "TASK-0029",
  "recorded_at": "2026-08-05",
  "authority_source": "external:operator instruction from the project owner on 2026-08-05",
  "owner": "codex-agent (documentation correction)",
  "scope": "Finding F-11 deterministic rollout-gate measurement rules in project-dossier-intake/owner-input/storyworld-owner-decision-questionnaire.md plus required local governance and generated integrity records.",
  "method": "Used the exact pre-F-11 working-tree questionnaire blob, added one controlling Rollout measurement rules subsection, reconciled only mechanically dependent Question 26 gate, evidence-packet, register, summary, and research wording, rechecked the owner-specified cohort, denominator, severity, diversity, workflow, estimate, price, cost, support, revenue, and margin terms, performed a focused read-only change review, confirmed the entire pre-Question-26 source and protected F-02, F-04, F-09, F-10, Question 18, and Question 22 passages were unchanged, refreshed generated integrity records, ran structural validation and all 51 unit tests, and checked the complete diff for whitespace errors.",
  "environment": "Local Storyworld Platform workspace; Python 3.14.0; no network, provider, deployment, publication, credential, participant, charging, or other external action.",
  "subject_revision_or_fingerprint": "sha256:32eadc9799c45614090a4a4c12382b98e252f47760dc6481d53aab703902e466",
  "result": "pass",
  "fresh_until": "2026-09-05",
  "supersedes": null,
  "limitations": [
    "Structural validation and internal document review do not establish implementation, production readiness, or that any rollout evidence exists or gate has passed.",
    "Questions 18 and 22 remain Undecided, and the purpose-statement version remains unrecorded pending formal sign-off.",
    "The provisional standard price, support rates, cost allocations, and margin formulas are target measurement rules rather than a pricing commitment or authorization to charge.",
    "No external cohort was contacted, enrolled, measured, or authorized by this task."
  ]
}
---

## Method

- Used Git blob `f0e35836df98345675ddd19ad914918d9f320b01`, whose
  SHA-256 is `2231932a70e9f02acf8fb23e1d74411f09a3a6d6f19aae4cac3189b58fd4b33d`,
  as the exact pre-F-11 working-tree source.
- Added one inherited `Rollout measurement rules` subsection before Internal
  Qualification and required a prospectively fixed, versioned, owner-approved
  Rollout Measurement Plan.
- Defined the non-cherry-picked twelve-production cohort, attempt ledger and
  ordering, final-five and final-six positions, exact-fraction and ceiling
  rules, and incomplete-denominator failure behavior.
- Defined enrolled teams, participants, evaluated operators, withdrawal and
  observation-window handling, satisfaction coverage, completing-team export,
  team/workspace exit, and active-paying-team behavior.
- Defined the Critical/High/Medium/Low rollout rubric, issue evidence and
  closure requirements, prospective material-difference matrix, versioned
  critical-workflow catalog, independent completion, supported recovery, and
  durable-workflow denominator.
- Defined approved estimates, one-sided 20% overrun treatment, variable-cost
  basis, standard-price allocation, support tracking and rate formulas,
  recognized revenue, cost of service, aggregate gross margin, and the Limited
  Paid Beta variable-cost ratio.
- Normalized only the dependent Internal Qualification, Internal Evidence
  Packet, Controlled External Pilot, Limited Paid Beta, OD-03, RP-16, detailed
  summary, and research wording. Existing numeric thresholds, cumulative
  milestones, audience boundaries, and separate owner go/no-go decisions were
  preserved.
- Performed a focused read-only change review. It identified two draft modal
  shifts from `should` to `must` in pilot diversity recommendations; both were
  restored before validation. No correctness, regression, authority-boundary,
  or missing-validation finding remained.
- Compared the final questionnaire with the exact pre-F-11 blob. Every source
  diff begins in Question 26 or its later mechanically dependent register,
  summary, and research passages. The complete pre-Question-26 prefix is
  byte-identical, preserving:
  - Question 15 / F-04 access model:
    `641512347b7ad0f8b939af63d0aa65d2a1269646d1787852837537187852feb5`
  - Question 18:
    `9ef07c44c96f84dc4a4830b09488e0dafc3716f92f28f97eea97938dce0085e7`
  - Question 19 / F-04 retention model:
    `07ddf6e5944817c0cd82e79c6f9450918f2163b27a28cf57f152b6779e6bf03a`
  - Question 22:
    `a749b55afde278f8d3ea1a1bbf650b346ee089127dd5fb4197e8b4b4170911cb`
  - Question 24 / F-09 mobile model:
    `8d20c7ece5ecbfe6f9b15f67b48f35715f6ada8852d2eb45a0af1a144a6a6ddf`
  - Question 25 / F-10 workflow taxonomy:
    `9620b3bf78a076fe1d12422baecca7a8a06daee509689873c33e135bcded8d6a`
- Ran `python -B .agent/scripts/refresh.py --refresh`.
- Ran `python -B .agent/scripts/validate.py --check`.
- Ran `python -B -m unittest discover -s .agent/tests -p "test_*.py"`.
- Ran `git diff --check`.

## Result

- Final questionnaire: `4,341` lines;
  SHA-256 `32eadc9799c45614090a4a4c12382b98e252f47760dc6481d53aab703902e466`.
- Generated integrity refresh: passed.
- Harness and dossier structural contracts: passed.
- Agent tests: passed (`51` tests in `450.835s`).
- Whitespace/error-marker check: passed.
- Intermediate validation failures: none.
- External effects: none; repository-local changes only.

## Limitations

This evidence supports only the internal coherence and structural validity of
the scoped F-11 documentation correction. It does not establish implementation,
create a rollout stage, change a threshold, approve a price, contact a
participant, resolve Questions 18 or 22, or authorize any external action.
