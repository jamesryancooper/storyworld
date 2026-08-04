---
name: storyworld-commerce-foundry-bridge
description: Implement immutable, separately approved Storyworld–Commerce Foundry exchanges for Narrative Campaigns, product truth, creative bundles, print packages, commercial findings, and receipts.
---

# Storyworld Commerce Foundry Bridge

> **Capability status:** generated, unadopted baseline. This skill grants no permission and cannot supersede current Storyworld instructions, accepted decisions, task records, or evidence.

## Purpose

Preserve Storyworld creative authority and Commerce Foundry product, claims, offer, vendor, order, fulfillment, and commercial-publication authority.

## Use this skill when

- Exchanging Narrative Campaign briefs, product snapshots, claims, offers, creative bundles, print-ready packages, proof status, commercial findings, or fulfillment receipts

## Do not use this skill when

- Assuming Storyworld approval implies commercial approval
- Giving Storyworld vendor credentials or order authority
- Letting Commerce Foundry mutate Storyworld canon

## Read authoritative sources first

- Current user and platform instructions
- Applicable root-to-leaf AGENTS.md files
- .agent/policy.json, .agent/context.json, and .agent/state/current.json
- Relevant accepted decisions and active task records
- Directly inspected source, tests, fixtures, and current evidence

Also inspect the exact implementation, tests, fixtures, and current revision implicated by the task. The integration-architecture references bundled with this library are staged evidence, not accepted Storyworld authority.

## Required inputs

- CommerceFoundryBrief_or_StoryworldCommerceBundle
- exact_versions
- authority_host
- rights_and_commercial_policy

## Optional inputs

- print_proof
- product_snapshot
- claim_evidence
- vendor_status

## Preconditions

- The current request and side effects are explicit.
- Applicable `AGENTS.md` files and `.agent/` governance have been read.
- Accepted decisions and active tasks relevant to the work have been identified.
- Any required successor decision is accepted or the work is limited to research/proposal/POC scope.
- Credentials, provider calls, spending, deployment, publication, and external communication remain disabled unless separately and explicitly authorized.
- The task has a rollback, replacement, or safe stop path proportionate to its risk.

## Workflow

1. Receive immutable brief/product/claim/offer inputs under Commerce Foundry authority
2. Pin exact versions into Storyworld production context without copying authority
3. Create Storyworld creative assets, rights evidence, evaluations, and bundle receipts
4. Send immutable creative/print package as an unapproved commercial candidate
5. Receive Commerce Foundry commercial findings, approval/rejection, publication, vendor, order, and fulfillment status
6. Store normalized references and receipts without claiming the external state
7. Handle supersession and rework across the peer-system boundary

## Required invariants

- Approval layers never imply one another
- Product truth and claims remain Commerce Foundry-owned
- Storyworld keeps standalone portable exports
- External receipts are evidence of peer-host state

## Allowed side effects

`external_effects_require_explicit_current_authorization`

This label describes the maximum class the skill may support when the **active task already authorizes it**. It does not itself authorize any side effect.

## Prohibited actions

- Storyworld direct vendor submission by default
- Commerce Foundry canon writes
- Silent product snapshot drift
- Commercial publication without Commerce Foundry authority for CF-originated work

## Required outputs

- CommerceFoundryBrief
- StoryworldCommerceBundle
- CommerceFoundryReceipt
- commercial_findings
- status_projection
- rework_proposal

Outputs must distinguish observed facts, external research, owner direction, inference, recommendation, open decision, rejected alternative, and deferred consideration where relevant.

## Validation and evidence

- Commercial rejection of creatively accepted package
- Stale product/claim snapshot
- Print proof failure
- Authority-host outage
- Receipt mismatch
- Vendor credential separation

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

- DEC-0051

### Related contracts

- CommerceFoundryBrief
- StoryworldCommerceBundle
- CommerceFoundryReceipt

### Related POCs

- POC-11

### Relevant repository paths

- packages/integration/
- packages/contracts/
- packages/portability/
- apps/studio/

### Skill dependencies

- storyworld-contract-authoring
- storyworld-asset-custody-and-lineage
- storyworld-rights-and-consent-review
- storyworld-security-review

Dependencies identify workflow prerequisites, not authority inheritance.

## Bundled profiles

- No vendor- or medium-specific profiles are bundled for this skill.

## Example tasks

- None.

## Package references

- [`checklist.md`](references/checklist.md)
- [`output-contract.md`](references/output-contract.md)
- [`failure-cases.md`](references/failure-cases.md)
- [`provenance.json`](references/provenance.json)

Read `references/provenance.json` before adopting or modifying this package.
