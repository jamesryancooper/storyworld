# InvokeAI Precision Integration Profile

**Parent skill:** `storyworld-external-editor-connector`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use locally hosted InvokeAI only when Storyworld's native intent-driven image workspace cannot yet achieve the required precision.

## Use cases

Detailed hand-guided masks, complex regional editing, fine cleanup, compositing experiments, and inpaint/outpaint workflows that require a precision canvas. Routine generation/editing remains inside Storyworld.

## Checkout and return

Check out exact image/candidate versions and permitted reference derivatives; preserve identity, appearance, location, rights, and egress constraints. InvokeAI may use policy-approved hosted execution such as fal-backed operations. Return files are scanned, hashed, declared as transformations, evaluated, and admitted as new candidates. Preserve important session/workflow artifacts only as nonauthoritative workfiles.

## Current model posture

Do not introduce local model weights under the current accepted hosted-API posture. InvokeAI gallery, boards, internal IDs, metadata, database, and canvas state never become Storyworld custody or authority.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
