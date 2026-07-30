# Critique and prioritization

Use this reference for read-only UX audits and for the critique phase before
an explicitly requested implementation.

## Contents

- Establish the review frame
- Review in risk order
- Prioritize and format findings
- Assemble the audit report

## Establish the review frame

1. Name the creator, their Storyworld experience, job, exact decision, and
   consequence of misunderstanding.
2. Trace the complete flow from entry and orientation through action,
   confirmation, authoritative result, recovery, and the next task.
3. After any eligible protected first-use pass, inspect the state source and
   relevant tests before treating presentation as product truth.
4. Separate observed facts from heuristic inference. Do not describe a
   predicted reaction as creator behavior.

For an eligible first-use audit, follow `first-use.md`; preserve its raw notes
and any limitation during this expert pass.

## Review in risk order

### Canon, proposal, and AI authority

- Can a creator tell whether content is a draft, human proposal, model
  proposal, candidate, accepted decision, canon release, or published item?
- Is AI origin visible without presenting model confidence or fluent copy as
  authority?
- Does acceptance bind to exact content and stable identity? Is the resulting
  canon/release effect explained?
- Could a toast, badge, generated asset, provider completion, or downloaded
  package imply acceptance or publication that did not occur?

### Review, release, and publishing safety

- Does the decision surface show the exact subject, version/hash, differences,
  evidence, affected approvals, authority host, and irreversible consequence?
- Are accept, reject, revise, waive, snapshot, pin, submit, and publish distinct
  actions with accurate verbs?
- Is the primary action deliberate, protected from accidental activation, and
  followed by durable feedback or a receipt?
- Does a release remain visibly distinct from an external publication? Does
  Storyworld avoid claiming authority owned by another host?

### Orientation and information architecture

- Does the first scan answer: What world am I in? What is official? What is
  being worked on? What needs me? What should I do next?
- Can a new creator connect properties, World Bible, characters, places,
  rules, arcs, productions, assets, proposals, continuity, reviews, and
  releases into one mental model?
- For layered navigation, dense panes, graphs/canvases, or concurrent work,
  add `complex-workspaces.md`.

### Creative comprehension and continuity

- Use plain creative language, with technical IDs and evidence reachable
  nearby.
- Make story time distinct from presentation/release order.
- Explain how accepted canon differs from the production’s pinned snapshot.
- Show a continuity finding’s evidence, severity, scope, confidence/limits,
  suggested correction, affected work, and available human dispositions.
- Do not let “resolved,” “waived,” or “intentional” imply an unrecorded canon
  change.

### State, recovery, and work preservation

- Distinguish validation failure, permission denial, stale conflict,
  unavailable service, rejected operation, and ambiguous/unknown outcome.
- Preserve safe creator input and context on failure.
- Block duplicate or consequential action while busy or ambiguous.
- Offer a specific reload-latest, reconcile, revise, retry-safe, or escalation
  path without inventing current state.
- Check long world names, dense canon, missing values, mixed statuses, and
  conflicting revisions.

### Visual and interaction clarity

- Check hierarchy, reading order, action prominence, grouping, density,
  spacing, contrast, and status treatment in both themes.
- Keep status meaning in text and semantics, not color alone.
- Use links for navigation and buttons for actions.
- Keep disabled controls understandable without hover-only explanation.
- On narrow screens, retain subject identity, exact consequence, and recovery
  rather than hiding critical truth.

## Prioritize and format findings

- **P0:** The UI could imply or perform unauthorized canon, approval, release,
  publication, credential, or external action; model output appears
  authoritative; an ambiguous outcome permits unsafe duplicate action.
- **P1:** A critical creator task is blocked or materially misleading; work may
  be lost; review/release consequences are unsafe; a severe accessibility
  barrier prevents completion.
- **P2:** Significant comprehension, efficiency, navigation, responsive,
  theme, or consistency issue with a viable path remaining.
- **P3:** Local polish issue with low task, authority, or continuity impact.

Do not infer frequency or prevalence from a heuristic audit.

```text
[P1] Short finding title
Affected creator/task: ...
Route/state/location: /route · state · file.tsx:line or rendered region
Observed fact: source, test, rendered behavior, screenshot, tree, or supplied record
Heuristic inference: interpretation and plausible consequence
Impact: ...
Remediation: smallest coherent change
Verify: exact state, viewport/theme, input method, test, or browser check
Confidence: high | medium | low based on evidence completeness
Participant validation: required | useful | not needed for this claim
```

Include positive evidence only when it protects an invariant worth retaining.
If rendered behavior was not checked, say so.

## Assemble the audit report

Report:

1. Scope, creator journey, current alpha boundary, and evidence coverage.
2. Task outcomes and state matrix, with untested states marked.
3. Most consequential findings, followed by the complete prioritized list.
4. Preserved strengths and design-system invariants.
5. Immediate, near-term, and structural recommendations.
6. Smallest coherent improvement set and engineering verification plan.
7. Research questions that require real participants.

Do not issue a numeric usability score unless explicitly requested. If asked,
mark unobserved dimensions unknown and label the score heuristic.
