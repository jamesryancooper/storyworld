---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0003",
  "status": "validating",
  "previous_status": "in_progress",
  "title": "Draft the F0 charter and authority pack (PLAN-0002) for GATE-0002 review",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) — \"get started building out and continue without stopping until you get to a point that requires a decision be made.\" PLAN-0002 is the agreed next step; drafting authority only, acceptance stays with the owner.",
  "owner": "claude-agent (session 2026-07-28, storyworld-steward working mode)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": ["TASK-0002"],
  "scope": "In scope: author the sixteen product ADRs (packages/contracts/adr/, seeded from canonical Appendix A) as proposed records; author the charter artifacts (authority matrix, property classifications and authority-host rule, sensitivity/rights classifications, approval taxonomy, golden-fixture and vertical-slice registry with stop conditions) as derived-normative strict-JSON under packages/contracts/charter/; propose the umbrella acceptance decision DEC-0006 mapping GATE-0002 criteria to artifacts; validate, commit, push, observe CI. Out of scope: accepting any ADR or decision, evaluating GATE-0002, any F1 schema authoring (gated on GATE-0002 and DEC-0005 acceptance), fixture content (PLAN-0007).",
  "acceptance_criteria": [
    "ADR-0001..ADR-0016 exist, each proposed, with context, decision, scope, consequences, alternatives, and canonical source references.",
    "Charter artifacts exist as strict JSON with declared source direction (derived-normative from the canonical pack) and per-item source references.",
    "DEC-0006 (proposed) maps every GATE-0002 exit criterion to the artifacts that satisfy it.",
    "Refresh, read-only check, and test suite pass; work is committed and pushed; CI green."
  ],
  "validation_plan": [
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git push; observe CI run"
  ],
  "implementation_result": "F0 pack drafted: sixteen proposed ADRs (packages/contracts/adr/, seeded from Appendix A; ADR-0006 and ADR-0007 framed as category/interface commitments with selection checkpoints per the in-session tooling review) and five charter artifacts (packages/contracts/charter/: authority matrix, property classifications, sensitivity/rights classifications, approval taxonomy, fixtures-and-slices with VS0-VS6 and stop conditions), all derived-normative with canonical source references. DEC-0006 proposed with GATE-0002 criterion mapping. Push and CI observation pending.",
  "review_evidence": [],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: push to the owner-provided GitHub remote, standing-authorized for this repository's development work by the operator instruction of 2026-07-28."
  ]
}
---

## Scope

Draft the complete F0 pack as proposals. The stopping point is deliberate:
GATE-0002 evaluation and DEC-0006 acceptance are the owner's decisions.

## Acceptance criteria

- [ ] Sixteen proposed ADRs with full content
- [ ] Charter artifacts (strict JSON, derived-normative, source-referenced)
- [ ] DEC-0006 proposed with GATE-0002 criterion mapping
- [ ] Validation green; pushed; CI green

## Risks and gates

- Side effects: repository-local writes plus authorized push.
- Sensitive data: none.
- Rollback: git history.
- Gate: GATE-0002 (owner evaluation; not part of this task).

## Evidence and closure

- Filled at closure.
