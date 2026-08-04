# Executive Conclusion

## Decision

The external skill ecosystem contains **real, material value** for Storyworld, but the value is concentrated in procedures, rule sets, evaluation methods, and security patterns—not in complete drop-in replacements.

No reviewed external skill should be adopted substantially unchanged. The safe and useful architecture is:

1. **Create three genuinely missing Storyworld skills**:
   - `storyworld-skill-authoring-and-evaluation`
   - `storyworld-systematic-debugging`
   - `storyworld-postgres-and-storage-engineering`
2. **Strengthen existing skills with pinned references** rather than creating near-duplicates.
3. **Use executable and platform-specific packages only in disposable pilots** until security, licensing, portability, and replacement are proven.
4. **Reject bulk catalogs, mutable remote instruction fetches, direct deployment skills, deprecated repositories, and provider-canonical workflows.**
5. **Keep Storyworld’s governance model stronger than the open skill standard**: minimal discovery frontmatter, separate provenance, `permission_grant: false`, explicit adoption decisions, side-effect classification, evidence receipts, and no self-approval.

## Highest-value external foundations

### Skill lifecycle and evaluation

The strongest foundation is the combination of:

- the open Agent Skills specification and progressive-disclosure guidance;
- Sentry’s `skill-writer` synthesis, reference-routing, trigger, holdout, and evaluation workflow;
- Sentry’s `skill-scanner` threat taxonomy;
- OpenAI’s plugin-eval before/after comparison concepts;
- NVIDIA’s source/evaluation/deprecation catalog patterns;
- GitHub’s least-privilege handoff and tool-ceiling guidance.

Together they justify a new Storyworld-owned capability for creating, adapting, evaluating, upgrading, and retiring skills.

### Debugging and verification

Obra’s root-cause-first debugging and fresh-verification disciplines are specific, testable, portable, and materially stronger than generic debugging advice. They should form a new Storyworld debugging skill, adapted for tenant isolation, providers, Temporal, media workers, unknown outcomes, and sensitive diagnostics.

### PostgreSQL and storage

Supabase’s Postgres rule library is the clearest external source for a missing Storyworld discipline. It should seed a new product-neutral database/storage skill that adds Storyworld module ownership, RLS, exact versions, content-addressed custody, migration, backup/restore, and reconciliation rules.

### Frontend and Studio

Vercel composition and React performance guidance is high value when merged beneath `storyworld-studio-surface`. Taste and broad UI skills contribute only selected rules: understand the brief, preserve the incumbent system, avoid generic templates, use realistic content, and let accessibility and product truth override aesthetics. Their aesthetic defaults must not become Storyworld policy.

### Testing and security

Property-based testing, mutation testing, insecure-defaults, sharp-edges, differential review, agentic-actions auditing, skill scanning, and supply-chain review can materially improve Storyworld. However, several are CC-BY-SA or executable plugins, so the preferred route is original Storyworld synthesis, attribution, and bounded pilots—not direct copy.

## Skills to strengthen

- `storyworld-studio-surface`
- `storyworld-security-review`
- `storyworld-contract-authoring`
- `storyworld-schema-evolution`
- `storyworld-fixture-authoring`
- `storyworld-governed-change`
- `storyworld-conformance-and-release`
- `storyworld-repository-orientation`
- `storyworld-engineering`
- `storyworld-poc-execution`
- `storyworld-provider-model-evaluation`
- `storyworld-provider-adapter`
- `storyworld-deterministic-media-worker`
- `storyworld-customer-managed-deployment`
- `storyworld-runtime-adapter`

## Genuinely new skills

- `storyworld-skill-authoring-and-evaluation` — Provide one governed lifecycle for Storyworld capabilities instead of ad hoc skill creation or bulk imports.
- `storyworld-systematic-debugging` — Prevent guess-and-patch debugging across Storyworld’s authority, workflow, provider, media, and storage boundaries.
- `storyworld-postgres-and-storage-engineering` — Provide a dedicated database/storage discipline for Storyworld’s modular monolith and content-addressed custody model.

## No adequate external skill found

The research did not find a credible, high-quality, reusable public skill package for the following Storyworld-specific areas:

- OpenRouter policy and provider-equivalent fallback;
- fal.ai queue, retention, custody, and late-result handling;
- hosted-endpoint-only self-hosted ComfyUI governance;
- InvokeAI, Blender, Kdenlive, Resolve, and OTIO governed checkout/return;
- intent-driven creative commands and partial proposal acceptance;
- Storyworld creative authority, canon, rights, provider egress, and exact-version acceptance;
- Commerce Foundry peer authority;
- shared browser/Godot runtime packages.

Existing Storyworld skills for these areas should remain project-authored and grounded in official product documentation plus Storyworld contracts.

## Principal risks

### Licensing

- CC-BY-SA sources can impose share-alike obligations on copied adaptations.
- Agent Skills and NVIDIA documentation include CC-BY attribution duties.
- Anthropic and OpenAI repositories often use per-skill or per-plugin licenses.
- Public visibility is not permission; file-level review remains necessary.

### Security

- Skills may contain scripts, hooks, package installation, shell preprocessing, network calls, browser profiles, provider access, or global configuration writes.
- A static skill scanner can itself be unsafe or overbroad.
- Remote instructions fetched at execution time are mutable and prompt-injection prone.
- Agentic GitHub Actions can expose secrets and write tokens to attacker-controlled input.

### Duplication and context cost

- Storyworld already has a broad skill library; importing lifecycle packs wholesale would create overlapping triggers, conflicting rules, and excessive context.
- A new top-level skill is justified only for a distinct lifecycle not already covered.
- Most external material belongs in routed references that load only for the relevant task.

### Maintenance

- Every external source must be pinned to a revision and monitored for deprecation, renaming, licensing change, or disappearance.
- Upgrades require a diff, trigger/eval rerun, security review, and explicit Storyworld disposition.

## Recommended adoption sequence

1. Review and disposition the three proposed new skills.
2. Pilot trigger/evaluation, systematic debugging, and Postgres/RLS first.
3. Amend `storyworld-studio-surface`, `storyworld-security-review`, `storyworld-contract-authoring`, `storyworld-schema-evolution`, `storyworld-fixture-authoring`, `storyworld-governed-change`, and `storyworld-conformance-and-release`.
4. Run browser, property-testing, design-quality, and skill-scanner pilots.
5. Add lower-priority operational and runtime references only when their implementation phases begin.

## Authority statement

This report is a recommendation package only. External skills remain nonauthoritative. No reviewed repository, vendor badge, license, passing scanner, or evaluation result can adopt a Storyworld capability, expand task authority, accept work, or authorize external effects.
