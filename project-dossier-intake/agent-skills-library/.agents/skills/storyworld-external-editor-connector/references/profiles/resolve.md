# DaVinci Resolve Studio Precision Integration Profile

**Parent skill:** `storyworld-external-editor-connector`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use DaVinci Resolve Studio as the optional professional video-finishing environment for high-end editorial, color, Fusion, Fairlight, subtitles, and mastering.

## Connector

A local connector may use the supported Resolve scripting API to create/open a dedicated project, create bins, import media and OTIO, apply project settings, attach Storyworld metadata, initiate approved renders, and export return artifacts. External scripting and licensing requirements must be verified for the supported release.

## Boundaries

Storyworld owns narrative/editorial intent, exact source assets, approvals, and delivery packages. Resolve owns only the workfile and specialist realization. Color nodes, Fusion comps, Fairlight automation, plugins, titles, and application-specific effects are preserved in a project archive and declared as nonportable or lossy where OTIO cannot represent them.

## Return and recovery

Return OTIO, renders, captions, stems, project archive/export, color or edit metadata where available, and a connector change report. Handle application-not-running, scripting-disabled, stale project, ambiguous render completion, and two conflicting returns without assuming success.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
