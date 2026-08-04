---
name: storyworld-engineering
description: Route Storyworld engineering work to the smallest applicable governed skill set. Use for repository build, architecture, contract, integration, Studio, evaluation, security, POC, and conformance tasks.
---

# Storyworld Engineering

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Serve as the umbrella router for Storyworld engineering without becoming a competing governance or implementation authority.

## Use this skill when

- A task spans more than one Storyworld package or capability
- The correct specialist skill is unclear
- A task may cross accepted authority, staged intake, provider, external-tool, or publication boundaries
- A significant implementation task needs an explicit skill chain and closure plan

## Do not use this skill when

- The request is a narrow read-only patch review already covered by the existing change-review skill
- The request is only a Storyworld Studio UX audit already covered by the adopted storyworld-ux skill
- The task has already been routed to a single specialist and no additional boundary is implicated

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- current_request
- applicable_instructions
- repository_revision

## Optional inputs

- task_record
- accepted_decision_refs
- staged_decision_refs
- integration_architecture_package

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Orient to the repository and exact revision
2. Classify the request as research, decision work, contract work, implementation, POC, validation, or external crossing
3. Identify the governing accepted decisions and any staged successor needed
4. Choose the smallest specialist skill chain using registry/routing.json
5. Define authority, side effects, fixtures, validation, and evidence before work begins
6. Route immediately; do not keep implementation logic inside the router
7. Require conformance review and a completion receipt before closure

## Required invariants

- Routing never expands authority
- Accepted repository decisions remain controlling until a successor is accepted
- Provider and external-tool private formats remain behind Storyworld-owned contracts
- A completion claim requires evidence from the responsible specialist and conformance skill

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Expanding the active task's authority
- Treating staged dossier material or this skill as an accepted decision
- Claiming implementation, validation, readiness, approval, or external success without direct evidence
- Using credentials, spending money, publishing, deploying, or contacting external systems without explicit current authorization

## Required outputs

- routing_decision
- skill_chain
- authority_boundary
- required_decisions
- validation_plan
- closure_requirements

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Validate every selected skill ID against registry/skills.json
- Confirm all dependency skills are included and no blocked decision is bypassed

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

- DEC-0040 through DEC-0053 (proposed integration-architecture successors)

### Related contracts

- None.

### Related POCs

- None.

### Relevant repository paths

- AGENTS.md
- .agent/
- .agents/
- project-dossier/
- project-dossier-intake/
- packages/
- apps/studio/

### Skill dependencies

- storyworld-repository-orientation
- storyworld-governed-change
- storyworld-conformance-and-release

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- No vendor- or medium-specific profiles are bundled for this skill.

## Example tasks

- Build the CreativeCommand contracts and Studio proposal review
- Add a fal provider capability
- Run the native image editing POC
- Prepare an Astro export successor decision

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
