# Source and Evidence Register

## Repository evidence

All repository evidence was inspected at commit `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565` unless stated otherwise.

| ID | Source | Evidence used |
|---|---|---|
| R-001 | `project-dossier/AUTHORITY.md` | Authority precedence and conflict-handling rules. |
| R-002 | Root `README.md` | Accepted V1 alpha scope, implemented packages, reserved crossings, and current limitations. |
| R-003 | `project-dossier/canonical/storyworld/01_executive_context_and_product_direction.md` | Accepted product definition, non-goals, audience tiers, Storyworld/Commerce Foundry/runtime boundaries. |
| R-004 | `.agent/decisions/DEC-0012-b-phase-execution-authorization.md` | Hosted-API-only generation, no local weights, fal-first adapter, InvokeAI and ComfyUI posture. |
| R-005 | `.agent/decisions/DEC-0015-b3-gate-staged.md` | Commerce/runtime/Instagram integration substrate and Instagram-first export sequence. |
| R-006 | `.agent/decisions/DEC-0017-v1-consolidated-review.md` | Accepted V1 alpha and all B1–B4 boundary evidence. |
| R-007 | `.agent/decisions/DEC-0021-human-authority-enforcement.md` | Current `property_owner`-only acceptance-class command enforcement. |
| R-008 | `.agent/decisions/DEC-0028-graph-canvas-semantics.md` | Proposed, not accepted, narrative-flow graph semantics. |
| R-009 | `.agent/state/current.json` | Accepted decisions through DEC-0027, no active task, reserved provider crossing, DEC-0028 owner gate. |
| R-010 | `packages/contracts/adr/ADR-0015-provider-neutral-recipes-canonical.md` | Provider-neutral recipe authority; prompts, seeds, models, LoRAs, and provider workflows are derivatives. |
| R-011 | `packages/contracts/schemas/generation-recipe.schema.json` | Intended structured recipe contract. |
| R-012 | `packages/providers/src/recipe.ts` and `types.ts` | Current alpha prompt/negative-prompt/seed normalization discrepancy. |
| R-013 | `apps/studio/src/components/generation-workbench.tsx` | Current prompt-, seed-, and provider-centered generation interface. |
| R-014 | `packages/providers/src/fal-adapter.ts`, `generation.ts`, `catalog.ts` | Current narrow still-image fal adapter, custody, and cost handling. |
| R-015 | `packages/workflows/src/workflows.ts` and `activities.ts` | Current Temporal generation workflow, retries, and credential resolution. |
| R-016 | `packages/credentials/src/slots.ts` | Current fal-only credential slot. |
| R-017 | `packages/contracts/lifecycles/media-artifacts.lifecycle.json` | Accepted media-artifact lifecycle and authority-host gates. |
| R-018 | `packages/contracts/charter/authority-matrix.json` | Accepted system-of-authority boundaries. |
| R-019 | `packages/contracts/charter/sensitivity-and-rights-classifications.json` | Accepted resource-access and rights classifications. |
| R-020 | `packages/evaluation/src/evaluate.ts`, `deterministic.ts`, `model-assisted.ts` | Existing evaluation layers and human-only disposition. |
| R-021 | `packages/regression/src/defects.ts` and regression fixtures | Current defect-injection scope and recorded-provider replay. |
| R-022 | `packages/channel-instagram/src/adapter.ts` | Existing export-only Instagram rendition/package adapter. |
| R-023 | `packages/runtime-compiler/src/compiler.ts` | Existing deterministic runtime package compilation and non-canon hotfix reconciliation. |
| R-024 | `packages/commerce-connector/src/connector.ts` | Existing immutable Commerce Foundry brief/bundle/receipt and source-drift handling. |
| R-025 | `packages/contracts/openapi/storyworld.openapi.json` | Contract-first API conventions and remaining generic payload shapes. |
| R-026 | `project-dossier-intake/readme.md` | Intake staging lifecycle, manifest, owner gate, and artifact inventory. |
| R-027 | `project-dossier-intake/canonical-impact-map.md` | Current limited v1.1 impact map. |
| R-028 | `project-dossier-intake/draft-decisions/dec-0031-art-style-definitions.md` | Proposed art-style object requiring narrowing. |
| R-029 | `project-dossier-intake/draft-decisions/dec-0032-export-adaptors.md` | Proposed export/print model requiring amendment. |
| R-030 | `project-dossier-intake/draft-decisions/dec-0033-production-design-look-system.md` | Proposed monolithic Look and existing amendment input. |
| R-031 | `project-dossier-intake/platform-capabilities/production-design.md` | Current production-design, emotional mapping, and cascade proposal. |
| R-032 | `project-dossier-intake/assessments/technical-enablement/*` | Enabling stack, missing substrates, and disposable POC program. |
| R-033 | `project-dossier-intake/assessments/reference-library.md` | Book-research synthesis and read-before-deciding sequence. |
| R-034 | `project-dossier-intake/owner-input/storyworld-owner-decision-questionnaire.md` | Existing unanswered broad workbook, to remain separate from the completed integration questionnaire. |
| R-035 | Current assignment’s completed owner questionnaire | Binding owner-direction evidence for this synthesis; preserved verbatim in this package. |

## External primary sources assessed on 2026-08-01

| ID | Official source | Relevance |
|---|---|---|
| E-001 | OpenRouter Provider Routing documentation | Provider order, fallback, parameter requirements, data-collection filtering, and per-request ZDR. |
| E-002 | OpenRouter Zero Data Retention and FAQ | Endpoint-specific retention policy, OpenRouter prompt-logging default, and caching qualification. |
| E-003 | OpenRouter Structured Outputs and Tool Calling | JSON-Schema outputs and model-proposed—not directly executed—tool calls. |
| E-004 | OpenRouter Usage Accounting | Response-level token, cost, and cache accounting. |
| E-005 | fal Asynchronous Inference, Reliability, and Webhook documentation | Queue states, retries, cancellation, polling, webhook delivery, and late completion. |
| E-006 | fal Data Retention, CDN, and Platform Headers documentation | `X-Fal-Store-IO`, public CDN URLs, expiration, retry, and storage controls. |
| E-007 | ComfyUI official documentation and Registry security standards | Local API, workflow/node model, immutable registry versions, and custom-node execution risk. |
| E-008 | OpenTimelineIO official repository and adapter documentation | Mature editorial interchange, rational time, media references, adapter loss, and plugin separation. |
| E-009 | Kdenlive 26.04 manual | OTIO import/export capabilities and marker/resolution mismatches. |
| E-010 | Blackmagic Design DaVinci Resolve 21 and official release material | Integrated edit/color/Fusion/Fairlight environment, OTIO support, local/private project-server option, and comparison workflows. |
| E-011 | Astro official content-collection documentation | Typed build-time content collections and static output. |
| E-012 | Godot stable documentation | glTF import/export and extension points for runtime adapters. |
| E-013 | X API official media and Post documentation | Media upload, processing, and Post creation. |
| E-014 | TikTok Content Posting API and developer guidelines | Direct Post/draft upload, audits, creator UX requirements, and restrictions on private/internal utilities. |
| E-015 | Meta’s official Instagram Postman collection and living Instagram platform research | Container-then-publish workflow; exact limits and permissions must remain dated external research records. |

## Evidence limitations

- The GitHub connector exposed no live combined-status checks for the assessed commit. Repository-recorded validation evidence was inspected, but this assessment did not independently rerun CI or local validation because no local clone was available.
- External policies, provider behavior, social-platform APIs, pricing, and retention terms are mutable. They must enter Storyworld as dated research and provider-policy records, not permanent unversioned assumptions.
- Book research supplies concepts and professional vocabulary, not automatic platform authority.
