# Storyworld Technical-Enablement and Dependency Dossier

**Status:** Technical assessment and decision framework; recommendations are not accepted decisions  
**Repository reviewed:** `jamesryancooper/storyworld`  
**Repository revision:** `86f431aedc5145916a475f48abe22dc6f5a65cb7`  
**Assessment date:** 2026-07-30  
**Inputs reviewed:** current repository, canonical product dossier, fixture-authoring packet v1.1, pattern-driven coverage, Studio UX audit, graph and interface architecture reports, accepted/proposed decisions, current implementation, and dependency roadmap.

---

# 1. Executive technical conclusion

## Overall readiness

Storyworld has a strong architectural foundation for the proposed Studio. The current implementation already proves the most important authority invariants: Engine-owned state, immutable accepted revisions, tenant-scoped PostgreSQL access, content-addressed storage, idempotent commands, exact-version receipts, Temporal-orchestrated work, provider abstraction, continuity findings, human-only dispositions, portable signed packages, and a first-party Studio that uses Engine commands rather than its own business database.

The platform is **ready to implement most MVP interface architectures without replacing its core stack**. Command Center, property/production scoping, structured World Bible data, Arc planning, generation candidates, continuity investigation, review decisions, and release/version inspection can all evolve effectively on the present Next.js/React/TypeScript/PostgreSQL/Temporal/S3-compatible foundation.

The major missing enablers are not another backend framework or a universal UI library. They are six bounded technical substrates:

1. A generated, project-owned Studio client over the accepted OpenAPI contract.
2. A canonical StoryDocument representation independent of any rich-text editor.
3. A graph projection/profile contract independent of any graph renderer.
4. A cross-media AnnotationTarget model independent of any annotation vendor.
5. A media-processing/proxy pipeline with safe, pinned tools.
6. Scalable search, table, matrix, virtualization, event-refresh, and browser-validation infrastructure.

The highest-risk capabilities should be prototyped before adoption: Narrative Flow graphs, floor-plan/spatial authoring, rich scene editing, semantic hierarchy merge, image/timecode annotation, audio cue editing, large asset libraries, rights/localization matrices, shared-universe impact, mobile exact-version review, external-editor round trip, and runtime compilation.

## Dependency philosophy

Use third-party dependencies for hard, well-bounded infrastructure: graph rendering/layout, editor mechanics, low-level accessible primitives, virtualization, image/media processing, standards parsing, OIDC, and browser testing. Place each behind a project-owned adapter and preserve Storyworld-owned canonical data.

Keep all domain meaning project-owned: canon, assertion/truth/belief distinctions, state, time coordinates, rights consequences, authority, approvals, packages, Storyworld graph semantics, impact analysis, lifecycle transitions, fixtures, and external product boundaries.

## Immediate decisions

Before implementing a graph, amend proposed `DEC-0028` so it describes a **Narrative Flow Graph**, not a physical spatial graph, and make its node/edge exclusions local to that profile. Adopt a reusable `GraphViewProfile` contract before choosing the renderer.

Before implementing the Scene Editor, accept a canonical `StoryDocument` ADR. No editor library's private JSON shape should become a permanent Engine contract.

Before implementing production identity or restricted browser workflows, decide the production transport: a same-origin Studio BFF/reverse proxy should terminate OIDC sessions and forward governed commands to Engine; it must never become a second authority layer.

---

# 2. Method and evidence classification

This dossier uses three labels:

- **Repository fact** — directly observed in source, lockfile, accepted decisions, or current state.
- **Recommendation** — the proposed technical direction.
- **Open decision** — an owner/ADR decision still required.

External package versions and licenses were checked against official project or npm sources during this assessment. Versions are a point-in-time review; every adopted dependency must be pinned and revalidated at implementation kickoff.

---

# 3. Current repository and dependency inventory

## 3.1 Applications

| Application | Current responsibility | Assessment |
|---|---|---|
| `apps/cli` | Public-contract-compatible command-line workflows and portability tasks | Retain; useful for deterministic fixtures, operations, and headless workflows |
| `apps/engine-api` | Node HTTP transport into governed kernel/application commands and read queries | Adequate for alpha; uploads, range streaming, SSE, multipart, production auth, and middleware will stress the hand-written transport |
| `apps/studio` | Next.js App Router first-party client | Correct product boundary; needs generated client, server-state layer, complex UI primitives, and browser E2E |

## 3.2 Shared packages

| Package | Responsibility | Enablement status |
|---|---|---|
| `domain` | Canonical domain types/utilities | Retain; expand only through accepted semantics |
| `kernel` | Governed application commands and reads | Correct authority layer |
| `persistence` | Direct PostgreSQL access and tenant context/RLS | Strong baseline; no ORM replacement justified |
| `storage` | S3-compatible immutable object storage | Strong baseline; add media/quarantine services above it |
| `portability` | Canonical package construction and Ed25519 signatures | Strong baseline; add key-rotation/trust-store decisions later |
| `providers` | Replaceable generation providers and recipe execution | Strong baseline; keep provider-neutral canonical recipes |
| `workflows` | Temporal workers/activities | Strong baseline; Studio should consume Storyworld workflow status, not Temporal internals |
| `evaluation` | Deterministic/model-assisted findings | Strong baseline; rule extensibility needs later ADR |
| `regression` | Golden corpus, defect injection, recorded provider replay | Strong foundation for every POC |
| `identity` | Development/mock identity boundary | Production OIDC and delegation remain missing |
| `credentials` | Encrypted provider credential store and broker | Valuable alpha implementation; production KMS/key custody remains open |
| `commerce-connector` | Typed Commerce Foundry package/receipt behavior | Correct contract boundary |
| `runtime-compiler` | Immutable runtime content release | Correct boundary; expand through target adapters/sandbox |
| `channel-instagram` | Export-first Instagram rendition/package behavior | Correct first channel adapter |
| `contracts` | JSON Schema, OpenAPI, AsyncAPI, fixtures, lifecycle and validator | Contract authority is correct; generated TS client is still deferred |

## 3.3 Actual locked platform versions

| Capability | Locked/current value |
|---|---|
| Package manager | pnpm 10.20.0 |
| Node runtime | CI Node 22; repository engine `>=22` |
| TypeScript | 5.9.3 |
| Next.js | 15.5.22 |
| React / React DOM | 19.2.8 |
| Tailwind CSS | 4.3.3 |
| Vitest | 2.1.9 |
| axe-core | 4.12.1 |
| PostgreSQL client | `pg` 8.22.0 |
| AWS S3 SDK | 3.1097.0 |
| Temporal SDK | 1.21.1 |
| PostgreSQL dev/CI | 16 |

### Concrete version issue

`@types/node` is locked at 26.1.2 while the runtime and CI use Node 22. That can expose APIs in type checking that do not exist at runtime. Align Node types to the supported runtime major, or explicitly enforce an API compatibility check before leaving the mismatch in place.

## 3.4 Current frontend architecture

Repository facts:

- Studio has no graph, canvas, rich-text editor, data-grid, drag/drop, timeline, media-player, map, client cache, global-state, or generated-client dependency.
- Studio uses hand-written TypeScript DTOs and a hand-written fetch client.
- UI state uses local React state/effects.
- Mutations already carry idempotency keys and preserve unknown-outcome recovery.
- URL owns property/production scope.
- The design system follows a vendored shadcn-style approach with project-owned components and selective Radix adoption.
- Component tests use Testing Library, jsdom, and axe.

Assessment:

The intentionally small dependency set is an advantage. Add only the substrates needed for the next bounded interfaces. Do not introduce Redux/Zustand as a shadow business-state store; use a server-state cache plus local editor/view state.

## 3.5 Backend, persistence, storage and workflow

- Engine API is a hand-written Node HTTP server rather than a web framework.
- PostgreSQL is authoritative and accessed through direct `pg` queries with tenant context/RLS.
- MinIO provides the local S3-compatible profile.
- Temporal is the selected durable orchestrator.
- Ed25519 signatures use Node's built-in crypto.
- Current search is eight parallel `%ILIKE%` query families with visibility filtering, no full-text ranking, facets, typo tolerance, or index projection.

No ORM, GraphQL layer, message broker, external search engine, or vector database is justified now.

## 3.6 Testing and CI

Current CI validates:

- Harness structure and mutation tests on Python 3.11 and 3.12.
- Contract pack.
- PostgreSQL, MinIO, and Temporal-backed TypeScript tests.
- Type checking, linting, Studio production build, compose validation, and restore drill.

Missing test layers:

- Real-browser E2E in Chromium, Firefox, and WebKit.
- 320px phone, 200% zoom, forced colors, reduced motion, IME, bidi/RTL, touch, and trusted drag tests.
- Upload, streaming, proxy media, large graph/list/timeline performance, and browser memory tests.
- Automated license/SBOM/container-digest controls.

---

# 4. What the current architecture can implement effectively

## Ready with project-owned UI work only

- Attention-oriented Command Center and queues.
- Property/production shells and URL scope.
- Structured entity, rule, state, timeline, rights, and proposal records.
- Canon proposal review, diff, impact and receipts.
- Structured Arc Board, hierarchy, choices and branches.
- Continuity Console and exact-version Review Room.
- Portable release/package ledgers.
- Commerce/runtime focused handoff surfaces over existing adapters.

## Ready after adopting small bounded dependencies

- Large lists and matrices: TanStack Table + Virtual.
- Stable multi-panel shell: react-resizable-panels.
- Server-state cache and event refresh: TanStack Query + SSE adapter.
- Generated Studio client: openapi-typescript + openapi-fetch.
- Browser test matrix: Playwright.
- Thumbnail/proxy images: sharp worker.
- Mature lexical search: PostgreSQL FTS + pg_trgm.

## Requires prototype and an ADR before implementation

- Narrative/other graph profiles.
- Scene/chapter rich-text editor.
- Semantic hierarchy diff/merge.
- Cross-media annotation.
- Audio/video timeline editing.
- Spatial maps and floor plans.
- Real-time collaborative editing.
- Configurable policy language.
- Production identity/BFF/transport architecture.

---

# 5. Hidden limitations and technical debt that matter to the interface plan

1. **Hand-written Studio client drift.** `apps/studio/src/lib/engine.ts` duplicates API types and methods rather than deriving them from OpenAPI.
2. **OpenAPI specificity.** The contract is structurally present, but some operations/responses are generic; generation must wait until operation IDs and schemas fully describe implemented behavior.
3. **Studio dev dependency leakage.** Studio declares kernel, persistence, storage, and engine packages as development dependencies for integration tests. No production import was identified, but the boundary should be tightened so Studio compiles only against generated public-client types; integration harness code can live elsewhere.
4. **Hand-written transport pressure.** File upload, multipart parsing, range requests, SSE, webhooks, CORS, auth middleware, rate limiting, and streaming will make the current Node router brittle.
5. **Direct browser-to-Engine production posture is unresolved.** Development actor headers are intentionally unverified. Production needs OIDC, secure sessions, CSRF/CSP, same-origin transport or tightly controlled tokens, and delegation.
6. **Search is linear lexical matching.** Current ILIKE queries lack indexing, weighted ranking, facets, explanations, typo tolerance, snippets, and index reconciliation.
7. **No event subscription.** The OpenAPI intent anticipates SSE/WebSocket, but Studio currently refreshes manually after commands.
8. **No canonical StoryDocument.** Rich text, scripts, entity mentions, semantic diffs, exports, comments, and collaboration cannot safely proceed until the representation is decided.
9. **No common annotation model.** Image regions, document ranges, audio/video intervals, graph nodes, timeline events, and fields would otherwise fragment into incompatible records.
10. **No media quarantine/proxy pipeline.** Current immutable storage does not by itself provide malware scanning, decompression bounds, EXIF stripping, thumbnailing, waveform extraction, transcode, or proxy streaming.
11. **No virtualization substrate.** Large libraries, matrices, timelines, and outlines will become slow or inaccessible without bounded virtualization.
12. **Release Builder name exceeds current implementation.** The current surface proves canon release/version pinning; mature rendition matrices, package signing UX, submission and reconciliation are still future work.
13. **Mutable container tags.** Dev and CI refer to `minio/minio:latest` and `temporalio/auto-setup:latest`, weakening reproducibility and supply-chain review.
14. **No root LICENSE was found.** The public repository's licensing posture needs an owner decision before external contribution or reuse expands.
15. **No browser/AT evidence for complex future interfaces.** Component axe tests are necessary but insufficient for graphs, editors, matrices, drag/drop, timelines, and media review.
16. **Potentially broad candidate query.** Generation candidate reads should be audited for production/property scoping as the number of tenants and concurrent productions grows.

---

# 6. Capability-to-technology matrix

| Interface/capability | Project-owned semantic layer | Bounded external enabler | Disposition |
|---|---|---|---|
| Application shell | Scope, authority, lifecycle, saved-view permission rules | react-resizable-panels; selective Radix | Adopt now |
| Server state | Engine client, idempotency/unknown-outcome policy | TanStack Query | Adopt now |
| Tables/matrices | Matrix semantics, decisions, bulk consequences | TanStack Table + Virtual | Adopt now |
| Narrative Flow graph | GraphViewProfile, projection, authority rules | XYFlow + Dagre; ELK comparison | Prototype |
| Dense analytical graph | Projection and access control | Cytoscape or Sigma only after need | Defer |
| Spatial/floor plan | Spatial ontology, typed routes/access | SVG/Konva; OpenSeadragon for deep image; MapLibre only geographic | Prototype by profile |
| Scene/chapter editor | StoryDocument AST, references, versions, exports | ProseMirror vs Lexical; Tiptap acceleration candidate | Prototype |
| Source/Markdown/JSON editor | Source visibility and format contracts | CodeMirror | Defer until needed |
| Storyboard/board | Narrative unit/card model and typed reorder commands | dnd-kit + TanStack Virtual | Prototype |
| Timeline | Storyworld temporal coordinate/interval model | Project-owned SVG/DOM + virtualization; optional low-level scale math | Build internally |
| Annotation | AnnotationTarget and exact-version rules | Annotorious/OSD; Media Fragments/Web Annotation concepts | Build model; prototype renderers |
| Image processing | Asset lineage, rights, states | sharp | Adopt now |
| Audio waveform/review | Cue/track/annotation model | WaveSurfer + Media Chrome | Prototype |
| Media processing | Recipe, provenance, rights, budgets | pinned FFmpeg worker | Prototype then adopt |
| Search | Visibility-aware search projection/explanations | PostgreSQL FTS + pg_trgm | Adopt now |
| Semantic retrieval | Retrieval projection and policy | pgvector in current PostgreSQL | Defer |
| OIDC | Storyworld role/delegation model | openid-client in BFF | Prototype |
| API transport | Public contracts/application service | Keep current; compare Fastify when uploads/SSE land | Prototype only when triggered |
| Validation | Domain findings and deterministic rules | JSON Schema/Ajv | Adopt now |
| User-configurable policy | Rule ownership, explanation, authority | CEL later; reject OPA for narrative semantics | Defer |
| Collaboration | Proposal/merge/decision semantics | Yjs only for drafts after demand | Defer |
| Runtime/commerce | Package semantics and authority boundaries | Existing project adapters and standards | Continue project-owned |

---

# 7. Graph and canvas technology assessment

## 7.1 Required correction to DEC-0028

The proposal's behavior is appropriate for one `NarrativeFlowGraphProfile`, but the phrase **spatial Arc graph** is incorrect and its exclusions must not become global Graph Explorer law.

Amend before acceptance:

- Rename the decision and UI to Narrative Flow Graph or Arc Flow Canvas.
- Keep presentation order, choice edges, story-time lane, episode grouping, synchronized inspector, hidden counts and accessible fallback.
- State explicitly that physical Spatial Graphs have different nodes/edges: locations, containment, adjacency, routes, visibility, access and distance.
- State explicitly that mission, reveal, lineage, rights, release and shared-universe profiles may have dependency edges.
- Introduce `GraphViewProfile` as the stable project-owned semantics contract.

## 7.2 Recommended renderer architecture

```text
Engine structured state
→ project-owned graph projection
→ GraphViewProfile validation
→ normalized node/edge snapshot
→ layout adapter (Dagre / ELK / server deterministic)
→ renderer adapter (XYFlow / dense renderer / SVG)
→ synchronized structured list + inspector
```

One renderer need not serve every profile. One **projection contract** should.

### Default renderer

Prototype XYFlow for image-led Narrative Flow and ordinary node/edge authoring. It fits visual scene cards, custom choice/reveal nodes, pan/zoom/minimap, and selection.

### Default layout

Use Dagre as the MIT baseline for directed flow. Compare ELK in a worker for compound/port-heavy mission/shared-universe cases. ELK's license choice requires explicit review.

### Dense renderer

Do not adopt Cytoscape or Sigma now. Add a second renderer only after measured graph size/analysis needs exceed XYFlow. Sigma is an analytical WebGL view, not a creative authoring surface.

### Project-owned SVG

Use project-owned SVG/DOM for small, semantics-heavy diagrams, timelines, and accessible overlays. Do not hand-build the full pan/zoom/node-editor stack unless the prototype proves third-party renderers cannot meet authority/accessibility requirements.

## 7.3 Accessibility requirements

Every graph must:

- Have a complete structured list/outline equivalent.
- Synchronize selection both ways.
- Use text/icon/shape, not color alone.
- Publish explicit keyboard traversal order.
- Expose hidden node/edge counts.
- Remain usable at 200% zoom and forced colors.
- Disable or reduce movement under reduced-motion settings.
- Never fire an acceptance-class command from drag, connect, or spatial selection.

## 7.4 Snapshot/export

Graph export should include profile, scope, filters, branch/release, hidden counts, renderer/layout version, and timestamp. It is a view artifact, not canon.

---

# 8. Editor and document architecture

## 8.1 Canonical representation

Create `@storyworld/story-document` with a versioned JSON AST independent of the editor library. Suggested top-level shape:

```json
{
  "schema_version": "storyworld.story-document.v1",
  "document_id": "...",
  "blocks": [],
  "references": [],
  "annotations": [],
  "metadata": {}
}
```

Core block semantics should cover paragraph, heading, scene heading, action, dialogue, speaker, list, quote, panel copy, cue, transition, embedded structured reference, and extension block. The AST should use stable IDs and explicit schema migrations.

Store canonical content in Engine records; store editor-specific state only as ephemeral draft adapter data when necessary.

## 8.2 Editor candidates

### ProseMirror

Best technical fit when schema constraints, transforms, decorations, structured mentions, semantic operations, and future collaboration bindings dominate. Higher implementation cost.

### Lexical

Best fit when React integration and a minimal plugin architecture dominate. Prototype whether its node/serialization model can remain cleanly subordinate to StoryDocument.

### Tiptap

May accelerate ProseMirror delivery but must be bounded to MIT core, self-hosted features, and project-owned serialization. Do not let commercial/cloud extensions become required infrastructure.

### CodeMirror

Use for Markdown, JSON, WebVTT, transcript/rule source, and developer-facing formats—not as the main scene/chapter editor.

## 8.3 Semantic diff and merge

Build project-owned semantic operations over stable IDs:

- Field and block changes.
- Insert/delete/move preserving identity.
- Hierarchy changes.
- Reference changes.
- Branch inheritance and overrides.
- Three-way merge with explicit conflict objects.
- Partial acceptance as explicit selected operations.

Text diff packages may help compute character/word display, but source-code merge algorithms are insufficient as canon authority.

## 8.4 Draft recovery

Start with server-side draft revisions and explicit local recovery. Defer persistent offline IndexedDB until an ADR defines encryption, retention, logout/permission revocation, shared-device behavior, and restricted-source policy.

---

# 9. Storyboard and visual-sequence architecture

Storyboards require a dedicated board architecture, not the graph renderer.

Recommended stack:

- Project-owned structured sequence/shot/panel records.
- TanStack Virtual for large lanes.
- dnd-kit prototype for pointer direct manipulation.
- Keyboard and command-palette reorder/move equivalents.
- Image-led cards with thumbnails from the media worker.
- Shared inspector and exact-version annotations.

A drag should produce a typed proposal/revision command against stable IDs. It should never mutate accepted order silently.

Contact sheets should be deterministic generated artifacts with source IDs, versions, status, and filters printed into metadata.

---

# 10. Timeline and temporal editing

Do not make a general timeline package authoritative. Storyworld's temporal semantics are unusual:

- Story time.
- Presentation order.
- Publication time.
- Revision time.
- Approximate, uncertain, interval, recurring and fictional dates.
- Audio/video timecodes.
- Rights/embargo validity.

Create `@storyworld/temporal-model` with explicit coordinate types and interval relations. Use project-owned DOM/SVG lanes with virtualization and optional low-level scale utilities. A library can render axes; it cannot decide whether an event precedes another in canon.

Performance strategy:

- Window lanes by visible range.
- Aggregate distant ranges.
- Compute temporal conflicts server-side or in workers.
- Preserve a table/matrix fallback.

---

# 11. Tables, matrices, grids and large datasets

Adopt TanStack Table + Virtual behind project components:

- `DataTable` for lists/queues.
- `MatrixGrid` for rights, knowledge, localization, claims and renditions.
- `EditableMatrix` only where cell edits map to typed proposals.

Required behavior:

- Roving keyboard focus or native table navigation as appropriate.
- Sticky row/column headers.
- Virtual row/column aria metadata.
- Saved columns/layouts permission-reconciled.
- Cell-level validation and evidence.
- Bulk action consequence preview.
- Export preserving exact scope/version.

Avoid a heavy enterprise data-grid license until a prototype demonstrates a feature the headless stack cannot reasonably deliver.

---

# 12. Media annotation and review architecture

## Common annotation model

Create `@storyworld/annotation-model` inspired by W3C Web Annotation and Media Fragments. Target kinds:

- Structured field.
- Text range using robust anchors plus quote/context.
- Image rectangle/polygon/mask.
- Audio/video interval and optional frame.
- Graph node/edge.
- Timeline event/interval.

Every annotation binds:

- Exact subject version/hash.
- Branch and scope.
- Creator and visibility.
- Body type: comment, suggestion, formal revision request, finding evidence.
- Target selector and coordinate system.
- Migration/invalidation status after subject change.

## Renderers

- Ordinary image: project-owned SVG overlay or Annotorious adapter.
- Deep image/floor plan: OpenSeadragon + annotation adapter.
- Audio/video: WaveSurfer/Media Chrome over the same interval target model.
- Document text: editor adapter maps StoryDocument stable nodes and offsets.

Annotations never become approvals merely because a thread is resolved.

---

# 13. Audio and video authoring infrastructure

## Browser

Prototype WaveSurfer for waveforms/regions and Media Chrome for controls. Keep accessible transcript, cue list and keyboard controls as first-class DOM.

## Server/worker

Use a pinned FFmpeg executable/container through a project-owned media processor for:

- Proxy generation.
- Thumbnail/contact-sheet generation.
- Waveform peaks.
- Loudness/codec/metadata inspection.
- Caption/subtitle extraction and muxing.
- Segment replacement derivatives.

Use an LGPL-compatible build unless an owner/legal decision explicitly accepts GPL obligations. Record exact build flags, source, signature, codecs, and license manifest.

Use sharp for image proxies/thumbnails. Strip EXIF/GPS when policy requires, preserve or normalize ICC profiles deliberately, and refuse decompression bombs and unreasonable dimensions.

Storyworld should author scripts, cue intent, annotations, versions and packages. Mastering, final mix, distribution and royalty/accounting remain specialized external systems.

---

# 14. Maps, floor plans and spatial authoring

Use four distinct profiles:

| Profile | Technology direction |
|---|---|
| Geographic map with real coordinates | MapLibre, self-hosted tiles/styles if adopted |
| Image-based fictional world map | OpenSeadragon or ordinary image + SVG overlay |
| Floor plan / manual coordinates | SVG or Konva adapter plus structured DOM mirror |
| Abstract spatial graph | Common graph projection + XYFlow/layout adapter |

Do not use MapLibre for floor plans or abstract graphs. Do not use a graph renderer as a geographic engine.

Spatial canon belongs in structured records: location ID, containment, adjacency, route, access condition, coordinate/reference system and effective time. Canvas geometry is a view unless explicitly accepted as a map reference asset/version.

---

# 15. Asset and reference management

## Required new package/service

Create `@storyworld/media-processing` and background workflows for:

- Quarantine and MIME/sniff validation.
- Malware scanning adapter.
- Metadata extraction.
- Hash and duplicate detection.
- Thumbnail/proxy/contact-sheet generation.
- EXIF/GPS policy.
- Image/audio/video technical metadata.
- Reconciliation and retry.

## Search/index

Use PostgreSQL asset projections for facets and metadata first. Store immutable bytes in S3-compatible storage, not in search. Similarity can start with exact hash and perceptual image hash; semantic/vector similarity is deferred.

## External editor

Checkout creates a signed manifest of exact source versions and allowed actions. Re-import always creates a candidate with declared transformation, never overwrites an accepted master. Re-run affected checks and invalidate only affected approvals.

---

# 16. Search and retrieval

## Current limitation

Current `%ILIKE%` queries are correct as a small fail-closed alpha but will not scale or rank well.

## Recommended progression

### Stage 1: PostgreSQL projection

- Search document/projection table with typed source refs.
- `tsvector` fields with weighted title/body/metadata.
- GIN indexes.
- `pg_trgm` indexes for typo/prefix/ILIKE.
- Facets for type, property, production, branch, status, visibility, time, rights and current/superseded state.
- Result explanation: matched field, lexical rank, current state and visibility.
- Outbox-driven or transactional refresh and rebuild/reconciliation command.

### Stage 2: semantic retrieval only after evidence

If lexical/faceted search fails reviewed use cases, add pgvector inside PostgreSQL—version 0.8.2 or later—behind a RetrievalProvider. Do not create a separate vector database. Embeddings remain non-authoritative, rebuildable, versioned by model and excluded from restricted providers unless policy permits.

### Dedicated search service

Defer until measured index size, query throughput, typo/facet needs or operational isolation justify it.

---

# 17. Canon, branch, diff and merge infrastructure

Existing immutable revisions and supersession are the correct foundation.

Add project-owned capabilities:

- Stable semantic operations over structured records and StoryDocument.
- Branch ancestry and scoped overrides.
- Shared-module dependency pins.
- Three-way semantic merge.
- Conflict objects with evidence.
- Partial acceptance through selected operations.
- Impact graph across productions/assets/packages/publications.
- Rollback as a new superseding revision.

Libraries can display textual differences or perform generic sequence algorithms; they cannot decide narrative equivalence, rights consequences or canon authority.

---

# 18. Collaboration and synchronization

Current recorded-facts collaboration and proposal queues should remain the default.

Implement first:

- Comments.
- Suggestions.
- Assignments.
- Review threads.
- Guest review links.
- Notifications.
- Branch proposals and merge review.

Defer presence and concurrent document editing. If real concurrent editing becomes a measured need, prototype Yjs only for `StoryDocument` drafts. The CRDT document is never accepted canon; a server-authorized proposal/acceptance command materializes an immutable StoryDocument revision.

Do not add CRDT semantics to every entity, graph, matrix or rights record.

---

# 19. Frontend state, caching and synchronization

## Recommended split

- **Engine state:** only fetched/mutated through generated Storyworld client.
- **Server-state cache:** TanStack Query behind project policies.
- **Editor draft state:** editor adapter and explicit draft record.
- **View state:** URL, saved view and local panel state.
- **Long-running operation state:** Storyworld operation/workflow read model plus SSE.

## SSE before WebSockets

Use Server-Sent Events first for workflow/job/review/attention invalidation because the primary need is server-to-client status. Keep event payloads as typed Storyworld events or invalidation hints; never expose Temporal history directly.

Use WebSockets only when two-way presence/collaboration is adopted.

## Optimistic updates

Allowed for reversible view operations and perhaps low-risk draft changes with expected-version checks. Not allowed to visually represent acceptance, approval, rights clearance, release or publication before the Engine receipt arrives.

---

# 20. Workflow and job interfaces

Studio needs a Storyworld operation projection containing:

- Operation ID and type.
- Subject/version.
- Current business state.
- Progress and current step when safe.
- Cost and budget use.
- Retry/cancel eligibility.
- Failure classification.
- Correlation/causation IDs.
- Receipts and reconciliation state.

Temporal remains behind the workflow package. Do not embed Temporal Web or expose raw workflow state as product meaning.

Cancellation, retry and priority are Storyworld commands that decide whether the underlying Temporal action is legal.

---

# 21. Validation, rules and policy engines

## Adopt now

- JSON Schema 2020-12 for structural/package contracts.
- Ajv adapter for Node/browser validation.
- Existing Python validator as independent CI trust layer.
- Project-owned deterministic validators for narrative/time/state/rights/claims.

## Model-assisted review

Models may produce findings with confidence/evidence/remediation. They may not waive, approve, change canon or silently block without a human/governed policy path.

## Configurable rules

Do not adopt a universal rule engine now. If users later need configurable template/target conditions, prototype CEL because it is small, typed, non-Turing-complete and mutation-free. Its output should be normalized findings.

Reject OPA/Rego as the general Storyworld narrative rule engine. It may be reconsidered for enterprise infrastructure authorization/policy—not canon semantics.

---

# 22. Review, approval and electronic evidence

The existing Storyworld receipt model is sufficient for creative, canon, rights, channel, commerce and runtime workflow evidence. An external e-signature platform is not required unless a future regulated customer or legally binding signature use case demands it.

Required hardening:

- Production OIDC identity and delegation.
- Server-side authorization for every acceptance class.
- Key rotation and trusted signing-key registry.
- Signature algorithm agility/versioning.
- Receipt retention and cross-host verification.
- Reauthentication policy for high-consequence mobile decisions.
- Timestamp and clock policy.
- Stale-subject detection.

Comments, review completion and UI state never substitute for receipts.

---

# 23. Rights, consent and restrictions

Build project-owned rights semantics and matrices. No generic external rights platform should become mandatory.

Model:

- Grantor/subject.
- Asset/source/version.
- Territory.
- Channel.
- Purpose.
- Duration.
- Modification/derivative permission.
- Model training/provider retention.
- Attribution/disclosure.
- Expiry/withdrawal/replacement.
- Historical-use policy.

Rights checks create evidence-backed findings and block future package associations. They do not delete historical receipts.

Provide optional adapters to external rights systems later through versioned imports and receipts.

---

# 24. Localization and accessibility production

Storyworld should own:

- Source-target lineage.
- Glossary and protected terms.
- Canon/claim invariants.
- Locale and rendition records.
- Subtitle/caption/audio-description/alt-text assets.
- Review and approval status.
- Locale previews and pseudolocalization tests.

Use WebVTT for timed text; define import/export adapters for SRT/TTML when demand appears. Add bidi/RTL, Unicode normalization, IME, locale typography, line-breaking, and safe-area tests.

Translation memory and professional translation workflow can integrate with a TMS later; Storyworld should not rebuild a full TMS or make one mandatory.

---

# 25. Release, preview and rendering infrastructure

## Browser preview

Use project-owned target profiles and overlays for aspect ratio, safe areas, captions, disclosure and device frame. Preview always states exact master/rendition version.

## Deterministic rendering

For carousel/web/email/PDF derivatives, use versioned project-owned templates and a pinned server renderer. A headless browser can render HTML/CSS derivatives, but the browser version, fonts, locale, viewport and source assets must be pinned and recorded.

For media derivatives, use FFmpeg/Sharp workers. For print/PDF, decide font licensing, embedding, pagination and deterministic renderer separately.

Package signing remains in portability. Submission and publication are separate commands/authority hosts.

---

# 26. Commerce Foundry dependency assessment

Continue existing typed package boundary. Create shared contract/client packages, not shared tables.

Recommended shared artifacts:

- Generated types for NarrativeCampaignBrief, snapshots, PlacementContract, NarrativeAssetBundle, findings and receipts.
- Package verification library.
- Correlation/deep-link helpers.
- Shared design tokens and focused-review components with no direct business writes.
- Source-drift event schemas and reconciliation tests.

Commerce Foundry owns product/claim/offer/commercial approval/publication. Storyworld owns narrative canon, placements as proposals/contracts, creative masters and creative approvals.

Do not duplicate the Studio editor in Commerce Foundry. Embed a focused exact-version review component and deep-link to Studio for complex authoring.

---

# 27. Interactive-runtime dependency assessment

Continue the existing runtime-compiler package and add target adapters.

Storyworld owns:

- Canon snapshot.
- Locations/spatial references.
- NPC source definitions.
- Dialogue/mission/trigger/precondition/effect definitions.
- Items/collectibles.
- Localization and sound intent.
- Asset references, checksums, rights and release notes.

Runtime owns rendering, navigation, physics, scripting, player state, saves, deployment and raw telemetry.

Build a validation sandbox that compiles and previews immutable packages, detects dangling/impossible dependencies, enforces target budgets and returns typed acceptance/rejection receipts. The runtime must remain operable without a live Storyworld connection.

---

# 28. Design system and accessibility

Retain the vendored project-owned design-system approach. Add low-level primitives selectively rather than adopting a monolithic UI framework.

New complex primitives needed:

- Split/resizable workspace.
- Command palette.
- Virtual list/table/matrix.
- Exact-version state badge and authority line.
- Semantic diff components.
- Media compare and annotation layers.
- Graph toolbar/legend/structured fallback.
- Timeline and cue list.
- Consequence review and receipt card.
- Mobile decision surface.

Accessibility gates:

- WCAG 2.2 AA target; target size and dragging alternatives explicitly tested.
- Playwright browser matrix.
- 320px and 200% zoom.
- Keyboard-only.
- Forced colors and reduced motion.
- Touch.
- IME and bidi/RTL.
- Screen-reader expert testing for graph/editor/grid/review flows.
- Accessible generated outputs, not only the Studio UI.

Axe remains a regression tool, not a conformance claim.

---

# 29. Performance and scale strategy

| Surface | Initial scale target | Strategy |
|---|---:|---|
| Entity/review/search list | 100k records | Server pagination, FTS facets, row virtualization |
| Asset library | 100k metadata / 10k filtered | Thumbnail proxies, cursor pagination, grid virtualization, offscreen load suppression |
| Narrative outline | 10k units | Stable IDs, tree windowing, collapsed aggregates |
| Narrative Flow graph | 200–500 ordinary nodes | Scoped projection, worker layout, virtual/collapsed lanes |
| Dense analytical graph | >5k nodes only if justified | Separate WebGL renderer and strict scope |
| Timeline | Thousands of events/lanes | Windowing, range aggregates, server conflict computation |
| Matrix | 500x50 interactive baseline | 2D virtualization, keyboard focus model |
| Audio | 60-minute proxy baseline | Precomputed peaks, range requests, proxy media |
| Package | Large manifests/assets | Streamed generation/verification, background operation |

Use Web Workers for graph layout and heavy browser computations. Use server workers for media, search indexing and impact analysis. Keep rendering and domain computation separately observable.

---

# 30. Security, licensing and supply-chain review

## Immediate repository controls

1. Pin MinIO and Temporal container images by immutable version/digest; remove `latest`.
2. Pin GitHub Actions by full commit SHA through a reviewed update process.
3. Add Dependabot or equivalent controlled update PRs.
4. Generate an SBOM for Node packages and container images.
5. Add license allowlist/review checks.
6. Add OSV/CVE scanning and fail on accepted severity policy.
7. Decide and add a root repository license.
8. Align Node type definitions with runtime.
9. Prevent CDN-loaded production scripts for editors, graphs or media tools.
10. Record native binary provenance for Sharp and FFmpeg.

## Restricted-content controls

- CSP and preferably Trusted Types for editor/render surfaces.
- Upload quarantine, MIME sniffing, decompression/pixel limits, malware scanner adapter.
- EXIF/GPS stripping policy.
- Signed/presigned object URLs scoped by tenant/version/expiry.
- Log/trace/screenshot redaction.
- Provider egress allowlists and training/retention policy.
- No unrestricted external tile, collaboration or annotation service for private work.

## License observations

- Most proposed browser libraries are permissive MIT/BSD/Apache.
- ELK.js requires EPL/GPL review.
- FFmpeg is LGPL by default but can become GPL depending build options and linked codecs; pin and document the build.
- Tiptap core is MIT; hosted/commercial extensions must remain optional.
- The Storyworld repository itself currently lacks a root license file in the reviewed tree.

---

# 31. Build-versus-buy decisions

## Buy/adopt bounded infrastructure

- Low-level accessible overlays/dialogs/panels.
- Graph renderer and layout.
- Rich-editor engine.
- Virtualization and table mechanics.
- Browser testing.
- OIDC protocol implementation.
- Image/media decoding and transcoding.
- Standards parsers/serializers.

## Build project-owned

- StoryDocument AST and migrations.
- GraphViewProfile and all graph semantics.
- AnnotationTarget model.
- Temporal coordinates/intervals.
- Canon, branch, assertion, truth, belief and knowledge semantics.
- Semantic diff/merge/impact.
- Rights/consent consequences.
- Review/approval/waiver/receipt logic.
- Asset state and lineage.
- Search projection policy and result explanation.
- Runtime/commerce package authority boundaries.
- Timeline and matrix domain layers.
- All fixture and metamorphic validation.

---

# 32. Prioritized proof-of-concept plan

## POC-01 — Narrative Flow Graph

- **Question:** Can a third-party renderer meet visual-card, semantic, accessibility and authority constraints?
- **Fixtures:** Stillhouse plus branch/reconvergence probe.
- **Candidates:** XYFlow; Dagre; ELK comparison.
- **Performance:** 200–500 nodes, 300–800 edges; worker layout under 1 second; selection response under 100 ms; ordinary pan near 60 fps.
- **Accessibility:** Keyboard traversal, 200% zoom, forced colors, reduced motion, complete structured fallback.
- **Authority test:** No canvas gesture executes an acceptance-class command.
- **Decision:** Accept renderer/layout adapters, amend, or reject canvas.

## POC-02 — Spatial Graph and Floor Plan

- **Question:** Can geographic, image-based, floor-plan and abstract spatial profiles remain separate but share selection/records?
- **Fixture:** BeKindRewind plus 250-location synthetic stress fixture.
- **Candidates:** SVG/Konva, OpenSeadragon/Annotorious, XYFlow; MapLibre only for real-coordinate branch.
- **Success:** Correct containment/adjacency/access semantics, structured fallback, no coordinate conflation.

## POC-03 — Rich Scene Editor

- **Question:** Which editor foundation best implements StoryDocument without owning it?
- **Fixtures:** Long-form, editorial carousel, dialogue and audio script excerpts.
- **Candidates:** ProseMirror, Lexical, Tiptap acceleration.
- **Performance:** 50k-word document, responsive editing and save.
- **Accessibility:** IME, bidi/RTL, screen reader, keyboard, paste, mobile reading.
- **Authority:** Saving creates draft/proposal only.
- **Success:** Stable entity refs and exact AST round trip independent of editor JSON.

## POC-04 — Semantic Hierarchy Diff and Merge

- **Question:** Can stable IDs support insert/move/delete, adaptation inheritance, three-way merge and partial acceptance?
- **Fixtures:** Long-form insertion, adaptation and collaborative merge fixtures.
- **Success:** Explicit conflict objects, no positional identity, deterministic operation set and impact preview.

## POC-05 — Cross-Media Annotation

- **Question:** Can one model target fields, text, images, audio/video, graphs and timeline events?
- **Fixtures:** Editorial restricted-source, image review and audio-first fixture.
- **Candidates:** Project model; Annotorious/OSD; WaveSurfer interval adapter.
- **Success:** Exact-version targets, migration/invalidation after revisions, structured list and keyboard access.

## POC-06 — Audio Waveform and Cue Editor

- **Question:** Can Studio author timecoded script/cues without becoming a DAW?
- **Fixture:** Night Ferry Twelve.
- **Candidates:** WaveSurfer, Media Chrome, FFmpeg proxy/peaks.
- **Performance:** 60-minute proxy; first waveform under 1.5 seconds on test environment.
- **Success:** Dialogue overlap, silence, cues, interval comments, segment replacement lineage.

## POC-07 — Large Asset Library

- **Question:** Can Postgres facets, cursor pagination and virtualization support mature-scale browsing?
- **Fixture:** Generated 100k asset metadata set with 10k filtered results.
- **Candidates:** TanStack Query/Table/Virtual; Sharp thumbnails.
- **Success:** First useful result under 1 second locally, smooth scroll, no offscreen thumbnails, keyboard and screen-reader navigation.

## POC-08 — Rights and Localization Matrices

- **Question:** Can one headless grid substrate support typed multi-dimensional review?
- **Fixtures:** Rights withdrawal, regional cuts and localization fixtures.
- **Scale:** 500 rows x 50 columns.
- **Success:** Sticky headers, keyboard, validation, no color-only states, exact-version export and bulk consequence preview.

## POC-09 — Shared-Universe Impact

- **Question:** Can versioned dependencies and impact analysis stay understandable and performant?
- **Fixture:** Northbridge plus 1,000 synthetic dependencies.
- **Success:** Complete impact under 5 seconds or asynchronous operation with progress; no silent cross-property mutation.

## POC-10 — Mobile Exact-Version Review Room

- **Question:** Can high-consequence review be safe at 320–430 px?
- **Fixture:** Commerce rejection/revision and rights withdrawal.
- **Success:** Exact version, diff, blockers, consequence, formal decision and receipt; no accidental approval; reauthentication design evaluated.

## POC-11 — External Editor Checkout/Re-import

- **Question:** Can advanced editing remain non-authoritative and lossless?
- **Fixture:** One accepted image and focused replacement.
- **Success:** Signed checkout manifest, reimport candidate, derivation, selective revalidation/approval invalidation, no master overwrite.

## POC-12 — Runtime Compiler and Validation Sandbox

- **Question:** Can BeKindRewind consume deterministic packages without importing runtime state?
- **Fixture:** BeKindRewind mission slice.
- **Success:** Byte-deterministic package, checksums/signature, typed invalid-package findings, preview receipt, no player state.

---

# 33. Phased dependency roadmap

## Current alpha hardening

- Align Node types/runtime.
- Add root license decision.
- Pin container images/actions.
- Add SBOM/license/CVE policy.
- Adopt Playwright.
- Refine OpenAPI operation schemas and generate client proof.
- Adopt TanStack Query/Table/Virtual and resizable panels behind project wrappers.
- Upgrade search to FTS/pg_trgm.
- Define media worker baseline and quarantine policy.

## MVP completion

- `story-document`, `annotation-model`, `temporal-model`, `studio-client`, `search-projection`, `media-processing` packages.
- Source Inbox and source-to-canon UI.
- Scene Editor and basic Storyboard.
- Asset/Reference Library and thumbnails.
- Mature Review Room and rendition/package preview.
- SSE operation status.
- Rights and localization matrix foundations.

## Intermediate

- Accepted Narrative Flow Graph profile/renderer.
- Spatial, relationship, truth/reveal, state and lineage profiles.
- Mission/dialogue editors and runtime sandbox.
- Audio waveform/cue editing.
- Commerce Foundry focused review package.
- Localization/accessibility production.
- Integration Center and reconciliation.

## Mature

- Shared-universe and adaptation merge workspace.
- Dense graph renderer only if needed.
- Yjs draft collaboration only if measured.
- pgvector hybrid retrieval only if lexical search is insufficient.
- Advanced audio/video proxy/annotation workflows.
- Procedural seed simulator and experiment workspace.
- Enterprise operations, retention and audit.

## Conditional

- Direct multi-channel publication.
- Hosted collaboration services.
- Broad offline editing.
- External dedicated search/vector service.
- GPU/WebGL analytical views at extreme scale.
- Full translation-management integration.

---

# 34. Open decisions and proposed ADRs

Recommendations below require owner disposition; none is implied accepted.

1. **Amend DEC-0028:** Narrative Flow naming, profile-local semantics, GraphViewProfile contract.
2. **Canonical StoryDocument:** AST, schema versioning, editor adapters, exports and migrations.
3. **AnnotationTarget:** cross-media selectors, exact-version binding and invalidation.
4. **Temporal model:** story/presentation/publication/revision/timecode/uncertainty.
5. **Studio client generation:** OpenAPI authority, generation, compatibility and package boundary.
6. **Server-state and event synchronization:** Query policy, SSE, cache/privacy rules.
7. **Search projection:** FTS/trigram, facets, visibility, reconciliation, semantic-search trigger.
8. **Media processing:** quarantine, Sharp, FFmpeg build/license, proxies and budgets.
9. **Matrix/virtualization stack:** headless table/virtual and accessibility contract.
10. **Accessible drag/drop:** typed reorder commands and non-drag equivalents.
11. **Spatial renderer separation:** geographic, deep image, floor plan and abstract graph profiles.
12. **Collaboration trigger:** recorded facts first; conditions for Yjs/CRDT adoption.
13. **Production transport/BFF:** OIDC sessions, same-origin model, CSRF/CSP, forwarding and authority.
14. **Policy expression language:** deterministic built-ins first; CEL adoption trigger.
15. **Supply-chain policy:** licenses, SBOM, CVEs, action/container pinning, native binaries.
16. **Local draft/offline security:** encryption, retention, permission revocation and shared-device rules.
17. **Repository licensing:** owner-selected license and contributor posture.

---

# 35. Repository change recommendations

## Internal packages to add

```text
packages/studio-client
packages/story-document
packages/graph-projection
packages/annotation-model
packages/temporal-model
packages/search-projection
packages/media-processing
packages/studio-complex-ui   # optional; project-owned wrappers only
packages/fixture-ui-harness
```

## Adapter interfaces

- `GraphRenderer` and `GraphLayout`.
- `StoryEditor`.
- `AnnotationRenderer`.
- `MediaProcessor`.
- `SearchProvider` and `RetrievalProvider`.
- `StudioEventStream`.
- `IdentityProvider`.
- `ExternalEditor`.
- `GeographicMapRenderer`, `FloorPlanRenderer`, `DeepImageViewer`.

## Boundary cleanup

- Remove Studio's need to compile against kernel/persistence/storage internals; move integration setup into a test harness package.
- Generate Studio client types from OpenAPI.
- Keep Engine API framework/transport replaceable around the same application service.

## Tests/fixtures

- Add each POC as a fixture-driven test project with acceptance/rejection criteria.
- Add metamorphic UI tests: reorder, insert, adapt, revoke rights, correct evidence, localize, provider swap and export/reimport.
- Add browser performance baselines and accessibility matrix.
- Add search index drift and rebuild tests.
- Add media bomb/malformed file corpus.
- Add supply-chain/license policy tests.

---

# 36. Concise recommended stack

## Keep

- Node 22, TypeScript 5.9, pnpm 10.
- Next.js 15 / React 19.
- Project-owned vendored design system and Tailwind tokens.
- PostgreSQL 16 + direct `pg` + RLS.
- S3-compatible storage/MinIO.
- Temporal.
- JSON Schema/OpenAPI/AsyncAPI/CloudEvents.
- Node crypto/Ed25519 portability.
- Existing providers/evaluation/connectors/runtime compiler.

## Add now

- TanStack Query, Table and Virtual behind Storyworld wrappers.
- react-resizable-panels.
- Selective Radix primitives.
- Playwright.
- openapi-typescript + openapi-fetch.
- Ajv adapter.
- PostgreSQL FTS + pg_trgm.
- Sharp worker.
- SSE operation/invalidation channel using native web APIs.

## Prototype before adoption

- XYFlow + Dagre; ELK optional.
- ProseMirror versus Lexical; Tiptap as acceleration candidate.
- dnd-kit.
- Annotorious/OpenSeadragon/Konva by spatial/annotation profile.
- WaveSurfer + Media Chrome + pinned FFmpeg.
- Fastify transport migration when upload/SSE requirements justify it.
- openid-client in a same-origin BFF.

## Deliberately absent

- ORM.
- GraphQL.
- Global client shadow-domain state store.
- Separate search/vector database.
- Universal graph/canvas.
- Monolithic component framework.
- CRDT collaboration by default.
- Hosted editor/annotation/map dependencies for restricted work.

---

# 37. Explicitly rejected approaches

1. One universal canvas for narrative, spatial, truth, rights, lineage and release work.
2. Treating the Narrative Flow graph as a physical spatial graph.
3. A library graph model as the Storyworld domain model.
4. Editor-private JSON as the permanent story contract.
5. Source-code Git merge as canon merge authority.
6. CRDTs for all records or as automatic canon acceptance.
7. Separate vector database/search service before measured PostgreSQL limits.
8. OPA/Rego or JSON Logic as a universal narrative semantics engine.
9. Shared Commerce Foundry/Storyworld database or duplicated editor.
10. Temporal Web as the Storyworld job interface.
11. Swipe-to-approve or drag-to-accept interactions.
12. Monolithic enterprise UI frameworks or grids without a demonstrated need.
13. Commercial graph engines in the core path before permissive options fail a POC.
14. Browser/WASM FFmpeg as the primary production media pipeline.
15. `fluent-ffmpeg` or another abandoned wrapper as the media authority; invoke a pinned executable through a project adapter.
16. Mutable `latest` container tags in CI or release infrastructure.
17. CDN-loaded editor, graph, annotation or media code for production.
18. A client-side copy of canonical business state.
19. Automatic performance-driven canon/template mutation.
20. External publication implied by local package or release creation.

---

# 38. Important overlooked areas

The original prompt is extensive, but these additional dependencies need explicit treatment:

- IME/composition and Unicode normalization.
- Bidi/RTL and locale line breaking.
- Font licensing, embedding and deterministic typography.
- CSP and Trusted Types for editors/renderers.
- Malware scanning, decompression bombs and media parser sandboxing.
- EXIF/GPS and color-profile policy.
- Signing-key rotation, trust stores and algorithm agility.
- StoryDocument and fixture schema migration tools.
- Rule execution budgets and sandbox limits.
- Feature flags and target capability negotiation.
- Search/index rebuild and drift reconciliation.
- Legal hold, retention and deletion propagation.
- Local-draft encryption and logout/permission revocation.
- API quotas, rate limits and abuse controls.
- Worker CPU/memory/storage budgets.
- Deterministic browser/template rendering and pinned fonts.
- Plugin/template extension sandbox and signature policy.
- Accessibility of generated outputs, not only Studio.
- Real assistive-technology participant evaluation.
- Telemetry privacy and restricted-content redaction.
- Proxy/range request authorization and cache headers.
- Backpressure for uploads, exports and event streams.

---

# 39. Dependency recommendation register

The machine-readable register accompanies this dossier. Summary counts are generated from that register.

| ID | Candidate | Capability | Reviewed version | License | Disposition | Phase |
|---|---|---|---|---|---|---|
| DEP-001 | Current Node/TypeScript/Next/React platform | Existing Studio and Engine execution platform | Node 22; TypeScript 5.9.3; Next 15.5.22; React/ReactDOM 19.2.8; pnpm 10.20.0 | Mixed OSS licenses per package; project repository license not found | **Adopt now** | Current alpha hardening |
| DEP-002 | @tanstack/react-query | Server-state caching, cancellation, pagination, invalidation, and retry control | 5.101.4 | MIT | **Adopt now** | MVP hardening |
| DEP-003 | @tanstack/react-table | Headless table and matrix behavior | 8.21.3 | MIT | **Adopt now** | MVP completion |
| DEP-004 | @tanstack/react-virtual | Large lists, tables, grids, and lane virtualization | 3.14.8 | MIT | **Adopt now** | MVP completion |
| DEP-005 | react-resizable-panels | Resizable navigation, primary canvas, inspector, and bottom rails | 4.12.2 | MIT | **Adopt now** | MVP hardening |
| DEP-006 | Radix UI primitives, selectively adopted | Dialogs, alert dialogs, popovers, menus, tooltips, selects, and tabs | @radix-ui/react-dialog 1.1.23; evaluate each primitive independently | MIT | **Adopt now** | MVP hardening |
| DEP-007 | @playwright/test | Cross-browser E2E, trusted input, mobile emulation, screenshots, traces, multi-user flows | 1.62.0 | Apache-2.0 | **Adopt now** | Current alpha hardening |
| DEP-008 | openapi-typescript | Generate TypeScript types from OpenAPI 3.1 | 7.13.0 | MIT | **Adopt now** | MVP hardening |
| DEP-009 | openapi-fetch | Small typed fetch client using generated OpenAPI types | 0.17.0 | MIT | **Adopt now** | MVP hardening |
| DEP-010 | Ajv | JSON Schema 2020-12 validation in Node/browser and standalone generation | 8.20.0 | MIT | **Adopt now** | MVP hardening |
| DEP-011 | sharp | Thumbnail/proxy generation, format normalization, metadata and color handling | 0.35.3 | Apache-2.0 | **Adopt now** | MVP completion |
| DEP-012 | PostgreSQL full-text search | Lexical search, ranking, highlighting, language configurations | PostgreSQL 16 built-in | PostgreSQL License | **Adopt now** | MVP hardening |
| DEP-013 | PostgreSQL pg_trgm | Typo tolerance, similarity, indexed ILIKE/regex | PostgreSQL 16 extension | PostgreSQL License | **Adopt now** | MVP hardening |
| DEP-014 | openid-client | Standards-based OAuth 2/OpenID Connect relying-party client | 6.8.4 | MIT | **Prototype** | Production identity crossing |
| DEP-015 | Fastify | Structured Node API transport, JSON Schema validation, multipart, streaming, SSE/plugin ecosystem | 5.10.0 | MIT | **Prototype** | MVP completion when uploads/SSE arrive |
| DEP-016 | Hono | Web-standard lightweight router/middleware across Node and edge runtimes | 4.12.32 | MIT | **Defer** | Transport ADR alternative |
| DEP-017 | @xyflow/react | Interactive node/edge canvas for Narrative Flow and moderate graph profiles | 12.11.2 | MIT | **Prototype** | Post-DEC-0028 graph task |
| DEP-018 | @dagrejs/dagre | Deterministic directed graph layout for moderate DAG-like flow graphs | 3.0.0 | MIT | **Prototype** | Narrative Flow POC |
| DEP-019 | elkjs | Advanced layered/compound/port-aware graph layout | 0.12.0 | EPL-2.0 OR GPL-3.0-or-later | **Prototype** | Graph layout comparison |
| DEP-020 | Cytoscape.js | Graph model, rendering, algorithms, and dense network interaction | 3.34.0 | MIT | **Defer** | Only after scale tests |
| DEP-021 | Sigma.js + Graphology | WebGL rendering for very large analytical graphs | Sigma 3.0.3; Graphology 0.26.0 | MIT | **Defer** | Mature scale only |
| DEP-022 | ProseMirror | Schema-constrained rich-text, transactions, plugins, decorations, history, collaboration adapters | prosemirror-model 1.25.11; prosemirror-state 1.4.4 | MIT | **Prototype** | MVP Scene Editor |
| DEP-023 | Lexical | Extensible accessible editor foundation with React integration | 0.48.0 | MIT | **Prototype** | Editor comparison |
| DEP-024 | Tiptap Core | Headless ProseMirror-based toolkit and faster UI integration | 3.27.1 | MIT core; commercial/cloud features are separate | **Prototype** | Editor comparison |
| DEP-025 | CodeMirror 6 | Markdown, JSON, transcript, subtitle, and rule-source editing | codemirror 6.0.2; @codemirror/state 6.7.1 | MIT | **Defer** | MVP/intermediate supporting editors |
| DEP-026 | @dnd-kit/core and sortable | Accessible direct manipulation for cards, lanes, boards, collections, and tracks | Stable 6.x core; exact current version must be reverified at prototype kickoff | MIT | **Prototype** | Storyboard/Arc board |
| DEP-027 | W3C Web Annotation model-inspired project schema | Common body/target/selectors for text, image, audio, video, graph, timeline, and structured fields | W3C Recommendation | W3C document terms; project implementation owned by Storyworld | **Build project-owned capability** | MVP completion |
| DEP-028 | @annotorious/react | Image rectangle/polygon annotation UI | 3.8.8 | BSD-3-Clause | **Prototype** | Review Room media annotations |
| DEP-029 | OpenSeadragon | Large tiled images, high-resolution maps and floor plans | 6.0.2 | BSD-3-Clause | **Prototype** | Floor plans/high-res review |
| DEP-030 | Konva + react-konva | Project-owned image-map/floor-plan overlays and direct 2D manipulation | Konva 10.3.0; react-konva 19.2.5 | MIT | **Prototype** | Spatial authoring POC |
| DEP-031 | WaveSurfer.js | Waveform rendering, playback, regions, and timeline plugins | 7.12.7 | BSD-3-Clause | **Prototype** | Audio-first intermediate |
| DEP-032 | Media Chrome | Composable standards-based audio/video controls | 4.19.2 | MIT | **Prototype** | Audio/video review |
| DEP-033 | FFmpeg | Proxy, thumbnail, waveform, transcode, subtitle, and media inspection pipeline | 8.1.2 | LGPL-2.1+ baseline; GPL applies if GPL components/configuration are enabled | **Prototype** | MVP media worker then intermediate audio/video |
| DEP-034 | MapLibre GL JS | Geographic vector maps when actual coordinates and map projections exist | 6.0.0 | BSD-3-Clause | **Defer** | Only when real geography is required |
| DEP-035 | Yjs with self-hosted provider such as Hocuspocus | CRDT document collaboration, presence, offline updates | Use stable Yjs v13 for production evaluation; Yjs v14 is still release-candidate; Hocuspocus 4.1.0 | MIT | **Defer** | Mature after measured concurrent-editing demand |
| DEP-036 | pgvector | Embeddings, exact/approximate nearest-neighbor search, hybrid retrieval inside PostgreSQL | 0.8.2 minimum | PostgreSQL License | **Defer** | Mature only after lexical search benchmarks fail |
| DEP-037 | Common Expression Language (CEL) | Small, typed, non-Turing-complete expressions for configurable deterministic predicates | Specification release 0.25.2 | Apache-2.0 | **Defer** | Intermediate configurable policy packs |
| DEP-038 | Open Policy Agent | General policy-as-code for infrastructure/access/configuration decisions | 1.17.0 | Apache-2.0 | **Reject** | Not planned for narrative domain; reconsider only for enterprise infrastructure policy |
| DEP-039 | WebVTT and Media Fragments standards | Subtitles/captions/descriptions/chapters and temporal/spatial media targeting | WebVTT Candidate Recommendation Draft 2026; Media Fragments 1.0 Recommendation | W3C document terms; project parsers/serializers owned or bounded OSS | **Adopt now** | MVP media/annotation contracts |

---

# 40. Official source appendix

The following official project, standards, documentation, release, or npm pages were used for point-in-time dependency review:

- https://github.com/jamesryancooper/storyworld
- https://www.npmjs.com/package/@tanstack/react-query
- https://www.npmjs.com/package/@tanstack/react-table
- https://www.npmjs.com/package/@tanstack/react-virtual
- https://www.npmjs.com/package/react-resizable-panels
- https://www.npmjs.com/package/@radix-ui/react-dialog
- https://www.npmjs.com/package/@playwright/test
- https://www.npmjs.com/package/openapi-typescript
- https://www.npmjs.com/package/openapi-fetch
- https://www.npmjs.com/package/ajv
- https://www.npmjs.com/package/sharp
- https://www.postgresql.org/docs/16/textsearch.html
- https://www.postgresql.org/docs/16/textsearch-indexes.html
- https://www.postgresql.org/docs/16/pgtrgm.html
- https://www.npmjs.com/package/openid-client
- https://www.npmjs.com/package/fastify
- https://www.npmjs.com/package/hono
- https://www.npmjs.com/package/@xyflow/react
- https://www.npmjs.com/package/@dagrejs/dagre
- https://www.npmjs.com/package/elkjs
- https://www.npmjs.com/package/cytoscape
- https://www.npmjs.com/package/sigma
- https://www.npmjs.com/package/graphology
- https://www.npmjs.com/package/prosemirror-model
- https://www.npmjs.com/package/prosemirror-state
- https://www.npmjs.com/package/lexical
- https://www.npmjs.com/package/@tiptap/core
- https://www.npmjs.com/package/codemirror
- https://docs.dndkit.com/presets/sortable
- https://docs.dndkit.com/api-documentation/sensors/keyboard
- https://www.w3.org/TR/annotation-model/
- https://www.w3.org/TR/media-frags/
- https://www.npmjs.com/package/@annotorious/react
- https://www.npmjs.com/package/openseadragon
- https://www.npmjs.com/package/konva
- https://www.npmjs.com/package/react-konva
- https://github.com/katspaugh/wavesurfer.js/releases
- https://www.npmjs.com/package/media-chrome
- https://ffmpeg.org/download.html
- https://ffmpeg.org/legal.html
- https://www.npmjs.com/package/maplibre-gl
- https://github.com/yjs/yjs
- https://github.com/yjs/y-websocket
- https://github.com/ueberdosis/hocuspocus
- https://github.com/pgvector/pgvector
- https://github.com/google/cel-spec
- https://www.openpolicyagent.org/docs/policy-language
- https://www.w3.org/TR/webvtt1/

Repository evidence is bound to the reviewed commit and repository paths listed throughout this dossier.
