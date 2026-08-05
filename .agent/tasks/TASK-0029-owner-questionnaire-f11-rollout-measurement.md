---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0029",
  "status": "completed",
  "previous_status": "review",
  "title": "Define deterministic rollout-gate measurement rules",
  "authority_basis": "external:operator instruction from the project owner on 2026-08-05 resolving questionnaire finding F-11 with a controlling Rollout Measurement Plan and deterministic gate rules.",
  "owner": "codex-agent (documentation correction)",
  "created_at": "2026-08-05",
  "updated_at": "2026-08-05",
  "dependencies": [
    "TASK-0028"
  ],
  "scope": "In scope: add one inherited Rollout measurement rules subsection under Question 26; define the prospective measurement plan, fixed internal-production cohort, team/participant/operator units, issue severity, material difference, critical workflows, estimate and cost basis, standard price, support rates, recognized revenue, and aggregate margin; normalize only mechanically dependent Internal Qualification, Controlled External Pilot, Limited Paid Beta, register, summary, research, prototype, or evidence-packet wording. Out of scope: threshold changes, new rollout stages, automatic authorization, implementation, pricing commitment, audience changes, capability milestones, access, retention, provider-egress, mobile timing, workflow categories, publication authority, Questions 18 and 22, or another owner choice.",
  "acceptance_criteria": [
    "One controlling Rollout measurement rules subsection precedes Internal Qualification and every later Question 26 gate inherits it through a fixed versioned owner-approved Rollout Measurement Plan.",
    "The Internal Qualification cohort is the first twelve consecutive qualifying completions after the registered start, includes the Dumpster Fire Friends Proof as one cohort member, cannot be cherry-picked, and retains failed-attempt evidence.",
    "The 12, final five, final six, all percentages, observation windows, completion units, team/operator denominators, and ceiling rules are deterministic and cannot pass with missing or incomplete evidence.",
    "Teams, participants, evaluated operators, withdrawal handling, completing-team export, team exit, satisfaction response, active-paying-team, and full-observation rules are defined and used consistently.",
    "Critical, High, Medium, and Low issue severity, unresolved status, historical disclosure, higher-severity disagreement handling, and the zero-governed-data-loss rule are operationally defined.",
    "Material difference uses one prospective two-dimension diversity matrix across properties, media/delivery types, non-commerce use cases, and clean-install proofs.",
    "Critical workflows, the critical intent-to-release workflow, independent completion, supported recovery, root durable-workflow denominators, and unknown outcomes are defined.",
    "Approved estimates, actual variable cost, standard price, support measurement, recognized revenue, cost of service, projected margin, and aggregate gross-margin formulas use prospective versioned definitions and consistent allocation.",
    "Every existing numerical threshold and separate owner go/no-go decision remains unchanged; meeting a threshold never authorizes rollout.",
    "Question 26 remains Answered with Needs research/prototype, and completed F-02, F-04, F-09, F-10, Questions 18 and 22, and unrelated work remain unchanged.",
    "Declared repository refresh, structural validation, unit tests, and whitespace checks pass."
  ],
  "validation_plan": [
    "Targeted recheck of every owner-specified cohort, denominator, severity, diversity, workflow, estimate, price, cost, support, revenue, margin, and rollout term",
    "Focused diff against exact pre-F-11 questionnaire blob f0e35836df98345675ddd19ad914918d9f320b01",
    "Exact pre/post hash comparison for the complete pre-Question-26 prefix and protected F-04, F-09, F-10, Question 18, and Question 22 sections",
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": "Added the controlling versioned Rollout Measurement Plan; defined the fixed twelve-production cohort, team and operator units, issue severity, material difference, critical workflows, approved estimates, cost and price bases, support rates, recognized revenue, and aggregate margin; normalized only mechanically dependent Question 26 gate, evidence-packet, register, summary, and research wording without changing rollout thresholds or authorization boundaries.",
  "review_evidence": [
    "EVD-0039"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0039"
  ],
  "external_effects": "repository_local",
  "limitations": [
    "This task records only the owner's F-11 measurement model; Questions 18 and 22 remain unresolved and were not modified."
  ]
}
---

## Scope

Make the existing rollout thresholds reproducible by defining their prospective
cohorts, units, denominators, classifications, evidence, costs, prices, support
rates, and formulas without changing any threshold or authorizing rollout.

## Closure

Complete after the controlling measurement model and dependent gate wording are
reconciled, protected sections are proven unchanged, generated integrity records
are refreshed, all declared checks pass, and EVD-0039 records the final source
fingerprint.
