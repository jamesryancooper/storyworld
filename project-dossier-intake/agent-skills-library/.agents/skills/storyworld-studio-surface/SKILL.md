---
name: storyworld-studio-surface
description: Implement Storyworld Studio surfaces as accessible projections over Engine authority with text/voice primacy, exact-version decisions, consequences, and recovery.
---

# Storyworld Studio Surface

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Create approachable intent-driven workspaces without allowing client state, canvases, comments, or optimistic UI to become authoritative.

## Use this skill when

- Building or changing Studio navigation, workspace, canvas, timeline, proposal review, cost view, provider inspector, external checkout, export, or runtime UI

## Do not use this skill when

- Backend-only work with no user-facing behavior; use the appropriate domain or integration skill
- Read-only UX audits already covered by storyworld-ux

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- Engine_contracts
- governing_decisions
- user_task
- authority_and_consequence_model

## Optional inputs

- storyworld-ux_findings
- browser_fixture
- responsive_and_AT_test_plan

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Define creator, goal, exact decision, authority source, and error consequence
2. Inspect incumbent components, routes, API client, tests, and rendered behavior
3. Design text/voice entry, contextual target, interpretation, plan, preview, alternatives, consequences, and decision flow
4. Keep exact versions, origin, cost, privacy, provider, findings, and approval impact reachable
5. Model loading, empty, validation, permission, stale/conflict, unavailable, cancelled, and unknown states
6. Provide keyboard, screen-reader, touch, zoom, reduced-motion, forced-color, and structured canvas alternatives
7. Use Engine commands and safe restoration rather than client shadow authority
8. Update behavioral and accessibility tests

## Required invariants

- Studio never independently owns authority
- Comments are not decisions
- Candidate generation is not acceptance
- Optimistic UI cannot claim canon/master/publication success
- Canvas position is not domain meaning

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Direct imports from persistence/kernel private packages into Studio
- Color-only state communication
- Hidden consequences
- AI theater that conceals operations or limitations

## Required outputs

- Studio_surface
- journey_and_state_model
- Engine_client_usage
- accessible_alternative
- tests
- visual_and_behavioral_evidence

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Real-browser keyboard and responsive checks
- Role/name accessibility tests
- Unknown-outcome recovery
- Back/Forward and reload safety
- Light/dark/forced-colors/reduced-motion

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

- DEC-0040
- DEC-0041
- DEC-0046
- DEC-0047

### Related contracts

- CreativeCommand
- EditProposal
- PreviewArtifact
- CreativeDecision
- AnnotationTarget

### Related POCs

- None.

### Relevant repository paths

- apps/studio/
- apps/studio/src/components/ui/
- apps/studio/src/lib/engine.ts

### Skill dependencies

- storyworld-repository-orientation

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`conversational-workspace.md`](references/profiles/conversational-workspace.md) — Primary text/voice command, transcript, interpretation, context, plan, progress, steering, alternatives, and decision surface.
- [`canvas-and-timeline.md`](references/profiles/canvas-and-timeline.md) — Image canvas, semantic timeline, sequence preview, region/object/track selection, structured fallbacks, and precise adjustment.
- [`operator-and-external-tools.md`](references/profiles/operator-and-external-tools.md) — Advanced Operator Mode, provider execution inspector, external checkout/return, and version/loss inspection.
- [`publishing-runtime-commerce.md`](references/profiles/publishing-runtime-commerce.md) — Export, publication authorization, Commerce Foundry handoff, and runtime package/receipt surfaces without authority conflation.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
