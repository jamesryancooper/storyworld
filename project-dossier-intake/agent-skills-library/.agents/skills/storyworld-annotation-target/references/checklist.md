# Storyworld Annotation Target Checklist

## Intake

- [ ] Exact request and expected side effects are stated.
- [ ] Repository revision, branch, and dirty state are known.
- [ ] Applicable `AGENTS.md` and `.agent/` governance were read.
- [ ] Relevant accepted and staged decisions were classified separately.
- [ ] A task record exists for significant work.
- [ ] External crossings, credentials, spending, publication, or deployment are explicitly gated.

## Scope and authority

- [ ] The skill is applicable and the task is not better routed elsewhere.
- [ ] Required inputs are available:
  - [ ] `AnnotationTarget_contract`
  - [ ] `media_or_document_version`
  - [ ] `selector_profile`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Identify exact asset/document/version and target domain
- [ ] Choose a common target envelope and medium-specific selector
- [ ] Represent spatial, temporal, structural, semantic, layer/track, graph, or spatial-location addressing
- [ ] Define normalization, coordinate systems, time bases, and mutation behavior
- [ ] Provide renderer adapters and a structured accessible alternative
- [ ] Bind annotations to motivation/type such as comment, finding, edit request, evidence, or selection
- [ ] Test target survival, invalidation, and remapping across derived versions

## Invariants

- [ ] Verified: Annotations never imply approval
- [ ] Verified: Every target binds to an exact version
- [ ] Verified: Renderer private JSON is noncanonical
- [ ] Verified: Target invalidation is explicit rather than silently retargeted

## Validation

- [ ] Image polygon/mask, video frame/interval/cut, audio interval/track, document semantic block, graph node/edge, and spatial region fixtures
- [ ] Version-change invalidation

## Closure

- [ ] Required outputs exist:
  - [ ] `AnnotationTarget_schema`
  - [ ] `selector_profiles`
  - [ ] `renderer_adapters`
  - [ ] `accessible_representation`
  - [ ] `fixtures`
  - [ ] `invalidation_rules`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
