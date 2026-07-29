# Handoff Start

> Navigation only. Reinspect the repository and current instructions before
> resuming work.

## Current position (2026-07-29, V1 ACCEPTED — alpha operational)

- F0-F3 accepted (GATE-0001..0005; DEC-0001..0012). B1-B4 built, gated,
  and **accepted by the owner's consolidated DEC-0017 decision on
  2026-07-29** (DEC-0013..0016 accepted by consolidation; EVD-0018
  records the walkthrough, the five findings fixed before acceptance,
  and the in-session acceptance).
- The platform is a working dual-use alpha: engine + Studio workbench
  with credential settings + CF connector/simulator + runtime compiler
  + Instagram export adapter + regression harness, all CI-enforced.
- Reserved crossings are governed individually and remain closed unless
  the owner opens them: fal key via Studio -> Settings (receipted),
  InvokeAI's separate key in InvokeAI's own settings, live CF, live
  channel publication, real IdP.

## Next safe action

None is scheduled. Work is owner-directed from here: alpha production
use, or the O1 backlog (production key custody, real IdP + TLS, monthly
spend aggregation, model-assisted evaluation when keys arrive, CF
conformance handoff, publication authority policy).

## Resume in this order

1. Read `AGENTS.md` and `.agent/START_HERE.md`.
2. Read `.agent/state/current.json` and `.agent/state/RESUME.md`.
3. Read DEC-0017 (accepted, with its acceptance section) for the full V1 record.
4. Validate: `python3 -B .agent/scripts/validate.py --check`.
