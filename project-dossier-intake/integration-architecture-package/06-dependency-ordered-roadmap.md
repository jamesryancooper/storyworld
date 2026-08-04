# Dependency-Ordered Implementation Roadmap

No calendar estimates are implied. Each phase begins only after its governing decisions and predecessor exit criteria are satisfied.

## Phase 1 — Owner-direction disposition and successor decisions

**Preconditions:** completed questionnaire registered verbatim; current accepted decisions inventoried.  
**Decisions:** DEC-0040 through DEC-0044 drafts; DEC-0031/0033 replacement recommendation.  
**Scope:** reconcile product, command, creative-system, recipe, provider, egress, cost, and credential direction.  
**Fixtures:** adversarial owner-direction examples; no provider calls.  
**Validation:** intake manifest, decision links, no silent supersession.  
**Exit:** owner accepts/amends/defers the first decision set and resolves or explicitly defers credential scope.  
**Deferred:** implementation.  
**Risk:** treating questionnaire as already canonical.  
**Replacement:** decisions are records; no technical lock-in.

## Phase 2 — Creative-command contracts

**Preconditions:** DEC-0040/0041 accepted.  
**Contracts:** CON-001–003, 009–011, 020–024.  
**Scope:** command, context, interpretation, plan, operation, proposal, partial acceptance, decision, revision, invalidation.  
**Fixtures:** text, voice transcript stub, multi-operation proposal.  
**Validation:** JSON Schema, OpenAPI specificity, canonical JSON/hash, lifecycle tests.  
**Exit:** mock-only end-to-end proposal/partial-acceptance flow.  
**Risk:** free-form operation payloads.  
**Replacement:** public contracts independent of model/editor.

## Phase 3 — Consequence and human-authority model

**Preconditions:** Phase 2.  
**Decisions:** DEC-0041; current DEC-0021 remains controlling.  
**Scope:** apply/accept/approve/waive/authorize verbs, low/medium/high gates, current owner-only enforcement.  
**Fixtures:** low preview, medium active edit, high master acceptance.  
**Validation:** permission matrix, policy tests, no AI actor acceptance.  
**Exit:** every operation receives deterministic minimum consequence and correct gate.  
**Deferred:** mature role expansion.  
**Risk:** UI wording granting implied authority.  
**Replacement:** role policy behind stable authority service.

## Phase 4 — Creative Direction and resolved realization

**Preconditions:** DEC-0042; relevant book research packages.  
**Contracts:** CON-007, CON-008, CON-025.  
**Scope:** separate creative systems, scope bindings, conflict resolution, derived Look projection.  
**Fixtures:** still, film, audio-only, picture book, interactive scene.  
**Validation:** deterministic resolution, explicit override/counterpoint, no monolithic Look.  
**Exit:** same fixture resolves reproducibly with source revision trace.  
**Risk:** over-modeling every craft term.  
**Replacement:** extensible vocabulary/profile system.

## Phase 5 — Provider-boundary correction

**Preconditions:** DEC-0043; Phases 2–4.  
**Contracts:** CON-026, CON-028, CON-029.  
**Scope:** eliminate prompt/seed from canonical recipe; introduce ProviderExecutionPlan/Result; migrate current fixtures.  
**Fixtures:** existing mock/fal still generation plus focused regeneration.  
**Validation:** ADR-0015 conformance, schemas match code, Studio no longer writes provider fields into recipe.  
**Exit:** current B1 flow works through corrected separation.  
**Risk:** breaking accepted alpha fixture replay.  
**Replacement:** adapter compatibility layer and data migration only for alpha data if any.

## Phase 6 — Provider-egress and credential foundations

**Preconditions:** DEC-0044; credential-scope owner decision or explicit temporary default.  
**Contracts:** CON-004–006, 030–032.  
**Scope:** egress mapping, credential binding, provider policy, model approval, cost policy.  
**Fixtures:** public/private/restricted/highly restricted; workspace/member credential cases.  
**Validation:** most restrictive wins, no secret serialization, no stale/revoked credential fallback.  
**Exit:** policy preflight can approve/refuse a mock provider request with evidence.  
**Risk:** conflating access and egress.  
**Replacement:** policy data and provider adapters are independent.

## Phase 7 — Asset custody and transformation records

**Preconditions:** DEC-0048; corrected provider boundary.  
**Contracts:** CON-035 plus lifecycle amendments.  
**Scope:** disposable experiments, provider output admission, external workfiles, transformation lineage, retention.  
**Fixtures:** temporary output, governed candidate, rejected candidate, external workfile.  
**Validation:** content hashes, no provider URL custody, retention/deletion rules.  
**Exit:** every admitted output has custody, provenance, lifecycle, and rollback path.  
**Risk:** storage explosion.  
**Replacement:** storage backend behind content-addressed interface.

## Phase 8 — Proposal, preview, diff, and reversibility

**Preconditions:** Phases 2, 3, 7.  
**Contracts:** CON-020–024.  
**Scope:** previews, operation diff, partial acceptance, branching, immutable revision, undo/reversion.  
**Fixtures:** image, sequence, cross-media mock proposal.  
**Validation:** dependency-safe partial acceptance, stale-base refusal, accessible structured diff.  
**Exit:** user can accept one operation and revert exact result.  
**Risk:** preview mistaken for result.  
**Replacement:** preview renderer pluggable.

## Phase 9 — OpenRouter capability gateway

**Preconditions:** Phases 2, 5, 6; POC-02.  
**Scope:** structured interpretation/planning, fixed/automatic profiles, tool-call proposals, usage/cost, unknown outcome.  
**Fixtures:** public draft, private ZDR plan, prohibited route.  
**Validation:** strict schema, actual route check, no tool direct execution.  
**Exit:** accepted capability profiles and recorded-provider replay.  
**Risk:** provider policy drift.  
**Replacement:** direct-provider adapter passes same contracts.

## Phase 10 — fal queue and custody adapter

**Preconditions:** Phases 5–7; POC-03.  
**Scope:** async queue, webhook/poll, cancellation, retries/fallback, retention headers, late results, actual cost.  
**Fixtures:** success, duplicate callback, expired URL, late completion.  
**Validation:** idempotent inbox, immediate ingest, no public URL authority.  
**Exit:** one image and one long-running operation complete safely.  
**Risk:** hidden provider retries/fallbacks.  
**Replacement:** provider execution interface and recorded transcript.

## Phase 11 — Native image workflow

**Preconditions:** Phases 4–10; DEC-0046; POC-04.  
**Contracts:** CON-012 plus mask/annotation profile.  
**Scope:** semantic selection, common image edits, alternatives, continuity locks, fal/direct route.  
**Fixtures:** removal, relight, coat correction, extend, multi-source composite.  
**Validation:** identity/continuity/text/rights/custody evaluations.  
**Exit:** normal fixture completed without InvokeAI.  
**Risk:** false preservation claims.  
**Replacement:** endpoint/workflow substitution.

## Phase 12 — Voice and contextual selection

**Preconditions:** Phases 2, 8, 9; POC-01.  
**Scope:** ephemeral voice capture, transcription route, confidence/correction, selection snapshot, steering.  
**Fixtures:** selected object, playhead command, mistranscription.  
**Validation:** TTL/deletion, text parity, stale selection handling.  
**Exit:** consequential voice command cannot run against unintended target.  
**Risk:** sensitive audio egress.  
**Replacement:** transcription provider profile.

## Phase 13 — AI-mediated professional precision

**Preconditions:** Native image and voice; POC-05.  
**Scope:** exact frames/units, mask refinement, tracking, curves, color/audio reference matching, safe-area controls.  
**Fixtures:** expert and beginner tasks.  
**Validation:** semantic/numeric synchronization, accessible structured alternative.  
**Exit:** expert deems controls precise and beginner completes task.  
**Risk:** recreating provider-native complexity.  
**Replacement:** precision primitives remain provider-neutral.

## Phase 14 — Native video workflow

**Preconditions:** Phases 2–10, 13; DEC-0046; POC-06.  
**Contracts:** CON-013–016, CON-027.  
**Scope:** semantic timeline, typed edits, deterministic preview, captions/audio, generated inserts, variants.  
**Fixtures:** 60-second scene and vertical adaptation.  
**Validation:** frame/time correctness, dialogue/continuity, preview reproducibility.  
**Exit:** fixture completed without external NLE.  
**Risk:** scope creep into universal NLE.  
**Replacement:** external finishing remains escape hatch.

## Phase 15 — Evaluation and continuity expansion

**Preconditions:** DEC-0049; native image/video operation contracts.  
**Contracts:** CON-037/038.  
**Scope:** command, preservation, image, video, audio, score, graphic, provider, rights, external round-trip evaluations.  
**Fixtures:** golden families and injected defects.  
**Validation:** each seeded defect caught by owning layer; uncertainty visible.  
**Exit:** no claimed capability lacks a positive and negative fixture.  
**Risk:** deceptive score or model overreach.  
**Replacement:** evaluator plugins behind plan/finding contracts.

## Phase 16 — Self-hosted ComfyUI workflow registry

**Preconditions:** DEC-0045; provider/egress/custody; POC-07.  
**Contracts:** CON-033/034.  
**Scope:** workflow registry, node/endpoint allowlist, isolation, promotion, operator view.  
**Fixtures:** identity workflow, deterministic preprocessing, malicious node.  
**Validation:** no unapproved egress/node, reproducibility, replacement.  
**Exit:** production workflow executes without graph authority.  
**Risk:** arbitrary code/supply chain.  
**Replacement:** direct fal or alternate orchestrator.

## Phase 17 — Blender and InvokeAI precision integrations

**Preconditions:** DEC-0047; checkout contracts; native workflows.  
**Contracts:** CON-039–042.  
**Scope:** standard package/sidecar, tool detection/launch, untrusted return, workfile custody.  
**Fixtures:** 3D scene and difficult image mask.  
**Validation:** portable output, no plugin requirement, concurrent return.  
**Exit:** each tool can disappear without losing authoritative work.  
**Risk:** native workfile dependencies/scripts.  
**Replacement:** new ExternalEditorProfile.

## Phase 18 — OTIO, Kdenlive, and Resolve integrations

**Preconditions:** Native video, DEC-0047, POC-08.  
**Contracts:** CON-041–044.  
**Scope:** OTIO profile, project settings sidecar, semantic diff, loss report, local Resolve connector.  
**Fixtures:** same timeline round-tripped through both editors.  
**Validation:** stable IDs, unsupported effects visible, no silent overwrite.  
**Exit:** portable returned edit reconciles to proposal.  
**Risk:** automation/version/licensing differences.  
**Replacement:** OTIO and common connector preserve portability.

## Phase 19 — Cross-media commands

**Preconditions:** Native image/video, creative systems, audio/graphic operation stubs; POC-09.  
**Scope:** coordinated operation groups, preview, partial acceptance, counterpoint.  
**Fixtures:** “make the scene colder.”  
**Validation:** separate cost/egress/evaluation per domain; valid subset acceptance.  
**Exit:** one command changes at least four media domains coherently.  
**Risk:** generic mood mutation.  
**Replacement:** group orchestration independent of media adapters.

## Phase 20 — Astro export

**Preconditions:** DEC-0050, channel/package contracts, POC-10.  
**Scope:** typed content/package generation, static build, accessibility, build receipt.  
**Fixtures:** serial property.  
**Validation:** reproducible build, no remote unpinned assets, rights/disclosure complete.  
**Exit:** approved package can build without publishing.  
**Risk:** conflating build and deployment.  
**Replacement:** Astro profile behind InterchangeProfile.

## Phase 21 — Publication scheduler

**Preconditions:** Astro export, DEC-0050, no live connector needed.  
**Contracts:** CON-045–048.  
**Scope:** exact authorization, schedule, revalidation, package preparation, pause/cancel, unknown outcome.  
**Fixtures:** future Astro handoff and mock social connector.  
**Validation:** material-change invalidation and no content mutation.  
**Exit:** scheduler executes only exact authorization.  
**Risk:** scheduler becoming creative authority.  
**Replacement:** connector-specific executors behind job contract.

## Phase 22 — Instagram export and later direct connector

**Preconditions:** successor priority accepted; scheduler/package stable.  
**Scope:** capability profiles, updated export, then separately authorized direct connector.  
**Fixtures:** image, carousel, reel, story where supported.  
**Validation:** current platform research, account capability, processing status, receipt.  
**Exit:** export first; direct activation only through separate gate.  
**Risk:** mutable platform API/review.  
**Replacement:** package remains permanent.

## Phase 23 — Commerce Foundry handoff

**Preconditions:** DEC-0051; POC-11; existing simulator.  
**Contracts:** CON-049–051.  
**Scope:** campaign/print bundles, proof, separate commercial review, vendor/order receipts.  
**Fixtures:** commercial rejection and print order simulation.  
**Validation:** no Storyworld vendor credential/approval leakage.  
**Exit:** CF can reject and return status without corrupting Storyworld acceptance.  
**Risk:** shared-table shortcut.  
**Replacement:** signed inbox/outbox remains.

## Phase 24 — Browser and Godot runtime vertical slices

**Preconditions:** DEC-0052; POC-12.  
**Contracts:** CON-019, CON-052/053.  
**Scope:** one shared package, two target adapters, observations/receipts.  
**Fixtures:** narrow branching mission.  
**Validation:** cross-target parity, save-state separation, no canon mutation.  
**Exit:** both targets accept same source package with explicit loss reports.  
**Risk:** target formats becoming source authority.  
**Replacement:** target adapter boundary.

## Phase 25 — X and TikTok export/connectors

**Preconditions:** package/scheduler mature; platform eligibility and review confirmed.  
**Scope:** export profiles first; direct connectors only if platform policies fit small-team product.  
**Fixtures:** media post/draft, status/unknown outcome.  
**Validation:** current external policy, consent-to-upload UX, quota, receipt.  
**Exit:** no direct connector where eligibility cannot be met.  
**Risk:** API pricing/audit/intended-use mismatch.  
**Replacement:** governed handoff packages.

## Phase 26 — Managed credentials, customer-managed packaging, and specialist integrations

**Preconditions:** owner hosted-offering decision; mature usage/cost/role model.  
**Scope:** optional managed billing, deployment installer/manifests, backup/restore, Krita/Inkscape/darktable/Ardour/MuseScore/Scribus as demand proves.  
**Fixtures:** customer-managed restore, credential rotation, one specialist round trip.  
**Validation:** tenant isolation, licensing, supply chain, portability, supportability.  
**Exit:** deployment and integration can be replaced without data migration.  
**Risk:** operational overreach.  
**Replacement:** stable contracts and external-tool profiles.
