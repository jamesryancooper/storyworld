# Storyworld Current Technical Inventory

**Reviewed commit:** `86f431aedc5145916a475f48abe22dc6f5a65cb7`

## Applications

- `apps/cli`
- `apps/engine-api`
- `apps/studio`

## Internal packages

- `channel-instagram`
- `commerce-connector`
- `credentials`
- `domain`
- `evaluation`
- `identity`
- `kernel`
- `persistence`
- `portability`
- `providers`
- `regression`
- `runtime-compiler`
- `storage`
- `workflows`
- `contracts`

## Locked core versions

- Node runtime: 22 in CI; repository engine `>=22`
- pnpm: 10.20.0
- TypeScript: 5.9.3
- Next.js: 15.5.22
- React/ReactDOM: 19.2.8
- Tailwind CSS: 4.3.3
- Vitest: 2.1.9
- axe-core: 4.12.1
- pg: 8.22.0
- AWS S3 client: 3.1097.0
- Temporal SDK: 1.21.1
- PostgreSQL: 16

## Absent specialized frontend dependencies

No graph/canvas renderer, rich-text editor, data grid, DnD framework, map renderer, media waveform/player, client server-state cache, CRDT, or generated API client is currently installed.

## Immediate technical hygiene findings

- `@types/node` 26.1.2 is ahead of Node 22 runtime.
- MinIO and Temporal use mutable `latest` image tags in the local profile.
- No root LICENSE file was found.
- Studio API DTOs/client are hand-written despite accepted OpenAPI.
- Search is project-owned `%ILIKE%` over eight domains, without FTS/trigram projection.
