# FFmpeg Worker Profile

**Parent skill:** `storyworld-deterministic-media-worker`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use a pinned, reviewed FFmpeg build for deterministic audiovisual processing through approved operation templates.

## Approved operations

Decode/inspect, trim, join, proxy, transcode, frame extraction, waveform source, thumbnails, audio resampling/normalization, caption/subtitle conversion, mux/demux, basic deterministic filters, preview/master renders, and technical conformance.

## Command safety

Build arguments from typed processing profiles rather than accepting shell strings. Disable shell expansion. Constrain protocols, file paths, redirects, codecs, filters, threads, duration, output count, dimensions, memory, disk, and timeout. Run with immutable inputs and isolated outputs.

## Licensing and reproducibility

Record the exact FFmpeg binary/container, configuration flags, linked codec libraries, license posture, hardware acceleration, command profile, environment, input/output hashes, and stderr. A different build is a different execution profile.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
