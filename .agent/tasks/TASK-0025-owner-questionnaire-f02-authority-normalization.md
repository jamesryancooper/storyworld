---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0025",
  "status": "completed",
  "previous_status": "review",
  "title": "Normalize final-edit and package authority terminology",
  "authority_basis": "external:operator instruction from the project owner on 2026-08-04 resolving questionnaire finding F-02 by mapping loose final-edit and package terms to existing authority actions.",
  "owner": "codex-agent (documentation correction)",
  "created_at": "2026-08-04",
  "updated_at": "2026-08-04",
  "dependencies": [
    "TASK-0024"
  ],
  "scope": "In scope: normalize every ambiguous use of final-edit acceptance, channel-package acceptance, release-package authorization, release creation, and publication authorization in storyworld-owner-decision-questionnaire.md according to the owner's explicit F-02 mapping. Out of scope: new actions, lifecycle states, receipts, package-approval gates, F-04, F-09, F-10, F-11, Questions 18 and 22, implementation, credentials, provider calls, deployment, publication, external communication, recruitment, charging, or rollout advancement.",
  "acceptance_criteria": [
    "Final edits use only Add to Canon, Update Canon, Master Acceptance, or the existing authorized Apply changes/accepted-successor action according to object type.",
    "Channel-package acceptance and release-package authorization are normalized to Create a release from the exact reviewed package.",
    "Create a release remains separate from Authorize external publication.",
    "Commerce Foundry approval, Storyworld Runtime Handoff Approval, and Receiving-Runtime Acceptance remain separate and unchanged.",
    "No new authority action, lifecycle state, receipt type, package-approval gate, or unrelated owner decision is introduced.",
    "Every occurrence of the owner-specified phrases is rechecked and declared repository validation passes."
  ],
  "validation_plan": [
    "Targeted before-and-after search for final edit, channel package, release-package authorization, Create a release, and publication authorization",
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": "Resolved F-02 by mapping final-edit acceptance to the existing object-specific acceptance action and both package-acceptance phrases to Create a release, while preserving separate publication, commerce, and runtime authorities; refreshed generated integrity records and recorded EVD-0035.",
  "review_evidence": [
    "EVD-0035"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0035"
  ],
  "external_effects": "repository_local",
  "limitations": [
    "This task records the owner's F-02 disposition only; F-04, F-09, F-10, and F-11 remain unresolved and unchanged."
  ]
}
---

## Scope

Replace loose final-edit and package-acceptance wording with the questionnaire's
already defined object-specific acceptance, release-creation, and publication
actions. Preserve every other authority boundary and unresolved owner choice.

## Closure

Completed on EVD-0035 after all requested phrases and preserved authority
domains were rechecked, excluded findings were confirmed unchanged, generated
integrity records were refreshed, and all declared checks passed.
