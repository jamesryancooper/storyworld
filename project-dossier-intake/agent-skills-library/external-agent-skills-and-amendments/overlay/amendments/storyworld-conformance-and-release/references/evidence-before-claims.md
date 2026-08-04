# Evidence Before Claims

## Purpose

Strengthen `storyworld-conformance-and-release` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-015 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/code-review-and-quality/SKILL.md` (MIT)
- EXT-019 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/observability-and-instrumentation/SKILL.md` (MIT)
- EXT-027 — obra/superpowers@44c9b2d6e889982ac18c27d05a19fefe335194e1 `skills/verification-before-completion/SKILL.md` (MIT)
- EXT-030 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/mutation-testing/skills/mutation-testing/SKILL.md` (CC-BY-SA-4.0)

## Rules to apply

- No completion claim without fresh proving evidence.
- Verify delegated work independently.
- Map every acceptance criterion to evidence.
- Record operational metrics and redacted traces for provider/workflow behavior.
- Use mutation evidence selectively for critical deterministic logic.

## Rules to reject or constrain

- Partial checks extrapolated to full success.
- Telemetry payloads containing sensitive content.
- Review approval as project-owner acceptance.

## Validation

- Fresh full checks
- Manifest/checksum verification
- Operational smoke fixture

## Fixtures

- False “all tests pass” agent report
- Provider job unknown outcome
- Migration with skipped rollback

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
