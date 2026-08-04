# fal.ai Provider Profile

**Parent skill:** `storyworld-provider-adapter`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use fal.ai as Storyworld's first strategic hosted media-generation and transformation gateway, with queue-first durable orchestration and immediate Storyworld custody.

## Capabilities

Evaluate and register direct endpoints for image generation/editing, video generation/transformation, audio/speech, upscaling, segmentation, depth/pose/control preprocessors, and future 3D. Approval is per endpoint/version, capability, data class, retention mode, and production policy.

## Queue and callback flow

1. Preflight rights, egress, credentials, budget, endpoint approval, input upload path, and output expectations.
2. Submit asynchronously and persist the fal request ID before waiting.
3. Use authenticated callbacks where available, but treat them as at-least-once notifications.
4. Deduplicate callbacks through a durable inbox.
5. Recover missing callbacks through polling.
6. Handle cancellation as a Storyworld workflow state; a late completion goes to quarantine.
7. Download output immediately, validate redirect/host/type/size, scan, hash, and admit to Storyworld custody.
8. Record actual endpoint/model/workflow, inputs, parameters, cost, retries, timestamps, retention, and output expiration.

## Retention and URLs

- Apply `X-Fal-Store-IO: 0` by default where supported and required.
- Configure short-lived media expiration.
- Treat fal URLs as temporary transport and potentially accessible to anyone holding the URL.
- Never store a fal URL as the authoritative asset URI.
- Do not transmit highly restricted or otherwise prohibited inputs.

## Failure cases

Test duplicate callback, callback before request persistence, missing callback, expired output URL, unapproved redirect, malformed media, cancellation followed by late completion, cost increase, endpoint drift, and an output that violates locked attributes.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
