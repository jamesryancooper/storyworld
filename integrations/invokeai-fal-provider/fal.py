"""Commerce Foundry fal provider for InvokeAI's external-generation system.

A drop-in `ExternalProvider` (like the stock OpenAI/Gemini/Seedream providers)
that routes InvokeAI's canvas edits to fal through the SAME governed contract
Foundry uses (`_fal_edit.run_fal_edit`), so behaviour matches the first-party
pipeline: the 202-poll, RGB output, SSRF host allow-list, and streamed size
bound all come along for free.

Scope: this provider is EDIT-focused — it implements img2img (fal flux
image-to-image) and inpaint (fal flux inpainting), the generative edits
InvokeAI's Unified Canvas is for. Pure post-processing (background removal,
upscale) stays in Foundry / the ComfyUI lab. txt2img is intentionally not
offered here.

Install: see README.md — it lives at
invokeai/app/services/external_generation/providers/fal.py alongside a vendored
_fal_edit.py, and is registered in providers/__init__.py and the providers dict
in app/api/dependencies.py.
"""

from __future__ import annotations

import io
import os

from invokeai.app.services.external_generation.errors import ExternalProviderRequestError
from invokeai.app.services.external_generation.external_generation_base import ExternalProvider
from invokeai.app.services.external_generation.external_generation_common import (
    ExternalGeneratedImage,
    ExternalGenerationRequest,
    ExternalGenerationResult,
)
from PIL import Image
from PIL.Image import Image as PILImageType

from ._fal_edit import ImageEditError, run_fal_edit

# InvokeAI generation mode -> Foundry fal edit operation.
_MODE_TO_OPERATION = {"img2img": "refine", "inpaint": "inpaint"}


def _to_png(image: PILImageType) -> bytes:
    buf = io.BytesIO()
    image.convert("RGBA").save(buf, format="PNG")
    return buf.getvalue()


class FalProvider(ExternalProvider):
    provider_id = "fal"

    def _api_key(self) -> str | None:
        # Prefer InvokeAI's config field if the operator added one; otherwise an
        # environment key. Use a fal key dedicated to InvokeAI so its spend is
        # metered and revocable on its own.
        configured = getattr(self._app_config, "external_fal_api_key", None)
        return (
            configured
            or os.environ.get("FAL_KEY")
            or os.environ.get("FAL_API_KEY")
            or os.environ.get("COMMERCE_FOUNDRY_FAL_KEY")
        )

    def is_configured(self) -> bool:
        return bool(self._api_key())

    def generate(self, request: ExternalGenerationRequest) -> ExternalGenerationResult:
        fal_key = self._api_key()
        if not fal_key:
            raise ExternalProviderRequestError("fal API key is not configured")

        operation = _MODE_TO_OPERATION.get(request.mode)
        if operation is None:
            raise ExternalProviderRequestError(
                f"the fal provider supports img2img and inpaint, not {request.mode!r}"
            )
        if request.init_image is None:
            raise ExternalProviderRequestError(f"fal {request.mode} needs an input image")

        init_png = _to_png(request.init_image)
        mask_png: bytes | None = None
        if operation == "inpaint":
            if request.mask_image is None:
                raise ExternalProviderRequestError("fal inpaint needs a mask")
            # fal treats WHITE as the region to regenerate. InvokeAI hands the
            # mask in the format the model config declares (mask_format); set it
            # so white == edit. See README for the polarity note.
            mask_png = _to_png(request.mask_image)

        try:
            out = run_fal_edit(
                operation,
                init_png,
                prompt=request.prompt or None,
                mask_png=mask_png, api_key=fal_key,
            )
        except ImageEditError as exc:
            raise ExternalProviderRequestError(f"fal edit failed: {exc}") from exc

        result_image = Image.open(io.BytesIO(out)).convert("RGBA")
        result_image.load()
        return ExternalGenerationResult(
            images=[ExternalGeneratedImage(image=result_image)],
            provider_metadata={"provider": "fal", "operation": operation},
        )
