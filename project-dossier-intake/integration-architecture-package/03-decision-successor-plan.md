# Decision Amendment and Successor Plan

**Status:** proposed numbering and grouping; final IDs are assigned only when records are created through repository governance.

## Decision-design principle

Group issues when they form one independently ratifiable architecture. Split only when an owner could reasonably accept one part while rejecting another without leaving an incoherent system.

## Existing decision disposition

| Existing decision | Current status | Proposed disposition | Reason |
|---|---|---|---|
| ADR-0015 provider-neutral recipes | Accepted | Retain principle; issue conformance successor/clarification | Correct boundary, but current compiler/UI violate it and target adds ResolvedRealizationSpec/ProviderExecutionPlan. |
| DEC-0012 B-phase execution authorization | Accepted | Successor required | Retain hosted-API/no-local-weight and human-review rules; reposition InvokeAI and formalize self-hosted ComfyUI. |
| DEC-0015 B3 integration substrate | Accepted | Successor for delivery priority only | CF/runtime/export substrate remains useful; Instagram-first priority changes. |
| DEC-0017 V1 consolidated review | Accepted | Retain as historical alpha acceptance; no retroactive rewrite | It proves the alpha, not the target product. Successors define V2 direction. |
| DEC-0021 human authority enforcement | Accepted | Retain for alpha; later scoped-role successor | Current owner-only enforcement remains until mature roles exist. |
| DEC-0028 graph/canvas semantics | Proposed | Amend before owner disposition | Rename to Narrative Flow; add reusable GraphViewProfile; keep structured fallback. |
| DEC-0031 art-style definitions | Draft | Replace | Fields collapse art style with mood, light, color, composition. |
| DEC-0032 export adaptors | Draft | Amend and split delivery authority from media grammar | Retain adaptor concept; add profiles/loss reports, Astro-first, CF print boundary. |
| DEC-0033 production-design Look | Draft | Replace | Monolithic mega-object and universal cascade do not fit professional practice or final product. |

## Proposed decision records

### DEC-0040 — Intent-Driven Storyworld Product and Small-Team Boundary

**Scope**

- Text and voice as primary controls.
- Storyworld-native normal generation/editing workflow.
- External tools as exceptional precision environments.
- Five-layer progressive control model.
- Solo/small-team product boundary.
- Clarification of the professional-tool non-goal.

**Supersedes/amends**

- Canonical product-direction sections that imply agency/enterprise tiers or external-editor-centered workflows.
- Product-role portions of DEC-0012, not its no-local-weight posture.

**Acceptance effect**

- Authorizes target UX and product-definition changes only.
- Does not authorize provider calls or media implementation.

**Required evidence**

- Completed questionnaire.
- Intent-driven POC plan.
- Accessibility and beginner/expert adversarial review.

---

### DEC-0041 — Creative Command, Proposal, Consequence, and Revision Architecture

**Scope**

- `CreativeCommand`, `CreativeContext`, `CreativeInterpretation`, `CreativePlan`.
- Typed media-specific operations.
- Low/medium/high consequence classes.
- `EditProposal`, partial acceptance, `CreativeDecision`, `CreativeRevision`.
- Conversation nonauthority.
- Apply/accept/approve/waive/authorize distinctions.
- Voice retention and selection snapshot rules.

**Related accepted decisions**

- Extends DEC-0020 proposal semantics and DEC-0021 authority enforcement.

**Required evidence**

- POC 1 with mistranscription, selection drift, partial acceptance, cancellation, and accessibility.

---

### DEC-0042 — Compositional Creative Direction and Resolved Realization

**Scope**

- Replace DEC-0031/0033 with separate creative systems.
- Define `CreativeSpecification`, `CreativeBinding`, discipline-specific scope resolution.
- Treat Look as a resolved Studio projection.
- Define `ResolvedRealizationSpec`.
- Add directorial intent and counterpoint relations.

**Supersedes**

- Draft DEC-0031.
- Draft DEC-0033.

**Required evidence**

- Book-research packages.
- Fixtures across still, film, audio-only, picture book, interactive, and cross-media work.

---

### DEC-0043 — Provider-Neutral Execution Separation and Capability Gateway

**Scope**

- Confirm ADR-0015.
- Correct current recipe/compiler/Studio discrepancy.
- Define canonical `GenerationRecipe` and noncanonical `ProviderExecutionPlan/Result`.
- Capability-based gateway instead of endpoint-shaped `generate()` only.
- Task profiles, structured outputs, tool-call proposals, unknown outcomes, provider substitution.
- Retain no-local-model-weight posture.

**Supersedes/amends**

- Implementation portions of DEC-0012.
- Does not supersede hosted-API-only policy unless stated.

**Immediate gate**

- New media/provider expansion must not build on the current prompt/seed recipe representation.

---

### DEC-0044 — Provider Egress, Credentials, Retention, Routing, and Cost Governance

**Scope**

- Four provider-egress classes and mapping to accepted access classes.
- `ProviderEgressDecision`.
- OpenRouter routing/ZDR/fallback requirements.
- fal retention/CDN policies.
- Credential ownership/scope metadata.
- `CostPolicy`, budget preflight, actual reconciliation.
- Real-person media gate.

**Owner dependency**

- Credential scope must be answered or explicitly deferred with a temporary workspace-admin default.

---

### DEC-0045 — Self-Hosted ComfyUI Workflow Registry and Security Boundary

**Scope**

- Self-hosted ComfyUI as operator/orchestration environment.
- Hosted generative endpoints only under current policy.
- Workflow/node/endpoint registry and promotion lifecycle.
- Egress proxy, isolation, version pinning, reproducibility, replacement.
- Operator-only visibility and nonauthority.

**Successor to**

- ComfyUI role in DEC-0012.

---

### DEC-0046 — Native Media Editing and AI-Mediated Professional Precision

**Scope**

- Storyworld-native image and video operations.
- `EditorialSequence` and deterministic preview/mastering boundary.
- Semantic selection, masks, tracking, exact frames, curves, audio automation, color matching.
- Progressive precision and native/external escape criteria.
- Generation and editing as one workflow.

**Dependency**

- DEC-0040 through DEC-0044.

**Required evidence**

- Image, video, and precision POCs with expert and beginner testing.

---

### DEC-0047 — Cross-Media Annotation, External Precision Tools, Checkout/Return, and OTIO

**Scope**

- `AnnotationTarget` exact-version model.
- Common `ExternalEditorCheckout/Return`.
- OTIO editorial profile and loss reports.
- Blender, InvokeAI, Kdenlive, and Resolve boundaries.
- Workfile preservation, concurrent returns, application replacement.

**Successor to**

- InvokeAI round-trip role in DEC-0012.

---

### DEC-0048 — Deterministic Media Worker and Expanded Artifact Custody

**Scope**

- Sandboxed FFmpeg/OIIO/OCIO/MediaInfo/ClamAV/libvips worker.
- Quarantine and technical-processing profiles.
- Provider-output admission.
- Disposable experiments and external workfile lifecycles.
- Transformation receipts and worker isolation.

**Extends**

- Existing content-addressed storage and media lifecycle.

---

### DEC-0049 — Professional Creative Evaluation and Regression Corpus

**Scope**

- Command, intent, image, video, sound, score, graphic, rights, egress, provider, external round-trip, runtime, and commerce evaluations.
- Deterministic/model-assisted/human authority boundaries.
- No universal score.
- Rights-safe fixture families, mutation testing, provider replay, metamorphic tests.

**Extends**

- ADR-0008 finding semantics, B4 regression, and DEC-0021 human disposition.

---

### DEC-0050 — Astro-First Delivery and Governed Publication Scheduling

**Scope**

- Permanent export-first architecture.
- Astro exporter first; Instagram second; X and TikTok later.
- `PublicationAuthorization`, `PublicationJob`, `PublicationReceipt`.
- Material-change invalidation, idempotency, unknown outcomes, withdrawal/correction.

**Supersedes**

- Instagram-first priority accepted through DEC-0015/DEC-0017.
- Relevant channel portions of draft DEC-0032.

**Does not authorize**

- Live connector activation.

---

### DEC-0051 — Commerce Foundry Commercial and Print Boundary

**Scope**

- Storyworld creative/rights/proof outputs.
- Commerce Foundry product/claim/offer/vendor/order/fulfillment/commercial publication authority.
- Print-ready bundle and receipt profiles.
- Separate approvals and source-drift behavior.

**Extends**

- Existing CF connector and authority matrix.

---

### DEC-0052 — Shared Browser/Godot Runtime Contract and Runtime Nonauthority

**Scope**

- One runtime content contract.
- Browser and Godot adapters.
- Save/session state separation.
- Runtime receipts and observations.
- No automatic working-canon changes.
- Future nonauthoritative branch automation remains deferred.

**Extends**

- Existing runtime compiler and DEC-0023 runtime decision receipts.

---

### DEC-0053 — Mature Small-Team Role and Delegation Model

**Status**

Deferred until collaboration implementation is authorized.

**Scope**

- Workspace owner/admin, property steward, creator/editor, creative reviewer, rights reviewer, publisher, budget manager, advanced operator.
- Resource scopes and temporary delegation.
- Separation of provider credentials, budgets, acceptance, and publication.

**Successor to**

- Mature role limitations of DEC-0021/0025.

## Proposed ordering

```text
DEC-0040
  ↓
DEC-0041 ── DEC-0042
  ↓           ↓
DEC-0043 ── DEC-0044
  ↓           ↓
DEC-0045   DEC-0048
  └────┬──────┘
       ↓
DEC-0046 ── DEC-0047 ── DEC-0049
       ↓
DEC-0050  DEC-0051  DEC-0052

DEC-0053 waits for collaboration authorization.
```

## Decisions not to proliferate

The following should remain contract/profile work inside the grouped decisions rather than separate ADRs unless POCs reveal independent risk:

- A separate decision for every media operation type.
- A separate decision for every external application.
- A separate decision for every OpenRouter model or fal endpoint.
- A separate decision for every social destination profile.
- A separate decision for voice transcription provider.
- A separate decision for each deterministic media binary.
