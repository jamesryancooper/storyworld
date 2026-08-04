# Agents Md Maintenance

## Purpose

Strengthen `storyworld-repository-orientation` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-010 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/source-driven-development/SKILL.md` (MIT)
- EXT-011 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/context-engineering/SKILL.md` (MIT)
- EXT-025 — humanlayer/advanced-context-engineering-for-coding-agents@a2da7968c7d5cbc8a58e9c559f4d9eea6d460d6c `ace-fca.md` (Repository license review required before reuse)
- EXT-035 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/audit-context-building/skills/audit-context-building/SKILL.md` (CC-BY-SA-4.0)
- EXT-038 — getsentry/skills@e7a87fa72645158f9b5e722cbb1c7e09266f48f1 `skills/agents-md/SKILL.md` (Apache-2.0)

## Rules to apply

- Start with authority and active task, then load the minimum implementation and evidence context.
- Invalidate stale summaries when branch or task changes.
- Use primary sources for mutable technical facts.
- Audit AGENTS scope and conflicts before changing instructions.

## Rules to reject or constrain

- Whole-repository dumps by default.
- A generated context map as authority.
- Editing AGENTS as a convenience without a governed task.

## Validation

- Fresh git state
- Referenced-file existence
- No stale task/decision refs

## Fixtures

- Backend-only task
- Cross-package integration
- AGENTS subtree conflict

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
