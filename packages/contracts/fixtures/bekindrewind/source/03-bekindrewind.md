# FIX-BKR — BeKindRewind / Rewind Plaza Runtime Slice

**Fixture release:** `rewind-plaza.release-test-001`  
**Primary tests:** connected locations, spatial relationships, era rules, NPC constraints, item state, mission prerequisites and effects, triggers, dialogue, runtime export  
**Source status:** Uses the established 1980s memory-world and plaza concept; business names, NPCs, prices, missions, and exact state changes below are fixture canon

> I authored this; fictional; permitted use: test fixture in this repository.

## Slice premise and tone

It is a warm summer evening in **1986**. The player avatar, **Alex**, age thirteen, has one hour before the plaza closes. Rewind Plaza is a tiny, walkable strip-mall world built from memory: buzzing signs, sun-faded posters, warm asphalt, a payphone, bicycle racks, arcade music leaking through a door, and the smell of pizza. The slice should feel cozy, funny, slightly dreamy, and safe. It is not a simulation of a real town and contains no real brands, films, games, songs, or businesses.

## Connected locations and spatial relations

### L1 — Sunset Spool Video

- North side of the plaza, west storefront.
- Main entrance faces south into the parking court.
- Shares an interior wall with Pepperwheel Pizza.
- A staff-only cabinet is behind the counter.
- Back door opens to the service alley.
- Sound zone: low fluorescent hum, VHS cases sliding, soft fictional synth instrumental.

### L2 — Pepperwheel Pizza

- North side of the plaza, directly east of Sunset Spool Video.
- Front booth window faces the arcade across the parking court.
- Service door connects to the same rear alley as Sunset Spool Video.
- Sound zone: kitchen clatter, soda fountain, distant radio with non-lyrical original music.

### L3 — Quarter Comet Arcade

- South side of the parking court, directly across from Sunset Spool Video.
- Entrance faces north.
- A tournament poster is fixed to the exterior wall beside the door.
- A side path runs west to Tin Rocket Toy Shop.
- Sound zone: layered fictional cabinet sounds, token drop, ventilation fan.

### L4 — Tin Rocket Toy Shop

- Southwest corner, west of Quarter Comet Arcade.
- Display window faces east toward the arcade side path.
- A demonstration table sits just inside the entrance.
- Rear stock door opens to the service alley, completing a walkable loop behind all four businesses.
- Sound zone: wind-up mechanisms, quiet ceiling fan, bell over door.

### Spatial assertions

- `Sunset Spool Video` is **across the parking court from** `Quarter Comet Arcade`.
- `Pepperwheel Pizza` is **east of and adjacent to** `Sunset Spool Video`.
- `Tin Rocket Toy Shop` is **west of** `Quarter Comet Arcade`.
- The rear service alley connects all four locations but begins inaccessible to the player.
- No interior door directly connects the video store and pizza shop.

## Era rules

### ER-01 — Communication and navigation

- No cell phones, internet, text messaging, GPS, QR codes, or app-based interfaces.
- The plaza payphone costs **$0.25** for a local call.
- Directions are given through landmarks, handwritten notes, printed maps, or in-person dialogue.

### ER-02 — Prices and transactions

Fixture prices:

- Two-night VHS rental: **$2.49**.
- Late fee: **$0.50 per day**.
- Arcade token: **$0.25**.
- Pizza slice: **$1.10**.
- Small fountain soda: **$0.60**.

Cash, coins, and a fictional paper rental card are permitted. No modern card terminal or contactless payment appears.

### ER-03 — Media, signage, and vocabulary

- CRT televisions, VHS cassettes, audio cassettes, incandescent bulbs, fluorescent fixtures, painted signs, hand-lettered specials, and simple segmented digital clocks are allowed.
- No real media title, logo, mascot, celebrity, song lyric, or recognizable commercial package may appear.
- NPCs avoid post-1986 slang and do not explain the era to the player as though they know they are in a nostalgia experience.
- Signs may be neon or backlit plastic; no modern high-resolution LED wall or touchscreen.

## Player avatar

### Alex

- Age thirteen.
- Gender presentation selectable at runtime without altering mission logic.
- Starts with a canvas backpack, bicycle key, rental card, and one overdue VHS.
- Alex’s internal thoughts are concise observational captions, not voiced biography.
- Runtime owns player movement, inventory instance, save state, accessibility settings, and completion history. Storyworld supplies authored definitions and initial/default state only.

## NPCs

### NPC-01 — Mira Chen

- Age nineteen.
- Role: evening clerk at Sunset Spool Video.
- Disposition at start: mildly annoyed but fair; `trust = 0`.
- Dialogue style: dry, efficient, quietly kind; never cruel.
- Approved lines:
  - “Rewind it, return it, and do not make me explain the late-fee chart again.”
  - “The staff-pick cabinet opens for people who finish what they start.”
- Constraints:
  - No modern slang.
  - Does not reveal the cabinet reward before Mission 2 is complete.
  - Never insults Alex’s intelligence or family.

### NPC-02 — D.J. Pierce

- Age seventeen.
- Role: arcade attendant and scorekeeper.
- Disposition at start: competitive; `trust = 0`.
- Dialogue style: brief challenges, playful confidence, no exposition dump.
- Approved lines:
  - “Three tokens. One life. No blaming the joystick.”
  - “Beat forty-two three and I will trust you with Side B.”
- Constraints:
  - “Forty-two three” refers to a score of 42,300.
  - Does not hand over the mixtape before the score condition is met.
  - Does not use real game terminology or brand slogans.

### NPC-03 — Sal Bell

- Age fifty-two.
- Role: owner and counter cook at Pepperwheel Pizza.
- Disposition at start: welcoming but busy.
- Dialogue style: practical one-liners; no accent caricature.
- Approved lines:
  - “Slice is a dollar ten. Advice is free and usually ignored.”
  - “That envelope goes to Mira before nine, not after.”
- Constraints:
  - No ethnic stereotype, exaggerated dialect, or real restaurant reference.
  - Gives a hint about the booth token only after Alex inspects the booth twice.

## Items and collectibles

### ITEM-01 — Overdue VHS: *Summer Signal from Planet Nine*

- Entirely fictional movie title and cover art.
- Initial owner: Sunset Spool Video.
- Initial holder: Alex.
- Initial state: `rented_overdue`, `rewound = true`, `case_condition = worn_intact`.
- Mission effect: returned to Mira in M1; state becomes `returned_processing` and later `shelved`.

### ITEM-02 — Brass “STAFF PICKS” key

- Initial holder: Mira’s lanyard.
- State path:
  1. `on_mira_lanyard`
  2. `on_video_counter` after M1
  3. `held_by_alex` during M3
  4. `in_cabinet_lock`
  5. `on_cabinet_hook` after M3
- The key cannot duplicate, teleport, or appear in two holders simultaneously.

### ITEM-03 — Three Quarter Quarter Comet tokens

- Identical fictional brass tokens with a comet-and-grid symbol.
- Initial locations:
  - payphone coin-return tray
  - Pepperwheel Pizza booth seat
  - Tin Rocket Toy Shop demonstration-table drawer
- Collected tokens become runtime inventory instances tied to the mission.
- All three are consumed by the fictional cabinet **Orbit Lancer** during M2.

### ITEM-04 — Mixtape: `SUNSET SIDE B`

- No track names or third-party music.
- Initial holder: D.J. Pierce.
- Moves to Alex after M2 and to Mira during M3.
- Label is handwritten in blue marker; shell is translucent amber.

### ITEM-05 — Arcade tournament poster

- Initial location: exterior wall of Quarter Comet Arcade.
- State path: `intact` → `torn_lower_corner` after M2 → optionally `repaired_with_clear_tape` after trigger T2.
- The repaired version must retain the visible tear line; repair does not restore it to pristine state.

### COLLECTIBLE-12 — Memory Card #12: “Closing Time Glow”

- Fictional collectible, not a hardware memory card.
- Awarded inside the staff-pick cabinet after M3.
- Contains a stylized illustration of the plaza signs turning off one by one.
- Collection metadata is Storyworld-authored; player ownership is runtime state.

## Mission chain

### M1 — Return Before Nine

- **Prerequisites:**
  - Alex possesses ITEM-01.
  - Sunset Spool Video is open.
  - Time is before 21:00.
- **Steps:**
  1. Enter Sunset Spool Video.
  2. Present rental card and VHS to Mira.
  3. Answer whether the cassette was rewound.
  4. Place the cassette in the return tray.
- **Outcomes / state effects:**
  - ITEM-01 holder changes Alex → Sunset Spool Video return tray.
  - Rental-account state `overdue` → `clear`.
  - Mira trust `0` → `1`.
  - ITEM-02 moves `on_mira_lanyard` → `on_video_counter`.
  - Unlocks M2.

### M2 — Three Tokens, One Life

- **Prerequisites:** M1 complete.
- **Steps:**
  1. Learn from D.J. that three tokens are required.
  2. Find the three token instances in any order.
  3. Insert all three into Orbit Lancer.
  4. Reach a score of at least **42,300** in one run.
- **Outcomes / state effects:**
  - Three token instances are consumed.
  - D.J. trust `0` → `1`.
  - ITEM-04 holder D.J. → Alex.
  - Evening wind event fires; ITEM-05 `intact` → `torn_lower_corner`.
  - Unlocks M3.
- **Failure behavior:** a failed cabinet run does not respawn consumed tokens; D.J. grants one retry credit only after a short dialogue. That credit is runtime state, not a new canon item.

### M3 — Staff Pick After Dark

- **Prerequisites:**
  - M2 complete.
  - Alex possesses ITEM-04.
  - World time is 20:45 or later.
- **Steps:**
  1. Re-enter Sunset Spool Video after the closing-light trigger begins.
  2. Deliver `SUNSET SIDE B` to Mira.
  3. Mira permits Alex to take ITEM-02 from the counter.
  4. Use the key on the staff-pick cabinet.
  5. Retrieve COLLECTIBLE-12.
  6. Return the key to the cabinet hook.
- **Outcomes / state effects:**
  - ITEM-04 holder Alex → Mira.
  - ITEM-02 follows its defined state path and ends `on_cabinet_hook`.
  - Cabinet `locked` → `unlocked_open`.
  - COLLECTIBLE-12 becomes available and, when collected, runtime-owned by the player.
  - Mira trust `1` → `2`.
  - Plaza ambience changes to closing-time state: one sign flickers off, arcade volume drops, streetlight comes on.
  - Mission chain complete.

## Triggers

### T1 — Closing sequence

- **Condition:** player enters Sunset Spool Video at or after 20:45 with M2 complete and M3 not started.
- **Effect:** lights over the back shelves switch off in sequence; Mira begins approved closing dialogue; M3 starts.
- **Idempotency:** fires once per runtime save state.

### T2 — Tape the Corner

- **Condition:** player inspects ITEM-05 after it becomes `torn_lower_corner` and possesses or receives clear tape from Sal.
- **Effect:** optional micro-interaction changes poster to `repaired_with_clear_tape`; D.J. delivers one gratitude line.
- **Mission dependency:** not required for M3.

## Initial and final authored state

### Initial state

- World time 19:50.
- All four businesses open.
- ITEM-01 held by Alex.
- ITEM-02 on Mira’s lanyard.
- ITEM-04 held by D.J.
- ITEM-05 intact.
- All NPC trust values 0.
- Cabinet locked.

### Expected state after chain completion

- World time at least 20:45.
- VHS returned and account clear.
- Tokens consumed.
- Mixtape held by Mira.
- Key on cabinet hook.
- Cabinet open.
- Memory Card #12 available or collected.
- Poster torn or repaired, depending on optional trigger.
- Mira trust 2, D.J. trust 1.

## Runtime export assertions

The exported content release must include stable IDs, localized display strings, spatial references, initial state, mission graph, prerequisites, authored effects, trigger conditions, item state transitions, dialogue constraints, sound-zone intent, rights metadata, and checksums. It must not include or claim authority over player save files, input mappings, collision, physics, platform achievements, rendering implementation, or live telemetry.

