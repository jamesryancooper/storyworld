# Adversarial Review

The recommendations were tested against the required failure cases. The architecture changes below are mandatory conditions of any later adoption.

## 1. The external skill is abandoned after adoption.

**Required response:** Storyworld retains its adapted rules, source ledger, fixtures, and prior version. Upstream is not a runtime dependency unless separately selected.

## 2. The skill changes its license.

**Required response:** Freeze the last reviewed revision; block upgrade until legal review. Never let an updater overwrite the accepted copy.

## 3. A skill recommends an incompatible framework pattern.

**Required response:** Accepted Storyworld decisions and implementation evidence win. Record the rule as rejected or scoped to a disposable POC.

## 4. Two imported skills conflict.

**Required response:** The Storyworld skill owner reconciles them into one rule with scope and rationale; do not activate both blindly.

## 5. A trigger fires during unrelated work.

**Required response:** Should-not-trigger fixtures and router tests must catch it; narrow the description or move content to a reference.

## 6. A large skill consumes excessive context.

**Required response:** Keep SKILL.md as a router, split focused references, measure activated tokens, and load only task-relevant files.

## 7. A skill executes an unreviewed script.

**Required response:** Block execution. Inventory, threat-review, pin, sandbox, and pilot separately.

## 8. A skill installs unpinned packages.

**Required response:** Reject or modify the procedure to use repository-approved pinned dependencies in an isolated environment.

## 9. A skill reads credentials or private files.

**Required response:** Reject unless the exact access is required, task-authorized, least-privilege, redacted, and covered by security policy.

## 10. A skill encourages production or publishing actions.

**Required response:** Reject direct action. Route through Storyworld authority hosts and explicit current authorization.

## 11. A skill treats generated output as accepted.

**Required response:** Override with candidate/proposal semantics and human exact-version acceptance.

## 12. A skill conflicts with accessibility.

**Required response:** Accessibility and equivalent structured access take precedence; reject or amend the rule.

## 13. A performance rule weakens clarity or correctness.

**Required response:** Reject the optimization. Storyworld optimizes only after correctness, authority, accessibility, and representative measurement.

## 14. A design skill imposes one aesthetic.

**Required response:** Extract neutral critique rules only. Property and product context determine design.

## 15. A test skill creates brittle implementation tests.

**Required response:** Require behavior, contract, property, and user-task evidence; reject implementation-detail assertions unless they guard a required invariant.

## 16. A schema skill suggests a breaking change.

**Required response:** Require successor/migration/compatibility decision and old/new fixture matrix.

## 17. A provider skill leaks provider-native details into canon.

**Required response:** Move them to ProviderExecutionPlan or execution evidence; block the canonical contract change.

## 18. A generic security skill misses media/agent threats.

**Required response:** Use Storyworld threat-specific profiles and adversarial fixtures; generic guidance is only a baseline.

## 19. A skill works only in one agent.

**Required response:** Separate portable instructions from adapter metadata; claim portability only after dry runs.

## 20. An imported skill overwrites a Storyworld skill.

**Required response:** Installer must refuse collisions. Use amendment overlays and explicit merge review.

## 21. An update removes required rules.

**Required response:** Before/after semantic diff and regression fixtures must detect the loss; keep prior version until disposition.

## 22. The repository has mixed licensing.

**Required response:** Treat reuse as blocked until file-level terms and assets are classified.

## 23. A skill contradicts an accepted decision.

**Required response:** Accepted decision remains controlling; prepare a successor proposal if the new direction is desired.

## 24. A recommendation duplicates an existing profile.

**Required response:** Merge only the distinct rule; do not create a new skill.

## 25. The source repository disappears.

**Required response:** Retain hashes, revision, attribution, adapted rationale, and fixtures. No canonical Storyworld data depends on the external repository.

## Resulting library invariants

- No external source is loaded dynamically as operative policy during ordinary skill execution.
- Every adapted rule is traceable to a pinned source and a Storyworld rationale.
- Every capability remains subordinate to the active task and accepted decisions.
- Every executable file is separately inventoried, reviewed, sandboxed, and piloted.
- Every top-level skill has nonoverlapping lifecycle ownership and should-not-trigger fixtures.
- Every skill update is replaceable and reversible without migrating Storyworld canonical data.
- Every completion or adoption claim is backed by fresh evidence.
