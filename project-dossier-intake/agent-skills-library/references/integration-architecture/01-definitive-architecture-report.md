# Definitive Storyworld Integration Architecture and Intent-Driven Creative Production Model

**Assessment date:** 2026-08-01  
**Repository revision:** `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`  
**Document status:** staged architecture recommendation for owner disposition  
**Canonical effect:** none until accepted through Storyworld governance

---

# 1. Executive conclusion

Storyworld should be finalized as an **intent-driven narrative production environment** in which a small creator or family team directs work primarily through text and voice. The platform’s defining capability is not merely calling generative models. It is compiling human creative intent, narrative state, accepted creative systems, rights, privacy, cost, and exact-version context into inspectable and reversible operations across images, video, audio, music, graphics, documents, and interactive packages.

The final architecture preserves the repository’s strongest accepted principles:

- Engine-owned authority.
- PostgreSQL-backed tenant and resource boundaries.
- Immutable accepted revisions and explicit supersession.
- Temporal as the durable workflow orchestrator.
- Content-addressed asset custody.
- Provider-neutral canonical specifications.
- Candidates before masters.
- Human-only acceptance and waiver authority.
- Authority-host receipts for commerce, publication, and runtime release.
- Portable signed packages and replaceable external systems.

It changes the product emphasis in five important ways:

1. **Text and voice become the primary creative controls.**
2. **Generation and editing become one native Storyworld workflow.**
3. **Professional precision is mediated through semantic, progressive controls rather than exposed first as dense editor mechanics.**
4. **InvokeAI, Blender, Kdenlive, Resolve, and ComfyUI become optional precision or operator environments rather than normal authoring surfaces.**
5. **OpenRouter and fal.ai become strategic hosted execution services behind Storyworld-owned task profiles, egress policy, cost policy, custody, and evaluation.**

The core execution chain is:

```text
Human text or voice direction
        ↓
CreativeCommand + exact CreativeContext
        ↓
CreativeInterpretation
        ↓
CreativePlan + typed, medium-specific operations
        ↓
Consequence, rights, egress, cost, and authority preflight
        ↓
Preview / candidate / deterministic result
        ↓
Evaluation + proposal diff
        ↓
Authorized human decision where required
        ↓
Immutable CreativeRevision / accepted master / approved package
```

The provider path is subordinate:

```text
Accepted canon and state
+ accepted creative-system revisions
+ target and production context
        ↓
ResolvedRealizationSpec
        ↓
provider-neutral GenerationRecipe
        ↓
noncanonical ProviderExecutionPlan
        ↓
OpenRouter / fal.ai / registered ComfyUI workflow
        ↓
ProviderExecutionResult
        ↓
Storyworld quarantine, custody, evaluation, and decision
```

The current alpha is a credible proof of the authority and custody model, but it is not yet the target product experience. Its prompt box, seed field, direct provider selector, narrow still-image adapter, mock model evaluation, and export-only Instagram focus are implementation evidence to preserve—not the final interface or domain model.

Two owner decisions remain explicit:

- Whether the first private team uses one workspace-admin provider credential set, separate member credentials, or a hybrid.
- Whether the mature product offers customer-managed installations only or both customer-managed and Storyworld-hosted small-team service.

Everything else required to begin the successor-decision program is sufficiently defined.

---

# 2. Final product definition

## 2.1 Product thesis

Storyworld is a **Personal and Small-Team Narrative Production Operating System**. It unifies world and canon management, creative direction, source material, native generative production, media editing, continuity, rights, review, delivery, and runtime compilation into one traceable system.

A user should be able to say:

> Make the whole scene colder, hold on Mara twelve frames longer before the reveal, lower the score by three decibels after the door closes, and preserve her face, red coat, and lantern damage.

Storyworld should convert that direction into distinct, inspectable operations for color, editorial timing, audio automation, and locked visual continuity. The user can preview, refine, partially accept, branch, undo, or send only an unsupported portion to an external precision tool.

## 2.2 Primary user

The first mature deployment serves one small family creative team. The product may later serve other solo creators and small teams. It is not optimized for large studio departments, enterprise workforce management, or agency-scale operations.

One person may hold several roles. The architecture therefore supports scoped roles and receipts without requiring enterprise organizational complexity.

## 2.3 Core outcomes

Storyworld succeeds when the team can:

- Develop and preserve coherent fictional or factual narrative worlds.
- Direct images, sequences, sound, graphics, and interactive content through natural language.
- Perform routine and increasingly precise generation and editing inside Storyworld.
- Understand what the AI inferred and what it proposes.
- Preserve exact versions, source lineage, and reversible operations.
- Prevent provider, editor, or runtime state from silently becoming authority.
- Review continuity, rights, consent, privacy, cost, and destination conformance.
- Accept exact masters and packages through explicit human decisions.
- Export, schedule, or hand off work while retaining Storyworld-owned evidence.
- Compile browser and Godot runtime packages without importing player state into canon.

## 2.4 Deliberate non-goals

Storyworld is not:

- A universal replacement for every professional NLE, DCC, DAW, paint application, or typesetter.
- A thin wrapper around a prompt field.
- A ComfyUI or InvokeAI frontend.
- A provider-specific application.
- A general workflow-automation product.
- An external DAM controlling Storyworld assets.
- A large-studio production tracker.
- A real-time game engine.
- A social-media management suite.
- A system that lets AI accept canon, waive rights, or publish autonomously.

The accepted canonical non-goal against replacing professional tools should be clarified—not discarded. The target is: **Storyworld is the default environment for supported Storyworld workflows, while specialist applications remain available for exceptional or unsupported finishing.**

---

# 3. Binding owner direction

The completed questionnaire establishes binding owner input for the target architecture. It does not itself alter accepted repository authority.

The architecture must implement the following direction after successor decisions are accepted:

- Text and voice are primary controls.
- Five control layers govern progressive precision.
- Storyworld is the normal environment for generation and editing.
- External applications are exceptional escape hatches.
- Voice audio is ephemeral by default; the transcript and structured command survive.
- One command may coordinate several media but produces separate typed operations.
- Low-consequence work may run within policy and budget; medium work waits for proposal confirmation; high-consequence authority remains human.
- OpenRouter and fal.ai are strategic hosted providers.
- No local model weights are part of the current target.
- User-supplied provider credentials come first.
- Provider routing is task-profile- and egress-aware.
- Private, restricted, and highly restricted data receive progressively stronger routing controls.
- Storyworld ingests every governed candidate and accepted asset into its own configured system of record.
- ComfyUI is self-hosted as a technical orchestration environment, using approved hosted generative endpoints under current policy.
- Blender, InvokeAI, Kdenlive, and Resolve are optional precision environments.
- Deterministic media operations remain inside the Storyworld-controlled boundary.
- Governed export packages remain permanent outputs.
- The proposed delivery order becomes Astro, Instagram, X, then TikTok.
- Commerce Foundry retains commercial, product, vendor, order, fulfillment, and commerce-publication authority.
- Browser and Godot runtime paths begin early through one shared package contract.
- Customer-managed deployment is a future supported option.

The completed questionnaire is preserved verbatim in `09-completed-owner-questionnaire-verbatim.md`.

---

# 4. Repository authority and current-state findings

## 4.1 Accepted authority that remains correct

The following accepted foundations should be retained without reopening:

- The Engine is the sole Storyworld authority source.
- Studio issues commands and renders projections but owns no independent business state.
- Canon proposals and generated media remain nonauthoritative until human acceptance.
- Exact accepted revisions are immutable.
- Asset bytes are content-addressed and linked to explicit lifecycle states.
- Temporal is the durable workflow orchestrator.
- Provider adapters are replaceable.
- ComfyUI and InvokeAI receive no canon, asset-acceptance, approval, or publication authority.
- Commerce Foundry and runtime targets are peer authority hosts, not subordinate tables in Storyworld.
- Channel connectors provide delivery capability and external receipts, not publication authorization.
- Acceptance-class commands currently require a verified `property_owner`.
- Runtime hotfixes and observations never silently become canon.
- Export packages and runtime packages bind exact versions and hashes.
- Findings and waivers are append-only and evidence-backed.

## 4.2 Current alpha implementation

The repository currently proves:

- A modular TypeScript/Node platform with Engine API and Studio.
- PostgreSQL/RLS, object storage, Temporal workflows, credentials, provider, evaluation, portability, runtime, commerce, and channel packages.
- A mock provider and two allowlisted fal still-image endpoints.
- Queue polling, input-retention disabling, HTTPS output download, content-type and size validation, storage, hashing, and candidate creation.
- Scene-state packet compilation from pinned canon.
- Deterministic structural and temporal checks.
- A pluggable but currently mocked narrative/model-assisted evaluator.
- Human finding disposition and asset acceptance.
- Commerce brief/bundle/receipt exchange.
- Runtime package compilation and acceptance receipts.
- Instagram rendition package creation from accepted masters.
- Recorded provider fixtures and defect-injection regression tests.

## 4.3 Current alpha limitations relevant to the new direction

The current alpha does not yet prove:

- Voice commands.
- A canonical creative-command model.
- Interpretation, plan, operation, proposal, partial acceptance, or creative-revision contracts.
- Native image editing beyond focused regeneration.
- Native video editing or a semantic editorial timeline.
- OpenRouter integration.
- Cross-media operations.
- Provider-egress classification and routing.
- Workspace/member credential ownership.
- Cost preview and production budgets.
- Provider webhooks, late-result reconciliation, or robust cancellation.
- Cross-media annotation.
- Rich StoryDocument.
- Media quarantine/proxy worker beyond narrow generated stills.
- External-editor checkout/return contracts.
- OTIO, Kdenlive, Resolve, Blender, or Godot adapters.
- Professional visual, editorial, sound, score, and layout evaluation.
- Astro export or publication scheduling.
- Direct social publication.
- Customer-managed deployment packaging.

## 4.4 Staged intake state

The existing intake is correctly staged and unratified. It contains valuable portfolio, taxonomy, production-design, children’s-policy, IP, ingestion, and template research. Its manifest and impact map predate the completed integration questionnaire and must be expanded substantially.

Draft DEC-0031, DEC-0032, and DEC-0033 must not be accepted as written.

---

# 5. Conflicts requiring successor decisions

| Conflict | Current authority | Confirmed target direction | Required disposition |
|---|---|---|---|
| Native editing scope | Canonical non-goal warns against replacing professional editors. | Storyworld completes nearly all work within supported workflows. | Successor clarification: native default, not universal replacement. |
| Product audience | Canonical tiers include agency/enterprise possibilities. | Solo and small family teams only; no large-studio target. | Product-scope successor. |
| InvokeAI role | DEC-0012 makes local InvokeAI the human editing workspace. | InvokeAI is exceptional precision finishing only. | Successor to DEC-0012 integration role while retaining no-local-weight posture. |
| ComfyUI role | Accepted as optional hosted-backed workflow layer. | Self-hosted orchestration/operator environment; generative nodes still hosted under current policy. | Clarifying successor and security profile. |
| Provider recipe implementation | ADR-0015 and schema say provider-neutral. Current compiler and Studio expose prompt/seed as recipe fields. | Intent compiles through resolved realization to canonical recipe, then provider execution plan. | Conformance ADR or successor; block expansion on correction. |
| Model/provider UX | Current Studio exposes fal model and seed directly. | Task profiles choose providers; native intent interface is primary; raw controls advanced only. | Intent-driven UX successor. |
| Integration priority | DEC-0015/0017 accept Instagram-first export. | Astro first, Instagram second, X and TikTok later. | Delivery-priority successor. |
| Production-design object | Draft DEC-0033 uses one inherited Look. | Separate creative systems resolved into a Look projection. | Replace DEC-0031/0033 with compositional decision. |
| Export/print | Draft DEC-0032 includes direct print-vendor submission. | Storyworld makes print-ready package; Commerce Foundry owns vendors/orders. | Amend DEC-0032 and CF boundary. |
| Acceptance roles | DEC-0021 only `property_owner`. | Small-team scoped roles eventually required. | Mature authority successor; current alpha remains owner-only until accepted. |
| Classification | Accepted public/internal/confidential/restricted/embargoed. | Add Public/Private/Restricted/Highly Restricted provider-egress classes. | Add separate egress decision and explicit mapping; do not replace access taxonomy. |
| Runtime targets | Current compiler is target-generic and BKR-oriented. | Browser and Godot vertical slices begin early. | Shared-runtime-contract successor. |
| Graph terminology | DEC-0028 calls a narrative-flow graph “spatial Arc graph.” | Narrative, spatial, truth, rights, lineage, and runtime graphs require separate profiles. | Amend terminology; retain structured-fallback rule. |

Implementation affected by these conflicts must remain blocked until the corresponding successor decision is accepted.

---

# 6. Superseded assumptions

The target architecture supersedes these assumptions at the recommendation level:

- A prompt box is the primary generation interface.
- A model selector is a normal-user control.
- Generation and editing are distinct user journeys.
- Editing means checking work out to InvokeAI or an NLE.
- Professional precision requires exposing masks, nodes, keyframes, and provider parameters directly.
- One Look object can own representation, production design, camera, lighting, color, edit, sound, and score.
- One inheritance cascade fits every creative discipline.
- Emotional labels can deterministically choose palette, lens, lighting, and score.
- Provider completion is the main orchestration milestone.
- Every generated output should be retained forever.
- Every external workfile is necessary for custody.
- Instagram should be the first new delivery target.
- Direct print-vendor submission belongs in Storyworld.
- Runtime integration can remain a single future BKR-specific path.
- The mature customer is an agency or enterprise department.

These assumptions are not erased from history. They should be recorded as superseded alternatives in the relevant successor decisions.

---

# 7. Complete system architecture

## 7.1 Logical architecture

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Storyworld Studio                                                   │
│ Conversation · Voice · Canvas · Semantic Timeline · Review · Deliver│
└───────────────────────────────┬──────────────────────────────────────┘
                                │ public Engine contracts
┌───────────────────────────────▼──────────────────────────────────────┐
│ Storyworld Engine                                                   │
│ Canon · Narrative · Creative Systems · Commands · Operations         │
│ Assets · Rights · Egress · Budgets · Findings · Decisions · Releases│
└───────────┬───────────────────┬───────────────────────┬──────────────┘
            │                   │                       │
     ┌──────▼──────┐     ┌──────▼────────┐      ┌──────▼─────────┐
     │ Temporal    │     │ Custody/Media │      │ Package/Peer   │
     │ workflows   │     │ workers       │      │ connectors     │
     └──────┬──────┘     └───────────────┘      └────────────────┘
            │
 ┌──────────▼──────────────────────────────────────────────────────────┐
 │ Execution adapters                                                 │
 │ OpenRouter · fal.ai · registered self-hosted ComfyUI workflows     │
 │ deterministic processing · external precision checkout/return       │
 └─────────────────────────────────────────────────────────────────────┘
```

## 7.2 Engine modules

The modular monolith should add or expand these bounded modules:

- `creative-command`
- `creative-planning`
- `creative-systems`
- `realization-compiler`
- `provider-policy`
- `provider-gateway`
- `cost-and-usage`
- `media-processing`
- `editorial`
- `annotation`
- `external-editor`
- `delivery-and-publication`
- `runtime-packaging`

Each module owns its tables and commands. Cross-module access occurs through application services and domain events, not arbitrary table coupling.

## 7.3 Execution types

Every requested operation resolves to one of four execution classes:

1. **Reasoning:** OpenRouter or another approved intelligence provider returns structured interpretation, plan, analysis, or finding.
2. **Generative transformation:** fal.ai or an approved registered ComfyUI workflow returns media candidates.
3. **Deterministic transformation:** the local controlled worker performs a reproducible media operation.
4. **External human precision:** Storyworld creates a checkout and later imports an untrusted return.

A single creative plan may contain all four classes.

## 7.4 No second authority

Provider queues, ComfyUI databases, InvokeAI galleries, Blender files, Kdenlive projects, Resolve libraries, Astro projects, Commerce Foundry records, social platforms, browser runtimes, and Godot saves may be authoritative within their own narrow systems. None may become Storyworld canon or accepted asset state by side effect.

---

# 8. System-of-authority boundaries

| System | Authoritative for | Explicitly not authoritative for |
|---|---|---|
| Storyworld Engine | Canon, narrative source, creative systems, commands, governed operations, exact asset versions, rights/consent evidence, findings, Storyworld approvals, packages, receipts | Commerce product truth, runtime saves, external-host publication acceptance |
| Storyworld Studio | No independent authority; interaction and projection only | Canon, approvals, asset state, publication state |
| Temporal | Durable execution history, workflow progress, retry/cancellation mechanics | Domain truth and approval authority |
| OpenRouter | Execution response and provider/model/usage metadata for one request | Task meaning, canon, creative decision, tool authorization, custody |
| fal.ai | Execution response, queue status, and request metadata | Creative specification, permanent storage, rights, acceptance |
| Self-hosted ComfyUI | Execution of an approved workflow version; operator workspace state | Workflow approval, canonical creative meaning, assets, approvals |
| Deterministic media worker | Technical result and transformation evidence | Creative approval, canon, rights waiver, publication |
| Blender/InvokeAI/Kdenlive/Resolve | Native workfile state inside an external precision session | Storyworld accepted state, rights, provenance truth, release |
| Commerce Foundry | Product/SKU truth, claims, offers, commercial policy, vendor/order/fulfillment state, commerce approval/publication | Narrative canon and character/world continuity |
| Channel connector | Destination capability, external IDs, transport status and receipts | Human publication authorization, canon, product truth |
| Publication scheduler | Mechanical execution of an exact still-valid authorization | Choosing content, changing metadata, waiving blockers |
| Browser runtime | Browser build/deployment state, session state, runtime observations | Working canon and source authoring state |
| Godot runtime | Runtime build, physics/rendering/navigation, saves and live state | Working canon and Storyworld source state |

The accepted authority matrix should receive a successor version adding these systems and preserving the rule that authority is explicit, not inferred from who initiated a job.

---

# 9. Intent-driven command architecture

## 9.1 Aggregate flow

The conversation is a nonauthoritative interaction log. The authoritative chain begins when Storyworld creates a versioned `CreativeCommand`.

```text
Conversation turn
  └─ CreativeCommand
      └─ CreativeInterpretation
          └─ CreativePlan
              └─ EditProposal
                  ├─ PreviewArtifact(s)
                  ├─ EvaluationFinding(s)
                  └─ CreativeDecision
                      └─ CreativeRevision(s)
```

## 9.2 `CreativeCommand`

Required fields:

- `command_id`, version, creator identity, timestamp.
- Original text.
- Transcript if voice-derived.
- Ephemeral voice-source handle and deletion deadline when still processing.
- Workspace, property, production, and active view.
- Exact target version references.
- Scene, beat, shot, asset, sequence, track, panel, or runtime context.
- Playhead position and selected time range.
- Exact annotation/region/object/semantic-element targets.
- Active candidate or comparison versions.
- User constraints and preservation requests.
- Budget and provider-egress context snapshot.
- Rights/consent references relevant to the selected material.
- Correlation and idempotency keys.

## 9.3 `CreativeInterpretation`

The interpretation is a structured proposal of meaning, not a hidden chain of thought. It records:

- Intended outcome.
- Target objects.
- Assumptions.
- Material ambiguities.
- Creative strategy.
- Preserved, flexible, and prohibited attributes.
- Affected media domains.
- Proposed consequence class.
- Whether clarification is required.
- Supporting evidence and source versions.

## 9.4 `CreativePlan`

A plan is an immutable operation DAG containing:

- Typed operations and dependencies.
- Rationale at plan and operation level.
- Alternative strategies.
- Expected outputs.
- Preview strategy.
- Estimated cost and uncertainty.
- Provider and deterministic capability requirements.
- Provider-egress and retention requirements.
- Evaluation plan.
- Approval invalidation forecast.
- Risks and assumptions.
- Timeout, cancellation, and late-result policy.

## 9.5 `CreativeOperation`

All operations share a common envelope:

- Stable operation ID and media-specific type.
- Exact base versions and target selectors.
- Typed parameters.
- Preserved/flexible/prohibited attributes.
- Execution class.
- Cost class and budget reference.
- Egress requirement.
- Rights/consent preconditions.
- Consequence class.
- Expected evaluation layers.
- Reversibility and retention rules.
- Dependencies and conflict keys.
- Preview requirement.
- Approval consequences.

Media-specific payloads use separate schemas rather than a free-form `parameters` object.

## 9.6 `EditProposal`, partial acceptance, and dependencies

An `EditProposal` groups one or more operations against an exact base revision. It supports:

- Accept all.
- Reject all.
- Accept selected independent operations.
- Modify parameters and request a regenerated proposal.
- Request alternatives.
- Branch into a named production variant.

Partial acceptance must respect the operation dependency graph. A dependent operation cannot be accepted while its prerequisite is rejected unless Storyworld recompiles a valid substitute.

## 9.7 `CreativeDecision` and `CreativeRevision`

The decision records exact accepted, rejected, and modified operation versions; actor authority; rationale; consequence receipt; and any invalidated approvals.

Applying accepted operations creates immutable `CreativeRevision` records and affected asset, sequence, document, creative-system, or runtime-package versions. The original command and conversation remain evidence, not authority.

---

# 10. Voice architecture

## 10.1 Voice is a primary input mode

Voice commands must support the same command and review model as text. Voice is not merely speech-to-text attached to a chat box.

A voice command binds to a snapshot of:

- Current playhead.
- Selected time range.
- Selected image region or object.
- Current scene/shot/asset/version.
- Visible candidate comparison.
- Active production and workspace.

## 10.2 Processing flow

```text
Push-to-talk / dictated command
        ↓
Encrypted temporary audio buffer
        ↓
Egress and consent preflight for transcription route
        ↓
Transcript + word/time confidence
        ↓
User correction when low confidence or consequential
        ↓
CreativeCommand
        ↓
Audio deletion after command admission or failure TTL
```

## 10.3 Selection drift

Selection is frozen into the command context when recording starts. If the user changes selection while transcription or planning is active:

- The original command remains bound to the original selection.
- Studio displays that the visible selection has changed.
- Medium/high-consequence execution pauses until the user confirms the old target or rebases the command.

## 10.4 Ephemeral retention

The voice recording is encrypted and temporary. Storyworld retains the transcript, context, interpretation, operations, and receipts. Preserving the audio requires a separate governed source/evidence import with rights, egress, retention, and access controls.

## 10.5 Accessibility and correction

The transcript must be editable before consequential execution. Voice-only interaction is never required; every voice workflow has keyboard and text parity. The interface exposes uncertainty without demanding technical speech-recognition knowledge.

---

# 11. Progressive manual-control model

## Layer 1 — Text or voice direction

Natural creative language is the default.

## Layer 2 — Simple contextual refinement

Semantic controls appear for the selected operation:

- warmer/cooler
- faster/slower
- subtle/dramatic
- preserve identity/composition/timing/background
- more dialogue/more visual
- more music/more ambience
- exact duration or frame offset where useful

## Layer 3 — AI-mediated professional precision

Storyworld exposes professional depth as tasks:

- refine or correct a mask
- track a selected sleeve across frames
- place a cut at an exact frame
- match a shot’s grade to a reference
- automate an audio level after a dialogue cue
- move a subject while preserving lens perspective
- create or adjust motion points
- composite approved regions from several candidates

The user directs the result; Storyworld manages the technical implementation and exposes before/after evidence.

## Layer 4 — Advanced Operator Mode

Authorized users may inspect or adjust:

- Provider/model route.
- Rendered prompt/messages.
- Seed, sampler, and provider parameters.
- ComfyUI workflow and node versions.
- Technical transforms and logs.
- Cost and latency details.

Operator access does not grant acceptance, waiver, budget, or publication authority. All changes are versioned and policy checked.

## Layer 5 — External precision tool

Unsupported work exits through a governed checkout and returns as an untrusted candidate.

---

# 12. Creative Direction and resolved realization

## 12.1 Canonical composition

Replace the monolithic canonical Look with separately versioned systems:

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

`Look` remains a useful Studio term, but it is a **resolved projection** over selected accepted revisions, not the one source object.

## 12.2 Boundaries

- **Representation Style:** formal grammar of depiction—medium, mark-making, edge, shape, abstraction, texture, modeling, spatial depiction, motion treatment.
- **Visual Identity:** recurring motifs, symbols, graphic devices, typography families, and recognizability.
- **Production Design:** designed material/spatial world—architecture, sets, locations, props, dressing, signage, materials.
- **Art Direction:** production-scoped operational coordination translating accepted design into work; normally a plan/workflow record, not a universal property identity object.
- **Character Appearance:** silhouette, costume, hair, makeup, accessories, age, damage, disguise, transformation.
- **Directorial Intent:** point of view, performance, reveal/concealment, staging, subject hierarchy, coverage, image/sound relationship.
- **Cinematography:** camera, lens intent, frame, focus, movement, exposure, capture.
- **Lighting:** motivated sources, direction, quality, contrast, temperature, practicals, exposure relationships.
- **Composition and Blocking:** arrangement and movement, screen direction, eyelines, depth, axis, negative space.
- **Color Design:** authored palette relationships and progression.
- **Grade Intent:** desired finishing effect and shot matching.
- **Color Pipeline:** technical transforms, displays, delivery spaces, and pinned OCIO/ACES configuration.
- **Editorial Design:** selection, ordering, duration, juxtaposition, rhythm, ellipsis, montage, transitions.
- **Graphic Design:** grid, hierarchy, type, image-text relationship, captions, pages, panels, overlays.
- **Sound Design:** dialogue, ambience, room tone, Foley, effects, silence, perspective, spatialization, mix hierarchy.
- **Music Identity:** themes, leitmotifs, harmony, rhythm, instrumentation, timbre, transformations, diegetic status.
- **Medium Realization:** affordances and limits of the target medium or rendition.

## 12.3 Scope and inheritance

Use a common `CreativeSpecification` envelope and `CreativeBinding` records. Do not force every discipline through one cascade.

Examples:

- Production design: property → production → location/set/object.
- Cinematography: production → sequence → scene → shot.
- Lighting: production/location → scene → shot.
- Color design: property → arc → sequence → scene.
- Grade: sequence → shot → rendition.
- Score: property/theme → arc → cue.
- Graphics: property/template → rendition → page/panel.
- Appearance: character/era → production → scene state.

## 12.4 Counterpoint

Creative systems may relate to narrative emotion through:

- reinforce
- contrast
- withhold
- destabilize
- evolve
- remain ambiguous
- express character perception
- express audience knowledge

Emotion tags may suggest defaults but cannot silently determine lens, palette, lighting, editing, or score.

## 12.5 Resolved realization

```text
Pinned canon and continuity state
+ accepted creative-system revisions
+ production and target context
+ operation-specific intent
        ↓
ResolvedRealizationSpec
```

The spec records the final resolved values, the source revisions that contributed them, override explanations, unresolved conflicts, locks, flexible attributes, target constraints, and evaluation plan. It is a derived canonical compilation artifact, reproducible from authoritative inputs.

---

# 13. Native image architecture

## 13.1 User workflow

```text
Select image / subject / region / version
        ↓
Speak or type desired result
        ↓
Storyworld displays interpretation and preservation locks
        ↓
Low-cost preview or proposed operations
        ↓
Direct fal endpoint or registered ComfyUI workflow
        ↓
Quarantine, download, validation, hashing, lineage
        ↓
Identity/continuity/text/fidelity evaluation
        ↓
Compare, refine, partially accept, or branch
```

## 13.2 Native operation families

Storyworld should support typed image operations for:

- New image generation.
- Controlled variations.
- Subject replacement and isolation.
- Object removal or insertion.
- Background replacement.
- Wardrobe, hair, makeup, condition, expression, and pose changes.
- Relighting and time-of-day changes.
- Canvas extension and reframing.
- Aspect-ratio adaptation through recomposition, not only cropping.
- Identity, pose, background, location, and composition preservation.
- Reference and neighboring-shot matching.
- Text, sign, logo, package, and product repair.
- Transparency and cutout generation.
- Upscaling, restoration, denoising, and detail recovery.
- Visual-development sheets, color studies, lighting studies, and boards.
- Composition from approved regions of several candidates.

## 13.3 Semantic selection and masks

A user may point, click, roughly brush, name an entity, or describe a region. Storyworld creates a versioned selector or mask candidate bound to an exact image version. The mask is a derived technical artifact, not creative authority.

For example:

> Keep the face, hands, pose, and background. Replace only the coat with the accepted red-coat design.

Storyworld resolves:

- Character and appearance references.
- Exact coat region and confidence.
- Required sleeve repair state.
- Prohibited changes to face, hands, pose, and background.
- Evaluation plan for identity and continuity.

Low-confidence segmentation requires preview or correction before consequential execution.

## 13.4 Multi-candidate composition

“Use the face from version two and the background from version four” becomes an explicit `ImageOperation` with:

- Exact source asset versions.
- Source regions/masks.
- Composite geometry.
- Color/light harmonization intent.
- Rights and consent intersection.
- New derivation record.
- Evaluation of seams, identity, lighting, and provenance.

The operation never overwrites either source.

## 13.5 Deterministic versus generative execution

Use deterministic processing for crop, resize, format, alpha, metadata, color-space conversion, compositing when exact masks/layers are available, and technical validation. Use fal or ComfyUI only when the requested transformation requires generative inference.

## 13.6 Native image precision boundary

Storyworld should aim to make InvokeAI unnecessary for normal work. InvokeAI remains available when the user needs detailed painting, difficult mask correction, highly iterative regional control, or a workflow Storyworld has not productized safely.

---

# 14. Native video architecture

## 14.1 Canonical editorial model

Storyworld needs an `EditorialSequence` domain model above OTIO. It should represent:

- Sequences and variants.
- Tracks and semantic lanes.
- Clips and exact asset-version references.
- Source and timeline ranges.
- Scene, beat, shot, dialogue, cue, and caption references.
- Transitions and shot relationships.
- J-cuts and L-cuts.
- Editorial rationale.
- Directorial and continuity context.
- Locked timing and flexible ranges.
- Audio hierarchy.
- Target duration, aspect, and destination.
- Approval state and invalidation.

OTIO is the principal portable editorial interchange profile, not the full Storyworld editorial authority.

## 14.2 Native operation families

`VideoEditOperation` should cover:

- Trim, split, insert, replace, reorder, remove, and gap.
- Exact-frame and timecode changes.
- J-cuts and L-cuts.
- Transition type and duration.
- Pace changes and scene compression.
- Montage and parallel sequence construction.
- Rough cuts, alternate cuts, trailers, recaps, and short versions.
- Caption and subtitle timing.
- Basic dialogue/music/ambience priority and level changes.
- Basic grade direction and shot-match requests.
- Reframing and aspect adaptation.
- Generated-shot insertion, shot extension, and generative transformation.
- Editorial diagnosis and continuity repair.
- Storyboard and animatic assembly.

## 14.3 Semantic source index

Storyworld should index exact source versions with:

- Transcript and speaker segments.
- Shot and scene boundaries.
- Visible characters, objects, locations, and products.
- Camera/framing descriptors.
- Motion and visual-quality indicators.
- Dialogue topics and emotional/narrative role.
- Sound events, silence, ambience, and music.
- Rights, consent, visibility, and provider-egress constraints.

Model-assisted metadata remains a finding or derived index with confidence and provenance; it does not become canon automatically.

## 14.4 Rough-cut generation

A request such as “make a tense 45-second opening” should produce:

- Interpretation of tension and duration.
- Shot-selection and omission strategy.
- Proposed source ranges.
- Sound and music plan.
- Generated-shot requirements, if any.
- Cost and provider routes.
- A low-resolution preview.
- A timeline diff and rationale.

## 14.5 Native renderer

Storyworld does not need a complete NLE engine. It needs a deterministic preview and simple-mastering pipeline using FFmpeg and OTIO-compatible semantics. It should render:

- Proxies.
- Review previews.
- Basic transitions.
- Captioned versions.
- Basic audio mixes.
- Simple grades or LUT transforms.
- Destination previews.

Complex Fusion, OpenFX, advanced grade, plugin, or mastering work remains an external finishing case.

---

# 15. Native AI-mediated professional precision

Professional precision is a core target, not a synonym for a dense interface.

## 15.1 Precision request patterns

- “Move the cut 12 frames earlier.”
- “Keep this subject sharp while the background drifts out of focus.”
- “Track this mask along the left sleeve.”
- “Match the contrast curve and white balance to the previous shot.”
- “Lower the score by 3 dB starting two frames after the door closes.”
- “Move the title 24 pixels inside the safe area.”
- “Ease the camera movement into the final position over 18 frames.”

## 15.2 Precision primitives

Storyworld should provide reusable primitives for:

- Exact time and frame ranges.
- Numeric values with units.
- Curves and keyframe-like intent.
- Region, object, and track selectors.
- Motion and tracking paths.
- Reference-sample matching.
- Constraint locks and tolerances.
- Safe areas and layout grids.
- Audio levels and fades.
- Color samples, transforms, and target shots.

These primitives remain Storyworld-owned semantic instructions. Provider-native masks, keyframes, node graphs, and effect parameters are derived execution artifacts.

## 15.3 Preview and correction

Every precision operation should offer the cheapest faithful preview available:

- Geometry/overlay preview.
- Low-resolution render.
- Before/after still.
- Short audio preview.
- Timeline simulation.
- No-preview explanation when preview is impossible.

The user can correct the selection, number, or reference without reopening a provider-native workflow.

## 15.4 Viability boundary

A capability should move to an external precision tool only when Storyworld cannot provide reliable selection, execution, preview, interchange, or evaluation. The failure should create a product-gap record so repeated external escapes can justify a later native capability.

---

# 16. Cross-media direction

## 16.1 Coordinated command

One command may create a `CreativePlan` with separate operation groups:

```text
“Make the whole scene colder.”

ImageOperation: cool promotional stills while preserving skin tones
VideoEditOperation: apply cooler sequence grade intent
LightingPlan amendment proposal: colder practical-light balance
AudioEditOperation: emphasize sparse room tone
MusicOperation: reduce warmth in instrumentation / withhold theme
GraphicLayoutOperation: shift title treatment within approved identity
RuntimeContentOperation: bind matching presentation profile
```

## 16.2 Coordination rules

- Each operation has its own base versions, costs, egress policy, provider route, evaluations, and invalidations.
- The plan can define shared creative rationale without collapsing media semantics.
- Cross-media previews identify which domains are simulated, rendered, or pending.
- Partial acceptance is allowed only where dependency and consistency rules remain valid.
- A cross-media command never writes an untyped “mood” value across unrelated systems.

## 16.3 Coordinated approval

The user may accept image and graphics changes but reject sound changes. Storyworld then creates a new coordinated revision set and records the intentionally diverged domains. If the accepted subset violates a required production rule, Storyworld must replan rather than silently apply an inconsistent state.

---

# 17. OpenRouter architecture

## 17.1 Role

OpenRouter is the first strategic adapter for language and multimodal reasoning. It may support:

- Command interpretation.
- Structured planning.
- Narrative drafting.
- Source extraction.
- Continuity and rights-oriented analysis.
- Image/video/audio understanding.
- Translation and accessibility drafts.
- Model-assisted evaluation.
- Tool-call proposals.

OpenRouter never owns the tool registry or executes Storyworld commands directly. Models propose structured outputs or tool calls; Storyworld validates and executes permitted operations.

## 17.2 Capability profiles

Examples:

- `creative_command_interpretation`
- `canon_extraction_high_precision`
- `narrative_drafting_creative`
- `continuity_review_long_context`
- `visual_analysis_private_zdr`
- `rights_evidence_extraction_no_fallback`
- `fast_public_metadata_classification`
- `translation_target_locale`

Each profile records:

- Required modalities and parameters.
- Approved models and underlying providers.
- Fixed versus automatically routed behavior.
- Required structured-output schema.
- Tool-calling permission.
- Provider-egress classes.
- ZDR and data-collection rules.
- Fallback policy.
- Quality floor and evaluation version.
- Cost and latency limits.
- Human-review requirements.

## 17.3 Model approval lifecycle

```text
discovered
→ experimental
→ evaluated
→ approved for named capability and policy
→ deprecated
→ prohibited
```

Approval is never universal. It binds model, provider route, capability, egress class, retention mode, schema version, and evaluation evidence.

## 17.4 Structured outputs

Creative interpretations and plans must use strict JSON-Schema output where supported. Invalid or unsupported structured output fails closed or enters a bounded repair path; unvalidated prose never becomes an operation plan.

## 17.5 Routing and fallback

- Low-risk public drafting may use approved automatic routing and policy-equivalent fallback.
- Canon, rights, continuity, private/restricted/highly restricted, accepted-workflow, and reproducibility-critical profiles use a fixed route or explicit allowlist and no automatic fallback.
- `require_parameters`, data-collection controls, ZDR, and provider ordering compile from Storyworld provider policy.
- The actual model and provider returned are recorded and checked against the plan.

## 17.6 Usage and cost

Record response ID, actual model/provider, token counts, reasoning/cache details where available, cost, latency, and error/finish reason. Usage is attributed to workspace, member, production, command, plan, and budget.

## 17.7 Unknown outcomes

For network interruption after request submission:

- Preserve correlation and provider request/generation ID where available.
- Query provider usage/result status when possible.
- Do not reissue consequential requests blindly.
- If no status query exists, mark unknown and require operator reconciliation or a new explicitly distinct request.

---

# 18. fal.ai architecture

## 18.1 Role

fal.ai is the first strategic hosted media-generation and transformation service for approved image, video, audio, and later 3D capabilities.

## 18.2 Queue-first production execution

Use asynchronous queue submission for production work. Storyworld Temporal workflows own the business process; fal’s queue is a child execution mechanism.

Required states in Storyworld:

- planned
- submitted
- queued
- in_progress
- cancellation_requested
- provider_completed
- output_ingesting
- quarantined
- evaluated
- reconciled
- failed
- unknown
- late_result

## 18.3 Webhooks and polling

- Register an authenticated webhook endpoint.
- Deduplicate by provider request ID plus endpoint and execution-plan hash.
- Verify signature or provider-authentication method.
- Acknowledge quickly and process asynchronously.
- Poll when a webhook is missing, delayed, or unverifiable.
- Duplicate callbacks update one execution record and do not duplicate candidates.

## 18.4 Retry and fallback policy

fal may retry queue requests and may support model fallback. Storyworld must compile per-request retry and fallback controls:

- Disable retry where repeated execution threatens reproducibility, consent, cost, or side-effect safety.
- Permit bounded retry for ordinary candidate generation within the same request and cost policy.
- Disable fal model fallback for profiles requiring exact provider/model identity or restricted routing.
- Record every reported retry and actual endpoint.

## 18.5 Cancellation and late completion

Cancellation is best effort. An in-progress request may still complete. Therefore:

- Cancellation prevents automatic application or review promotion.
- A later output is downloaded only if policy and URL validity permit.
- It enters `late_result` quarantine tied to the original plan.
- It may be retained as disposable evidence or formally admitted by a new human decision; never applied automatically.

## 18.6 Retention and transport

Default policy:

- `X-Fal-Store-IO: 0`.
- Short media expiration via object-lifecycle header.
- Immediate output download.
- Public fal CDN URLs are treated as bearer-like temporary transport references.
- Restricted inputs must not be uploaded to public CDN unless the exact policy explicitly permits that route.
- Storyworld never stores a fal URL as the permanent asset location.

## 18.7 Cost

Perform cost estimation before submission. If the endpoint cannot provide a reliable estimate, disclose that and require confirmation according to policy. Record actual billed usage when available and reconcile it against the budget.

## 18.8 Current adapter successor

Replace the narrow endpoint-specific `ProviderAdapter.generate()` assumption with capability-based execution supporting media inputs, asynchronous status, cancellation, webhooks, multiple output roles, execution metadata, and cost/retention policy.

---

# 19. Self-hosted ComfyUI architecture

## 19.1 Role

ComfyUI is a separately deployed advanced technical environment for:

- Workflow design.
- Workflow testing.
- Multi-step provider orchestration.
- Reusable registered workflows.
- Technical inspection and diagnostics.
- Experimental capability evaluation.

Routine Storyworld users do not need to open it.

## 19.2 Current no-local-weight posture

Under the accepted posture, ComfyUI does not host local generative model weights. Generative nodes call approved hosted endpoints. Deterministic nodes may execute inside the Storyworld-controlled boundary.

## 19.3 Workflow registry

A Storyworld `WorkflowDefinition` records:

- Stable Storyworld workflow ID and version.
- Workflow JSON hash.
- Capability and media types.
- Required node package identifiers and immutable versions.
- Required deterministic tools and hosted endpoints.
- Input/output binding schema.
- Egress classification ceiling.
- Security class and resource limits.
- Experimental/evaluated/production-approved state.
- Evaluation corpus and result.
- Replacement and rollback path.

## 19.4 Node and endpoint safety

- Deny unregistered custom nodes.
- Pin node package versions and dependencies.
- Run in an isolated container or dedicated OS identity.
- Give no Storyworld database or unrestricted object-store credential.
- Mount immutable inputs and isolated output paths.
- Deny network egress except through an allowlisted proxy.
- Block runtime installation and arbitrary script execution where possible.
- Record node and endpoint versions.
- Separate experimental and production installations.

Registry verification flags are useful evidence but do not replace Storyworld review.

## 19.5 Authority

The ComfyUI graph is a provider execution artifact. Storyworld owns the creative operation, recipe, policy, workflow approval, input bindings, result custody, and acceptance.

---

# 20. Blender precision integration

Blender is the initial precision environment for exceptional 3D, spatial, camera, lighting, animation, compositing, and runtime-preparation work.

## 20.1 Exchange profiles

- OpenUSD for layered production-scene interchange.
- MaterialX for materials/look-development interchange.
- glTF for runtime-oriented assets.
- OpenColorIO configuration for viewing and output transforms.
- Standard image/video/audio formats for rendered candidates.

## 20.2 Checkout package

Include:

- Exact canonical entities, locations, objects, and state references.
- Accepted production-design and appearance revisions.
- Camera, lighting, blocking, and medium-realization intent.
- Referenced asset versions and hashes.
- Rights and egress rules.
- Unit/scale/axis/frame-rate/color conventions.
- Dependency manifest and return expectations.

## 20.3 Return

Returned `.blend`, USD, MaterialX, glTF, renders, and caches are untrusted. Storyworld validates external references, missing dependencies, scripts, media, and package integrity. Rendered outputs enter as candidates. Workfiles preserved for reproducibility remain nonauthoritative.

## 20.4 Runtime boundary

Blender may prepare runtime assets but cannot define Storyworld runtime package authority or player state.

---

# 21. InvokeAI precision integration

InvokeAI is an optional precision image-finishing workspace, not the normal image interface.

## 21.1 Supported escape cases

- Detailed hand-guided masking.
- Difficult regional inpainting/outpainting.
- Fine cleanup.
- Complex visual experimentation.
- Brush-oriented corrections Storyworld cannot yet express reliably.

## 21.2 Checkout

Storyworld exports exact source and permitted reference versions, standard images and masks, color/profile metadata, transformation constraints, and an integrity-protected sidecar. The user works normally in InvokeAI.

## 21.3 Hosted inference

Under the current posture, InvokeAI does not require local model weights. fal-backed or other policy-approved hosted operations may be used only when egress, retention, consent, and budget rules pass.

## 21.4 Return

Returned images and any preserved session/workflow files are scanned, hashed, linked to checkout, declared as transformations, evaluated, and admitted as new candidates. InvokeAI gallery, board, canvas, and internal metadata never become Storyworld custody or approval state.

---

# 22. Kdenlive precision integration

Kdenlive is the optional open-source video-finishing environment.

## 22.1 Storyworld OTIO profile

The package includes:

- Lossless Storyworld `.otio` representation where possible.
- Stable Storyworld IDs in OTIO metadata.
- Sidecar project settings for resolution, frame rate, timecode, audio, color, and destination.
- Exact media/proxy manifests.
- Captions, audio stems, references, and rights restrictions.

## 22.2 Known round-trip mismatches

Kdenlive and OTIO differ in clip-marker instance semantics, and OTIO does not contain every project/render setting. Storyworld therefore treats returned OTIO as a portable editorial representation plus a conversion/loss report. The `.kdenlive` workfile is preserved when needed but remains nonauthoritative.

## 22.3 Security

- Pin supported Kdenlive/MLT versions.
- Generate Storyworld checkout packages internally.
- Treat returned project files and remote references as untrusted.
- Disable automatic execution or resolution of unexpected external paths.
- Run without Storyworld database credentials.

## 22.4 Return reconciliation

Storyworld computes semantic changes: trims, order, replacements, transitions, effects, captions, audio, missing media, unsupported effects, and unknown clips. Changes become a proposal rather than silently replacing the accepted sequence.

---

# 23. Resolve precision integration

DaVinci Resolve Studio is the optional professional finishing environment for complex edit, color, Fusion, Fairlight, and mastering work.

## 23.1 Local connector

A local `ResolveConnector` should:

- Verify supported Resolve version and license capabilities.
- Create or open a dedicated project.
- Import exact media and OTIO.
- Create bins from Storyworld production structure.
- Attach Storyworld IDs and hashes to clip/timeline metadata where possible.
- Apply project frame-rate, resolution, audio, and color settings.
- Export OTIO, renders, captions, audio stems, project archive, and change report.
- Recover from connector loss without assuming the edit failed.

## 23.2 Boundaries

OTIO captures portable editorial information. Fusion graphs, grades, Fairlight automation, plugins, and Resolve-specific titles may be lossy or opaque. Storyworld therefore stores:

- Portable returned timeline.
- Resolve workfile/archive when required.
- Rendered candidates.
- Conversion loss report.
- Connector-generated metadata and hashes.

Resolve’s collaboration, project library, or cloud services are optional and never become Storyworld authority.

## 23.3 Automation posture

The POC must verify the exact scripting features and licensing required for external automation. Storyworld should not promise unattended operations unsupported by the installed Resolve edition.

---

# 24. Deterministic media worker

## 24.1 Composition

A sandboxed worker image may include:

- FFmpeg/ffprobe.
- OpenImageIO.
- OpenColorIO and pinned configuration profiles.
- MediaInfo.
- ClamAV.
- libvips/sharp for routine web-image derivatives.
- Format-specific validators as approved.

## 24.2 Responsibilities

- Quarantine and technical inspection.
- MIME and structure validation.
- Malware scanning.
- Metadata extraction.
- Thumbnail, proxy, waveform, and frame generation.
- Trim, join, transcode, normalize, composite, crop, resize, and package.
- Color-space transforms.
- Deterministic preview and simple delivery renders.
- Technical conformance checks.

## 24.3 Isolation

- No canon or approval commands.
- No general database credential.
- Mission-scoped read/write capability to exact objects.
- No network egress by default.
- CPU, memory, disk, file-count, pixel-count, duration, recursion, and timeout limits.
- Archive traversal and decompression-bomb protection.
- Pinned binaries and container digest.
- SBOM and vulnerability evidence.

## 24.4 Receipt

Each operation records tool/container versions, input hashes, command/profile version, output hashes, warnings, timestamps, resource use, and deterministic reproducibility expectations.

---

# 25. Provider-egress and retention policy

## 25.1 Separate classification dimensions

Storyworld must keep three independent dimensions:

1. **Access classification:** who may see the resource.
2. **Retention classification:** how long and under what hold/deletion rules it must be kept.
3. **Provider-egress classification:** whether and how material may leave the Storyworld-controlled boundary.

Rights, consent, contract, law, and provider approval are additional gates.

## 25.2 Default mapping from accepted resource classes

| Accepted resource class | Default provider-egress class | Qualification |
|---|---|---|
| public | Public | Rights, consent, and task/provider approval still required. |
| internal | Private | Approved provider/model and retention policy required. |
| confidential | Restricted | Explicit route allowlist; normally ZDR/no collection; no automatic fallback. |
| restricted | Highly Restricted | Default no egress; a classification decision may identify a narrower permitted subset only when every applicable rule allows it. |
| embargoed | Private or Restricted based on underlying sensitivity | Embargo prevents public treatment; expiry does not automatically relax other restrictions. |

Automatic overrides:

- Credentials and secrets → Highly Restricted, no provider egress.
- Revoked/expired consent → blocked, not exception-eligible.
- Contractual no-hosted-processing → Highly Restricted/no egress.
- Identifying or sensitive material involving minors → Highly Restricted by default.
- Sensitive source material → at least Restricted unless reviewed otherwise.

The most restrictive rule wins.

## 25.3 `ProviderEgressDecision`

Every hosted execution binds a decision containing:

- Input resource versions and classifications.
- Derived effective egress class.
- Applicable rights/consent/contract rules.
- Approved provider, model/endpoint, region, retention and collection policy.
- Permitted input form—raw, redacted, summarized, transformed, or no egress.
- Fallback permission.
- Human exception receipt if policy permits an exception.
- Decision time and expiry.

## 25.4 Egress matrix

| Egress class | Hosted provider use | Retention | Fallback | Human authorization |
|---|---|---|---|---|
| Public | Approved task routes | Provider profile may allow ordinary retention | Policy-equivalent low-risk fallback allowed | Normal budget/operation rules |
| Private | Approved routes only | Prefer/require ZDR and no collection per policy | Normally restricted to explicit allowlist | Required if task or production policy says so |
| Restricted | Exact provider/model/endpoint only | ZDR/no collection; minimum input; short-lived transport | No automatic fallback | Explicit policy and, where required, authorized human |
| Highly Restricted | No hosted inference by default | Not applicable | None | Exact exception only where every rule permits; many categories are non-exceptionable |

## 25.5 Retention rules

- OpenRouter prompts/completions are not assumed safe merely because OpenRouter itself does not log by default; underlying endpoint policy is checked per request.
- fal request payload storage is disabled by default and media expiration is short.
- Provider-rendered prompts, execution plans, and logs are classified with their most sensitive input and stored encrypted or redacted according to retention policy.
- Provider URLs are not shared in ordinary logs or analytics.
- Transmission records retain hashes, policy decisions, provider/endpoint identity, time, and result—not necessarily full sensitive payloads.

---

# 26. Credential and cost policy

## 26.1 Credential models

The architecture supports:

- User-supplied credentials.
- Workspace/organization-managed credentials.
- Future Storyworld-managed credentials and billing.
- Customer-managed deployment credentials.

The first implementation begins with user-supplied credentials.

## 26.2 Remaining credential-scope decision

Recommended default for the first private family workspace:

> One workspace-admin-supplied OpenRouter credential and one workspace-admin-supplied fal credential, with per-member Storyworld authorization, usage attribution, budgets, and no ability for members to reveal the secret.

### Benefits

- Lowest setup burden.
- Central budget and provider policy.
- Simple rotation and revocation.
- Fits one trusted family team.

### Costs

- Provider billing is shared.
- One compromised credential affects the workspace.
- Provider-side usage is less naturally separated by person.
- A member cannot independently bring their own limits/account.

Separate member credentials improve isolation and individual billing but add setup, routing, and support complexity. A hybrid can arrive later. The owner must explicitly choose before credential-contract implementation.

## 26.3 Credential records

Store secrets only in the approved encrypted credential store. Store nonsecret metadata separately:

- Credential binding ID.
- Provider and capability scopes.
- Supplier/owner type.
- Workspace/member scope.
- Permitted egress classes.
- Created/rotated/revoked timestamps.
- Redacted hint.
- Budget association.
- Last successful verification.

No provider secret may enter a prompt, trace, client bundle, ComfyUI workflow, workfile, or portable package.

## 26.4 Cost preflight

`CostPolicy` supports:

- Preview allowance.
- Per-job ceiling.
- Batch ceiling.
- Daily, weekly, and production limits.
- Member and workspace limits.
- Approval thresholds.
- Regeneration count limits.
- Currency and price-snapshot version.
- Cost-uncertainty rules.

Preflight occurs before provider submission. The current alpha’s after-response estimate check is insufficient for the target architecture.

## 26.5 Actual-cost reconciliation

Record:

- Estimated range and confidence.
- Authorized ceiling.
- Actual provider cost.
- Credits/tokens/seconds/units.
- Retry and fallback cost.
- Budget remaining.
- Discrepancy reason.

If price, route, or expected work materially changes after approval, pause and request renewed confirmation.

---

# 27. Human authority and automation

## 27.1 Consequence classes

### Low consequence

May execute immediately when policy, budget, and user settings allow:

- Read-only analysis.
- Suggestions and findings.
- Temporary previews.
- Disposable alternatives.
- Transcription.
- Low-resolution tests.
- Previously approved bounded automation.

### Medium consequence

Requires a visible plan and confirmation before applying to governed work:

- Change an active edit.
- Replace or regenerate a shot/region.
- Change color, sound, captions, or layout.
- Create a governed variant.
- Invalidate an approval.
- Spend outside the normal allowance.

### High consequence

Requires the appropriately authorized human and all policy gates:

- Accept working canon or create a canon release.
- Accept a master, final edit, or channel package.
- Approve likeness/voice cloning use.
- Waive a blocker when waiver is allowed.
- Authorize publication.
- Delete governed evidence when deletion is permitted.
- Expand restricted-data provider policy.

## 27.2 Apply versus accept

- **Apply:** executes operations into a candidate or active governed revision.
- **Accept:** promotes an exact version into an authoritative state.
- **Approve:** grants one layer-specific approval.
- **Waive:** permits an exact exception under a policy that allows waiver.
- **Authorize publication:** grants an authority-scoped future external action.
- **Execute authorization:** mechanically attempts the exact still-valid action.

No UI label may blur these verbs.

## 27.3 Mature small-team roles

A successor to DEC-0021 should eventually define scoped roles such as:

- workspace owner/admin
- property owner/steward
- creator/editor
- creative reviewer
- rights reviewer
- publisher
- budget manager
- advanced operator

The current alpha remains `property_owner`-only for acceptance-class commands until the successor is accepted and enforced end to end.

## 27.4 Deterministic blockers versus interpretive findings

Objective failures may block automatically. Interpretive concerns produce findings with evidence and uncertainty. No model-generated aesthetic score can accept or reject creative work.

---

# 28. Asset custody and lifecycle

## 28.1 Artifact classes

Do not force every artifact through one lifecycle. Use shared identity/lineage envelopes and class-specific states.

### Source/evidence

- received
- quarantined
- validated
- admitted
- superseded
- archived
- deleted where allowed

### Disposable experiment

- created
- active
- retained temporarily
- promoted by formal import
- expired

### Governed media

Retain the accepted media lifecycle, with explicit quarantine/admission events around `staging` and `candidate`:

- source_imported
- staging
- candidate
- under_review
- accepted_master
- rendition
- submitted
- published/runtime_released
- correction/withdrawal/supersession states as applicable

### External workfile

- checked_out
- active_external
- returned_untrusted
- admitted_nonauthoritative
- superseded
- archived/expired

### Package/publication

- draft
- validated
- approved
- authorized
- scheduled
- submitted
- externally accepted/published
- failed/unknown
- corrected/withdrawn/superseded

## 28.2 Provider output admission

A provider output is external temporary data until Storyworld:

1. Downloads it.
2. Scans and validates it.
3. Hashes and stores it.
4. Records provider and recipe lineage.
5. Classifies it as disposable or governed.
6. Runs required evaluation.

Only then may it appear as a normal candidate.

## 28.3 Rejected candidates

Governed rejected candidates and decision evidence are retained per policy. Disposable experiments may expire after their rollback window. Accepted lineage and legally or operationally required evidence remain durable.

## 28.4 Deletion

Deletion is a policy-controlled transition. It must account for legal holds, consent revocation, published derivatives, package references, reproducibility, and required receipts. Revoked consent may require blocking, withdrawal, or restricted preservation rather than simple erasure.

---

# 29. External-tool checkout and return

## 29.1 Common contract

`ExternalEditorCheckout` contains:

- Checkout/session ID.
- Tool profile and supported version range.
- Exact source asset/sequence/specification versions.
- Portable interchange and native-import files.
- Permitted references.
- Rights, consent, access, and egress restrictions.
- Integrity manifest and package hash/signature where required.
- Expected outputs and portable return profiles.
- Checkout owner, time, expiry, and concurrency policy.

The external application need not understand the sidecar; Storyworld must retain it.

## 29.2 Concurrent returns

Two sessions returning changes to the same base produce two independent candidates. Storyworld never last-write-wins an accepted asset. It may offer a semantic comparison or a new merge proposal.

## 29.3 Return validation

`ExternalEditorReturn` records:

- Checkout association.
- Returned file inventory and hashes.
- Tool/version metadata.
- Declared transformation.
- Missing or new dependencies.
- Portable representation.
- Conversion loss report.
- Malware/format/remote-reference results.
- Candidate admission decision.
- Evaluation invalidations.

## 29.4 Tool disappearance

Storyworld remains usable if an external application disappears. Accepted outputs, portable representations, checkout manifests, workfiles retained in custody, and transformation lineage survive. A replacement tool receives a new checkout; no data migration makes the old application’s project format canonical.

---

# 30. Astro, Instagram, X, and TikTok delivery direction

## 30.1 Permanent export-first architecture

Every destination receives a versioned `InterchangeProfile` and generates a governed package before any connector attempts publication.

## 30.2 Astro first

The Astro exporter should create a self-contained, deterministic website package containing:

- Typed content collections or generated source data.
- Accepted media derivatives.
- Routes and stable identifiers.
- Accessibility metadata.
- Rights/disclosure records.
- Build profile and dependency lock.
- Build and validation receipts.
- Optional deployment handoff.

A successful Astro build is not publication. Deployment requires a separate authority host and authorization.

## 30.3 Instagram second

Keep and evolve the existing export adapter. Replace hard-coded mutable platform facts with dated channel-capability profiles and validation research. Add direct publication only after authentication, account eligibility, processing-status, idempotency, disclosure, failure, withdrawal, and receipt controls are proven.

## 30.4 X later

The X adapter separates media upload from Post creation and records temporary media IDs, processing status, exact text, attached assets, and resulting external IDs. Pricing, access tier, limits, and policy are dated external facts.

## 30.5 TikTok later

Begin with export or draft-upload workflows. Current TikTok developer guidance imposes audit and intended-use constraints that may make a private internal-only direct-post utility ineligible. A direct connector should therefore remain conditional on the mature customer offering and successful platform review.

## 30.6 Connector rule

No connector may silently resize, rewrite captions, add disclosures, choose hashtags, alter a destination, or change scheduled time after authorization. Any material change invalidates the authorization.

---

# 31. Publication scheduling

## 31.1 Separate objects

- `ChannelPackage`: exact content and destination-ready metadata.
- `PublicationAuthorization`: human approval of exact package, authority host, destination, time, disclosures, quota/cost boundary, retry/failure policy.
- `PublicationJob`: mechanical scheduled execution.
- `PublicationReceipt`: external result, identifiers, timestamps, status, and uncertainty.

## 31.2 Scheduler behavior

- Revalidate package hash, rights, consent, disclosures, policy, connector credential, destination capability, quota, and time before execution.
- The stricter of original and current rules wins.
- Material changes pause and require renewed authorization.
- Retries are bounded and idempotent within the approved request.
- Unknown outcomes trigger status lookup and human reconciliation, not blind reposting.
- Pause/cancel is supported until the external authority host makes it impossible.
- Correction, withdrawal, and supersession remain explicit workflows.

## 31.3 No direct connector yet

Before a connector is activated, the scheduler may schedule package preparation or handoff only. The questionnaire and this architecture do not authorize live publication.

---

# 32. Commerce Foundry integration

## 32.1 Preserved peer boundary

Storyworld owns narrative and creative authority. Commerce Foundry owns product truth, claims, offers, commercial policy, vendor configuration, orders, fulfillment, and commercial publication authority for Commerce Foundry-originated work.

## 32.2 Exchanges

### Commerce Foundry → Storyworld

`CommerceFoundryBrief` / Narrative Campaign brief:

- Product snapshots.
- Claims and evidence.
- Placement and disclosure rules.
- Audience/channel goals.
- Rights and commercial constraints.
- Required outputs and deadlines as facts, not automatic authority.

### Storyworld → Commerce Foundry

`StoryworldCommerceBundle`:

- Creatively accepted assets.
- Print-ready packages.
- Narrative context and placement declarations.
- Rights/consent/disclosure evidence.
- Storyworld validation and approval receipts.
- Exact product-snapshot references.

Commerce Foundry imports it as an unapproved commercial candidate.

### Commerce Foundry → Storyworld

`CommerceFoundryReceipt`:

- Commercial findings.
- Approval/rejection/revision status.
- Vendor/product configuration status.
- Order/fulfillment/publication references.

## 32.3 Print

Storyworld generates and validates the package and proof. Commerce Foundry handles vendor credentials and order submission. Standalone print-ready export remains available.

## 32.4 Source drift

Retain the current strong behavior: changed product/source facts mark connected work stale and propose revalidation, replacement, withdrawal, or permitted waiver. Published work is not silently deleted.

---

# 33. Browser and Godot runtime architecture

## 33.1 Shared source contract

`RuntimeContentPackage` should remain independent of the target engine and contain:

- Pinned canon release.
- Authored dialogue, missions, choices, items, triggers, locations, sound zones, and narrative rules.
- Accepted assets and references.
- Runtime capabilities and policy.
- Content/version identifiers.
- No player-save or live session state.

## 33.2 Target adapters

### Browser adapter

Produces a portable web package with JSON/content modules, assets, accessibility requirements, and runtime contract. A browser framework or Astro-based shell may be used, but the package semantics remain Storyworld-owned.

### Godot adapter

Produces Godot-importable content, resources, glTF assets, scripts/data generated from the shared contract, and validation reports. Godot owns rendering, physics, navigation, networking, and saves.

## 33.3 Receipts and observations

Runtime authority hosts return:

- Package acceptance/rejection receipt.
- Build/runtime version.
- Validation and unsupported-capability report.
- Session observations and analytics.
- Player decisions and nonauthoritative branch state.
- Proposed canon changes.

## 33.4 Canon protection

Runtime activity never changes working canon. A future successor may permit automated mutation of a separately defined nonauthoritative branch/runtime state, but promotion into canon remains human-controlled.

## 33.5 Cross-target conformance

The same fixture compiled to browser and Godot must preserve narrative identifiers, authored outcomes, visibility, rights, and content hashes. Target-specific presentation differences are explicit in `ConversionLossReport` and target profile.

---

# 34. Required contracts and schemas

The contract backlog is detailed in `04-contract-and-schema-backlog.md`. The required dependency order is:

## Foundation

- `CreativeContext`
- `CreativeCommand`
- `ConsequenceClassification`
- `ProviderEgressDecision`
- `CostPolicy`
- `CreativeSpecification` and `CreativeBinding`

## Intent and decision

- `CreativeInterpretation`
- `CreativePlan`
- `CreativeOperation` common envelope
- Media-specific operation schemas
- `EditProposal`
- `PreviewArtifact`
- `CreativeDecision`
- `CreativeRevision`
- `ApprovalInvalidation`

## Realization and execution

- `ResolvedRealizationSpec`
- Revised `GenerationRecipe`
- `DeterministicProcessingPlan`
- `ProviderExecutionPlan`
- `ProviderExecutionResult`
- `ProviderCapabilityProfile`
- `ProviderPolicy`
- `ModelCapabilityApproval`
- `WorkflowDefinition`
- `WorkflowPromotion`

## Asset, annotation, evaluation

- Revised `AssetVersion` profile
- `TransformationRecord`
- `AnnotationTarget`
- `EvaluationPlan`
- Revised `EvaluationFinding`

## External/interchange

- `ExternalEditorCheckout`
- `ExternalEditorReturn`
- `EditorialSequence`
- `EditorialHandoffPackage`
- `EditorialReturnPackage`
- `InterchangeProfile`
- `ConversionLossReport`

## Delivery/peer/runtime

- Revised `ChannelPackage`
- `PublicationAuthorization`
- `PublicationJob`
- `PublicationReceipt`
- Revised `RuntimeContentPackage`
- `RuntimeReceipt`
- Revised `CommerceFoundryBrief`
- `StoryworldCommerceBundle`
- `CommerceFoundryReceipt`

Voice audio does not require a permanent first-class domain object. It is a temporary input reference in `CreativeCommand` unless formally imported as a governed source/evidence asset.

---

# 35. Decision amendments and successors

The recommended grouped decision program is detailed in `03-decision-successor-plan.md`.

## Proposed independently ratifiable decisions

1. **Intent-driven product and small-team boundary.**
2. **Creative-command, proposal, consequence, and revision architecture.**
3. **Compositional Creative Direction and ResolvedRealizationSpec.**
4. **Provider-neutral execution separation and task-profile gateway.**
5. **Provider-egress, credential, and cost governance.**
6. **Self-hosted ComfyUI workflow registry and security boundary.**
7. **Native media editing and AI-mediated professional precision.**
8. **External precision-tool, annotation, checkout/return, and OTIO boundary.**
9. **Deterministic media worker and expanded custody lifecycle.**
10. **Professional evaluation and fixture architecture.**
11. **Astro-first delivery and publication scheduling successor.**
12. **Commerce Foundry print/commercial boundary.**
13. **Shared browser/Godot runtime and runtime nonauthority.**
14. **Mature small-team authority roles**, deferred until collaboration implementation is authorized.

## Existing decisions

- **ADR-0015:** principle retained; implementation requires conformance amendment/successor.
- **DEC-0012:** retain hosted-API/no-local-weight posture; supersede InvokeAI/ComfyUI product roles.
- **DEC-0015/0017:** retain proven integration substrate; supersede delivery priority.
- **DEC-0021:** retain current alpha enforcement; successor needed before mature roles.
- **DEC-0028:** amend terminology and generalize profile contract; do not accept/build until owner gate.
- **DEC-0031:** replace, not accept as written.
- **DEC-0032:** amend substantially.
- **DEC-0033:** replace with compositional decision.

---

# 36. Studio information architecture

## 36.1 Primary navigation

1. **Home** — attention, active productions, pending proposals, costs, provider status.
2. **Create** — Conversational Production Workspace; default entry.
3. **Story** — canon, world, arcs, scenes, beats, shots, interactive structure.
4. **Media** — image, sequence, audio/music, graphics, and runtime workspaces.
5. **Review** — proposals, diffs, findings, exact-version decisions, waivers.
6. **Library** — assets, sources, references, workfiles, packages, provenance.
7. **Deliver** — Astro/social exports, scheduling, Commerce Foundry, runtime packages.
8. **Settings** — identity, roles, providers, credentials, budgets, privacy, external tools.

## 36.2 Conversational Production Workspace

Default layout:

- Command/voice surface.
- Primary preview or semantic structure.
- Current target/context indicator.
- Interpretation and assumptions.
- Plan/progress drawer.
- Alternatives and comparisons.
- Simple contextual controls.
- Cost/privacy/provider summary.
- Review and partial-acceptance actions.

## 36.3 Media workspaces

### Image Canvas

- Image/version comparison.
- Object/region/semantic selection.
- Mask preview and correction.
- Native operations and alternatives.

### Video and Sequence Workspace

- Scene/beat/shot structure by default.
- Semantic timeline and clip inspector.
- Playhead-aware commands.
- Captions, audio/music lanes, and transition/pacing previews.
- Conventional dense timeline only as an advanced view.

### Audio/music

- Dialogue, ambience, effects, music, and cue lanes.
- Transcript-linked regions.
- Semantic level/fade/priority controls.

### Graphics/layout

- Page/panel/card/overlay structure.
- Type hierarchy, safe areas, and destination previews.

### Runtime

- Shared content source, target capability comparison, package validation, receipts.

## 36.4 Review surfaces

- Proposal/Diff Review supports operation-by-operation acceptance.
- Review Room binds annotations to exact versions.
- Approval consequences are shown before decisions.
- Provider and external-tool details remain inspectable but secondary.

## 36.5 Accessibility

Every canvas/timeline/graph has a structured alternative. Required behaviors include keyboard operation, screen-reader labels and order, zoom/reflow, no color-only meaning, reduced motion, touch targets, RTL/IME support, focus retention under virtualization, and text parity for voice commands.

---

# 37. Security controls

## 37.1 Provider credentials

- Encrypted server-side storage only.
- No browser exposure.
- Allowlisted credential slots/capabilities.
- Workspace/member scope enforced before resolution.
- Rotation and revocation receipts.
- No revoked-key fallback.
- Redacted hints only.
- Separate credentials for Storyworld Engine and optional external tools.

## 37.2 Provider requests

- Preflight egress, rights, consent, model/endpoint, retention, fallback, and cost.
- Exact correlation/idempotency identifiers.
- Redacted logs.
- Provider responses treated as untrusted.
- Prompts/messages classified with input sensitivity.
- No secret values in model context.

## 37.3 fal transport

- Disable payload storage by default.
- Set short CDN expiration.
- Avoid CDN upload for material whose policy forbids public bearer URLs.
- Download and ingest immediately.
- Verify URL host, redirect policy, size, media type, and hash.
- Deduplicate and authenticate webhooks.
- Poll on missing/uncertain callbacks.
- Quarantine late results.

## 37.4 ComfyUI

- Isolated deployment and service identity.
- Node and endpoint allowlists.
- Immutable node/workflow versions.
- No runtime dependency installation.
- No direct database credentials.
- Read-only inputs and isolated outputs.
- Egress proxy and deny-by-default networking.
- Experimental and production separation.
- Security scanning and SBOM.

## 37.5 External workfiles

- Treat Kdenlive, Resolve, Blender, InvokeAI, archive, and project files as untrusted.
- Reject path traversal, unexpected external URLs, scripts, macros, executable payloads, unsupported codecs, and missing dependencies according to profile.
- Do not automatically launch third-party files from an untrusted source.

## 37.6 Media ingress

- MIME sniffing, extension mismatch detection, antivirus, format parser limits, decompression-bomb protection, archive limits, metadata-size limits, and isolated decoding.
- Preserve original bytes and record every normalization.

## 37.7 Voice and transcripts

- Encrypted temporary audio.
- Strict TTL and deletion evidence where appropriate.
- Transcript access/egress classification.
- No voice cloning without explicit consent and human approval.

## 37.8 Customer-managed deployment

- Network segmentation among Engine, workers, ComfyUI, storage, and public connectors.
- TLS/mTLS according to deployment topology.
- Operator-controlled backups and restore drills.
- Pinned deployment manifest.
- No assumption that “local” means trusted.

## 37.9 Supply chain

- Dependency locks and image digests.
- SBOM and license register.
- Signed release artifacts.
- Vulnerability handling and update policy.
- Separate review for GPL/AGPL/fair-source/bundling implications.

---

# 38. Evaluation and continuity

## 38.1 Evaluation principles

- No universal creative-quality score.
- Every finding names evidence, subject versions, layer, severity, confidence, and remediation.
- Deterministic checks may block where policy defines an objective condition.
- Model-assisted checks remain findings unless an independently validated objective threshold is approved.
- Human creative and legal judgment remains explicit.

## 38.2 Command and plan evaluation

### Deterministic

- Transcript/command schema.
- Target exists and matches bound version.
- Selection snapshot not stale.
- Operations use supported types.
- Dependency DAG valid.
- Consequence classification at least as strict as rules require.
- Budget and egress decisions present.

### Model-assisted/human

- Interpretation matches user intent.
- Assumptions are complete and understandable.
- Proposed strategy is creatively appropriate.

## 38.3 Image evaluation

- File/media validity.
- Dimensions, transparency, safe area, color profile.
- Identity and appearance continuity.
- Wardrobe, hair, makeup, prop, location, product, logo, and text correctness.
- Preservation-lock adherence.
- Composition, lighting, color, and reference match as evidence-backed findings.
- Real-person consent and provider-policy compliance.

## 38.4 Video/editorial evaluation

- Timeline structure and media resolution.
- Source/time ranges and frame-rate consistency.
- Missing media.
- Screen direction, eyelines, spatial geography, and coverage.
- Dialogue and narrative continuity.
- Pacing, shot relation, transition, J/L cut, and montage intent.
- Color/grade continuity.
- Audio sync, dialogue perspective, room tone, ambience, and loudness.
- Caption/subtitle timing and legibility.
- Score placement and motif continuity.

## 38.5 External round-trip evaluation

- Base/return identity.
- Portable timeline/document diff.
- Unsupported or lost semantics.
- New external dependencies.
- Workfile integrity.
- Approval invalidation.
- Tool replacement test.

## 38.6 Provider substitution

For approved replaceability, run the same canonical recipe through another provider route and evaluate invariant preservation, not pixel equality. Record allowed variation, failure modes, and which approvals remain valid.

## 38.7 Delivery/runtime/commerce

- Destination technical conformance and mutable capability profile.
- Rights/disclosure completeness.
- Exact package identity.
- Runtime source equivalence across browser/Godot.
- Commerce product-snapshot and claim alignment.
- Publication/runtime/commerce authority-host receipt validation.

## 38.8 Waivers and invalidation

Waivers bind exact finding versions, scope, rationale, approver, expiry, and affected subjects. Changes to inputs, rights, consent, provider route, creative system, or output can invalidate a waiver or approval according to the `ApprovalInvalidation` contract.

---

# 39. Proof-of-concept program

The complete POC definitions appear in `05-proof-of-concept-program.md`.

The dependency order is:

1. Text/voice command and proposal model using mocks.
2. OpenRouter structured interpretation and policy routing.
3. fal queue, retention, custody, cancellation, and unknown-outcome handling.
4. Native image operations.
5. AI-mediated professional precision.
6. Native video/semantic timeline and OTIO.
7. Self-hosted ComfyUI workflow registry.
8. External precision checkout/return.
9. Coordinated cross-media command.
10. Astro export and publication package.
11. Commerce Foundry print/commercial handoff.
12. Browser and Godot runtime packages.
13. Provider outage, stale queue, and revalidation.

Every POC is disposable and must produce an owner decision, not production code by default.

---

# 40. Dependency-ordered implementation roadmap

The detailed roadmap appears in `06-dependency-ordered-roadmap.md`.

The governing sequence is:

1. Disposition owner direction and accept successor decisions.
2. Define command/context/consequence contracts.
3. Define human authority, egress, credentials, and cost foundations.
4. Define creative systems and resolved realization.
5. Correct recipe/execution separation.
6. Expand asset custody, transformations, and media worker.
7. Implement proposal, preview, diff, partial acceptance, and revision.
8. Implement OpenRouter and fal task-profile gateways.
9. Implement native image workflow.
10. Implement voice and contextual selection.
11. Implement AI-mediated precision.
12. Implement native video/editorial workflow and OTIO.
13. Expand evaluation and regression corpus.
14. Register self-hosted ComfyUI workflows.
15. Add Blender and InvokeAI escape hatches.
16. Add Kdenlive and Resolve round trips.
17. Add cross-media commands.
18. Add Astro export.
19. Add scheduler objects and package preparation.
20. Add Instagram export successor and only later direct connector.
21. Expand Commerce Foundry handoff.
22. Add browser and Godot vertical slices.
23. Add X/TikTok export/connectors when eligible.
24. Add managed credentials/billing if separately authorized.
25. Package customer-managed deployment.
26. Add later specialist integrations based on real production demand.

No phase may bypass the decisions, contracts, fixtures, or exit criteria of its dependencies.

---

# 41. Dossier-intake amendments

The exact artifact plan appears in `07-dossier-intake-expansion-plan.md`.

## 41.1 Preserve evidence

Add the completed questionnaire verbatim as owner-input evidence. Do not overwrite the older broad questionnaire without preserving its history; mark the completed integration questionnaire as a separate binding input for this decision program.

## 41.2 Add assessments

Create staged assessments for:

- Final integration architecture.
- Intent-driven creative production.
- Native professional precision.
- Provider and external-tool boundaries.
- Egress, credentials, retention, and cost.
- Publishing and scheduling.
- Commerce Foundry boundary.
- Browser/Godot runtime.
- POC and implementation sequencing.

## 41.3 Replace the impact map

Expand it beyond the current v1.1 portfolio material to cover canonical product direction, Engine/Studio modules, media pipeline, governance, channel/CF/runtime contracts, backlog, risks, glossary, contract pack, authority matrix, fixtures, and current-state discrepancy.

## 41.4 Update the manifest

Every new artifact receives class, status, dependency, gating decision, canonical target, and archival handling.

## 41.5 Archive after disposition

After successor decisions are accepted and canonical material is updated, archive the intake as evidence. Do not leave two active definitions of the target architecture.

---

# 42. Owner decision records

The 41 questionnaire answers are dispositioned in `08-owner-decision-records.md`.

Each record includes:

- Question.
- Confirmed answer.
- Final architecture interpretation.
- Repository conflict.
- Required successor decision.
- Unlocked work.
- Remaining dependency.

The completed questionnaire remains the authoritative evidence source for owner direction; the matrix is a derived implementation crosswalk.

---

# 43. Remaining open decisions

## 43.1 Provider credential scope

Choose one for the first private team:

- One workspace-admin credential set.
- Separate member credentials.
- Hybrid.

**Recommended default:** one workspace-admin credential set, with per-member Storyworld permissions, usage attribution, and budget controls; design the contract to add member credentials later.

## 43.2 Hosted Storyworld offering

Choose mature deployment scope:

- Customer-managed installations only.
- Storyworld-hosted service only.
- Both.

**Recommended direction:** both, in sequence—customer-managed/private deployment first, optional hosted small-team service later. This preserves ownership while providing a low-friction customer path. It adds operational, billing, support, and multi-tenant obligations and therefore requires a later business decision.

## 43.3 Deferred runtime-branch automation

No owner decision is required now. Keep automatic mutation of nonauthoritative runtime/branch state deferred until a concrete runtime fixture proves the need and a successor decision defines scope and rollback.

## 43.4 Local model weights

Not open under the current posture. Preserve an adapter seam but do not include local weights in the roadmap unless the owner explicitly reopens it.

---

# 44. Explicitly rejected alternatives

- Making ComfyUI, InvokeAI, Kdenlive, Resolve, Blender, or OpenReelio the main Storyworld interface.
- Building a conventional full NLE, paint application, DAW, DCC, or node graph before the intent-driven workflow is proven.
- Storing provider prompts, seeds, model IDs, LoRAs, node graphs, or workfiles as canonical creative authority.
- Allowing AI to accept canon, masters, waivers, or publication.
- Treating provider completion as acceptance.
- Treating Storyworld asset custody as provider or application storage.
- Using a generic automation platform such as n8n as a competing control plane.
- Replacing Temporal without measured evidence and a separate architecture decision.
- Replacing PostgreSQL/object-storage authority with an external DAM or editor database.
- Allowing unrestricted ComfyUI custom nodes or network egress.
- Using local model weights under the current accepted posture.
- Direct Storyworld-to-print-vendor integration by default.
- Enterprise department/workforce features as an early product requirement.
- One monolithic Look object.
- One universal emotional mapping from mood to palette/lens/light/music.
- One universal creative-quality score.
- Automatic provider fallback for sensitive or authoritative work.
- Social publication without an exact human authorization and authority-host receipt.
- Runtime save/player state writing working canon.

OpenReelio and Crayotter remain useful research references for typed AI editing and traceable agent workflows, but are not adopted as Storyworld authority or required dependencies.

---

# 45. Validation and acceptance criteria

## 45.1 Package validation performed

This handoff package must pass:

- All declared files present.
- JSON files parse.
- Contract register IDs unique.
- Decision IDs unique within the proposal.
- Roadmap dependencies refer to existing phases.
- POC dependencies refer to existing POCs.
- SHA-256 manifest generated and verified.
- Completed questionnaire file preserved as the source-evidence appendix.

## 45.2 Repository validation not claimed

No repository files were changed. A local clone was not available, and the GitHub combined-status endpoint returned no status checks for the assessed commit. Therefore this assessment does not claim to have rerun typecheck, tests, lint, contract-pack validation, harness validation, or CI.

Before intake integration, engineering must run the repository’s current refresh and validation commands and record exact results.

## 45.3 Decision acceptance gates

The architecture is ready for canonical integration only when:

- The owner dispositions the two remaining open decisions or explicitly defers them.
- Successor decisions identify which accepted decisions they supersede.
- DEC-0031 and DEC-0033 are replaced rather than accepted unchanged.
- DEC-0032 and the canonical impact map are amended.
- The provider-neutral recipe discrepancy is recorded and blocked from expansion.
- The authority matrix and lifecycle contracts are updated.
- The completed questionnaire is registered as evidence.

## 45.4 Implementation exit criteria

The target product direction is proven when a rights-safe fixture demonstrates that a small-team user can:

1. Select a scene, image region, or timeline range.
2. Direct a change through text and voice.
3. Inspect and correct Storyworld’s interpretation.
4. Review an operation plan, cost, privacy route, preserved attributes, and approval impact.
5. Generate or edit image and video media natively.
6. Use precise semantic controls without provider-native expertise.
7. Partially accept a multi-operation proposal.
8. Reproduce or replace the provider route without migrating creative authority.
9. Preserve canon, continuity, rights, custody, and exact-version history.
10. Export an Astro package, a social package, a Commerce Foundry bundle, and browser/Godot runtime packages with separate authority receipts.
11. Continue working when OpenRouter and fal.ai are unavailable.
12. Use an external precision tool only as an optional governed checkout and return.

That fixture—not the maturity of prose—establishes that Storyworld has become the intended product.
