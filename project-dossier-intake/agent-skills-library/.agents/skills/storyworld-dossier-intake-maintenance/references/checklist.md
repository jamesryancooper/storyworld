# Storyworld Dossier Intake Maintenance Checklist

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
  - [ ] `intake_artifact`
  - [ ] `source_evidence`
  - [ ] `disposition_target`
  - [ ] `gating_decision`
- [ ] Durable semantic changes have decision-impact analysis.
- [ ] Provider/editor/runtime private formats remain behind Storyworld-owned boundaries.
- [ ] No skill, plan, fixture, or passing test is treated as permission.

## Implementation or assessment

- [ ] Classify the artifact as owner input, research, assessment, proposal, decision draft, plan, evidence, or process
- [ ] Assign status, disposition target, dependencies, governing decision, and archival handling
- [ ] Place the artifact under the existing intake taxonomy using lowercase dashed paths
- [ ] Update project-dossier-intake/readme.md and canonical-impact-map.md
- [ ] Update draft-decision index and source/evidence references where applicable
- [ ] Refresh derived manifests only through repository scripts
- [ ] Validate that no staged statement claims acceptance or implementation

## Invariants

- [ ] Verified: Intake remains staged until formal disposition
- [ ] Verified: Canonical and intake copies must not compete
- [ ] Verified: Source evidence remains distinguishable from Storyworld synthesis

## Validation

- [ ] Update artifact registry for governed dossier path changes
- [ ] Run python -B .agent/scripts/refresh.py --refresh
- [ ] Run python -B .agent/scripts/validate.py --check

## Closure

- [ ] Required outputs exist:
  - [ ] `staged_artifacts`
  - [ ] `manifest_updates`
  - [ ] `impact_map_updates`
  - [ ] `decision_index_updates`
  - [ ] `validation_receipt`
- [ ] Actual commands/results and skipped checks are recorded.
- [ ] Findings name evidence, impact, remedy, and disposition owner.
- [ ] No generated file was hand-edited.
- [ ] Dirty state and unrelated changes are disclosed.
- [ ] External effects and costs are listed, including “none.”
- [ ] The result does not overclaim acceptance, readiness, or external success.
