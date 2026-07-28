# Operations and Recovery

> Conditional entry point. Nothing here establishes an operational
> environment, permission to operate, or readiness.

## Applicability assessment

- Status: `applicable`
- Assessed on: 2026-07-28
- Assessor and basis: claude-agent (operator-directed adoption session);
  ratified by the project owner 2026-07-28 via DEC-0003. Basis: the canonical target defines
  operational requirements — telemetry, cost controls, retry/reconciliation
  tooling, backup/restore/rollback, provider-outage and channel-failure
  runbooks, quotas, and administration — in
  [`../canonical/storyworld/05_governance_operations_and_quality.md`](../canonical/storyworld/05_governance_operations_and_quality.md)
  (section 16) with reliability targets in section 16.3.

## Current status (2026-07-28)

No operational environment exists. There is nothing to deploy, publish, or
recover beyond the repository itself (version control plus the dossier
integrity refresh). Executable runbooks are deliberately deferred until the F2
governed foundation exists; the exit gates in
[`../canonical/storyworld/06_mvp_dependency_roadmap_and_vertical_slices.md`](../canonical/storyworld/06_mvp_dependency_roadmap_and_vertical_slices.md)
(sections 19.3 and 19.12) define when operational proof — restore drills,
provider-outage drills, rollback — becomes mandatory.

The only operational procedure applicable today is dossier/harness
maintenance: edit sources, update the artifact registry for physical changes,
run `python -B .agent/scripts/refresh.py --refresh`, then
`python -B .agent/scripts/validate.py --check`.
