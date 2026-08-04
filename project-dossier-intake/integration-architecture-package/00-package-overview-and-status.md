# Storyworld integration architecture package

I assessed Storyworld at `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`. The repository confirms that the current V1 alpha has a strong authority foundation—Engine-owned state, exact-version acceptance, Temporal workflows, content-addressed custody, human-only acceptance commands, and bounded Commerce Foundry, runtime, and Instagram integrations—but it does not yet implement the newly confirmed intent-driven product model.

The substantive architecture report is complete. Its central conclusion is:

> **Storyworld should own creative intent, typed operations, exact versions, custody, evaluation, and human decisions. OpenRouter, fal.ai, ComfyUI, and precision applications provide bounded execution mechanics only.**

The resulting architecture establishes:

* Text and voice as the primary controls.
* A five-layer progressive-control model.
* Native image and video generation and editing.
* AI-mediated professional precision without requiring provider-native controls.
* A compositional Creative Direction system and derived `ResolvedRealizationSpec`.
* Strict separation between canonical `GenerationRecipe` and noncanonical `ProviderExecutionPlan`.
* OpenRouter task profiles and fal queue/custody architecture.
* Self-hosted ComfyUI as an operator-only workflow system.
* Optional Blender, InvokeAI, Kdenlive, and Resolve precision round trips.
* Provider-egress, credential, retention, and cost policies.
* Exact human authority and consequence classes.
* Astro-first delivery, publication scheduling, Commerce Foundry handoff, and shared browser/Godot runtime contracts.
* A 53-contract backlog, 13 disposable POCs, and a 26-phase dependency roadmap.

The report also identifies the most important current conformance problem: ADR-0015 and the formal recipe schema correctly make the structured provider-neutral recipe canonical, while the current compiler and Generation Workbench still place prompts, negative prompts, seeds, provider selection, and model selection in the recipe-shaped authoring path. That should be treated as bounded alpha debt and corrected before expanding native media production.

OpenRouter’s current official API supports the routing, ZDR, data-collection, strict structured-output, tool-call, and usage-accounting controls required by the proposed provider profiles. Models propose tool calls; Storyworld remains responsible for validating and executing them. ([OpenRouter][1])

fal’s current queue supports persistent asynchronous requests, polling, webhooks, cancellation, retry controls, and late completion behavior. Its media URLs are publicly accessible, request payloads are retained by default unless `X-Fal-Store-IO: 0` is used, and media expiration is separately configurable. Those facts directly support the recommended immediate-download, short-expiry, deduplicated-callback, and late-result-quarantine design. ([Fal.ai][2])

## Completed files

* [Definitive 45-section architecture report](sandbox:/mnt/data/storyworld-final-integration-architecture/01-definitive-architecture-report.md)
* [Current-state and conflict register](sandbox:/mnt/data/storyworld-final-integration-architecture/02-current-state-and-conflict-register.md)
* [Decision amendment and successor plan](sandbox:/mnt/data/storyworld-final-integration-architecture/03-decision-successor-plan.md)
* [Contract and schema backlog](sandbox:/mnt/data/storyworld-final-integration-architecture/04-contract-and-schema-backlog.md)
* [Machine-readable contract register](sandbox:/mnt/data/storyworld-final-integration-architecture/04-contract-and-schema-backlog.json)
* [Dependency-ordered proof-of-concept program](sandbox:/mnt/data/storyworld-final-integration-architecture/05-proof-of-concept-program.md)
* [Dependency-ordered implementation roadmap](sandbox:/mnt/data/storyworld-final-integration-architecture/06-dependency-ordered-roadmap.md)
* [Dossier-intake expansion plan](sandbox:/mnt/data/storyworld-final-integration-architecture/07-dossier-intake-expansion-plan.md)
* [Source and evidence register](sandbox:/mnt/data/storyworld-final-integration-architecture/10-source-and-evidence-register.md)
* [Package overview](sandbox:/mnt/data/storyworld-final-integration-architecture/README.md)

## Important decision conclusions

### Accepted authority to preserve

The report preserves:

* Engine-owned authority.
* Temporal as the durable business orchestrator.
* Immutable exact-version decisions.
* Human-only canon, master, waiver, and publication authority.
* Provider-neutral recipes.
* Content-addressed asset custody.
* Commerce Foundry and runtime systems as separate authority hosts.
* Hosted-API generation with no local model weights under the current accepted posture.

The current `property_owner`-only acceptance boundary remains controlling until a future scoped-role successor is accepted.

### Decisions requiring successors

The report proposes grouped successors rather than dozens of isolated decisions:

1. Intent-driven product and small-team boundary.
2. Creative commands, proposals, consequence classes, and revisions.
3. Compositional Creative Direction and resolved realization.
4. Provider-neutral execution separation and capability gateway.
5. Provider egress, credentials, retention, routing, and cost.
6. Self-hosted ComfyUI workflow registry and security.
7. Native media editing and AI-mediated professional precision.
8. External precision tools, annotations, checkout/return, and OTIO.
9. Deterministic media worker and expanded custody.
10. Professional creative evaluation and fixtures.
11. Astro-first delivery and publication scheduling.
12. Commerce Foundry commercial and print boundary.
13. Shared browser/Godot runtime and runtime nonauthority.
14. Mature small-team roles, deferred until collaboration work is authorized.

Draft DEC-0031 and DEC-0033 should be **replaced**, not accepted unchanged. DEC-0032 should be substantially amended. DEC-0012 should retain its hosted-API/no-local-weight boundary but receive a successor that repositions InvokeAI and ComfyUI. DEC-0015 and DEC-0017 remain historical alpha authority but require a delivery-priority successor for Astro-first export.

### Remaining owner decisions

Only two material owner decisions remain:

1. **Credential scope for the first private team**

   * One workspace-admin OpenRouter/fal credential set.
   * Separate credentials per member.
   * Hybrid.

   The recommended initial default is one workspace-admin credential set, with Storyworld-level per-member permissions, cost attribution, and budgets. The contracts should allow member-specific credentials later.

2. **Mature hosting model**

   * Customer-managed installations only.
   * Storyworld-hosted service only.
   * Both.

   The recommended direction is both in sequence: customer-managed/private deployment first, with an optional hosted service for eligible small teams later.

## Incomplete source-evidence packaging

The following requested packaging work is **not yet complete**:

* The completed owner questionnaire has not yet been copied into a standalone verbatim artifact.
* The 41-answer owner-decision crosswalk has not yet been emitted as its own file.
* The machine-readable overall architecture register has not yet been emitted.
* A final SHA-256 package manifest and ZIP archive have not yet been produced.
* The generated files have not been incorporated into the repository or passed through the repository’s validation commands.

No repository files were changed, no decisions were marked accepted, no provider credentials were used, and no live integrations or publication actions were activated. The GitHub connector exposed no live combined-status checks for the assessed commit, so this report does not claim to have independently rerun typecheck, tests, lint, contract validation, or CI. The repository’s own current-state record still describes provider calls as a reserved crossing.

[1]: https://openrouter.ai/docs/guides/routing/provider-selection "https://openrouter.ai/docs/guides/routing/provider-selection"
[2]: https://fal.ai/docs/documentation/model-apis/inference/queue "https://fal.ai/docs/documentation/model-apis/inference/queue"
