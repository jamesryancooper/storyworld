---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0001",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Adopt Project Blueprint 1.0.1 harness and dossier at the high-assurance profile",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28, ratifying the operator-instructed adoption of 2026-07-28 (PLAN-0001 review).",
  "owner": "ryan-cooper (project owner)",
  "scope": "Repository-wide governance structure: AGENTS.md router, .agent/ kernel and stores, .agents/ capabilities, project-dossier/ frame, and the high-assurance profile selection.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Drafted by claude-agent during the adoption session; accepted by the project owner on 2026-07-28."
  ]
}
---

## Context

The repository held only the Storyworld canonical content dossier — no
instructions, harness, work records, or validation. The owner directed
adoption of the Project Blueprint (`/Users/jamesryancooper/Projects/project-blueprint`,
version 1.0.1) to complete the dossier and add a project agent capability.

## Decision

Adopt the generated Project Blueprint 1.0.1 snapshot (generation
`8a719518f6307009dd1b6602ef6b4ac5`) at the **high-assurance** profile as this
repository's harness and dossier structure.

Profile rationale — three of the blueprint's high-assurance triggers are
genuinely present:

1. Agents will operate across sessions (the explicit purpose of this
   adoption).
2. Audit and reproducibility matter: the project's own canonical governance
   model is built on immutable versions, receipts, provenance, and signed
   packages; the harness governing its construction should meet the standard
   it prescribes.
3. External effects and sensitive-source handling arrive with later phases;
   the profile's conditional stores are scaffolded but remain unassessed
   until those triggers arrive.

## Consequences

- Benefits: deny-by-default policy, typed records, validated dossier
  traceability, generated integrity with checksums, capability packages.
- Costs: refresh/check discipline on every dossier change; more structure
  than a minimal profile.
- Risks: ceremony exceeding value if maintenance lapses — mitigated by the
  compact-state budgets and the refresh tooling.
- Undecided: nothing structural; ratification itself (PLAN-0001).

## Validation and rollback

- Evidence: EVD-0001 (read-only structural check), EVD-0002 (harness test
  suite) on the exact adopted tree.
- Reversal: remove the generated structures and restore the content moves per
  the crosswalk in `project-dossier/transition/README.md`; nothing had been
  committed before adoption.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session, following the in-session overview of all four proposed decisions
(PLAN-0001 review). Recorded by claude-agent on the owner's instruction
"I accept these."
