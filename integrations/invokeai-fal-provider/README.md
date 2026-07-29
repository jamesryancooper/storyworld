# invokeai-fal-provider (Storyworld)

fal external provider for a locally hosted InvokeAI — the human editing
workspace in Storyworld's B1 editor round trip (DEC-0012).

Provenance: vendored 2026-07-28 from the owner's Commerce Foundry reference
implementation (SRC-0005, live-verified against InvokeAI's real
`ExternalProvider` interface; inpaint mask polarity confirmed white =
regenerate). The owner's implementation guide (SRC-0004,
docs/guidance/invokeai-fal-provider-guide.md) governs the planned expansion
to first-class txt2img endpoint specs.

Governance (Storyworld terms): InvokeAI holds no authority (authority
matrix). The round trip is Storyworld's editor-checkout contract — check out
an exact asset version, edit in InvokeAI's canvas, re-import as a NEW
candidate with a declared transformation, re-evaluate, human-accept.
InvokeAI gets its **own** metered fal key (never Storyworld's), supplied by
the owner; running it with a real key is a reserved crossing.

Setup: `bash integrations/setup-invokeai.sh` (uv-managed Python 3.12,
CPU-only; fal compute is remote). Note from the CF reference: the
external-provider system is only on InvokeAI's development branch until it
ships in a release — the script detects this and degrades gracefully
(InvokeAI still works as the editor; fal-in-canvas activates when the
provider system is present).
