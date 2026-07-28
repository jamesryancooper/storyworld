---
title: "Governance, Operations, and Quality"
project: "Storyworld Platform"
version: "1.0"
date: "2026-07-27"
status: "Private working dossier"
part: "05_governance_operations_and_quality"
---

# 15. Identity, security, rights, and governance

## 15.1 Identity and authorization

Use federated OIDC/SSO with independent authorization in each product. Storyworld trusts identity assertions but evaluates its own permissions. Service-to-service calls use OAuth or mutually authenticated credentials and narrow scopes.

Required controls:

- Tenant and workspace membership.
- PostgreSQL row-level security as defense in depth.
- Resource classification: public, internal, confidential, restricted, embargoed.
- RBAC plus resource and action attributes.
- MFA for privileged roles.
- Service principals with rotation and revocation.
- Time-limited guest access.
- Separate connector credentials per channel and authority host.

## 15.2 Capability-based agent execution

An agent or tool receives a revocable lease scoped to:

- Exact tenant, workspace, project, assets, and versions.
- Permitted commands and staging destinations.
- Provider, model, workflow, and external destinations.
- Cost and token/media budget.
- Expiration and maximum attempts.
- Required evidence and review gates.

Agents can write only to proposal or staging commands. They cannot accept canon, approve rights, waive a blocker, authorize publication, or modify another authority system.

## 15.3 Rights and consent

Track:

- Ownership and licensor.
- Territory, channels, duration, and purpose.
- Editorial versus commercial use.
- Modification and derivative permission.
- Model training and provider retention terms.
- Likeness, voice, music, font, photograph, trademark, location, and property consent.
- Required attribution and synthetic-media disclosure.
- Expiry, revocation, replacement, and affected releases.

Rights checks are evidence and workflow controls, not legal guarantees. The receiving authority may require its own counsel or policy review.

## 15.4 Privacy and sensitive-source handling

For editorial work inspired by real people or family experience:

- Preserve private source material separately from public canon.
- Restrict source notes by default.
- Require explicit fictionalization or generalization review.
- Record consent state and prohibited identifiers.
- Provide dignity and foreseeable-harm prompts.
- Block automatic reuse across properties.
- Exclude sensitive source text from providers unless policy explicitly allows it.

The product should support universal lessons without turning another person’s private situation into a commercial concept.

## 15.5 Content and infrastructure security

- Per-tenant object namespaces and encryption at rest and in transit.
- Vaulted provider and connector secrets.
- Signed packages and verified webhooks.
- Upload quarantine, MIME validation, malware scanning, decompression limits, and safe media parsing.
- Egress allowlists, SSRF protection, and sandboxed workflows.
- Imported content treated as untrusted data; prompt-injection instructions inside documents are not executed.
- Allowlisted ComfyUI nodes and pinned workflow/container hashes.
- Default prohibition on provider training with customer assets unless deliberately permitted.
- Immutable audit evidence, versioned backups, point-in-time recovery, restore drills, and object-version recovery.
- No raw Commerce Foundry customer-level data or BeKindRewind player identities in Storyworld analytics.

## 15.6 Approval layers

1. Canon approval.
2. Creative plan approval.
3. Asset creative approval.
4. Continuity disposition.
5. Rights clearance.
6. Channel-package approval.
7. Commerce-specific approval, if applicable.
8. Publication authorization or runtime release acceptance.

Every receipt binds to exact hashes and versions. Modification invalidates only the affected layers. Rejection never deletes evidence. An agent cannot approve its own or anyone else’s work.

# 16. Operations, reliability, and administration

## 16.1 Operational requirements

- Structured logs, distributed traces, and business metrics with end-to-end correlation.
- Queue, workflow, provider, connector, and package health dashboards.
- Cost by tenant, property, production, provider, workflow, and accepted output.
- Retry, cancellation, timeout, circuit breaker, dead-letter, and reconciliation tools.
- Feature flags and staged migrations.
- Backup, restore, export, deletion, retention, and legal-hold procedures.
- Provider-outage, queue-backlog, corrupted-upload, partial-export, signature-failure, and channel-failure runbooks.
- Usage quotas, rate limits, budget ceilings, and abuse controls.
- Support and administrative console with privacy-preserving impersonation controls or evidence packs rather than unrestricted data access.

## 16.2 Observability metrics

- Cost per accepted asset, panel, episode, or approved minute.
- Generation request, failure, cancellation, retry, and fallback rates.
- Provider latency and queue delay.
- Continuity, product-fidelity, rights, and policy pass or finding rates.
- First-pass acceptance and average focused revisions.
- Approval latency and blocked-release age.
- Asset and reference-pack reuse.
- Package delivery, import, signature, and reconciliation failures.
- Publication and runtime-release success.
- Tenant-isolation or permission-denial anomalies.
- Story, commerce, and production outcome metrics.

## 16.3 Reliability targets to define before production pilot

Exact service-level objectives should follow measured pilot behavior, but production promotion requires:

- No lost accepted assets or approvals under process restart.
- Idempotent retries and imports.
- Demonstrated database and object restore.
- Rollback of application and schema migrations without losing accepted work.
- Provider outage that preserves job and review state.
- Traceability from a failed rendition to its campaign, workflow, inputs, provider call, and current recovery action.
- Cost ceilings that stop runaway generation.
- Portable export even during noncritical connector outages.

## 16.4 Mature administration

- Organization, workspace, team, guest, and service-principal management.
- Role templates and custom policy packs.
- Provider credentials, routing, allowlists, regional restrictions, and budgets.
- Channel and Commerce Foundry connections.
- Storyworld templates, vocabularies, taxonomies, and style-policy administration.
- Rights, retention, deletion, and disclosure policy.
- API keys, webhooks, signing keys, and package verification.
- Usage, entitlements, billing, and internal cost allocation.
- Queue, workflow, connector, and provider health.
- Audit search and export.
- Data import, export, backup, deletion, and transfer.
- Localization configuration.
- Feature flags and staged rollout.

# 17. Quality, evaluation, and acceptance

## 17.1 Golden corpus

Create representative, rights-safe fixtures:

| Fixture | What it tests |
|---|---|
| Stillhouse Archive mini-season | Reveal dependencies, symbol continuity, chronology, creator truth versus audience knowledge, spoiler safety |
| Editorial carousel | Voice, recurring metaphor, privacy, dignity, source separation, carousel structure |
| Field Manual lesson | Template reuse, motif consistency, structured lesson and cross-format derivative |
| Dumpster Fire Friends cards | Stable recurring character schemas and numbered visual layouts |
| Recurring dog short | Multi-shot identity, fixed environment, prop movement and object-state transitions |
| BeKindRewind world slice | Locations, era rules, NPCs, mission dependencies, collectibles, dialogue, runtime export |
| Commerce Foundry campaign | Pinned products and claims, placement fit, fidelity, exact-version review, commercial rejection/revision, metrics return |

These are test fixtures, not automatically commercializable inventory. Source ownership, sensitivity, and permitted use must be recorded.

## 17.2 Test layers

- Domain invariant and state-machine unit tests.
- Persistence, migration, transaction, RLS, and object-store integration tests.
- OpenAPI, event, webhook, package, and consumer contract tests.
- Deterministic export/import and signature verification.
- Temporal workflow replay, retry, cancellation, and failure injection.
- Provider adapter contract tests with mocks and capped live canaries.
- Playwright end-to-end workflows and accessibility tests.
- Visual regression for Studio and deterministic rendition templates.
- Security tests for tenant isolation, permission escalation, webhooks, upload parsing, SSRF, prompt injection, and secret handling.
- Restore, rollback, provider-outage, partial-delivery, and duplicate-event drills.
- Human evaluation rubrics for narrative coherence, voice, visual continuity, placement naturalness, review usefulness, and willingness to reuse.

## 17.3 Initial production gates

Establish baselines before claiming permanent quality thresholds. The first production promotion should nevertheless require:

- 100% lineage completeness for accepted assets.
- Zero paths from an unapproved candidate to commercial publication.
- Zero silent accepted-canon mutations.
- Deterministic package verification and round trip.
- No unresolved critical rights or policy blocker.
- At least 80% of representative still panels accepted after no more than one focused revision.
- At least 50% reduction in production coordination time compared with the same pilot using generic disconnected tools.
- Median human review of at least 4/5 for narrative coherence, visual continuity, and product-placement fit.

Generated-media percentages are provisional pilot gates, not promises. If they are unrealistic, the remedy is to narrow the supported workflow or improve reference/control tooling—not to hide defects.

## 17.4 Completion standard for mature applications

Storyworld Engine and Studio are mature when they can:

1. Maintain an authoritative, versioned property across multiple productions and formats.
2. Preserve temporal, narrative, visual, object, product, rights, and approval continuity.
3. Produce and revise coherent multi-asset sequences through replaceable providers and external editors.
4. Support exact-version human decisions and reversible change.
5. Export or publish target-specific derivatives without redefining canonical work.
6. Compile interactive narrative content for BeKindRewind without absorbing the runtime.
7. Complete a governed product-story campaign with Commerce Foundry without duplicating commerce authority.
8. Return performance observations without allowing them to rewrite canon automatically.
9. Support multiple teams and clients with secure isolation, operational recovery, and portable data.
10. Demonstrate that the same core meaningfully serves fiction, editorial, interactive, and commerce use cases without genre-specific forks.
