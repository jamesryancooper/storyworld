# Source, License, and Maintenance Register

All external sources are evidence only. Pinning records what was assessed; it does not adopt the source or guarantee safety.

| Repository | Revision assessed | License posture | Candidate IDs | Upgrade rule |
| --- | --- | --- | --- | --- |
| Leonxlnx/taste-skill | e988add20dab0fa97d7a76781c48961c8184288e | MIT | EXT-007 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| NVIDIA/skills | 0122ea0afacdcf35334e42f56338716cc86d2fdd | Apache-2.0 code; CC-BY-4.0 content | EXT-049 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| addyosmani/agent-skills | 7829ffd90d973b6325f5f12f1b1226dcace74443 | MIT | EXT-008, EXT-009, EXT-010, EXT-011, EXT-012, EXT-013, EXT-014, EXT-015, EXT-016, EXT-017, EXT-018, EXT-019, EXT-020, EXT-021 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| agentskills/agentskills | 38a2ff82958afee88dadf4831509e6f7e9d8ef4e | Apache-2.0 code; CC-BY-4.0 documentation | EXT-041, EXT-053 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| anthropics/claude-code-security-review | 0c6a49f1fa56a1d472575da86a94dbc1edb78eda | MIT | EXT-046 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| anthropics/skills | b29e7cf65e5cb78a5ac33d582270551bc74a14eb | Per-skill license; file-level review required | EXT-044, EXT-045 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| cloudflare/skills | 30553f89ae1ef1e3c2917cd09d72dac992bb4e9a | Apache-2.0 | EXT-050 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| getsentry/skills | e7a87fa72645158f9b5e722cbb1c7e09266f48f1 | Apache-2.0 | EXT-036, EXT-037, EXT-038, EXT-039 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| github/awesome-copilot | 336af71f1b7d2e6e15a8a986ba79ca031a40549b | Repository/file-level license review required | EXT-042, EXT-043, EXT-054 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| github/spec-kit | d1e86f638277a99b82715c22c90558cd58d3cffd | MIT | EXT-024 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| humanlayer/advanced-context-engineering-for-coding-agents | a2da7968c7d5cbc8a58e9c559f4d9eea6d460d6c | Repository license review required before reuse | EXT-025 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| microsoft/playwright-cli | eee5a185c98e6b04d88f580d45a854e9692ab50b | Apache-2.0 | EXT-022 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| obra/superpowers | 44c9b2d6e889982ac18c27d05a19fefe335194e1 | MIT | EXT-026, EXT-027, EXT-028 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| openai/plugins | 11c74d6ba24d3a6d48f54a194cd00ef3beea18f9 | Per-plugin or per-file license; file-level review required | EXT-047, EXT-052 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| openai/skills | 49f948faa9258a0c61caceaf225e179651397431 | Per-skill license; repository deprecated | EXT-048 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| remotion-dev/skills | 4951f6aca2a236f2f2a2bff4734566963fe12707 | Package/file-level license review required | EXT-051 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| supabase/agent-skills | 1207767388a0ffb55f21fb4e6988fee96942431d | MIT | EXT-023 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| trailofbits/skills | 1256982d4d925a0acfe11e26c2253c32052c6247 | CC-BY-SA-4.0 | EXT-029, EXT-030, EXT-031, EXT-032, EXT-033, EXT-034, EXT-035, EXT-040 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |
| vercel-labs/agent-skills | 7c180d9044c9ae2b442b567aad4e42a28dd5ed62 | MIT | EXT-001, EXT-002, EXT-003, EXT-004, EXT-005, EXT-006 | Exact commit pinned; upgrade requires diff, license, security, and eval review. |

## License handling rules

1. Confirm the repository license and the specific file/package license.
2. Record attribution for copied or substantially adapted material.
3. Do not copy CC-BY-SA material into Storyworld’s skill library until legal review determines the required share-alike treatment.
4. Preserve CC-BY attribution for adapted documentation.
5. Treat per-skill and per-plugin licensing as unresolved until the local license file is inspected.
6. Do not redistribute example assets, fonts, screenshots, datasets, or generated media without separate rights confirmation.
7. Prefer original Storyworld synthesis when the external source is useful conceptually but direct adaptation creates licensing complexity.

## Maintenance and upgrade rules

- Maintain a source record with repository, path, exact revision, assessment date, license, and Storyworld files influenced.
- Compare upstream changes before upgrading; never run a blind `skills update` against the Storyworld repository.
- Re-run trigger, holdout, security, routing, and output validation after every material update.
- Detect renamed, merged, removed, archived, deprecated, or license-changed sources.
- Preserve the prior Storyworld capability until the update is accepted and replacement evidence exists.
- If the source disappears, Storyworld must still be able to explain and maintain its own adapted rules from the retained source ledger and attribution record.

## Maintenance observations

- The strongest sources were active at the assessed revisions, but activity is not a quality or trust guarantee.
- `openai/skills` was explicitly deprecated in favor of `openai/plugins`; it is a cautionary example for source-status checks.
- Several vendor repositories are catalogs or mirrors. The original product repository and file-level license remain the preferred evidence source.
- High-churn framework/provider guidance should be treated as a pinned snapshot plus current official documentation during implementation.
