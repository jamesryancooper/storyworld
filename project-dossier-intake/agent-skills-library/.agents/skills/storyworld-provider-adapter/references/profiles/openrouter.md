# OpenRouter Provider Profile

**Parent skill:** `storyworld-provider-adapter`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Use OpenRouter as Storyworld's first strategic language and multimodal intelligence gateway while keeping task semantics, routing policy, structured output, tools, costs, and authority Storyworld-owned.

## Capability profiles

Define named Storyworld profiles rather than letting users or agents send arbitrary model requests:

- `canon_extraction_high_precision`
- `narrative_drafting_creative`
- `continuity_review_long_context`
- `visual_continuity_analysis`
- `rights_sensitive_document_review`
- `fast_metadata_classification`
- translation, transcription, embedding, and reranking profiles as separately evaluated

Each profile declares allowed models/providers, modalities, strict output schema, tool-call availability, maximum input class, retention/ZDR, fallback, quality floor, cost ceiling, timeout, retries, and required human review.

## Execution flow

1. Compile Storyworld context into a bounded analytic or generative request.
2. Create `ProviderEgressDecision` and budget preflight.
3. Resolve fixed or approved automatic routing.
4. Render messages, tools, and JSON Schema into `ProviderExecutionPlan`.
5. Submit with Storyworld correlation/idempotency.
6. Validate strict structured output; reject or repair only through an explicit policy.
7. Treat tool calls as proposed typed actions; Storyworld validates and executes them.
8. Record actual model and underlying provider, usage, cost, fallback, timing, and retention mode.

## Fallback and privacy

- Automatic fallback is permitted only for public, low-risk, nonauthoritative work and only to policy-equivalent routes.
- Disable automatic fallback for canon extraction, rights analysis, private/restricted/highly restricted input, continuity decisions, accepted workflows, and reproduction-critical work.
- Prefer or require zero-retention/data-collection-denied routing according to policy.
- Never place provider API keys, unrelated private context, or raw authority tokens in prompts.

## Failure cases

Test malformed JSON, unsupported strict schema, proposed tool outside allowlist, route/provider mismatch, prohibited fallback, usage/cost missing, timeout with uncertain outcome, provider policy drift, and model deprecation.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
