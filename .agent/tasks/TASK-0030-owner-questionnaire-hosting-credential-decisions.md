---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0030",
  "status": "completed",
  "previous_status": "review",
  "title": "Record hosting and provider-credential owner decisions",
  "authority_basis": "external:operator instruction from the project owner on 2026-08-05 selecting both Mature Product hosting modes and a hybrid provider-credential model with workspace-managed credentials as the default.",
  "owner": "codex-agent (owner-direction recording)",
  "created_at": "2026-08-05",
  "updated_at": "2026-08-05",
  "dependencies": [
    "TASK-0029"
  ],
  "scope": "In scope: record the selected Question 18 Mature Product customer-managed/private plus optional Stavium-hosted posture; record the selected Question 22 hybrid provider-credential model and its workspace-default safeguards; change both questions to Answered and their local choices to Selected; reconcile only mechanically dependent metadata, owner-action queue, register, summary, and formal-sign-off prerequisite wording. Out of scope: formal owner approval, purpose-statement version selection, implementation, deployment, credential creation or use, provider calls, charging, external rollout, new capability milestones, or changes to completed F-02, F-04, F-09, F-10, or F-11 direction.",
  "acceptance_criteria": [
    "Question 18 is Answered, selects both customer-managed/private hosting and an optional Storyworld-hosted service operated by Stavium for Mature Product, and preserves the earlier private-deployment sequence and separate rollout authorization gates.",
    "Question 22 is Answered and selects a hybrid credential model with one workspace-admin-managed credential per provider, workspace, and environment as the Proof and Useful Internal Version default.",
    "Provider credentials remain server-side, members authenticate individually without reading the secret, per-member permissions, budgets, attribution, and provider-egress policy apply, and short-lived scoped tokens are preferred with rotation, audit, and revocation for static credentials.",
    "Isolated member-owned credentials are optional only when separately required for billing, custody, or contract; no global cross-workspace or cross-environment secret and no silent credential fallback is allowed.",
    "No automatic milestone switch is invented: the workspace-managed default persists, while optional member-owned support is separately scoped when required.",
    "Metadata, the owner-action queue, OD-07, OD-09, GH-05, GH-20, detailed summary, and formal-sign-off wording no longer describe Questions 18 or 22 as unresolved.",
    "Formal owner approval remains pending the included purpose-statement version and explicit sign-off; recording these answers does not authorize implementation or an external action.",
    "Completed F-02, F-04, F-09, F-10, F-11, thresholds, classifications, workflow taxonomy, mobile timing, publication authority, and unrelated work remain unchanged.",
    "Declared repository refresh, structural validation, unit tests, and whitespace checks pass."
  ],
  "validation_plan": [
    "Targeted recheck of every Question 18/22 status, owner-resolution, hosting, credential-scope, owner-action, UD-01/UD-02, OD-07/OD-09, GH-05/GH-20, and formal-sign-off occurrence",
    "Focused diff against exact pre-change questionnaire blob d98f1387dc3a6ffc20380b845e7a51db2ee53c7e",
    "Confirm all source changes are limited to Questions 18 and 22 plus mechanically dependent metadata, queue, register, summary, and formal-sign-off passages",
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": "Recorded Question 18 as Answered with both Mature Product hosting modes selected; recorded Question 22 as Answered with the hybrid workspace-managed-default credential model and its isolation, authorization, budget, attribution, egress, rotation, audit, revocation, and no-fallback safeguards; removed the two unresolved-decision entries and reconciled only mechanically dependent metadata, queue, cross-reference, register, summary, and sign-off-prerequisite wording without granting formal approval or implementation authority.",
  "review_evidence": [
    "EVD-0040"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0040"
  ],
  "external_effects": "repository_local",
  "limitations": [
    "This task records owner direction only and does not formally approve the questionnaire, identify the included purpose-statement version, implement hosting or credential systems, or authorize credential use or external service operation."
  ]
}
---

## Scope

Record the two final substantive questionnaire choices while preserving all
implementation, rollout, credential-use, and formal-approval boundaries.

## Closure

Complete after both controlling responses and dependent status passages are
consistent, the exact dirty-working-tree baseline is preserved for comparison,
generated integrity records are refreshed, all declared checks pass, and
EVD-0040 records the final questionnaire fingerprint.
