---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0027",
  "status": "completed",
  "previous_status": "review",
  "title": "Assign mobile and customization capability milestones",
  "authority_basis": "external:operator instruction from the project owner on 2026-08-04 resolving questionnaire finding F-09 with capability-specific Basic and Full support milestones.",
  "owner": "codex-agent (documentation correction)",
  "created_at": "2026-08-04",
  "updated_at": "2026-08-04",
  "dependencies": [
    "TASK-0026"
  ],
  "scope": "In scope: assign and consistently qualify Basic and Full support milestones for the Mobile Decision Inbox, templates and typed custom fields, declarative validators and lifecycle mappings, and governed extensions and adapters; reconcile timing in the cross-cutting register, summaries, and prototype register. Out of scope: defining standard lifecycle categories, changing rollout gates or thresholds, F-10, F-11, Questions 18 and 22, new mobile actions or customization categories, implementation, credentials, provider calls, deployment, external access, charging, publication, or rollout advancement.",
  "acceptance_criteria": [
    "Mobile Decision Inbox Basic support is assigned to Reliable Internal Version and Full support to Limited Paid Beta without accelerating any underlying capability.",
    "Basic mobile support preserves exact-version evidence, consequences, authority, reauthentication, accessibility, receipts, errors, stale/conflict, unavailable, and recovery behavior; Internal Qualification tests critical pilot journeys and the Controlled External Pilot may use the Basic surface with documented limitations and high-touch assistance.",
    "Review assignments remain Mature Product, and mobile Full support is explicitly not desktop feature parity.",
    "Templates and typed custom fields are assigned Basic support by Useful Internal Version and Full support by Limited Paid Beta with the owner-specified scope and safeguards.",
    "Declarative validators and lifecycle mappings are assigned Basic support by Reliable Internal Version and Full support by Limited Paid Beta without defining the unresolved standard lifecycle categories or expanding authority.",
    "Governed extensions and adapters are assigned Basic support by Limited Paid Beta and Full support by Mature Product; earlier adapters do not count as a general extension runtime.",
    "Safety, authority, accessibility, data preservation, dependency, and nonauthorization qualifications apply whenever a capability is offered, including earlier prototypes.",
    "Question 24, Question 25, the cross-cutting register, summaries, and prototype register use the same timing.",
    "The F-10 lifecycle-definition subsection, Question 26/F-11, and Questions 18 and 22 retain their exact pre-change hashes.",
    "Declared repository refresh, validation, unit tests, and whitespace checks pass."
  ],
  "validation_plan": [
    "Targeted recheck of every owner-specified mobile, customization, milestone, register, summary, and prototype term",
    "Exact pre/post hash comparison for the F-10 lifecycle subsection, Question 26/F-11, Question 18, and Question 22",
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": "Assigned and reconciled all owner-directed F-09 mobile and customization capability horizons, preserved protected unresolved passages byte-for-byte, and passed the declared refresh, structural validation, 51-test, and diff checks.",
  "review_evidence": [
    "EVD-0037"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0037"
  ],
  "external_effects": "repository_local",
  "limitations": [
    "This task records only the owner's F-09 milestone assignments; F-10 and F-11 remain unresolved and must not be modified."
  ]
}
---

## Scope

Assign the earliest required support horizons for mobile review and the three
customization capability groups while preserving the cumulative milestone
model, all underlying-capability dependencies, and every existing safety and
authority boundary.

## Closure

Completed after all timing references were reconciled, excluded sections were
proven unchanged against the exact prior validated source blob, generated
integrity records were refreshed, all declared checks passed, and EVD-0037
recorded the final source fingerprint.
