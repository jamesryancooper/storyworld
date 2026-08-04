# Skill Architecture

## Layers

```text
Current user/platform task authority
        ↓
Storyworld .agent governance and accepted decisions
        ↓
storyworld-engineering router
        ↓
smallest applicable specialist skill chain
        ↓
repository-local implementation or read-only assessment
        ↓
conformance/review evidence
        ↓
human/project disposition
```

## Capability classes

- **Router:** classifies and routes; never implements.
- **Governance:** orientation, decision impact, task/change, dossier, closure.
- **Contract/evidence:** contracts, schema evolution, fixtures, POCs.
- **Product/domain:** creative commands, voice, cross-media, creative direction, native media, annotations, assets, evaluations.
- **Infrastructure/integration:** providers, ComfyUI, deterministic media, external editors, OTIO.
- **Delivery/peers/runtimes:** publication, scheduling, Commerce Foundry, browser/Godot.
- **Cross-cutting:** Studio, security, rights, cost, customer deployment.

## Chaining rules

1. Route to the smallest skill set.
2. Read-only skills may precede repository-local skills.
3. Decision-impact analysis gates durable semantic changes.
4. Contract authoring precedes implementation of new public boundaries.
5. Fixture authoring precedes claims of evaluation.
6. Security review precedes new external/network/plugin boundaries.
7. Conformance closes significant work.
8. No skill can adopt another skill or approve its own findings.

## Vendor profiles

Vendor-specific implementation guidance is stored as profiles beneath broader Storyworld-owned skills. This prevents vendor names from becoming the capability architecture:

- OpenRouter and fal are provider profiles.
- ComfyUI is a workflow-execution profile.
- Blender, InvokeAI, Kdenlive, and Resolve are external-editor profiles.
- Astro, Instagram, X, and TikTok are publication profiles.
- Browser and Godot are runtime profiles.

## Status model

All packaged capabilities start as generated, unadopted baselines. Structural validation verifies shape only. Adoption requires a reviewed decision and still grants no authority beyond the active task.
