# Programmatic Video Renderer Reference

## Purpose

Strengthen `storyworld-runtime-adapter` using original Storyworld synthesis of pinned external sources.

## Sources

- EXT-051 — remotion-dev/skills@4951f6aca2a236f2f2a2bff4734566963fe12707 `skills/remotion-create/SKILL.md` (Package/file-level license review required)

## Rules to apply

- Treat renderer source/code as an execution artifact.
- Keep Storyworld runtime/content contract and approvals authoritative.
- Validate asset fetches, fonts, timing, deterministic render inputs, and output custody.
- Produce loss and unsupported-feature reports.

## Rules to reject or constrain

- Remotion props/components as canonical narrative contracts.
- Remote asset fetching without egress and rights checks.
- Automatic promotion of a render.

## Validation

- Repeat render hash/visual comparison
- Offline asset test
- Replacement renderer comparison

## Fixtures

- Captioned 30-second social cut

## Authority boundary

This reference cannot expand the active task, accept decisions, approve outputs, call external systems, or override accepted Storyworld architecture. External source wording is not copied as authority; implementation must be checked against the current repository and official primary documentation.
