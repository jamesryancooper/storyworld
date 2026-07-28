---
{
  "schema_version": "harness.task.v1",
  "id": "TASK-0002",
  "status": "validating",
  "previous_status": "in_progress",
  "title": "Add the development layer: baseline commit, remote + CI, contracts workspace, F0/F1 context pack",
  "authority_basis": "external:operator-instruction-2026-07-28 (project owner Ryan Cooper) — \"Yes, proceed. Complete the items that you can complete.\" following the four-gap assessment; the owner supplied the remote https://github.com/jamesryancooper/storyworld.git, authorizing the push.",
  "owner": "claude-agent (session 2026-07-28)",
  "created_at": "2026-07-28",
  "updated_at": "2026-07-28",
  "dependencies": ["TASK-0001"],
  "scope": "In scope: initial git commit of the ratified baseline; add the owner-provided GitHub remote and push; add a CI workflow running the read-only check and test suite; create the packages/contracts/ workspace skeleton with conventions (no contract content); propose the contract toolchain decision (DEC-0005); create the F0/F1 context pack and assess CTX-0001; add PLAN-0007 (fixture source content, owner-supplied); root README. Out of scope: any F0/F1 contract content, schema authoring, fixture content, accepting DEC-0005, branch protection settings (GitHub UI, owner-side).",
  "acceptance_criteria": [
    "Baseline and development-layer commits exist on main and are pushed to the owner-provided remote.",
    "CI workflow file present, running validate.py --check and the unittest suite on push/PR with Python 3.11+.",
    "packages/contracts/ skeleton exists with conventions READMEs mapping the Appendix B artifact inventory to paths; no invented contract content.",
    "Context pack registered (CTX-0001 assessed applicable, REP-0054) and within its size budget.",
    "PLAN-0007 and DEC-0005 (proposed) recorded; refresh, read-only check, and test suite pass on the final tree."
  ],
  "validation_plan": [
    "python -B .agent/scripts/refresh.py --refresh",
    "python -B .agent/scripts/validate.py --check",
    "python -B -m unittest discover -s .agent/tests -p \"test_*.py\"",
    "git push and, where tooling allows, observe the first CI run"
  ],
  "implementation_result": "Baseline commit 99d95e8 created; remote origin added (owner-provided URL; empty at ls-remote). CI workflow .github/workflows/validate.yml (check + tests, Python 3.11/3.12 matrix, read-only). packages/contracts/ skeleton with conventions READMEs (adr, schemas, openapi, events, lifecycles, fixtures, tests, sdk) mapped to Appendix B. DEC-0005 (toolchain) proposed. Context pack f0-f1-contract-pack.md created; CTX-0001 assessed applicable; REP-0054 and REP-0040 registered. PLAN-0007 (owner-supplied fixture content) and PLAN-0006 note added. Root README added. Push and CI observation pending.",
  "review_evidence": [],
  "blocked_by": [],
  "reopened_by": null,
  "acceptance_criteria_met": false,
  "closure_evidence": [],
  "external_effects": "external_reversible",
  "limitations": [
    "External effect detail: git push to https://github.com/jamesryancooper/storyworld.git, authorized by the owner supplying the remote in the operator instruction; reversible by the owner (branch reset/repo deletion)."
  ]
}
---

## Scope

In scope: the four development-layer gaps the owner approved (commit/remote/
CI; contracts workspace; context pack; fixture-content plan item). Out of
scope: contract content itself, DEC-0005 acceptance, GitHub-side settings.

## Acceptance criteria

- [ ] Both commits pushed to the owner-provided remote
- [ ] CI workflow present and correct
- [ ] Contracts workspace skeleton with conventions
- [ ] Context pack registered within budget
- [ ] PLAN-0007 + DEC-0005 recorded; validation green

## Risks and gates

- Side effects: repository-local writes plus one authorized external effect
  (push to the owner's GitHub remote).
- Sensitive data: none; CI uses no secrets.
- Rollback: git history; remote can be force-reset by the owner if needed.

## Evidence and closure

- Filled at closure.
