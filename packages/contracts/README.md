# Storyworld Contracts Workspace

Home of the **F0/F1 contract pack** — the first build artifact of the
Storyworld platform (canonical basis:
`project-dossier/canonical/storyworld/08_appendices.md` Appendix B;
exit gates GATE-0002/GATE-0003). This directory sits at the
`packages/contracts/` position of the target monorepo shape
(`03_domain_architecture_and_media_pipeline.md` §9.1) so later phases
inherit it in place.

Nothing here is implementation. Contracts are proposals until their gate
evaluation and owner acceptance; this workspace never grants authority.

## Layout and Appendix B mapping

| Path | Holds | Appendix B artifacts |
|---|---|---|
| `adr/` | Product architecture decision records (F0) | ADR-0001..0016 (accepted via DEC-0006) |
| `schemas/` | JSON Schemas for canonical records and packages | `common-package-envelope`, `narrative-campaign-brief`, `narrative-asset-bundle`, `runtime-content-release`, `canon-release`, `scene-state-packet`, `generation-recipe`, `continuity-finding`, `rights-evidence`, `approval-receipt`, `performance-observation` (`*.schema.json`) |
| `openapi/` | Public application API contract | `storyworld.openapi.json` (strict-JSON authoring; see DESIGN_NOTES) |
| `events/` | Event catalog and envelopes | `storyworld-events.asyncapi.json` + `cloudevents-envelope.schema.json` |
| `lifecycles/` | Lifecycle state machines (canon, media, reviews, connected commerce) | state-machine definitions per `02_engine_studio_and_templates.md` §6.4 |
| `fixtures/` | Golden fixture packages, probes, registry | four F1 fixtures, eight probes, `registry.json` (31 fixtures) |
| `tests/` | Contract validation: round-trip, compatibility, signature, idempotency | acceptance tests |
| `sdk/` | TypeScript SDK generation configuration (later F1) | SDK generation config |

## Conventions

- Toolchain: `DEC-0005`, **accepted 2026-07-28** (JSON Schema 2020-12,
  OpenAPI 3.1, AsyncAPI 3/CloudEvents 1.0, strict JSON, stdlib Python
  round-trip validator first; TypeScript generation when SDK work starts).
- Strict JSON for machine-readable contracts; YAML only where the format
  demands it (OpenAPI/AsyncAPI) with a pinned parser in the validator.
- Every schema declares `$id`, a semantic version, and compatibility rules
  per `04_foundry_rewind_channels_and_contracts.md` §14.5 (additive within a
  major; breaking changes get a new major plus a dual-read window).
- Fixtures are rights-safe, owner-supplied content (PLAN-0007); no real
  personal data, credentials, or third-party IP.
- When the first validator lands in `tests/`, wire it into
  `.agent/project.json` `commands.project_test` and CI in the same change.

## Relationship to harness decisions

Product ADRs in `adr/` are contract-pack *content* with their own
`ADR-####` identity and status lines. They become authoritative through the
F0 gate evaluation and an umbrella harness decision (a future `DEC-####`
in `.agent/decisions/` accepting the ADR set) — never by merely existing
here. `adr/README.md` carries the details.
