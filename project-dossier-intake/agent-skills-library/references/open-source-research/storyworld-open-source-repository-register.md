# Storyworld Open-Source Repository Register

**Assessment date:** 2026-07-31  
**Storyworld revision:** `fc9b75b8ae3f28b4b9e13f5c0e31e9f2d24ad565`  
**Status:** staged research, non-authoritative  
**Repositories:** 158

## Disposition legend

- **A — Architectural exemplar**
- **B — Standards or interchange reference**
- **C — Candidate bounded dependency**
- **D — Disposable proof-of-concept dependency**
- **E — Specialist template reference**
- **F — Counterexample or cautionary reference**
- **G — Reject**

## 3D, animation and runtime compilation

### glTF

- **Repository:** https://github.com/KhronosGroup/glTF
- **Disposition / priority:** B — Standards or interchange reference / P0
- **Storyworld capability:** Runtime-oriented 3D transmission format for scenes, meshes, materials, textures, skins, cameras, lights, and animation.
- **License:** Apache-2.0 specification/repo
- **Release / revision:** 2.0 current; extensions evolving · `spec main assessed 2026-07-31`
- **Maintenance:** Mature, widely implemented standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as runtime delivery format where appropriate; keep source/authoring semantics outside glTF.
- **Required Storyworld abstraction:** glTF RuntimeContentAdapter.
- **Data-model risk:** Medium; runtime format is not production source or canon.
- **Lock-in risk:** Low.
- **Next action:** Create validator-backed package fixture with external assets, extensions, and deterministic hashes.
- **Related Storyworld work:** BeKindRewind runtime package; portability.


### glTF Validator

- **Repository:** https://github.com/KhronosGroup/glTF-Validator
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Structural and semantic validation for glTF 2.0.
- **License:** Apache-2.0
- **Release / revision:** current 2.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Maintained official validator.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as blocking technical validator for glTF packages.
- **Required Storyworld abstraction:** RuntimePackageValidator adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Normalize findings into Storyworld release readiness.
- **Related Storyworld work:** Runtime compiler; evaluation.


### OpenUSD

- **Repository:** https://github.com/PixarAnimationStudios/OpenUSD
- **Disposition / priority:** B — Standards or interchange reference / P0
- **Storyworld capability:** Layered/composed scene description, references, payloads, variants, time samples, instancing, schemas, and asset resolution.
- **License:** Apache-2.0
- **Release / revision:** 26.05 (2026-04-24 reported) · `495e00be9b4f02cce75e6f61db1353422e5fd499`
- **Maintenance:** Very active and production-standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as 3D realization/interchange target, not Storyworld world/canon model.
- **Required Storyworld abstraction:** USD export/import profile with Storyworld stable refs and lineage.
- **Data-model risk:** Very high if USD scene graph becomes narrative canon.
- **Lock-in risk:** Low-medium due complexity and ecosystem.
- **Next action:** Build tiny BeKindRewind scene/package POC with layers, variants, time samples, and portable dependencies.
- **Related Storyworld work:** Runtime compiler; 3D assets; DEC-0033 medium realization.


### Godot Engine

- **Repository:** https://github.com/godotengine/godot
- **Disposition / priority:** E — Specialist template reference / P1
- **Storyworld capability:** Open game engine, scene tree, resources, animation, scripting, navigation, audio, UI, packaging, and editor architecture.
- **License:** MIT
- **Release / revision:** current 4.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study runtime/editor architecture and use as one possible BeKindRewind target; runtime state remains external.
- **Required Storyworld abstraction:** GodotRuntimeAdapter and immutable content package.
- **Data-model risk:** Very high if scene/resources/save state become canon.
- **Lock-in risk:** Medium engine-version coupling.
- **Next action:** Run runtime compiler POC only after owner selects first target.
- **Related Storyworld work:** Questionnaire Q14; BeKindRewind.


### PlayCanvas Engine

- **Repository:** https://github.com/playcanvas/engine
- **Disposition / priority:** E — Specialist template reference / P1
- **Storyworld capability:** Web-first 3D engine, scene graph, assets, animation, physics integration, graphics, audio, and browser deployment.
- **License:** MIT
- **Release / revision:** current 2.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Strong first target for browser runtime POC; do not depend on hosted editor services.
- **Required Storyworld abstraction:** PlayCanvasRuntimeAdapter.
- **Data-model risk:** High if engine JSON becomes canonical.
- **Lock-in risk:** Medium engine/API coupling.
- **Next action:** Compare with Godot for package import, offline/self-hosting, accessibility, and replacement.
- **Related Storyworld work:** BeKindRewind runtime selection.


### Babylon.js

- **Repository:** https://github.com/BabylonJS/Babylon.js
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Web 3D engine, loaders, animation, materials, GUI, audio, physics integrations, and tooling.
- **License:** Apache-2.0
- **Release / revision:** current 8.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as alternative web-runtime reference/POC if PlayCanvas constraints fail.
- **Required Storyworld abstraction:** WebRuntimeAdapter.
- **Data-model risk:** High.
- **Lock-in risk:** Medium.
- **Next action:** Keep as second comparison, not parallel permanent target.
- **Related Storyworld work:** Runtime compiler POC.


### OpenToonz

- **Repository:** https://github.com/opentoonz/opentoonz
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** 2D animation production, levels, xsheets, scenes, effects, scanning, cleanup, and render workflow.
- **License:** BSD-3-Clause plus third-party components
- **Release / revision:** current 1.7.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Maintained specialist application.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study 2D animation production semantics and support as external editor only.
- **Required Storyworld abstraction:** 2DAnimation checkout/import adapter.
- **Data-model risk:** Very high if scene/xsheet becomes core.
- **Lock-in risk:** Low study-only.
- **Next action:** Activate when a 2D animation production is scheduled.
- **Related Storyworld work:** Animation template; production pipeline.


### Pencil2D

- **Repository:** https://github.com/pencil2d/pencil
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Simple raster/vector frame-by-frame animation and timeline UX.
- **License:** GPL-2.0
- **Release / revision:** current 0.7 line; verify · `main assessed 2026-07-31`
- **Maintenance:** Maintained smaller project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study simple frame animation/storyboard UI only.
- **Required Storyworld abstraction:** Storyboard/animation template patterns.
- **Data-model risk:** Medium.
- **Lock-in risk:** Low study-only.
- **Next action:** Defer.
- **Related Storyworld work:** Storyboard and animation specialist shelf.


### Synfig Studio

- **Repository:** https://github.com/synfig/synfig
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Vector 2D animation, layers, keyframes, interpolation, bones, and rendering.
- **License:** GPL-3.0
- **Release / revision:** current 1.5 line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active specialist project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as comparative 2D animation reference, not dependency.
- **Required Storyworld abstraction:** No permanent abstraction beyond generic external editor.
- **Data-model risk:** High.
- **Lock-in risk:** Low study-only.
- **Next action:** Defer.
- **Related Storyworld work:** 2D animation specialist shelf.


### three.js

- **Repository:** https://github.com/mrdoob/three.js
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Low-level web 3D rendering, loaders, scene graph, cameras, materials, animation, and examples.
- **License:** MIT
- **Release / revision:** current r18x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study lower-level rendering and use only if a custom runtime is deliberately chosen.
- **Required Storyworld abstraction:** CustomWebRuntimeAdapter.
- **Data-model risk:** High; too low-level for narrative semantics.
- **Lock-in risk:** Medium build-your-own burden.
- **Next action:** Reject as default BeKindRewind runtime unless evidence favors custom control.
- **Related Storyworld work:** Runtime architecture.


## AI generation and external editing

### ComfyUI

- **Repository:** https://github.com/comfyanonymous/ComfyUI
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P0
- **Storyworld capability:** Node-based generative-media workflow execution, model loading, custom nodes, queues, workflow JSON, and local/remote inference.
- **License:** GPL-3.0
- **Release / revision:** rolling releases; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Extremely active ecosystem.
- **Security:** Custom nodes execute arbitrary code; deny-by-default allowlist and isolated containers are mandatory.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only as allowlisted external execution backend behind Storyworld recipes and sandboxed runners.
- **Required Storyworld abstraction:** ComfyUIProviderAdapter mapping canonical recipe to pinned workflow/version.
- **Data-model risk:** Very high; workflow JSON, prompts, models, seeds, and custom-node state are provider implementation details.
- **Lock-in risk:** Very high custom-node supply-chain and workflow lock-in.
- **Next action:** POC pinned workflow/container/node hashes, no DB credentials, egress restrictions, and replacement by another provider.
- **Related Storyworld work:** Accepted provider-neutral ADR; GenerationRecipe; media runner.


### InvokeAI

- **Repository:** https://github.com/invoke-ai/InvokeAI
- **Disposition / priority:** E — Specialist template reference / P1
- **Storyworld capability:** Generative image workspace, canvas, layers, workflows, model management, boards, and editing/inpainting.
- **License:** Apache-2.0 core reported; verify current repository and bundled models
- **Release / revision:** current 5.x/6.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Do not pass restricted assets without policy; isolate model/plugin execution.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Treat as external advanced editor/provider; check out exact inputs and ingest returned output as a new candidate.
- **Required Storyworld abstraction:** InvokeAI checkout/import connector.
- **Data-model risk:** Very high if boards/canvas/database become Storyworld custody.
- **Lock-in risk:** High model/workflow/application coupling.
- **Next action:** Implement manual package round trip before any tighter integration.
- **Related Storyworld work:** Canonical dossier InvokeAI round trip; external-editor POC.


## Editorial, storyboard and temporal media

### Kdenlive

- **Repository:** https://github.com/KDE/kdenlive
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Open NLE, timeline UX, proxies, effects, subtitles, scopes, project files, and MLT integration.
- **License:** GPL-3.0
- **Release / revision:** current 25/26 line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study NLE timeline/proxy/subtitle patterns and use as external editor target through OTIO/MLT where possible.
- **Required Storyworld abstraction:** ExternalEditorAdapter and OTIO interchange.
- **Data-model risk:** Very high if Kdenlive project XML becomes canonical.
- **Lock-in risk:** Low study-only; medium external integration.
- **Next action:** Include in OTIO round-trip POC.
- **Related Storyworld work:** Editorial timeline; external-editor workflow.


### Storyboarder

- **Repository:** https://github.com/WonderUnit/Storyboarder
- **Disposition / priority:** F — Counterexample or cautionary reference / P2
- **Storyworld capability:** Storyboard drawing, shot boards, timing, script integration, and simple animatics.
- **License:** MIT reported; verify assets/dependencies
- **Release / revision:** historical releases; maintenance uncertain · `repository state assessed 2026-07-31`
- **Maintenance:** Historically influential but maintenance posture uncertain.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study UX and file-format pitfalls only.
- **Required Storyworld abstraction:** Storyworld Storyboard/ShotPlan schema.
- **Data-model risk:** High if project file becomes core.
- **Lock-in risk:** High abandonment/Electron dependency risk.
- **Next action:** Use as cautionary precedent; do not adopt without renewed maintenance evidence.
- **Related Storyworld work:** Storyboard POC; directorial intent.


### MLT Multimedia Framework

- **Repository:** https://github.com/mltframework/mlt
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Media-editing engine, multitrack timeline, filters, producers/consumers, and XML serialization.
- **License:** LGPL-2.1-or-later / GPL modules; verify build
- **Release / revision:** current 7.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study lower-level NLE execution; FFmpeg+OTIO is the preferred initial boundary.
- **Required Storyworld abstraction:** Optional timeline-render adapter.
- **Data-model risk:** High if MLT XML becomes canonical.
- **Lock-in risk:** Medium codec/module licensing.
- **Next action:** Defer until Storyworld renders assembled timelines itself.
- **Related Storyworld work:** Video assembly; Kdenlive integration.


## Evaluation, continuity, quality and regression

### axe-core

- **Repository:** https://github.com/dequelabs/axe-core
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Automated accessibility rule engine for web content.
- **License:** MPL-2.0
- **Release / revision:** 4.12.1 currently locked by Storyworld · `Storyworld lockfile/current upstream assessed`
- **Maintenance:** Highly active and already used.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Retain as one test layer; never claim full WCAG conformance from automated checks.
- **Required Storyworld abstraction:** AccessibilityTestAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Extend to Playwright-rendered complex surfaces and preserve human/AT matrix.
- **Related Storyworld work:** Studio tests; accessibility commitment.


### Playwright

- **Repository:** https://github.com/microsoft/playwright
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Cross-browser automation, trusted input, mobile emulation, traces, screenshots, network controls, and multi-user flows.
- **License:** Apache-2.0
- **Release / revision:** 1.62.0 reported · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt for real-browser E2E and accessibility interaction checks.
- **Required Storyworld abstraction:** Storyworld browser-test harness.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Implement three-engine critical flows, 320px, zoom, forced colors, reduced motion, drag, and unknown outcome.
- **Related Storyworld work:** Technical enablement DEP-007; B4.


### pixelmatch

- **Repository:** https://github.com/mapbox/pixelmatch
- **Disposition / priority:** C — Candidate bounded dependency / P2
- **Storyworld capability:** Small pixel-level image comparison with thresholding and diff output.
- **License:** ISC
- **Release / revision:** current 7.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Mature, focused.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for deterministic UI/rendition regression only, not creative similarity.
- **Required Storyworld abstraction:** VisualRegressionAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Add deterministic templates and explicit threshold rationale.
- **Related Storyworld work:** Visual regression; render templates.


### Tesseract OCR

- **Repository:** https://github.com/tesseract-ocr/tesseract
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** OCR engine with language models and layout/text extraction.
- **License:** Apache-2.0
- **Release / revision:** current 5.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Mature and maintained.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as replaceable OCR evaluator for text/logo/caption checks; outputs require confidence/evidence and human review.
- **Required Storyworld abstraction:** OCRProvider/Evaluator adapter.
- **Data-model risk:** Medium.
- **Lock-in risk:** Medium language/model limits.
- **Next action:** Compare with hosted/local OCR on fixture corpus; test false positives and restricted assets.
- **Related Storyworld work:** Visual continuity; product/logo checks; source ingestion.


### Lost Pixel

- **Repository:** https://github.com/Lost-Pixel/lost-pixel
- **Disposition / priority:** F — Counterexample or cautionary reference / P3
- **Storyworld capability:** Visual regression platform/CLI with storybook/page capture and cloud/self-host options.
- **License:** AGPL/commercial-service split; verify
- **Release / revision:** current line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active commercial/open-source project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study UX only; avoid service/license coupling for core CI.
- **Required Storyworld abstraction:** No required dependency.
- **Data-model risk:** Low.
- **Lock-in risk:** High service/license coupling.
- **Next action:** Prefer Playwright + project-owned snapshots.
- **Related Storyworld work:** Visual regression alternatives.


### reg-suit

- **Repository:** https://github.com/reg-viz/reg-suit
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P3
- **Storyworld capability:** Visual regression workflow, snapshot storage, comparison reports, and CI integration.
- **License:** MIT
- **Release / revision:** current line; verify maintenance · `main assessed 2026-07-31`
- **Maintenance:** Maintenance should be verified before adoption.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study reporting/workflow; Playwright plus project-owned artifact storage may suffice.
- **Required Storyworld abstraction:** VisualRegressionReport adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium external storage/plugin.
- **Next action:** Defer unless current harness lacks reporting.
- **Related Storyworld work:** Studio visual regression.


## Graphic design, typography, layout and print

### HarfBuzz

- **Repository:** https://github.com/harfbuzz/harfbuzz
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Unicode text shaping across scripts, OpenType features, glyph positioning, and font variation.
- **License:** MIT
- **Release / revision:** current 11/12 line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly active foundational library.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use through trusted rendering stacks; ensure locale/script/font provenance.
- **Required Storyworld abstraction:** TextShapingService/renderer dependency.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Add multilingual, RTL, Indic, Arabic, CJK, emoji, and variable-font fixtures.
- **Related Storyworld work:** Localization/accessibility; print and graphic rendering.


### ICU

- **Repository:** https://github.com/unicode-org/icu
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Unicode normalization, segmentation, collation, locale data, bidi, calendars, messages, and internationalization.
- **License:** Unicode-3.0
- **Release / revision:** current 78/79 line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use through platform/runtime bindings for locale-sensitive processing.
- **Required Storyworld abstraction:** LocalizationService boundary.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Test normalization, bidi, line/word boundaries, locale fallback, and deterministic package output.
- **Related Storyworld work:** Localization pattern; StoryDocument; search.


### Penpot

- **Repository:** https://github.com/penpot/penpot
- **Disposition / priority:** A — Architectural exemplar / P1
- **Storyworld capability:** Open design/prototyping application, components, layouts, tokens, collaboration, SVG-based artifacts, and inspect mode.
- **License:** MPL-2.0
- **Release / revision:** current 2.x line; verify tag · `3fc5360df5491aee9870d0980a0338bf17d17bef`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study graphic-design and component/template workflows; use as external design tool only.
- **Required Storyworld abstraction:** GraphicDesignPackage export/import and asset checkout.
- **Data-model risk:** High if Penpot file model becomes canonical.
- **Lock-in risk:** Medium external-tool/schema coupling.
- **Next action:** Prototype one carousel/card layout handoff with SVG/PDF and semantic manifest.
- **Related Storyworld work:** GraphicDesignSystem; export adaptors.


### Typst

- **Repository:** https://github.com/typst/typst
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** Deterministic programmable typesetting, layout, references, figures, tables, PDF output, and package ecosystem.
- **License:** Apache-2.0
- **Release / revision:** current 0.13/0.14 line; verify tag · `32fd4cc3861e0ab99f4c42ca6bea281482ba9f51`
- **Maintenance:** Very active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype as one print/PDF rendering backend behind Storyworld templates.
- **Required Storyworld abstraction:** PrintRendererAdapter with reproducible packages and font policy.
- **Data-model risk:** High if Typst source becomes canonical document.
- **Lock-in risk:** Medium package/font/runtime coupling.
- **Next action:** Render picture-book/workbook/card fixtures, compare accessibility/prepress and replacement with HTML/CSS path.
- **Related Storyworld work:** DEC-0032 print adaptors; template rendering.


### WeasyPrint

- **Repository:** https://github.com/Kozea/WeasyPrint
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** HTML/CSS to PDF paged-media rendering with typography and print layout.
- **License:** BSD-3-Clause
- **Release / revision:** current 68/69 line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype as standards-oriented print renderer; Storyworld owns layout template semantics.
- **Required Storyworld abstraction:** HTMLPagedMediaRenderer.
- **Data-model risk:** Medium; CSS support differences and PDF output constraints.
- **Lock-in risk:** Low-medium native dependencies.
- **Next action:** Compare against Typst using same print fixtures, PDF/A, color, bleed, and accessibility requirements.
- **Related Storyworld work:** Print adaptor POC.


### EPUBCheck

- **Repository:** https://github.com/w3c/epubcheck
- **Disposition / priority:** C — Candidate bounded dependency / P2
- **Storyworld capability:** EPUB conformance validator.
- **License:** BSD-3-Clause
- **Release / revision:** current 5.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature and actively maintained.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as blocking technical validator for EPUB renditions.
- **Required Storyworld abstraction:** EPUBConformanceAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Add valid/invalid EPUB fixture packages and normalized findings.
- **Related Storyworld work:** Book export adaptor; release validation.


### FontBakery

- **Repository:** https://github.com/fonttools/fontbakery
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Automated font quality checks and profiles.
- **License:** Apache-2.0
- **Release / revision:** current 0.13.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active specialist QA project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for font asset validation, not design judgment.
- **Required Storyworld abstraction:** FontValidationAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Add font QA findings to release readiness where fonts are embedded.
- **Related Storyworld work:** Technical-media evaluation; print/web.


### FontTools

- **Repository:** https://github.com/fonttools/fonttools
- **Disposition / priority:** C — Candidate bounded dependency / P2
- **Storyworld capability:** Font inspection, subsetting, variation, OpenType manipulation, and metadata.
- **License:** MIT
- **Release / revision:** current 4.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use in print/web font packaging and rights-aware subsetting pipeline.
- **Required Storyworld abstraction:** FontProcessingAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Track font source/license/version and deterministic subsets.
- **Related Storyworld work:** Rights; export adaptors; asset lineage.


### Krita

- **Repository:** https://github.com/KDE/krita
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Digital painting, illustration, animation, layers, masks, color management, and resource bundles.
- **License:** GPL-3.0
- **Release / revision:** current 5.x/6.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Support as external illustration editor; do not interpret .kra as canon.
- **Required Storyworld abstraction:** Illustration checkout/import adapter.
- **Data-model risk:** High.
- **Lock-in risk:** Low study-only.
- **Next action:** Prototype exact-version checkout and layered return manifest.
- **Related Storyworld work:** Illustration pipeline; external editors.


### Paged.js

- **Repository:** https://github.com/pagedjs/pagedjs
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Paged Media polyfill for browser HTML/CSS, page rules, running content, counters, and hooks.
- **License:** MIT
- **Release / revision:** current 0.5.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Maintained smaller project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as browser-based paged preview POC; not primary production renderer without validation.
- **Required Storyworld abstraction:** PagedPreviewAdapter.
- **Data-model risk:** Medium.
- **Lock-in risk:** Medium browser/version determinism.
- **Next action:** Test pagination determinism and print parity.
- **Related Storyworld work:** Print preview; Studio.


### qpdf

- **Repository:** https://github.com/qpdf/qpdf
- **Disposition / priority:** C — Candidate bounded dependency / P2
- **Storyworld capability:** PDF structural inspection, repair, transformation, encryption, linearization, and validation support.
- **License:** Apache-2.0
- **Release / revision:** current 12.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use in isolated PDF post-processing/inspection worker.
- **Required Storyworld abstraction:** PDFProcessingAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Test metadata, linearization, encryption policy, and malformed PDFs.
- **Related Storyworld work:** Print/PDF pipeline; quarantine.


### Vivliostyle.js

- **Repository:** https://github.com/vivliostyle/vivliostyle.js
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Web-standard typesetting and paged-media engine for publications and books.
- **License:** AGPL-3.0 reported; verify — AGPL posture requires legal review for network deployment.
- **Release / revision:** current 2.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active specialist project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study/pilot only after AGPL review.
- **Required Storyworld abstraction:** PagedPublicationAdapter.
- **Data-model risk:** Medium.
- **Lock-in risk:** High license/deployment coupling.
- **Next action:** Compare as specialist book renderer; do not make default.
- **Related Storyworld work:** Picture-book/publication templates.


### Inkscape

- **Repository:** https://github.com/inkscape/inkscape
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** SVG/vector illustration, text, paths, filters, export, and extension ecosystem.
- **License:** GPL-2.0-or-later
- **Release / revision:** current 1.4/1.5 line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Support as external vector editor; Storyworld stores returned asset plus transformation declaration.
- **Required Storyworld abstraction:** SVG checkout/import adapter.
- **Data-model risk:** High if Inkscape-specific XML becomes semantic authority.
- **Lock-in risk:** Low study-only.
- **Next action:** Defer until vector-edit round trip is needed.
- **Related Storyworld work:** Illustration/vector assets.


### Scribus

- **Repository:** https://github.com/scribusproject/scribus
- **Disposition / priority:** A — Architectural exemplar / P3
- **Storyworld capability:** Desktop publishing, master pages, prepress, color, typography, PDF output, and print workflows.
- **License:** GPL-2.0-or-later
- **Release / revision:** current 1.6/1.7 line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature but specialist desktop application.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study prepress and support as external editor where needed.
- **Required Storyworld abstraction:** Print-layout checkout/import adapter.
- **Data-model risk:** Very high if SLA project format becomes canonical.
- **Lock-in risk:** Low study-only.
- **Next action:** Extract prepress fixture requirements and proofing workflow.
- **Related Storyworld work:** DEC-0032 print adaptors.


### veraPDF

- **Repository:** https://github.com/veraPDF/veraPDF-library
- **Disposition / priority:** C — Candidate bounded dependency / P3
- **Storyworld capability:** PDF/A validation and preservation conformance.
- **License:** GPL-3.0/MPL components; verify
- **Release / revision:** current 1.26 line; verify · `main assessed 2026-07-31`
- **Maintenance:** Mature preservation validator.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as isolated conformance process for archival PDF profiles.
- **Required Storyworld abstraction:** PDFConformanceAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium licensing/runtime.
- **Next action:** Defer until PDF/A is a delivery requirement.
- **Related Storyworld work:** Print preservation; Release Builder.


## Graphs, maps, timelines, matrices

### react-resizable-panels

- **Repository:** https://github.com/bvaughn/react-resizable-panels
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Keyboard-operable resizable multi-panel workspace layout.
- **License:** MIT
- **Release / revision:** current 4.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt behind StudioSplitLayout.
- **Required Storyworld abstraction:** WorkspaceLayout adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Verify 200% zoom, touch, saved-layout permission changes, and narrow collapse.
- **Related Storyworld work:** Studio shell; technical enablement DEP-005.


### TanStack Table

- **Repository:** https://github.com/TanStack/table
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Headless table/matrix sorting, filtering, selection, column models, and pagination.
- **License:** MIT
- **Release / revision:** 8.21.3 reported · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt behind Storyworld DataTable/Matrix primitives.
- **Required Storyworld abstraction:** DataTable/Matrix adapter with governed bulk-command layer.
- **Data-model risk:** Medium; client row state must never be authority.
- **Lock-in risk:** Low.
- **Next action:** Prototype rights/localization/continuity matrix with keyboard and consequence preview.
- **Related Storyworld work:** Technical enablement DEP-003; matrix POCs.


### TanStack Virtual

- **Repository:** https://github.com/TanStack/virtual
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Headless list/grid virtualization.
- **License:** MIT
- **Release / revision:** 3.14.8 reported · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt behind a Storyworld virtualization adapter with accessible export/fallback.
- **Required Storyworld abstraction:** VirtualizedCollection adapter.
- **Data-model risk:** Low; view-only.
- **Lock-in risk:** Low.
- **Next action:** Test focus retention, screen-reader row metadata, find-in-page alternatives, and 100k records.
- **Related Storyworld work:** Technical enablement DEP-004.


### W3C Web Annotation

- **Repository:** https://github.com/w3c/web-annotation
- **Disposition / priority:** B — Standards or interchange reference / P0
- **Storyworld capability:** Web Annotation data model for targets, selectors, bodies, motivations, provenance, and serialization.
- **License:** W3C document/software licenses
- **Release / revision:** Recommendation 2017; maintained ecosystem · `spec assessed 2026-07-31`
- **Maintenance:** Stable standard, though core Recommendation is not recent.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as conceptual/interchange basis, extended by Storyworld exact-version and cross-media target semantics.
- **Required Storyworld abstraction:** Storyworld AnnotationTarget profile and selector registry.
- **Data-model risk:** Medium; generic selectors do not encode Storyworld versions/authority.
- **Lock-in risk:** Low.
- **Next action:** Create a profile covering images, documents, audio/video intervals, cuts, graph nodes, timeline events, and spatial regions.
- **Related Storyworld work:** Cross-media AnnotationTarget decision; Review Room.


### XYFlow / React Flow

- **Repository:** https://github.com/xyflow/xyflow
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P0
- **Storyworld capability:** Interactive node-edge canvas, selection, handles, viewport, grouping, and custom node rendering.
- **License:** MIT
- **Release / revision:** current 12.x/1.x lines; verify package tag · `360f5b13e2bc6899ea06b4be1a49b068d86926cf`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Canvas is not sufficient; required synchronized structured representation.
- **Integration posture:** Prototype renderer only; projection, node/edge semantics, commands, permissions, and structured fallback stay Storyworld-owned.
- **Required Storyworld abstraction:** GraphRendererAdapter implementing GraphViewProfile.
- **Data-model risk:** Very high if node positions or renderer JSON become authority.
- **Lock-in risk:** Medium; React-specific canvas interaction.
- **Next action:** Run Narrative Flow Graph POC with keyboard list synchronization, hidden counts, 1k nodes, and replacement test.
- **Related Storyworld work:** DEC-0028; GraphViewProfile POC.


### Annotorious

- **Repository:** https://github.com/annotorious/annotorious
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** Image and OpenSeadragon annotation rendering/editing, shapes, selectors, and W3C Web Annotation-oriented data.
- **License:** BSD-3-Clause core; verify extensions
- **Release / revision:** 3.8.8 (2026-07-02) · `22c3f6052acdcedebd0c8684c2bd3d8d4c46305d`
- **Maintenance:** Active.
- **Security:** Treat imported selectors as untrusted; fuzz parsers and bound geometry.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype renderer only; canonical AnnotationTarget and review decisions stay Storyworld-owned.
- **Required Storyworld abstraction:** ImageAnnotationRenderer adapter.
- **Data-model risk:** High if its annotation JSON becomes canonical.
- **Lock-in risk:** Medium; extension/version changes and parser security.
- **Next action:** Run security review, malformed-selector tests, keyboard alternatives, and exact-version binding.
- **Related Storyworld work:** Cross-media AnnotationTarget POC.


### Dagre

- **Repository:** https://github.com/dagrejs/dagre
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Small directed-acyclic/layered graph layout engine.
- **License:** MIT
- **Release / revision:** 2.x/pre-release line; verify production tag · `4713b59bfa05af56cf58aa01e2027adf5d2dcf88`
- **Maintenance:** Maintained, narrow scope.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use behind LayoutAdapter for simple narrative/dependency layouts.
- **Required Storyworld abstraction:** GraphLayoutAdapter.
- **Data-model risk:** Low; layout only.
- **Lock-in risk:** Low.
- **Next action:** Compare with ELK for crossings, ports, nested groups, determinism, and runtime cost.
- **Related Storyworld work:** Narrative Flow Graph POC.


### ELK.js

- **Repository:** https://github.com/kieler/elkjs
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** Advanced layered graph layout, ports, hierarchy, constraints, and many algorithms.
- **License:** EPL-2.0 (verify bundled artifacts)
- **Release / revision:** 0.13 development line; verify release · `cd96cd1b8f28ad6f4af7d922d859768f8ce53aa2`
- **Maintenance:** Active academic/industrial project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype as alternative layout adapter where Dagre is insufficient.
- **Required Storyworld abstraction:** GraphLayoutAdapter worker boundary.
- **Data-model risk:** Low; layout only.
- **Lock-in risk:** Medium due larger engine, worker size, EPL review.
- **Next action:** Measure deterministic layouts and accessibility-independent data output.
- **Related Storyworld work:** Graph POC; spatial/dependency profiles.


### OpenSeadragon

- **Repository:** https://github.com/openseadragon/openseadragon
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Deep-zoom tiled images, coordinate transforms, overlays, and IIIF-compatible viewing.
- **License:** BSD-3-Clause
- **Release / revision:** 6.0.2 (2026-03-12 reported) · `441ec737a63c5973ca018907023a6be94834c904`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt behind DeepImageViewer for large art, maps, scans, floor plans, and detailed review.
- **Required Storyworld abstraction:** DeepImageViewer and exact-version tile/proxy service.
- **Data-model risk:** Low; viewing only.
- **Lock-in risk:** Low.
- **Next action:** Prototype with annotations, restricted proxy URLs, zoom persistence, and replacement.
- **Related Storyworld work:** AnnotationTarget POC; Library; Review Room.


### Cytoscape.js

- **Repository:** https://github.com/cytoscape/cytoscape.js
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Graph data model, analysis algorithms, layouts, styling, and interactive rendering.
- **License:** MIT with third-party notices
- **Release / revision:** 3.33.4 (2026-05-19 reported) · `release 3.33.4 assessed`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for dense analytical graph POC, not Arc authoring by default.
- **Required Storyworld abstraction:** DenseGraphRendererAdapter.
- **Data-model risk:** High if its graph model replaces GraphViewProfile.
- **Lock-in risk:** Medium; extension ecosystem.
- **Next action:** Test 10k-node shared-universe/lineage graph with permission filtering and list fallback.
- **Related Storyworld work:** Shared-universe impact; lineage explorer.


### Konva

- **Repository:** https://github.com/konvajs/konva
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Canvas scene graph, shapes, transforms, drag, hit testing, and React bindings.
- **License:** MIT
- **Release / revision:** 10.3.0 / react-konva 19.2.x reported · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype floor-plan, storyboard-blocking, or mask tools where SVG/DOM is insufficient.
- **Required Storyworld abstraction:** SpatialCanvasRenderer and serialized Storyworld commands.
- **Data-model risk:** Very high if canvas tree becomes domain state.
- **Lock-in risk:** Medium; canvas accessibility and renderer coupling.
- **Next action:** Use only after spatial semantics are accepted; build structured command/list equivalent.
- **Related Storyworld work:** Spatial authoring POC; AnnotationTarget.


### vis-timeline

- **Repository:** https://github.com/visjs/vis-timeline
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Interactive item/group timeline with ranges, editable items, zoom, and clustering.
- **License:** Apache-2.0 and MIT components; verify
- **Release / revision:** current 8.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Maintained.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype rendering for chronology/release schedules; Storyworld temporal coordinates remain canonical.
- **Required Storyworld abstraction:** TimelineRendererAdapter.
- **Data-model risk:** High if UI item model conflates story, presentation, and publication time.
- **Lock-in risk:** Medium.
- **Next action:** Test multiple independent time axes, thousands of events, keyboard navigation, and nonvisual table.
- **Related Storyworld work:** Timeline interface; temporal semantics.


### W3C Media Fragments URI

- **Repository:** https://github.com/w3c/media-frags
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** URI fragment syntax for temporal, spatial, track, and named media dimensions.
- **License:** W3C document/software licenses
- **Release / revision:** Recommendation-era standard · `spec assessed 2026-07-31`
- **Maintenance:** Stable historical standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as one selector vocabulary; not sufficient for all Storyworld annotation targets.
- **Required Storyworld abstraction:** MediaFragmentSelector inside AnnotationTarget.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Test exact frame/time conversions and version binding.
- **Related Storyworld work:** AnnotationTarget; media review.


### Eclipse GLSP

- **Repository:** https://github.com/eclipse-glsp/glsp
- **Disposition / priority:** A — Architectural exemplar / P3
- **Storyworld capability:** Client/server graphical language server protocol and model-driven diagram tooling.
- **License:** EPL-2.0
- **Release / revision:** current 2.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active Eclipse project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study separation of semantic model, server actions, validation, and renderer; likely too heavy as dependency.
- **Required Storyworld abstraction:** Graph command protocol and model-server boundary.
- **Data-model risk:** Medium study-only; very high if framework model becomes core.
- **Lock-in risk:** High operational/framework complexity.
- **Next action:** Use as architecture reference for governed canvas commands, not immediate adoption.
- **Related Storyworld work:** GraphViewProfile; spatial-authoring design.


### MapLibre GL JS

- **Repository:** https://github.com/maplibre/maplibre-gl-js
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Geographic vector-tile mapping, layers, sources, camera, markers, and offline-capable map rendering.
- **License:** BSD-3-Clause
- **Release / revision:** current 5.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only for genuinely geographic worlds; not floor plans or narrative graphs.
- **Required Storyworld abstraction:** GeographicMapRenderer over Storyworld spatial ontology.
- **Data-model risk:** Medium; geospatial source/layer assumptions.
- **Lock-in risk:** Low-medium.
- **Next action:** Defer until a property needs real geography.
- **Related Storyworld work:** Spatial Graph profile; location maps.


### Sigma.js

- **Repository:** https://github.com/jacomyal/sigma.js
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P3
- **Storyworld capability:** WebGL rendering of large network graphs.
- **License:** MIT
- **Release / revision:** 4.x alpha line reported · `main assessed 2026-07-31`
- **Maintenance:** Active, but current major may be pre-stable.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only for read-only large-network visualization POC.
- **Required Storyworld abstraction:** DenseGraphRendererAdapter.
- **Data-model risk:** Medium; renderer-specific node attributes.
- **Lock-in risk:** Medium; alpha API risk.
- **Next action:** Defer until measured graph density requires WebGL.
- **Related Storyworld work:** Cross-property graph explorer.


## Media custody, provenance, preservation

### FFmpeg

- **Repository:** https://github.com/FFmpeg/FFmpeg
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Decode/encode/transcode, frame extraction, filters, proxy generation, streaming, audio/video analysis, and metadata.
- **License:** LGPL-2.1-or-later by default; optional components may make a build GPL/nonfree
- **Release / revision:** rolling releases; pin build and configuration · `946272b79a325e9bce613b260e50e4e4fe7f3159`
- **Maintenance:** Extremely active and mature.
- **Security:** Treat all media as hostile; sandbox, cap resources, disable network protocols, and patch promptly.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt as sandboxed worker process with a reproducible, license-audited build; never expose arbitrary command construction.
- **Required Storyworld abstraction:** MediaWorkerAdapter with allowlisted operations and transformation receipts.
- **Data-model risk:** Low domain risk; high command/integration risk.
- **Lock-in risk:** Medium build/license/codec coupling.
- **Next action:** Build proxy/quarantine POC with timeouts, egress denial, malformed media, provenance, and replacement.
- **Related Storyworld work:** Media-processing POC; Review Room; export adaptors.


### libvips

- **Repository:** https://github.com/libvips/libvips
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Low-memory demand-driven image processing, resizing, pyramids, format conversion, color/metadata operations.
- **License:** LGPL-2.1-or-later
- **Release / revision:** 8.18.2 (2026-03-31 reported) · `2ff898f0a1637c45d15db532a7fbe2d30cc99aac`
- **Maintenance:** Active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use behind worker boundary, often through sharp for Node, with license and codec review.
- **Required Storyworld abstraction:** ImageProxyAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low-medium native/lib ecosystem.
- **Next action:** Benchmark versus OIIO/sharp on large images, contact sheets, thumbnails, EXIF stripping, and pyramids.
- **Related Storyworld work:** Media proxy; large asset library.


### OpenAssetIO

- **Repository:** https://github.com/OpenAssetIO/OpenAssetIO
- **Disposition / priority:** A — Architectural exemplar / P0
- **Storyworld capability:** Host–asset-manager separation, stable entity references, trait-based queries, resolution, publishing, and capability negotiation.
- **License:** Apache-2.0 — Apache-2.0 license verified from repository.
- **Release / revision:** current beta line; verify exact tag · `3e60be1d4014bfc582c44a1e54c990ee4a695a89`
- **Maintenance:** Active under ASWF governance.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study and potentially implement a future bridge; Storyworld remains authoritative for semantic asset records and lifecycle.
- **Required Storyworld abstraction:** Storyworld AssetResolver/ExternalAssetManager interface.
- **Data-model risk:** Very high if OpenAssetIO entity refs replace Storyworld asset IDs.
- **Lock-in risk:** Low if adapter-bound.
- **Next action:** Produce an asset-manager boundary ADR and external-editor round-trip POC.
- **Related Storyworld work:** Asset custody; Library; external-editor checkout; DEC-0033 implications.


### OpenColorIO

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenColorIO
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Production color-management configs, color spaces, transforms, views/displays, processors, and LUT-agnostic execution.
- **License:** BSD-3-Clause
- **Release / revision:** 2.5.2 (2026-05-13) · `5a808fb57a94c7229640a97835c420c9a1fbd1fe`
- **Maintenance:** Highly active, production-standard, ASWF-governed.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt in media workers and review display pipeline; Storyworld owns ColorDesign and GradeIntent semantics.
- **Required Storyworld abstraction:** ColorPipelineAdapter and pinned config/version records.
- **Data-model risk:** Medium if OCIO config names become creative intent.
- **Lock-in risk:** Low-medium; config/version dependence is manageable when pinned.
- **Next action:** Prototype input normalization, working-space conversion, review display transforms, and rendition output.
- **Related Storyworld work:** DEC-0033 color separation; media proxy; continuity/evaluation.


### OpenImageIO

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenImageIO
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Robust multi-format image I/O, metadata, image cache, processing, thumbnails, hashes, and command-line tools.
- **License:** BSD-3-Clause
- **Release / revision:** current 3.x line; verify exact tag · `759ee33ac3f42a3d2ecb86926f954a31f0ef42cd`
- **Maintenance:** Very active; recent work includes fuzzing and decompression-bomb guards.
- **Security:** Pin patched versions; enforce resolution, decompression, and memory limits.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt in isolated image worker or CLI boundary for professional formats and metadata.
- **Required Storyworld abstraction:** ImageProcessingAdapter and quarantine limits.
- **Data-model risk:** Low; utility library.
- **Lock-in risk:** Medium native dependency/build complexity.
- **Next action:** Compare OIIO and libvips/sharp by format, memory, metadata, security, and deployment profile.
- **Related Storyworld work:** Media processing/proxy POC; technical-media evaluation.


### OpenTimelineIO

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenTimelineIO
- **Disposition / priority:** B — Standards or interchange reference / P0
- **Storyworld capability:** Editorial timeline interchange for clips, tracks, gaps, transitions, markers, rational time, media references, adapters, and plugins.
- **License:** Apache-2.0 — Apache-2.0 license verified.
- **Release / revision:** 0.18.1 pre-release (2025-11-09) · `0eebd211b2055f111e2c53d04b5581adc594c1fc`
- **Maintenance:** Mature, active, ASWF-governed; project states current version can be confidently deployed.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt as an editorial interchange profile, not the canonical Storyworld sequence model.
- **Required Storyworld abstraction:** EditorialTimelineAdapter mapping Storyworld shot relations to OTIO.
- **Data-model risk:** Medium; OTIO intentionally omits many directorial/narrative semantics.
- **Lock-in risk:** Low.
- **Next action:** Build loss-reporting round trip with Kdenlive/Resolve/Premiere-compatible adapters where legally available.
- **Related Storyworld work:** EditorialDesign; annotation; Release Builder; external-editor round trip.
- **Secondary use:** Editorial, storyboard and temporal media: Editorial interchange and rational-time semantics.


### sharp

- **Repository:** https://github.com/lovell/sharp
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Node bindings around libvips for thumbnails, resizing, format conversion, compositing, and metadata.
- **License:** Apache-2.0 module; linked/native dependency licenses apply
- **Release / revision:** current 0.34.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly active, widely deployed.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt for bounded web-image proxy work if professional-format needs remain with OIIO.
- **Required Storyworld abstraction:** ThumbnailService adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Implement deterministic thumbnail/contact-sheet service with no authority mutation.
- **Related Storyworld work:** Technical enablement recommended stack; Library.


### C2PA Rust SDK

- **Repository:** https://github.com/contentauth/c2pa-rs
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** C2PA manifests, assertions, ingredients, signatures, verification, embedding, and content-credential tooling.
- **License:** MIT OR Apache-2.0
- **Release / revision:** 0.x active line; verify exact stable SDK/tool version · `d8b5f1d8e66ee0895037a6bc027fbb35a2efd248`
- **Maintenance:** Very active, security-sensitive, API still evolving.
- **Security:** Key custody, trust lists, parser hardening, and privacy review are mandatory.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype export/import bridge; C2PA supplements but does not replace Storyworld lineage, approvals, or receipts.
- **Required Storyworld abstraction:** ContentCredentialsAdapter mapping accepted evidence to bounded assertions.
- **Data-model risk:** High if C2PA manifest becomes internal authority.
- **Lock-in risk:** Medium due pre-1.0 API/spec evolution and signing infrastructure.
- **Next action:** Test signing, verification, ingredient chains, redaction/privacy, unsupported formats, and offline export.
- **Related Storyworld work:** IP/authorship transparency; asset provenance; export adaptors.


### ClamAV

- **Repository:** https://github.com/Cisco-Talos/clamav
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Malware scanning engine, signatures, daemon, and command-line scanning.
- **License:** GPL-2.0
- **Release / revision:** current 1.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature and actively maintained.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Deploy as isolated quarantine service/process; store scan evidence and signature version.
- **Required Storyworld abstraction:** MalwareScanner adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low-medium signature/update service.
- **Next action:** Test infected fixtures, archives, timeouts, signature staleness, and fail-closed policy.
- **Related Storyworld work:** Upload quarantine; security.


### MediaInfoLib

- **Repository:** https://github.com/MediaArea/MediaInfoLib
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Technical metadata extraction for audio, video, image, subtitle, and container formats.
- **License:** BSD-2-Clause reported; verify repository files
- **Release / revision:** 26.05 (2026-05-12 reported) · `release 26.05 assessed`
- **Maintenance:** Active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use in quarantine/inspection worker; normalize output into Storyworld technical metadata.
- **Required Storyworld abstraction:** MediaMetadataExtractor adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Compare with ffprobe; retain raw evidence and normalized fields.
- **Related Storyworld work:** Asset ingest; technical-media evaluation.


### OpenColorIO Configs for ACES

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenColorIO-Config-ACES
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Reference ACES 2.0 OCIO configurations and versioned color-pipeline profiles.
- **License:** BSD-3-Clause / included asset notices; verify bundle
- **Release / revision:** 4.0.0 for ACES 2.0 · `release 4.0.0 assessed`
- **Maintenance:** Active companion standard/config project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as a tested default profile, never as a universal creative mandate.
- **Required Storyworld abstraction:** Pinned ColorPipelineProfile.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Add ACES fixture with source, working, display, and output transform lineage.
- **Related Storyworld work:** Color pipeline; export adaptors.


### OpenEXR

- **Repository:** https://github.com/AcademySoftwareFoundation/openexr
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Professional HDR scene-linear image format, multipart/multichannel/deep data, metadata, reference implementation.
- **License:** BSD-3-Clause
- **Release / revision:** 3.4.12 (2026-05-25) · `3f0f6c2d556a9b547cc8fd83f07018394a61a019`
- **Maintenance:** Mature, active, security-responsive, ASWF-governed.
- **Security:** Recent advisories reinforce the need for patched decoders and quarantine.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Support as high-end source/master/intermediate format when needed; not the default web proxy.
- **Required Storyworld abstraction:** MediaFormatProfile and safe decoder worker.
- **Data-model risk:** Low.
- **Lock-in risk:** Low-medium native codec risk.
- **Next action:** Add EXR fixtures and strict parser limits; verify test-image licenses separately.
- **Related Storyworld work:** Accepted master formats; color pipeline; preservation.


### RO-Crate

- **Repository:** https://github.com/ResearchObject/ro-crate
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** JSON-LD package metadata for aggregated resources, people, software, equipment, provenance, licenses, reuse, and preservation.
- **License:** Specification/documentation licenses vary; verify code and examples
- **Release / revision:** 1.2.0 Recommendation (2025-06-04) · `release 1.2.0 assessed`
- **Maintenance:** Active standards community.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study and optionally profile Storyworld portable packages as RO-Crate-compatible metadata.
- **Required Storyworld abstraction:** Storyworld Package Profile over existing signed package format.
- **Data-model risk:** Medium if generic JSON-LD vocabulary displaces Storyworld schemas.
- **Lock-in risk:** Low.
- **Next action:** Create a mapping experiment without changing canonical package authority.
- **Related Storyworld work:** Portability; provenance; preservation.


### Archivematica

- **Repository:** https://github.com/artefactual/archivematica
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Standards-based preservation workflows, format identification/policy, AIP/DIP packaging, checks, and storage service.
- **License:** AGPL-3.0
- **Release / revision:** 1.18.0 (2025-09-26) · `release 1.18.0 assessed`
- **Maintenance:** Mature specialist system with substantial operations.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study preservation workflow, format policy, and evidence; do not embed by default.
- **Required Storyworld abstraction:** PreservationPlan and archival handoff interface.
- **Data-model risk:** High if its database/workflow becomes active custody.
- **Lock-in risk:** High AGPL and operational complexity.
- **Next action:** Run a study-only archival export/import drill for accepted assets.
- **Related Storyworld work:** Digital preservation; operational maturity.


### BagIt Python

- **Repository:** https://github.com/LibraryOfCongress/bagit-python
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** BagIt package creation/validation with manifests, payload, tags, and fixity.
- **License:** Public domain / CC0-style US government code; verify files
- **Release / revision:** rolling; updated 2026-06-18 · `main assessed 2026-07-31`
- **Maintenance:** Maintained by Library of Congress.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as simple transfer-envelope reference or optional export validator.
- **Required Storyworld abstraction:** BagItExportAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Evaluate as an outer transport envelope around signed Storyworld packages.
- **Related Storyworld work:** Portability; external handoff.


### Exiv2

- **Repository:** https://github.com/Exiv2/exiv2
- **Disposition / priority:** C — Candidate bounded dependency / P2
- **Storyworld capability:** EXIF/IPTC/XMP metadata parsing and writing.
- **License:** GPL-2.0-or-later
- **Release / revision:** current 0.28.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only where OIIO/ExifTool metadata coverage is insufficient; isolate parser.
- **Required Storyworld abstraction:** MetadataExtractor adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium GPL/native parser considerations.
- **Next action:** Compare with ExifTool and OIIO; prefer least-privileged read-only extraction.
- **Related Storyworld work:** Source ingest; rights/provenance.


### IIIF API specifications

- **Repository:** https://github.com/IIIF/api
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** Image and Presentation API models for tiled images, canvases, annotations, sequences, ranges, and manifests.
- **License:** Specification licenses; verify
- **Release / revision:** Image API 3 / Presentation API 3 current · `spec main assessed 2026-07-31`
- **Maintenance:** Stable cultural-heritage interoperability standards.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study for deep-image delivery and annotation manifests; do not force audiovisual narrative into IIIF.
- **Required Storyworld abstraction:** IIIF proxy/export profile.
- **Data-model risk:** Medium if IIIF canvas model becomes universal.
- **Lock-in risk:** Low.
- **Next action:** Use in OpenSeadragon/annotation POC for scans, maps, art, and evidence artifacts.
- **Related Storyworld work:** Deep-image review; Stillhouse evidence assets.


### MediaConch

- **Repository:** https://github.com/MediaArea/MediaConch
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Policy-based media conformance checking built around MediaInfo.
- **License:** BSD-2-Clause / GPL components possible; verify
- **Release / revision:** current release; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Maintained specialist project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study policy/check/report patterns and use for preservation/broadcast profiles if needed.
- **Required Storyworld abstraction:** MediaConformanceProfile and normalized finding adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium operational/profile complexity.
- **Next action:** Prototype one preservation and one delivery policy; do not claim universal quality.
- **Related Storyworld work:** Evaluation taxonomy; release conformance.


### OpenLineage

- **Repository:** https://github.com/OpenLineage/OpenLineage
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Event-based job/dataset/run lineage vocabulary and integration patterns.
- **License:** Apache-2.0
- **Release / revision:** 1.47.1 (2026-05-13) · `release 1.47.1 assessed`
- **Maintenance:** Active, broad data-pipeline adoption.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study lineage event design and facets; do not substitute data-pipeline lineage for creative derivation.
- **Required Storyworld abstraction:** Storyworld ProvenanceEvent and Derivation facets.
- **Data-model risk:** Medium; data-pipeline nouns do not cover creative authority.
- **Lock-in risk:** Low if study-only.
- **Next action:** Compare its event/facet extensibility to Storyworld receipts and asset lineage.
- **Related Storyworld work:** Asset provenance; observation/event catalogs.


### Oxford Common File Layout

- **Repository:** https://github.com/OCFL/spec
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** Versioned, checksum-based object storage layout and inventory conventions for durable preservation.
- **License:** Specification license; verify repository
- **Release / revision:** 1.1 current recommendation; verify · `spec version 1.1 assessed`
- **Maintenance:** Stable preservation standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study for archival object layout and restore verification; do not replace active Storyworld object/DB semantics.
- **Required Storyworld abstraction:** ArchivalExportProfile.
- **Data-model risk:** Medium if storage layout is conflated with semantic versions.
- **Lock-in risk:** Low.
- **Next action:** Compare OCFL export with Storyworld package and S3 object-version strategy.
- **Related Storyworld work:** Digital preservation; long-term archive.


### DVC

- **Repository:** https://github.com/iterative/dvc
- **Disposition / priority:** F — Counterexample or cautionary reference / P3
- **Storyworld capability:** Git-adjacent large-data versioning, pipelines, remotes, cache, experiments, and reproducibility.
- **License:** Apache-2.0
- **Release / revision:** current 3.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study content-addressed cache and reproducibility; reject Git/DVC as Storyworld authority or approval system.
- **Required Storyworld abstraction:** None required beyond existing storage/portability.
- **Data-model risk:** Very high; file/Git commits cannot represent Storyworld semantic acceptance and rights.
- **Lock-in risk:** Medium tool/remotes coupling.
- **Next action:** Use as cautionary example in asset custody analysis.
- **Related Storyworld work:** Asset lineage; portability counterexample.


### OpenMetadata

- **Repository:** https://github.com/open-metadata/OpenMetadata
- **Disposition / priority:** A — Architectural exemplar / P3
- **Storyworld capability:** Metadata catalog, glossary, lineage, ownership, policies, quality, search, and context graph.
- **License:** Apache-2.0
- **Release / revision:** current 1.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Highly active but large enterprise platform.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study catalog/lineage/search UX and impact analysis; do not adopt its data platform model.
- **Required Storyworld abstraction:** Storyworld Library/Provenance UI patterns.
- **Data-model risk:** Very high if enterprise data-asset model replaces narrative semantics.
- **Lock-in risk:** High operations if deployed.
- **Next action:** Use as a comparison for source/asset catalog and change impact only.
- **Related Storyworld work:** Library; search; provenance; impact analysis.


## Narrative and interactive semantics

### ink

- **Repository:** https://github.com/inkle/ink
- **Disposition / priority:** E — Specialist template reference / P1
- **Storyworld capability:** Branching narrative language, choices, knots/stitches, variables, and runtime-neutral story compilation.
- **License:** MIT
- **Release / revision:** 1.2.1 (2026-05-05) · `35c63e52f1d36060930dc7ed3cfba38ea224b528`
- **Maintenance:** Active, mature, production-used narrative scripting project.
- **Security:** Sandbox story execution and bound external functions.
- **Accessibility:** No authoring UI in core; consuming runtime must provide accessible presentation.
- **Integration posture:** Study language/runtime semantics and optionally compile Storyworld-authored packages through an adapter; never use ink state as canon.
- **Required Storyworld abstraction:** Storyworld InteractiveNarrative/DialoguePackage adapter and import/export mapper.
- **Data-model risk:** High if ink source or runtime state becomes authoritative.
- **Lock-in risk:** Medium; script semantics and runtime state can leak into core.
- **Next action:** Author a BeKindRewind fixture mapping choices, variables, branches, and reconvergence to Storyworld-owned structures.
- **Related Storyworld work:** Interactive narrative schemas; runtime compiler; BeKindRewind fixture.


### Wikibase

- **Repository:** https://github.com/wikimedia/mediawiki-extensions-Wikibase
- **Disposition / priority:** A — Architectural exemplar / P1
- **Storyworld capability:** Statement model with items, properties, qualifiers, references, ranks, identifiers, and revision history.
- **License:** GPL-2.0-or-later
- **Release / revision:** rolling MediaWiki release train · `main assessed 2026-07-31`
- **Maintenance:** Very mature, large community, production at Wikimedia scale.
- **Security:** Large PHP/MediaWiki attack surface if deployed; study-only.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study assertion/qualifier/reference and reconciliation patterns; do not adopt MediaWiki as Storyworld storage.
- **Required Storyworld abstraction:** Storyworld CanonAssertion/Source/Rationale/Scope model.
- **Data-model risk:** Very high if Wikibase identifiers or tables become core.
- **Lock-in risk:** High operational and GPL coupling if embedded.
- **Next action:** Produce a fact-model crosswalk for truth, belief, secrecy, scope, temporal validity, and supersession.
- **Related Storyworld work:** Canon fact model; DEC-0030; truth/reveal graph.


### Yarn Spinner core

- **Repository:** https://github.com/YarnSpinnerTool/YarnSpinner
- **Disposition / priority:** E — Specialist template reference / P1
- **Storyworld capability:** Dialogue compiler, nodes, commands, variables, localization hooks, and engine-neutral runtime interfaces.
- **License:** MIT — Verify each engine integration separately; some companion repositories use different terms.
- **Release / revision:** 3.x current line; verify exact tag before adoption · `08ba499fe2ed0eb68c847046118e622bc95e45ab`
- **Maintenance:** Active with maintained engine integrations.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study compiler and dialogue semantics; optional bounded exporter for runtime packages.
- **Required Storyworld abstraction:** Storyworld DialogueDefinition and Yarn export/import adapter.
- **Data-model risk:** High if Yarn node/variable model becomes Storyworld canon.
- **Lock-in risk:** Medium; integrations have differing licenses and engine assumptions.
- **Next action:** Compare Ink and Yarn against the same dialogue/quest fixture; retain only shared semantics.
- **Related Storyworld work:** DialogueDefinition; conversational-character export; localization.


### Inky

- **Repository:** https://github.com/inkle/inky
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Reference UI for editing, compiling, previewing, and debugging ink stories.
- **License:** MIT
- **Release / revision:** 0.15.2 (2026-05-05) · `release 0.15.2 assessed`
- **Maintenance:** Active companion editor.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study editor/debugger patterns only; do not embed the application.
- **Required Storyworld abstraction:** Storyworld script-preview/debug interface over Engine state.
- **Data-model risk:** Medium; editor project files are ink-specific.
- **Lock-in risk:** Low if study-only.
- **Next action:** Extract preview, trace, and error-reporting patterns for a dialogue/branch sandbox.
- **Related Storyworld work:** Studio narrative sandbox; runtime-package validation.


### Twine

- **Repository:** https://github.com/klembot/twinejs
- **Disposition / priority:** F — Counterexample or cautionary reference / P2
- **Storyworld capability:** Branch-map authoring, story-format packaging, and creator-facing visual branching.
- **License:** GPL-3.0
- **Release / revision:** 2.12.0 (2026-04-10) · `release 2.12.0 assessed`
- **Maintenance:** Active application, but ecosystem behavior depends on story formats.
- **Security:** Standard dependency review required.
- **Accessibility:** Canvas-like branch map requires an equivalent structured editor.
- **Integration posture:** Study visual branch-authoring affordances and export pitfalls; do not adopt its project model.
- **Required Storyworld abstraction:** GraphViewProfile and Storyworld-owned branching schema.
- **Data-model risk:** Very high; story formats define incompatible private semantics.
- **Lock-in risk:** High; GPL application and story-format fragmentation.
- **Next action:** Use as a counterexample in graph POC: preserve accessible structured authoring and stable branch semantics.
- **Related Storyworld work:** DEC-0028 graph semantics; branching fixtures.
- **Rejection rationale:** Not suitable as canonical story format or embedded application.


### Dialogic

- **Repository:** https://github.com/Dialogic-Godot/dialogic
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Godot dialogue/timeline editor, events, character definitions, and runtime integration.
- **License:** MIT
- **Release / revision:** 2.x current; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active Godot ecosystem project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study/export target for a Godot runtime; do not import Godot runtime state into canon.
- **Required Storyworld abstraction:** Godot runtime adapter and immutable dialogue package.
- **Data-model risk:** High; event/timeline data is runtime-oriented.
- **Lock-in risk:** Medium; Godot-version coupling.
- **Next action:** Evaluate only if Godot is selected as first runtime.
- **Related Storyworld work:** Owner questionnaire Q14; BeKindRewind runtime.


### Dialogue Manager for Godot

- **Repository:** https://github.com/nathanhoad/godot_dialogue_manager
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Lightweight dialogue resource model and Godot integration.
- **License:** MIT
- **Release / revision:** current 3.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active specialist project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as a simpler counterpoint to Dialogic in a runtime-export POC.
- **Required Storyworld abstraction:** DialoguePackage-to-Godot adapter.
- **Data-model risk:** High if resource format becomes canonical.
- **Lock-in risk:** Medium; Godot-specific.
- **Next action:** Include in Godot exporter comparison, not core platform work.
- **Related Storyworld work:** Runtime compiler POC.


### Ren'Py

- **Repository:** https://github.com/renpy/renpy
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Visual-novel scripting, labels, screens, dialogue, save/runtime behavior, and asset packaging.
- **License:** MIT plus bundled-component notices; verify distribution
- **Release / revision:** 8.5.3 (2026-05-16) · `release 8.5.3 assessed`
- **Maintenance:** Highly active and mature.
- **Security:** Treat Python extensions and user script execution as untrusted.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study visual-novel template and export boundary; runtime state remains external.
- **Required Storyworld abstraction:** Storyworld visual-novel compiler target.
- **Data-model risk:** High if Ren'Py script labels/screens become canonical.
- **Lock-in risk:** Medium; engine-specific scripting and runtime packaging.
- **Next action:** Create a specialist visual-novel target only after a real property requires it.
- **Related Storyworld work:** Interactive template; runtime compiler.


## Photography, camera, lighting and color

### Colour

- **Repository:** https://github.com/colour-science/colour
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Color-science computations, color spaces, transforms, appearance models, spectral data, and validation.
- **License:** BSD-3-Clause
- **Release / revision:** current 0.4.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active scientific project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for test/evaluation/reference calculations, not as creative color ontology.
- **Required Storyworld abstraction:** ColorScienceEvaluator adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Create unit tests for color conversions, deltas, and display transforms.
- **Related Storyworld work:** Color pipeline evaluation; DEC-0033.


### LibRaw

- **Repository:** https://github.com/LibRaw/LibRaw
- **Disposition / priority:** C — Candidate bounded dependency / P2
- **Storyworld capability:** Camera RAW decoding and metadata.
- **License:** LGPL-2.1 OR CDDL-1.0 dual license; verify build
- **Release / revision:** current 0.22.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only in sandboxed image-ingest worker, possibly through OIIO.
- **Required Storyworld abstraction:** RawDecodeAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium parser/codec risk.
- **Next action:** Prefer OIIO-mediated use unless direct control is required.
- **Related Storyworld work:** Photography ingest; source preservation.


### OpenCV

- **Repository:** https://github.com/opencv/opencv
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Computer vision primitives, image transforms, feature matching, geometry, video analysis, and ML interfaces.
- **License:** Apache-2.0
- **Release / revision:** current 5.x/4.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype bounded deterministic checks; never treat CV scores as creative approval.
- **Required Storyworld abstraction:** VisualEvaluationAdapter with explicit uncertainty and evidence.
- **Data-model risk:** Medium if feature metrics become quality truth.
- **Lock-in risk:** Medium native size/complexity.
- **Next action:** Test product/logo/object alignment, frame matching, and spatial consistency on rights-safe fixtures.
- **Related Storyworld work:** Visual continuity evaluation; B4 harness.
- **Secondary use:** Evaluation, continuity, quality and regression: Image/video analysis, feature matching, geometry, object and visual checks.


### darktable

- **Repository:** https://github.com/darktable-org/darktable
- **Disposition / priority:** A — Architectural exemplar / P3
- **Storyworld capability:** Non-destructive RAW workflow, history stack, color management, masks, tethering, and photo-library concepts.
- **License:** GPL-3.0
- **Release / revision:** current 5.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active integrated photo application.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study non-destructive edit history, sidecars, and photography workflow; support as external editor only if demanded.
- **Required Storyworld abstraction:** Photo checkout/import transformation declarations.
- **Data-model risk:** High if XMP/history becomes canonical.
- **Lock-in risk:** Low study-only; medium external integration.
- **Next action:** Extract fixture and UI patterns, not code.
- **Related Storyworld work:** Photography workflow; asset lineage.


### Lensfun

- **Repository:** https://github.com/lensfun/lensfun
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Lens/camera database and correction models for distortion, vignetting, and chromatic aberration.
- **License:** LGPL-3.0
- **Release / revision:** current 0.3.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Maintained specialist database/library.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as optional metadata/technical correction reference, not cinematography semantics.
- **Required Storyworld abstraction:** LensMetadataAttachment.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium database coverage and license.
- **Next action:** Defer until RAW/photo workflow needs lens correction.
- **Related Storyworld work:** Photography template; technical metadata.


### RawTherapee

- **Repository:** https://github.com/RawTherapee/RawTherapee
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** RAW development, processing profiles, batch workflow, and color management.
- **License:** GPL-3.0
- **Release / revision:** current 5.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active specialist application.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study profile-based non-destructive photo processing; external-editor option only.
- **Required Storyworld abstraction:** PhotoProcessingProfile attachment.
- **Data-model risk:** Medium.
- **Lock-in risk:** Low study-only.
- **Next action:** Defer unless a photo-centric production requires it.
- **Related Storyworld work:** Photography template.


### VMAF

- **Repository:** https://github.com/Netflix/vmaf
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Perceptual video-quality metric and model-based comparison.
- **License:** BSD-2-Clause plus model/patent notices; verify
- **Release / revision:** current 3.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Maintained by Netflix.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only for technical rendition degradation experiments, not narrative or visual-quality scoring.
- **Required Storyworld abstraction:** TechnicalMediaMetric adapter.
- **Data-model risk:** Low if bounded.
- **Lock-in risk:** Medium model/domain mismatch.
- **Next action:** Test transcode/proxy quality thresholds with human review.
- **Related Storyworld work:** Technical-media evaluation; export adaptors.
- **Secondary use:** Evaluation, continuity, quality and regression: Technical perceptual quality metric for video encodes.


## Professional production and visual development

### AYON Core

- **Repository:** https://github.com/ynput/ayon-core
- **Disposition / priority:** A — Architectural exemplar / P0
- **Storyworld capability:** DCC host integration, workfiles, loaders, publishers, plugins, anatomy/templates, contexts, and pipeline execution.
- **License:** Apache-2.0
- **Release / revision:** current rolling core · `d01caec13cc9eb863e81232edabdad2489bb6fcf`
- **Maintenance:** Very active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study host adapters, publish lifecycle, plugin discovery, and representation handling; use no private AYON format as Storyworld canon.
- **Required Storyworld abstraction:** ExternalEditorConnector and PublishAdapter.
- **Data-model risk:** High if AYON contexts/representations become domain authority.
- **Lock-in risk:** Medium; DCC/plugin ecosystem.
- **Next action:** Design an external-editor round trip using project-owned manifests and one disposable AYON connector.
- **Related Storyworld work:** External-editor POC; reference packs; asset lineage.


### Gaffer

- **Repository:** https://github.com/GafferHQ/gaffer
- **Disposition / priority:** A — Architectural exemplar / P0
- **Storyworld capability:** Node-based look development, lighting, compositing, deferred evaluation, Python/OSL scripting, and pipeline-tool framework.
- **License:** BSD-3-Clause
- **Release / revision:** 1.6 maintenance/current development · `983d0670dfeb9319c6f249176b61f627068f9acc`
- **Maintenance:** Highly active and production-proven.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study graph evaluation, plugs, contexts, undo, inspection, presets, and pipeline separation; do not embed the full DCC.
- **Required Storyworld abstraction:** CreativeSystem graph/compiler patterns and external-editor bridge.
- **Data-model risk:** High if node graph becomes Storyworld canonical creative model.
- **Lock-in risk:** Low study-only; high if embedding native app.
- **Next action:** Produce a DEC-0033 crosswalk for resolved creative systems, contexts, provenance, and overrides.
- **Related Storyworld work:** DEC-0033 amendment; Look/CreativeDirection; provider execution.


### Kitsu

- **Repository:** https://github.com/cgwire/kitsu
- **Disposition / priority:** A — Architectural exemplar / P0
- **Storyworld capability:** Production tracking for assets, shots, episodes, tasks, previews, comments, statuses, playlists, and delivery.
- **License:** AGPL-3.0
- **Release / revision:** 1.0.55 (2026-07-29) · `d50bda3a81cb06112e7a7748384ce5d779bae567`
- **Maintenance:** Active and production-used.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study production object/workflow/UI semantics; do not adopt as Storyworld source of truth.
- **Required Storyworld abstraction:** ProductionTrackingBridge or import/export adapter only.
- **Data-model risk:** Very high; Kitsu task/status model lacks Storyworld canon/authority layers.
- **Lock-in risk:** High AGPL/server coupling.
- **Next action:** Crosswalk assets/shots/tasks/previews with Storyworld productions, narrative units, candidates, reviews, and releases.
- **Related Storyworld work:** Studio IA; production templates; review queues.


### OpenRV

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenRV
- **Disposition / priority:** A — Architectural exemplar / P0
- **Storyworld capability:** Professional media review/playback, sessions, sources, color, annotations, playlists, frame-accurate comparison, and scripting.
- **License:** Apache-2.0
- **Release / revision:** current main; verify release · `6a3af6e9f94421975ca596cce99e09458e5d1258`
- **Maintenance:** Very active, ASWF-governed.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study exact-frame review, session, source, cache, color, and compare semantics; optional external review integration.
- **Required Storyworld abstraction:** ReviewPlayerAdapter and OTIO/annotation bridge.
- **Data-model risk:** High if RV sessions/comments become approvals.
- **Lock-in risk:** Medium native app/integration complexity.
- **Next action:** Compare OpenRV/xStudio patterns with a web-based Media Chrome POC.
- **Related Storyworld work:** Review Room; frame annotations; color pipeline.


### xSTUDIO

- **Repository:** https://github.com/AcademySoftwareFoundation/xstudio
- **Disposition / priority:** A — Architectural exemplar / P0
- **Storyworld capability:** Studio review/playback, playlists, media sources, annotations, compare modes, color, caching, and Python integration.
- **License:** Apache-2.0
- **Release / revision:** current development · `d60b3e87fc52fb87b4d4e545e16dcd35471c567c`
- **Maintenance:** Active ASWF project, younger than OpenRV.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study review architecture and possibly integrate as external client; do not reuse its session as approval authority.
- **Required Storyworld abstraction:** ReviewSession export/import adapter.
- **Data-model risk:** High.
- **Lock-in risk:** Medium native/deployment complexity.
- **Next action:** Use as reference for frame-accurate review, source versions, notes, and playlists.
- **Related Storyworld work:** Review Room; annotation target; media proxy.


### AYON Backend

- **Repository:** https://github.com/ynput/ayon-backend
- **Disposition / priority:** F — Counterexample or cautionary reference / P1
- **Storyworld capability:** Pipeline server, project/folder/product/version/representation concepts, event services, settings, and APIs.
- **License:** Functional Source License with delayed Apache conversion for newer server lines — AYON client/core components and server components have different licensing; verify exact version.
- **Release / revision:** 1.15.x current reported · `6424848f602ee9f76cbf9424eca3696ebc25a9bb`
- **Maintenance:** Very active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study architecture and concepts only unless legal/business review accepts current license.
- **Required Storyworld abstraction:** No required dependency; optional external integration adapter.
- **Data-model risk:** Very high.
- **Lock-in risk:** High licensing, server, and schema coupling.
- **Next action:** Record as fair-source caution and inspect conversion dates before any deployment.
- **Related Storyworld work:** Dependency governance; production tracking.


### Blender

- **Repository:** https://github.com/blender/blender
- **Disposition / priority:** A — Architectural exemplar / P1
- **Storyworld capability:** Integrated 3D scene, modeling, rigging, animation, lighting, rendering, compositing, video editing, scripting, and asset libraries.
- **License:** GPL-3.0-or-later
- **Release / revision:** current 4.x/5.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active, mature, huge ecosystem.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study scene/asset/animation workflows and support as an external editor/runtime source; never embed its file or database as Storyworld authority.
- **Required Storyworld abstraction:** Blender checkout/import/export connector; USD/glTF bridge.
- **Data-model risk:** Very high if .blend becomes canonical.
- **Lock-in risk:** Medium external-tool dependency; high if linked.
- **Next action:** Prototype immutable checkout manifest, returned derivatives, and revalidation.
- **Related Storyworld work:** External-editor round trip; 3D source assets; BeKindRewind.


### Blender Studio Pipeline

- **Repository:** https://github.com/blender/blender-studio-pipeline
- **Disposition / priority:** A — Architectural exemplar / P1
- **Storyworld capability:** Open-movie production pipeline, asset/shot workflows, task layers, publishing, Kitsu integration, and editorial handoff.
- **License:** GPL-compatible; verify repository
- **Release / revision:** rolling studio tooling · `main assessed 2026-07-31`
- **Maintenance:** Active in Blender Studio context.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study end-to-end professional workflow and handoffs; do not adopt studio-specific assumptions wholesale.
- **Required Storyworld abstraction:** ProductionTemplate patterns and external-tool receipts.
- **Data-model risk:** Medium study-only.
- **Lock-in risk:** Low study-only.
- **Next action:** Extract fixture ideas for shot/asset publishing and editorial round trips.
- **Related Storyworld work:** Animation-production templates; production tracking.


### MaterialX

- **Repository:** https://github.com/AcademySoftwareFoundation/MaterialX
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Material/look-dev interchange graph, standard nodes, shader generation, documents, and renderer/DCC interoperability.
- **License:** Apache-2.0
- **Release / revision:** current 1.39.x line; verify tag · `ebc8cc8d89c056ba7d7bde0d6ef49bdc417e7de7`
- **Maintenance:** Active, production-standard, ASWF-governed.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as 3D material/look interchange reference; Storyworld owns higher-level RepresentationStyle/ProductionDesign semantics.
- **Required Storyworld abstraction:** MaterialRealizationProfile and attachment refs.
- **Data-model risk:** Medium if MaterialX nodes become universal Look model.
- **Lock-in risk:** Low.
- **Next action:** Add one 3D material fixture and provider replacement test.
- **Related Storyworld work:** DEC-0033; OpenUSD/glTF runtime packages.


### Zou

- **Repository:** https://github.com/cgwire/zou
- **Disposition / priority:** A — Architectural exemplar / P1
- **Storyworld capability:** Kitsu backend/API for production entities, tasks, previews, events, permissions, and automation.
- **License:** AGPL-3.0
- **Release / revision:** 1.0.62 (2026-07-30) · `179c72bb9458de005f1100f314bf7db8524c0c1b`
- **Maintenance:** Active companion backend.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study API/event and production-data patterns; avoid database or service dependency by default.
- **Required Storyworld abstraction:** Optional Kitsu integration adapter.
- **Data-model risk:** Very high.
- **Lock-in risk:** High AGPL/operational coupling.
- **Next action:** Use only as evidence source for production-tracking semantics.
- **Related Storyworld work:** Integration and event design.


### OpenCue

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenCue
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Open-source render-farm scheduler, jobs, layers, frames, hosts, resource allocation, retries, and monitoring.
- **License:** Apache-2.0
- **Release / revision:** current main; verify release · `8dff1666a73e46625404fcd290ec6fa5042afc5b`
- **Maintenance:** Active ASWF project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study render workload scheduling and operational UI; do not replace Temporal for business workflows.
- **Required Storyworld abstraction:** Optional RenderFarmAdapter behind Storyworld workflow activities.
- **Data-model risk:** Medium if frame/job model leaks into generation domain.
- **Lock-in risk:** High operational complexity.
- **Next action:** Defer until render-farm scale is measured.
- **Related Storyworld work:** Media runners; workflow scaling.


### OpenReviewIO

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenReviewIO
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Emerging open review interchange initiative for annotations, review sessions, and media-review interoperability.
- **License:** Apache-2.0 expected; verify repository
- **Release / revision:** early/experimental · `main assessed 2026-07-31`
- **Maintenance:** Early-stage; do not rely on stability.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Track as standards experiment and compare with Storyworld AnnotationTarget/OTIO.
- **Required Storyworld abstraction:** Review interchange profile.
- **Data-model risk:** Medium; schemas may change.
- **Lock-in risk:** High maturity risk.
- **Next action:** Monitor rather than adopt; use as input to annotation decision.
- **Related Storyworld work:** Cross-media annotation; external review.


### OpenRV Annotation

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenRV-annotation
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** Open annotation work around OpenRV/OTIO-oriented media review.
- **License:** Apache-2.0 expected; verify
- **Release / revision:** early 2026 project · `main assessed 2026-07-31`
- **Maintenance:** New and evolving.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study annotation serialization and review exchange; no direct dependency yet.
- **Required Storyworld abstraction:** AnnotationTarget interchange adapter.
- **Data-model risk:** Medium.
- **Lock-in risk:** High maturity risk.
- **Next action:** Include in annotation POC source review.
- **Related Storyworld work:** AnnotationTarget; Review Room.


### Open Shading Language

- **Repository:** https://github.com/AcademySoftwareFoundation/OpenShadingLanguage
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Programmable production shading language, closures, materials, lights, displacement, patterns, and renderer interoperability.
- **License:** BSD-3-Clause
- **Release / revision:** 1.15.4.0 (2026-05-06) · `release 1.15.4.0 assessed`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study specialist shading semantics; do not expose OSL as general Storyworld style language.
- **Required Storyworld abstraction:** Provider/DCC attachment only.
- **Data-model risk:** Low if attachment; high if canonical.
- **Lock-in risk:** Low.
- **Next action:** Defer until a renderer integration requires it.
- **Related Storyworld work:** 3D realization; look development.


### OpenFX

- **Repository:** https://github.com/AcademySoftwareFoundation/openfx
- **Disposition / priority:** B — Standards or interchange reference / P3
- **Storyworld capability:** Host/plugin API for image effects, parameterization, processing contexts, and signed release practices.
- **License:** BSD-3-Clause
- **Release / revision:** 1.5.1 (2025-11-20) · `release 1.5.1 assessed`
- **Maintenance:** Mature specialist standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study effects-plugin boundary for external editors/runners; not a Storyworld extension model.
- **Required Storyworld abstraction:** ExternalEffectAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium native plugin security.
- **Next action:** Defer until OFX host interoperability is required.
- **Related Storyworld work:** External-editor and transformation records.


### OpenVDB

- **Repository:** https://github.com/AcademySoftwareFoundation/openvdb
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Sparse volumetric data format/data structure for clouds, smoke, fire, and effects.
- **License:** Apache-2.0
- **Release / revision:** 13.0.0 (2025-11-04) · `release 13.0.0 assessed`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Support only as specialist 3D source/derivative format when required.
- **Required Storyworld abstraction:** VolumetricAssetProfile.
- **Data-model risk:** Low.
- **Lock-in risk:** Low-medium native format risk.
- **Next action:** Do not include in MVP; preserve through generic asset custody.
- **Related Storyworld work:** Future 3D/VFX templates.


## Rights, consent, governance and safety

### SPDX Specification

- **Repository:** https://github.com/spdx/spdx-spec
- **Disposition / priority:** B — Standards or interchange reference / P0
- **Storyworld capability:** Machine-readable software, package, file, license, AI/data, security and provenance metadata.
- **License:** Community specification license; SPDX tooling licenses vary
- **Release / revision:** 3.0.1 stable; 3.1 work underway · `spec assessed 2026-07-31`
- **Maintenance:** Mature Linux Foundation standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for software/SBOM and license evidence; profile only the portions relevant to media/source packages.
- **Required Storyworld abstraction:** SPDX bridge and SBOM generation.
- **Data-model risk:** Medium if SPDX is mistaken for media rights clearance.
- **Lock-in risk:** Low.
- **Next action:** Add SBOM/license scan to supply-chain gate and map asset licenses without claiming legal clearance.
- **Related Storyworld work:** Supply chain; rights evidence; package export.


### ODRL Information Model / Vocabulary

- **Repository:** https://github.com/w3c/odrl
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Policies expressing permissions, prohibitions, duties, parties, assets, actions, constraints, and offers/agreements.
- **License:** W3C document/software licenses
- **Release / revision:** 2.2 Recommendation / current maintenance · `spec assessed 2026-07-31`
- **Maintenance:** Stable standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study and profile selected concepts; Storyworld rights model and human/legal interpretation remain authoritative.
- **Required Storyworld abstraction:** Storyworld RightsExpressionProfile.
- **Data-model risk:** High if generic ODRL policies obscure exact consent/clearance evidence.
- **Lock-in risk:** Low.
- **Next action:** Create a rights crosswalk for territory, channel, purpose, duration, attribution, training, retention, and revocation.
- **Related Storyworld work:** DEC-0036; rights and consent schemas.


### ScanCode Toolkit

- **Repository:** https://github.com/aboutcode-org/scancode-toolkit
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** License, copyright, package, dependency and origin scanning across source and binaries.
- **License:** Apache-2.0
- **Release / revision:** current 32/33 line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active specialist compliance project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use in CI/supply-chain and imported-code review; findings are evidence, not legal conclusions.
- **Required Storyworld abstraction:** LicenseScanAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium scan runtime/data updates.
- **Next action:** Scan Storyworld and candidate dependencies; store scanner/version/rules/evidence.
- **Related Storyworld work:** Supply chain; dependency adoption gates.


### Cedar

- **Repository:** https://github.com/cedar-policy/cedar
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Authorization policy language and evaluator with entity context, schema, validation, and explainable decisions.
- **License:** Apache-2.0
- **Release / revision:** current 4.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active AWS-led project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study policy/schema separation and formal authorization; prototype only after production identity decision.
- **Required Storyworld abstraction:** AuthorizationPolicyAdapter.
- **Data-model risk:** High if Cedar entities become Storyworld domain model.
- **Lock-in risk:** Medium.
- **Next action:** Compare against project-owned RBAC/ABAC and OPA for one acceptance-class authorization matrix.
- **Related Storyworld work:** Identity/authorization; questionnaire Q20.


### cosign

- **Repository:** https://github.com/sigstore/cosign
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Artifact signing, verification, keyless identities, attestations, transparency log integration, and OCI support.
- **License:** Apache-2.0
- **Release / revision:** current 3.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly active CNCF project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study release-signing and verification; Storyworld package signatures may remain project-owned Ed25519.
- **Required Storyworld abstraction:** Optional PackageSignatureProvider/CI artifact signing.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium trust infrastructure.
- **Next action:** Compare Storyworld offline signed packages with Sigstore for software/build artifacts.
- **Related Storyworld work:** Supply chain; package verification.


### Data Privacy Vocabulary

- **Repository:** https://github.com/w3c/dpv
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** Privacy concepts for purposes, processing, personal data, legal bases, consent, risks, measures, and rights.
- **License:** W3C document/software licenses
- **Release / revision:** 2.x current; verify · `spec assessed 2026-07-31`
- **Maintenance:** Active W3C community standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as vocabulary reference for privacy/restricted-source policy, not automated legal compliance.
- **Required Storyworld abstraction:** PrivacyVocabularyProfile.
- **Data-model risk:** Medium.
- **Lock-in risk:** Low.
- **Next action:** Map S0–S3 sensitivity and child-data prohibitions to selected DPV terms.
- **Related Storyworld work:** DEC-0035/0037; privacy policy.


### in-toto

- **Repository:** https://github.com/in-toto/in-toto
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Software supply-chain layout, link metadata, signed attestations, thresholds, and step verification.
- **License:** Apache-2.0
- **Release / revision:** current 3.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature security framework.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study attestation/step verification for media transformations and build pipelines; do not replace creative approvals.
- **Required Storyworld abstraction:** TransformationAttestation profile.
- **Data-model risk:** Medium.
- **Lock-in risk:** Low.
- **Next action:** Map one media generation/edit/export chain to in-toto-style attestations as a research fixture.
- **Related Storyworld work:** Asset lineage; supply chain; authorship dossier.


### Open Policy Agent

- **Repository:** https://github.com/open-policy-agent/opa
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** General policy evaluation engine, Rego language, bundles, decisions, and distributed enforcement.
- **License:** Apache-2.0
- **Release / revision:** current 1.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype only for infrastructure/authorization policy; do not encode narrative meaning or approvals in Rego.
- **Required Storyworld abstraction:** PolicyEvaluationAdapter with typed Storyworld inputs/outputs.
- **Data-model risk:** High if policy code becomes hidden authority.
- **Lock-in risk:** Medium operational/language coupling.
- **Next action:** Compare with Cedar for a narrow provider/rights preflight policy.
- **Related Storyworld work:** Technical enablement policy-language deferral; security.


### OpenFGA

- **Repository:** https://github.com/openfga/openfga
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Relationship-based authorization tuples, model language, checks, list objects/users, and consistency semantics.
- **License:** Apache-2.0
- **Release / revision:** current 1.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active CNCF ecosystem project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study resource relationship authorization; avoid separate service until scale/complexity proves need.
- **Required Storyworld abstraction:** Potential AuthorizationProjection adapter.
- **Data-model risk:** High if tuples become source of truth separate from Storyworld membership/roles.
- **Lock-in risk:** Medium service/consistency.
- **Next action:** Use as model comparison for property, production, guest, spoiler, and rights scopes.
- **Related Storyworld work:** Authorization design; shared-universe access.


### SpiceDB

- **Repository:** https://github.com/authzed/spicedb
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Zanzibar-style relationship authorization, caveats, consistency tokens, watch, and schema language.
- **License:** Apache-2.0
- **Release / revision:** current 1.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active and mature commercial/open ecosystem.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study consistency/caveat patterns; avoid adding service absent measured need.
- **Required Storyworld abstraction:** Potential AuthorizationProjection adapter.
- **Data-model risk:** High.
- **Lock-in risk:** Medium service/operational coupling.
- **Next action:** Compare with OpenFGA and current PostgreSQL RLS/ABAC.
- **Related Storyworld work:** Authorization architecture.


### Casbin

- **Repository:** https://github.com/casbin/casbin
- **Disposition / priority:** F — Counterexample or cautionary reference / P3
- **Storyworld capability:** Embedded authorization models covering ACL/RBAC/ABAC with adapters and matchers.
- **License:** Apache-2.0
- **Release / revision:** current 2.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study only; flexible model configuration risks opaque policy and weaker Storyworld-specific evidence.
- **Required Storyworld abstraction:** No dependency unless a bounded need emerges.
- **Data-model risk:** High.
- **Lock-in risk:** Medium.
- **Next action:** Prefer current explicit authorization plus PostgreSQL RLS.
- **Related Storyworld work:** Authorization alternatives.


### Documenso

- **Repository:** https://github.com/documenso/documenso
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Open-source document signing workflows, templates, recipients, audit trails, and self-hosting.
- **License:** AGPL-3.0
- **Release / revision:** current 1.x/2.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study/integrate only if legal e-signature is required; Storyworld approvals remain separate.
- **Required Storyworld abstraction:** ExternalSignatureProvider adapter.
- **Data-model risk:** High if signature events are confused with creative acceptance.
- **Lock-in risk:** High AGPL/service/identity.
- **Next action:** Defer pending questionnaire Q20.7 and counsel.
- **Related Storyworld work:** Contributor agreements; legal signatures.


### DocuSeal

- **Repository:** https://github.com/docusealco/docuseal
- **Disposition / priority:** E — Specialist template reference / P3
- **Storyworld capability:** Self-hosted document form/signature workflows and audit records.
- **License:** AGPL-3.0
- **Release / revision:** current 2.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Alternative external signature provider; not Storyworld decision system.
- **Required Storyworld abstraction:** ExternalSignatureProvider adapter.
- **Data-model risk:** High.
- **Lock-in risk:** High.
- **Next action:** Compare only when e-sign requirement is confirmed.
- **Related Storyworld work:** Rights/consent operations.


### The Update Framework

- **Repository:** https://github.com/theupdateframework/python-tuf
- **Disposition / priority:** A — Architectural exemplar / P3
- **Storyworld capability:** Role-based signed metadata, thresholds, expiry, rollback/freeze protection, and secure update distribution.
- **License:** Apache-2.0 / BSD components; verify
- **Release / revision:** current 6.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Mature security project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study trust-store/key-rotation/expiry patterns for signed package distribution.
- **Required Storyworld abstraction:** PackageTrustStore design.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium operational complexity.
- **Next action:** Defer until public package distribution requires rotating trust.
- **Related Storyworld work:** Portability/signing roadmap.


## Search and retrieval

### pgvector

- **Repository:** https://github.com/pgvector/pgvector
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** Vector type/indexes and similarity search inside PostgreSQL.
- **License:** PostgreSQL License
- **Release / revision:** current 0.8.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active and widely used.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Defer until semantic/multimodal need is proven; keep embeddings a rebuildable, permission-filtered projection.
- **Required Storyworld abstraction:** SemanticSearchProjection adapter within PostgreSQL.
- **Data-model risk:** Medium; vector nearest-neighbor cannot enforce narrative visibility by itself.
- **Lock-in risk:** Low.
- **Next action:** POC only after FTS/pg_trgm baseline; test deletion, reindex, explanation, and tenant/spoiler filters.
- **Related Storyworld work:** Technical enablement defer; search architecture.


### Meilisearch

- **Repository:** https://github.com/meilisearch/meilisearch
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Fast typo-tolerant search, facets, filters, ranking rules, highlighting, and API.
- **License:** MIT core; cloud/enterprise features differ
- **Release / revision:** current 1.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype only if PostgreSQL FTS cannot meet measured requirements.
- **Required Storyworld abstraction:** SearchIndexAdapter with source-of-truth rebuild/reconciliation.
- **Data-model risk:** High if external index becomes authority or leaks restricted data.
- **Lock-in risk:** Medium service and feature-tier coupling.
- **Next action:** Test permission revocation, historical versions, spoiler exclusion, ranking explanation, and full rebuild.
- **Related Storyworld work:** Search POC; Library.


### Typesense

- **Repository:** https://github.com/typesense/typesense
- **Disposition / priority:** F — Counterexample or cautionary reference / P2
- **Storyworld capability:** Typo-tolerant faceted search, vector/hybrid search, filtering, curation, and API.
- **License:** GPL-3.0 server; cloud terms differ
- **Release / revision:** current 29/30 line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study/POC only after GPL and operations review.
- **Required Storyworld abstraction:** SearchIndexAdapter.
- **Data-model risk:** High.
- **Lock-in risk:** High license/service coupling.
- **Next action:** Prefer PostgreSQL baseline; compare only if Meilisearch/OpenSearch gaps matter.
- **Related Storyworld work:** Search alternatives.


### OpenSearch

- **Repository:** https://github.com/opensearch-project/OpenSearch
- **Disposition / priority:** F — Counterexample or cautionary reference / P3
- **Storyworld capability:** Distributed lexical/vector search, analyzers, aggregations, security plugins, dashboards, and scale.
- **License:** Apache-2.0
- **Release / revision:** current 3.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Architectural reference; operationally excessive for current Storyworld.
- **Required Storyworld abstraction:** SearchIndexAdapter if future scale demands.
- **Data-model risk:** High if index becomes source of truth.
- **Lock-in risk:** High operations/cluster complexity.
- **Next action:** Reject for MVP; revisit only with measured corpus/query load.
- **Related Storyworld work:** Search scale gate.


### ParadeDB

- **Repository:** https://github.com/ParadeDB/paradedb
- **Disposition / priority:** F — Counterexample or cautionary reference / P3
- **Storyworld capability:** PostgreSQL-native search extensions combining BM25, analytics, and hybrid search.
- **License:** AGPL/source-available components and enterprise split; verify exact modules
- **Release / revision:** current line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active commercial/open-core project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Monitor; do not adopt without license/extension/upgrade review.
- **Required Storyworld abstraction:** No required abstraction beyond SearchProjection.
- **Data-model risk:** Medium.
- **Lock-in risk:** High extension/license/vendor risk.
- **Next action:** Prefer built-in PostgreSQL FTS/pg_trgm first.
- **Related Storyworld work:** Search alternatives.


### Qdrant

- **Repository:** https://github.com/qdrant/qdrant
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P3
- **Storyworld capability:** Vector database with filters, payloads, hybrid queries, collections, snapshots, and APIs.
- **License:** Apache-2.0
- **Release / revision:** current 1.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Highly active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** POC only if pgvector cannot meet scale/isolation requirements.
- **Required Storyworld abstraction:** SemanticSearchAdapter.
- **Data-model risk:** High.
- **Lock-in risk:** Medium service dependence.
- **Next action:** Defer.
- **Related Storyworld work:** Semantic/multimodal search.


### Tantivy

- **Repository:** https://github.com/quickwit-oss/tantivy
- **Disposition / priority:** A — Architectural exemplar / P3
- **Storyworld capability:** Rust full-text search library inspired by Lucene.
- **License:** MIT
- **Release / revision:** current 0.25 line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study index/ranking internals; not needed unless building a project-owned embedded index.
- **Required Storyworld abstraction:** Potential embedded SearchProjection implementation.
- **Data-model risk:** Medium.
- **Lock-in risk:** Medium build/maintenance burden.
- **Next action:** Defer behind PostgreSQL.
- **Related Storyworld work:** Search architecture.


## Sound, dialogue, ambience and music

### audiowaveform

- **Repository:** https://github.com/bbc/audiowaveform
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Server-side waveform peak extraction and waveform image/data generation.
- **License:** GPL-3.0 reported; verify linking/deployment
- **Release / revision:** current 1.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature specialist utility.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as isolated worker/process if license posture is acceptable; otherwise generate peaks via FFmpeg/custom code.
- **Required Storyworld abstraction:** WaveformPeakExtractor adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Medium GPL/process dependency.
- **Next action:** Compare output/performance with FFmpeg-based peak extraction.
- **Related Storyworld work:** Audio proxy pipeline.


### Media Chrome

- **Repository:** https://github.com/muxinc/media-chrome
- **Disposition / priority:** C — Candidate bounded dependency / P1
- **Storyworld capability:** Web components for accessible media controls, time display, captions, tracks, fullscreen, and playback state.
- **License:** MIT
- **Release / revision:** current 4.x line; verify tag · `c62476041348882699b6925c429dc89774394887`
- **Maintenance:** Active with explicit accessibility fixes.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Adopt as wrapped playback controls; Storyworld owns review state and annotations.
- **Required Storyworld abstraction:** StoryworldMediaPlayer adapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Test keyboard, screen reader, captions, reduced motion, mobile, and frame stepping extensions.
- **Related Storyworld work:** Review Room; media preview.


### WaveSurfer.js

- **Repository:** https://github.com/katspaugh/wavesurfer.js
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** Browser waveform rendering, playback, regions, timeline, minimap, hover, envelope, and spectrogram plugins.
- **License:** BSD-3-Clause reported; verify
- **Release / revision:** 8.0.0-beta.2 (2026-07-30) · `2b55ba43b601fa794d608d726887730f059dbbf7`
- **Maintenance:** Active; current major is beta.
- **Security:** Standard dependency review required.
- **Accessibility:** Provide structured cue/region table and keyboard operations.
- **Integration posture:** Prototype waveform/region renderer with precomputed peaks and proxy audio.
- **Required Storyworld abstraction:** AudioTimelineRenderer over AnnotationTarget.
- **Data-model risk:** High if region JSON becomes canonical.
- **Lock-in risk:** Medium beta/API and browser-memory risk.
- **Next action:** Test long audio, keyboard region editing, exact sample/timecode conversion, and replacement.
- **Related Storyworld work:** Audio cue POC; Review Room; AnnotationTarget.


### WebVTT

- **Repository:** https://github.com/w3c/webvtt
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Timed text cues, regions, styling, metadata, and web media interoperability.
- **License:** W3C document/software licenses
- **Release / revision:** current living standard/editor draft · `spec assessed 2026-07-31`
- **Maintenance:** Widely implemented.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as primary web caption/subtitle rendition; canonical subtitle document remains Storyworld-owned.
- **Required Storyworld abstraction:** WebVTTRenditionAdapter.
- **Data-model risk:** Medium if cue syntax becomes canonical.
- **Lock-in risk:** Low.
- **Next action:** Add caption round-trip and accessibility fixtures.
- **Related Storyworld work:** Accessibility renditions; Release Builder.


### Ardour

- **Repository:** https://github.com/Ardour/ardour
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Professional DAW architecture, regions, playlists, tracks, buses, automation, latency, session management, and plugin hosting.
- **License:** GPL-2.0-or-later
- **Release / revision:** rolling/tags; verify release · `main assessed 2026-07-31`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study multitrack/session/cue concepts and support as external editor only.
- **Required Storyworld abstraction:** AudioSession export/import profile.
- **Data-model risk:** Very high if session format becomes canonical.
- **Lock-in risk:** Medium external integration.
- **Next action:** Extract track/region/stem and non-destructive edit semantics for Storyworld-owned models.
- **Related Storyworld work:** SoundDesignSystem; external editor.


### Audacity

- **Repository:** https://github.com/audacity/audacity
- **Disposition / priority:** A — Architectural exemplar / P2
- **Storyworld capability:** Waveform/multitrack editing, effects, labels, import/export, nondestructive project work, and audio UX.
- **License:** GPL-3.0
- **Release / revision:** 3.7.8 (2026-06-11 reported); 4.x transition underway · `main assessed 2026-07-31`
- **Maintenance:** Very active, undergoing major architecture/UI transition.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study and support as external audio editor; do not embed or use project DB as authority.
- **Required Storyworld abstraction:** Audio checkout/import adapter.
- **Data-model risk:** Very high.
- **Lock-in risk:** Medium external-project compatibility.
- **Next action:** Prototype segment replacement and label/cue exchange.
- **Related Storyworld work:** External editor; dialogue/sound workflow.


### Essentia

- **Repository:** https://github.com/MTG/essentia
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Audio analysis algorithms for rhythm, key, loudness, spectral features, fingerprinting, and ML models.
- **License:** AGPL-3.0 for library; commercial licensing available
- **Release / revision:** current 2.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active research/production library.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype bounded audio descriptors; do not infer narrative meaning or creative quality automatically.
- **Required Storyworld abstraction:** AudioFeatureEvaluator service boundary.
- **Data-model risk:** Medium if descriptors become judgments.
- **Lock-in risk:** High AGPL/commercial-license implications.
- **Next action:** Compare with librosa for offline evaluation fixtures.
- **Related Storyworld work:** Audio evaluation; search similarity.


### librosa

- **Repository:** https://github.com/librosa/librosa
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Python audio analysis for features, beat tracking, spectral transforms, segmentation, and visualization.
- **License:** ISC
- **Release / revision:** current 0.11 line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active scientific Python project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use in evaluation/research worker, not production authority.
- **Required Storyworld abstraction:** AudioEvaluationAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low-medium Python stack.
- **Next action:** Create reproducible audio-feature fixtures with uncertainty labels.
- **Related Storyworld work:** Audio evaluation; B4 corpus.


### MuseScore Studio

- **Repository:** https://github.com/musescore/MuseScore
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Music notation, score parts, playback, MIDI/MusicXML import/export, engraving, and composition workflow.
- **License:** GPL-3.0
- **Release / revision:** current 4.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active and mature.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study notation/score workflow and support MusicXML export; not a music-identity model.
- **Required Storyworld abstraction:** MusicNotationAdapter.
- **Data-model risk:** High if MuseScore format becomes canonical.
- **Lock-in risk:** Low study-only; medium external integration.
- **Next action:** Use only when notated score production is scheduled.
- **Related Storyworld work:** MusicIdentitySystem; score templates.


### MusicXML

- **Repository:** https://github.com/w3c/musicxml
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** Interchange schema for Western music notation, parts, measures, notes, directions, layout, and playback data.
- **License:** W3C specification license
- **Release / revision:** 4.0 current; verify · `spec assessed 2026-07-31`
- **Maintenance:** Mature industry interchange standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for notation interchange where applicable; do not force all sonic identity into notation.
- **Required Storyworld abstraction:** MusicNotationProfile.
- **Data-model risk:** Medium; inadequate for audio, production, and many non-Western practices.
- **Lock-in risk:** Low.
- **Next action:** Map CuePlan/MotifDefinition to optional MusicXML assets without semantic loss claims.
- **Related Storyworld work:** Score export; music templates.


### Subtitle Edit

- **Repository:** https://github.com/SubtitleEdit/subtitleedit
- **Disposition / priority:** E — Specialist template reference / P2
- **Storyworld capability:** Subtitle authoring, timing, waveform/spectrogram, format conversion, OCR, translation aids, and QA.
- **License:** GPL-3.0
- **Release / revision:** current 4.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Very active specialist desktop application.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study caption/subtitle workflow and support as external editor/export target.
- **Required Storyworld abstraction:** SubtitleDocument and external-editor adapter.
- **Data-model risk:** High if its format/project becomes canonical.
- **Lock-in risk:** Low study-only.
- **Next action:** Extract timing, reading-speed, overlap, and format-validation fixtures.
- **Related Storyworld work:** Accessibility renditions; Release Builder.


### TTML2

- **Repository:** https://github.com/w3c/ttml2
- **Disposition / priority:** B — Standards or interchange reference / P2
- **Storyworld capability:** Timed-text interchange for broadcast/streaming, styling, layout, timing, and profiles.
- **License:** W3C document/software licenses
- **Release / revision:** TTML2 Recommendation/current errata · `spec assessed 2026-07-31`
- **Maintenance:** Stable standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Support as specialist target profile where required.
- **Required Storyworld abstraction:** TTMLRenditionAdapter.
- **Data-model risk:** Medium.
- **Lock-in risk:** Low.
- **Next action:** Defer until a channel requires TTML/IMSC.
- **Related Storyworld work:** Caption/subtitle export adaptors.


### libass

- **Repository:** https://github.com/libass/libass
- **Disposition / priority:** C — Candidate bounded dependency / P3
- **Storyworld capability:** ASS/SSA subtitle rendering library with complex styling and shaping integrations.
- **License:** ISC
- **Release / revision:** current 0.17.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Mature and active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only as a rendition renderer/test oracle for ASS subtitles.
- **Required Storyworld abstraction:** SubtitleRenderAdapter.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Defer until styled subtitle output is required.
- **Related Storyworld work:** Subtitle rendition validation.


### MNX

- **Repository:** https://github.com/w3c/mnx
- **Disposition / priority:** B — Standards or interchange reference / P3
- **Storyworld capability:** Emerging web-oriented music notation interchange standard.
- **License:** W3C specification license
- **Release / revision:** draft/current editor's draft · `main assessed 2026-07-31`
- **Maintenance:** Evolving standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Monitor; do not depend until stable and needed.
- **Required Storyworld abstraction:** Future MusicNotationProfile.
- **Data-model risk:** Medium.
- **Lock-in risk:** High maturity risk.
- **Next action:** Track alongside MusicXML.
- **Related Storyworld work:** Future score interoperability.


### pyannote.audio

- **Repository:** https://github.com/pyannote/pyannote-audio
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P3
- **Storyworld capability:** Speaker diarization and audio segmentation pipelines.
- **License:** MIT code; pretrained-model terms may differ
- **Release / revision:** current 4.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active research project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only for optional transcription/diarization assistance with model/license/privacy review.
- **Required Storyworld abstraction:** TranscriptionDiarizationProvider adapter.
- **Data-model risk:** Medium.
- **Lock-in risk:** High model/data/privacy coupling.
- **Next action:** POC on rights-safe dialogue, local execution, error rates, and correction workflow.
- **Related Storyworld work:** Dialogue editing; captions; source ingestion.


### Whisper

- **Repository:** https://github.com/openai/whisper
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P3
- **Storyworld capability:** Speech recognition and translation model/code.
- **License:** MIT code; model/data considerations remain
- **Release / revision:** 20250625 release line reported · `main assessed 2026-07-31`
- **Maintenance:** Stable but not necessarily rapidly evolving.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Treat as replaceable transcription provider; outputs are candidates requiring review.
- **Required Storyworld abstraction:** TranscriptionProvider interface.
- **Data-model risk:** Medium.
- **Lock-in risk:** Medium model/performance/language limitations.
- **Next action:** Compare with current hosted/local providers on accessibility caption fixtures.
- **Related Storyworld work:** Captions/transcripts; provider abstraction.


## Structured authoring

### Lexical

- **Repository:** https://github.com/facebook/lexical
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P0
- **Storyworld capability:** Extensible editor mechanics, immutable editor state, custom nodes, commands, transforms, and accessibility-conscious editing.
- **License:** MIT
- **Release / revision:** 0.44.0 (2026-04-27 reported) · `e6de5490e3f1804f8dbdc04191e950aebfc9355b`
- **Maintenance:** Highly active, strong tests and regular releases.
- **Security:** Standard dependency review required.
- **Accessibility:** Strong intent, but custom nodes and complex blocks require Storyworld browser/AT testing.
- **Integration posture:** Prototype as one renderer for a Storyworld-owned StoryDocument AST.
- **Required Storyworld abstraction:** StoryDocument adapter; semantic-node registry; import/export layer.
- **Data-model risk:** Very high if Lexical JSON becomes canonical.
- **Lock-in risk:** Medium; React/editor-state coupling.
- **Next action:** Run StoryDocument POC against prose, screenplay blocks, entity mentions, citations, comments, images, and Markdown round trip.
- **Related Storyworld work:** Canonical StoryDocument decision; Scene Editor POC.


### ProseMirror

- **Repository:** https://github.com/ProseMirror/prosemirror
- **Disposition / priority:** A — Architectural exemplar / P0
- **Storyworld capability:** Schema-driven document model, transactions, steps, selections, history, and collaborative editing mechanics.
- **License:** MIT
- **Release / revision:** repository archived/moved in 2026; package line remains relevant · `archived GitHub meta repository assessed 2026-07-31`
- **Maintenance:** Mature design; GitHub repository relocation/archival raises maintenance-process questions.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study transaction/schema/step architecture and use through Tiptap or maintained packages only after POC.
- **Required Storyworld abstraction:** StoryDocument semantic schema independent of ProseMirror.
- **Data-model risk:** Very high if its node schema becomes permanent.
- **Lock-in risk:** Medium; package ecosystem and hosting transition.
- **Next action:** Use as architectural precedent; verify maintained upstream locations before dependency adoption.
- **Related Storyworld work:** StoryDocument ADR; semantic diff/merge POC.


### Tiptap

- **Repository:** https://github.com/ueberdosis/tiptap
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P0
- **Storyworld capability:** Headless ProseMirror-based editing, extension architecture, schema configuration, collaboration integration, and rich UI examples.
- **License:** MIT core; commercial/proprietary services and extensions exist — Core is MIT; verify each Pro/AI/Cloud feature and extension separately.
- **Release / revision:** 3.x stable; commit 2026-07-28 · `5158212970344952dd9918b6a44bfb400d7fb6c1`
- **Maintenance:** Highly active commercial/open-core ecosystem.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype only behind StoryDocument; inventory every used extension and license.
- **Required Storyworld abstraction:** StoryDocument-to-ProseMirror adapter and project-owned toolbar/UI.
- **Data-model risk:** Very high if ProseMirror/Tiptap JSON becomes canonical.
- **Lock-in risk:** High if cloud collaboration or paid extensions become required.
- **Next action:** Compare against Lexical using identical fixtures and export/replacement tests.
- **Related Storyworld work:** StoryDocument POC; collaboration decision.


### Automerge

- **Repository:** https://github.com/automerge/automerge
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** Local-first CRDT for JSON-like data, history, sync, offline work, and conflict preservation.
- **License:** MIT
- **Release / revision:** 3.4.0 (2026-07-31) · `f8b0911dc9d86265dd62934b7dc782571e3a7fcb`
- **Maintenance:** Active with dedicated maintainers.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Prototype for structured draft objects and offline-first editing; never use CRDT merge as acceptance.
- **Required Storyworld abstraction:** DraftDocumentStore and semantic merge validation.
- **Data-model risk:** High; automatic structural merge can produce semantically invalid narrative structures.
- **Lock-in risk:** Medium; binary history/sync protocol.
- **Next action:** Compare with Yjs for narrative hierarchy edits, branch conflicts, and portable export.
- **Related Storyworld work:** Semantic hierarchy merge POC; offline draft recovery.


### Pandoc

- **Repository:** https://github.com/jgm/pandoc
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Document AST, many readers/writers, citations, footnotes, metadata, filters, and conversion pipelines.
- **License:** GPL-2.0-or-later executable; pandoc-types BSD-3-Clause
- **Release / revision:** 3.9.0.2 (2026-03-19 reported) · `release 3.9.0.2 assessed`
- **Maintenance:** Very mature and active.
- **Security:** Sandbox readers/filters and limit resource access.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Run as isolated conversion tooling; StoryDocument remains canonical and conversion losses are reported.
- **Required Storyworld abstraction:** StoryDocument import/export adapter with fidelity report.
- **Data-model risk:** Medium; Pandoc AST is general publishing, not Storyworld semantics.
- **Lock-in risk:** Low if subprocess-bound; medium if embedding GPL code.
- **Next action:** Build round-trip corpus for Markdown, DOCX, EPUB, HTML, and plain text; record unsupported semantics.
- **Related Storyworld work:** StoryDocument; export adaptors; portability.


### Yjs

- **Repository:** https://github.com/yjs/yjs
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P1
- **Storyworld capability:** CRDT shared types, network-agnostic updates, awareness, snapshots, undo, editor bindings, and offline collaboration.
- **License:** MIT
- **Release / revision:** 13 stable / 14 pre-release line; verify exact production tag · `9c1994547d7bc86245a21e1a4c8319f056d05ecf`
- **Maintenance:** Active, widely integrated.
- **Security:** Awareness channels and persisted updates must be tenant- and sensitivity-scoped.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use only for draft collaboration state; accepted Storyworld revisions remain Engine commands and immutable versions.
- **Required Storyworld abstraction:** DraftCollaborationAdapter and semantic-reference reconciliation layer.
- **Data-model risk:** High; text merge can preserve bytes while breaking entity references.
- **Lock-in risk:** Medium; update format and ecosystem provider choices.
- **Next action:** Prototype concurrent edits, semantic mentions, offline recovery, access revocation, and exact-version submission.
- **Related Storyworld work:** Collaboration questionnaire Q12; StoryDocument POC.


### CKEditor 5

- **Repository:** https://github.com/ckeditor/ckeditor5
- **Disposition / priority:** F — Counterexample or cautionary reference / P2
- **Storyworld capability:** Mature collaborative rich-text editing, comments, suggestions, track changes, and export features.
- **License:** GPL-2.0-or-later plus commercial licensing — Many advanced collaboration/export features are commercially licensed.
- **Release / revision:** current line; verify exact version · `main assessed 2026-07-31`
- **Maintenance:** Highly active commercial/open-source product.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study review/suggestion UX; avoid default dependency unless licensing and feature split are explicitly accepted.
- **Required Storyworld abstraction:** Storyworld comments/suggestions/decision separation.
- **Data-model risk:** Very high if proprietary collaboration model becomes required.
- **Lock-in risk:** High licensing and service lock-in.
- **Next action:** Use as UX precedent and licensing counterexample.
- **Related Storyworld work:** Review Room; StoryDocument collaboration.


### CodeMirror 6

- **Repository:** https://github.com/codemirror/dev
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Accessible code/source editor mechanics for Markdown, JSON, schemas, scripts, and diff-adjacent views.
- **License:** MIT
- **Release / revision:** rolling packages; historical GitHub development repo moved/archived · `source migration assessed 2026-07-31`
- **Maintenance:** Mature packages; repository-hosting transition similar to ProseMirror.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for source/JSON/Markdown modes only, not rich narrative semantics.
- **Required Storyworld abstraction:** SourceEditor adapter.
- **Data-model risk:** Low if limited to source text.
- **Lock-in risk:** Low.
- **Next action:** Defer until source-mode authoring is required.
- **Related Storyworld work:** StoryDocument source view; schema editor.


### Milkdown

- **Repository:** https://github.com/milkdown/milkdown
- **Disposition / priority:** D — Disposable proof-of-concept dependency / P2
- **Storyworld capability:** Plugin-driven Markdown-first editor built on ProseMirror with composable UI.
- **License:** MIT
- **Release / revision:** current 7.x line; verify tag · `main assessed 2026-07-31`
- **Maintenance:** Active smaller ecosystem.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as Markdown-first alternative in the StoryDocument POC.
- **Required Storyworld abstraction:** StoryDocument Markdown renderer adapter.
- **Data-model risk:** High if Markdown limitations shape core.
- **Lock-in risk:** Medium; smaller bus factor.
- **Next action:** Evaluate only if Markdown fidelity is a dominant owner requirement.
- **Related Storyworld work:** Owner questionnaire Q6; StoryDocument POC.


### novelWriter

- **Repository:** https://github.com/vkbo/novelWriter
- **Disposition / priority:** A — Architectural exemplar / P3
- **Storyworld capability:** Long-form fiction project organization, scene documents, outlines, status, and human-readable files.
- **License:** GPL-3.0
- **Release / revision:** 2026.1 (2026-04-26 reported) · `release 2026.1 assessed`
- **Maintenance:** Active specialist desktop application.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Study author workflow and human-readable portability; do not embed.
- **Required Storyworld abstraction:** Long-form template and project navigation patterns.
- **Data-model risk:** Medium; folder/project assumptions differ from Engine authority.
- **Lock-in risk:** Low study-only.
- **Next action:** Extract usability patterns for chapter/scene hierarchy and metadata.
- **Related Storyworld work:** Long-form hierarchy template; Studio outline.


## Workflow, jobs and review

### Temporal TypeScript SDK

- **Repository:** https://github.com/temporalio/sdk-typescript
- **Disposition / priority:** C — Candidate bounded dependency / P0
- **Storyworld capability:** Durable workflows, activities, signals, queries, timers, retries, cancellation, replay, and versioning.
- **License:** MIT
- **Release / revision:** 1.21.1 currently locked by Storyworld · `Storyworld lockfile/current upstream assessed`
- **Maintenance:** Highly active; already accepted and implemented.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Retain as durable business orchestrator; external media/render systems remain activities/adapters.
- **Required Storyworld abstraction:** Storyworld workflow layer already exists.
- **Data-model risk:** Low; Storyworld workflows remain project-owned.
- **Lock-in risk:** Medium operational dependency with established replacement boundaries.
- **Next action:** Continue replay/failure-injection tests; do not introduce a second business orchestrator.
- **Related Storyworld work:** ADR/DEC accepted Temporal choice; packages/workflows.


### AsyncAPI Specification

- **Repository:** https://github.com/asyncapi/spec
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Machine-readable asynchronous API/channel/message contracts.
- **License:** Apache-2.0
- **Release / revision:** 3.x current; verify · `spec assessed 2026-07-31`
- **Maintenance:** Active standards project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use for documentation and contract generation; not runtime broker choice.
- **Required Storyworld abstraction:** Storyworld AsyncAPI contract profile.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Expand only when event consumers stabilize.
- **Related Storyworld work:** Developer platform; integration contracts.


### CloudEvents

- **Repository:** https://github.com/cloudevents/spec
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Common event envelope, attributes, protocol bindings, and extension model.
- **License:** Apache-2.0
- **Release / revision:** 1.0.2 current; verify · `spec assessed 2026-07-31`
- **Maintenance:** Stable CNCF standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Use as event envelope while Storyworld owns event types and payload schemas.
- **Required Storyworld abstraction:** Storyworld CloudEvents profile.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Validate current event catalog against CloudEvents constraints and signing policy.
- **Related Storyworld work:** Contracts/event catalog; integrations.


### OpenTelemetry Specification

- **Repository:** https://github.com/open-telemetry/opentelemetry-specification
- **Disposition / priority:** B — Standards or interchange reference / P1
- **Storyworld capability:** Trace, metric, log, baggage, semantic conventions, context propagation, and collector interoperability.
- **License:** Apache-2.0
- **Release / revision:** 1.x specification; active · `spec assessed 2026-07-31`
- **Maintenance:** Very active CNCF standard.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Continue using for technical observability while Storyworld receipts remain business evidence.
- **Required Storyworld abstraction:** Storyworld telemetry semantic-convention profile.
- **Data-model risk:** Low.
- **Lock-in risk:** Low.
- **Next action:** Define correlation from UI command to workflow, provider, asset, finding, and receipt without exposing restricted content.
- **Related Storyworld work:** Canonical operations; media/workflow tracing.


### n8n

- **Repository:** https://github.com/n8n-io/n8n
- **Disposition / priority:** G — Reject / P2
- **Storyworld capability:** Visual automation workflows, connectors, credentials, triggers, and node ecosystem.
- **License:** Sustainable Use License / enterprise terms; not OSI-open-source for all uses
- **Release / revision:** current 2.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Highly active commercial project.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Do not use for Storyworld authority or orchestration; study connector UX only.
- **Required Storyworld abstraction:** None required.
- **Data-model risk:** Very high; workflow nodes/credentials/history can become shadow control plane.
- **Lock-in risk:** Very high licensing/cloud/plugin coupling.
- **Next action:** Reject as platform dependency.
- **Related Storyworld work:** Counterexample for single-control-plane and plugin safety.
- **Rejection rationale:** Conflicts with accepted Temporal control plane, governance receipts, self-host/commercial licensing posture, and safe plugin boundary.


### Prefect

- **Repository:** https://github.com/prefecthq/prefect
- **Disposition / priority:** F — Counterexample or cautionary reference / P3
- **Storyworld capability:** Python data workflows, tasks, orchestration, scheduling, retries, and UI.
- **License:** Apache-2.0 core with cloud features; verify
- **Release / revision:** current 3.x line; verify · `main assessed 2026-07-31`
- **Maintenance:** Active.
- **Security:** Standard dependency review required.
- **Accessibility:** Not directly assessed; Storyworld remains responsible for accessible composition.
- **Integration posture:** Do not replace Temporal; study task observability only if useful.
- **Required Storyworld abstraction:** No permanent dependency.
- **Data-model risk:** High if second orchestration model introduced.
- **Lock-in risk:** Medium.
- **Next action:** Reject for business orchestration; possibly study worker telemetry.
- **Related Storyworld work:** Counterexample/alternative analysis.
