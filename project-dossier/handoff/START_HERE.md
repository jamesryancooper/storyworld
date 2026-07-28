# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-28, F1 complete)

- Exact revision: `main` at `2a337bb` plus closing bookkeeping, pushed;
  CI green on every substantive commit (latest run 30382310094).
- **The complete F1 contract pack is built, validated, and at its owner
  boundary**: 13 schema documents, 4 lifecycle machines, OpenAPI 3.1
  contract, 24-event catalog, 3 adapter interfaces, 4 production fixtures
  normalized from the owner's packet, 8 architecture probes, active MET-F1
  metamorphic suite, and the fixture registry — all CI-enforced.
- **F1 is complete and accepted**: DEC-0007 and DEC-0008 accepted
  2026-07-28; charter v2 governs (SUP-0002); GATE-0003 passed; PLAN-0003
  completed. PLAN-0009/0010 registered and phased.
- Active task: none. TASK-0001–TASK-0004 completed.
- Fresh evidence: EVD-0006–EVD-0008.

## Next safe action

F2 (governed foundation, PLAN-0004) is open. Entry touchpoint: confirm the
ASM-0001 stack specifics (TypeScript/Node versions, package manager,
monorepo tooling) — then implementation begins. Queue in parallel: the B1
media-provider posture (credentials/budget or local ComfyUI).

## Resume in this order

1. Read `AGENTS.md` and `.agent/START_HERE.md`.
2. Read `.agent/state/current.json` and `.agent/state/RESUME.md`.
3. For F2 context: `.agent/decisions/` (all accepted), `packages/contracts/`
   (the build target), `project-dossier/machine-readable/plan.json`
   (PLAN-0004 criteria).
4. For contract work after acceptance:
   `../context-packs/f0-f1-contract-pack.md`.
5. Validate before and after changes:
   `python -B .agent/scripts/validate.py --check`; after source changes run
   `python -B .agent/scripts/refresh.py --refresh` first.
