---
name: storyworld-publication-connector
description: Build destination-specific Storyworld export and direct-publication connectors behind exact packages, authority-host boundaries, idempotency, receipts, and withdrawal.
---

# Storyworld Publication Connector

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Preserve export portability and human publication authority while adding one bounded destination at a time.

## Use this skill when

- Implementing Astro, Instagram, X, TikTok, or future destination export/publishing behavior after the governing decision and connector activation are authorized

## Do not use this skill when

- Publishing from a draft or candidate
- Using a connector without exact human authorization
- Treating Storyworld creative approval as destination or Commerce Foundry authority

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- ChannelPackage
- destination_profile
- authority_host
- rights_and_disclosure_checks

## Optional inputs

- PublicationAuthorization
- connector_credentials
- rate_and_quota_policy
- withdrawal_api

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Implement export package first with exact content, metadata, accessibility, disclosures, and validation
2. Define authority host, destination capability, credential scope, idempotency, quotas, and failure semantics
3. Require exact PublicationAuthorization before any external attempt
4. Revalidate material conditions immediately before execution
5. Perform bounded idempotent transport and reconcile unknown outcome
6. Record external IDs, timestamps, payload hashes, status, and PublicationReceipt
7. Support correction, withdrawal, supersession, and fallback export

## Required invariants

- Export remains first-class after direct connector
- Material change invalidates authorization
- Connector cannot alter creative content or scope
- External host outcome is not assumed

## Allowed side effects

`external_effects_require_explicit_current_authorization`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Unapproved publication
- Credential exposure
- Blind retry after unknown outcome
- Cross-authority publication of Commerce Foundry-originated work

## Required outputs

- destination_exporter
- publication_connector
- validation_profile
- PublicationReceipt
- withdrawal_or_correction_receipt

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Dry-run/export fixtures
- Duplicate request
- Unknown outcome
- Rate/quota limit
- Metadata change invalidation
- Connector unavailable
- Withdrawal/correction

A completion report must state:

- exact repository revision and dirty state;
- commands or checks actually executed;
- actual result of each check;
- checks not executed and why;
- known limitations and residual risks;
- external effects, costs, credentials, or network crossings, including “none”;
- decision and disposition owner for unresolved findings.

## Failure and escalation

Stop or narrow the task when:

- required authority or a governing decision is missing;
- current implementation contradicts the requested durable direction;
- a secret, personal, restricted, or highly restricted input lacks an approved path;
- the task would create an unreviewed public contract or migration;
- provider, external-tool, runtime, publication, or Commerce Foundry outcomes are ambiguous;
- required validation cannot run;
- unrelated repository work would be overwritten.

Record the blocking fact, smallest decision or evidence needed, safe partial result, and disposition owner. Never hide a blocked state by producing implementation-shaped prose.

## Traceability

### Related decisions

- DEC-0050

### Related contracts

- ChannelPackage
- PublicationAuthorization
- PublicationJob
- PublicationReceipt

### Related POCs

- POC-10

### Relevant repository paths

- packages/integration/
- packages/portability/
- packages/workflows/

### Skill dependencies

- storyworld-rights-and-consent-review
- storyworld-security-review
- storyworld-conformance-and-release

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- [`astro.md`](references/profiles/astro.md) — Astro export-first profile: static content/assets/data, routes, metadata, accessibility, canonical links, disclosures, build validation, package hashes, and no implied deployment authorization.
- [`instagram.md`](references/profiles/instagram.md) — Instagram export then connector: aspect/codec/caption/accessibility/disclosure profiles, exact account/destination, media container/publish unknown outcomes, receipts, and withdrawal limits.
- [`x.md`](references/profiles/x.md) — X export/connector profile: media limits, text/thread metadata, accessibility, account authority, idempotency, rate limits, and receipts.
- [`tiktok.md`](references/profiles/tiktok.md) — TikTok export/connector profile: video/audio/caption/disclosure rules, destination account, upload/publish states, quota, unknown outcomes, and receipts.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
