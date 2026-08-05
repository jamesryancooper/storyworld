---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0028",
  "status": "completed",
  "previous_status": "review",
  "title": "Define the non-authoritative workflow taxonomy",
  "authority_basis": "external:operator instruction from the project owner on 2026-08-04 resolving questionnaire finding F-10 with eight standard workflow categories and explicit mapping behavior.",
  "owner": "codex-agent (documentation correction)",
  "created_at": "2026-08-04",
  "updated_at": "2026-08-04",
  "dependencies": [
    "TASK-0027"
  ],
  "scope": "In scope: define the eight non-authoritative standard Storyworld workflow categories, custom-state definition and mapping requirements, ordinary workflow behavior, example mappings, authority-conflict handling, and mechanically dependent Question 25 register, summary, research, or prototype wording. Out of scope: one global authoritative lifecycle, new actions or receipts, implementation, capability milestone changes, rollout gates, access, retention, provider-egress, mobile timing, publication authority, F-11, Questions 18 and 22, or another unresolved owner choice.",
  "acceptance_criteria": [
    "Question 25 distinguishes the non-authoritative workflow overlay from every object-specific authoritative lifecycle and consistently uses standard Storyworld workflow category terminology.",
    "Workflow—Pending, Workflow—In Progress, Workflow—Blocked, Workflow—Review Pending, Workflow—Revision Required, Workflow—Decision Pending, Workflow—Complete, and Workflow—Inactive are defined with the owner-specified meanings and safeguards.",
    "Every custom workflow state maps to exactly one standard category, while multiple custom states may share a category and both label and category remain visible in inspection, search, export, APIs, and audit history.",
    "Custom-state definitions and ordinary mapping-controlled behavior are operationally specified without imposing one universal transition graph.",
    "All example labels receive explicit mappings, including the conditional Pending or Blocked mapping for Needs localization.",
    "Custom workflow transitions change only workflow metadata and never perform or imply an authoritative object-state transition, approval, waiver, permission, evidence, release, publication, runtime, rights, or commerce action.",
    "The F-09 Basic and Full milestone assignments remain unchanged, and Question 25 remains Answered with Needs research/prototype.",
    "F-02, F-04, F-09, F-11, Questions 18 and 22, and unrelated owner choices remain unchanged except for mechanically dependent F-10 terminology within the preserved F-09 qualification.",
    "Declared repository refresh, structural validation, unit tests, and whitespace checks pass."
  ],
  "validation_plan": [
    "Targeted recheck of every owner-specified workflow, lifecycle, authoritative-state, search, export, validator, and mapping term",
    "Focused diff against exact pre-F-10 questionnaire blob 339cd56a57ccff23eb6479b5f4264058fc831688",
    "Exact pre/post hash comparison for protected F-04, F-09 timing/mobile, F-11, Question 18, and Question 22 passages",
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": "Defined the eight non-authoritative standard workflow categories, exact-one custom-state mapping contract, operational mapping behavior, explicit examples, authority-conflict rules, and mechanically dependent register and research wording while preserving the F-09 milestone assignments and protected sections.",
  "review_evidence": [
    "EVD-0038"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0038"
  ],
  "external_effects": "repository_local",
  "limitations": [
    "This task records only the owner's F-10 workflow taxonomy; F-11 and Questions 18 and 22 remain unresolved and must not be modified."
  ]
}
---

## Scope

Define a small workflow-only taxonomy for template customization while keeping
canon, asset, document, review, rights, release, publication, runtime, and
commerce authority in their existing separate lifecycles and actions.

## Closure

Completed after the taxonomy and mapping behavior were operationally defined,
dependent passages were reconciled, protected sections were proven unchanged
against the exact pre-F-10 blob, generated integrity records were refreshed,
all declared checks passed, and EVD-0038 recorded the questionnaire fingerprint.
