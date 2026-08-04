# Astro Export Profile

**Parent skill:** `storyworld-publication-connector`  
**Status:** implementation guidance; noncanonical and unadopted

## Purpose

Make Astro-based website export the proposed first delivery profile while keeping build, deployment, and publication authority separate.

## Package

Export immutable content/data/assets, routes/slugs, metadata, canonical links, alt text, captions/transcripts, disclosures, rights evidence, accessibility requirements, content hashes, and a deterministic build profile. The package should be usable without Storyworld runtime access where intended.

## Validation

Check broken refs, inaccessible media, missing alt/captions, unsafe HTML, route collisions, metadata/schema errors, disclosure omissions, asset hashes, build reproducibility, and superseded package labels. A successful Astro build is not deployment or publication authorization.

## Permanent Storyworld boundary

- Storyworld owns creative meaning, stable IDs, exact versions, policy, custody, evaluation, human decisions, packages, and receipts.
- The external provider/tool/standard owns only bounded execution or interchange mechanics.
- Recheck current official documentation, exact version, license, security, retention, and compatibility before implementation.
- This profile grants no credentials, network calls, spending, installation, deployment, publication, or dependency adoption.
