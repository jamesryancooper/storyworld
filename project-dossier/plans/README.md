# Dependency-Aware Plan

Planning material does not authorize work or external actions.
`../machine-readable/plan.json` owns plan-item records; this file owns
planning method, dependency explanation, and summary.

## Method

Plan items are derived from the canonical dependency-gated roadmap
(`../canonical/storyworld/06_mvp_dependency_roadmap_and_vertical_slices.md`,
section 19), which is not a calendar: a phase begins only when its entry
dependencies are satisfied and completes only at its evidence gate. The
canonical roadmap remains the full picture (F0 → F1 → F2 → F3 → parallel
B1–B4 → V1 → conditional C/O/A/S/X phases); plan records here track only the
actionable near-term slice plus adoption work.

## Current plan summary (2026-07-28)

```text
PLAN-0001  Owner ratification of blueprint adoption        completed 2026-07-28
PLAN-0002  F0 — product charter and authority pack         (no deps)   → GATE-0002
PLAN-0003  F1 — domain model and contract pack             (← PLAN-0002) → GATE-0003
PLAN-0004  F2 — governed foundation                        (← PLAN-0003) → GATE-0004
PLAN-0005  F3 — headless narrative kernel                  (← PLAN-0004) → GATE-0005
PLAN-0006  Assess deferred conditional artifact types      (no deps; trigger-driven)
PLAN-0007  Golden-fixture source content (owner-supplied)  (no deps)   → GATE-0003
```

PLAN-0001 is `completed` (decisions DEC-0001..DEC-0004 accepted); the
remaining items are `planned`; none is authorized by this file. The canonical
"recommended first artifact" is the F0/F1 contract pack (PLAN-0002/0003) —
not a large codebase. B1/B2/B3/B4 parallel-track items are added when F3
nears its gate.
