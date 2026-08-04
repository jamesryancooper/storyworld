# Storyworld Security Review Checklist

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
  - [ ] `architecture_or_change`
  - [ ] `data_flows`
  - [ ] `trust_boundaries`
  - [ ] `asset_and_egress_classes`
  - [ ] `dependency_inventory`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Map identities, secrets, data classes, systems, trust boundaries, ingress, egress, storage, and authority transitions
- [ ] Identify threats including spoofing, tampering, repudiation, disclosure, denial, privilege escalation, unsafe control actions, stale policy, and supply chain
- [ ] Inspect secret handling, authentication, authorization, tenant isolation, callbacks, URLs, parsers, plugins/nodes, temporary files, logs, and dependency pinning
- [ ] Define prevent, detect, contain, recover, and replace controls
- [ ] Create adversarial fixtures and security acceptance criteria
- [ ] Classify blockers, residual risks, and review owners
- [ ] Verify mitigations without granting adoption or production readiness

## Invariants

- [ ] Verified: Local does not mean trusted
- [ ] Verified: Skills and plugins grant no permission
- [ ] Verified: Least privilege and deny-by-default
- [ ] Verified: Secrets never appear in logs/prompts/manifests
- [ ] Verified: Restricted thumbnails/search are protected

## Validation

- [ ] Credential leak, malicious upload/workfile, duplicate/spoofed webhook, SSRF/public URL, decompression bomb, custom-node egress, tenant/search leak, plugin arbitrary code, supply-chain drift

## Closure

- [ ] Required outputs exist:
  - [ ] `threat_model`
  - [ ] `data_flow_map`
  - [ ] `security_findings`
  - [ ] `required_controls`
  - [ ] `adversarial_tests`
  - [ ] `residual_risk`
  - [ ] `review_receipt`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
