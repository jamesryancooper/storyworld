# Constraints, Gates, and Readiness Criteria

> Criteria only. This document does not grant permission, record an approval,
> or claim readiness.

## Constraints

- Authority and invariant constraints: part
  [01](storyworld/01_executive_context_and_product_direction.md) sections
  3.1–3.3 (product principles, architectural invariants, non-goals).
- Governance, security, rights, and privacy obligations: part
  [05](storyworld/05_governance_operations_and_quality.md) sections 15–16.
- Sequencing: the dependency-gated roadmap (part
  [06](storyworld/06_mvp_dependency_roadmap_and_vertical_slices.md) section
  19) — a phase begins only when entry dependencies are satisfied and
  completes only when its evidence gate passes.
- Legal, accessibility, and compliance conclusions require qualified human
  review; no dossier check establishes them.

## Approval gates

Gate records are owned by `../validation/QUALITY_GATES.json`. Definitions
ratified 2026-07-28 (PLAN-0001); GATE-0001 passed on EVD-0001, the phase
gates await their phase evaluations:

| Gate | Scope | Canonical basis |
|---|---|---|
| GATE-0001 | Dossier and harness structural integrity | generated baseline |
| GATE-0002 | F0 exit — charter and authority | part 06 section 19.1 |
| GATE-0003 | F1 exit — domain model and contracts | part 06 section 19.2 |
| GATE-0004 | F2 exit — governed foundation | part 06 section 19.3 |
| GATE-0005 | F3 exit — headless narrative kernel | part 06 section 19.4 |
| GATE-0006 | V1 exit — dual-use architectural alpha | part 06 section 19.9 |

Later-phase gates (B1–B4, C1–C2, O1, A1, S1) remain canonical text in part 06
and are converted to gate records when their predecessor phases near
completion. Initial production-quality gates (lineage completeness, no
unapproved-candidate publication path, focused-revision acceptance rates) are
canonical in part 05 section 17.3.

## Readiness model

Readiness is `not_assessed`. A future claim must identify:

- exact subject version;
- applicable requirements and gates;
- dated evidence and validator versions;
- unresolved risks and exceptions;
- approving authority; and
- expiry or reassessment trigger.

The decision checkpoints in part
[07](storyworld/07_backlog_validation_risks_and_recommendation.md) section 24
(continue / narrow / branch / stop conditions per phase) are the canonical
stop-condition model.
