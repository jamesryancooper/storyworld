---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0002",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "Repository threat model and authority posture",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) acceptance 2026-07-28 (PLAN-0001 review); drafted from direct repository inspection during the adoption session.",
  "owner": "ryan-cooper (project owner)",
  "scope": "Operating posture for humans and agents working in this repository until superseded.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Posture statements are declarative defense in depth, not sandbox enforcement.",
    "Accepted by the project owner on 2026-07-28; revisit the posture when F2 implementation work begins."
  ]
}
---

## Context

The repository is documentation plus governance structure: no code, no
credentials, no personal or production data, no external integrations, no git
commits. Its near-term work is authoring the F0/F1 contract pack and
maintaining the dossier. The main assets to protect are the canonical
Storyworld content (meaning and intent), record integrity (IDs, lifecycles,
supersession), and the boundary between proposal and acceptance.

## Decision

1. **Posture: standing reversible repository-local work.** Reading and
   repository-local edits under an active task are the normal mode. History
   operations (commit/branch) follow the operator's request. External
   publication, deployment, communication, spending, and credential use are
   denied by default and require explicit current authorization per action.
2. **Threats managed:** (a) authority laundering — documentation, plans, or
   generated output treated as permission; (b) silent mutation of accepted or
   canonical material — mitigated by immutable records, supersession, refresh
   discipline, and checksums; (c) status inference — implementation claims
   require dated direct evidence; (d) sensitive-source leakage — no sensitive
   source material enters this repository until the platform's restricted
   source-inbox model (canonical part 05 §15.4) exists; (e) secret exposure —
   no secret values in files, logs, or records.
3. **Enforcement reality:** actual enforcement is the execution platform's
   permission system plus owner review; the harness validator detects (not
   prevents) policy mutations and secret patterns.

## Consequences

- Benefits: clear default answers for agents; proposal/acceptance boundary
  mirrors the platform's own models-propose/humans-authorize principle.
- Costs: per-action authorization for anything external.
- Risks: posture drift as implementation phases begin — revisit at F2.
- Undecided: CI enforcement (no CI exists yet).

## Validation and rollback

- Evidence: policy mutation tests in the harness suite (EVD-0002).
- Reversal: successor decision.

## Acceptance

Accepted by the project owner (Ryan Cooper) on 2026-07-28 in the operator
session, following the in-session overview of all four proposed decisions
(PLAN-0001 review). Recorded by claude-agent on the owner's instruction
"I accept these."
