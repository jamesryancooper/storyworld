---
{
  "schema_version": "harness.decision.v1",
  "id": "DEC-0012",
  "status": "accepted",
  "previous_status": "proposed",
  "title": "B-phase execution authorization: provisional gates, deferrals, Studio stack, and hosted-generation posture",
  "created_at": "2026-07-28",
  "authority_source": "external:project-owner (Ryan Cooper) instructions of 2026-07-28: sign-off on the three staged items, 'no open-weight models... ComfyUI with fal.ai or directly with OpenAI, Midjourney, Grok, or other generative APIs', 'Next.js for Studio is accepted... choose a design system that works best for the studio', and 'regarding InvokeAI, I want to host it locally' with the fal external-provider guide supplied as analyzed-guidance.",
  "owner": "ryan-cooper (project owner)",
  "scope": "Execution of B1-B4 to the V1 boundary without owner stops, and the media/Studio posture governing that run.",
  "supersedes": null,
  "successor": null,
  "limitations": [
    "Consolidated owner review occurs at the V1 boundary regardless; each B gate decision is staged with evidence, provisionally passed, and reviewable/reversible there.",
    "Live generative calls with a real provider key are a reserved crossing requiring fresh owner-supplied credentials and a budget ceiling (adopting the Commerce Foundry ground rule); until then providers run against mocked transports."
  ]
}
---

## Decision

1. **Provisional B-gate passage**: B1-B4 gate decisions are staged with full
   evidence and provisionally passed so the run continues without stops;
   consolidated owner review at the V1 boundary.
2. **Deferrals-with-disclosure**: (a) owner Studio usability walkthrough at
   the V1 review; (b) Commerce-Foundry-side CI as a simulator in our CI plus
   an exportable conformance suite; (c) model-assisted continuity evaluation
   mocked until keys exist (deterministic layers fully real).
3. **Studio stack**: Next.js accepted; design system delegated to the agent
   (shadcn/ui-class quality bar), decided and recorded during B2.
4. **Generation posture**: hosted-API generation only — **no local model
   weights**. fal.ai is the first adapter (Commerce Foundry synergy);
   OpenAI/Grok/others follow as adapters; Midjourney last (no real API).
   ComfyUI optional as a workflow layer over hosted-backed nodes (CF
   comfyui-foundry-fal pattern).
5. **InvokeAI hosted locally** as the human editing workspace: own Python
   3.11/3.12 environment, CPU-only, fal as its external provider — adapted
   from Commerce Foundry's live-verified fork-addition provider (SRC-0005)
   with the owner guide (SRC-0004) as analyzed guidance; Storyworld's own
   editor-checkout/re-import contract governs the round trip. Separate
   metered fal key per tool, server-side only.

## Consequences

- The run proceeds to V1 with staged gates; quality remains hard-gated by
  ship-check and CI throughout.
- DEP-0001 materially de-risked by the observed CF implementation.
