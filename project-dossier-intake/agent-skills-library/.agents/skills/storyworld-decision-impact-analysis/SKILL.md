---
name: storyworld-decision-impact-analysis
description: Analyze whether a Storyworld change clarifies, amends, supersedes, or requires a successor to accepted or staged decisions, then map all affected artifacts.
---

# Storyworld Decision Impact Analysis

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Prevent architecture and authority changes from entering through implementation, schema, or UI changes without explicit decision disposition.

## Use this skill when

- Changing durable product direction, authority, lifecycle, provider policy, security policy, public contracts, or major Studio semantics
- A confirmed owner direction conflicts with accepted repository authority

## Do not use this skill when

- The change is a local bug fix with no durable semantic impact

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- proposed_change
- repository_revision
- relevant_accepted_decisions

## Optional inputs

- staged_decisions
- owner_direction_evidence
- current_implementation

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. State the proposed durable change in neutral terms
2. Locate accepted decisions, ADRs, authority-matrix entries, staged drafts, and implementation assumptions
3. Classify each relationship as support, clarification, amendment, successor, supersession, deferral, or rejection
4. Map impacted contracts, schemas, packages, fixtures, interfaces, dossier sections, tasks, and migrations
5. Identify implementation that must remain blocked
6. Draft the smallest independently ratifiable decision package and explicit alternatives

## Required invariants

- Owner direction is binding input but does not silently supersede accepted decisions
- Historical alpha acceptance is not rewritten retroactively
- A successor names what remains valid and what changes

## Allowed side effects

`read_only`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Marking a decision accepted
- Editing implementation to preempt owner disposition
- Hiding conflicts by calling them implementation details

## Required outputs

- decision_impact_map
- conflict_register
- successor_or_amendment_draft
- blocked_work
- alternatives
- owner_questions

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Every affected accepted decision must have an explicit disposition
- Every proposed successor must identify evidence, consequences, alternatives, and non-authorized effects

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

- ADR-0015
- DEC-0012
- DEC-0015
- DEC-0017
- DEC-0021
- DEC-0028
- DEC-0031
- DEC-0032
- DEC-0033

### Related contracts

- None.

### Related POCs

- None.

### Relevant repository paths

- .agent/decisions/
- packages/contracts/adr/
- packages/contracts/charter/authority-matrix.json
- project-dossier-intake/draft-decisions/

### Skill dependencies

- None.

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
