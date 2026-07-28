# FIX-COMMERCE — Fictional Commerce Foundry Campaign

**Fixture campaign:** `vellumvale-ff17-launch`  
**Fictional brand:** Vellumvale Fixture Works  
**Fictional product:** Model FF-17 Reading Light  
**Primary tests:** immutable product snapshot, exact approved claims, prohibited claims and depictions, product fidelity, disclosure, placement, exact-version rejection, focused revision, resubmission  
**Source status:** Entirely fixture-created and fictional; the brand is deliberately marked as test-only

> I authored this; fictional; permitted use: test fixture in this repository.

## Brand and product

### Brand

**Vellumvale Fixture Works** is a wholly fictional, test-only brand. It is not intended to represent or imitate an existing company, and it is not proposed for real-world registration or commerce.

### Product

**Model FF-17 Reading Light** is a compact rechargeable light that clips to a book and folds flat for storage.

#### Product appearance

- Matte deep-moss body.
- Cream silicone clip pad.
- One brass-tone circular hinge.
- Narrow rectangular light head with six warm-white light apertures.
- USB-C port on the right side of the base when the logo faces the viewer.
- Wordmark `VELLUMVALE` printed horizontally in cream on the outer clip arm.
- Model mark `FF-17` printed in small cream type beneath the wordmark.

#### Current packaging — version 2

- Rectangular paper carton, approximately 165 × 70 × 28 mm.
- Deep-moss uncoated paper.
- Horizontal cream belly band wrapping the middle third.
- Copper-foil `VELLUMVALE` wordmark centered on the front.
- Simple cream line drawing of the folded light.
- Small crescent thumb notch at the top flap.
- `FF-17` printed at lower right.
- No plastic window.

#### Obsolete packaging — version 1

- Vertical cream panel on the left side.
- Old model mark `FF-16`.
- No crescent thumb notch.
- This version exists only to support the scripted rejection test and is prohibited in approved campaign renditions.

## Approved claims — exact wording

Only the following claim strings are approved. Punctuation and material qualifiers may not be removed in a way that changes meaning.

1. **“Three warm-light brightness levels.”**
2. **“USB-C rechargeable.”**
3. **“Folds flat to 18 mm.”**
4. **“Up to 20 hours of light on the lowest setting.”**
5. **“Includes one FF-17 reading light and one 30 cm USB-C cable.”**

No model may infer additional performance, health, safety, sustainability, compatibility, durability, or comparative claims from the product description or images.

## Explicitly prohibited claims

1. **“Eliminates eye strain.”**
2. **“Clinically proven to improve sleep.”**
3. **“Waterproof.”**

Also prohibited: “medical-grade,” “blue-light-free,” “better than every lamp,” “all-night battery,” “indestructible,” or any unapproved superlative.

## Required depictions

- The `VELLUMVALE` wordmark must be legible whenever the product’s logo side faces camera at a readable scale.
- The product must retain the matte moss body, cream clip pad, brass-tone hinge, and right-side USB-C port.
- Packaging shown in the campaign must be current **version 2**.
- The light must be attached to a book or shown folded beside a book; its narrative role is a reading aid.
- Product proportions must remain consistent with the pinned reference images.
- Any panel using a product claim must bind to the exact approved claim text and product snapshot version.

## Prohibited depictions

- Never show the product cracked, scorched, submerged, wet, visibly unsafe, or intentionally damaged.
- Never use the FF-17 as a full-room lamp, flashlight for outdoor navigation, emergency beacon, toy, or wearable device.
- Never move the USB-C port, add controls, change the hinge count, alter the logo, or recolor the product.
- Never show obsolete version-1 packaging in an approved rendition.
- Never place the product beside a real branded book, device, package, logo, or recognizable copyrighted cover.
- Never imply that the warm light treats a medical or sleep condition.

## Campaign brief

- **Objective:** introduce the fictional FF-17 and drive qualified visits to a fictional product-detail page while demonstrating natural product placement inside a small reading story.
- **Audience:** adults who read during commutes, travel, or quiet evening routines; no health-condition targeting.
- **Primary channel:** Instagram.
- **Renditions:** 8-panel 4:5 carousel and one 15-second vertical motion derivative assembled from approved masters.
- **Disclosure requirement:** `#ad` must appear in the first visible line of the caption and in any Story/Reel disclosure field supported by the channel adapter.
- **Accessibility requirement:** alt text must identify the product as a fictional clip-on reading light and must not introduce unapproved claims.
- **CTA:** **“See the FF-17 details.”** The fixture uses a non-routable test URL or no URL.
- **Success observations:** carousel completion, saves, product-detail clicks, first-pass approval, revision count, and placement-naturalness review. No real conversion or revenue data is required.

## Three-beat narrative plan

### Beat 1 — “The Last Page on the Train”

A fictional commuter reaches a dim stretch of the ride and clips the FF-17 to an unbranded book. The product solves a visible narrative problem without a spokesperson listing features.

- Permitted claim: “Three warm-light brightness levels.”
- Required product view: hinge and clip geometry visible.

### Beat 2 — “Fold Flat”

At the stop, the reader folds the light and slides it into a small side pocket.

- Permitted claim: “Folds flat to 18 mm.”
- Required product view: fully folded profile.
- No implication that it fits every pocket or bag.

### Beat 3 — “One More Chapter”

At home, the reader opens the book again. Current version-2 packaging appears briefly on a side table in the final carousel panel.

- Permitted claim: “USB-C rechargeable.”
- Caption may use the exact approved battery claim once.
- Disclosure and CTA present.

## Planned rejection → revise → resubmit scenario

### Submitted candidate

- Asset ID: `IG-CAROUSEL-PANEL-08-v1`.
- Bundle ID: `NAB-VELLUMVALE-001-v1`.
- The product itself is correct.
- The background package was generated from an obsolete reference and displays the version-1 vertical cream panel and model mark `FF-16`.

### Commerce Foundry finding

- Finding type: `PACKAGING_VERSION_MISMATCH`.
- Severity: `blocking`.
- Scope: exact asset and its commercial-use association; other accepted Storyworld masters are not automatically invalidated.
- Expected text: **“Rendition shows obsolete packaging version 1. Replace package region with pinned version 2; retain accepted character, book, product, lighting, composition, caption, and disclosure.”**

### Required Storyworld revision

- Mask or replace only the package region.
- Lock the character, book, product, hand pose, scene lighting, composition, claim text, disclosure, and alt-text meaning.
- Use the pinned version-2 package reference.
- Produce `IG-CAROUSEL-PANEL-08-v2` with complete lineage to v1 and a revision reason tied to the finding.
- Re-run packaging OCR, logo legibility, product-fidelity, and channel-safe-zone checks; do not rerender the entire carousel.

### Resubmission

- Bundle ID: `NAB-VELLUMVALE-001-v2`.
- Supersedes v1 but preserves it in history.
- Commerce Foundry must perform a new exact-version commercial review.
- Prior creative approval remains valid only for unchanged components; the revised panel receives a new affected-layer approval receipt.
- Publication remains impossible until Commerce Foundry grants approval for v2.

