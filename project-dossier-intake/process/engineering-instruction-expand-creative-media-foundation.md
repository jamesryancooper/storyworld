# Engineering Instruction: Expand the Storyworld Dossier Intake Using the Creative-Media Foundation Research

## Mission

Deeply reassess and expand the Storyworld project dossier intake using:

1. The current Storyworld repository.
2. The governed `project-dossier`.
3. The staged `project-dossier-intake`.
4. The existing contract pack, fixtures, accepted ADRs, decisions, implementation, and technical assessments.
5. The full Storyworld book-research package, including all previously identified narrative, worldbuilding, media, design, production, governance, information-modeling, accessibility, safety, and creative-practice books.

The purpose of this assignment is **not** to summarize the books, create a generic media-production handbook, or immediately implement new features.

The purpose is to determine which professional creative concepts Storyworld must represent, which distinctions belong in the permanent platform architecture, which belong only in templates or controlled vocabularies, and how the dossier intake and draft decisions must be amended before canonical integration.

The resulting intake must give a future engineering team a rigorous, provider-neutral foundation for representing, planning, generating, reviewing, revising, preserving, and adapting the visual, spatial, editorial, sonic, musical, and graphic realization of narrative works.

---

# Repository scope

Review the repository at its current `main` revision, including at minimum:

* `README.md`
* `AGENTS.md`
* `.agent/`
* `packages/contracts/`
* `packages/domain/`
* `packages/kernel/`
* `packages/providers/`
* `packages/evaluation/`
* `packages/regression/`
* `apps/studio/`
* `project-dossier/`
* `project-dossier/canonical/storyworld/`
* `project-dossier/current-state/`
* `project-dossier/conformance/`
* `project-dossier/plans/`
* `project-dossier/registers/`
* `project-dossier/research/`
* `project-dossier-intake/`
* `project-dossier-intake/readme.md`
* `project-dossier-intake/canonical-impact-map.md`
* `project-dossier-intake/product-definition/`
* `project-dossier-intake/platform-capabilities/`
* `project-dossier-intake/governance/`
* `project-dossier-intake/plans/`
* `project-dossier-intake/assessments/`
* `project-dossier-intake/draft-decisions/`
* `project-dossier-intake/owner-input/storyworld-owner-decision-questionnaire.md`

Pay particular attention to:

* `project-dossier-intake/platform-capabilities/production-design.md`
* `project-dossier-intake/platform-capabilities/additional-features.md`
* `project-dossier-intake/draft-decisions/dec-0031-art-style-definitions.md`
* `project-dossier-intake/draft-decisions/dec-0032-export-adaptors.md`
* `project-dossier-intake/draft-decisions/dec-0033-production-design-look-system.md`
* `project-dossier/canonical/storyworld/02_engine_studio_and_templates.md`
* `project-dossier/canonical/storyworld/03_domain_architecture_and_media_pipeline.md`
* `packages/contracts/adr/ADR-0015-provider-neutral-recipes-canonical.md`
* `packages/contracts/schemas/generation-recipe.schema.json`
* `packages/contracts/schemas/scene-state-packet.schema.json`
* `packages/providers/src/recipe.ts`
* `apps/studio/src/components/generation-workbench.tsx`
* Current evaluation and regression fixtures.

Use the repository itself as the source of truth for current implementation and accepted decisions. Do not infer implementation from mature prose alone.

---

# Authority and work boundary

The existing `project-dossier` remains the governed authority.

The current `project-dossier-intake` remains staged material until the owner dispositions its draft decisions and authorizes canonical integration.

For this assignment:

* Do not mark draft decisions accepted.
* Do not directly rewrite governed canonical authority as though the new research has already been adopted.
* Do not authorize production implementation.
* Do not silently replace accepted contracts or ADRs.
* Do not create a second competing dossier.
* Do not treat any book, author, school of craft, provider, or production tradition as automatic Storyworld authority.

Produce staged research, assessments, amendments, draft decisions, impact maps, controlled vocabularies, proposed schemas, fixtures, and implementation implications for owner review.

Where a current implementation contradicts an accepted ADR, record the discrepancy as evidence-backed technical debt or conformance work. Do not normalize the contradiction into the target architecture.

---

# Source-handling requirements

Treat the books and related research as **S1R third-party-derived research**:

* Use concepts, distinctions, principles, and original synthesis.
* Do not reproduce substantial passages.
* Do not closely paraphrase distinctive prose.
* Record author, title, edition, publisher, publication year, and precise page or chapter references where available.
* Clearly separate direct source claims from Storyworld-specific interpretation.
* Record conflicting professional viewpoints rather than hiding disagreement.
* Identify concepts explicitly rejected or intentionally not adopted.
* Never use another creator’s style description as a provider prompt by default.
* Treat named artists, studios, films, games, photographers, composers, and works as research references with provenance and rights context—not as canonical generation instructions.

Every research conclusion must be classified as one of:

* Repository fact.
* External research finding.
* Storyworld inference.
* Recommendation.
* Open decision.
* Rejected alternative.
* Later implementation consideration.

---

# Required book corpus

Use the complete previously prepared book list. At minimum, include the following visual and sonic foundation set.

## Existing foundational books to retain and reassess

* *The Visual Story* — Bruce Block
* *Production Design for Screen* — Jane Barnwell
* *Audio-Vision* — Michel Chion
* *Producing Animation* — Catherine Winder, Zahra Dowlatabadi, and Tracey Miller-Zarneke
* *The Filmmaker’s Guide to Digital Imaging* — Blain Brown
* *How Picturebooks Work* — Maria Nikolajeva and Carole Scott
* *Building Imaginary Worlds* — Mark J. P. Wolf
* *Inventing the Medium* — Janet H. Murray
* *Designing Interfaces* — Jenifer Tidwell, Charles Brewer, and Aynne Valencia
* The previously identified narratology, transmedia, adaptation, interactive-narrative, knowledge-representation, information-organization, preservation, accessibility, safety, ethics, rights, and translation books.

## Essential new creative-media additions

* *Film Art: An Introduction* — David Bordwell, Kristin Thompson, and Jeff Smith
* *Directing: Film Techniques and Aesthetics* — Michael Rabiger and Mick Hurbis-Cherrier
* *Cinematography: Theory and Practice* — Blain Brown
* *The Nature of Photographs* — Stephen Shore
* *Graphic Design: The New Basics* — Ellen Lupton and Jennifer Cole Phillips
* *In the Blink of an Eye* — Walter Murch
* *Sound Design* — David Sonnenschein
* *Film Music: The Basics* — Kenneth Lampl

## Second-tier and activated specialist references

* *Film Directing: Shot by Shot* — Steven D. Katz
* *Dream Worlds: Production Design for Animation* — Hans Bacher
* *Understanding Comics* — Scott McCloud
* *An Architectural Approach to Level Design* — Christopher W. Totten
* *Visible Signs* — David Crow
* *Visual Character Development in Film and Television* — Michael Hanly and Elisabeth Rowney
* *Thinking with Type* — Ellen Lupton
* *On the Track* — Fred Karlin and Rayburn Wright
* *Motion Picture and Video Lighting* — Blain Brown
* *Color Correction Handbook* — Alexis Van Hurkman
* *The Art Direction Handbook for Film & Television* — Michael Rizzo
* *Dialogue Editing for Motion Pictures and Television* — Korey Pereira

Do not assume every specialist book must become permanent platform architecture. Determine which books:

* Supply universal cross-media semantics.
* Supply useful professional vocabulary.
* Apply only to one medium.
* Apply only to one template.
* Should remain implementation references.
* Are redundant with already adopted sources.
* Should not influence Storyworld at all.

---

# Primary analytical question

Determine whether Storyworld’s current production-design and Look proposal is sufficiently grounded in professional creative practice.

Do not merely ask whether all relevant words appear in the dossier.

Determine whether Storyworld correctly separates:

* Creative direction.
* Art or representation style.
* Visual identity.
* Production design.
* Art direction.
* Set design.
* Set decoration.
* Location design.
* Prop design and realization.
* Character visual development.
* Costume design.
* Hair and makeup.
* Directorial intent.
* Performance direction.
* Blocking and staging.
* Cinematography.
* Camera language.
* Lighting design.
* Composition.
* Color design.
* Color scripting.
* Color management and grading.
* Editorial design.
* Editing and montage.
* Motion grammar.
* Graphic design.
* Typography.
* Layout.
* Sequential visual design.
* Sound design.
* Dialogue.
* Ambience and room tone.
* Sonic perspective and spatialization.
* Score.
* Leitmotifs and musical identity.
* Medium-specific realization.
* Destination-specific rendition.
* Provider-specific execution controls.

Identify every concept currently:

* Collapsed into another concept.
* Duplicated in multiple proposed objects.
* Missing.
* Ambiguously named.
* Assigned to the wrong lifecycle or scope.
* Likely to become an unstructured prompt field.
* Likely to create provider lock-in.
* Likely to produce an unusable “everything object.”
* Likely to require different inheritance rules than the current Look cascade provides.

---

# Required architectural reassessment

## 1. Reassess `Look`

Evaluate whether `Look` should remain:

* A canonical authoritative aggregate.
* A shared envelope.
* A user-facing compiled projection.
* A convenience term in Studio.
* Or a combination of these with a different canonical structure underneath.

Test the current property → production → arc/sequence → scene → shot cascade against:

* Production design.
* Character appearance.
* Cinematography.
* Lighting.
* Color.
* Editing.
* Graphic design.
* Sound.
* Score.
* Print layout.
* Interactive spatial design.

Do not assume every discipline should inherit through the same hierarchy.

Produce explicit inheritance and override rules per discipline.

## 2. Reassess art-style definitions

Determine whether the proposed art-style object should be narrowed and renamed to something such as `RepresentationStyle`.

Assess whether authoritative ownership of the following belongs in style:

* Mood.
* Palette.
* Lighting.
* Composition.
* Camera.
* Grading.
* Editing.
* Sound.
* Music.

Separate intrinsic representation-style traits from defaults, tendencies, bindings, and scene-specific choices.

## 3. Add directorial intent

Assess and define a provider-neutral directorial layer containing, where appropriate:

* Dramatic purpose.
* Point of view.
* Audience alignment.
* Information reveal and concealment.
* Performance objective.
* Behavior and emotional beats.
* Subject hierarchy.
* Blocking and staging.
* Visual distance.
* Coverage rationale.
* Continuity or intentional discontinuity.
* Image-sound relationship.
* Counterpoint.
* Scene rhythm and escalation.

Do not reduce this to a free-text “emotional objective.”

## 4. Separate world canon from production realization

Clarify the distinction among:

* A canonical location.
* A production-specific location realization.
* A physical location candidate.
* A constructed or virtual set.
* A set-dressing plan.
* A floor plan or spatial model.
* A scene deployment.
* A lighting deployment.
* A camera-access plan.
* A continuity state.

Apply equivalent distinctions to:

* Props.
* Costumes.
* Hair and makeup.
* Vehicles.
* Products.
* Signs.
* Graphic elements.
* Character appearance.

## 5. Reassess reference packs

Determine whether `ReferencePack` should remain one envelope with typed profiles or whether additional domain objects are needed.

At minimum evaluate typed packs for:

* Character identity.
* Character appearance.
* Costume, hair, and makeup.
* Location and set.
* Props and objects.
* Representation style.
* Cinematography.
* Lighting.
* Color.
* Graphic and typography.
* Voice and dialogue.
* Soundscape.
* Music and motif.

Avoid duplicating full domain state inside reference packs.

## 6. Reassess generation recipes

Preserve ADR-0015’s accepted provider-neutral boundary.

Propose a clean pipeline such as:

1. Pinned canon and scene state.
2. Bound creative-system revisions.
3. Compiled `ResolvedRealizationSpec`.
4. Canonical `GenerationRecipe`.
5. Noncanonical `ProviderExecutionPlan`.
6. Provider execution.
7. Candidate and provenance.
8. Evaluation.
9. Human exact-version decision.
10. Accepted master and derivatives.

Determine the proper location of:

* Prompt.
* Negative prompt.
* Seed.
* Model.
* LoRA.
* Embedding.
* ControlNet.
* Sampler.
* Scheduler.
* Workflow graph.
* Provider persistent ID.
* Technical LUT.
* Rendering parameters.

These should ordinarily be execution attachments or provenance, not creative authority.

Record and propose remediation for any current code or schema that conflicts with ADR-0015.

## 7. Reassess editing and sequence semantics

Do not model editing as a flat list of transition names.

Define whether Storyworld needs:

* `EditorialIntent`
* `ShotRelation`
* `CutRationale`
* Temporal relation.
* Graphic match.
* Eyeline match.
* Movement match.
* Audio lead or lag.
* Montage function.
* Rhythm and pacing intent.
* Omission or ellipsis.
* Parallel action.
* Associative editing.
* Intentional discontinuity.

Determine the right relationship among Arc Board, Storyboard, timeline, sequence editor, and Review Room.

## 8. Reassess sound and score

Separate:

* Dialogue.
* Voice performance.
* ADR.
* Room tone.
* Ambience.
* Foley.
* Designed effects.
* Environmental sound.
* Subjective sound.
* Transmitted or mediated sound.
* Silence.
* Sonic perspective.
* Spatialization.
* Mix hierarchy.
* Score.
* Diegetic music.
* Nondiegetic music.
* Leitmotifs.
* Musical themes.
* Cue placement.
* Instrumentation.
* Harmony.
* Rhythm.
* Timbre.
* Motif transformation.
* Music rights and performance rights.

Determine which belong to property identity, location identity, production, sequence, scene, cue, track, character, relationship, or arc.

Do not reduce music to emotion-to-instrument mappings.

## 9. Reassess graphic and sequential design

Define the platform concepts needed for:

* Books.
* Picture books.
* Comics.
* Carousels.
* Collectible cards.
* Posters.
* Calendars.
* Workbooks.
* Title cards.
* Captions.
* Subtitles.
* Lower thirds.
* Interface overlays.
* Print packaging.
* Responsive web-story layouts.

Separate:

* Illustration style.
* Graphic identity.
* Typography system.
* Grid.
* Hierarchy.
* Page or panel grammar.
* Text-image relationship.
* Page turn.
* Gutter and closure.
* Safe areas.
* Destination-specific constraints.
* Accessibility requirements.

## 10. Reassess spatial storytelling

Determine what belongs to canonical spatial world structure versus production or runtime realization.

Evaluate concepts such as:

* Containment.
* Adjacency.
* Route.
* Threshold.
* Landmark.
* Access.
* Visibility.
* Sightline.
* Distance.
* Elevation.
* Orientation.
* Spatial zone.
* Movement path.
* Environmental clue.
* Scene blocking.
* Player affordance.
* Runtime navigation mesh.

Do not allow the Narrative Flow Graph profile to define physical-space semantics.

---

# Required Storyworld conceptual model

Test, amend, or replace the following proposed family of creative systems:

```text
CreativeDirection
├── RepresentationStyle
├── VisualIdentitySystem
├── ProductionDesignSystem
├── CharacterAppearanceDesign
├── DirectorialIntent
├── CinematographyPlan
├── LightingPlan
├── CompositionAndBlockingPlan
├── ColorDesign
├── GradeIntent
├── ColorPipeline
├── EditorialDesign
├── GraphicDesignSystem
├── SoundDesignSystem
├── MusicIdentitySystem
└── MediumRealizationProfile
```

The intended relationship is:

```text
Selected accepted revisions
+ pinned canon
+ scene state
+ production and target context
= ResolvedRealizationSpec

ResolvedRealizationSpec
→ GenerationRecipe
→ ProviderExecutionPlan
→ Candidate
→ Evaluation
→ Human decision
→ Accepted master
→ Renditions / adaptations / packages
```

Do not adopt this structure merely because it is supplied here. Test it against the repository, books, professional workflows, and representative Storyworld properties.

For every proposed system, determine whether it should be:

* A first-class canonical object.
* A reusable definition.
* A scoped plan.
* A reference-pack subtype.
* A controlled vocabulary.
* A template configuration.
* A derived compilation artifact.
* A Studio-only projection.
* A provider attachment.
* Or omitted.

Use the standing Storyworld principle:

> Introduce a new generic primitive only when at least two materially different fixtures require the same semantic.

---

# Counterpoint and creative ambiguity

The current proposal’s emotional-register mapping may be too deterministic.

Research and model the possibility that a creative department may:

* Reinforce the scene emotion.
* Contrast with it.
* Withhold expression.
* Destabilize interpretation.
* Evolve gradually.
* Remain ambiguous.
* Represent a character’s perception rather than objective reality.
* Express the audience’s knowledge rather than the character’s knowledge.
* Deliberately contradict another department.

Do not allow Storyworld to infer a universally “correct” lens, palette, light, score, or rhythm from an emotional tag.

Any automated mapping must remain a suggestion, template default, or authored rule subject to override and review.

---

# Required Studio and interface analysis

Determine how the expanded creative model changes Storyworld Studio.

At minimum assess the need for:

* Creative Direction workspace.
* Visual Development workspace.
* Look-development library.
* Production Design workspace.
* Character Appearance workspace.
* Location and Set workspace.
* Storyboard and Shot Inspector.
* Blocking and spatial-planning view.
* Cinematography inspector.
* Lighting inspector.
* Color-script or color-progression view.
* Editorial timeline.
* Sound and music cue lanes.
* Graphic-layout editor or external-editor boundary.
* Exact-version compare views.
* Cross-media annotation inspector.
* Reference-pack builder.
* Resolved-realization inspector.
* Provider execution inspector.
* Department-specific review queues.
* Department-specific findings and approvals.

Respect current Studio principles:

* Engine state remains authoritative.
* A view or canvas is not authority.
* Comments are not decisions.
* Generated candidates are not accepted masters.
* Package creation is not publication.
* Exact versions and consequences must remain visible.
* Complex visual interfaces require structured and accessible equivalents.

---

# Cross-media annotation requirement

Produce a proposed provider-neutral `AnnotationTarget` model capable of binding annotations to exact versions of:

* Whole assets.
* Image points.
* Rectangles.
* Polygons.
* Masks.
* Layers.
* Document ranges.
* Semantic document blocks.
* Video frames.
* Video intervals.
* Audio intervals.
* Tracks.
* Stems.
* Frequency regions where justified.
* Shots.
* Panels.
* Cuts.
* Transitions.
* Storyboard frames.
* Graph nodes and edges.
* Timeline events.
* Spatial positions and regions.
* Graphic and typographic elements.
* Color samples or grade regions.

Annotations must not become approvals by implication.

State which annotation types are universal and which remain medium-specific renderers over a common target model.

---

# Evaluation and continuity requirements

Expand the proposed evaluation architecture beyond generic “style similarity.”

Create a professional evaluation taxonomy that distinguishes:

* Structural validity.
* Technical media validity.
* Canon and state continuity.
* Character identity.
* Character appearance.
* Costume, hair, and makeup continuity.
* Location and set continuity.
* Prop and object continuity.
* Spatial geography.
* Blocking and staging.
* Screen direction.
* Eyeline.
* Coverage completeness.
* Cinematography intent.
* Lighting intent and continuity.
* Composition.
* Color design.
* Shot matching and grade.
* Editorial rhythm and shot relation.
* Graphic hierarchy and typography.
* Accessibility and legibility.
* Dialogue perspective.
* Room tone and ambience continuity.
* Sound-image synchronization.
* Sonic perspective.
* Musical motif continuity.
* Score placement.
* Medium and destination conformance.
* Rights, consent, attribution, and disclosure.

For every evaluation layer, state:

* What can be deterministic.
* What can be measured but not judged automatically.
* What may use model assistance.
* What requires a qualified human reviewer.
* What may block.
* What may only create a finding.
* What evidence is required.
* What a waiver must contain.
* What changes invalidate which approvals.

Do not claim objective measurement for inherently interpretive judgments.

---

# Required fixture and validation corpus

Design a rights-safe creative-media fixture program.

Include paired or controlled examples in which one factor changes while the others remain fixed:

* Same set, different camera.
* Same camera, different lens.
* Same camera plan, different lighting.
* Same lighting, different color grade.
* Same palette, different composition.
* Same art style, different production design.
* Same character identity, valid appearance evolution.
* Same character identity, invalid identity drift.
* Correct and incorrect costume continuity.
* Correct and incorrect prop-state continuity.
* Correct and broken eyelines.
* Correct and broken screen direction.
* Adequate and inadequate coverage.
* Same shots, different editing rhythm.
* Same image, different sound perspective.
* Same sequence, reinforcing versus contrapuntal score.
* Correct and incorrect leitmotif transformation.
* Legible and illegible typography.
* Correct and broken page, panel, or carousel hierarchy.
* Same canonical scene realized as photography, illustration, animation, audio, print, and interactive content.
* Provider replacement preserving canonical intent.
* Prompt changes that do not change canonical intent.
* Provider-specific settings incorrectly leaking into canonical data.

Each fixture must name:

* The semantic being tested.
* The accepted source specifications.
* The expected invariant.
* The permissible variation.
* The intentional difference.
* The defect to inject.
* The owning evaluation layer.
* The expected finding.
* The required human judgment.
* The exact asset and specification versions.

---

# Required deliverables

Produce the smallest coherent artifact set that fully supports owner review.

At minimum, create or propose the following within the existing intake structure.

## Assessment package

Create a creative-media foundation assessment under the appropriate intake assessment location, containing:

1. Executive conclusion.
2. Repository findings.
3. Book-research method.
4. Existing model strengths.
5. Identified collapsed concepts.
6. Missing disciplines.
7. Redundant proposed concepts.
8. Provider-neutrality risks.
9. Revised creative-system architecture.
10. Studio implications.
11. Evaluation implications.
12. Fixture implications.
13. Decision recommendations.
14. Deferred specialist areas.
15. Explicit non-adoptions.

## Production-design ontology

Create a structured ontology or domain-definition artifact covering:

* Every creative discipline.
* Definitions.
* Boundaries.
* Scope.
* Lifecycle.
* Inheritance.
* Relationships.
* Authority.
* Evidence.
* Review.
* Evaluation.
* Export behavior.
* Provider-execution boundary.

Include a crosswalk from professional production terminology to Storyworld terminology.

## Controlled vocabulary register

Propose versioned vocabularies for the disciplines that genuinely require them, including definitions and applicability.

Do not turn every book term into a platform enumeration.

For each term, classify it as:

* Core.
* Extensible controlled vocabulary.
* Template vocabulary.
* Reference guidance.
* Derived technical parameter.
* Provider-specific.
* Rejected.

## Decision amendments

At minimum, prepare amendments or successor drafts for:

* DEC-0031.
* DEC-0033.

Assess whether DEC-0032 requires bounded amendments for graphic, print, panel, page, audio, or sequential grammars.

Create a separate new draft decision only when the issue is independently ratifiable and would make DEC-0033 unreasonably broad.

Potential independent decisions include:

* Creative Direction and realization-system architecture.
* Provider execution versus canonical generation recipe.
* Cross-media annotation target.
* Professional creative evaluation taxonomy.
* Spatial realization boundary.

Do not create unnecessary decision proliferation.

## Canonical impact-map amendment

Update the staged impact map to identify:

* Canonical dossier sections affected.
* Contract-pack implications.
* New research artifacts.
* New controlled vocabularies.
* New future schemas.
* New fixtures.
* New Studio surfaces.
* New risks and open questions.
* Supersession requirements.
* Which changes await owner decisions.
* Which implementation work remains deferred.

## Intake manifest amendment

Update `project-dossier-intake/readme.md` so every new artifact has:

* Class.
* Status.
* Disposition target.
* Gating decision.
* Dependencies.
* Intended canonical destination.
* Archival handling.

## Current-state discrepancy record

Record the mismatch among:

* ADR-0015.
* The formal generation-recipe schema.
* The current provider recipe compiler.
* The current Generation Workbench.

State precisely:

* What is accepted target behavior.
* What is current alpha behavior.
* Why the alpha behavior is not the permanent architecture.
* Whether immediate containment is needed.
* What future task or finding should resolve it.

## Implementation implications

Produce a dependency-ordered implementation plan, but do not implement it.

At minimum sequence:

1. Decision and vocabulary ratification.
2. Shared creative-specification envelope.
3. Resolved-realization contract.
4. Provider-execution separation.
5. Reference-pack typing.
6. Directorial and shot-planning semantics.
7. Annotation target.
8. Evaluation taxonomy.
9. Fixture corpus.
10. Studio surfaces.
11. Medium-specific templates.
12. Provider adapters and external-editor round trips.

---

# Required research format per book

For every book used, create a concise structured record containing:

* Full bibliographic information.
* Discipline.
* Why it is relevant to Storyworld.
* Five to fifteen foundational concepts.
* Existing Storyworld concepts it supports.
* Existing Storyworld concepts it challenges.
* Concepts that should become platform semantics.
* Concepts that belong only in templates.
* Concepts that belong only in professional guidance.
* Concepts that are provider-specific or implementation-specific.
* Overlap with other books.
* Disagreements or competing frameworks.
* Proposed repository artifacts.
* Counterexample fixtures.
* Explicit non-adoptions.
* Source page or chapter references.
* Research limitations.

Do not create chapter-by-chapter book summaries unless a chapter directly changes a Storyworld decision.

---

# Required classification of books

Place every researched book into exactly one primary class:

## Permanent platform-foundation library

Use only when the book supplies durable cross-media principles that affect Storyworld’s ontology, contracts, authority, interfaces, or evaluation model.

## Production-design or media-language reference shelf

Use when the book supplies stable professional vocabulary or workflows that several Storyworld media types will reuse but that should not all become core schema.

## Medium- or template-specific specialist shelf

Use when the book primarily informs film, photography, animation, comics, picture books, games, print, sound postproduction, scoring, or another specific realization.

## Later implementation-stage reference

Use when the book becomes valuable only when a subsystem such as grading, dialogue editing, lighting control, virtual production, or VFX is being built.

Explain why every book is placed where it is.

---

# Quality standards

The work is complete only when:

* The revised architecture is more precise than the existing proposal, not merely longer.
* Art style, production design, cinematography, lighting, color, editing, sound, score, and provider controls are no longer ambiguously collapsed.
* Every proposed first-class object has at least two materially different fixture needs.
* Every rejected object has a documented alternative home.
* Inheritance and override behavior is explicit.
* Provider-specific data cannot silently become canonical authority.
* Prompt strings are not treated as permanent creative specifications.
* Evaluation layers name their authority and limitations.
* The proposed Studio model preserves exact-version and human-decision semantics.
* The artifact set has one clear source direction and no competing canonical copies.
* The impact map accounts for every accepted recommendation.
* The work distinguishes current implementation, intended architecture, and unratified proposal.
* The owner can accept, amend, defer, or reject each major design choice independently.
* Repository validation passes after any staged metadata or manifest changes.

Run the repository’s required refresh and validation commands after editing staged intake metadata or governed registries, as appropriate. Do not claim success without recording the exact validation performed and its result.

---

# Adversarial review

Before completing the package, conduct a focused adversarial review.

Attempt to break the proposed model with at least these cases:

1. A photographic property with no motion, editing, or score.
2. An audio drama with no visual Look.
3. An ambience production with place and sound but almost no plot.
4. A picture book in which page turn and text-image relation carry the story.
5. A comic whose gutter and panel rhythm determine time.
6. A film scene using warm color and cheerful music as intentional counterpoint to grief.
7. A black-and-white film with a rich production-color design hidden by the final realization.
8. A scene whose location is canonically identical across live action, animation, and game realization.
9. A character whose canonical identity is stable but whose costume, age, hair, makeup, and rendering style change.
10. An adaptation with a new visual identity but the same source canon.
11. A transmedia property whose album, book, and game reveal different canon fragments.
12. A provider swap that changes prompts and execution controls but must not migrate canonical creative data.
13. A print rendition requiring a different layout and grade while preserving illustration identity.
14. A silent sequence in which sound absence is explicitly authored.
15. A score that intentionally avoids the expected character motif.
16. A spatially impossible generated scene that looks stylistically correct.
17. A visually consistent sequence with broken eyelines or screen direction.
18. A technically correct image that violates production design.
19. A perfectly matched character image with invalid costume chronology.
20. A work in a future medium not represented by any current provider.

Revise the model where these cases reveal ambiguity, coupling, or missing semantics.

---

# Final response expected from the team

Return:

1. A concise executive finding.
2. A file-by-file inventory of additions and amendments.
3. The revised creative-system architecture.
4. The recommended disposition of DEC-0031, DEC-0032, and DEC-0033.
5. Any additional draft decisions required.
6. The current implementation discrepancy report.
7. The controlled-vocabulary plan.
8. The proposed schema and contract backlog.
9. The fixture and evaluation plan.
10. The Studio-interface implications.
11. The dependency-ordered implementation plan.
12. The list of books classified by shelf.
13. The concepts explicitly rejected.
14. Validation evidence.
15. The owner decisions still required.

Do not close the intake, accept the decisions, integrate into canonical authority, or begin production implementation without explicit owner authorization.
