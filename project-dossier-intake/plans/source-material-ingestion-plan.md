# Source-Material Ingestion Plan

The operational plan for moving the existing source corpus into Storyworld's governed source inboxes — the first content act of the build. The canonical dossier defines the workflow (verbatim import → ownership/date/sensitivity/permitted-use record → extraction proposals → owner acceptance → first canon release); this document supplies the missing plan: what the sources are, what sensitivity class each carries, which property inbox receives it, and in what order. Target canonical home: chapter 02 (Studio workflows — create or migrate a property), instantiated per property.

## 1. Sensitivity classes and permitted uses

Every imported source record carries one class; the class determines permitted uses. Classes align with the dossier's restricted-inbox and privacy requirements.

| Class | Definition | Extraction | Prompt/provider exposure | Publication |
|---|---|---|---|---|
| **S0 — Public/published** | Already published or intended verbatim publication | Yes | Yes | Yes |
| **S1 — Internal creative** | Owned drafts, style guides, plans, research notes | Yes | Yes | Via normal review |
| **S1R — Third-party-derived research** | Study guides and extractions distilled from others' content | Ideas and structure only | Yes, ideas only | **No verbatim reuse ever** — see section 3 |
| **S2 — Personal-identifying** | Real names, places, family photographs, real events | Yes, flagged | Only with dignity/likeness review | Only through dignity and consent review |
| **S3 — Restricted-sensitive** | Family crisis correspondence and similar material | Owner-only handling | **Never** | **Never** — informs understanding only; no cross-property reuse |

## 2. Source inventory and property mapping

Current staging location: `~/Projects/chatgpt-exports` (one markdown file per conversation; conversations carry their originating project links). The corpus stays archival; curated copies move into per-property source inboxes at ingestion.

| Source group | Contents | Class | Destination inbox |
|---|---|---|---|
| Fairytale package | Full story draft (human-authored), page-by-page outline, style guide, character sheets | S1 + S2 (real names, places, biography) | Ryan and Nicol |
| Wedding-speech material | Speeches and advice drafts connected to the same family events | S2 | Ryan and Nicol (context) / personal archive |
| Wisdom study-guide corpus | Deep-dive study guides distilling third-party self-development content (core principles, life traps, counterintuitive truths, maturity, engaged living, truth) | **S1R** | Living Inheritance; Proper Manhood; visual advice-storytelling property |
| Original moral frameworks | Seven-lens natural-law framework, objective-vs-subjective test batteries (owner-authored) | S1 | Proper Manhood |
| Character/integrity/marriage research | Discernment, standing for truth, half-truth quote research, boundaries, spousal-quality exploration | S1 (quote collections: verify per-quote attribution before any publication) | Proper Manhood |
| Father-to-daughter message material | Message extractions and drafts in the father-to-daughter register | S2 | Notes to My Daughter |
| Family crisis correspondence and related drafts | Personal correspondence and the related song draft | **S3** | Notes to My Daughter (restricted partition) |
| Audience and delivery concepts | Lost-teens audience avatar, comparable-audience analysis, swipe-experience concept, post-format research | S1 (competitor analysis: internal only) | Visual advice-storytelling property |
| Saint Michael package | Canonical scene JSONs, treatment prompts, theological grounding notes | S1 | Saint Michael artwork series |
| Art-style specifications | NeonSlash, Cozy Painterly Toon, Illustrative Tech-Urban Nature Realism (+ eco-punk worldbuilding notes) | S1 | Platform style library (feeds art-style definitions) |
| Ambience package | Channel roadmap, scene-description libraries, seed-image prompt systems, sound-design prompts, monetization research | S1 | Ambience YouTube channel |
| SciSpark corpus | Curriculum storylines, lesson corpus, writing-style guides, lesson-writer prompt systems | S1 (verify any third-party-transcript derivations as S1R) | SciSpark |
| Dumpster Fire Friends origin | Naming session, card-series plan, early card experiments | S1 | Dumpster Fire Friends |
| Metaphysical research | Consciousness, spirit-world, afterlife, psychedelic-realm explorations | S1 | Metaphysical project collection (serves The Lanterns) |

## 3. Third-party-derived material policy (S1R)

The wisdom corpus and any lesson material distilled from third-party videos or texts is research, not content:

* Permitted: learning from ideas, structuring original work informed by them, internal reference.
* Prohibited: verbatim republication, close paraphrase of distinctive passages, republishing quote compilations without per-quote verification and attribution.
* Publishing pipelines that draw on S1R sources must produce original expression in the property's own voice; review checks derivation distance the same way commerce review checks claims.

## 4. Restricted-sensitive handling (S3)

* S3 material enters a restricted partition of the Notes to My Daughter inbox: owner-only visibility, excluded from extraction jobs, never transmitted to providers, never quoted in prompts, never cross-referenced by other properties.
* Its only function is to keep the property's published work truthful to lived experience while the published work itself remains dignity-preserving and non-identifying (the property's existing controls).
* Names and identifying details stay out of catalog and dossier documents (already the practice).

## 5. Ingestion order

Sequenced by readiness and by how much governance each needs in place first:

1. **Ryan and Nicol** — most complete package; near-term deliverable; pilots the full workflow plus the authorship dossier (see `../governance/ip-authorship-and-transparency.md`).
2. **Saint Michael artwork series** — small, clean, S1-only; exercises style-library ingestion.
3. **SciSpark** — large but low-sensitivity; exercises curriculum templates and S1R checks.
4. **Dumpster Fire Friends and Ambience** — S1 packages feeding already-designed plans.
5. **Visual advice-storytelling property** — S1 + S1R; needs the property named and adopted first.
6. **Proper Manhood and Living Inheritance** — S1/S1R plus S2 elements; ingest after rights/consent conventions for family material are exercised.
7. **Notes to My Daughter** — last deliberately: requires the S3 restricted partition, dignity controls, and contributor-consent conventions all proven.
8. **Metaphysical collection** — anytime; no dependencies.

## 6. Decision items for the owner pass

1. Adopt the sensitivity-class ladder and its permitted-use rules (S1R and S3 are new refinements of existing dossier classes).
2. Confirm the source-to-property mapping and the S3 partition design.
3. Adopt the S1R derivation-distance review rule.
4. Approve the ingestion order and start with the Ryan and Nicol pilot.
