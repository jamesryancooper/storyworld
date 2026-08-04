---
name: storyworld-dossier-intake-maintenance
description: Maintain Storyworld's staged project-dossier-intake artifacts, manifest, impact map, evidence, assessments, and draft decisions without changing governed authority.
---

# Storyworld Dossier Intake Maintenance

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Turn research and owner direction into a traceable staged package ready for project-owner disposition.

## Use this skill when

- Adding assessments, book or repository research, owner questionnaires, draft decisions, impact maps, integration plans, or staged contract backlogs

## Do not use this skill when

- Directly changing accepted canonical dossier content without an explicit content task
- Closing or accepting an intake decision

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- intake_artifact
- source_evidence
- disposition_target
- gating_decision

## Optional inputs

- canonical_impact
- dependency_map
- archival_plan

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Classify the artifact as owner input, research, assessment, proposal, decision draft, plan, evidence, or process
2. Assign status, disposition target, dependencies, governing decision, and archival handling
3. Place the artifact under the existing intake taxonomy using lowercase dashed paths
4. Update project-dossier-intake/readme.md and canonical-impact-map.md
5. Update draft-decision index and source/evidence references where applicable
6. Refresh derived manifests only through repository scripts
7. Validate that no staged statement claims acceptance or implementation

## Required invariants

- Intake remains staged until formal disposition
- Canonical and intake copies must not compete
- Source evidence remains distinguishable from Storyworld synthesis

## Allowed side effects

`repository_local_as_authorized_by_current_task`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Marking draft decisions accepted
- Editing generated catalog/checksum files by hand
- Moving canonical authority into intake
- Using third-party research prose as reusable product text

## Required outputs

- staged_artifacts
- manifest_updates
- impact_map_updates
- decision_index_updates
- validation_receipt

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Update artifact registry for governed dossier path changes
- Run python -B .agent/scripts/refresh.py --refresh
- Run python -B .agent/scripts/validate.py --check

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

- None.

### Related contracts

- None.

### Related POCs

- None.

### Relevant repository paths

- project-dossier-intake/readme.md
- project-dossier-intake/canonical-impact-map.md
- project-dossier-intake/draft-decisions/
- project-dossier/machine-readable/artifact-registry.json

### Skill dependencies

- storyworld-repository-orientation
- storyworld-decision-impact-analysis
- storyworld-conformance-and-release

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
