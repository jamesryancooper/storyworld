# Storyworld Agent Skills Library

**Status:** generated, comprehensive, unadopted capability library  
**Assessed Storyworld revision:** `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`  
**Generated:** 2026-08-01

This repository packages reusable engineering-agent skills for building Storyworld as an intent-driven creative production environment. It is shaped for Storyworld's existing `.agents/` capability system:

- `SKILL.md` frontmatter contains only `name` and `description`.
- Version, adoption, authority, provenance, permissions, and review state live in `references/provenance.json`.
- Every packaged skill has `permission_grant: false`.
- Every skill and workflow is `generated_unadopted_baseline` until Storyworld's owner reviews and adopts it through a decision.
- The singular `.agent/` tree remains the live governance/state plane. This library never replaces it.

## Contents

- **33 skills** covering governance, contracts, intent-driven commands, creative direction, native media, providers, ComfyUI, deterministic workers, external tools, evaluation, delivery, runtimes, security, cost, and deployment.
- **1 umbrella router agent** that selects the smallest applicable skill chain.
- **5 governed workflow templates** for repository changes, POCs, integration adoption, dossier intake, and closure.
- Machine-readable skill, routing, traceability, coverage, and external-capability registries.
- Skill-specific checklists, output contracts, failure cases, provider/tool profiles, and OpenAI interface metadata.
- Templates for tasks, findings, decisions, contracts, POCs, evidence receipts, security reviews, and adoption.
- A standalone validator, unit tests, dry-run installer, SHA-256 manifest, ZIP, and TAR.GZ distribution.
- Read-only copies of the integration-architecture package and open-source reference research used to construct this library.

## Non-authority notice

This library is a **proposal and engineering aid**. It does not:

- accept or supersede Storyworld decisions;
- authorize repository changes, provider calls, credentials, spending, deployment, publication, or external communication;
- prove current implementation or production readiness;
- allow an agent to approve its own work;
- turn staged dossier material into governed authority.

Every use inherits the active task's authority and must follow current user/platform instructions, applicable `AGENTS.md`, `.agent/policy.json`, `.agent/context.json`, `.agent/state/current.json`, accepted decisions, active tasks, and current repository evidence.

## Quick start

1. Read [`ADOPTION.md`](ADOPTION.md).
2. Inspect [`registry/skills.json`](registry/skills.json) and [`registry/routing.md`](registry/routing.md).
3. Run:

   ```bash
   python scripts/validate_library.py
   python -m unittest discover -s tests -p "test_*.py"
   ```

4. Dry-run installation into a Storyworld checkout:

   ```bash
   python scripts/install_into_storyworld.py /path/to/storyworld
   ```

5. Create a review decision before adopting any capability.
6. Install with `--apply` only under an explicitly authorized repository task.

## Recommended adoption waves

### Wave A — governance foundation

- `storyworld-engineering`
- `storyworld-repository-orientation`
- `storyworld-governed-change`
- `storyworld-decision-impact-analysis`
- `storyworld-dossier-intake-maintenance`
- `storyworld-contract-authoring`
- `storyworld-schema-evolution`
- `storyworld-fixture-authoring`
- `storyworld-poc-execution`
- `storyworld-conformance-and-release`

### Wave B — product foundation

- `storyworld-creative-command-implementation`
- `storyworld-creative-direction`
- `storyworld-native-media-workspace`
- `storyworld-studio-surface`
- `storyworld-evaluation-layer`
- `storyworld-asset-custody-and-lineage`
- `storyworld-provider-adapter`
- `storyworld-deterministic-media-worker`
- `storyworld-security-review`

### Wave C — specialist integrations

Adopt voice, cross-media, annotations, ComfyUI, provider evaluation, external editors, OTIO, rights, publication, Commerce Foundry, runtimes, cost, and deployment skills only when their governing decisions and implementation phases are ready.

## Existing Storyworld capabilities

This library does not duplicate the repository's existing:

- adopted `storyworld-ux` skill;
- unadopted `change-review` skill;
- adopted `storyworld-steward` agent;
- unadopted `safe-change` workflow.

See [`registry/external-capabilities.json`](registry/external-capabilities.json) for expected coexistence and routing.
