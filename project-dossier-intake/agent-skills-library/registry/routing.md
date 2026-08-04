# Skill Routing Guide

Use the smallest applicable chain. Companion skills do not expand authority.

| Route | Common triggers | Primary | Companions | Gates |
|---|---|---|---|---|
| `broad-engineering` | build Storyworld, mixed architecture task, not sure which skill, multi-package change | `storyworld-engineering` | `storyworld-repository-orientation` | current task authority |
| `repository-context` | orient, current state, what exists, resume work, inspect repository | `storyworld-repository-orientation` | — | — |
| `repository-change` | implement, fix, build, modify repository | `storyworld-governed-change` | `storyworld-repository-orientation`, `storyworld-conformance-and-release` | task record, governing decisions |
| `decision-change` | architecture change, authority change, supersede decision, owner direction conflict | `storyworld-decision-impact-analysis` | `storyworld-dossier-intake-maintenance` | accepted decision inventory |
| `dossier-intake` | dossier intake, assessment, impact map, draft decision, owner questionnaire | `storyworld-dossier-intake-maintenance` | `storyworld-decision-impact-analysis`, `storyworld-conformance-and-release` | staged-only boundary |
| `new-contract` | new schema, new contract, package envelope, receipt, public API semantics | `storyworld-contract-authoring` | `storyworld-fixture-authoring`, `storyworld-decision-impact-analysis` | governing decision, two fixture needs or standard mandate |
| `schema-change` | evolve schema, breaking field, enum change, migration, backward compatibility | `storyworld-schema-evolution` | `storyworld-fixture-authoring` | consumer inventory |
| `fixtures` | fixture, golden corpus, mutation, defect injection, recorded provider | `storyworld-fixture-authoring` | — | rights-safe source |
| `poc` | proof of concept, prototype, dependency evaluation, spike | `storyworld-poc-execution` | `storyworld-fixture-authoring`, `storyworld-security-review` | cost ceiling, teardown plan |
| `closure` | validate, close task, release conformance, acceptance criteria | `storyworld-conformance-and-release` | `change-review` | exact revision, validation contract |
| `creative-command` | CreativeCommand, text command, intent interpretation, proposal, partial acceptance | `storyworld-creative-command-implementation` | `storyworld-studio-surface`, `storyworld-evaluation-layer` | DEC-0041 or accepted successor |
| `voice-command` | voice command, microphone, transcription, playhead-aware speech | `storyworld-voice-command` | `storyworld-creative-command-implementation`, `storyworld-security-review` | ephemeral audio and egress policy |
| `cross-media` | cross-media command, whole scene colder, coordinated image video sound | `storyworld-cross-media-command` | `storyworld-creative-direction`, `storyworld-native-media-workspace` | media operation contracts |
| `creative-direction` | Creative Direction, Look, representation style, production design, directorial intent, resolved realization | `storyworld-creative-direction` | `storyworld-contract-authoring`, `storyworld-fixture-authoring` | DEC-0042 or accepted successor |
| `native-media` | image canvas, video workspace, native editing, semantic timeline, professional precision | `storyworld-native-media-workspace` | `storyworld-creative-command-implementation`, `storyworld-studio-surface`, `storyworld-evaluation-layer` | typed operation contract |
| `annotation` | AnnotationTarget, mask, region, time range, shot annotation, graph annotation | `storyworld-annotation-target` | `storyworld-studio-surface` | exact target version |
| `evaluation` | evaluation layer, continuity check, finding, quality check, waiver | `storyworld-evaluation-layer` | `storyworld-fixture-authoring` | authority and blocking classification |
| `studio` | Studio UI, workspace, canvas, timeline, Review Room, accessibility | `storyworld-studio-surface` | `storyworld-ux` | Engine contract and user task |
| `assets` | asset custody, candidate, master, lineage, transformation, retention | `storyworld-asset-custody-and-lineage` | `storyworld-deterministic-media-worker`, `storyworld-rights-and-consent-review` | lifecycle and retention policy |
| `rights` | rights, consent, likeness, voice cloning, expiry, revocation | `storyworld-rights-and-consent-review` | `storyworld-security-review`, `storyworld-evaluation-layer` | recorded permission basis |
| `provider` | OpenRouter, fal.ai, provider adapter, model API, hosted inference | `storyworld-provider-adapter` | `storyworld-security-review`, `storyworld-cost-and-usage-accounting` | egress, credential, cost, capability policy |
| `provider-evaluation` | approve model, model benchmark, provider promotion, endpoint evaluation | `storyworld-provider-model-evaluation` | `storyworld-fixture-authoring`, `storyworld-security-review` | named capability and fixture suite |
| `comfyui` | ComfyUI workflow, custom node, workflow registry, node allowlist | `storyworld-comfyui-workflow` | `storyworld-provider-adapter`, `storyworld-security-review` | no-local-weight posture, node and endpoint allowlists |
| `media-worker` | FFmpeg, OpenImageIO, OpenColorIO, MediaInfo, ClamAV, proxy, thumbnail, transcode | `storyworld-deterministic-media-worker` | `storyworld-security-review` | sandbox and resource limits |
| `external-editor` | Blender, InvokeAI, Kdenlive, Resolve, external checkout, precision tool | `storyworld-external-editor-connector` | `storyworld-asset-custody-and-lineage`, `storyworld-security-review` | exact checkout and untrusted return |
| `otio` | OpenTimelineIO, OTIO, editorial handoff, timeline round trip | `storyworld-otio-editorial-interchange` | `storyworld-external-editor-connector`, `storyworld-fixture-authoring` | pinned profile and loss report |
| `publication` | Astro export, Instagram connector, X connector, TikTok connector, direct publish | `storyworld-publication-connector` | `storyworld-publication-scheduler`, `storyworld-rights-and-consent-review` | exact human authorization, connector activation |
| `scheduler` | publication scheduler, schedule post, publication job | `storyworld-publication-scheduler` | `storyworld-security-review` | PublicationAuthorization |
| `commerce-foundry` | Commerce Foundry, Narrative Campaign, print package, commercial approval | `storyworld-commerce-foundry-bridge` | `storyworld-rights-and-consent-review` | peer authority contract |
| `runtime` | browser runtime, Godot, runtime package, interactive story | `storyworld-runtime-adapter` | `storyworld-evaluation-layer`, `storyworld-security-review` | shared runtime contract, runtime nonauthority |
| `cost` | provider cost, budget, usage accounting, billing, allowance | `storyworld-cost-and-usage-accounting` | `storyworld-provider-adapter` | CostPolicy and credential scope |
| `deployment` | customer-managed, self-host Storyworld, install Storyworld, backup restore | `storyworld-customer-managed-deployment` | `storyworld-security-review`, `storyworld-conformance-and-release` | hosting model and supported platform decision |
| `security` | threat model, credential security, malicious media, webhook security, custom node security | `storyworld-security-review` | — | data flow and trust boundaries |
