# Project Registers

`../machine-readable/raidq.json` owns item records; this file owns vocabulary,
review method, and summary.

## Vocabulary

Types: risk, assumption, issue, dependency, open_question.
Statuses: open, monitoring, resolved, accepted, invalidated, closed.
Impact wording follows the canonical risk table's severity language
(`../canonical/storyworld/07_backlog_validation_risks_and_recommendation.md`,
section 23), which remains the complete canonical risk catalog; the register
tracks the actively managed subset.

## Summary (2026-07-29)

| ID | Type | Item | Blocking |
|---|---|---|---|
| RISK-0001 | risk | Scope expansion into a universal creative suite | no |
| RISK-0002 | risk | Overgeneralized story schema | no |
| RISK-0003 | risk | Duplicate control planes with Commerce Foundry | no |
| RISK-0004 | risk | Sensitive source leakage (activates at ingestion) | no |
| RISK-0005 | risk | Provider and model dependency | no |
| ASM-0001 | assumption | TypeScript modular-monolith stack — **resolved by DEC-0009** | no |
| DEP-0001 | dependency | Commerce Foundry contract counterpart | no |
| DEP-0002 | dependency | Octon availability for governed agent execution | no |
| OQ-0001 | open_question | Owner ratification of the 2026-07-28 adoption — **resolved 2026-07-28** | no |
| OQ-0002 | open_question | GATE-0002 review of the F0 pack — **resolved** | no |
| OQ-0003 | open_question | DEC-0007 charter v2 acceptance — **resolved** | no |
| ASM-0002 | assumption | B1 provider posture — **resolved by DEC-0012**: hosted APIs, fal first; InvokeAI local editor; no local weights | no |

Review method: revisit each item by its `review_on` date, at phase gates, and
when its trigger condition changes; resolve only against the recorded
resolution condition.
