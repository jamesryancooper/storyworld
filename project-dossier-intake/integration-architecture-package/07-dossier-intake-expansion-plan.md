# Dossier-Intake Expansion Plan

**Goal:** incorporate the final owner direction and architecture without bypassing the existing staged-intake lifecycle.

## 1. Evidence artifacts to add

| Proposed path | Class | Status | Purpose | Gating decision | Canonical destination | Archive handling |
|---|---|---|---|---|---|---|
| `project-dossier-intake/evidence/owner-input/completed-integration-architecture-questionnaire.md` | Owner direction | Confirmed evidence, not canonical | Preserve completed questionnaire verbatim. | All successors | Decision evidence | Permanent archive after disposition |
| `project-dossier-intake/evidence/conversations/intent-driven-creative-production-direction.md` | Conversation evidence | Staged evidence | Preserve relevant conversation synthesis and context. | DEC-0040/0041/0046 | Research/decision evidence | Archive |
| `project-dossier-intake/evidence/external-research/provider-and-tool-primary-sources.md` | Mutable external research | Dated research | OpenRouter, fal, ComfyUI, OTIO, Kdenlive, Resolve, Astro, Godot, social APIs. | DEC-0043–0052 | `project-dossier/research/` records | Refresh periodically |
| `project-dossier-intake/evidence/open-source-research/` | S1R technical research | Staged | Register the previously produced open-source report and repository registers. | Multiple | Research and dependency register | Archive after integration |

Do not overwrite `owner-input/storyworld-owner-decision-questionnaire.md`. It is a broader unanswered workbook and may still contain unrelated decisions. Link the completed integration questionnaire as a separate owner-evidence artifact.

## 2. Assessments to create

| Proposed path | Purpose | Primary outputs |
|---|---|---|
| `assessments/final-integration-architecture.md` | Definitive architecture reconciliation | System boundaries, diagrams, conflicts, successor map |
| `assessments/intent-driven-creative-production.md` | Product and interaction model | Text/voice primacy, five control layers, native/external boundary |
| `assessments/native-professional-precision.md` | Precision viability | Semantic masks, exact frames, curves, tracking, color/audio controls |
| `assessments/provider-and-external-tool-architecture.md` | Execution and precision systems | OpenRouter, fal, ComfyUI, Blender, InvokeAI, Kdenlive, Resolve |
| `assessments/provider-egress-credentials-retention-cost.md` | Governance | Egress mapping, BYOK, credential scope, budgets, retention |
| `assessments/publishing-and-scheduling.md` | Delivery | Astro-first, channel packages, authorization, scheduler, connectors |
| `assessments/commerce-foundry-boundary.md` | Peer authority | Campaign/print packages, commercial review, vendor/order receipts |
| `assessments/browser-and-godot-runtime.md` | Runtime | Shared package, adapters, state separation, receipts |
| `assessments/poc-and-implementation-program.md` | Delivery plan | POCs, dependency roadmap, gates, acceptance criteria |
| `assessments/current-state-discrepancy-report.md` | Conformance | Recipe/compiler/UI mismatch and all other current/target deltas |

## 3. Draft decisions to add or replace

Use the grouped plan in `03-decision-successor-plan.md`.

### Replace

- `draft-decisions/dec-0031-art-style-definitions.md`
- `draft-decisions/dec-0033-production-design-look-system.md`

Preserve the original drafts in history/evidence; do not erase them.

### Amend

- `draft-decisions/dec-0032-export-adaptors.md`
- `draft-decisions/dec-0034-pattern-completeness.md` if cross-media/runtime semantics change its pattern definitions.
- `draft-decisions/dec-0035-children-audience-compliance.md` to reference egress/voice/real-person gates where relevant.
- `draft-decisions/dec-0036-ip-authorship-transparency.md` to reference provider records and AI operation lineage.
- `draft-decisions/dec-0037-source-material-ingestion.md` to map provider egress and real-person consent.

### Add provisional DEC-0040 through DEC-0053

Add only after confirming numbering against the current decision register. Each decision must name superseded accepted/draft records explicitly.

## 4. Canonical impact-map replacement

Replace the current limited impact map with a chapter-by-chapter map covering:

### Canonical product direction

- Intent-driven thesis.
- Small-team boundary.
- Native editing versus universal professional-tool non-goal.
- Hosted-provider/no-local-weight posture.

### Engine and Studio

- Creative-command module.
- Creative-system and resolved-realization module.
- Provider-policy and cost modules.
- Native image/video/editorial workspaces.
- Voice and Advanced Operator Mode.

### Domain/media pipeline

- Recipe/execution separation.
- Deterministic worker.
- Provider queue and custody.
- External checkout/return.
- Annotation, evaluation, and asset lifecycle extensions.

### Integrations

- OpenRouter/fal/ComfyUI.
- Blender/InvokeAI/Kdenlive/Resolve.
- OTIO and other interchange profiles.
- Astro/social delivery.
- Commerce Foundry.
- Browser/Godot.

### Governance

- Egress mapping.
- Credentials and budgets.
- Human authority and mature role successor.
- Real-person consent.
- Publication authorization.

### Roadmap/backlog/risks

- POCs.
- Contract waves.
- Dependency phases.
- Provider/tool/policy drift.
- Accessibility, security, licensing, and operational risks.

### Appendices/glossary

Add definitions for command, interpretation, plan, operation, proposal, revision, consequence, resolved realization, provider execution, egress decision, external workfile, publication authorization, and runtime receipt.

## 5. Intake manifest amendment

For every new artifact, record:

- Relative path.
- Artifact class.
- Status.
- Source/evidence classification.
- Dependencies.
- Gating decision.
- Intended canonical destination.
- Whether it supersedes another intake artifact.
- Required validation.
- Archive disposition.

Update the manifest owner gate from “questionnaire awaiting answers” to:

- Completed integration questionnaire received.
- Two owner decisions remain open: credential scope and hosted offering.
- Broad original owner questionnaire remains separately incomplete.

## 6. Contract backlog artifacts

Add:

- `plans/intent-driven-contract-backlog.md`
- `plans/intent-driven-contract-backlog.json`
- `plans/intent-driven-schema-dependency-graph.md`

The machine-readable register in this package can seed those files after review.

## 7. POC and roadmap artifacts

Add:

- `plans/intent-driven-poc-program.md`
- `plans/intent-driven-dependency-roadmap.md`
- `plans/provider-profile-evaluation-program.md`
- `plans/creative-media-fixture-program.md`

## 8. Research registers

Create or expand:

- Provider/model capability register.
- Provider policy and retention register.
- ComfyUI workflow/node/endpoint register.
- External application/version/interchange register.
- Social/channel capability register.
- Creative vocabulary register.
- Interchange profile register.

Mutable facts remain dated research, not permanent unversioned canonical prose.

## 9. Current-state discrepancy report requirements

Record at minimum:

1. ADR-0015 versus `recipe.ts`/Studio prompt and seed behavior.
2. Formal recipe schema versus alpha recipe document shape.
3. No OpenRouter adapter.
4. Fal adapter limited to two still endpoints and polling.
5. No provider webhooks, late-result, or cancellation reconciliation.
6. Fal-only credential slot.
7. No egress taxonomy or cost policy.
8. InvokeAI centrality versus target escape-hatch role.
9. No voice/creative command/partial acceptance.
10. No native image edit model or semantic selection.
11. No native editorial sequence/video operations/OTIO.
12. No cross-media annotation.
13. Narrow evaluation and defect corpus.
14. Instagram-first priority versus Astro-first direction.
15. No publication scheduler.
16. No browser/Godot adapter pair.
17. Product audience conflict.

Every discrepancy must say whether it is:

- Accepted alpha limitation.
- Defect against accepted authority.
- Target feature gap.
- Reserved crossing.
- Blocked by owner decision.

## 10. Canonical integration sequence after decisions

1. Accept successor decisions.
2. Update authority matrix and glossary.
3. Update canonical product and architecture chapters.
4. Update contracts and ADRs.
5. Update plans/backlog/risks.
6. Refresh machine-readable manifests and checksums.
7. Run full validation.
8. Archive superseded intake drafts with clear lineage.
9. Update current-state limitations only after implementation evidence exists.

## 11. Required repository validation after intake edits

Engineering must use the repository’s current documented commands rather than stale commands copied into this report. Record at minimum:

- Derived manifest/checksum refresh.
- Intake/contract-pack validation.
- Harness tests.
- Typecheck/lint/tests if code or generated contracts are touched.
- `git diff --check`.
- Broken-reference/link validation.
- Decision-register and authority-matrix validation.

Do not claim implementation readiness from the intake merge.
