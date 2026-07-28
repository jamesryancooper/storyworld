# Project Dossier and Harness Adoption

> This checklist records work; checking a box does not create authority or
> prove substantive readiness. State as of 2026-07-28 (agent adoption
> session; TASK-0001).

- [x] Applicable root-to-leaf instructions were read. *(The repository had no
      prior instruction files; the generated `AGENTS.md` is the first.)*
- [x] Project scope, exclusions, outcomes, and stakeholders were adopted into
      the canonical entry files from the Storyworld content pack. *(Ratified
      by the owner 2026-07-28 — PLAN-0001 complete.)*
- [x] Authority sources and external-action gates were recorded as accepted
      decisions. *(DEC-0002 accepted by the project owner 2026-07-28.)*
- [x] Canonical source owners and conflict rules were adopted
      (`AUTHORITY.md`, `CANONICAL_SOURCE_MAP.md`, registry).
- [x] Artifact types, physical representations, source direction, owners, and
      review state were reconciled in the authoritative artifact registry
      (REP-0041–REP-0053 added for the Storyworld content).
- [ ] Every conditional and optional trigger was assessed. *(MOD, SEC, OPS,
      TRN, HIS assessed `applicable` with dated rationale; DAT, SUP, RES,
      EVA, CTX deliberately remain `not_assessed` until their triggers arrive
      — tracked by PLAN-0006. None is silently assumed.)*
- [x] Repository current state was directly inspected and dated
      (`current-state/README.md`, 2026-07-28).
- [x] Requirements, findings, plan items, RAIDQ entries, and evidence use
      stable references (REQ/FIND/PLAN/RISK/ASM/DEP/OQ/SRC/EVD records).
- [ ] Real project validation commands were configured. *(None exist — the
      repository has no build/test surface yet; `.agent/project.json` command
      hooks record this explicitly. Revisit at F1/F2.)*
- [ ] Needed domain extensions were registered. *(None needed yet; only the
      generated sample-restriction extension is present. Revisit when domain
      rules become machine-consumed.)*
- [x] Read-only validation and mutation tests passed on the exact tree
      (EVD-0001, EVD-0002).
- [x] Registry-derived catalog, path authority, manifest, and integrity were
      refreshed and rechecked, including High-Assurance checksums.
- [x] A real task was run through the lifecycle and handed off. *(TASK-0001
      proposed → ready → in_progress → validating → review → completed on the
      owner's 2026-07-28 acceptance.)*
- [x] Unknowns, skipped checks, limitations, and external effects were
      disclosed (task record, evidence records, and `handoff/START_HERE.md`).

## Remaining adoption work (owner)

1. ~~PLAN-0001 ratification~~ — done 2026-07-28: DEC-0001–DEC-0004 accepted;
   adoption fields set to `adopted`; TASK-0001 closed.
2. Commit the working tree (recommended) — nothing has ever been committed.
3. Deferred by design: assess DAT/SUP/RES/EVA/CTX artifact types at their
   triggers (PLAN-0006); configure real project validation commands when a
   build surface exists (F1/F2).
