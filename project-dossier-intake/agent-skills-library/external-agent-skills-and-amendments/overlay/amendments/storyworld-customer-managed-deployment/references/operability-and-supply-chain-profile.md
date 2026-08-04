# Operability And Supply Chain Profile

## Purpose

Strengthen `storyworld-customer-managed-deployment` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-019 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/observability-and-instrumentation/SKILL.md` (MIT)
- EXT-034 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor/SKILL.md` (CC-BY-SA-4.0)

## Rules to apply

- Define health/readiness separately.
- Instrument queue age, workflow failures, provider errors, storage reconciliation, and policy denials.
- Produce SBOM and pinned deployment artifacts.
- Test backup, restore, upgrade, rollback, and offline/degraded operation.

## Rules to reject or constrain

- Telemetry that leaves the customer boundary without policy.
- Health endpoints that report ready while dependencies are unavailable.
- Automatic upgrades.

## Validation

- Restore test
- Provider outage
- Storage loss/reconciliation
- Upgrade rollback

## Fixtures

- Single-node private deployment
- Two-machine controlled boundary

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
