# Provider Observability And Helper Hardening

## Purpose

Strengthen `storyworld-provider-adapter` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-019 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/observability-and-instrumentation/SKILL.md` (MIT)
- EXT-050 — cloudflare/skills@30553f89ae1ef1e3c2917cd09d72dac992bb4e9a `skills/turnstile/SKILL.md` (Apache-2.0)

## Rules to apply

- Use structured provider errors and correlation IDs.
- Keep secrets out of argv, URLs, logs, and traces.
- Bound waits, retries, callbacks, and cleanup.
- Record actual provider/model, cost, fallback, late completion, and unknown outcomes.
- Validate provider responses as untrusted.

## Rules to reject or constrain

- Provider logs as authority.
- Unbounded polling.
- Raw payload logging.
- Shell command construction with untrusted interpolation.

## Validation

- Secret-redaction test
- Duplicate callback
- Late completion
- Network/auth failure

## Fixtures

- OpenRouter structured output failure
- fal URL expiry

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
