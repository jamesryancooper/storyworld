# Provider Boundary Profile

**Parent skill:** `storyworld-provider-adapter`  
**Status:** implementation guidance; noncanonical and unadopted.

## Purpose

Canonical GenerationRecipe -> noncanonical ProviderExecutionPlan -> ProviderExecutionResult -> quarantine/candidate. Prompt, seed, model, workflow, LoRA, endpoint, upload URL, and provider safety parameters stay noncanonical.

## Storyworld boundary

- Storyworld-owned contracts, exact versions, policy, custody, evaluation, and human authority remain controlling.
- Vendor, tool, library, file-format, workflow, and UI details remain behind adapters or profiles.
- This profile cannot authorize credentials, external calls, installation, publication, deployment, or dependency adoption.
- Recheck current official documentation, version, license, security posture, and behavior before implementation.

## Required implementation record

- exact dependency/tool/provider version;
- supported capability and excluded capabilities;
- input/output mapping to Storyworld contracts;
- data/credential/egress classification;
- version and replacement strategy;
- failure, timeout, retry, cancellation, and unknown-outcome behavior;
- accessibility and security evidence where applicable;
- fixtures and validation results;
- migration and teardown plan.
