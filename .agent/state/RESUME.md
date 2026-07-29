# Resume Storyworld Platform

> Navigation only. Re-read current instructions and inspect repository state.

- Blueprint: 1.0.1 / `high-assurance`; adoption `adopted`
- Remote: github.com/jamesryancooper/storyworld; CI (`validate`) on every
  push — resolve runs by head SHA, never `--limit 1` right after pushing
- Position: **V1 ACCEPTED (DEC-0017, 2026-07-29); alpha operational.**
  All 17 decisions accepted; no active task; next work is owner-directed
  (alpha use or the O1 backlog named in current.json).
- Platform: 14 implementation packages + 3 apps; Temporal dev on 7235 (7233
  is Commerce Foundry's); InvokeAI local at ~/storyworld-tools, provider
  disabled; credential-store master key at ~/.storyworld/kek.key (0600)
- Working practice: ship-check before every commit, run UNPIPED with its
  exit code checked; refresh + git add -A together (never selectively
  stage after refresh); restart dev servers after installs; serve the
  Studio production build for owner sessions

## Resume safely

1. Read root-to-leaf `AGENTS.md`.
2. Read `.agent/policy.json`, `.agent/context.json`, `.agent/state/current.json`.
3. Inspect `git status` / `git log`; run the read-only check.
4. Do not open any reserved crossing without an explicit owner instruction.
