---
name: storyworld-security-review
description: Perform focused Storyworld threat modeling and security review for integrations, media, providers, external tools, plugins, credentials, callbacks, and deployments.
---

# Storyworld Security Review

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Identify unsafe control actions, adversarial paths, privacy leaks, supply-chain risk, and required mitigations before adoption or implementation closure.

## Use this skill when

- Adding provider calls, credentials, uploads, media parsers, webhooks, ComfyUI nodes, external workfiles, plugins, publication, runtime, customer deployment, or new network boundaries

## Do not use this skill when

- Claiming a review replaces penetration testing, legal review, or production security assurance

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- architecture_or_change
- data_flows
- trust_boundaries
- asset_and_egress_classes
- dependency_inventory

## Optional inputs

- threat_model
- security_advisories
- deployment_profile
- test_results

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Map identities, secrets, data classes, systems, trust boundaries, ingress, egress, storage, and authority transitions
2. Identify threats including spoofing, tampering, repudiation, disclosure, denial, privilege escalation, unsafe control actions, stale policy, and supply chain
3. Inspect secret handling, authentication, authorization, tenant isolation, callbacks, URLs, parsers, plugins/nodes, temporary files, logs, and dependency pinning
4. Define prevent, detect, contain, recover, and replace controls
5. Create adversarial fixtures and security acceptance criteria
6. Classify blockers, residual risks, and review owners
7. Verify mitigations without granting adoption or production readiness

## Required invariants

- Local does not mean trusted
- Skills and plugins grant no permission
- Least privilege and deny-by-default
- Secrets never appear in logs/prompts/manifests
- Restricted thumbnails/search are protected

## Allowed side effects

`read_only`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Using live secrets for review without authorization
- Publishing exploit instructions against production targets
- Approving own security blockers
- Treating dependency popularity as assurance

## Required outputs

- threat_model
- data_flow_map
- security_findings
- required_controls
- adversarial_tests
- residual_risk
- review_receipt

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Credential leak, malicious upload/workfile, duplicate/spoofed webhook, SSRF/public URL, decompression bomb, custom-node egress, tenant/search leak, plugin arbitrary code, supply-chain drift

A completion report must state:

- exact repository revision and dirty state;
- commands or checks actually executed;
- actual result of each check;
- checks not executed and why;
- known limitations and residual risks;
- external effects, costs, credentials, or network crossings, including “none”;
- decision and disposition owner for unresolved findings.

## Failure and escalation

Stop or narrow the task when:

- required authority or a governing decision is missing;
- current implementation contradicts the requested durable direction;
- a secret, personal, restricted, or highly restricted input lacks an approved path;
- the task would create an unreviewed public contract or migration;
- provider, external-tool, runtime, publication, or Commerce Foundry outcomes are ambiguous;
- required validation cannot run;
- unrelated repository work would be overwritten.

Record the blocking fact, smallest decision or evidence needed, safe partial result, and disposition owner. Never hide a blocked state by producing implementation-shaped prose.

## Traceability

### Related decisions

- DEC-0044
- DEC-0045
- DEC-0047
- DEC-0048
- DEC-0050
- DEC-0052

### Related contracts

- None.

### Related POCs

- None.

### Relevant repository paths

- packages/credentials/
- packages/providers/
- packages/storage/
- packages/workflows/
- integrations/
- infra/
- apps/studio/

### Skill dependencies

- storyworld-repository-orientation

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- No vendor- or medium-specific profiles are bundled for this skill.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
