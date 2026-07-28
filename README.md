# Storyworld Platform

The governed system of record and production engine for persistent fictional
worlds, editorial properties, branded narratives, and the media derived from
them — **Storyworld Engine** (headless narrative authority) and **Storyworld
Studio** (its first-party authoring and production application).

Current phase: **pre-implementation**. This repository holds the canonical
project dossier, the governed agent harness, and the (forthcoming) F0/F1
contract pack. No application code exists yet; that is deliberate — contracts
precede implementation.

## Orientation

| Start here | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Repository instruction router (humans and agents) |
| [`project-dossier/README.md`](project-dossier/README.md) | Dossier index: canonical target, current state, plans, registers |
| [`project-dossier/canonical/storyworld/README.md`](project-dossier/canonical/storyworld/README.md) | The Storyworld product definition (canonical content pack) |
| [`project-dossier/handoff/START_HERE.md`](project-dossier/handoff/START_HERE.md) | Compact resumption view |
| [`packages/contracts/README.md`](packages/contracts/README.md) | F0/F1 contract-pack workspace and conventions |

## Validation

```text
python3 -B .agent/scripts/validate.py --check     # read-only structural check
python3 -B -m unittest discover -s .agent/tests -p "test_*.py"
python3 -B .agent/scripts/refresh.py --refresh    # only writer of derived files
```

CI (`.github/workflows/validate.yml`) runs the check and test suite on every
push and pull request. The dossier is documentation, never permission; see
`project-dossier/AUTHORITY.md`.
