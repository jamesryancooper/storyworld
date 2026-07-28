---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0004",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Create and trust the storyworld-steward agent capability",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28 (PLAN-0001 review), completing the trust adoption requested by the operator instruction of 2026-07-28.",
  "owner": "ryan-cooper (project owner)",
  "scope": ".agents/agents/storyworld-steward.json — a constrained task mode for dossier stewardship and contract-pack preparation. Acceptance of this decision is the adoption_decision_ref target for that capability.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Accepted 2026-07-28: the capability record now carries adoption_status adopted, adoption_decision_ref DEC-0004, reviewed trust class, and an assigned owner.",
    "The capability can never expand task authority regardless of adoption."
  ]
}
---

## Context

Work in this repository is dossier stewardship now and F0/F1 contract-pack
authorship next. That work has a repeatable shape and hard boundaries: keep
one owner per concern, keep proposal separate from acceptance, keep the
registry/refresh discipline, and never let generated or canonical material
become permission. A named capability encodes that shape so any session (or
subagent) can be pointed at it.

## Decision

Create `.agents/agents/storyworld-steward.json` (version 1.0.0), a
project-local agent capability that:

- inherits and may only narrow the active task's authority
  (`may_expand: false`, `permission_grant: false`);
- works repository-local only; external effects always require explicit
  current authorization;
- produces **proposals**: dossier records, registry updates, contract-pack
  drafts, and refresh runs — never acceptance, ratification, or publication;
- is prohibited from editing generated files by hand, from modifying
  `canonical/storyworld/` content without an explicit content task, from
  creating accepted decisions, and from readiness claims;
- validates its output with the declared refresh/check/test commands.

On acceptance of this decision, set the capability's
`adoption_status: "adopted"`, `adoption_decision_ref: "DEC-0004"`, and
`trust_class: "project_local_reviewed_capability"`, and assign `owner`.

## Consequences

- Benefits: a reusable, bounded operating mode aligned with the platform's
  own models-propose/humans-authorize principle.
- Costs: keeping the capability record current with policy changes.
- Risks: capability drift from actual practice — reviewed at each use.
- Undecided: whether later phases need additional capabilities (e.g., a
  contract-fixture author); add only on recurring need.

## Validation and rollback

- Evidence: capability schema validation in EVD-0001; disable test in the
  harness suite.
- Reversal: set the capability to `disabled` or `deprecated`; no kernel
  change required.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session, following the in-session overview of all four proposed decisions
(PLAN-0001 review). Recorded by claude-agent on the owner's instruction
"I accept these."
