# ComfyUI Workflow Registration

**Parent skill:** `storyworld-comfyui-workflow`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Register each ComfyUI graph as a versioned execution artifact behind a stable Storyworld workflow identity.

## Required record

- Storyworld workflow ID and semantic version
- capability and intended operation types
- ComfyUI graph hash and application version
- required built-in/custom nodes and exact commits/packages
- approved hosted endpoint bindings
- input and output port mapping
- media types, dimensions, duration, resource and cost envelope
- egress/retention/security classification
- evaluation plan and fixture suite
- experimental/evaluated/production-approved/deprecated/prohibited status
- predecessor, successor, rollback, and replacement workflow

## Promotion

A graph begins experimental. It becomes evaluated only after reproducibility, failure, restricted-data, provider substitution, and output-custody tests. Production approval requires the governing Storyworld decision and policy; a workflow update creates a new version and does not silently replace in-flight or reproducibility-critical executions.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
