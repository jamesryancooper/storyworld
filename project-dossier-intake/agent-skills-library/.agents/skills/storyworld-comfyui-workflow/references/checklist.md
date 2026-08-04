# Storyworld Comfyui Workflow Checklist

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
  - [ ] `WorkflowDefinition`
  - [ ] `input_output_bindings`
  - [ ] `node_and_endpoint_allowlists`
  - [ ] `provider_egress_policy`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Assign stable Storyworld workflow ID/version separate from ComfyUI graph identity
- [ ] Pin workflow JSON hash, ComfyUI version, custom-node commits/dependencies, and hosted endpoint versions
- [ ] Declare input/output bindings, media types, resources, cost, egress, retention, and evaluation plan
- [ ] Security-review every node, filesystem/network capability, endpoint, and secret path
- [ ] Run reproducibility, failure, restricted-data, and replacement fixtures
- [ ] Promote through experimental, evaluated, production-approved, deprecated, and prohibited states
- [ ] Execute only through the Storyworld adapter and durable workflow
- [ ] Store redacted logs and exact execution provenance

## Invariants

- [ ] Verified: Self-hosting does not make nodes or endpoints safe
- [ ] Verified: No local model weights without successor decision
- [ ] Verified: Graph is noncanonical execution detail
- [ ] Verified: ComfyUI cannot approve, publish, or write canon

## Validation

- [ ] Node allowlist, endpoint allowlist, restricted-input denial, unauthorized egress, version drift, reproducibility, replacement workflow, output custody

## Closure

- [ ] Required outputs exist:
  - [ ] `WorkflowDefinition`
  - [ ] `WorkflowPromotion`
  - [ ] `security_review`
  - [ ] `execution_binding`
  - [ ] `recorded_fixture`
  - [ ] `replacement_test`
  - [ ] `operator_profile`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
