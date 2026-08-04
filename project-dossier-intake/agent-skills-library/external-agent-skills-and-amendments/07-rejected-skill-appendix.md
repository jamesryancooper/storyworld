# Rejected-Skill Appendix

A rejection means Storyworld should not adopt the candidate as a skill or installable package. Some rejects remain useful as adversarial fixtures or historical evidence.

## Serious candidates rejected

### EXT-003 — web-design-guidelines

- **Source:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/web-design-guidelines/SKILL.md
- **Reason:** Mostly overlaps Storyworld UX and introduces a mutable remote instruction source. High prompt-injection and reproducibility risk because current instructions are fetched remotely on each invocation.
- **Storyworld response:** Reject direct installation; optionally create a pinned source-note for rules not already covered by Storyworld UX.

### EXT-006 — vercel-deploy-claimable

- **Source:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/vercel-deploy-claimable/SKILL.md
- **Reason:** Directly conflicts with Storyworld reserved-crossing and deployment-authorization rules. Critical external-effect risk: network upload and deployment.
- **Storyworld response:** Reject and add to skill-security negative fixtures.

### EXT-048 — deprecated OpenAI skills catalog

- **Source:** https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/README.md
- **Reason:** No current adoption value; useful only as a deprecation fixture. Staleness and per-skill license risk.
- **Storyworld response:** Reject and include in upstream-disappearance/deprecation tests.

### EXT-054 — Bulk public skill catalogs and mirrors

- **Source:** https://github.com/github/awesome-copilot/blob/336af71f1b7d2e6e15a8a986ba79ca031a40549b/README.md
- **Reason:** High duplication and context risk; popularity is not suitability. Mixed licensing, executable hooks, remote instructions, duplicate triggers, and supply-chain risk.
- **Storyworld response:** Reject bulk adoption.

## Common rejection reasons applied across the register

- **Duplicate authority or workflow plane:** Spec/deployment/catalog packages may be useful references but cannot replace `.agent/` decisions, tasks, evidence, and validators.
- **Mutable remote instructions:** A skill that fetches its operative rules at runtime is not reproducible and is exposed to prompt injection or silent policy change.
- **Hidden external effects:** Deployment, publishing, installation, credential use, or communication cannot be inferred from a skill trigger.
- **Aesthetic overreach:** Design taste, fonts, icons, colors, motion, and layout presets are not universal product requirements.
- **Provider coupling:** Provider prompts, model IDs, SDK defaults, node graphs, or managed-agent platforms cannot become Storyworld creative authority.
- **Executable risk:** Hooks, package lifecycle scripts, global installs, browser profiles, shell preprocessing, scanners, and CI actions require separate threat review.
- **Unclear licensing:** Per-file, share-alike, noncommercial, or absent licenses prevent direct adaptation until reviewed.
- **Deprecation or abandonment:** Deprecated source repositories may inform migration tests but are not safe foundations.
- **Excessive context:** Large encyclopedic skills with broad triggers can reduce model performance and conflict with more specific Storyworld guidance.
- **Unverifiable advice:** Skills without completion criteria, tests, evidence, or source revisions do not improve the governed library.

## Not selected as new top-level Storyworld skills

The following areas remain references or profiles rather than new skills:

- React composition and performance — beneath `storyworld-studio-surface`.
- Accessibility — existing adopted `storyworld-ux` and Studio surface guidance are stronger and more specific.
- API design — beneath contract and schema skills.
- Property and mutation testing — beneath fixture and schema skills.
- Observability — beneath provider, conformance, deterministic worker, and deployment skills.
- Skill supply-chain scanning — beneath security review and the proposed skill-authoring skill until a safe scanner is proven.
- Programmatic video rendering — beneath runtime/native-media skills as a renderer profile.
- ADR/documentation quality — beneath decision impact and dossier maintenance.
