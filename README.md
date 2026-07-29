# Storyworld Platform

## What is Storyworld?

Storyworld is a workshop for building and running a fictional universe. Instead
of treating each story, image, or campaign as one-off content, it helps a team
grow a coherent world whose characters, rules, and storylines stay connected
over time.

As the world grows, Storyworld keeps its characters, places, rules, storylines,
ideas, and releases organized. It helps people create and review new material
and catch contradictions before they spread.

With Storyworld, people can:

- track the people, places, events, and rules that define a world;
- plan story arcs and releases;
- use AI to suggest ideas or draft assets, then review the results;
- find and resolve contradictions; and
- approve what becomes official or is prepared for publication.

AI assists, but people retain control over what becomes official in the
fictional world or public outside it.

The core is a usable, accepted **V1 alpha**. Production readiness remains
future work.

## Current status

The project owner accepted the V1 dual-use alpha on 2026-07-29 (DEC-0017). It
is demonstrable end to end, and its accepted scope is implemented and
CI-enforced. Storyworld Engine is the headless narrative authority; Storyworld
Studio is its first-party authoring and production application.

The repository includes:

- a high-assurance agent harness and canonical project dossier;
- the accepted F0/F1 authority and contract pack;
- a TypeScript/Node monorepo over PostgreSQL, MinIO, and Temporal;
- the headless narrative kernel, public Engine API, and CLI;
- provider-neutral generation workflows, continuity evaluation, and governed
  human dispositions;
- the Storyworld Studio authoring, review, generation, release, and credential
  surfaces;
- Commerce Foundry, runtime, Instagram export, and mock-identity adapters; and
- a golden-corpus regression harness with defect injection, recorded provider
  replay, rubrics, and baselines.

Production key custody, TLS and real identity federation, aggregate spend
controls, real model-assisted evaluation, live Commerce Foundry and channel
crossings, and production operations/reliability remain later owner-directed
work. Reserved crossings stay closed until explicitly opened.

## Orientation

| Start here | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Repository instruction router (humans and agents) |
| [`.agent/state/current.json`](.agent/state/current.json) | Compact live work-state index |
| [`.agent/decisions/DEC-0017-v1-consolidated-review.md`](.agent/decisions/DEC-0017-v1-consolidated-review.md) | Accepted V1 alpha boundary and limitations |
| [`project-dossier/README.md`](project-dossier/README.md) | Dossier index: canonical target, current state, plans, registers |
| [`project-dossier/canonical/storyworld/README.md`](project-dossier/canonical/storyworld/README.md) | The Storyworld product definition (canonical content pack) |
| [`project-dossier/handoff/START_HERE.md`](project-dossier/handoff/START_HERE.md) | Compact resumption view |
| [`packages/contracts/README.md`](packages/contracts/README.md) | Accepted contract pack and validation conventions |

## Development

The local disposable profile provides PostgreSQL 16, MinIO, and Temporal:

```text
docker compose -f infra/compose.yaml up -d
pnpm --filter @storyworld/engine-api dev
pnpm --filter @storyworld/studio dev
```

The engine defaults to `http://localhost:4400`; Studio defaults to
`http://localhost:3000`. Local development settings and credentials are not
production configuration.

## Validation and closure

```text
bash infra/scripts/ship-check.sh                  # complete local closure gate
python3 -B .agent/scripts/validate.py --check     # read-only harness/dossier check
python3 -B packages/contracts/tests/validate_contracts.py
pnpm -r typecheck
pnpm -r test
pnpm -r lint
```

CI (`.github/workflows/validate.yml`) runs the harness, contracts, platform
tests, Studio production build, compose validation, and restore drill on every
push to `main` and on pull requests. Passing checks prove only their recorded
scope; they do not establish production readiness. The dossier is
documentation, never permission; see `project-dossier/AUTHORITY.md`.
