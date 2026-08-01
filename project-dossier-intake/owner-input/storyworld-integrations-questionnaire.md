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
* Storyworld does not need to host AI models locally.
* ComfyUI is primarily an advanced workflow-design and testing environment that is self-hosted by default.

The following questions should be answered before the integration architecture is finalized.

## What to expect from this questionnaire

This questionnaire is an owner-directed architecture exercise. Each recommendation is advisory: it explains a reasonable default and its tradeoffs, but it does not override the owner’s decisions.

When the owner provides an explicit answer:

* Treat the answer as authoritative over the recommendation, prior assumptions, and generic best practices.
* Treat “I agree” as confirmation of the recommendation unless additional wording qualifies it.
* Treat any qualification, disagreement, or added requirement as part of the authoritative answer.
* Carry confirmed decisions and their implications into later sections.
* Preserve important nuance instead of forcing a response into A, B, or C.
* Distinguish confirmed decisions, assumptions, unresolved questions, and suggestions.
* Never treat silence as agreement.
* Ask a focused clarification question only when an unresolved issue materially affects the architecture, product direction, cost, rights, privacy, or safety.

Review each question in the context of the entire questionnaire and all previous answers. Recommendations may be revised when they conflict with an explicit owner answer; owner answers must not be silently replaced by the original recommendation.

---

# Part 1: Core product experience

## 1. Should text and voice be Storyworld’s main creative controls?

### Choices

**A. Yes. Text and voice are the main controls.**
Manual controls are secondary.

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

Treat this as a confirmed product direction: text and voice are Storyworld’s primary creative controls, with traditional controls available for precision and correction.

**Text and voice are primary, while all manual controls are reimagined as simplified, semantic, context-aware interfaces—not conventional editing tools.**

They should support precision through progressive disclosure without introducing dense, intimidating workflows. This is still **A**, not B: manual controls remain supportive, but they must feel native to Storyworld’s approachable creative model.

---

## 2. Should most generation and editing be completed inside Storyworld?

### Choices

**A. Yes. Outside editors are only needed for unusual precision work.**

**B. Storyworld handles generation, but outside applications handle most editing.**

**C. Storyworld mainly organizes work performed in other applications.**

### Recommendation

Choose **A**.

A normal user should be able to complete most productions without opening InvokeAI, Kdenlive, Resolve, or another specialist application.

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

Storyworld should normally provide these capabilities itself. External
applications are fallback environments for work that Storyworld does not yet
support reliably or for a specialist workflow that genuinely requires them.

* Detailed hand-painted masks.
* Complex compositing.
* Professional color finishing.
* Detailed keyframe animation.
* Advanced sound mixing.
* Plugin-heavy postproduction.
* Frame-level technical work beyond Storyworld’s normal controls.

### Answer

I would strengthen the answer to **A**:

**Storyworld should be the default environment for nearly all generation, editing, and precision work.** Generative AI should handle tasks such as masking, keyframes, compositing, color, and sound through simplified, intent-level interfaces.

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

Use three levels of control:

1. **Text or voice direction**
2. **Simple contextual controls**
3. **Advanced technical controls or external finishing**

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

I would choose B, with a stronger interpretation:

Simple, contextual controls should be the default, while advanced precision should be available on request through AI-assisted, simplified interfaces.

Storyworld should not expose professional controls constantly or require users to understand technical settings. Instead, users can request precise outcomes—such as an exact mask, timing change, keyframe adjustment, composite, or sound mix—and let generative AI perform the technical work behind an inspectable, reversible interface.

So the model is:

1. Text or voice direction.
2. Simple contextual refinement.
3. Built-in AI-mediated professional precision when requested.
4. Advanced Operator Mode for exact controls, technical inspection, and policy-approved overrides.
5. External tools only for genuinely unsupported edge cases.

The professional-controls advanced layer should provide the precision and
expressive power of professional tools without reproducing their dense panels,
technical jargon, or fragmented workflows. Users should combine
natural-language direction, visual manipulation, semantic controls, and
AI-assisted technical operations. Complexity should appear progressively and
contextually, while still allowing exact values and precise adjustments when
needed.

Professional depth should feel like approachable creative actions—“keep this
subject sharp,” “match this lighting,” or “move the cut 12 frames earlier”—
rather than requiring users to configure masks, keyframes, nodes, codecs, or
provider-specific parameters manually. Every operation should be previewable,
adjustable, explainable, reversible, and preserved as a structured creative
decision.

Raw provider-native controls may be exposed to authorized advanced users
through Advanced Operator Mode when policy allows, but they must never be the
only way to reproduce the creative intent.

---

## 4. Should Storyworld show its plan before making an important change?

### Choices

**A. Always show the plan before any change.**

**B. Show the plan for meaningful or costly changes.**

**C. Apply changes immediately and rely on undo.**

### Recommendation

Choose **B**.

Small preview operations may run immediately. Meaningful, costly, destructive, or approval-changing operations should show a plan first.

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

I would choose B, with a stronger interpretation:

Use pre-change planning for consequential work and live transparency for routine work.

1. **Meaningful, costly, destructive, or approval-changing edits** should show a plan and wait for confirmation before proceeding.
2. **Routine edits** may begin immediately, but Storyworld should show what it is doing in real time.
3. Every operation should support **pause, cancel, reverse, and steer**.
4. If the operation becomes more consequential than expected, Storyworld should pause and request confirmation.
5. Users should be able to inspect the interpretation, current progress, changes made, preserved elements, assumptions, and cost at any point.

The principle is: **no unnecessary approval friction, but no invisible automation.**

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

Storyworld should show a proposal before applying:

* Change an active edit.
* Replace a shot.
* Modify color or sound.
* Regenerate part of an image.
* Create a new production variant.
* Change captions.
* Spend more than the normal budget.

### High consequence

Storyworld must require an authorized human decision:

* Change accepted canon.
* Replace an accepted master.
* Accept creative work.
* Waive a rights or continuity finding.
* Publish.
* Delete authoritative evidence.

### Answer

I would confirm:

* **Low consequence:** may run immediately within the approved budget.
* **Medium consequence:** show a proposal before applying.
* **High consequence:** require an authorized human decision.

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

I would confirm **B**:

Storyworld should make reasonable assumptions for minor uncertainty, state them visibly, and provide easy correction. It should ask a focused question when uncertainty could materially affect identity, rights, cost, canon, safety, or a major creative decision.

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

I would confirm:

One creative conversation may direct multiple media, while Storyworld maintains separate, inspectable, reversible operations for each medium. This preserves a unified creative experience without blurring media-specific changes, costs, approvals, or provenance.

---

## 8. Should Storyworld save the original voice recording?

### Choices

**A. Save every voice recording.**

**B. Save only the transcript and command details by default.**

**C. Delete both after the command is completed.**

### Recommendation

Choose **B**.

Save:

* The transcript.
* The selected target.
* The playhead or image position.
* Storyworld’s interpretation.
* The resulting operations and decisions.

Keep the original voice recording only when:

* The user explicitly chooses to keep it.
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

I would sensibly tighten **B**:

Treat voice recordings as ephemeral input by default. Storyworld should retain the transcript, target, context, interpretation, and resulting operations—but should not offer a normal “keep recording” option.

If an exceptional case requires preservation, it should occur only through a governed workflow, such as an authorized source-asset import, production-evidence policy, or retention requirement. That keeps privacy and storage risk low without making audio retention part of ordinary use.

---

# Part 2: Product and customer scope

## 9. Is Storyworld a private tool or a customer-facing product?

### Choices

**A. Private tool for the owner only.**

**B. Private first, but designed to become a customer product.**

**C. Customer product from the first public version.**

### Recommendation

Choose **B**.

Build the first production version for a single creator or small internal team, but establish customer-ready boundaries for:

* User identity.
* Permissions.
* Tenant separation.
* Usage accounting.
* API-key ownership.
* Asset visibility.
* Rights and approvals.

### Pros

* Keeps the first release manageable.
* Avoids a costly future architecture rewrite.
* Allows real production experience before broad release.

### Cons

* Some customer-ready foundations add early complexity.
* Full multi-tenant operations should still be deferred until needed.

### Answer

I would confirm **B** with a firm product boundary:

Storyworld should launch as a private tool for one small family creative team.
It may later support other solo creators and small teams, while remaining
intentionally out of scope for large studios and enterprise production
departments.

Storyworld should still establish lightweight customer-ready foundations for
identity, permissions, small-team workspaces, usage, assets, rights, and
approvals. Full multi-tenant and enterprise operations can wait until they are
needed, and large-studio support is not a target.

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
3. Allow organizations to choose either model.

### User-supplied keys

**Pros**

* Lower financial risk for Storyworld.
* Easier early implementation.
* Users control their provider accounts and limits.

**Cons**

* More setup.
* Harder to create a seamless beginner experience.
* Support becomes more complicated.

### Storyworld-managed keys

**Pros**

* Simpler customer experience.
* Centralized budgets and provider policies.
* Storyworld can offer packaged usage.

**Cons**

* Storyworld assumes billing and abuse risk.
* Requires quotas, metering, fraud controls, and payment systems.
* Provider costs become Storyworld’s responsibility.

### Answer

I would confirm **C**:

Start with user-supplied provider keys, later add Storyworld-managed usage and
billing, and eventually support both models for eligible small-team
workspaces. Provider credentials should remain isolated, protected, and
clearly owned by the supplying party.

---

# Part 3: Hosted AI, privacy, and provider policy

## 11. What information may be sent to OpenRouter, fal.ai, or another hosted provider?

### Recommendation

Use four simple classifications.

### Public

May be sent to any approved provider.

Examples:

* Published material.
* Public product information.
* Public promotional media.

### Private

May be sent only under approved privacy and retention rules.

Examples:

* Unreleased scripts.
* Production drafts.
* Private reference material.

### Restricted

May be sent only to explicitly approved providers and models, or not sent at all.

Examples:

* Licensed source material.
* Customer-confidential work.
* Sensitive likeness references.
* Unreleased commercial products.

### Highly restricted

Must not leave Storyworld unless a specific authorized exception is recorded.

Examples:

* Material involving protected children.
* Revoked consent.
* Confidential legal records.
* Sensitive personal information.
* Sources contractually prohibited from hosted processing.

Consent, ownership, or a production exception does not by itself override the
highly restricted classification or the requirement for an authorized
exception.

### Answer

The four-tier data classification is confirmed:

* **Public:** may be sent to approved providers.
* **Private:** permitted under approved privacy and retention rules.
* **Restricted:** limited to explicitly approved providers/models or blocked.
* **Highly restricted:** must remain within Storyworld unless an authorized exception is recorded.

---

## 12. What provider-retention rules should Storyworld enforce?

### Recommendation

Use privacy-protective defaults:

* Deny provider training or data collection where supported.
* Prefer zero-retention routes for private material.
* Disable fal request storage by default.
* Use short-lived media URLs.
* Download provider outputs immediately.
* Treat provider URLs as temporary transport.
* Record what data was sent, where, and under which policy.
* Never use provider storage as Storyworld’s asset library.

Allow less restrictive settings only through an explicit production policy.

### Answer

The privacy-protective provider-retention defaults are confirmed.

Storyworld should minimize provider retention, prefer zero-retention routes, download outputs promptly, use short-lived URLs, maintain a transmission record, and never treat provider storage as its asset library. Less restrictive behavior requires an explicit production policy.

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

Advanced users may override the choice when policy allows it.

### Pros

* Normal users do not need to understand model differences.
* Important tasks remain predictable.
* Storyworld can improve routing over time.

### Cons

* Model testing and promotion become ongoing responsibilities.
* Automatic selection must be explainable.

### Answer

I would confirm **C**:

Storyworld should use approved task profiles with automatic model selection for normal workflows, fixed or tightly constrained routing for important tasks, and policy-controlled model overrides for advanced users. Routing decisions should remain explainable.

---

## 14. May OpenRouter fall back to a different model or provider?

### Recommendation

Allow fallback only within the same approved policy group.

### Allow fallback for

* Brainstorming.
* Drafting.
* Low-risk classification.
* Temporary previews.
* Nonauthoritative suggestions.

### Limit or disable fallback for

* Canon extraction.
* Rights-related analysis.
* Sensitive documents.
* Continuity decisions.
* Evaluations tied to an accepted workflow.
* Reproducibility-critical production work.

Storyworld should never silently route sensitive material to a less trusted provider.

### Answer

I would confirm the fallback policy:

Fallbacks may occur only within the same approved policy group for low-risk, nonauthoritative work. They should be limited or disabled for canon, rights, sensitive material, continuity, accepted workflows, and reproducibility-critical production work—never silently routing sensitive data to a less trusted provider.

---

## 15. Should Storyworld support providers other than OpenRouter and fal.ai?

### Recommendation

Yes, but OpenRouter and fal.ai should be the first strategic integrations.

Storyworld should preserve a provider abstraction so it can later support:

* A direct model-provider API.
* A specialized video service.
* A specialized speech service.
* A private enterprise endpoint.
* A future customer-controlled provider.

Provider-specific prompts, workflow graphs, model names, and parameters must remain execution details rather than Storyworld’s creative authority.

### Answer

I would confirm the provider abstraction and integration strategy:

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

I would confirm **C**:

Real-person photographs, voices, and likenesses may be sent to hosted
providers only when identity, consent or valid permission, permitted uses,
provider scope, revocation, cloning allowances, disclosures, and publication
restrictions are recorded **and** the data classification, provider policy,
retention rules, and no-egress requirements permit the transfer. Possessing the
media alone is not sufficient authorization, and consent never overrides a
highly restricted classification.

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

Use local deterministic tools such as FFmpeg, OpenImageIO, OpenColorIO, MediaInfo, and ClamAV when generative AI is not necessary.

### Pros

* Better privacy.
* Lower provider cost.
* More reproducible results.
* Faster for routine technical work.

### Cons

* Requires local worker installation and maintenance.
* Some devices may process large media slowly.

This does not require hosting AI models locally.

### Answer

Routine media processing should remain local and deterministic wherever generative AI is unnecessary.

This preserves privacy, reduces cost, improves reproducibility and speed, and does not require Storyworld to host AI models locally.

---

## 18. When should Storyworld ask before spending money?

### Recommendation

Use configurable budgets.

* Small jobs may run immediately within a user-approved allowance.
* Expensive individual jobs require confirmation.
* Batch jobs show estimated cost before starting.
* A production can have daily, weekly, and total limits.
* The user can choose whether previews favor cheaper models.
* Unexpected cost increases pause the workflow.

Every provider request should record its estimated and actual cost when available.

### Answer

I would confirm the configurable spending budgets:

Small jobs may run within approved allowances; expensive or batch work must show cost and/or request confirmation; production-level limits and preview cost preferences are configurable; unexpected increases pause execution; and estimated versus actual provider costs are recorded.

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
* Privacy restricted.

Privacy and rights rules must never be weakened merely to improve speed or price.

### Answer

I would confirm the configurable optimization balance:

The default priority is policy/privacy, required quality, continuity/fidelity, cost, then speed. Users may choose production profiles, but privacy and rights constraints remain non-negotiable.

---

# Part 4: Asset custody and version history

## 20. Should Storyworld keep every generated or edited production file?

### Recommendation

Storyworld should keep every governed candidate and every accepted asset in its own storage.

Provider outputs should be:

1. Downloaded.
2. Scanned.
3. Validated.
4. Hashed.
5. Given provenance.
6. Stored under Storyworld custody.

Provider URLs, InvokeAI galleries, ComfyUI output folders, and editor caches are not permanent storage.

### Answer

I would confirm this storage and custody policy:

Every governed candidate and accepted asset should be downloaded into
Storyworld custody, scanned, validated, hashed, and given provenance. Provider
URLs, galleries, output folders, and editor caches are temporary transport or
working locations—not permanent storage.

For a customer-managed installation, customer-controlled object storage counts
as Storyworld custody when it is the configured Storyworld system of record and
is governed by Storyworld’s versioning, provenance, access, and retention
rules. “Owns” means governs and maintains custody here; it does not determine
legal title.

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
* Outputs connected to accepted or published work.
* Assets required for replay or audit.

Allow temporary explorations to expire under a clear retention policy.

### Pros

* Preserves meaningful evidence.
* Avoids unlimited storage growth.
* Keeps casual experimentation lightweight.

### Cons

* Storyworld must clearly distinguish experiments from governed production work.
* Expiration must never remove required evidence.

### Answer

I would confirm **B**:

Storyworld should retain governed candidates, rejected production work,
decision evidence, accepted/published outputs, and replay/audit assets.
Disposable experiments may expire under a clear retention policy after any
required rollback window, but never if they are required evidence or part of
accepted lineage.

---

## 22. Should outside editing use a formal checkout and return process?

### Recommendation

Yes for governed production assets.

The normal process should be:

1. Check out an exact asset or sequence version.
2. Include a signed manifest and permitted references.
3. Open it in the outside application.
4. Preserve the original.
5. Return the edited work as a new candidate.
6. Compare it with the checked-out version.
7. Rerun affected evaluations.
8. Accept or reject the new exact version.

Casual experiments may use a lighter process, but they do not become production assets until formally imported.

### Answer

Make this principle explicit:

> **Storyworld owns governance; external tools retain their native formats and workflows.**

The checkout/return process should be orchestrated and enforced entirely by Storyworld, while Storyworld conforms to the conventions, file formats, and import workflows of each external tool. External applications should not require Storyworld-specific plugins, schema changes, metadata handling, or workflow updates.

Storyworld should:

1. Preserve the authoritative original.
2. Export a self-contained package using standard formats the external tool already imports easily.
3. Include Storyworld’s manifest and references as optional sidecar information, not as a dependency for opening or editing the files.
4. Let the user work normally in the external application.
5. Treat returned files as new, untrusted candidates.
6. Compare, validate, evaluate, and accept or reject them inside Storyworld.

External tools should only need to open and save files using their existing workflows. Storyworld adapts to their capabilities while retaining complete control over versioning, provenance, rights, validation, and acceptance.

The manifest may be ignored by the external application, but Storyworld must
retain its authoritative copy and use its own package or session identity to
associate returned files with the checkout. “Optional sidecar” describes the
external tool’s consumption of the manifest, not Storyworld’s governance
record.

---

## 23. Should outside application workfiles be preserved?

Examples:

* InvokeAI sessions.
* Kdenlive projects.
* Resolve projects.
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

I would confirm this recommendation:

Storyworld should preserve important external workfiles as nonauthoritative production artifacts, alongside portable representations where possible. This enables exact session reopening while reducing vendor and application lock-in.

---

# Part 5: Creative applications and finishing tools

## 24. Which outside applications should receive first-class support first?

### Recommended first group

#### Required production integrations

* **OpenRouter** — language and multimodal intelligence.
* **fal.ai** — image, video, audio, and other generative-media execution.
* **FFmpeg-based media worker** — deterministic video and audio processing.
* **OpenTimelineIO** — editorial interchange.

#### Optional precision environments

* **Blender** — 3D asset, scene, and animation precision work.
* **InvokeAI** — advanced image finishing.
* **Kdenlive** — open-source video finishing.
* **DaVinci Resolve Studio** — professional video finishing.

#### Advanced operator environment

* **ComfyUI** — workflow design, testing, and technical inspection.

#### Important internal integration

* **Commerce Foundry** — print-on-demand product, vendor, order, and
  fulfillment operations.

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

The initial support set should include **Blender**, while making clear that precision applications are exceptional escape hatches—not the center of the workflow.

The revised structure would be:

* **Required production integrations:** OpenRouter, fal.ai, FFmpeg-based media worker, OpenTimelineIO.
* **Exceptional precision environments:** Blender, InvokeAI, Kdenlive, DaVinci Resolve Studio.
* **Advanced operator environment:** ComfyUI.
* **Later integrations:** Krita, Inkscape, darktable, Ardour, MuseScore, and
  Scribus. Interactive runtimes are addressed as early integrations in
  question 35.

Storyworld remains the primary environment for intent-driven generation, editing, adaptation, evaluation, and finishing across narrative media. Text and voice lead the workflow; precision capabilities are progressively revealed through intuitive, simplified interfaces. External applications—including Blender—provide specialized escape hatches when needed.

---

## 25. Should Storyworld install these applications?

### Choices

**A. Bundle them inside Storyworld.**

**B. Require users to install them manually.**

**C. Keep them separate but provide guided installation, detection, setup, and launching.**

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

I would confirm **C**:

Storyworld should keep external applications separate while providing guided detection, installation, configuration, launching, and return handling. The architecture should preserve the option to bundle selected tools later if licensing, distribution, platform support, and maintenance make that worthwhile.

---

## 26. Should advanced users see provider-native controls?

Examples:

* OpenRouter model choice.
* Raw fal parameters.
* Seeds.
* Samplers.
* ComfyUI graphs.
* Workflow hashes.
* Provider logs.

### Recommendation

Yes, through an **Advanced Operator Mode**.

Normal users should see creative language and simple controls. Advanced users may inspect or override technical execution details when policy allows it.

Technical settings should never become the only way to reproduce the creative intent.

### Answer

I would confirm the **Advanced Operator Mode** recommendation:

Normal users remain in the intent-driven interface. Authorized advanced users may inspect or override provider-native settings, while Storyworld continues to preserve and reproduce the underlying creative intent independently of those technical details.

---

## 27. Should Storyworld support both direct fal endpoints and ComfyUI workflows?

### Recommendation

Yes.

### Direct fal endpoints

Use for:

* Common image-generation operations.
* Common image-editing operations.
* Standard video generation.
* Upscaling.
* Segmentation.
* Routine transformations.

**Pros**

* Simpler.
* Easier to maintain.
* Easier to explain.
* Often faster to integrate.

### Self-hosted ComfyUI workflows

Use for:

* Complex multi-step generation.
* Identity-preserving workflows.
* Custom masking and control.
* Reusable production pipelines.
* Experimental capabilities.
* Processes involving several models.

**Pros**

* More flexible.
* Supports sophisticated pipelines.
* Easier for technical operators to inspect.

**Cons**

* More dependencies.
* Greater security and maintenance burden.
* Harder to keep stable across node and workflow changes.

### Answer

Storyworld should support both direct fal.ai endpoints and ComfyUI workflows, but ComfyUI should be **self-hosted by default**, not assumed to run through fal.

Direct fal.ai endpoints should handle common, stable operations such as image generation, image editing, video generation, upscaling, segmentation, and routine transformations.

Self-hosted ComfyUI should handle complex, identity-preserving, multi-model, reusable, experimental, or sensitive workflows. Storyworld should connect to it through an adapter while keeping it hidden from normal users.

A fal-hosted ComfyUI deployment may be supported later when elastic capacity or operational convenience justifies it and data policy permits it.

For sensitive material, self-hosted ComfyUI is acceptable only when it operates
inside an approved Storyworld-controlled deployment boundary with no
unapproved data egress. Self-hosting does not automatically make a workflow
safe; the data classification and provider policy still apply. Storyworld does
not need to host model weights itself, while a self-hosted ComfyUI deployment
may use local models or approved endpoints according to policy.

For every ComfyUI execution, Storyworld should record the workflow and node versions, model versions, parameters, seeds, hashes, logs, and resulting provenance. Storyworld owns the creative intent and governance; ComfyUI remains an independently deployed technical execution environment.

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
* Reject malformed or technically unreadable outputs.
* Prepare export packages for review.
* Apply previously approved low-risk automation rules.

AI may not automatically:

* Change accepted canon.
* Accept creative work.
* Replace an accepted master.
* Waive rights, policy, or continuity findings.
* Approve a release.
* Publish.
* Delete required evidence.

### Answer

I would confirm this AI authority boundary:

AI may analyze, draft, generate, suggest, evaluate, preview, validate, and execute approved low-risk automation. It may not alter accepted canon, approve or publish work, waive rights or policy findings, replace accepted masters, or delete required evidence.

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
* Exceeded approved budget.

Creative or interpretive judgments should normally produce a finding for human review.

Examples:

* “This scene feels slow.”
* “The score may be too emotional.”
* “The character does not look close enough.”
* “This composition may weaken the reveal.”

### Answer

I would confirm automatic blocking for clear technical or policy failures:

Interpretive or creative concerns should remain findings for human review rather than becoming automatic blockers.

---

## 30. Which actions must always require a human?

### Recommendation

For authoritative shared or working canon, always require authorized human
action for:

* Accepting a canon proposal.
* Accepting a creative asset as a master.
* Choosing among meaningful creative alternatives.
* Approving a likeness or cloned voice.
* Waiving a blocker.
* Accepting a final edit.
* Approving publication.
* Publishing.
* Permanently deleting governed evidence.
* Changing provider policy for restricted data.

### Answer

I agree with the principle that these actions must always require authorized
human approval. This includes accepting a proposal into authoritative shared
or working canon, accepting masters, choosing meaningful creative alternatives,
approving likeness or voice use, waiving blockers, accepting final edits,
approving or publishing releases, permanently deleting governed evidence, and
changing provider policy for restricted data.

Runtime state, player-specific state, and explicitly non-authoritative branch
state are not authoritative canon unless they are later promoted through the
same human-controlled acceptance boundary.

---

## 31. Should every AI change be reversible?

### Recommendation

Yes.

Every accepted operation should retain:

* The exact base version.
* The operation performed.
* The provider execution record.
* The resulting candidate.
* The person or policy that accepted it.
* A way to return to the earlier version.

“Undo” in the interface may be simple, but Storyworld should preserve immutable version history underneath it.

### Answer

I would confirm that every AI operation must create a reversible version
transition while it exists:

Storyworld should preserve immutable version history, including the base
version, operation, provider record, resulting candidate, acceptance authority,
and a reliable path back to the prior version. Governed and accepted work must
retain this history durably. Disposable experiments may later expire under the
retention policy in question 21, but expiration must not remove governed
evidence or accepted lineage.

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

I would confirm Storyworld should evaluate AI output before presenting it:

Automated checks should catch technical, continuity, fidelity, rights, policy, caption, audio, and preservation failures, while clearly surfacing uncertainty and leaving subjective creative judgment to human review.

---

# Part 7: Publishing and delivery

## 33. Should Storyworld publish directly to websites and social platforms?

### Choices

**A. Publish directly from the first version.**

**B. Begin with approved export packages, then add publishing connectors individually.**

**C. Never publish directly.**

### Recommendation

Choose **B**.

Begin by creating governed, approved export packages.

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

I would confirm **B with a stronger export-first commitment and prioritized implementation**:

* Approved export packages remain a permanent, first-class capability, even after direct publishing exists.
* Plan the integration architecture now for Astro-based websites, Instagram, X,
  and TikTok.
* Build the Astro export package first.
* Build Instagram support second, beginning with the approved export package and
  adding direct publishing only when its controls are ready.
* Keep X and TikTok planned for subsequent export and connector work.
* Build the scheduling component now as a destination-agnostic system for
  approved packages and future publishing connectors.

The scheduler should support approvals, time zones, queued jobs, retries,
pause/cancel, status, receipts, and correction workflows. Before a direct
connector exists, it may schedule package preparation, export, or handoff.
Direct publishing should still be added destination by destination, only after
the relevant authentication, preview, metadata, rights, disclosure, failure,
and withdrawal controls are ready.

A human may pre-approve a future publication by approving the exact package,
destination, metadata, disclosures, time, timezone, and permitted execution
behavior. The scheduler may publish that exact approved package later without
another prompt if no material input, policy, destination, or validation state
has changed. Any such change, blocker, or uncertain outcome must pause
execution and require renewed human approval. The scheduler may retry
transport within the approved request but may not choose new creative content
or bypass a blocker. This describes a future connector capability; external
publication remains a separately authorized crossing and is not activated by
this questionnaire.

---

## 34. Should Storyworld send print jobs directly to vendors?

### Recommendation

Not initially.

Begin with:

* Print-ready packages.
* Proof records.
* Font and image validation.
* Bleed, trim, safe-area, and color checks.
* Physical-proof approval.

Add direct vendor submission only after the print package and proof process are reliable.

### Answer

**Do not build direct print-vendor submission into Storyworld initially. Integrate Storyworld with Commerce Foundry instead.**

Storyworld should own:

* Creative intent and approved assets.
* Print-ready package generation.
* Font, image, bleed, trim, safe-area, and color validation.
* Proof records and human approval.
* Exact-version provenance and rights.

Commerce Foundry should own:

* Product and print-on-demand configuration.
* Vendor integrations.
* Order submission and fulfillment.
* Commerce-specific status and receipts.

Storyworld should plan the Commerce Foundry integration boundary now and send
Commerce Foundry only approved packages. Storyworld should retain the
resulting status and receipt references. Standalone print-ready exports should
remain available for portability and fallback, while direct vendor
integrations inside Storyworld are unnecessary unless a later owner decision
establishes a specific need.

---

## 35. Which interactive runtime should Storyworld support first?

### Choices

* Browser-first runtime.
* Godot.
* Both.
* Defer runtime integration.

### Recommendation

The original deferral recommendation is superseded by the owner-directed
choice to support both runtimes early. Establish a shared runtime/content
contract and begin with narrow, reliable vertical slices for both paths.

* Use a browser-first path for widely distributed interactive stories.
* Use Godot for richer game-like and immersive experiences.
* Expand each path only after its initial compilation and review loop is
  reliable.

### Answer

The owner-directed choice is **Both** interactive runtimes initially.

Interactive runtime support should begin early because it is central to Storyworld’s purpose. Storyworld should establish a shared runtime/content contract and develop two initial compilation paths:

* **Browser-first:** widely distributed interactive stories.
* **Godot:** richer game-like and immersive experiences.

Both should share Storyworld’s canon, assets, narrative state, permissions,
provenance, runtime decision receipts, and review model. Runtime-specific
adapters should translate that shared source into web and Godot outputs rather
than creating separate creative systems. Start with a narrow, reliable
vertical slice for each and expand capabilities over time.

---

## 36. May runtime activity change Storyworld canon automatically?

### Recommendation

Not by default for authoritative shared or working canon.

Runtime events may return:

* Observations.
* Player decisions.
* Analytics.
* Proposed canon changes.
* Candidate story branches.
* Simulation results.

Any promotion into authoritative shared or working canon must pass through
Storyworld review and authorized human acceptance. Runtime state, player-
specific state, and explicitly non-authoritative branch state may remain
runtime-managed when policy allows.

### Answer

A better position is:

**Not by default in the initial system, but remain open to narrowly governed future exceptions.**

Runtime activity should initially produce observations, analytics, player
decisions, proposed canon changes, branches, and simulation results. Shared or
working canon must still require Storyworld review and human acceptance.

Future automatic changes could be supported for a separately defined runtime
state or non-authoritative branch layer when explicitly authorized by policy,
provided they are scoped, versioned, reversible, auditable, rights-compliant,
and prevented from silently changing authoritative shared or working canon.
This preserves the possibility without granting runtime activity uncontrolled
authority.

---

# Part 8: Collaboration, deployment, and resilience

## 37. Who is the first mature version for?

### Choices

**A. One creator.**

**B. A small creative team.**

**C. A full professional studio.**

### Recommendation

Design the first mature version for **one creator or a small team**, with a team-ready authority model.

Include early support for:

* Ownership.
* Review roles.
* Comments.
* Proposals.
* Exact-version decisions.
* Simple assignments.
* Permission boundaries.

Defer complex workforce planning, department management, and large-studio scheduling until real use requires them.

### Answer

My answer is **B**, with a firm product boundary:

> The first mature version is for one small family creative team. Storyworld may eventually support other solo creators and small teams, but it is not intended for large studios or enterprise production departments.

Storyworld should provide lightweight support for ownership, trusted
collaborators, review roles, comments, proposals, exact-version decisions,
assignments, and permissions. It should not prioritize enterprise workforce
planning, department hierarchies, or large-studio scheduling. The product
should remain intentionally optimized for small creators. These are target
mature-version capabilities, not claims about the current alpha; the alpha
remains an asynchronous, owner-decided system without presence, live
co-editing, or assignment semantics.

---

## 38. Must Storyworld continue working when OpenRouter or fal.ai is unavailable?

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

I would confirm that Storyworld must continue working when OpenRouter or fal.ai is unavailable:

OpenRouter or fal.ai outages should affect only dependent AI execution. Storyworld must continue supporting writing, canon, asset review, production organization, queued requests, local deterministic processing, existing assets, and export packages.

---

## 39. Should Storyworld queue work while a provider is unavailable?

### Recommendation

Yes, when safe.

A queued job should preserve:

* Exact input versions.
* Provider policy.
* Cost ceiling.
* Requested model profile.
* Expiration time.
* Whether fallback is permitted.

Storyworld should ask again before running a queued job if the price, provider policy, inputs, or approved model profile has materially changed.

### Answer

I would confirm that Storyworld should queue work while a provider is unavailable:

Queued jobs must preserve their exact inputs, policy, budget, model profile, expiry, and fallback rules. Storyworld should request renewed confirmation before execution if any material condition changes.

---

## 40. Should customer-managed Storyworld installations be supported?

### Recommendation

Yes as a mature deployment option, but not necessarily in the first release.

A customer-managed installation may keep:

* Storyworld Engine.
* Database.
* Object storage.
* Temporal workflows.
* Creative assets.
* Local deterministic media workers.
* External creative applications.

under the customer’s control while still using OpenRouter and fal.ai for hosted inference.

This supports privacy, ownership, and portability without requiring local AI models.

### Answer

I would confirm that Storyworld should support customer-managed installations with two important constraints:

1. **Customer-managed means a complete Storyworld deployment under the customer’s control**, including its database, object storage, governed assets, local workers, self-hosted ComfyUI, and external-tool integrations.
2. **Hosted inference remains policy-bound.** OpenRouter and fal.ai may be used only according to Storyworld’s data classifications, retention rules, budgets, provider approvals, and fallback policies.

This fits the private-first, small-creator focus and preserves user-supplied
provider keys initially. It should be treated as a future deployment option for
the owner’s team and other eligible small-team Storyworld instances—not as a
shift toward large-studio or enterprise support. Storyworld itself does not
need to host model weights; a customer-managed ComfyUI deployment may use
local models or approved endpoints according to policy.

---

## 41. Should Storyworld bundle ComfyUI, InvokeAI, Kdenlive, or similar applications?

### Recommendation

No, not by default.

Keep them separately installed and provide:

* Guided setup.
* Supported-version checks.
* Health checks.
* Configuration assistance.
* Launch commands.
* Checkout and return connectors.

A separately licensed installer or managed distribution could be considered later after legal and maintenance review.

### Answer

Storyworld should **not bundle ComfyUI, Blender, InvokeAI, Kdenlive, Resolve, or similar applications by default**.

These tools should remain independently installed or deployed—including self-hosted ComfyUI—while Storyworld provides:

* Guided installation and setup.
* Application detection.
* Supported-version and health checks.
* Configuration assistance.
* Launching with compatible Storyworld export packages.
* Storyworld-owned checkout, return, validation, and provenance handling.

External tools should continue using their native workflows and file formats; they should not need Storyworld-specific modifications. A separately licensed installer or managed distribution may be considered later after legal, licensing, platform, and maintenance review.

---

# Confirmed owner-directed decisions

The following decisions are confirmed owner direction for the integration
architecture. They supersede earlier recommendations wherever they differ:

1. Text and voice are Storyworld’s primary creative controls.
2. Storyworld provides most generation, editing, adaptation, evaluation, and
   precision work through progressively revealed, simplified interfaces.
3. Consequential changes require a pre-change plan and confirmation; routine
   changes are visible while running and remain pausable, steerable, and
   reversible.
4. Storyworld is private-first for one small family creative team, with a
   possible future offering for other solo creators and small teams—not large
   studios or enterprise departments.
5. User-supplied OpenRouter and fal.ai keys come first; managed usage may be
   added later for eligible small-team workspaces.
6. Public, private, restricted, and highly restricted data classifications
   govern provider routing, retention, consent, and egress.
7. Model selection and fallback remain within approved task and policy groups.
8. Routine deterministic media processing remains local.
9. Governed candidates and accepted assets remain under Storyworld custody,
   including within a customer-managed Storyworld deployment.
10. External tools use native formats and workflows; Storyworld owns checkout,
    return, validation, provenance, and acceptance.
11. Blender, InvokeAI, Kdenlive, DaVinci Resolve, and self-hosted ComfyUI are
    exceptional or advanced environments, not the normal creative workflow.
12. Storyworld does not bundle those applications by default; it provides
    guided setup, detection, health checks, configuration, launching, and
    package exchange.
13. AI may generate, analyze, suggest, evaluate, and create findings, but
    authorized humans retain authority over working/shared canon, masters,
    waivers, meaningful creative choices, and publication.
14. Approved export packages are permanent first-class outputs. Plan
    Astro-based website, Instagram, X, and TikTok integrations now; build
    Astro first and Instagram second.
15. Build scheduling now. A human may pre-approve a future publication of an
    exact package, destination, metadata, disclosures, and execution window.
16. Commerce Foundry is the intended print-on-demand integration; Storyworld
    supplies approved print packages and Commerce Foundry handles vendor and
    fulfillment operations.
17. Browser and Godot runtime paths begin early through a shared runtime and
    content contract.
18. Runtime activity may manage scoped runtime or non-authoritative branch
    state, but promotion into authoritative shared or working canon requires
    human acceptance.
19. Storyworld remains usable during hosted-provider outages and may safely
    queue work with its original policy, inputs, budget, model profile, expiry,
    and fallback rules.
20. Customer-managed deployments are a future option for the same small-team
    product boundary and remain subject to all Storyworld policy controls.

# Confirmed owner-directed configuration

Storyworld is an intent-driven creative production environment for small
creators. Text and voice lead the workflow, while professional depth is
available through intuitive built-in controls and Advanced Operator Mode.
External applications and self-hosted ComfyUI remain separately deployed
precision and operator environments.

Storyworld retains governance and custody of the creative record: exact
versions, candidates, accepted assets, operations, provider records,
provenance, receipts, evaluations, and reversible history. Customer-managed
storage remains Storyworld custody when it is governed as the Storyworld
system of record.

Hosted providers are policy-bound execution services, not Storyworld’s asset
library or creative authority. Local deterministic processing, privacy
controls, approved provider routing, human acceptance boundaries, export
packages, runtime receipts, and Commerce Foundry handoff remain explicit parts
of the architecture.

The questionnaire describes intended architecture and owner direction. It
does not by itself authorize implementation, live provider calls, external
publication, deployment, or Commerce Foundry activation.
