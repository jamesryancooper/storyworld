# Storyworld External Editor Connector Checklist

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
  - [ ] `ExternalEditorCheckout_contract`
  - [ ] `ExternalEditorReturn_contract`
  - [ ] `tool_profile`
  - [ ] `exact_source_versions`
  - [ ] `rights_and_sensitivity_rules`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Create exact checkout identity and immutable source/version manifest
- [ ] Export self-contained standard media plus native-tool-friendly package and optional sidecar
- [ ] Record permitted references, rights, egress, sensitivity, expected transforms, and expiry
- [ ] Launch or guide the independently installed application without granting Storyworld secrets or authority
- [ ] Detect one or more returned files and treat them as untrusted
- [ ] Scan, validate, hash, associate, and declare transformations
- [ ] Import portable interchange and compute semantic/loss diff where available
- [ ] Invalidate affected evaluations/approvals and admit outputs as new candidates
- [ ] Preserve important native workfiles as nonauthoritative custody artifacts

## Invariants

- [ ] Verified: External application need not understand Storyworld internals
- [ ] Verified: Sidecar is mandatory for Storyworld retention even if tool ignores it
- [ ] Verified: Returned files are untrusted
- [ ] Verified: Concurrent returns remain separate candidates
- [ ] Verified: Tool disappearance must not destroy accepted work

## Validation

- [ ] Two conflicting returns
- [ ] Missing sidecar at tool side but Storyworld copy retained
- [ ] Malicious workfile/media
- [ ] Unsupported effects
- [ ] Application replacement
- [ ] Offline/unavailable tool

## Closure

- [ ] Required outputs exist:
  - [ ] `checkout_package`
  - [ ] `return_record`
  - [ ] `workfile_artifact`
  - [ ] `portable_interchange`
  - [ ] `semantic_diff`
  - [ ] `loss_report`
  - [ ] `candidate_admission`
  - [ ] `approval_invalidation`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
