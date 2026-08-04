# Repository-Cluster Analysis

The clusters below compare the strongest sources, state what should be merged into Storyworld, identify rejects, and preserve the boundary that Storyworld must continue to own.

## 1. React composition and component APIs

**Storyworld need:** Storyworld Studio needs reusable complex-workspace primitives without boolean-prop explosions or hidden state ownership.

**Candidates reviewed:**
- EXT-001 — composition-patterns (vercel-labs/agent-skills)
- EXT-008 — frontend-ui-engineering (addyosmani/agent-skills)

**Best source or combination:** EXT-001 composition-patterns

**Merge into Storyworld:** Add a `component-composition.md` reference to `storyworld-studio-surface`; use Addy’s broader UI skill only for complementary accessibility/state examples.

**Reject or constrain:** Do not copy generic state patterns that create client-side shadow authority or optimistic acceptance.

**Storyworld must continue to own:** Command semantics, exact-version state, selection model, consequence preview, and accessible structured equivalents.

## 2. React and Next.js performance

**Storyworld need:** Dense Storyworld workspaces must avoid waterfalls, unnecessary hydration, and bundle growth while preserving correctness.

**Candidates reviewed:**
- EXT-002 — react-best-practices (vercel-labs/agent-skills)
- EXT-020 — performance-optimization (addyosmani/agent-skills)

**Best source or combination:** EXT-002 react-best-practices

**Merge into Storyworld:** Create a measured performance reference beneath `storyworld-studio-surface` and POC/conformance skills.

**Reject or constrain:** Do not adopt framework advice without current official-doc verification or turn performance heuristics into authority rules.

**Storyworld must continue to own:** Representative performance fixtures, acceptable envelopes, correctness and accessibility gates.

## 3. Product design and visual quality

**Storyworld need:** Intent-driven Studio surfaces must feel deliberate and property-aware rather than generic AI UI.

**Candidates reviewed:**
- EXT-003 — web-design-guidelines (vercel-labs/agent-skills)
- EXT-007 — design-taste-frontend (Leonxlnx/taste-skill)
- EXT-008 — frontend-ui-engineering (addyosmani/agent-skills)

**Best source or combination:** Selected rules from EXT-007 and EXT-008; no complete skill.

**Merge into Storyworld:** Add brief-reading, incumbent-system, realistic-content, anti-template, and accessibility-over-aesthetics rules to Storyworld UX/Studio guidance.

**Reject or constrain:** Reject mutable remote instructions, global aesthetic dials, font/icon bans, and landing-page rules for dense workspaces.

**Storyworld must continue to own:** Product-specific visual hierarchy, property design systems, accessibility, and authority clarity.

## 4. Accessibility and browser evidence

**Storyworld need:** Canvas, timeline, graph, media, and conversational surfaces need tested visual and structured equivalents.

**Candidates reviewed:**
- EXT-003 — web-design-guidelines (vercel-labs/agent-skills)
- EXT-008 — frontend-ui-engineering (addyosmani/agent-skills)
- EXT-022 — Playwright CLI skills and command surface (microsoft/playwright-cli)

**Best source or combination:** Existing Storyworld UX plus a Playwright CLI POC.

**Merge into Storyworld:** Strengthen browser-QA references, not a new accessibility skill.

**Reject or constrain:** Automated scans as conformance proof, persistent real-user browser profiles, and remote mutable audit rules.

**Storyworld must continue to own:** WCAG target, keyboard/screen-reader parity, participant evidence, and complex-workspace semantics.

## 5. API, schema, and migration design

**Storyworld need:** Storyworld’s growing contract pack needs stable, additive, misuse-resistant interfaces and migration proof.

**Candidates reviewed:**
- EXT-009 — api-and-interface-design (addyosmani/agent-skills)
- EXT-018 — deprecation-and-migration (addyosmani/agent-skills)
- EXT-029 — property-based-testing (trailofbits/skills)
- EXT-033 — sharp-edges (trailofbits/skills)

**Best source or combination:** EXT-009 plus selected EXT-018/029/033 rules.

**Merge into Storyworld:** Amend contract-authoring and schema-evolution with observable-behavior, boundary validation, deprecation, property, and sharp-edge checks.

**Reject or constrain:** Generic REST conventions or library defaults that conflict with accepted Storyworld contracts.

**Storyworld must continue to own:** Authority, lifecycle, exact-version, idempotency, error, package, and public-contract semantics.

## 6. Specification, planning, and governed change

**Storyworld need:** Large architecture phases need coherent specs, plans, tasks, fixtures, and evidence without duplicate governance.

**Candidates reviewed:**
- EXT-010 — source-driven-development (addyosmani/agent-skills)
- EXT-012 — incremental-implementation (addyosmani/agent-skills)
- EXT-017 — documentation-and-adrs (addyosmani/agent-skills)
- EXT-024 — Spec Kit core workflow (github/spec-kit)

**Best source or combination:** Source/incremental rules from Addy; Spec Kit as reference only.

**Merge into Storyworld:** Improve governed-change, decision-impact, and POC cross-artifact checks.

**Reject or constrain:** Installing Spec Kit or creating a second constitution, task system, or acceptance plane.

**Storyworld must continue to own:** Decisions, tasks, evidence, gates, dossier, and owner ratification.

## 7. Context engineering and routing

**Storyworld need:** A 33-skill library can overactivate and consume excessive context.

**Candidates reviewed:**
- EXT-011 — context-engineering (addyosmani/agent-skills)
- EXT-021 — using-agent-skills (addyosmani/agent-skills)
- EXT-025 — Advanced Context Engineering for Coding Agents (humanlayer/advanced-context-engineering-for-coding-agents)
- EXT-041 — Agent Skills specification and creator guidance (agentskills/agentskills)
- EXT-042 — Custom agent and handoff guidelines (github/awesome-copilot)
- EXT-049 — NVIDIA verified-skill governance patterns (NVIDIA/skills)
- EXT-053 — Agent Skills installer/catalog patterns (agentskills/agentskills)

**Best source or combination:** Agent Skills progressive disclosure plus Storyworld’s own router.

**Merge into Storyworld:** Add context budgets, trigger fixtures, minimal handoffs, conflict resolution, stale/removal detection, and client-adapter separation.

**Reject or constrain:** Bulk installers, vendor trust badges as adoption, or platform metadata in canonical provenance.

**Storyworld must continue to own:** Authority-first reading order, registry, provenance, adoption state, and routing graph.

## 8. Debugging and completion verification

**Storyworld need:** Cross-component failures require evidence-driven root cause and honest closure.

**Candidates reviewed:**
- EXT-014 — debugging-and-error-recovery (addyosmani/agent-skills)
- EXT-026 — systematic-debugging (obra/superpowers)
- EXT-027 — verification-before-completion (obra/superpowers)

**Best source or combination:** EXT-026 systematic-debugging plus EXT-027 closure gate.

**Merge into Storyworld:** Create `storyworld-systematic-debugging`; amend conformance and governed-change.

**Reject or constrain:** Speculative fixes, sensitive diagnostic logging, and completion claims based on partial or stale checks.

**Storyworld must continue to own:** Unknown-outcome semantics, privacy, tenant boundaries, accepted architecture, and evidence receipts.

## 9. PostgreSQL and storage engineering

**Storyworld need:** Storyworld lacks a dedicated skill for RLS, migrations, transactions, query evidence, custody, backup, and reconciliation.

**Candidates reviewed:**
- EXT-023 — supabase-postgres-best-practices (supabase/agent-skills)
- EXT-029 — property-based-testing (trailofbits/skills)

**Best source or combination:** EXT-023 Supabase Postgres rules adapted to product-neutral PostgreSQL.

**Merge into Storyworld:** Create `storyworld-postgres-and-storage-engineering`.

**Reject or constrain:** Supabase platform coupling, RLS bypasses, and object-path authority.

**Storyworld must continue to own:** Module/table ownership, tenant model, semantic asset records, blob identity, migrations, and custody invariants.

## 10. Testing, properties, and mutation

**Storyworld need:** Contracts, state machines, adapters, and packages need stronger invariant coverage.

**Candidates reviewed:**
- EXT-013 — test-driven-development (addyosmani/agent-skills)
- EXT-028 — test-driven-development (obra/superpowers)
- EXT-029 — property-based-testing (trailofbits/skills)
- EXT-030 — mutation-testing (trailofbits/skills)

**Best source or combination:** Property-based rules from EXT-029 plus red-green proof.

**Merge into Storyworld:** Amend fixture-authoring and schema-evolution; run mutation testing only as a POC.

**Reject or constrain:** Fixed test ratios, trivial properties, unbounded mutation campaigns, or copied share-alike text without review.

**Storyworld must continue to own:** Fixture semantics, defect taxonomy, rights-safe media, expected findings, and validation gates.

## 11. Application, skill, and supply-chain security

**Storyworld need:** Storyworld integrates providers, media parsers, custom nodes, external workfiles, skills, and CI actions.

**Candidates reviewed:**
- EXT-016 — security-and-hardening (addyosmani/agent-skills)
- EXT-031 — differential-review (trailofbits/skills)
- EXT-032 — insecure-defaults (trailofbits/skills)
- EXT-033 — sharp-edges (trailofbits/skills)
- EXT-034 — supply-chain-risk-auditor (trailofbits/skills)
- EXT-036 — skill-scanner (getsentry/skills)
- EXT-040 — agentic-actions-auditor (trailofbits/skills)
- EXT-046 — claude-code-security-review (anthropics/claude-code-security-review)
- EXT-050 — Turnstile skill hardening patterns (cloudflare/skills)

**Best source or combination:** Storyworld security-review strengthened with manual-first skill scanner, fail-closed, sharp-edge, and executable-hardening profiles.

**Merge into Storyworld:** Amend security-review; keep scanners/actions as separately authorized pilots.

**Reject or constrain:** A generic OWASP checklist or a clean scanner result as proof of Storyworld safety.

**Storyworld must continue to own:** Threat model, provider egress, authority, media/workfile risks, plugin/node policy, tenant isolation, and human review.

## 12. Skill authoring, evaluation, and governance

**Storyworld need:** The proposed library needs a repeatable lifecycle for source adaptation, trigger precision, holdouts, context cost, security, upgrades, and retirement.

**Candidates reviewed:**
- EXT-036 — skill-scanner (getsentry/skills)
- EXT-037 — skill-writer (getsentry/skills)
- EXT-041 — Agent Skills specification and creator guidance (agentskills/agentskills)
- EXT-042 — Custom agent and handoff guidelines (github/awesome-copilot)
- EXT-044 — skill-creator (anthropics/skills)
- EXT-047 — plugin-eval improve-skill workflow (openai/plugins)
- EXT-049 — NVIDIA verified-skill governance patterns (NVIDIA/skills)
- EXT-052 — plugin-creator patterns (openai/plugins)
- EXT-053 — Agent Skills installer/catalog patterns (agentskills/agentskills)

**Best source or combination:** Sentry skill-writer + Agent Skills specification, adapted through Storyworld governance.

**Merge into Storyworld:** Create `storyworld-skill-authoring-and-evaluation` and refine the engineering router.

**Reject or constrain:** Bulk catalogs, automatic installation, self-adoption, or executable hooks before review.

**Storyworld must continue to own:** Provenance, permission_grant:false, adoption decisions, side effects, trust class, validators, and replacement strategy.

## 13. Operational observability and customer-managed deployment

**Storyworld need:** Provider jobs, Temporal workflows, media workers, publication, runtime, and private deployments need redacted operational evidence.

**Candidates reviewed:**
- EXT-019 — observability-and-instrumentation (addyosmani/agent-skills)
- EXT-034 — supply-chain-risk-auditor (trailofbits/skills)
- EXT-050 — Turnstile skill hardening patterns (cloudflare/skills)

**Best source or combination:** Selected observability and hardening rules under existing skills.

**Merge into Storyworld:** Add provider, conformance, deterministic-worker, and deployment profiles.

**Reject or constrain:** Sensitive payload logging, automatic upgrades, or telemetry egress without policy.

**Storyworld must continue to own:** Receipts, retention, egress, health semantics, runbooks, backup/restore, and outage behavior.

## 14. Media and creative-tool skills

**Storyworld need:** Storyworld needs safe guidance for rendering and precision tools, but external applications remain nonauthoritative.

**Candidates reviewed:**
- EXT-051 — Remotion agent skills (remotion-dev/skills)

**Best source or combination:** Remotion as a disposable renderer reference; no credible reusable OpenRouter, fal.ai, ComfyUI, Blender, InvokeAI, Kdenlive, Resolve, OTIO, or Godot skill package was found that meets the standard.

**Merge into Storyworld:** Keep current Storyworld provider/media/tool skills grounded in official product documentation and repository-specific contracts.

**Reject or constrain:** Provider-native prompts, model IDs, workflows, workfiles, or renderer props becoming canonical creative authority.

**Storyworld must continue to own:** Creative commands, recipes, custody, external checkout, evaluations, and exact human decisions.

## 15. Rejected deployment and catalog shortcuts

**Storyworld need:** Prevent hidden external effects and low-trust bulk adoption.

**Candidates reviewed:**
- EXT-006 — vercel-deploy-claimable (vercel-labs/agent-skills)
- EXT-048 — deprecated OpenAI skills catalog (openai/skills)
- EXT-054 — Bulk public skill catalogs and mirrors (github/awesome-copilot)

**Best source or combination:** None.

**Merge into Storyworld:** Use only as adversarial fixtures.

**Reject or constrain:** Direct deployment skills, deprecated catalogs, and bulk catalog installation.

**Storyworld must continue to own:** Every deployment, adoption, credential, spending, and publication gate.
