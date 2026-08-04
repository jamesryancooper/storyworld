# ComfyUI Hosted-Endpoint Posture

**Parent skill:** `storyworld-comfyui-workflow`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Preserve the current hosted-API generation posture while self-hosting only the ComfyUI orchestration and operator environment.

## Current boundary

Generative nodes call policy-approved hosted endpoints such as fal.ai. Deterministic nodes may execute inside the Storyworld-controlled boundary. No local generative model weights are introduced without an explicit successor decision.

## Routing

The ComfyUI adapter must use the same `ProviderEgressDecision`, credential binding, endpoint approval, retention, cost, fallback, custody, and human-authority rules as direct provider adapters. A self-hosted graph cannot transform a prohibited hosted transfer into an allowed local operation.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
