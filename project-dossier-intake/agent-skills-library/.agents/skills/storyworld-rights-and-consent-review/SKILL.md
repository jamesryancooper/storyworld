---
name: storyworld-rights-and-consent-review
description: Implement and review Storyworld rights, consent, real-person media, usage constraints, expiry, revocation, attribution, disclosure, and provider-egress gates.
---

# Storyworld Rights And Consent Review

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Keep legal and ethical evidence separate from creative approval while preventing unauthorized provider transfers, generation, publication, and reuse.

## Use this skill when

- A source, likeness, voice, music, product, trademark, contributor work, external asset, provider route, package, or publication has rights or consent implications

## Do not use this skill when

- Treating automated checks as legal clearance
- Using ownership of a file as proof of likeness, cloning, or publication permission

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- subject_or_asset_identity
- rights_evidence
- consent_state
- intended_use
- provider_or_destination

## Optional inputs

- counsel_review
- territory_channel_duration_constraints
- revocation_notice
- disclosure_policy

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Identify parties, assets, likenesses, voices, brands, source works, and jurisdictions implicated
2. Record permission basis, purpose, medium, territory, channel, duration, modification, cloning, training, provider, and publication scope
3. Resolve expiry, revocation, attribution, disclosure, and conflict rules
4. Apply the most restrictive access, egress, retention, rights, consent, and contractual rule
5. Create deterministic blockers for absent, expired, revoked, or prohibited uses
6. Route ambiguous legal or ethical questions to qualified human review
7. Invalidate affected generation, evaluation, approval, package, and publication state when rights change

## Required invariants

- Possessing media is not permission
- Consent cannot override law, contract, or no-egress rules
- Legal and ethical review are distinct
- Storyworld never claims automated legal certainty

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Inventing consent
- Sending real-person media to a provider without an effective gate
- Auto-waiving rights blockers
- Publishing after revocation or expiry

## Required outputs

- rights_record
- consent_record
- provider_egress_gate
- findings
- approval_invalidation
- disclosure_requirements
- review_request

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Expired consent, revoked likeness, prohibited cloning, territory/channel mismatch, provider retention conflict, minor/highly-restricted fixture

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

- DEC-0036
- DEC-0037
- DEC-0044
- DEC-0049

### Related contracts

- ProviderEgressDecision
- EvaluationFinding
- ApprovalInvalidation
- PublicationAuthorization

### Related POCs

- None.

### Relevant repository paths

- packages/contracts/
- packages/policy/
- packages/domain/
- project-dossier-intake/governance/

### Skill dependencies

- storyworld-contract-authoring
- storyworld-evaluation-layer
- storyworld-security-review

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
