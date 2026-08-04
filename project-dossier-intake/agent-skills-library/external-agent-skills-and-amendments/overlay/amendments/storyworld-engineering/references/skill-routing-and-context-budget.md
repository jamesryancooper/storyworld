# Skill Routing And Context Budget

## Purpose

Strengthen `storyworld-engineering` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-011 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/context-engineering/SKILL.md` (MIT)
- EXT-021 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/using-agent-skills/SKILL.md` (MIT)
- EXT-041 — agentskills/agentskills@38a2ff82958afee88dadf4831509e6f7e9d8ef4e `docs/skill-creation/best-practices.mdx` (Apache-2.0 code; CC-BY-4.0 documentation)
- EXT-042 — github/awesome-copilot@336af71f1b7d2e6e15a8a986ba79ca031a40549b `instructions/agents.instructions.md` (Repository/file-level license review required)
- EXT-049 — NVIDIA/skills@0122ea0afacdcf35334e42f56338716cc86d2fdd `README.md` (Apache-2.0 code; CC-BY-4.0 content)
- EXT-053 — agentskills/agentskills@38a2ff82958afee88dadf4831509e6f7e9d8ef4e `docs/client-implementation/adding-skills-support.mdx` (Apache-2.0 code; CC-BY-4.0 documentation)

## Rules to apply

- Route to the smallest coherent skill chain.
- Pass minimal explicit context between agents.
- Parent tool availability caps child capability.
- Manual handoff is the default at quality gates.
- Removed, renamed, stale, or conflicting skills must be detected.
- Skill discovery metadata remains lightweight.

## Rules to reject or constrain

- Automatic bulk installation.
- Implicit skill activation for unrelated work.
- Model-specific metadata in Storyworld canonical capability records.
- Vendor verification as adoption authority.

## Validation

- Routing fixture matrix
- Should-trigger/should-not-trigger tests
- Dependency-cycle check
- Missing-successor test

## Fixtures

- Mixed Studio/provider task
- Simple typo that should not load 8 skills
- Removed skill dependency

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
