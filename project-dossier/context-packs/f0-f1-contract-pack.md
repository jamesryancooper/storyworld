# Context Pack — F0/F1 Contract-Pack Work

> Curated routing only (CTX-0001, REP-0054). This pack narrows context for
> contract-pack sessions; it duplicates no mutable facts and grants nothing.
> Size budget: this file stays under 90 lines. If a pointer here conflicts
> with its source, the source wins — record the drift.

## Mission framing

Produce the F0 charter/authority pack (PLAN-0002 → GATE-0002), then the F1
domain-model and contract pack (PLAN-0003 → GATE-0003), as **proposals** in
`packages/contracts/` under the conventions in its `README.md` and the
toolchain proposed in `DEC-0005` (check its acceptance status first).

## Read in this order (exact sections)

1. `packages/contracts/README.md` — workspace layout, Appendix B mapping,
   ADR/acceptance rules.
2. `project-dossier/canonical/storyworld/06_mvp_dependency_roadmap_and_vertical_slices.md`
   §19.1 (F0 deliverables + exit gate) and §19.2 (F1 deliverables + exit
   gate).
3. `project-dossier/canonical/storyworld/08_appendices.md` — Appendix A
   (the sixteen proposed ADRs to author), Appendix B (the exact artifact
   inventory), Appendix D (controlled vocabulary; use these terms verbatim).
4. `project-dossier/canonical/storyworld/03_domain_architecture_and_media_pipeline.md`
   §8 (domain hierarchy, bounded contexts, fact model, placement contract,
   reference packs) — the source for schema shapes.
5. `project-dossier/canonical/storyworld/04_foundry_rewind_channels_and_contracts.md`
   §11.4–11.5 (brief/bundle content), §12.3 (runtime release), §14 (API
   style, events, envelope, versioning rules).
6. `project-dossier/canonical/storyworld/02_engine_studio_and_templates.md`
   §6.4 (lifecycle state machines to encode).
7. For fixtures: §17.1 of part 05 (golden corpus table) and
   `packages/contracts/fixtures/README.md`; fixture source content is
   owner-supplied (PLAN-0007) — do not invent it.

## Hard constraints (verify at the sources)

- Requirements REQ-0001..REQ-0010 (`machine-readable/requirements.json`) —
  especially: no mandatory commerce fields in generic canon; no runtime
  execution/player state in Storyworld; revision time vs. story time
  explicit; deterministic round-trip.
- Models propose, humans authorize: contract-pack output is always a
  proposal; ADR acceptance follows `packages/contracts/adr/README.md`.
- Dossier path changes require artifact-registry updates + refresh;
  `packages/contracts/` is outside the dossier registry.

## Working loop

Draft → validate (contract tests when they exist; harness
`validate.py --check` always) → record progress in the active task → update
`plans`/`registers` records only through their machine-readable stores.
