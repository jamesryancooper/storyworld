---
name: storyworld-ux
description: Storyworld-specific UX/UI auditing and implementation guidance for Storyworld Studio. Use when Codex needs to critique or improve a creator journey, onboarding, information architecture, interaction clarity, dense or multi-pane workspaces, layered navigation, graph/canvas interfaces, multi-author collaboration, compare user-supplied mockups or reference visuals with Studio or assess their implied feature gaps, assess canon/release consequences or creative provenance, evaluate proposal/canon/release authority cues or AI-assistance presentation, review accessibility, keyboard, responsive, theme, loading/empty/error/conflict/unknown states, run browser-based visual QA, or plan usability research across Command Center, World Bible, Arc Board, Generation Workbench, Continuity Console, Review Room, Release Builder, or Settings. Do not use for backend-only work with no user-facing behavior.
---

# Storyworld UX

Audit or guide improvements to Studio as a governed creative workbench, not as
a generic dashboard. Help a creator understand the world, characters, places,
rules, arcs, proposals, canon, continuity, assets, review, release, and
publishing boundaries without overstating the accepted V1 alpha.

## Follow authority before product advice

Apply this order:

1. Follow current operator and platform instructions.
2. Read applicable `AGENTS.md`, `.agent/policy.json`, `.agent/context.json`,
   `.agent/state/current.json`, and only relevant accepted decisions and active
   tasks.
3. Inspect current Studio code, tests, and rendered behavior before relying on
   summaries, after any eligible protected first-use pass is recorded or
   safely declined.
4. Use the canonical dossier as intended-product context, never as permission
   or proof of current implementation.

Treat “audit,” “review,” and “critique” as read-only requests. Edit Studio only
when the operator explicitly asks to change, fix, build, redesign, or
implement. A finding, backlog item, test plan, or this skill never grants
authority to edit, release, publish, use credentials, or open an integration.

Keep work repository-scoped. Use no external dependencies, global installs,
live providers, credentials, production data, deployment, or publication.
Use only current approved tools and loopback services within the task’s
authority. The V1 alpha is accepted and demonstrable, but not production-ready.

## Load only the references needed

For an eligible new-creator, first-use, cold-start, or unguided audit, read
[first-use.md](references/first-use.md) first. If its safe unprimed rendered
preconditions are met, complete that protected pass before loading product
context or intended-path material. If they are not met, record the limitation
and continue normally.

For all other work—and after a protected pass or safe decline—read
[product-context.md](references/product-context.md), then load the smallest
applicable set:

| Request | Read |
|---|---|
| New-creator, first-use, cold-start, or unguided audit | [first-use.md](references/first-use.md) first, then product context and the task references below |
| UX critique, creator journey, IA, comprehension, authority clarity | [critique.md](references/critique.md) |
| Dense or multi-pane workspace, layered navigation, graph/canvas, or multi-author workflow | [complex-workspaces.md](references/complex-workspaces.md); add accessibility, visual QA, or canon consequences only as implicated |
| Compare supplied mockups or reference visuals with current Studio | [mockup-review.md](references/mockup-review.md); add [mockup-feature-gaps.md](references/mockup-feature-gaps.md) when implied capabilities are in scope, then critique and visual QA; add accessibility or canon consequences only as implicated |
| Canon state, change provenance, affected-work, contradiction, or approval-consequence audit | [canon-consequences.md](references/canon-consequences.md) |
| Accessibility review or accessible implementation | [accessibility.md](references/accessibility.md) |
| Browser, visual, keyboard, responsive, theme, or motion QA | [visual-qa.md](references/visual-qa.md) |
| Usability study, interview guide, or evidence plan | [research-planning.md](references/research-planning.md) |

Load multiple references only for a genuinely mixed request.

## Run the audit workflow

1. **Classify the request.** Separate read-only audit, mockup comparison,
   implementation guidance, implementation, visual QA, accessibility, and
   research planning. For an eligible first-use audit, run `first-use.md`
   before the remaining steps.
2. **Define the creator and task.** Name the creator’s experience, immediate
   goal, exact decision, authoritative system, and consequence of error.
3. **Inspect incumbent truth.** Trace the relevant component, route, API state,
   tests, and current design primitive. Render it when safe and useful.
4. **Trace the full journey.** Include entry, orientation, creation or
   selection, proposal/draft work, review, confirmation, feedback, recovery,
   and return to an authoritative view.
5. **Protect product truth.** Check the invariants below before aesthetics.
6. **Cover material states.** Evaluate loading, empty, success, validation
   failure, permission denial, stale/conflict, unavailable, ambiguous/unknown,
   reduced motion, keyboard-only use, responsive layouts, and light/dark
   themes. Mark a state untested or not applicable with a reason.
7. **Label evidence.** Keep these categories distinct:
   - **Observed fact:** repository source, test, rendered runtime behavior,
     accessibility tree, screenshot, or supplied study artifact inspected
     directly.
   - **Heuristic inference:** expert interpretation or predicted consequence
     based on observed facts.
   - **Synthetic evaluation:** agent walkthrough, role-play, fixture, or
     simulated scenario.
   - **Participant evidence:** supplied or separately authorized evidence from
     a real participant, with source and limits.
8. **Prioritize harm.** Put false authority, accidental canon/release action,
   unsafe ambiguity, blocked critical tasks, lost work, and accessibility
   barriers before efficiency, consistency, or polish.
9. **Recommend the smallest coherent fix.** Identify the shared primitive,
   recurring flow, content rule, route, or local defect involved. Do not
   prescribe a wholesale redesign without evidence.
10. **Report honestly.** Cite route/state and file:line or rendered location,
    state checks actually performed, limitations, and remaining uncertainty.
    Automated scans and synthetic walkthroughs are not compliance or user
    evidence.

## Preserve Storyworld truth and human authority

- Models and tools propose; authorized people decide. Make AI involvement
  visible through origin, candidate/proposal labels, provenance, evidence, and
  limitations without implying autonomous approval.
- Keep draft, proposal, candidate, accepted decision, canon release, production
  pin, release package, submitted work, and published instance visibly and
  semantically distinct.
- For canon changes and releases, use `canon-consequences.md` to test status,
  rationale, creative provenance, affected work, contradiction visibility, and
  exact pre-approval consequences.
- Never let model output, file creation, provider completion, download, or
  positive comment imply accepted canon, approved master, release approval, or
  publication.
- Bind review and release actions to the exact proposal, artifact, canon
  snapshot, version/hash, authority host, and consequence.
- Make consequential actions deliberate and resistant to accidental
  activation. Preserve review context, name the effect, and show durable
  confirmation or receipt.
- Treat continuity as evidence-backed workflow. Show the contradiction,
  affected state, confidence/limits, proposed correction, and human
  disposition; never promise perfect AI consistency.
- On stale, unavailable, malformed, permission-denied, or ambiguous state,
  fail closed. Preserve safe input, block consequential actions, and offer an
  explicit reload, reconcile, revise, or escalation path.
- Do not equate Storyworld creative approval with external publication
  authority. Direct publishing and connected authority remain separate,
  explicit crossings.
- Keep exact IDs, versions, hashes, roles, and technical evidence reachable
  without making internal jargon the only explanation.

## Guide implementation only when requested

Inspect `apps/studio/src/app/globals.css`, the relevant vendored primitive in
`apps/studio/src/components/ui/`, its incumbent usage, API client contract, and
tests before editing. Reuse the current shadcn/ui-pattern source, Tailwind v4
semantic tokens, native controls, light/dark themes, spacing, radius, and focus
behavior. Verify the local API instead of assuming an upstream component
exists.

Model idle, busy, confirmed success, validation failure, permission denial,
stale conflict, unavailable service, and unknown outcome explicitly. Never
optimistically present canon acceptance, review approval, release, publication,
or an ambiguous command as complete. Keep authoritative state on the Engine
side and make client restoration safe under reload and Back/Forward.

Make the narrowest coherent change, update affected accessible-name and
behavior tests, and run the repository’s declared checks in proportion to
risk. Report browser, screen-reader, forced-colors, zoom, theme, or state
coverage that was not executed.

## Produce actionable findings

Use the priority and finding format in `critique.md`. Every finding must
include the affected creator/task, observed fact, separate heuristic
inference, route/state and location, impact, specific remediation,
verification method, confidence based on evidence completeness, and whether
participant validation is needed.

For research plans, stop at hypotheses and an evidence protocol unless real
participant records were supplied or a separate study was authorized. Never
invent participant behavior, quotations, prevalence, metrics, or consensus.
