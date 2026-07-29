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

## Current plan summary (2026-07-29)

```text
PLAN-0001  Owner ratification of blueprint adoption        completed 2026-07-28
PLAN-0002  F0 — product charter and authority pack         completed 2026-07-28 (GATE-0002 passed)
PLAN-0003  F1 — domain model and contract pack             completed 2026-07-28 (GATE-0003 passed)
PLAN-0004  F2 — governed foundation                        completed 2026-07-28 (GATE-0004 passed)
PLAN-0005  F3 — headless narrative kernel                  completed 2026-07-28 (GATE-0005 passed)
PLAN-0006  Assess deferred conditional artifact types      (no deps; trigger-driven)
PLAN-0007  Golden-fixture source content (owner-supplied)  completed 2026-07-28 (packet SRC-0003)
PLAN-0008  F1 narrative-architecture probes (8)            completed 2026-07-28
PLAN-0009  Post-F1 pattern fixture corpus (19)             registered; dependency-phased
PLAN-0010  Metamorphic regression suite                    MET-F1 active; later families unscheduled
PLAN-0011  B1 — media orchestration and continuity         completed 2026-07-28
PLAN-0012  B2 — Storyworld Studio                          completed 2026-07-29
PLAN-0013  B3 — integration substrate                      completed 2026-07-29
PLAN-0014  B4 — evaluation and regression harness          completed 2026-07-29
GATE-0006  V1 dual-use architectural alpha                 passed 2026-07-29 (DEC-0017/EVD-0018)
```

The dependency run through V1 is complete and accepted. No implementation
phase or gate is currently open. PLAN-0006, PLAN-0009, and PLAN-0010 remain
registered trigger-driven or corpus-expansion obligations; they are not active
tasks and do not block the accepted alpha.

## Owner-directed next work

The next selection is intentionally not scheduled by this file:

- operate and learn from the accepted alpha within its current limits; or
- open a bounded O1 task for production key custody, TLS/real identity,
  aggregate spend accounting, real model evaluation, Commerce Foundry
  conformance, live publication policy, or production operations/reliability.

Later canonical C/O/A/S/X phases remain future dependency-gated targets. A
plan record never authorizes implementation or opens a reserved crossing.
