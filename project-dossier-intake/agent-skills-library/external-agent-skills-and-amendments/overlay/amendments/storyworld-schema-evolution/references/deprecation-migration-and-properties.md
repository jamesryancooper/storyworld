# Deprecation Migration And Properties

## Purpose

Strengthen `storyworld-schema-evolution` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-009 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/api-and-interface-design/SKILL.md` (MIT)
- EXT-018 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/deprecation-and-migration/SKILL.md` (MIT)
- EXT-029 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/property-based-testing/skills/property-based-testing/SKILL.md` (CC-BY-SA-4.0)

## Rules to apply

- Inventory consumers before changing schema.
- Use additive fields and explicit successor/removal states.
- Use roundtrip, idempotence, oracle, and invariant tests for transforms and packages.
- Prove old and new readers against representative fixtures.

## Rules to reject or constrain

- Breaking enum or required-field changes without migration.
- Maintaining indefinite parallel versions without a removal plan.
- Copied CC-BY-SA language without legal review.

## Validation

- Old/new client matrix
- Roundtrip and idempotence tests
- Migration rollback test

## Fixtures

- Generation recipe v1→v2
- Package import/export
- Capability provenance deprecation

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
