# Storyworld Integrations Questionnaire

These are the remaining decisions that materially affect the integration architecture.

## Must decide now

1. **Will Storyworld be only for your private/local use, or will it eventually be offered to customers?**
   This affects authentication, billing, tenant isolation, deployment, and licensing.

    Answer: Storyworld is intended for private/local use by a small family-based team. It is not currently planned as a customer-facing SaaS product. Initial architecture should prioritize single-tenant/local deployment, basic team authentication and roles, local data ownership, and no billing or public tenant provisioning. Customer distribution can be reconsidered later without implementing that infrastructure now.

2. **Who supplies the OpenRouter and fal.ai API keys?**

   * Each user supplies their own keys.
   * Storyworld supplies managed keys and charges for usage.
   * Support both.

    Answer: Cooper Online Enterprises will supply and manage the OpenRouter and fal.ai API keys. Team members will not provide their own keys, and Storyworld will not support BYOK initially. Usage costs will be paid by the company.

3. **What information is allowed to leave Storyworld and go to AI providers?**
   Should Storyworld use categories such as:

   * Public: may be sent anywhere approved.
   * Private: only approved zero-retention providers.
   * Restricted: never sent to hosted AI.
   * Highly restricted: accessible only to specifically authorized people.

    Answer: Storyworld will use risk-based data classifications. Public content may be sent to approved AI providers. Private content, including ordinary drafts and canon, may be sent through company-managed credentials only to explicitly approved provider/model routes with acceptable retention and training policies. Restricted content, including trade secrets, sensitive personal information, legal/financial material, and unreleased business information, is local-only by default; sending it requires an explicit approved exception and user confirmation. Highly restricted content, including API keys, passwords, tokens, private keys, and other credentials, must never be sent to hosted AI and should be automatically detected, redacted, or blocked.

4. **Should Storyworld choose models automatically?**

   * Automatically select the best approved model.
   * Let the user select from approved models.
   * Use fixed models for important tasks.

   My recommendation: fixed or tightly controlled models for canon, rights, and continuity; flexible routing for brainstorming.

    Answer: Storyworld should support all three model-selection modes. Each task defines its permitted mode:

    * Fixed model/version: for canon, rights, continuity, release, and other authoritative workflows requiring reproducibility.
    * Automatic routing: for brainstorming, exploration, summarization, and other flexible work. The router may choose among approved models based on capability, data classification, cost, latency, and availability.
    * User-selected model: for eligible tasks where users have a preferred model, limited to models approved for that task and data classification.

    Every AI operation should record the provider, model/version, settings, routing decision, and source context. User-selected or automatically routed outputs should remain proposals until accepted through the appropriate review/canon workflow.

5. **May OpenRouter automatically fall back to another model or provider when the preferred one fails?**
   My recommendation: allow fallback for drafting and ideation, but require explicit approved fallbacks—or no fallback—for sensitive and authoritative work.

    Answer: Allow fallback according to task policy, but never silently. Drafting and ideation may use explicitly approved fallback models or providers. Sensitive and authoritative tasks must either use a named approved fallback or fail closed. Whenever fallback occurs, Storyworld must clearly disclose that the preferred route failed and identify the actual model and provider used. The fallback event, reason, settings, and resulting output must be recorded in provenance/audit metadata.

6. **Should fal.ai be allowed to receive real people’s photographs, voices, or likeness references?**
   This affects consent, retention, disclosure, and provider-policy rules.

   Answer: Yes. fal.ai may receive real people’s photographs, voices, or likeness references for approved Storyworld workflows, provided documented consent and usage rights exist for the person and intended use. Storyworld must disclose that likeness data is being sent, use an approved provider/model route, never silently fall back, and support consent records and deletion or revocation. Unconsented, unclear, or specially sensitive material must remain local and be blocked from upload.

7. **Should Storyworld keep every generated or edited file in its own storage?**
   My recommendation: yes. Provider URLs, InvokeAI galleries, and ComfyUI output folders should be temporary transport or workspace locations only.

   Answer: Yes. Storyworld should copy every project asset and meaningful version into its own canonical storage. Provider URLs, InvokeAI galleries, and ComfyUI output folders are temporary transport or workspace locations only. Storyworld should retain the asset’s provenance, source inputs, provider/model, settings, timestamps, and relationships. Transient caches and disposable intermediates may be cleaned up under an explicit retention policy.

8. **Should all external editing use a formal checkout and reimport process?**
   For example:

   * Check out an exact asset version.
   * Edit it in InvokeAI, Krita, Blender, or another tool.
   * Reimport it as a new candidate.
   * Preserve the original.

    My recommendation: require this for production assets, but allow a lighter workflow for ungoverned experimentation.

    Answer: Yes. Formal checkout and reimport is required for production, canon, release, rights, and continuity assets. External edits must start from an exact version, preserve the original, and return as a new candidate with provenance and review status. Ungoverned experimentation may use a lighter workflow, but promotion into production must use the formal process.

    A lighter workflow can remove formal checkout and review requirements without allowing external tools to overwrite production assets:

    1. Create or duplicate an asset into an **Experiment workspace**.
    2. Edit it directly in Krita, Blender, InvokeAI, or another tool—no checkout lock required.
    3. Save iterations back to Storyworld as experiment versions, with basic metadata:
        * source asset/version, if applicable
        * creator and timestamp
        * external tool
        * prompt/settings or source files when available
    4. Allow rapid iteration, replacement, and disposable drafts without affecting canon, release, rights, or continuity.
    5. When an experiment is selected for real use, choose **Promote to candidate**. Storyworld then freezes the selected file, creates a new immutable version, preserves the original, and starts the formal review/reimport path.

    So the distinction is:

    * Experiment: fast, flexible, not authoritative.
    * Candidate/production: traceable, versioned, reviewable, and never silently overwritten.

    Temporary render caches can expire, but any experiment that the team wants to keep should be copied into Storyworld storage rather than relying on an external tool’s gallery or output folder.

## Local creative applications

1. **Which applications should Storyworld officially support in its first mature version?**

   A practical initial set would be:

   * ComfyUI
   * InvokeAI
   * Blender
   * Krita
   * One video editor
   * One audio editor

   Applications such as darktable, Inkscape, MuseScore, and Scribus could follow when their corresponding production types are implemented.

2. **Should Storyworld install and manage these applications, or only connect to applications the user installs?**
    My recommendation: Storyworld should detect, configure, launch, and exchange files with them, but keep them separately installed.

3. **Should advanced users be able to open provider-native controls?**
    Examples include:

    * ComfyUI graphs.
    * Raw fal parameters.
    * OpenRouter model selection.
    * Seeds and samplers.

    My recommendation: hide these in normal workflows and expose them through an advanced operator mode.

4. **Should Storyworld support both ComfyUI workflows and direct fal model endpoints?**
    My recommendation: yes.

    * Direct endpoints for common operations.
    * ComfyUI workflows for complex or reusable pipelines.

## Review and automation

 1. **What may AI do automatically?**

Decide whether AI may:

* Create drafts.
* Create candidates.
* Create continuity findings.
* Reject technically invalid media.
* Block work because of rights or policy.
* Change accepted canon.
* Accept creative work.
* Publish content.

My recommendation: AI may draft, generate, inspect, and create findings. It must never change canon, creatively accept an asset, waive a finding, or publish without human authority.

 1. **Can deterministic failures automatically block work?**
    Examples:

    * Missing license.
    * Expired consent.
    * Corrupted file.
    * Wrong dimensions.
    * Invalid package.

    My recommendation: yes. Interpretive judgments should create findings for human review rather than automatic rejection.

 2. **Should routine generations require confirmation before spending money?**
    Possible rule:

    * Small jobs run immediately within a budget.
    * Expensive jobs require confirmation.
    * Batch jobs always show a cost preview.

 3. **Should Storyworld optimize primarily for quality, cost, speed, privacy, or a configurable balance?**
    This should probably be selectable per production, but a default priority is still needed.

## Publishing and runtime boundaries

 1. **Should Storyworld publish directly to social platforms and websites, or initially create approved export packages only?**
    My recommendation: begin with governed export packages. Add direct publishing one destination at a time.

 2. **Should Storyworld directly submit print jobs, or only produce print-ready packages and proof records?**
    My recommendation: start with print-ready exports and physical-proof approval. Add vendor submission later.

 3. **Which interactive runtime should Storyworld support first, if any?**
    Likely choices:

    * Web-first runtime.
    * Godot.
    * Both eventually.
    * Defer runtime integration until the core media platform is mature.

 4. **Should runtime activity ever change Storyworld canon automatically?**
    My recommendation: no. Runtime events may return observations or proposals, but canon changes require Storyworld review.

## Product and collaboration scope

 1. **Is the first version primarily single-user, family/team, or professional studio software?**
    This determines how much collaboration, assignment, delegation, and concurrent editing must be foundational.

 2. **Must Storyworld continue working when OpenRouter or fal.ai is unavailable?**
    For example, users could still:

    * Write and edit.
    * Manage canon.
    * Review existing assets.
    * Prepare generation jobs.
    * Export packages.

    My recommendation: yes. Hosted AI outages should stop inference, not the entire platform.

 3. **Should Storyworld support customer-managed, fully self-hosted installations?**
    Storyworld can still use OpenRouter and fal.ai while keeping its Engine, database, storage, and creative tools customer-controlled.

 4. **Will Storyworld bundle applications such as ComfyUI and InvokeAI, or provide installers and connection instructions?**
    This requires a licensing and distribution decision. Separate installations are usually safer and easier to replace.

## Most important answers

The five decisions that should be answered before integrations are finalized are:

1. Private product or customer-facing product?
2. User-owned or Storyworld-managed API keys?
3. Which data may be sent to hosted AI?
4. Which local creative applications are officially supported first?
5. Exactly which actions always require a human decision?

Once those five are settled, most remaining integration choices can be finalized without creating major architectural uncertainty.
