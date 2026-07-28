# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-28, F1 boundary)

- Exact revision: `main` at `2a337bb` plus closing bookkeeping, pushed;
  CI green on every substantive commit (latest run 30382310094).
- **The complete F1 contract pack is built, validated, and at its owner
  boundary**: 13 schema documents, 4 lifecycle machines, OpenAPI 3.1
  contract, 24-event catalog, 3 adapter interfaces, 4 production fixtures
  normalized from the owner's packet, 8 architecture probes, active MET-F1
  metamorphic suite, and the fixture registry — all CI-enforced.
- Pending owner decisions: **DEC-0007** (fixture charter v2 + domain-model
  additions) and **DEC-0008** (F1 pack acceptance = GATE-0003 evaluation).
  Accept in that order or together.
- Active task: none. TASK-0001–TASK-0004 completed. PLAN-0003 completes on
  GATE-0003; PLAN-0009/0010 registered and phased.
- Fresh evidence: EVD-0005–EVD-0007.

## Next safe action

Owner: decide `DEC-0007` then `DEC-0008` (.agent/decisions/ — DEC-0008
carries the GATE-0003 criterion mapping). On acceptance, F2 opens; the next
owner touchpoints after that are the ASM-0001 stack confirmation (F2 entry)
and the B1 media-provider posture (credentials/budget or local ComfyUI).

## Resume in this order

1. Read `AGENTS.md` and `.agent/START_HERE.md`.
2. Read `.agent/state/current.json` and `.agent/state/RESUME.md`.
3. For the pending decisions: `.agent/decisions/DEC-0007-*.md` and
   `DEC-0008-*.md`, then `packages/contracts/DESIGN_NOTES.md` and
   `packages/contracts/fixtures/registry.json`.
4. For contract work after acceptance:
   `../context-packs/f0-f1-contract-pack.md`.
5. Validate before and after changes:
   `python -B .agent/scripts/validate.py --check`; after source changes run
   `python -B .agent/scripts/refresh.py --refresh` first.
