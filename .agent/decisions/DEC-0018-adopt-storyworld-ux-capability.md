---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0018",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Adopt the project-local storyworld-ux capability",
  "created_at": "2026-07-29",
  "authority_source": "external:project-owner instruction 2026-07-29 — \"I want to commit the skill and any remaining changes that have not been committed.\" This resolves the TASK-0015 capability prerequisite by authorizing the reviewed storyworld-ux package to be tracked and adopted in main.",
  "owner": "ryan-cooper (project owner)",
  "scope": "Adopt storyworld-ux version 1.5.0 as a project-local reviewed capability at .agents/skills/storyworld-ux, consisting of SKILL.md, agents/openai.yaml, and the eleven listed reference/provenance files. The capability inherits current-task authority and may guide read-only UX audits or separately authorized implementation work; it cannot authorize Studio changes, product decisions, credentials, providers, canon/release actions, publication, deployment, integrations, participant contact, or other external effects.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Adoption makes the capability available for governed project use; it does not accept REV-0001 findings, Phase 0 product proposals, or any implementation scope.",
    "The package was reviewed as project-local guidance and contains no executable scripts or external dependencies; current Studio truth and repository authority must still be reinspected on every use.",
    "The draft detached-worktree provenance reference DEC-0023 was invalid for this repository and is replaced by this decision."
  ]
}
---

## Context

REV-0001 used the `storyworld-ux` workflow from a detached worktree because the
capability was not tracked in `main`. TASK-0015 then reverified all audit
findings and inspected the complete thirteen-file package. EVD-0022 found no
authority expansion, external-action instructions, dependency installation,
secret request, or unresolved repository path, but found that the draft
provenance falsely referenced nonexistent `DEC-0023`.

The project owner has now explicitly instructed that the skill and all
remaining changes be committed. This decision records the durable adoption
required by the capability provenance contract rather than treating file
presence or a task record as adoption.

## Decision

Adopt `storyworld-ux` version 1.5.0 as a
`project_local_reviewed_capability`, owned by the project owner and bound to
this accepted decision.

The capability:

- is available for Storyworld Studio UX auditing, mockup comparison,
  accessibility reasoning, complex-workspace review, canon/release consequence
  analysis, research planning, and separately authorized implementation
  guidance;
- inherits and cannot expand the current task's authority;
- treats audits and critiques as read-only unless the current operator
  separately authorizes implementation;
- keeps models as proposers and authorized people as decision makers; and
- cannot open credentials, providers, releases, publication, deployment,
  integrations, participant contact, or other external effects.

## Consequences

- Benefits:
  - Future work can invoke a tracked, reviewed, Storyworld-specific UX
    workflow from `main`.
  - REV-0001 and TASK-0015 can reference the exact adopted package rather than
    a detached worktree.
  - The invalid draft adoption reference is corrected.
- Costs:
  - The thirteen-file package becomes maintained project surface and must be
    reviewed and validated when revised.
  - Its detailed references consume context only when routed by `SKILL.md`.
- Risks:
  - Skill guidance could be mistaken for product or implementation authority;
    the package and this decision explicitly prohibit that interpretation.
  - Point-in-time product context can become stale; every use requires fresh
    repository inspection.
- What remains undecided:
  - Every Phase 0 product question in TASK-0015.
  - Whether PROP-FG-09 or PROP-FG-10 should proceed.
  - Any Studio implementation, release, credential, provider, publication,
    deployment, integration, or participant-research action.

## Validation and rollback

- Evidence: EVD-0022 for the source-static content review and EVD-0023 for the
  adopted package fingerprint and validation.
- Reversal or successor path: deprecate or supersede this decision and update
  the capability provenance; do not silently delete or replace an adopted
  capability.
