# libvips and sharp Profile

**Parent skill:** `storyworld-deterministic-media-worker`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use libvips/sharp for fast routine web and preview image derivatives behind Storyworld processing profiles.

## Profiles

Define resize/crop/fit, orientation, alpha, metadata stripping/preservation, ICC/OCIO handling, quality, chroma, animated input, and output format explicitly. Protect against enormous dimensions, page counts, decompression, memory, and unexpected metadata.

## Boundary

Use for bounded derivatives, not professional color authority, layered source custody, or general arbitrary image scripting. Preserve original bytes and record exact versions/parameters.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
