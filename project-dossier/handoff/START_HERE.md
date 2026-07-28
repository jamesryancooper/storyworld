# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-28)

- Exact revision: uncommitted working tree; the git repository (branch
  `main`) has **zero commits**. Committing the current tree is the sensible
  next action.
- Adoption: **complete** — DEC-0001–DEC-0004 accepted by the project owner
  2026-07-28; harness adoption status `adopted`; `storyworld-steward`
  capability adopted; TASK-0001 and PLAN-0001 completed.
- Active work: none. Next planned item is PLAN-0002 (F0 charter pack).
- Blockers: none recorded.
- Fresh evidence: EVD-0001 (structural check), EVD-0002 (test suite),
  EVD-0003 (repository inspection) in `.agent/evidence/`.
- No readiness beyond structural integrity is implied by any of this.

## Next safe action

Commit the working tree, then open a task for PLAN-0002 (F0 — product
charter and authority pack) using the `storyworld-steward` capability
contract.

## Resume in this order

1. Read `AGENTS.md` and `.agent/START_HERE.md`.
2. Read `.agent/state/current.json` and `.agent/state/RESUME.md`.
3. Read `../README.md`, then `../AUTHORITY.md`.
4. For product context, read `../canonical/storyworld/README.md`.
5. For work state: `../machine-readable/plan.json`,
   `../machine-readable/raidq.json`, `../conformance/README.md`.
6. Validate before and after changes:
   `python -B .agent/scripts/validate.py --check`; after source changes run
   `python -B .agent/scripts/refresh.py --refresh` first.
