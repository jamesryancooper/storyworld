# Kdenlive Precision Integration Profile

**Parent skill:** `storyworld-external-editor-connector`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use Kdenlive as the optional open-source video-finishing environment after Storyworld creates an intent-driven edit or rough cut.

## Handoff

Produce pinned OTIO, media/proxy manifests, captions, audio stems, reference media, color profile, rights/sensitivity restrictions, frame rate, resolution, timecode, aspect ratio, and stable Storyworld sequence/scene/shot/asset IDs.

## Return

Import returned OTIO, review render, caption/audio outputs, and .kdenlive workfile. Compute semantic timeline changes and explicit loss/unsupported-effect findings. The project file is untrusted, version-sensitive, and noncanonical.

## Security and replacement

Pin supported Kdenlive/MLT versions. Do not automatically open arbitrary third-party project files. Validate paths, resources, and media. Keep OTIO and sidecar identity as the portable reconciliation basis so a different NLE can replace Kdenlive.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
