---
title: "Storyworld Platform Markdown Dossier"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
---

# Storyworld Platform Dossier

> Canonical content pack (intended-state material). Placed under
> `project-dossier/canonical/storyworld/` on 2026-07-28 as part of the
> blueprint dossier adoption; the surrounding structure is described in
> [`../../README.md`](../../README.md). Documentation only — not an
> instruction or permission channel.

This package is the Markdown edition of the complete Storyworld Engine and Storyworld Studio project dossier. It preserves the mature product definition, deep Commerce Foundry integration, BeKindRewind boundary, dependency-gated implementation plan, and supporting architecture decisions.

## Architectural verdict

- **Storyworld Engine** is an independently deployable, channel-independent narrative authority with its own API and database.
- **Storyworld Studio** is the first-party authoring, production, review, release, and learning application. It does not own a second copy of project state.
- **Commerce Foundry** is a deeply integrated peer authority and first-party client. It owns product truth, commercial compliance, commerce publication, and revenue attribution.
- **BeKindRewind** consumes signed runtime-content releases while retaining rendering, physics, runtime execution, player state, saves, and deployment.
- The implementation begins as a **modular monolith plus asynchronous workers**. Service extraction and standalone SaaS commercialization occur only when explicit evidence gates are met.

## Reading options

- Read the modular files below when working on a specific product or implementation area. They are the maintained edit source.
- The original consolidated single-file edition is retained, noncurrent, at
  [`../../history/storyworld-dossier-v1.0-consolidated/`](../../history/storyworld-dossier-v1.0-consolidated/README.md)
  (supersession record SUP-0001).

## Modular file map

| File | Scope |
|---|---|
| [Executive Context and Product Direction](01_executive_context_and_product_direction.md) | Verdict, recovered context, canonical product family, governing principles, users, and authority boundaries. |
| [Storyworld Engine, Studio, and Templates](02_engine_studio_and_templates.md) | Mature Engine capabilities, complete Studio experience, roles, workflows, lifecycle, collaboration, and reusable property templates. |
| [Domain Architecture and Media Pipeline](03_domain_architecture_and_media_pipeline.md) | Canonical domain model, implementation shape, technology stack, generation orchestration, continuity, evaluation, and revision. |
| [Commerce Foundry, BeKindRewind, Channels, and Contracts](04_foundry_rewind_channels_and_contracts.md) | Deep Commerce Foundry integration, BeKindRewind runtime boundary, channel strategy, publishing, analytics, APIs, events, and packages. |
| [Governance, Operations, and Quality](05_governance_operations_and_quality.md) | Identity, permissions, agent capabilities, rights, privacy, security, operations, reliability, administration, testing, and acceptance. |
| [MVP, Dependency Roadmap, and Vertical Slices](06_mvp_dependency_roadmap_and_vertical_slices.md) | Smallest useful MVP, dependency-gated phases, parallel workstreams, exit criteria, critical vertical slices, and ownership matrix. |
| [Backlog, Validation, Risks, and Final Recommendation](07_backlog_validation_risks_and_recommendation.md) | Implementation epics, definitions of ready and done, validation and commercialization gates, risks, checkpoints, and final decision. |
| [Appendices](08_appendices.md) | Initial architecture decisions, contract artifacts, success metrics, and glossary. |

## Diagrams

- [Storyworld platform boundary](assets/storyworld_architecture.png)
- [Dependency-based delivery roadmap](assets/storyworld_roadmap.png)

## Source and status note

The dossier consolidates the current conversation, accessible saved personal and project context, the integrated project profile, and available workspace artifacts. A literal raw transcript of every historical chat was not exposed. Implementation status is therefore claimed only where an accessible artifact or runnable system could be verified.

## Recommended first artifact

Before building a large codebase, produce the F0/F1 contract pack: authority ADRs, canonical schemas, lifecycle state machines, package envelopes, golden fixtures, and acceptance tests. That contract pack is the dependency for the governed foundation and every later vertical slice.
