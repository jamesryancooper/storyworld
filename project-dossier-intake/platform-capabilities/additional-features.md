# Additional Storyworld features

Platform features identified while cataloging the narrative and story projects (see `../product-definition/narrative-story-projects.md`). These are owner-endorsed feature directions, not yet governed by decision records; per the dossier process, each should flow through a proposed decision before becoming canonical architecture.

## Art-style definitions

Reusable, named art-style specifications — comparable to Midjourney style references — that projects attach at the property, series, or render level so that all generated imagery in a project stays visually consistent.

Art styles are one layer of the broader **production design and look system** specified in `production-design.md`: the hierarchical look cascade (property → production → arc → scene → shot, with emotional-register mapping), the cinematography/photography/editing parameter vocabulary (camera, lenses, film emulation, lighting, color grading, transitions), the score and sound design layer, and look-development artifacts (mood boards, look books, style tests).

### What a style definition contains

Styles are structured specifications rather than prose descriptions. Fields observed in the working style specs include:

* Style name and version.
* Mood/atmosphere (emotional tone, ambience, temporal impression).
* Color and lighting (palette temperature, dominant families, accents, saturation and contrast levels; lighting type, quality, effects).
* Technique (medium emulation, brushwork/linework, shading model, outline treatment).
* Composition rules (silhouette, negative space, depth, framing tendencies).
* Reference touchstones (artists, studios, or works that anchor the style).

### Initial style inventory

Standalone styles already specified and ready to become platform style definitions:

* **NeonSlash** — energetic neo-pop cel-shaded vector style: neon-saturated limited palette against deep neutrals, flat fills with 2–3 tone shading, crisp variable-width outlines, jagged graphic patterns, halftone grit, selective glow, asymmetric composition with strong central silhouettes; glam-punk comic-poster attitude, never photoreal.
* **Cozy Painterly Toon** — warm, comforting painterly toon style: muted blue-greys, earthy terracottas, and warm beige neutrals with soft peach and desaturated green accents; diffuse ambient lighting, gentle tonal separation; homey, whimsical, nothing ominous.
* **Illustrative Tech-Urban Nature Realism** — edgy contemporary realism blending urban motifs (graffiti textures, cityscapes) with subtle tech elements (minimalist lines, binary patterns) and stylized tech-enhanced nature; built to express opposing forces (light/dark, chaos/peace) and the journey from hopelessness to ascension; includes eco-punk worldbuilding notes balancing cyberpunk dystopia with solarpunk utopia.

Project-bound styles that should also live in the same system: "Painterly Whimsy with Magical Realism" (Ryan and Nicol storybook), the classical celestial radiance treatment (Saint Michael series), the Dumpster Fire Friends satirical cartoon style, and per-collection ambience scene aesthetics.

### Expected behavior

* Styles are first-class, versioned platform objects referenced by properties and renders — not text pasted into prompts.
* One property can hold multiple styles (the Saint Michael series renders one canonical scene across several style definitions).
* Style consistency across a property's renders is the feature's core guarantee (character sheets plus style definition = repeatable character rendering).

## Export adaptors (delivery destinations)

Storyworld projects publish through adaptors that transform property content into destination-specific formats — Instagram, TikTok, YouTube, print, and custom web experiences — rather than each project hand-managing its output formats.

### Destination adaptors

* **Social platform adaptors** (Instagram, TikTok, YouTube, and similar): carousel assembly, short-form video packaging, long-form looping video packaging.
* **Print and physical production adaptors**: page-based assembly plus full prepress and manufacturing requirements — specified below.
* **Custom web-experience adaptors**: bespoke interactive deliveries, of which one is already designed (below).

### Designed adaptor: swipe-based interactive storytelling experience

A defined web delivery format for layered editorial content:

* A content unit presents a short, bold statement in strong typography over a full-bleed background image.
* Swipe left reveals a deeper narrative/explanatory layer; the background image extends seamlessly across the transition while the text deepens.
* Swipe right returns to the collection list; swipe up advances to the next unit with snap-in-place scrolling.
* Interactions behave identically on phone, trackpad, and mouse; subtle parallax and immersive full-bleed treatment throughout.
* Primary consumer: the visual advice-storytelling property; the format generalizes to any surface-line-plus-depth editorial content.

### Print and physical production adaptors

Physical outputs are near-term for several properties (the illustrated storybook, collectible card sets, art prints, workbooks, door-per-day calendars), so the adaptor framework must cover manufacturing, not just page assembly:

* **Prepress requirements per product type**: trim/bleed/safe margins, CMYK conversion with color-profile intent, resolution floors, spine-width calculation from page count and stock, spot-finish specifications where used.
* **Product templates**: standard picture-book trims and page counts, card dimensions and pack configurations, calendar formats, poster sizes — each a named target format like any channel rendition.
* **Print-on-demand and print-vendor integration**: vendor adapters submit print-ready packages and track order/proof status the way channel adaptors track publications, with receipts.
* **Physical proofing as a review step**: a physical proof approval gate before a print release is accepted; digital acceptance alone never releases a physical edition.
* **Editions and reprints**: physical releases are versioned editions; corrections produce new editions without erasing the record of earlier printings (consistent with published-version preservation).

### Format constraints as adaptor configuration

Destination-specific composition rules belong in adaptor configuration, not in project content, for example:

* Caption/post length limits (e.g., captions under 300 characters with the first 125 characters front-loaded with the crucial message and call-to-action; hashtags and mentions pushed to the end).
* Loop-safety requirements for ambience video (no motion or narrative elements that break seamless looping).
* Presentation-unit grammars per destination — carousel slide grammar (slide counts and ordering conventions), comic panel and page grammar (page-turn reveals as pacing and spoiler boundaries), thread segmentation, picture-book spreads.
* Target length-class ladders per destination (micro ≤60s vertical, short-form, mid-form, broadcast-length, feature), so one accepted master can be derived into each length class a channel expects (see the format and length classes in `../product-definition/narrative-taxonomy.md`).

### Expected behavior

* Properties declare target destinations; adaptors handle formatting, so the same content unit can publish to multiple destinations without content duplication.
* Adaptor output participates in Storyworld's review flows before publishing.
