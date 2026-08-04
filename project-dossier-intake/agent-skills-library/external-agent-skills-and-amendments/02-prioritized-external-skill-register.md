# Prioritized External-Skill Register

**Assessment date:** 2026-08-01  
**Storyworld commit:** `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`  
**Candidate count:** 54

## Summary table

| ID | External skill or rule | Source repository | Cluster | Disposition | Priority | Storyworld skill | License |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EXT-001 | composition-patterns | vercel-labs/agent-skills | React composition | B — Customize into an existing Storyworld skill | P0 | storyworld-studio-surface | MIT |
| EXT-002 | react-best-practices | vercel-labs/agent-skills | React and Next.js performance | B — Customize into an existing Storyworld skill | P0 | storyworld-studio-surface | MIT |
| EXT-003 | web-design-guidelines | vercel-labs/agent-skills | UI review and accessibility | G — Reject | P1 | storyworld-studio-surface / adopted storyworld-ux | MIT |
| EXT-004 | react-view-transitions | vercel-labs/agent-skills | Motion and transitions | D — Extract selected rules only | P2 | storyworld-studio-surface | MIT |
| EXT-005 | writing-guidelines | vercel-labs/agent-skills | Documentation style | D — Extract selected rules only | P2 | storyworld-dossier-intake-maintenance / storyworld-studio-surface | MIT |
| EXT-006 | vercel-deploy-claimable | vercel-labs/agent-skills | Deployment automation | G — Reject | P3 | storyworld-customer-managed-deployment | MIT |
| EXT-007 | design-taste-frontend | Leonxlnx/taste-skill | Product design and visual quality | D — Extract selected rules only | P1 | storyworld-studio-surface / adopted storyworld-ux | MIT |
| EXT-008 | frontend-ui-engineering | addyosmani/agent-skills | Frontend engineering and accessibility | B — Customize into an existing Storyworld skill | P0 | storyworld-studio-surface | MIT |
| EXT-009 | api-and-interface-design | addyosmani/agent-skills | API and interface design | B — Customize into an existing Storyworld skill | P0 | storyworld-contract-authoring / storyworld-schema-evolution | MIT |
| EXT-010 | source-driven-development | addyosmani/agent-skills | Primary-source engineering | B — Customize into an existing Storyworld skill | P0 | storyworld-governed-change / storyworld-repository-orientation / storyworld-poc-execution | MIT |
| EXT-011 | context-engineering | addyosmani/agent-skills | Agent context engineering | B — Customize into an existing Storyworld skill | P0 | storyworld-engineering / storyworld-repository-orientation | MIT |
| EXT-012 | incremental-implementation | addyosmani/agent-skills | Incremental delivery | B — Customize into an existing Storyworld skill | P1 | storyworld-governed-change | MIT |
| EXT-013 | test-driven-development | addyosmani/agent-skills | Testing workflow | D — Extract selected rules only | P1 | storyworld-fixture-authoring / storyworld-governed-change | MIT |
| EXT-014 | debugging-and-error-recovery | addyosmani/agent-skills | Debugging | D — Extract selected rules only | P1 | proposed storyworld-systematic-debugging | MIT |
| EXT-015 | code-review-and-quality | addyosmani/agent-skills | Code review | B — Customize into an existing Storyworld skill | P1 | change-review / storyworld-conformance-and-release | MIT |
| EXT-016 | security-and-hardening | addyosmani/agent-skills | Application security | B — Customize into an existing Storyworld skill | P0 | storyworld-security-review | MIT |
| EXT-017 | documentation-and-adrs | addyosmani/agent-skills | Documentation and ADRs | B — Customize into an existing Storyworld skill | P1 | storyworld-decision-impact-analysis / storyworld-dossier-intake-maintenance | MIT |
| EXT-018 | deprecation-and-migration | addyosmani/agent-skills | Migration and deprecation | B — Customize into an existing Storyworld skill | P1 | storyworld-schema-evolution / storyworld-conformance-and-release | MIT |
| EXT-019 | observability-and-instrumentation | addyosmani/agent-skills | Observability | B — Customize into an existing Storyworld skill | P1 | storyworld-provider-adapter / storyworld-conformance-and-release / storyworld-customer-managed-deployment | MIT |
| EXT-020 | performance-optimization | addyosmani/agent-skills | Performance engineering | D — Extract selected rules only | P2 | storyworld-studio-surface / storyworld-poc-execution / storyworld-conformance-and-release | MIT |
| EXT-021 | using-agent-skills | addyosmani/agent-skills | Skill routing | D — Extract selected rules only | P1 | storyworld-engineering | MIT |
| EXT-022 | Playwright CLI skills and command surface | microsoft/playwright-cli | Browser testing | F — Disposable experiment | P0 | storyworld-studio-surface / storyworld-conformance-and-release | Apache-2.0 |
| EXT-023 | supabase-postgres-best-practices | supabase/agent-skills | PostgreSQL and storage | C — Create a new Storyworld skill from the external foundation | P0 | proposed storyworld-postgres-and-storage-engineering | MIT |
| EXT-024 | Spec Kit core workflow | github/spec-kit | Specification-driven development | E — Architectural or instructional reference only | P1 | storyworld-governed-change / storyworld-decision-impact-analysis / storyworld-poc-execution | MIT |
| EXT-025 | Advanced Context Engineering for Coding Agents | humanlayer/advanced-context-engineering-for-coding-agents | Context engineering | E — Architectural or instructional reference only | P1 | storyworld-repository-orientation / storyworld-engineering | Repository license review required before reuse |
| EXT-026 | systematic-debugging | obra/superpowers | Systematic debugging | C — Create a new Storyworld skill from the external foundation | P0 | proposed storyworld-systematic-debugging | MIT |
| EXT-027 | verification-before-completion | obra/superpowers | Completion verification | B — Customize into an existing Storyworld skill | P0 | storyworld-conformance-and-release / storyworld-governed-change | MIT |
| EXT-028 | test-driven-development | obra/superpowers | Test-driven implementation | D — Extract selected rules only | P1 | storyworld-fixture-authoring / storyworld-governed-change | MIT |
| EXT-029 | property-based-testing | trailofbits/skills | Property-based testing | D — Extract selected rules only | P0 | storyworld-fixture-authoring / storyworld-schema-evolution | CC-BY-SA-4.0 |
| EXT-030 | mutation-testing | trailofbits/skills | Mutation testing | F — Disposable experiment | P1 | storyworld-fixture-authoring / storyworld-conformance-and-release | CC-BY-SA-4.0 |
| EXT-031 | differential-review | trailofbits/skills | Security differential review | B — Customize into an existing Storyworld skill | P1 | change-review / storyworld-security-review | CC-BY-SA-4.0 |
| EXT-032 | insecure-defaults | trailofbits/skills | Security review | B — Customize into an existing Storyworld skill | P0 | storyworld-security-review | CC-BY-SA-4.0 |
| EXT-033 | sharp-edges | trailofbits/skills | Misuse-resistant design | B — Customize into an existing Storyworld skill | P1 | storyworld-contract-authoring / storyworld-security-review | CC-BY-SA-4.0 |
| EXT-034 | supply-chain-risk-auditor | trailofbits/skills | Supply-chain security | F — Disposable experiment | P1 | storyworld-security-review / storyworld-customer-managed-deployment | CC-BY-SA-4.0 |
| EXT-035 | audit-context-building | trailofbits/skills | Repository understanding | E — Architectural or instructional reference only | P2 | storyworld-repository-orientation / storyworld-security-review | CC-BY-SA-4.0 |
| EXT-036 | skill-scanner | getsentry/skills | Skill supply-chain security | F — Disposable experiment | P0 | storyworld-security-review / proposed storyworld-skill-authoring-and-evaluation | Apache-2.0 |
| EXT-037 | skill-writer | getsentry/skills | Skill authoring and maintenance | C — Create a new Storyworld skill from the external foundation | P0 | proposed storyworld-skill-authoring-and-evaluation | Apache-2.0 |
| EXT-038 | agents-md | getsentry/skills | Repository instructions | B — Customize into an existing Storyworld skill | P1 | storyworld-repository-orientation / storyworld-governed-change | Apache-2.0 |
| EXT-039 | iterate-pr | getsentry/skills | PR iteration | E — Architectural or instructional reference only | P2 | storyworld-governed-change / storyworld-conformance-and-release | Apache-2.0 |
| EXT-040 | agentic-actions-auditor | trailofbits/skills | CI and agentic workflow security | B — Customize into an existing Storyworld skill | P1 | storyworld-security-review / storyworld-conformance-and-release | CC-BY-SA-4.0 |
| EXT-041 | Agent Skills specification and creator guidance | agentskills/agentskills | Skill format and quality | B — Customize into an existing Storyworld skill | P0 | storyworld-engineering / proposed storyworld-skill-authoring-and-evaluation | Apache-2.0 code; CC-BY-4.0 documentation |
| EXT-042 | Custom agent and handoff guidelines | github/awesome-copilot | Agent architecture | D — Extract selected rules only | P1 | storyworld-engineering | Repository/file-level license review required |
| EXT-043 | excalidraw-diagram-generator | github/awesome-copilot | Architecture diagrams | E — Architectural or instructional reference only | P3 | storyworld-decision-impact-analysis / storyworld-dossier-intake-maintenance | Repository/file-level license review required |
| EXT-044 | skill-creator | anthropics/skills | Skill authoring | E — Architectural or instructional reference only | P1 | proposed storyworld-skill-authoring-and-evaluation | Per-skill license; file-level review required |
| EXT-045 | claude-api provider skill | anthropics/skills | AI provider engineering | E — Architectural or instructional reference only | P2 | storyworld-provider-adapter / storyworld-provider-model-evaluation | Per-skill license; file-level review required |
| EXT-046 | claude-code-security-review | anthropics/claude-code-security-review | Automated security review | F — Disposable experiment | P1 | storyworld-security-review | MIT |
| EXT-047 | plugin-eval improve-skill workflow | openai/plugins | Skill evaluation | F — Disposable experiment | P0 | proposed storyworld-skill-authoring-and-evaluation | Per-plugin or per-file license; file-level review required |
| EXT-048 | deprecated OpenAI skills catalog | openai/skills | Deprecated skill catalog | G — Reject | P2 | storyworld-skill-authoring-and-evaluation | Per-skill license; repository deprecated |
| EXT-049 | NVIDIA verified-skill governance patterns | NVIDIA/skills | Skill catalog governance | E — Architectural or instructional reference only | P1 | storyworld-skill-authoring-and-evaluation / storyworld-engineering | Apache-2.0 code; CC-BY-4.0 content |
| EXT-050 | Turnstile skill hardening patterns | cloudflare/skills | Executable skill hardening | D — Extract selected rules only | P1 | storyworld-security-review / storyworld-deterministic-media-worker / storyworld-provider-adapter | Apache-2.0 |
| EXT-051 | Remotion agent skills | remotion-dev/skills | Programmatic video rendering | F — Disposable experiment | P2 | storyworld-runtime-adapter / storyworld-native-media-workspace | Package/file-level license review required |
| EXT-052 | plugin-creator patterns | openai/plugins | Plugin and skill packaging | E — Architectural or instructional reference only | P2 | storyworld-skill-authoring-and-evaluation / storyworld-engineering | Per-plugin or per-file license; file-level review required |
| EXT-053 | Agent Skills installer/catalog patterns | agentskills/agentskills | Skill discovery and portability | E — Architectural or instructional reference only | P1 | storyworld-engineering / proposed storyworld-skill-authoring-and-evaluation | Apache-2.0 code; CC-BY-4.0 documentation |
| EXT-054 | Bulk public skill catalogs and mirrors | github/awesome-copilot | Skill discovery catalogs | G — Reject | P3 | storyworld-skill-authoring-and-evaluation | Repository/file-level license review required |

## Detailed assessments

### EXT-001 — composition-patterns

- **Source:** `vercel-labs/agent-skills` → `skills/composition-patterns/SKILL.md`
- **Pinned revision:** `7c180d9044c9ae2b442b567aad4e42a28dd5ed62`
- **Canonical URL:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/composition-patterns/SKILL.md
- **Category:** React composition
- **Storyworld capability:** Composable Studio primitives and workspace APIs
- **Existing Storyworld skill:** storyworld-studio-surface
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Focused guidance for compound components, state lifting, explicit variants, and avoiding boolean-prop proliferation.
- **Overlap:** Complementary; Storyworld already protects Engine authority but lacks a compact component-API rule set.
- **Customization required:** Add a pinned component-composition reference. Replace generic state advice with Storyworld rules: server state stays Engine-owned, selection state is nonauthoritative, and acceptance actions never become optimistic UI.
- **Security:** Instruction-only at the reviewed path. No scripts; still review all references before copying.
- **Portability:** High. Plain Markdown and React concepts are portable.
- **Customization effort:** Low
- **Recommended next action:** Merge the neutral component-API rules and add Storyworld-specific counterexamples from Review Room, Image Canvas, and Semantic Timeline.
- **Decision/adoption record:** Minor-version amendment and provenance update to storyworld-studio-surface.

### EXT-002 — react-best-practices

- **Source:** `vercel-labs/agent-skills` → `skills/react-best-practices/SKILL.md`
- **Pinned revision:** `7c180d9044c9ae2b442b567aad4e42a28dd5ed62`
- **Canonical URL:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/react-best-practices/SKILL.md
- **Category:** React and Next.js performance
- **Storyworld capability:** Studio performance, server/client boundaries, loading, bundle size
- **Existing Storyworld skill:** storyworld-studio-surface
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Prioritized React and Next.js rules covering waterfalls, bundle boundaries, server work, rendering, and rerender control.
- **Overlap:** Partial overlap with Storyworld UX and Studio checks; materially adds implementation-level performance guidance.
- **Customization required:** Create a Storyworld performance reference that keeps high-impact rules, verifies current React/Next versions, and rejects recommendations that move authoritative state client-side or use optimistic acceptance.
- **Security:** Instruction-only; framework advice can become stale and must be rechecked against current official React/Next docs.
- **Portability:** High for React/Next agents; moderate for other environments.
- **Customization effort:** Medium
- **Recommended next action:** Pilot on one data-heavy Studio surface and measure network waterfalls, hydration, bundle, and interaction behavior before merging.
- **Decision/adoption record:** Minor-version amendment and provenance update to storyworld-studio-surface.

### EXT-003 — web-design-guidelines

- **Source:** `vercel-labs/agent-skills` → `skills/web-design-guidelines/SKILL.md`
- **Pinned revision:** `7c180d9044c9ae2b442b567aad4e42a28dd5ed62`
- **Canonical URL:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/web-design-guidelines/SKILL.md
- **Category:** UI review and accessibility
- **Storyworld capability:** Visual QA and accessibility review
- **Existing Storyworld skill:** storyworld-studio-surface / adopted storyworld-ux
- **Disposition:** **G — Reject**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A thin router that fetches an unpinned remote guideline file at review time.
- **Overlap:** Mostly overlaps Storyworld UX and introduces a mutable remote instruction source.
- **Customization required:** Do not adopt the runtime-fetch behavior. Extract selected pinned rules only from a reviewed revision of the underlying guideline source, preserving Storyworld evidence labels and complex-workspace requirements.
- **Security:** High prompt-injection and reproducibility risk because current instructions are fetched remotely on each invocation.
- **Portability:** Low as written because it assumes WebFetch and mutable remote content.
- **Customization effort:** Medium
- **Recommended next action:** Reject direct installation; optionally create a pinned source-note for rules not already covered by Storyworld UX.
- **Decision/adoption record:** No adoption. Any extracted rules require source pinning and provenance.

### EXT-004 — react-view-transitions

- **Source:** `vercel-labs/agent-skills` → `skills/react-view-transitions/SKILL.md`
- **Pinned revision:** `7c180d9044c9ae2b442b567aad4e42a28dd5ed62`
- **Canonical URL:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/react-view-transitions/SKILL.md
- **Category:** Motion and transitions
- **Storyworld capability:** Progressive motion in Studio without accessibility regressions
- **Existing Storyworld skill:** storyworld-studio-surface
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P2
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Implementation guidance for React View Transition APIs and route/shared-element transitions.
- **Overlap:** Narrow complement to Studio motion guidance; not foundational.
- **Customization required:** Extract reduced-motion, interruption, and route-state rules only after verifying browser support and current Next integration.
- **Security:** Low executable risk; compatibility risk from rapidly evolving APIs.
- **Portability:** Medium; React/Next specific.
- **Customization effort:** Low
- **Recommended next action:** Keep as a later reference for a bounded visual-continuity POC; do not trigger on ordinary UI work.
- **Decision/adoption record:** Reference provenance only; no new skill.

### EXT-005 — writing-guidelines

- **Source:** `vercel-labs/agent-skills` → `skills/writing-guidelines/SKILL.md`
- **Pinned revision:** `7c180d9044c9ae2b442b567aad4e42a28dd5ed62`
- **Canonical URL:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/writing-guidelines/SKILL.md
- **Category:** Documentation style
- **Storyworld capability:** Dossier, runbooks, user-facing help, error and recovery copy
- **Existing Storyworld skill:** storyworld-dossier-intake-maintenance / storyworld-studio-surface
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P2
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A detailed writing handbook for planning, voice, structure, code samples, and review discipline.
- **Overlap:** Substantial overlap with project writing conventions; many rules are Vercel-specific preferences.
- **Customization required:** Extract rules for user-shaped titles, honest limitations, troubleshooting, active voice, and source-cited code; reject brand voice, typography, and arbitrary line-length requirements.
- **Security:** Instruction-only; risk is policy overreach rather than execution.
- **Portability:** High after removing Vercel-specific conventions.
- **Customization effort:** Low
- **Recommended next action:** Add a small writing-quality reference used only for documentation and Studio copy tasks.
- **Decision/adoption record:** Minor reference addition; no separate skill.

### EXT-006 — vercel-deploy-claimable

- **Source:** `vercel-labs/agent-skills` → `skills/vercel-deploy-claimable/SKILL.md`
- **Pinned revision:** `7c180d9044c9ae2b442b567aad4e42a28dd5ed62`
- **Canonical URL:** https://github.com/vercel-labs/agent-skills/blob/7c180d9044c9ae2b442b567aad4e42a28dd5ed62/skills/vercel-deploy-claimable/SKILL.md
- **Category:** Deployment automation
- **Storyworld capability:** None under current Storyworld authority
- **Existing Storyworld skill:** storyworld-customer-managed-deployment
- **Disposition:** **G — Reject**
- **Priority:** P3
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Packages and uploads a project to an external deployment service and returns live URLs.
- **Overlap:** Directly conflicts with Storyworld reserved-crossing and deployment-authorization rules.
- **Customization required:** None. Study only as a negative fixture for hidden external actions and claimable deployment authority.
- **Security:** Critical external-effect risk: network upload and deployment.
- **Portability:** Platform-specific and authority-incompatible.
- **Customization effort:** High
- **Recommended next action:** Reject and add to skill-security negative fixtures.
- **Decision/adoption record:** No adoption.

### EXT-007 — design-taste-frontend

- **Source:** `Leonxlnx/taste-skill` → `skills/taste-skill/SKILL.md`
- **Pinned revision:** `e988add20dab0fa97d7a76781c48961c8184288e`
- **Canonical URL:** https://github.com/Leonxlnx/taste-skill/blob/e988add20dab0fa97d7a76781c48961c8184288e/skills/taste-skill/SKILL.md
- **Category:** Product design and visual quality
- **Storyworld capability:** Avoid generic AI-generated Studio interfaces while respecting property-specific visual systems
- **Existing Storyworld skill:** storyworld-studio-surface / adopted storyworld-ux
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Audit-first anti-slop guidance with brief inference, design-read framing, contextual visual direction, and many opinionated aesthetic defaults.
- **Overlap:** Complementary in intent but directly scoped away from dashboards and dense product UI; many font, icon, motion, and style preferences would be harmful as universal policy.
- **Customization required:** Extract only: read the brief, preserve incumbent brand/design system, state the design interpretation, avoid generic templates, use realistic content, and let accessibility override aesthetics. Reject global dials, font bans, icon preferences, motion packages, and stylistic presets.
- **Security:** Instruction-only. Main risk is aesthetic authority creep and unsupported package installation.
- **Portability:** Medium after heavy pruning.
- **Customization effort:** Medium
- **Recommended next action:** Run a design-critique pilot against Storyworld Command Center and Image Canvas; compare against current storyworld-ux findings.
- **Decision/adoption record:** Reference-only amendment; retain MIT attribution if wording is adapted.

### EXT-008 — frontend-ui-engineering

- **Source:** `addyosmani/agent-skills` → `skills/frontend-ui-engineering/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/frontend-ui-engineering/SKILL.md
- **Category:** Frontend engineering and accessibility
- **Storyworld capability:** Studio component architecture, state ownership, accessibility, responsive states
- **Existing Storyworld skill:** storyworld-studio-surface
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Production UI guidance spanning composition, state, design systems, accessibility, responsiveness, and meaningful states.
- **Overlap:** Strong partial overlap; adds implementation checklists and anti-generic-interface examples.
- **Customization required:** Merge composition, real-content, loading/error/empty, semantic tokens, keyboard, and responsive rules. Replace optimistic-update guidance with Storyworld unknown-outcome and exact-version semantics; update WCAG target to Storyworld’s chosen standard.
- **Security:** Instruction-only. Some examples assume packages and patterns not present in Storyworld.
- **Portability:** High after repository-specific adaptation.
- **Customization effort:** Medium
- **Recommended next action:** Use as a source for one consolidated Studio implementation reference, not a second broad UX skill.
- **Decision/adoption record:** Minor-version amendment and provenance update to storyworld-studio-surface.

### EXT-009 — api-and-interface-design

- **Source:** `addyosmani/agent-skills` → `skills/api-and-interface-design/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/api-and-interface-design/SKILL.md
- **Category:** API and interface design
- **Storyworld capability:** Contract-first Engine APIs, module boundaries, external-response validation
- **Existing Storyworld skill:** storyworld-contract-authoring / storyworld-schema-evolution
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Focused contract-first rules covering observable behavior, stable errors, boundary validation, additive evolution, pagination, and typed variants.
- **Overlap:** Complementary to Storyworld contracts; Storyworld is stricter on authority, exact versions, idempotency, RFC 9457, and lifecycle semantics.
- **Customization required:** Merge Hyrum-law awareness, untrusted external-response validation, additive evolution, discriminated unions, and misuse-resistant API design. Replace generic REST conventions with current Storyworld OpenAPI and error contracts.
- **Security:** Instruction-only. Some defaults are generic and must not override accepted contract decisions.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add an interface-stability reference shared by contract-authoring and schema-evolution.
- **Decision/adoption record:** Minor-version amendments and provenance updates to two existing skills.

### EXT-010 — source-driven-development

- **Source:** `addyosmani/agent-skills` → `skills/source-driven-development/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/source-driven-development/SKILL.md
- **Category:** Primary-source engineering
- **Storyworld capability:** Framework/library changes grounded in current official docs and repository evidence
- **Existing Storyworld skill:** storyworld-governed-change / storyworld-repository-orientation / storyworld-poc-execution
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Requires framework decisions to be traced to authoritative current sources instead of memory or blog summaries.
- **Overlap:** Strong complement to Storyworld’s evidence-first repository rules.
- **Customization required:** Add a primary-source ladder, exact revision/version capture, uncertainty labels, and a rule that external docs inform implementation but never supersede accepted Storyworld authority.
- **Security:** Web research can introduce prompt injection or mutable-source risk; source content must be treated as evidence, not instructions.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Merge into repository orientation, governed change, and POC source-handling references.
- **Decision/adoption record:** Minor-version amendments; no new skill.

### EXT-011 — context-engineering

- **Source:** `addyosmani/agent-skills` → `skills/context-engineering/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/context-engineering/SKILL.md
- **Category:** Agent context engineering
- **Storyworld capability:** Minimum sufficient Storyworld context, task switching, scoped references
- **Existing Storyworld skill:** storyworld-engineering / storyworld-repository-orientation
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Guidance for selecting and sequencing context instead of loading an entire repository or instruction library.
- **Overlap:** Complementary and especially important because Storyworld’s proposed skills are detailed and numerous.
- **Customization required:** Add context budgets, authority-first reading order, task-local context packs, explicit stale-context invalidation, and a ban on treating summaries as implementation evidence.
- **Security:** Low execution risk; context omission can cause authority errors if applied mechanically.
- **Portability:** High.
- **Customization effort:** Medium
- **Recommended next action:** Create a shared context-budget reference and add routing tests for overactivation and conflicting skills.
- **Decision/adoption record:** Minor-version amendments and registry/routing test updates.

### EXT-012 — incremental-implementation

- **Source:** `addyosmani/agent-skills` → `skills/incremental-implementation/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/incremental-implementation/SKILL.md
- **Category:** Incremental delivery
- **Storyworld capability:** Bounded vertical slices, rollback-friendly changes, staged contract implementation
- **Existing Storyworld skill:** storyworld-governed-change
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Thin-slice implementation with tests, safe defaults, explicit rollback, and reviewable task boundaries.
- **Overlap:** Mostly aligned with Storyworld safe-change workflow but adds useful slice-design rules.
- **Customization required:** Merge slice boundaries, one behavioral outcome per change, rollback path, feature flag criteria, and “no while-I-am-here refactor” guidance.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add to governed-change implementation and closure checklists.
- **Decision/adoption record:** Minor-version amendment.

### EXT-013 — test-driven-development

- **Source:** `addyosmani/agent-skills` → `skills/test-driven-development/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/test-driven-development/SKILL.md
- **Category:** Testing workflow
- **Storyworld capability:** Behavior changes, regression fixtures, contract evolution
- **Existing Storyworld skill:** storyworld-fixture-authoring / storyworld-governed-change
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Red-green-refactor and test-portfolio guidance.
- **Overlap:** Partial overlap with Storyworld fixture and conformance skills.
- **Customization required:** Extract behavior-first tests, red-green proof for bug fixes, DAMP test readability, and the rule that every user-visible behavior needs a proving test. Reject fixed test-pyramid ratios and universal test-size prescriptions.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add selected rules to fixture-authoring and governed-change.
- **Decision/adoption record:** Minor reference amendment.

### EXT-014 — debugging-and-error-recovery

- **Source:** `addyosmani/agent-skills` → `skills/debugging-and-error-recovery/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/debugging-and-error-recovery/SKILL.md
- **Category:** Debugging
- **Storyworld capability:** Triage, reproduction, localization, recovery, and regression proof
- **Existing Storyworld skill:** proposed storyworld-systematic-debugging
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A concise reproduce-localize-reduce-fix-guard debugging process.
- **Overlap:** Overlaps the stronger Obra root-cause workflow.
- **Customization required:** Extract stop-the-line, safe fallback, and guard-after-fix rules into the proposed Storyworld debugging skill; use Obra as the primary procedural foundation.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Merge selected complementary rules; do not create a second debugging skill.
- **Decision/adoption record:** Included in the new-skill adoption package.

### EXT-015 — code-review-and-quality

- **Source:** `addyosmani/agent-skills` → `skills/code-review-and-quality/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/code-review-and-quality/SKILL.md
- **Category:** Code review
- **Storyworld capability:** Pre-merge correctness, maintainability, security, and regression review
- **Existing Storyworld skill:** change-review / storyworld-conformance-and-release
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Five-axis review and change-sizing guidance with structured severity language.
- **Overlap:** Storyworld has a generic change-review skill; this adds review dimensions and patch-size heuristics.
- **Customization required:** Merge review axes and evidence-backed severity; reject arbitrary line-count gates and any assumption that reviewer approval changes Storyworld project authority.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Amend the existing change-review reference and conformance checklist.
- **Decision/adoption record:** Existing skill version/provenance update; adoption decision if change-review is promoted.

### EXT-016 — security-and-hardening

- **Source:** `addyosmani/agent-skills` → `skills/security-and-hardening/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/security-and-hardening/SKILL.md
- **Category:** Application security
- **Storyworld capability:** Secure coding for APIs, credentials, uploads, external services, and tenants
- **Existing Storyworld skill:** storyworld-security-review
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Broad secure-coding and boundary-hardening checklist.
- **Overlap:** Complementary but less specific than Storyworld’s media, provider, plugin, and authority threats.
- **Customization required:** Use as a baseline checklist beneath Storyworld’s threat-specific review. Add media parser, provider egress, exact-version authorization, custom-node, webhook, and authority-host cases.
- **Security:** Low instruction risk; generic checklists can produce false confidence.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Merge as one baseline reference, never as the complete security review.
- **Decision/adoption record:** Minor-version amendment and security fixture update.

### EXT-017 — documentation-and-adrs

- **Source:** `addyosmani/agent-skills` → `skills/documentation-and-adrs/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/documentation-and-adrs/SKILL.md
- **Category:** Documentation and ADRs
- **Storyworld capability:** Decision records, rationale, consequences, runbooks
- **Existing Storyworld skill:** storyworld-decision-impact-analysis / storyworld-dossier-intake-maintenance
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Guidance for documenting why, alternatives, consequences, and durable interface behavior.
- **Overlap:** Partial overlap with Storyworld governance but useful as an editorial quality reference.
- **Customization required:** Merge concise ADR quality checks while preserving Storyworld-specific accepted/proposed/superseded states, owner authority, impact maps, and generated-register rules.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add a documentation-quality reference shared by decision impact and dossier intake.
- **Decision/adoption record:** Minor-version amendment.

### EXT-018 — deprecation-and-migration

- **Source:** `addyosmani/agent-skills` → `skills/deprecation-and-migration/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/deprecation-and-migration/SKILL.md
- **Category:** Migration and deprecation
- **Storyworld capability:** Schema, API, capability, and provider evolution
- **Existing Storyworld skill:** storyworld-schema-evolution / storyworld-conformance-and-release
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Patterns for staged deprecation, migration, compatibility, and removal evidence.
- **Overlap:** Complementary; Storyworld already needs explicit successor and removal-version behavior.
- **Customization required:** Merge deprecation inventory, consumer discovery, dual-read/write caution, rollback, and removal proof. Preserve Storyworld one-authority and exact-version constraints.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add migration/deprecation reference and fixtures for old clients and portable packages.
- **Decision/adoption record:** Minor-version amendments.

### EXT-019 — observability-and-instrumentation

- **Source:** `addyosmani/agent-skills` → `skills/observability-and-instrumentation/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/observability-and-instrumentation/SKILL.md
- **Category:** Observability
- **Storyworld capability:** Provider jobs, workflows, customer-managed deployments, publication and runtime receipts
- **Existing Storyworld skill:** storyworld-provider-adapter / storyworld-conformance-and-release / storyworld-customer-managed-deployment
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Structured logging, RED-style metrics, traces, symptom-based alerts, and instrumentation-as-you-build.
- **Overlap:** Storyworld models receipts and evidence but needs an explicit operational observability profile.
- **Customization required:** Create a shared observability reference: correlation IDs, redaction, authority-safe event names, unknown outcome, provider cost/latency, queue age, webhook duplication, and no sensitive payload logging.
- **Security:** Telemetry can leak restricted data and credentials; retention and egress must be explicit.
- **Portability:** High after adaptation.
- **Customization effort:** Medium
- **Recommended next action:** Merge as a profile under existing skills rather than a new top-level skill.
- **Decision/adoption record:** Minor-version amendments and security review.

### EXT-020 — performance-optimization

- **Source:** `addyosmani/agent-skills` → `skills/performance-optimization/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/performance-optimization/SKILL.md
- **Category:** Performance engineering
- **Storyworld capability:** Measured Studio, API, media worker, and provider performance
- **Existing Storyworld skill:** storyworld-studio-surface / storyworld-poc-execution / storyworld-conformance-and-release
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P2
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Measure-first profiling and performance-gate guidance.
- **Overlap:** Complementary; individual web targets are not universal Storyworld requirements.
- **Customization required:** Extract baseline-before-optimization, representative fixture, resource envelope, and regression budget rules. Define Storyworld-specific targets per surface and deployment.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add selected rules to POC and conformance references.
- **Decision/adoption record:** Reference-only amendment.

### EXT-021 — using-agent-skills

- **Source:** `addyosmani/agent-skills` → `skills/using-agent-skills/SKILL.md`
- **Pinned revision:** `7829ffd90d973b6325f5f12f1b1226dcace74443`
- **Canonical URL:** https://github.com/addyosmani/agent-skills/blob/7829ffd90d973b6325f5f12f1b1226dcace74443/skills/using-agent-skills/SKILL.md
- **Category:** Skill routing
- **Storyworld capability:** Choose a minimal skill chain and prevent broad capability overactivation
- **Existing Storyworld skill:** storyworld-engineering
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A meta-skill for matching work to lifecycle skills.
- **Overlap:** Direct overlap with Storyworld’s engineering router.
- **Customization required:** Extract trigger clarity, explicit ordering, and no-skill fallback rules; reject any always-on lifecycle that conflicts with active task authority.
- **Security:** Low.
- **Portability:** Medium; routing metadata differs by agent.
- **Customization effort:** Low
- **Recommended next action:** Use only to refine routing fixtures and description precision.
- **Decision/adoption record:** Router version/provenance update.

### EXT-022 — Playwright CLI skills and command surface

- **Source:** `microsoft/playwright-cli` → `README.md`
- **Pinned revision:** `eee5a185c98e6b04d88f580d45a854e9692ab50b`
- **Canonical URL:** https://github.com/microsoft/playwright-cli/blob/eee5a185c98e6b04d88f580d45a854e9692ab50b/README.md
- **Category:** Browser testing
- **Storyworld capability:** Token-efficient browser QA, traces, screenshots, keyboard and responsive testing
- **Existing Storyworld skill:** storyworld-studio-surface / storyworld-conformance-and-release
- **Disposition:** **F — Disposable experiment**
- **Priority:** P0
- **License:** Apache-2.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A coding-agent-oriented CLI with sessions, snapshots, screenshots, network and console inspection, tracing, video, and device emulation.
- **Overlap:** Complementary to Storyworld’s planned Playwright tests and adopted UX visual-QA discipline.
- **Customization required:** Create a pinned, local-only browser-QA profile. Require isolated temporary sessions, localhost-only targets unless authorized, no persistent real-user profile, trace redaction, and repository-owned test fixtures.
- **Security:** Executable CLI, browser state, file uploads, JavaScript evaluation, and persistent profiles require security review. Do not globally install during adoption research.
- **Portability:** High across coding agents that can execute CLI commands.
- **Customization effort:** Medium
- **Recommended next action:** Run a disposable pilot on Command Center, Review Room, and one complex canvas fallback; compare token use and evidence quality with current Playwright test code.
- **Decision/adoption record:** POC decision before bounded dependency or skill-profile adoption.

### EXT-023 — supabase-postgres-best-practices

- **Source:** `supabase/agent-skills` → `skills/supabase-postgres-best-practices/SKILL.md`
- **Pinned revision:** `1207767388a0ffb55f21fb4e6988fee96942431d`
- **Canonical URL:** https://github.com/supabase/agent-skills/blob/1207767388a0ffb55f21fb4e6988fee96942431d/skills/supabase-postgres-best-practices/SKILL.md
- **Category:** PostgreSQL and storage
- **Storyworld capability:** RLS, migrations, query plans, locking, transactions, search, and tenant isolation
- **Existing Storyworld skill:** proposed storyworld-postgres-and-storage-engineering
- **Disposition:** **C — Create a new Storyworld skill from the external foundation**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A large, example-rich Postgres rule library covering query performance, connection management, RLS, schema design, concurrency, data access, diagnostics, and advanced features.
- **Overlap:** Fills a real gap: the current Storyworld library has no dedicated database/storage engineering skill.
- **Customization required:** Create a Storyworld-owned database skill using selected Postgres rules plus Storyworld-specific RLS, module ownership, content-addressed blob versus semantic record, migrations, backup/restore, reconciliation, and exact-version invariants. Remove Supabase product assumptions.
- **Security:** Instruction-only in the reviewed skill; SQL examples must be verified against current PostgreSQL and Storyworld migrations. No production DDL without current authorization.
- **Portability:** High after product-neutral adaptation.
- **Customization effort:** Medium
- **Recommended next action:** Pilot against a tenant-isolation migration, query-plan review, and object-storage reconciliation fixture before adoption.
- **Decision/adoption record:** New skill adoption decision required.

### EXT-024 — Spec Kit core workflow

- **Source:** `github/spec-kit` → `README.md`
- **Pinned revision:** `d1e86f638277a99b82715c22c90558cd58d3cffd`
- **Canonical URL:** https://github.com/github/spec-kit/blob/d1e86f638277a99b82715c22c90558cd58d3cffd/README.md
- **Category:** Specification-driven development
- **Storyworld capability:** Requirements, plans, tasks, consistency analysis, checklists, and convergence
- **Existing Storyworld skill:** storyworld-governed-change / storyworld-decision-impact-analysis / storyworld-poc-execution
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A complete specify-clarify-plan-tasks-analyze-checklist-implement process with extensions, presets, and bundles.
- **Overlap:** Conceptually aligned, but direct adoption would create a second constitution, task system, and governance plane beside `.agent/`.
- **Customization required:** Study artifact consistency analysis, requirements-quality checklists, convergence, and layered override mechanics. Re-express useful patterns inside Storyworld’s existing task, decision, evidence, and dossier systems.
- **Security:** CLI installation, generated command files, templates, and extensions can overwrite agent configuration or create a competing source of truth.
- **Portability:** High concept portability; low direct portability into Storyworld governance.
- **Customization effort:** High
- **Recommended next action:** Do not install. Run a document-only comparison pilot on one future POC plan and use the findings to amend governed-change and POC skills.
- **Decision/adoption record:** No direct adoption; any extracted pattern needs a Storyworld amendment record.

### EXT-025 — Advanced Context Engineering for Coding Agents

- **Source:** `humanlayer/advanced-context-engineering-for-coding-agents` → `ace-fca.md`
- **Pinned revision:** `a2da7968c7d5cbc8a58e9c559f4d9eea6d460d6c`
- **Canonical URL:** https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/a2da7968c7d5cbc8a58e9c559f4d9eea6d460d6c/ace-fca.md
- **Category:** Context engineering
- **Storyworld capability:** Long-horizon implementation context, compact plans, and fresh-context review
- **Existing Storyworld skill:** storyworld-repository-orientation / storyworld-engineering
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P1
- **License:** Repository license review required before reuse
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Research-oriented guidance for giving coding agents sufficient codebase context and using planning/review loops.
- **Overlap:** Complementary, but not packaged as a Storyworld-compatible governed skill and licensing needs verification.
- **Customization required:** Study context compression, implementation-plan quality, fresh-context review, and benchmark methods; translate only original Storyworld-specific procedures after license review.
- **Security:** No direct executable risk from the article; repository and benchmark assets require license review before reuse.
- **Portability:** High concept portability.
- **Customization effort:** Medium
- **Recommended next action:** Reference in the context-budget pilot; do not copy until license is confirmed.
- **Decision/adoption record:** Reference record only.

### EXT-026 — systematic-debugging

- **Source:** `obra/superpowers` → `skills/systematic-debugging/SKILL.md`
- **Pinned revision:** `44c9b2d6e889982ac18c27d05a19fefe335194e1`
- **Canonical URL:** https://github.com/obra/superpowers/blob/44c9b2d6e889982ac18c27d05a19fefe335194e1/skills/systematic-debugging/SKILL.md
- **Category:** Systematic debugging
- **Storyworld capability:** Root-cause diagnosis across Engine, Studio, Temporal, providers, storage, and media workers
- **Existing Storyworld skill:** proposed storyworld-systematic-debugging
- **Disposition:** **C — Create a new Storyworld skill from the external foundation**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A clear root-cause-first workflow: reproduce, trace boundaries, compare working analogues, test one hypothesis, add regression proof, and stop after repeated failed fixes.
- **Overlap:** Fills a genuine gap; current skills cover change and conformance but not the debugging method itself.
- **Customization required:** Create a Storyworld skill retaining the scientific workflow while replacing absolute rhetoric with evidence labels, secret-safe instrumentation, unknown-outcome reconciliation, tenant boundaries, workflow replay, provider callbacks, and authority-aware escalation.
- **Security:** Instruction-only. Example diagnostics must not expose secrets or production data.
- **Portability:** High.
- **Customization effort:** Medium
- **Recommended next action:** Pilot with seeded multi-component defects and compare time-to-root-cause against the current baseline.
- **Decision/adoption record:** New skill adoption decision required.

### EXT-027 — verification-before-completion

- **Source:** `obra/superpowers` → `skills/verification-before-completion/SKILL.md`
- **Pinned revision:** `44c9b2d6e889982ac18c27d05a19fefe335194e1`
- **Canonical URL:** https://github.com/obra/superpowers/blob/44c9b2d6e889982ac18c27d05a19fefe335194e1/skills/verification-before-completion/SKILL.md
- **Category:** Completion verification
- **Storyworld capability:** Evidence-backed closure and accurate status claims
- **Existing Storyworld skill:** storyworld-conformance-and-release / storyworld-governed-change
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A focused gate requiring fresh, complete verification evidence before any success or completion claim.
- **Overlap:** Strongly aligned with Storyworld’s existing evidence-first rules; useful as a concise closure discipline.
- **Customization required:** Merge identify-run-read-verify-report, fresh evidence, full-command, requirement checklist, and delegated-work verification. Replace accusatory wording and “same message” assumptions with Storyworld evidence receipt fields and declared skipped checks.
- **Security:** Instruction-only.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add to conformance and governed-change closure references and regression tests for false completion claims.
- **Decision/adoption record:** Minor-version amendments.

### EXT-028 — test-driven-development

- **Source:** `obra/superpowers` → `skills/test-driven-development/SKILL.md`
- **Pinned revision:** `44c9b2d6e889982ac18c27d05a19fefe335194e1`
- **Canonical URL:** https://github.com/obra/superpowers/blob/44c9b2d6e889982ac18c27d05a19fefe335194e1/skills/test-driven-development/SKILL.md
- **Category:** Test-driven implementation
- **Storyworld capability:** Behavioral changes and regression fixes
- **Existing Storyworld skill:** storyworld-fixture-authoring / storyworld-governed-change
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A strict red-green-refactor workflow designed to resist “test later” rationalization.
- **Overlap:** Overlaps Addy TDD and Storyworld fixture authoring.
- **Customization required:** Extract proof that the test fails for the intended reason, minimal behavior implementation, and regression verification. Do not require TDD for research spikes, generated artifacts, or nonbehavioral metadata changes.
- **Security:** Low.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Merge selected rules into fixture-authoring and POC guidance.
- **Decision/adoption record:** Minor reference amendment.

### EXT-029 — property-based-testing

- **Source:** `trailofbits/skills` → `plugins/property-based-testing/skills/property-based-testing/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/property-based-testing/skills/property-based-testing/SKILL.md
- **Category:** Property-based testing
- **Storyworld capability:** Contract round trips, normalization, state-machine invariants, package and adapter replacement
- **Existing Storyworld skill:** storyworld-fixture-authoring / storyworld-schema-evolution
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P0
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** High-signal property catalog and trigger rules for serialization, parsers, validators, normalization, data structures, and state invariants.
- **Overlap:** Complementary and particularly valuable for Storyworld’s contracts, package formats, adapters, and reversible operations.
- **Customization required:** Re-express roundtrip, idempotence, invariant, oracle, and state-transition rules in original Storyworld wording. Add fast-check or repository-approved tooling only after a POC. Do not copy CC-BY-SA text directly into a differently licensed package without legal review.
- **Security:** Instruction-only, but upstream references and scripts must be reviewed. Share-alike license affects copied adaptations.
- **Portability:** High concept portability.
- **Customization effort:** Medium
- **Recommended next action:** Pilot on `GenerationRecipe`, `ProviderExecutionPlan`, package export/import, and lifecycle state transitions.
- **Decision/adoption record:** Reference amendment plus licensing/provenance review.

### EXT-030 — mutation-testing

- **Source:** `trailofbits/skills` → `plugins/mutation-testing/skills/mutation-testing/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/mutation-testing/skills/mutation-testing/SKILL.md
- **Category:** Mutation testing
- **Storyworld capability:** Validate that contract, policy, and lifecycle tests detect meaningful defects
- **Existing Storyworld skill:** storyworld-fixture-authoring / storyworld-conformance-and-release
- **Disposition:** **F — Disposable experiment**
- **Priority:** P1
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Guidance for scoping, configuring, and interpreting mutation-testing campaigns.
- **Overlap:** Complementary; Storyworld already has defect-injection concepts but not a mature mutation workflow.
- **Customization required:** Use only in a bounded POC on deterministic TypeScript domain logic and contract validators. Define time/cost caps and classify equivalent mutants.
- **Security:** Executable toolchain, potentially high CPU/time, and upstream CC-BY-SA content require review.
- **Portability:** Medium; tooling is language-specific.
- **Customization effort:** Medium
- **Recommended next action:** Run a disposable campaign against lifecycle, policy, and recipe validation code; adopt only if it finds escaped defects without excessive noise.
- **Decision/adoption record:** POC decision; no immediate skill adoption.

### EXT-031 — differential-review

- **Source:** `trailofbits/skills` → `plugins/differential-review/skills/differential-review/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/differential-review/skills/differential-review/SKILL.md
- **Category:** Security differential review
- **Storyworld capability:** High-risk integration, policy, credential, media, and authority-boundary changes
- **Existing Storyworld skill:** change-review / storyworld-security-review
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Security-focused patch review that uses diff and history to identify behavioral and trust-boundary changes.
- **Overlap:** Complementary to generic change review and Storyworld security review.
- **Customization required:** Merge change-surface mapping, prior-fix regression search, trust-boundary review, and evidence-linked findings. Remove blockchain/security-tool-specific assumptions and any external subagent execution.
- **Security:** Read-only if adapted; upstream plugin may invoke tools/subagents and is CC-BY-SA.
- **Portability:** High concept portability.
- **Customization effort:** Medium
- **Recommended next action:** Create a high-risk-review profile used when auth, provider egress, external workfiles, webhooks, or publication authority changes.
- **Decision/adoption record:** Minor skill amendments and provenance review.

### EXT-032 — insecure-defaults

- **Source:** `trailofbits/skills` → `plugins/insecure-defaults/skills/insecure-defaults/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/insecure-defaults/skills/insecure-defaults/SKILL.md
- **Category:** Security review
- **Storyworld capability:** Find fail-open configuration, hardcoded secrets, unsafe defaults, and bypassable policy
- **Existing Storyworld skill:** storyworld-security-review
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A focused insecure-default and fail-open audit procedure.
- **Overlap:** Complementary; Storyworld’s provider, runtime, and customer-managed profiles need default-security tests.
- **Customization required:** Merge fail-closed review for credentials, tenant IDs, provider routes, no-egress, webhook verification, plugin/node allowlists, and unknown outcomes. Rephrase in Storyworld terms.
- **Security:** Read-only if adapted; CC-BY-SA applies to copied content.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add a fail-open/fail-closed reference and adversarial fixture set to security-review.
- **Decision/adoption record:** Minor-version amendment and attribution.

### EXT-033 — sharp-edges

- **Source:** `trailofbits/skills` → `plugins/sharp-edges/skills/sharp-edges/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/sharp-edges/skills/sharp-edges/SKILL.md
- **Category:** Misuse-resistant design
- **Storyworld capability:** Contracts, APIs, configuration, and extension surfaces that are hard to use unsafely
- **Existing Storyworld skill:** storyworld-contract-authoring / storyworld-security-review
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Identifies dangerous APIs, confusing configuration, and footgun designs instead of only implementation bugs.
- **Overlap:** Strong complement to Storyworld’s authority and capability boundaries.
- **Customization required:** Merge misuse-case review: dangerous defaults, confusing state names, ambient authority, coupled flags, implicit fallbacks, unscoped capabilities, and irreversible commands. Require smallest safe redesign.
- **Security:** Read-only if adapted; CC-BY-SA applies to copied content.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Use as a review lens on `ProviderPolicy`, `ExternalEditorCheckout`, publication authorization, and runtime receipts.
- **Decision/adoption record:** Minor-version amendments and provenance.

### EXT-034 — supply-chain-risk-auditor

- **Source:** `trailofbits/skills` → `plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor/SKILL.md
- **Category:** Supply-chain security
- **Storyworld capability:** Dependencies, custom nodes, external applications, model/workflow packages, and customer-managed images
- **Existing Storyworld skill:** storyworld-security-review / storyworld-customer-managed-deployment
- **Disposition:** **F — Disposable experiment**
- **Priority:** P1
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A dependency and ecosystem risk assessment workflow.
- **Overlap:** Complementary; adoption as a direct plugin would be too broad and CC-BY-SA.
- **Customization required:** Pilot the methodology on ComfyUI custom nodes and deterministic-worker containers. Keep Storyworld’s own dependency register, SBOM, pinning, and replacement strategy.
- **Security:** May invoke external package/repository tools; supply-chain data and scripts require review.
- **Portability:** Medium.
- **Customization effort:** High
- **Recommended next action:** Run a bounded read-only pilot and extract only high-value checks.
- **Decision/adoption record:** POC/security review before any script reuse.

### EXT-035 — audit-context-building

- **Source:** `trailofbits/skills` → `plugins/audit-context-building/skills/audit-context-building/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/audit-context-building/skills/audit-context-building/SKILL.md
- **Category:** Repository understanding
- **Storyworld capability:** Deep context for high-risk code review
- **Existing Storyworld skill:** storyworld-repository-orientation / storyworld-security-review
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P2
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Ultra-granular codebase context construction for security audits.
- **Overlap:** Potentially useful but risks excessive context and redundant repository mapping.
- **Customization required:** Study bounded slicing and architecture map output. Do not load whole subsystems or generate a second source of truth; prefer Storyworld package ownership and task-local context packs.
- **Security:** May use subagents and large context; CC-BY-SA.
- **Portability:** Medium.
- **Customization effort:** Medium
- **Recommended next action:** Reference only unless a future security audit demonstrates need.
- **Decision/adoption record:** No adoption.

### EXT-036 — skill-scanner

- **Source:** `getsentry/skills` → `skills/skill-scanner/SKILL.md`
- **Pinned revision:** `e7a87fa72645158f9b5e722cbb1c7e09266f48f1`
- **Canonical URL:** https://github.com/getsentry/skills/blob/e7a87fa72645158f9b5e722cbb1c7e09266f48f1/skills/skill-scanner/SKILL.md
- **Category:** Skill supply-chain security
- **Storyworld capability:** Audit imported skills, references, scripts, hooks, permissions, and hidden execution
- **Existing Storyworld skill:** storyworld-security-review / proposed storyworld-skill-authoring-and-evaluation
- **Disposition:** **F — Disposable experiment**
- **Priority:** P0
- **License:** Apache-2.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A detailed skill-security review covering prompt injection, config poisoning, symlinks, hooks, shell preprocessing, test auto-execution, npm lifecycle hooks, image metadata, secret access, and supply chain.
- **Overlap:** Fills a critical reference gap, but direct script execution has not been reviewed for Storyworld.
- **Customization required:** Create a Storyworld skill-supply-chain profile. Start with manual read-only checks. Review every bundled scanner script, dependency, path assumption, and output before considering execution.
- **Security:** Medium/high: bundled Python scanner uses `uv`, Bash, repository discovery, and pattern matching. Static results require human false-positive review.
- **Portability:** Medium; frontmatter/tool assumptions are Claude-oriented but concepts are portable.
- **Customization effort:** Medium
- **Recommended next action:** Run a no-execution manual pilot on the downloaded Storyworld skill library, then separately threat-review the scanner before any tool-backed pilot.
- **Decision/adoption record:** POC and security-review decision required.

### EXT-037 — skill-writer

- **Source:** `getsentry/skills` → `skills/skill-writer/SKILL.md`
- **Pinned revision:** `e7a87fa72645158f9b5e722cbb1c7e09266f48f1`
- **Canonical URL:** https://github.com/getsentry/skills/blob/e7a87fa72645158f9b5e722cbb1c7e09266f48f1/skills/skill-writer/SKILL.md
- **Category:** Skill authoring and maintenance
- **Storyworld capability:** Create, adapt, evaluate, version, and retire Storyworld capabilities
- **Existing Storyworld skill:** proposed storyworld-skill-authoring-and-evaluation
- **Disposition:** **C — Create a new Storyworld skill from the external foundation**
- **Priority:** P0
- **License:** Apache-2.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A mature routed workflow for source discovery, adaptation, authoring, trigger optimization, holdouts, evals, reference architecture, output contracts, registration, and validation.
- **Overlap:** Fills a genuine gap in the proposed Storyworld library; current templates lack a complete improvement/evaluation lifecycle.
- **Customization required:** Create a Storyworld-owned skill-authoring skill using the minimum-path, simplest-shape, source-backed, trigger-test, context-budget, holdout, and before/after evaluation methods. Replace Claude-specific mechanics with optional profiles and require Storyworld provenance/adoption records.
- **Security:** Instruction-only in the core file, but references include provider-specific hooks and scripts that require separate review.
- **Portability:** High after separating portable core from agent-specific profiles.
- **Customization effort:** Medium
- **Recommended next action:** Use as the primary foundation for the new Storyworld skill-authoring-and-evaluation capability.
- **Decision/adoption record:** New skill adoption decision required.

### EXT-038 — agents-md

- **Source:** `getsentry/skills` → `skills/agents-md/SKILL.md`
- **Pinned revision:** `e7a87fa72645158f9b5e722cbb1c7e09266f48f1`
- **Canonical URL:** https://github.com/getsentry/skills/blob/e7a87fa72645158f9b5e722cbb1c7e09266f48f1/skills/agents-md/SKILL.md
- **Category:** Repository instructions
- **Storyworld capability:** Maintain concise root/subtree AGENTS.md files without creating competing authority
- **Existing Storyworld skill:** storyworld-repository-orientation / storyworld-governed-change
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** Apache-2.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Procedures for creating and maintaining repository agent-instruction files.
- **Overlap:** Complementary; Storyworld already has a strict AGENTS hierarchy and governance plane.
- **Customization required:** Extract instruction-scope audits, root-to-leaf conflict checks, stale-command detection, and concision rules. Preserve Storyworld’s explicit separation of instructions, dossier context, decisions, tasks, and evidence.
- **Security:** Instruction-only; editing AGENTS can materially affect every agent and must be a high-consequence repository change.
- **Portability:** High.
- **Customization effort:** Low
- **Recommended next action:** Add an AGENTS-maintenance profile under repository-orientation and governed-change.
- **Decision/adoption record:** Minor-version amendment; any actual AGENTS change requires a governed task and review.

### EXT-039 — iterate-pr

- **Source:** `getsentry/skills` → `skills/iterate-pr/SKILL.md`
- **Pinned revision:** `e7a87fa72645158f9b5e722cbb1c7e09266f48f1`
- **Canonical URL:** https://github.com/getsentry/skills/blob/e7a87fa72645158f9b5e722cbb1c7e09266f48f1/skills/iterate-pr/SKILL.md
- **Category:** PR iteration
- **Storyworld capability:** Address review findings while preserving scope and verification
- **Existing Storyworld skill:** storyworld-governed-change / storyworld-conformance-and-release
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P2
- **License:** Apache-2.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Iterative PR feedback workflow with agent-invocation metadata.
- **Overlap:** Storyworld already has GitHub review/fix/publish plugin skills and does not need another PR authority path.
- **Customization required:** Study invocation-policy alignment and required before/after verification. Do not import PR mutation behavior or duplicate installed GitHub skills.
- **Security:** May invoke agents and mutate PRs depending on environment.
- **Portability:** Medium; platform metadata differs.
- **Customization effort:** Low
- **Recommended next action:** Reference only.
- **Decision/adoption record:** No adoption.

### EXT-040 — agentic-actions-auditor

- **Source:** `trailofbits/skills` → `plugins/agentic-actions-auditor/skills/agentic-actions-auditor/SKILL.md`
- **Pinned revision:** `1256982d4d925a0acfe11e26c2253c32052c6247`
- **Canonical URL:** https://github.com/trailofbits/skills/blob/1256982d4d925a0acfe11e26c2253c32052c6247/plugins/agentic-actions-auditor/skills/agentic-actions-auditor/SKILL.md
- **Category:** CI and agentic workflow security
- **Storyworld capability:** GitHub Actions, untrusted PR input, token permissions, artifact and log handling
- **Existing Storyworld skill:** storyworld-security-review / storyworld-conformance-and-release
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P1
- **License:** CC-BY-SA-4.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Static analysis guidance for prompt injection, attacker-controlled input, sandbox, allowlist, permission, and tool risks in AI-enabled GitHub Actions workflows.
- **Overlap:** Complementary; Storyworld’s CI evidence and future agent workflows need a focused profile.
- **Customization required:** Merge least-privilege tokens, untrusted-context separation, pinned actions, artifact/trace retention, no secrets in forks, and protected-branch rules. Verify the actual source path and license before copying text.
- **Security:** The skill permits Bash/gh for remote workflow retrieval; fetched YAML must remain data. CC-BY-SA applies to copied content.
- **Portability:** High concept portability.
- **Customization effort:** Medium
- **Recommended next action:** Add a GitHub Actions profile under security-review after source-path verification.
- **Decision/adoption record:** Minor-version amendment and security review.

### EXT-041 — Agent Skills specification and creator guidance

- **Source:** `agentskills/agentskills` → `docs/skill-creation/best-practices.mdx`
- **Pinned revision:** `38a2ff82958afee88dadf4831509e6f7e9d8ef4e`
- **Canonical URL:** https://github.com/agentskills/agentskills/blob/38a2ff82958afee88dadf4831509e6f7e9d8ef4e/docs/skill-creation/best-practices.mdx
- **Category:** Skill format and quality
- **Storyworld capability:** Portable structure, progressive disclosure, context budgets, trigger and output evaluation
- **Existing Storyworld skill:** storyworld-engineering / proposed storyworld-skill-authoring-and-evaluation
- **Disposition:** **B — Customize into an existing Storyworld skill**
- **Priority:** P0
- **License:** Apache-2.0 code; CC-BY-4.0 documentation
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Open format and detailed creation guidance emphasizing real expertise, progressive disclosure, concise routers, defaults, gotchas, validation loops, and skill evals.
- **Overlap:** Strongly compatible; Storyworld already follows minimal frontmatter and separate provenance but needs formal context/trigger evaluation.
- **Customization required:** Adopt the portable structure and quality methods while retaining Storyworld’s stricter `references/provenance.json`, `permission_grant:false`, adoption decision, side-effect classification, and `.agent`/`.agents` separation.
- **Security:** Scripts and assets remain executable/untrusted until reviewed; documentation is CC-BY-4.0.
- **Portability:** Very high across compatible clients.
- **Customization effort:** Low
- **Recommended next action:** Make this a normative external reference for skill format, not project authority.
- **Decision/adoption record:** Amend the skill library conventions and new skill-authoring capability.

### EXT-042 — Custom agent and handoff guidelines

- **Source:** `github/awesome-copilot` → `instructions/agents.instructions.md`
- **Pinned revision:** `336af71f1b7d2e6e15a8a986ba79ca031a40549b`
- **Canonical URL:** https://github.com/github/awesome-copilot/blob/336af71f1b7d2e6e15a8a986ba79ca031a40549b/instructions/agents.instructions.md
- **Category:** Agent architecture
- **Storyworld capability:** Router, subagent handoffs, tool ceilings, manual gates, cross-agent metadata
- **Existing Storyworld skill:** storyworld-engineering
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P1
- **License:** Repository/file-level license review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Detailed custom-agent frontmatter, least-privilege tools, handoffs, and orchestration guidance.
- **Overlap:** Complementary but GitHub-Copilot-specific and sometimes recommends model/tool metadata that Storyworld stores elsewhere.
- **Customization required:** Extract: minimal context passed to subagents, explicit expected outputs, parent tool ceiling, manual handoff by default, no dangling agent refs, and 2–3 relevant next steps. Keep platform metadata in adapters, not Storyworld canonical capability records.
- **Security:** Tool and MCP configuration can broaden authority if copied blindly.
- **Portability:** Medium; concepts portable, metadata platform-specific.
- **Customization effort:** Low
- **Recommended next action:** Use to refine the Storyworld engineering router and workflow tests.
- **Decision/adoption record:** Router minor-version/provenance update.

### EXT-043 — excalidraw-diagram-generator

- **Source:** `github/awesome-copilot` → `skills/excalidraw-diagram-generator/SKILL.md`
- **Pinned revision:** `336af71f1b7d2e6e15a8a986ba79ca031a40549b`
- **Canonical URL:** https://github.com/github/awesome-copilot/blob/336af71f1b7d2e6e15a8a986ba79ca031a40549b/skills/excalidraw-diagram-generator/SKILL.md
- **Category:** Architecture diagrams
- **Storyworld capability:** Dossier and implementation diagrams
- **Existing Storyworld skill:** storyworld-decision-impact-analysis / storyworld-dossier-intake-maintenance
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P3
- **License:** Repository/file-level license review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Generates Excalidraw diagrams from text and code structure.
- **Overlap:** Useful convenience but not a foundation skill; Storyworld can already use Mermaid or static diagrams.
- **Customization required:** Study diagram decomposition and accessibility notes only. Avoid introducing opaque diagram files as the only architecture representation.
- **Security:** May generate large structured files and depend on external viewers.
- **Portability:** Medium.
- **Customization effort:** Low
- **Recommended next action:** Keep as optional external reference; diagrams must have text equivalents.
- **Decision/adoption record:** No adoption.

### EXT-044 — skill-creator

- **Source:** `anthropics/skills` → `skills/skill-creator/SKILL.md`
- **Pinned revision:** `b29e7cf65e5cb78a5ac33d582270551bc74a14eb`
- **Canonical URL:** https://github.com/anthropics/skills/blob/b29e7cf65e5cb78a5ac33d582270551bc74a14eb/skills/skill-creator/SKILL.md
- **Category:** Skill authoring
- **Storyworld capability:** Portable skill structure and iterative improvement
- **Existing Storyworld skill:** proposed storyworld-skill-authoring-and-evaluation
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P1
- **License:** Per-skill license; file-level review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Official example skill for creating and refining agent skills.
- **Overlap:** Overlaps Sentry skill-writer and Agent Skills specification; source is valuable but per-skill licensing and provider details need review.
- **Customization required:** Use as an architectural comparison and source of examples, not the primary foundation. Prefer the open specification plus Storyworld governance.
- **Security:** References may include scripts and Claude-specific metadata; per-skill license review required.
- **Portability:** Medium/high.
- **Customization effort:** Medium
- **Recommended next action:** Reference only unless specific rules outperform the proposed Storyworld authoring workflow in pilot.
- **Decision/adoption record:** No direct adoption.

### EXT-045 — claude-api provider skill

- **Source:** `anthropics/skills` → `skills/claude-api/SKILL.md`
- **Pinned revision:** `b29e7cf65e5cb78a5ac33d582270551bc74a14eb`
- **Canonical URL:** https://github.com/anthropics/skills/blob/b29e7cf65e5cb78a5ac33d582270551bc74a14eb/skills/claude-api/SKILL.md
- **Category:** AI provider engineering
- **Storyworld capability:** Current provider-specific API and SDK research patterns
- **Existing Storyworld skill:** storyworld-provider-adapter / storyworld-provider-model-evaluation
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P2
- **License:** Per-skill license; file-level review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A comprehensive provider-specific reference that insists on current SDK documentation, explicit surface choice, model migration, tool-use distinctions, and API drift awareness.
- **Overlap:** Useful as a source-driven provider-reference pattern, but Storyworld routes through OpenRouter first and must remain provider-neutral.
- **Customization required:** Study source freshness, API-drift warnings, language-specific routing, and simplest-surface selection. Reject Anthropic model defaults, provider lock-in, overly broad trigger language, and managed-agent authority assumptions.
- **Security:** May fetch live docs, install or use SDKs, and contains provider-specific defaults; per-skill license and egress review required.
- **Portability:** Medium.
- **Customization effort:** Low
- **Recommended next action:** Reference only; use official OpenRouter and direct-provider documentation for actual Storyworld adapter work.
- **Decision/adoption record:** No adoption.

### EXT-046 — claude-code-security-review

- **Source:** `anthropics/claude-code-security-review` → `README.md`
- **Pinned revision:** `0c6a49f1fa56a1d472575da86a94dbc1edb78eda`
- **Canonical URL:** https://github.com/anthropics/claude-code-security-review/blob/0c6a49f1fa56a1d472575da86a94dbc1edb78eda/README.md
- **Category:** Automated security review
- **Storyworld capability:** Security analysis of changes and CI integration
- **Existing Storyworld skill:** storyworld-security-review
- **Disposition:** **F — Disposable experiment**
- **Priority:** P1
- **License:** MIT
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** An MIT-licensed automated security-review action and workflow from Anthropic.
- **Overlap:** Complementary, but a CI action cannot replace Storyworld threat-model and integration-specific security review.
- **Customization required:** Pilot on a synthetic branch with no secrets. Evaluate findings, false positives, token/permission scope, fork behavior, and whether external model processing satisfies egress policy.
- **Security:** External model execution, GitHub tokens, PR content, and CI logs are material risks.
- **Portability:** Low outside GitHub Actions/Claude environment.
- **Customization effort:** High
- **Recommended next action:** Disposable CI pilot only after provider-egress and security approval.
- **Decision/adoption record:** POC and external-service authorization required.

### EXT-047 — plugin-eval improve-skill workflow

- **Source:** `openai/plugins` → `plugins/plugin-eval/skills/improve-skill/SKILL.md`
- **Pinned revision:** `11c74d6ba24d3a6d48f54a194cd00ef3beea18f9`
- **Canonical URL:** https://github.com/openai/plugins/blob/11c74d6ba24d3a6d48f54a194cd00ef3beea18f9/plugins/plugin-eval/skills/improve-skill/SKILL.md
- **Category:** Skill evaluation
- **Storyworld capability:** Before/after skill analysis, trigger cost, compactness, broken-reference checks
- **Existing Storyworld skill:** proposed storyworld-skill-authoring-and-evaluation
- **Disposition:** **F — Disposable experiment**
- **Priority:** P0
- **License:** Per-plugin or per-file license; file-level review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A concise workflow that turns plugin-eval findings into a rewrite brief and compares before/after skill outputs.
- **Overlap:** Strong complement to Sentry skill-writer and Agent Skills eval guidance; current file contains a machine-specific absolute path and assumes plugin-eval installation.
- **Customization required:** Pilot the analyzer on a copy of one Storyworld skill. Reimplement only the useful metrics and comparison workflow inside Storyworld’s validator; never retain machine-specific paths or require an unreviewed external binary.
- **Security:** Executable analyzer, package installation, and repository/file-level licensing require review.
- **Portability:** Medium; Codex plugin-oriented.
- **Customization effort:** Medium
- **Recommended next action:** Disposable experiment for trigger precision, reference integrity, and token-size metrics.
- **Decision/adoption record:** POC decision; no direct adoption.

### EXT-048 — deprecated OpenAI skills catalog

- **Source:** `openai/skills` → `README.md`
- **Pinned revision:** `49f948faa9258a0c61caceaf225e179651397431`
- **Canonical URL:** https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/README.md
- **Category:** Deprecated skill catalog
- **Storyworld capability:** None; historical migration and deprecation evidence
- **Existing Storyworld skill:** storyworld-skill-authoring-and-evaluation
- **Disposition:** **G — Reject**
- **Priority:** P2
- **License:** Per-skill license; repository deprecated
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** The repository explicitly directs users to `openai/plugins` and marks itself deprecated.
- **Overlap:** No current adoption value; useful only as a deprecation fixture.
- **Customization required:** Do not import. Record as evidence that upstream repository status must be checked on every upgrade.
- **Security:** Staleness and per-skill license risk.
- **Portability:** Low.
- **Customization effort:** Low
- **Recommended next action:** Reject and include in upstream-disappearance/deprecation tests.
- **Decision/adoption record:** No adoption.

### EXT-049 — NVIDIA verified-skill governance patterns

- **Source:** `NVIDIA/skills` → `README.md`
- **Pinned revision:** `0122ea0afacdcf35334e42f56338716cc86d2fdd`
- **Canonical URL:** https://github.com/NVIDIA/skills/blob/0122ea0afacdcf35334e42f56338716cc86d2fdd/README.md
- **Category:** Skill catalog governance
- **Storyworld capability:** Source pinning, mirrored metadata, deprecation detection, compatibility, skill cards and evaluation evidence
- **Existing Storyworld skill:** storyworld-skill-authoring-and-evaluation / storyworld-engineering
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P1
- **License:** Apache-2.0 code; CC-BY-4.0 content
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** A vendor-maintained mirrored catalog with generated metadata, update checks, removed/merged skill handling, and public governance materials.
- **Overlap:** Complementary as a trust-pipeline precedent, but NVIDIA verification cannot confer trust inside Storyworld.
- **Customization required:** Study exact-source capture, metadata generation, stale/removed skill detection, and per-skill evaluation cards. Preserve Storyworld owner adoption, no-permission rule, security review, and source-repository authority.
- **Security:** Catalog installers and synced content require review; content license includes CC-BY-4.0.
- **Portability:** High concept portability.
- **Customization effort:** Medium
- **Recommended next action:** Use as an architectural reference for the skill registry and upgrade workflow.
- **Decision/adoption record:** No direct adoption; inform new skill-authoring decision.

### EXT-050 — Turnstile skill hardening patterns

- **Source:** `cloudflare/skills` → `skills/turnstile/SKILL.md`
- **Pinned revision:** `30553f89ae1ef1e3c2917cd09d72dac992bb4e9a`
- **Canonical URL:** https://github.com/cloudflare/skills/blob/30553f89ae1ef1e3c2917cd09d72dac992bb4e9a/skills/turnstile/SKILL.md
- **Category:** Executable skill hardening
- **Storyworld capability:** Safe helper scripts, secret handling, network errors, cleanup, and deterministic output
- **Existing Storyworld skill:** storyworld-security-review / storyworld-deterministic-media-worker / storyworld-provider-adapter
- **Disposition:** **D — Extract selected rules only**
- **Priority:** P1
- **License:** Apache-2.0
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Recent hardening work demonstrates structured JSON generation, mode-600 temp files, secrets out of argv, isolated Python, checked prerequisites, structured failures, and cleanup safety nets.
- **Overlap:** The Turnstile domain is irrelevant, but the script-hardening rules are highly relevant to provider and media worker skills.
- **Customization required:** Extract only the hardening rules and create Storyworld-specific examples. Do not copy product-specific scripts or API behavior.
- **Security:** Executable shell/Python examples and external API calls require review; Apache-2.0 permits adaptation with notices.
- **Portability:** High concept portability.
- **Customization effort:** Low
- **Recommended next action:** Merge into skill-security, deterministic-worker, and provider-adapter references.
- **Decision/adoption record:** Minor-version amendments and attribution.

### EXT-051 — Remotion agent skills

- **Source:** `remotion-dev/skills` → `skills/remotion-create/SKILL.md`
- **Pinned revision:** `4951f6aca2a236f2f2a2bff4734566963fe12707`
- **Canonical URL:** https://github.com/remotion-dev/skills/blob/4951f6aca2a236f2f2a2bff4734566963fe12707/skills/remotion-create/SKILL.md
- **Category:** Programmatic video rendering
- **Storyworld capability:** Browser/runtime video composition and deterministic render adapters
- **Existing Storyworld skill:** storyworld-runtime-adapter / storyworld-native-media-workspace
- **Disposition:** **F — Disposable experiment**
- **Priority:** P2
- **License:** Package/file-level license review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Official Remotion-oriented skills for creating and marking up programmatic React video.
- **Overlap:** Useful specialist reference for one renderer, but not Storyworld’s canonical editorial or creative model.
- **Customization required:** Pilot as a browser/video runtime target behind Storyworld operations and OTIO/export boundaries. Keep Remotion composition code and private props as noncanonical execution artifacts.
- **Security:** Executable package/tooling, browser rendering, asset fetching, and package/file licensing require review.
- **Portability:** Medium; React/Remotion-specific.
- **Customization effort:** High
- **Recommended next action:** Run a disposable renderer POC for one captioned social-video fixture; compare with FFmpeg-only and browser runtime paths.
- **Decision/adoption record:** POC decision before any dependency or profile.

### EXT-052 — plugin-creator patterns

- **Source:** `openai/plugins` → `.agents/skills/plugin-creator/SKILL.md`
- **Pinned revision:** `11c74d6ba24d3a6d48f54a194cd00ef3beea18f9`
- **Canonical URL:** https://github.com/openai/plugins/blob/11c74d6ba24d3a6d48f54a194cd00ef3beea18f9/.agents/skills/plugin-creator/SKILL.md
- **Category:** Plugin and skill packaging
- **Storyworld capability:** Optional multi-client packaging and plugin manifests
- **Existing Storyworld skill:** storyworld-skill-authoring-and-evaluation / storyworld-engineering
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P2
- **License:** Per-plugin or per-file license; file-level review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Current Codex plugin-repository guidance for packaging skills and manifests.
- **Overlap:** Storyworld currently uses repository-local `.agents`; plugin distribution is a later concern.
- **Customization required:** Study manifest separation and portability adapters. Do not replace Storyworld capability provenance or automatically package skills for external distribution.
- **Security:** Plugin manifests and connectors may broaden tools or external effects; file-level license review required.
- **Portability:** Medium; Codex-specific.
- **Customization effort:** Medium
- **Recommended next action:** Reference only until Storyworld distributes capabilities outside its repository.
- **Decision/adoption record:** No adoption.

### EXT-053 — Agent Skills installer/catalog patterns

- **Source:** `agentskills/agentskills` → `docs/client-implementation/adding-skills-support.mdx`
- **Pinned revision:** `38a2ff82958afee88dadf4831509e6f7e9d8ef4e`
- **Canonical URL:** https://github.com/agentskills/agentskills/blob/38a2ff82958afee88dadf4831509e6f7e9d8ef4e/docs/client-implementation/adding-skills-support.mdx
- **Category:** Skill discovery and portability
- **Storyworld capability:** Client adapters, discovery, progressive loading, skill removal and upgrade behavior
- **Existing Storyworld skill:** storyworld-engineering / proposed storyworld-skill-authoring-and-evaluation
- **Disposition:** **E — Architectural or instructional reference only**
- **Priority:** P1
- **License:** Apache-2.0 code; CC-BY-4.0 documentation
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Client-implementation guidance for discovering and progressively loading portable skills.
- **Overlap:** Complementary to Storyworld’s registry; direct installer behavior would bypass adoption decisions.
- **Customization required:** Study discovery and progressive loading only. Storyworld installations must use reviewed overlays, collision checks, exact revisions, and explicit adoption records.
- **Security:** Installer or client integration can copy files and alter agent configuration.
- **Portability:** High concept portability.
- **Customization effort:** Medium
- **Recommended next action:** Use as reference for a future read-only skill catalog and compatibility export.
- **Decision/adoption record:** No direct adoption.

### EXT-054 — Bulk public skill catalogs and mirrors

- **Source:** `github/awesome-copilot` → `README.md`
- **Pinned revision:** `336af71f1b7d2e6e15a8a986ba79ca031a40549b`
- **Canonical URL:** https://github.com/github/awesome-copilot/blob/336af71f1b7d2e6e15a8a986ba79ca031a40549b/README.md
- **Category:** Skill discovery catalogs
- **Storyworld capability:** Candidate discovery only
- **Existing Storyworld skill:** storyworld-skill-authoring-and-evaluation
- **Disposition:** **G — Reject**
- **Priority:** P3
- **License:** Repository/file-level license review required
- **Maintenance:** Active at the assessed revision; pin before use.
- **Description:** Large mixed-quality catalogs provide breadth but not sufficient trust, license, or architecture analysis.
- **Overlap:** High duplication and context risk; popularity is not suitability.
- **Customization required:** Use only to discover an original source repository, then assess that source independently. Never install a bulk catalog into Storyworld.
- **Security:** Mixed licensing, executable hooks, remote instructions, duplicate triggers, and supply-chain risk.
- **Portability:** Low as an installable unit.
- **Customization effort:** High
- **Recommended next action:** Reject bulk adoption.
- **Decision/adoption record:** No adoption.
