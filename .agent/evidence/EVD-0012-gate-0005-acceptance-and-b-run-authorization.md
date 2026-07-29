---
{
  "schema_version": "harness.evidence.v1",
  "id": "EVD-0012",
  "title": "GATE-0005 acceptance and B-run authorization; CF reference implementation observed",
  "task": "TASK-0006",
  "recorded_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) operator instructions of 2026-07-28",
  "owner": "claude-agent (session 2026-07-28), recording the owner's decisions and a direct observation",
  "scope": "DEC-0011 acceptance (GATE-0005), DEC-0012 acceptance (B-run authorization, deferrals, Next.js + delegated design system, hosted-generation posture, InvokeAI-local direction with SRC-0004 guidance), and read-only inspection of /Users/jamesryancooper/Projects/commerce-foundry",
  "method": "In-session owner sign-off ('I do sign off on the remaining three items') plus explicit posture instructions; direct read-only inspection of the CF repository's integrations and README documentation",
  "environment": "Operator session, 2026-07-28",
  "subject_revision_or_fingerprint": "storyworld-platform at 5cd252d; commerce-foundry working tree as read 2026-07-28",
  "result": "pass",
  "fresh_until": "2026-10-28",
  "supersedes": null,
  "limitations": [
    "CF observation is documentation- and file-level (integrations READMEs, test inventory, structure); no CF code was executed."
  ]
}
---

## Observations

- DEC-0011 and DEC-0012 accepted; GATE-0005 passed; B phases opened
  (PLAN-0011..0014, PLAN-0011 in progress).
- Commerce Foundry contains substantial implementation: Temporal-workflow
  and Playwright e2e suites, a governed fal edit contract with 202-poll and
  SSRF/size guards, a handoff-ticket/verified-receipt protocol, and
  live-verified InvokeAI (fork-addition provider; mask polarity confirmed)
  and ComfyUI (node pack) integrations, with setup scripts. DEP-0001
  updated to monitoring; SRC-0005 records the reference.
