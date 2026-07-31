# Project Dossier Intake — v1.1 Update Package

Staged source material for the next canonical dossier update. Nothing in this directory is governed project authority until it is ratified through decision records and dispositioned into `project-dossier/` and `.agent/`. This manifest is the master index: every artifact, its status, where it lands, and what decision gates it.

## Lifecycle

1. **Staged** (this directory, committed) → 2. **Owner review** (questionnaire answered; draft decisions dispositioned accept/amend/defer/reject) → 3. **Ratified** (accepted decisions filed into `.agent/decisions/`; intake recorded as a provenance source) → 4. **Dispositioned** (content integrated per `canonical-impact-map.md`; registries refreshed and validated) → 5. **Archived** (package snapshot moved to `project-dossier/history/`; this directory dissolved).

## Status legend

`draft` — authored, awaiting owner review · `owner-review` — under active owner disposition · `ratified` — accepted by decision, awaiting integration · `dispositioned` — integrated into the governed tree

## Blocking input

The **Owner Decision Questionnaire** (`owner-input/storyworld-owner-decision-questionnaire.md`) is the gating input: its answers feed DEC-0028's disposition and several draft decisions below. Answer it first.

## Inventory

| Artifact | Class | Status | Disposition target | Gating decision(s) |
|---|---|---|---|---|
| `owner-input/storyworld-owner-decision-questionnaire.md` | Owner input | **awaiting answers** | `project-dossier/` owner-input area (new registered dir) + decisions derived from answers | — (it gates the others) |
| `product-definition/narrative-story-projects.md` | Product definition | draft | Canonical ch01 concept-map amendments + registered artifact | DEC-0029 |
| `product-definition/narrative-taxonomy.md` | Product definition | draft | Canonical product-direction section + registered artifact | DEC-0030 |
| `product-definition/narrative-building-blocks.md` | Product definition | draft | Registered artifact (taxonomy companion) | DEC-0030 |
| `platform-capabilities/additional-features.md` | Capability proposal | draft | Canonical ch02/ch04 amendments | DEC-0031, DEC-0032 |
| `platform-capabilities/production-design.md` | Capability proposal | draft | Canonical ch02/ch03 amendments | DEC-0033 |
| `governance/childrens-audience-compliance.md` | Governance proposal | draft | Canonical ch05 amendments + `project-dossier/governance/` + research records for regulatory facts | DEC-0035 |
| `governance/ip-authorship-and-transparency.md` | Governance proposal | draft | Canonical ch05 amendments + `project-dossier/governance/` | DEC-0036 |
| `plans/source-material-ingestion-plan.md` | Plan | draft | `project-dossier/plans/` + `plan.json` items | DEC-0037 |
| `plans/production-template-backlog.md` | Plan | draft | `project-dossier/plans/` + `plan.json` items + ch02 §7 over time | DEC-0038 |
| `assessments/storyworld-studio-interface-architecture.md` | Assessment | stable | Registered supporting artifact; conclusions already partly canonicalized (Phases 0–3, DEC-0020–0027) | DEC-0039 registers it |
| `assessments/technical-enablement/` (6 files + checksums) | Assessment | stable | Registered supporting artifacts | DEC-0039 registers them |
| `evidence/conversations/` (3 files) | Evidence | stable | `project-dossier/provenance/` source records or archived with the package | DEC-0039 |
| `draft-decisions/` (11 drafts, DEC-0029…DEC-0039) | Draft decisions | draft | `.agent/decisions/` upon owner disposition | each individually |
| `canonical-impact-map.md` | Integration plan | draft | Executed during disposition; then archived with the package | DEC-0039 |
| `process/updating-project-dossier.md` | Process guidance | stable | Archived with the package (its principles are already reflected in this structure) | — |
| `readme.md` (this file) | Manifest | living | Archived with the package | — |

## Draft decisions index

| Draft | Title | Depends on |
|---|---|---|
| DEC-0029 | Adopt the narrative project portfolio and pattern-showcase coverage | Questionnaire Q1–Q2 (first proof/user) helpful but not blocking |
| DEC-0030 | Adopt the narrative taxonomy and building blocks | — |
| DEC-0031 | Art-style definitions feature | — |
| DEC-0032 | Export adaptors (destinations, grammars, length ladders, print/physical) | — |
| DEC-0033 | Production design and look system | DEC-0031 |
| DEC-0034 | Five additional narrative patterns + composition backlog | — |
| DEC-0035 | Children's-audience compliance layer | Counsel validation condition |
| DEC-0036 | IP, authorship, and AI-transparency strategy | Counsel for entity/trademark items |
| DEC-0037 | Source-material sensitivity ladder and ingestion plan | DEC-0035, DEC-0036 for the sensitive/child-adjacent classes |
| DEC-0038 | Production template backlog | DEC-0029 |
| DEC-0039 | Intake ratification and canonical integration (master) | All of the above dispositioned |

## Related governed artifacts (referenced, not duplicated here)

* Studio UX audit — `.agent/evidence/EVD-0021-storyworld-studio-ux-audit-record.md`, `.agent/reviews/REV-0001-storyworld-studio-mockup-ux-audit.md` (DEC-0018, DEC-0027).
* Graph/canvas semantics — `.agent/decisions/DEC-0028-graph-canvas-semantics.md` (proposed; awaits owner disposition via questionnaire Q8–Q9).
* Fixture-authoring packet and pattern source — `packages/contracts/fixtures/sources/packet/` (incl. `PATTERN_DRIVEN_EXPANSION.md`, `COVERAGE_MATRIX.md`); schema probes at `packages/contracts/fixtures/probes/`.
* Canonical dossier v1.0 — `project-dossier/` (authority per its `AUTHORITY.md`; provenance SRC-0001).

## Integration runbook (executed at DEC-0039)

1. Owner answers the questionnaire; dispositions DEC-0028 and drafts DEC-0029…DEC-0038.
2. Accepted drafts are filed into `.agent/decisions/` (renumbered if the sequence shifted); rejected/deferred ones are archived with their disposition noted here.
3. Record this package (at its final commit) as a provenance source in `project-dossier/machine-readable/sources.json`, accepted via DEC-0039.
4. Execute `canonical-impact-map.md`: amend canonical chapters, register artifacts (artifact-registry → path-authority/ARTIFACT_CATALOG mirrors), add plan/register items, record supersessions.
5. Run `python3 -B .agent/scripts/refresh.py --refresh` then `validate.py --check`; both must pass.
6. Snapshot this package into `project-dossier/history/storyworld-dossier-v1.1-intake/` and remove the root directory.
