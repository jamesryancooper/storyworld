# OTIO–Kdenlive Profile

**Parent skill:** `storyworld-otio-editorial-interchange`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Define the exact subset and sidecars Storyworld uses for Kdenlive editorial exchange.

## Profile rules

Pin OTIO adapter/application versions. Carry clips, tracks, ranges, transitions, markers, and media references where supported. Store resolution, frame rate, audio layout, color, destination, and stable identity in Storyworld sidecars. Explicitly test the mismatch between source-shared Kdenlive markers and per-instance OTIO markers.

## Loss reporting

Report unsupported effects, speed changes, nested sequences, titles, application metadata, missing media, marker collisions, and profile settings. Never describe a round trip as lossless without fixture evidence.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
