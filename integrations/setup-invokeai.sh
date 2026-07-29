#!/usr/bin/env bash
# Stand up InvokeAI (CPU) with the Storyworld fal provider (vendored from CF, SRC-0005) patched in.
# Idempotent: safe to re-run.
#
#   integrations/setup-invokeai.sh [RUNTIME_ROOT]
#
# InvokeAI needs its own Python (3.10-3.12; NOT Foundry's 3.14). It is installed
# from PyPI (pre-built web UI), then the fal provider files are patched into the
# installed package and registered. Runs CPU-only (fal does the compute).
#
# NOTE: two steps remain manual after this script (they are UI actions):
#   1. Register a "fal" external model in InvokeAI's Model Manager (External
#      Providers), with modes=[img2img,inpaint], mask_format=binary.
#   2. Confirm mask polarity with one inpaint (fal = white-regenerates).
set -euo pipefail

ROOT="${1:-$HOME/storyworld-tools}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INV="$ROOT/InvokeAI"
INV_ROOT="$INV/root"          # InvokeAI's data/config dir
# InvokeAI's code uses typing.Self, so it needs Python 3.11+ (its package
# metadata wrongly allows 3.10, which then crashes at import). uv fetches this.
PY_VERSION="3.12"

echo "==> runtime root: $ROOT"
mkdir -p "$INV_ROOT"

if [ ! -x "$INV/.venv/bin/python" ]; then
  echo "==> creating venv (python $PY_VERSION)"
  uv venv --python "$PY_VERSION" "$INV/.venv"
fi
VPY="$INV/.venv/bin/python"

echo "==> installing InvokeAI + httpx (large: torch/diffusers/transformers)"
uv pip install --python "$VPY" InvokeAI httpx

# The external-generation provider system only exists on InvokeAI's development
# branch (main) — it is NOT in the current PyPI release. If it is missing, the
# FalProvider cannot be loaded here: install stops with clear guidance rather
# than patching files that do not exist.
if ! "$VPY" -c "import importlib.util as u; import sys; sys.exit(0 if u.find_spec('invokeai.app.services.external_generation') else 1)"; then
  cat <<'MSG'

==> NOTE: this InvokeAI release does not include the external-provider system
    (invokeai.app.services.external_generation) — it is only on InvokeAI's
    development branch. The fal provider is ready but cannot be registered here.

    Options:
      A. Use this released InvokeAI as the human editor now. The governed round
         trip still works: edit in InvokeAI's canvas (its own models), then
         return to Foundry via the handoff/receipt API. fal edits stay in
         Foundry / the ComfyUI lab.
      B. When InvokeAI ships external providers in a release (or if you run it
         from the `main` branch), re-run this script to patch the fal provider in.

    InvokeAI itself is installed and can be launched (see below).
MSG
  echo ""
  echo "  launch (CPU, loopback):"
  echo "    export INVOKEAI_ROOT=\"$INV_ROOT\""
  echo "    $VPY -m invokeai.app.run_app --host 127.0.0.1 --port 9090"
  exit 0
fi

# Locate the installed provider package inside site-packages.
PROVIDERS_DIR="$("$VPY" - <<'PY'
import pathlib, invokeai.app.services.external_generation.providers as p
print(pathlib.Path(p.__file__).parent)
PY
)"
echo "==> patching the fal provider into: $PROVIDERS_DIR"
cp "$REPO/integrations/invokeai-fal-provider/fal.py" "$PROVIDERS_DIR/fal.py"
cp "$REPO/integrations/invokeai-fal-provider/_fal_edit.py" "$PROVIDERS_DIR/_fal_edit.py"

# Register the provider (idempotent edits).
"$VPY" - "$PROVIDERS_DIR" <<'PY'
import re, sys, pathlib
providers = pathlib.Path(sys.argv[1])
# 1) export FalProvider from providers/__init__.py
init = providers / "__init__.py"
t = init.read_text()
if "FalProvider" not in t:
    t += ("from invokeai.app.services.external_generation.providers.fal import FalProvider  # foundry\n")
    t = re.sub(r"__all__\s*=\s*\[", '__all__ = ["FalProvider", ', t, count=1)
    init.write_text(t)
    print("  registered in providers/__init__.py")
else:
    print("  providers/__init__.py already has FalProvider")

# 2) add FalProvider to the providers dict in app/api/dependencies.py
# providers/ -> external_generation -> services -> app ; then app/api/dependencies.py
deps = providers.parents[2] / "api" / "dependencies.py"
d = deps.read_text()
if "FalProvider" not in d:
    d = d.replace(
        "    OpenAIProvider,\n",
        "    FalProvider,\n    OpenAIProvider,\n", 1)
    d = re.sub(
        r"(providers=\{\s*\n)",
        r"\1                FalProvider.provider_id: FalProvider(app_config=configuration, logger=logger),\n",
        d, count=1)
    deps.write_text(d)
    print("  registered in api/dependencies.py")
else:
    print("  api/dependencies.py already has FalProvider")

app = providers.parents[2]        # .../invokeai/app
invk = providers.parents[3]       # .../invokeai

# 3) let the UI recognise fal: EXTERNAL_PROVIDER_FIELDS in api/routers/app_info.py
app_info = app / "api" / "routers" / "app_info.py"
a = app_info.read_text()
if '"fal":' not in a:
    a = a.replace(
        'EXTERNAL_PROVIDER_FIELDS: dict[str, tuple[str, str]] = {\n',
        'EXTERNAL_PROVIDER_FIELDS: dict[str, tuple[str, str]] = {\n'
        '    "fal": ("external_fal_api_key", "external_fal_base_url"),\n', 1)
    app_info.write_text(a)
    print("  registered in EXTERNAL_PROVIDER_FIELDS")
else:
    print("  EXTERNAL_PROVIDER_FIELDS already has fal")

# 4) config fields so the key can be set in the UI (env FAL_KEY also works)
cfg = app / "services" / "config" / "config_default.py"
c = cfg.read_text()
if "external_fal_api_key" not in c:
    c = c.replace('    "external_openai_api_key",\n',
                  '    "external_fal_api_key",\n    "external_fal_base_url",\n    "external_openai_api_key",\n', 1)
    c = c.replace(
        '    external_openai_api_key: Optional[str] = Field(default=None, description="API key for OpenAI image generation.")\n',
        '    external_fal_api_key: Optional[str] = Field(default=None, description="API key for fal image generation.")\n'
        '    external_fal_base_url: Optional[str] = Field(default=None, description="Base URL for fal image generation.")\n'
        '    external_openai_api_key: Optional[str] = Field(default=None, description="API key for OpenAI image generation.")\n', 1)
    cfg.write_text(c)
    print("  added external_fal_api_key/base_url config fields")
else:
    print("  config already has external_fal_api_key")

# 5) a fal starter model so a fal option auto-installs for the configured provider
sm = invk / "backend" / "model_manager" / "starter_models.py"
s = sm.read_text()
if "foundry_fal_flux" not in s:
    entry = (
        'foundry_fal_flux = StarterModel(\n'
        '    name="fal FLUX (edit + inpaint)",\n'
        '    source="external://fal/fal-ai/flux/dev",\n'
        '    description="Storyworld fal provider (vendored from CF, SRC-0005): img2img (flux dev) + inpaint (flux inpainting).",\n'
        '    base=BaseModelType.External,\n'
        '    type=ModelType.ExternalImageGenerator,\n'
        '    capabilities=ExternalModelCapabilities(\n'
        '        modes=["img2img", "inpaint"],\n'
        '        mask_format="binary",\n'
        '        input_image_required_for=["img2img", "inpaint"],\n'
        '        supports_negative_prompt=False,\n'
        '    ),\n'
        ')\n\n\n'
    )
    s = s.replace("STARTER_MODELS: list[StarterModel] = [\n",
                  entry + "STARTER_MODELS: list[StarterModel] = [\n    foundry_fal_flux,\n", 1)
    sm.write_text(s)
    print("  added fal starter model")
else:
    print("  starter_models.py already has the fal model")
PY

echo ""
echo "InvokeAI is installed and the fal provider code is registered locally"
echo "(provider + UI config field + a 'fal FLUX (edit + inpaint)' model that"
echo "is available only after the separately operator-approved live crossing)."
echo "  Registration is not authorization to supply a real key, start a live"
echo "  provider transport, incur spend, or make an external request."
echo "  Keep the provider disabled until the operator explicitly approves that"
echo "  crossing and supplies the current runbook, credential, and policy values."
echo ""
echo "  Local contract tests cover img2img/inpaint and white=regenerate mask"
echo "  polarity. This setup command performs no live-provider conformance call."
