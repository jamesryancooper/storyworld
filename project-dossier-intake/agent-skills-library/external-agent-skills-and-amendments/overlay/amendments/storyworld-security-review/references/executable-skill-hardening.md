# Executable Skill Hardening

## Purpose

Strengthen `storyworld-security-review` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-016 — addyosmani/agent-skills@7829ffd90d973b6325f5f12f1b1226dcace74443 `skills/security-and-hardening/SKILL.md` (MIT)
- EXT-031 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/differential-review/skills/differential-review/SKILL.md` (CC-BY-SA-4.0)
- EXT-032 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/insecure-defaults/skills/insecure-defaults/SKILL.md` (CC-BY-SA-4.0)
- EXT-033 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/sharp-edges/skills/sharp-edges/SKILL.md` (CC-BY-SA-4.0)
- EXT-034 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor/SKILL.md` (CC-BY-SA-4.0)
- EXT-036 — getsentry/skills@e7a87fa72645158f9b5e722cbb1c7e09266f48f1 `skills/skill-scanner/SKILL.md` (Apache-2.0)
- EXT-040 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/agentic-actions-auditor/skills/agentic-actions-auditor/SKILL.md` (CC-BY-SA-4.0)
- EXT-046 — anthropics/claude-code-security-review@0c6a49f1fa56a1d472575da86a94dbc1edb78eda `README.md` (MIT)
- EXT-050 — cloudflare/skills@30553f89ae1ef1e3c2917cd09d72dac992bb4e9a `skills/turnstile/SKILL.md` (Apache-2.0)

## Rules to apply

- Scan imported skills for hidden execution, hooks, symlinks, config poisoning, lifecycle scripts, and overbroad tools.
- Review dangerous defaults and misuse cases, not only known vulnerability classes.
- Pin actions, dependencies, nodes, endpoints, and scripts.
- Keep secrets out of argv, logs, traces, and temporary file permissions.
- Treat all external workfiles, media, provider responses, and callbacks as untrusted.

## Rules to reject or constrain

- Automatic trust from a vendor badge, stars, or a clean static scan.
- Executing imported scanners or hooks before reviewing their code and dependencies.
- Generic security checklists as proof of media-, agent-, or authority-specific safety.

## Validation

- Skill-security fixture corpus
- No-network dry run
- Secret-redaction tests
- Symlink and hidden-hook negative cases

## Fixtures

- Malicious SKILL.md
- npm postinstall
- image metadata instruction
- ComfyUI node egress
- unverified webhook

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
