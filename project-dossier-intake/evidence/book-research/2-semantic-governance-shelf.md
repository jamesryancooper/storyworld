# Verdict

**The previously identified books cover Storyworld’s creative and narrative foundations very well, but they do not cover every foundation the revised platform now needs.**

The latest intake update is important less because it radically changed the underlying proposals and more because it converted them into a formal ratification program: a manifest, a blocking owner questionnaire, a canonical impact map, and draft decisions DEC-0029 through DEC-0039. The intake remains staged and non-authoritative until those decisions are reviewed, accepted or amended, integrated, validated, and archived.

That changes the reading question. Storyworld no longer merely needs books that help people **write and produce stories**. It now needs books capable of stress-testing decisions about:

* Narrative classification and ontology.
* Storyworlds expressed across media.
* Adaptation, derivation, and complementary transmedia canon.
* Multiple kinds of time, revision, and retcon.
* Canonical structured documents.
* Graph, matrix, timeline, and spatial interfaces.
* Sensitive-source handling and narrative ethics.
* Localization and transcreation.
* Children’s media and conversational-character safety.
* Accessibility, system safety, and security.
* Research evidence, correction, and fact-checking.
* Production-design semantics.

The earlier list covers roughly the **creative core**. A focused second shelf is needed for the **semantic, informational, sociotechnical, and governance core**.

# What the revised intake newly exposes

Several additions are particularly consequential.

DEC-0030 proposes making the intake’s twelve-dimensional taxonomy the canonical classification grammar for the platform—not merely a writing aid. DEC-0034 then adds nested diegetic levels, in-fiction parallel timelines and loops, retcon lifecycles, complementary transmedia canon, and governed community contributions.

The owner questionnaire also exposes foundational questions that the earlier reading shelf did not fully address:

* What is the smallest independently versioned narrative unit?
* What must the canonical `StoryDocument` contain?
* How should narrative, spatial, truth, state, branch, lineage, rights, and release graphs differ?
* How should semantic three-way merging work?
* Which media annotations share one model?
* How should restricted sources participate in search?
* Which authoring and approval actions must remain accessible on mobile and to assistive technologies?
* Where does customization stop being a template and become an extension?

The technical assessment reaches the same conclusion from the implementation side. Storyworld’s authority architecture is already strong, but it still lacks six bounded substrates: a generated Studio client, canonical `StoryDocument`, `GraphViewProfile`, cross-media `AnnotationTarget`, media-processing/proxy pipeline, and scalable search and complex-interface infrastructure.

Those are the areas where the previous book list needs reinforcement.

# The essential second foundation shelf

## 1. *The Discipline of Organizing* — Robert J. Glushko, editor

**Priority: essential before accepting DEC-0030.**

This is probably the single most important addition.

The earlier recommendation, *Semantic Web for the Working Ontologist*, helps with formal knowledge representation. But Storyworld’s problem is broader: it must identify resources, describe and classify them, design the interactions through which people retrieve and manipulate them, and maintain those resources and classifications over time.

*The Discipline of Organizing* presents the concept of an “organizing system” and unifies information organization with information retrieval. That is almost exactly the level at which Storyworld’s taxonomy, property library, templates, source records, narrative units, assets, renditions, releases, and search system need to be considered. ([MIT Press][1])

It should help Storyworld distinguish among:

* A taxonomic dimension.
* A controlled vocabulary.
* A facet.
* A type.
* A role.
* A state.
* A relationship.
* A template configuration.
* A user-facing label.
* A derived search projection.

That distinction is critical because the current taxonomy contains excellent material, but some dimensions could still be misinterpreted as core entity types when they should be facets or template vocabulary.

**Expected repository output:** a taxonomy design memo that classifies every proposed taxonomy term as core semantic, controlled vocabulary, template option, validator input, adaptor configuration, or presentation label.

---

## 2. *Transmedial Narratology and Contemporary Media Culture* — Jan-Noël Thon

**Priority: essential before accepting DEC-0030 and DEC-0034 unchanged.**

Abbott gives Storyworld general narratology. Wolf explains imaginary worlds. Jenkins explains convergence and participatory culture. But none of those alone provides a sufficiently precise framework for asking how a storyworld, narrator, character subjectivity, or event is represented differently in prose, film, comics, and games.

Thon’s book explicitly develops a media-conscious transmedial narratology around storyworld construction, narrators, subjective representation, and medium-specific expression across film, comics, and games. ([University of Nebraska Press][2])

This is especially important for the proposed distinctions among:

* Canonical event and representation of that event.
* Storyworld fact and medium-specific presentation.
* Narrator and focalizer.
* Character perception and creator truth.
* In-world document and the events asserted within that document.
* An event depicted differently across media without becoming two events.
* Audience knowledge derived from different channel subsets.

It directly strengthens the five new patterns—especially nested diegesis and complementary transmedia canon.

**Expected repository output:** a “transmedial identity” model defining what remains invariant when the same storyworld material moves between media and what may legitimately change.

---

## 3. *A Theory of Adaptation*, second edition — Linda Hutcheon

**Priority: essential before locking the derivation/adaptation/transmedia distinction.**

The intake’s three-way distinction is one of its strongest conceptual advances:

1. Derivation.
2. Adaptation.
3. Complementary transmedia canon.

But it deserves more pressure-testing before becoming governing language.

Hutcheon treats adaptation as both a product and a process, examines different modes of audience engagement, and covers adaptation across literature, film, games, music, digital media, and transmedia environments. ([Routledge][3])

This would help Storyworld answer questions such as:

* How much divergence can occur before a rendition becomes an adaptation?
* Is an abridged youth edition a rendition, adaptation, or branch?
* Is a dramatized audiobook an audio rendition or a new adaptation?
* Does changing narrator or point of view create an adaptation?
* Are composites, omissions, reordered events, or changed endings production-local overrides or adaptation canon?
* When does fan transformation become an independent work rather than a contribution to the source property?

**Expected repository output:** a formal transformation matrix covering rendition, translation, transcreation, derivation, abridgment, adaptation, alternate canon, retcon, reboot, and complementary transmedia extension.

---

## 4. *Time and Relational Theory*, second edition — C. J. Date, Hugh Darwen, and Nikos Lorentzos

**Priority: essential before expanding timeline, retcon, loop, and historical-query contracts.**

Storyworld has more kinds of time than most software:

* Story time.
* Presentation order.
* Publication time.
* Revision time.
* Canon-validity interval.
* Character-relative knowledge time.
* Branch- or timeline-relative time.
* Embargo windows.
* Rights-validity periods.
* Runtime session time.
* System-recorded transaction time.

The new pattern proposals add timelines, iterations, loops, prequels constrained by future canon, and retcons. The questionnaire also asks about permanently pinned older releases and historical search.

*Time and Relational Theory* provides rigorous treatment of temporal propositions, intervals, valid time, transaction time, temporal constraints, bitemporal structures, and temporal queries. ([Elsevier Shop][4])

It should **not** define Storyworld’s narrative theory. Its role is narrower and crucial: ensuring that the database representation of temporal claims does not confuse:

* “This was true in the fictional world during 1984.”
* “Storyworld accepted this as canon in 2026.”
* “The audience learned it in episode six.”
* “It was later retconned.”
* “This adaptation remains pinned to the older version.”
* “The original published episode must remain historically reconstructable.”

**Expected repository output:** a temporal-coordinate ADR separating narrative time from database-validity and transaction time, with explicit interval and supersession rules.

---

## 5. *Designing Connected Content* — Carrie Hane and Mike Atherton

**Priority: essential before the canonical `StoryDocument` ADR.**

The technical assessment correctly says that no rich-text editor’s private JSON representation should become Storyworld’s permanent contract. A canonical document model must precede editor selection.

*Designing Connected Content* moves from subject-domain research to domain models and then to structured content models that can be reused across products and channels. ([Pearson][5])

This can help define a `StoryDocument` that supports:

* Prose.
* Dialogue.
* Script blocks.
* Images and media references.
* Entity mentions.
* Footnotes and citations.
* Private editorial notes.
* Scene, beat, panel, and cue blocks.
* Inline assertions linked to canon.
* Localization segments.
* Accessibility metadata.
* Semantic comparison and selective acceptance.
* Markdown or plain-text export.

The key is to avoid making the document either:

* An opaque rich-text blob, or
* A rigid collection of genre-specific fields.

**Expected repository output:** a provider- and editor-neutral StoryDocument AST with clear block semantics, stable IDs, reference behavior, diff granularity, export rules, and extension points.

### Advanced companion: *Document Engineering* — Robert J. Glushko and Tim McGrath

This older but still valuable reference treats documents as interfaces for structured information exchange and interoperability. It is particularly relevant to Storyworld’s signed content packages, runtime manifests, campaign briefs, asset bundles, receipts, and export adaptors. ([MIT Press][6])

It is more technical and can be treated as a reference rather than a cover-to-cover prerequisite.

---

## 6. *Visualization Analysis and Design* — Tamara Munzner

**Priority: essential before accepting a universal graph architecture or building the first complex graph.**

The previous interface books explain interaction and application structure. They do not provide enough discipline for Storyworld’s many distinct visual projections:

* Narrative flow.
* Character relationships.
* Physical space.
* Truth and reveals.
* State transitions.
* Mission dependencies.
* Canon branches.
* Asset lineage.
* Rights.
* Release flow.
* Timelines and matrices.

Munzner’s framework begins with the data being represented, the task the user needs to perform, and only then the visual encoding and interaction. It covers networks, trees, matrices, linked views, reduction, interaction, and multi-level validation. ([Routledge][7])

That maps directly to the proposed `GraphViewProfile` architecture. It supports the repository’s correct principle that a graph is a projection over Engine state—not a new authority source.

**Expected repository output:** a profile contract in which each visualization declares:

* Data semantics.
* Node and edge types.
* User tasks.
* Calculated versus editable relationships.
* Grouping and coordinate semantics.
* Hidden-item behavior.
* Inspector synchronization.
* Structured nonvisual equivalent.
* Performance envelope.
* Validation method.

---

## 7. *The Ethics of Storytelling* — Hanna Meretoja

**Priority: essential before DEC-0036 and DEC-0037 are finalized.**

*Clearance & Copyright* remains important, but legal permission does not answer every ethical question involved in using:

* Family experiences.
* Private correspondence.
* Trauma.
* Real biographies transformed into fiction.
* AI-generated depictions of real people.
* Children’s experiences.
* Community submissions.
* Cultural memory.
* Conflicting testimonies.

Meretoja develops a framework for examining both the ethical potential and ethical risks of narratives, including perspective-taking, understanding other lives without reducing them to categories, cultural self-understanding, and narratives’ effects on the possibilities people imagine. ([OUP Academic][8])

This is highly relevant to the difference between:

* Rights clearance.
* Consent.
* Privacy.
* Dignity.
* Foreseeable harm.
* Misrepresentation.
* Narrative appropriation.
* Ethical justification for publication.

Storyworld should not reduce these concerns to one `rights_status` field.

**Expected repository output:** a narrative-ethics review model separate from legal rights review, with structured prompts and evidence but no automated ethical verdict.

---

## 8. *Introducing Translation Studies*, sixth edition — Jeremy Munday, Sara Ramos Pinto, and Jacob Blakesley

**Priority: essential before localization and transcreation become generalized platform behavior.**

The intake correctly models localization as a rendition rather than a canon branch when world facts remain invariant. But translating or transcreating a work is not merely replacing strings.

The current sixth edition covers multimodal communication, ideology, hermeneutics, digital translation, machine translation, and AI language models across many kinds of texts and languages. ([Routledge][9])

It can help Storyworld distinguish:

* Literal translation.
* Localization.
* Cultural adaptation.
* Transcreation.
* Simplified-language rendition.
* Dub script.
* Caption.
* Audio description.
* Bilingual parallel edition.
* Locale-specific sign or graphic replacement.
* Canon-changing adaptation.

It would also challenge the assumption that invariance can always be checked mechanically. Meaning, register, cultural implication, age appropriateness, and voice frequently require human linguistic judgment.

**Expected repository output:** a localization/transcreation contract specifying invariant facts, permitted expressive variation, reviewer qualifications, locale metadata, and cases that require an adaptation branch.

---

## 9. *Engineering a Safer World* — Nancy G. Leveson

**Priority: essential for platform-wide governance, not just “safety features.”**

Storyworld is becoming a complex sociotechnical control system. Its hazards include:

* An unapproved candidate reaching publication.
* A restricted source being sent to a provider.
* A spoiler leaking through search.
* A child-directed experience collecting personal data.
* Expired rights remaining in a scheduled package.
* A runtime treating observations as canon.
* An AI-generated waiver being treated as human judgment.
* A production silently migrating to newer canon.
* An authority host being bypassed.

Leveson’s systems-theoretic approach treats safety as a problem of control structures, constraints, feedback, and interactions in complex software-intensive systems—not merely isolated component failures. ([MIT Press][10])

This aligns unusually well with Storyworld’s architecture of commands, policy gates, authority boundaries, exact-version decisions, receipts, and downstream acceptance.

**Expected repository output:** a Storyworld hazard analysis organized around unsafe control actions, missing feedback, authority crossings, and enforceable safety constraints.

---

## 10. *Inclusive Design for a Digital World*, second edition — Reginé M. Gilbert

**Priority: essential before complex Studio interfaces are considered production-ready.**

The owner questionnaire asks whether Storyworld should formally require WCAG 2.2 AA, keyboard operation, screen-reader equivalents, zoom, forced colors, reduced motion, touch, right-to-left text, and input method editors. The current implementation has made good accessibility progress, but the technical assessment notes that future graphs, editors, matrices, timelines, drag-and-drop tools, and media-review surfaces lack real-browser and assistive-technology evidence.

Gilbert’s second edition addresses inclusive design across websites, applications, games, AI, and emerging technologies and incorporates current accessibility standards such as WCAG 2.2. ([Springer Link][11])

This is broader than an accessibility checklist. It can guide:

* Equivalent structured graph interfaces.
* Accessible semantic editors.
* Time-based media annotation.
* Non-color status communication.
* Mobile exact-version decisions.
* Cognitive load in dense creative interfaces.
* Accessible output requirements for generated media.

**Expected repository output:** a Studio accessibility doctrine covering authoring equivalence, not only content consumption.

---

## 11. *Production Design for Screen* — Jane Barnwell

**Priority: essential before DEC-0033’s Look system is treated as complete.**

The earlier shelf includes *The Visual Story*, *Audio-Vision*, and *Producing Animation*. Those remain excellent. Barnwell adds something more specific: the actual discipline of production design and the relationship among script breakdown, conceptual vision, space, sets, locations, interiors, exteriors, light, color, and set dressing. ([Bloomsbury][12])

That directly maps to the proposed Look cascade and traditional-shoot parity model.

It can help prevent Storyworld from reducing production design to:

* Color palettes.
* Prompt adjectives.
* Camera settings.
* Artist references.

A complete Look must account for the designed environment, material culture, spatial hierarchy, transitions, props, set decoration, and how all of those express character and story.

**Expected repository output:** an expanded Look vocabulary separating art style, visual concept, world production design, cinematography, lighting, grade, wardrobe, set dressing, and shot-specific treatment.

### Sound implementation companion

The earlier *Audio-Vision* remains the conceptual foundation. When the score and sound layer enters implementation, a practical production reference such as *Designing Sound for Animation*, third edition, would add current coverage of dialogue, score, ambience, sound effects, and soundtrack production paths. ([Routledge][13])

---

## 12. *The Routledge International Handbook of Children, Adolescents, and Media*, second edition — Dafna Lemish, editor

**Priority: essential before DEC-0035 is accepted as the complete child-audience foundation.**

DEC-0035 correctly identifies legal and platform requirements, audience designations, data restrictions, commerce gates, and conversational-character safeguards.

But legal compliance answers only part of the problem. Storyworld also needs an evidence-based understanding of:

* Children as media audiences.
* Children as participants and creators.
* Representation of childhood.
* Cognitive, emotional, social, and behavioral development.
* Digital inequalities.
* Commercialization.
* Parasocial and conversational relationships.
* Differences among preschool, middle childhood, preteen, and adolescent audiences.

The handbook synthesizes child-and-media research across developmental psychology, media studies, education, public health, and childhood sociology. ([Routledge][14])

This complements rather than replaces *How Picturebooks Work*, *Understanding by Design*, and the 5E instructional-model book.

**Expected repository output:** evidence-backed age-band policy packs and evaluation rubrics that are distinct from regulatory flags.

# Additional working references

These books are highly useful, but they do not all need to be read before the intake is ratified.

## Research and evidentiary practice

### *The Craft of Research*, fifth edition

This adds systematic treatment of questions, source evaluation, argument, research ethics, and appropriate use of generative AI. It is valuable for source ingestion, nonfiction, theological or philosophical inquiry, and the S1R research class. ([University of Chicago Press][15])

### *The Chicago Guide to Fact-Checking*, second edition

This is the more operational companion. It covers source ranking, checking different media, conflicting facts, sensitive subjects, plagiarism, fabrication, and record-keeping. It directly supports the proposed “Matters of Record” documentary template and correction/retraction lifecycle. ([University of Chicago Press][16])

The useful division is:

* *The Craft of Research* teaches how to construct warranted knowledge.
* *The Chicago Guide to Fact-Checking* teaches how to verify publishable claims and preserve evidence.

---

## Security threat modeling

### *Threat Modeling: Designing for Security* — Adam Shostack

Leveson addresses unsafe system behavior, including accidents and organizational control failures. Shostack addresses adversarial threats.

That distinction matters for:

* Restricted sources.
* Provider credentials.
* Guest links.
* Cross-tenant search.
* Package signatures.
* Connector webhooks.
* Prompt injection.
* Malicious uploads.
* Privilege escalation.
* Spoiler extraction.
* Data exfiltration through AI tools.

Shostack supplies a practical design-time framework for asking what can go wrong and building mitigations into system design. ([Wiley Store][17])

---

## Heritage, cultural source material, and community contribution

### *Decolonizing Methodologies*, third edition — Linda Tuhiwai Smith

This should not be mechanically universalized to every Storyworld property. It is nevertheless an important corrective when working with heritage stories, community knowledge, family history, folklore, cultural memory, and materials whose ownership cannot be reduced to ordinary copyright.

The book examines how research and knowledge collection can become extractive and how communities may retain authority over their ways of knowing and representing themselves. ([Bloomsbury][18])

It would be especially useful for:

* Tales from Two Kingdoms.
* Family-history properties.
* Community and fan contributions.
* Documentary research.
* Culturally specific theological or mythic material.
* Future archives built with community participation.

---

## Computational and procedural narrative

### *Expressive Processing* — Noah Wardrip-Fruin

This explains why the computational processes beneath digital media are themselves expressive. That is valuable for Storyworld because a narrative system’s rules, simulations, generators, and AI constraints communicate meaning—not just its visible text and images. ([MIT Press][19])

### *Procedural Storytelling in Game Design* — Tanya X. Short and Tarn Adams, editors

This adds practical work on narrative systems, procedural dialogue, generated characters, adapting content to player choices, momentum, and ethical procedural generation. ([Routledge][20])

These become important when Storyworld moves beyond authoring static branch graphs into:

* Simulation schedules.
* Dynamic dialogue packages.
* Procedural episodes.
* Generative mission variation.
* AI-assisted interactive characters.
* Rule-governed story assembly.

They do not justify autonomous canon generation. They help define the authored boundaries inside which procedural expression may occur.

---

## Search and retrieval

### *Introduction to Information Retrieval* — Christopher Manning, Prabhakar Raghavan, and Hinrich Schütze

Storyworld search must eventually handle ranking, snippets, facets, old versions, typo tolerance, explanations, visibility, spoilers, structured entities, and possibly semantic retrieval. The book remains a strong foundation for indexing, ranking, classification, clustering, and retrieval evaluation. ([Cambridge University Press][21])

This should be read when the current PostgreSQL search evolves into a real retrieval architecture. Security and visibility semantics must remain Storyworld-owned; a search engine must not decide who may see a result.

# Books I would not add to the immediate foundation

## More universal plot-formula books

The taxonomy already has enough structural craft material to begin building templates. Additional beat-sheet systems might improve one template but would increase the risk of treating a preferred dramatic form as universal narrative law.

## More generic microservices or software-architecture books

The current architecture has already made the important choices well: Engine-owned authority, immutable accepted revisions, PostgreSQL custody and tenant isolation, content-addressed storage, idempotent commands, Temporal workflows, provider abstraction, signed packages, and a Studio that operates through Engine contracts. The repository’s own technical assessment concludes that the missing work is bounded substrates, not replacement of the platform stack.

A current general engineering reference such as *Designing Data-Intensive Applications*, second edition, would still be useful to the engineering team, but it is not a prerequisite for ratifying the narrative and governance intake. The second edition was published in 2026 and covers data models, derived data, distributed systems, reliability, and dataflow architecture. ([O'Reilly Media][22])

## More provider-specific AI books

Storyworld’s canonical definitions should not depend on current prompt syntax, model APIs, image-generation tricks, or one provider’s consistency mechanisms. Those belong in mutable provider implementation guides and evaluation records.

# What the previous shelf already covers adequately

The earlier recommendations should remain. In particular:

* Abbott remains the general narratology foundation.
* Wolf remains the imaginary-world and subcreation foundation.
* Murray and *The Game Narrative Toolbox* remain the interactive-story foundation.
* Jenkins remains valuable for participatory and convergence culture.
* Block and Chion remain the visual and audiovisual grammar foundation.
* *Producing Animation* and Blain Brown remain production-pipeline references.
* *Semantic Web for the Working Ontologist* remains useful for knowledge representation.
* Trevor Owens remains essential for long-term custody and preservation.
* Tidwell, Murray’s *Inventing the Medium*, and Shneiderman remain the Studio and human-AI interaction foundation.
* *Clearance & Copyright* remains the operational rights foundation.
* The picture-book, curriculum, 5E, structure, and experimentation titles remain excellent template- or phase-specific references.

The new books do not replace that shelf. They fill the spaces between its disciplines.

# Books still cannot cover every necessary foundation

Some Storyworld foundations must remain tied to living standards, official regulatory sources, platform policies, and counsel rather than books.

The intake’s impact map already reaches the correct conclusion: mutable external facts such as children’s regulations and platform requirements should be stored as dated research records rather than baked into permanent canonical assertions.

The same principle should apply to:

* Accessibility standards.
* Copyright and AI-authorship guidance.
* Children’s privacy and advertising rules.
* Platform synthetic-media policies.
* Publishing and print specifications.
* Provenance and content-authenticity standards.
* Security frameworks.
* Identity and electronic-signature requirements.
* Media codec and delivery specifications.
* Provider retention and training terms.

Books establish concepts and methods. Living sources establish current obligations.

# Recommended reading and ratification order

## Before DEC-0030 and DEC-0034

Read:

1. *The Discipline of Organizing*
2. *Transmedial Narratology and Contemporary Media Culture*
3. *A Theory of Adaptation*
4. *Time and Relational Theory*

These could materially change the taxonomy, transmedia distinctions, diegetic model, timeline coordinates, and retcon semantics.

## Before the `StoryDocument` and export-adaptor decisions

Read:

1. *Designing Connected Content*
2. Selected chapters of *Document Engineering*
3. *Introducing Translation Studies*

These should shape document blocks, references, reusable structured content, localization, and package transformations.

## Before the first graph implementation

Read:

1. *Visualization Analysis and Design*
2. Retain *Designing Interfaces* and *Inventing the Medium* as companions.

## Before DEC-0035, DEC-0036, and DEC-0037

Read:

1. *The Ethics of Storytelling*
2. *Engineering a Safer World*
3. *Inclusive Design for a Digital World*
4. *The Routledge International Handbook of Children, Adolescents, and Media*
5. *Threat Modeling*
6. Relevant portions of *Decolonizing Methodologies*
7. *The Craft of Research* and *The Chicago Guide to Fact-Checking*

## Before implementing DEC-0033

Read:

1. *Production Design for Screen*
2. Retain *The Visual Story*, *Audio-Vision*, and *Producing Animation*.
3. Add a practical sound-production reference when the score/sound subsystem is scheduled.

# Final assessment

The previously identified books **do not cover every necessary base**, but the gap is now well bounded.

The minimum important additions are:

1. *The Discipline of Organizing*
2. *Transmedial Narratology and Contemporary Media Culture*
3. *A Theory of Adaptation*
4. *Time and Relational Theory*
5. *Designing Connected Content*
6. *Visualization Analysis and Design*
7. *The Ethics of Storytelling*
8. *Introducing Translation Studies*
9. *Engineering a Safer World*
10. *Inclusive Design for a Digital World*
11. *Production Design for Screen*
12. *The Routledge International Handbook of Children, Adolescents, and Media*

With those added to the earlier shelf—and with security, research, fact-checking, cultural-source, procedural-narrative, and retrieval books used as decision-specific references—Storyworld will have a sufficiently comprehensive intellectual foundation to proceed.

At that point, the highest-value activity is no longer collecting more books. It is converting each relevant book into a small, governed research package:

* Vocabulary crosswalk.
* Conflict report against the current dossier.
* Core-versus-template disposition.
* New counterexample fixtures.
* Proposed amendments.
* Explicit non-adoptions.
* Decision evidence.

All such books should enter as S1R research: useful for ideas and structure, never as reusable prose or automatic authority. That aligns with the proposed ingestion policy’s treatment of third-party-derived material.

[1]: https://mitpress.mit.edu/9780262313988/the-discipline-of-organizing/?utm_source=chatgpt.com "The Discipline of Organizing"
[2]: https://www.nebraskapress.unl.edu/nebraska/9780803288379/?utm_source=chatgpt.com "Transmedial Narratology and Contemporary Media Culture - Nebraska Press"
[3]: https://www.routledge.com/A-Theory-of-Adaptation/Hutcheon/p/book/9780415539388?utm_source=chatgpt.com "A Theory of Adaptation - 2nd Edition - Linda Hutcheon - Siobhan O'Flyn"
[4]: https://shop.elsevier.com/books/time-and-relational-theory/date/978-0-12-800631-3?utm_source=chatgpt.com "Time and Relational Theory - 2nd Edition | Elsevier Shop"
[5]: https://www.pearson.com/en-us/subject-catalog/p/designing-connected-content-plan-and-model-digital-products-for-today-and-tomorrow/P200000009416?utm_source=chatgpt.com "Designing Connected Content: Plan and Model Digital Products for Today and Tomorrow"
[6]: https://mitpress.mit.edu/9780262072618/document-engineering/?utm_source=chatgpt.com "Document Engineering"
[7]: https://www.routledge.com/Visualization-Analysis-and-Design/Munzner/p/book/9781466508910?utm_source=chatgpt.com "Visualization Analysis and Design - 1st Edition - Tamara Munzner - Rou"
[8]: https://academic.oup.com/book/27352?utm_source=chatgpt.com "The Ethics of Storytelling: Narrative Hermeneutics, History, and the Possible | Oxford Academic"
[9]: https://www.routledge.com/Introducing-Translation-Studies-Theories-and-Applications/Munday-RamosPinto-Blakesley/p/book/9781032516561?utm_source=chatgpt.com "Introducing Translation Studies: Theories and Applications - 6th Editi"
[10]: https://mitpress.mit.edu/9780262533690/engineering-a-safer-world/?utm_source=chatgpt.com "Engineering a Safer World"
[11]: https://link.springer.com/book/10.1007/979-8-8688-1820-2?utm_source=chatgpt.com "Inclusive Design for a Digital World: Designing with Accessibility in Mind | Springer Nature Link"
[12]: https://www.bloomsbury.com/uk/production-design-for-screen-9781501373718/?utm_source=chatgpt.com "Production Design for Screen: Visual Storytelling in Film and Television: Jane Barnwell: Bloomsbury Visual Arts - Bloomsbury"
[13]: https://www.routledge.com/Designing-Sound-for-Animation/Beauchamp/p/book/9781032745183?utm_source=chatgpt.com "Designing Sound for Animation - 3rd Edition - Robin Beauchamp - Routle"
[14]: https://www.routledge.com/The-Routledge-International-Handbook-of-Children-Adolescents-and-Media/Lemish/p/book/9780367633356?utm_source=chatgpt.com "The Routledge International Handbook of Children, Adolescents, and Med"
[15]: https://press.uchicago.edu/ucp/books/book/chicago/C/bo215874008?utm_source=chatgpt.com "The Craft of Research, Fifth Edition, Booth, Colomb, Williams"
[16]: https://press.uchicago.edu/ucp/books/book/chicago/C/bo194938501.html?utm_source=chatgpt.com "The Chicago Guide to Fact-Checking, Second Edition, Borel"
[17]: https://uat.store.wiley.com/en-us/threat-modeling-designing-for-security-p-9781118810057?utm_source=chatgpt.com "Threat Modeling: Designing for Security | Wiley"
[18]: https://www.bloomsbury.com/us/decolonizing-methodologies-9781350346086/?utm_source=chatgpt.com "Decolonizing Methodologies: Research and Indigenous Peoples: Linda Tuhiwai Smith: Zed Books - Bloomsbury"
[19]: https://mitpress.mit.edu/9780262517539/expressive-processing/?utm_source=chatgpt.com "Expressive Processing"
[20]: https://www.routledge.com/Procedural-Storytelling-in-Game-Design/Short-Adams/p/book/9780429488337?utm_source=chatgpt.com "Procedural Storytelling in Game Design - 1st Edition - Tanya X. Short"
[21]: https://www.cambridge.org/highereducation/books/introduction-to-information-retrieval/669D108D20F556C5C30957D63B5AB65C?utm_source=chatgpt.com "Introduction to Information Retrieval | Cambridge Aspire website"
[22]: https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/ch03.html?utm_source=chatgpt.com "3. Data Models and Query Languages - Designing Data-Intensive Applications, 2nd Edition [Book]"
