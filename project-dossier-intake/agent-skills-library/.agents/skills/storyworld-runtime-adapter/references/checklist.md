# Storyworld Runtime Adapter Checklist

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
  - [ ] `RuntimeContentPackage`
  - [ ] `accepted_canon_release`
  - [ ] `accepted_assets`
  - [ ] `runtime_target_profile`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Compile authored narrative, branches, entities, assets, rules, dialogue, missions, and references into shared immutable runtime package
- [ ] Validate package identity, hashes, rights, locale, capability, and target constraints
- [ ] Translate through browser or Godot adapter without changing source semantics
- [ ] Have runtime authority host accept or reject package and issue RuntimeReceipt
- [ ] Keep rendering, simulation, physics, networking, and save state runtime-owned
- [ ] Return observations, player choices, analytics, and proposals as nonauthoritative records
- [ ] Require human acceptance for promotion into working canon

## Invariants

- [ ] Verified: One shared source contract, target-specific adapters
- [ ] Verified: Runtime cannot change working canon
- [ ] Verified: Player-specific state is separate
- [ ] Verified: Adapter differences are detected, not normalized away silently

## Validation

- [ ] Same fixture in browser and Godot
- [ ] Save-state separation
- [ ] Adapter semantic divergence
- [ ] Missing asset/rights
- [ ] Runtime rejection
- [ ] Proposal return without canon mutation

## Closure

- [ ] Required outputs exist:
  - [ ] `RuntimeContentPackage`
  - [ ] `target_build`
  - [ ] `validation_report`
  - [ ] `RuntimeReceipt`
  - [ ] `observation_or_proposal_records`
  - [ ] `adapter_diff`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
