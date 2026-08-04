# Storyworld Integration Architecture Questionnaire

## Revised for Intent-Driven Creative Production

## What changed

A previous questionnaire assumed Storyworld would generate media but rely heavily on outside creative applications for editing.

The clarified direction changes that assumption:

* Text and voice are Storyworld’s main creative controls.
* Storyworld should handle most image, video, audio, and graphic work itself.
* AI instructions become clear, reversible editing operations.
* Manual controls remain available but are simplified and progressively revealed.
* InvokeAI, Kdenlive, DaVinci Resolve, and similar applications become optional precision-finishing tools for exceptional edge cases only.
* OpenRouter supplies language and multimodal intelligence.
* fal.ai supplies generative-media execution.
* Under the current accepted posture, Storyworld does not host local model weights.
* ComfyUI is primarily a self-hosted advanced workflow-design, testing, orchestration, and technical-inspection environment.

The following questions and confirmed answers define owner direction for the integration architecture. They still require the normal impact review, successor decisions, and canonical updates before they become accepted repository direction.

## What to expect from this questionnaire

This questionnaire is an owner-directed architecture exercise. Each recommendation is advisory: it explains a reasonable default and its tradeoffs, but it does not override a confirmed answer.

When the owner provides an explicit answer:

* Treat the answer as authoritative within this questionnaire over its recommendation, prior assumptions, and generic best practices.
* Treat “I agree” as confirmation of the recommendation unless additional wording qualifies it.
* Treat any qualification, disagreement, or added requirement as part of the authoritative answer.
* Carry confirmed answers and their implications into later sections.
* Preserve important nuance instead of forcing a response into A, B, or C.
* Distinguish confirmed answers, assumptions, unresolved questions, and suggestions.
* Never treat silence as agreement.
* Ask a focused clarification question only when an unresolved issue materially affects the architecture, product direction, cost, rights, privacy, or safety.

Review each question in the context of the entire questionnaire and all previous answers. Recommendations must be revised or explicitly marked as superseded when they conflict with a confirmed answer; confirmed answers must not be silently replaced by the original recommendation.

### How to read status, timing, and authority

* **Recommendation** is advisory analysis.
* **Answer** records confirmed owner direction for this questionnaire. It is an input to repository decision-making, not by itself an accepted decision record, implementation task, budget approval, credential grant, deployment approval, or publication authorization.
* **Current alpha** describes observed or accepted present behavior only where the text says so explicitly. **Target**, **future**, and **mature** describe intended capability.
* **First**, **second**, **early**, and **now** express implementation priority after a separately authorized task exists; they do not establish a calendar commitment or authorize work.
* Accepted repository decisions remain controlling until a successor decision supersedes them. Where this questionnaire proposes different direction, the difference must be dispositioned explicitly rather than treated as an implicit override.

### Shared terms

* **Storyworld-controlled deployment boundary** means the Engine, Studio, governed database and object storage, workers, and self-hosted services operated under the same Storyworld policy and administrative control. It may span multiple machines.
* **Local** means inside that controlled boundary, not necessarily on the user’s device. **Hosted provider** means a service outside it.
* **External tool** means a separately installed or deployed application or execution environment, even when it runs on the same machine. It receives no canon, asset-acceptance, rights-waiver, release, or publication authority.
* **Authorized human** means a verified human identity with the required role and resource scope. In the current alpha, accepted `DEC-0021` limits acceptance-class commands to a verified human `property_owner` bound to the target tenant and property; mature role expansion requires separate decisions.
* **Advanced Operator Mode authorization** is a separate, explicit workspace permission to inspect or adjust technical execution. It does not grant acceptance-class or publication authority.
* **Governed work** includes candidates, assets, operations, decisions, and evidence admitted to a production workflow. A **disposable experiment** remains outside governed production unless formally imported.
* **Candidate** means a nonauthoritative output available for evaluation. **Production variant** means a governed branch intended for review or delivery; creating it changes production state even though it is not accepted canon or a master.
* **Formal import** is an explicit authorized action that scans, validates, hashes, records provenance for, and admits an external or experimental output as a governed candidate.
* **Storyworld custody** means storage governed as the Storyworld system of record; it does not imply legal ownership.
* **Approval** is layer-specific. Creative, rights, channel-package, commerce, runtime, and external-host approvals do not imply one another.
* **Approved provider or model** means one allowlisted by current provider policy for the exact provider-egress class, task profile, deployment, retention behavior, and rights or consent constraints.
* **Approved budget or allowance** means a limit set by an authorized budget role for the exact workspace or production; it is not creative or publication approval.
* **Authorized exception** means a recorded human-approved exception for one exact transfer or processing path. A production need may justify requesting one but cannot substitute for the recorded exception.
* **Production policy** means durable authorized configuration for a named workspace or production. It may narrow or, where the provider-egress class permits, relax defaults; it cannot override law, contract, rights, consent, or a no-egress rule.
* **Authority host** means the system that owns an external publication or runtime-acceptance transition and issues its receipt. Storyworld approval never substitutes for authority-host acceptance.
* **Apply** changes a candidate or active edit under the consequence rules in question 5. **Accept** promotes an exact version into working canon, a master, a channel package, or another authoritative state and always requires the applicable human authority.
* A **material change** is a change to exact content, inputs, rights or consent, policy, provider or model constraints, cost ceiling, destination, metadata, disclosures, timing, or validation state that could invalidate an approval or alter the authorized result.

---

# Part 1: Core product experience

## 1. Should text and voice be Storyworld’s main creative controls?

### Choices

**A. Yes. Text and voice are the main controls.** Manual controls are secondary.

**B. Text, voice, and traditional controls are equally important.**

**C. Traditional controls remain primary, with AI added as an assistant.**

### Recommendation

Choose **A**.

Storyworld should be designed around natural-language creative direction rather than conventional editing controls.

### Pros

* Makes complex creative work easier for nonexperts.
* Creates a clear and distinctive product.
* Works consistently across images, video, audio, graphics, and future media.
* Allows Storyworld to use its knowledge of canon, continuity, rights, and creative intent.

### Cons

* Storyworld must interpret vague language reliably.
* Users must be able to see what the AI understood.
* Strong preview, undo, and correction systems are required.

### Answer

**Confirmed answer: A.** Text and voice are Storyworld’s primary creative controls, with direct non-voice controls available for precision and correction. Those controls are secondary in prominence, not capability.

**Text and voice are primary, while manual controls are reimagined as simplified, semantic, context-aware interfaces rather than default replicas of dense conventional editors.**

They should support precision through progressive disclosure without introducing dense, intimidating workflows. This is still **A**, not B: manual controls remain supportive, but they must feel native to Storyworld’s approachable creative model.

---

## 2. Should most generation and editing be completed inside Storyworld?

### Choices

**A. Yes. Outside editors are only needed for unusual precision work.**

**B. Storyworld handles generation, but outside applications handle most editing.**

**C. Storyworld mainly organizes work performed in other applications.**

### Recommendation

Choose **A**.

A normal user should be able to complete most productions without opening InvokeAI, Kdenlive, DaVinci Resolve, or another specialist application.

### Storyworld should normally handle

* Image generation and editing.
* Video assembly and revision.
* Cuts and transitions.
* Color and lighting changes.
* Reframing and aspect-ratio adaptation.
* Captions and subtitles.
* Sound and music editing.
* Generating missing shots or inserts.
* Creating alternate cuts and formats.
* Quality, continuity, and rights review.

### Outside tools may handle in exceptional cases

Storyworld should normally provide these capabilities itself. External applications are fallback environments only when Storyworld does not yet support the required result reliably or a specialist workflow genuinely requires them. Examples are:

* A hand-painted mask that Storyworld’s native controls cannot reproduce reliably.
* Compositing or keyframe work that requires unsupported plugins or interchange.
* Certified color or sound finishing that requires unsupported hardware, formats, or standards.
* Plugin-heavy postproduction.
* Frame-level technical work beyond Storyworld’s normal controls.

### Answer

**Confirmed answer: A, with a stronger native-workflow goal.**

**Storyworld should be the default environment for nearly all generation, editing, and precision work within its supported production types.** This is target product architecture, not a claim that every capability belongs in the MVP or current alpha. This goal does not make Storyworld a universal replacement for every professional application. Generative AI should handle tasks such as masking, keyframes, compositing, color, and sound through simplified, intent-level interfaces.

The goal is not to hide precision, but to make it accessible:

* Users describe the desired result.
* Storyworld performs the technical operation.
* Users refine it through simple semantic controls.
* The AI’s interpretation remains previewable, inspectable, reversible, and exportable.

Outside applications become exceptional escape hatches rather than part of the normal workflow.

---

## 3. How much manual control should Storyworld provide?

### Choices

**A. Only simple controls.**

**B. Simple controls by default, with advanced controls when requested.**

**C. Full professional controls visible at all times.**

### Recommendation

Choose **B**.

Use five progressively disclosed control layers:

1. **Text or voice direction**
2. **Simple contextual controls**
3. **Built-in AI-mediated professional precision**
4. **Advanced Operator Mode for authorized technical inspection and adjustment**
5. **External finishing only for unsupported cases**

Examples of simple controls:

* Warmer or cooler.
* Faster or slower.
* More realistic or more stylized.
* More music or more ambience.
* Subtle or dramatic.
* Preserve character.
* Preserve composition.
* Preserve timing.
* Preserve background.

### Pros

* Keeps the normal interface simple.
* Does not limit experienced users.
* Avoids forcing users to understand provider settings.

### Cons

* Requires careful interface design.
* The boundary between simple and advanced controls must remain clear.

### Answer

**Confirmed answer: B, with the following interpretation.**

Simple, contextual controls should be the default, while advanced precision should be available on request through AI-assisted, simplified interfaces.

Storyworld should not expose professional controls constantly or require users to understand technical settings. Instead, users can request precise outcomes—such as an exact mask, timing change, keyframe adjustment, composite, or sound mix—and let generative AI perform the technical work behind an inspectable, reversible interface.

The five control layers are:

1. Text or voice direction.
2. Simple contextual refinement.
3. Built-in AI-mediated professional precision, where users request exact outcomes through semantic and visual controls.
4. Advanced Operator Mode, where authorized users inspect technical execution and, when policy permits, adjust provider-native settings without bypassing governance.
5. External tools only for genuinely unsupported edge cases.

The advanced professional-control layer should provide the precision and expressive power of professional tools without reproducing their dense panels, technical jargon, or fragmented workflows. Users should combine natural-language direction, visual manipulation, semantic controls, and AI-assisted technical operations. Complexity should appear progressively and contextually, while still allowing exact values and precise adjustments when needed.

Professional depth should feel like approachable creative actions—“keep this subject sharp,” “match this lighting,” or “move the cut 12 frames earlier”—rather than requiring users to configure masks, keyframes, nodes, codecs, or provider-specific parameters manually. Every Storyworld-managed operation should be previewable, adjustable, explainable, reversible while retained, and preserved as a structured creative decision.

Raw provider-native controls may be exposed to authorized advanced users through Advanced Operator Mode when policy allows, but they must never be the only way to reproduce the creative intent. Their use remains subject to the same policy, versioning, provenance, budget, and human-authority boundaries as intent-level operations.

---

## 4. Should Storyworld show its plan before making an important change?

### Choices

**A. Always show the plan before any change.**

**B. Show the plan for meaningful or costly changes.**

**C. Apply changes immediately and rely on undo.**

### Recommendation

Choose **B**.

Small preview operations may run immediately. Meaningful, costly, destructive, or approval-changing operations should show a plan and wait for confirmation first.

A plan should explain:

* What Storyworld understood.
* What it proposes to change.
* What it will preserve.
* What assumptions it made.
* What the operation may cost.
* Which versions or approvals may be affected.

### Example

A request such as:

> Make the scene colder and more isolated.

might become:

* Cool the overall grade.
* Reduce background saturation.
* Lower the score.
* Increase room tone.
* Preserve skin tones.
* Preserve the established morning light direction.

### Answer

**Confirmed answer: B, with the following interpretation.**

Use pre-change planning for consequential work and live transparency for routine work.

1. **Meaningful, costly, destructive, or approval-changing edits** should show a plan and wait for confirmation before proceeding.
2. **Routine edits** may begin immediately, but Storyworld should show what it is doing in real time.
3. While execution is active, operations should support **pause, cancel, and steer**—adjusting intent or parameters during execution—where the provider or deterministic tool permits; completed changes must remain reversible through version history.
4. If the operation becomes more consequential than expected, Storyworld should pause and request confirmation.
5. Users should be able to inspect the interpretation, current progress, changes made, preserved elements, assumptions, and cost at any point.

The principle is: **no unnecessary approval friction, but no invisible automation.**

“Routine” in this answer means a low-consequence operation under question 5. A technically simple change to an active edit is still medium consequence and must wait for confirmation.

---

## 5. When may Storyworld apply a change without asking first?

### Recommendation

Use three consequence levels.

### Low consequence

Storyworld may run immediately within an approved budget:

* Analyze media.
* Create suggestions.
* Generate temporary previews.
* Create alternate candidates.
* Diagnose pacing or continuity.
* Transcribe audio.
* Produce a low-resolution test.

### Medium consequence

Storyworld should show a plan and wait for confirmation before applying:

* Change an active edit.
* Replace a shot.
* Modify color or sound.
* Regenerate part of an image.
* Create a new production variant.
* Change captions.
* Exceed the applicable per-job or batch allowance.

### High consequence

Storyworld must require an authorized human decision:

* Accept a proposal into working canon or create a canon release.
* Replace an accepted master.
* Accept an asset, final edit, or channel package into an authoritative production state.
* Waive a rights, policy, or continuity blocker when policy permits a waiver.
* Authorize publication of an exact channel package.
* Permanently delete governed evidence when retention, legal-hold, and other policy permits deletion.

### Answer

**Confirmed answer.**

* **Low consequence:** may run immediately within the approved budget.
* **Medium consequence:** show a plan and wait for confirmation before applying.
* **High consequence:** require an authorized human decision and all applicable policy checks.

This aligns with the broader principle of transparent, interruptible automation without unnecessary approval friction.

---

## 6. How should Storyworld handle unclear instructions?

### Choices

**A. Always ask a question before proceeding.**

**B. Ask only when the uncertainty materially affects the result, cost, rights, or safety.**

**C. Always make its best guess.**

### Recommendation

Choose **B**.

When the uncertainty is minor, Storyworld should:

* State its assumption.
* Produce a preview or proposal.
* Make correction easy.

When the uncertainty could affect identity, rights, cost, canon, or a major creative decision, Storyworld should ask a simple question.

### Answer

**Confirmed answer: B.**

Storyworld should make reasonable assumptions for minor uncertainty, state them visibly, and provide easy correction. It should ask a focused question when uncertainty could materially affect identity, rights, cost, canon, safety, or an acceptance-class creative decision under question 30.

---

## 7. Should one conversation control multiple kinds of media?

For example:

> Make this whole scene feel colder.

could affect:

* Image color.
* Video grading.
* Lighting.
* Ambience.
* Music.
* Graphics.

### Recommendation

Yes, but Storyworld must create separate operations for each medium.

The user should experience one creative conversation, while the system preserves clear boundaries among image, video, sound, music, graphics, and production design.

### Answer

**Confirmed answer.**

One creative conversation may direct multiple media, while Storyworld maintains separate, inspectable, reversible operations for each medium. This preserves a unified creative experience without blurring media-specific changes, costs, approvals, or provenance.

---

## 8. Should Storyworld save the original voice recording?

### Choices

**A. Save every voice recording.**

**B. Save only the transcript and command details by default.**

**C. Delete both after the command is completed.**

### Recommendation

Choose **B**, with ephemeral audio and no ordinary retention option.

Save:

* The transcript.
* The selected target.
* The playhead or image position.
* Storyworld’s interpretation.
* The resulting operations and decisions.

Preserve the original voice recording only through a governed workflow when:

* It is needed as production evidence.
* A team policy requires it.
* It is being used as an authorized source asset.

### Pros

* Reduces storage and privacy risk.
* Preserves the useful creative record.

### Cons

* The original tone and wording may be lost.
* Voice-command disputes may be harder to review without the recording.

### Answer

**Confirmed answer: B, with a narrower retention rule.**

Treat voice recordings as ephemeral input by default. Storyworld should retain the transcript, target, context, interpretation, and resulting operations—but should not offer a normal “keep recording” option.

The transcript and command record remain governed data subject to their provider-egress, access, and retention policies. This answer governs retention, not transcription location: any hosted transcription must independently satisfy questions 11, 12, and 16. If an exceptional case requires preservation of the audio, it should occur only through a governed workflow, such as an authorized source-asset import, production-evidence policy, or retention requirement. That keeps privacy and storage risk low without making audio retention part of ordinary use.

---

# Part 2: Product and customer scope

## 9. Is Storyworld a private tool or a customer-facing product?

### Choices

**A. Private tool for the owner only.**

**B. Private first, but designed to become a customer product.**

**C. Customer product from the first public version.**

### Recommendation

Choose **B**.

Design the first mature deployment for a single creator or small internal team, but establish customer-ready boundaries for:

* User identity.
* Permissions.
* Tenant separation.
* Usage accounting.
* Provider-account and credential control.
* Asset visibility.
* Rights and approvals.

### Pros

* Keeps the first mature release manageable.
* Avoids a costly future architecture rewrite.
* Allows real production experience before broad release.

### Cons

* Some customer-ready foundations add early complexity.
* Full multi-tenant operations should still be deferred until needed.

### Answer

**Confirmed answer: B, with a firm product boundary.**

Storyworld’s first mature deployment should serve one small family creative team. It may later support other solo creators and small teams, while remaining intentionally out of scope for large studios and enterprise production departments.

Storyworld should still establish lightweight customer-ready foundations for identity, permissions, small-team workspaces, usage, assets, rights, and approvals. Full multi-tenant and enterprise operations can wait until they are needed, and large-studio support is not a target.

Customer-managed deployment is one confirmed future option under question 40. This questionnaire does not yet decide whether the broader small-team offering will also include a Storyworld-hosted service.

---

## 10. Who should supply OpenRouter and fal.ai API keys?

### Choices

**A. Every user supplies their own keys.**

**B. Storyworld supplies managed keys and bills users.**

**C. Support both.**

### Recommendation

Support **both**, in phases:

1. Begin with user-supplied keys.
2. Add Storyworld-managed usage later.
3. Allow eligible small-team workspaces to choose either credential-supply model.

### User-supplied keys

#### User-supplied-key pros

* Lower financial risk for Storyworld.
* Easier early implementation.
* Users control their provider accounts and limits.

#### User-supplied-key cons

* More setup.
* Harder to create a seamless beginner experience.
* Support becomes more complicated.

### Storyworld-managed keys

#### Storyworld-managed-key pros

* Simpler customer experience.
* Centralized budgets and provider policies.
* Storyworld can offer packaged usage.

#### Storyworld-managed-key cons

* Storyworld assumes billing and abuse risk.
* Requires quotas, metering, fraud controls, and payment systems.
* Provider costs become Storyworld’s responsibility.

### Answer

**Confirmed answer: C.**

Start with user-supplied provider keys, later add Storyworld-managed usage and billing, and eventually support both models for eligible small-team workspaces. Provider credentials must remain isolated and protected; the supplying party controls the provider account and credential, while Storyworld stores the secret only in its approved credential store and exposes only non-secret source, ownership, and permitted-scope metadata.

“User-supplied” confirms bring-your-own-provider credentials but does not yet decide whether the first private workspace uses one workspace-admin-supplied credential or separate per-member credentials. That credential-scope choice requires owner disposition before implementation.

---

# Part 3: Hosted AI, privacy, and provider policy

## 11. What information may be sent to OpenRouter, fal.ai, or another hosted provider?

### Recommendation

Use four provider-egress classifications. These classifications govern whether material may cross the Storyworld-controlled deployment boundary; they do not replace access-control or records-retention classifications and never create rights, consent, or provider approval. Before implementation, each resource class must map to one of these egress classes, and the most restrictive applicable rule wins.

### Public

May be sent to a provider and model approved for the task.

Examples:

* Published material.
* Public product information.
* Public promotional media.

### Private

May be sent only to a provider and model approved for the task, under the applicable privacy and retention rules.

Examples:

* Unreleased scripts.
* Production drafts.
* Private reference material.

### Restricted

May be sent only to explicitly approved providers and models, or not sent at all.

Examples:

* Licensed source material whose terms permit hosted processing only through constrained providers or models.
* Customer-confidential work.
* Sensitive likeness references.
* Unreleased commercial products.

### Highly restricted

Must remain inside the Storyworld-controlled deployment boundary unless a specifically authorized exception permits the exact transfer and no law, contract, rights restriction, consent state, or no-egress rule prohibits it.

Examples:

* Identifying or sensitive material involving minors.
* Material whose use permission has been revoked; this is blocked rather than exception-eligible.
* Confidential legal records.
* Sensitive personal information.
* Sources contractually prohibited from hosted processing.
* API keys, access tokens, passwords, and other credentials.

Consent, ownership, or a production need does not by itself override the highly restricted classification or the requirement for an authorized exception. An exception cannot restore revoked or expired permission or override law, contract, rights restrictions, or an explicit no-egress rule.

### Answer

**Confirmed answer: use the four provider-egress classifications.**

* **Public:** may be sent to providers and models approved for the task.
* **Private:** may be sent to approved providers and models under the applicable privacy and retention rules.
* **Restricted:** limited to explicitly approved providers/models or blocked.
* **Highly restricted:** must remain inside the Storyworld-controlled deployment boundary unless an exact, authorized, policy-compliant exception applies.

Provider-egress classification is only one gate. A hosted transfer must also satisfy task-specific provider/model approval and every applicable rights, consent, retention, and no-egress rule. These rules apply equally when a self-hosted workflow node calls a hosted endpoint.

---

## 12. What provider-retention rules should Storyworld enforce?

### Recommendation

Use privacy-protective defaults:

* Use only provider routes whose training, collection, and retention behavior satisfies the material’s egress classification and production policy.
* Prefer zero-retention routes for private or restricted material.
* Disable fal.ai request storage by default.
* Use short-lived media URLs.
* Download provider outputs immediately.
* Treat provider URLs as temporary transport.
* Record what data was sent, where, and under which policy.
* Never use provider storage as Storyworld’s asset library.

Allow less restrictive settings only when the egress classification permits them and an explicit production policy authorizes them. A production policy cannot override law, contract, rights, consent, or a no-egress rule.

### Answer

**Confirmed answer: use privacy-protective provider-retention defaults.**

Storyworld should minimize provider retention, prefer zero-retention routes, download outputs promptly, use short-lived URLs, maintain a transmission record, and never treat provider storage as its asset library. Less restrictive behavior requires both a permitting egress classification and an explicit production policy.

---

## 13. Should Storyworld choose AI models automatically?

### Choices

**A. Storyworld automatically chooses among approved models.**

**B. Users always select the model.**

**C. Important tasks use fixed models; flexible tasks use automatic selection.**

### Recommendation

Choose **C**.

Use named task profiles such as:

* Canon extraction.
* Narrative drafting.
* Continuity review.
* Image generation.
* Image editing.
* Video generation.
* Visual evaluation.
* Translation.
* Fast classification.

For each profile, Storyworld should select only from models approved for that specific purpose.

Advanced users may choose another approved model when policy allows it.

### Pros

* Normal users do not need to understand model differences.
* Important tasks remain predictable.
* Storyworld can improve routing over time.

### Cons

* Model testing and promotion become ongoing responsibilities.
* Automatic selection must be explainable.

### Answer

**Confirmed answer: C.**

Storyworld should use approved task profiles with automatic model selection for normal workflows, fixed or tightly constrained routing for important tasks, and policy-controlled model overrides through Advanced Operator Mode. Routing decisions should remain explainable.

---

## 14. May an integrated AI provider fall back to a different model or route?

### Recommendation

Allow automatic fallback only to a policy-equivalent route: the replacement provider and model must satisfy the same task profile, provider-egress class, retention rules, rights and consent restrictions, quality floor, cost ceiling, and reproducibility requirements.

### Allow fallback for

Only when the task is low-risk, nonauthoritative, and uses public material:

* Brainstorming.
* Drafting.
* Low-risk classification tasks on public material.
* Temporary previews.
* Nonauthoritative suggestions.

### Do not allow automatic fallback for

* Canon extraction.
* Rights-related analysis.
* Private or restricted documents.
* Continuity decisions.
* Evaluations tied to an accepted workflow.
* Reproducibility-critical production work.

Storyworld should never silently route private, restricted, or highly restricted material to a less protective provider or model.

### Answer

**Confirmed answer: use policy-equivalent fallback only.**

These rules apply to OpenRouter, fal.ai, and future integrated providers. Automatic fallback may occur only to a policy-equivalent route for low-risk, nonauthoritative work. It is disabled for canon extraction, rights analysis, private, restricted, or highly restricted material, continuity decisions, accepted workflows, and reproducibility-critical production work. A human may authorize a new request on a different route only when all policy and authority requirements still pass; that is a new authorization, not an automatic fallback.

---

## 15. Should Storyworld support providers other than OpenRouter and fal.ai?

### Recommendation

Yes, but OpenRouter and fal.ai should be the first strategic integrations.

Storyworld should preserve a provider abstraction so it can later support:

* A direct model-provider API.
* A specialized video service.
* A specialized speech service.
* A private or customer-managed endpoint.
* A future customer-controlled provider.

Provider-specific prompts, workflow graphs, model names, and parameters must remain execution details rather than Storyworld’s creative authority.

### Answer

**Confirmed answer: preserve the provider abstraction and initial integration strategy.**

OpenRouter and fal.ai are the first strategic integrations, while Storyworld remains provider-agnostic so future direct, specialized, private, or customer-controlled providers can be added without making provider details part of the creative model.

---

## 16. May hosted AI receive photographs, voices, or likenesses of real people?

### Choices

**A. Never.**

**B. Yes, without special controls.**

**C. Yes, only when consent and permitted use are recorded.**

### Recommendation

Choose **C**.

Storyworld should require:

* Identity of the person.
* Evidence of consent or another valid permission.
* Allowed purposes.
* Allowed providers.
* Expiration or revocation rules.
* Whether voice or likeness cloning is allowed.
* Required disclosures.
* Restrictions on publication.

A user’s ownership of a photograph does not automatically establish permission to clone or transform the person’s identity.

### Answer

**Confirmed answer: C.**

Real-person photographs, voices, and likenesses may be sent to hosted providers only when identity, current consent or another valid permission, permitted uses, provider scope, expiry and revocation rules, cloning allowances, disclosures, and publication restrictions are recorded **and** the provider-egress classification, provider policy, retention rules, and no-egress requirements permit the transfer at execution time. This includes transient transmission for transcription, generation, or transformation, not only persisted source assets. Possessing the media alone is not sufficient authorization, and consent never overrides a highly restricted classification.

---

## 17. Should routine media processing stay local?

This includes:

* Trimming.
* Joining.
* Proxy creation.
* Format conversion.
* Thumbnail generation.
* Audio normalization.
* Metadata extraction.
* Malware scanning.
* Color transforms.

### Recommendation

Yes.

Use deterministic tools such as FFmpeg, OpenImageIO, OpenColorIO, MediaInfo, and ClamAV inside the Storyworld-controlled deployment boundary when generative AI is unnecessary.

### Pros

* Better privacy.
* Lower provider cost.
* More reproducible results.
* Faster for routine technical work.

### Cons

* Requires installation and maintenance of workers inside the Storyworld-controlled boundary.
* Available workers may process large media slowly.

This does not require hosting AI models locally.

### Answer

**Confirmed answer: keep routine non-generative media processing inside the Storyworld-controlled deployment boundary.**

Routine media processing should remain deterministic and inside the Storyworld-controlled deployment boundary wherever generative AI is unnecessary.

This preserves privacy, reduces cost, improves reproducibility and speed, and does not require Storyworld to host AI models locally.

---

## 18. When should Storyworld ask before spending money?

### Recommendation

Use configurable budgets.

* Small jobs may run immediately within an allowance set by the authorized budget role.
* Expensive individual jobs require confirmation.
* Batch jobs show estimated cost before starting.
* A production can have daily, weekly, and total limits.
* The user can choose whether previews favor cheaper models.
* Unexpected cost increases pause the workflow.

Every provider request should record its estimated and actual cost when available.

### Answer

**Confirmed answer: use configurable spending budgets.**

Small jobs may run within an approved allowance. Every batch job must show its estimated cost before starting; if an estimate is unavailable, Storyworld must say so and wait for confirmation. Any individual or batch job outside its applicable allowance must also wait for confirmation. Production-level limits and preview cost preferences are configurable; unexpected increases pause execution; and estimated versus actual provider costs are recorded.

---

## 19. What should Storyworld optimize for by default?

### Choices

* Quality.
* Cost.
* Speed.
* Privacy.
* A configurable balance.

### Recommendation

Use a configurable balance with this default order:

1. Policy and privacy.
2. Required quality.
3. Continuity and fidelity.
4. Cost.
5. Speed.

Users may select production profiles such as:

* Best quality.
* Balanced.
* Fast preview.
* Lowest cost.
* Restricted-data.

Privacy and rights rules must never be weakened merely to improve speed or price.

### Answer

**Confirmed answer: use a configurable optimization balance.**

The default priority is policy/privacy, required quality, continuity/fidelity, cost, then speed. Users may choose production profiles, but privacy and rights constraints remain non-negotiable. A Restricted-data profile applies strict routing and retention defaults; it does not replace the formal provider-egress classification of each input.

---

# Part 4: Asset custody and version history

## 20. Which generated or edited production files should Storyworld keep?

### Recommendation

Storyworld should keep every governed candidate and accepted asset in storage under Storyworld custody. It need not retain every transient provider output or disposable experiment.

Any provider output admitted as a governed candidate or accepted asset should be:

1. Downloaded.
2. Scanned.
3. Validated.
4. Hashed.
5. Given provenance.
6. Stored under Storyworld custody.

Provider URLs, InvokeAI galleries, ComfyUI output folders, and editor caches are not permanent storage.

### Answer

**Confirmed answer: retain governed work, not every transient output.**

Every governed candidate and accepted asset should be ingested into Storyworld custody, scanned, validated, hashed, and given provenance. Provider URLs, galleries, output folders, and editor caches are temporary transport or working locations—not permanent storage.

For a customer-managed installation, customer-controlled object storage counts as Storyworld custody when it is the configured Storyworld system of record and is governed by Storyworld’s versioning, provenance, access, and retention rules. Custody describes governance and system-of-record responsibility, not legal title.

External project and workfiles preserved under question 23 must be copied into Storyworld custody; leaving them only in an application folder or cache does not preserve them.

---

## 21. Should Storyworld keep failed and rejected candidates?

### Choices

**A. Keep everything forever.**

**B. Keep governed production candidates, but allow disposable experiments to expire.**

**C. Keep only accepted assets.**

### Recommendation

Choose **B**.

Keep:

* Candidates submitted for review.
* Rejected production candidates.
* Evidence used in decisions.
* Outputs connected to accepted work or externally published instances.
* Assets required for replay or audit.

Allow temporary explorations to expire under a clear retention policy.

### Pros

* Preserves meaningful evidence.
* Avoids unlimited storage growth.
* Keeps disposable experimentation lightweight.

### Cons

* Storyworld must clearly distinguish experiments from governed production work.
* Expiration must never remove required evidence.

### Answer

**Confirmed answer: B.**

Storyworld should retain governed candidates, rejected production work, decision evidence, accepted outputs, outputs tied to externally published instances, and replay/audit assets for their applicable governed retention periods. Evidence and accepted lineage that policy requires must remain durable. Disposable experiments may expire after the rollback window configured by the applicable retention policy; expiry ends reversibility for that disposable experiment but cannot remove required evidence or accepted lineage.

---

## 22. Should outside editing use a formal checkout and return process?

### Recommendation

Yes for governed production assets.

The normal process should be:

1. Check out an exact asset or sequence version.
2. Include an integrity-protected manifest, signed where the package contract requires it, and permitted references.
3. Open it in the outside application.
4. Preserve the original.
5. Return the edited work as a new candidate.
6. Compare it with the checked-out version.
7. Rerun affected evaluations.
8. Accept or reject the new exact version.

Disposable experiments may use a lighter package workflow, but they do not become governed production assets until formally imported. A lighter workflow may omit convenience packaging only; it never bypasses provider-egress classification, rights, consent, malware scanning, or no-egress controls. Private, restricted, or highly restricted material remains subject to the full applicable checkout controls.

### Answer

**Confirmed answer: yes, for governed production assets.**

> **Storyworld governs the production record; external tools retain their native formats and workflows.**

The checkout/return process should be orchestrated and enforced entirely by Storyworld, while Storyworld conforms to the conventions, file formats, and import workflows of each external tool. External applications should not require Storyworld-specific plugins, schema changes, metadata handling, or workflow updates.

Storyworld should:

1. Preserve the authoritative original.
2. Export a self-contained package using standard formats the external tool already imports easily.
3. Include Storyworld’s integrity-protected manifest—signed where the package contract requires it—and references as sidecar information that is optional for the external tool to consume, but mandatory for Storyworld to retain.
4. Let the user work normally in the external application.
5. Treat returned files as new, untrusted candidates.
6. Compare, validate, and evaluate them inside Storyworld, then present them for an authorized human acceptance decision.

External tools should only need to open and save files using their existing workflows. Storyworld adapts to their capabilities while governing versioning, provenance, rights evidence, validation, and acceptance.

The manifest may be ignored by the external application, but Storyworld must retain its authoritative copy and use its own package or session identity to associate returned files with the checkout. “Optional sidecar” describes the external tool’s consumption of the manifest, not Storyworld’s governance record.

---

## 23. Should outside application workfiles be preserved?

Examples:

* InvokeAI sessions.
* Kdenlive projects.
* DaVinci Resolve projects.
* Blender files.
* Krita files.

### Recommendation

Preserve important workfiles as nonauthoritative production artifacts.

Storyworld should also preserve a portable representation whenever possible:

* OpenTimelineIO.
* OpenUSD.
* MaterialX.
* glTF.
* SVG.
* Standard image formats.
* Standard audio stems.
* Captions and subtitles.

The workfile allows reopening the exact specialist session. The portable representation reduces dependency lock-in.

### Answer

**Confirmed answer: preserve workfiles when they support governed reproducibility.**

Storyworld should preserve external workfiles when they are needed to resume, reproduce, review, or audit governed work, alongside portable representations where possible. Preserved workfiles must be hashed, given provenance, copied into Storyworld custody, and marked nonauthoritative; they never replace accepted masters. Other workfiles may expire under the applicable retention policy. This enables exact session reopening while reducing vendor and application lock-in.

---

# Part 5: Execution integrations and precision tools

## 24. Which integrations should Storyworld prioritize?

### Recommended priority groups

#### Hosted intelligence and media services

* **OpenRouter** — language and multimodal intelligence.
* **fal.ai** — image, video, audio, and other generative-media execution.

#### Deterministic media worker

* **FFmpeg-based media worker** — deterministic video and audio processing.

#### Editorial interchange standard

* **OpenTimelineIO** — editorial interchange.

#### Exceptional precision environments

* **Blender** — 3D asset, scene, and animation precision work.
* **InvokeAI** — advanced image finishing.
* **Kdenlive** — open-source video finishing.
* **DaVinci Resolve** — professional video finishing.

#### Advanced operator environment

* **ComfyUI** — self-hosted workflow design, testing, orchestration, and technical inspection over policy-approved endpoints.

#### First-party peer-system integration

* **Commerce Foundry** — Narrative Campaign brief/bundle exchange, product truth, commercial approval and publication authority for Commerce Foundry-originated work, plus print-on-demand vendor, order, and fulfillment operations.

### Later integrations

Add when their production types become active:

* Krita.
* Inkscape.
* darktable.
* Ardour.
* MuseScore.
* Scribus.

Storyworld should not delay its native conversational workspaces while trying to integrate every specialist application.

### Answer

**Confirmed answer: include Blender in the initial support set while keeping precision applications outside the normal workflow.**

The confirmed structure is:

* **Hosted intelligence and media services:** OpenRouter and fal.ai.
* **Deterministic media worker:** FFmpeg-based processing.
* **Editorial interchange standard:** OpenTimelineIO.
* **Exceptional precision environments:** Blender, InvokeAI, Kdenlive, DaVinci Resolve.
* **Advanced operator environment:** self-hosted ComfyUI backed by policy-approved hosted endpoints.
* **First-party peer-system integration:** Commerce Foundry for Narrative Campaign and commercial-authority exchange as well as print-on-demand product, vendor, order, and fulfillment operations.
* **Later integrations:** Krita, Inkscape, darktable, Ardour, MuseScore, and Scribus. Interactive runtimes are addressed as early integrations in question 35.

Storyworld remains the primary environment for intent-driven generation, editing, adaptation, evaluation, and in-Storyworld finishing across narrative media. Text and voice lead the workflow; precision capabilities are progressively revealed through intuitive, simplified interfaces. External applications—including Blender—provide specialized escape hatches when needed.

---

## 25. How should Storyworld help users install and connect separate creative applications?

This question covers separately installed creative applications such as Blender, InvokeAI, Kdenlive, and DaVinci Resolve. Provider APIs, deterministic workers, interchange libraries, Commerce Foundry, and runtime adapters have their own deployment or connection paths.

### Choices

**A. Bundle the creative applications inside Storyworld.**

**B. Require users to install them manually.**

**C. Keep them separate but provide installation guidance, detection, setup assistance, and launching.**

### Recommendation

Choose **C**.

Storyworld should:

* Detect whether an application is installed.
* Check supported versions.
* Help configure the connection.
* Launch it with the correct checkout package.
* Monitor the return folder or connector.
* Explain when an upgrade is required.

### Pros

* Reduces licensing and distribution complications.
* Makes tools easier to replace.
* Allows applications to update independently.

### Cons

* Setup is not completely automatic.
* Different operating systems may require different installation steps.

### Answer

**Confirmed answer: C.**

Storyworld should keep external applications separate while providing installation guidance, detection, configuration, launching, and return handling. Any future assisted installer or managed distribution requires separate licensing, security, platform-support, and maintenance review; it must not be inferred from this answer. Question 41 provides the definitive non-bundling default.

---

## 26. Should advanced users see provider-native controls?

This question defines layer 4 of the five-layer control model in question 3.

Examples:

* OpenRouter model choice.
* Raw fal.ai parameters.
* Seeds.
* Samplers.
* ComfyUI graphs.
* Workflow hashes.
* Provider logs.

### Recommendation

Yes, through an **Advanced Operator Mode**.

Normal users should see creative language and simple controls. Advanced users may inspect or adjust technical execution details when policy allows it.

Technical settings should never become the only way to reproduce the creative intent.

### Answer

**Confirmed answer: provide Advanced Operator Mode.**

Normal users remain in the intent-driven interface. Users with the explicit Advanced Operator Mode workspace permission may inspect or adjust provider-native settings when policy permits, while Storyworld continues to preserve and reproduce the underlying creative intent independently of those technical details. Advanced Operator Mode cannot bypass provider-egress, rights, consent, budget, approval, or human-authority controls; each adjustment must be versioned and recorded in provenance, and logs or diagnostics must be scoped and redacted so they do not expose credentials or unrelated private data.

---

## 27. Should Storyworld support both direct fal.ai endpoints and ComfyUI workflows?

### Recommendation

Yes.

### Direct fal.ai endpoints

Use for:

* Common image-generation operations.
* Common image-editing operations.
* Standard video generation.
* Upscaling.
* Segmentation.
* Routine transformations.

#### Direct fal.ai endpoint pros

* Simpler.
* Easier to maintain.
* Easier to explain.
* Often faster to integrate.

### Self-hosted ComfyUI workflow orchestration

Use for:

* Complex multi-step generation.
* Identity-preserving workflows.
* Custom masking and control.
* Reusable production pipelines.
* Experimental capabilities.
* Processes involving several models.

#### Self-hosted ComfyUI pros

* More flexible.
* Supports sophisticated pipelines.
* Easier for technical operators to inspect.

#### Self-hosted ComfyUI cons

* More dependencies.
* Greater security and maintenance burden.
* Harder to keep stable across node and workflow changes.

### Answer

**Confirmed answer: support direct fal.ai endpoints and self-hosted ComfyUI workflow orchestration.**

ComfyUI should be **self-hosted by default** as an orchestration environment, not assumed to run through fal.

Direct fal.ai endpoints should handle common, stable operations such as image generation, image editing, video generation, upscaling, segmentation, and routine transformations.

Self-hosted ComfyUI should handle complex, identity-preserving, multi-model, reusable, experimental, or private/restricted workflows when policy permits. Storyworld should connect to it through an adapter while keeping its node graph and provider mechanics hidden from normal users.

Storyworld should choose between direct fal.ai and registered ComfyUI workflows using the task profile, provider-egress class, approved workflow capabilities, quality and reproducibility needs, and cost ceiling. Advanced Operator Mode may select another approved path only when the same policy constraints pass.

A fal-hosted ComfyUI deployment may be supported later when elastic capacity or operational convenience justifies it and data policy permits it. It is a hosted provider route, so questions 11, 12, 14, and 16 apply exactly as they do to other hosted execution; self-hosting the workflow definition does not make its endpoint local.

For private, restricted, or highly restricted material, self-hosted ComfyUI is acceptable only when it operates inside the Storyworld-controlled deployment boundary and every node and endpoint satisfies the applicable provider-egress policy. Self-hosting does not automatically make a workflow safe. Under accepted decision `DEC-0012`, the current generation posture remains hosted-API only with no local model weights: generative nodes must use policy-approved hosted endpoints, while deterministic nodes may run inside the controlled boundary. Local model weights require an explicit successor decision.

ComfyUI graphs, workflow hashes, and technical logs are visible only through Advanced Operator Mode. For every ComfyUI execution, Storyworld should record the workflow and node versions, model and endpoint versions, parameters, seeds, hashes, redacted logs, and resulting provenance. Storyworld governs the creative intent and production record; ComfyUI remains an independently deployed technical execution environment with no approval authority.

---

# Part 6: AI authority and human control

## 28. What may AI do automatically?

### Recommendation

AI may automatically:

* Analyze source material.
* Create transcripts.
* Draft text.
* Generate candidates.
* Generate alternate versions.
* Suggest edits.
* Diagnose pacing or continuity.
* Create findings.
* Create low-cost previews.
* Quarantine or filter malformed or technically unreadable outputs from normal presentation, while retaining any evidence required by policy.
* Prepare export packages for review.
* Apply previously approved low-risk automation rules.

AI may not automatically:

* Accept a proposal into working canon or create a canon release.
* Accept an asset as a master or approve a channel package.
* Replace an accepted master.
* Waive rights, policy, or continuity blockers.
* Approve a channel package or authorize external publication.
* Choose or alter the content, destination, or authority scope of a publication.
* Delete required evidence.

### Answer

**Confirmed answer: preserve the AI authority boundary.**

Question 5 governs when confirmation is required; this question governs what AI may never do regardless of confirmation. AI may analyze, draft, generate, suggest, evaluate, preview, validate, quarantine clear technical failures, prepare export packages for review, and execute previously approved automation only for operations classified as low consequence in question 5. It may not accept working canon, create canon releases, approve masters or channel packages, authorize publication, waive blockers, alter the exact scope of a human-approved publication, or delete required evidence. A non-AI scheduler may execute an exact, still-valid publication authorization as described in question 33.

---

## 29. May clear technical or policy failures block work automatically?

### Recommendation

Yes.

Automatic blocking is appropriate when the result is based on a clear rule, such as:

* Missing required license.
* Expired consent.
* Prohibited provider.
* Corrupted media.
* Malware.
* Invalid package.
* Unsupported format.
* Wrong required dimensions.
* Missing mandatory disclosure.
* Failed checksum.
* Exceeded approved budget, which pauses or blocks execution pending renewed approval under question 18.

Creative or interpretive judgments should normally produce a finding for human review.

Examples:

* “This scene feels slow.”
* “The score may be too emotional.”
* “The character does not look close enough.”
* “This composition may weaken the reveal.”

### Answer

**Confirmed answer: clear technical or policy rules may block automatically.**

Automatic enforcement of an objective rule is not creative acceptance or rejection. Interpretive or creative concerns should remain findings for human review rather than becoming automatic blockers. A human may waive a blocker only when the governing policy permits waiver and the exact decision and evidence are recorded.

---

## 30. Which actions must always require a human?

### Recommendation

Always require authorized human action for:

* Accepting a canon proposal.
* Accepting a creative asset as a master.
* Accepting or designating a meaningful creative alternative as working canon, a master, or another authoritative production state.
* Approving a likeness or cloned voice.
* Waiving a blocker.
* Accepting a final edit.
* Authorizing publication of an exact channel package, destination, metadata, disclosures, and execution scope.
* Permanently deleting governed evidence when retention, legal-hold, and other policy permits deletion.
* Changing provider policy for restricted data.

### Answer

**Confirmed answer: acceptance-class and publication-authorization actions require an authorized human.**

This includes accepting a proposal into working canon, creating a canon release, accepting masters, designating meaningful creative alternatives as authoritative production state, approving likeness or voice use, waiving blockers when waiver is permitted, accepting final edits, authorizing publication of an exact channel package, permanently deleting governed evidence when deletion is permitted, and changing provider policy for restricted data. After that exact authorization, a scheduler may perform the mechanical publication attempt without a second prompt under question 33; it receives no authority to alter the package or bypass an external host.

Runtime state, player-specific state, and explicitly nonauthoritative branch state are not working canon unless they are later promoted through the same human-controlled acceptance boundary.

---

## 31. Should every retained AI change be reversible?

### Recommendation

Yes.

Every retained AI operation that creates or mutates governed state should create a reversible transition and record:

* The exact base version.
* The operation performed.
* The provider execution record.
* The resulting candidate.
* Its acceptance state and, if accepted, the authorized human receipt.
* A way to return to the earlier version.

“Undo” in the interface may be simple, but Storyworld should preserve append-only, tamper-evident version history underneath it for as long as the operation is retained.

### Answer

**Confirmed answer: every retained AI operation must create a reversible version transition.**

Every AI operation that creates or mutates a governed asset, production, or canon record must create a reversible version transition. Read-only analysis records provenance and findings but does not need to fork an asset version. Storyworld should preserve append-only, tamper-evident version history, including the base version, operation, provider record, resulting candidate, acceptance state and receipt if any, and a reliable path back to the prior version. Governed work must retain this history for its applicable retention period; required evidence and accepted lineage remain durable. Disposable experiments may later expire under the retention policy in question 21.

---

## 32. Should Storyworld evaluate its own AI output before showing it?

### Recommendation

Yes.

Before presenting a candidate, Storyworld should perform applicable checks such as:

* File validity.
* Dimensions and duration.
* Character identity.
* Appearance continuity.
* Location and prop continuity.
* Text correctness.
* Logo and product fidelity.
* Rights and provider-policy compliance.
* Caption quality.
* Audio levels.
* Requested-preservation checks.

Evaluation should filter obvious failures, but it should not hide uncertainty or pretend creative quality is objectively solved.

### Answer

**Confirmed answer: evaluate AI output before normal presentation.**

The pre-presentation evaluation suite enforces the binary blockers in question 29. The same applicable suite reruns after external checkout/return under question 22 and again at later acceptance or export gates when inputs or policy have changed. Automated checks should block deterministic technical and policy failures and surface evidence-backed findings for continuity, identity, fidelity, rights, captions, audio, and requested preservation. Model-assisted visual evaluations are findings with visible uncertainty unless an approved policy defines an objective binary threshold. Legal conclusions and subjective creative judgment remain with qualified human review.

---

# Part 7: Publishing and delivery

## 33. Should Storyworld publish directly to websites and social platforms?

### Choices

**A. Publish directly from the first version.**

**B. Begin with governed export packages, then add publishing connectors individually.**

**C. Never publish directly.**

### Recommendation

Choose **B**.

Begin by creating governed export packages whose creative, rights, and channel-package approval states are explicit.

Add direct publishing one destination at a time only after Storyworld can handle:

* Authentication.
* Destination previews.
* Scheduling.
* Caption and metadata validation.
* Rights and disclosure checks.
* Failed or uncertain publication outcomes.
* Receipts.
* Withdrawal and correction workflows.

### Answer

**Confirmed answer: B, with a stronger export-first commitment and priority sequence.**

* Governed export packages remain a permanent, first-class capability, even after direct publishing exists.
* Plan the successor integration architecture for Astro-based websites, Instagram, X, and TikTok.
* Prioritize the Astro export package first.
* Prioritize Instagram support second, beginning with the governed export package and adding direct publishing only when its controls are ready.
* Keep X and TikTok planned for subsequent export and connector work.
* Include a Storyworld-specific scheduling component in the next separately authorized implementation sequence. It should schedule governed Storyworld packages and future connector operations, not act as a generic social scheduler.

The scheduler should support layer-specific approvals, time zones, scheduled publication jobs, bounded retries, pause/cancel, status, receipts, and correction workflows. Publication scheduling is distinct from the provider-execution queue in question 39; each has its own inputs, policy, expiry, revalidation, and failure rules. Before a direct connector exists, the publication scheduler may schedule package preparation, export, or handoff, but not publication. Direct publishing should be added destination by destination only after the relevant authentication, authority-host capability, preview, metadata, rights, disclosure, idempotency, failure, receipt, and withdrawal controls are ready.

An authorized human may pre-authorize a future publication by approving the exact channel package, destination and authority host, metadata, disclosures, time, time zone, cost or quota boundary, permitted transport retries, pause/cancel rules, and failure handling. The scheduler may attempt publication later without another prompt only if that authorization remains valid, the connector still holds the required narrowly scoped capability, and no material condition has changed. Any material change, blocker, expired capability, or uncertain outcome must pause execution and require renewed human authorization. The scheduler may perform bounded, idempotent transport retries within the approved request but may not choose new creative content, change scope, claim external-host approval, or bypass a blocker. This describes a future connector capability; external publication requires a separate owner-authorized connector activation under the applicable authority-host policy and is not activated by this questionnaire.

Authority-host routing remains explicit: a standalone project may use a Storyworld channel connector only when separately authorized; Commerce Foundry-originated work retains Commerce Foundry commercial/publication authority; runtime delivery requires acceptance by the named runtime authority host.

This Astro-first priority differs from the currently accepted Instagram-first adapter sequence. It requires a successor decision before it can control implementation.

---

## 34. Should Storyworld send print jobs directly to vendors?

### Recommendation

Do not add direct print-vendor submission to Storyworld. Use Commerce Foundry as the intended vendor and fulfillment authority while preserving standalone print-ready export.

Begin with:

* Print-ready packages.
* Proof records.
* Font and image validation.
* Bleed, trim, safe-area, and color checks.
* Physical-proof approval.

Plan the Storyworld-to-Commerce Foundry package and receipt boundary in the next authorized integration sequence, but do not activate package submission until the print-package and proof process are reliable. Any later proposal for a direct Storyworld-to-vendor connector requires a new owner decision.

### Answer

**Confirmed answer: do not build direct print-vendor submission into Storyworld; integrate with Commerce Foundry instead.**

Storyworld is responsible for:

* Creative intent and creatively accepted assets.
* Print-ready package generation.
* Font, image, bleed, trim, safe-area, and color validation.
* Proof records and creative, rights, and physical-proof approval.
* Exact-version provenance and rights.

Commerce Foundry is authoritative for:

* Narrative Campaign briefs, product truth, approved claims, offers, and commercial policy for Commerce Foundry-originated work.
* Final commercial approval and commerce publication, or a narrowly delegated publication capability.
* Product and print-on-demand configuration.
* Vendor integrations.
* Order submission and fulfillment.
* Commerce-specific status and receipts.

The broader Commerce Foundry peer integration exchanges immutable Narrative Campaign briefs and Storyworld asset bundles; this question governs the print/vendor path within that relationship. Storyworld should plan the Commerce Foundry integration boundary in the next authorized integration sequence, but print-package submission must remain inactive until the print-package and proof process are reliable. Storyworld may then submit immutable packages that have the required Storyworld creative, rights, and proof approvals. Commerce Foundry must still import each package as an unapproved commercial candidate and perform its own product, claim, compliance, offer, vendor, and final commercial review before it initiates vendor order submission. Storyworld approval never implies Commerce Foundry approval or vendor submission authority, and Storyworld does not hold Commerce Foundry vendor credentials. Commerce Foundry returns normalized status and receipt references for Storyworld to retain. Standalone print-ready exports should remain available for portability and fallback, while direct vendor integrations inside Storyworld are unnecessary unless a later owner decision establishes a specific need.

---

## 35. Which interactive runtime paths should Storyworld support initially?

### Choices

* Browser-first runtime.
* Godot.
* Both.
* Defer runtime integration.

### Recommendation

Support both runtime paths early through a shared runtime/content contract, beginning with a narrow, reliable vertical slice for each.

* Use a browser-first path for widely distributed interactive stories.
* Use Godot for richer game-like and immersive experiences.
* Expand each path only after its initial compilation and review loop is reliable.

### Answer

**Confirmed answer: both runtime paths initially.**

Interactive runtime support should begin early because it is central to Storyworld’s purpose. Storyworld should establish a shared runtime/content contract and develop two initial compilation paths:

* **Browser-first:** widely distributed interactive stories.
* **Godot:** richer game-like and immersive experiences.

Both should share exact Storyworld canon releases, assets, narrative source state, permissions, provenance, runtime decision receipts, and review model. Runtime-specific adapters should translate that shared source into web and Godot outputs rather than creating separate creative systems. “Initially” means one narrow compilation-and-review vertical slice per path, not full game-engine, rendering, player-state, networking, or multiplayer functionality.

---

## 36. May runtime activity change Storyworld canon automatically?

### Recommendation

No for working canon.

Runtime events may return:

* Observations.
* Player decisions.
* Analytics.
* Proposed canon changes.
* Candidate story branches.
* Simulation results.

Any promotion into working canon must pass through Storyworld review and authorized human acceptance. Runtime execution and player-specific state may remain runtime-managed when policy allows. Automatic mutation of a separately authored nonauthoritative branch layer requires the future successor decision described in the answer.

### Answer

**Confirmed answer: not for working canon; narrowly governed automation may apply only to separate nonauthoritative runtime or branch state.**

Runtime activity should initially produce observations, analytics, player decisions, proposed canon changes, branches, and simulation results. Working canon must still require Storyworld review and human acceptance.

Future automatic changes could be supported for a separately defined runtime state or nonauthoritative branch layer when explicitly authorized by a successor decision and policy, provided they are scoped, versioned, reversible, auditable, rights-compliant, and prevented from changing working canon. This preserves the possibility without granting runtime activity uncontrolled authority.

---

# Part 8: Collaboration, deployment, and resilience

## 37. Who is the first mature version for?

### Choices

**A. One creator.**

**B. A small creative team.**

**C. A full professional studio.**

### Recommendation

Design the first mature version for **one creator or a small team**, with a small-team authority model.

Include early support for:

* Property and workspace stewardship.
* Review roles.
* Comments.
* Proposals.
* Exact-version decisions.
* Simple assignments.
* Permission boundaries.

Do not target enterprise workforce planning, department management, or large-studio scheduling. Reconsidering that boundary requires a later owner decision.

### Answer

**Confirmed answer: B, with a firm product boundary.**

> The first mature version is for one small family creative team. Storyworld may eventually support other solo creators and small teams, but it is not intended for large studios or enterprise production departments.

Storyworld should provide lightweight support for property and workspace stewardship, trusted collaborators, review roles, comments, proposals, exact-version decisions, assignments, and permissions. It should not prioritize enterprise workforce planning, department hierarchies, or large-studio scheduling. The product should remain intentionally optimized for small creators. These are target mature-version capabilities, not claims about the current alpha; the alpha remains an asynchronous, owner-decided system without real-time presence indicators, live co-editing, or assignment semantics.

---

## 38. Must Storyworld continue working when a hosted provider is unavailable?

### Recommendation

Yes.

Users should still be able to:

* Write and edit.
* Manage canon.
* Review existing assets.
* Organize productions.
* Prepare generation requests.
* Queue work.
* Perform local deterministic media operations.
* Use previously downloaded assets.
* Create export packages.

Provider outages should stop affected AI execution, not the entire platform.

### Answer

**Confirmed answer: Storyworld must continue working when a hosted provider is unavailable.**

OpenRouter, fal.ai, or another hosted-provider outage should affect only dependent execution. Storyworld must continue supporting writing, canon, asset review, production organization, queued requests, deterministic processing inside the Storyworld-controlled boundary, existing assets, export packages, and publication-scheduler preparation. A destination publication attempt is affected only when its own connector or authority host is unavailable.

---

## 39. Should Storyworld queue work while a provider is unavailable?

### Recommendation

Yes, after preserving the original request and revalidating it at execution time.

A queued job should preserve:

* Exact input versions.
* Provider policy.
* Cost ceiling.
* Requested model profile.
* Expiration time.
* Whether fallback is permitted.

Before execution, Storyworld must revalidate the queued job against current policy, rights and consent, provider-egress classification, provider/model availability, inputs, budget and price, task profile, expiry, and fallback rules. It must request renewed confirmation when a material condition changes and must never use the original approval to bypass a stricter current rule.

### Answer

**Confirmed answer: queue work only with execution-time revalidation.**

Queued jobs must preserve their exact inputs and a snapshot of the original policy, budget, model profile, expiry, and fallback rules for audit. At execution, Storyworld must also apply current policy and revalidate every material condition. The stricter applicable rule wins; a stale approval or policy snapshot cannot authorize execution.

---

## 40. Should customer-managed Storyworld installations be supported?

### Recommendation

Yes as a mature deployment option, but not necessarily in the first release.

A customer-managed installation may place the following under customer control:

* Storyworld Engine.
* Database.
* Object storage.
* Temporal workflows.
* Creative assets.
* Local deterministic media workers.
* External creative applications.

Hosted inference may still use OpenRouter and fal.ai under the applicable provider-egress and retention policies.

This supports privacy, customer control, and portability without requiring local AI models.

### Answer

**Confirmed answer: support customer-managed installations as a mature option, with two constraints.**

1. **Customer-managed means a complete Storyworld deployment under the customer’s control**, including its database, object storage, durable workflow orchestration (Temporal under the current accepted stack), governed assets, local deterministic workers, self-hosted ComfyUI orchestration, and external-tool integrations.
2. **Hosted inference remains policy-bound.** OpenRouter and fal.ai may be used only according to Storyworld’s provider-egress classifications, retention rules, budgets, provider approvals, and fallback policies.

This fits the private-first, small-creator focus and preserves user-supplied provider keys initially. It should be treated as a future deployment option for the owner’s team and other eligible small-team Storyworld instances—not as a shift toward large-studio or enterprise support. Under the current accepted execution posture, customer management does not authorize local model weights; self-hosted ComfyUI must use policy-approved hosted endpoints unless a successor decision changes that boundary.

---

## 41. Should Storyworld bundle ComfyUI, InvokeAI, Kdenlive, or similar applications?

### Recommendation

No, not by default.

Keep them separately installed and provide:

* Installation guidance and setup assistance.
* Supported-version checks.
* Health checks.
* Configuration assistance.
* Launch commands.
* Checkout and return connectors.

A separately licensed installer or managed distribution could be considered later after legal and maintenance review.

### Answer

**Confirmed answer: Storyworld should not bundle ComfyUI, Blender, InvokeAI, Kdenlive, DaVinci Resolve, or similar applications by default.**

These tools should remain independently installed or deployed—including self-hosted ComfyUI—while Storyworld provides:

* Installation guidance and setup assistance.
* Application detection.
* Supported-version and health checks.
* Configuration assistance.
* Launching with compatible Storyworld checkout packages.
* Storyworld-governed checkout, return, validation, and provenance handling.

External tools should continue using their native workflows and file formats; they should not need Storyworld-specific modifications. As clarified in question 25, a separately licensed installer or managed distribution may be considered later only after legal, licensing, security, platform, and maintenance review.

---

# Repository dispositions required

The questionnaire is internally reconciled, but several confirmed answers intentionally differ from currently adopted repository direction. They require successor decisions and canonical updates before they can control implementation:

1. Questions 2–3 expand Storyworld-native editing and precision beyond the non-goal wording in `project-dossier/canonical/storyworld/01_executive_context_and_product_direction.md`. The intended reconciliation is “default for supported Storyworld workflows, not a universal professional-editor replacement.”
2. Questions 9, 37, and 40 narrow the broader agency/enterprise tiers in `project-dossier/canonical/storyworld/01_executive_context_and_product_direction.md` to solo creators and eligible small teams.
3. Question 33 changes the Instagram-first adapter sequence accepted through `DEC-0015` and `DEC-0017` to Astro export first and Instagram second.
4. Question 11 introduces four provider-egress classes alongside the public/internal/confidential/restricted/embargoed resource-access classes in `project-dossier/canonical/storyworld/05_governance_operations_and_quality.md`. Implementation requires an explicit mapping; neither taxonomy silently replaces the other.
5. Questions 2 and 24 reposition InvokeAI from the locally hosted human editing workspace accepted in `DEC-0012` to an exceptional precision environment. Until a successor decision is accepted, the `DEC-0012` integration pattern remains controlling whenever the InvokeAI escape hatch is used.
6. Question 10 confirms bring-your-own-provider credentials first but does not decide whether the first private workspace uses one workspace-admin credential or separate per-member credentials.
7. Questions 9 and 40 confirm customer-managed deployment as a future option but do not decide whether Storyworld will also offer a hosted service to eligible solo creators and small teams.

Current accepted decisions remain controlling until these dispositions are accepted. Question 27 has been aligned to accepted `DEC-0012`: hosted-API generation only, with no local model weights unless a successor decision is adopted.

# Confirmed owner direction

The following points summarize confirmed owner direction within this questionnaire. They supersede its advisory recommendations wherever they differ, but they do not themselves supersede accepted repository decisions:

1. Text and voice are Storyworld’s primary creative controls.
2. Storyworld is the default environment for nearly all generation, editing, adaptation, evaluation, and precision work within supported Storyworld workflows, without becoming a universal professional-editor replacement.
3. Consequential changes require a pre-change plan and confirmation; routine execution remains visible, interruptible where technically supported, and reversible through retained version history.
4. Storyworld is private-first for one small family creative team, with a possible future offering for other solo creators and small teams—not large studios or enterprise departments. The current alpha remains asynchronous and owner-decided, without presence, live co-editing, or assignments.
5. User-supplied OpenRouter and fal.ai keys come first; managed usage may be added later for eligible small-team workspaces. Initial workspace-versus-member credential scope remains an explicit disposition.
6. Public, private, restricted, and highly restricted provider-egress classifications govern hosted routing; access and retention classifications remain separate and require explicit mapping.
7. Model selection remains within approved task profiles; automatic fallback is limited to policy-equivalent routes for low-risk, nonauthoritative work.
8. Routine deterministic media processing remains inside the Storyworld-controlled deployment boundary.
9. Governed candidates and accepted assets remain under Storyworld custody, including within a customer-managed Storyworld deployment.
10. External tools use native formats and workflows; Storyworld governs checkout, return, validation, provenance, and acceptance.
11. Blender belongs in the initial support set; Blender, InvokeAI, Kdenlive, DaVinci Resolve, and self-hosted ComfyUI orchestration remain exceptional or advanced environments rather than the normal creative workflow.
12. Storyworld does not bundle those applications by default; it provides installation guidance, setup assistance, detection, health checks, configuration, launching, and package exchange.
13. AI may generate, analyze, suggest, evaluate, and create findings, but authorized humans retain authority over working canon, canon releases, masters, permitted waivers, authoritative creative selections, and publication authorization.
14. Governed export packages are permanent first-class outputs. The proposed successor sequence plans Astro export first, Instagram export second with a direct connector only after its controls are ready, then X and TikTok export/connector work.
15. Prioritize Storyworld-specific scheduling in the next authorized sequence. A human may pre-authorize a future publication of an exact channel package, authority host, destination, metadata, disclosures, execution window, and bounded retry behavior; any material change requires renewed authorization.
16. Commerce Foundry remains the first-party peer authority for Narrative Campaign and commercial exchange and is the intended print-on-demand integration. Print submission remains inactive until the package and proof process are reliable; Storyworld then supplies creatively and rights-approved packages as unapproved commercial candidates, Commerce Foundry retains commercial, vendor, publication, and fulfillment authority, and standalone print-ready export remains available.
17. Browser and Godot runtime paths begin with a shared runtime/content contract, runtime-specific adapters, and one narrow compilation-and-review vertical slice per path.
18. Runtime activity initially records observations, analytics, player decisions, branches, simulations, and canon proposals. Automatic mutation of separate nonauthoritative runtime or branch state requires a future successor decision and policy; promotion into working canon always requires human acceptance.
19. Storyworld remains usable during hosted-provider outages and may queue work with an audit snapshot of its original conditions, but execution must revalidate current policy and every material condition; the stricter rule wins.
20. Customer-managed deployments—including durable workflow orchestration, self-hosted ComfyUI orchestration, and external tools—are a future option for the same small-team product boundary and remain subject to all Storyworld policy controls.

# Confirmed owner-directed configuration

Storyworld is an intent-driven creative production environment for small creators. Text and voice lead the workflow, while professional depth is available through intuitive built-in controls and Advanced Operator Mode. External applications and self-hosted ComfyUI orchestration remain separately deployed precision and operator environments.

Storyworld retains governance and custody of the creative record: exact versions, candidates, accepted assets, operations, provider records, provenance, receipts, evaluations, and reversible history. Customer-managed storage remains Storyworld custody when it is governed as the Storyworld system of record.

Hosted providers are policy-bound execution services, not Storyworld’s asset library or creative authority. Deterministic processing inside the Storyworld-controlled boundary, privacy controls, approved provider routing, human acceptance boundaries, export packages, runtime receipts, and Commerce Foundry handoff remain explicit parts of the architecture.

The questionnaire describes intended architecture and owner direction. It does not by itself accept the repository dispositions listed above or authorize implementation, budgets, credentials, live provider calls, external publication, deployment, or Commerce Foundry activation.
