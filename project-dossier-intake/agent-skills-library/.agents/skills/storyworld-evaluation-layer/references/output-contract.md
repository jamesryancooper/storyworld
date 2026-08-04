# Storyworld Evaluation Layer Output Contract

## Required envelope

Every use of this skill should return or record:

```yaml
skill_id: storyworld-evaluation-layer
skill_version: 1.0.0
repository_revision: <exact commit or working-tree fingerprint>
task_ref: <task or request reference>
authority:
  source: <current task and applicable instructions>
  side_effects_authorized: <none/read-only/repository-local/external>
governing_decisions:
  accepted: []
  staged: []
status: <completed|partial|blocked|cancelled>
```

## Skill-specific outputs

- evaluation_definition
- EvaluationPlan
- findings
- fixtures
- baseline_results
- waiver_rules
- approval_invalidation_rules

## Evidence fields

```yaml
evidence:
  observed: []
  external_research: []
  owner_direction: []
  inferences: []
  validation:
    executed: []
    skipped: []
  limitations: []
  residual_risks: []
  external_effects: []
```

## Finding shape

When findings exist:

```yaml
id: <stable id>
severity: <blocker|major|minor|advisory>
location: <file:line, route/state, contract path, or artifact ref>
evidence: <direct evidence>
impact: <why it matters>
smallest_safe_remedy: <bounded correction>
disposition_owner: <person/role/system>
confidence: <based on evidence completeness>
```

## Closure rule

The output may recommend owner or reviewer disposition. It may not accept its own decision, waive its own blocker, activate credentials, publish, deploy, or claim a reserved external crossing succeeded without a receipt.
