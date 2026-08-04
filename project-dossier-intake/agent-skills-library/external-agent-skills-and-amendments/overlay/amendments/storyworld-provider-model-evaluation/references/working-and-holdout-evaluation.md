# Working And Holdout Evaluation

## Purpose

Strengthen `storyworld-provider-model-evaluation` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-037 — getsentry/skills@e7a87fa72645158f9b5e722cbb1c7e09266f48f1 `skills/skill-writer/SKILL.md` (Apache-2.0)
- EXT-041 — agentskills/agentskills@38a2ff82958afee88dadf4831509e6f7e9d8ef4e `docs/skill-creation/best-practices.mdx` (Apache-2.0 code; CC-BY-4.0 documentation)
- EXT-047 — openai/plugins@11c74d6ba24d3a6d48f54a194cd00ef3beea18f9 `plugins/plugin-eval/skills/improve-skill/SKILL.md` (Per-plugin or per-file license; file-level review required)
- EXT-049 — NVIDIA/skills@0122ea0afacdcf35334e42f56338716cc86d2fdd `README.md` (Apache-2.0 code; CC-BY-4.0 content)

## Rules to apply

- Separate working examples from holdouts.
- Evaluate per capability and egress policy, not universal ranking.
- Compare before/after behavior and token/cost/latency.
- Retain failing cases and model/provider versions.
- Do not optimize trigger or routing on the holdout set.

## Rules to reject or constrain

- One aggregate model score.
- Provider-supplied benchmark as sufficient evidence.
- Evaluation output that promotes a model automatically.

## Validation

- Holdout isolation
- Version pinning
- Re-run reproducibility

## Fixtures

- Canon extraction
- Image edit interpretation
- Fallback routing

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
