# Storyworld Platform Project Dossier

> Documentation only. This dossier does not grant permission or override
> current user, platform, repository, or live harness instructions.

Generated from Project Blueprint 1.0.1 with the `high-assurance`
profile on 2026-07-28.

## Start here

1. Read `AUTHORITY.md`.
2. Read `CANONICAL_SOURCE_MAP.md`.
3. Read the authoritative
   `machine-readable/artifact-registry.json`. Treat
   `ARTIFACT_CATALOG.json` and `machine-readable/path-authority.json` as
   generated mirrors.
4. Read `canonical/` for intended state. The detailed Storyworld product
   definition is the content pack at `canonical/storyworld/README.md`; the
   four `canonical/*.md` entry files summarize and route into it.
5. Read `current-state/` for evidence-backed observed state.
6. Read `conformance/`, `plans/`, and `registers/`.
7. Use `handoff/START_HERE.md` only as a compact resumption view.
8. Use `history/` only when the active catalog or supersession record routes
   there.

## Dossier state (2026-07-29)

- Project definition: populated from the Storyworld canonical content pack
  v1.0 (`canonical/storyworld/`); adoption ratified by the project owner
  2026-07-28 (DEC-0001–DEC-0004, PLAN-0001)
- Current implementation: owner-accepted V1 dual-use alpha at `23d3050`
  (DEC-0017/EVD-0018); Engine, Studio, contracts, persistence/custody,
  workflows, integrations, and regression harness are implemented
  (`current-state/README.md`)
- Conformance: reassessed 2026-07-29 — the contract pack is conformant
  (FIND-0001); the implemented alpha is compatible with the canonical
  architecture while production crossings remain gated (FIND-0002)
- Readiness: V1 alpha gate passed; production readiness is `not_ready`
- Conditional artifact applicability: MOD/SEC/OPS/TRN/HIS assessed
  `applicable`; CTX assessed `applicable`; DAT/SUP/RES/EVA remain
  `not_assessed` pending their explicit stewardship assessments (PLAN-0006)
- External authority: none created by this dossier

## Major layers

| Layer | Information role |
|---|---|
| `canonical/` | Intended target |
| `current-state/` | Dated observation |
| `conformance/` | Current-versus-target findings |
| `plans/` | Future sequence and gates |
| `registers/` | Risks, assumptions, issues, dependencies, questions |
| `provenance/` | Source origin and limitations |
| `validation/` | Validation procedure and results |
| `handoff/` | Non-authoritative resumption context |
| `machine-readable/artifact-registry.json` | Authoritative project-local artifact metadata |
| Other `machine-readable/` records | Profile-dependent authoritative record stores and generated mirrors |
| `governance/`, `data/`, `models/`, `operations/`, `research/`, `supply-chain/` | Conditional High-Assurance trigger-assessment entry points |
| `evaluation/`, `context-packs/` | Optional High-Assurance trigger-assessment entry points |
| `transition/` | Conditional adoption, replacement, or migration package |
| `history/` | Explicitly noncurrent preserved records, when enabled |

Edit artifact metadata and applicability only in
`machine-readable/artifact-registry.json`, then run
`python -B .agent/scripts/refresh.py --refresh`. `ARTIFACT_CATALOG.json`,
`machine-readable/path-authority.json`, `MANIFEST.json`, and
`CHECKSUMS.sha256` when present are derived and must not be edited
independently. A generated directory entry point records an unassessed trigger;
its presence does not establish applicability.

## Add, combine, move, or remove an artifact

1. Update `machine-readable/artifact-registry.json`: reuse an existing
   conceptual type or add one with the complete type contract; add or update a
   unique `REP-####`, confined path, source direction, owner, applicability,
   and review state.
2. Create or move the physical source. For one file implementing multiple
   concerns, list every type in `artifact_type_ids`, use applicability
   `combined`, and name the separate sections/edit direction in the rationale.
3. For omission, set the conceptual type’s applicability to `not_applicable`
   with `assessed_on`, `assessed_by`, and an evidence-based rationale; then
   remove its representation and physical path while retaining the type
   record. For replacement, update `SUPERSESSION.json` and successor links.
4. Run `python -B .agent/scripts/refresh.py --refresh`, then
   `python -B .agent/scripts/validate.py --check`.

Refresh is the only writer for derived catalog, path-authority, manifest, and
checksum/report outputs.
