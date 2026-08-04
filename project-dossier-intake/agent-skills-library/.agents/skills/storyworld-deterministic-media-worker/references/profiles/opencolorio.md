# OpenColorIO Profile

**Parent skill:** `storyworld-deterministic-media-worker`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use pinned OpenColorIO configurations to make technical color conversions consistent across Storyworld and external tools.

## Separation of concerns

- `ColorDesign` expresses narrative palette and progression.
- `GradeIntent` expresses finishing intent.
- `ColorPipeline` names input, working, display, and output transforms.
- OCIO config, processor, context variables, LUTs, and display/view are technical execution data.

Do not collapse these into one Look or store a technical LUT as creative authority.

## Validation

Pin config/version/hash. Test known color patches, alpha, scene/display transforms, metadata, external-tool agreement, unsupported color space, and round-trip tolerances. Record any baked transform and prevent accidental double application.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
