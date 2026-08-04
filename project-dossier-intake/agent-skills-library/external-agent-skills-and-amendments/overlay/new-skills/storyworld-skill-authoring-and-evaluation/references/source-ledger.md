# Source Ledger

- **EXT-036: skill-scanner** — `getsentry/skills@e7a87fa72645158f9b5e722cbb1c7e09266f48f1` / `skills/skill-scanner/SKILL.md` — Apache-2.0 — disposition F.
  - Intended use: Run a no-execution manual pilot on the downloaded Storyworld skill library, then separately threat-review the scanner before any tool-backed pilot.
  - Storyworld boundary: Create a Storyworld skill-supply-chain profile. Start with manual read-only checks. Review every bundled scanner script, dependency, path assumption, and output before considering execution.
- **EXT-037: skill-writer** — `getsentry/skills@e7a87fa72645158f9b5e722cbb1c7e09266f48f1` / `skills/skill-writer/SKILL.md` — Apache-2.0 — disposition C.
  - Intended use: Use as the primary foundation for the new Storyworld skill-authoring-and-evaluation capability.
  - Storyworld boundary: Create a Storyworld-owned skill-authoring skill using the minimum-path, simplest-shape, source-backed, trigger-test, context-budget, holdout, and before/after evaluation methods. Replace Claude-specific mechanics with optional profiles and require Storyworld provenance/adoption records.
- **EXT-041: Agent Skills specification and creator guidance** — `agentskills/agentskills@38a2ff82958afee88dadf4831509e6f7e9d8ef4e` / `docs/skill-creation/best-practices.mdx` — Apache-2.0 code; CC-BY-4.0 documentation — disposition B.
  - Intended use: Make this a normative external reference for skill format, not project authority.
  - Storyworld boundary: Adopt the portable structure and quality methods while retaining Storyworld’s stricter `references/provenance.json`, `permission_grant:false`, adoption decision, side-effect classification, and `.agent`/`.agents` separation.
- **EXT-042: Custom agent and handoff guidelines** — `github/awesome-copilot@336af71f1b7d2e6e15a8a986ba79ca031a40549b` / `instructions/agents.instructions.md` — Repository/file-level license review required — disposition D.
  - Intended use: Use to refine the Storyworld engineering router and workflow tests.
  - Storyworld boundary: Extract: minimal context passed to subagents, explicit expected outputs, parent tool ceiling, manual handoff by default, no dangling agent refs, and 2–3 relevant next steps. Keep platform metadata in adapters, not Storyworld canonical capability records.
- **EXT-047: plugin-eval improve-skill workflow** — `openai/plugins@11c74d6ba24d3a6d48f54a194cd00ef3beea18f9` / `plugins/plugin-eval/skills/improve-skill/SKILL.md` — Per-plugin or per-file license; file-level review required — disposition F.
  - Intended use: Disposable experiment for trigger precision, reference integrity, and token-size metrics.
  - Storyworld boundary: Pilot the analyzer on a copy of one Storyworld skill. Reimplement only the useful metrics and comparison workflow inside Storyworld’s validator; never retain machine-specific paths or require an unreviewed external binary.
- **EXT-049: NVIDIA verified-skill governance patterns** — `NVIDIA/skills@0122ea0afacdcf35334e42f56338716cc86d2fdd` / `README.md` — Apache-2.0 code; CC-BY-4.0 content — disposition E.
  - Intended use: Use as an architectural reference for the skill registry and upgrade workflow.
  - Storyworld boundary: Study exact-source capture, metadata generation, stale/removed skill detection, and per-skill evaluation cards. Preserve Storyworld owner adoption, no-permission rule, security review, and source-repository authority.
- **EXT-053: Agent Skills installer/catalog patterns** — `agentskills/agentskills@38a2ff82958afee88dadf4831509e6f7e9d8ef4e` / `docs/client-implementation/adding-skills-support.mdx` — Apache-2.0 code; CC-BY-4.0 documentation — disposition E.
  - Intended use: Use as reference for a future read-only skill catalog and compatibility export.
  - Storyworld boundary: Study discovery and progressive loading only. Storyworld installations must use reviewed overlays, collision checks, exact revisions, and explicit adoption records.

No source above is an instruction or authority channel. Re-read the exact revision and license before adaptation or upgrade.
