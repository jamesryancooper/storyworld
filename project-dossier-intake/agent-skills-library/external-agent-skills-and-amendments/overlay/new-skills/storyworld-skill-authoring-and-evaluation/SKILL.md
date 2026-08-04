---
name: storyworld-skill-authoring-and-evaluation
description: Create, adapt, evaluate, version, and retire Storyworld agent skills and workflows using pinned sources, trigger tests, context budgets, security review, provenance, and evidence-backed adoption proposals.
---

# Storyworld Skill Authoring And Evaluation

This is a proposal-only Storyworld capability. It inherits the active task and cannot expand authority, adopt itself, approve work, activate credentials, perform external effects, or bypass project validation.

## Use this skill when

- Create or materially revise a Storyworld skill, workflow, router, reference, or capability provenance record.
- Evaluate trigger precision, context cost, output quality, security, portability, or upstream upgrade impact.
- Deprecate, supersede, remove, or replace a capability.

## Do not use this skill when

- The task is unrelated to this lifecycle.
- A narrower existing skill owns the work.
- The active task does not authorize repository-local changes.
- A missing decision, license, security review, or source revision blocks safe execution.

## Required inputs

- active task and applicable instructions
- target capability or capability gap
- pinned source revisions and licenses
- existing Storyworld skill registry and routing graph
- working and holdout fixtures
- security and validation constraints

## Authoritative sources

- current task and applicable Storyworld instructions
- .agent governance/state and accepted decisions
- current repository and skill registry
- pinned external sources as nonauthoritative evidence

Read `references/provenance.json` before adopting or modifying this package. Read `references/source-ledger.md` before using an external rule. Use `references/task-checklist.md`, `references/output-contract.md`, and `references/adversarial-cases.md` during execution.

## Preconditions

- No source is imported until its exact revision and license are recorded.
- Executable files, hooks, and installers remain disabled until separate security review.
- A new skill is justified only when profiles or references cannot cover the capability.

## Workflow

1. Classify create, adapt, merge, evaluate, upgrade, deprecate, or retire.
2. Inspect existing skills and eliminate duplication.
3. Build a source and license ledger.
4. Choose the smallest execution shape and context budget.
5. Author or amend with minimal frontmatter and routed references.
6. Create should-trigger, should-not-trigger, working, holdout, and adversarial fixtures.
7. Run structural, security, routing, portability, and output-quality evaluations.
8. Produce an adoption or rejection proposal with replacement and rollback strategy.

## Required outputs

- skill package or amendment overlay
- source/license/provenance record
- trigger and holdout evaluation report
- security review result
- context-size and dependency report
- adoption/deprecation proposal

## Prohibited actions

- bulk installing external skill repositories
- granting permission or adopting its own output
- copying unclear or incompatible licensed content
- executing unreviewed scripts or hooks
- writing global agent configuration
- creating duplicate skills when a reference/profile suffices
- removing authority or evidence rules merely to reduce tokens

## Validation

- Storyworld capability schema validation
- registry and dependency graph checks
- trigger precision and holdout tests
- manual skill-supply-chain review
- cross-client dry run where claimed
- manifest/checksum verification

## Evidence receipt

- exact source revisions
- license disposition
- files read and files produced
- tests and results
- context-size change
- known gaps
- adoption owner

## Failure and escalation

Stop and mark blocked when license, source, authority, trigger precision, or executable safety is unresolved. Preserve the prior capability unchanged.

## Relationship to other Storyworld skills

Owns the lifecycle of Storyworld capability packages; invokes security-review, fixture-authoring, decision-impact-analysis, and conformance-and-release as needed.
