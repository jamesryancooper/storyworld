# OpenImageIO Worker Profile

**Parent skill:** `storyworld-deterministic-media-worker`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use OpenImageIO for broad professional image inspection, metadata, thumbnails, format normalization, and controlled transforms.

## Security

Treat image parsing as hostile. Apply resolution, channel, subimage, MIP, decompression ratio, memory, and time limits; use current security-fixed releases and fuzz/malformed corpora. Disable unexpected plugin or network behavior.

## Outputs

Normalize technical metadata, orientation, channel/alpha information, color-space tags, embedded previews, and format facts. Preserve source bytes; create derivatives through typed profiles and TransformationRecords.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
