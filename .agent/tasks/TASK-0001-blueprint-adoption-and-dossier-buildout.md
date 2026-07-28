---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0001",
  "status": "completed",
  "previous_status": "review",
  "title": "Adopt Project Blueprint structures and build out the Storyworld project dossier and custom agent",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) — use the Project Blueprint to finish building out the project dossier for this project along with a custom agent for this project.",
  "owner": "claude-agent (session 2026-07-28); review owner: ryan-cooper",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": [],
  "scope": "In scope: read-only adoption plan; generation of the high-assurance snapshot in scratch; merge into this repository without overwriting existing files; restructure and register the Storyworld content pack; populate canonical entries, current state, conformance, plans, registers, provenance, gates, and handoff from inspected evidence; create proposed decisions DEC-0001..DEC-0004; create the storyworld-steward capability; run refresh/check/tests. Out of scope: accepting any decision, committing to git, any external effect, and any F0/F1 content work.",
  "acceptance_criteria": [
    "Adoption planner run first; no existing file overwritten; the single collision resolved by relocation.",
    "Every project-dossier file is registered in the artifact registry and covered by path authority.",
    "Dossier records (REQ/FIND/PLAN/RAIDQ/SRC/GATE/SUP) populated from inspected evidence with stable IDs and resolving references.",
    "Custom agent capability present and schema-valid.",
    "python -B .agent/scripts/validate.py --check passes on the final tree.",
    "Harness unit/mutation test suite passes.",
    "All limitations, unknowns, and pending ratification disclosed."
  ],
  "validation_plan": [
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\""
  ],
  "implementation_result": "Structures merged and populated; 13 representations registered (REP-0041..REP-0053); 5 conditional types assessed applicable, 5 deliberately deferred; 10 proposed requirements, 2 findings, 6 plan items, 9 register items, 2 sources, 6 gates, SUP-0001, DEC-0001..DEC-0004 (proposed), storyworld-steward capability created (held disabled pending DEC-0004). Two generated tests adapted to remove pristine-scaffold assumptions (clone excludes live .git; adoption-coherence mutation derives its mismatch from actual status) with intent preserved; see EVD-0002 limitations.",
  "review_evidence": ["EVD-0001", "EVD-0002", "EVD-0003"],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": true,
  "closure_evidence": ["EVD-0001", "EVD-0002", "EVD-0003", "DEC-0001", "DEC-0002", "DEC-0003", "DEC-0004"],
  "external_effects": "none",
  "limitations": [
    "Closed 2026-07-28 on owner acceptance of DEC-0001..DEC-0004 (PLAN-0001).",
    "Structural validation only; no project readiness is implied.",
    "Nothing was committed to git."
  ]
}
---

## Scope

In scope:

- Blueprint adoption per the planner's reconciliation sequence, content
  restructure with registry coverage, record population from inspected
  evidence, proposed decisions, the steward capability, and validation.

Out of scope:

- Accepting decisions, committing, external effects, F0/F1 content work.

## Acceptance criteria

- [x] No existing file overwritten; collision resolved by relocation
- [x] Full registry and path-authority coverage of project-dossier files
- [x] Records populated with stable, resolving references
- [x] Capability present and schema-valid
- [x] Read-only check passes on final tree (EVD-0001)
- [x] Test suite passes (EVD-0002)
- [x] Limitations and pending ratification disclosed

## Risks and gates

- Side effects: repository-local file changes only.
- Required approvals: owner review of this task and DEC-0001–DEC-0004.
- Sensitive data: none present or introduced.
- Rollback: crosswalk in `project-dossier/transition/README.md`.

## Evidence and closure

- Evidence: EVD-0001 (check), EVD-0002 (tests), EVD-0003 (inspection), in
  `.agent/evidence/`.
- Review: project owner reviewed the four proposed decisions in-session and
  accepted them on 2026-07-28 ("I accept these"); DEC-0001..DEC-0004 are
  accepted and PLAN-0001 is completed.
- External effects: none.
- Residual limitations: structural validation only; nothing committed to git.
- Next action: commit the working tree, then begin PLAN-0002 (F0 charter
  pack).
