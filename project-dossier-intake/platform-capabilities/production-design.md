# Production Design and Look System

How Storyworld defines a project's overall style, look, and feeling; refines it down to scene- and shot-level; controls every image/video/audio generation parameter (camera, composition, film emulation, lighting, color grading, transitions, score); and provides everything a traditional photo shoot, film shoot, or brand/ad shoot provides — sets, locations, props, wardrobe, characters, storyboards, and score.

This document maps what the canonical dossier already covers, names the gaps, and specifies the capabilities that close them. The new capabilities are owner-endorsed feature directions pending decision records, like the features in `additional-features.md`; the art-style definitions feature specified there is one layer of this larger system.

## 1. What the platform already covers

The canonical dossier (chapters 02 and 03) already provides most of the production-design foundation:

* **World and production design entities** — characters, organizations, locations, regions, **sets**, maps, era variants; objects, **props**, products, artifacts, vehicles, collectibles; **wardrobe, appearance states, voice profiles**; relationships and state over story time. Location state includes time of day, season, weather, **lighting**, signage, and era.
* **Reference packs** (provider-neutral) — character turnarounds, age/era variants, expressions, poses; wardrobe sets and valid transitions; location views, layout, lighting, weather, damage, and sound intent; product angles and prohibited deformations; prop and object-state references; **palette, material, composition, typography, texture, camera, and lens language**; approved voice examples; negative references. Provider-specific LoRAs, embeddings, seeds, and control networks attach as replaceable implementation details, never as canonical definition.
* **Property-level style** — the Property workspace "Style and voice" tab: visual references, palette, composition, typography, camera language, diction, prohibited traits, and provider attachments.
* **Pre-production and planning** — beat sheets, **storyboards** (a first-class Production workspace view: shots, panels, interactions, duration, camera, composition, sequence preview), **shot lists**, animatics, and content calendars.
* **Scene and shot pipeline** — scenes with entering/exiting state; shots/panels with locked invariants; a compiled, auditable **generation recipe** per shot containing scene purpose and emotional objective, cast/location/objects/wardrobe/products, visual and safety constraints, locked/flexible/provider-adjustable attributes, reference-pack versions, negative references, and shot/panel/duration/aspect-ratio/safe-area/target-format rules. The provider prompt is a rendered derivative of the recipe.
* **Continuity enforcement on style** — visual style, palette, composition, camera language, and typography are checked (style-similarity and vision/reference comparison), with findings, waivers, and dispositions.
* **Revision without rerender** — masked and regional revision; replace one character, product, object, background, text layer, or shot without rerendering the sequence.
* **Score/sound partial coverage** — voiceovers, music cues, ambience, and sound effects as media outputs; sound intent on locations; voice consent and music rights in the rights layer.
* **Brand/ad shoot needs** — product fidelity, required/prohibited depiction, claims, disclosures, placement rationale, and commercial approval via the Commerce Foundry boundary.

## 2. The gaps

1. **A hierarchical look system.** Style exists at the property level and constraints exist per recipe, but there is no explicit cascade — production-, arc/sequence-, scene-, and shot-level looks that inherit and deliberately override, nor mood-driven style rules (e.g., a palette that desaturates in moments of grief, as the fairytale style guide already does informally).
2. **An enumerated cinematography/photography/editing parameter vocabulary.** "Camera and lens language" exists as a phrase; the actual controllable parameters (shot size, angle, lens, movement, film emulation, lighting setups, grade looks, transitions, cut rhythm) are not enumerated anywhere as a structured, provider-neutral vocabulary.
3. **A score and sound design layer.** Music exists as cues and rights; there is no musical identity system — themes and leitmotifs bound to characters/places/arcs, instrumentation palettes, or emotion-to-score mapping.
4. **Look-development artifacts.** Mood boards, look books, and style tests are standard shoot pre-production; the platform has reference packs and style tabs but no named artifacts for the exploratory stage that produces them.

## 3. The look system (proposed)

A cascading hierarchy of **Look definitions**. A Look bundles: bound art-style definitions (see `additional-features.md`), palette and grading, typography, camera language defaults, composition tendencies, lighting character, motion/editing grammar, score identity, and prohibited traits.

* **Property look** — the overall style, look, and feeling of the project; the identity that everything inherits.
* **Production look** — per production/season/campaign variation within the property identity.
* **Arc/sequence look** — a chapter or sequence that deliberately shifts register (a flashback look, a dream look, a villain's-domain look).
* **Scene look** — scene-level style, look, and feeling; carries the scene's emotional register.
* **Shot overrides** — individual parameter overrides at the shot/panel/slide level.

Rules:

* Inheritance is explicit: a child level states only what it overrides; everything else flows down. Every level is versioned and reviewable.
* **Emotional-register mapping**: a Look may define mood rules — mappings from emotional states to parameter shifts (palette, lighting, lens, score) — so a scene tagged with an emotional objective (which recipes already carry) automatically inherits the right visual/musical treatment, subject to override.
* Looks compile down: the recipe compiler resolves the cascade into each shot's recipe as locked/flexible/provider-adjustable attributes — no new generation path, no opaque prompt text.
* Continuity checks validate rendered output against the resolved Look (the existing style-similarity checks, now with a precise target).

## 4. The parameter vocabulary (proposed)

A structured, provider-neutral vocabulary usable in Looks, recipes, storyboard frames, and templates. Values are template/policy-level vocabulary, not new core schema — consistent with the dossier principle that templates configure vocabulary without forking storage.

* **Shot size / framing**: extreme wide, wide, full, medium-full, medium, medium close-up, close-up, extreme close-up, insert, two-shot, over-the-shoulder, POV.
* **Camera angle / height**: eye-level, high, low, bird's-eye, worm's-eye, Dutch/canted, aerial.
* **Lens and optics**: focal-length class (ultra-wide, wide, normal, telephoto, macro), anamorphic vs. spherical, depth of field (deep/shallow), bokeh character, focus behavior (rack focus, split focus), distortion.
* **Camera movement**: locked/static, pan, tilt, dolly, truck, pedestal, zoom, crash zoom, handheld, stabilized glide, crane/jib, orbit, push-in/pull-out, whip pan, dolly zoom.
* **Film and medium emulation**: named film-stock looks, grain, halation, gate weave, clean digital, VHS/8mm/16mm/35mm/70mm, vintage process looks.
* **Exposure and motion**: motion-blur/shutter feel, long exposure, slow motion, speed ramp, timelapse, hyperlapse, stop-motion cadence.
* **Lighting**: setup (key/fill/rim/back, three-point, single-source), quality (hard/soft), direction, motivated vs. stylized, practicals, time-of-day light (golden hour, blue hour, midday, night), weather light, high-key/low-key, chiaroscuro, silhouette, volumetric light, colored practicals.
* **Color and grade**: named grade looks (e.g., teal-orange, bleach bypass, monochrome, sepia, day-for-night), palette constraints (bound to art-style definitions), saturation/contrast intent, white-balance intent.
* **Composition**: rule of thirds, centered/symmetric, leading lines, frame-within-frame, negative space, headroom/lead-room, foreground layering, blocking, aspect-specific safe areas.
* **Sequence and editing** (video): transition types (cut, match cut, cross-dissolve, wipe, whip-pan transition, smash cut, jump cut, J-cut/L-cut audio leads, montage), cut rhythm and pacing intent, coverage patterns (shot/reverse-shot), title and caption timing.
* **Format**: aspect ratio, orientation, frame rate, resolution class, loop safety, safe areas (already present in recipes and adaptor configuration; listed here for completeness).
* **Stills-specific**: series/contact-sheet consistency rules for photo-shoot-style sets.

## 5. Score and sound design (proposed)

The musical and sonic identity of a property, parallel to its visual identity:

* **Themes and leitmotifs** — musical themes bound to characters, places, relationships, and arcs (the motif registry the concept-album property already needs, generalized).
* **Instrumentation palette** — the property's sound world (what it is played on), with prohibited textures as negative references.
* **Emotion-to-score mapping** — cue behavior keyed to the scene's emotional objective, resolved through the same Look cascade.
* **Cue types** — main theme, underscore, stinger, diegetic/source music, silence as an authored beat.
* **Sound palettes** — ambience beds, sound-effect vocabulary, and mix intent per property/scene; extends the existing per-location "sound intent."
* Voice, music, and performance rights flow through the existing rights and consent layer unchanged.

## 6. Look-development artifacts (proposed)

Named pre-production artifact types with a graduation path:

* **Mood board** — exploratory collection (images, palettes, references, clips); no governance weight.
* **Look book** — curated statement of a property or production look; graduates into versioned Look definitions and reference packs on acceptance.
* **Style test / screen test** — generated trials of a Look against representative scenes and characters, compared side-by-side before the Look is accepted.

Storyboards, animatics, and shot lists already exist as planning surfaces; look-development artifacts slot in front of them, and acceptance is what turns exploration into canonical style — matching the platform rule that nothing becomes canon without an explicit decision.

## 7. Traditional-shoot parity map

| Traditional role / artifact | Storyworld equivalent | Status |
|---|---|---|
| Creative brief | Production Brief view | Covered |
| Mood board / look book | Look-development artifacts → Look definitions | Proposed |
| Casting | Character entities, reference packs, voice profiles | Covered |
| Location scouting | Location entities with views, era/condition variants | Covered |
| Set design and dressing | Sets, prop placements, object states | Covered |
| Wardrobe / costume design | Wardrobe sets and valid transitions | Covered |
| Hair/makeup continuity | Appearance states in reference packs | Covered |
| Props master | Prop/object registry with state tracking | Covered |
| Storyboard / previz / shot list | Storyboard view, animatics, shot lists | Covered |
| Director of photography | Camera/lens/composition parameters in Looks and recipes | Proposed vocabulary |
| Gaffer / lighting design | Lighting parameters in Looks and recipes | Proposed vocabulary |
| Colorist | Grade looks in the Look cascade | Proposed vocabulary |
| Editor | Sequence assembly, revision, transition vocabulary, cut rhythm | Partially covered; transitions proposed |
| Composer / score | Score and sound design layer | Proposed |
| Sound designer | Sound palettes; location sound intent | Partially covered |
| Call sheet / production schedule | Generation runs, queue, budget, calendar views | Covered |
| Brand/ad requirements | Product fidelity, claims, disclosures, placements (Commerce boundary) | Covered |
| Legal / consent | Rights layer (likeness, voice, music, location, trademark) | Covered |
| Dailies review / approval | Candidate grids, Review Room, exact-version approval | Covered |

## 8. Where this lives in the system

* **Property workspace** — the "Style and voice" tab grows into the Look system's home: property Look, bound art styles, score identity, and look-development artifacts.
* **Production workspace** — production/arc/scene Looks attach to the Arc Board and Scenes views; shot overrides and parameter vocabulary surface in the Storyboard view and Generation Workbench.
* **Recipe compiler** — resolves the Look cascade plus scene emotional objective into each shot's recipe; the parameter vocabulary rides the existing locked/flexible/provider-adjustable mechanism.
* **Continuity Console** — validates rendered candidates against the resolved Look, extending existing style-similarity checks.
* **Governance** — Looks, vocabularies, and score identities are versioned, reviewable definitions; per the dossier process, the four proposed capabilities need decision records before becoming contract work.
