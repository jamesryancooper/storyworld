# Storyworld Owner Decision Questionnaire

**Status:** Substantively populated owner response workbook; formal owner approval pending

> Capture owner-level answers that prevent the engineering team from making reasonable—but potentially incorrect—assumptions.

## Document metadata

- **Owner / decision authority:** James Ryan Cooper
- **Response date:** Not provided
- **Document version:** Owner response workbook — draft
- **Owner-response completeness:** Substantively complete except Questions 18 and 22
- **Formal owner-approval status:** Pending explicit owner sign-off
- **Approval date:** Not yet recorded
- **Approved document version:** Not yet recorded
- **Remaining owner decisions:** Question 18 hosting model and Question 22 provider-credential scope
- **Implementation-evidence status:** Research, prototypes, and validation remain required as identified by the numbered responses
- **Repository / program reference:** Storyworld platform / project-dossier-intake

## Formal owner-approval record

| Field | Current value |
| --- | --- |
| Approval status | Pending explicit owner sign-off |
| Owner | James Ryan Cooper |
| Approval date | Not yet recorded |
| Approved document version | Not yet recorded |
| Exceptions or prerequisites | Questions 18 and 22 must be resolved or explicitly deferred before formal sign-off. |

This record is pending. No approval date, approved version, or formal owner approval may be inferred from the populated responses or their section statuses.

## How to use this workbook

- This Markdown file is the response workbook. Type directly beneath each **Response:** or **Selected choice(s), ranking, qualifications, or additional answer:** label, expanding the plain Markdown content as needed.
- For checkbox options, replace ☐ with ☒ or add an X beside the selected choice.
- Use “Not decided” when necessary, but identify what research, prototype, or owner decision is required.
- Separate current accepted direction from future preference. A response in this workbook does not by itself accept a repository decision or authorize implementation.
- Priority 1 questions should be answered before major dependency adoption or interface prototypes are approved.
- Use the response-order guide below to review all top-level questions in dependency order. The guide provides navigation only and does not restate or supersede the answers.

## Response, follow-up, and approval status model

Each numbered question uses two independent fields:

1. **Owner-response status**
   - **Answered:** The recorded target owner-direction response is substantively complete. It does not mean the artifact has received formal owner approval or that the capability is implemented.
   - **Partially answered:** An actual owner choice or substantive answer remains unresolved.
   - **Deferred:** The owner has intentionally postponed the substantive answer or choice.
2. **Implementation follow-up**
   - **Needs research/prototype:** Implementation, validation, or evidence work remains. This does not make an otherwise complete owner answer partial.
   - **No additional research currently identified:** The question identifies no additional research or prototype need at this time. This does not claim implementation or evidence completion.
   - **Evidence complete:** The applicable implementation evidence has been completed and reviewed for the stated scope. This does not by itself grant formal owner approval or implementation authority.

Formal owner approval applies to the artifact as a whole and is recorded only in the separate formal owner-approval record. “Answered” does not mean formally approved. Formal approval does not imply implementation. “Needs research/prototype” does not reopen settled owner direction. If later research would materially change recorded target owner direction, that change requires a later explicit owner decision.

Nothing in any response or status authorizes implementation, dependency installation, spending, credential use, provider calls, deployment, publication, external communication, participant recruitment, charging customers, production use, or movement to another rollout stage.

## Canonical product milestone sequence

Use the following seven milestones, in this order, whenever an answer assigns product scope or capability timing:

1. **Proof — “Does it work?”**
   - A bounded internal demonstration that Storyworld can move at least one real project through a representative end-to-end workflow.
   - It may use temporary scaffolding, manual support, or incomplete interfaces.
   - It validates the concept and critical architecture.
   - It does not establish usability, reliability, production readiness, or suitability for external users.
2. **Useful Internal Version — “Can I use it for my real work?”**
   - The earliest version the owner can use repeatedly for genuine creative work.
   - It supports the core creator journey and the first serious editor defined in Question 6.
   - It can complete real internal projects with known and documented limitations.
   - It is limited to the owner and authorized internal participants and does not claim that the family team can depend on it without substantial support.
3. **Reliable Internal Version — “Can my small team depend on it?”**
   - The version the owner’s family team can rely on for repeated internal production.
   - It adds demonstrated durability, recovery, export, accessibility, security, governed authority, predictable cost, and non-builder usability.
   - It is the milestone previously described as the “first production version.”
   - It must satisfy the applicable Internal Qualification evidence before the owner may consider a Controlled External Pilot. Reaching it does not itself authorize external access.
4. **Controlled External Pilot — “Can a few invited creators succeed with planned help?”**
   - The first external-access stage: invitation-only, owner-authorized, paid, high-touch, and limited to named participants.
   - It tests whether a small number of eligible external creators can complete real work with bounded onboarding and support.
   - It does not imply public registration or broader product availability. The detailed eligibility, evidence, operating, and exit gates remain in Question 26.
5. **Limited Paid Beta — “Can a larger selected group use it sustainably?”**
   - A selected, capacity-controlled cohort of paying external teams.
   - It tests repeat demand, support burden, retention, economics, and operational sustainability at a larger scale.
   - Access remains invitation- or waitlist-based rather than unrestricted public signup. The detailed thresholds remain in Question 26.
6. **Public Self-Service — “Can eligible creators sign up without an invitation?”**
   - An optional broader-enrollment stage in which eligible users may register without case-by-case owner invitation.
   - It requires a separate explicit owner decision. “Public” describes enrollment, not the visibility of creator content.
   - It does not imply enterprise support, public creator content, publication authority, or unrestricted production claims.
   - It may be deferred indefinitely, narrowed, paused, or rolled back. The detailed decision gates remain in Question 26.
7. **Mature Product — “What should the fully developed product eventually support?”**
   - The long-term product direction after earlier milestones have validated the core workflow and operating model.
   - It describes intended breadth, depth, refinement, and advanced capability; it is a planning horizon, not a promised release.
   - A Mature Product capability is not automatically required in the Proof, Useful Internal Version, Reliable Internal Version, Controlled External Pilot, Limited Paid Beta, or Public Self-Service milestones.
   - It does not imply that the capability is implemented or authorized for implementation.

**Milestone interpretation rules:**

- The milestones are ordered and cumulative: each builds on the capabilities and safeguards required by earlier milestones.
- A capability’s assigned milestone is the earliest point by which it must be sufficiently implemented, documented, and validated for that milestone’s intended use.
- Work may be prototyped or explored before its required milestone without becoming supported production capability. A technical prototype supplies evidence; it does not satisfy the Proof milestone unless the bounded Proof criteria are met.
- Reaching one milestone permits an owner decision about whether to pursue the next; it never automatically authorizes progression.
- A later target must not be interpreted as an immediate requirement for an earlier milestone.
- A capability needed for safe operation at an earlier milestone cannot be deferred merely because its more advanced form is assigned to Mature Product.
- Current implementation status remains separate from target milestone direction.
- The ordered list does not make external rollout inevitable. Mature Product is a capability horizon, not an automatic enrollment stage after Public Self-Service. Storyworld may remain internal, pilot-only, beta-only, or otherwise bounded without invalidating its Mature Product direction.

**Superseded horizon-language mapping:**

| Superseded phrase | Canonical interpretation |
| --- | --- |
| First proof or proof of concept | Proof |
| First useful release | Useful Internal Version |
| First serious editor | Useful Internal Version |
| Initial product | Useful Internal Version, unless the passage explicitly describes only a bounded Proof |
| First production version | Reliable Internal Version |
| Controlled external pilot | Controlled External Pilot |
| Limited paid beta | Limited Paid Beta |
| Public self-service | Public Self-Service |
| Mature capability | Mature Product |
| Primary mature target | Mature Product |

The unqualified phrase “first version” is retired. Later answers use the exact canonical milestone instead of these superseded phrases; references to technical prototypes remain evidence-building work rather than alternative product milestones.

Use these labels whenever timing materially affects a capability answer:

- **Required by:** The capability must meet the stated requirements by the named milestone.
- **Basic support by:** The shared model safely supports the core workflow with documented limitations by the named milestone.
- **Full support by:** The specialized workflow, validation, documentation, accessibility, and expected export or delivery behavior are complete for the stated scope by the named milestone.

Use both Basic support and Full support only when the capability genuinely has two meaningful support levels. A milestone assignment records target owner direction; it does not claim current implementation or authorize implementation, dependency installation, spending, deployment, credential use, external communication, recruitment, charging customers, publication, or production use.

The external progression is:

```text
Reliable Internal Version
    ↓ explicit owner decision after Internal Qualification
Controlled External Pilot
    ↓ explicit owner go/no-go decision
Limited Paid Beta
    ↓ separate explicit owner decision
Public Self-Service
```

External access always requires the applicable explicit owner decision. Publication, release-package authorization, Receiving-Runtime Acceptance, canon acceptance, and Master Acceptance remain separate decisions.

## Response-order guide

This table establishes recommended response priority, not document order or authority. Questions remain in their existing thematic locations, and the brief rationales describe dependencies only; they do not answer the questions. Each numbered questionnaire response remains the detailed source of recorded owner direction. This guide is non-authoritative navigation and may be updated without physically reordering or renumbering the questionnaire.

| Response order | Wave | Existing question | Dependency rationale |
| ---: | --- | --- | --- |
| 1 | Product direction | Question 1 — What must Storyworld prove first? | Establish what the bounded Proof must demonstrate. |
| 2 | Product direction | Question 2 — Who uses the Useful Internal Version? | Establish who the earliest repeatedly usable internal product serves. |
| 3 | Product direction | Question 26 — Is Storyworld expected to become a standalone product? | Establish whether external availability is a goal and define its staged boundary before downstream scope decisions. |
| 4 | Authority and safety | Question 3 — Who is allowed to make each important decision? | Establish who may make consequential decisions. |
| 5 | Authority and safety | Question 5 — What exactly counts as canon? | Define Storyworld’s central authoritative content state and transitions. |
| 6 | Authority and safety | Question 4 — How should authoring normally work? | Define editing and acceptance behavior after authority and canon are understood. |
| 7 | Authority and safety | Question 15 — What types of sensitive material will Storyworld hold? | Establish internal-access and provider-egress boundaries. |
| 8 | Authority and safety | Question 16 — How detailed must rights management be? | Establish rights, consent, and usage constraints. |
| 9 | Authority and safety | Question 21 — What may AI do without asking first? | Decide which workflow actions AI may take within the established authority boundaries. |
| 10 | Authority and safety | Question 22 — Which AI constraints are essential? | Define operational AI limits, Agent Mission governance, capability leases, and provider controls. |
| 11 | Authority and safety | Question 23 — What accessibility commitment should Storyworld make? | Establish the cross-cutting accessibility baseline before detailed interface scope. |
| 12 | Core internal product | Question 6 — What kind of writing must the Useful Internal Version editor support? | Define the principal authoring surface required by the Useful Internal Version. |
| 13 | Core internal product | Question 7 — What should be the smallest editable narrative unit? | Define the content units the editor and domain model must represent. |
| 14 | Core internal product | Question 8 — Which graph should be built first? | Define how narrative units and relationships should be visualized. |
| 15 | Core internal product | Question 9 — Should DEC-0028 be amended as recommended? | Specialize graph behavior for the Arc workspace after general graph requirements are known. |
| 16 | Core internal product | Question 10 — How much media editing belongs inside Storyworld? | Extend the core content model into prioritized media capabilities. |
| 17 | Core internal product | Question 11 — What is the expected external-editor workflow? | Define external-tool integration after the internal content and authority models are established. |
| 18 | Core internal product | Question 18 — Where should Storyworld run at each milestone? | Establish the product’s operating and custody boundary. |
| 19 | Core internal product | Question 20 — What identity system must each internal milestone use? | Establish actor identity, authentication, and account authority within that deployment model. |
| 20 | Core internal product | Question 19 — What reliability must the Reliable Internal Version demonstrate? | Define durability and recovery after deployment and identity boundaries are known. |
| 21 | Core internal product | Question 12 — How collaborative must the Reliable Internal Version be? | Define multi-person behavior using the established identity, authority, and recovery rules. |
| 22 | Core internal product | Question 24 — What must mobile support? | Apply the established workflows and authority boundaries to mobile use. |
| 23 | Dependent capability | Question 17 — How large do you expect Storyworld to become? | Define scale and discovery after content, classification, rights, and deployment boundaries are established. |
| 24 | Dependent capability | Question 25 — How customizable should Storyworld be? | Define extension points after the stable core product model is understood. |
| 25 | Dependent capability | Question 13 — What is the first Commerce Foundry integration that must work? | Define the optional commercial domain after product, authority, rights, and rollout direction are established. |
| 26 | Dependent capability | Question 14 — Which interactive runtime should be the first supported production target? | Define downstream runtime integration against the established canon, asset, package, and authority contracts. |

Physical reordering is deferred to a future major questionnaire revision in which numbering, navigation, and every affected cross-reference can be updated together.

## Current owner-action queue

This queue is a current status snapshot and navigation aid, not another source of product direction. It includes only the two unresolved owner choices and the subsequent whole-artifact sign-off. Research, implementation, and successor work that needs no additional owner answer is tracked in the authoritative cross-cutting register instead.

| Priority | Controlling item | Current status or unresolved choice | Owner action needed |
| ---: | --- | --- | --- |
| 1 | Question 18 | `Partially answered`; customer-managed-only versus an optional Storyworld-hosted service remains unresolved. | Select the hosting posture recorded in Question 18 or explicitly defer it; Question 18 alone owns this choice. |
| 2 | Question 22 | `Partially answered`; workspace-admin versus per-member provider-credential scope remains unresolved. | Select the credential scope recorded in Question 22 or explicitly defer it; Question 22 alone owns this choice. |
| 3 | Formal owner sign-off | Pending; no approval date or approved document version is recorded. | After Questions 18 and 22 are resolved or explicitly deferred, review the identified document version and record the owner’s explicit approval or non-approval. |

# Priority 1 — Product purpose and Proof

## Target purpose statement

The dedicated product-definition artifact [`../product-definition/storyworld-purpose.md`](../product-definition/storyworld-purpose.md) contains the complete statement and is the intake's single staged source of truth for it. This questionnaire records the referenced statement as target owner direction pending formal owner sign-off and intake ratification; it is included in the questionnaire's eventual whole-artifact owner sign-off. Questions 1 and 2 establish how the Proof and Useful Internal Version serve that purpose; they do not redefine it.

## 1. What must Storyworld prove first?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☐ Needs research/prototype  ☒ No additional research currently identified  ☐ Evidence complete

**1. Which real project must the Proof complete from beginning to end?**

**Required by:** Proof

- ☐ Stillhouse
- ☐ BeKindRewind
- ☐ A Commerce Foundry campaign
- ☒ Dumpster Fire Friends
- ☐ Another property

**Selected choice(s), ranking, qualifications, or additional answer:**

**Response:**

**Dumpster Fire Friends should be Storyworld’s Proof project.** It is a bounded adult-satire collectible-card universe with recurring characters, stable identities, structured stats, numbered releases, reusable layouts, and a consistent behavior → impact → response → recovery arc. The Proof should deliver Cards 007–008—Reality-Revision Riley and Doomscroll Daisy—through drafting and accepting property facts into Current Canon, pinning an exact Canon Version for production, illustration, exact text overlays, review, approval, provenance tracking, and controlled export. It may use bounded scaffolding or planned manual support while testing Storyworld’s critical workflow and architecture. It does not establish Useful Internal Version usability, Reliable Internal Version dependability, production readiness, or suitability for external users. The property must remain explicitly adult and visually original.

---

**2. What would make you say, “Storyworld now works for its intended purpose”?**

**Required by:** Useful Internal Version

**Response:**

**Storyworld works for its intended purpose when it lets a creator move from creative intent to a coherent, approved, portable release within one governed workspace.** I should be able to use text or voice to describe goals, generate work, request revisions, and perform professional edits. Progressive UI/UX should let me move from simple direction to fine-grained, non-destructive control over a card, panel, region, layer, character attribute, text block, or locked visual invariant.

Every instruction should show its scope, cost, affected versions, conflicts, and approval consequences. Storyworld must preserve canon, version history, provenance, rights, and human review; no model or integration may silently change Current Canon, discard work, approve content, or publish it. For Dumpster Fire Friends, a small numbered release should move from a pinned Canon Version containing the defined character and style facts through generation, precise editing, review, approval, and export for print, digital, or social use while preserving its adult designation and original visual language. Repeating that journey for genuine owner work, with documented limitations, is the Useful Internal Version threshold. It remains internal and is not a reliability or external-availability claim.

---

**3. Which three outcomes matter most?**

**Required by:** Useful Internal Version

- ☒ Keeping canon consistent
- ☐ Planning stories
- ☒ Producing visual media
- ☒ Reusing characters and worlds
- ☐ Reviewing AI work
- ☐ Exporting to other systems
- ☐ Publishing campaigns
- ☐ Something else

**Selected choice(s), ranking, qualifications, or additional answer:**

**Response:**

All of these outcomes are important to me. If three must be prioritized, the primary outcomes are maintaining canon consistency, producing professional visual media, and reusing characters and worlds across multiple works. Planning stories and reviewing AI work are essential capabilities that make those outcomes trustworthy. Exporting to other systems is required for portability and delivery, while publishing campaigns is an important downstream use case with its own approval and authority requirements. By Mature Product, Storyworld should support the full set, but its central value is turning consistent, reusable storyworld knowledge into approved creative work.

Cross-cutting enabling capability—not an additional prioritized outcome: Achieving these three outcomes requires creators to express creative intent and make professional, fine-grained, human-controlled edits across media. This includes text and voice as primary controls; progressive movement from broad direction to panel-, region-, layer-, character-, and text-level editing; non-destructive revisions; and clear visibility into scope, cost, lineage, rights, and approval consequences. This is what makes Storyworld a professional creative workspace rather than merely a media generator or orchestration backend.

---

**4. What can safely remain manual during the Useful Internal Version?**

**Required by:** Useful Internal Version

**Response:**

Only work requiring human authority, legal/accountability judgment, or exceptional creative precision should remain manual. Humans must perform Add to Canon or Update Canon; perform Master Acceptance for exact candidate asset versions; accept final edits and channel packages; make authoritative creative selections; approve rights, consent, likeness, or voice use; resolve interpretive findings or permitted waivers; and authorize publication.

Storyworld should automate everything else policy allows: interpreting text and voice, creating plans and typed operations, generating candidates, executing low-consequence work within approved policies and budgets, preparing medium-consequence changes for clear confirmation, performing professional native edits, running evaluations, tracking custody, versions, provenance and costs, assembling derivatives, and preparing governed export packages.

InvokeAI should remain an optional edge-case precision workspace only when Storyworld’s native tools cannot safely provide the required control. Storyworld must manage exact-version checkout and return, ingest the result as a new candidate, preserve lineage, rerun affected evaluations, and expose approval consequences.

External upload may remain manual through the Useful Internal Version where a destination connector is not ready, although package preparation and validation should be automated. Full governed scheduling is a Mature Product capability: a non-AI scheduler may mechanically execute an exact, still-valid human publication authorization without another prompt. The governing principle is: **no unnecessary approval friction, but no invisible automation.**

---

**5. What must not be postponed?**

**Required by:** Useful Internal Version

**Response:**

Anything that defines Storyworld’s identity, trustworthiness, and intended creative experience must not be postponed. The Useful Internal Version must include:

- Text and voice as primary creative controls, with editable transcripts, contextual binding, and progressive controls.
- Native routine generation and editing, including fine-grained professional operations without exposing dense provider-specific workflows.
- Inspectable, reversible, interruptible operations with previews, diffs, partial acceptance, undo, and clear consequence levels.
- Engine-owned Current Canon, immutable Canon Revisions and Canon Versions, candidate/accepted-master lifecycle, provenance, rights, consent, privacy, egress, and cost controls.
- Automated continuity, identity, technical, rights, and policy evaluation, with findings and uncertainty surfaced for human review.
- Human-only authority for canon acceptance through Add to Canon or Update Canon, Master Acceptance, final-edit acceptance, waivers, rights decisions, and publication authorization.
- The end-to-end Dumpster Fire Friends workflow established by the Proof, now usable repeatedly with Current Canon defining the property and characters, an exact Canon Version pinned for production, and native generation, fine-grained editing, review, approval, and governed export.

InvokeAI should remain an exceptional precision-finishing path, not the normal workflow. Direct publishing, broad channel coverage, Mature Product collaboration roles, and other specialist integrations can follow, provided the export, custody, and authority boundaries are established from the beginning. The Useful Internal Version must support the intended internal product—not an interim prompt box, provider console, or manually coordinated asset pipeline.

---

## 2. Who uses the Useful Internal Version?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☐ Needs research/prototype  ☒ No additional research currently identified  ☐ Evidence complete

**1. Is the Useful Internal Version mainly for:**

**Required by:** Useful Internal Version

- ☐ You alone
- ☒ You and a small internal team
- ☐ Stavium creators
- ☐ Commerce Foundry users
- ☐ Outside customers

**Selected choice(s), ranking, qualifications, or additional answer:**

**Response:**

The Useful Internal Version is for me and a small, trusted family team working on our own properties, beginning with Dumpster Fire Friends. We will function as the creators, editors, reviewers, approvers, and operators, with one person sometimes holding multiple roles. Storyworld should therefore prioritize a private, small-team workflow with text and voice as primary controls, high automation, progressive professional editing, clear version history, and explicit human authority at consequential decision points. It is not for enterprise departments, outside customers, or Public Self-Service. Sensitive family source material must remain `Access—Restricted` and must never be added to Current Canon or reclassified as `Access—Public` automatically.

The Proof is also internal and may involve only the owner and explicitly authorized helpers. Neither the Proof nor the Useful Internal Version authorizes or implies external access.

---

**2. How technically comfortable should Useful Internal Version users be?**

**Required by:** Useful Internal Version

**Response:**

Useful Internal Version users should be assumed to have little or no technical knowledge, while still bringing meaningful creative and subject-matter expertise. Storyworld must be usable without understanding prompts, models, providers, seeds, nodes, codecs, schemas, APIs, or workflow configuration.

Text and voice should be the primary controls, supported by plain-language instructions, sensible defaults, contextual guidance, previews, explanations, correction, and undo. Technical complexity should be handled automatically and progressively disclosed only when useful. Advanced operator controls should be optional and available only to users who need them; normal work should not require opening InvokeAI or another external tool. Errors, costs, risks, and approval consequences should be explained in accessible language, with actionable next steps. This should simplify the technology without reducing creative control.

Storyworld must support the full range from people with little or no technical knowledge to highly technical users. Beginners should be able to work through text, voice, plain-language guidance, sensible defaults, and progressive controls. Experienced users should be able to inspect plans, providers, workflows, parameters, costs, and technical logs through an optional Advanced Operator Mode. The interface should reveal complexity progressively without limiting creative power, and expert access must never bypass versioning, policy, provenance, approval, or human-authority boundaries.

---

**3. What interaction balance must the Useful Internal Version provide?**

**Required by:** Useful Internal Version

**Response:**

The interface should balance simplicity and power through progressive disclosure rather than choosing one permanently. Everyday work should begin with intuitive text and voice direction, sensible defaults, contextual controls, clear previews, and easy correction. As the user requests more precision—or as the task requires it—Storyworld should reveal deeper semantic and professional controls without forcing users into dense technical panels.

Highly technical users should have an optional Advanced Operator Mode for inspecting and adjusting providers, workflows, parameters, costs, and logs. Both experiences must operate on the same underlying versions, operations, provenance, and authority rules. The goal is to make simple work genuinely simple while keeping complex work possible, precise, and fully governed.

---

**4. Will one person often hold several roles, such as creator, editor, and approver?**

**Required by:** Useful Internal Version

**Response:**

Yes. Storyworld should assume that solo creators and small teams will often have one person acting as creator, editor, reviewer, approver, and operator. The system should support this without imposing large-team bureaucracy, while still distinguishing each action and recording the applicable authority, scope, version, and receipt.

A single person may perform multiple roles where policy allows, but “apply,” “accept,” “approve,” “waive,” and “authorize publication” must remain clearly distinct actions. The system must not silently treat creative editing as approval or allow a user to bypass a required independent review. Larger teams can add more granular roles and delegation later.

---

# Priority 1 — Canon and human authority

## 3. Who is allowed to make each important decision?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☐ Needs research/prototype  ☒ No additional research currently identified  ☐ Evidence complete

| Action | Authorized role/person | Scope / delegation | Notes / safeguards |
| --- | --- | --- | --- |
| Add to Canon | Project/property owner; explicitly delegated canon authority | Exact proposal version within a named property and branch | Requires exact-version validation, provenance, conflict review, and impact analysis. Creates an immutable Canon Revision and canon-acceptance receipt, then advances Current Canon. |
| Update Canon | Project/property owner; explicitly delegated canon authority | Exact change proposal against a named property, branch, and prior Canon Revision | Requires exact-version validation and review. Creates an immutable successor Canon Revision and receipt, advances Current Canon, and preserves all prior revisions. |
| Pin a Canon Version | Property owner or explicitly delegated property/production authority | Exact Canon Version and named downstream production or workflow | Records the exact pin and receipt. It does not accept content or change Current Canon. A deterministic system may execute only as part of an exact authorized action. |
| Approve a narrative plan | Property owner or delegated creative lead | Named production, pinned Canon Version, and plan version | Approval does not change Current Canon or the production’s pin; material canon changes require a separate Add to Canon or Update Canon action. |
| Approve a candidate’s creative quality (conditional) | Authorized creative approver | Exact candidate asset version and defined creative criteria | Produces exact-version Creative Approval evidence only when required or recorded by the governance profile. It does not establish master status or substitute for Master Acceptance. |
| Accept an asset as master | Property owner or explicitly delegated master-acceptance authority | Exact candidate asset version within a named property or production | Requires applicable evaluation and policy checks, plus exact-version Creative Approval only when the governance profile requires it. Produces an immutable accepted master and exact-version Master Acceptance receipt. It does not add to or update Current Canon, approve rights, create a release, authorize publication, or affect unrelated assets. |
| Approve rights | Rights holder or authorized rights reviewer; counsel when needed | Exact asset, use, purpose, territory, channel, duration, consent, and derivative scope | Rights approval is evidence-based and separate from Creative Approval and Master Acceptance. AI cannot make legal determinations. |
| Waive a continuity problem | Property owner or delegated continuity authority | Exact finding, asset/version, scope, and duration | Only permitted waivers may be granted; rationale, evidence, expiry, and approver are recorded. Rights and policy blockers cannot be silently waived. |
| Create a release | Property owner or delegated release authority | Exact accepted masters, metadata, renditions, and package | All required Master Acceptance receipts and other applicable approvals must be present. The release is versioned and immutable. |
| Authorize external publication | Authorized publication authority, initially the property owner | Exact package, destination, metadata, disclosures, timing, cost/quota, and retry scope | Requires human authorization. A connector or scheduler may execute only the still-valid authorization; the external destination remains the authority host. |
| Approve a runtime-package handoff | Property owner or delegated Storyworld release/runtime-handoff authority | Exact package version and named target runtime | Produces Storyworld Runtime Handoff Approval and its exact-version receipt. Authorizes transfer, import, preview, testing, and acceptance evaluation only; it does not mean the receiving runtime has accepted the package. |
| Accept a package in the receiving runtime | Authorized receiving-runtime authority | Exact imported package version and exact target runtime/environment | Requires successful import, package validation, parity checks, required previews or test execution, and resolution of blocking findings. Produces Receiving-Runtime Acceptance and the final runtime acceptance receipt. |
| Approve a commercial campaign | Commerce Foundry’s authorized commercial approver; property owner for Storyworld creative-scope approval | Exact campaign, products, claims, budget, territory, and publication scope | Storyworld creative-scope approval does not grant commercial, vendor, fulfillment, or commerce-publication authority. |

**Master lifecycle terminology:**

- **Candidate asset:** A non-authoritative asset version under evaluation, revision, or review.
- **Creative Approval:** An exact-version human review decision stating that a candidate meets the applicable creative criteria. It is supporting evidence only. Creative Approval does not establish master status, clear rights, create a release, or authorize publication.
- **Master Acceptance:** An authorized human lifecycle decision that accepts an exact candidate asset version as the immutable accepted master for a named property or production. It creates the accepted-master state and an exact-version Master Acceptance receipt.
- **Accepted master:** The immutable exact asset version produced by Master Acceptance. Later changes create a new candidate; they do not modify the accepted master in place.

**Authoritative candidate-to-master lifecycle:**

1. Work begins as a candidate asset.
2. Required creative, continuity, technical, accessibility, rights, consent, policy, and other applicable checks are performed.
3. A governance profile may require exact-version Creative Approval as a prerequisite.
4. An authorized human performs **Accept an asset as master** for the exact candidate version.
5. Storyworld creates an immutable accepted master and a Master Acceptance receipt.

Creative Approval alone leaves the asset as a candidate. Master Acceptance is the single governing event that creates master status. Creative Approval is not universally required as a separate action: when it is not required, an authorized master-acceptance authority may accept the candidate as master after all required checks pass.

For a solo creator or small team, the same person may perform Creative Approval and Master Acceptance where policy permits, but the actions and records remain distinct when both are required. Higher-risk profiles may require Creative Approval by an independent reviewer before Master Acceptance. Storyworld must not manufacture a redundant Creative Approval event merely to simulate a two-person workflow.

A material change after Creative Approval creates a changed candidate to which the earlier approval evidence does not apply. A material change to an accepted master creates a new candidate requiring new review and Master Acceptance; the previously accepted master and its receipt remain immutable historical records. Importing, generating, editing, reviewing, or successfully validating an asset does not by itself create Master Acceptance.

**Action-verb distinction:**

- **Accept** changes authoritative lifecycle status—for example, Add to Canon or Update Canon accepts material into Current Canon, while Accept an asset as master creates master status.
- **Approve** records an authorized decision within a defined review or authority domain—for example, Creative Approval, rights approval, narrative-plan approval, or commercial approval.
- Approval may be a prerequisite for acceptance, but approval does not automatically perform acceptance.
- Acceptance does not silently grant unrelated approvals.

Master Acceptance is exact-version-bound, attributed, human-authorized, and receipted. It does not add to or update Current Canon; approve or clear rights, consent, likeness, or voice use; create a release; authorize publication, deployment, commercial use, or runtime acceptance; or affect unrelated assets. Rights approval, release creation, publication authorization, commercial approval, and runtime decisions remain separate. One person may hold several roles where policy permits, but holding those roles does not collapse their decisions or receipts.

This response records target owner direction. It does not claim that the complete candidate, Creative Approval, Master Acceptance, permission, receipt, mobile, accessibility, or authentication workflow is already implemented. It does not authorize implementation, dependency installation, spending, deployment, publication, external communication, or any acceptance-class action. The questionnaire itself performs neither Creative Approval nor Master Acceptance.

**How should authority be structured?**

- ☐ Fixed by role
- ☐ Delegated per property
- ☐ Delegated per production
- ☐ Delegated temporarily
- ☒ Some combination

**Selected choice(s), ranking, qualifications, or additional answer:**

Some combination: fixed minimum safeguards for high-consequence actions, with scoped delegation per property, production, or temporary assignment.

For the Useful Internal Version’s solo/small-family-team scope, I should remain the default project and property owner with final authority over consequential decisions. Family-team members may receive scoped delegation per property, production, or temporary assignment. One person may hold multiple roles, but Storyworld must keep the action types and receipts distinct.

- **Add to Canon or Update Canon:** Property owner or explicitly delegated canon authority; exact proposal, property, branch, and prior-revision scope. Requires validation, impact analysis, provenance, an immutable Canon Revision, and a canon-acceptance receipt.
- **Pin a Canon Version:** Property owner or explicitly delegated property/production authority; exact Canon Version and downstream destination. Records a pin receipt but does not accept content or change Current Canon. A deterministic system may perform it only within an exact prior authorization.
- **Approve a narrative plan:** Property owner or delegated creative lead; limited to the named production, pinned Canon Version, and plan version.
- **Approve a candidate’s creative quality (conditional):** Authorized creative approver; exact candidate version and defined creative criteria. Produces Creative Approval evidence only when required or recorded by the governance profile and does not establish master status.
- **Accept an asset as master:** Property owner or explicitly delegated master-acceptance authority; exact candidate asset version within a named property or production. Requires all applicable checks and any profile-required exact-version Creative Approval. Produces the immutable accepted master and exact-version Master Acceptance receipt.
- **Approve rights:** Rights holder or authorized rights reviewer, with qualified counsel where needed; scope must include purpose, territory, channel, duration, consent, and derivative use.
- **Waive a continuity problem:** Property owner or delegated continuity authority, only where policy permits; requires recorded evidence, rationale, scope, and expiry.
- **Create a release:** Property owner or delegated release authority; only from an exact package containing accepted masters with their Master Acceptance receipts and all other required approvals.
- **Authorize external publication:** Authorized publication authority; exact package, destination, metadata, disclosures, timing, cost limits, and retry rules. The destination remains the authority host.
- **Approve a runtime-package handoff:** Property owner or delegated Storyworld release/runtime-handoff authority for the exact package version and named target runtime. Storyworld Runtime Handoff Approval authorizes transfer, import, preview, testing, and acceptance evaluation only; it is not Receiving-Runtime Acceptance.
- **Accept a package in the receiving runtime:** Authorized receiving-runtime authority for the exact imported package version and exact target runtime/environment, after successful import, package validation, parity checks, required previews or test execution, and resolution of blocking findings. This decision creates Receiving-Runtime Acceptance and the final runtime acceptance receipt.
- **Approve a commercial campaign:** Commerce Foundry’s authorized commercial approver owns product, claims, budget, vendor, fulfillment, and commerce publication approval. Storyworld creative-scope approval covers only its creative and narrative scope.

AI systems and external tools may analyze, propose, generate, evaluate, compare versions, recommend Creative Approval or Master Acceptance, and execute bounded low-consequence work. They may not record Creative Approval and may never perform Add to Canon, Update Canon, or Master Acceptance, waive blockers, or authorize publication. AI-generated or AI-edited output remains a draft, proposal, or candidate until an authorized human performs the applicable governing action. Purposeful role separation should remain available as the team grows without imposing large-team bureaucracy on Useful Internal Version users.

---

## 4. How should authoring normally work?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☐ Needs research/prototype  ☒ No additional research currently identified  ☐ Evidence complete

**1. Should most properties default to:**

- ☐ Direct accepted editing
- ☐ Draft-and-review editing
- ☒ A property-level choice between the two

**Selected choice(s), ranking, qualifications, or additional answer:**

A property-level choice between the two, implemented as a permission-aware hybrid for solo creators and small teams.

**Response:**

Storyworld should support these distinct workflows:

- **Working draft:** Mutable, non-authoritative work. Autosaving or saving a working draft preserves work and supports recovery; it never creates an accepted version.
- **Direct accepted editing:** An authorized human’s single explicit **Apply changes** action runs the required validation against the exact changes and, only when those checks pass, creates a new immutable accepted successor version with an acceptance receipt. It does not modify the previously accepted version in place and does not require a separate self-approval action.
- **Draft-and-review editing:** Saving preserves a non-authoritative working draft. **Submit for review** identifies an exact candidate version, but acceptance requires a later, distinct action by an authorized person.
- **Self-acceptance:** The author may also be the acceptor only when the governance profile permits it. In draft-and-review editing, submission and self-acceptance remain two distinct actions. In direct accepted editing, the authorized **Apply changes** action is the acceptance action.

The resulting state transitions are:

- **Direct accepted editing:** working draft or working changes → authorized **Apply changes** → new immutable accepted successor plus acceptance receipt.
- **Draft-and-review editing:** working draft → **Submit for review** → exact review candidate → authorized acceptance action → new immutable accepted successor plus acceptance receipt.

Autosave is always recovery and work preservation, never implicit acceptance.

A property governance profile establishes the default workflow. Object type, consequence level, actor authority, rights, consent, release state, and other applicable policies may impose stricter rules. Routine low-consequence changes may use direct accepted editing when the actor has acceptance authority. Contributors without acceptance authority always create drafts or proposals. Protected or high-consequence changes must use a distinct draft, review, and acceptance transition rather than one-step direct accepted editing.

A distinct review step does not universally require a second person. An authorized solo creator may self-accept after that step where policy permits; higher-risk profiles may require an independent reviewer. The interface must clearly identify whether its primary action will create an accepted successor version or submit a draft for review. If the submitted or reviewed version changes materially, previous review evidence does not apply to the changed version.

Direct accepted editing is workflow convenience, not expanded authority. AI may prepare, autosave, or submit eligible work, but it may never perform the human acceptance action. Every acceptance must remain exact-version-bound, attributed, and receipted. Stale-version, conflict, permission, and required-policy checks must complete before acceptance.

Creating an accepted successor through ordinary direct accepted editing does not perform Add to Canon or Update Canon, accept an asset as master, clear rights, create a release, authorize publication, or modify an existing release. Direct accepted editing must not silently create canon acceptance or Master Acceptance. Previously accepted versions, Canon Revisions, accepted masters, and published packages remain immutable.

This response records target owner direction. It does not claim that the complete workflow, interface, permissions, receipts, or governance engine is already implemented. It does not authorize implementation, deployment, publication, external communication, spending, or any acceptance-class action.

---

**2. Should a creator be allowed to accept their own changes?**

**Response:**

Yes, where the property governance profile permits it and the creator holds acceptance authority for the exact action and scope. In draft-and-review editing, **Submit for review** and the creator’s later self-acceptance are two distinct actions, even when the same authorized creator performs both. In direct accepted editing, the creator’s authorized **Apply changes** action is itself the acceptance action, so no separate self-approval action is required.

Self-acceptance must record the exact version, actor, action, scope, evidence, and acceptance receipt. Rights, consent, likeness, voice, sensitive-material access and provider-egress decisions, commercial decisions, and publication decisions must still follow their applicable authority requirements.

---

**3. Should high-impact changes always require another reviewer?**

**Response:**

No—not universally. Protected or high-consequence changes must use separate draft, review, and acceptance transitions and must pass all applicable policy checks, but the review and acceptance actions do not always require two different people. An authorized solo creator may self-accept after the distinct review step where policy permits; higher-risk governance profiles or specific object types may require an independent reviewer. The interface must clearly warn when a creator is self-accepting high-impact work. If the reviewed candidate changes materially, the prior review evidence no longer applies and the changed version must be reviewed again.

---

**4. Should different object types have different rules? For example: character notes may use direct accepted editing; changes proposed for Current Canon require draft-and-review editing; rights may require an independent reviewer.**

**Response:**

Yes. Storyworld should support object-specific rules with a non-negotiable safety and authority floor. Mutable drafts, previews, and disposable candidates remain non-authoritative. Routine low-consequence notes may use direct accepted editing only when the actor has acceptance authority; otherwise they remain drafts or proposals. Proposed additions or updates to Current Canon, stable character identity, creative systems, accepted masters, release packages, and other protected or high-consequence changes require a distinct draft, review, and acceptance transition. Canon proposals require the separate Add to Canon or Update Canon action. Rights, consent, likeness, voice, sensitive-source access and provider-egress decisions, commercial claims, and publication require their applicable specialized review and authority.

Object-specific rules may require an independent reviewer, but a separate person is not universal. Every accepted result still requires an intentional authorized human action, exact-version evidence, applicable checks, an immutable successor version, and an acceptance receipt.

---

**5. Should partial acceptance be allowed when a proposal changes several things?**

**Response:**

Yes. Partial acceptance is essential for fast, autonomous workflows. Storyworld should break proposals into typed, inspectable operations so users can accept, reject, revise, or defer individual changes. Dependencies must be shown, related operations must be accepted together when necessary, and every result must remain versioned, reversible, and traceable. Partial acceptance must not bypass a required rights, policy, canon, or publication gate.

Overall, governance should be configurable to reduce friction—not to eliminate provenance, safety checks, human authority, or auditability.

---

## 5. What exactly counts as canon?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☐ Needs research/prototype  ☒ No additional research currently identified  ☐ Evidence complete

**Canon model and terminology:**

- **Draft or proposal:** Mutable, non-authoritative content offered for possible inclusion in canon. Saving, autosaving, reviewing, or submitting it does not make it canon.
- **Current Canon:** The current authoritative canon for a named property branch. It is represented by a pointer to the latest accepted immutable Canon Revision; it is not a mutable document edited in place.
- **Canon Revision:** The immutable, exact-version result created when an authorized human adds or updates canon. It records the accepted changes, prior revision, actor, branch, evidence, time, and canon-acceptance receipt.
- **Canon Version:** A named or pinned immutable snapshot of the complete Current Canon at an exact branch and revision. Productions, exports, runtime packages, or adaptations may pin to it. Creating or pinning a Canon Version does not accept new content.
- **Add to Canon:** The creator-facing action for accepting new material into Current Canon.
- **Update Canon:** The creator-facing action for accepting a change to existing Current Canon.
- **Canon acceptance:** The governing human decision represented by Add to Canon or Update Canon. It creates a Canon Revision and advances Current Canon.

The only everyday content states are **Draft or proposal** and **Current Canon**. A Canon Revision is the immutable history record of a canon-acceptance decision, not another editing state. A Canon Version is an occasional frozen downstream snapshot, also not an editing state.

“Accepted” describes an action or history—for example, material was “accepted into Current Canon”—and is not a separate canon state. **Canon Version** replaces “canon release” in owner-facing language when the intended concept is a frozen canon snapshot; “release” remains reserved for release packages, commercial releases, publication, and other delivery concepts.

**Authoritative transition model:**

```text
Draft or proposal
    ↓ authorized Add to Canon or Update Canon
Immutable Canon Revision plus canon-acceptance receipt
    ↓ advances
Current Canon for the named branch
    ↓ Pin Canon Version
Immutable Canon Version for a named downstream use
```

Add to Canon and Update Canon are the only normal candidate-to-canon transitions. They require an authorized human and exact-version validation. Each successful canon acceptance creates an immutable Canon Revision and receipt, advances Current Canon to that revision, and leaves every earlier revision immutable. Existing canon is never modified in place. Rejecting or revising a proposal leaves Current Canon unchanged. A material change after review creates a changed proposal to which earlier review evidence does not automatically apply.

Pinning or creating a Canon Version does not repeat canon acceptance, accept drafts, or change Current Canon. A Canon Version captures only material already in Current Canon; no draft or proposal may move directly into one. A production pinned to a Canon Version never advances silently when Current Canon changes. Moving it to newer canon requires an explicit migration or repin action with an impact summary.

Runtime events, telemetry, imports, fixture promotion, AI output, validation success, and publication do not automatically change Current Canon. They may create proposals or evidence, but only Add to Canon or Update Canon can create a Canon Revision and advance Current Canon.

**Creator-facing interaction:**

- Everyday status labels should be **Draft** and **In Canon**.
- Primary creator actions should be **Add to Canon** and **Update Canon**.
- Canon Revision IDs, receipts, provenance, and branch pointers should be recorded automatically and remain available through history rather than becoming routine form fields.
- Canon Version should appear only when a production, export, runtime package, adaptation, or other downstream workflow needs an exact frozen snapshot.
- A creator may use one clear action such as **Start production with Current Canon**. Storyworld may then deterministically create or select and pin the exact Canon Version as part of that authorized action.
- Every canon acceptance already creates immutable history; creators should not need a separate manual “create canon release” ceremony merely to preserve it.
- Branches, revision identifiers, receipts, impact details, and migration controls should use progressive disclosure. The interface must clearly show which Canon Version a production uses and whether Current Canon has moved beyond it.

This simpler interaction does not weaken exact-version history, human authority, receipts, or production pinning.

**1. Is Current Canon always tied to a branch?**

**Response:**

Yes. Every named canon branch, including the default official branch, has exactly one Current Canon pointer and an immutable Canon Revision history. A proposal becomes canon only through an authorized Add to Canon or Update Canon action for the named property and branch. Proposals, source material, fixture-only content, and production-local overrides remain non-authoritative unless and until accepted through one of those actions.

---

**2. Can a production remain permanently pinned to an older Canon Version?**

**Response:**

Yes. A production may remain permanently pinned to the exact Canon Version from which it was created. Later Canon Revisions and changes to Current Canon must never silently rewrite an active or completed production. Adopting newer canon requires an explicit migration or repin action with an impact summary, while preserving the prior pin, production state, and outputs. Creating or selecting the replacement Canon Version does not itself change Current Canon or accept any proposal.

---

**3. When an adaptation changes something, should that be:**

- ☐ An adaptation-only override
- ☐ A new canon branch
- ☐ A production-local choice
- ☒ Decided case by case

**Selected choice(s), ranking, qualifications, or additional answer:**

**Response:**

The default should be an adaptation-only override or production-local choice when the change is limited to that work. An adaptation change may instead become a canon proposal, or remain production-local while also creating a proposal. It never enters Current Canon automatically. If accepted through Add to Canon or Update Canon, it creates a Canon Revision on the applicable branch. A new canon branch should be created when the change represents a durable alternate continuity or is intended for reuse across future productions. The source branch must never be silently changed. Every override, omission, composite, or fork must record its scope, ancestry, rationale, and lineage.

---

**4. Can two official canon branches exist at once?**

**Response:**

Yes. Multiple official branches may coexist when they represent explicitly named and separately governed continuities, such as an original continuity and an approved alternate or adaptation continuity. Each branch has its own Current Canon pointer, immutable Canon Revision history, scope, authority, and pinned Canon Versions used by productions. One branch may be designated as the default continuity for public presentation, but branches must never be merged or treated as interchangeable without an explicit decision and comparison.

---

**5. Where should shared-universe facts live?**

- ☐ In one parent property
- ☐ In reusable canon modules
- ☒ In a separate shared-world property
- ☐ In another structure

**Selected choice(s), ranking, qualifications, or additional answer:**

**Response:**

Shared-universe facts should be owned by a dedicated shared-world property. Other properties should reference an exact Canon Version from that property through a versioned dependency or reusable canon module rather than copying facts or using live cross-property references. Consuming properties may pin, override, or deliberately fork shared material, but every fork must preserve lineage and cannot silently mutate the shared source. Changes to shared facts require an authorized Add to Canon or Update Canon action by the shared property’s canon authority and cross-property impact analysis.

---

**6. When should fixture canon be eligible for inclusion in Current Canon?**

**Response:**

Fixture canon is non-authoritative test material and must never become Current Canon automatically because a test passes. It may seed a draft or proposal, but inclusion requires an authorized Add to Canon or Update Canon action by the property owner or delegated canon authority after confirming the property identity, source and rights basis, audience classification, style and tone, exact content, continuity implications, and intended branch. Successful acceptance creates a Canon Revision, advances Current Canon, and preserves the fixture’s test-only status and lineage. A Canon Version is created or pinned only if a downstream workflow later needs a frozen snapshot. For Dumpster Fire Friends, the Cards 007–008 fixture may seed a proposal, but it is not canon or a final publishable edition until the applicable distinct checks and decisions are complete.

**Authority, receipts, and status:**

Add to Canon and Update Canon belong to the property owner or an explicitly delegated canon authority for the named property and branch. Canon acceptance is exact-version-bound, attributed, human-authorized, and receipted. AI, agents, runtime systems, external editors, validators, imports, and templates may prepare drafts, proposals, evidence, comparisons, impact analysis, or Canon Version manifests, but they may not perform canon acceptance.

Pinning a Canon Version belongs to the authorized property or production authority. A deterministic system may materialize and pin one only as part of an exact authorized action such as **Start production with Current Canon**. Each pin or repin must identify the exact Canon Version, destination production or workflow, actor or authorized deterministic workflow, time, impact evidence, and receipt. Canon acceptance and Canon Version pinning do not perform Master Acceptance, approve rights, create a release package, authorize publication or commercial use, or create Receiving-Runtime Acceptance. One person may hold several roles where policy permits, but those decisions and receipts remain distinct.

This response records target owner direction. It does not claim that the complete Current Canon, Canon Revision, Canon Version, migration, pinning, receipt, AI, runtime, template, or interface workflow is implemented. It does not itself add to or update canon, create or pin a production Canon Version, perform Master Acceptance, approve rights, create a release package, authorize publication, or authorize implementation, dependency installation, spending, deployment, or external communication. Any repository contract that still uses “canon release” for a frozen canon snapshot uses legacy terminology requiring later reconciliation; it does not define a fourth canon state.

---

# Priority 1 — Core authoring model

## 6. What kind of writing must the Useful Internal Version editor support?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☐ Needs research/prototype  ☒ No additional research currently identified  ☐ Evidence complete

**Required by:** Useful Internal Version

The “first serious editor” means the editor required for the Useful Internal Version. This ranking is complete for Storyworld’s currently declared writing and narrative-document scope. It does not require every imaginable genre to receive its own row. Future formats must remain supportable through the shared typed-template model and must not silently change this ranking.

**Universal editor capabilities—not ranked format families:**

**Required by:** Useful Internal Version

Every supported format should use one extensible `StoryDocument` model with:

- Typed, independently addressable blocks.
- Mixed prose, structured fields, images, dialogue, media references, and citations.
- Hierarchical structure and stable entity links.
- Exact-version history, comparison, comments, suggestions, and review.
- Access-controlled notes and source relationships.
- Markdown and plain-text export with fidelity reporting.
- Accessible keyboard operation and structured alternatives.
- Autosave, draft recovery, conflict detection, and safe resumption.
- Extensible typed templates for future formats.

These are required cross-format capabilities, not ranked format families. Storyworld should not build a separate editor or unrelated storage model for every format. Card slides and editorial carousels remain separate templates that share sequential-visual primitives.

**Definitive format-family ranking:**

| Rank | Format or template family | Included examples |
| ---: | --- | --- |
| 1 | Structured card-slide copy | Numbered cards, fixed semantic card sequences, card-specific text regions |
| 2 | Editorial and sequential visual panels | Carousels, comics, picture-book pages, visual sequences |
| 3 | World, canon, lore, and reference entries | Characters, locations, objects, rules, chronology, terminology, continuity references |
| 4 | Prose scenes and episodes | Short fiction, narrative scenes, episodic prose |
| 5 | Chapters and hierarchical long-form units | Books, sagas, anthologies, manuals, and other nested long-form works |
| 6 | Story-development and planning documents | Outlines, treatments, beat sheets, arc plans, synopses, adaptation plans |
| 7 | Visual production descriptions | Shot and panel descriptions, illustration briefs, storyboards, shot lists |
| 8 | Structured moving-image and performance scripts | Screenplays, teleplays, animation scripts, stage or performance scripts |
| 9 | Voice, accessibility, and localization copy | Voiceover, subtitles, captions, alt text, dubbing text, localization variants |
| 10 | Presentation and release-facing metadata | Titles, loglines, summaries, descriptions, credits, content notices, accessibility notes |
| 11 | Branching dialogue and character interaction | Dialogue trees, choices, constrained NPC dialogue, barks, conversational variants |
| 12 | Missions, quests, and interactive narrative units | Objectives, prerequisites, triggers, outcomes, state effects |
| 13 | Interactive system and world-facing text | Tutorials, prompts, item descriptions, interface narrative, system messages, runtime lore |
| 14 | Audio and spoken-program scripts | Podcasts, radio drama, timecoded audio scripts, cue sheets, transcripts, dubbing scripts |
| 15 | Instructional and field-manual writing | Lessons, scenarios, principles, exercises, takeaways, assessments, curriculum |
| 16 | Research, documentary, and evidence-linked writing | Claims, citations, confidence, corrections, sources, documentary structure |
| 17 | Essay, epistolary, and reflective writing | Essays, letters, diaries, field notes, reflections |
| 18 | Live, scheduled, and participatory writing | Polls, decision framing, scheduled event units, live-release variants |
| 19 | Campaign, promotional, and commercial copy | Campaign briefs, social/web/email copy, product-placement rationale, claims, disclosures, CTAs |
| 20 | Poetry, lyrics, and musical text | Poetry, lyrics, spoken word, track text, music cues, motif registries |
| 21 | Ambient and soundscape specifications | Ambient scenes, environmental audio intent, loop-safe soundscape descriptions |

Examples are members of their format family, not additional ranked entries. A document may combine several families through typed blocks without receiving a duplicate rank. Custom typed templates are the extensibility mechanism and are not a twenty-second ranked format.

**Useful Internal Version editor support tiers:**

- **Ranks 1–9**
  - **Required by:** Useful Internal Version
  - Provide deep, documented support, including appropriate structured templates, validation, review, and export behavior.
- **Ranks 10–14**
  - **Basic support by:** Useful Internal Version
  - **Full support by:** Mature Product
  - The Useful Internal Version must represent, edit, review, version, and export these formats through the shared model. Specialized views, validators, importers, and exporters may be completed progressively for Mature Product.
- **Ranks 15–21**
  - **Basic support by:** Useful Internal Version
  - **Full support by:** Mature Product
  - The Useful Internal Version must safely represent, edit, review, version, and export these formats through generic typed templates with documented limitations and without a separate storage model. Specialized views, validators, importers, exporters, and other authoring tools may be deferred until separately scoped work advances the Mature Product capability.

Ranking establishes product priority and architectural accommodation. It does not claim that every specialized editor already exists or automatically authorize implementation.

**Original questionnaire format mapping:**

| Original format | Definitive rank |
| --- | ---: |
| Prose scenes | 4 |
| Chapters | 5 |
| Screenplay-style scripts | 8 |
| Dialogue trees | 11 |
| Editorial carousel panels | 2 |
| Voiceover scripts | 9 |
| Mission descriptions | 12 |
| Audio scripts | 14 |
| Shot or panel descriptions | 7 |

This mapping gives every original choice a definitive answer. Dialogue trees and mission descriptions remain separate format families with separate ranks.

**Status and authority:** This ranking and its milestone assignments record target owner direction. They do not imply that the Useful Internal Version, Mature Product, or any format-specific template, view, validator, importer, or exporter is currently implemented. The questionnaire response does not authorize implementation, dependency installation, spending, deployment, publication, or external communication.

---

**1. Must one document mix prose, structured blocks, images, dialogue, and references?**

**Response:**

Yes. Mixed-content composition is a universal `StoryDocument` capability, not a ranked format. One document may combine prose, typed fields, card slides, dialogue, images, media references, citations, entity links, comments, and access-controlled notes. Each block must remain independently addressable, versioned, searchable, and available to authorized automation rather than becoming one unstructured rich-text blob.

Structured card slides and editorial carousels remain separate templates while sharing sequential-visual primitives. A document may combine those or other ranked families through typed blocks without changing their individual priority ranks.

---

**2. Should writers be able to mention a character or location and create a live link to its record?**

**Response:**

Yes. Stable entity linking is a universal editor capability across format families. Writers should be able to mention characters, locations, objects, styles, motifs, and other entities using natural language or simple selection. Storyworld should create stable links to authoritative records, preserve them through renames, detect ambiguity, and use them for continuity and authorized generation context.

---

**3. Must the canonical document remain easy to export as Markdown or plain text?**

**Response:**

Yes. Markdown and plain-text export with fidelity reporting is a universal editor capability across format families and is required for portability, review, backup, and use by nontechnical creators. The structured model may contain more information than those formats can express, so every such export should identify omissions, transformations, or fidelity loss. Export must never replace the authoritative Engine record.

---

**4. Is exact screenplay formatting required, or is a structured narrative script sufficient?**

**Response:**

Rank 8 refers to the underlying structured moving-image and performance-script capability. The Useful Internal Version editor must support scenes, beats, action, dialogue, shots, timing, references, and narrative state through the shared `StoryDocument` model. Exact screenplay formatting remains an optional presentation, import, or export format rather than the underlying content or storage model.

---

**5. Are footnotes, citations, source links, or access-controlled editorial notes required?**

**Response:**

Yes. Citations, source links, provenance, rights references, `Access—Restricted` editorial notes and context, confidence levels, and correction history are universal editor capabilities across format families. Rank 16 separately prioritizes research, documentary, and evidence-linked writing as a specialized format family; it does not limit citation support in other formats.

Access and provider-egress treatment must remain explicit: access-controlled notes and sensitive sources do not automatically enter Current Canon or become content classified `Access—Public`, and permission to view them does not make them eligible provider input.

---

**6. Does the Useful Internal Version need comments and suggested edits?**

**Response:**

Yes. Comments, suggestions, comparison, and review are universal editor capabilities across format families. They should be lightweight and tied to exact document blocks, panels, assets, or versions. Comments, AI suggestions, review findings, and approvals must remain distinct. Authorized users should be able to accept, reject, revise, or partially accept suggestions while preserving exact-version history and applicable authority boundaries.

---

**7. Do you need offline draft recovery?**

**Response:**

Yes. Autosave, draft recovery, conflict detection, and safe resumption are universal editor capabilities across format families. Storyworld should preserve local non-authoritative draft state and unsent text or voice-derived operations, resume safely after reconnection, and surface conflicts instead of overwriting work.

Offline recovery saves draft state only. Autosave or recovery must never create an accepted version, perform Add to Canon, Update Canon, or Master Acceptance, approve rights, create a release, pin a Canon Version, or authorize publication. Full disconnected authoring is not required by the Useful Internal Version.

---

## 7. What should be the smallest editable narrative unit?

This decision strongly affects document storage, diffing, review, and performance.

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Legend:** ☒ Default capability  ◐ Configurable or template-specific  ☐ Inherited from the parent unit

| Unit | Versioned | Own approval | Own history | Own comments | Own findings | Own assets / notes |
| --- | :---: | :---: | :---: | :---: | :---: | --- |
| Book | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Chapter | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Episode | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Scene | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Sequence / card set | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Beat | ☐ | ☐ | ☒ | ☒ | ☒ | ☒ |
| Shot | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Panel / card slide / page | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Dialogue line | ◐ | ☐ | ☒ | ☒ | ☒ | ☒ |
| Mission | ☒ | ◐ | ☒ | ☒ | ☒ | ☒ |
| Objective | ☐ | ☐ | ☒ | ☒ | ☒ | ☒ |
| Audio cue | ☐ | ☐ | ☒ | ☒ | ☒ | ☒ |

**Describe the default smallest independently versioned narrative unit and any exceptions:**

**Response:**

Storyworld should not impose one smallest unit on every project. The default should be a template-defined **content unit** with a stable identity and immutable revisions. For ordinary prose, film, and episodic work, that unit should normally be the **scene**.

Important exceptions include:

- **Dumpster Fire Friends and sequential visual work:** the panel or card slide is independently versioned; the complete card sequence or card set is a versioned container.
- **Illustrated books:** the page or spread may be independently versioned.
- **Interactive projects:** the mission or independently executable interaction may be the versioned unit.
- **Audio:** a timecoded segment or performed dialogue line may be independently versioned when focused replacement, localization, or voice-rights handling requires it.
- **Music:** a track should be independently versioned.
- **Lessons, articles, posts, calendar days, and similar formats:** the property template should define the equivalent content unit.

Smaller elements—such as beats, objectives, ordinary dialogue lines, and cues—should have stable IDs and support exact comments, findings, notes, automation, and block-level history without becoming separate database aggregates by default. Their changes are recorded through the parent unit’s semantic revision.

Approval should be configurable by property, object type, and consequence. Solo creators should be able to approve several dependency-complete units together where policy permits, while sensitive or high-assurance work may require unit-level review. Comments, findings, and linked assets must never imply approval, and assets should be referenced by exact version rather than duplicated.

Templates should choose sensible defaults so nontechnical users do not need to understand these boundaries. Advanced users may inspect or configure them. A StoryDocument and semantic diff/merge prototype should validate the final storage and performance boundary before implementation.

---

# Priority 1 — Graph and planning behavior

## 8. Which graph should be built first?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Choose the first graph:**

- ☒ Narrative Flow
- ☐ Spatial
- ☐ Character Relationships
- ☐ Truth and Reveals
- ☐ State and Continuity
- ☐ Missions and Dependencies
- ☐ Canon Branches
- ☐ Asset Lineage
- ☐ Rights
- ☐ Release Flow

**Selected choice(s), ranking, qualifications, or additional answer:**

Narrative Flow should be the first graph prototype. Asset Lineage and State and Continuity are the strongest candidates to follow, but every graph type must use its own explicit profile and supporting evidence.

**Response:**

Build the Narrative Flow Graph first because it provides the broadest planning value across serialized fiction, visual sequences, books, campaigns, interactive branches, and adaptations. It should show narrative units, presentation order, choices, branches, grouping, and story-time context while remaining synchronized with the structured outline and inspector.

Dumpster Fire Friends can test image-led cards and its eleven-part sequence, but its mostly linear structure does not by itself justify a graph. The prototype must also use a branching or reconvergent fixture to prove that the graph solves problems a structured list cannot.

Text and voice, the structured outline, and accessible inspectors should remain the primary controls. The graph is a progressively disclosed secondary view with equivalent non-canvas commands. Core graph navigation and deterministic layout must continue working when hosted AI is unavailable.

No graph canvas is currently implemented, and DEC-0028 remains proposed. The accepted structured views must remain fully usable before, during, and after any graph work.

---

**1. What must a user accomplish that the structured list cannot do well?**

**Response:**

The graph should help users understand topology at a glance: branching, reconvergence, parallel arcs, long-range relationships, unreachable units, loops, gaps, and the difference between story time and presentation order. It should make it easier to trace a path, compare alternatives, and see how distant units relate.

A graph should not replace the list, editor, timeline, or inspector. If a task is clearer in those views—such as editing card copy or reading a linear chapter—the graph should not be used merely for visual appeal.

---

**2. Is manual node placement meaningful, or should layout normally be automatic?**

**Response:**

Layout should normally be automatic, deterministic, locally executable, and recoverable through fit and reset. AI may suggest grouping or emphasis as a low-consequence preview, but it must not silently assign narrative meaning.

Optional manual positioning may be saved as non-authoritative view state. It must not imply chronology, causation, importance, canon, or approval.

A true Spatial Graph is the exception: coordinates, containment, and routes may carry authored meaning. Applying such a change to governed work is a medium-consequence operation and must show a visible plan, wait for confirmation, and create a reversible version transition.

---

**3. Should users be able to create connections directly on the graph?**

**Response:**

Yes, but only where the active graph profile defines the connection as editable. Drawing an edge may create an immediate preview, but applying it to governed work is a medium-consequence operation: Storyworld must show the typed plan and wait for confirmation.

Every retained connection change must be versioned, reversible, attributed, and validated. The same operation must also be available through text, voice, and an accessible structured interface.

For the first Narrative Flow profile, direct connections may propose presentation-order transitions and choice branches. Calculated connections and authority-bearing decisions remain read-only. A graph gesture must never create an ambiguous generic edge or perform Add to Canon or Update Canon.

---

**4. Which connections are editable, and which are only calculated views?**

**Response:**

A connection is editable only when it represents an explicit authored relationship with a defined type, command, permission, and validation rule.

Examples of editable connections include:

- Narrative presentation transitions and choice branches.
- Character relationships.
- Spatial containment, adjacency, routes, and access rules.
- Mission prerequisites, unlocks, exclusions, and authored outcomes.
- Explicit truth, clue, belief, or reveal relationships where the profile permits them.

Calculated connections must remain read-only and visibly distinct. These include:

- Asset derivation and transformation lineage.
- Canon ancestry and version dependencies.
- Approval and release consequences.
- Rights impact derived from grants, restrictions, expiry, or withdrawal.
- Continuity conflicts and inferred state relationships.
- Cross-property impact derived from pinned shared-canon dependencies.

AI-suggested relationships are proposals, not calculated facts or accepted relationships. Every edge must expose its type, source, status, evidence, editability, and affected versions.

---

**5. How many nodes should it comfortably display?**

- ☐ Under 100
- ☒ Hundreds
- ☐ Thousands
- ☐ Tens of thousands

**Selected choice(s), ranking, qualifications, or additional answer:**

The target prototype should comfortably handle approximately 200–500 visible nodes. Ordinary working views should usually show fewer through filtering and progressive expansion.

**Response:**

Storyworld properties may contain thousands or tens of thousands of records, but displaying all of them simultaneously is neither useful nor intuitive. Large properties should scale through server-side filtering, hierarchy, aggregation, saved views, one- or two-hop expansion, virtualization, and explicit hidden-item counts.

The graph should remain responsive with hundreds of visible nodes while the underlying property can be much larger. Dense analytical needs may use a separate renderer and graph profile as a Mature Product capability after measurements justify it.

---

**6. Should the graph show only one production at a time or cross-property information too?**

**Response:**

The Narrative Flow Graph should default to one production, branch, and pinned Canon Version at a time. Users may reveal bounded property context or exact cross-property references when relevant, but the current scope must always remain visible.

Cross-property canon, shared universes, rights, and dependency impact should use dedicated graph profiles rather than mixing everything into the Narrative Flow view. Those profiles must preserve exact version pins, ownership, visibility rules, and authority boundaries so one property cannot silently change another.

---

## 9. Should DEC-0028 be amended as recommended?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

> The proposed decision currently describes a Narrative Flow Graph but calls it spatial. This answer should be recorded before the first graph implementation is authorized.

**Do you agree that DEC-0028 should be amended to:**

- ☒ Rename it Narrative Flow Graph or Arc Flow Canvas
- ☒ Apply it only to the Arc workspace
- ☒ Stop treating its node and edge exclusions as rules for all graphs
- ☒ Introduce a reusable graph-profile concept for future graph types

**Selected choice(s), ranking, qualifications, or additional answer:**

I agree with all four amendments. “Apply it only to the Arc workspace” means DEC-0028’s semantics belong only to the Narrative Flow profile used within the Arc workspace. Compact previews may appear elsewhere, but DEC-0028’s node, edge, grouping, and exclusion rules must not become global graph rules. Other graph types and workspace contexts require their own profiles.

**Response:**

DEC-0028 should be amended before acceptance. Its current semantics describe narrative flow, not physical space. A true Spatial Graph requires different concepts such as locations, containment, adjacency, routes, visibility, access, and distance.

Storyworld should adopt a reusable `GraphViewProfile` contract so each graph explicitly defines its scope, node and edge types, grouping, coordinates, editable relationships, calculated relationships, gestures, structured fallback, inspector mapping, hidden-item behavior, scale expectations, and authority limits.

---

**Owner decision, requested wording changes, and authorization conditions:**

**Response:**

Rename DEC-0028 to **“Narrative Flow Graph semantics for the Arc workspace.”**

Amend its scope to state that:

1. DEC-0028’s semantics apply only within the Arc workspace, specifically to the Narrative Flow profile used there.
2. Compact previews may appear elsewhere, but DEC-0028’s node, edge, grouping, and exclusion rules remain scoped to that Arc-workspace profile and do not become global graph rules.
3. Other workspace contexts and spatial, relationship, truth/reveal, continuity, mission, canon, lineage, rights, release, shared-universe, or other graph types require their own profiles.
4. Every graph is a projection over Engine-owned structured state, never an independent authority source.
5. Every graph has a complete synchronized list, outline, table, or inspector alternative.
6. Graph gestures may create previews or typed proposals where permitted. Applying governed changes follows the low-, medium-, and high-consequence model. Graphs and AI may never perform Add to Canon, Update Canon, Creative Approval, or Master Acceptance, accept packages, waive blockers, authorize publication, or alter an existing authorization.
7. Manual layout is normally non-authoritative view state; only profiles such as Spatial may treat coordinates as authored meaning.
8. Hidden or filtered information must remain counted, discoverable, and included in impact analysis.
9. Every retained graph edit must preserve exact versions, provenance, reversibility, permissions, and affected-approval consequences.
10. Text, voice, and accessible structured controls must provide equivalent ways to perform every essential graph operation.

This answer records owner direction for amending DEC-0028. It does not itself accept the decision, adopt dependencies, authorize spending, or authorize prototype or production implementation. Formal decision disposition and a separate bounded task remain required.

The prototype must demonstrate:

- Clear value beyond the structured list.
- Correct behavior with linear and branching fixtures.
- Responsive operation with hundreds of visible nodes.
- Keyboard operation, visible focus, 200% zoom, forced-colors support, and reduced-motion behavior.
- Synchronized selection and a complete structured fallback.
- Transparent low-, medium-, and high-consequence handling.
- No acceptance-class action from a canvas gesture or AI operation.
- Continued core operation without a hosted AI provider.
- Replaceable layout and renderer adapters behind the Storyworld-owned profile.

---

# Priority 1 — Media boundaries

## 10. How much media editing belongs inside Storyworld?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

Question 10’s complete cross-media breadth is a Mature Product target. Earlier writing support remains governed by Question 6 and is not deferred by this table. Each numbered answer below inherits the applicable row’s milestone commitment unless it states a stricter earlier safeguard.

| Medium | Milestone commitment | Supported scope |
| --- | --- | --- |
| Written word and documents | **Basic support by:** Useful Internal Version; **Full support by:** Mature Product | Question 6 controls the Useful Internal Version’s tier-specific writing support. Mature Product completes specialized native authoring for scripts, prose, books, articles, dialogue, lore, newsletters, structured documents, and digital editions. |
| Still images, graphics, and typography | **Basic support by:** Proof; **Full support by:** Mature Product | Proof supports the bounded Dumpster Fire Friends image-and-typography workflow, with documented scaffolding or manual help permitted. Mature Product completes native generation, masking, compositing, regional edits, vector/text layers, infographics, variants, and evaluation. InvokeAI remains an exceptional precision fallback. |
| Sequential visuals and storyboards | **Basic support by:** Useful Internal Version; **Full support by:** Mature Product | Basic support uses the shared editor and sequential-visual primitives committed in Question 6. Mature Product completes native storyboards, animatics, carousels, comics, illustrated books, photo essays, panels, shot specifications, timing, annotations, and replacement. |
| Audio, voice, music, and sound | **Required by:** Mature Product | Complete native podcast, audiobook, audio-drama, voiceover, music-cue, ambience, sound-effect, arrangement, segment-replacement, level, fade, and basic-mix authoring is a Mature Product capability. Useful Internal Version voice control and writing support remain separate Question 1 and Question 6 requirements. Specialist mastering may remain external. |
| Video, film, animation, and motion graphics | **Required by:** Mature Product | Complete native assembly, cuts, transitions, reframing, captions, basic grading and audio, animation, kinetic typography, generated inserts, variants, and previews are Mature Product capabilities. Advanced plugins or certified finishing may remain external. |
| Captions, subtitles, and transcripts | **Basic support by:** Useful Internal Version; **Full support by:** Mature Product | Basic support covers editable transcripts and the writing/accessibility scope committed in Questions 1, 6, and 23. Mature Product completes native timing, speaker attribution, translation, correction, validation, and export workflows. |
| Audio description, alt text, and accessible renditions | **Basic support by:** Useful Internal Version; **Full support by:** Mature Product | Basic support covers applicable accessible text and metadata for supported internal workflows. Mature Product completes time alignment, simplified-reading and high-contrast renditions, localization, voice-production coordination, validation, review, and export. |
| Web and digital layouts | **Basic support by:** Useful Internal Version; **Full support by:** Mature Product | Basic support provides governed portable digital outputs for supported internal projects. Mature Product completes native template-driven web stories, swipe experiences, articles, newsletters, digital books, presentations, social packages, and owned-site exports. |
| Print and physical-product layouts | **Basic support by:** Proof; **Full support by:** Mature Product | Proof supports the bounded Dumpster Fire Friends card layout and proof-package workflow. Mature Product completes native cards, books, workbooks, journals, posters, calendars, tabletop components, packaging, merchandise artwork, and prepress checks. Commerce Foundry retains vendor and fulfillment authority. |
| Maps, floor plans, and spatial layouts | **Required by:** Mature Product | Native structured locations, regions, containment, routes, adjacency, coordinates, overlays, annotations, and simple spatial layouts are Mature Product capabilities. Specialist GIS or 3D work may remain external. |
| 3D assets, scenes, and animation sources | **Required by:** Mature Product | Semantic scene composition, materials, cameras, lighting, placement, transformation, variants, and runtime-ready packages are Mature Product capabilities. Blender remains the precision environment for complex modeling, rigging, simulation, and rendering. |
| Interactive and playable experiences | **Required by:** Mature Product | Native authoring of branches, dialogue, missions, rules, world state, runtime content, UI assets, and governed runtime packages is a Mature Product capability. Earlier bounded runtime contract or adapter prototypes do not establish supported production capability. |
| Live and time-bound productions | **Required by:** Mature Product | Native rundowns, scripts, cues, overlays, assets, schedules, embargoes, contingency variants, and release packages are Mature Product capabilities. External platforms operate the live event or stream. |

**Qualification:**

**Basic support** and **Full support** use the canonical definitions near the beginning of this workbook. Full cross-media support means complete native authoring of the Storyworld-owned creative and governance layer for the stated Mature Product scope—not recreating every specialist editor, game engine, live-production system, or manufacturing platform. Complexity should be progressively disclosed, and exceptional precision work may use governed external tools.

Rights, consent, access, provider-egress, provenance, versioning, human authority, data integrity, and applicable accessibility safeguards are required whenever any earlier milestone supports a workflow; their advanced Mature Product forms do not defer the safe minimum.

Hybrid and transmedia productions are not a separate editable medium. Storyworld coordinates versioned works from multiple rows while preserving their distinct semantics, canon relationships, rights, approvals, provenance, and release state.

---

**1. Should Storyworld crop, resize, mask, and annotate images itself?**

**Response:**

Yes. Storyworld should natively crop, resize, rotate, reframe, extend, mask, annotate, composite, transform color, remove or replace regions, and create destination-specific renditions.

Deterministic operations should run inside the Storyworld-controlled deployment boundary whenever generative inference is unnecessary. Generative editing should use approved provider routes only when required. All retained edits must be non-destructive, versioned, reversible, and linked to exact source versions.

For Dumpster Fire Friends, typography, card numbers, statistics, warning labels, and final overlay copy should be deterministic editable layers rather than text baked unreliably into generated artwork. Annotations remain comments or instructions; they never become approvals automatically.

---

**2. Should advanced edits always happen in external tools?**

**Response:**

No. Storyworld should provide AI-mediated professional precision for masking, tracking, compositing, keyframe-like intent, exact timing, color matching, audio adjustments, layout, and focused replacement through intuitive semantic controls.

External tools should be used only when Storyworld cannot yet reproduce the required result reliably or when specialist plugins, certified mastering, unusual hardware, or unsupported formats are genuinely necessary.

InvokeAI should be an exceptional image-finishing workspace, not the normal editor. Blender, Kdenlive, and DaVinci Resolve serve equivalent specialist roles for 3D and advanced video work. This is target owner direction; accepted DEC-0012 remains controlling until a successor formally repositions InvokeAI.

---

**3. Should Storyworld support frame-accurate video review?**

**Response:**

Yes. Storyworld should support frame- and timecode-accurate playback, scrubbing, comments, findings, comparisons, captions, cue alignment, cut review, and segment replacement. Every annotation and decision must bind to an exact media version and frame or time range.

The interface should also provide accessible transcript, shot-list, cue-list, and keyboard alternatives. Resolving a comment or finding must never imply Creative Approval or Master Acceptance.

---

**4. Should it support audio editing, or only script, cue, review, and segment replacement?**

**Response:**

Storyworld should support practical native audio editing in addition to scripts, cues, review, and segment replacement. Supported operations should include trimming, splitting, arranging, replacing lines or regions, fades, level automation, dialogue/music/ambience balance, loudness checks, basic cleanup, captions, transcripts, dubbing, and simple mixes.

Storyworld should not attempt to become a universal DAW. Complex plugin chains, advanced sound design, certified mastering, and specialized music production may use external tools. The Storyworld script, cue intent, exact versions, rights, provenance, and acceptance state remain authoritative.

---

**5. Is a local FFmpeg-based media worker acceptable?**

**Required by:** Useful Internal Version

**Response:**

Yes. “Local” means inside the Storyworld-controlled deployment boundary, including an eligible customer-managed deployment; it does not necessarily mean inside the browser or on the user’s personal device.

Use a pinned, reviewed, sandboxed FFmpeg build behind typed, allowlisted operation profiles for proxies, thumbnails, contact sheets, waveform peaks, inspection, trimming, joining, transcoding, caption processing, audio normalization, and deterministic previews.

The worker must use immutable inputs, isolated outputs, strict file, duration, memory, disk, codec, protocol, decompression, and timeout limits. It must have no Storyworld database credentials, unrestricted network access, creative authority, or approval authority. Every output must record exact inputs, build configuration, operation, hashes, and transformation evidence. This does not authorize local AI model weights.

---

**6. What are the expected maximum asset and video sizes?**

**Required by:** Reliable Internal Version

**Response:**

No universal numeric ceiling has been decided, and one should not be invented before media-worker and deployment testing. Limits should be configurable by deployment, medium, operation, storage capacity, and security profile rather than hard-coded as one product-wide maximum.

The architecture should support:

- High-resolution still images and print masters.
- Layered or specialist workfiles that may be much larger than delivery files.
- At least 4K source and master video for supported workflows.
- Multi-hour audio and video, including long-form ambience releases.
- Resumable or chunked transfer, object storage, background processing, range requests, and proxy-first browser review.

The browser should normally work with proxies rather than full originals. Proof and Useful Internal Version work may use bounded, documented test limits. Before the Reliable Internal Version, a media-processing prototype must establish enforceable defaults for bytes, pixel count, dimensions, duration, codecs, archive depth, decompression ratio, memory, disk, processing time, and concurrent work for each supported deployment profile.

---

**7. Must original media remain untouched forever?**

**Required by:** Proof

**Response:**

Admitted source originals must never be overwritten. Editing always creates a new candidate, derivative, rendition, or superseding version linked to the exact source.

“Untouched” does not mean every file must be retained forever. Governed source material, accepted lineage, decision evidence, and assets required for audit or replay must remain durable for their applicable retention periods. Disposable experiments and nonrequired workfiles may expire under explicit policy. Authorized deletion, rights withdrawal, or legal requirements may restrict or remove content, but the action and its effects must remain auditable where policy permits.

---

## 11. What is the expected external-editor workflow?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**1. Which editors matter first?**

- ☒ InvokeAI
- ☐ Photoshop
- ☒ DaVinci Resolve
- ☐ Premiere
- ☐ Audition
- ☐ Reaper
- ☒ Another tool — Blender and Kdenlive

**Selected choice(s), ranking, qualifications, or additional answer:**

1. InvokeAI for difficult image masks, regional edits, inpainting, and cleanup needed by projects such as Dumpster Fire Friends.
2. Blender for exceptional 3D, spatial, camera, lighting, animation, compositing, and runtime-preparation work.
3. Kdenlive as the open-source video-finishing path using OpenTimelineIO.
4. DaVinci Resolve for advanced professional video, grade, Fusion, Fairlight, and mastering work.

Photoshop, Premiere, Audition, Reaper, Krita, Inkscape, Ardour, and similar tools may initially use generic standard-format checkout packages. Dedicated integrations should follow demonstrated demand.

**Response:**

External applications are separately installed precision environments, not Storyworld’s normal creative interface. Storyworld should provide installation guidance, supported-version checks, health checks, configuration assistance, launching, and governed return handling without requiring application-specific plugins or changes to native workflows.

OpenTimelineIO should be the primary editorial interchange standard where applicable. External tools never receive authority to perform Add to Canon, Update Canon, Master Acceptance, a rights waiver, release creation, or publication authorization.

---

**2. Should Storyworld:**

- ☒ Export a package manually
- ☒ Open the external editor directly
- ☒ Create a temporary checkout
- ☒ Watch a folder for returned files

**Selected choice(s), ranking, qualifications, or additional answer:**

The governed temporary checkout is the required foundation. Direct launch and monitored return should provide the normal low-friction experience. Manual package export remains a permanent fallback for portability and unsupported environments.

**Response:**

For governed production work, Storyworld should:

1. Create a checkout bound to an exact asset, sequence, or document version.
2. Include permitted references, restrictions, standard-format media, portable representations, and an integrity-protected manifest.
3. Launch the external application when supported, or provide a manual package.
4. Let the user work normally in the external tool.
5. Monitor a return location or accept an explicit import.
6. Treat every return as untrusted: scan, validate, hash, and associate it with the checkout.
7. Create a new candidate without overwriting the source or an accepted master.
8. Produce a semantic comparison and any conversion-loss report.
9. Rerun affected evaluations and show approval consequences.
10. Present the exact returned version for authorized human acceptance where required.

The external application may ignore Storyworld’s sidecar, but Storyworld must retain it as the authoritative checkout and return record.

---

**3. Should only one person be allowed to check out an asset at a time?**

**Response:**

No. Concurrent checkouts should be allowed when policy and the external format permit them. Each checkout must receive its own session identity, owner, exact base version, restrictions, expiry, and return record.

Storyworld should warn users about overlapping work and stale bases, but it should not impose unnecessary locking on solo creators or small teams. An exclusive checkout may be available for tools or workflows that genuinely cannot reconcile concurrent work.

---

**4. What happens when two edited versions return?**

**Response:**

Both returns become separate candidates linked to the same exact base version. Storyworld must never use last-write-wins behavior or allow either return to overwrite the source, the other candidate, or an accepted master.

Each return is independently scanned, hashed, evaluated, and compared. Users may choose one, keep both as variants, request an AI-assisted comparison, or create a new merge proposal where the media and operations support meaningful merging.

If one candidate is accepted first, the other becomes based on a stale version and must be rebased or reevaluated before later acceptance. Acceptance remains an explicit authorized human decision.

---

**5. May an external editor receive source assets classified `Provider Egress—Restricted` or `Provider Egress—Highly Restricted`, or only approved derivatives?**

**Response:**

External tools should receive only the minimum policy-permitted derivatives and references needed for the task by default. They must not receive broad access to the source library or sensitive material merely because it might improve convenience or quality.

Sources classified `Provider Egress—Private` or `Provider Egress—Restricted` may be checked out only when the exact tool, deployment boundary, purpose, rights, consent, retention, provider-egress policy, and destination permit it. The user, tool, and checkout session must also be authorized under the source’s access classification; provider-egress eligibility does not grant access. Redacted, cropped, downsampled, watermarked, proxy, or otherwise minimized derivatives should be preferred.

Material classified `Provider Egress—Highly Restricted`, or subject to a non-exceptionable no-egress rule, must remain inside the permitted Storyworld-controlled boundary. Any permitted exceptional transfer requires a recorded, exact-scope human authorization and cannot weaken rights, consent, privacy, contractual, regional, or destination restrictions.

---

# Priority 2 — Collaboration

## 12. How collaborative must the Reliable Internal Version be?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Required by:** Reliable Internal Version

**Current-state qualification:**

The Reliable Internal Version must support trustworthy asynchronous collaboration for one small family team. Here, “reliable” means dependable internal family-team use; it does not mean Public Self-Service, an external-customer production-readiness guarantee, or authorization for any external stage. The Proof may use one owner plus explicitly authorized help, and the Useful Internal Version may establish bounded drafts, comments, proposals, exact-version history, and recovery before the complete Reliable Internal Version collaboration baseline is validated.

The accepted alpha remains narrower under `DEC-0025`: proposals are asynchronous, one authorized owner decides them, and there is no presence, live co-editing, edit locking, or assignment system. Multi-author branching and merging require a successor decision, while semantic three-way merging requires a prototype.

**1. Will several people edit the same property at the same time?**

**Response:**

Yes, Storyworld should assume that several collaborators may have overlapping work sessions in the same property. They should normally work on separate narrative units, assets, tasks, or proposal branches rather than synchronously changing the same field.

Every edit must retain its author, exact base version, time, and provenance. Conflicting changes must create a visible stale or conflict state—never a silent overwrite or last-write-wins result.

---

**2. Do you need real-time cursors and presence?**

**Response:**

No, not for the Reliable Internal Version. Real-time cursors, avatars, and presence indicators add complexity without improving canon, provenance, or decision safety enough to justify that milestone.

They may be considered through separately scoped Mature Product work if actual use demonstrates a need; no milestone currently requires them. Presence must remain an ephemeral awareness signal, never evidence of authorship, responsibility, approval, availability, or authority.

---

**3. Do you need Google Docs-style simultaneous editing?**

**Response:**

No, not for the Reliable Internal Version. Storyworld should prioritize autosaved drafts, small editable units, proposal branches, exact-version history, comparison, conflict detection, and recovery.

Targeted simultaneous editing could be considered through separately scoped Mature Product work for appropriate text documents, but no milestone currently requires it and it must not become a platform-wide requirement for graphs, Current Canon or Canon Revision records, media, timelines, or governed decisions.

---

**4. Are drafts plus version-conflict safeguards sufficient for the Reliable Internal Version?**

**Response:**

Yes. The Reliable Internal Version model must include:

- Autosaved and recoverable drafts.
- Exact base-version tracking.
- Immutable version history.
- Warnings before applying changes to a stale version.
- Side-by-side and semantic comparison.
- Rebase, keep-as-variant, or create-merge-proposal options.
- No silent overwrite or automatic acceptance.

A warning shown only after work has already been overwritten would not be sufficient.

---

**5. Should collaborators work on separate proposal branches?**

**Response:**

Yes, for shared, consequential, experimental, or conflicting work. Proposal branches should be lightweight and mostly automatic so nontechnical users do not need to understand Git-style branching.

Low-consequence notes may use direct accepted editing where the property governance profile permits it and the actor has acceptance authority. Mutable drafts remain non-authoritative. Proposed additions or updates to Current Canon, accepted-master revisions, structural changes, and competing creative directions should use proposals tied to an exact base version. Canon proposals become authoritative only through Add to Canon or Update Canon.

---

**6. Should Storyworld support three-way merging of narrative structures?**

**Basic support by:** Reliable Internal Version

**Full support by:** Mature Product

**Response:**

Yes, but it should be introduced in stages. Storyworld must preserve a common ancestor and use stable narrative-unit identities so it can compare the base, current version, and proposal semantically rather than relying on line-based text merging.

By the Reliable Internal Version, Storyworld must preserve a common ancestor, automatically combine clearly independent supported changes, and present detected conflicts for human resolution. It must detect cases such as edit-versus-delete, competing reorderings, changed references, incompatible hierarchy changes, and altered dependencies.

Full semantic three-way merging for supported narrative structures is a Mature Product capability. AI may explain conflicts and propose a merge, but it must not silently resolve consequential ambiguity or accept the merged result. A `StoryDocument` and semantic-merge prototype should validate this design before broad implementation.

---

**7. Can an editor accept only selected parts of two conflicting proposals?**

**Response:**

Yes. Partial acceptance is essential for efficient small-team work. An authorized editor should be able to select compatible operations from each proposal and create a new combined candidate.

Storyworld must show dependencies and require linked changes to remain together when separating them would create an invalid narrative, continuity, rights, or technical state. The combined result must receive its own version, provenance, evaluations, and required human acceptance.

---

**8. Should guest reviewers ever receive decision authority?**

**Response:**

Not by default. Guest access should normally permit only specifically scoped reading, commenting, and annotation. Comments, resolved discussions, and review activity must never imply approval.

When an external client, rights holder, specialist, or other reviewer genuinely needs decision authority, the property owner may grant a separate, explicit, narrowly scoped, and preferably time-limited approval capability. It must identify the decision type, property or production, exact version, and expiry. That person is then acting as a delegated external approver for that scope—not exercising authority merely because they are a guest.

Canon authority for Add to Canon or Update Canon, Master Acceptance, rights, release, commercial, and publication authorities remain separate and cannot be inferred from one another.

---

**9. Can clients see creator notes classified `Access—Restricted`?**

**Response:**

No. Client access must never reveal creator notes, sources, or deliberations classified `Access—Restricted`, hidden canon, spoilers, credentials, internal evaluations, or unrelated rights information merely because the client can review a production.

Clients should receive only deliberately shared versions, review packages, findings, and context needed for their authorized role. If sensitive material needs to be communicated, an authorized person should create a reviewed, sanitized derivative or explicitly reclassify the exact information’s access classification. Any delivery across the Storyworld-controlled boundary must also satisfy its independent provider-egress classification. All access and disclosure changes must be scoped, auditable, and reversible where possible.

---

> The answers determine whether CRDT or operational-transformation technology is needed or should remain deferred.

# Priority 2 — Commerce Foundry and runtime integration

## 13. What is the first Commerce Foundry integration that must work?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Target vertical slice:**

The first integration should complete the full governed loop:

> Commerce Foundry brief → pinned Storyworld production → narrative plan and assets → Storyworld creative and rights acceptance → Commerce Foundry commercial rejection or revision request → focused Storyworld revision → Commerce Foundry approval → publication or export → normalized performance observation.

Dumpster Fire Friends may exercise this through a Commerce Foundry-defined collectible, card, print, or merchandise campaign, but the contracts must remain reusable for any property and product.

The immutable brief, bundle, receipt, and source-drift foundations are accepted and partially implemented. Expanded print handoff and embedded review remain staged and require prototype validation.

**1. Which direction starts the workflow?**

- ☒ Commerce Foundry creates a campaign brief
- ☐ Storyworld requests product information
- ☐ Either system may initiate it

**Selected choice(s), ranking, qualifications, or additional answer:**

Commerce Foundry should initiate the first supported workflow by issuing a signed, immutable `NarrativeCampaignBrief`. Mature Product may add a Storyworld experience that helps a user request eligible product information, but Commerce Foundry must still create the authoritative brief and snapshots before commercial production begins.

**Response:**

Commerce Foundry owns product truth, claims, offers, commercial policy, and commerce-publication authority. Storyworld receives pinned snapshots and uses them to create narrative work without mutating or reinterpreting the commercial source.

Who starts a user interaction must never determine authority. Commerce Foundry remains the authority host for Commerce Foundry-originated campaigns.

---

**2. Which product information must be immutable in a campaign snapshot?**

**Response:**

Each campaign snapshot should pin, where applicable:

- Product, SKU, variant, collection, and version identifiers.
- Name, description, category, specifications, materials, dimensions, colors, options, and included components.
- Exact product and packaging appearance, artwork, labels, logos, and required fidelity references.
- Approved source images and other references with hashes.
- Approved facts and exact approved claim wording, with evidence references.
- Prohibited claims, depictions, transformations, and product uses.
- Brand, trademark, IP, safety, regulatory, marketplace, and channel constraints.
- Required disclosures, attribution, accessibility, and placement rules.
- Rights, licenses, territories, channels, purposes, modification permissions, expiry, and revocation conditions.
- Price, offer, availability, CTA, promotional terms, and effective dates when the campaign relies on them.
- Product status, retirement or discontinuation state, and approved substitution rules.
- Snapshot ID, source version, creation time, expiry, hash, signature, and source-drift behavior.

The snapshot remains immutable even when Commerce Foundry’s live product record changes. A change creates a new snapshot and makes affected associations eligible for staleness evaluation.

---

**3. Who decides that a product snapshot is stale?**

**Response:**

Commerce Foundry determines when its authoritative product, packaging, claim, offer, rights, or policy source has changed and emits a signed source-change event. Expiry may also make a snapshot stale automatically.

Storyworld compares that event with exact pinned references and mechanically marks only affected drafts, assets, placements, packages, and publications as stale. A human should not have to rediscover source drift manually.

The proper authority decides the remedy—revalidate, replace, revise, withdraw, or grant a permitted waiver—not whether the source change occurred.

---

**4. Should packaging changes automatically block affected Storyworld releases?**

**Response:**

Yes, when the release depicts, describes, references, or otherwise depends on the changed packaging. Storyworld should automatically block an unpublished or scheduled affected release until it is revalidated, revised, replaced, or explicitly waived by the proper authority where policy allows.

The block must be selective rather than property-wide. Work that does not depend on the changed packaging should remain valid.

Already published work must never be silently deleted. It should be marked stale and routed to the appropriate authority with proposed correction, replacement, withdrawal, or documented-waiver actions.

---

**5. Where should Commerce Foundry review occur?**

- ☐ Entirely inside Commerce Foundry
- ☐ Through an embedded focused review component
- ☐ Through a deep link to Storyworld
- ☒ A combination

**Selected choice(s), ranking, qualifications, or additional answer:**

1. Commerce Foundry provides the native campaign and commercial-review surface.
2. An embedded focused component supports exact-asset review, findings, comparison, and decisions without duplicating Storyworld Studio.
3. A contextual deep link opens Storyworld for complex narrative or media revision.

**Response:**

Commercial review should feel native inside Commerce Foundry, while complex creative work remains in Storyworld Studio. The focused component should display exact versions, product placement, copy, claims, disclosures, findings, and approval consequences.

Embedding or deep-linking must not transfer authority or create shared mutable state. Each system records its own decisions and exchanges immutable bundles, findings, events, and receipts.

---

**6. Which status information should each system display from the other?**

**Response:**

Commerce Foundry should display Storyworld’s:

- Brief-import and connection status.
- Production progress and current bundle version/hash.
- Narrative-plan, asset-generation, revision, and package status.
- Creative, continuity, rights, accessibility, and technical review state.
- Blockers and stale Storyworld dependencies.
- Current Storyworld decision receipts relevant to the handoff.
- Whether a revised bundle is ready for Commerce Foundry review.

Storyworld should display Commerce Foundry’s:

- Current brief, product-snapshot, claim, offer, and policy versions.
- Source-drift and expiry status.
- Commercial review state and exact-version findings.
- Rejection, revision-request, approval, and waiver status.
- Publication authorization, execution status, and receipt references.
- Print, vendor, order, and fulfillment status where applicable.
- Normalized campaign observations and performance results.

Every projection should show its source system, exact version, last update, freshness, and unknown or unavailable state. Displayed status is a projection—not a locally editable copy of the other system’s authority.

---

**7. Does Storyworld ever publish commerce content directly, or only after Commerce Foundry authorization?**

**Response:**

Commerce Foundry-originated content may publish only after Commerce Foundry authorization. Normally Commerce Foundry should publish through its own channel and vendor connectors.

Storyworld may execute publication only if Commerce Foundry grants a narrowly scoped capability covering the exact package, destination, metadata, disclosures, timing, retry rules, and expiry. Any material change invalidates that authority.

Storyworld creative or rights approval never implies commercial approval or publication authority. Standalone Storyworld projects that did not originate in Commerce Foundry may follow their own separately authorized publication policy.

---

## 14. Which interactive runtime should be the first supported production target?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Current-state qualification:**

The accepted runtime boundary already makes Storyworld an immutable content compiler rather than a game engine. A target-generic, BeKindRewind-oriented compiler exists. The recorded target owner direction makes the Browser/Web runtime the sole first supported production target and Godot the second. A bounded Godot portability proof may run in parallel solely to test the shared contract. The Browser/Web adapter, bounded Godot proof, complete Godot adapter, and complete shared runtime system are not claimed as implemented or validated and still require appropriately scoped successor decisions, tasks, and evidence.

**1. Select the sole first supported production target:**

- ☒ Browser/Web runtime
- ☐ PlayCanvas
- ☐ Unity
- ☐ Unreal
- ☐ Godot
- ☐ A custom runtime
- ☐ Not decided

**Selected choice(s), ranking, qualifications, or additional answer:**

1. **Browser/Web runtime** is the sole first supported production target.
2. **Godot** is the second supported production target. Any parallel Godot work is limited to a bounded portability proof and does not make Godot a co-first target or establish complete Godot support.

**Response:**

**First supported production target:** The Browser/Web adapter is the first adapter intended to reach complete, documented, and validated support. Browser-first provides the shortest path to internal testing, accessible previews, broad device reach, and governed Web delivery. “First” describes support and delivery priority, not merely which prototype begins first. The exact browser shell or framework—including whether PlayCanvas is used—remains unresolved and should be selected through scoped research and validation.

**Shared contract:** Storyworld should define one versioned, target-neutral `RuntimeContentPackage` contract from the beginning. The contract must cover package identity, pinned source versions, narrative state, assets, interactions, compatibility requirements, validation evidence, authority boundaries, and receipts. It must preserve shared narrative identifiers, authored outcomes, rights, visibility, provenance, and content hashes. Browser-specific behavior belongs behind the Browser/Web adapter and must not become part of the shared domain contract.

**Godot sequencing:** Godot is the second supported production target. A small, bounded Godot portability proof may be developed in parallel to test whether the shared package can be imported and interpreted without browser-specific assumptions. That proof is contract-validation work; it does not establish a supported Godot adapter at any product milestone, complete Godot support, or co-first production support. Full Godot support should advance only after the Browser/Web path and shared contract have been sufficiently validated and a separate scoped decision or task authorizes that work.

**No proprietary runtime:** A custom runtime is not the intended first target, and Storyworld does not currently intend to build a proprietary general-purpose runtime. Storyworld may own shared runtime contracts, packaging, adapters, and validation logic without creating its own runtime engine. Any future custom runtime would require a separate explicit owner decision.

**Status and authority:** This response records target owner direction. It does not claim that the Browser/Web adapter, Godot adapter, Godot portability proof, or complete runtime system is already implemented. It does not authorize implementation, dependency installation, spending, deployment, external communication, publication, or production use.

Storyworld owns authoritative narrative, Current Canon, Canon Revision history, Canon Versions, assets, rights, and release-package state. The receiving runtime owns import, execution, compatibility, rendering, physics, navigation, input, networking, player state, saves, builds, deployment-state, and Receiving-Runtime Acceptance evidence within its authority domain.

---

**2. What must the first target-neutral runtime package contain?**

**Response:**

The first shared package should contain:

- Package, property, production, target-profile, and compiler identifiers and versions.
- An exact pinned Canon Version and source-content versions.
- Locations, spatial relationships, world and era rules.
- Characters, NPC definitions, appearances, dialogue constraints, and runtime-facing metadata.
- Dialogue trees, choices, branches, authored outcomes, and localization.
- Mission graphs, prerequisites, effects, triggers, and state-transition definitions.
- Items, artifacts, collectibles, lore, and authored initial-state rules.
- Sound-zone intent, music and ambience references, and accessibility requirements.
- An asset bundle or index with exact versions, hashes, types, sizes, and locations.
- Runtime capability requirements, platform budgets, and unsupported-capability handling.
- Rights, consent, visibility, sensitivity, attribution, disclosure, and expiry information.
- Provenance, checksums, signatures, release notes, and conversion-loss reports.

It must not contain live sessions, player identities, inventory, progression, saves, achievements, runtime analytics, or other player-specific state.

---

**3. Should Storyworld generate:**

- ☐ JSON only
- ☐ Asset bundles
- ☐ Localization files
- ☐ Dialogue files
- ☐ Mission graphs
- ☐ Sound-intent records
- ☒ All of these

**Selected choice(s), ranking, qualifications, or additional answer:**

All of these should be generated from one target-neutral source package through replaceable target adapters.

**Response:**

JSON or another structured representation should carry the portable Storyworld-owned meaning, but JSON alone is insufficient for a usable release. Each adapter should produce the required asset bundles, localization, dialogue, missions, sound intent, metadata, and target-specific import files.

Target-specific files are derived outputs, not canonical Storyworld records. Replacing a runtime adapter must not require rewriting canon or authored narrative source.

---

**4. What constitutes Receiving-Runtime Acceptance?**

**Response:**

**Storyworld Runtime Handoff Approval:** A Storyworld-side human decision authorizing an exact runtime package version to be transferred to a named receiving runtime for import, preview, testing, and acceptance evaluation. It confirms that the package is ready for runtime validation; it is not final runtime acceptance.

**Receiving-Runtime Acceptance:** The final decision by the authorized receiving-runtime authority after successful import and required validation. It binds the exact package version to the exact target runtime and produces the runtime acceptance receipt.

The required sequence is:

1. Storyworld assembles and validates an exact, immutable runtime package.
2. Required Storyworld Canon Version, asset, rights, accessibility, release, and package checks are satisfied.
3. An authorized Storyworld human grants **Storyworld Runtime Handoff Approval** for the exact package version and named target runtime and issues its exact-version handoff receipt.
4. The receiving runtime imports the package into the applicable validation, preview, or staging context.
5. Required schema, integrity, compatibility, parity, preview, and target-specific checks are completed.
6. The authorized receiving-runtime authority grants **Receiving-Runtime Acceptance** and issues the runtime acceptance receipt.

Step 3 is approval to transfer, import, and evaluate; it is not final runtime acceptance. Final runtime acceptance occurs only at step 6. A failed import, parity check, preview, or other required validation leaves the package unaccepted by the receiving runtime. Importing or successfully executing a package does not by itself create acceptance.

A material change to the package, target runtime, configuration, or required validation basis invalidates the applicable approval or acceptance and requires reevaluation. Both decisions must identify the exact package version, target runtime, actor or authority, time, evidence, and outcome.

Storyworld may approve what it sends, but it cannot pre-accept the package on behalf of the receiving runtime. The receiving runtime may accept the package for execution, but it cannot change Current Canon, create a Canon Revision, repin a production, or waive Storyworld rights, release, or publication requirements. Receiving-Runtime Acceptance does not make runtime or player state part of Current Canon.

Neither Storyworld Runtime Handoff Approval nor Receiving-Runtime Acceptance automatically authorizes production deployment, external publication, commercial release, or later runtime mutation. Each requires its own applicable authorization. Receiving-Runtime Acceptance remains separate from deployment authorization and publication authorization.

This response records target owner direction. It does not claim that the complete two-stage handoff-and-acceptance workflow is already implemented.

---

**5. Should Storyworld host a preview deployment, or only produce a package?**

**Response:**

Storyworld should always produce a portable immutable package and should also provide or orchestrate an isolated preview.

For Browser/Web targets, this may be a temporary access-controlled preview deployment. For the bounded Godot portability proof, it may be a generated test project or launchable test build. That proof supplies portability evidence only and does not establish supported Godot production status. Previews must identify the exact package, show fidelity limitations, expire or be removed under policy, and remain clearly separate from production publication. Preview creation or successful preview execution supplies validation evidence; it does not by itself grant Storyworld Runtime Handoff Approval, create Receiving-Runtime Acceptance, or authorize production deployment.

Storyworld should not become the production runtime host by default. BeKindRewind or another named receiving-runtime operator owns live deployment and operations under separate deployment authorization; Receiving-Runtime Acceptance alone does not grant that authorization.

---

**6. How should runtime-discovered content errors return to Storyworld?**

**Response:**

Errors should return through typed, idempotent events or signed findings—not direct database writes. Each finding should include:

- Exact package hash, source Canon Version, target, runtime/build version, environment, and runtime context.
- Stable Storyworld entity, dialogue, mission, item, location, trigger, or asset references.
- Severity, category, evidence, reproduction steps, and observed versus expected behavior.
- Sanitized logs, screenshots, traces, or session references where permitted.
- Time, correlation/causation IDs, recurrence count, and affected audience scope.
- Whether the issue came from authored content, conversion loss, unsupported capability, runtime implementation, or an unknown cause.

Storyworld should convert these into observations, findings, evidence, or canon proposals that identify the affected branch, source Canon Revision, productions, and pinned Canon Versions. Runtime hotfixes must return through explicit reconciliation and never silently become Storyworld source or Current Canon. A runtime finding may recommend Add to Canon or Update Canon, but it cannot perform either action or repin a production.

---

**7. Can runtime telemetry ever propose canon changes, or only create observations?**

**Response:**

Runtime telemetry may create observations, findings, evidence, and canon proposals for candidate branches, narrative revisions, balancing changes, or new content. Each retained item should identify its exact source Canon Version and runtime context and show affected branches, Canon Revisions, productions, and pinned Canon Versions. AI may summarize patterns, recommend Add to Canon or Update Canon, and draft proposals with visible evidence, confidence, and provenance.

Runtime telemetry may not change Current Canon, create a Canon Revision, or repin a production. Any proposed material must pass through the applicable authorized human Add to Canon or Update Canon action; any production migration or repin requires its own authorized action and impact summary. Future automation may update a separately defined non-authoritative runtime or branch state only after a successor decision establishes its scope, policy, reversibility, and audit requirements.

Raw player telemetry and player identities remain within the receiving runtime’s authority domain; Storyworld should receive only necessary aggregated or privacy-permitted observations. Runtime or player state remains outside Storyworld canon unless it is separately proposed and accepted into Current Canon.

---

# Priority 2 — Rights, privacy, and source material

## 15. What types of sensitive material will Storyworld hold?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Select known or likely categories:**

- ☒ Personal journals
- ☒ Family history
- ☒ Private correspondence
- ☒ Medical information
- ☒ Unreleased brand information
- ☒ Voice recordings
- ☒ Likeness references
- ☒ Customer data
- ☒ Product launch information
- ☒ Licensed media

**Selected choice(s), ranking, qualifications, or additional answer:**

Storyworld should expect all listed categories, although it should minimize collection whenever the same creative purpose can be achieved with less sensitive material.

Additional likely categories include:

- Sensitive information involving children or other vulnerable people.
- Real-person photographs, video, interviews, location data, and identifying details.
- Unpublished scripts, canon not intended for public release, spoilers, drafts, research, and production plans.
- Contracts, rights evidence, compensation terms, legal correspondence, and financial context.
- Archival documents, quotations, music, fonts, trademarks, and other third-party intellectual property.
- Confidential customer creative work and review communications.
- Credentials and secrets, which must remain in a dedicated credential vault rather than the creative asset library.

Ordinary voice commands should remain ephemeral: retain the transcript, context, interpretation, and operations, but preserve the audio only through a governed source-asset or evidence workflow. Storyworld should not ingest raw Commerce Foundry buyer data or BeKindRewind player identities merely because those systems are integrated.

Dumpster Fire Friends should prove practical rights, trademark, parody, age-rating, territory, source, and provenance controls. The broader portfolio requires stronger controls for real family experiences, photographs, voices, children, private correspondence, and documentary sources.

**Classification qualification:**

Every governed source, asset, derivative, search projection, embedding, index, export, and retained evidence item must have three separate classifications:

1. **Access classification:** Who may see or use this inside Storyworld? The qualified values are `Access—Public`, `Access—Internal`, `Access—Confidential`, `Access—Restricted`, and `Access—Embargoed`.
2. **Retention classification:** How long may or must Storyworld retain it?
3. **Provider-egress classification:** Whether and under what conditions may it cross the Storyworld-controlled deployment boundary? The qualified values are `Provider Egress—Public`, `Provider Egress—Private`, `Provider Egress—Restricted`, and `Provider Egress—Highly Restricted`.

These dimensions are independent. Access permission does not grant provider-egress permission, and provider-egress permission does not grant access permission. Every operation must satisfy its access, retention, and provider-egress classifications plus all applicable rights, consent, privacy, contractual, regional, purpose, provider, model, training, and destination requirements. “Most restrictive rule wins” applies within each dimension and across any additional overriding legal, rights, consent, privacy, or contractual restriction; it must not collapse the dimensions into one classification.

Derivatives inherit the source’s access, retention, and provider-egress classifications by default unless the derivative is separately reviewed and explicitly reclassified. Reclassifying a derivative does not reclassify or expose its source. Assigning `Access—Public` does not itself authorize publication; even after authorized public visibility, the material does not automatically become eligible for provider transmission, retention, or training. Changing or expiring an embargo does not automatically relax provider-egress restrictions.

**Provider-egress classes:**

- **`Provider Egress—Public`:** Material may use approved provider routes for an approved purpose, subject to applicable rights, consent, retention, training, regional, provider, model, and destination policies. “Public” does not mean the provider may publish, retain, or train on the material.
- **`Provider Egress—Private`:** Material may use approved privacy-preserving provider routes, normally requiring controlled retention and no provider training.
- **`Provider Egress—Restricted`:** External transmission requires an explicit execution-time decision covering the exact material, purpose, provider, model or endpoint, region, retention mode, input form, data minimization, and destination.
- **`Provider Egress—Highly Restricted`:** Material remains within the Storyworld-controlled deployment boundary by default. Any exception requires separate explicit authorization and is unavailable where rights, consent, law, contract, credentials policy, minor-safety policy, or another non-exceptionable restriction prohibits hosted transmission.

Self-hosted workflow software does not count as local processing when any node calls a hosted endpoint.

**Conservative default crosswalk:**

When a valid access classification exists but no separate provider-egress decision has yet been made, Storyworld must apply this default assignment. The crosswalk is a conservative default, not a declaration that the dimensions are equivalent.

| Access classification | Default provider-egress classification |
| --- | --- |
| `Access—Public` | `Provider Egress—Public` |
| `Access—Internal` | `Provider Egress—Private` |
| `Access—Confidential` | `Provider Egress—Restricted` |
| `Access—Restricted` | `Provider Egress—Highly Restricted` |
| `Access—Embargoed` | `Provider Egress—Highly Restricted` until separately reviewed and explicitly classified |

The crosswalk assignment becomes the item’s provisional provider-egress classification. Either access or provider-egress classification may then be tightened independently, and changing one after assignment does not automatically change the other. Relaxing a default requires an explicit authorized decision covering rights, consent, privacy, purpose, provider, route, retention, region, and destination. An explicit provider-egress classification does not bypass operation-specific checks. If, after default assignment, a provider-egress classification is missing or uncertain for any reason, the operation must fail closed as `Provider Egress—Highly Restricted`.

Credentials, material subject to contractual no-hosted-processing terms, revoked consent, and identifying or sensitive material involving minors remain prohibited from hosted transfer wherever the applicable rule is non-exceptionable.

This classification model records target owner direction for later successor decisions, contracts, and implementation work. It does not claim current implementation or authorize provider calls, credential use, deployment, external communication, publication, or reclassification.

---

**1. Who may see material classified `Access—Restricted`?**

**Response:**

Only explicitly authorized people and narrowly scoped Storyworld services with a legitimate need for the exact material should see or use material classified `Access—Restricted`. Access should be controlled by tenant, workspace, property, resource, version, role, purpose, and time. This response governs internal visibility and access only; it does not permit transmission to a provider.

- Property owners may control access within applicable rights and policy.
- Named collaborators may receive only the minimum source access needed for their assigned role.
- Rights reviewers or counsel may receive the evidence needed for their review.
- Guests and clients receive no access to `Access—Restricted` sources by default.
- Support and administrators must not have routine access; exceptional access requires a time-limited, audited process.
- AI agents and workers receive access scoped to the Agent Mission, exact versions, and permitted operations only.

Access to an `Access—Public` derivative must not grant access to its `Access—Restricted` source. The derivative and source retain separate provider-egress classifications.

---

**2. May models receive material classified `Provider Egress—Restricted` or `Provider Egress—Highly Restricted`?**

**Response:**

Material classified `Provider Egress—Restricted` may reach a hosted model only after an explicit execution-time decision covers the exact material, purpose, provider, model or endpoint, region, retention mode, input form, data minimization, and destination.

Storyworld should prefer the minimum necessary input: a redacted excerpt, cropped image, derived feature, or reviewed summary rather than the raw source.

Material classified `Provider Egress—Highly Restricted` remains inside the Storyworld-controlled deployment boundary by default. An exception requires separate explicit authorization and cannot override revoked consent, identifying or sensitive material involving minors, credentials policy, contractual no-hosted-processing terms, or another non-exceptionable prohibition. Self-hosted ComfyUI does not relax these rules when its nodes call hosted endpoints, and the current posture does not authorize local generative model weights.

---

**3. Should some providers be prohibited from receiving certain assets?**

**Response:**

Yes. Provider eligibility must be defined per provider-egress classification, capability, exact material and purpose, rights grant, consent state, region, retention and training behavior, destination, and approved provider, model, or endpoint.

Some assets may use only one explicitly approved route; others must be prohibited from every hosted provider. Material classified `Provider Egress—Restricted` must not use automatic fallback unless the fallback is independently approved for the exact operation and is policy-equivalent. Material classified `Provider Egress—Highly Restricted` remains in the controlled boundary absent a permitted exception. A provider eligible for `Provider Egress—Public` drafting may still be prohibited from receiving material classified `Provider Egress—Private` or `Provider Egress—Restricted`, licensed sources, real-person references, customer-confidential material, or unreleased products.

---

**4. Should elevated access or provider-egress sensitivity trigger separate encryption?**

**Response:**

Yes. All Storyworld data requires encryption in transit and at rest. Stronger separation through envelope encryption and narrowly scoped keys may be triggered independently by elevated access sensitivity—such as `Access—Confidential`, `Access—Restricted`, or `Access—Embargoed`—or elevated provider-egress sensitivity—such as `Provider Egress—Restricted` or `Provider Egress—Highly Restricted`. Apply separation at least by tenant and security domain, and by asset or collection where the threat model justifies it.

Keys must support rotation, revocation, audited use, backup protection, and deletion or cryptographic erasure where policy permits. Temporary voice buffers, exports, caches, previews, search indexes, logs, and backups must receive equivalent protection.

The exact KMS, key hierarchy, recovery, and customer-managed-key design remains a security architecture decision requiring threat modeling and prototype validation.

---

**5. Must internal access and provider transmission involving sensitive material be logged?**

**Response:**

Yes. Logging must cover both internal access to sensitive material—including material classified `Access—Confidential`, `Access—Restricted`, or `Access—Embargoed`—and provider transmission, attempted transmission, refusal, and unknown outcomes. Reads, previews, searches that reveal content, downloads, exports, permission changes, external-editor checkouts, administrative access, and deletion attempts must also be logged where policy requires.

The audit record should identify:

- Actor or service identity and role.
- Exact resource and version.
- Action, purpose, and decision.
- Time, workspace, and correlation ID.
- Applicable capability, policy, and authorization.
- External destination or provider when relevant.
- Break-glass reason and approval, if used.
- Success, refusal, or unknown outcome.

Logs must be tamper-evident, access-controlled, and privacy-preserving. They should record identifiers, hashes, and decisions—not duplicate sensitive plaintext or secret values.

---

**6. How should access and provider-egress classifications govern search?**

**Response:**

Access classification controls who may discover search results, snippets, counts, facets, and even the existence of material. Search must apply access authorization before revealing any of them, and exceptionally sensitive sources may be marked no-index.

Provider-egress classification separately controls whether text, embeddings, derivatives, or queries may be sent to an external search or embedding service. Search projections, indexes, and embeddings are derivatives and inherit all relevant access, retention, deletion, and provider-egress classifications unless separately reviewed and explicitly reclassified.

Begin with Storyworld-controlled lexical and faceted search. Material classified `Provider Egress—Highly Restricted` remains within the controlled boundary by default; material classified `Provider Egress—Restricted` may reach an external search or embedding service only through the required execution-time decision and operation-specific checks. Semantic search should remain deferred until reviewed use cases justify it and its model, storage, rebuild, deletion, and egress controls are proven.

---

**7. Can a reviewed public-safe derivative retain provenance to a more protected source?**

**Response:**

Yes, through a protected internal provenance relationship. A reviewed derivative may receive a different access or provider-egress classification, but its source remains protected under its original classifications. Reclassifying the derivative does not reclassify or expose the source. Authorized users may trace the derivative to the exact source version, transformation, reviewer, and evidence only when the source’s access classification permits it.

Exports intended for public visibility must omit access-controlled URLs, identifying metadata, excerpts, and resolvable source references. The derivative requires its own privacy, dignity, reidentification, rights, and factual-fidelity review; calling it a summary does not make it safe automatically. Assigning `Access—Public` does not by itself assign `Provider Egress—Public` or authorize provider training, retention, transmission, or publication.

If the source is later deleted or assigned a more protective classification, the system may retain only a protected hash, tombstone, or minimal lineage record where policy and law permit.

---

## 16. How detailed must rights management be?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Select the rights dimensions Storyworld must track:**

- ☒ Territory
- ☒ Channel
- ☒ Purpose
- ☒ Start and end dates
- ☒ Modification permission
- ☒ AI-generation permission
- ☒ Model-training permission
- ☒ Provider-retention permission
- ☒ Voice consent
- ☒ Likeness consent
- ☒ Attribution
- ☒ Exclusivity
- ☒ Compensation terms

**Selected choice(s), ranking, qualifications, or additional answer:**

Storyworld must also track:

- Rights holder, grantor, subject, licensee, and evidence source.
- Exact asset, source, version, character, voice, or likeness covered.
- Ownership, license type, and editorial versus commercial use.
- Reproduction, distribution, public display, performance, and publication rights.
- Derivative, adaptation, translation, localization, editing, and synthetic-transformation permission.
- Voice or likeness cloning permission separately from ordinary use.
- Approved providers, models, processing regions, and input forms where specified.
- Sublicensing, transfer, and third-party delivery restrictions.
- Required credit wording, placement, disclosures, and synthetic-media labels.
- Guardian authority and age-related restrictions where minors are involved.
- Revocation, withdrawal, expiry, replacement, and historical-use policy.
- Legal hold, deletion obligations, and affected releases or derivatives.
- Music composition, master, performance, synchronization, and mechanical rights where applicable.
- Font embedding, trademark, location, property, photograph, and product rights.

Rights must be represented as scoped grants attached to exact versions—not as one generic “cleared” checkbox. Templates should supply sensible defaults for ordinary creators, while a rights matrix progressively exposes detail when needed.

Rights metadata and withdrawal fixtures exist, but complete scheduled-release blocking, provider exclusion after revocation, Mature Product rights matrices, and external-rights adapters remain incomplete or staged. Exact-version rights and consent evidence plus blocking of known prohibited use are required from the Proof onward for every supported workflow; Mature Product breadth does not defer that baseline.

---

**1. What should happen when consent is withdrawn?**

**Response:**

Storyworld should immediately record a non-destructive withdrawal with its subject, scope, effective time, authority, evidence, and affected permissions. It should then:

1. Block future provider transmission, generation, transformation, checkout, export, scheduling, and publication that relies on the withdrawn permission.
2. Identify affected sources, candidates, accepted masters, renditions, packages, approvals, and published instances.
3. Invalidate only affected approvals and associations.
4. Notify the responsible authorities.
5. Propose replacement, redaction, re-recording, regeneration, withdrawal, or other permitted remediation.
6. Record provider deletion requests and responses where applicable.

Withdrawal cannot be overridden merely because production has begun or an asset previously received Creative Approval or Master Acceptance. It may require access-controlled preservation of evidence rather than immediate erasure when legal holds, audit duties, published history, or other valid obligations apply.

---

**2. Must previously published uses remain available in the historical ledger?**

**Response:**

Yes, subject to applicable privacy, deletion, and legal requirements. The ledger should preserve what exact version was published, when, where, under which rights and consent state, and what later withdrawal, correction, replacement, or takedown occurred.

Historical accuracy does not require keeping the underlying media publicly available or retaining prohibited personal content. Where necessary, Storyworld should preserve only protected receipts, hashes, tombstones, and minimum audit metadata.

History must never be silently rewritten to imply that an earlier publication did not occur.

---

**3. Should scheduled releases be blocked automatically?**

**Response:**

Yes. A scheduled release must be revalidated before execution and automatically blocked when required rights or consent are missing, expired, withdrawn, territorially invalid, channel-incompatible, purpose-incompatible, or otherwise outside the recorded grant.

This is deterministic policy enforcement, not a creative decision. Storyworld should identify the exact blocker and propose focused remedies such as replacement, a revised rendition, a new grant, or rescheduling.

A prior creative or package approval does not override later rights failure. A human waiver is allowed only when policy and law permit it; revoked consent, absent authority, and non-waivable legal or contractual restrictions cannot be bypassed.

---

**4. Who has authority to replace or waive expired rights?**

**Response:**

A rights holder, licensor, authorized representative, or qualified rights reviewer may provide or verify a replacement grant within their actual authority. The property owner or creative lead may replace the affected creative material but cannot invent or extend rights.

A waiver may be issued only by the explicitly authorized rights authority, with qualified legal review where required, and only when the governing policy and underlying law or contract permit waiver. It must bind to the exact finding, asset, use, scope, rationale, evidence, duration, and approver.

AI, providers, editors, connectors, and ordinary collaborators may identify the problem or propose remediation but may never grant rights or waive a blocker. Commerce Foundry and other receiving authority hosts must still perform their own commercial or destination-specific review.

---

**5. Is Storyworld intended to provide legal clearance, or only structured evidence and workflow support?**

**Response:**

Storyworld provides structured evidence, impact analysis, validation, reminders, blocking rules, review workflows, and immutable decision receipts. It does not provide legal advice or guarantee legal clearance.

AI may extract apparent terms, identify missing evidence, compare recorded use against a grant, and draft questions or findings. It must present uncertainty and sources rather than make legal conclusions.

Final legal clearance belongs to the rights holder, authorized rights reviewer, receiving authority, or qualified counsel appropriate to the use. Storyworld should clearly label automated checks as decision support, never as legal approval

---

# Priority 2 — Search and scale

## 17. How large do you expect Storyworld to become?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Basic support by:** Useful Internal Version

**Full support by:** Mature Product

**Planning qualification:**

The table gives Mature Product capacity-planning envelopes for one small-team workspace, not forecasts, pricing limits, current-alpha claims, or immediate requirements for earlier milestones. Normal internal use will be much smaller. The Useful Internal Version needs safe, permission-filtered search and bounded performance for real owner work; the Reliable Internal Version must demonstrate predictable performance, durability, and recovery at the family team’s observed volumes. Multi-workspace service totals should scale independently through tenant isolation, object storage, background processing, and database partitioning only when measurements justify it.

| Scale dimension | Mature Product planning amount | Growth / peak notes |
| --- | ---: | --- |
| Number of properties | 100–500 per workspace | Usually 10–50 actively producing; the remainder may be archived, seasonal, experimental, or reference properties. |
| Characters and other entities | Up to 100,000 | A large shared universe may contain tens of thousands across characters, locations, objects, products, organizations, and concepts. Individual views remain filtered and paginated. |
| Timeline events | Up to 100,000 | Thousands within a complex property; displayed through scoped ranges, lanes, aggregation, and virtualization. |
| Narrative units | Up to 100,000 | Validate at least 10,000 units in one large outline while ordinary working views show only a bounded hierarchy. |
| Assets | 100,000–1,000,000 metadata records | Mature Product performance validation should include at least 100,000 searchable assets. Candidates, variants, renditions, proxies, external workfiles, and published instances drive later growth. |
| Canon Revisions | 10,000–100,000 retained revisions | Append-only history should not be discarded merely for interface performance; use Current Canon projections and archival tiers. |
| Active collaborators | 1–10 normally | Optimized for solo creators and small teams, not departments. Occasional external reviewers use narrowly scoped guest access. |
| Concurrent users | 1–5 normally; approximately 10 at peak | Reliable Internal Version collaboration is primarily asynchronous. Real-time co-editing is not required to meet the Mature Product capacity target. |
| Releases per month | 10–100 normally | Campaign, seasonal, localization, and cross-channel bursts may create hundreds of packages or renditions, but each consequential release remains human-authorized. |
| Total stored media | Approximately 10–100 TB over a long-lived portfolio | Video, audio, 3D, accepted masters, workfiles, and retained candidates dominate growth. Storage quotas, lifecycle policies, deduplication, proxies, and archival tiers must be configurable. |

The Dumpster Fire Friends Proof supplies bounded fixture and workflow evidence using characters, numbered cards, image candidates, regional or age-rated variants, revisions, print/social renditions, and lineage; it does not validate the Mature Product envelopes in this table. Reliable Internal Version testing must cover the family team’s observed production volumes. Mature Product capacity validation should use larger video, audio, interactive, archival, and shared-universe fixtures appropriate to the stated envelopes.

**Current-state qualification:**

Current search uses visibility-filtered `%ILIKE%` queries and does not yet provide Mature Product ranking, facets, typo tolerance, explanations, or an indexed search projection. The next bounded step is PostgreSQL full-text search plus `pg_trgm`, cursor pagination, facets, and virtualization. A 100,000-asset fixture and large outline, timeline, and graph tests are still required for the Mature Product capacity evidence; they are not prerequisites for the Useful Internal Version unless observed internal volume requires them.

Any milestone that offers search must enforce access, provider-egress, rights, privacy, exact-version, and non-disclosure rules from its first supported use. Advanced ranking and scale may be assigned later, but those safeguards may not be deferred.

---

**1. Should users routinely search across all properties?**

**Basic support by:** Useful Internal Version

**Full support by:** Mature Product

**Response:**

Yes. The Useful Internal Version must search the current property or production and permit an explicit, bounded expansion to selected authorized properties. Full support by Mature Product makes workspace-wide search routinely available for finding reusable characters, locations, assets, rights records, sources, releases, and shared-universe dependencies at the planning volumes above.

The default search scope should remain the user’s current property or production to reduce noise, with a clear option to expand to the workspace or selected properties. Every result must show its property, branch, version, status, and visibility.

Cross-property discovery must not grant reuse authority. Sources or canon classified `Access—Restricted`, licensed assets, or another property’s entities may require permission, a pinned reference, or an explicit reuse proposal.

---

**2. Should searches include old and superseded versions?**

**Required by:** Useful Internal Version

**Response:**

Yes, but current accepted versions should appear by default. Users should be able to include historical, superseded, rejected, archived, proposal, and published versions through clear filters.

Historical results must be visibly labeled with their status, time, successor, and exact version. Search and AI retrieval must never silently mix an obsolete fact or asset into Current Canon. Published instances and audit investigations must remain able to locate the exact historical versions they used.

---

**3. Should `Access—Restricted` and spoiler results appear for authorized users?**

**Required by:** Useful Internal Version

**Response:**

Yes, when the user is explicitly authorized and the selected search scope permits them. Even authorized users should have controls for spoilers and `Access—Restricted` results so sensitive material does not appear unexpectedly during ordinary work, presentations, or shared-screen sessions.

Unauthorized users must not see titles, snippets, thumbnails, result counts, facets, or other clues that reveal the material exists. Search indexes, caches, embeddings, logs, and generated summaries must preserve the source’s access, retention, deletion, and provider-egress classifications.

---

**4. Is fuzzy or typo-tolerant search important?**

**Required by:** Reliable Internal Version

**Response:**

Yes. It is important for character and place names, alternate spellings, OCR text, multilingual material, filenames, dialogue, and large asset libraries.

Storyworld should support typo tolerance, prefixes, aliases, normalized forms, and controlled transliteration while keeping exact-ID and exact-phrase search available. Fuzzy matches must be explained and must never silently merge two entities or treat approximate wording as an exact approved claim.

PostgreSQL full-text search and `pg_trgm` should be the Reliable Internal Version implementation path. The Useful Internal Version may begin with safe exact, prefix, and full-text search for its bounded internal corpus.

---

**5. Is “find similar images” important?**

**Basic support by:** Useful Internal Version

**Full support by:** Mature Product

**Response:**

Yes, particularly for character identity, visual continuity, duplicate detection, style consistency, reference reuse, product fidelity, and locating alternate shots or card artwork. This is important for Dumpster Fire Friends and increasingly important across illustrated, video, archival, and commerce projects.

Introduce it in stages:

1. Exact content-hash duplicate detection by the Useful Internal Version.
2. Perceptual hashes for near-duplicates and transformed copies by the Reliable Internal Version.
3. Structured metadata and visual facets by the Reliable Internal Version.
4. Model-assisted visual similarity as Full support by Mature Product, and only after its privacy, rights, scale, and evaluation behavior is proven.

Similarity is a discovery signal, not proof that two images depict the same person, share rights, match canon, or are creatively acceptable.

---

**6. Is semantic search important enough to justify embedding generation?**

**Required by:** Mature Product

**Response:**

Yes as a Mature Product capability, but not enough to justify generating embeddings for an earlier milestone or adopting a separate vector database before measured need.

Begin with full-text, typo-tolerant, faceted, and relationship-aware search. Add hybrid semantic retrieval only when reviewed use cases—such as “find scenes where this character hides fear” or “find visually similar continuity problems”—cannot be served adequately.

If adopted, embeddings must be:

- Derived, nonauthoritative, and rebuildable.
- Bound to exact source and model versions.
- Permission-filtered before retrieval.
- Inherit their sources’ access, retention, deletion, and provider-egress classifications.
- Generated only through a model and route permitted by the provider-egress classification, or within the controlled deployment.
- Excluded from provider training.
- Stored initially through a replaceable retrieval interface, preferably inside PostgreSQL.

Semantic similarity must never change Current Canon, establish rights, or make an approval decision.

---

**7. Should search explain why each result matched?**

**Basic support by:** Useful Internal Version

**Full support by:** Mature Product

**Response:**

Yes. From the Useful Internal Version, every supported exact, prefix, full-text, or relationship result should provide a concise explanation, with deeper details available progressively. Full support by Mature Product extends equivalent explanations to every supported fuzzy, image-similarity, and semantic match type.

Examples include:

- Matched character name, alias, dialogue, tag, caption, or filename.
- Matched exact phrase, typo-tolerant term, filter, relationship, or linked entity.
- Similar image hash or model-assisted visual features.
- Semantic concepts that contributed to the match.
- Lifecycle status—current, proposal, superseded, or published—and the applicable access classification, including `Access—Restricted` where relevant.

AI-generated search answers must cite exact source versions and distinguish accepted facts from proposals, findings, historical versions, and uncertain inferences. Scores alone are not explanations, and explanations must not reveal `Access—Restricted` information to unauthorized users.

---

# Priority 2 — Deployment and ownership

## 18. Where should Storyworld run at each milestone?

**Owner-response status:** ☐ Answered  ☒ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Basic support by:** Useful Internal Version

**Full support by:** Mature Product

**Choose the intended deployment posture:**

- ☐ Local machine only
- ☒ Home or private server
- ☐ Stavium-managed cloud
- ☒ Customer-managed self-hosting
- ☐ Multi-tenant SaaS
- ☒ Hybrid local and cloud

**Selected choice(s), ranking, qualifications, or additional answer:**

1. A complete customer-managed or private Storyworld deployment.
2. Hybrid operation using locally controlled storage and deterministic workers with approved hosted AI services where policy permits.
3. A home or private-server profile suitable for the owner’s family team.
4. An optional Stavium-managed service for eligible solo creators and small teams may be considered for Controlled External Pilot or a later external milestone, but no milestone currently requires it and the choice is not yet decided.
5. Broad multi-tenant SaaS is conditional and should not shape the Reliable Internal Version architecture.

**Response:**

By the Useful Internal Version, the owner needs a bounded private deployment for real internal work with governed storage, workflow state, portable output, and documented limitations. By the Reliable Internal Version, that private family-team deployment must add tested installation and upgrade procedures, secure identity and authorization, dependable backup and restore, provider-outage behavior, complete governed export and clean-install re-import, and predictable operating support.

The Mature Product deployment target is a complete Storyworld installation under the owner’s or customer’s control, including:

- Storyworld Engine and Studio.
- PostgreSQL database.
- S3-compatible object storage.
- Temporal workflow orchestration under the current accepted stack.
- Governed assets, versions, receipts, policies, and audit records.
- Local deterministic media workers.
- Self-hosted ComfyUI orchestration using policy-approved endpoints.
- External-editor and runtime connectors.

OpenRouter, fal.ai, and other hosted inference may still be used when provider-egress, retention, rights, consent, budget, and provider policies permit it.

The current stack provides local Docker Compose, PostgreSQL, MinIO, Temporal, tenant-isolation, package, and restore foundations. It does not yet prove the Useful Internal Version or Reliable Internal Version deployment requirements, customer-managed packaging, regional recovery, or full offline operation.

**Unresolved owner choice — Mature Product hosting model:** Question 18 is the sole decision owner for whether the long-term posture remains customer-managed/private installations only or also offers an optional Storyworld-hosted service for eligible solo creators and small teams. The current recommended sequence is to establish the Reliable Internal Version customer-managed/private deployment first, then consider that optional hosted service only after operational and commercial evidence supports it and the applicable external milestone is separately authorized. This recommendation is not a final choice until the owner selects one of those two postures or explicitly defers the choice.

---

**1. Must Storyworld work without internet access?**

**Basic support by:** Reliable Internal Version

**Full support by:** Mature Product

**Response:**

Full disconnected authoring and production is not required by the Reliable Internal Version, but that milestone must remain useful when a hosted AI provider or connector is unavailable.

Full support by Mature Product for an eligible locally reachable customer-managed deployment should include the following without internet access:

- Writing and editing.
- Canon, entity, timeline, and production management.
- Review of locally stored assets.
- Deterministic media processing.
- Search over locally controlled indexes.
- Package generation and export.
- Preparation and queuing of provider-dependent work.

Hosted inference, external publication, cloud synchronization, and remote authority hosts will remain unavailable until connectivity returns. Queued operations must preserve their original context and revalidate current policy, rights, consent, budget, provider route, and inputs before execution.

Browser-only offline state may preserve recoverable drafts but must not perform Add to Canon, Update Canon, Master Acceptance, approve rights, create releases, pin Canon Versions, or authorize publication without reaching an authoritative Storyworld Engine.

---

**2. Must users be able to export everything and leave the platform?**

**Basic support by:** Useful Internal Version

**Full support by:** Reliable Internal Version

**Response:**

Yes. Governed export for every workflow supported by the Useful Internal Version is required at that milestone. Complete property export, verified exit documentation, and the clean-install re-import evidence described below are required by the Reliable Internal Version. Portable export remains a permanent product requirement, not merely a migration feature.

A complete export should include, subject to rights and retention policy:

- Properties, branch-specific Current Canon pointers, Canon Revision histories, Canon Versions, entities, relationships, timelines, and narrative structures.
- Source material, accepted masters, retained candidates, renditions, and external workfiles.
- Rights, consent, restrictions, classifications, and expiry records.
- Provenance, transformation lineage, provider-independent recipes, and evaluation evidence.
- Proposals, decisions, approvals, waivers, audit receipts, releases, and publication records.
- Templates, configuration, localization, accessibility assets, and runtime or commerce packages.
- Stable identifiers, schemas, hashes, signatures, manifests, and verification instructions.

Use standard or documented formats wherever possible. When a format cannot express all Storyworld semantics, include a conversion or fidelity-loss report.

Exports must exclude credentials, access tokens, hidden provider reasoning, unauthorized third-party data, and material the user has no right to export.

---

**3. Should a property be portable between installations?**

**Required by:** Reliable Internal Version

**Response:**

Yes. A property should be exportable from one compatible Storyworld installation and imported into another while preserving stable identity, branch-specific Current Canon pointers, exact Canon Revisions and Canon Versions, assets, lineage, rights, approvals, and receipts.

Import must:

- Verify hashes, signatures, schemas, and package completeness.
- Detect identifier and ownership conflicts.
- Preserve original provenance and authority hosts.
- Migrate supported older schema versions explicitly.
- Refuse or quarantine unsupported, corrupted, or unauthorized content.
- Rebind local providers, credentials, storage, and connectors rather than exporting secrets.
- Report any lost, transformed, or unsupported semantics.

The Reliable Internal Version portability validation should export Dumpster Fire Friends, remove the local working copy, re-import it into a clean installation, and reproduce its accepted cards, hashes, lineage, rights, and receipts.

---

**4. Will several organizations share one deployment?**

**Response:**

Not in the Reliable Internal Version deployment. It should begin with one family organization containing one or more workspaces and properties.

The architecture should preserve tenant isolation so a future Stavium-managed service could host several eligible small-team organizations safely. That future option requires a separate product and operating decision covering identity, billing, quotas, support, incident response, noisy-neighbor controls, encryption, deletion, and data residency.

Customer-managed installations should default to one organization unless multi-organization operation is deliberately enabled. Organizations must never share mutable business state, assets, search results, credentials, or authority merely because they use the same infrastructure.

---

**5. Are there data-residency requirements?**

**Required by:** Reliable Internal Version

This requirement applies when an applicable policy selects a region or custody boundary.

**Response:**

Storyworld should support enforceable data-residency policies, although no specific jurisdiction or region has yet been selected.

Residency controls may need to cover:

- Database and object storage.
- Backups, replicas, and disaster-recovery copies.
- Search indexes, embeddings, caches, logs, and telemetry.
- Temporary media-processing storage.
- Provider and model processing regions.
- External-editor packages and connector transfers.

Sensitive sources—such as customer-confidential work, licensed media, information involving minors, and unreleased commercial material—may require `Provider Egress—Highly Restricted` processing inside the Storyworld-controlled boundary or an explicitly approved region-specific route. Customer-managed deployments provide the strongest direct control.

Residency must be explicit and testable; a backup or temporary processor must not silently move data into a prohibited region.

---

**6. Is local model execution a core requirement or optional?**

**Response:**

Local generative-model execution is optional and is not a core requirement under the current accepted posture.

Local deterministic processing—FFmpeg, image transforms, metadata extraction, scanning, proxies, and validation—is a core requirement. Self-hosted ComfyUI may orchestrate approved hosted endpoints, but customer management or local ComfyUI does not authorize local model weights.

Storyworld should preserve provider-neutral contracts so local or customer-controlled inference can be evaluated without assigning it to a canonical milestone. Adopting local model execution would require a successor decision covering hardware, model licensing, security, update supply chain, quality evaluation, support, cost, and sensitive-data access and provider-egress policy.

---

**7. Must media stay on local storage for some properties?**

**Required by:** Useful Internal Version

This requirement applies whenever the applicable provider-egress, rights, consent, privacy, or contractual policy requires local custody.

**Response:**

Yes. A property policy must be able to require that source media, derived media, or both remain in customer-controlled storage and never leave the Storyworld-controlled deployment boundary.

This is especially important for sources classified `Provider Egress—Highly Restricted`, sensitive family material, identifying or sensitive material involving minors, licensed assets with contractual no-hosted-processing terms, customer-confidential work, and unreleased commercial products.

Such properties should use local object storage, deterministic workers, controlled previews, and external tools operating within the permitted boundary. Remote backups, hosted inference, external-editor checkout, search embeddings, and telemetry must follow the same policy rather than receiving an implicit exception.

---

## 19. What reliability must the Reliable Internal Version demonstrate?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Required by:** Reliable Internal Version

The targets below define dependable internal family-team operation for the Reliable Internal Version, not a current implementation claim, external production-readiness guarantee, or service-level agreement. They require deployment-profile testing, backup verification, failure injection, and restore drills.

**1. How much data loss is acceptable?**

- ☒ None after acceptance
- ☐ A few minutes
- ☐ An hour
- ☐ A day

**Selected choice(s), ranking, qualifications, or additional answer:**

No acknowledged Canon Revision, Current Canon pointer, canon-acceptance receipt, accepted master, Master Acceptance decision or receipt, rights decision, release, publication authorization, or governed asset may be lost.

**Response:**

Storyworld must not report an acceptance-class action, including canon acceptance or Master Acceptance, as successful until its exact version, authoritative state, evidence, and receipt are durably committed. Recovery of a candidate or draft must never silently create a Canon Revision, advance Current Canon, pin a Canon Version, or create Master Acceptance.

Drafts should autosave frequently and provide local recovery. A small amount of unsent draft work may be recoverable rather than authoritative, but the interface must clearly distinguish saved, synchronizing, conflicted, and unsent states.

Unknown outcomes must be reconciled through idempotency records and receipts rather than repeating consequential operations blindly.

---

**2. How quickly must the system recover after failure?**

**Response:**

Recovery targets should depend on the deployment profile. Reliable Internal Version planning targets are:

- **Ordinary process, worker, or workflow failure:** automatic resume or operator recovery within approximately 15 minutes.
- **Primary managed service or database failure:** restore core writing, Current Canon, Canon Revision history, review, and existing-asset access within 4 hours.
- **Major installation or site failure:** restore the authoritative core from verified backups within 24 hours.
- **Media regeneration, search-index rebuilds, previews, and provider-dependent processing:** may recover later because they are derived or resumable.

Customer-managed deployments must declare their achieved targets during setup. Storyworld should report when backup age, replication, storage, or configuration cannot meet them. These values should become formal service objectives only after testing proves them.

---

**3. Should Canon Revisions, Current Canon pointers, and their receipts use stronger backup rules than drafts?**

**Response:**

Yes. Canon Revisions, Current Canon pointers, Canon Versions, canon-acceptance receipts, accepted masters, Master Acceptance receipts, rights and consent evidence, release packages, publication records, and other decision receipts require the strongest durability and recovery controls.

They should use:

- Transactional authoritative storage.
- Immutable or append-only history.
- Versioned object storage.
- Checksums, signatures, and reconciliation.
- Point-in-time database recovery.
- Encrypted off-site backups.
- Object-version recovery.
- Regular automated backup verification.
- Scheduled full restore drills.

Drafts still require autosave and recovery, but may use shorter retention, fewer replicas, and ordinary cleanup policies.

---

**4. Must audit records be retained permanently?**

**Response:**

Not every audit event must be retained forever. Retention should depend on record type, legal obligation, privacy, sensitivity, and operational need.

Receipts for canon acceptance, Canon Version pinning, Master Acceptance, rights, waivers, releases, publication, Storyworld Runtime Handoff Approval, Receiving-Runtime Acceptance, and commerce decisions should normally remain durable for the life of the property and any required legal or contractual period. Security access logs, diagnostics, and transient operational traces may use shorter policies.

When personal data or underlying content must be deleted, Storyworld may retain a protected minimum receipt, hash, tombstone, and deletion record where policy and law permit. Required evidence must never be deleted automatically by AI or routine cleanup.

---

**5. Should deleted properties remain recoverable for a period?**

**Response:**

Yes. Use a default 30-day recoverable deletion period, configurable within policy. During that period the property should be inaccessible in normal work but restorable by an authorized administrator.

Permanent deletion must require:

- Explicit authorized human confirmation.
- Impact analysis across shared canon, assets, packages, publications, and integrations.
- Rights, retention, legal-hold, and evidence checks.
- Revocation of active links, credentials, checkouts, and scheduled actions.
- A durable deletion receipt.

Some policies may require immediate access removal while encrypted backup copies expire on their documented lifecycle. Published history or required receipts may survive only as access-controlled minimal records.

---

**6. Do you need disaster recovery across regions?**

**Basic support by:** Reliable Internal Version

**Full support by:** Mature Product

**Response:**

The Reliable Internal Version requires encrypted, geographically separate backups with tested restoration, subject to the applicable residency and custody rules. Full cross-region disaster recovery is required by Mature Product for an approved managed service and critical customer-managed installation profiles. Active-active multi-region operation is not required by either milestone unless a later service-level decision establishes that need.

Higher-assurance Mature Product profiles may add a warm standby, replicated object storage, and automated failover after the single-region design is proven.

Cross-region recovery must obey data-residency, rights, consent, encryption-key, and no-egress restrictions. A recovery copy cannot be placed in another region merely because doing so improves availability.

---

**7. Who is expected to operate and support the system?**

**Response:**

Responsibilities should follow the deployment model:

- **Private owner deployment:** the owner or designated workspace administrator manages users, policies, budgets, providers, retention, and content authority; Stavium supplies application tooling, updates, documentation, and support.
- **Stavium-managed deployment, if later approved:** Stavium operates application infrastructure, migrations, monitoring, backups, restoration, and incident response; customers retain authority over their content, canon, rights, approvals, and publication.
- **Customer-managed deployment:** the customer operates infrastructure, storage, identity integration, backups, and local security; Stavium supplies supported packages, upgrade paths, diagnostics, verification tools, and bounded support.
- **External providers and authority hosts:** OpenRouter, fal.ai, Commerce Foundry, runtimes, editors, and publication destinations remain responsible for their own systems and narrow authority domains.

Support access must be time-limited, least-privilege, consented where required, and audited. Prefer privacy-preserving diagnostic and evidence packages over unrestricted impersonation or database access.

AI may monitor health, summarize incidents, recommend remediation, and perform pre-authorized reversible maintenance. It may not delete governed evidence, change security or provider policy, grant itself access, or make creative and authority decisions.

---

# Priority 2 — Identity and security

## 20. What identity system must each internal milestone use?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Basic support by:** Useful Internal Version

**Full support by:** Reliable Internal Version

**Current-state qualification:**

Storyworld currently has a development/mock identity provider that issues signed test tokens. It is not sufficient for the Useful Internal Version or Reliable Internal Version identity requirements.

Accepted `DEC-0021` requires alpha acceptance-class commands to come from a verified human `property_owner` bound to the target organization and property. Reliable Internal Version identity, delegation, expiring roles, guests, multiple roles, and cross-host verification remain unresolved reserved work.

The Proof may use a bounded owner-and-family-team identity path, but it must demonstrate negative authorization for acceptance-class actions. The Useful Internal Version requires verified internal identities, secure sessions, explicit family-team invitations, property and workspace permissions, and distinct human and service identities for its supported workflows. The Reliable Internal Version requires the selected replaceable identity adapter, passkeys or an equivalently strong method, recovery and revocation, workload identity, auditable scoped delegation, and tested reauthentication behavior.

The Reliable Internal Version deployment is for one private family organization and does not require public registration, multi-tenant account administration, enterprise workforce management, SAML, SCIM, domain discovery, or department hierarchies. Public registration may be considered only as part of a separately authorized Public Self-Service milestone and identity decision.

Reliable Internal Version authentication should use a replaceable, standards-based identity adapter. Storyworld must independently enforce its own organization, workspace, property, resource, role, and action permissions.

**1. Is there an existing identity provider?**

**Response:**

No Reliable Internal Version identity provider has been verified or selected. Commerce Foundry and Storyworld may share sign-in through a common OIDC-compatible provider if a later explicit decision requires it; no canonical milestone currently does. They must remain separate authorization systems.

The current mock provider may support bounded Proof work only; it must not be treated as the identity basis for real accepted work in the Useful Internal Version. The Reliable Internal Version identity decision and validation must cover:

- Identity-provider selection and hosting.
- Passkeys and passwordless email recovery.
- Explicit invitations for family-team members.
- Account linking across sign-in methods.
- Session, reauthentication, and revocation policies.
- Service and workload identities.
- Deployment-local or emergency administration.
- Audit and privacy requirements.

The Dumpster Fire Friends Proof needs only a small owner-and-family-team identity demonstration. It must still show that an agent, service, wrong workspace, wrong property, wrong role, or expired session cannot perform an acceptance-class action.

---

**2. Which identity methods should Storyworld support?**

- ☒ Google
- ☐ Microsoft
- ☐ GitHub
- ☒ Passkeys
- ☒ Email login
- ☐ Enterprise SSO
- ☒ Local accounts

**Selected choice(s), ranking, qualifications, or additional answer:**

Recommended order:

1. Passkeys.
2. Passwordless email login and recovery.
3. Google sign-in for convenient family-team access.
4. Deployment-local accounts for private, customer-managed, offline, or emergency administration.
5. Microsoft only if Useful Internal Version users or later small-team customers demonstrate a need.
6. GitHub only if later technical-user demand justifies it.
7. Enterprise SSO only if a future customer or integration requires it.

Storyworld should retain an OIDC-compatible identity boundary for replaceability and possible Commerce Foundry shared sign-in. Enterprise SSO is not required by the Useful Internal Version or Reliable Internal Version and remains conditional on a separate future customer or integration need.

**Response:**

Normal users should receive a simple passwordless experience. Passkeys should be preferred, with verified email recovery and Google sign-in where useful.

Storyworld should identify federated users by stable issuer-and-subject identifiers rather than email address alone. Linking two login methods must require an authenticated, explicit action so matching email addresses cannot silently merge accounts.

Local accounts should not become a parallel weak password system. They should be limited to deployment profiles that genuinely require them, use passkeys or strong MFA where possible, and include secure bootstrap, recovery, lockout, rotation, and audit procedures.

---

**3. Will service accounts and agents need identities?**

**Response:**

Yes. Every agent, worker, scheduler, connector, runtime adapter, and service-to-service integration must use a distinct non-human identity. They must never borrow a human account or make an action appear to have been performed by the initiating person.

Use workload identity, OAuth client credentials, mutual authentication, or short-lived service credentials with:

- Exact organization, workspace, property, resource, and version scope.
- Permitted commands and destinations.
- Provider, model, workflow, cost, and attempt limits.
- Expiration, rotation, and revocation.
- Correlation to the initiating human or workflow.
- Complete audit attribution.

The Reliable Internal Version does not need a complex customer-facing service-account administration system. It still needs secure internal workload identities and clear attribution.

Agents should receive short-lived capability leases and may write only to permitted proposal, staging, or execution paths. Models, services, tools, and connectors may not perform Add to Canon, Update Canon, Creative Approval, or Master Acceptance, approve rights, waive blockers, pin a Canon Version, authorize publication, or grant themselves additional access.

---

**4. Can a person hold multiple roles at once?**

**Response:**

Yes. Solo creators and small teams frequently require one person to act as creator, editor, reviewer, approver, rights coordinator, and operator.

Roles must remain separate scoped assignments rather than collapsing into one all-powerful label. Each decision must record:

- The role used for that action.
- Organization, workspace, property, production, resource, and version scope.
- Delegating authority where applicable.
- Start, expiry, and revocation.
- Any required independent review or separation of duties.

Storyworld should not impose large-team bureaucracy or require separate people merely to simulate an enterprise workflow. Holding several roles must still not bypass a policy that genuinely requires another person. Where self-acceptance is allowed, Storyworld should clearly show it and record a distinct acceptance receipt.

---

**5. Should high-impact decisions require re-authentication?**

**Response:**

Yes, but narrowly. A governance profile may permit routine Add to Canon, Update Canon, Master Acceptance, or Creative Approval within a valid verified session. Storyworld should not require reauthentication for every routine canon-acceptance, Master Acceptance, or Creative Approval decision.

Step-up authentication should be required for genuinely high-risk actions such as:

- Authorizing external publication.
- Approving sensitive likeness, cloned voice, or rights use.
- Waiving a permitted blocker.
- Exporting material classified `Provider Egress—Highly Restricted`.
- Permanently deleting governed evidence or a property.
- Transferring ownership or granting consequential administrative roles.
- Changing credentials, provider-egress rules, retention, encryption, or security policy.
- Performing unusually consequential Add to Canon, Update Canon, or Master Acceptance when the property policy or current risk signals require it.

Use a passkey or similarly phishing-resistant method. Reauthentication should be recent, short-lived, and bound to a clearly displayed action and scope. It confirms identity but does not create permission or cure a missing approval.

Routine drafts, comments, reviews, low-consequence work, and ordinary acceptance actions should remain fast and should not repeatedly interrupt the user.

---

**6. Should mobile approvals require biometric or passkey confirmation?**

**Response:**

Yes for the same high-risk actions that require step-up authentication, but not for every routine mobile review or approval.

A valid authenticated session may be sufficient for comments, findings, routine creative review, conditional Creative Approval, and ordinary Add to Canon, Update Canon, or Master Acceptance where the governance profile permits it. Higher-risk canon acceptance, Master Acceptance, or Creative Approval may require step-up authentication or an independent reviewer under that profile. Publication, sensitive rights or likeness decisions, waivers, exports of material classified `Provider Egress—Restricted` or `Provider Egress—Highly Restricted`, permanent deletion, ownership changes, and security-policy changes should require a device-bound passkey with local user verification.

Face, fingerprint, or device-PIN verification should remain inside the operating system or authenticator; Storyworld must never receive or store biometric data.

Provide secure alternatives for accessibility, device loss, and account recovery, such as another passkey or hardware security key. SMS should not be the preferred high-impact authentication factor.

---

**7. Must approvals ever meet legal electronic-signature requirements?**

**Response:**

Not for the Useful Internal Version or Reliable Internal Version. Storyworld’s exact-version identity, authority, hash, timestamp, rationale, and receipt model is sufficient for internal creative, canon, rights-workflow, commerce, channel, and runtime evidence.

Storyworld must not represent these receipts as legally binding electronic signatures or legal clearance by default.

If a future contract, jurisdiction, regulated customer, or legally binding consent workflow requires formal electronic signatures, Storyworld should integrate a qualified signature provider through a versioned adapter. That workflow would require separate legal review of identity assurance, intent to sign, document presentation, consent, timestamps, evidence retention, revocation, and verification.

---

**8. Should an administrator automatically have access to creative material classified `Access—Restricted`?**

**Response:**

No. Infrastructure, workspace, or identity administration must not automatically grant access to sources classified `Access—Restricted`, hidden canon, access-controlled notes, credentials, or other sensitive creative material.

The owner may hold both administrator and content-authority roles in the Reliable Internal Version deployment, but content access must come from the applicable property or resource permission—not merely from being an administrator.

Access to `Access—Restricted` content requires a separate explicit permission and legitimate purpose. Exceptional support or emergency access must be:

- Time-limited and least-privilege.
- Limited to exact resources and actions.
- Approved or consented to where required.
- Clearly disclosed to affected owners.
- Fully audited with reason and outcome.
- Revoked automatically when the access window ends.

Prefer privacy-preserving diagnostics, redacted evidence packages, customer-run checks, and customer-managed encryption keys over unrestricted impersonation or database access.

---

# Priority 2 — AI and agents

## 21. What may AI do without asking first?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

| AI action | Automatic | Proposal only | Never | Conditions / notes |
| --- | :---: | :---: | :---: | --- |
| Extract facts from sources | ☒ | ☐ | ☐ | May automatically create non-authoritative assertions with source, exact version, evidence, and confidence. Extracted facts never enter Current Canon automatically. |
| Create canon proposals | ☐ | ☒ | ☐ | May prepare an exact-version proposal and impact analysis, but only an authorized human may perform Add to Canon or Update Canon. |
| Plan an arc | ☐ | ☒ | ☐ | May generate alternatives, rationale, dependencies, and previews. Binding an arc to an approved production plan requires human confirmation. |
| Draft scenes | ☒ | ☐ | ☐ | May create clearly labeled, reversible drafts within policy and budget. Drafts are not in Current Canon and are not accepted narrative or release content. |
| Generate images | ☒ | ☐ | ☐ | May create candidates within approved provider, rights, egress, workflow, and spending limits. Expensive or batch work requires confirmation. |
| Revise one asset region | ☐ | ☒ | ☐ | May prepare a mask, interpretation, and preview automatically. Applying a medium-consequence regional change requires confirmation and creates a new candidate. |
| Flag continuity issues | ☒ | ☐ | ☐ | May create evidence-backed findings automatically. Interpretive findings remain uncertain and cannot reject or waive work by themselves. |
| Suggest waivers | ☐ | ☒ | ☐ | May identify that a blocker appears waivable and draft options with evidence, but must also show non-waiver remedies. It may never grant a waiver or make a legal conclusion. |
| Build a release package | ☒ | ☐ | ☐ | May assemble and validate an exact draft package for review. It may not approve the package, create authority, or publish it. |
| Translate content | ☒ | ☐ | ☐ | May create draft translations and localization renditions. Protected terms, claims, disclosures, canon facts, and accessibility content require applicable review. |
| Suggest experiment variants | ☒ | ☐ | ☐ | May create bounded, nonauthoritative variants within approved budgets and experiment rules. It may not select a winner or promote it automatically. |
| Recommend Add to Canon or Update Canon | ☐ | ☒ | ☐ | Must remain an evidence-backed proposal showing impact, uncertainty, affected Canon Revisions, Canon Versions, productions, and alternatives. |
| Submit work for review | ☒ | ☐ | ☐ | May automatically move eligible candidates or proposals into Storyworld’s internal Review Queue only under a creator-enabled workflow rule that identifies the applicable work, conditions, and internal review destination. Without an applicable rule, AI may prepare a submission proposal but must wait for confirmation. |
| Transcribe or analyze media | ☒ | ☐ | ☐ | May run automatically within provider-egress, consent, retention, and budget policy. Transcripts and derived metadata remain reviewable and correctable. |
| Create previews and alternate candidates | ☒ | ☐ | ☐ | May run automatically when low-consequence, reversible, visible, and within allowance. |
| Quarantine clear technical failures | ☒ | ☐ | ☐ | May automatically hide malware, corruption, failed checksums, invalid packages, or unreadable files from normal presentation while retaining required evidence. |
| Apply a medium-consequence change | ☐ | ☒ | ☐ | Must show the interpretation, plan, affected versions, preservation constraints, cost, and approval impact before application. |
| Add to Canon or Update Canon | ☐ | ☐ | ☒ | AI may draft proposals, compare Canon Revisions, identify conflicts, and recommend acceptance, but only an authorized human may perform canon acceptance. |
| Prepare a Canon Version or pin proposal | ☐ | ☒ | ☐ | AI may prepare the exact manifest, impact summary, and proposed downstream pin. It may not include drafts, change Current Canon, or silently repin a production. An authorized human action or an already authorized deterministic workflow must select the exact Canon Version and destination. |
| Accept an asset as master | ☐ | ☐ | ☒ | AI may evaluate candidates, identify problems, compare versions, and recommend Creative Approval or Master Acceptance. It may not record Creative Approval or perform Master Acceptance. AI-generated or AI-edited output remains a candidate. |
| Accept a final edit or channel package | ☐ | ☐ | ☒ | AI may evaluate and recommend but cannot create authoritative acceptance. |
| Approve rights, consent, likeness, or voice use | ☐ | ☐ | ☒ | Requires the applicable authorized human authority; AI provides evidence and workflow support only. |
| Grant a waiver | ☐ | ☐ | ☒ | AI may never waive a rights, policy, continuity, or technical blocker. |
| Authorize external publication | ☐ | ☐ | ☒ | Requires human authorization of the exact package, destination, metadata, disclosures, timing, and execution scope. |
| Permanently delete governed evidence | ☐ | ☐ | ☒ | Requires an authorized human and all retention, legal-hold, rights, and dependency checks. |
| Change provider-egress policy for sensitive material | ☐ | ☐ | ☒ | Requires an authorized human security or policy decision. |

**Qualification:**

“Automatic” means Storyworld may perform a low-consequence action, create a visible nonauthoritative draft, candidate, finding, preview, or package, or move eligible work into Storyworld’s internal Review Queue without another confirmation after the creator has enabled a clearly scoped workflow rule and any required budget. For automatic internal review submission, the rule must identify the applicable work, conditions, and internal review destination; it is not blanket permission for unrelated submissions. Without an applicable rule, submission remains proposal-only and requires confirmation. “Automatic” never means silent acceptance.

Automatic internal review submission only progresses candidates or proposals into review. It does not record Creative Approval, perform Add to Canon, Update Canon, or Master Acceptance, create a Canon Revision, pin a Canon Version, approve the work, clear rights, authorize a release, publish anything, or otherwise create an authoritative outcome. Submission or communication to external people, organizations, or systems requires separate prior authorization covering the recipient and destination, or confirmation at the time of submission. Human review and acceptance remain required for consequential outcomes.

Medium-consequence changes require a previewable plan and confirmation. High-consequence actions remain human-only. Every retained AI operation must remain inspectable, attributable, versioned, reversible, and interruptible where technically supported.

If an operation becomes more expensive, sensitive, ambiguous, or consequential than expected, Storyworld must pause. For Dumpster Fire Friends, AI may extract proposed character facts, draft card copy, generate artwork candidates, create text-layout variants, and run continuity checks automatically. The owner must use Add to Canon or Update Canon for final card facts, perform Master Acceptance for exact artwork candidates, accept any final edits or channel packages, create releases, and authorize publication through the applicable separate actions.

---

## 22. Which AI constraints are essential?

**Owner-response status:** ☐ Answered  ☒ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Current-state qualification:**

The current alpha has a narrow fal.ai still-image adapter and does not yet have the full OpenRouter integration, named task profiles, the complete Mature Product provider-policy surface, pre-submit cost controls, a temporary Storyworld Agent Mission runner, or an Octon Agent Mission adapter. The answers below define target owner direction. Safe provider-egress, retention, training, rights, consent, and budget controls are required whenever an earlier milestone uses a provider; Mature Product policy breadth does not defer those safeguards. The target direction requires successor decisions, contracts, provider evaluation, and prototypes before implementation claims are appropriate.

**1. Must local models be supported by the Proof or Useful Internal Version?**

**Response:**

No. Local generative-model execution is not required by the Proof or Useful Internal Version and is not authorized under the current accepted posture. No later canonical milestone currently requires it; adopting it would require the separate decision described below.

Local deterministic processing—media inspection, scanning, proxies, format conversion, image transforms, and FFmpeg-based operations—is required. Self-hosted ComfyUI may orchestrate approved hosted endpoints, but it does not authorize local model weights.

Storyworld should preserve provider-neutral contracts so local or customer-controlled inference can be evaluated without assigning it to a canonical milestone. Adding local models requires a successor decision covering hardware, licensing, model provenance, security, updates, evaluation, support, cost, and sensitive-data access and provider-egress policy.

---

**2. Which hosted providers are acceptable?**

**Response:**

OpenRouter and fal.ai should be the first strategic hosted integrations:

- **OpenRouter:** language, multimodal reasoning, structured planning, extraction, drafting, translation, and model-assisted evaluation.
- **fal.ai:** image, video, audio, speech, transformation, and separately approved media-generation capabilities.

Acceptance must be per provider, underlying model or endpoint, version, task profile, data class, region, retention behavior, training policy, quality evidence, cost, and operational reliability. Approval of OpenRouter does not automatically approve every underlying provider or model, and approval of fal.ai does not approve every endpoint.

Future direct or specialized providers may be added through replaceable adapters after capability-specific evaluation. No provider receives universal approval or authority over Storyworld records.

---

**3. May providers retain prompts or outputs?**

**Response:**

Not by default for material classified `Provider Egress—Private`, `Provider Egress—Restricted`, or `Provider Egress—Highly Restricted`, or for other production-sensitive work.

Storyworld should:

- Prefer or require zero-retention routes.
- Disable fal.ai request storage by default.
- Use short-lived media URLs.
- Download admitted outputs immediately.
- Treat provider URLs as temporary transport.
- Record what was sent, where, when, and under which policy.
- Never use provider storage as the Storyworld asset library.

Less restrictive retention may be allowed only when the exact provider-egress classification permits it and an explicit property or production policy authorizes it. Law, contract, rights, consent, or no-egress rules cannot be overridden.

---

**4. May provider data be used for training?**

**Response:**

No by default. Storyworld must not permit provider training with prompts, sources, references, voice, likeness, customer work, drafts, or outputs merely because a provider’s general terms allow it.

Training use requires an explicit permission covering the exact material, rights holder, purpose, provider, model or program, duration, and revocation terms. The property policy and provider-egress rules must also permit it.

Sources classified `Provider Egress—Restricted` or `Provider Egress—Highly Restricted`, identifying or sensitive information involving minors, revoked consent, customer-confidential work, and material with contractual no-training terms must never be enabled for provider training.

---

**5. Should each property define an AI-provider policy?**

**Response:**

Yes. Each property should inherit a safe workspace baseline and may define stricter property-specific rules for:

- Allowed providers, models, endpoints, and task profiles.
- Provider-egress ceilings.
- Retention, collection, caching, and training.
- Real-person photographs, voices, likenesses, and cloning.
- Licensed and sensitive sources, with separate access and provider-egress defaults.
- Automatic fallback and retry.
- Spending and generation allowances.
- Automatic, proposal-only, and human-only actions.
- Reproducibility and required provenance.
- Advanced Operator Mode access.
- External tools and hosted workflow nodes.

Templates should provide understandable presets with separate access and provider-egress defaults. **Standard private** should default to `Access—Internal` and `Provider Egress—Private`; **Sensitive data** should default to `Access—Restricted` and `Provider Egress—Highly Restricted`; **Public production** should default to `Access—Public` and `Provider Egress—Public`; and **No hosted processing** should leave the access classification unchanged while applying `Provider Egress—Highly Restricted` plus a non-exceptionable prohibition on hosted processing. These presets do not bypass operation-specific rights, consent, retention, training, regional, provider, model, or destination checks. Nontechnical users should not need to configure provider parameters.

A property policy may tighten the workspace baseline. It must not silently weaken rights, consent, legal, security, or no-egress restrictions. Within each classification dimension, the most protective applicable rule wins, and overriding legal, rights, consent, privacy, or contractual restrictions still apply; this does not merge access and provider-egress classifications.

---

**6. What spending limits are required?**

- ☒ Per generation
- ☒ Per production
- ☒ Per day
- ☒ Per user
- ☒ Per workspace

**Selected choice(s), ranking, qualifications, or additional answer:**

Also support per-command, per-batch, weekly, monthly, and total campaign or release limits. Limits may be hard ceilings or confirmation thresholds.

**Response:**

Storyworld should:

- Allow small jobs to run within an approved allowance.
- Show an estimate before every batch operation.
- Say when a reliable estimate is unavailable and wait for confirmation.
- Require confirmation before exceeding any applicable allowance.
- Pause when price, route, scope, retry count, or expected output count materially changes.
- Attribute estimated and actual cost to the workspace, member, property, production, command, provider, and budget.
- Prevent retries, fallback, queued work, and Agent Missions from bypassing the same budget.
- Support lower-cost preview profiles without weakening privacy, rights, or quality requirements.

The Reliable Internal Version deployment may use workspace-admin credentials with per-member authorization, attribution, and budgets. Members do not need access to the underlying provider secret.

**Unresolved owner choice — provider-credential scope:** Question 22 is the sole decision owner for choosing one workspace-admin OpenRouter/fal.ai credential set, separate credentials for each member, or a hybrid model for the Proof and Useful Internal Version. The current recommended default is one workspace-admin credential set with Storyworld-level member permissions, usage attribution, and budgets while preserving the later member-specific option. This recommendation is not a final choice until the owner selects or explicitly defers one of the three scopes.

---

**7. Should model confidence be displayed, even when it is not statistically calibrated?**

**Response:**

Uncertainty should always be visible, but an uncalibrated model score must not be presented as a reliable probability.

Storyworld should show:

- A clear qualitative uncertainty level where useful.
- Whether the value is measured, model-reported, heuristic, or uncalibrated.
- Supporting evidence and exact source versions.
- Known limitations, conflicting evidence, and missing context.
- The model, task profile, and evaluation version when advanced details are requested.
- What consequence the uncertainty has for review or automation.

Avoid false precision such as “93% correct” unless the score has been validated and calibrated for that exact task and population. Confidence alone must never perform Add to Canon or Update Canon, establish identity, clear rights, waive a blocker, or approve creative work.

---

**8. How should governed Agent Missions be defined and executed before and after Octon becomes available?**

**Response:**

**Terminology:**

- **Agent Mission:** A bounded, durable assignment given to an AI agent. It specifies a purpose, pinned inputs and versions, expected outputs, permitted capabilities, limits, checkpoints, stop conditions, and required evidence.
- **Capability lease:** A temporary, narrowly scoped permission grant covering only the tools, data, providers, actions, and destinations needed for an Agent Mission.
- **Interactive Narrative Mission:** An authored story or gameplay unit—such as a quest—with prerequisites, triggers, choices, outcomes, and state effects. It is separate from an Agent Mission.

This response uses **Agent Mission** for the governed AI assignment and does not use the unqualified term “mission” for that concept.

**Architectural decision:**

- Storyworld natively owns the Agent Mission contract, governance, and authoritative records.
- When Octon becomes available and its integration is separately authorized, it should execute Agent Missions through a replaceable adapter.
- Storyworld must not outsource authority over Add to Canon, Update Canon, Canon Version pinning, assets, rights, budgets, approvals, or publication to Octon.
- Storyworld should not build a second full agent platform that duplicates or competes with Octon.

**Before Octon is available:**

- Define provider-neutral Agent Mission and capability-lease interfaces before Octon is available.
- Provide only a thin, tightly scoped Storyworld runner for essential approved workflows.
- Use Temporal for durable workflow coordination, including waiting, retries, cancellation, resumability, and unknown-outcome handling.
- The temporary runner must not become a general-purpose agent framework, a second business database, or a hidden authority system.
- A small reference runner may remain after Octon integration for testing and strictly limited fallback, but not as a parallel production agent platform.

**After Octon becomes available:**

- An Octon adapter receives the same versioned Agent Mission contract and capability lease.
- Octon performs permitted agent planning, reasoning, and tool execution.
- Octon returns candidates, logs, costs, and execution evidence.
- Storyworld retains Agent Mission governance, authoritative status, human gates, and final acceptance.
- The transition to Octon should replace the temporary general execution path without changing Storyworld’s domain authority.

**Required Agent Mission controls:**

- Purpose, exact inputs, pinned versions, and expected outputs.
- Allowed tools, commands, providers, models, data, and destinations.
- Access and provider-egress limits.
- Cost, time, token, media, retry, and attempt ceilings.
- Expiration and cancellation.
- Required checkpoints, evaluations, evidence, and human gates.
- Staging destinations and prohibited actions.
- Correlation, receipts, resumability, and unknown-outcome handling.

**Intended execution flow:**

1. Storyworld creates and validates the Agent Mission.
2. Storyworld pins the relevant Canon Version, assets, rights, policies, and other context.
3. Storyworld issues a limited capability lease.
4. Temporal coordinates the durable workflow.
5. The temporary Storyworld runner executes before Octon is available; the Octon adapter executes afterward.
6. Outputs enter staging as candidates and evidence.
7. The Agent Mission pauses at ambiguity, budget, permission, or human-authority boundaries.
8. A person reviews consequential results.
9. Only Storyworld records an accepted authoritative outcome and its receipt.

**Authority and completion boundaries:**

- Agents may perform low-consequence analysis, drafting, candidate generation, evaluation, and package preparation.
- Agents may not independently perform Add to Canon, Update Canon, Creative Approval, or Master Acceptance, pin or repin a Canon Version, clear rights, expand budgets, or authorize publication.
- Completion of an Agent Mission means that results and evidence are available for review; it does not mean those results have been accepted.

This response records target owner direction. It does not claim that Octon or the full Agent Mission system currently exists, and it does not defer all Agent Mission support until Octon is complete.

---

# Priority 3 — Accessibility and device support

## 23. What accessibility commitment should Storyworld make?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Basic support by:** Useful Internal Version

**Full support by:** Reliable Internal Version

**Current-state qualification:**

The current Studio has useful keyboard and automated accessibility regression tests, but automated checks do not establish WCAG conformance. Real-browser, screen-reader, zoom/reflow, forced-colors, touch, RTL, IME, and complex-editor testing remain incomplete, especially for future graphs, timelines, matrices, media editors, and mobile decision surfaces.

The Proof requires accessibility testing appropriate to its bounded workflow but does not establish conformance. The Useful Internal Version requires keyboard operation, structured alternatives, accessible status and error handling, and accessible outputs across its supported core creator journey and editor. The Reliable Internal Version requires documented WCAG 2.2 AA evidence for its critical supported workflows. Any surface added at Controlled External Pilot, Limited Paid Beta, Public Self-Service, or Mature Product must meet the same applicable baseline before it becomes supported; advanced capability timing never defers a necessary accessibility safeguard.

**1. Should WCAG 2.2 AA be a formal milestone requirement?**

**Required by:** Reliable Internal Version

**Response:**

Yes. WCAG 2.2 AA should be the formal baseline for Storyworld-owned Studio surfaces, critical workflows, and generated first-party outputs.

Reliable Internal Version evidence must cover complete tasks and relevant states—not only isolated components—including:

- Writing and editing.
- Search and navigation.
- Proposal and review.
- Add to Canon, Update Canon, and Master Acceptance.
- Rights and accessibility review.
- Release and publication authorization.
- Error, permission, stale, conflict, unavailable, and unknown states.
- Desktop, narrow-screen, keyboard, touch, and assistive-technology use.

Automated tools should remain regression gates, not conformance claims. Formal claims require manual testing, real browsers, applicable screen-reader testing, and documented scope and limitations.

Accessibility evidence must cover the complete Master Acceptance workflow, including candidate review, validation errors, stale-version and conflict states, permissions, policy blockers, confirmation, and the resulting accepted-master and receipt states. Creative Approval, when separately required, must remain distinguishable from Master Acceptance throughout that workflow.

---

**2. Must all authoring functions work by keyboard?**

**Basic support by:** Useful Internal Version

**Full support by:** Reliable Internal Version

**Response:**

Yes. Every Storyworld-owned authoring, review, and decision outcome supported at a milestone must be achievable without a mouse, touch gesture, drag action, or voice input. The Useful Internal Version applies this requirement to its core journey and editor; the Reliable Internal Version must validate it across every critical supported internal workflow.

Visual operations such as graph connections, spatial placement, masks, regions, timelines, keyframe-like intent, and media ranges must provide structured, numeric, command-based, or text-driven alternatives. Direct manipulation may remain available for efficiency, but it cannot be the only path.

Focus order and state must remain visible and predictable. No single shortcut or accidental Enter keypress may perform Add to Canon or Update Canon, pin a Canon Version, waive a finding, release a package, publish, delete evidence, or perform another consequential action.

---

**3. Must graph editing itself work with screen readers, or is an equivalent structured interface sufficient?**

**Required by:** Useful Internal Version

This requirement applies whenever a visual graph is part of a supported workflow.

**Response:**

A complete equivalent structured interface is sufficient, provided it offers the same meaningful information, editing commands, validation, impact review, and authority boundaries as the visual graph.

Every graph must have a synchronized outline, table, matrix, or form-based interface using the same stable IDs and Engine commands. It must support:

- Creating, editing, connecting, and removing permitted objects.
- Inspecting node and edge meaning.
- Searching, filtering, grouping, and navigating.
- Understanding hidden-item counts and scope.
- Reviewing validation, conflicts, and affected work.
- Opening the same consequence and decision workflows.

The visual graph should still provide useful semantics, accessible names, keyboard navigation, focus, and selection where practical. Screen-reader users must not receive a read-only or materially weaker fallback.

---

**4. Must complex editors support:**

**Basic support by:** Useful Internal Version

**Full support by:** Reliable Internal Version

- ☒ Screen readers
- ☒ 200% or 400% zoom
- ☒ Forced colors
- ☒ Reduced motion
- ☒ Voice control
- ☒ Touch
- ☒ Right-to-left text
- ☒ Input method editors

**Selected choice(s), ranking, qualifications, or additional answer:**

All apply to Storyworld-owned complex editors. Where a dense visual surface cannot remain practical at high zoom or on a narrow viewport, it must switch to a single-pane or structured mode without losing essential functionality.

**Response:**

Complex editors should support:

- Semantic structure, names, roles, states, errors, and live-status announcements for screen readers.
- Text resizing to at least 200% and reflow at 400% or the equivalent 320-CSS-pixel viewport.
- Forced-colors and high-contrast modes without color-only meaning.
- Reduced motion while preserving progress, selection, and change feedback.
- Operating-system voice control through stable visible labels and accessible names.
- Storyworld text and voice commands as supplemental input, never the only accessible path.
- Touch targets and non-drag alternatives.
- RTL and mixed-direction content without reversing narrative or timeline semantics incorrectly.
- IME composition without premature save, validation, shortcut activation, or command execution.

Accessibility must be tested on the composed Storyworld workflow rather than inferred from an editor or component library. A complex editor introduced after the Reliable Internal Version must satisfy the same applicable baseline before that editor is considered supported; assigning its advanced feature set to Mature Product does not defer accessibility.

---

**5. Should generated and imported content require accessibility metadata before release?**

**Required by:** Useful Internal Version

This requirement applies to every supported release-package workflow.

**Response:**

Yes, whenever the medium and destination make that metadata applicable. A release should require either the necessary accessibility artifact or an explicit, reviewed “not applicable” disposition.

Examples include:

- Images and graphics: alt text or an explicit decorative designation.
- Video: captions, subtitle language, transcript, and audio-description status.
- Audio: transcript, speaker identification, and relevant sound information.
- Documents, EPUB, and PDF: language, headings, reading order, links, table structure, and tagged-output validation.
- Interactive content: accessible names, instructions, focus behavior, keyboard and touch operation, reduced-motion behavior, and equivalent alternatives.
- Print: readable typography, contrast, logical structure, and accessible digital companion where required.

AI may draft captions, transcripts, alt text, descriptions, and metadata, but applicable human or policy review remains required. Accessibility assets must bind to exact content versions and locales. Missing mandatory accessibility information should automatically block the affected release package.

For Dumpster Fire Friends, each card should preserve exact readable text, sufficient contrast, meaningful alt text, logical reading order, and an accessible text equivalent independent of the illustrated card image.

---

**6. Who may waive an accessibility finding?**

**Response:**

Only the property owner or an explicitly delegated accessibility or release authority may waive a finding, and only when the applicable policy, destination, contract, and law allow waiver.

A waiver must record:

- Exact criterion, finding, asset, rendition, locale, channel, and version.
- User impact and affected audience.
- Evidence and reason.
- Alternative accommodation or mitigation.
- Scope, expiry, and re-evaluation trigger.
- Approver identity, role, and receipt.

AI may explain a finding and suggest remediation, but it may not grant a waiver or claim legal compliance. Missing essential access, destination-mandated requirements, and non-waivable legal or contractual blockers must remain blocked.

A solo creator may self-waive where policy permits, but Storyworld must clearly show the consequence and distinguish the waiver from successful accessibility conformance.

---

## 24. What must mobile support?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Choose what must be fully supported on phones:**

- ☒ Read Current Canon and pinned Canon Versions
- ☒ Search
- ☒ Comment
- ☒ Annotate images
- ☒ Annotate audio/video
- ☒ Accept an asset as master
- ☒ Add to Canon or Update Canon
- ☒ Waive findings
- ☒ Approve rights
- ☐ Create releases
- ☒ Authorize publication
- ☒ Make light text edits
- ☒ Review assignments
- ☒ Monitor jobs

**Selected choice(s), ranking, qualifications, or additional answer:**

Phone support should center on a purpose-built Decision Inbox rather than a compressed desktop workspace. Creating and composing release packages remains desktop or tablet work, but an exact, already prepared package may be reviewed and authorized on a phone.

Assignments are a Mature Product capability; they are not present in the accepted alpha collaboration model.

**Response:**

A phone decision flow should show:

1. The exact subject and version.
2. Preview and annotations.
3. Diff or change summary.
4. Source, provenance, rights, accessibility, and blockers.
5. Consequences and affected work.
6. Applicable actions—such as Add to Canon, Update Canon, Accept an asset as master, approve, reject, revise, waive, or escalate.
7. Required authority and reauthentication.
8. The resulting receipt and status.

For an asset candidate, the authoritative mobile action must be labeled **Accept an asset as master** and must create Master Acceptance only after the same exact-version, permission, evaluation, and policy checks required on larger screens. Mobile creative review or Creative Approval does not establish master status. If Creative Approval is separately available or required, it must be labeled explicitly and remain distinct from Master Acceptance.

For a canon proposal, the authoritative mobile action must be labeled **Add to Canon** or **Update Canon** as applicable. It must identify the exact proposal, property, branch, and prior Canon Revision; create a Canon Revision and receipt; and advance Current Canon only after the same validation, permission, and policy checks required on larger screens. It must remain distinct from selecting or repinning a Canon Version.

High-impact mobile decisions require the same authorization, evidence, checks, and passkey-based step-up rules as desktop. A small screen must never reduce the evidence or hide material consequences merely to keep the action available.

No swipe gesture, notification action, or single accidental tap may perform Add to Canon, Update Canon, or Master Acceptance, pin a Canon Version, approve rights, waive a blocker, create a release, authorize publication, or make a runtime or commerce decision.

---

**Which actions should be prohibited on phones?**

**Response:**

The supported phone surface should exclude:

- Full world building or large-scale Current Canon restructuring.
- Dense graph, map, floor-plan, or timeline editing.
- Complex branch merging, migrations, retcons, or shared-universe impact resolution.
- Full image, video, audio, animation, 3D, or print-layout authoring.
- Multi-track audio/video editing, precision masks, keyframes, grading, or compositing.
- Broad asset curation or consequential bulk actions.
- Large rights, localization, accessibility, or release matrices.
- Creating or assembling release packages.
- Bulk Add to Canon or Update Canon actions, bulk Canon Version repinning, bulk waivers, bulk rights decisions, or bulk publication authorization.
- Provider credentials, encryption, deployment, retention, or security-policy configuration, except narrowly designed emergency revocation.
- High-cost batch generation or unattended mission configuration.
- Any consequential action through a swipe-only or context-reduced interaction.

Phones may still show status, evidence, blockers, and escalation options for these workflows. When the full context cannot be presented reliably, Storyworld should preserve the decision and direct the user to a larger-screen interface rather than permitting an unsafe reduced-context action.

---

# Priority 3 — Templates, customization, and extensibility

## 25. How customizable should Storyworld be?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**Current-state qualification:**

The canonical direction supports configurable narrative units, custom fields, and reusable property and production templates. The current alpha does not yet provide a verified general-purpose template or extension runtime. Template schemas, safe custom validators, lifecycle mapping, extension permissions, migrations, and portability require additional contracts and prototypes.

Templates should configure Storyworld’s shared primitives. They must not fork storage, create separate engines, hide authority, or introduce executable code implicitly.

**1. May users define custom entity types?**

**Response:**

Yes, as typed specializations of Storyworld’s stable entity model.

Users should be able to define a custom entity profile with:

- Name, description, icon, and vocabulary.
- Base entity category.
- Typed fields and relationships.
- Required references and constraints.
- Default views, forms, and templates.
- Visibility, sensitivity, and authority rules.
- Import, export, and migration versions.

Core identity, immutable revision, canon branch, Current Canon, Canon Revision, Canon Version, visibility, provenance, rights, and approval semantics must remain consistent.

Dumpster Fire Friends should use the standard character entity with a collectible-character profile containing card statistics, recurring traits, behavior, impact, response, recovery, and relationships. These fields should not become hard-coded requirements for every Storyworld character.

A type requiring fundamentally new commands, storage, lifecycle, or external behavior becomes an extension rather than a template-defined entity type.

---

**2. May users define custom fields?**

**Response:**

Yes. Custom fields are essential for supporting varied properties without continually expanding the universal schema.

Fields should be typed rather than arbitrary unstructured JSON. Supported types should include:

- Text and rich text.
- Number, currency, percentage, and measurement.
- Boolean and enumerated choices.
- Date, time, interval, and story-time values.
- Entity, asset, source, rights, and narrative-unit references.
- Lists and bounded structured groups.
- Visibility, sensitivity, and locale-aware values.

Each field definition should have a stable ID, namespace, schema version, label, description, default, required state, validation, indexing policy, and migration history. Renaming a field must not change its identity or orphan prior values.

---

**3. May users define custom narrative-unit types?**

**Response:**

Yes. A template may define unit types, labels, hierarchy, allowed parent-child relationships, required fields, numbering, views, and validators while retaining the common `NarrativeUnit` identity, revision, ordering, branch, and lifecycle semantics.

Examples include:

- Season → episode → scene.
- Book → part → chapter → spread.
- Campaign → release → post → panel.
- World → mission → interaction.
- Album → track → movement.
- Collection → card → card face.
- Course → module → lesson → exercise.

Dumpster Fire Friends may define a numbered card as its template-level content unit without creating a separate card-specific storage engine.

---

**4. May users define custom lifecycle states?**

**Response:**

Only within controlled boundaries.

Users may add workflow states such as “Needs illustration,” “Awaiting family review,” “Ready for layout,” or “Needs localization,” provided each maps to a standard Storyworld lifecycle category and cannot change authority.

Templates must not redefine or bypass the meaning of:

- Draft or proposal.
- Current Canon.
- Canon Revision history.
- Canon Version.
- Add to Canon or Update Canon.
- Production-local override.
- Candidate asset.
- Under review.
- Accepted master.
- Release package and publication state.
- Submitted or published.
- Superseded, withdrawn, or archived.

A custom state cannot add a proposal to Current Canon, create a Canon Revision, pin a Canon Version, treat a comment as approval, waive a blocker, or publish content. New authoritative state semantics or transition behavior require an accepted extension or core lifecycle decision.

---

**5. May users define custom validators?**

**Response:**

Yes, beginning with safe declarative validators rather than arbitrary executable code.

A custom validator should declare:

- Exact fields, objects, versions, and scope.
- Deterministic condition or comparison.
- Severity and whether it is a finding or objective blocker.
- Clear failure explanation and remediation.
- Evidence requirements.
- Whether waiver is permitted and by whom.
- Version, fixtures, and expected test cases.

Model-assisted validators may create findings with visible evidence, uncertainty, and limitations. They cannot create legal clearance, record Creative Approval, perform Add to Canon, Update Canon, or Master Acceptance, pin a Canon Version, or grant another approval.

Validators requiring arbitrary code, network access, secrets, external services, or new commands are extensions and require sandboxing, capability review, supply-chain review, time and resource limits, and explicit installation.

---

**6. May templates hide or rename standard concepts?**

**Response:**

Templates may rename concepts in the user-facing vocabulary and hide optional tools through progressive disclosure. For example, `NarrativeUnit` may appear as Card, Chapter, Track, Mission, Lesson, or Post.

Templates must not hide, merge, or misleadingly rename concepts whose distinction protects authority or provenance, including:

- Draft or proposal and Current Canon.
- Current Canon, Canon Revision history, and Canon Version.
- Add to Canon or Update Canon and production-local override.
- Candidate asset and accepted master.
- Creative Approval, Master Acceptance, rights approval, and publication authorization.
- Release package, submitted work, and published instance.
- Source, derivative, version, and provenance.
- Finding, waiver, and blocker.
- Storyworld authority versus Commerce Foundry, runtime, or destination authority.

Friendly vocabulary may not rename a draft as canon, portray Current Canon as mutable in-place content, treat a Canon Version as a draft or public release, hide the branch and Canon Revision captured by a Canon Version, or make a production appear current when it remains pinned to an older Canon Version. Templates also may not collapse canon acceptance, Master Acceptance, release creation, or publication authorization.

Advanced users should be able to inspect the underlying standard concept and stable ID. Exports and APIs must use standard Storyworld semantics even when the interface uses template-specific language.

---

**7. Can a template require a plugin or adapter?**

**Response:**

A template may declare a required or recommended capability, plugin, renderer, provider, channel, commerce, runtime, or external-tool adapter, but it must not install or execute one silently.

Storyworld should:

- Show the dependency before template activation.
- Verify compatible versions and capabilities.
- Require explicit installation and permission.
- Review licensing, security, network, data-egress, and maintenance implications.
- Explain what remains usable when the dependency is unavailable.
- Prevent execution when a mandatory capability is missing.
- Preserve core property data independently of the adapter.
- Provide portable exports or conversion-loss reports.

Templates should prefer replaceable capability requirements over vendor-specific dependencies. A Dumpster Fire Friends template may recommend a print or card-layout adapter, but its characters, canon, card records, text, assets, and history must remain usable without that adapter.

---

**8. Should custom fields be fully searchable and exportable?**

**Response:**

Yes, wherever the user is authorized and the field’s indexing and export policy permits it.

Search should support custom-field labels, values, types, ranges, references, and facets. Search indexes must preserve access, spoiler, sensitivity, retention, deletion, and provider-egress rules. Fields classified `Access—Restricted` or `Access—Embargoed` may be marked no-index; provider-egress classification separately controls use of any external search or embedding service.

Portable exports should include:

- Field definitions and stable IDs.
- Namespaces and schema versions.
- Typed values and references.
- Validation and visibility rules.
- Migration or supersession history.
- Human-readable representations where practical.

Values excluded by access, provider-egress, rights, privacy, contractual, regional, or destination policy may be redacted or omitted from a particular export without losing the field definition. The export must report omissions rather than silently dropping custom data.

---

**9. How much customization is allowed before it must become an extension rather than a template?**

**Response:**

A customization remains a **template** when it is declarative configuration over existing Storyworld primitives. Templates may configure:

- Vocabulary and labels.
- Entity and narrative-unit profiles.
- Typed fields and relationships.
- Hierarchy and numbering.
- Views and progressive disclosure.
- Default workflows and mapped statuses.
- Declarative validators and rubrics.
- Layout, rendition, and export profiles.
- Property-level policy presets.

It becomes an **extension** when it introduces any of the following:

- Executable code.
- New commands or authoritative lifecycle semantics.
- New persistent aggregate or storage behavior.
- Background jobs or agent tools.
- Network access, secrets, or external side effects.
- A custom editor, renderer, worker, or complex evaluator.
- Provider, external-application, commerce, channel, or runtime integration.
- Behavior that cannot round-trip without the extension.
- New security, rights, spending, or publication boundaries.

An **adapter** is the narrower extension type used to exchange or execute work through a provider, editor, renderer, destination, Commerce Foundry, or runtime.

Extensions require a versioned manifest, explicit capabilities, security and license review, compatibility rules, migrations, tests, resource limits, disable/remove behavior, and a portable fallback. Neither a template nor an extension may expand its own authority or bypass human-controlled Add to Canon, Update Canon, Canon Version pinning, rights, approval, release, and publication boundaries.

---

# Priority 3 — Commercial direction

## 26. Is Storyworld expected to become a standalone product?

**Owner-response status:** ☒ Answered  ☐ Partially answered  ☐ Deferred

**Implementation follow-up:** ☒ Needs research/prototype  ☐ No additional research currently identified  ☐ Evidence complete

**1. What is the long-term goal?**

- ☒ An internal Stavium system
- ☒ A product bundled with Commerce Foundry
- ☒ A standalone product for creators
- ☐ An enterprise platform
- ☒ Several of these

**Selected choice(s), ranking, qualifications, or additional answer:**

1. A private internal platform for the owner’s family team and Stavium properties.
2. An independently bounded narrative capability deeply integrated with Commerce Foundry.
3. A standalone product for eligible solo creators and small teams, beginning only with an owner-authorized Controlled External Pilot after the Internal Qualification gate; Broader External Availability remains conditional on repeat paid demand.
4. Not an enterprise platform or large-studio workforce system.

“Bundled with Commerce Foundry” means a commercial add-on, entitlement, or connected experience. Storyworld remains independently deployable, keeps its own authority and database, and exchanges immutable briefs, bundles, findings, and receipts with Commerce Foundry.

**Response:**

Storyworld has durable value even if it never reaches Broader External Availability or Public Self-Service. It can remain:

- Stavium’s internal narrative-production platform.
- The production environment for owned properties such as Dumpster Fire Friends.
- Commerce Foundry’s independently governed narrative-campaign capability.
- The content-authoring and release source for BeKindRewind.
- Shared infrastructure for future Stavium media properties.

A standalone creator product is a conditional goal, not an assumption. The first external-access stage may be a bounded Controlled External Pilot only after Internal Qualification and a separate owner authorization. Broader External Availability remains limited to eligible solo creators and small teams—not agencies, enterprise departments, or large studios—and requires staged evidence of repeat paid demand for Storyworld’s distinctive capabilities.

Existing dossier material that assumes agency or enterprise tiers requires amendment or a successor decision before it can remain target product direction.

---

**2. Should architecture now anticipate:**

- ☒ Customer onboarding
- ☒ Billing
- ☒ Usage limits
- ☒ Customer support
- ☒ Tenant administration
- ☒ Data export and deletion
- ☒ Customer-managed keys

**Selected choice(s), ranking, qualifications, or additional answer:**

The architecture should preserve clean seams for all of these, but the Reliable Internal Version deployment should implement only what it actually needs.

Priorities are:

1. Data export, transfer, deletion, retention, and recovery.
2. Usage limits, provider budgets, and cost attribution.
3. Basic organization, workspace, identity, and role administration.
4. Support evidence, diagnostics, backup, and restore.
5. Customer-managed deployment and encryption-key abstractions.
6. Lightweight invitation-only pilot onboarding only if Internal Qualification passes and a bounded Controlled External Pilot is separately approved.
7. Pilot-fee handling only under an approved bounded pilot plan; general billing only after a broader paid offering is approved.

**Response:**

“Anticipate” does not mean build a speculative SaaS platform now.

- **Customer onboarding:** remain internal-first. If Internal Qualification passes and the owner separately approves a Controlled External Pilot, begin with individually approved invitations and assisted setup. Public Self-Service remains deferred pending its evidence gate and a separate owner decision.
- **Billing:** preserve usage, entitlement, storage, and cost records, but do not build a general billing system before a broader paid model is validated. Any pilot fee must be handled only under the separately approved bounded pilot plan.
- **Usage limits:** required by the Proof because provider, storage, and media-processing costs must remain bounded at every later milestone.
- **Customer support:** provide runbooks, health checks, redacted evidence packages, backup verification, and bounded support access.
- **Tenant administration:** retain organization and workspace isolation, but do not build enterprise directory or department management.
- **Data export and deletion:** permanent core requirements, independent of commercialization.
- **Customer-managed keys:** preserve an encryption and key-custody abstraction; exact KMS and customer-managed-key support requires a security decision and prototype.

Question 18 exclusively controls customer-managed-only versus optional Storyworld-hosted deployment. Question 22 exclusively controls provider-credential scope. Question 26 depends on those choices for rollout planning but neither duplicates nor redefines them.

---

**3. What evidence is required before controlled external access and broader external availability?**

**Response:**

#### Rollout terminology

Controlled External Pilot, Limited Paid Beta, and Public Self-Service use the canonical milestone definitions near the beginning of this workbook. The definitions below add operating detail; they do not create competing maturity horizons.

- **Internal use:** Access limited to the owner’s family team and explicitly authorized internal Stavium participants.
- **External user:** Anyone outside that internal group, including a design partner or invited pilot participant.
- **Controlled External Pilot:** The first external-access stage; invitation-only, owner-authorized, paid, high-touch, and limited to named participants.
- **Limited Paid Beta:** A larger but still selected and capacity-controlled external cohort.
- **Public Self-Service:** Eligible users may register without case-by-case owner invitation. “Public” describes product enrollment; it does not assign `Access—Public` to creator content.
- **Broader External Availability:** An umbrella phrase for Limited Paid Beta or Public Self-Service, not a separate milestone. It does not include the Controlled External Pilot.
- **Qualifying completed production:** An independently scoped campaign or project that moves through a pinned Canon Version and other exact source versions, creation, governed revision, review, human acceptance, release packaging, and intended publication or delivery. Variants and renditions of the same production do not count as separate productions.
- **Successful publication or delivery:** Human-authorized execution to the intended destination with a receipt or equivalent verifiable result. This may be private or public depending on the production.
- **Second-production commitment:** A paid renewal, prepaid second project, signed order, or specifically scheduled continuation. Survey interest alone does not qualify.

#### Internal Qualification

Internal evidence—not external payment or usage—determines whether the Reliable Internal Version has met the additional qualification required for the owner to consider a Controlled External Pilot. The provisional minimum Internal Qualification gates are:

- Complete at least **12 qualifying internal productions**.
- Cover at least **3 materially different internal properties**.
- Complete at least **2 qualifying productions per property**.
- Cover at least **3 materially different media or delivery types**.
- Include at least **2 non-commerce use cases**.
- Successfully publish or deliver at least **8 of the 12 productions** through intended owner-controlled destinations; all 12 must produce validated governed release or export packages.
- Include the Dumpster Fire Friends Cards 007–008 Proof while recognizing that it is insufficient by itself to satisfy Internal Qualification.
- Involve at least **2 distinct family-team operators**, including at least **1 person who is not the system’s primary builder**.
- Require the non-builder participant to complete at least **3 productions** with no more than **2 hours of unplanned expert assistance per production** after initial onboarding.
- Require at least **2 team members** to complete more than one production.
- At least **11 of the 12 productions**, including the final **5 consecutively**, must complete without developer intervention, direct database repair, or loss of governed work.
- Every acceptance-class action must have its required exact-version receipt.
- There must be **zero acknowledged data loss** involving Canon Revisions, Current Canon pointers, Canon Versions, canon-acceptance receipts, accepted masters, Master Acceptance receipts, rights decisions, releases, publication authorization, or other acceptance-class receipts.
- Complete **3 consecutive successful backup-and-restore drills**.
- Complete clean-install export and re-import proofs for at least **3 materially different properties**.
- Exercise and recover from at least one scenario in each category:
  - Provider outage or timeout.
  - Interrupted or unknown-outcome job.
  - Stale-version or collaboration conflict.
  - Rights or consent withdrawal/block.
  - Export and account/property exit.
  - Recoverable deletion and restoration.
- Track provider, storage, processing, and support costs for every qualifying production.
- For the final **6 productions**, actual variable cost must remain within **20% of the approved estimate**, unless the owner explicitly approves a documented exception before the overage.
- Critical pilot workflows must receive manual keyboard, zoom/reflow, screen-reader, forced-colors, and mobile-decision testing appropriate to their scope.
- No unresolved **Critical or High** authority, rights, privacy, security, accessibility, or data-loss issue may remain.
- Medium issues may remain only when they are non-blocking, documented with limitations and mitigations, and explicitly accepted for the bounded pilot.

These are provisional owner gates. They may be changed only through an explicit later owner decision based on observed internal production cadence and evidence—not by implementation assumption.

#### Required Internal Evidence Packet

Before the pilot-authorization gate, a dated Internal Evidence Packet must answer:

1. Can the family team repeatedly move real work from creative intent through governed publication or delivery?
2. Can someone other than the system’s primary builder complete the workflow without continuous expert intervention?
3. Do the completed results meet the owner’s defined creative, technical, continuity, rights, and accessibility standards?
4. Can tested failures be recovered without losing or corrupting governed work?
5. Are provider cost, storage cost, processing cost, operator effort, and support burden within the approved thresholds?
6. Are onboarding, operating, troubleshooting, export, recovery, and support instructions understandable to the intended users?

Each answer must be:

- `Yes`, `No`, or `Conditional`.
- Supported by exact production, release, receipt, test, cost, issue, or usability evidence.
- Accompanied by limitations and unresolved issues.
- Approved by the owner before the first Controlled External Pilot.

All six questions must be answered `Yes` before pilot authorization. A `Conditional` answer blocks the pilot unless the owner records a specific bounded exception. No exception is permitted for unresolved Critical or High authority, privacy, rights, security, accessibility, or data-loss risks.

#### Pilot-authorization gate

Satisfying Internal Qualification and approving the Internal Evidence Packet makes a Controlled External Pilot eligible for a separate explicit owner go/no-go decision. It does not authorize external communication, participant recruitment, charging, credential activation, deployment, or publication. A bounded pilot plan must be separately approved before any of those actions occur.

#### Controlled External Pilot

The Controlled External Pilot is an **owner-authorized, invitation-only, paid concierge pilot for eligible solo creators and small teams**, with these qualifications:

- **3–5 external teams**.
- Each team contains **1–5 people**.
- Planned duration of **8–12 weeks**, extendable to a maximum of **16 weeks** solely to finish already-started pilot work.
- Participants must have a real project achievable within the pilot period.
- Participants must control or possess the necessary rights to their submitted material.
- The initial cohort should cover at least **2 materially different non-commerce creative use cases**.
- At least one participant should have relatively low technical confidence.
- Pilot access is individually approved by the owner.
- No public registration, public marketplace listing, enterprise rollout, production SLA, or unattended onboarding is implied.
- Material classified `Provider Egress—Highly Restricted`, regulated workflows, content involving minors, or unusually consequential likeness/voice use remains excluded unless separately reviewed and explicitly authorized.
- Planned onboarding is limited to **4 hours per team**.
- Use a scheduled feedback session of approximately **30 minutes per week per team**.
- Track planned research time separately from unplanned product-support time.
- Charge a provisional prepaid pilot fee of **$250–$500 per team**, optionally creditable toward later paid service. The exact amount must be approved in the bounded pilot plan.
- The pilot agreement must define scope, duration, fee, support, data handling, confidentiality, rights, acceptable use, known limitations, termination, export, deletion, and the absence of any production-readiness guarantee.

#### Controlled External Pilot exit criteria

Expansion to Limited Paid Beta requires an explicit owner go/no-go decision after all of the following are evaluated:

- At least **3 external teams** enroll and pay.
- At least **3 teams and 80% of enrolled teams**, whichever is greater, complete one qualifying real production.
- At least **2 teams and 50% of completing teams**, whichever is greater, make a qualifying paid second-production commitment within **60 days** of completing the first production.
- At least **80% of participants** independently complete the critical intent-to-release workflow after onboarding.
- Planned onboarding remains at or below **4 hours per team**.
- By the pilot’s final month, unplanned support averages no more than **2 hours per team per completed production**.
- Average participant satisfaction is at least **4 out of 5**.
- At least **80% of completing teams** identify persistent canon, continuity, reusable creative identity, focused revision, governed production, or professional cross-media work as material value—not merely generic generation.
- At least **95% of durable workflow executions** complete or recover without developer intervention or direct database repair.
- All acceptance-class actions produce valid exact-version receipts.
- There is no acknowledged loss of governed data.
- Every participant can successfully export their work.
- At least one complete participant-exit exercise verifies export, credential revocation, retention handling, and deletion behavior.
- There is no unresolved Critical or High authority, rights, privacy, security, accessibility, or data-loss issue.
- No unremediated rights, privacy, security, publication, or data-loss incident occurs.
- Provider, storage, and media-processing cost per completed production is no more than **35% of the provisional standard price** for that production or plan.
- The projected gross margin at intended beta pricing is at least **60%**, excluding research-and-development work and planned pilot interviews.
- Support and customization findings show a credible path to serving customers without turning every onboarding into bespoke services work.

Missing any threshold does not automatically terminate Storyworld as an internal platform. It prevents expansion and requires the owner to choose among remediation, a second bounded pilot, narrower positioning, or remaining internal/first-party only.

#### Limited Paid Beta

If the Controlled External Pilot gate passes and the owner separately authorizes expansion, Limited Paid Beta is:

- **10–25 selected paying teams**.
- Invitation or waitlist access rather than unrestricted signup.
- A minimum observation period of **6 months**.
- Continued focus on eligible solo creators and small teams.
- No enterprise or large-studio workforce expansion.

Public Self-Service may be considered only after:

- At least **20 active paying teams** have remained active for **90 consecutive days**.
- At least **70%** complete their first qualifying production within **60 days** of onboarding.
- At least **50%** begin a second production within **90 days**.
- At least **60%** renew or complete another paid production within **6 months**.
- At least **90%** complete onboarding with no more than **1 hour of human assistance**.
- Unplanned support averages no more than **1 hour per active team per month** after onboarding.
- At least **95%** of durable workflows complete or recover without developer intervention.
- Acceptance-class receipt coverage remains **100%**.
- Governed data loss remains **zero**.
- Variable provider, storage, and processing costs remain at or below **30% of recognized revenue**.
- Projected gross margin is at least **65%**, excluding ongoing product development.
- Self-service documentation, support intake, billing, export, deletion, incident response, privacy, rights, accessibility, backup, and recovery processes are tested and operational.
- No unresolved Critical or High issue remains.

Meeting these thresholds permits an owner decision; it does not automatically authorize Public Self-Service.

#### Public Self-Service

Public Self-Service:

- Remains conditional rather than inevitable.
- Requires a separate explicit owner decision.
- Applies only to the approved eligible audience.
- Does not imply enterprise support, creator content classified `Access—Public`, publication authority, or production-readiness claims.
- Must preserve customer-managed deployment and complete export/exit requirements.
- May be paused, narrowed, or rolled back if reliability, support, economics, rights, privacy, security, or accessibility evidence deteriorates.

If repeat paid demand does not emerge, Storyworld should remain an internal and first-party integrated platform. Mature Product remains a capability horizon rather than an automatic rollout stage after Public Self-Service; Storyworld may remain internal, pilot-only, beta-only, or otherwise bounded. Nothing in this response authorizes external communication, participant recruitment, charging customers, credential activation, deployment, publication, or movement to any later rollout stage.

---

**4. Which capabilities would customers actually pay for?**

**Response:**

The strongest payment hypotheses, in priority order, are:

1. **Persistent canon and continuity:** maintaining consistent characters, worlds, timelines, rules, objects, voices, and visual identities across many works.
2. **Intent-driven professional production:** moving from text or voice direction to generated, edited, reviewed, and approved work without coordinating many disconnected tools.
3. **Focused revision without starting over:** changing one region, line, shot, cue, character, or layout element while preserving approved invariants.
4. **Reusable characters, worlds, and reference systems:** safely carrying accepted creative identity across properties, formats, seasons, and campaigns.
5. **Governed AI automation:** autonomous low-consequence work with previews, budgets, provenance, reversibility, and human authority at consequential gates.
6. **Cross-media adaptation and delivery:** producing coordinated text, image, audio, video, print, web, and runtime packages from shared narrative source.
7. **Review, rights, and release confidence:** exact-version decisions, continuity findings, rights and consent checks, accessibility, approvals, and receipts.
8. **Portable ownership and privacy:** complete export, customer-managed deployment, controlled provider routing, and local custody when required by the material’s provider-egress classification.
9. **Small-team coordination:** comments, proposals, assignments, partial acceptance, conflict handling, and scoped roles without enterprise bureaucracy.
10. **First-party integrations:** Commerce Foundry campaign exchange and Browser/Web runtime compilation first, followed by Godot through the shared target-neutral contract where those workflows apply.

Customers are unlikely to pay sustainably for Storyworld merely as another prompt interface, generic image generator, asset library, graph viewer, or social scheduler. Those capabilities support the product but do not define its differentiation.

---

> Use this final section for answers that affect several sections, contradictions discovered while responding, explicit deferrals, or questions that should become repository proposals or ADRs.

**Cross-cutting decisions, assumptions, or constraints:**

**Response:**

### Authoritative cross-cutting decision and status register

This is the sole authoritative register for cross-cutting classification, unresolved-decision ownership, repository conflicts, intentional deferrals, research needs, and successor handoff. “Authoritative” applies only to that shared status and routing function: the numbered responses remain the detailed source of target owner direction, and accepted repository decisions remain current repository authority. Each row references its controlling source instead of restating the full answer.

| ID | Category | Topic | Controlling source | Current status | Required successor or action |
| --- | --- | --- | --- | --- | --- |
| AR-01 | Accepted repository authority | Authority hosts and system ownership | `DEC-0006` | Storyworld, Commerce Foundry, runtimes, tools, and connectors retain distinct authority domains and records. | Keep controlling until an accepted successor changes the authority pack. |
| AR-02 | Accepted repository authority | Durable workflow stack | `DEC-0009` | Temporal is the selected durable business-workflow orchestrator; contracts remain provider- and orchestrator-neutral where specified. | Preserve in successor architecture and implementation work. |
| AR-03 | Accepted repository authority | Hosted generation posture | `DEC-0012` | Hosted APIs remain accepted; local generative-model weights are not authorized, and the accepted InvokeAI role remains controlling pending a successor. | Reconcile only through a reviewed successor decision. |
| AR-04 | Accepted repository authority | V1 alpha evidence boundary | `DEC-0017` | The accepted alpha demonstrates bounded authority, custody, workflow, package, commerce, runtime, and export foundations. | Do not treat alpha evidence as proof of later questionnaire milestones. |
| AR-05 | Accepted repository authority | Lifecycle, release, and publication boundary | `DEC-0019` | Exact-version lifecycle records and receipts remain separate from authority-host-specific publication actions. | Preserve the boundary in successor contracts. |
| AR-06 | Accepted repository authority | Human acceptance authority | `DEC-0021` | Alpha acceptance-class commands remain human-only and `property_owner`-bound. | Keep controlling until a scoped-role successor is accepted. |
| AR-07 | Accepted repository authority | Runtime decision receipts | `DEC-0023` | Receiving runtimes own their acceptance evidence; runtime acceptance does not alter Storyworld authority. | Reconcile terminology and the two-stage handoff model through the runtime successor. |
| AR-08 | Accepted repository authority | Alpha collaboration model | `DEC-0025` | Alpha collaboration remains asynchronous and owner-decided; presence, live co-editing, assignments, and broader roles are outside that accepted scope. | Retain until the collaboration successor is reviewed and accepted. |
| OD-01 | Recorded target owner direction requiring successor reconciliation | Proof, product value, and creator controls | Question 1 | Dumpster Fire Friends Cards 007–008 is the bounded Proof; persistent canon, continuity, focused revision, reusable identity, text/voice control, and governed production define the intended value. | Reconcile product and intent contracts without claiming implementation. |
| OD-02 | Recorded target owner direction requiring successor reconciliation | Internal user boundary | Question 2 | The Useful Internal Version serves the owner’s small family team rather than enterprise departments or large studios. | Reconcile conflicting agency or enterprise assumptions. |
| OD-03 | Recorded target owner direction requiring successor reconciliation | Standalone-product and external-rollout boundary | Question 26 | External availability is conditional and begins only with a separately authorized Controlled External Pilot after Internal Qualification. | Preserve the staged gates; no threshold automatically advances rollout. |
| OD-04 | Recorded target owner direction requiring successor reconciliation | Storyworld and specialist-tool roles | Question 11 | Storyworld is the normal supported workspace; InvokeAI, Blender, Kdenlive, Resolve, ComfyUI, and similar tools are governed precision or operator environments without domain authority. | Clarify the professional-tool non-goal and supersede the conflicting InvokeAI posture where approved. |
| OD-05 | Recorded target owner direction requiring successor reconciliation | AI autonomy | Question 21 | Low-consequence work may be automatic within scoped rules; medium-consequence work requires confirmation; consequential authority remains human. | Reconcile AI-action contracts and workflow policy. |
| OD-06 | Recorded target owner direction requiring successor reconciliation | Canon lifecycle terminology | Question 5 | Current Canon, Canon Revisions, and Canon Versions are distinct; legacy “canon release” terminology is not a fourth state. | Reconcile repository contracts that retain the legacy term. |
| OD-07 | Recorded target owner direction requiring successor reconciliation | Provider strategy and Agent Missions | Question 22 | OpenRouter and fal.ai are preferred replaceable hosted adapters; Storyworld owns Agent Mission governance while Octon is the eventual replaceable executor. | Create provider, egress, capability-gateway, and Agent Mission successors after evidence. |
| OD-08 | Recorded target owner direction requiring successor reconciliation | Delivery priority | Question 10 | Governed export remains permanent; Astro-before-Instagram is proposed target direction. | Retain accepted Instagram-first history until a delivery-priority successor is accepted. |
| OD-09 | Recorded target owner direction requiring successor reconciliation | Deployment, portability, and custody | Question 18 | Internal deployment baselines precede a Mature Product customer-managed option; complete export and property portability remain permanent. | Resolve UD-02 and create hosting, portability, backup, and migration successors. |
| OD-10 | Recorded target owner direction requiring successor reconciliation | Browser-first runtime sequence | Question 14 | Browser/Web is the first supported production target; Godot is second, with only a bounded parallel portability proof. | Reconcile through the shared-runtime successor without changing authority boundaries. |
| OD-11 | Recorded target owner direction requiring successor reconciliation | Accessibility baseline | Question 23 | WCAG 2.2 AA, keyboard operation, structured alternatives, accessible outputs, and real-device evidence apply at the defined milestones. | Create the accessibility successor and validation program. |
| OD-12 | Recorded target owner direction requiring successor reconciliation | Mobile decision surface | Question 24 | Mobile centers on a purpose-built Decision Inbox and preserves full evidence and authority requirements. | Scope mobile workflows separately from desktop authoring. |
| OD-13 | Recorded target owner direction requiring successor reconciliation | Collaboration progression | Question 12 | Collaboration begins with drafts, proposals, exact-version conflicts, partial acceptance, and asynchronous work. | Preserve alpha authority while preparing the evidence-gated collaboration successor. |
| OD-14 | Recorded target owner direction requiring successor reconciliation | Template and extension boundary | Question 25 | Templates configure vocabulary and views without forking the Engine; executable or connected behavior belongs in governed extensions or adapters. | Create template and extension contracts after research. |
| OD-15 | Recorded target owner direction requiring successor reconciliation | Access and provider-egress dimensions | Question 15 | Access and provider-egress classifications are independent; Section 15 supplies the target default crosswalk and override rules. | Reconcile repository contracts; never implement one unqualified “restricted” value for both dimensions. |
| OD-16 | Recorded target owner direction requiring successor reconciliation | Rights and consent workflow | Question 16 | Rights and consent are exact-version evidence and workflow controls, not legal guarantees or implied clearance. | Add the required rights, withdrawal, and blocking successors after evidence. |
| OD-17 | Recorded target owner direction requiring successor reconciliation | Arc workspace graph semantics | Question 9 | The proposed DEC-0028 amendment applies Narrative Flow semantics only to the Arc workspace profile. | Amend DEC-0028 before graph implementation authority is considered. |
| IL-01 | Implementation or evidence limitation | Target-product breadth | `DEC-0017` | The alpha does not establish the complete intent-driven experience, provider-policy surface, professional media editing, broad search, Reliable Internal Version identity, Mature Product collaboration, or customer-managed packaging. | Validate each capability through its controlling numbered response and successor work; make no readiness inference from alpha acceptance. |
| IL-02 | Implementation or evidence limitation | Provider-shaped authoring paths | Question 22 | Current generated recipe and Studio paths still expose prompt, model, seed, provider, and endpoint concepts that conflict with the target provider-neutral boundary. | Reconcile the authoring and execution contracts before claiming the target experience. |
| IL-03 | Implementation or evidence limitation | Questionnaire implementation status | Question 1 | Populated target direction does not establish that any milestone or advanced capability exists. | Require direct repository and validation evidence for every implementation claim. |
| UD-01 | Unresolved owner decision | Provider-credential scope | Question 22 | Workspace-admin, per-member, or hybrid credentials remain unresolved; the nonbinding recommendation is recorded only in Question 22. | Owner selects one scope or explicitly defers it. |
| UD-02 | Unresolved owner decision | Mature Product hosting model | Question 18 | Customer-managed/private only versus also offering an optional Storyworld-hosted service remains unresolved; the nonbinding sequence is recorded only in Question 18. | Owner selects one posture or explicitly defers it. |
| DF-01 | Intentional deferral or out-of-scope item | Public multi-tenant SaaS and unrestricted signup | Question 26 | Deferred behind external evidence gates and a separate Public Self-Service decision. | Do not design or launch as an assumed stage. |
| DF-02 | Intentional deferral or out-of-scope item | Enterprise workforce administration | Question 26 | Enterprise departments, SCIM, department hierarchies, and large-studio administration are outside the declared audience. | Reopen only through a separate owner product-direction decision. |
| DF-03 | Intentional deferral or out-of-scope item | Presence and simultaneous co-editing | Question 12 | Not required by the Reliable Internal Version; no milestone currently requires it. | Revisit only after demonstrated demand and a scoped successor. |
| DF-04 | Intentional deferral or out-of-scope item | Local generative-model weights | Question 22 | Not required by a canonical milestone and not authorized under the accepted posture. | Requires a separate owner decision covering security, licensing, hardware, quality, and support. |
| DF-05 | Intentional deferral or out-of-scope item | Formal legal electronic signatures | Question 20 | Not required for the internal milestones. | Revisit only for a concrete contractual, jurisdictional, or regulated need. |
| DF-06 | Intentional deferral or out-of-scope item | Broad direct publishing | Question 1 | Deferred until export, authority, failure, and receipt controls are proven. | Preserve manual governed delivery until a scoped connector successor is accepted. |
| DF-07 | Intentional deferral or out-of-scope item | Automatic runtime mutation or production repinning | Question 14 | Runtime activity and telemetry may create findings or proposals only. | Keep automatic authoritative mutation prohibited absent a separate owner decision. |
| DF-08 | Intentional deferral or out-of-scope item | Adaptive or personalized media | Question 10 | Deferred pending demand, consent, privacy, and ethics evidence. | Require separate product, policy, and research decisions before scope. |
| DF-09 | Intentional deferral or out-of-scope item | Premature microservice extraction | Question 18 | Deferred without measured scale, security, failure-isolation, or team need. | Retain current boundaries until evidence justifies extraction. |
| RP-01 | Research or prototype need | Intent commands and structured authoring | Question 6 | Text/voice commands, consequence classification, `StoryDocument`, semantic diff/merge, correction, and partial acceptance need fixture-driven validation. | Run bounded prototypes; feed evidence into the authoring successors. |
| RP-02 | Research or prototype need | Provider routing and durable job behavior | Question 22 | OpenRouter task profiles, fal.ai queues, structured output, egress, retention, cancellation, retries, webhooks, outages, and unknown outcomes remain evidence needs. | Run capped provider-mock and approved-provider prototypes before contract claims. |
| RP-03 | Research or prototype need | Native cross-media editing | Question 10 | Image generation/editing, professional precision, video/OTIO, coordinated media commands, accessible annotation, and quantitative media limits require prototypes. | Use immutable fixtures and produce scoped media decisions rather than production infrastructure. |
| RP-04 | Research or prototype need | ComfyUI orchestration security | Question 22 | Self-hosted ComfyUI orchestration over approved endpoints requires capability, egress, secret, and workflow-registry evidence. | Complete a bounded security prototype before any successor is accepted. |
| RP-05 | Research or prototype need | External-editor checkout and return | Question 11 | Blender, InvokeAI, Kdenlive, Resolve, and generic package workflows need custody, conflict, fidelity, and return validation. | Prototype governed checkout/return and record loss reports. |
| RP-06 | Research or prototype need | Accessible Astro export | Question 10 | Deterministic accessible Astro export and publication-package boundaries remain unproven. | Produce fixture-driven export evidence before the delivery-priority successor. |
| RP-07 | Research or prototype need | Graph profiles and scale | Question 8 | Reusable profiles, structured alternatives, renderer behavior, and scale require evidence. | Validate profiles before authorizing graph implementation. |
| RP-08 | Research or prototype need | Search, similarity, and embeddings | Question 17 | Ranking, typo tolerance, image similarity, permission-safe retrieval, explanations, and embedding thresholds remain research work. | Benchmark with access-filtered fixtures before selecting advanced retrieval. |
| RP-09 | Research or prototype need | Classification, encryption, and key custody | Question 15 | Classification enforcement, encryption hierarchy, search projections, key custody, and customer-managed keys require design and tests. | Produce security evidence without collapsing classification dimensions. |
| RP-10 | Research or prototype need | Identity and mobile reauthentication | Question 20 | OIDC selection, passkeys, delegation, recovery, service identities, and mobile step-up behavior remain unverified. | Research and prototype; return only decision evidence to the owner queue when a preference is required. |
| RP-11 | Research or prototype need | Customer-managed installation and recovery | Question 18 | Installation, upgrades, backup, restore, portable migration, recovery objectives, and regional profiles require clean-environment drills. | Validate before claiming Reliable Internal Version or customer-managed readiness. |
| RP-12 | Research or prototype need | Real-device accessibility | Question 23 | Browsers, screen readers, zoom/reflow, forced colors, touch, RTL, IME, complex editors, and mobile decisions need manual evidence. | Complete milestone-scoped accessibility testing. |
| RP-13 | Research or prototype need | Template and extension safety | Question 25 | Template schemas, validators, lifecycle mapping, packaging, sandboxing, migrations, and supply-chain controls remain unproven. | Prototype safe extension boundaries before successor acceptance. |
| RP-14 | Research or prototype need | Commerce Foundry handoff | Question 13 | Commercial/print exchange and authority-host behavior require contract and fixture evidence. | Validate the signed brief, bundle, finding, and receipt loop. |
| RP-15 | Research or prototype need | Browser/Web and Godot portability | Question 14 | The browser package and bounded Godot portability proof remain unvalidated against the shared target-neutral contract. | Run contract-validation work without treating Godot as supported. |
| RP-16 | Research or prototype need | Small-team viability and economics | Question 26 | Usability, repeat internal use, support burden, willingness to pay, retention, and unit economics require staged evidence. | Gather internal evidence first; external research requires the applicable owner authorization. |
| RP-17 | Research or prototype need | Rights, consent, and localization controls | Question 16 | Rights/consent matrices, withdrawal behavior, usage blocking, localization, and evidence requirements remain design and test needs. | Produce bounded evidence for the rights successors without implying legal clearance. |
| GH-01 | Governance or handoff action | Proposed `DEC-0040` | Question 26 | “Intent-driven product and small-team boundary” is a proposed identifier and title only. | Draft, review, and accept, reject, or revise through repository governance. |
| GH-02 | Governance or handoff action | Proposed `DEC-0041` | Question 4 | “Creative commands, proposals, consequence classes, and revisions” is proposed only. | Draft and disposition after authority and authoring dependencies are reconciled. |
| GH-03 | Governance or handoff action | Proposed `DEC-0042` | Question 1 | “Compositional Creative Direction and resolved realization” is proposed only. | Draft and disposition after intent evidence. |
| GH-04 | Governance or handoff action | Proposed `DEC-0043` | Question 22 | “Provider-neutral execution separation and capability gateway” is proposed only. | Draft and disposition after provider-boundary evidence. |
| GH-05 | Governance or handoff action | Proposed `DEC-0044` | Question 22 | “Provider egress, credentials, retention, routing, and cost” is proposed only. | Resolve UD-01 and complete relevant evidence before disposition. |
| GH-06 | Governance or handoff action | Proposed `DEC-0045` | Question 22 | “Self-hosted ComfyUI workflow registry and security” is proposed only. | Draft and disposition after RP-04. |
| GH-07 | Governance or handoff action | Proposed `DEC-0046` | Question 10 | “Native media editing and AI-mediated professional precision” is proposed only. | Draft and disposition after relevant RP-03 evidence. |
| GH-08 | Governance or handoff action | Proposed `DEC-0047` | Question 11 | “Cross-media annotation, external precision tools, checkout/return, and OTIO” is proposed only. | Draft and disposition after RP-05 and related media evidence. |
| GH-09 | Governance or handoff action | Proposed `DEC-0048` | Question 10 | “Deterministic media worker and expanded artifact custody” is proposed only. | Draft and disposition after media-worker limits and custody evidence. |
| GH-10 | Governance or handoff action | Proposed `DEC-0049` | Question 10 | “Professional creative evaluation and regression corpus” is proposed only. | Draft and disposition after evaluation fixtures exist. |
| GH-11 | Governance or handoff action | Proposed `DEC-0050` | Question 10 | “Astro-first delivery and governed publication scheduling” is proposed only. | Retain accepted delivery history until this successor is reviewed and accepted. |
| GH-12 | Governance or handoff action | Proposed `DEC-0051` | Question 13 | “Commerce Foundry commercial and print boundary” is proposed only. | Draft and disposition after RP-14. |
| GH-13 | Governance or handoff action | Proposed `DEC-0052` | Question 14 | “Browser-first, Godot-second shared runtime contract and runtime nonauthority” is proposed only. | Draft and disposition after RP-15. |
| GH-14 | Governance or handoff action | Proposed `DEC-0053` | Question 12 | “Mature Product small-team roles and delegation” is proposed only and deferred until collaboration implementation is authorized. | Retain `DEC-0021` and `DEC-0025` until a successor is accepted. |
| GH-15 | Governance or handoff action | InvokeAI and hosted-generation successor | Question 11 | Target tool roles conflict with parts of accepted `DEC-0012`; its hosted-API/no-local-weight boundary remains controlling. | Create a scoped successor without weakening the retained generation boundary. |
| GH-16 | Governance or handoff action | Historical delivery decisions | Question 10 | `DEC-0015` and `DEC-0017` remain historical alpha authority while Astro-before-Instagram is proposed. | Reconcile only through GH-11. |
| GH-17 | Governance or handoff action | DEC-0028 Arc amendment | Question 9 | DEC-0028 requires amendment to the Arc-workspace Narrative Flow profile before implementation authority. | Amend and review; do not treat the questionnaire as acceptance. |
| GH-18 | Governance or handoff action | Draft creative-direction decisions | Question 1 | Draft `DEC-0031` and `DEC-0033` conflict with the recorded target direction. | Replace rather than accept them unchanged. |
| GH-19 | Governance or handoff action | Draft delivery/commerce decision | Question 13 | Draft `DEC-0032` requires substantial amendment to preserve export-first delivery and Commerce Foundry authority. | Amend and review through the appropriate successor. |
| GH-20 | Governance or handoff action | Questionnaire formal approval and repository crosswalk | `DEC-0002` | Formal owner approval, a preserved questionnaire artifact, answer-to-decision and answer-to-contract crosswalks, and repository impact review remain pending. | Resolve or explicitly defer Questions 18 and 22, then obtain and record explicit owner sign-off for the identified document version before successor disposition. |
| GH-21 | Governance or handoff action | Dependency-ordered successor handling | `DEC-0002` | Proposed successors remain staged and must not be accepted as one blanket change. | Review and disposition them in dependency order while accepted decisions remain controlling. |
| GH-22 | Governance or handoff action | Dumpster Fire Friends Proof authorization | Question 1 | The questionnaire records Proof direction but does not authorize execution. | Require an accepted task scope, governing decisions, budget, provider policy, rights basis, and validation plan before any Proof work. |

#### Detailed register record

The table above is the register index, not a substitute for material qualifications. The following details are part of the same authoritative cross-cutting register and elaborate its existing IDs and controlling sources. They do not create a second summary, override a numbered response, or independently establish repository authority.

**Accepted repository-authority detail — AR-01 through AR-08:**

- Storyworld Engine owns authoritative narrative and production state.
- Temporal remains the durable business-workflow orchestrator under the current stack.
- Accepted versions, decisions, assets, packages, and receipts remain immutable and exact-version-bound.
- Authorized humans retain authority for Add to Canon, Update Canon, Master Acceptance, rights decisions, waivers, release creation, and publication authorization.
- Provider-neutral recipes, content-addressed custody, portability, and separate authority hosts remain required.
- Commerce Foundry retains product, commercial, vendor, fulfillment, and Commerce Foundry-originated publication authority.
- Runtime systems retain import, compatibility, rendering, execution, player state, saves, deployment-state authority, and Receiving-Runtime Acceptance evidence within their domain.
- The current accepted generation posture uses hosted APIs and does not authorize local generative-model weights.
- The current `property_owner`-only acceptance boundary remains controlling until a scoped-role successor is accepted.

**Recorded target owner-direction detail — OD-01 through OD-17:**

- Storyworld is private-first for one small family creative team. It may later serve other solo creators and small teams, but it is not intended for enterprise departments or large studios.
- Dumpster Fire Friends Cards 007–008 is the bounded Proof. It should test canon, character consistency, professional image editing, exact typography, rights, provenance, review, acceptance, portable export, and the representative end-to-end workflow defined in Question 1.
- Storyworld’s intended value is persistent canon, continuity, reusable characters and worlds, governed cross-media production, focused revision, and human-controlled release—not generic AI generation.
- Text and voice are the primary creative controls. Complexity should progress from simple intent through contextual controls and progressively disclosed inspection to AI-mediated professional precision and optional Advanced Operator Mode.
- Storyworld should be the normal environment for supported authoring, generation, editing, adaptation, evaluation, and finishing. It is not a universal replacement for every specialist application.
- AI may autonomously perform visible, reversible, low-consequence work within policy and budget. Medium-consequence changes require a plan and confirmation. Add to Canon, Update Canon, Master Acceptance, rights decisions, waivers, release creation, and publication authorization remain human-authorized.
- Every retained material change must preserve exact versions, provenance, affected approvals, reversibility, and custody.
- Current Canon is the branch-specific authoritative pointer to immutable Canon Revision history. Canon Versions are frozen downstream snapshots and remain distinct from canon acceptance.
- OpenRouter and fal.ai are the first strategic hosted providers behind replaceable task and capability adapters.
- Routine deterministic processing belongs inside the Storyworld-controlled boundary. Local generative-model weights are not currently authorized.
- InvokeAI, Blender, Kdenlive, DaVinci Resolve, ComfyUI, and similar tools remain separately deployed precision or operator environments. They receive no Add to Canon, Update Canon, Master Acceptance, rights, release, publication, or other Storyworld domain authority.
- Governed export and complete property portability are permanent requirements. Astro-before-Instagram remains proposed target delivery direction rather than accepted repository authority.
- The Useful Internal Version and Reliable Internal Version deployment baselines remain defined in Question 18. Complete customer-managed/private deployment is a Mature Product target; the optional Storyworld-hosted-service decision remains controlled only by Question 18.
- Browser/Web is the first supported production target and Godot is the second. Both paths share one target-neutral contract, and any parallel Godot work is limited to a bounded portability proof until complete Godot support is separately scoped and authorized.
- Collaboration begins asynchronously with drafts, proposals, exact-version conflicts, and partial acceptance. Presence and live co-editing remain deferred.
- WCAG 2.2 AA, keyboard operation, structured alternatives to visual canvases, accessible generated outputs, and purpose-built mobile review are product requirements at their assigned milestones.
- Templates configure vocabulary, fields, hierarchy, views, rules, and exports without forking the underlying Engine. Executable or externally connected behavior belongs in governed extensions or adapters.
- A Controlled External Pilot remains conditional on Internal Qualification and separate owner authorization. Broader External Availability remains conditional on staged external evidence and repeat paid demand. Storyworld remains valuable as an internal platform and first-party capability if that demand does not appear.

**Implementation, evidence, and nonauthorization detail — IL-01 through IL-03:**

- The accepted V1 alpha proves important authority, custody, workflow, package, commerce, runtime, and export foundations.
- It does not yet implement the complete intent-driven experience, OpenRouter, the complete Mature Product provider-policy surface, native professional media editing, broad search, Reliable Internal Version identity, Mature Product collaboration breadth, or customer-managed packaging.
- Current generated recipe and Studio paths still expose provider-shaped prompt, model, seed, and endpoint concepts where the accepted provider-neutral boundary requires correction.
- Questionnaire answers, register entries, dossier-intake proposals, proposed decision numbers, technical recommendations, and prototype plans do not themselves authorize implementation, provider calls, spending, external communication, participant recruitment, charging, credential activation, dependency installation, deployment, Commerce Foundry activation, runtime deployment, publication, rollout-stage advancement, or decision acceptance.

**Material repository conflicts — OD-02, OD-04, OD-06, OD-08, OD-15, IL-02, and GH-15 through GH-19:**

1. Existing agency and enterprise product assumptions conflict with the recorded target solo-creator and small-team boundary.
2. Existing professional-tool non-goal wording must be clarified: Storyworld is the default for supported workflows without claiming to replace every specialist application.
3. Accepted `DEC-0012` gives InvokeAI a more central role than the target exceptional-precision posture; its hosted-API and no-local-weight boundaries remain controlling pending an accepted successor.
4. The accepted Instagram-first delivery sequence conflicts with the proposed Astro-first sequence.
5. Access and provider-egress classifications are independent dimensions. Section 15 defines the target default crosswalk and override rules; repository contracts and implementation still require reconciliation. No implementation may treat one unqualified “restricted” value as controlling both dimensions.
6. The current recipe-shaped authoring path exposes prompts, models, providers, and seeds where the provider-neutral boundary requires separation.
7. `DEC-0028` requires amendment to describe the Narrative Flow profile for the Arc workspace before the target graph semantics become implementation authority.
8. Draft creative-direction decisions `DEC-0031` and `DEC-0033` should be replaced rather than accepted unchanged.
9. Draft `DEC-0032` requires substantial amendment to preserve export-first delivery and Commerce Foundry’s print, vendor, and commercial authority.
10. Mature Product collaboration, identity, accessibility, template-extension, search, hosting, and reliability models require decisions beyond the accepted alpha; earlier milestone baselines in their controlling questions remain required.
11. Any repository contract that uses “canon release” for a frozen canon snapshot retains legacy terminology requiring reconciliation to Canon Version; it does not establish another canon state.

**Dependency-ordered prototype program — RP-01 through RP-17:**

The integration architecture proposes the following bounded technical-prototype sequence. These prototypes build evidence and are not additional product milestones:

1. Text and voice creative commands, consequence classification, correction, and partial acceptance.
2. OpenRouter task profiles, structured output, routing, egress, and tool-call proposals.
3. fal.ai queues, retention, custody, cancellation, retries, webhooks, and unknown outcomes.
4. Native image generation and editing.
5. AI-mediated professional precision across masks, tracking, timing, audio, color, and layout.
6. Native video editorial model, OpenTimelineIO, and deterministic previews.
7. Secure self-hosted ComfyUI orchestration over approved endpoints.
8. Blender, InvokeAI, Kdenlive, and Resolve checkout and return.
9. Coordinated cross-media creative commands.
10. Deterministic accessible Astro export and publication-package boundaries.
11. Commerce Foundry commercial and print handoff.
12. A Browser/Web runtime package and bounded Godot portability proof against the shared target-neutral contract.
13. Provider-outage operation and queued-job revalidation.

Additional questionnaire-driven research remains necessary for:

- `StoryDocument`, semantic hierarchy diff, merge, rich-editor storage boundaries, and partial acceptance.
- Reusable graph profiles, structured alternatives, renderer selection, timelines, matrices, and scale.
- Frame-accurate, accessible image, audio, and video annotation.
- Search ranking, typo tolerance, image similarity, permission-safe semantic retrieval, and embedding thresholds.
- Rights, consent, localization, and accessibility matrices.
- Reliable Internal Version OIDC identity-provider selection, passkeys, delegation, support access, recovery, and mobile reauthentication.
- Encryption hierarchy, search indexing, key custody, KMS selection, and customer-managed keys for elevated access or provider-egress classifications.
- Customer-managed installation, upgrades, backup, restore, portable migration, formal recovery objectives, and region-specific disaster-recovery profiles.
- Real-device and assistive-technology testing across browsers, complex editors, and mobile decisions.
- Template schemas, safe validators, lifecycle mapping, extension packaging, sandboxing, migrations, and supply-chain security.
- Quantitative media size, duration, processing, storage, and recovery limits.
- The exact browser-runtime framework beneath the browser-first adapter.
- Small-team usability, repeat use, willingness to pay, support burden, and unit economics.

Every technical prototype must remain disposable, fixture-driven, capped in cost, and decision-producing. It must not quietly become production infrastructure.

**Successor-decision sequence and dispositions — GH-01 through GH-19:**

The integration architecture proposes the following sequence. These identifiers remain proposed until repository governance creates and accepts the records:

1. `DEC-0040` — Intent-driven product and small-team boundary.
2. `DEC-0041` — Creative commands, proposals, consequence classes, and revisions.
3. `DEC-0042` — Compositional Creative Direction and resolved realization.
4. `DEC-0043` — Provider-neutral execution separation and capability gateway.
5. `DEC-0044` — Provider egress, credentials, retention, routing, and cost.
6. `DEC-0045` — Self-hosted ComfyUI workflow registry and security.
7. `DEC-0046` — Native media editing and AI-mediated professional precision.
8. `DEC-0047` — Cross-media annotation, external precision tools, checkout/return, and OTIO.
9. `DEC-0048` — Deterministic media worker and expanded artifact custody.
10. `DEC-0049` — Professional creative evaluation and regression corpus.
11. `DEC-0050` — Astro-first delivery and governed publication scheduling.
12. `DEC-0051` — Commerce Foundry commercial and print boundary.
13. `DEC-0052` — Browser-first, Godot-second shared runtime contract and runtime nonauthority.
14. `DEC-0053` — Mature Product small-team roles and delegation, deferred until collaboration implementation is authorized.

Existing dispositions that must remain visible are:

- Retain accepted provider-neutral recipe and human-authority principles.
- Create a successor to relevant `DEC-0012` implementation and tool-role provisions while retaining its hosted-API and no-local-weight boundaries.
- Retain `DEC-0015` and `DEC-0017` as historical alpha authority while creating a delivery-priority successor.
- Retain `DEC-0021` and `DEC-0025` for the alpha until Mature Product role and collaboration successors exist.
- Amend `DEC-0028` to describe the Narrative Flow profile for the Arc workspace under a reusable `GraphViewProfile`.
- Replace draft `DEC-0031` and `DEC-0033` rather than accepting them unchanged.
- Substantially amend draft `DEC-0032`.

Additional decisions or explicit inclusions remain necessary for:

- Canonical `StoryDocument` and semantic merge.
- Reliable Internal Version identity, mobile reauthentication, and support access.
- Hosting, portability, reliability, backup, restore, and customer-managed keys.
- Accessibility milestones and mobile decision-surface requirements.
- Search, embeddings, and similarity projections.
- Templates, safe custom validators, and extension or plugin security.

Accepted decisions remain controlling until these successors are formally reviewed and accepted.

**Detailed deferral qualifications — DF-01 through DF-09:**

- Public multi-tenant SaaS and Public Self-Service signup remain deferred pending staged evidence gates and a separate explicit owner decision.
- Enterprise workforce, SCIM, department, and large-studio administration remain outside the declared audience.
- Real-time presence and Google Docs-style simultaneous co-editing remain deferred.
- Local generative-model weights remain unauthorized absent a separate decision.
- Formal legal electronic signatures remain deferred until a concrete legal or contractual need exists.
- Broad direct publishing remains deferred until export, authority, failure, and receipt controls are proven.
- Runtime activity or analytics may not automatically mutate Current Canon, create a Canon Revision, or repin a production.
- Personalized or adaptive media remains deferred without separate demand, consent, privacy, and ethics decisions.
- Microservice extraction remains deferred without measured scale, security, failure-isolation, or team need.

**Formal owner sign-off template and next-action detail — GH-20 through GH-22:**

After Questions 18 and 22 are resolved or explicitly deferred, the following template may be used for the identified document version. It is a template only and is not the current approval record:

> I formally approve the identified version of the Storyworld owner-decision questionnaire as the approved record of owner direction and evidence for the staged successor-decision and bounded technical-prototype process. This approval does not by itself accept the proposed decision IDs, supersede existing accepted decisions, authorize implementation, permit provider calls or spending, authorize external communication or participant recruitment, permit charging, activate credentials or integrations, approve deployment, authorize publication, or advance any external rollout stage.

After formal sign-off is recorded:

1. Preserve the formally approved questionnaire version as owner-direction evidence and create a standalone preserved questionnaire artifact.
2. Produce answer-to-decision and answer-to-contract crosswalks.
3. Run repository impact review against accepted decisions, canonical dossier material, contracts, tasks, and generated registries.
4. Create and disposition the first grouped successor for the intent-driven small-team product boundary.
5. Continue through the dependency-ordered successor sequence rather than accepting all proposed decisions as one blanket change.
6. Authorize the bounded Dumpster Fire Friends Cards 007–008 Proof only after its governing decisions, task scope, budget, provider policy, rights basis, and validation plan are accepted.
7. Use direct evidence from that Proof and the broader technical-prototype program to determine what advances, narrows, or remains deferred.

All research and technical prototypes must remain disposable, fixture-driven, capped in cost, and decision-producing. They do not authorize implementation, provider calls, participant contact, rollout, or production use.

All research and successor work referenced above remains proposal or evidence work until accepted through repository governance. Obsolete duplicate summaries and repeated recommendation text have been removed; the two still-open recommendations now live only in their controlling numbered responses, Questions 18 and 22.

### Interpretation and precedence

1. Accepted repository decisions and live governance artifacts control current repository authority.
2. Numbered questionnaire responses contain the detailed target owner direction recorded by this workbook.
3. This authoritative cross-cutting register controls how shared matters are classified, assigned, deferred, reconciled, or handed off; it does not override a detailed numbered response.
4. The response-order guide and current owner-action queue are navigation and status aids only.

The questionnaire does not itself accept successor decisions. Recorded target owner direction does not imply implementation, and a summary, register, guide, or queue cannot grant authority absent from its controlling source. Nothing here authorizes implementation, dependency installation, spending, credential use, provider calls, deployment, external communication, participant recruitment, charging customers, publication, production use, or movement to another rollout stage.

Questions 1–26 remain in their existing thematic order. Physical reordering is reserved for a future major questionnaire revision that updates numbering, navigation, and every affected cross-reference together.
