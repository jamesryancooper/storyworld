# Interface Stability And Misuse Resistance

## Purpose

Strengthen `storyworld-contract-authoring` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-009 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/api-and-interface-design/SKILL.md` (MIT)
- EXT-033 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/sharp-edges/skills/sharp-edges/SKILL.md` (CC-BY-SA-4.0)

## Rules to apply

- Design the contract before implementation.
- Treat observable behavior and error semantics as commitments.
- Validate external inputs and provider responses at boundaries.
- Prefer additive evolution and explicit variants.
- Review every interface for dangerous defaults, ambient authority, and easy misuse.

## Rules to reject or constrain

- Generic REST naming rules that conflict with accepted Storyworld OpenAPI.
- Trusting data merely because it came from an internal database.
- Public API convenience that weakens exact-version or authority requirements.

## Validation

- Contract tests
- Negative authorization tests
- Consumer fixture
- Unknown-field and old-client fixture

## Fixtures

- Provider callback
- External editor return
- Publication authorization
- Runtime receipt

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
