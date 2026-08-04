# Evidence Receipt

```yaml
receipt_id: EVD-XXXX
task_ref: TASK-XXXX
repository_revision: <commit>
working_tree: <clean|dirty with paths>
scope:
  included: []
  excluded: []
governing_decisions:
  accepted: []
  staged: []
changes: []
validation:
  executed:
    - command: <command>
      result: <exit/result>
      evidence: <path/log>
  skipped:
    - check: <check>
      reason: <reason>
review:
  findings: []
  disposition: <passed|actionable_findings|blocked>
external_effects:
  credentials_used: false
  network_calls: []
  costs: []
  publication_or_deployment: none
limitations: []
closure_recommendation: <complete|partial|blocked>
```

A receipt records evidence. It does not accept a decision, gate, master, canon release, publication, or deployment.
