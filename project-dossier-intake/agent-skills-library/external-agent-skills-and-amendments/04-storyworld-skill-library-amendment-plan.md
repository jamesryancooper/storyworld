# Storyworld Skill-Library Amendment Plan

This plan changes the proposed Storyworld skill library without installing external repositories or treating external rules as authority. Every amendment remains unadopted until the normal Storyworld decision and validation process is complete.

## 1. `storyworld-studio-surface`

- **Proposed version change:** minor
- **External source records:** EXT-001, EXT-002, EXT-007, EXT-008, EXT-022
- **New or amended references:** `component-composition.md`, `react-next-performance.md`, `design-quality-without-style-lock.md`, `browser-qa-playwright-cli.md`
- **Trigger change:** Mention React/Next implementation, component API, performance, visual QA, or browser evidence in the description without broadening to backend-only work.
- **Workflow change:** Add a route that loads only the relevant composition, performance, design-quality, or browser-QA reference.
- **Output-contract change:** Report authority/state regressions separately from performance and visual findings.
- **Decision/adoption requirement:** Amend the proposed skill package; if the skill is later adopted, the amendment must be included in the adopting decision.

### Rules to incorporate

- Prefer composable subcomponents over boolean-prop matrices.
- Keep Engine state authoritative and URL state shareable where appropriate.
- Measure waterfalls and bundle boundaries before optimizing.
- Use realistic content and the current Storyworld design system.
- Require keyboard, screen-reader, zoom, forced-colors, reduced-motion, touch, and structured alternatives for complex canvases.

### Rules to reject or constrain

- Generic optimistic updates for acceptance-class commands.
- Universal aesthetic dials, font bans, icon-family mandates, or motion packages.
- Mutable remote guidelines loaded at runtime.
- Hard-coded performance targets without a representative Storyworld fixture.

### Validation additions

- Existing Studio tests
- Playwright real-browser pilot
- axe plus manual keyboard checks
- bundle/waterfall evidence when performance is claimed

### Required fixtures

- Review Room partial acceptance
- Semantic Timeline 1,000-item view
- Image Canvas structured fallback
- Unknown-outcome command recovery

## 2. `storyworld-security-review`

- **Proposed version change:** minor
- **External source records:** EXT-016, EXT-031, EXT-032, EXT-033, EXT-034, EXT-036, EXT-040, EXT-046, EXT-050
- **New or amended references:** `skill-supply-chain.md`, `fail-closed-and-sharp-edges.md`, `executable-skill-hardening.md`, `github-actions-security.md`
- **Trigger change:** Add imported skill/plugin/custom-node/CI action as explicit triggers.
- **Workflow change:** Add a manual-first skill-supply-chain path and an independently authorized executable-scan path.
- **Output-contract change:** Add source revision, license, executable inventory, permission delta, persistent-config effects, and replacement strategy to findings.
- **Decision/adoption requirement:** Skill amendment plus separate approval for any executable scanner or CI action.

### Rules to incorporate

- Scan imported skills for hidden execution, hooks, symlinks, config poisoning, lifecycle scripts, and overbroad tools.
- Review dangerous defaults and misuse cases, not only known vulnerability classes.
- Pin actions, dependencies, nodes, endpoints, and scripts.
- Keep secrets out of argv, logs, traces, and temporary file permissions.
- Treat all external workfiles, media, provider responses, and callbacks as untrusted.

### Rules to reject or constrain

- Automatic trust from a vendor badge, stars, or a clean static scan.
- Executing imported scanners or hooks before reviewing their code and dependencies.
- Generic security checklists as proof of media-, agent-, or authority-specific safety.

### Validation additions

- Skill-security fixture corpus
- No-network dry run
- Secret-redaction tests
- Symlink and hidden-hook negative cases

### Required fixtures

- Malicious SKILL.md
- npm postinstall
- image metadata instruction
- ComfyUI node egress
- unverified webhook

## 3. `storyworld-contract-authoring`

- **Proposed version change:** minor
- **External source records:** EXT-009, EXT-033
- **New or amended references:** `interface-stability-and-misuse-resistance.md`
- **Trigger change:** No material change; add misuse-resistant interface design to purpose.
- **Workflow change:** Add a consumer/observable-behavior inventory and misuse-case review before schema authoring.
- **Output-contract change:** Require compatibility and misuse-risk sections.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- Design the contract before implementation.
- Treat observable behavior and error semantics as commitments.
- Validate external inputs and provider responses at boundaries.
- Prefer additive evolution and explicit variants.
- Review every interface for dangerous defaults, ambient authority, and easy misuse.

### Rules to reject or constrain

- Generic REST naming rules that conflict with accepted Storyworld OpenAPI.
- Trusting data merely because it came from an internal database.
- Public API convenience that weakens exact-version or authority requirements.

### Validation additions

- Contract tests
- Negative authorization tests
- Consumer fixture
- Unknown-field and old-client fixture

### Required fixtures

- Provider callback
- External editor return
- Publication authorization
- Runtime receipt

## 4. `storyworld-schema-evolution`

- **Proposed version change:** minor
- **External source records:** EXT-009, EXT-018, EXT-029
- **New or amended references:** `deprecation-migration-and-properties.md`
- **Trigger change:** Add serialization, package, adapter, and state-machine changes.
- **Workflow change:** Add property selection and deprecation/removal evidence.
- **Output-contract change:** Require consumer map, migration plan, rollback, and property-test plan.
- **Decision/adoption requirement:** Minor skill amendment and attribution record for adapted concepts.

### Rules to incorporate

- Inventory consumers before changing schema.
- Use additive fields and explicit successor/removal states.
- Use roundtrip, idempotence, oracle, and invariant tests for transforms and packages.
- Prove old and new readers against representative fixtures.

### Rules to reject or constrain

- Breaking enum or required-field changes without migration.
- Maintaining indefinite parallel versions without a removal plan.
- Copied CC-BY-SA language without legal review.

### Validation additions

- Old/new client matrix
- Roundtrip and idempotence tests
- Migration rollback test

### Required fixtures

- Generation recipe v1→v2
- Package import/export
- Capability provenance deprecation

## 5. `storyworld-fixture-authoring`

- **Proposed version change:** minor
- **External source records:** EXT-013, EXT-028, EXT-029, EXT-030
- **New or amended references:** `property-and-mutation-testing.md`
- **Trigger change:** Add parser, serializer, normalization, state-machine, or migration patterns.
- **Workflow change:** Select the strongest useful property before examples; preserve examples for named business cases.
- **Output-contract change:** Record property, generator domain, shrink evidence, oracle, and mutation-survival result.
- **Decision/adoption requirement:** Minor skill amendment; CC-BY-SA source used as conceptual reference only unless legal review permits adaptation.

### Rules to incorporate

- Prefer properties for serialization, normalization, validators, and state transitions.
- Verify bug tests fail for the intended reason before the fix.
- Use mutation testing only in bounded campaigns with equivalent-mutant review.
- Keep adversarial fixtures rights-safe and one-variable-at-a-time.

### Rules to reject or constrain

- Fixed test pyramid ratios.
- Property testing trivial getters or UI presentation.
- Mutation campaigns without CPU/time limits.

### Validation additions

- Fixture self-test
- Red-green proof
- Property seed replay
- Mutation scope cap

### Required fixtures

- Contract roundtrip
- Lifecycle illegal transition
- Provider substitution
- External editor loss report

## 6. `storyworld-governed-change`

- **Proposed version change:** minor
- **External source records:** EXT-010, EXT-012, EXT-013, EXT-017, EXT-027
- **New or amended references:** `source-driven-incremental-change.md`
- **Trigger change:** No broadening; improve task classification and source requirements.
- **Workflow change:** Add source capture before plan, and requirement-by-requirement closure after tests.
- **Output-contract change:** Add source revision, rollback, replacement, skipped verification, and unresolved decision fields.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- Use primary current sources for framework/library facts.
- Deliver one reviewable behavior slice at a time.
- Add rollback and replacement strategy before implementation.
- Use fresh verification before closure.
- Update decisions or dossier only through the governed path.

### Rules to reject or constrain

- Spec Kit installation or a second task/constitution plane.
- Tests-pass therefore requirements-met reasoning.
- Bundled unrelated cleanup.

### Validation additions

- Declared project validators
- Requirement checklist
- Diff scope review

### Required fixtures

- One-schema change
- Provider adapter slice
- Studio state change

## 7. `storyworld-conformance-and-release`

- **Proposed version change:** minor
- **External source records:** EXT-015, EXT-019, EXT-027, EXT-030
- **New or amended references:** `evidence-before-claims.md`, `operational-evidence.md`
- **Trigger change:** Add readiness, completion, release, migration, provider, and deployment claims.
- **Workflow change:** Identify proving command, run, read full output, reconcile requirements, then report actual status.
- **Output-contract change:** Require command, timestamp, exit status, scope, failures, skipped checks, and residual risk.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- No completion claim without fresh proving evidence.
- Verify delegated work independently.
- Map every acceptance criterion to evidence.
- Record operational metrics and redacted traces for provider/workflow behavior.
- Use mutation evidence selectively for critical deterministic logic.

### Rules to reject or constrain

- Partial checks extrapolated to full success.
- Telemetry payloads containing sensitive content.
- Review approval as project-owner acceptance.

### Validation additions

- Fresh full checks
- Manifest/checksum verification
- Operational smoke fixture

### Required fixtures

- False “all tests pass” agent report
- Provider job unknown outcome
- Migration with skipped rollback

## 8. `storyworld-repository-orientation`

- **Proposed version change:** minor
- **External source records:** EXT-010, EXT-011, EXT-025, EXT-035, EXT-038
- **New or amended references:** `minimum-sufficient-context.md`, `agents-md-maintenance.md`
- **Trigger change:** Add task switching, degraded output quality, and instruction maintenance.
- **Workflow change:** Create a context budget and list why each optional source is loaded.
- **Output-contract change:** Return current commit, branch, task, authority refs, relevant paths, evidence gaps, and context exclusions.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- Start with authority and active task, then load the minimum implementation and evidence context.
- Invalidate stale summaries when branch or task changes.
- Use primary sources for mutable technical facts.
- Audit AGENTS scope and conflicts before changing instructions.

### Rules to reject or constrain

- Whole-repository dumps by default.
- A generated context map as authority.
- Editing AGENTS as a convenience without a governed task.

### Validation additions

- Fresh git state
- Referenced-file existence
- No stale task/decision refs

### Required fixtures

- Backend-only task
- Cross-package integration
- AGENTS subtree conflict

## 9. `storyworld-engineering`

- **Proposed version change:** minor
- **External source records:** EXT-011, EXT-021, EXT-041, EXT-042, EXT-049, EXT-053
- **New or amended references:** `skill-routing-and-context-budget.md`, `cross-agent-handoffs.md`
- **Trigger change:** Tighten description and add should-not-trigger cases.
- **Workflow change:** Add context budget, handoff contract, conflict resolution, and no-skill fallback.
- **Output-contract change:** Return selected skills, ordering, loaded references, skipped candidates, authority ceiling, and handoff evidence.
- **Decision/adoption requirement:** Router and skill minor-version amendment.

### Rules to incorporate

- Route to the smallest coherent skill chain.
- Pass minimal explicit context between agents.
- Parent tool availability caps child capability.
- Manual handoff is the default at quality gates.
- Removed, renamed, stale, or conflicting skills must be detected.
- Skill discovery metadata remains lightweight.

### Rules to reject or constrain

- Automatic bulk installation.
- Implicit skill activation for unrelated work.
- Model-specific metadata in Storyworld canonical capability records.
- Vendor verification as adoption authority.

### Validation additions

- Routing fixture matrix
- Should-trigger/should-not-trigger tests
- Dependency-cycle check
- Missing-successor test

### Required fixtures

- Mixed Studio/provider task
- Simple typo that should not load 8 skills
- Removed skill dependency

## 10. `storyworld-poc-execution`

- **Proposed version change:** minor
- **External source records:** EXT-010, EXT-020, EXT-024, EXT-047
- **New or amended references:** `source-backed-poc-and-consistency-check.md`
- **Trigger change:** No material change.
- **Workflow change:** Add clarify/analyze/checklist phases within the existing Storyworld POC artifact.
- **Output-contract change:** Add source revision, baseline, consistency findings, and decision-ready conclusion.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- State one research question and one decision output.
- Capture current primary sources and exact versions.
- Check consistency among question, fixture, success criteria, implementation, and result.
- Measure before optimizing.
- Compare skill or implementation behavior before and after when relevant.

### Rules to reject or constrain

- Spec Kit installation.
- POC code promoted automatically.
- Success based on a demo without replacement, security, accessibility, or teardown evidence.

### Validation additions

- Fixture reproducibility
- Security/accessibility checks
- Teardown verification

### Required fixtures

- Playwright CLI
- Postgres RLS
- skill scanner

## 11. `storyworld-provider-model-evaluation`

- **Proposed version change:** minor
- **External source records:** EXT-037, EXT-041, EXT-047, EXT-049
- **New or amended references:** `working-and-holdout-evaluation.md`
- **Trigger change:** Add skill, prompt, router, and provider-policy evaluation where the same holdout discipline applies.
- **Workflow change:** Add baseline, working set, holdout set, grading rubric, disagreement review, and promotion proposal.
- **Output-contract change:** Require confidence intervals where meaningful, failures, cost/latency, and human disposition.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- Separate working examples from holdouts.
- Evaluate per capability and egress policy, not universal ranking.
- Compare before/after behavior and token/cost/latency.
- Retain failing cases and model/provider versions.
- Do not optimize trigger or routing on the holdout set.

### Rules to reject or constrain

- One aggregate model score.
- Provider-supplied benchmark as sufficient evidence.
- Evaluation output that promotes a model automatically.

### Validation additions

- Holdout isolation
- Version pinning
- Re-run reproducibility

### Required fixtures

- Canon extraction
- Image edit interpretation
- Fallback routing

## 12. `storyworld-provider-adapter`

- **Proposed version change:** minor
- **External source records:** EXT-019, EXT-050
- **New or amended references:** `provider-observability-and-helper-hardening.md`
- **Trigger change:** No material change.
- **Workflow change:** Add helper-script threat review and operational evidence requirements.
- **Output-contract change:** Add redaction and telemetry map.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- Use structured provider errors and correlation IDs.
- Keep secrets out of argv, URLs, logs, and traces.
- Bound waits, retries, callbacks, and cleanup.
- Record actual provider/model, cost, fallback, late completion, and unknown outcomes.
- Validate provider responses as untrusted.

### Rules to reject or constrain

- Provider logs as authority.
- Unbounded polling.
- Raw payload logging.
- Shell command construction with untrusted interpolation.

### Validation additions

- Secret-redaction test
- Duplicate callback
- Late completion
- Network/auth failure

### Required fixtures

- OpenRouter structured output failure
- fal URL expiry

## 13. `storyworld-deterministic-media-worker`

- **Proposed version change:** minor
- **External source records:** EXT-034, EXT-050
- **New or amended references:** `worker-supply-chain-and-script-hardening.md`
- **Trigger change:** Add helper-script, container, and dependency updates.
- **Workflow change:** Add threat review before worker profile adoption.
- **Output-contract change:** Require executable inventory, resource limits, egress, SBOM, and cleanup proof.
- **Decision/adoption requirement:** Minor skill amendment and security review.

### Rules to incorporate

- Pin tool/container versions and produce SBOM evidence.
- Use isolated processes, bounded resources, restrictive temp-file modes, no database credentials, and denied network by default.
- Treat media and archive parsing as hostile.
- Return structured errors and transformation receipts.

### Rules to reject or constrain

- Runtime package downloads.
- Unpinned codecs/tools.
- Secrets in process arguments.
- Cleanup that can escape the job directory.

### Validation additions

- Malformed-media corpus
- Decompression limits
- No-egress test
- Temp cleanup

### Required fixtures

- FFmpeg timeout
- Image bomb
- malicious archive

## 14. `storyworld-customer-managed-deployment`

- **Proposed version change:** minor
- **External source records:** EXT-019, EXT-034
- **New or amended references:** `operability-and-supply-chain-profile.md`
- **Trigger change:** Add observability, dependency update, deployment image, backup, or restore.
- **Workflow change:** Add operability evidence and supply-chain review before packaging.
- **Output-contract change:** Require deployment bill of materials, runbook, alerts, recovery proof, and retained data map.
- **Decision/adoption requirement:** Minor skill amendment.

### Rules to incorporate

- Define health/readiness separately.
- Instrument queue age, workflow failures, provider errors, storage reconciliation, and policy denials.
- Produce SBOM and pinned deployment artifacts.
- Test backup, restore, upgrade, rollback, and offline/degraded operation.

### Rules to reject or constrain

- Telemetry that leaves the customer boundary without policy.
- Health endpoints that report ready while dependencies are unavailable.
- Automatic upgrades.

### Validation additions

- Restore test
- Provider outage
- Storage loss/reconciliation
- Upgrade rollback

### Required fixtures

- Single-node private deployment
- Two-machine controlled boundary

## 15. `storyworld-runtime-adapter`

- **Proposed version change:** minor
- **External source records:** EXT-051
- **New or amended references:** `programmatic-video-renderer-reference.md`
- **Trigger change:** Add programmatic video or browser renderer tasks.
- **Workflow change:** Add a renderer-profile POC before dependency selection.
- **Output-contract change:** Require renderer version, source hash, deterministic inputs, output hash, and portability result.
- **Decision/adoption requirement:** Reference addition only until POC decision.

### Rules to incorporate

- Treat renderer source/code as an execution artifact.
- Keep Storyworld runtime/content contract and approvals authoritative.
- Validate asset fetches, fonts, timing, deterministic render inputs, and output custody.
- Produce loss and unsupported-feature reports.

### Rules to reject or constrain

- Remotion props/components as canonical narrative contracts.
- Remote asset fetching without egress and rights checks.
- Automatic promotion of a render.

### Validation additions

- Repeat render hash/visual comparison
- Offline asset test
- Replacement renderer comparison

### Required fixtures

- Captioned 30-second social cut
