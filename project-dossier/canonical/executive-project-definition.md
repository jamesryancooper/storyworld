# Executive Project Definition

> Summary and routing layer. The detailed canonical definition is the
> Storyworld content pack in [`storyworld/`](storyworld/README.md), part
> [01](storyworld/01_executive_context_and_product_direction.md). This file
> does not duplicate its mutable content.

## Project identity

- Name: Storyworld Platform
- Slug: `storyworld-platform`
- Owner: Ryan Cooper (project owner)
- Definition status: canonical content pack v1.0 adopted as target material
  2026-07-28; ratified by the project owner the same day (DEC-0003)

## Problem

Recurring narrative properties (serialized fiction, editorial series, branded
campaigns, interactive worlds) are produced today with disconnected prompting,
editing, file storage, approvals, and compliance. Nothing preserves canon,
continuity, provenance, rights, and exact-version approval across productions,
formats, and channels.

## Intended outcome

An independently deployable **Storyworld Engine** — the governed,
channel-independent system of record and production engine for persistent
fictional worlds, editorial properties, branded narratives, and derived
media — with **Storyworld Studio** as its first-party authoring, production,
review, release, and learning application built entirely on public Engine
contracts.

Two peer systems bound it by contract, never by shared state:

- **Commerce Foundry** — owns product truth, approved claims, commercial
  approval, commerce publication, and revenue attribution.
- **BeKindRewind runtime** — owns rendering, physics, runtime execution,
  player state, saves, and deployment; Storyworld compiles immutable content
  releases for it.

## Scope boundaries

In scope: canon and entity graph, timeline/state, narrative planning,
continuity, generation orchestration through replaceable providers, assets and
provenance, rights and consent, review and release, channel-neutral packaging,
analytics projections. See part 01 sections 2–3.

Out of scope (explicit non-goals, part 01 section 3.3): foundation models, a
Photoshop/Resolve/Blender replacement, a game engine or player-save service, a
commerce catalog/PIM, a generic DAM or social scheduler, an autonomous
publishing agent, a legal-clearance guarantee.

## Audiences

Twelve personas from IP owner through workspace administrator (part 01
section 4.1). The initial external target, gated on commercial evidence, is a
visually led DTC brand or boutique agency producing recurring product-centered
stories.

## Success measures

- Dual-use proof: one BeKindRewind world slice and one Commerce Foundry
  campaign on the same unforked core (GATE-0006).
- Production usefulness, product value, commercial viability, and
  governance/reliability metrics per part
  [08 Appendix C](storyworld/08_appendices.md).
- Standalone SaaS is conditional on the S1 commercial entry gate (part 06
  section 19.14); architectural independence is valuable even if that gate
  never passes.
