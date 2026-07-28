---
title: "Backlog, Validation, Risks, and Final Recommendation"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "07_backlog_validation_risks_and_recommendation"
---

# 21. Implementation backlog by product area

This backlog is ordered by dependency within each area. It is not a timeline or commitment to build every item.

## 21.1 Engine foundation epics

1. Repository, coding standards, ADR process, contract generation, CI, local environment, and preview deployment.
2. Organization, workspace, identity, membership, service principal, and project classification.
3. PostgreSQL transaction and migration layer with row-level security.
4. Object storage, content hashing, immutable asset versions, and derivation graph.
5. Command framework, optimistic concurrency, idempotency, audit receipts, and outbox/inbox.
6. Signed package envelope, deterministic export/import, and verification CLI.
7. Telemetry, correlation, feature flags, backup, and restore.

## 21.2 Canon and narrative epics

1. Source inbox, source classification, extraction proposals, and source-to-canon review.
2. Property, branches, canon releases, facts, rules, terminology, and retcons.
3. Entities, relationships, custom fields, reference packs, and visibility.
4. Fictional timeline, knowledge state, entity state, and transitions.
5. Flexible narrative hierarchy and production lifecycle.
6. Arcs, threads, promises, reveals, missions, dialogue, choices, and dependencies.
7. Scene state packets and impact analysis.
8. Property and production templates.

## 21.3 Media and continuity epics

1. Structured generation recipe and provider capability registry.
2. Temporal workflow, budgets, cancellation, retry, and staging.
3. Text adapter, still-image adapter, and local ComfyUI runner.
4. Candidate ingestion, normalization, preview, and cost telemetry.
5. Deterministic technical and structural validators.
6. Temporal, object-state, reveal, voice, visual-reference, and style findings.
7. Product-fidelity, OCR/logo, placement, claim, and disclosure preflight.
8. Targeted revision, masks/regions, sequence compare, and approval impact.
9. InvokeAI/editor checkout and governed import.
10. Video/audio recipe and provider adapters after still-media gates.

## 21.4 Studio epics

1. App shell, Command Center, property create/import, and source inbox.
2. World Bible, entity library, timeline, relationship graph, state inspector.
3. Style/voice/rights workspace and reference-pack builder.
4. Arc Board, calendar, scene builder, beat/shot/panel editor, and storyboard.
5. Generation Workbench, queue, cost preview, candidate grid, compare, annotate, and revise.
6. Continuity Console and canon-change impact.
7. Review Room, guest review, exact-version decision, and approval receipts.
8. Release Builder, target previews, packages, integration status, and receipts.
9. Collaboration, assignments, activity, branch proposals, client workspace.
10. Insights, experiments, administration, usage, and billing.

## 21.5 Commerce Foundry epics

1. Shared glossary, authority ADRs, correlation, and identity handshake.
2. Campaign brief and product/claim snapshot contracts.
3. Storyworld campaign import and status.
4. Placement contract and product-fidelity reference set.
5. Narrative asset bundle and verification.
6. Native Narrative Campaigns surface and contextual Studio handoff.
7. Focused CF review component and typed finding round trip.
8. Source-change/stale-dependency workflow.
9. Commercial approval, publication authorization, and receipt.
10. Commerce observation return and narrative projection.
11. Reconciliation, support evidence, and cross-system audit.

## 21.6 BeKindRewind epics

1. Interactive property vocabulary and runtime target contract.
2. Locations, spatial references, NPCs, items, dialogue, missions, triggers, preconditions, and effects.
3. Runtime package schema, checksums, signatures, and validation.
4. PlayCanvas or selected runtime importer/compiler.
5. Preview deployment and acceptance receipt.
6. Aggregate telemetry and content-error observation.
7. Hotfix reconciliation.
8. Derivative promotional-media workflow from approved world content.

## 21.7 Release and analytics epics

1. Channel-neutral release master.
2. Instagram carousel rendition and manual export.
3. Story/Reel production plan and subtitle/accessibility metadata.
4. Web/email package.
5. Optional publication adapter and secret isolation.
6. Publication receipts and reconciliation.
7. Normalized observation schema and mappings.
8. Narrative-level projection.
9. Hypothesis, experiment, variant, result, and reviewed proposal.

# 22. Validation and commercialization plan

## 22.1 Internal proof sequence

Run the same platform through materially different work:

1. **Stillhouse Archive mini-season** — encode hidden truth, a reveal graph, symbol continuity, and a representative serialized sequence.
2. **Editorial carousel sequence** — preserve a stable voice and recurring metaphor while demonstrating privacy and dignity review.
3. **Commerce Foundry campaign** — produce a pinned three-episode product story with natural placement, rejection/revision, final approval, and performance return.
4. **BeKindRewind world slice** — compile locations, characters, objects, one mission chain, dialogue, sound intent, and runtime metadata.
5. **Recurring short video storyboard** — test object-state transitions and multi-shot continuity before investing in production video.

A common kernel should emerge. Property-specific needs stay in templates or target adapters.

## 22.2 External demand validation

- Conduct problem interviews with visually led DTC brands, boutique agencies, serialized character-IP creators, and interactive developers.
- Offer a paid concierge campaign using the proposed workflow while manual production hides unfinished automation.
- Show exact-version review, continuity reports, focused revision, and portable delivery—not generic AI generation demos.
- Test whether teams will provide approved product data and participate in a structured review.
- Measure second-production intent and actual repeat behavior.
- Test pricing as a base platform fee plus generation.
- Track support burden and margin after provider cost.

## 22.3 Standalone-market decision

Launch public Storyworld Studio only if:

- External users complete real projects, return, and pay.
- A substantial share of use does not depend on Commerce Foundry.
- At least two non-commerce segments use the same core without customization becoming services work.
- Users name canon, continuity, governed review, reuse, or runtime/commerce integration—not “AI images”—as the reason to buy.
- Support, generation cost, and acquisition economics are credible.

If these conditions do not appear, Storyworld remains valuable as:

- A Stavium internal media and storyworld platform.
- Commerce Foundry’s independently bounded narrative capability.
- The content-authoring and release source for BeKindRewind.
- Reusable infrastructure for owned media properties.

# 23. Risks and mitigations

| Risk | Severity | Early signal | Mitigation / decision response |
|---|---|---|---|
| Scope expansion into a universal creative suite | Critical | Each property adds unrelated tools or mandatory fields | Enforce non-goals; templates/extensions; phase gates; one vertical slice at a time |
| Overgeneralized story schema | Critical | Frequent custom forks or unusable generic entities | Test four distinct fixtures before freezing; keep flexible hierarchy but typed core; split only after evidence |
| Duplicate control planes with Commerce Foundry | Critical | Shared tables, dual approvals, competing asset masters | Authority matrix, separate databases, signed bundles, receiving-system approval, cross-system audit |
| Game-runtime leakage | High | Player saves, physics, renderer, or runtime scripts enter Engine tables | Runtime compiler boundary; Storyworld stores authored preconditions/effects, not execution state |
| Continuity capability underperforms expectations | High | High manual correction or identity drift | Expose confidence; improve reference packs and targeted edits; narrow supported formats; never promise perfect automation |
| Generic tools erase differentiation | High | Users mainly value captions or images | Validate paid need for canon/continuity/review; stop or narrow if generic generation dominates |
| Provider and model dependency | High | Quality or rights change breaks workflows | Provider-neutral recipes, adapters, portable sources, evaluation harness, explicit fallback policy |
| Social-platform dependency | High | API, rate-limit, or policy change blocks delivery | Manual export, channel-neutral masters, independently versioned adapters |
| Video cost and quality | High | Unit costs or revision burden exceed value | Delay until still-media gates; storyboard/export to specialist tools; meter usage |
| Rights, likeness, trademark, or disclosure failure | Critical | Missing evidence or use outside license | Rights model, blocking gates, expiry propagation, human review, no legal-certainty claims |
| Sensitive source leakage | Critical | Private material enters prompts or public canon | Restricted inbox, classification, provider policy, consent and dignity review, no cross-property reuse |
| Uncontrolled generation spend | High | Retries, video, or variants consume budget | Per-job preview, quotas, tenant ceilings, cancellation, fallback approval, cost per accepted output |
| User complexity | High | Creators cannot tell canon from candidates or approvals | Progressive disclosure, modes/templates, unmistakable states, focused Review Room, usability tests |
| Operational sprawl | Medium–High | Too many services/connectors before real usage | Modular monolith, outbox/webhooks, extract only on measured pressure |
| Analytics overclaim | Medium–High | Small samples produce confident recommendations | Preserve source definitions, show uncertainty, reviewed proposals, opt-out |
| SaaS launched before demand | High | Low repeat use and services-heavy onboarding | Commercial gate; keep internal/CF value; concierge validation first |

# 24. Decision checkpoints

| Checkpoint | Continue when | Narrow, branch, or stop when |
|---|---|---|
| After F3 | Representative properties fit the model and portable round trip works | Genre-specific forks are required before media generation |
| After B1–B4 | Continuity and workflow savings exceed generic-tool coordination | Value is predominantly generic generation |
| After V1 | Commerce and BeKindRewind share the core without contamination | Split higher-level products and retain only genuinely shared low-level packages |
| After C1 pilots | Campaigns are published, repeated, easier to approve, and commercially useful | Keep narrative generation narrow or remove it from CF |
| Before production video | Still workflows are reliable and explicit video quality/cost gates pass | Continue with storyboards and external video tooling |
| Before direct publishing | Export is stable and users need operational automation enough to justify API risk | Remain export-first |
| Before standalone SaaS | Repeat paid non-commerce demand meets S1 gates | Remain internal platform and CF add-on |
| Before adaptive media | Consented data, demand, and ethical controls exist | Keep analytics descriptive and human-directed |
| Before microservices | Measured scale, security, failure isolation, or team boundary exists | Preserve modular monolith |

# 25. Final implementation recommendation

Build **Storyworld Engine first as an independently deployable modular monolith**, with **Storyworld Studio as its first-party client** and **Commerce Foundry as a deeply integrated peer authority**.

The first implementation sequence is:

1. Lock authority, vocabulary, schemas, state machines, packages, and non-goals.
2. Establish identity, immutable versions, provenance, rights, audit, portability, and durable workflow.
3. Implement the headless canon, state, narrative, review, and package kernel.
4. Build media orchestration, Studio, integration, and evaluation in parallel.
5. Converge them in a dual-use alpha: one BeKindRewind world slice and one Commerce Foundry product-story campaign.
6. Promote the Commerce Foundry integration only after the full rejection/revision/publish/measure loop works.
7. Add Instagram-first renditions, owned-media adapters, runtime compilation, operational maturity, and governed learning in dependency order.
8. Open a standalone SaaS business only after repeat external demand earns it.

The cleanest boundary is:

- **Storyworld owns narrative truth and master narrative media.**
- **Storyworld Studio owns the human experience, not separate data.**
- **Commerce Foundry owns product truth, commercial approval, commerce publication, and revenue attribution.**
- **BeKindRewind owns runtime execution and player state.**
- **Octon governs agent missions; Harmony defines policy; neither becomes a business database.**
- **Providers and creative tools execute scoped work and return candidates.**

The first artifact to create after this dossier is not a large codebase. It is an F0/F1 contract pack containing the authority ADRs, canonical schemas, lifecycle state machines, package envelopes, golden fixtures, and acceptance tests. That pack makes every later implementation decision faster, safer, and reversible.
