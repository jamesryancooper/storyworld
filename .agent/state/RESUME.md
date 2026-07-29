# Resume Storyworld Platform

> Navigation only. Re-read current instructions and inspect repository state.

- Blueprint: 1.0.1 / `high-assurance`; adoption `adopted`
- Remote: github.com/jamesryancooper/storyworld; CI (`validate`) on every
  push — resolve runs by head SHA, never `--limit 1` right after pushing
- Position: **V1 boundary, HARD STOP (DEC-0012)**. B1-B4 complete;
  DEC-0013..0016 staged provisionally passed; DEC-0017 (consolidated
  owner review) is the sole open decision. Active task: none.
- Platform: 12 packages + 3 apps; Temporal dev on port 7235 (7233 is
  Commerce Foundry's); InvokeAI local at ~/storyworld-tools with the fal
  provider staged disabled
- Working practice: ship-check before every commit, run UNPIPED with its
  exit code checked; refresh + git add -A together (never selectively
  stage after refresh); .DS_Store deleted before refresh

## Resume safely

1. Read root-to-leaf `AGENTS.md`.
2. Read `.agent/policy.json`, `.agent/context.json`, `.agent/state/current.json`.
3. Inspect `git status` / `git log`; run the read-only check.
4. Read DEC-0017 and only then the linked gates and evidence.
5. Do not open any reserved crossing without an explicit owner instruction.
