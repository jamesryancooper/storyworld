# Worker Supply Chain And Script Hardening

## Purpose

Strengthen `storyworld-deterministic-media-worker` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-034 — trailofbits/skills@1256982d4d925a0acfe11e26c2253c32052c6247 `plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor/SKILL.md` (CC-BY-SA-4.0)
- EXT-050 — cloudflare/skills@30553f89ae1ef1e3c2917cd09d72dac992bb4e9a `skills/turnstile/SKILL.md` (Apache-2.0)

## Rules to apply

- Pin tool/container versions and produce SBOM evidence.
- Use isolated processes, bounded resources, restrictive temp-file modes, no database credentials, and denied network by default.
- Treat media and archive parsing as hostile.
- Return structured errors and transformation receipts.

## Rules to reject or constrain

- Runtime package downloads.
- Unpinned codecs/tools.
- Secrets in process arguments.
- Cleanup that can escape the job directory.

## Validation

- Malformed-media corpus
- Decompression limits
- No-egress test
- Temp cleanup

## Fixtures

- FFmpeg timeout
- Image bomb
- malicious archive

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
