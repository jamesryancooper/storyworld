# Claude Code entry point

Follow `AGENTS.md` in this directory — it is the repository's instruction
router. Then follow its reading order (`.agent/START_HERE.md`,
`.agent/policy.json`, `.agent/context.json`, `.agent/state/current.json`).

Quick commands (authoritative declarations in `.agent/validators.json`):

```text
python3 -B .agent/scripts/validate.py --check     # read-only structural check
python3 -B .agent/scripts/refresh.py --refresh    # regenerate derived files
python3 -B -m unittest discover -s .agent/tests -p "test_*.py"
```
