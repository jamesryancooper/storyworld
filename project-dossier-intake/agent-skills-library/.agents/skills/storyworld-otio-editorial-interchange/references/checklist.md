# Storyworld OTIO Editorial Interchange Checklist

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
  - [ ] `Storyworld_editorial_model`
  - [ ] `OTIO_profile_version`
  - [ ] `asset_and_shot_identity_mapping`
  - [ ] `target_adapter`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Map Storyworld sequence, shot, clip, source range, timeline range, transition, marker, caption, and metadata semantics to a pinned OTIO profile
- [ ] Carry stable Storyworld IDs in metadata and authoritative sidecar mapping
- [ ] Include frame rate, resolution, audio, color, destination, and rights settings not safely represented in OTIO
- [ ] Export and validate OTIO plus media manifest
- [ ] Import returned OTIO and identify order, trim, replacement, transition, timing, gap, and metadata changes
- [ ] Generate ConversionLossReport for unsupported or editor-specific semantics
- [ ] Create a proposal rather than silently replacing the accepted sequence

## Invariants

- [ ] Verified: OTIO is interchange, not the complete canonical editorial model
- [ ] Verified: Rational time and exact media versions are preserved
- [ ] Verified: Loss is explicit
- [ ] Verified: Workfile preserves application-specific realization separately

## Validation

- [ ] Kdenlive and Resolve round-trip fixtures
- [ ] Clip-instance marker mismatch
- [ ] Unsupported effect/retime
- [ ] Missing media
- [ ] Different frame rate/resolution
- [ ] Editor replacement

## Closure

- [ ] Required outputs exist:
  - [ ] `EditorialHandoffPackage`
  - [ ] `EditorialReturnPackage`
  - [ ] `OTIO_profile`
  - [ ] `identity_sidecar`
  - [ ] `semantic_diff`
  - [ ] `ConversionLossReport`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
