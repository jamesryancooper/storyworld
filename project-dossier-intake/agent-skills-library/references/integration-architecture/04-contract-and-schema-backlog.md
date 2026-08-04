# Contract and Schema Backlog

**Contracts:** 53  
**Status:** staged proposal; contracts are not canonical until their governing decisions are accepted.

## Rules

- A contract is Storyworld-owned unless its status explicitly says external or derived.
- Provider/editor/runtime private formats remain behind adapters.
- Every canonical contract uses immutable versions and stable IDs.
- External and mutable standards profiles record effective dates and source evidence.
- Contract introduction requires at least two materially different fixtures unless it is a standards-mandated boundary.

## Dependency waves

| Wave | Meaning |
|---:|---|
| 1 | Governance and creative foundation |
| 2 | Intent, typed operations, proposals, decisions |
| 3 | Realization and provider execution |
| 4 | Lineage, annotation, evaluation |
| 5 | External tools and interchange |
| 6 | Delivery, commerce, and runtimes |

## Register

| ID | Contract | Wave | Status | Authority | Governing decision | Depends on |
|---|---|---:|---|---|---|---|
| CON-001 | `ConsequenceClassification` | 1 | canonical | canonical policy vocabulary | DEC-0041 | — |
| CON-002 | `CreativeContext` | 1 | canonical | canonical command input snapshot | DEC-0041 | — |
| CON-003 | `CreativeCommand` | 1 | canonical | canonical governed command record | DEC-0041 | CON-001, CON-002 |
| CON-004 | `ProviderEgressDecision` | 1 | canonical | canonical policy decision | DEC-0044 | — |
| CON-005 | `CostPolicy` | 1 | canonical | canonical policy | DEC-0044 | — |
| CON-006 | `CredentialBinding` | 1 | canonical+external secret | canonical nonsecret binding; secret externalized to credential store | DEC-0044 | — |
| CON-007 | `CreativeSpecification` | 1 | canonical | canonical creative authority after acceptance | DEC-0042 | — |
| CON-008 | `CreativeBinding` | 1 | canonical | canonical | DEC-0042 | CON-007 |
| CON-009 | `CreativeInterpretation` | 2 | canonical proposal | canonical proposal evidence, not accepted creative state | DEC-0041 | CON-001, CON-003 |
| CON-010 | `CreativePlan` | 2 | canonical proposal | canonical proposal evidence | DEC-0041 | CON-009, CON-004, CON-005 |
| CON-011 | `CreativeOperation` | 2 | canonical | canonical proposed/applied operation | DEC-0041 | CON-001, CON-002 |
| CON-012 | `ImageOperation` | 2 | canonical | canonical operation payload | DEC-0046 | CON-011 |
| CON-013 | `EditorialSequence` | 2 | canonical | canonical production edit state | DEC-0046 | — |
| CON-014 | `VideoEditOperation` | 2 | canonical | canonical operation payload | DEC-0046 | CON-011, CON-013 |
| CON-015 | `AudioEditOperation` | 2 | canonical | canonical operation payload | DEC-0046 | CON-011 |
| CON-016 | `MusicOperation` | 2 | canonical | canonical operation payload | DEC-0046 | CON-011 |
| CON-017 | `GraphicLayoutOperation` | 2 | canonical | canonical operation payload | DEC-0046 | CON-011 |
| CON-018 | `SpatialEditOperation` | 2 | canonical | canonical operation payload | DEC-0046 | CON-011 |
| CON-019 | `RuntimeContentOperation` | 2 | canonical | canonical authored content operation | DEC-0052 | CON-011 |
| CON-020 | `EditProposal` | 2 | canonical proposal | canonical proposal evidence | DEC-0041 | CON-010, CON-011 |
| CON-021 | `PreviewArtifact` | 2 | derived evidence | derived evidence | DEC-0041 | CON-020 |
| CON-022 | `CreativeDecision` | 2 | canonical | canonical human/policy decision | DEC-0041 | CON-020 |
| CON-023 | `CreativeRevision` | 2 | canonical | canonical version record | DEC-0041 | CON-022 |
| CON-024 | `ApprovalInvalidation` | 2 | derived canonical evidence | canonical derived policy result | DEC-0041 | CON-011, CON-023 |
| CON-025 | `ResolvedRealizationSpec` | 3 | derived canonical | derived canonical compilation artifact | DEC-0042 | CON-007, CON-008, CON-010 |
| CON-026 | `GenerationRecipe` | 3 | canonical | canonical execution specification | DEC-0043 | CON-025, CON-011 |
| CON-027 | `DeterministicProcessingPlan` | 3 | canonical | canonical execution specification | DEC-0048 | CON-011 |
| CON-028 | `ProviderExecutionPlan` | 3 | derived temporary/evidence | derived execution artifact | DEC-0043 | CON-026, CON-004, CON-005, CON-006 |
| CON-029 | `ProviderExecutionResult` | 3 | evidence | external execution evidence | DEC-0043 | CON-028 |
| CON-030 | `ProviderCapabilityProfile` | 3 | canonical research-backed | canonical mutable policy profile | DEC-0043 | — |
| CON-031 | `ProviderPolicy` | 3 | canonical | canonical policy | DEC-0044 | CON-004, CON-030 |
| CON-032 | `ModelCapabilityApproval` | 3 | canonical | canonical policy decision | DEC-0043 | CON-030, CON-031 |
| CON-033 | `WorkflowDefinition` | 3 | canonical+external graph | canonical workflow registry metadata; graph derived execution detail | DEC-0045 | CON-030, CON-031 |
| CON-034 | `WorkflowPromotion` | 3 | canonical | canonical human/policy decision | DEC-0045 | CON-033 |
| CON-035 | `TransformationRecord` | 4 | canonical | canonical lineage | DEC-0048 | CON-023, CON-027, CON-029 |
| CON-036 | `AnnotationTarget` | 4 | canonical | canonical annotation selector | DEC-0047 | — |
| CON-037 | `EvaluationPlan` | 4 | canonical | canonical policy/specification | DEC-0049 | CON-025, CON-031 |
| CON-038 | `EvaluationFinding` | 4 | canonical | canonical evidence/finding | DEC-0049 | CON-037 |
| CON-039 | `ExternalEditorCheckout` | 5 | canonical+external package | canonical checkout record | DEC-0047 | CON-004, CON-035 |
| CON-040 | `ExternalEditorReturn` | 5 | canonical+external inputs | canonical import evidence | DEC-0047 | CON-039, CON-035 |
| CON-041 | `InterchangeProfile` | 5 | canonical research-backed | canonical mutable standards profile | DEC-0047 | — |
| CON-042 | `ConversionLossReport` | 5 | evidence | derived evidence | DEC-0047 | CON-041 |
| CON-043 | `EditorialHandoffPackage` | 5 | derived package | derived signed package | DEC-0047 | CON-013, CON-039, CON-041 |
| CON-044 | `EditorialReturnPackage` | 5 | external/evidence | external evidence package | DEC-0047 | CON-040, CON-042, CON-043 |
| CON-045 | `ChannelPackage` | 6 | canonical package | canonical approved package state | DEC-0050 | CON-041, CON-037 |
| CON-046 | `PublicationAuthorization` | 6 | canonical | canonical high-consequence human decision | DEC-0050 | CON-045 |
| CON-047 | `PublicationJob` | 6 | canonical workflow | canonical workflow record; no creative authority | DEC-0050 | CON-046 |
| CON-048 | `PublicationReceipt` | 6 | evidence | external authority-host evidence | DEC-0050 | CON-047 |
| CON-049 | `CommerceFoundryBrief` | 6 | external canonical to CF, evidence to Storyworld | external CF authority evidence | DEC-0051 | — |
| CON-050 | `StoryworldCommerceBundle` | 6 | derived package | derived Storyworld package, not commercial approval | DEC-0051 | CON-045, CON-049 |
| CON-051 | `CommerceFoundryReceipt` | 6 | evidence | external CF authority evidence | DEC-0051 | CON-050 |
| CON-052 | `RuntimeContentPackage` | 6 | canonical package | canonical release package | DEC-0052 | CON-019, CON-041 |
| CON-053 | `RuntimeReceipt` | 6 | evidence | external runtime authority evidence | DEC-0052 | CON-052 |

## Detailed definitions

### CON-001 — `ConsequenceClassification`

**Purpose:** Classify low, medium, and high consequence operations and required confirmation/authority.

**Authority/status:** canonical policy vocabulary; canonical.

**Dependencies:** None.

**Governing decision:** DEC-0041.

**Required fixtures:** low-cost preview, active-edit change, canon acceptance.

**Required tests:** minimum class cannot be weakened, policy escalation, human gate.

### CON-002 — `CreativeContext`

**Purpose:** Bind a command to exact workspace, production, versions, playhead, time range, selection, annotation, rights, egress, and budget context.

**Authority/status:** canonical command input snapshot; canonical.

**Dependencies:** None.

**Governing decision:** DEC-0041.

**Required fixtures:** image region, video playhead, cross-media scene.

**Required tests:** stable refs, selection drift, visibility enforcement.

### CON-003 — `CreativeCommand`

**Purpose:** Record original text or voice-derived transcript, context, constraints, and correlation without making conversation authority.

**Authority/status:** canonical governed command record; canonical.

**Dependencies:** CON-001, CON-002.

**Governing decision:** DEC-0041.

**Required fixtures:** text command, voice command, steered command.

**Required tests:** idempotency, ephemeral audio TTL, actor/resource scope.

### CON-004 — `ProviderEgressDecision`

**Purpose:** Record effective provider-egress class, applicable rights/consent, approved route, retention, fallback, and exception evidence.

**Authority/status:** canonical policy decision; canonical.

**Dependencies:** None.

**Governing decision:** DEC-0044.

**Required fixtures:** public draft, private ZDR analysis, restricted blocked transfer, highly restricted exception refusal.

**Required tests:** most restrictive wins, no stale consent, route match.

### CON-005 — `CostPolicy`

**Purpose:** Define allowances, per-job/batch/period limits, confirmation thresholds, price snapshots, and cost-uncertainty rules.

**Authority/status:** canonical policy; canonical.

**Dependencies:** None.

**Governing decision:** DEC-0044.

**Required fixtures:** small preview, batch generation, unknown estimate.

**Required tests:** pre-submit ceiling, unexpected increase pause, actual reconciliation.

### CON-006 — `CredentialBinding`

**Purpose:** Bind an encrypted secret slot to provider, supplier, workspace/member scope, capabilities, egress ceiling, budget, rotation, and revocation metadata.

**Authority/status:** canonical nonsecret binding; secret externalized to credential store; canonical+external secret.

**Dependencies:** None.

**Governing decision:** DEC-0044.

**Required fixtures:** workspace fal key, member OpenRouter key, revoked credential.

**Required tests:** no secret serialization, scope enforcement, revoked no fallback.

### CON-007 — `CreativeSpecification`

**Purpose:** Common envelope for separately versioned creative-system definitions.

**Authority/status:** canonical creative authority after acceptance; canonical.

**Dependencies:** None.

**Governing decision:** DEC-0042.

**Required fixtures:** representation style, music identity, production design.

**Required tests:** immutable revision, scope validation, accepted-only resolution.

### CON-008 — `CreativeBinding`

**Purpose:** Bind an accepted creative specification revision to property, production, sequence, scene, shot, asset, character, location, cue, page, or rendition scope with override rules.

**Authority/status:** canonical; canonical.

**Dependencies:** CON-007.

**Governing decision:** DEC-0042.

**Required fixtures:** shot lighting override, character costume era, page typography.

**Required tests:** allowed scope, override precedence, conflict detection.

### CON-009 — `CreativeInterpretation`

**Purpose:** Record intended outcome, targets, assumptions, ambiguities, creative strategy, preservation, allowed variation, prohibited changes, domains, and proposed consequence.

**Authority/status:** canonical proposal evidence, not accepted creative state; canonical proposal.

**Dependencies:** CON-001, CON-003.

**Governing decision:** DEC-0041.

**Required fixtures:** more cinematic, remove selected object, colder cross-media scene.

**Required tests:** schema strictness, target consistency, assumption visibility.

### CON-010 — `CreativePlan`

**Purpose:** Represent operation DAG, rationale, alternatives, cost, route requirements, preview, evaluations, risks, and approval invalidation.

**Authority/status:** canonical proposal evidence; canonical proposal.

**Dependencies:** CON-009, CON-004, CON-005.

**Governing decision:** DEC-0041.

**Required fixtures:** single image edit, video rough cut, cross-media plan.

**Required tests:** acyclic dependencies, cost completeness, policy completeness.

### CON-011 — `CreativeOperation`

**Purpose:** Common typed, reversible operation envelope targeting exact base versions.

**Authority/status:** canonical proposed/applied operation; canonical.

**Dependencies:** CON-001, CON-002.

**Governing decision:** DEC-0041.

**Required fixtures:** trim clip, replace coat, lower score.

**Required tests:** exact base required, typed payload, approval consequences.

### CON-012 — `ImageOperation`

**Purpose:** Typed image generation, editing, selection, mask, composition, adaptation, restoration, and reference-match operations.

**Authority/status:** canonical operation payload; canonical.

**Dependencies:** CON-011.

**Governing decision:** DEC-0046.

**Required fixtures:** object removal, identity-preserving wardrobe change, multi-source composite.

**Required tests:** lock semantics, region version binding, source lineage.

### CON-013 — `EditorialSequence`

**Purpose:** Storyworld-owned semantic timeline with exact media versions, ranges, scenes, beats, shots, cues, captions, rationale, and approval state.

**Authority/status:** canonical production edit state; canonical.

**Dependencies:** None.

**Governing decision:** DEC-0046.

**Required fixtures:** short film, vertical social variant, animatic.

**Required tests:** rational time, source resolution, variant lineage.

### CON-014 — `VideoEditOperation`

**Purpose:** Typed trim, split, insert, replace, reorder, J/L cut, transition, pacing, montage, captions, audio, grade-intent, and generative shot operations.

**Authority/status:** canonical operation payload; canonical.

**Dependencies:** CON-011, CON-013.

**Governing decision:** DEC-0046.

**Required fixtures:** 12-frame trim, J-cut, generated establishing shot.

**Required tests:** frame exactness, timeline validity, media/shot identity.

### CON-015 — `AudioEditOperation`

**Purpose:** Typed dialogue, ambience, effects, level, fade, timing, sync, perspective, and mix-priority operations.

**Authority/status:** canonical operation payload; canonical.

**Dependencies:** CON-011.

**Governing decision:** DEC-0046.

**Required fixtures:** dialogue ducking, room-tone repair, 3 dB cue change.

**Required tests:** units/time range, clip/track binding, loudness policy.

### CON-016 — `MusicOperation`

**Purpose:** Typed cue, motif, instrumentation, timing, diegetic status, transformation, and mix relationship operations.

**Authority/status:** canonical operation payload; canonical.

**Dependencies:** CON-011.

**Governing decision:** DEC-0046.

**Required fixtures:** withhold motif, move cue, counterpoint score.

**Required tests:** theme binding, rights references, cue timing.

### CON-017 — `GraphicLayoutOperation`

**Purpose:** Typed grid, hierarchy, type, image-text, page/panel/card/overlay, safe-area, and destination-layout operations.

**Authority/status:** canonical operation payload; canonical.

**Dependencies:** CON-011.

**Governing decision:** DEC-0046.

**Required fixtures:** carousel reflow, title safe-area, picture-book spread.

**Required tests:** layout units, text role refs, accessibility constraints.

### CON-018 — `SpatialEditOperation`

**Purpose:** Typed position, route, threshold, zone, sightline, blocking, set-layout, and environmental-storytelling operations.

**Authority/status:** canonical operation payload; canonical.

**Dependencies:** CON-011.

**Governing decision:** DEC-0046.

**Required fixtures:** scene blocking, set layout, interactive route.

**Required tests:** coordinate profile, canonical-vs-realization boundary, graph consistency.

### CON-019 — `RuntimeContentOperation`

**Purpose:** Typed authored-runtime package changes that remain separate from live save/session state.

**Authority/status:** canonical authored content operation; canonical.

**Dependencies:** CON-011.

**Governing decision:** DEC-0052.

**Required fixtures:** dialogue branch, mission dependency, sound zone.

**Required tests:** no save-state fields, target-neutral semantics, canon pin.

### CON-020 — `EditProposal`

**Purpose:** Reviewable immutable grouping of operations with alternatives, previews, dependencies, partial-acceptance rules, and base revision.

**Authority/status:** canonical proposal evidence; canonical proposal.

**Dependencies:** CON-010, CON-011.

**Governing decision:** DEC-0041.

**Required fixtures:** three-operation image plan, cross-media plan, variant branch.

**Required tests:** partial dependency safety, base drift, proposal immutability.

### CON-021 — `PreviewArtifact`

**Purpose:** Bind a simulated, low-resolution, partial, or full preview to proposal and exact inputs, with fidelity limitations.

**Authority/status:** derived evidence; derived evidence.

**Dependencies:** CON-020.

**Governing decision:** DEC-0041.

**Required fixtures:** image before/after, video proxy, audio excerpt.

**Required tests:** input hash, fidelity declaration, expiry.

### CON-022 — `CreativeDecision`

**Purpose:** Record exact accepted, rejected, and modified operations, actor authority, rationale, and consequence receipt.

**Authority/status:** canonical human/policy decision; canonical.

**Dependencies:** CON-020.

**Governing decision:** DEC-0041.

**Required fixtures:** accept one operation, reject all, modify parameter.

**Required tests:** actor authority, exact proposal hash, dependency consistency.

### CON-023 — `CreativeRevision`

**Purpose:** Represent immutable result versions created after applied/accepted operations with prior-version and decision lineage.

**Authority/status:** canonical version record; canonical.

**Dependencies:** CON-022.

**Governing decision:** DEC-0041.

**Required fixtures:** image revision, sequence revision, cross-media revision set.

**Required tests:** append-only, reversion path, decision binding.

### CON-024 — `ApprovalInvalidation`

**Purpose:** Explain which approvals/findings/waivers become stale after a change and why.

**Authority/status:** canonical derived policy result; derived canonical evidence.

**Dependencies:** CON-011, CON-023.

**Governing decision:** DEC-0041.

**Required fixtures:** grade-only change, rights-changing source replacement, caption edit.

**Required tests:** layer specificity, material-change rules, no over-invalidation.

### CON-025 — `ResolvedRealizationSpec`

**Purpose:** Resolve pinned canon/state, accepted creative-system bindings, target context, locks, conflicts, and evaluation into one reproducible media-realization specification.

**Authority/status:** derived canonical compilation artifact; derived canonical.

**Dependencies:** CON-007, CON-008, CON-010.

**Governing decision:** DEC-0042.

**Required fixtures:** still image shot, film scene, audio-only scene.

**Required tests:** deterministic resolution, source revision trace, conflict refusal.

### CON-026 — `GenerationRecipe`

**Purpose:** Provider-neutral generative specification compiled from resolved realization and operation intent.

**Authority/status:** canonical execution specification; canonical.

**Dependencies:** CON-025, CON-011.

**Governing decision:** DEC-0043.

**Required fixtures:** image edit, video generation, audio generation.

**Required tests:** no provider fields, required locks, evaluation bindings.

### CON-027 — `DeterministicProcessingPlan`

**Purpose:** Provider-independent exact technical operations for the controlled media worker.

**Authority/status:** canonical execution specification; canonical.

**Dependencies:** CON-011.

**Governing decision:** DEC-0048.

**Required fixtures:** proxy, trim/join, OCIO transform.

**Required tests:** allowlisted operation, resource limit, reproducibility.

### CON-028 — `ProviderExecutionPlan`

**Purpose:** Noncanonical rendered provider request with model/endpoint, prompts/messages, workflow, seed, uploads, retention, retry, timeout, and idempotency details.

**Authority/status:** derived execution artifact; derived temporary/evidence.

**Dependencies:** CON-026, CON-004, CON-005, CON-006.

**Governing decision:** DEC-0043.

**Required fixtures:** OpenRouter plan, fal queue plan, Comfy workflow binding.

**Required tests:** policy route match, redaction, canonical recipe unchanged.

### CON-029 — `ProviderExecutionResult`

**Purpose:** Record actual provider/model/endpoint, request ID, retries/fallback, cost, logs, timestamps, output refs/hashes, cancellation, unknown and expiry status.

**Authority/status:** external execution evidence; evidence.

**Dependencies:** CON-028.

**Governing decision:** DEC-0043.

**Required fixtures:** success, duplicate webhook, late completion, unknown outcome.

**Required tests:** dedupe, actual route verification, late-result quarantine.

### CON-030 — `ProviderCapabilityProfile`

**Purpose:** Describe approved provider capability, modality, parameters, retention, route, cost and operational support.

**Authority/status:** canonical mutable policy profile; canonical research-backed.

**Dependencies:** None.

**Governing decision:** DEC-0043.

**Required fixtures:** structured text, image edit, video generation.

**Required tests:** effective dates, source refs, capability mismatch.

### CON-031 — `ProviderPolicy`

**Purpose:** Select and constrain providers/models/endpoints by capability, egress, retention, fallback, region, quality, cost, and human review.

**Authority/status:** canonical policy; canonical.

**Dependencies:** CON-004, CON-030.

**Governing decision:** DEC-0044.

**Required fixtures:** public auto route, private fixed ZDR, restricted blocked.

**Required tests:** allow/deny precedence, fallback equivalence, expiry.

### CON-032 — `ModelCapabilityApproval`

**Purpose:** Lifecycle record approving a model/provider route for a named capability and policy based on evaluation evidence.

**Authority/status:** canonical policy decision; canonical.

**Dependencies:** CON-030, CON-031.

**Governing decision:** DEC-0043.

**Required fixtures:** experimental model, approved visual analyzer, prohibited model.

**Required tests:** per-capability scope, deprecation, evidence required.

### CON-033 — `WorkflowDefinition`

**Purpose:** Register a versioned ComfyUI workflow with node/endpoint versions, bindings, egress ceiling, resource limits, and evaluation references.

**Authority/status:** canonical workflow registry metadata; graph derived execution detail; canonical+external graph.

**Dependencies:** CON-030, CON-031.

**Governing decision:** DEC-0045.

**Required fixtures:** identity-preserving image edit, multi-model video, deterministic-only workflow.

**Required tests:** hash pinning, node allowlist, endpoint allowlist.

### CON-034 — `WorkflowPromotion`

**Purpose:** Record experimental/evaluated/production-approved/deprecated/prohibited workflow state and rollback.

**Authority/status:** canonical human/policy decision; canonical.

**Dependencies:** CON-033.

**Governing decision:** DEC-0045.

**Required fixtures:** promotion, rollback, security deprecation.

**Required tests:** evidence gate, actor authority, production refusal.

### CON-035 — `TransformationRecord`

**Purpose:** Bind source and result versions to deterministic, generative, composite, external, or adaptation transformation with exact evidence.

**Authority/status:** canonical lineage; canonical.

**Dependencies:** CON-023, CON-027, CON-029.

**Governing decision:** DEC-0048.

**Required fixtures:** focused regen, external edit, rendition.

**Required tests:** source/result refs, tool/provider evidence, cycle prevention.

### CON-036 — `AnnotationTarget`

**Purpose:** Address exact-version asset/document/timeline/graph/spatial regions through universal and medium-specific selectors.

**Authority/status:** canonical annotation selector; canonical.

**Dependencies:** None.

**Governing decision:** DEC-0047.

**Required fixtures:** image polygon, video interval, audio track region, document block, graph edge.

**Required tests:** exact version, selector validity, structured fallback.

### CON-037 — `EvaluationPlan`

**Purpose:** Declare required deterministic, measurable, model-assisted, and human evaluation layers, blockers, evidence, and invalidation.

**Authority/status:** canonical policy/specification; canonical.

**Dependencies:** CON-025, CON-031.

**Governing decision:** DEC-0049.

**Required fixtures:** image continuity, video edit, provider substitution.

**Required tests:** layer ownership, blocker authority, human-required flag.

### CON-038 — `EvaluationFinding`

**Purpose:** Extend current findings with subject exact versions, evidence, confidence, measurement, limitations, remediation, and waiver policy.

**Authority/status:** canonical evidence/finding; canonical.

**Dependencies:** CON-037.

**Governing decision:** DEC-0049.

**Required fixtures:** deterministic blocker, visual uncertainty, round-trip loss.

**Required tests:** append-only, waiver scope, no universal score.

### CON-039 — `ExternalEditorCheckout`

**Purpose:** Create exact-version package/session identity, permitted refs, restrictions, portable formats, expected returns, expiry, and integrity manifest.

**Authority/status:** canonical checkout record; canonical+external package.

**Dependencies:** CON-004, CON-035.

**Governing decision:** DEC-0047.

**Required fixtures:** InvokeAI image, Kdenlive timeline, Blender scene, Resolve project.

**Required tests:** base pin, rights filtering, concurrent session.

### CON-040 — `ExternalEditorReturn`

**Purpose:** Associate untrusted returns, tool/workfile metadata, dependency inventory, transformation declaration, portable representation, validation, and candidate admission.

**Authority/status:** canonical import evidence; canonical+external inputs.

**Dependencies:** CON-039, CON-035.

**Governing decision:** DEC-0047.

**Required fixtures:** two conflicting returns, missing dependency, unsupported effect.

**Required tests:** checkout association, malware/format gate, no overwrite.

### CON-041 — `InterchangeProfile`

**Purpose:** Version mapping rules and capabilities for OTIO, USD, MaterialX, glTF, SVG, Astro, captions, print, and destinations.

**Authority/status:** canonical mutable standards profile; canonical research-backed.

**Dependencies:** None.

**Governing decision:** DEC-0047.

**Required fixtures:** OTIO, USD, Astro.

**Required tests:** effective version, loss declarations, replacement.

### CON-042 — `ConversionLossReport`

**Purpose:** Declare preserved, transformed, omitted, approximated, and unsupported semantics in import/export/target conversion.

**Authority/status:** derived evidence; evidence.

**Dependencies:** CON-041.

**Governing decision:** DEC-0047.

**Required fixtures:** Kdenlive OTIO, Resolve Fusion loss, Godot target difference.

**Required tests:** complete category set, source/target hash, human review trigger.

### CON-043 — `EditorialHandoffPackage`

**Purpose:** Package Storyworld editorial sequence, OTIO, media/proxies, captions, stems, settings, rights, and manifest for external editing.

**Authority/status:** derived signed package; derived package.

**Dependencies:** CON-013, CON-039, CON-041.

**Governing decision:** DEC-0047.

**Required fixtures:** Kdenlive, Resolve.

**Required tests:** self-contained manifest, portable timeline, hash validation.

### CON-044 — `EditorialReturnPackage`

**Purpose:** Package returned OTIO, workfile, renders, stems, captions, change report, and loss report for reconciliation.

**Authority/status:** external evidence package; external/evidence.

**Dependencies:** CON-040, CON-042, CON-043.

**Governing decision:** DEC-0047.

**Required fixtures:** simple trim return, unsupported plugin return.

**Required tests:** semantic diff, candidate admission, approval invalidation.

### CON-045 — `ChannelPackage`

**Purpose:** Extend existing channel package with exact content, metadata, disclosures, authority host, destination profile, validation, and approval state.

**Authority/status:** canonical approved package state; canonical package.

**Dependencies:** CON-041, CON-037.

**Governing decision:** DEC-0050.

**Required fixtures:** Astro site, Instagram carousel, X video, TikTok draft.

**Required tests:** accepted inputs, destination conformance, material-change hash.

### CON-046 — `PublicationAuthorization`

**Purpose:** Human authorization of exact channel package, destination, authority host, metadata, disclosures, time, quota/cost, retry and failure policy.

**Authority/status:** canonical high-consequence human decision; canonical.

**Dependencies:** CON-045.

**Governing decision:** DEC-0050.

**Required fixtures:** scheduled Astro deploy, Instagram post, expired authorization.

**Required tests:** actor authority, material-change invalidation, expiry.

### CON-047 — `PublicationJob`

**Purpose:** Mechanical scheduled execution of a still-valid authorization with revalidation, idempotency, pause/cancel, and unknown-outcome recovery.

**Authority/status:** canonical workflow record; no creative authority; canonical workflow.

**Dependencies:** CON-046.

**Governing decision:** DEC-0050.

**Required fixtures:** future schedule, duplicate callback, host outage.

**Required tests:** strict revalidation, bounded retry, no package mutation.

### CON-048 — `PublicationReceipt`

**Purpose:** Record authority-host result, external IDs, exact submitted package, processing state, uncertainty, correction, withdrawal, and supersession.

**Authority/status:** external authority-host evidence; evidence.

**Dependencies:** CON-047.

**Governing decision:** DEC-0050.

**Required fixtures:** published, rejected, unknown, withdrawn.

**Required tests:** external ID binding, status reconciliation, no invented success.

### CON-049 — `CommerceFoundryBrief`

**Purpose:** Versioned signed commercial brief with product snapshots, claims, offers, placement, rights, and commercial constraints.

**Authority/status:** external CF authority evidence; external canonical to CF, evidence to Storyworld.

**Dependencies:** None.

**Governing decision:** DEC-0051.

**Required fixtures:** campaign brief, print product brief.

**Required tests:** signature, snapshot pins, inbox dedupe.

### CON-050 — `StoryworldCommerceBundle`

**Purpose:** Creatively/rights-approved assets, print-ready package, proofs, placement declarations, provenance and exact product snapshot refs submitted as commercial candidate.

**Authority/status:** derived Storyworld package, not commercial approval; derived package.

**Dependencies:** CON-045, CON-049.

**Governing decision:** DEC-0051.

**Required fixtures:** campaign bundle, print-ready bundle.

**Required tests:** separate approval layers, claim snapshot, package hash.

### CON-051 — `CommerceFoundryReceipt`

**Purpose:** Normalize CF commercial findings, approval/rejection, vendor, order, fulfillment, publication, correction and withdrawal references.

**Authority/status:** external CF authority evidence; evidence.

**Dependencies:** CON-050.

**Governing decision:** DEC-0051.

**Required fixtures:** commercial rejection, vendor order, publication receipt.

**Required tests:** authority host, idempotent inbox, no Storyworld invention.

### CON-052 — `RuntimeContentPackage`

**Purpose:** Target-neutral immutable authored content package pinned to canon/assets with no player-save state.

**Authority/status:** canonical release package; canonical package.

**Dependencies:** CON-019, CON-041.

**Governing decision:** DEC-0052.

**Required fixtures:** browser story, Godot mission.

**Required tests:** no live state, source pins, target-neutral validation.

### CON-053 — `RuntimeReceipt`

**Purpose:** Record browser/Godot package acceptance, build/runtime version, validation, observations, analytics, and proposed changes.

**Authority/status:** external runtime authority evidence; evidence.

**Dependencies:** CON-052.

**Governing decision:** DEC-0052.

**Required fixtures:** accepted browser build, Godot rejection, hotfix observation.

**Required tests:** package hash, save-state separation, no canon mutation.
