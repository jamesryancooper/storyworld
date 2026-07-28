# Resume Storyworld Platform

> Navigation only. Re-read current instructions and inspect repository state.

- Blueprint: 1.0.1 / `high-assurance`; adoption `adopted` (DEC-0001–DEC-0004
  accepted 2026-07-28)
- Remote: `origin` = github.com/jamesryancooper/storyworld; CI
  (`validate` workflow) runs the check + test suite on every push — first
  run green (EVD-0004)
- Active task: none. TASK-0001–TASK-0003 completed 2026-07-28
- **Decision point (OQ-0002): the drafted F0 pack awaits GATE-0002 —
  review and decide DEC-0006 (ADR set + charter artifacts) and DEC-0005
  (contract toolchain). F1 is gated on both.** PLAN-0007 fixture source
  content is owner-supplied and independent
- Working mode for contract work: `storyworld-steward` capability
  (`.agents/agents/`) plus context pack
  `project-dossier/context-packs/f0-f1-contract-pack.md`
- Implementation state: contracts workspace skeleton only; no application
  code (observed 2026-07-28)
- External authority: none created by this harness

## Resume safely

1. Read root-to-leaf `AGENTS.md`.
2. Read `.agent/policy.json`, `.agent/context.json`, and
   `.agent/state/current.json`.
3. Inspect version-control and filesystem state (`git status`, `git log`).
4. Read only the active task and linked accepted decisions/evidence.
5. Read `project-dossier/handoff/START_HERE.md`.
6. Run the read-only command in `.agent/validators.json`.

Keep this page short. Put detail in the owning task, decision, or evidence
record.
