# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-28)

- Exact revision: `main` pushed to origin
  (github.com/jamesryancooper/storyworld); F0 pack at commit `895e2f5`
  plus closing bookkeeping. CI green on every push so far.
- **The F0 charter and authority pack is drafted and awaiting the owner's
  GATE-0002 decision** (OQ-0002): ADR-0001–ADR-0016 in
  `packages/contracts/adr/` and five charter artifacts in
  `packages/contracts/charter/`, acceptance vehicle `DEC-0006`
  (`.agent/decisions/`), which maps every gate criterion to its artifacts.
- Also pending: `DEC-0005` (contract toolchain).
- Active task: none. TASK-0001–TASK-0003 completed. PLAN-0002 remains
  `in_progress` until GATE-0002 is decided; F1 (PLAN-0003) is gated on
  DEC-0006 and DEC-0005; PLAN-0007 (fixture source content) is
  owner-supplied and can proceed anytime.
- Fresh evidence: EVD-0001–EVD-0005.

## Next safe action

Owner: review `packages/contracts/adr/README.md` (the set overview), spot-
check ADRs of interest — ADR-0006 and ADR-0007 deviate deliberately from
Appendix A's literal text — then accept, revise, or reject `DEC-0006` and
decide `DEC-0005`. On acceptance: ADR statuses flip, GATE-0002 records
passed, PLAN-0002 completes, and F1 schema authoring begins.

## Resume in this order

1. Read `AGENTS.md` and `.agent/START_HERE.md`.
2. Read `.agent/state/current.json` and `.agent/state/RESUME.md`.
3. For the pending decision: `.agent/decisions/DEC-0006-*.md`, then
   `packages/contracts/adr/README.md` and `packages/contracts/charter/`.
4. For contract work after acceptance:
   `../context-packs/f0-f1-contract-pack.md`.
5. Validate before and after changes:
   `python -B .agent/scripts/validate.py --check`; after source changes run
   `python -B .agent/scripts/refresh.py --refresh` first.
