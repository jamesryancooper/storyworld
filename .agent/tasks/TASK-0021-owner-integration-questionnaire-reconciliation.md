---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0021",
  "status": "completed",
  "previous_status": "review",
  "title": "Reconcile owner-directed integration questionnaire clarifications",
  "authority_basis": "external:operator instruction from the project owner on 2026-08-01 to update storyworld-integrations-questionnaire.md with the confirmed clarifications and resolve cross-section ambiguity.",
  "owner": "codex-agent (documentation update)",
  "created_at": "2026-08-01",
  "updated_at": "2026-08-01",
  "dependencies": [],
  "scope": "In scope: reconcile the owner-input integration questionnaire's control layers, provider-data boundaries, custody and reversibility rules, canon authority, publication scheduling, integration priorities, small-creator scope, runtime choices, Commerce Foundry path, and final summary. Out of scope: implementation changes, live provider or Commerce Foundry activation, publication, deployment, and changes to accepted repository decisions.",
  "acceptance_criteria": [
    "The questionnaire distinguishes Storyworld-native professional precision, Advanced Operator Mode, and exceptional external-tool use.",
    "Provider classification, self-hosted ComfyUI, custody, retention, reversibility, canon, and publication-scheduling boundaries are explicit and mutually consistent.",
    "Owner-directed priorities for Blender, Astro, Instagram, X, TikTok, Commerce Foundry, scheduling, and browser/Godot runtimes are reflected.",
    "The final questionnaire summary reflects confirmed owner direction rather than stale recommendations.",
    "Declared repository validation and whitespace checks pass."
  ],
  "validation_plan": [
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": "Reconciled the owner-directed integration questionnaire, refreshed generated integrity outputs, and recorded EVD-0031.",
  "review_evidence": ["EVD-0031"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": ["EVD-0031"],
  "external_effects": "repository_local",
  "limitations": [
    "This documentation update does not implement integrations, publication, scheduling execution, or runtime compilation."
  ]
}
---

## Scope

Reconcile the owner-directed integration questionnaire with the confirmed product direction while preserving the distinction between advisory recommendations and owner authority.

## Closure

Complete after the target questionnaire is updated, generated integrity is refreshed if required, and the declared validators pass.
