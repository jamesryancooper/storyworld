# ComfyUI Node and Egress Security

**Parent skill:** `storyworld-comfyui-workflow`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Treat every custom node and endpoint as executable code and a potential data-egress boundary.

## Isolation

Run under a dedicated service identity or container with no Storyworld database credentials, read-only immutable input mounts, isolated transient output, deny-by-default network egress, process/resource limits, and controlled temporary storage.

## Allowlisting

Review and pin every custom-node repository/commit, Python dependency, install script, subprocess capability, filesystem path, network destination, endpoint, and model/provider parameter. Disable unreviewed workflow imports and arbitrary package installation in production.

## Evidence

Record node package hashes, environment/container digest, graph hash, endpoint routes, redacted logs, outputs, and dependency SBOM. Test secret access, filesystem traversal, arbitrary subprocess, unauthorized network, output spoofing, and workflow graph mutation.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
