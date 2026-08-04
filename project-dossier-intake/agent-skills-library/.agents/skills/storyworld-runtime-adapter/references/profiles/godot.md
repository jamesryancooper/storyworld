# Godot Runtime Profile

**Parent skill:** `storyworld-runtime-adapter`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Compile the same shared Storyworld runtime package into a Godot-importable content bundle for richer game-like experiences.

## Adapter

Map authored narrative, dialogue, missions, dependencies, assets, localization, and identifiers into imported resources/scripts/configuration behind a Storyworld-owned adapter. Do not make Godot scene/resource/save formats canonical Storyworld contracts.

## Boundary and tests

Godot owns rendering, physics, runtime simulation, input, networking, and saves. Test import validation, missing assets, package version, runtime receipt, browser/Godot semantic parity, player-state separation, observation/proposal return, and engine replacement.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
