# Children's-Audience Compliance

Policy and platform requirements for content directed at, or reachable by, children. Owner-endorsed direction pending decision records. Target canonical homes: chapter 05 (identity, security, rights, and governance — privacy and approval layers), chapter 04 (channel strategy and publishing), and chapter 02 (templates and policy packs).

**Scope note**: this is engineering and product planning input, not legal advice. The decision-record pass for this area should include review with counsel; regulations named here (COPPA, platform made-for-kids rules, children's advertising standards) evolve and carry real penalties.

## 1. Why this is foundational

The portfolio skews heavily toward child- and family-facing work: an illustrated children's book, a middle-school science curriculum, kids-edutainment and sing-along narrative families in the taxonomy, family comedy, and seasonal family storytelling — with future intersections between children's content and Commerce Foundry, where children's advertising rules are strictest. None of the existing rights, privacy, or approval machinery distinguishes child audiences today.

## 2. Audience designation (new first-class metadata)

Every property, production, and release carries a required **audience designation**:

* **Child-directed** — made for children (with an age band: preschool, 6–9, 10–12).
* **Mixed audience** — family content children are expected to co-view.
* **General audience** — not directed at children.
* **Adult** — explicitly not for children despite surface aesthetics.

Rules:

* Designation is required before any publication step; releases without one are blocked.
* Designation cascades property → production → release, with overrides allowed downward only through review.
* Cartoon or toy-like aesthetics do not imply child-directed — and the inverse trap matters more: **Dumpster Fire Friends is an adult satire property with a cartoon style** and must carry an explicit Adult designation so no channel auto-classifies it as kids' content.

## 3. Channel and adaptor requirements

* Export adaptors carry per-destination child-audience configuration: the made-for-kids flag (YouTube), kids-app targets, comment/feature disablement expectations, and non-personalized-ad delivery for child-directed releases.
* Publication records store the designation submitted to each channel, so an audit can show what was declared, where, and when.
* Mixed-audience releases record the reasoning for not designating child-directed (platform rules penalize misdesignation in both directions).

## 4. Advertising and commerce gates

* Default policy: **no commercial placements in child-directed properties** without an explicit accepted decision.
* If ever allowed, child-directed commercial work runs a dedicated blocking review: no host-selling patterns (a story character pitching the product in the same breath as the story), age-appropriate ad content standards, and clear ad/story separation and disclosure.
* Commerce Foundry campaign briefs gain an audience-designation field, and the Commerce boundary refuses child-directed placements absent the accepted decision above.

## 5. Data handling

* Owned experiences (the swipe web experience, interactive stories, conversational characters) collect **no personal data from children**: no accounts, no free-text collection, no behavioral profiling for child-directed work.
* Analytics for child-directed releases are aggregate and non-personalized only.
* **Learner privacy** (already named in the curriculum pattern) generalizes: no learner profiles or progress records tied to an identifiable child without an explicit consent structure; instructor-facing records stay with the supervising parent.
* Any future feature that would collect child data (e.g., a kids' interactive runtime) requires its own decision record with verifiable parental-consent design.

## 6. Conversational-character child safety

Any conversational character reachable by minors requires, beyond the base character-package pattern:

* An age-appropriate policy pack (expanded prohibited topics, crisis-response fallback that directs to a trusted adult, no collection of personal details).
* No retention of minors' session content.
* Red-team evaluation against child-safety scenarios before deployment, re-run on every character-package revision.
* A designation on the character package itself (child-safe / general / adult-only), enforced at the runtime-export boundary.

## 7. Content standards per age band

* An age-appropriateness rubric per band (fear/peril intensity, themes, humor register, complexity), applied in review for child-directed and mixed work — the fairytale's non-literal "Dark Force" treatment is the house pattern for handling darkness in children's work.
* Regional and age-rated cuts (an accepted platform pattern, showcased by Dumpster Fire Friends) provide the mechanism for age-banded variants where one work must serve multiple designations.

## 8. Review layer

Children's-compliance review joins the existing approval layers (creative, continuity, editorial, rights, client, channel, commercial, runtime) for any child-directed or mixed release — a blocking gate with typed findings, like rights review.

## 9. Current portfolio designations (initial pass, owner to confirm)

| Property | Designation |
|---|---|
| Ryan and Nicol: A Fairytale | Child-directed (co-viewing keepsake; 6–9 band) |
| Tales from Two Kingdoms | Child-directed / mixed |
| SciSpark curriculum | Child-directed (10–12 band; learner privacy applies) |
| Porch Pirates | Mixed audience |
| Twenty-Four Doors | Mixed audience |
| Ambience channel | General audience |
| Dumpster Fire Friends | **Adult (explicit)** |
| Notes to My Daughter, Living Inheritance, Proper Manhood | General audience |
| Visual advice-storytelling property | General audience (13+ reach; no child data collection) |
| The Lanterns, Stillhouse, Night Signal, Matters of Record, Homestead Years, Long Table, Crossroads, Ascension, Corner Emporium, Humans of the Future, BeKindRewind | General audience (BeKindRewind runtime revisit if minors become a real audience) |

## 10. Decision items for the owner pass

1. Adopt audience designation as required release metadata (schema/vocabulary addition).
2. Adopt the default prohibition on commercial placements in child-directed properties.
3. Adopt the children's-compliance review layer and its blocking behavior.
4. Adopt the child-data prohibitions for owned experiences and analytics.
5. Adopt conversational-character child-safety requirements at the runtime-export boundary.
6. Confirm the initial portfolio designations above.
7. Engage counsel to validate the regulatory mapping (COPPA and state child-privacy laws, platform made-for-kids rules, children's advertising standards) before the first child-directed publication.
