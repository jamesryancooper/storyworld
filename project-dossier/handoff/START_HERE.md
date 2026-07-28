# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-28)

- Exact revision: `main` at commit `3e49a82` plus the closing bookkeeping
  commit, pushed to `origin`
  (github.com/jamesryancooper/storyworld).
- CI: `validate` workflow runs the read-only check and 51-test suite on
  every push; first run 30359885658 green on Python 3.11 and 3.12
  (EVD-0004).
- Adoption: complete (DEC-0001–DEC-0004 accepted; TASK-0001/TASK-0002
  completed; PLAN-0001 completed).
- Open item: DEC-0005 (contract-pack toolchain) is **proposed**, awaiting
  owner acceptance.
- Blockers: none.
- Fresh evidence: EVD-0001–EVD-0004 in `.agent/evidence/`.

## Next safe action

1. Owner: accept (or revise) DEC-0005.
2. Open a task for PLAN-0002 — the F0 charter/authority pack — working in
   `packages/contracts/` under the `storyworld-steward` capability, using
   the context pack `../context-packs/f0-f1-contract-pack.md`.
3. Owner, in parallel: PLAN-0007 golden-fixture source content.

## Resume in this order

1. Read `AGENTS.md` and `.agent/START_HERE.md`.
2. Read `.agent/state/current.json` and `.agent/state/RESUME.md`.
3. Read `../README.md`, then `../AUTHORITY.md`.
4. For product context: `../canonical/storyworld/README.md`; for contract
   work: `../context-packs/f0-f1-contract-pack.md`.
5. For work state: `../machine-readable/plan.json`,
   `../machine-readable/raidq.json`, `../conformance/README.md`.
6. Validate before and after changes:
   `python -B .agent/scripts/validate.py --check`; after source changes run
   `python -B .agent/scripts/refresh.py --refresh` first.
