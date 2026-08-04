# Source Backed Poc And Consistency Check

## Purpose

Strengthen `storyworld-poc-execution` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-010 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/source-driven-development/SKILL.md` (MIT)
- EXT-020 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/performance-optimization/SKILL.md` (MIT)
- EXT-024 — github/spec-kit@d1e86f638277a99b82715c22c90558cd58d3cffd `README.md` (MIT)
- EXT-047 — openai/plugins@11c74d6ba24d3a6d48f54a194cd00ef3beea18f9 `plugins/plugin-eval/skills/improve-skill/SKILL.md` (Per-plugin or per-file license; file-level review required)

## Rules to apply

- State one research question and one decision output.
- Capture current primary sources and exact versions.
- Check consistency among question, fixture, success criteria, implementation, and result.
- Measure before optimizing.
- Compare skill or implementation behavior before and after when relevant.

## Rules to reject or constrain

- Spec Kit installation.
- POC code promoted automatically.
- Success based on a demo without replacement, security, accessibility, or teardown evidence.

## Validation

- Fixture reproducibility
- Security/accessibility checks
- Teardown verification

## Fixtures

- Playwright CLI
- Postgres RLS
- skill scanner

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
