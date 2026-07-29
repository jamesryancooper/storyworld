# VENDORED from packages/shared/foundry_assets/fal_edit.py (Commerce Foundry).
# Stdlib-only by design so this package is self-contained.
# Re-sync: copy fal_edit.py here and re-add this header (locked by
# tests/test_vendored_fal_contract.py).

"""The governed fal image-edit contract — reusable, dependency-light.

This module is the single source of truth for HOW Foundry talks to fal's edit
endpoints: the model ids per operation, the payload -> fal-input mapping, the
result-URL extraction, and the queue REST transport (submit -> poll -> download)
with its hard-won quirks and safety guards:

- fal's queue returns HTTP 202 while a job runs and 200 only on COMPLETED;
- inputs go in as data URIs (no separate upload, no extra URL to trust);
- every fetched URL is host-checked against fal's domains (SSRF guard);
- the result download is streamed, identity-encoded, and size-bounded;
- untrusted responses fail closed (non-JSON / off-domain / oversize -> error).

It deliberately depends only on the standard library (plus a lazily-imported
httpx), so an external editor — an InvokeAI FalProvider, a ComfyUI node — can
vendor or import it and reach fal exactly the way Foundry does, instead of
re-deriving these behaviours. Foundry's own post-processing (fit-to-brief,
alpha compositing, re-QA) lives in `editing.py`/the design service, NOT here:
this module returns the RAW fal output bytes.
"""

import base64
import time
from collections.abc import Callable
from typing import Any, Protocol
from urllib.parse import urlparse


class ImageEditError(Exception):
    """An edit could not be performed; the caller fails closed.

    Shared by the hosted fal contract here and the local edit adapters in
    editing.py, so every edit path raises one catchable, fail-closed type.
    """


# fal model ids per Foundry edit operation.
FAL_EDIT_MODELS = {
    "remove_background": "fal-ai/birefnet",
    "refine": "fal-ai/flux/dev/image-to-image",
    "inpaint": "fal-ai/flux-lora/inpainting",
    "upscale": "fal-ai/topaz/upscale/image",
}
# upscale DELIBERATELY changes dimensions (a print-prep step).
UPSCALE_FACTORS = (2, 4)


class FalEditTransport(Protocol):
    def run(self, model: str, payload: dict[str, Any]) -> bytes: ...


class DisabledFalEditTransport:
    """Fail-closed stand-in used until fal is configured/approved."""

    def run(self, model: str, payload: dict[str, Any]) -> bytes:
        raise ImageEditError(
            "fal edit transport is disabled; a fal API key and the reserved "
            "external-integration approval are required"
        )


# Every URL we fetch — the submit endpoint, the status/result URLs fal hands
# back, and the final image URL — must resolve to fal's own domains. This is
# an SSRF guard: a malicious or compromised response cannot redirect our
# authenticated client at an internal address.
_FAL_HOST_SUFFIXES = (".fal.run", ".fal.media", ".fal.ai")
_FAL_HOST_EXACT = frozenset({"fal.run", "fal.media", "fal.ai"})
_FAL_SUBMIT_BASE = "https://queue.fal.run"
# fal edit outputs are well under this; a bound stops an oversized download.
_FAL_MAX_RESULT_BYTES = 64_000_000


def _fal_host_allowed(url: str) -> bool:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.hostname:
        return False
    host = parsed.hostname.lower()
    if host in _FAL_HOST_EXACT:
        return True
    return any(host.endswith(suffix) for suffix in _FAL_HOST_SUFFIXES)


def _png_data_uri(data: bytes) -> str:
    return "data:image/png;base64," + base64.b64encode(data).decode("ascii")


def build_fal_input(model: str, payload: dict[str, Any]) -> dict[str, Any]:
    """Map an edit payload to a fal model's input schema.

    Images go in as data URIs so no separate upload round-trip (and no extra
    URL to trust) is needed. PNG output is requested so the adapter's PNG
    check passes and transparency survives. Payload keys: image_bytes
    (required), prompt (refine/inpaint), mask_bytes (inpaint), upscale_factor
    (upscale).
    """
    image_url = _png_data_uri(payload["image_bytes"])
    if model == FAL_EDIT_MODELS["remove_background"]:
        return {"image_url": image_url}
    if model == FAL_EDIT_MODELS["upscale"]:
        return {
            "image_url": image_url,
            "upscale_factor": int(payload.get("upscale_factor", 2)),
            "output_format": "png",
        }
    inputs: dict[str, Any] = {
        "image_url": image_url,
        "prompt": payload.get("prompt", "") or "",
        "output_format": "png",
    }
    if model == FAL_EDIT_MODELS["inpaint"]:
        mask = payload.get("mask_bytes")
        if not mask:
            raise ImageEditError("inpaint requires a mask")
        inputs["mask_url"] = _png_data_uri(mask)
    return inputs


def _fal_json(resp: Any, what: str) -> Any:
    """Parse an untrusted fal response body, failing closed on non-JSON.

    fal (or a gateway in front of it) can return a 2xx with an HTML error
    page or empty body; httpx's .json() would raise a raw ValueError that
    escapes the module's ImageEditError contract. Normalise it here.
    """
    try:
        return resp.json()
    except ValueError as exc:  # includes json.JSONDecodeError
        raise ImageEditError(f"fal {what} response was not valid JSON") from exc


def extract_result_url(result: Any) -> str:
    """Pull the single output image URL from a fal result payload."""
    if not isinstance(result, dict):
        raise ImageEditError("fal result payload was not a JSON object")
    images = result.get("images")
    if isinstance(images, list) and images and isinstance(images[0], dict):
        url = images[0].get("url")
    else:
        image = result.get("image")
        url = image.get("url") if isinstance(image, dict) else None
    if not isinstance(url, str) or not url:
        raise ImageEditError("fal result did not contain an image URL")
    return url


def _poll_until_complete(
    client: Any,
    status_url: str,
    auth: dict[str, str],
    *,
    sleep: Callable[[float], None],
    poll_interval_s: float,
    max_polls: int,
) -> None:
    # fal's queue gateway returns 202 (Accepted) while a job is IN_QUEUE /
    # IN_PROGRESS and 200 only once it COMPLETES. Treat 202 — and any 200
    # whose body isn't yet a terminal status — as "keep polling"; only a
    # parsed COMPLETED/ERROR/FAILED is terminal, and the poll budget bounds
    # a persistently-stuck job.
    for _ in range(max_polls):
        resp = client.get(status_url, headers=auth)
        if resp.status_code not in (200, 202):
            raise ImageEditError(f"fal status returned {resp.status_code}")
        status = None
        try:
            body = resp.json()
        except ValueError:
            body = None  # non-JSON (e.g. an empty 202) -> still pending
        if isinstance(body, dict):
            status = body.get("status")
        if status == "COMPLETED":
            return
        if status in ("ERROR", "FAILED"):
            raise ImageEditError(f"fal reported status {status}")
        sleep(poll_interval_s)
    raise ImageEditError("fal did not complete within the poll budget (timed out)")


def _download_image(
    client: Any, url: str, auth: dict[str, str], *, max_result_bytes: int
) -> bytes:
    # Stream and cap incrementally: a non-streaming read buffers the whole
    # body first, and "Accept-Encoding: identity" refuses server-side
    # compression so a tiny payload can't decompress into a memory bomb.
    headers = {**auth, "Accept-Encoding": "identity"}
    with client.stream("GET", url, headers=headers) as resp:
        if resp.status_code != 200:
            raise ImageEditError(f"fal image download returned {resp.status_code}")
        declared = (
            resp.headers.get("content-length") if hasattr(resp, "headers") else None
        )
        if declared is not None:
            try:
                if int(declared) > max_result_bytes:
                    raise ImageEditError("fal result image exceeds the size bound")
            except (TypeError, ValueError):
                pass
        chunks: list[bytes] = []
        total = 0
        for chunk in resp.iter_bytes():
            total += len(chunk)
            if total > max_result_bytes:
                raise ImageEditError("fal result image exceeds the size bound")
            chunks.append(chunk)
    return b"".join(chunks)


def run_fal_queue_job(
    client: Any,
    model: str,
    inputs: dict[str, Any],
    auth: dict[str, str],
    *,
    submit_base: str,
    poll_interval_s: float,
    max_polls: int,
    max_result_bytes: int,
    sleep: Callable[[float], None],
) -> bytes:
    """The shared fal queue flow: submit -> poll -> download -> raw bytes.

    Every fetched URL (the submit endpoint plus the status/result/image URLs
    fal hands back) is host-checked against fal's domains (SSRF guard) and
    the download is size-bounded. Used by BOTH the edit and generation
    transports so the hard-won queue behaviour lives in one place.
    """
    submit = client.post(f"{submit_base}/{model}", json=inputs, headers=auth)
    if submit.status_code not in (200, 201):
        raise ImageEditError(f"fal submit returned {submit.status_code}")
    queued = _fal_json(submit, "submit")
    if not isinstance(queued, dict):
        raise ImageEditError("fal submit response was not a JSON object")
    status_url = queued.get("status_url")
    response_url = queued.get("response_url")
    if not isinstance(status_url, str) or not isinstance(response_url, str):
        raise ImageEditError("fal submit response missing status/result URL")
    if not _fal_host_allowed(status_url) or not _fal_host_allowed(response_url):
        raise ImageEditError("fal returned an off-domain callback URL")

    _poll_until_complete(
        client, status_url, auth,
        sleep=sleep, poll_interval_s=poll_interval_s, max_polls=max_polls,
    )

    result_resp = client.get(response_url, headers=auth)
    if result_resp.status_code != 200:
        raise ImageEditError(f"fal result fetch returned {result_resp.status_code}")
    image_url = extract_result_url(_fal_json(result_resp, "result"))
    if not _fal_host_allowed(image_url):
        raise ImageEditError("fal image URL is off-domain; refusing to fetch")
    return _download_image(client, image_url, auth, max_result_bytes=max_result_bytes)


class HttpFalEditTransport:
    """Real fal queue-API transport: submit -> poll -> download.

    Gated and fail-closed: constructed only with an explicit API key. Every
    fetched URL is host-checked against fal's domains (SSRF guard) and the
    downloaded image is size-bounded. The key is sent as an Authorization
    header and never logged.
    """

    def __init__(
        self, api_key: str,
        *,
        http: Any | None = None,
        submit_base: str = _FAL_SUBMIT_BASE,
        timeout_s: float = 120.0,
        poll_interval_s: float = 1.0,
        max_polls: int = 180,
        max_result_bytes: int = _FAL_MAX_RESULT_BYTES,
        sleep: Callable[[float], None] = time.sleep,
    ):
        if not api_key or not api_key.strip():
            raise ImageEditError("fal transport requires a non-empty API key")
        self._api_key = api_key.strip()
        self._http = http
        self._submit_base = submit_base.rstrip("/")
        self._timeout = timeout_s
        self._poll_interval = poll_interval_s
        self._max_polls = max_polls
        self._max_result_bytes = max_result_bytes
        self._sleep = sleep

    def _client(self) -> Any:
        if self._http is not None:
            return self._http
        try:
            import httpx
        except ImportError as exc:  # pragma: no cover - optional extra
            raise ImageEditError(
                "the fal transport requires httpx (install the "
                "foundry-shared[fal] extra)"
            ) from exc
        return httpx.Client(timeout=self._timeout)

    @property
    def _auth(self) -> dict[str, str]:
        return {"Authorization": f"Key {self._api_key}"}

    def run(self, model: str, payload: dict[str, Any]) -> bytes:
        inputs = build_fal_input(model, payload)
        client = self._client()
        try:
            return run_fal_queue_job(
                client, model, inputs, self._auth,
                submit_base=self._submit_base,
                poll_interval_s=self._poll_interval,
                max_polls=self._max_polls,
                max_result_bytes=self._max_result_bytes,
                sleep=self._sleep,
            )
        finally:
            close = getattr(client, "close", None)
            if self._http is None and callable(close):
                close()


def run_fal_edit(
    operation: str,
    image_png: bytes,
    *, api_key: str | None = None,
    prompt: str | None = None,
    mask_png: bytes | None = None,
    scale: int | None = None,
    transport: FalEditTransport | None = None,
) -> bytes:
    """One-call fal edit: operation + image (+ params) -> RAW fal PNG bytes.

    The reusable entry point for an external editor. Supply either a fal
    api_key (a real HttpFalEditTransport is built) or an explicit transport
    (e.g. for tests). Returns fal's raw output; any print-spec fitting is the
    caller's concern.
    """
    model = FAL_EDIT_MODELS.get(operation)
    if model is None:
        raise ImageEditError(f"unknown edit operation {operation!r}")
    payload: dict[str, Any] = {"image_bytes": image_png}
    if operation in ("refine", "inpaint"):
        payload["prompt"] = prompt or ""
    if operation == "inpaint":
        if not mask_png:
            raise ImageEditError("inpaint requires a mask")
        payload["mask_bytes"] = mask_png
    if operation == "upscale":
        factor = scale or 2
        if factor not in UPSCALE_FACTORS:
            raise ImageEditError(f"unsupported upscale factor {factor!r}")
        payload["upscale_factor"] = factor
    if transport is None:
        if not api_key:
            raise ImageEditError("run_fal_edit needs an api_key or a transport")
        transport = HttpFalEditTransport(api_key)
    out = transport.run(model, payload)
    if out[:8] != b"\x89PNG\r\n\x1a\n":
        raise ImageEditError("fal edit returned non-PNG data")
    return out
