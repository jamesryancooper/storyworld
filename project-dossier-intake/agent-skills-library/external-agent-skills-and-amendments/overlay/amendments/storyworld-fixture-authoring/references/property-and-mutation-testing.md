# Property And Mutation Testing

## Purpose

Strengthen `storyworld-fixture-authoring` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-013 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/test-driven-development/SKILL.md` (MIT)
- EXT-028 — obra/superpowers@44c9b2d6e889982ac18c27d05a19fefe335194e1 `skills/test-driven-development/SKILL.md` (MIT)
- EXT-029 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/property-based-testing/skills/property-based-testing/SKILL.md` (CC-BY-SA-4.0)
- EXT-030 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/mutation-testing/skills/mutation-testing/SKILL.md` (CC-BY-SA-4.0)

## Rules to apply

- Prefer properties for serialization, normalization, validators, and state transitions.
- Verify bug tests fail for the intended reason before the fix.
- Use mutation testing only in bounded campaigns with equivalent-mutant review.
- Keep adversarial fixtures rights-safe and one-variable-at-a-time.

## Rules to reject or constrain

- Fixed test pyramid ratios.
- Property testing trivial getters or UI presentation.
- Mutation campaigns without CPU/time limits.

## Validation

- Fixture self-test
- Red-green proof
- Property seed replay
- Mutation scope cap

## Fixtures

- Contract roundtrip
- Lifecycle illegal transition
- Provider substitution
- External editor loss report

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
