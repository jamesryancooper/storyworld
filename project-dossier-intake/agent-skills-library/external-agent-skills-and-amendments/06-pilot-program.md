# Bounded Pilot Program

No executable external skill, CLI, scanner, CI action, or dependency should be adopted from this research without a bounded pilot when the disposition is `F` or the proposed Storyworld skill depends on unproven behavior.

## PILOT-01 — Skill authoring and trigger evaluation

- **Research question:** Can the proposed Storyworld skill-authoring workflow improve trigger precision and reduce context cost without weakening authority or evidence?
- **External source records:** EXT-037, EXT-041, EXT-047
- **Storyworld fixture:** Revise a copy of `storyworld-provider-model-evaluation` using 12 should-trigger, 12 should-not-trigger, 8 working, and 8 holdout requests.
- **Baseline:** Current proposed skill package and validator.
- **Agent environments:** Codex, Claude Code-compatible dry run, Generic Agent Skills parser
- **Human review:** Owner/engineering review of before/after traces and outputs.
- **Reversion plan:** Delete pilot copy; original library remains unchanged.
- **Decision produced:** Adopt, revise, or reject the new skill-authoring capability.

### Success criteria

- No false-positive activation on unrelated media work
- At least equal task-quality on holdouts
- Smaller or equal activated context
- All provenance and authority fields preserved
- No executable dependencies

### Failure criteria

- Trigger accuracy worsens
- Holdout quality drops
- Authority/provenance rules disappear
- Requires unreviewed external scripts

### Security restrictions

- Use copies only
- No global config
- No network or installation
- Manual review of all generated files

## PILOT-02 — Systematic debugging

- **Research question:** Does the root-cause-first workflow reduce speculative fixes and improve defect localization?
- **External source records:** EXT-026, EXT-014, EXT-027
- **Storyworld fixture:** Three seeded defects: stale client state, duplicate webhook, and cross-package config propagation failure.
- **Baseline:** Current repository orientation plus governed change without a dedicated debugging skill.
- **Agent environments:** Codex, Claude Code
- **Human review:** Blind comparison of traces and fix quality.
- **Reversion plan:** Discard pilot branch/copy.
- **Decision produced:** Adopt or revise `storyworld-systematic-debugging`.

### Success criteria

- Correct first failing boundary identified
- One falsifiable hypothesis at a time
- Regression fixture added
- No secret/private logging
- Fresh verification before closure

### Failure criteria

- Patch proposed before evidence
- Multiple speculative fixes
- Unknown outcome collapsed to success/failure
- Diagnostic data leaks

### Security restrictions

- Synthetic fixtures
- Redacted logs
- No live providers

## PILOT-03 — PostgreSQL and RLS engineering

- **Research question:** Can the new database skill improve tenant isolation, migration safety, and query evidence?
- **External source records:** EXT-023, EXT-029
- **Storyworld fixture:** Add an additive tenant-scoped table, RLS policy, index, migration, and cross-tenant tests in a disposable schema.
- **Baseline:** Current Storyworld package/migration conventions without a dedicated database skill.
- **Agent environments:** Codex, Claude Code
- **Human review:** Database/security review of migration and evidence.
- **Reversion plan:** Drop disposable schema and discard patch.
- **Decision produced:** Adopt or revise database/storage skill.

### Success criteria

- RLS negative tests pass
- Migration recovery path proven
- Representative EXPLAIN evidence
- Module ownership preserved
- No Supabase coupling

### Failure criteria

- RLS disabled
- Cross-module SQL bypass
- Unmeasured performance claim
- Object path treated as asset identity

### Security restrictions

- Disposable local database only
- No production credentials or data

## PILOT-04 — React composition patterns

- **Research question:** Do composition rules reduce boolean-prop growth while keeping Storyworld state and authority clear?
- **External source records:** EXT-001, EXT-008
- **Storyworld fixture:** Refactor a copy of a multi-state Review Room component with explicit variants and compound subcomponents.
- **Baseline:** Current component API and tests.
- **Agent environments:** Codex
- **Human review:** UX and code review.
- **Reversion plan:** Discard refactor.
- **Decision produced:** Merge selected composition reference or retain current guidance.

### Success criteria

- Fewer incompatible prop combinations
- No client-side authority
- Accessible names and states preserved
- Behavior tests unchanged or improved

### Failure criteria

- More context/provider nesting
- Hidden state ownership
- Acceptance mutation becomes optimistic
- API less discoverable

### Security restrictions

- Repository-local copy; no installs

## PILOT-05 — React and Next.js performance

- **Research question:** Which Vercel rules improve a real Storyworld surface without weakening correctness?
- **External source records:** EXT-002, EXT-020
- **Storyworld fixture:** Command Center or cross-domain search with representative data and browser traces.
- **Baseline:** Current network, hydration, bundle, and interaction measurements.
- **Agent environments:** Codex, Playwright test runner
- **Human review:** Compare traces and creator journey.
- **Reversion plan:** Revert experiment.
- **Decision produced:** Select rules for Storyworld performance reference.

### Success criteria

- Measured improvement
- No authority/state regression
- No accessibility regression
- No new provider/client coupling

### Failure criteria

- Only synthetic microbenchmark improves
- Correctness or clarity regresses
- Recommendation depends on obsolete framework behavior

### Security restrictions

- Local fixtures and localhost only

## PILOT-06 — Design-quality critique without style lock-in

- **Research question:** Can selected anti-generic-interface rules improve visual quality without imposing a universal aesthetic?
- **External source records:** EXT-007, EXT-008
- **Storyworld fixture:** Audit Command Center, Image Canvas mock, and one property-specific marketing/export surface.
- **Baseline:** Current `storyworld-ux` findings.
- **Agent environments:** Codex, Claude Code
- **Human review:** Owner design review.
- **Reversion plan:** No code changes.
- **Decision produced:** Extract neutral design-quality rules or reject the source.

### Success criteria

- Finds generic layout/copy problems missed by baseline
- Does not prescribe fonts/colors/icons unrelated to the brief
- Accessibility and product truth remain higher priority

### Failure criteria

- Applies landing-page rules to dense Studio workspace
- Creates a house aesthetic across properties
- Adds unapproved dependencies

### Security restrictions

- Read-only audit

## PILOT-07 — Playwright CLI browser evidence

- **Research question:** Does the CLI produce more efficient and useful browser evidence than current ad hoc agent browser use?
- **External source records:** EXT-022
- **Storyworld fixture:** Keyboard, 320px, 200% zoom, forced-colors, reduced-motion, unknown-outcome, and Back/Forward flows on localhost.
- **Baseline:** Current Playwright tests and manual visual QA.
- **Agent environments:** Codex, Claude Code
- **Human review:** Review generated evidence and command trace.
- **Reversion plan:** Remove disposable environment.
- **Decision produced:** Adopt a bounded CLI profile, keep tests only, or reject.

### Success criteria

- Repeatable evidence
- Lower context overhead
- No persistent profile or secret leakage
- Screenshots/traces correctly retained and redacted

### Failure criteria

- Global install required
- Snapshot refs unstable
- Trace includes sensitive fixtures
- CLI becomes the only test path

### Security restrictions

- Use pinned local package in disposable environment
- No persistent profile
- Localhost only

## PILOT-08 — Property-based contract testing

- **Research question:** Do property tests expose contract and adapter bugs that example fixtures miss?
- **External source records:** EXT-029
- **Storyworld fixture:** GenerationRecipe/ProviderExecutionPlan conversion, package roundtrip, and lifecycle transitions.
- **Baseline:** Existing example and golden fixtures.
- **Agent environments:** Codex
- **Human review:** Contract owner reviews properties and failures.
- **Reversion plan:** Remove POC dependency/tests if rejected.
- **Decision produced:** Add property-testing profile and approved library or retain example-only approach.

### Success criteria

- Finds at least one meaningful edge case or materially increases domain coverage
- Seeds replay
- Shrunk failure is understandable
- Runtime remains bounded

### Failure criteria

- Only trivial no-crash properties
- Flaky/nonreproducible results
- Excessive runtime
- License text copied improperly

### Security restrictions

- No external calls
- Repository-approved dependency only after POC authorization

## PILOT-09 — Skill supply-chain scanner

- **Research question:** Can the Sentry methodology find material risks in a copied skill library without unacceptable false positives or hidden effects?
- **External source records:** EXT-036
- **Storyworld fixture:** A synthetic library with safe security references, malicious symlink, hook, postinstall, secret read, remote instruction fetch, and hidden image metadata.
- **Baseline:** Manual Storyworld security review checklist.
- **Agent environments:** Codex
- **Human review:** Security engineer reviews scanner code and findings.
- **Reversion plan:** Destroy container and discard results if unsafe.
- **Decision produced:** Adopt manual profile, bounded scanner, or reject.

### Success criteria

- Detects planted risks
- Distinguishes discussing threats from executing them
- Produces no external effects
- Script behavior matches documentation

### Failure criteria

- Executes packages/hooks
- Reads outside fixture
- High false-positive rate on legitimate security docs
- Requires global install

### Security restrictions

- Manual code review first
- Container/no-network execution only if separately approved
- Fixture copy only

## PILOT-10 — Spec consistency checklist

- **Research question:** Can Spec Kit consistency/checklist patterns strengthen Storyworld POC and decision artifacts without introducing a second governance plane?
- **External source records:** EXT-024
- **Storyworld fixture:** One future POC package: research question, plan, contracts, tasks, fixtures, and decision output.
- **Baseline:** Current Storyworld POC template and decision-impact skill.
- **Agent environments:** Codex, Claude Code
- **Human review:** Steward reviews findings against current governance.
- **Reversion plan:** Discard comparison artifacts.
- **Decision produced:** Merge selected consistency patterns or retain existing workflow.

### Success criteria

- Finds real cross-artifact gaps
- Produces Storyworld-native findings only
- No generated command/config installation
- No duplicate task state

### Failure criteria

- Creates `.specify` authority
- Rewrites accepted decisions
- Adds boilerplate without better coverage

### Security restrictions

- Document-only comparison; no CLI installation
