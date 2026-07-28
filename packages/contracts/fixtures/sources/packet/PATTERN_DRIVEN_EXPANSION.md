# Yes—the next expansion should be pattern-driven, not genre-driven

The current portfolio is already strong across **fiction, editorial, interactive, commerce, collectible formats, structured lessons, and rule-bound speculative drama**. What it does not yet prove is that Storyworld can survive radically different **narrative topologies, truth models, timelines, derivation structures, authority arrangements, and change lifecycles**.

That distinction matters. Ten mysteries do not test flexibility as well as one mystery, one branching story, one adaptation, one shared universe, one corrected documentary, and one rights-revocation case.

The accepted contract charter currently makes Stillhouse, the editorial carousel, BeKindRewind, and Commerce Foundry the four F1 fixtures, with Field Manual and Dumpster Fire Friends already identified for post-F1 coverage.  Your expanded packet adds valuable breadth, but most of the properties remain fundamentally:

* Curated rather than audience-directed.
* Linear rather than branching.
* Single-canon rather than adaptation-based.
* Single-language and single-region.
* Short-form rather than deeply hierarchical.
* Based on stable rights and sources rather than changing or revoked ones.

The underlying domain model already claims support for configurable narrative hierarchies, canon branches, choices, triggers, experiments, variants, retcons, secret truths, audience-visible facts, and character beliefs.   The next fixtures should prove those claims.

---

# 1. Patterns that should be tested before the F1 model is considered broadly flexible

These do not all need polished campaigns. They can be compact **contract probes**—roughly half a page to two pages each—with one valid package and one intentionally invalid package.

## A. Branching and reconvergent narrative

**What is missing:** BeKindRewind currently proves a dependency chain, but not a genuine choice graph with mutually exclusive outcomes.

**Minimal fixture shape:**

* One opening scene.
* One consequential choice with two branches.
* One branch gives the protagonist a key; the other destroys the key.
* Two branch-specific scenes.
* A later reconvergence point.
* One dialogue line that changes according to the chosen branch.
* One ending available only when a branch-local prerequisite is satisfied.

**Must test:**

* Branch-local state.
* Mutually exclusive facts.
* Choice prerequisites and effects.
* Reconvergence without flattening branch history.
* Unreachable-node detection.
* Circular-dependency detection.
* Whether a choice is canonical to the authored work while the individual player’s choice remains runtime state.

**Planned rejection:** A compiled package incorrectly gives the player both the intact key and the destroyed-key state.

This is probably the single most important missing core fixture because `Choice`, preconditions, and effects already exist in the proposed model but have not been substantively exercised.

---

## B. Multiple points of view and contested truth

**What is missing:** Stillhouse and The Lanterns test creator truth and false belief, but not several narrators making contradictory claims about the same event.

**Minimal fixture shape:**

Three people describe one incident:

* Narrator A is honest but mistaken.
* Narrator B knows the truth but deliberately lies.
* Narrator C saw only part of the event and marks uncertainty.
* A mechanical record contradicts one detail but cannot resolve the entire event.
* Creator truth remains separately recorded.

**Must test:**

* A source assertion versus an accepted canon fact.
* Speaker knowledge at the moment of testimony.
* Honesty versus accuracy.
* Reliability and uncertainty.
* POV-specific visibility.
* Whether a narrator is allowed to reveal something in one edition but not another.
* The difference among “the character said this,” “the character believes this,” and “this is true.”

**Planned rejection:** A character’s testimony is automatically promoted to hard canon simply because it appears in dialogue.

This fixture may reveal that Storyworld needs an explicit, reusable **Assertion** or **Testimony** concept rather than forcing every statement into `CanonFact`.

---

## C. Nonlinear chronology

**What is missing:** The fixtures include chronology, but they do not strongly separate story order from presentation order.

**Minimal fixture shape:**

* Four events occur in story order: A → B → C → D.
* The audience encounters them in release order: C → A → D → B.
* Scene C contains an object whose state depends on B.
* Scene A is revised after C is already approved.
* One event is shown twice from different temporal perspectives.

**Must test:**

* Story time.
* Narrative or presentation order.
* Publication time.
* Revision time.
* Flashback and flash-forward markers.
* State computation based on story time rather than carousel, chapter, or release position.
* Spoiler calculations for out-of-order releases.

**Planned rejection:** The system determines that the object is undamaged in Scene C merely because Scene B appears later in release order.

The continuity model already expects a branch, story-time coordinate, entity states, audience knowledge, and active dependencies to be pinned together.  This fixture proves that those coordinates are not being conflated.

---

## D. Alternate canon and adaptation branches

**What is missing:** Several existing properties create derivatives, but none fully proves that an adaptation can deliberately differ from source canon without rewriting it.

**Minimal fixture shape:**

One short source story produces:

* A graphic-novel adaptation.
* An audio-drama adaptation.
* A youth-audience adaptation.

The audio version combines two minor characters for performance economy. The youth version moves the story from winter to summer. Neither change is allowed to alter the source branch.

**Must test:**

* Branch ancestry.
* Inherited canon.
* Production-local facts.
* Explicit overrides.
* Adaptation-only character composites.
* Approved omissions.
* Source-to-adaptation lineage.
* Impact analysis when source canon later changes.
* Whether an adaptation remains pinned to an older canon release.

**Planned rejection:** Accepting the summer setting in the youth adaptation silently changes the source story and the audio adaptation.

This should also test the distinction between:

* Retconning a property.
* Forking an alternate canon.
* Adapting a property.
* Making a production-local simplification.

Those must not be treated as equivalent operations.

---

## E. Shared universe and cross-property canon reuse

**What is missing:** Storyworld currently treats `Property` as the major canon root. A shared universe exposes whether that boundary is sufficient.

**Minimal fixture shape:**

* Three separate story properties occur in the fictional city of Northbridge.
* They share one train station, one historical event, and one minor recurring character.
* Each property has its own tone and production schedule.
* One property wants to damage the shared train station.
* Another property is still producing a story set before the damage.
* The shared character has different production-local wardrobe and age states.

**Must test:**

* Shared canon ownership.
* Version-pinned cross-property references.
* Whether shared entities are copied or referenced.
* Authority to alter shared facts.
* Cross-property impact analysis.
* Time-scoped shared location states.
* Whether a consuming property can deliberately fork a shared entity.

**Planned rejection:** One production changes the shared station’s name inside its own property and the change silently propagates to every other property.

This fixture should force an explicit architectural decision:

1. A shared universe is itself one parent `Property`, with multiple productions and series beneath it; or
2. Storyworld supports a versioned `CanonModule` or `PropertyDependency`.

Arbitrary cross-property database references would be the weakest solution because they create invisible coupling.

---

## F. Deep long-form hierarchy

**What is missing:** Current fixtures are short enough that a supposedly flexible hierarchy could still be accidentally optimized around season → episode → scene or campaign → post → panel.

**Minimal fixture shape:**

```text
Book
├── Part I
│   ├── Chapter 1
│   │   ├── Scene 1
│   │   └── Scene 2
│   └── Chapter 2
├── Interlude
└── Part II
    └── Chapter 3
```

Add:

* A promise introduced in Chapter 1 and paid off in Chapter 3.
* A recurring object with three state changes.
* An interlude outside the main narrator’s POV.
* A new chapter inserted between two approved chapters.
* Chapter numbering that changes while stable identities remain unchanged.

**Must test:**

* Arbitrary hierarchy depth.
* Stable IDs independent of display numbering.
* Thread and promise tracking over long spans.
* Context summarization and scene-state compilation.
* Partial production approval.
* Reordering without deleting lineage.
* Rolling canon and continuity reports.

**Planned rejection:** Inserting Chapter 2A changes the stable IDs of every later chapter or causes an unresolved promise to lose its originating reference.

The domain model explicitly says `NarrativeUnit` is hierarchical and configurable across books, campaigns, seasons, and worlds.  This needs a real deep-hierarchy probe rather than only shallow examples.

---

## G. Evidence-based nonfiction and post-publication correction

**What is missing:** The editorial fixtures test private-source separation, but not rigorous factual publishing with disputed sources, uncertainty, corrections, and retractions.

The fixture can remain entirely fictional while modeling documentary behavior.

**Minimal fixture shape:**

* A fictional local-history article makes five factual claims.
* Three source records support those claims.
* Two sources disagree about a date.
* One quote has limited excerpt permission.
* One claim is marked probable rather than certain.
* After publication, a newly discovered record changes the date.
* A correction notice is issued without deleting the original publication record.

**Must test:**

* Claims linked to evidence.
* Conflicting sources.
* Confidence and uncertainty.
* Quote and excerpt rights.
* Fact-check approval.
* Correction, clarification, and retraction as different actions.
* Published-version preservation.
* Downstream derivative invalidation.
* Public correction notices.

**Planned rejection:** A generated caption states the disputed date as certain or continues using the superseded date after the correction.

This pattern is materially different from creator truth in fiction. It asks not merely “what is canon?” but “what can we responsibly assert given the available evidence?”

---

## H. Rights expiry, withdrawal, and replacement

**What is missing:** The current fixtures contain rights metadata, but mostly assume the rights remain valid.

**Minimal fixture shape:**

* An approved audio scene uses a fictional performer’s voice under a one-year license.
* A photograph is licensed for social media but not print.
* A music cue is permitted in the United States but not internationally.
* The voice permission is later withdrawn for future use.
* A scheduled package must be blocked.
* A replacement performance is created.
* Previously published records remain historically accurate rather than being silently erased.

**Must test:**

* Territory, channel, purpose, and duration.
* Rights expiry.
* Consent withdrawal.
* Selective invalidation of affected renditions.
* Approval invalidation after replacement.
* Reissuance of packages.
* Preservation of historical publication receipts.
* Whether source assets are excluded from providers after revocation.

**Planned rejection:** A scheduled Reel remains publishable because the creative master was approved before the voice license expired.

This is one of the best ways to prove that rights are operational constraints rather than decorative metadata.

---

# 2. Patterns that should become full post-F1 fixtures

These are important, but most can wait until the core contracts round-trip.

## I. Localization and accessibility variants

One accepted master should produce:

* English and Spanish transcreations.
* Captions.
* A transcript.
* Audio description.
* Alt text.
* A simplified-reading version.
* A high-contrast visual rendition.
* Locale-specific on-screen signage.

The fixture should verify that localization can change idiom and presentation without changing world facts, approved claims, disclosures, or character identity.

**Planned rejection:** The translated Commerce caption turns an approved descriptive statement into a stronger prohibited claim.

This should normally be modeled as rendition and locale data—not a new canon branch—unless the adaptation deliberately changes story content.

---

## J. Audio-first temporal narrative

Use a short fictional audio drama or narrative podcast episode with:

* Multiple speakers.
* Voice profiles.
* Dialogue overlap.
* Music and sound-effect cues.
* Silence as an authored beat.
* Timecodes.
* Transcript and captions.
* Alternate-language dub.
* Voice and music rights.
* A focused replacement of one line without rerendering the whole episode.

This tests temporal assets, speaker identity, sound-state continuity, timing, voice consent, and exact-region revision in a way that still images cannot.

It could derive from the adaptation fixture, but it should still have its own end-to-end package and acceptance test.

---

## K. Audience-directed serialized narrative

A fictional audience poll chooses between two **pre-approved** next episodes.

**Must distinguish:**

* Audience input.
* Moderation.
* Poll close time.
* Winning result.
* Proposed branch.
* Human authorization.
* Accepted canon.
* Non-winning alternate material.
* Spoiler management.
* What happens if the platform result is incomplete or manipulated.

**Planned rejection:** The poll result automatically publishes a canon change without a human decision.

Stillhouse already anticipates audience participation, but audience participation is not the same as audience authority.

---

## L. Conversational character or NPC

A conversational runtime should receive an immutable Storyworld character package containing:

* Voice and vocabulary.
* Known facts.
* False beliefs.
* Secrets the character may never reveal.
* Relationship-state-dependent dialogue.
* Safe fallback behavior.
* Prohibited topics or claims.
* Session-memory policy.
* Clear separation between character memory, player-session memory, and accepted canon.

**Planned rejection:** The character reveals creator-only truth, remembers another player’s interaction, or converts improvised dialogue into canon.

Storyworld should own the authored persona, knowledge boundaries, reference assets, and dialogue policy. The conversational runtime should own live session execution and player-specific state.

---

## M. Governed variant and experiment

The repository already anticipates adaptive experiments, including explicit hypotheses, approved variation ranges, stopping criteria, and human review. It also correctly places individualized psychological targeting outside ordinary scope.

A safe fixture could test:

* Two approved opening panels.
* One fixed story body.
* A declared hypothesis.
* A randomized audience allocation.
* Canon-invariant fields.
* Explicitly variable fields.
* A fixed experiment window.
* A small-sample uncertainty warning.
* A human decision about whether to adopt either variant.

**Planned rejection:** The highest-performing variant silently becomes the new default or changes accepted canon.

Early variants should be low-risk and consent-compatible: format, reading level, locale, accessibility treatment, opening composition, or approved CTA—not hidden psychological profiling.

---

## N. Persistent branded universe and multi-product commerce

The current Commerce fixture proves one product and one rejection. A mature Storyworld–Commerce Foundry relationship should also test a long-lived brand narrative.

**Minimal fixture shape:**

* One fictional brand world.
* Three products.
* Two recurring fictional characters.
* Three campaigns over different catalog versions.
* One discontinued SKU.
* One packaging revision.
* One withdrawn claim.
* One bundle containing multiple products.
* One campaign that remains valid after the claim withdrawal because it never used that claim.
* Another campaign that becomes stale and requires revision.

**Must test:**

* Product snapshots across time.
* Cross-campaign narrative continuity.
* Multiple placement contracts in one scene.
* Selective source-drift invalidation.
* Product availability and offer windows.
* Persistent characters and locations owned by Storyworld.
* Product and claim authority retained by Commerce Foundry.

**Planned rejection:** A later episode displays current packaging but reuses an obsolete claim from the earlier campaign.

This is probably the most important Commerce-specific post-F1 fixture.

---

## O. Collaborative authorship, contribution, and branch merge

The Studio design already anticipates proposals, version comparison, branch/merge, guest review, delegation, and a firm distinction between comments, proposals, accepted canon, and approvals.  Those collaboration semantics should be tested.

**Minimal fixture shape:**

* Writer A proposes that a character leaves town.
* Writer B proposes that the character remains but changes allegiance.
* Both proposals modify the same relationship and scene.
* An editor accepts part of each.
* A rights reviewer blocks one imported image.
* A guest commenter can annotate but cannot approve.
* The merged result creates a new canon release.

**Planned rejection:** A comment, guest edit, or AI proposal changes accepted canon without the correct authority.

A later extension can add fictional community submissions with contributor permission, attribution, moderation, revocation, and explicit non-canon status.

---

# 3. Additional conditional patterns worth keeping in the backlog

These are useful but should not delay the core:

| Pattern                                     | Distinct capability tested                                                                                                              |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Procedural episodic series**              | Rules and templates generate many episode instances while deterministic seeds, allowed variation, and canon invariants remain auditable |
| **Curriculum and learning pathway**         | Learning objectives, prerequisites, assessments, instructor-only answers, age/reading-level variants, and learner privacy               |
| **Live event or time-window narrative**     | Embargoes, time zones, cancellation branches, scheduled reveals, contingency releases, and stale real-world conditions                  |
| **Regional or age-rated cuts**              | Territory-specific rights, content classification, alternate edits, warnings, and release approval                                      |
| **Generational saga**                       | Aging, inheritance, relationship evolution, long temporal gaps, and entity continuity across decades                                    |
| **Simulation schedule**                     | Authored NPC schedules and world-state rules exported to a runtime without importing live player or simulation state back into canon    |
| **Concept album or visual-album narrative** | Track order, recurring lyrical and musical motifs, cover art, videos, performance rights, and cross-media release dependencies          |

These should be added only when the associated product direction becomes real.

---

# 4. Add transformation tests, not only more stories

The strongest flexibility proof is a **metamorphic test suite**: take accepted content, transform it, and verify that the right things change while the right things remain invariant.

Recommended transformations include:

| Transformation            | Required invariant                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------- |
| Reorder release units     | Story chronology and object state remain correct                                   |
| Insert a chapter          | Stable IDs, approvals, and thread references survive                               |
| Fork an adaptation        | Source canon remains unchanged                                                     |
| Merge two proposals       | Only authorized, explicitly resolved changes enter canon                           |
| Localize a rendition      | Facts, approved claims, and disclosure obligations remain intact                   |
| Add audio description     | The described master version is exact and traceable                                |
| Revoke a right            | Only affected assets, packages, and future uses are invalidated                    |
| Correct a factual claim   | Prior publication records remain preserved and superseded                          |
| Change a product snapshot | Stale placements are identified selectively                                        |
| Run an experiment         | Observations produce a proposal, never an automatic canon change                   |
| Replace a provider        | Canonical recipes and accepted meaning remain provider-neutral                     |
| Export and re-import      | IDs, hashes, branches, lineage, rights, and approvals round-trip deterministically |

These tests will reveal accidental assumptions much faster than continually adding unrelated campaigns.

---

# 5. How to add this without creating fixture sprawl

I would introduce a new charter category:

```text
golden_fixtures
schema_probes
workflow_probes
integration_slices
metamorphic_tests
```

A **schema probe** should be tiny. It does not need finished images, captions, or publishing assets. It needs:

1. A minimal valid record set.
2. One intentionally invalid variant.
3. The expected validation finding.
4. A deterministic export/import assertion.
5. A statement of what must remain in the generic core.
6. A statement of what belongs only in a template, policy pack, or adapter.

The accepted charter now owns its fixture enumerations and says changes flow through ADRs and supersession, so these additions should be recorded deliberately rather than appended informally.

Most importantly, do not create a new storage model for every pattern. The repository’s existing principle is correct: templates should configure vocabulary, hierarchy labels, required fields, rules, rubrics, and exports without forking storage.

A useful decision rule is:

> Add a new generic primitive only when at least two materially different fixtures require the same semantic and the need cannot be represented cleanly through existing facts, entities, state transitions, branches, narrative units, sources, rights, derivations, reviews, and packages.

# Recommended priority

Before treating F1 contracts as broadly extensible, I would add these eight compact probes:

1. Branching and reconvergence.
2. Multiple POVs and contested truth.
3. Nonlinear chronology.
4. Adaptation branches.
5. Shared-universe dependencies.
6. Deep long-form hierarchy.
7. Evidence, correction, and retraction.
8. Rights expiry and withdrawal.

Then promote these to full post-F1 fixtures:

1. Localization and accessibility.
2. Audio-first narrative.
3. Audience-directed serialization.
4. Conversational NPC export.
5. Governed variants and experiments.
6. Persistent multi-product brand narrative.
7. Collaborative branch-and-merge workflow.

That portfolio would test not just whether Storyworld can hold many kinds of content, but whether it can remain coherent when truth is disputed, time is nonlinear, narratives branch, canon is reused, adaptations diverge, rights change, audiences participate, and approved work is transformed across media.
