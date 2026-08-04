---
name: storyworld-creative-command-implementation
description: Implement Storyworld's text/voice intent pipeline from contextual command through interpretation, plan, typed operations, proposal, partial decision, and immutable revision.
---

# Storyworld Creative Command Implementation

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Make natural-language direction safe, inspectable, reversible, cross-media-capable, and subordinate to Engine authority.

## Use this skill when

- Building CreativeCommand, CreativeContext, CreativeInterpretation, CreativePlan, EditProposal, CreativeDecision, or CreativeRevision
- Adding a new intent-driven operation or proposal interaction

## Do not use this skill when

- Directly mapping free text to provider calls or opaque asset mutation
- The creative-command successor decision is not accepted

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- governing_decision
- command_contracts
- operation_contracts
- consequence_policy
- human_authority_policy

## Optional inputs

- voice_transcript
- selection_snapshot
- provider_capability_profiles
- preview_strategy

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Bind the original command to exact workspace, production, actor, base versions, selection, playhead, rights, egress, and budget context
2. Interpret intent into targets, assumptions, ambiguities, preserved attributes, allowed variation, and affected media
3. Classify consequence and clarification need before execution
4. Build a dependency-aware CreativePlan with cost, preview, evaluation, and approval impact
5. Compile only typed operations with stable Storyworld IDs
6. Validate operations against current versions, policy, rights, and authority
7. Create a proposal that supports accept all, accept selected, modify, reject, or branch
8. Apply accepted operations to create immutable revisions and consequence receipts

## Required invariants

- Conversation is never authority
- Selection context is snapshotted and visible
- Every mutation targets an exact base version
- Partial acceptance preserves operation dependencies
- Low/medium/high consequence rules cannot be downgraded by a model

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Executing raw model tool calls without Storyworld validation
- Applying medium/high-consequence operations before required confirmation
- Letting a provider choose authority, acceptance, or publication state

## Required outputs

- creative_command
- interpretation
- plan
- typed_operations
- proposal
- preview
- decision
- revision
- receipts

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Mistranscription and selection-drift tests
- Partial-acceptance dependency tests
- Idempotency and stale-version tests
- Cancel/steer/unknown-outcome tests
- Accessible proposal review

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

- DEC-0041

### Related contracts

- CON-001
- CON-002
- CON-003
- CreativeInterpretation
- CreativePlan
- CreativeOperation
- EditProposal
- CreativeDecision
- CreativeRevision

### Related POCs

- POC-01
- POC-09

### Relevant repository paths

- packages/contracts/
- packages/domain/
- packages/kernel/
- apps/studio/

### Skill dependencies

- storyworld-contract-authoring
- storyworld-fixture-authoring
- storyworld-studio-surface

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
