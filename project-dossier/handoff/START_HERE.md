# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-28, F2 complete)

- Exact revision: `main` at `2a337bb` plus closing bookkeeping, pushed;
  CI green on every substantive commit (latest run 30382310094).
- **The complete F1 contract pack is built, validated, and at its owner
  boundary**: 13 schema documents, 4 lifecycle machines, OpenAPI 3.1
  contract, 24-event catalog, 3 adapter interfaces, 4 production fixtures
  normalized from the owner's packet, 8 architecture probes, active MET-F1
  metamorphic suite, and the fixture registry — all CI-enforced.
- **F2 is complete and staged for GATE-0004 (DEC-0010)**: monorepo +
  4 packages (domain, persistence, storage, portability), 21 tests against
  live Postgres and MinIO locally and in CI; VS0 signed round trip PASS;
  restore drill PASS (EVD-0009). F1 accepted earlier the same day
  (GATE-0003, charter v2).
- Active task: none. TASK-0001–TASK-0005 completed.
- Fresh evidence: EVD-0008–EVD-0009.

## Next safe action

Owner: decide DEC-0010 (.agent/decisions/ — the GATE-0004 evaluation with
criterion mapping and disclosed deferrals). On acceptance, F3 (headless
narrative kernel, PLAN-0005) opens: canon/entity/timeline tables on the
proven RLS + append-only pattern, source-to-canon proposals, scene state
packets, and the full-scope VS0 re-run. Provider posture for B1 is recorded
(ASM-0002: local ComfyUI primary; fal.ai direct endpoints second).

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
