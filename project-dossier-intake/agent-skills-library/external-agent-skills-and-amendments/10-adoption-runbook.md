# Adoption Runbook

This runbook describes how to move from this research package to governed Storyworld capability changes. It does not itself authorize adoption or repository modification.

## Stage 1 — Register the research

1. Preserve this package as staged evidence outside governed authority.
2. Record the assessed Storyworld commit and every external source revision.
3. Add source/license records to the intake research register.
4. Update the intake manifest and canonical impact map through the normal steward process.
5. Do not copy `overlay/` into `.agents/` yet.

## Stage 2 — Disposition the architecture

1. Review the three proposed new skills independently.
2. Review each existing-skill amendment as a separate or grouped decision.
3. Confirm that no amendment conflicts with an accepted Storyworld decision.
4. Assign maintainers and disposition owners.
5. Mark unresolved licensing, executable, or portability questions as blockers.

## Stage 3 — Run the high-priority pilots

Recommended order:

1. Skill authoring and trigger evaluation.
2. Systematic debugging.
3. PostgreSQL and RLS engineering.
4. React composition.
5. React/Next performance.
6. Design quality without style lock-in.
7. Playwright CLI browser evidence.
8. Property-based contract testing.
9. Skill supply-chain scanner.
10. Spec consistency checklist.

Each pilot remains disposable. A successful pilot produces a decision proposal, not automatic adoption.

## Stage 4 — Prepare capability packages

For each proposed skill or amendment:

1. Re-read the exact source revision.
2. Confirm file-level license and attribution.
3. Write original Storyworld instructions; avoid unnecessary verbatim copying.
4. Keep `SKILL.md` as a concise router and use focused references.
5. Create or update `references/provenance.json` with:
   - version;
   - `adoption_status`;
   - `adoption_decision_ref`;
   - `permission_grant: false`;
   - authority inheritance;
   - side effects;
   - inputs and outputs;
   - prohibited actions;
   - source revisions and license review;
   - included files;
   - limitations;
   - successor and removal metadata.
6. Add should-trigger, should-not-trigger, working, holdout, adversarial, and cross-client fixtures.
7. Add security checks for scripts, hooks, tools, network, secrets, paths, and external effects.
8. Update the registry, routing graph, dependency graph, and manifests.

## Stage 5 — Review and accept

1. Run the capability library validator.
2. Run Storyworld harness refresh/check and tests.
3. Run project typecheck, test, lint, and contract validation in proportion to the change.
4. Review the full diff and source attributions.
5. Confirm the skill does not expand authority or duplicate another lifecycle.
6. Obtain the required accepted decision.
7. Only then set the accepted adoption status and decision reference.

## Stage 6 — Upgrade discipline

For every upstream update:

1. Fetch the exact new revision without overwriting the accepted copy.
2. Compare source, license, scripts, hooks, references, triggers, and dependencies.
3. Classify added or removed rules.
4. Re-run working/holdout, routing, security, portability, and output evals.
5. Prepare an upgrade proposal with rollback.
6. Keep the previous Storyworld version until the update is accepted.

## Stage 7 — Retirement

1. Identify all referencing skills, workflows, agents, tasks, and documentation.
2. Name the successor or reason for removal.
3. Run should-not-trigger and stale-reference tests.
4. Mark deprecated and removal version before deletion when possible.
5. Preserve provenance and adoption evidence.
6. Remove only through a governed change after the replacement is proven.

## Explicit non-actions

- Do not run `npx skills add`, plugin marketplace installers, Spec Kit initialization, or global package installs against Storyworld during review.
- Do not execute external scanners, hooks, or CI actions without a separate threat review and POC.
- Do not enable provider credentials or external network access merely because a skill mentions them.
- Do not copy vendor-specific model defaults or provider workflows into canonical Storyworld contracts.
- Do not accept a skill based on stars, badges, an upstream “verified” label, or a passing static scanner.
