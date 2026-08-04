# MediaInfo and ClamAV Profile

**Parent skill:** `storyworld-deterministic-media-worker`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use MediaInfo for normalized technical facts and ClamAV as one local malware-screening layer before media or workfile admission.

## MediaInfo

Map raw fields into a Storyworld-owned normalized technical metadata contract while preserving the raw report as evidence. Do not treat reported container metadata as trusted identity or rights information.

## ClamAV

Run in the quarantine path with pinned signatures and engine version. A clean scan does not prove safety; parser sandboxing, file limits, type validation, and tool-specific hardening remain required. Record unavailable/stale signatures as an explicit failure or degraded state.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
