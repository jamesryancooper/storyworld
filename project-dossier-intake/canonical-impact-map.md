# Canonical Impact Map

Chapter-by-chapter integration plan for this intake package — executed at DEC-0039 after the individual decisions are dispositioned. Each entry states what the governed tree gains or amends and which intake artifact supplies it. Supersessions are recorded in `project-dossier/SUPERSESSION.json`; new registered artifacts enter `machine-readable/artifact-registry.json` (path-authority and ARTIFACT_CATALOG are regenerated mirrors).

## Canonical chapters (`project-dossier/canonical/storyworld/`)

### 01 — Executive context and product direction

* Extend the Recovered concept map (§1.3) or add a successor "Property portfolio" section: the four promoted properties (Ryan and Nicol fairytale, Saint Michael artwork series, SciSpark curriculum storylines, Ambience channel), the prospective metaphysical project, the unnamed advice-property candidate, and the ten generated showcase concepts (marked as concepts, working titles pending clearance). Source: `product-definition/narrative-story-projects.md` (DEC-0029).
* Note the pattern-showcase coverage policy (every platform pattern has a designated showcase property). Source: same (DEC-0029).
* Record the entity/umbrella outcome when decided (Creative Media Ventures / Stavium structure). Source: `governance/ip-authorship-and-transparency.md` §4 (DEC-0036; counsel).

### 02 — Engine, Studio, and templates

* "Style and voice" property tab grows into the Look-system home (look cascade, emotional-register mapping, look-development artifacts: mood board → look book → style test). Source: `platform-capabilities/production-design.md` §3, §6 (DEC-0033).
* Storyboard view and Generation Workbench gain the cinematography/photography/editing parameter vocabulary (template-level vocabulary, not schema). Source: `production-design.md` §4 (DEC-0033).
* §7 template registry gains instances over time per the backlog (16 instances, scheduled with ingestion order). Source: `plans/production-template-backlog.md` (DEC-0038).
* Media production adds the physical-proof approval gate and print-edition versioning. Source: `platform-capabilities/additional-features.md` (print/physical adaptors, DEC-0032).
* Property/production workflows add: audience-designation assignment (DEC-0035), the naming/clearance step (DEC-0036), and authorship-dossier compilation (DEC-0036).

### 03 — Domain architecture and media pipeline

* Recipe compiler: resolves the Look cascade plus scene emotional objective into per-shot locked/flexible/provider-adjustable attributes; no new generation path. Source: `production-design.md` §3, §8 (DEC-0033).
* Score and sound design layer (themes/leitmotifs, instrumentation palettes, emotion-to-score mapping, cue types, sound palettes) parallel to visual identity; rights unchanged. Source: `production-design.md` §5 (DEC-0033).
* Renditions/adaptors: art-style definitions as versioned first-class objects (DEC-0031); presentation-unit grammars and per-destination length-class ladders as adaptor configuration (DEC-0032).

### 04 — Foundry, Rewind, channels, and contracts

* Channel strategy: export-adaptor formalization — destination adaptors, the designed swipe-based storytelling web experience, format constraints as adaptor config. Source: `additional-features.md` (DEC-0032).
* Publication records and channel config gain audience-designation fields (made-for-kids flags, non-personalized-ad delivery). Source: `governance/childrens-audience-compliance.md` §3 (DEC-0035).
* Commerce boundary: refuse child-directed placements absent an explicit accepted decision; campaign briefs gain audience-designation. Source: same §4 (DEC-0035).
* Print/POD vendor adapters submit print-ready packages with receipts, parallel to channel submissions. Source: `additional-features.md` (DEC-0032).

### 05 — Governance, operations, and quality

* §15 gains: the children's-compliance approval layer, child-data prohibitions, and conversational-character child-safety requirements (DEC-0035); the naming/clearance pipeline, authorship-dossier derivative, AI-contribution disclosure fields, contributor-agreement consent records, and the AI-transparency stance (DEC-0036).
* Privacy/sensitive-source handling: adopt the refined sensitivity ladder (S0/S1/S1R/S2/S3), the S3 restricted-partition rules, and the S1R derivation-distance review rule. Source: `plans/source-material-ingestion-plan.md` (DEC-0037).
* §17 quality: the five additional narrative patterns (nested narrative/diegetic levels, in-fiction timelines and loops, retcon lifecycle, transmedia complementary canon, community/fan contribution boundary) join the pattern set as scheduled probes/fixtures; the metamorphic table gains "retcon a canon fact." Source: `product-definition/narrative-story-projects.md` proposed-patterns section (DEC-0034).

### 06 — MVP, roadmap, and vertical slices

* Schedule additions in dependency order: ingestion pilot (Ryan and Nicol first), template instances with their properties' first productions, the new pattern probes, and the children's-compliance gate before any child-directed publication. Sources: DEC-0034/0035/0037/0038.

### 07 — Backlog, validation, risks

* Backlog epics: ingestion pilot, look-system implementation, template instances, compliance implementation, authorship-dossier derivative.
* Risk table: add a children's-audience compliance risk row (misdesignation/child-data exposure; mitigations per DEC-0035).
* Registers (raidq): open questions — entity structure, property naming clearances, S1R derivation-distance calibration.

### 08 — Appendices

* Glossary: Look, audience designation, sensitivity classes (S0–S3), export adaptor, presentation-unit grammar, authorship dossier, pattern showcase.

## Machine-readable and registry work

* `sources.json`: add this intake package (final commit hash) as an accepted source (DEC-0039), mirroring SRC-0001's pattern.
* `artifact-registry.json`: register the catalog, taxonomy, building blocks, features, production design, both governance docs, both plans, and the two assessment packages as supporting artifacts with paths at their final homes; refresh regenerates path-authority and ARTIFACT_CATALOG.
* `plan.json`: items for ingestion order, template scheduling, probe implementation, compliance implementation.
* `raidq.json`: the open questions above.
* `SUPERSESSION.json`: entries for each amended canonical section.
* Regulatory facts from the compliance doc (COPPA, platform kids rules, children's advertising standards) become `research/` mutable-external-fact records with sources and assessment dates rather than baked canonical assertions.

## Non-dossier targets

* `.agent/decisions/`: accepted drafts DEC-0029…DEC-0039 (renumbered if needed).
* `packages/contracts/fixtures/`: the five new pattern probes/fixtures when their decision (DEC-0034) is accepted and scheduled.
* Post-integration: snapshot this package to `project-dossier/history/storyworld-dossier-v1.1-intake/`; dissolve `project-dossier-intake/`.
