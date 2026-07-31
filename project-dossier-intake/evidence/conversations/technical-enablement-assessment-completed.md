# Technical-enablement assessment completed

I reviewed the repository through commit `86f431aedc5145916a475f48abe22dc6f5a65cb7`, together with the canonical dossier, fixture portfolio, pattern-driven coverage, Studio UX audit, graph proposal, interface-architecture report, roadmap, and current decisions. The repository is now a working V1 alpha rather than a contract-only scaffold: it contains the Engine, Studio, PostgreSQL persistence, S3-compatible storage, Temporal workflows, provider and evaluation packages, Commerce/runtime/channel adapters, signed portability, and the governed authoring and review surfaces. Production identity, transport security, live external crossings, aggregate spend controls, and production operations remain deliberately unfinished.

## Executive conclusion

**The current architecture should be retained.** Storyworld does not need an ORM, GraphQL layer, replacement frontend framework, universal canvas, dedicated search service, separate vector database, monolithic component framework, or CRDT collaboration layer to complete the next useful Studio release.

The primary missing enablers are:

1. A generated, project-owned Studio client over the accepted OpenAPI contract.
2. A canonical `StoryDocument` format independent of ProseMirror, Lexical, or another editor.
3. A project-owned `GraphViewProfile` and graph-projection layer independent of any renderer.
4. A common exact-version `AnnotationTarget` model for text, images, audio, video, graphs, timelines, and structured fields.
5. A safe media-processing and proxy pipeline.
6. Scalable search, matrices, virtualization, event refresh, and real-browser validation.
7. Production identity and a secure same-origin Studio transport architecture.

The assessment evaluates **39 serious dependency or standards candidates**:

| Disposition                       | Count |
| --------------------------------- | ----: |
| Adopt now                         |    14 |
| Prototype before adoption         |    15 |
| Defer                             |     8 |
| Build as project-owned capability |     1 |
| Reject for the proposed role      |     1 |

Many additional Storyworld-specific capabilities are classified as internal architecture rather than external dependency candidates.

## Most important decision correction

The proposed `DEC-0028` should be **amended before acceptance**.

Its actual semantics describe a **Narrative Flow Graph**:

* Narrative units and choice points as nodes
* Presentation-order spine
* Choice and branch edges
* Story time as an independent lane or attribute
* Episode containment
* Synchronized structured inspector
* Keyboard-operable fallback
* No authoritative action from a graph gesture

Calling this a “spatial Arc graph” creates a category error. A proper Spatial Graph represents locations, containment, adjacency, routes, visibility, entrances, and access conditions. The decision’s exclusions—such as locations not being nodes or dependencies not being edges—must apply only to the Narrative Flow profile, not to every future Storyworld graph. `DEC-0028` is still proposed, and the repository correctly requires both owner acceptance and a separate authorized implementation task before a canvas is built.

## Recommended dependencies to adopt now

The smallest coherent addition to the current stack is:

* **TanStack Query** for server-state caching and invalidation, wrapped in Storyworld policies that preserve idempotency and unknown-outcome recovery.
* **TanStack Table and Virtual** for large entity lists, review queues, rights matrices, localization matrices, and asset libraries.
* **react-resizable-panels** for the proposed navigation–canvas–inspector–rail shell.
* Selective **Radix primitives**, retaining the current project-owned vendored design-system approach.
* **Playwright** for trusted-input, multi-browser, responsive, forced-color, zoom, keyboard, and mobile workflow testing.
* **openapi-typescript and openapi-fetch** for a generated client, once the OpenAPI operations have sufficiently specific request and response schemas.
* **Ajv** behind a Storyworld validation adapter, while retaining the Python contract validator as an independent CI trust layer.
* PostgreSQL **full-text search and `pg_trgm`**, rather than introducing another search service.
* **Sharp** in a sandboxed media worker for thumbnails, proxies, normalization, and metadata handling.
* Native **Server-Sent Events** behind a Storyworld event adapter for jobs, findings, review queues, and attention invalidation.

These are active, permissively licensed, bounded technologies that address concrete missing capabilities without taking ownership of Storyworld domain meaning. ([npmjs.com][1]) ([npmjs.com][2])

## Technologies that require prototypes

The dossier does not recommend committing immediately to a graph or editor library.

For graph infrastructure, prototype **XYFlow** with **Dagre** as the simple MIT-licensed layout baseline. Compare **ELK.js** only for compound, port-aware, or highly constrained graphs and subject it to license review. Keep Cytoscape and Sigma/Graphology deferred until measured dense-graph requirements justify a second renderer. ([npmjs.com][3])

For structured writing, compare **ProseMirror** and **Lexical** against the same `StoryDocument` fixture and accessibility suite. Tiptap may accelerate ProseMirror delivery, but only its self-hosted MIT core should be considered foundational. The permanent document contract must remain Storyworld-owned rather than adopting any editor’s private JSON shape. ([npmjs.com][4])

For media and annotation, prototype:

* Annotorious and OpenSeadragon for image and deep-image review
* Konva only for coordinate-bearing floor-plan interaction
* WaveSurfer and Media Chrome for accessible waveform/media review
* A pinned FFmpeg worker for proxies, peaks, thumbnails, subtitles, inspection, and derivatives

FFmpeg’s exact build configuration must be governed because the baseline is LGPL, while enabling GPL components changes the applicable license. ([npmjs.com][5])

## Capabilities that should remain project-owned

External libraries may render or assist these workflows, but they should not define:

* Canon, branches, adaptations, or shared-universe dependencies
* Truth, assertions, testimony, knowledge, and belief
* Story, presentation, publication, and revision time
* Narrative and entity state transitions
* Semantic hierarchy diff, merge, and impact
* Rights, consent, expiry, withdrawal, and replacement consequences
* Approval layers, waivers, authority, and receipts
* Product and runtime authority boundaries
* Graph node and edge meanings
* Annotation exact-version semantics
* Asset lifecycle and lineage
* Search visibility and result explanations
* Fixture and metamorphic validation

The W3C Web Annotation model, Media Fragments, and WebVTT are useful foundations for portable target and timed-text semantics, but Storyworld needs project-owned extensions for exact versions, branch scope, visibility, invalidation, formal revision requests, and authority. ([w3.org][6])

## Hidden limitations identified

The most consequential current gaps are:

* The Studio client and DTOs are hand-written despite the accepted OpenAPI contract.
* Studio development dependencies include internal server packages for integration testing; production source does not appear to use them, but the package boundary should be tightened through a generated `@storyworld/studio-client`.
* `@types/node` is ahead of the supported Node runtime major, potentially permitting compile-time APIs unavailable on Node 22.
* Current cross-domain search is tenant-scoped and correctly fails closed for restricted and spoiler records, but it is based on parallel `%ILIKE%` queries without full-text ranking, facets, snippets, typo tolerance, or an index-reconciliation model.
* The hand-written Engine HTTP transport will become increasingly difficult once source uploads, multipart parsing, range requests, SSE, webhooks, rate limiting, and production authentication are added.
* There is no production OIDC/session architecture. A server-side BFF using a standards-based OIDC client is the recommended prototype; OIDC identity must still be mapped to Storyworld permissions and cannot define approval authority. The current `openid-client` release supports modern OAuth/OIDC flows and Node 22, but its adoption remains an explicit production-identity decision. ([npmjs.com][7])
* No canonical rich-document, annotation, media-proxy, or complex virtualization layer exists.
* The current Release Builder principally proves canon release and production pinning; the mature rendition/package/submission/reconciliation builder remains future work.
* MinIO and Temporal local profiles use mutable `latest` image tags.
* No root `LICENSE` file was found in the reviewed repository.
* Component-level axe testing is strong regression evidence but does not cover real-browser behavior, screen readers, forced colors, high zoom, touch, IME, bidi/RTL, or complex-canvas accessibility. The current CI otherwise has a solid harness, contract, platform, build, compose, and restore-drill structure.

## Deferred technologies

The dossier defers:

* **Yjs/CRDT collaboration** until concurrent editing is a measured requirement. If adopted later, it should govern drafts only; acceptance must still materialize an immutable Engine revision. Stable Yjs v13 remains the production-oriented line while v14 is still represented by release candidates in the reviewed official sources. ([GitHub][8])
* **pgvector** until PostgreSQL lexical and faceted search demonstrably fails important reviewed queries. If adopted, use PostgreSQL rather than a separate vector database and require version 0.8.2 or newer. ([GitHub][9])
* CEL until actual user-configurable deterministic policy families exceed project-owned validator ergonomics.
* OPA/Rego as a narrative rule engine; it is better suited to general infrastructure and authorization policy than Storyworld’s canon semantics. ([GitHub][10])
* MapLibre until a property truly uses geographic coordinates and real map projections.
* Dense WebGL graph renderers until measured graph scale requires them.
* Broad offline editing, direct publication, hosted collaboration, and dedicated search infrastructure.

## Proof-of-concept program

The package defines twelve disposable prototypes with fixtures, performance targets, accessibility targets, authority-boundary tests, success criteria, rejection criteria, and expected decisions:

1. Narrative Flow graph
2. Spatial graph and floor plan
3. Rich Scene Editor
4. Semantic hierarchy diff and merge
5. Cross-media annotation
6. Audio waveform and cue editor
7. Large Asset Library
8. Rights and localization matrices
9. Shared-universe impact
10. Mobile exact-version Review Room
11. External-editor checkout and governed re-import
12. Runtime compiler and validation sandbox

## Downloads

[Download the complete technical-enablement package](sandbox:/mnt/data/Storyworld_Technical_Enablement_Package.zip)

[Download the full technical-enablement dossier](sandbox:/mnt/data/Storyworld_Technical_Enablement_Dossier.md)

[Download the machine-readable dependency recommendation register](sandbox:/mnt/data/Storyworld_Dependency_Recommendation_Register.json)

[Download the prioritized proof-of-concept plan](sandbox:/mnt/data/storyworld-technical-enablement/Storyworld_Technical_POC_Plan.md)

[Download the current technical inventory](sandbox:/mnt/data/storyworld-technical-enablement/Storyworld_Current_Technical_Inventory.md)

[Download the concise recommended enabling stack](sandbox:/mnt/data/storyworld-technical-enablement/Storyworld_Recommended_Enabling_Stack.md)

The generated package passed JSON parsing and ZIP integrity validation. No repository changes, dependency installations, or decision acceptances were performed.

```text
Dossier SHA-256:
4f044ee243b83e27b0d835a10035cd6cadd2e2f1af63b5196f1d68e16f362015

Dependency register SHA-256:
d01b05ca4a81f3bfcd87056a1839f1d72024ec9875835f6f92614337eb00ede0

Package ZIP SHA-256:
9d81d359097cceb23833abeee73cc01bcecefce92dbd480d802b5dcb4ead5431
```

[1]: https://www.npmjs.com/package/%40tanstack/react-query "https://www.npmjs.com/package/%40tanstack/react-query"
[2]: https://www.npmjs.com/package/openapi-typescript "https://www.npmjs.com/package/openapi-typescript"
[3]: https://www.npmjs.com/package/%40xyflow/react "https://www.npmjs.com/package/%40xyflow/react"
[4]: https://www.npmjs.com/package/prosemirror-model "https://www.npmjs.com/package/prosemirror-model"
[5]: https://www.npmjs.com/package/%40annotorious/react "https://www.npmjs.com/package/%40annotorious/react"
[6]: https://www.w3.org/TR/annotation-model/ "https://www.w3.org/TR/annotation-model/"
[7]: https://www.npmjs.com/package/openid-client "https://www.npmjs.com/package/openid-client"
[8]: https://github.com/yjs/yjs/releases "https://github.com/yjs/yjs/releases"
[9]: https://github.com/pgvector/pgvector "https://github.com/pgvector/pgvector"
[10]: https://github.com/google/cel-spec "https://github.com/google/cel-spec"
