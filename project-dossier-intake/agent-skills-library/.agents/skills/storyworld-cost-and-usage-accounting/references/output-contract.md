# Storyworld Cost And Usage Accounting Output Contract

## Required envelope

Every use of this skill should return or record:

```yaml
skill_id: storyworld-cost-and-usage-accounting
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

- cost_estimate
- budget_preflight
- confirmation_requirement
- actual_cost_receipt
- attribution_record
- reconciliation

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
