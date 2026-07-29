# Implement a First-Class fal.ai Provider in InvokeAI

> Owner-supplied guidance (SRC-0004), stored verbatim 2026-07-28. The owner
> notes: "I don't claim these instructions are 100% accurate for this
> usecase. Treat them as guidance and determine how best to use fal.ai with
> InvokeAI." Cross-check against the pinned InvokeAI checkout and the
> Commerce Foundry live-verified provider (SRC-0005) before implementing.

## Objective

Add fal.ai as a **first-class external image-generation provider** in the InvokeAI distribution used by Storyworld Studio.

The completed integration must:

* Let an administrator configure a fal.ai API key through InvokeAI's **External Providers** interface.
* Register selected fal.ai endpoints as InvokeAI external models.
* Make those models available through InvokeAI's normal model picker, Canvas, and workflow system.
* Support accurate model-specific capabilities such as text-to-image, image-to-image, reference images, inpainting, dimensions, seeds, and image counts.
* Import generated images into InvokeAI rather than leaving them as temporary fal.ai URLs.
* Preserve fal.ai request identifiers and useful provenance metadata.
* Avoid exposing API keys or silently submitting unsupported parameters.

This is a modification to the InvokeAI backend and frontend—not a custom node pack.

## Official documentation

1. **InvokeAI: External Provider Integration** (https://invoke.ai/contributing/external-providers/) — primary implementation guide: configuration fields, provider adapter, provider registration, starter models, optional frontend changes.
2. **InvokeAI: External Models** — how external models work in the model manager, model picker, Canvas, and workflows.
3. **InvokeAI: Development Environment** — supported fork, checkout, Python dependency, frontend dependency, development-build process.
4. **fal.ai: Client Setup** — `fal-client` installation, authentication, invocation methods.
5. **fal.ai: Asynchronous Inference** — queue submission, request IDs, status polling, result retrieval, cancellation.
6. **fal.ai: File and CDN Uploads** — uploading local images before passing them to fal endpoints.
7. **fal.ai: Data Retention and Storage** — input/output storage controls and media lifecycle behavior.

If proposed upstream, discuss with the InvokeAI maintainers before a large pull request.

---

# 1. Architectural decision

Provider identifier: `fal`. Register fal models using sources such as:

```text
external://fal/fal-ai/flux/schnell
external://fal/fal-ai/flux/dev
external://fal/fal-ai/flux-pro/v1.1
```

The complete fal endpoint identifier must be retained as `provider_model_id`; external model configuration stores provider and provider-specific identifier separately, serialized as `external://<provider>/<provider-model-id>`.

## Do not build an unrestricted endpoint proxy

Do not allow arbitrary fal endpoints with arbitrary JSON passthrough. fal endpoints differ in input parameter names, required input images, dimension formats, seed behavior, image-count parameters, output structures, reference-image semantics, and inpainting/mask requirements. Instead: an explicit, version-controlled **fal model specification registry** — every supported endpoint has a tested mapping between InvokeAI's normalized request contract and that endpoint's fal schema.

---

# 2. The InvokeAI provider contract

A provider subclasses `ExternalProvider` and implements `provider_id`, `is_configured()`, and `generate(request: ExternalGenerationRequest) -> ExternalGenerationResult` (synchronous; has app configuration and logger access).

`ExternalGenerationRequest` supplies: model configuration, generation mode, prompt, seed, number of images, width/height, named image-size preset, initial image, mask image, reference images, metadata, provider-specific options.

The provider returns: decoded PIL images, seed used where known, provider request ID, provider metadata, content-filter metadata where available. Use the existing `OpenAIProvider` as the structural reference.

---

# 3. Repository changes

- **3.1** Add `fal-client` to InvokeAI's runtime dependencies (pyproject dependency group + lockfile). Pin via the normal lockfile workflow.
- **3.2** Config fields in `invokeai/app/services/config/config_default.py`: `external_fal_api_key`, `external_fal_base_url` (both added to `EXTERNAL_PROVIDER_CONFIG_FIELDS` for storage/redaction). API key persists through the external-key storage mechanism, not plain `invokeai.yaml`.
- **3.3** Register in `invokeai/app/api/routers/app_info.py` `EXTERNAL_PROVIDER_FIELDS`: `"fal": ("external_fal_api_key", "external_fal_base_url")`.
- **3.4** Provider implementation at `invokeai/app/services/external_generation/providers/fal.py` (`class FalProvider(ExternalProvider): provider_id = "fal"`), exported from the providers `__init__.py`.
- **3.5** Register in `invokeai/app/api/dependencies.py` in the provider dict passed to `ExternalGenerationService`.
- **3.6** Starter models in `invokeai/backend/model_manager/starter_models.py`: `base=External`, `type=ExternalImageGenerator`, `format=ExternalApi`, `source="external://fal/<exact-fal-endpoint>"`, display name, description, accurate capability matrix, optional defaults/panel schema. **Start with a deliberately small allowlist** (one production txt2img, one fast/economical txt2img, one image-edit/reference endpoint).

---

# 4. Model-specification registry

`invokeai/app/services/external_generation/providers/fal_models.py`: frozen `FalModelSpec` dataclass (endpoint_id, build_arguments, extract_images, extract_seed, timeout_seconds) and `FAL_MODEL_SPECS: dict[str, FalModelSpec]`. The provider rejects unknown endpoints even when present in an externally created model record — a controlled compatibility boundary.

---

# 5. fal client and authentication

`fal_client.SyncClient(key=api_key, default_timeout=timeout_seconds)` — per-client credential; never mutate `os.environ["FAL_KEY"]` per request. Base URL: verify whether the pinned `fal-client` exposes a per-client base-URL override; if not, either (recommended initially) support only official fal hosts and reject nonempty `external_fal_base_url`, or implement direct fal queue HTTP transport. Never display a configurable base URL and silently ignore it.

---

# 6. Queue API

Use fal's queue-oriented execution (`client.subscribe(...)` with `on_enqueue` capturing the request ID; queue/start timeout plus total client timeout; verify exact signatures against the pinned client). For deeper cancellation/progress: `client.submit(...)` / `handle.status/get/cancel`.

---

# 7. Request translation

Each spec implements its own argument builder from `request.{prompt,seed,num_images,width,height,init_image,mask_image,reference_images,provider_options}` to endpoint-specific fields, with names from the endpoint's official fal schema. **Never** `arguments.update(request.provider_options)`; allowlist and validate each option (endpoint supports it, capabilities expose it, type/range validated, test covers it).

---

# 8. Input uploads

Use the official client's upload functionality: convert PIL to appropriate mode, encode PNG unless the endpoint requires otherwise, upload, return URL, short configurable object lifecycle, never log keys/signed headers. Map per the model specification; field names vary by endpoint.

---

# 9. Output normalization

Responses vary (images array, singular image, nested). Each spec extracts normalized records (URL, dimensions, content type, seed where supplied). Download every result immediately to PIL. Apply: HTTPS-only, connection/read timeouts, max response size, max image count, content-type validation, PIL decode verification, decompression-bomb protection, clear errors for empty/malformed results. Do not treat a fal CDN URL as durable storage; import into InvokeAI, keep only sanitized provenance.

---

# 10. Privacy and retention

Send `X-Fal-Store-IO: 0` by default; short upload lifecycles; download outputs immediately; never persist keys/authorization headers/complete raw responses in metadata; document that fal-hosted URLs may be externally accessible during retention; longer retention only as an explicit administrator setting. Sanitized provenance example: provider, endpoint, request_id, seed, input_retention, media_lifecycle.

---

# 11. Error translation

Map to InvokeAI's standard errors — `ExternalProviderCapabilityError`, `ExternalProviderRequestError`, `ExternalProviderRateLimitError` (with `retry_after`): missing key/unsupported endpoint/401/403/422/timeouts/malformed/no-images → RequestError; unsupported mode or missing image → CapabilityError; 429 → RateLimitError. After an ambiguous network failure with a known request ID, attempt status/result retrieval before resubmitting (avoid duplicate billed generations).

---

# 12. Cancellation limitation

`generate()` is synchronous without a cancellation token. Initial: client timeouts + cancel-on-timeout, documented that InvokeAI Cancel may not immediately cancel a submitted fal job. Production: extend the execution path so the provider observes cancellation and calls fal's remote cancel with the captured request ID.

---

# 13. Model capabilities

Per-endpoint accurate capabilities (modes txt2img/img2img/inpaint, reference-image support/max, negative prompt, seed, guidance, steps, max images, max size, aspect ratios, resolution presets, mask format, input-image-required-for). Never copy one matrix across models — capabilities drive both validation and exposed controls.

---

# 14. Frontend

`ExternalProvidersForm.tsx`: add `fal` to `PROVIDER_SORT_ORDER`; optional icon; card labeled **fal.ai**; keys masked; reset removes fal external models consistently; saving a key installs only approved starter models.

---

# 15. Illustrative provider skeleton

(Full Python skeleton as supplied — `FalProvider(ExternalProvider)` with `is_configured`, spec lookup and rejection, `SyncClient` per-request-scoped key, `on_enqueue` request-ID capture, spec-driven argument building with an upload callback, output extraction/download, seed handling, sanitized metadata, and error translation via helper methods carrying the security/upload/download/timeout/lifecycle/rate-limit behavior above.)

---

# 16. Required tests

Provider unit tests (configuration, model IDs, all mappings, uploads, normalization, seeds, empty/malformed, auth errors, 429 + retry_after, timeouts, sanitized metadata, privacy headers — all remote calls mocked); model-registration tests (`external://fal/<endpoint>` round trip incl. multi-`/` endpoint IDs, starter installation, capabilities, credential reset removes fal records only); frontend tests (card, masking, save/reset, starter install, no raw key in state/logs); security tests (non-HTTPS rejection, oversize, content-type, image-count, corrupt image, key/header redaction); opt-in live smoke tests requiring a locally supplied `FAL_KEY` — never billable generation in ordinary CI.

---

# 17. Definition of done

fal appears in External Providers; key save/reset with redaction via the existing secret mechanism; approved starter models installable and visible in the normal picker; ≥1 txt2img and ≥1 image-based model work end to end; uploads have explicit lifecycle; outputs imported; request IDs retained; capabilities accurate; unsupported endpoints/parameters rejected; standard error types incl. rate limits; privacy/retention implemented and documented; base-URL behavior fully supported or explicitly rejected; cancellation implemented or documented; all test suites pass; Studio documentation lists supported endpoints and limitations.

---

*Addendum (analysis note, 2026-07-28): the Commerce Foundry reference at
`/Users/jamesryancooper/Projects/commerce-foundry/integrations/invokeai-fal-provider/`
corroborates the core interface claims (ExternalProvider contract, provider
registration point, `external_fal_api_key` beside `external_openai_api_key`)
against a real InvokeAI checkout, adds live-verified facts this guide lacks
(InvokeAI requires Python 3.11/3.12; CPU-only viable; inpaint mask polarity:
white = regenerate), and demonstrates a leaner vendored-contract approach
(img2img + inpaint via a governed edit module) that Storyworld will combine
with this guide's spec-registry pattern for txt2img endpoints.*
