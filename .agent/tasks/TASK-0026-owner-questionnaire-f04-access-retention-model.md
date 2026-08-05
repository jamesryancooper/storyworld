---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0026",
  "status": "completed",
  "previous_status": "review",
  "title": "Define the questionnaire access and retention classification model",
  "authority_basis": "external:operator instruction from the project owner on 2026-08-04 resolving questionnaire finding F-04 with explicit access, embargo, retention, legal-hold, and conflict-handling rules.",
  "owner": "codex-agent (documentation correction)",
  "created_at": "2026-08-04",
  "updated_at": "2026-08-04",
  "dependencies": [
    "TASK-0025"
  ],
  "scope": "In scope: define the four ranked base access classes, embargo overlay, access intersection and fail-closed rules, structured retention profiles, Legal Hold overlay, retention-window conflict rules, and reconcile the questionnaire's related access crosswalk, derivative, search, encryption, audit, deletion, and Question 19 passages. Out of scope: changing provider-egress classes except for access/embargo consistency, inventing record-type durations, F-09, F-10, F-11, Questions 18 and 22, other unresolved owner choices, implementation, credentials, provider calls, deployment, publication, external communication, recruitment, charging, or rollout advancement.",
  "acceptance_criteria": [
    "Access—Public, Access—Internal, Access—Confidential, and Access—Restricted are defined as ranked base classes with Access—Restricted as the fail-closed default.",
    "Access—Embargoed is defined only as an additive temporary overlay with an underlying and intended post-embargo base class, access rules, and release condition.",
    "Effective access is the intersection of applicable permissions and overriding prohibitions; access, retention, and provider-egress remain independent dimensions.",
    "Retention—Ephemeral, Retention—Operational, Retention—Property Lifetime, Retention—Durable Record, and Retention—Custom are defined without inventing record-type durations.",
    "Legal Hold is an additive overlay, and retention conflicts use latest keep-until and earliest delete-by bounds with fail-closed conflict handling.",
    "The existing 30-day recoverable property-deletion period and protected minimal receipt, hash, tombstone, or deletion record direction are preserved.",
    "The access crosswalk, derivative inheritance, search behavior, encryption requirements, audit requirements, deletion rules, and Question 19 retention passages are internally consistent with the clarified model.",
    "F-09, F-10, F-11, Questions 18 and 22, and unrelated owner choices remain unchanged.",
    "Declared repository refresh, validation, unit tests, and whitespace checks pass."
  ],
  "validation_plan": [
    "Targeted recheck of every owner-specified access, embargo, retention, Legal Hold, and conflict phrase",
    "Exact pre/post section-hash comparison for Questions 24, 25, and 26",
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git diff --check"
  ],
  "implementation_result": "Resolved F-04 with four ranked base access classes, an additive embargo overlay, effective-access intersection rules, five structured retention profiles, a Legal Hold overlay, bounded retention-window conflict handling, and reconciled dependent passages; preserved excluded findings and recorded EVD-0036.",
  "review_evidence": [
    "EVD-0036"
  ],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": [
    "EVD-0036"
  ],
  "external_effects": "repository_local",
  "limitations": [
    "This task records only the owner's F-04 disposition; F-09, F-10, and F-11 remain unresolved and were not modified."
  ]
}
---

## Scope

Operationalize access sensitivity and retention policy solely from the owner's
F-04 direction. Preserve the independent provider-egress dimension, existing
deletion recovery rule, all unrelated authority boundaries, and every other
unresolved owner choice.

## Closure

Completed on EVD-0036 after every specified term and dependent passage was
rechecked, Questions 24–26 were proven unchanged by exact section hashes,
generated integrity records were refreshed, and all declared checks passed.
