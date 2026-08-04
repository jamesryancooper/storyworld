# Dependency-Ordered Proof-of-Concept Program

**Status:** disposable prototypes. A successful POC produces evidence and a decision; its code is not production code by default.

## Common rules

Every POC must:

- Use rights-safe synthetic or owner-authorized fixtures.
- Keep Engine state authoritative.
- Use exact versions and immutable inputs.
- Include one valid case and at least one intentional failure.
- Define cost and time ceilings before execution.
- Record dependency versions, licenses, transitive packages, and supply-chain evidence.
- Test keyboard operation, screen-reader equivalent, zoom/reflow, and no color-only communication for UI work.
- Test provider/tool replacement.
- Leave a teardown path.
- End in an explicit adopt, adapt, defer, reject, or repeat decision.

## POC dependency map

```text
POC-01
 ├─ POC-02 ─ POC-03
 │             └─ POC-04 ─ POC-05 ─ POC-06
 │                            └────── POC-07
 └─────────────────────────────────── POC-08

POC-04 + POC-06 → POC-09
POC-09 → POC-10
POC-09 → POC-11
POC-06 + runtime contracts → POC-12
All provider POCs → POC-13
```

---

## POC-01 — Text and voice command architecture

**Research question:** Can a user express, inspect, correct, steer, and partially accept creative intent without giving the model direct mutation authority?

**Fixture:** One still image, one 20-second sequence, one audio cue, and a cross-media scene. Commands include “remove that,” “move the cut 12 frames earlier,” and “make the scene colder.”

**Storyworld-owned layer:** `CreativeContext`, `CreativeCommand`, `CreativeInterpretation`, `CreativePlan`, typed mock operations, `EditProposal`, `CreativeDecision`.

**Success criteria:**

- Text and voice produce the same canonical command shape.
- Voice recording is deleted after transcript admission; transcript/context remain.
- The exact selection/playhead snapshot is visible.
- Low-confidence transcript is corrected before medium/high-consequence execution.
- Assumptions and consequence class are visible.
- User can accept one operation from a multi-operation proposal.
- Cancel/steer does not corrupt base state.
- Screen-reader user can review the same proposal and consequences.

**Failure cases:** mistranscription, selection changes during processing, unsupported target, operation dependency broken, cost class escalates.

**Security:** temporary audio encryption/TTL, transcript classification, no secret in prompt.

**Cost limit:** use mock or minimum OpenRouter calls; no media generation.

**Portability/replacement:** swap transcription/interpretation provider without changing command/proposal records.

**Decision produced:** accept or revise DEC-0041 contract family and voice retention policy.

**Teardown:** delete prototype UI and temporary audio; retain fixtures, schemas, and evidence.

---

## POC-02 — OpenRouter policy and structured interpretation

**Depends on:** POC-01.

**Research question:** Can OpenRouter reliably return strict command interpretations/plans while Storyworld enforces model/provider/egress/fallback policy?

**Fixture:** public brainstorming, private screenplay interpretation, restricted rights extraction, prohibited highly restricted input.

**Storyworld-owned layer:** task profiles, `ProviderPolicy`, `ModelCapabilityApproval`, `ProviderEgressDecision`, schema validator, tool registry.

**Success criteria:**

- Strict JSON-Schema outputs validate or fail closed.
- Fixed profile uses exact approved route.
- Public low-risk profile can use approved policy-equivalent fallback.
- Private/restricted/highly restricted profiles prohibit automatic fallback as defined.
- ZDR/data-collection requirements are present in execution plan.
- Actual model/provider is recorded and checked.
- Tool calls are proposals; Storyworld validates and executes separately.
- Usage/cost is attributed to member, production, command, and budget.

**Failure cases:** provider ignores required parameter, malformed JSON, prohibited fallback, privacy route unavailable, network unknown outcome.

**Accessibility:** model-routing details have a plain-language summary.

**Cost limit:** fixed small token budget and hard request ceiling.

**Replacement:** replay same fixture against a direct provider adapter or recorded mock.

**Decision produced:** approve first capability profiles and OpenRouter adapter boundary.

**Teardown:** remove experimental profile bindings; retain recorded responses with redaction.

---

## POC-03 — fal queue, retention, custody, and unknown outcomes

**Depends on:** POC-01; may run in parallel with POC-02 after policy contracts exist.

**Research question:** Can Storyworld safely orchestrate queued fal media requests, survive duplicate/missing callbacks, cancel, ingest expiring results, and prevent provider storage from becoming custody?

**Fixture:** one small image generation and one long-running media operation using non-sensitive fixtures.

**Storyworld-owned layer:** `ProviderExecutionPlan/Result`, Temporal workflow, callback inbox, poll recovery, custody/quarantine.

**Success criteria:**

- Queue submission records request ID before waiting.
- `X-Fal-Store-IO: 0` and short object lifecycle are applied.
- Webhook is authenticated and deduplicated.
- Missing webhook is recovered by polling.
- Duplicate callback creates no duplicate candidate.
- Cancellation marks execution and prevents auto-application.
- A late completion enters `late_result` quarantine.
- Expiring URL is downloaded, validated, hashed, and stored immediately.
- Public provider URL never becomes permanent asset URI.
- Actual/estimated cost receipt reconciles.

**Failure cases:** expired URL, malformed file, redirect to unapproved host, provider fallback when prohibited, timed-out job later completes, callback before workflow state persists.

**Security:** callback auth, URL allowlist, no browser key, egress classification, size/type limits.

**Cost limit:** one bounded request per failure scenario where recorded fixtures cannot substitute.

**Replacement:** replay with recorded HTTP transcript and mock queue.

**Decision produced:** fal adapter execution contract and retry/fallback defaults.

**Teardown:** delete provider media; retain hashes, redacted transcript, and recorded fixtures.

---

## POC-04 — Native image generation and editing

**Depends on:** POC-01, POC-02, POC-03.

**Research question:** Can Storyworld complete normal image work through semantic commands without opening InvokeAI or ComfyUI?

**Fixture families:**

- Object removal.
- Background replacement.
- Relighting/time-of-day.
- Identity-preserving coat correction.
- Canvas extension and aspect adaptation.
- Multi-candidate face/background composition.
- Text/sign repair.

**Storyworld-owned layer:** `ImageOperation`, semantic selection/mask, `ResolvedRealizationSpec`, recipe compiler, candidate comparison, evaluation.

**Success criteria:**

- User selects object/region semantically or roughly.
- Plan lists exact preserved and changed attributes.
- Direct fal execution produces candidates under budget.
- Identity, continuity, text, location, product, and technical checks run.
- User can refine selection or preservation locks without provider-native controls.
- Multi-source composite records every source region/version.
- Before/after and alternatives are accessible.
- Output can be reproduced or regenerated through another approved route without migrating creative intent.

**Failure cases:** mask changes wrong subject, face drifts, coat chronology wrong, public CDN disallowed by egress, provider returns invalid media.

**Cost limit:** capped candidates per operation and total POC budget.

**Replacement:** alternate fal endpoint or registered mock workflow.

**Decision produced:** native image operation set and InvokeAI escape criteria.

**Teardown:** expire disposable candidates; retain governed POC evidence.

---

## POC-05 — AI-mediated professional precision

**Depends on:** POC-04; uses video/audio stubs until POC-06.

**Research question:** Can Storyworld expose expert precision through understandable intent and visual controls rather than dense provider/editor mechanics?

**Fixture:** exact mask correction, region tracking across a short clip, 12-frame cut shift, audio level automation after a cue, grade reference match, precise safe-area positioning.

**Success criteria:**

- Every operation supports exact units/frames/regions.
- User sees the derived mask/path/curve before application.
- Numeric refinement and natural-language refinement remain synchronized.
- Advanced Operator Mode reveals technical execution but is not required.
- Undo/reversion produces an exact prior revision.
- Expert user judges the result controllable; beginner completes task without technical vocabulary.

**Failure cases:** tracking drifts, reference match overchanges skin, numerical and semantic control disagree, advanced setting leaks into canonical intent.

**Accessibility:** structured region/path/curve table and keyboard manipulation.

**Decision produced:** scope of layer-3 precision and which operations remain external.

**Teardown:** discard experimental provider controls; retain semantic precision primitives.

---

## POC-06 — Native video work and semantic timeline

**Depends on:** POC-01–03; benefits from POC-05 precision primitives.

**Research question:** Can Storyworld produce and revise a meaningful short sequence through text/voice, typed edits, deterministic preview, and OTIO without becoming a full NLE?

**Fixture:** 60-second narrative scene with dialogue, ambience, score, generated insert, captions, and vertical variant.

**Operations:** trim, split, reorder, replace shot, J-cut, L-cut, pacing change, transition, caption timing, score reduction, generated-shot insertion, rough cut, vertical adaptation.

**Success criteria:**

- `EditorialSequence` preserves scenes/beats/shots and exact media versions.
- Natural-language request produces inspectable operation plan.
- Frame-exact edits are possible.
- Deterministic preview renderer produces stable proxy.
- Generated shot follows normal candidate/evaluation path.
- OTIO export validates and preserves stable IDs/markers.
- User can partially accept editorial and sound operations.
- Kdenlive/Resolve are not needed for the fixture.

**Failure cases:** broken dialogue continuity, missing media, wrong frame rate, J/L cut semantics lost, captions outside duration, provider-generated insert breaks canon.

**Accessibility:** semantic list/timeline parity; keyboard edit and review.

**Decision produced:** native video boundary, EditorialSequence, OTIO profile.

**Teardown:** retain portable OTIO and fixture; discard prototype timeline implementation if not selected.

---

## POC-07 — Self-hosted ComfyUI orchestration

**Depends on:** POC-03 and POC-04.

**Research question:** Can a self-hosted ComfyUI service execute complex hosted-endpoint workflows safely and reproducibly while remaining nonauthoritative and invisible to normal users?

**Fixture:** identity-preserving multi-step image edit and a deterministic-only preprocessing workflow.

**Success criteria:**

- WorkflowDefinition pins JSON, node packages, endpoints, bindings, and hash.
- Generative nodes call only approved hosted endpoints.
- Deterministic nodes run without model weights.
- Node and endpoint allowlists are enforced.
- Container has no database credential and deny-by-default network.
- Experimental workflow cannot run in production profile.
- Workflow replacement preserves canonical recipe.
- Normal Storyworld UI invokes workflow without exposing graph.
- Advanced Operator Mode can inspect redacted graph/logs.

**Failure cases:** custom node attempts unauthorized egress, missing node version, endpoint changes behavior, workflow imports secret, restricted input exceeds workflow egress ceiling.

**Decision produced:** production Comfy security and workflow-promotion policy.

**Teardown:** remove experimental node packages and containers; retain registry records and evidence.

---

## POC-08 — External precision tools

**Depends on:** POC-01 and checkout/annotation draft contracts; Kdenlive/Resolve portion depends on POC-06.

**Research question:** Can Storyworld exchange governed work with Blender, InvokeAI, Kdenlive, and Resolve without plugins, authority leakage, or private-format lock-in?

**Representative fixtures:**

- Blender: set/camera/light adjustment with USD/glTF return.
- InvokeAI: detailed mask cleanup and image return.
- Kdenlive: OTIO trim/transition/caption return.
- Resolve: OTIO plus grade/Fusion/Fairlight workfile and render.

**Success criteria:**

- Exact checkout package and authoritative sidecar retained by Storyworld.
- User works normally in native tool.
- Returned files are untrusted, scanned, hashed, and associated with checkout.
- Portable representation and workfile are separately classified.
- Semantic diff and ConversionLossReport are produced.
- Two concurrent returns become separate candidates.
- Missing dependencies or unsupported effects are visible.
- Application removal does not lose accepted outputs or portable source.

**Failure cases:** malicious project file, unresolved Blender dependency, two conflicting returns, Kdenlive marker mismatch, Resolve effect not representable in OTIO.

**Decision produced:** promote, limit, or defer each connector profile.

**Teardown:** remove prototype launch/connector scripts; preserve interchange fixtures.

---

## POC-09 — Coordinated cross-media command

**Depends on:** POC-04 and POC-06; sound/graphics may use deterministic or mock operations.

**Research question:** Can one user direction coordinate several media without collapsing their semantics or approval consequences?

**Fixture:** “Make the whole scene colder” affects image still, video grade, lighting, ambience, music, title graphic, and browser runtime presentation.

**Success criteria:**

- One CreativePlan contains separate typed operation groups.
- Each group has its own cost, provider route, egress, evaluation, and invalidation.
- Coordinated preview distinguishes rendered, simulated, and pending domains.
- User accepts image/video/graphics and rejects music without producing invalid state.
- Counterpoint option can deliberately keep warm music against colder visuals.

**Failure cases:** one generic mood value, hidden cross-domain cost, dependent operation accepted without prerequisite, approval invalidation omitted.

**Decision produced:** cross-media operation-group contract and Studio UX.

**Teardown:** retain fixtures and plan records; discard mock renderer.

---

## POC-10 — Astro export and publication package

**Depends on:** POC-09 and delivery contracts.

**Research question:** Can Storyworld create a deterministic, accessible, portable Astro website package while preserving package/publication authority separation?

**Fixture:** a small serial property with pages, character/location entries, images, video, captions, disclosures, and an interactive scene link.

**Success criteria:**

- Package contains typed source/content collections, accepted assets, routes, metadata, rights/disclosures, dependency lock, and build profile.
- Static build is reproducible and accessible.
- Package hash changes on any material content/metadata change.
- Export success does not create PublicationReceipt.
- Scheduled preparation revalidates package.
- Deployment connector can be replaced or omitted.

**Failure cases:** missing alt text, expired right, changed metadata after authorization, external remote asset, nondeterministic build.

**Decision produced:** Astro profile and publication-scheduler readiness.

**Teardown:** delete demo deployment; retain package/build receipt.

---

## POC-11 — Commerce Foundry commercial and print handoff

**Depends on:** package/authority contracts and existing CF simulator.

**Research question:** Can Storyworld send creative/rights/proof-approved packages while Commerce Foundry independently rejects or approves commercial use?

**Fixture:** product-centered narrative campaign and print-ready illustrated product.

**Success criteria:**

- Signed brief pins product/claim/offer facts.
- Storyworld bundle pins creative assets, proof, rights, and product snapshot.
- CF imports as unapproved commercial candidate.
- CF can reject a creatively accepted package without changing Storyworld creative acceptance.
- Vendor credentials never enter Storyworld.
- CF returns normalized status/order/fulfillment/publication receipts.
- Product-source drift marks connected work stale and proposes action.

**Failure cases:** Storyworld assumes commercial approval, stale claim, vendor error, duplicate receipt, CF unavailable.

**Decision produced:** expanded CF contracts and print activation gate.

**Teardown:** use simulator; no live CF or vendor crossing.

---

## POC-12 — Browser and Godot runtime vertical slices

**Depends on:** runtime contracts, accepted source package, and a narrow interactive fixture.

**Research question:** Can one Storyworld runtime package compile to browser and Godot while preserving authored meaning and excluding live save state?

**Fixture:** branching dialogue, one mission dependency, one item, one location, one sound zone, and one runtime observation.

**Success criteria:**

- Shared RuntimeContentPackage validates once.
- Browser and Godot adapters produce target packages and loss reports.
- Stable narrative IDs and authored outcomes match.
- Save/session state remains target-owned and absent from source package.
- Runtime returns acceptance receipt and observation proposal.
- Neither adapter can mutate working canon.

**Failure cases:** circular mission, missing location, target capability mismatch, browser/Godot divergence, runtime hotfix proposal.

**Decision produced:** shared runtime contract and target-profile scope.

**Teardown:** remove demo runtime builds; retain packages/receipts.

---

## POC-13 — Provider outage and queued-job revalidation

**Depends on:** all provider-policy and queue work.

**Research question:** Does Storyworld remain useful during provider outage, and can queued work avoid executing under stale policy, consent, inputs, prices, or credentials?

**Fixture:** queued private image edit, public draft, revoked-consent real-person edit, price increase, model deprecation, expired credential, fal late completion.

**Success criteria:**

- Writing, canon, review, deterministic processing, package preparation, and existing assets remain available.
- Queue preserves exact original inputs and policy snapshot for audit.
- Execution applies current policy; stricter rule wins.
- Revoked consent and expired credential block execution.
- Material price/route change requires renewed confirmation.
- Approved public low-risk fallback may proceed; sensitive fallback cannot.
- Late result is quarantined and never applied.

**Decision produced:** degraded-mode and queue-revalidation policy.

**Teardown:** clear queued demo work and temporary provider artifacts; retain receipts.
