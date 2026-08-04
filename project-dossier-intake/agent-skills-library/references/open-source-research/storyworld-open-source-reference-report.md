# Storyworld Open-Source Reference Repository Assessment

**Assessment date:** 2026-07-31  
**Storyworld revision assessed:** `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`  
**Repository register size:** 158 materially relevant repositories  
**Disposition vocabulary:** A architectural exemplar · B standards/interchange · C candidate bounded dependency · D disposable proof of concept · E specialist template reference · F cautionary reference · G reject

## Executive conclusion

The open-source ecosystem contains **credible, mature foundations for most difficult but bounded Storyworld infrastructure**: structured-editor mechanics, graph and timeline rendering, professional media interchange, color management, image and video processing, production tracking, exact-frame review, audio waveforms, typesetting, runtime packaging, authorization engines, search projections, accessibility testing, and supply-chain evidence.

It does **not** contain a credible off-the-shelf precedent for Storyworld's central authority model. Storyworld must continue to own:

- Canon, branches, retcons, adaptations, shared-universe references, truth, belief, secrecy, spoilers, and audience knowledge.
- The canonical `StoryDocument` and semantic reference model.
- `GraphViewProfile`, timeline-coordinate semantics, and accessible structured equivalents.
- The cross-media `AnnotationTarget` and exact-version binding.
- Creative Direction, resolved realization, reference-pack semantics, continuity rules, and provider-neutral generation recipes.
- Human acceptance, rights evidence, waivers, publication/runtime authority boundaries, immutable receipts, and selective approval invalidation.
- The distinction among source, staging, candidate, accepted master, rendition, publication, runtime derivative, superseded version, and archived evidence.
- Dignity, child-audience, sensitive-source, authorship, and AI-transparency policy.
- Evaluation findings that expose evidence and uncertainty instead of inventing a universal quality score.

The strongest external foundation is the **professional media standards ecosystem**, especially OpenTimelineIO, OpenColorIO/ACES, OpenEXR, OpenImageIO, OpenUSD, MaterialX, glTF, OpenAssetIO, OpenRV/xSTUDIO, and Gaffer. These projects should shape Storyworld's interchange profiles, worker boundaries, review surfaces, and external-editor contracts—but never its narrative authority.

The highest adoption risks are:

1. **Private data-model capture:** editor JSON, canvas graphs, DCC project files, runtime scripts, and DAM databases becoming de facto canonical state.
2. **License drift and open-core/fair-source splits:** especially AYON server components, Tiptap/CKEditor advanced features, AGPL applications, and search products with commercial tiers.
3. **Plugin execution:** ComfyUI custom nodes, Blender/DCC scripting, editor extensions, and media codecs can execute arbitrary or native code.
4. **Accessibility failure:** graph, timeline, map, waveform, and canvas libraries rarely provide a complete keyboard/screen-reader equivalent.
5. **Projection leakage:** search, thumbnails, embeddings, review proxies, and annotations can expose spoiler or restricted material.
6. **False authority:** successful generation, media conformance, automated visual metrics, C2PA verification, or legal-policy evaluation must never imply creative acceptance, canon, publication authority, or legal clearance.
7. **Operational overreach:** distributed search clusters, production trackers, render schedulers, or preservation suites can impose more cost and coupling than Storyworld's current phase justifies.

## Scope and method

This assessment used the current Storyworld repository and its governed/staged documentation as the primary source of current state and target direction. The repository now includes the book-research reference library and an explicit amendment input warning that the proposed monolithic `Look` should become a resolved view over separately versioned creative systems.

For external projects, the assessment used official repositories, release pages, license files, security policies, architecture documentation, source structure, tests, and project activity. Metadata is point-in-time. Entries marked **verify before adoption** are still useful research references but require a fresh release, license, security, and dependency audit at implementation kickoff.

The register intentionally distinguishes:

- **Architecture to study**
- **Standards and formats to profile**
- **Bounded code that may be adopted**
- **Disposable POC dependencies**
- **Specialist references**
- **Cautionary examples**
- **Rejected dependencies**

A repository is not recommended merely because it is popular, visually impressive, or technologically adjacent.

## Current Storyworld baseline

Storyworld already has the correct high-level foundation:

- Engine-owned authoritative state.
- PostgreSQL with tenant-scoped access and row-level security.
- Immutable accepted revisions and explicit supersession.
- Content-addressed object storage.
- Idempotent commands, exact-version receipts, and unknown-outcome recovery.
- Temporal-based durable orchestration.
- Provider abstraction and accepted provider-neutral recipe policy.
- Signed portable packages.
- Continuity findings and human-only dispositions.
- Studio operating through Engine contracts rather than a second business database.
- Golden fixtures, defect injection, and recorded-provider replay.

The external repository program therefore **extends** Storyworld; it does not reopen the accepted control-plane, database, workflow, or authority decisions without new evidence.


## Top architectural exemplars

These should be studied deeply, but not normally installed as Storyworld's source of truth.

| Repository | Disposition | Priority | Storyworld value | Required abstraction |
|---|---:|---:|---|---|
| [OpenAssetIO](https://github.com/OpenAssetIO/OpenAssetIO) | A | P0 | Host–asset-manager separation, stable entity references, trait-based queries, resolution, publishing, and capability negotiation. | Storyworld AssetResolver/ExternalAssetManager interface. |
| [Gaffer](https://github.com/GafferHQ/gaffer) | A | P0 | Node-based look development, lighting, compositing, deferred evaluation, Python/OSL scripting, and pipeline-tool framework. | CreativeSystem graph/compiler patterns and external-editor bridge. |
| [Kitsu](https://github.com/cgwire/kitsu) | A | P0 | Production tracking for assets, shots, episodes, tasks, previews, comments, statuses, playlists, and delivery. | ProductionTrackingBridge or import/export adapter only. |
| [AYON Core](https://github.com/ynput/ayon-core) | A | P0 | DCC host integration, workfiles, loaders, publishers, plugins, anatomy/templates, contexts, and pipeline execution. | ExternalEditorConnector and PublishAdapter. |
| [OpenUSD](https://github.com/PixarAnimationStudios/OpenUSD) | B | P0 | Layered/composed scene description, references, payloads, variants, time samples, instancing, schemas, and asset resolution. | USD export/import profile with Storyworld stable refs and lineage. |
| [Wikibase](https://github.com/wikimedia/mediawiki-extensions-Wikibase) | A | P1 | Statement model with items, properties, qualifiers, references, ranks, identifiers, and revision history. | Storyworld CanonAssertion/Source/Rationale/Scope model. |
| [OpenRV](https://github.com/AcademySoftwareFoundation/OpenRV) | A | P0 | Professional media review/playback, sessions, sources, color, annotations, playlists, frame-accurate comparison, and scripting. | ReviewPlayerAdapter and OTIO/annotation bridge. |
| [Blender Studio Pipeline](https://github.com/blender/blender-studio-pipeline) | A | P1 | Open-movie production pipeline, asset/shot workflows, task layers, publishing, Kitsu integration, and editorial handoff. | ProductionTemplate patterns and external-tool receipts. |
| [ProseMirror](https://github.com/ProseMirror/prosemirror) | A | P0 | Schema-driven document model, transactions, steps, selections, history, and collaborative editing mechanics. | StoryDocument semantic schema independent of ProseMirror. |
| [ink](https://github.com/inkle/ink) | E | P1 | Branching narrative language, choices, knots/stitches, variables, and runtime-neutral story compilation. | Storyworld InteractiveNarrative/DialoguePackage adapter and import/export mapper. |
| [Archivematica](https://github.com/artefactual/archivematica) | A | P2 | Standards-based preservation workflows, format identification/policy, AIP/DIP packaging, checks, and storage service. | PreservationPlan and archival handoff interface. |
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | A | P3 | Metadata catalog, glossary, lineage, ownership, policies, quality, search, and context graph. | Storyworld Library/Provenance UI patterns. |

## Top candidate bounded dependencies

These have the strongest case for actual adoption behind Storyworld-owned interfaces and explicit replacement tests.

| Repository | Disposition | Priority | Storyworld value | Required abstraction |
|---|---:|---:|---|---|
| [OpenTimelineIO](https://github.com/AcademySoftwareFoundation/OpenTimelineIO) | B | P0 | Editorial timeline interchange for clips, tracks, gaps, transitions, markers, rational time, media references, adapters, and plugins. | EditorialTimelineAdapter mapping Storyworld shot relations to OTIO. |
| [OpenColorIO](https://github.com/AcademySoftwareFoundation/OpenColorIO) | C | P0 | Production color-management configs, color spaces, transforms, views/displays, processors, and LUT-agnostic execution. | ColorPipelineAdapter and pinned config/version records. |
| [OpenImageIO](https://github.com/AcademySoftwareFoundation/OpenImageIO) | C | P0 | Robust multi-format image I/O, metadata, image cache, processing, thumbnails, hashes, and command-line tools. | ImageProcessingAdapter and quarantine limits. |
| [FFmpeg](https://github.com/FFmpeg/FFmpeg) | C | P0 | Decode/encode/transcode, frame extraction, filters, proxy generation, streaming, audio/video analysis, and metadata. | MediaWorkerAdapter with allowlisted operations and transformation receipts. |
| [sharp](https://github.com/lovell/sharp) | C | P0 | Node bindings around libvips for thumbnails, resizing, format conversion, compositing, and metadata. | ThumbnailService adapter. |
| [OpenSeadragon](https://github.com/openseadragon/openseadragon) | C | P1 | Deep-zoom tiled images, coordinate transforms, overlays, and IIIF-compatible viewing. | DeepImageViewer and exact-version tile/proxy service. |
| [Media Chrome](https://github.com/muxinc/media-chrome) | C | P1 | Web components for accessible media controls, time display, captions, tracks, fullscreen, and playback state. | StoryworldMediaPlayer adapter. |
| [TanStack Table](https://github.com/TanStack/table) | C | P0 | Headless table/matrix sorting, filtering, selection, column models, and pagination. | DataTable/Matrix adapter with governed bulk-command layer. |
| [TanStack Virtual](https://github.com/TanStack/virtual) | C | P0 | Headless list/grid virtualization. | VirtualizedCollection adapter. |
| [Playwright](https://github.com/microsoft/playwright) | C | P0 | Cross-browser automation, trusted input, mobile emulation, traces, screenshots, network controls, and multi-user flows. | Storyworld browser-test harness. |
| [HarfBuzz](https://github.com/harfbuzz/harfbuzz) | C | P1 | Unicode text shaping across scripts, OpenType features, glyph positioning, and font variation. | TextShapingService/renderer dependency. |
| [ICU](https://github.com/unicode-org/icu) | C | P1 | Unicode normalization, segmentation, collation, locale data, bidi, calendars, messages, and internationalization. | LocalizationService boundary. |
| [ClamAV](https://github.com/Cisco-Talos/clamav) | C | P1 | Malware scanning engine, signatures, daemon, and command-line scanning. | MalwareScanner adapter. |
| [glTF Validator](https://github.com/KhronosGroup/glTF-Validator) | C | P0 | Structural and semantic validation for glTF 2.0. | RuntimePackageValidator adapter. |

## Top standards and interchange repositories

These should define profile mappings and validation boundaries, not Storyworld's internal narrative model.

| Repository | Disposition | Priority | Storyworld value | Required abstraction |
|---|---:|---:|---|---|
| [OpenTimelineIO](https://github.com/AcademySoftwareFoundation/OpenTimelineIO) | B | P0 | Editorial timeline interchange for clips, tracks, gaps, transitions, markers, rational time, media references, adapters, and plugins. | EditorialTimelineAdapter mapping Storyworld shot relations to OTIO. |
| [OpenUSD](https://github.com/PixarAnimationStudios/OpenUSD) | B | P0 | Layered/composed scene description, references, payloads, variants, time samples, instancing, schemas, and asset resolution. | USD export/import profile with Storyworld stable refs and lineage. |
| [glTF](https://github.com/KhronosGroup/glTF) | B | P0 | Runtime-oriented 3D transmission format for scenes, meshes, materials, textures, skins, cameras, lights, and animation. | glTF RuntimeContentAdapter. |
| [glTF Validator](https://github.com/KhronosGroup/glTF-Validator) | C | P0 | Structural and semantic validation for glTF 2.0. | RuntimePackageValidator adapter. |
| [OpenColorIO](https://github.com/AcademySoftwareFoundation/OpenColorIO) | C | P0 | Production color-management configs, color spaces, transforms, views/displays, processors, and LUT-agnostic execution. | ColorPipelineAdapter and pinned config/version records. |
| [OpenColorIO Configs for ACES](https://github.com/AcademySoftwareFoundation/OpenColorIO-Config-ACES) | B | P1 | Reference ACES 2.0 OCIO configurations and versioned color-pipeline profiles. | Pinned ColorPipelineProfile. |
| [OpenEXR](https://github.com/AcademySoftwareFoundation/openexr) | B | P1 | Professional HDR scene-linear image format, multipart/multichannel/deep data, metadata, reference implementation. | MediaFormatProfile and safe decoder worker. |
| [MaterialX](https://github.com/AcademySoftwareFoundation/MaterialX) | B | P1 | Material/look-dev interchange graph, standard nodes, shader generation, documents, and renderer/DCC interoperability. | MaterialRealizationProfile and attachment refs. |
| [W3C Web Annotation](https://github.com/w3c/web-annotation) | B | P0 | Web Annotation data model for targets, selectors, bodies, motivations, provenance, and serialization. | Storyworld AnnotationTarget profile and selector registry. |
| [W3C Media Fragments URI](https://github.com/w3c/media-frags) | B | P2 | URI fragment syntax for temporal, spatial, track, and named media dimensions. | MediaFragmentSelector inside AnnotationTarget. |
| [C2PA Rust SDK](https://github.com/contentauth/c2pa-rs) | D | P1 | C2PA manifests, assertions, ingredients, signatures, verification, embedding, and content-credential tooling. | ContentCredentialsAdapter mapping accepted evidence to bounded assertions. |
| [RO-Crate](https://github.com/ResearchObject/ro-crate) | B | P1 | JSON-LD package metadata for aggregated resources, people, software, equipment, provenance, licenses, reuse, and preservation. | Storyworld Package Profile over existing signed package format. |
| [Oxford Common File Layout](https://github.com/OCFL/spec) | B | P2 | Versioned, checksum-based object storage layout and inventory conventions for durable preservation. | ArchivalExportProfile. |
| [BagIt Python](https://github.com/LibraryOfCongress/bagit-python) | B | P2 | BagIt package creation/validation with manifests, payload, tags, and fixity. | BagItExportAdapter. |
| [IIIF API specifications](https://github.com/IIIF/api) | B | P2 | Image and Presentation API models for tiled images, canvases, annotations, sequences, ranges, and manifests. | IIIF proxy/export profile. |
| [SPDX Specification](https://github.com/spdx/spdx-spec) | B | P0 | Machine-readable software, package, file, license, AI/data, security and provenance metadata. | SPDX bridge and SBOM generation. |
| [ODRL Information Model / Vocabulary](https://github.com/w3c/odrl) | B | P1 | Policies expressing permissions, prohibitions, duties, parties, assets, actions, constraints, and offers/agreements. | Storyworld RightsExpressionProfile. |
| [Data Privacy Vocabulary](https://github.com/w3c/dpv) | B | P2 | Privacy concepts for purposes, processing, personal data, legal bases, consent, risks, measures, and rights. | PrivacyVocabularyProfile. |
| [WebVTT](https://github.com/w3c/webvtt) | B | P1 | Timed text cues, regions, styling, metadata, and web media interoperability. | WebVTTRenditionAdapter. |
| [TTML2](https://github.com/w3c/ttml2) | B | P2 | Timed-text interchange for broadcast/streaming, styling, layout, timing, and profiles. | TTMLRenditionAdapter. |
| [MusicXML](https://github.com/w3c/musicxml) | B | P2 | Interchange schema for Western music notation, parts, measures, notes, directions, layout, and playback data. | MusicNotationProfile. |
| [MNX](https://github.com/w3c/mnx) | B | P3 | Emerging web-oriented music notation interchange standard. | Future MusicNotationProfile. |
| [CloudEvents](https://github.com/cloudevents/spec) | B | P1 | Common event envelope, attributes, protocol bindings, and extension model. | Storyworld CloudEvents profile. |
| [AsyncAPI Specification](https://github.com/asyncapi/spec) | B | P1 | Machine-readable asynchronous API/channel/message contracts. | Storyworld AsyncAPI contract profile. |

## Top cautionary references

These are useful precisely because they expose coupling, license, maintenance, or authority traps.

| Repository | Disposition | Priority | Storyworld value | Required abstraction |
|---|---:|---:|---|---|
| [ComfyUI](https://github.com/comfyanonymous/ComfyUI) | D | P0 | Node-based generative-media workflow execution, model loading, custom nodes, queues, workflow JSON, and local/remote inference. | ComfyUIProviderAdapter mapping canonical recipe to pinned workflow/version. |
| [InvokeAI](https://github.com/invoke-ai/InvokeAI) | E | P1 | Generative image workspace, canvas, layers, workflows, model management, boards, and editing/inpainting. | InvokeAI checkout/import connector. |
| [Twine](https://github.com/klembot/twinejs) | F | P2 | Branch-map authoring, story-format packaging, and creator-facing visual branching. | GraphViewProfile and Storyworld-owned branching schema. |
| [Ren'Py](https://github.com/renpy/renpy) | E | P3 | Visual-novel scripting, labels, screens, dialogue, save/runtime behavior, and asset packaging. | Storyworld visual-novel compiler target. |
| [AYON Backend](https://github.com/ynput/ayon-backend) | F | P1 | Pipeline server, project/folder/product/version/representation concepts, event services, settings, and APIs. | No required dependency; optional external integration adapter. |
| [CKEditor 5](https://github.com/ckeditor/ckeditor5) | F | P2 | Mature collaborative rich-text editing, comments, suggestions, track changes, and export features. | Storyworld comments/suggestions/decision separation. |
| [n8n](https://github.com/n8n-io/n8n) | G | P2 | Visual automation workflows, connectors, credentials, triggers, and node ecosystem. | None required. |
| [DVC](https://github.com/iterative/dvc) | F | P3 | Git-adjacent large-data versioning, pipelines, remotes, cache, experiments, and reproducibility. | None required beyond existing storage/portability. |
| [Storyboarder](https://github.com/WonderUnit/Storyboarder) | F | P2 | Storyboard drawing, shot boards, timing, script integration, and simple animatics. | Storyworld Storyboard/ShotPlan schema. |
| [OpenReviewIO](https://github.com/AcademySoftwareFoundation/OpenReviewIO) | D | P2 | Emerging open review interchange initiative for annotations, review sessions, and media-review interoperability. | Review interchange profile. |
| [Typesense](https://github.com/typesense/typesense) | F | P2 | Typo-tolerant faceted search, vector/hybrid search, filtering, curation, and API. | SearchIndexAdapter. |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | F | P3 | Distributed lexical/vector search, analyzers, aggregations, security plugins, dashboards, and scale. | SearchIndexAdapter if future scale demands. |
| [ParadeDB](https://github.com/ParadeDB/paradedb) | F | P3 | PostgreSQL-native search extensions combining BM25, analytics, and hybrid search. | No required abstraction beyond SearchProjection. |
| [Vivliostyle.js](https://github.com/vivliostyle/vivliostyle.js) | D | P2 | Web-standard typesetting and paged-media engine for publications and books. | PagedPublicationAdapter. |
| [Lost Pixel](https://github.com/Lost-Pixel/lost-pixel) | F | P3 | Visual regression platform/CLI with storybook/page capture and cloud/self-host options. | No required dependency. |

## What Storyworld should own regardless of implementation

| Concern | External projects may provide | Storyworld must own |
|---|---|---|
| Structured authoring | Editor mechanics, selection, history, CRDT synchronization, Markdown/DOCX conversion | `StoryDocument`, semantic block IDs, entity references, visibility, exact-version review, acceptance, export fidelity reports |
| Graphs and maps | Canvas/WebGL renderers, layout engines, zoom/pan, geometric editing | `GraphViewProfile`, node/edge semantics, calculated vs editable relations, commands, permissions, hidden counts, accessible list/inspector |
| Timeline and editing | Rational time, timeline widgets, OTIO interchange, playback | Story time vs presentation time vs publication time, directorial/editorial intent, shot relations, approval consequences |
| Assets | Image/video libraries, proxy generation, metadata extraction, asset resolution | Asset identity, lifecycle, derivation, rights, accepted versions, renditions, publications, withdrawals, custody receipts |
| Production tracking | Assets/shots/tasks/previews/status UX | Property/production hierarchy, canon pins, proposal/approval semantics, authority layers, selective invalidation |
| Creative direction | DCC graphs, camera/light/material vocabularies, color and audio tooling | Representation style, production design, directorial intent, cinematography, lighting, color, edit, sound, score, resolved realization |
| Generation | Provider workflows, models, nodes, prompts, seeds, control networks | Provider-neutral recipe and constraints, capability lease, cost gate, staging, lineage, evaluation, human acceptance |
| Review | Players, waveforms, drawing overlays, frame compare, comments | Cross-media annotation target, exact-version binding, comments vs decisions, roles, receipts, waiver semantics |
| Color | OCIO/ACES, EXR, transforms, LUT execution | Narrative color design, grade intent, approved config/version bindings, rendition policy |
| 3D/runtime | OpenUSD, glTF, Godot/PlayCanvas, material formats | Authored narrative source, package compiler, immutable release, runtime acceptance boundary; no player-save contamination |
| Rights and policy | ODRL/DPV/SPDX vocabularies, policy engines, signature services | Evidence model, consent, scope, expiry, revocation, approval authority, counsel-supported legal decisions |
| Search | FTS/vector engines, analyzers, ranking infrastructure | Visibility/spoiler rules, authoritative source links, historical labeling, explanations, deletion/reconciliation |
| Evaluation | Metrics, OCR/CV/audio algorithms, conformance validators | Evaluation plans, evidence, severity, uncertainty, human authority, waiver/expiry, no universal creative score |
| Portability | RO-Crate, BagIt, OCFL, C2PA, signed artifact tools | Storyworld package semantics, identifiers, lineage, authority receipts, import acceptance, complete export and replacement |



### Animation, 3D, interactive worlds, and runtime compilation

**Interchange:** OpenUSD and glTF, with glTF Validator.  
**Runtime candidates:** Godot and PlayCanvas; Babylon.js as comparison.  
**Specialist animation references:** OpenToonz, Synfig, Pencil2D.

OpenUSD is appropriate for layered production/source scenes; glTF is appropriate for runtime delivery. Neither should replace Storyworld's canonical locations, characters, props, world rules, missions, dialogue, or narrative state.

The runtime compiler should map accepted Storyworld content into immutable, target-specific packages. The runtime owns real-time rendering, physics, navigation, networking, session state, saves, and player choices. Runtime-discovered defects return as observations/findings, not automatic canon changes.



### AI generation and external editing

ComfyUI and InvokeAI remain useful but dangerous boundary tests. Their prompts, seeds, LoRAs, model identifiers, workflow graphs, canvas state, databases, and custom nodes are provider/execution details. They must never become Storyworld canon or approval authority.

ComfyUI requires pinned, allowlisted workflows/nodes/containers, no database credentials, resource limits, controlled egress, and signed jobs. InvokeAI should initially use a manual or package-based checkout/import flow: exact source, references, permitted transformations, and return manifest; imported output becomes a candidate and is re-evaluated.



### Storyboarding, editing, and temporal media

**Interchange:** OpenTimelineIO.  
**Integrated exemplars:** Kdenlive and MLT.  
**Caution:** Storyboarder's maintenance posture.

OTIO should become Storyworld's principal editorial interchange standard. Storyworld still needs its own `EditorialIntent`, `ShotRelation`, `CutRationale`, directorial purpose, annotations, and approval consequences. OTIO can encode order, duration, tracks, gaps, transitions, markers, and media references; it does not carry the full narrative/creative model.

The Storyboard should not merely be a thumbnail array. It needs stable shot identity, staging, camera, blocking, sound intent, references, annotations, and relation to the scene state and resolved creative specifications.



### Evaluation, continuity, quality, and regression

Playwright and axe-core should become the real-browser/accessibility foundation. Pixelmatch is appropriate for deterministic rendering regression. Tesseract/OpenCV/VMAF/MediaConch/FontBakery/EPUBCheck/veraPDF are bounded evaluators.

No repository supplies a trustworthy universal score for narrative quality, visual style, character consistency, production design, editing, sound, or music. Storyworld must define evaluation plans per creative system, preserve exact evidence, state confidence and limitations, and reserve interpretive decisions to qualified people.



### Graphic design, typography, layout, illustration, and print

**External design exemplar:** Penpot.  
**Render POC:** Typst vs WeasyPrint; Paged.js for preview.  
**Core text infrastructure:** HarfBuzz, ICU, FontTools.  
**Validators:** FontBakery, EPUBCheck, veraPDF, qpdf.  
**External editors:** Scribus, Inkscape, Krita.

Storyworld must own grid, hierarchy, typography roles, text-image relationships, page/panel grammar, safe areas, accessibility, and template intent. A renderer compiles an accepted GraphicDesignSystem and target adaptor into PDF/EPUB/SVG/HTML; its source syntax is not the canonical document.

Font files require rights, provenance, locale coverage, and version records. Rendering must be tested across RTL, complex scripts, variable fonts, fallback, zoom, and accessible output.



### Graphs, timelines, maps, matrices, and annotations

**Renderer POC:** XYFlow with Dagre and ELK.js.  
**Dense analytics:** Cytoscape.js or Sigma only after measured need.  
**Deep images/spatial:** OpenSeadragon, Annotorious, Konva; MapLibre only for geographic space.  
**Matrices:** TanStack Table + Virtual.  
**Standards:** W3C Web Annotation, Media Fragments, IIIF.

The graph architecture must remain projection-first:

`Engine structured state → Storyworld graph projection → GraphViewProfile validation → normalized snapshot → layout adapter → renderer → synchronized list/inspector`

Every profile must declare node types, edge types, grouping, coordinate semantics, calculated vs editable relations, commands, hidden-item behavior, permissions, performance target, and structured fallback. Renderer gestures may issue typed commands; they must not mutate hidden domain state.

Annotorious is a useful image-annotation renderer but should not define the universal annotation model. Storyworld needs exact-version targets for image geometry, document ranges, audio/video intervals, cuts, graph nodes/edges, timeline events, and spatial regions.



### Media custody, provenance, preservation, and processing

**Architectural exemplar:** OpenAssetIO.  
**Core bounded workers:** FFmpeg, OpenImageIO, sharp/libvips, MediaInfo, ClamAV.  
**Interchange/preservation:** OpenEXR, C2PA, RO-Crate, OCFL, BagIt, IIIF.  
**Preservation exemplar:** Archivematica.

OpenAssetIO offers the most relevant host/manager separation: a host asks an asset manager to resolve or publish entities through stable references and capabilities. Storyworld should learn from this boundary while retaining its own asset IDs, lifecycle, rights, lineage, and decisions.

The media worker should be a signed-job, least-privilege service that performs allowlisted operations. It must validate MIME/container structure, cap dimensions/duration/decompression, strip or preserve metadata by policy, create proxies, hash outputs, and return transformation evidence. It must have no authority to accept assets.

C2PA can carry selected provenance and AI-disclosure evidence into exported media; it does not replace internal Storyworld receipts. RO-Crate/OCFL/BagIt can improve archival packages but must remain profiles around Storyworld's signed portable package.



### Narrative, canon, dialogue, and interactive story

**Best exemplars:** Ink, Yarn Spinner, Wikibase.  
**Specialist targets:** Ren'Py, Dialogic, Godot Dialogue Manager.  
**Caution:** Twine.

Ink and Yarn are valuable because they separate authored narrative scripts from host runtimes and expose practical choice, variable, dialogue, and compilation semantics. They still do not model Storyworld canon, alternate official branches, adaptation ancestry, creator truth, audience knowledge, rights, or exact-version approval. Their runtimes should receive compiled packages; their save/session state must remain outside canon.

Wikibase is the strongest assertion-model precedent in this cluster: items, properties, qualifiers, references, ranks, revisions, and reconciliation are useful for Storyworld's fact model. It is not an appropriate database or application dependency because Storyworld needs fictional time, secrecy, beliefs, retcons, branches, production pins, and human authority beyond Wikibase's model.

No reviewed repository adequately models Storyworld's complete narrative semantics. This is an original-design area.



### Photography, camera, lighting, and color

**Foundation:** OpenColorIO/ACES, OpenImageIO, OpenEXR.  
**Specialist references:** Colour, LibRaw, Lensfun, darktable, RawTherapee.  
**Evaluation:** OpenCV and VMAF only for bounded technical questions.

Storyworld should distinguish narrative color design, capture/source encoding, working space, display transform, grade intent, shot matching, and rendition output. OCIO executes a color pipeline; it does not choose a palette or grade. EXR is a high-end image/intermediate format, not a default web representation.

Photo applications are useful for non-destructive edit-history and sidecar patterns. Their processing profiles must remain external transformation evidence, not canonical visual intent.



### Professional production, visual development, and review

**Primary exemplars:** Gaffer, Kitsu/Zou, AYON Core, Blender Studio Pipeline, OpenRV, xSTUDIO.  
**Standards:** OpenUSD, MaterialX, OSL, OpenFX, OpenVDB.  
**Caution:** AYON Backend licensing and OpenReviewIO maturity.

Gaffer is the most important architectural precedent for the revised Creative Direction system: separate plugs, contexts, nodes, deferred computation, inspectability, presets, and deterministic evaluation demonstrate how independently versioned creative systems can resolve into execution without becoming prompt strings.

Kitsu/Zou and AYON reveal professional production semantics—assets, shots, tasks, previews, products, versions, representations, host integration, loading, publishing, and delivery. Storyworld must not inherit their status taxonomies or databases as authority. Instead, they should produce crosswalks for production templates and external-editor handoffs.

OpenRV and xSTUDIO are stronger review precedents than generic web media players. They should guide compare modes, sessions, sources, frame-accurate notes, playlists, color, caching, and external review interchange. A Storyworld review remains an exact-version, role-scoped decision environment; a review-app comment is only evidence or a comment.



### Rights, consent, policy, and supply-chain governance

**Standards:** SPDX, ODRL, DPV.  
**Authorization exemplars:** Cedar, OpenFGA, SpiceDB; OPA only as a bounded POC.  
**Compliance tooling:** ScanCode.  
**Signatures/attestations:** cosign, in-toto, TUF.  
**External signatures:** Documenso/DocuSeal only when counsel confirms an e-sign requirement.

Policy engines evaluate inputs; they do not decide canon, creative acceptance, waiver legitimacy, publication authority, or legal clearance. Storyworld should keep human decisions and evidence in its own command/receipt model.

No reviewed repository provides adequate children's-media compliance, dignity review, family-source sensitivity, AI-authorship evidence, or content-clearance authority. Those remain original Storyworld governance work informed by living law, platform policy, counsel, and the research library.



### Search and retrieval

The first implementation should remain PostgreSQL FTS + `pg_trgm`, with visibility-aware queries and a rebuildable projection. pgvector may be added later as another PostgreSQL projection. External engines—Meilisearch, Typesense, OpenSearch, Qdrant, Tantivy, ParadeDB—are comparative POC options only after measured requirements exceed PostgreSQL.

Every search result must retain authoritative source identity, current/superseded labeling, property/production context, explanation, and permission/spoiler filtering. Revocation, deletion, and rights changes must reconcile or invalidate the index. Embeddings and image features are non-authoritative derivatives.



### Sound, dialogue, ambience, music, and timed text

**Web review POC:** Media Chrome + WaveSurfer + precomputed peaks.  
**Professional exemplars:** Audacity, Ardour, MuseScore.  
**Standards:** WebVTT, TTML, MusicXML, MNX.  
**Analysis POCs:** librosa, Essentia, pyannote, Whisper.

Storyworld must own distinct models for dialogue, voice performance, ADR/takes, room tone, ambience, Foley/effects, subjective sound, silence, spatial perspective, mix hierarchy, score, diegetic music, motifs, themes, and cue plans. WaveSurfer is a renderer for regions; it is not the cue model.

Audio-analysis and speech models may create evidence or draft transcripts. Their output must expose confidence, exact input version, model/version, and correction history. No audio feature should silently become a creative-quality verdict.



### Structured authoring and collaboration

**POC candidates:** Lexical; Tiptap/ProseMirror; Yjs; Automerge; Pandoc.  
**Study-only alternatives:** CodeMirror, Milkdown, CKEditor, novelWriter.

The correct architecture is a Storyworld-owned AST rendered by interchangeable editors. Lexical and ProseMirror/Tiptap should be compared using the same StoryDocument fixture. Yjs and Automerge may synchronize drafts, but CRDT convergence is not semantic acceptance: references, scene hierarchies, visibility scopes, and proposal boundaries must be validated before an Engine command records a revision.

Pandoc is the strongest import/export reference, but conversion must emit a fidelity report. Unsupported blocks, comments, citations, entity mentions, rights markers, and private notes may never disappear silently. CKEditor is useful for track-change UX but its GPL/commercial feature split is a caution.

No editor library's private JSON should enter an Engine public contract.



### Workflow orchestration and events

Temporal remains the correct business orchestrator. OpenCue may later schedule render-farm work underneath Temporal activities. CloudEvents and AsyncAPI support event-contract portability. OpenTelemetry supports technical correlation, not business authority.

n8n and Prefect should not introduce a second control plane. n8n is an especially useful counterexample: visual nodes, credentials, plugin ecosystems, and workflow histories can create an ungoverned shadow authority.


## Capability coverage map

| Storyworld capability | Current Storyworld state | Strong external references | Remaining semantic gap | Recommended phase / decision |
|---|---|---|---|---|
| Canon, truth, belief, retcon, shared universe | Strong contract/fixture foundation | Wikibase; Ink/Yarn as limited interactive examples | Full cross-media narrative ontology remains Storyworld-owned | DEC-0030/0034 research and fixtures |
| Canonical StoryDocument | Not yet decided | Lexical, ProseMirror/Tiptap, Yjs, Automerge, Pandoc | Editor-neutral AST, semantic refs, exact-version diff/partial acceptance | POC before Scene Editor ADR |
| Narrative/relationship graphs | Structured accessible Arc substrate; graph deferred | XYFlow, Dagre, ELK, Cytoscape | GraphViewProfile, commands, accessibility, profile-specific semantics | Amend/accept DEC-0028, then POC |
| Spatial authoring | Ontology/UI not complete | Konva, OpenSeadragon, MapLibre, GLSP, Godot | Canonical place vs set/level/runtime, routes/visibility/access | Separate Spatial Profile decision |
| Cross-media annotation | Domain model missing | W3C Web Annotation, Media Fragments, Annotorious, OpenRV/xSTUDIO | Exact-version selectors across media and formal decision separation | New AnnotationTarget ADR + POC |
| Media quarantine/proxies | Object custody exists; processing substrate missing | FFmpeg, OIIO, sharp/libvips, MediaInfo, ClamAV | Allowlisted worker contract, resource/security limits, transformation receipts | New media-processing ADR + POC |
| Asset resolution/external editors | Basic checkout/import concept | OpenAssetIO, AYON, Blender, InvokeAI, Krita | Signed checkout manifest, lock/branch semantics, returned-version reconciliation | External-editor POC |
| Professional review | Basic Studio Review Room | OpenRV, xSTUDIO, Media Chrome, WaveSurfer | Frame/sample accuracy, compare modes, review session interchange | Annotation + media-review POC |
| Creative Direction / resolved Look | Staged DEC-0033 under amendment | Gaffer, MaterialX, USD, OCIO, production apps | Separate systems, scopes, inheritance, counterpoint, resolved realization | Amend DEC-0031/0033 before acceptance |
| Color pipeline | Planned vocabulary only | OCIO/ACES, OpenEXR, OIIO, Colour | Color design vs grade vs technical transform | DEC-0033 amendment + color POC |
| Editorial timeline | Planned storyboard/timeline | OTIO, Kdenlive, MLT | Storyworld editorial intent, shot relations, approvals | OTIO interchange profile |
| Sound and score | Staged high-level proposal | WaveSurfer, Media Chrome, Ardour, Audacity, MusicXML | Sonic/score ontology, cue/stem/track semantics, human review | Delay schema until research/fixtures |
| Print/graphic rendering | Export-adaptor proposal | Typst, WeasyPrint, Penpot, HarfBuzz/ICU, EPUBCheck | GraphicDesignSystem, page/panel grammar, prepress/accessibility | Bounded renderer POC under DEC-0032 |
| 3D/runtime packages | Runtime compiler alpha boundary | OpenUSD, glTF, validator, Godot, PlayCanvas | Target profile, dependency closure, runtime acceptance | Runtime compiler POC after target choice |
| Rights and privacy | Strong planned evidence/lifecycle direction | ODRL, DPV, SPDX, ScanCode, Cedar/OpenFGA | Storyworld-specific consent, dignity, children, legal review | DEC-0035/0036/0037; counsel |
| Search | Safe scoped alpha search | PostgreSQL FTS/pg_trgm; pgvector later | Ranking/explanations/facets/reconciliation at scale | Continue current plan; external engine only after evidence |
| Evaluation and regression | Strong deterministic fixture harness; limited visual/audio | Playwright, axe, pixelmatch, OCR/CV, VMAF, conformance tools | Professional creative rubrics and rights-safe corpora | Expand B4 after ontology decisions |
| Preservation and portable export | Signed package and restore foundations | RO-Crate, OCFL, BagIt, C2PA, Archivematica | Profile mappings, archival intent, key/trust evolution | Preservation research and export drill |


## Reusable architecture patterns

### 1. Host–manager separation

OpenAssetIO demonstrates a host asking an external manager to resolve and publish stable entity references through capability-oriented interfaces. Storyworld should use the same separation for external DAMs and editors: the external system may resolve or receive artifacts, but Storyworld retains semantic asset identity, lifecycle, rights, and approval.

### 2. Canonical model separated from editor/renderer

ProseMirror/Lexical, XYFlow, OpenSeadragon, WaveSurfer, and Penpot all reinforce the same rule: interaction mechanics and rendering models are replaceable. Storyworld contracts should describe narrative documents, graphs, annotations, audio regions, and layouts independently.

### 3. Projection plus reconciliation

Search indexes, graph snapshots, thumbnails, proxies, embeddings, waveforms, contact sheets, and performance observations are rebuildable projections. Each needs a source revision, visibility policy, generation version, reconciliation state, and deletion/revocation path.

### 4. Interchange profiles, not universal internal formats

OTIO, OpenUSD, glTF, MaterialX, MusicXML, WebVTT, TTML, C2PA, RO-Crate, OCFL, BagIt, ODRL, and SPDX are useful at boundaries. Storyworld should define a profile and a mapping/loss report for each. It should not force one medium's interchange format into the generic core.

### 5. Sandboxed media workers

FFmpeg, OIIO, libvips, codecs, OCR, CV, audio analysis, DCCs, and ComfyUI process hostile content or execute extensible code. Workers should receive signed mission-scoped jobs, immutable inputs, strict resource limits, no database credentials, restricted egress, pinned binaries/models/workflows, and an output manifest.

### 6. Exact-version checkout and re-import

AYON, Kitsu, Blender Studio, DVC, and professional review tools demonstrate the need for explicit workfiles, representations, versions, and publish/return operations. Storyworld's version must include source hashes, permitted transformations, reference pack versions, rights restrictions, checkout identity/expiry, returned outputs, declared transformations, and revalidation.

### 7. Accessible dual representation

Canvas/graph/timeline/waveform tools are valuable but insufficient. Every complex view must have a synchronized structured list, outline, table, cue sheet, or inspector that exposes the same information and safe commands by keyboard and assistive technology.

### 8. Technical evidence separated from human authority

C2PA, media conformance, OCR, CV, VMAF, policy engines, signature systems, and accessibility scanners produce evidence. Storyworld determines which evidence blocks, which creates findings, which requires a qualified reviewer, and who may accept or waive.

### 9. Layered creative composition

OpenUSD, MaterialX, Gaffer, OCIO, and professional production pipelines support the revised DEC-0033 direction: separately versioned creative systems resolve through scope and override rules into a realization specification, which then compiles to provider execution.

### 10. Standards-aware preservation

RO-Crate describes context; BagIt transfers fixity-checked packages; OCFL preserves object versions; C2PA attaches media provenance; Archivematica demonstrates preservation workflows. Storyworld should combine selected patterns around its own signed package rather than selecting one as a universal solution.


## Decision and dossier implications

### Decisions supported

- Retain Temporal as the sole durable business orchestrator.
- Retain PostgreSQL, RLS, S3-compatible immutable storage, signed packages, public contracts, and provider abstraction.
- Retain provider-neutral generation recipes and treat prompts, seeds, LoRAs, model IDs, and workflow graphs as execution derivatives.
- Retain graphs as projections over Engine state with accessible structured substrates.
- Retain export-first, target-adaptor delivery.

### Draft decisions that should be amended

**DEC-0031 — art-style definitions**

Narrow the object to representation style/formal grammar. Do not give it authoritative ownership of scene mood, lighting, camera composition, grade, edit, sound, or music. External evidence: MaterialX/Gaffer/OCIO and professional pipeline projects separate representation/material/shading, scene composition, color, and execution.

**DEC-0032 — export adaptors**

Add explicit interchange-profile registry, mapping/loss reports, technical validators, font/color/prepress profiles, and preservation packages. Cite OTIO, glTF, OpenUSD, WebVTT/TTML, MusicXML, EPUBCheck, OCIO, C2PA, RO-Crate, OCFL, and BagIt as boundary references.

**DEC-0033 — production design and Look**

Amend before acceptance. `Look` should be a resolved Studio view over independently scoped creative systems, not one inherited mega-object. Add directorial intent, separate color design from grade/pipeline, separate sound from score, and allow counterpoint. Use Gaffer/OpenUSD/MaterialX/OCIO as implementation precedents, not domain authorities.

**DEC-0028 — graph/canvas semantics**

Preserve the Narrative Flow profile but introduce a reusable `GraphViewProfile`; specify renderer/layout adapters, structured fallback, hidden counts, calculated/editable edges, deterministic snapshot, and performance envelope.

### New decisions likely required

1. Canonical `StoryDocument` and editor-adapter boundary.
2. Cross-media `AnnotationTarget`.
3. Media quarantine/proxy/processing worker.
4. Interchange profile registry and loss-report contract.
5. External-editor checkout/import contract.
6. Search projection and reconciliation contract before any external index.
7. Spatial realization profile before a floor-plan or world-map authoring tool.
8. Professional creative evaluation taxonomy and fixture governance.
9. C2PA/content-credentials export bridge, only if adopted.
10. Production identity/BFF/transport decision already identified by the technical assessment.

### Current implementation discrepancy

The accepted ADR says provider-neutral recipes are canonical and prompt dialects/seeds/provider attachments are derivatives. The current alpha compiler and Generation Workbench still accept and store prompt, negative prompt, seed, and comma-separated locks in a recipe-shaped document. This should be recorded as bounded alpha debt:

`ResolvedRealizationSpec → canonical GenerationRecipe → ProviderExecutionPlan → execution result`

The correction should precede expansion of DEC-0033 into production use.


## Disposable proof-of-concept program

| POC | Research question | Candidate repositories | Storyworld-owned layer | Success / exit criteria |
|---|---|---|---|---|
| StoryDocument editor | Can one AST support prose, scripts, entity mentions, media, citations, comments, diffs, Markdown/plain-text export, and accessibility? | Lexical vs Tiptap/ProseMirror; Pandoc; Yjs/Automerge | `StoryDocument`, IDs, semantic refs, revisions, proposals | Round-trip corpus; no editor JSON in API; replacement works; keyboard/AT matrix; semantic refs survive collaboration |
| Semantic hierarchy merge | Can concurrent structural edits be reconciled without corrupting stable IDs or references? | Automerge vs Yjs; project-owned three-way merge | Narrative hierarchy and merge decisions | Conflicts are explicit; partial acceptance; no automatic canon; deterministic fixture replay |
| Narrative Flow graph | Can a graph add value beyond the structured list while preserving semantics/accessibility? | XYFlow + Dagre vs ELK | `GraphViewProfile` and typed commands | Bidirectional selection, list parity, 1k-node performance, no mutation from pan/zoom, replaceable renderer |
| Dense/shared graph | When does a specialized renderer become necessary? | Cytoscape.js vs Sigma | Read-only graph projection | 10k+ node test; permission filtering; hidden counts; accessible query/table |
| Spatial authoring | Can locations, routes, sightlines, set layouts, and blocking be edited without conflating runtime state? | Konva, OpenSeadragon, MapLibre, GLSP | Spatial ontology and commands | Typed geometry, structured equivalent, versioned maps, runtime-independent export |
| Cross-media annotation | Can one target model cover image, document, video, audio, graph, timeline, and space? | W3C Web Annotation/Media Fragments; Annotorious; OpenRV/xSTUDIO | `AnnotationTarget` and review semantics | Exact-version selectors; comments not approvals; portable JSON; malformed selector security tests |
| Media proxy/quarantine | Can hostile media be inspected and proxied safely and reproducibly? | FFmpeg, OIIO, sharp/libvips, MediaInfo, ClamAV, OCIO | Signed worker contract and transformation receipt | Resource limits, no network, fuzz/malformed corpus, hash/metadata lineage, worker replacement |
| Frame/audio review | Can the web Review Room meet professional accuracy and accessibility? | Media Chrome, WaveSurfer, audiowaveform; OpenRV/xSTUDIO as exemplars; OTIO | Review case, exact versions, annotations, decisions | Frame/sample accuracy, captions, keyboard/AT, compare, proxy/source reconciliation |
| Large asset library | Can Studio browse 100k assets safely? | TanStack Table/Virtual, OpenSeadragon, sharp | Library projection and visibility rules | Stable focus, restricted thumbnail protection, facets, cancellation, memory budget, deep links |
| Rights/localization matrices | Can dense consequence-aware matrices remain accessible? | TanStack Table/Virtual; ODRL/DPV vocabulary references | Rights/locale domain and typed bulk commands | Keyboard, zoom, screen reader, impact preview, no hidden bulk approval |
| External editor round trip | Can advanced edits return with complete lineage and no source overwrite? | OpenAssetIO patterns; AYON; InvokeAI/Krita/Blender | Checkout manifest, transformation declaration, candidate ingest | Exact source preserved, concurrent returns branch safely, restricted data policy, replacement of editor |
| Editorial interchange | Can Storyworld exchange sequences without surrendering semantics? | OTIO; Kdenlive/MLT | Editorial intent + OTIO mapping/loss report | Round trip; rational time; markers/annotations; unsupported semantics reported |
| Color pipeline | Can all previews/renditions remain color-consistent and auditable? | OCIO/ACES, OIIO, EXR | ColorDesign, GradeIntent, ColorPipelineProfile | Pinned configs, source/working/display/output transforms, shot fixture, replacement |
| Print renderer | Which renderer best fits books/cards/workbooks while preserving provider neutrality? | Typst vs WeasyPrint; Paged.js preview; qpdf/EPUBCheck | GraphicDesignSystem + target adaptor | Deterministic output, fonts, bleed, accessibility, prepress, renderer replacement |
| Runtime compiler | Can identical authored content target a browser runtime without contaminating canon? | glTF/OpenUSD; Godot vs PlayCanvas; validator | RuntimeContentRelease and target adapter | Immutable package, dependency closure, validation, no save/player state import, target replacement |
| Content credentials | Can accepted evidence be exported without making C2PA internal authority? | c2pa-rs | C2PA profile + key policy | Offline verify, privacy/redaction, unsupported format behavior, trust rotation, internal package unchanged |


## Serious candidates rejected or constrained

| Repository / category | Disposition | Reason |
|---|---:|---|
| n8n | G | Conflicts with the accepted Temporal control plane; sustainable-use licensing; plugin/credential shadow authority |
| Twine as canonical model | F | Story-format fragmentation, GPL application, graph UI without Storyworld semantics, runtime/project lock-in |
| AYON Backend as embedded service | F | Functional Source License and server-schema coupling; architecture remains valuable |
| CKEditor advanced collaboration | F | GPL/commercial split and feature-service coupling; use only as UX reference |
| ComfyUI workflow JSON as canon | F/D | Provider/model/custom-node-specific, arbitrary code execution, no authority semantics |
| InvokeAI boards/database as custody | F/E | Useful external editor, but app database and prompt/workflow model cannot own Storyworld assets |
| DVC/Git as Storyworld version authority | F | File/Git commits do not encode semantic acceptance, rights, approvals, branches, or publication authority |
| OpenSearch for MVP | F | Operationally excessive; PostgreSQL FTS/pg_trgm is sufficient until measured evidence says otherwise |
| Typesense/ParadeDB without legal review | F | GPL/AGPL/open-core concerns plus external-index reconciliation risk |
| OpenReviewIO as stable contract | F/D | Too early; monitor as standards evidence |
| Storyboarder as dependency | F | Maintenance uncertainty and opaque application-project coupling |
| FFmpegKit | G/F | Archived/retired wrapper; use FFmpeg directly through a project-owned worker |
| Archivematica as active Storyworld custody | F/A | Excellent preservation exemplar but AGPL and operationally heavy; use for archival handoff research |
| Universal CV/audio quality score | G | No repository can make an authoritative creative judgment; metrics remain evidence |
| Entire DCC/NLE/DAW applications embedded in Studio | G | GPL/native complexity, inaccessible duplicated UI, private project formats, and authority confusion |


## Recommended study and adoption order

1. **Record the register as staged research.** Add repository URLs, assessed revisions, licenses, and review dates to an intake research artifact; do not treat it as accepted architecture.
2. **Resolve semantic decisions first:** StoryDocument, GraphViewProfile, AnnotationTarget, revised DEC-0031/0033, and media-worker boundary.
3. **Run bounded POCs:** editor, graph, annotation, media proxy, review, external editor, OTIO, color, print, runtime.
4. **Select interfaces before packages:** commit Storyworld-owned contracts and replacement tests, then choose implementations.
5. **Perform license/security gates:** exact version, transitive dependencies, native binaries, assets/models/fonts/test media, patent/trademark notices, SBOM, CVEs, security policy.
6. **Adopt only one implementation per boundary initially:** avoid parallel permanent renderers/editors/search engines.
7. **Build portability and replacement tests before production use.**
8. **Integrate professional standards at boundaries:** OTIO, OCIO/ACES, glTF/OpenUSD, WebVTT/TTML, C2PA/RO-Crate only where useful.
9. **Expand fixtures and evaluation:** each adoption must add golden, malformed, permission, accessibility, failure, and replacement cases.
10. **Reassess annually or at major-version/license change.**


## Repository register summary

The companion JSON register contains 158 unique repositories with maintenance, license, security, accessibility, integration, data-model, lock-in, and next-action fields. The following compact table is ordered by priority.



| Repository | Cluster | Disp. | Priority | License | Release / revision | Recommended next action |
|---|---|---:|---:|---|---|---|
| [glTF](https://github.com/KhronosGroup/glTF) | 3D, animation and runtime compilation | B | P0 | Apache-2.0 specification/repo | 2.0 current; extensions evolving; `spec main assessed` | Create validator-backed package fixture with external assets, extensions, and deterministic hashes. |
| [glTF Validator](https://github.com/KhronosGroup/glTF-Validator) | 3D, animation and runtime compilation | C | P0 | Apache-2.0 | current 2.x line; verify tag; `main assessed 2026` | Normalize findings into Storyworld release readiness. |
| [OpenUSD](https://github.com/PixarAnimationStudios/OpenUSD) | 3D, animation and runtime compilation | B | P0 | Apache-2.0 | 26.05 (2026-04-24 reported); `495e00be9b4f02cce7` | Build tiny BeKindRewind scene/package POC with layers, variants, time samples, and portable dependencies. |
| [ComfyUI](https://github.com/comfyanonymous/ComfyUI) | AI generation and external editing | D | P0 | GPL-3.0 | rolling releases; verify tag; `main assessed 2026` | POC pinned workflow/container/node hashes, no DB credentials, egress restrictions, and replacement by another provider. |
| [axe-core](https://github.com/dequelabs/axe-core) | Evaluation, continuity, quality and regression | C | P0 | MPL-2.0 | 4.12.1 currently locked by Storyworld; `Storyworld lockfil` | Extend to Playwright-rendered complex surfaces and preserve human/AT matrix. |
| [Playwright](https://github.com/microsoft/playwright) | Evaluation, continuity, quality and regression | C | P0 | Apache-2.0 | 1.62.0 reported; `main assessed 2026` | Implement three-engine critical flows, 320px, zoom, forced colors, reduced motion, drag, and unknown outcome. |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Graphs, maps, timelines, matrices | C | P0 | MIT | current 4.x line; verify tag; `main assessed 2026` | Verify 200% zoom, touch, saved-layout permission changes, and narrow collapse. |
| [TanStack Table](https://github.com/TanStack/table) | Graphs, maps, timelines, matrices | C | P0 | MIT | 8.21.3 reported; `main assessed 2026` | Prototype rights/localization/continuity matrix with keyboard and consequence preview. |
| [TanStack Virtual](https://github.com/TanStack/virtual) | Graphs, maps, timelines, matrices | C | P0 | MIT | 3.14.8 reported; `main assessed 2026` | Test focus retention, screen-reader row metadata, find-in-page alternatives, and 100k records. |
| [W3C Web Annotation](https://github.com/w3c/web-annotation) | Graphs, maps, timelines, matrices | B | P0 | W3C document/software licenses | Recommendation 2017; maintained ecosystem; `spec assessed 2026` | Create a profile covering images, documents, audio/video intervals, cuts, graph nodes, timeline events, and spatial regions. |
| [XYFlow / React Flow](https://github.com/xyflow/xyflow) | Graphs, maps, timelines, matrices | D | P0 | MIT | current 12.x/1.x lines; verify package tag; `360f5b13e2bc6899ea` | Run Narrative Flow Graph POC with keyboard list synchronization, hidden counts, 1k nodes, and replacement test. |
| [FFmpeg](https://github.com/FFmpeg/FFmpeg) | Media custody, provenance, preservation | C | P0 | LGPL-2.1-or-later by default; optional components may make a build GPL/nonfree | rolling releases; pin build and configuration; `946272b79a325e9bce` | Build proxy/quarantine POC with timeouts, egress denial, malformed media, provenance, and replacement. |
| [libvips](https://github.com/libvips/libvips) | Media custody, provenance, preservation | C | P0 | LGPL-2.1-or-later | 8.18.2 (2026-03-31 reported); `2ff898f0a1637c45d1` | Benchmark versus OIIO/sharp on large images, contact sheets, thumbnails, EXIF stripping, and pyramids. |
| [OpenAssetIO](https://github.com/OpenAssetIO/OpenAssetIO) | Media custody, provenance, preservation | A | P0 | Apache-2.0 | current beta line; verify exact tag; `3e60be1d4014bfc582` | Produce an asset-manager boundary ADR and external-editor round-trip POC. |
| [OpenColorIO](https://github.com/AcademySoftwareFoundation/OpenColorIO) | Media custody, provenance, preservation | C | P0 | BSD-3-Clause | 2.5.2 (2026-05-13); `5a808fb57a94c72296` | Prototype input normalization, working-space conversion, review display transforms, and rendition output. |
| [OpenImageIO](https://github.com/AcademySoftwareFoundation/OpenImageIO) | Media custody, provenance, preservation | C | P0 | BSD-3-Clause | current 3.x line; verify exact tag; `759ee33ac3f42a3d2e` | Compare OIIO and libvips/sharp by format, memory, metadata, security, and deployment profile. |
| [OpenTimelineIO](https://github.com/AcademySoftwareFoundation/OpenTimelineIO) | Media custody, provenance, preservation | B | P0 | Apache-2.0 | 0.18.1 pre-release (2025-11-09); `0eebd211b2055f111e` | Build loss-reporting round trip with Kdenlive/Resolve/Premiere-compatible adapters where legally available. |
| [sharp](https://github.com/lovell/sharp) | Media custody, provenance, preservation | C | P0 | Apache-2.0 module; linked/native dependency licenses apply | current 0.34.x line; verify tag; `main assessed 2026` | Implement deterministic thumbnail/contact-sheet service with no authority mutation. |
| [AYON Core](https://github.com/ynput/ayon-core) | Professional production and visual development | A | P0 | Apache-2.0 | current rolling core; `d01caec13cc9eb863e` | Design an external-editor round trip using project-owned manifests and one disposable AYON connector. |
| [Gaffer](https://github.com/GafferHQ/gaffer) | Professional production and visual development | A | P0 | BSD-3-Clause | 1.6 maintenance/current development; `983d0670dfeb9319c6` | Produce a DEC-0033 crosswalk for resolved creative systems, contexts, provenance, and overrides. |
| [Kitsu](https://github.com/cgwire/kitsu) | Professional production and visual development | A | P0 | AGPL-3.0 | 1.0.55 (2026-07-29); `d50bda3a81cb06112e` | Crosswalk assets/shots/tasks/previews with Storyworld productions, narrative units, candidates, reviews, and releases. |
| [OpenRV](https://github.com/AcademySoftwareFoundation/OpenRV) | Professional production and visual development | A | P0 | Apache-2.0 | current main; verify release; `6a3af6e9f94421975c` | Compare OpenRV/xStudio patterns with a web-based Media Chrome POC. |
| [xSTUDIO](https://github.com/AcademySoftwareFoundation/xstudio) | Professional production and visual development | A | P0 | Apache-2.0 | current development; `d60b3e87fc52fb87b4` | Use as reference for frame-accurate review, source versions, notes, and playlists. |
| [SPDX Specification](https://github.com/spdx/spdx-spec) | Rights, consent, governance and safety | B | P0 | Community specification license; SPDX tooling licenses vary | 3.0.1 stable; 3.1 work underway; `spec assessed 2026` | Add SBOM/license scan to supply-chain gate and map asset licenses without claiming legal clearance. |
| [Lexical](https://github.com/facebook/lexical) | Structured authoring | D | P0 | MIT | 0.44.0 (2026-04-27 reported); `e6de5490e3f1804f8d` | Run StoryDocument POC against prose, screenplay blocks, entity mentions, citations, comments, images, and Markdown round trip. |
| [ProseMirror](https://github.com/ProseMirror/prosemirror) | Structured authoring | A | P0 | MIT | repository archived/moved in 2026; package line remains relevant; `archived GitHub me` | Use as architectural precedent; verify maintained upstream locations before dependency adoption. |
| [Tiptap](https://github.com/ueberdosis/tiptap) | Structured authoring | D | P0 | MIT core; commercial/proprietary services and extensions exist | 3.x stable; commit 2026-07-28; `5158212970344952dd` | Compare against Lexical using identical fixtures and export/replacement tests. |
| [Temporal TypeScript SDK](https://github.com/temporalio/sdk-typescript) | Workflow, jobs and review | C | P0 | MIT | 1.21.1 currently locked by Storyworld; `Storyworld lockfil` | Continue replay/failure-injection tests; do not introduce a second business orchestrator. |
| [Godot Engine](https://github.com/godotengine/godot) | 3D, animation and runtime compilation | E | P1 | MIT | current 4.x line; verify tag; `main assessed 2026` | Run runtime compiler POC only after owner selects first target. |
| [PlayCanvas Engine](https://github.com/playcanvas/engine) | 3D, animation and runtime compilation | E | P1 | MIT | current 2.x line; verify tag; `main assessed 2026` | Compare with Godot for package import, offline/self-hosting, accessibility, and replacement. |
| [InvokeAI](https://github.com/invoke-ai/InvokeAI) | AI generation and external editing | E | P1 | Apache-2.0 core reported; verify current repository and bundled models | current 5.x/6.x line; verify; `main assessed 2026` | Implement manual package round trip before any tighter integration. |
| [HarfBuzz](https://github.com/harfbuzz/harfbuzz) | Graphic design, typography, layout and print | C | P1 | MIT | current 11/12 line; verify tag; `main assessed 2026` | Add multilingual, RTL, Indic, Arabic, CJK, emoji, and variable-font fixtures. |
| [ICU](https://github.com/unicode-org/icu) | Graphic design, typography, layout and print | C | P1 | Unicode-3.0 | current 78/79 line; verify tag; `main assessed 2026` | Test normalization, bidi, line/word boundaries, locale fallback, and deterministic package output. |
| [Penpot](https://github.com/penpot/penpot) | Graphic design, typography, layout and print | A | P1 | MPL-2.0 | current 2.x line; verify tag; `3fc5360df5491aee98` | Prototype one carousel/card layout handoff with SVG/PDF and semantic manifest. |
| [Typst](https://github.com/typst/typst) | Graphic design, typography, layout and print | D | P1 | Apache-2.0 | current 0.13/0.14 line; verify tag; `32fd4cc3861e0ab99f` | Render picture-book/workbook/card fixtures, compare accessibility/prepress and replacement with HTML/CSS path. |
| [WeasyPrint](https://github.com/Kozea/WeasyPrint) | Graphic design, typography, layout and print | D | P1 | BSD-3-Clause | current 68/69 line; verify tag; `main assessed 2026` | Compare against Typst using same print fixtures, PDF/A, color, bleed, and accessibility requirements. |
| [Annotorious](https://github.com/annotorious/annotorious) | Graphs, maps, timelines, matrices | D | P1 | BSD-3-Clause core; verify extensions | 3.8.8 (2026-07-02); `22c3f6052acdcedebd` | Run security review, malformed-selector tests, keyboard alternatives, and exact-version binding. |
| [Dagre](https://github.com/dagrejs/dagre) | Graphs, maps, timelines, matrices | C | P1 | MIT | 2.x/pre-release line; verify production tag; `4713b59bfa05af56cf` | Compare with ELK for crossings, ports, nested groups, determinism, and runtime cost. |
| [ELK.js](https://github.com/kieler/elkjs) | Graphs, maps, timelines, matrices | D | P1 | EPL-2.0 (verify bundled artifacts) | 0.13 development line; verify release; `cd96cd1b8f28ad6f4a` | Measure deterministic layouts and accessibility-independent data output. |
| [OpenSeadragon](https://github.com/openseadragon/openseadragon) | Graphs, maps, timelines, matrices | C | P1 | BSD-3-Clause | 6.0.2 (2026-03-12 reported); `441ec737a63c5973ca` | Prototype with annotations, restricted proxy URLs, zoom persistence, and replacement. |
| [C2PA Rust SDK](https://github.com/contentauth/c2pa-rs) | Media custody, provenance, preservation | D | P1 | MIT OR Apache-2.0 | 0.x active line; verify exact stable SDK/tool version; `d8b5f1d8e66ee08950` | Test signing, verification, ingredient chains, redaction/privacy, unsupported formats, and offline export. |
| [ClamAV](https://github.com/Cisco-Talos/clamav) | Media custody, provenance, preservation | C | P1 | GPL-2.0 | current 1.x line; verify tag; `main assessed 2026` | Test infected fixtures, archives, timeouts, signature staleness, and fail-closed policy. |
| [MediaInfoLib](https://github.com/MediaArea/MediaInfoLib) | Media custody, provenance, preservation | C | P1 | BSD-2-Clause reported; verify repository files | 26.05 (2026-05-12 reported); `release 26.05 asse` | Compare with ffprobe; retain raw evidence and normalized fields. |
| [OpenColorIO Configs for ACES](https://github.com/AcademySoftwareFoundation/OpenColorIO-Config-ACES) | Media custody, provenance, preservation | B | P1 | BSD-3-Clause / included asset notices; verify bundle | 4.0.0 for ACES 2.0; `release 4.0.0 asse` | Add ACES fixture with source, working, display, and output transform lineage. |
| [OpenEXR](https://github.com/AcademySoftwareFoundation/openexr) | Media custody, provenance, preservation | B | P1 | BSD-3-Clause | 3.4.12 (2026-05-25); `3f0f6c2d556a9b547c` | Add EXR fixtures and strict parser limits; verify test-image licenses separately. |
| [RO-Crate](https://github.com/ResearchObject/ro-crate) | Media custody, provenance, preservation | B | P1 | Specification/documentation licenses vary; verify code and examples | 1.2.0 Recommendation (2025-06-04); `release 1.2.0 asse` | Create a mapping experiment without changing canonical package authority. |
| [ink](https://github.com/inkle/ink) | Narrative and interactive semantics | E | P1 | MIT | 1.2.1 (2026-05-05); `35c63e52f1d3606093` | Author a BeKindRewind fixture mapping choices, variables, branches, and reconvergence to Storyworld-owned structures. |
| [Wikibase](https://github.com/wikimedia/mediawiki-extensions-Wikibase) | Narrative and interactive semantics | A | P1 | GPL-2.0-or-later | rolling MediaWiki release train; `main assessed 2026` | Produce a fact-model crosswalk for truth, belief, secrecy, scope, temporal validity, and supersession. |
| [Yarn Spinner core](https://github.com/YarnSpinnerTool/YarnSpinner) | Narrative and interactive semantics | E | P1 | MIT | 3.x current line; verify exact tag before adoption; `08ba499fe2ed0eb68c` | Compare Ink and Yarn against the same dialogue/quest fixture; retain only shared semantics. |
| [AYON Backend](https://github.com/ynput/ayon-backend) | Professional production and visual development | F | P1 | Functional Source License with delayed Apache conversion for newer server lines | 1.15.x current reported; `6424848f602ee9f76c` | Record as fair-source caution and inspect conversion dates before any deployment. |
| [Blender](https://github.com/blender/blender) | Professional production and visual development | A | P1 | GPL-3.0-or-later | current 4.x/5.x line; verify tag; `main assessed 2026` | Prototype immutable checkout manifest, returned derivatives, and revalidation. |
| [Blender Studio Pipeline](https://github.com/blender/blender-studio-pipeline) | Professional production and visual development | A | P1 | GPL-compatible; verify repository | rolling studio tooling; `main assessed 2026` | Extract fixture ideas for shot/asset publishing and editorial round trips. |
| [MaterialX](https://github.com/AcademySoftwareFoundation/MaterialX) | Professional production and visual development | B | P1 | Apache-2.0 | current 1.39.x line; verify tag; `ebc8cc8d89c056ba7d` | Add one 3D material fixture and provider replacement test. |
| [Zou](https://github.com/cgwire/zou) | Professional production and visual development | A | P1 | AGPL-3.0 | 1.0.62 (2026-07-30); `179c72bb9458de005f` | Use only as evidence source for production-tracking semantics. |
| [ODRL Information Model / Vocabulary](https://github.com/w3c/odrl) | Rights, consent, governance and safety | B | P1 | W3C document/software licenses | 2.2 Recommendation / current maintenance; `spec assessed 2026` | Create a rights crosswalk for territory, channel, purpose, duration, attribution, training, retention, and revocation. |
| [ScanCode Toolkit](https://github.com/aboutcode-org/scancode-toolkit) | Rights, consent, governance and safety | C | P1 | Apache-2.0 | current 32/33 line; verify; `main assessed 2026` | Scan Storyworld and candidate dependencies; store scanner/version/rules/evidence. |
| [pgvector](https://github.com/pgvector/pgvector) | Search and retrieval | D | P1 | PostgreSQL License | current 0.8.x line; verify tag; `main assessed 2026` | POC only after FTS/pg_trgm baseline; test deletion, reindex, explanation, and tenant/spoiler filters. |
| [audiowaveform](https://github.com/bbc/audiowaveform) | Sound, dialogue, ambience and music | C | P1 | GPL-3.0 reported; verify linking/deployment | current 1.x line; verify tag; `main assessed 2026` | Compare output/performance with FFmpeg-based peak extraction. |
| [Media Chrome](https://github.com/muxinc/media-chrome) | Sound, dialogue, ambience and music | C | P1 | MIT | current 4.x line; verify tag; `c62476041348882699` | Test keyboard, screen reader, captions, reduced motion, mobile, and frame stepping extensions. |
| [WaveSurfer.js](https://github.com/katspaugh/wavesurfer.js) | Sound, dialogue, ambience and music | D | P1 | BSD-3-Clause reported; verify | 8.0.0-beta.2 (2026-07-30); `2b55ba43b601fa794d` | Test long audio, keyboard region editing, exact sample/timecode conversion, and replacement. |
| [WebVTT](https://github.com/w3c/webvtt) | Sound, dialogue, ambience and music | B | P1 | W3C document/software licenses | current living standard/editor draft; `spec assessed 2026` | Add caption round-trip and accessibility fixtures. |
| [Automerge](https://github.com/automerge/automerge) | Structured authoring | D | P1 | MIT | 3.4.0 (2026-07-31); `f8b0911dc9d86265dd` | Compare with Yjs for narrative hierarchy edits, branch conflicts, and portable export. |
| [Pandoc](https://github.com/jgm/pandoc) | Structured authoring | B | P1 | GPL-2.0-or-later executable; pandoc-types BSD-3-Clause | 3.9.0.2 (2026-03-19 reported); `release 3.9.0.2 as` | Build round-trip corpus for Markdown, DOCX, EPUB, HTML, and plain text; record unsupported semantics. |
| [Yjs](https://github.com/yjs/yjs) | Structured authoring | D | P1 | MIT | 13 stable / 14 pre-release line; verify exact production tag; `9c1994547d7bc86245` | Prototype concurrent edits, semantic mentions, offline recovery, access revocation, and exact-version submission. |
| [AsyncAPI Specification](https://github.com/asyncapi/spec) | Workflow, jobs and review | B | P1 | Apache-2.0 | 3.x current; verify; `spec assessed 2026` | Expand only when event consumers stabilize. |
| [CloudEvents](https://github.com/cloudevents/spec) | Workflow, jobs and review | B | P1 | Apache-2.0 | 1.0.2 current; verify; `spec assessed 2026` | Validate current event catalog against CloudEvents constraints and signing policy. |
| [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification) | Workflow, jobs and review | B | P1 | Apache-2.0 | 1.x specification; active; `spec assessed 2026` | Define correlation from UI command to workflow, provider, asset, finding, and receipt without exposing restricted content. |
| [Babylon.js](https://github.com/BabylonJS/Babylon.js) | 3D, animation and runtime compilation | E | P2 | Apache-2.0 | current 8.x line; verify tag; `main assessed 2026` | Keep as second comparison, not parallel permanent target. |
| [Kdenlive](https://github.com/KDE/kdenlive) | Editorial, storyboard and temporal media | A | P2 | GPL-3.0 | current 25/26 line; verify tag; `main assessed 2026` | Include in OTIO round-trip POC. |
| [Storyboarder](https://github.com/WonderUnit/Storyboarder) | Editorial, storyboard and temporal media | F | P2 | MIT reported; verify assets/dependencies | historical releases; maintenance uncertain; `repository state a` | Use as cautionary precedent; do not adopt without renewed maintenance evidence. |
| [pixelmatch](https://github.com/mapbox/pixelmatch) | Evaluation, continuity, quality and regression | C | P2 | ISC | current 7.x line; verify; `main assessed 2026` | Add deterministic templates and explicit threshold rationale. |
| [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) | Evaluation, continuity, quality and regression | D | P2 | Apache-2.0 | current 5.x line; verify; `main assessed 2026` | Compare with hosted/local OCR on fixture corpus; test false positives and restricted assets. |
| [EPUBCheck](https://github.com/w3c/epubcheck) | Graphic design, typography, layout and print | C | P2 | BSD-3-Clause | current 5.x line; verify tag; `main assessed 2026` | Add valid/invalid EPUB fixture packages and normalized findings. |
| [FontBakery](https://github.com/fonttools/fontbakery) | Graphic design, typography, layout and print | E | P2 | Apache-2.0 | current 0.13.x line; verify tag; `main assessed 2026` | Add font QA findings to release readiness where fonts are embedded. |
| [FontTools](https://github.com/fonttools/fonttools) | Graphic design, typography, layout and print | C | P2 | MIT | current 4.x line; verify tag; `main assessed 2026` | Track font source/license/version and deterministic subsets. |
| [Krita](https://github.com/KDE/krita) | Graphic design, typography, layout and print | E | P2 | GPL-3.0 | current 5.x/6.x line; verify tag; `main assessed 2026` | Prototype exact-version checkout and layered return manifest. |
| [Paged.js](https://github.com/pagedjs/pagedjs) | Graphic design, typography, layout and print | D | P2 | MIT | current 0.5.x line; verify tag; `main assessed 2026` | Test pagination determinism and print parity. |
| [qpdf](https://github.com/qpdf/qpdf) | Graphic design, typography, layout and print | C | P2 | Apache-2.0 | current 12.x line; verify tag; `main assessed 2026` | Test metadata, linearization, encryption policy, and malformed PDFs. |
| [Vivliostyle.js](https://github.com/vivliostyle/vivliostyle.js) | Graphic design, typography, layout and print | D | P2 | AGPL-3.0 reported; verify | current 2.x line; verify tag; `main assessed 2026` | Compare as specialist book renderer; do not make default. |
| [Cytoscape.js](https://github.com/cytoscape/cytoscape.js) | Graphs, maps, timelines, matrices | D | P2 | MIT with third-party notices | 3.33.4 (2026-05-19 reported); `release 3.33.4 ass` | Test 10k-node shared-universe/lineage graph with permission filtering and list fallback. |
| [Konva](https://github.com/konvajs/konva) | Graphs, maps, timelines, matrices | D | P2 | MIT | 10.3.0 / react-konva 19.2.x reported; `main assessed 2026` | Use only after spatial semantics are accepted; build structured command/list equivalent. |
| [vis-timeline](https://github.com/visjs/vis-timeline) | Graphs, maps, timelines, matrices | D | P2 | Apache-2.0 and MIT components; verify | current 8.x line; verify tag; `main assessed 2026` | Test multiple independent time axes, thousands of events, keyboard navigation, and nonvisual table. |
| [W3C Media Fragments URI](https://github.com/w3c/media-frags) | Graphs, maps, timelines, matrices | B | P2 | W3C document/software licenses | Recommendation-era standard; `spec assessed 2026` | Test exact frame/time conversions and version binding. |
| [Archivematica](https://github.com/artefactual/archivematica) | Media custody, provenance, preservation | A | P2 | AGPL-3.0 | 1.18.0 (2025-09-26); `release 1.18.0 ass` | Run a study-only archival export/import drill for accepted assets. |
| [BagIt Python](https://github.com/LibraryOfCongress/bagit-python) | Media custody, provenance, preservation | B | P2 | Public domain / CC0-style US government code; verify files | rolling; updated 2026-06-18; `main assessed 2026` | Evaluate as an outer transport envelope around signed Storyworld packages. |
| [Exiv2](https://github.com/Exiv2/exiv2) | Media custody, provenance, preservation | C | P2 | GPL-2.0-or-later | current 0.28.x line; verify tag; `main assessed 2026` | Compare with ExifTool and OIIO; prefer least-privileged read-only extraction. |
| [IIIF API specifications](https://github.com/IIIF/api) | Media custody, provenance, preservation | B | P2 | Specification licenses; verify | Image API 3 / Presentation API 3 current; `spec main assessed` | Use in OpenSeadragon/annotation POC for scans, maps, art, and evidence artifacts. |
| [MediaConch](https://github.com/MediaArea/MediaConch) | Media custody, provenance, preservation | E | P2 | BSD-2-Clause / GPL components possible; verify | current release; verify tag; `main assessed 2026` | Prototype one preservation and one delivery policy; do not claim universal quality. |
| [OpenLineage](https://github.com/OpenLineage/OpenLineage) | Media custody, provenance, preservation | A | P2 | Apache-2.0 | 1.47.1 (2026-05-13); `release 1.47.1 ass` | Compare its event/facet extensibility to Storyworld receipts and asset lineage. |
| [Oxford Common File Layout](https://github.com/OCFL/spec) | Media custody, provenance, preservation | B | P2 | Specification license; verify repository | 1.1 current recommendation; verify; `spec version 1.1 a` | Compare OCFL export with Storyworld package and S3 object-version strategy. |
| [Inky](https://github.com/inkle/inky) | Narrative and interactive semantics | E | P2 | MIT | 0.15.2 (2026-05-05); `release 0.15.2 ass` | Extract preview, trace, and error-reporting patterns for a dialogue/branch sandbox. |
| [Twine](https://github.com/klembot/twinejs) | Narrative and interactive semantics | F | P2 | GPL-3.0 | 2.12.0 (2026-04-10); `release 2.12.0 ass` | Use as a counterexample in graph POC: preserve accessible structured authoring and stable branch semantics. |
| [Colour](https://github.com/colour-science/colour) | Photography, camera, lighting and color | E | P2 | BSD-3-Clause | current 0.4.x line; verify tag; `main assessed 2026` | Create unit tests for color conversions, deltas, and display transforms. |
| [LibRaw](https://github.com/LibRaw/LibRaw) | Photography, camera, lighting and color | C | P2 | LGPL-2.1 OR CDDL-1.0 dual license; verify build | current 0.22.x line; verify tag; `main assessed 2026` | Prefer OIIO-mediated use unless direct control is required. |
| [OpenCV](https://github.com/opencv/opencv) | Photography, camera, lighting and color | D | P2 | Apache-2.0 | current 5.x/4.x line; verify tag; `main assessed 2026` | Test product/logo/object alignment, frame matching, and spatial consistency on rights-safe fixtures. |
| [OpenCue](https://github.com/AcademySoftwareFoundation/OpenCue) | Professional production and visual development | A | P2 | Apache-2.0 | current main; verify release; `8dff1666a73e466254` | Defer until render-farm scale is measured. |
| [OpenReviewIO](https://github.com/AcademySoftwareFoundation/OpenReviewIO) | Professional production and visual development | D | P2 | Apache-2.0 expected; verify repository | early/experimental; `main assessed 2026` | Monitor rather than adopt; use as input to annotation decision. |
| [OpenRV Annotation](https://github.com/AcademySoftwareFoundation/OpenRV-annotation) | Professional production and visual development | B | P2 | Apache-2.0 expected; verify | early 2026 project; `main assessed 2026` | Include in annotation POC source review. |
| [Cedar](https://github.com/cedar-policy/cedar) | Rights, consent, governance and safety | A | P2 | Apache-2.0 | current 4.x line; verify; `main assessed 2026` | Compare against project-owned RBAC/ABAC and OPA for one acceptance-class authorization matrix. |
| [cosign](https://github.com/sigstore/cosign) | Rights, consent, governance and safety | A | P2 | Apache-2.0 | current 3.x line; verify tag; `main assessed 2026` | Compare Storyworld offline signed packages with Sigstore for software/build artifacts. |
| [Data Privacy Vocabulary](https://github.com/w3c/dpv) | Rights, consent, governance and safety | B | P2 | W3C document/software licenses | 2.x current; verify; `spec assessed 2026` | Map S0–S3 sensitivity and child-data prohibitions to selected DPV terms. |
| [in-toto](https://github.com/in-toto/in-toto) | Rights, consent, governance and safety | A | P2 | Apache-2.0 | current 3.x line; verify tag; `main assessed 2026` | Map one media generation/edit/export chain to in-toto-style attestations as a research fixture. |
| [Open Policy Agent](https://github.com/open-policy-agent/opa) | Rights, consent, governance and safety | D | P2 | Apache-2.0 | current 1.x line; verify tag; `main assessed 2026` | Compare with Cedar for a narrow provider/rights preflight policy. |
| [OpenFGA](https://github.com/openfga/openfga) | Rights, consent, governance and safety | A | P2 | Apache-2.0 | current 1.x line; verify; `main assessed 2026` | Use as model comparison for property, production, guest, spoiler, and rights scopes. |
| [SpiceDB](https://github.com/authzed/spicedb) | Rights, consent, governance and safety | A | P2 | Apache-2.0 | current 1.x line; verify; `main assessed 2026` | Compare with OpenFGA and current PostgreSQL RLS/ABAC. |
| [Meilisearch](https://github.com/meilisearch/meilisearch) | Search and retrieval | D | P2 | MIT core; cloud/enterprise features differ | current 1.x line; verify tag; `main assessed 2026` | Test permission revocation, historical versions, spoiler exclusion, ranking explanation, and full rebuild. |
| [Typesense](https://github.com/typesense/typesense) | Search and retrieval | F | P2 | GPL-3.0 server; cloud terms differ | current 29/30 line; verify; `main assessed 2026` | Prefer PostgreSQL baseline; compare only if Meilisearch/OpenSearch gaps matter. |
| [Ardour](https://github.com/Ardour/ardour) | Sound, dialogue, ambience and music | A | P2 | GPL-2.0-or-later | rolling/tags; verify release; `main assessed 2026` | Extract track/region/stem and non-destructive edit semantics for Storyworld-owned models. |
| [Audacity](https://github.com/audacity/audacity) | Sound, dialogue, ambience and music | A | P2 | GPL-3.0 | 3.7.8 (2026-06-11 reported); 4.x transition underway; `main assessed 2026` | Prototype segment replacement and label/cue exchange. |
| [Essentia](https://github.com/MTG/essentia) | Sound, dialogue, ambience and music | D | P2 | AGPL-3.0 for library; commercial licensing available | current 2.x line; verify tag; `main assessed 2026` | Compare with librosa for offline evaluation fixtures. |
| [librosa](https://github.com/librosa/librosa) | Sound, dialogue, ambience and music | D | P2 | ISC | current 0.11 line; verify tag; `main assessed 2026` | Create reproducible audio-feature fixtures with uncertainty labels. |
| [MuseScore Studio](https://github.com/musescore/MuseScore) | Sound, dialogue, ambience and music | E | P2 | GPL-3.0 | current 4.x line; verify tag; `main assessed 2026` | Use only when notated score production is scheduled. |
| [MusicXML](https://github.com/w3c/musicxml) | Sound, dialogue, ambience and music | B | P2 | W3C specification license | 4.0 current; verify; `spec assessed 2026` | Map CuePlan/MotifDefinition to optional MusicXML assets without semantic loss claims. |
| [Subtitle Edit](https://github.com/SubtitleEdit/subtitleedit) | Sound, dialogue, ambience and music | E | P2 | GPL-3.0 | current 4.x line; verify tag; `main assessed 2026` | Extract timing, reading-speed, overlap, and format-validation fixtures. |
| [TTML2](https://github.com/w3c/ttml2) | Sound, dialogue, ambience and music | B | P2 | W3C document/software licenses | TTML2 Recommendation/current errata; `spec assessed 2026` | Defer until a channel requires TTML/IMSC. |
| [CKEditor 5](https://github.com/ckeditor/ckeditor5) | Structured authoring | F | P2 | GPL-2.0-or-later plus commercial licensing | current line; verify exact version; `main assessed 2026` | Use as UX precedent and licensing counterexample. |
| [CodeMirror 6](https://github.com/codemirror/dev) | Structured authoring | D | P2 | MIT | rolling packages; historical GitHub development repo moved/archived; `source migration a` | Defer until source-mode authoring is required. |
| [Milkdown](https://github.com/milkdown/milkdown) | Structured authoring | D | P2 | MIT | current 7.x line; verify tag; `main assessed 2026` | Evaluate only if Markdown fidelity is a dominant owner requirement. |
| [n8n](https://github.com/n8n-io/n8n) | Workflow, jobs and review | G | P2 | Sustainable Use License / enterprise terms; not OSI-open-source for all uses | current 2.x line; verify; `main assessed 2026` | Reject as platform dependency. |
| [OpenToonz](https://github.com/opentoonz/opentoonz) | 3D, animation and runtime compilation | E | P3 | BSD-3-Clause plus third-party components | current 1.7.x line; verify; `main assessed 2026` | Activate when a 2D animation production is scheduled. |
| [Pencil2D](https://github.com/pencil2d/pencil) | 3D, animation and runtime compilation | E | P3 | GPL-2.0 | current 0.7 line; verify; `main assessed 2026` | Defer. |
| [Synfig Studio](https://github.com/synfig/synfig) | 3D, animation and runtime compilation | E | P3 | GPL-3.0 | current 1.5 line; verify; `main assessed 2026` | Defer. |
| [three.js](https://github.com/mrdoob/three.js) | 3D, animation and runtime compilation | E | P3 | MIT | current r18x line; verify tag; `main assessed 2026` | Reject as default BeKindRewind runtime unless evidence favors custom control. |
| [MLT Multimedia Framework](https://github.com/mltframework/mlt) | Editorial, storyboard and temporal media | E | P3 | LGPL-2.1-or-later / GPL modules; verify build | current 7.x line; verify tag; `main assessed 2026` | Defer until Storyworld renders assembled timelines itself. |
| [Lost Pixel](https://github.com/Lost-Pixel/lost-pixel) | Evaluation, continuity, quality and regression | F | P3 | AGPL/commercial-service split; verify | current line; verify; `main assessed 2026` | Prefer Playwright + project-owned snapshots. |
| [reg-suit](https://github.com/reg-viz/reg-suit) | Evaluation, continuity, quality and regression | D | P3 | MIT | current line; verify maintenance; `main assessed 2026` | Defer unless current harness lacks reporting. |
| [Inkscape](https://github.com/inkscape/inkscape) | Graphic design, typography, layout and print | E | P3 | GPL-2.0-or-later | current 1.4/1.5 line; verify tag; `main assessed 2026` | Defer until vector-edit round trip is needed. |
| [Scribus](https://github.com/scribusproject/scribus) | Graphic design, typography, layout and print | A | P3 | GPL-2.0-or-later | current 1.6/1.7 line; verify tag; `main assessed 2026` | Extract prepress fixture requirements and proofing workflow. |
| [veraPDF](https://github.com/veraPDF/veraPDF-library) | Graphic design, typography, layout and print | C | P3 | GPL-3.0/MPL components; verify | current 1.26 line; verify; `main assessed 2026` | Defer until PDF/A is a delivery requirement. |
| [Eclipse GLSP](https://github.com/eclipse-glsp/glsp) | Graphs, maps, timelines, matrices | A | P3 | EPL-2.0 | current 2.x line; verify tag; `main assessed 2026` | Use as architecture reference for governed canvas commands, not immediate adoption. |
| [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) | Graphs, maps, timelines, matrices | E | P3 | BSD-3-Clause | current 5.x line; verify tag; `main assessed 2026` | Defer until a property needs real geography. |
| [Sigma.js](https://github.com/jacomyal/sigma.js) | Graphs, maps, timelines, matrices | D | P3 | MIT | 4.x alpha line reported; `main assessed 2026` | Defer until measured graph density requires WebGL. |
| [DVC](https://github.com/iterative/dvc) | Media custody, provenance, preservation | F | P3 | Apache-2.0 | current 3.x line; verify; `main assessed 2026` | Use as cautionary example in asset custody analysis. |
| [OpenMetadata](https://github.com/open-metadata/OpenMetadata) | Media custody, provenance, preservation | A | P3 | Apache-2.0 | current 1.x line; verify; `main assessed 2026` | Use as a comparison for source/asset catalog and change impact only. |
| [Dialogic](https://github.com/Dialogic-Godot/dialogic) | Narrative and interactive semantics | E | P3 | MIT | 2.x current; verify tag; `main assessed 2026` | Evaluate only if Godot is selected as first runtime. |
| [Dialogue Manager for Godot](https://github.com/nathanhoad/godot_dialogue_manager) | Narrative and interactive semantics | E | P3 | MIT | current 3.x line; verify tag; `main assessed 2026` | Include in Godot exporter comparison, not core platform work. |
| [Ren'Py](https://github.com/renpy/renpy) | Narrative and interactive semantics | E | P3 | MIT plus bundled-component notices; verify distribution | 8.5.3 (2026-05-16); `release 8.5.3 asse` | Create a specialist visual-novel target only after a real property requires it. |
| [darktable](https://github.com/darktable-org/darktable) | Photography, camera, lighting and color | A | P3 | GPL-3.0 | current 5.x line; verify tag; `main assessed 2026` | Extract fixture and UI patterns, not code. |
| [Lensfun](https://github.com/lensfun/lensfun) | Photography, camera, lighting and color | E | P3 | LGPL-3.0 | current 0.3.x line; verify tag; `main assessed 2026` | Defer until RAW/photo workflow needs lens correction. |
| [RawTherapee](https://github.com/RawTherapee/RawTherapee) | Photography, camera, lighting and color | E | P3 | GPL-3.0 | current 5.x line; verify tag; `main assessed 2026` | Defer unless a photo-centric production requires it. |
| [VMAF](https://github.com/Netflix/vmaf) | Photography, camera, lighting and color | E | P3 | BSD-2-Clause plus model/patent notices; verify | current 3.x line; verify tag; `main assessed 2026` | Test transcode/proxy quality thresholds with human review. |
| [Open Shading Language](https://github.com/AcademySoftwareFoundation/OpenShadingLanguage) | Professional production and visual development | E | P3 | BSD-3-Clause | 1.15.4.0 (2026-05-06); `release 1.15.4.0 a` | Defer until a renderer integration requires it. |
| [OpenFX](https://github.com/AcademySoftwareFoundation/openfx) | Professional production and visual development | B | P3 | BSD-3-Clause | 1.5.1 (2025-11-20); `release 1.5.1 asse` | Defer until OFX host interoperability is required. |
| [OpenVDB](https://github.com/AcademySoftwareFoundation/openvdb) | Professional production and visual development | E | P3 | Apache-2.0 | 13.0.0 (2025-11-04); `release 13.0.0 ass` | Do not include in MVP; preserve through generic asset custody. |
| [Casbin](https://github.com/casbin/casbin) | Rights, consent, governance and safety | F | P3 | Apache-2.0 | current 2.x line; verify; `main assessed 2026` | Prefer current explicit authorization plus PostgreSQL RLS. |
| [Documenso](https://github.com/documenso/documenso) | Rights, consent, governance and safety | E | P3 | AGPL-3.0 | current 1.x/2.x line; verify; `main assessed 2026` | Defer pending questionnaire Q20.7 and counsel. |
| [DocuSeal](https://github.com/docusealco/docuseal) | Rights, consent, governance and safety | E | P3 | AGPL-3.0 | current 2.x line; verify; `main assessed 2026` | Compare only when e-sign requirement is confirmed. |
| [The Update Framework](https://github.com/theupdateframework/python-tuf) | Rights, consent, governance and safety | A | P3 | Apache-2.0 / BSD components; verify | current 6.x line; verify; `main assessed 2026` | Defer until public package distribution requires rotating trust. |
| [OpenSearch](https://github.com/opensearch-project/OpenSearch) | Search and retrieval | F | P3 | Apache-2.0 | current 3.x line; verify; `main assessed 2026` | Reject for MVP; revisit only with measured corpus/query load. |
| [ParadeDB](https://github.com/ParadeDB/paradedb) | Search and retrieval | F | P3 | AGPL/source-available components and enterprise split; verify exact modules | current line; verify; `main assessed 2026` | Prefer built-in PostgreSQL FTS/pg_trgm first. |
| [Qdrant](https://github.com/qdrant/qdrant) | Search and retrieval | D | P3 | Apache-2.0 | current 1.x line; verify; `main assessed 2026` | Defer. |
| [Tantivy](https://github.com/quickwit-oss/tantivy) | Search and retrieval | A | P3 | MIT | current 0.25 line; verify; `main assessed 2026` | Defer behind PostgreSQL. |
| [libass](https://github.com/libass/libass) | Sound, dialogue, ambience and music | C | P3 | ISC | current 0.17.x line; verify tag; `main assessed 2026` | Defer until styled subtitle output is required. |
| [MNX](https://github.com/w3c/mnx) | Sound, dialogue, ambience and music | B | P3 | W3C specification license | draft/current editor's draft; `main assessed 2026` | Track alongside MusicXML. |
| [pyannote.audio](https://github.com/pyannote/pyannote-audio) | Sound, dialogue, ambience and music | D | P3 | MIT code; pretrained-model terms may differ | current 4.x line; verify; `main assessed 2026` | POC on rights-safe dialogue, local execution, error rates, and correction workflow. |
| [Whisper](https://github.com/openai/whisper) | Sound, dialogue, ambience and music | D | P3 | MIT code; model/data considerations remain | 20250625 release line reported; `main assessed 2026` | Compare with current hosted/local providers on accessibility caption fixtures. |
| [novelWriter](https://github.com/vkbo/novelWriter) | Structured authoring | A | P3 | GPL-3.0 | 2026.1 (2026-04-26 reported); `release 2026.1 ass` | Extract usability patterns for chapter/scene hierarchy and metadata. |
| [Prefect](https://github.com/prefecthq/prefect) | Workflow, jobs and review | F | P3 | Apache-2.0 core with cloud features; verify | current 3.x line; verify; `main assessed 2026` | Reject for business orchestration; possibly study worker telemetry. |

## Evidence and verification notes

- Repository and release metadata are point-in-time as of July 31, 2026.
- A release string marked “verify” was not relied upon for an adoption recommendation; a fresh tag/license/security review is a mandatory gate.
- Licenses for code, documentation, sample media, fonts, pretrained models, plugins, and datasets may differ within the same project.
- “Active” means recent meaningful maintenance was observed; it is not a guarantee of future support.
- Accessibility findings for external canvases and applications are conservative. Storyworld must test its composed experience rather than inheriting a library's claims.
- No legal conclusion is made. Copyleft, network copyleft, fair-source terms, patents, trademark, model weights, sample assets, and distribution plans require legal review before adoption.
- The register should be refreshed whenever a candidate crosses from study/POC into an implementation task.

## Final recommendation

The ecosystem is sufficiently strong to accelerate Storyworld without compromising ownership, provided the project follows one rule consistently:

> Adopt infrastructure and standards at explicit boundaries; retain all narrative, creative, authority, rights, lifecycle, and evaluation meaning in Storyworld-owned contracts.

The immediate engineering shortlist is deliberately small:

- **Editor POC:** Lexical vs Tiptap/ProseMirror; Yjs/Automerge; Pandoc for interchange.
- **Graph POC:** XYFlow + Dagre/ELK, with structured fallback.
- **Annotation/review POC:** W3C Web Annotation + Annotorious/OpenSeadragon; Media Chrome/WaveSurfer; OpenRV/xSTUDIO as professional precedents.
- **Media worker:** FFmpeg + OIIO + sharp/libvips + MediaInfo + ClamAV + OCIO.
- **Professional interchange:** OTIO, OCIO/ACES, OpenEXR, OpenUSD, MaterialX, glTF.
- **External editor:** OpenAssetIO patterns with InvokeAI/Krita/Blender/AYON adapters.
- **Print:** Typst vs WeasyPrint, validated with font/prepress/accessibility tools.
- **Runtime:** glTF/OpenUSD target package; Godot vs PlayCanvas POC after owner selection.
- **Governance:** SPDX/ODRL/DPV/ScanCode as evidence and vocabulary, never legal authority.
- **Testing:** Playwright + axe-core + project-owned golden/mutation corpus.

Everything else should remain an exemplar, specialist reference, monitored standard, or explicit caution until a real vertical slice proves the need.
