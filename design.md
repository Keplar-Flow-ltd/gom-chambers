# GAIA — Design System (Client-Facing Library)

**Version:** v2 (branded facelift) · **Date:** 2026-09-19 · **Owner:** Keplar Flow Limited
**Direction (locked):** GAIA Forest `#0F3D2E` + Gold `#D4A24C` on warm neutrals `#FBFAF7`, blueprint-navy `#0F2A43` accents. Follow it — do not re-litigate.

> This file is the handoff spec for the library. It is descriptive, not executable: every page carries its own inline copy of these tokens so it stays self-contained and offline-safe.

---

## 1. Concept

A **legal-practice editorial** language: hairline rules, a monospace reference column, a gold seal, and forest ink. The recurring device is the **spine** — a vertical forest/gold rule with a node — used in covers, heroes, and section markers so every artifact reads as one practice. Warm and plain-spoken; **never cute, never cluttered**.

## 2. Colour tokens

| Token | Hex | Role |
|---|---|---|
| `--forest` | `#0F3D2E` | Primary brand — headers, rules, primary actions |
| `--forest-2` | `#145038` | Hover / secondary forest |
| `--forest-9` | `#0A2A1F` | Depth, gradients, dark surfaces |
| `--gold` | `#D4A24C` | The single accent — seals, rules, highlights |
| `--gold-7` | `#9A742E` | Accessible gold **text** on light backgrounds |
| `--navy` | `#0F2A43` | Blueprint-navy secondary accent (legal/technical) |
| `--paper` | `#FBFAF7` | Warm neutral page background |
| `--ink` | `#1F1C16` | Body text |
| `--muted` | `#5C5648` | Secondary text |
| `--line` | `#E2DCCD` | Hairline borders |

**Semantic** (bg / text): `ok` `#EDF3EC`/`#3E7A57` · `warn` `#FAEBDD`/`#C25E0B` · `bad` `#FDEBEC`/`#C33F3A` · `info` `#E7F3F8`/`#2A6E96`.
Max **four** semantic colours + one accent. Dominant forest, sharp gold — never an even-spread palette.

## 3. Typography

| Token | Stack | Use |
|---|---|---|
| `--font-sans` | `Inter, 'Segoe UI', system-ui, …` | Default: headings, body, UI |
| `--font-mono` | `'JetBrains Mono', ui-monospace, …` | IDs, references, figures (`TEN-003`, `₦745,000`) |
| `--font-legal` | `'Spectral', Georgia, serif` | **Reserved for legal-document artifacts only** |

> Inter is locked by the GAIA brand direction (audit note in every page `<style>`). Not a default-by-laziness choice.

Scale: display 40/800 · heading 24/700 · h2 21/700 · body 16/400 · small 13/400 · mono 0.86em.
Line-height 1.62 body. Never ultra-thin body weights.

## 4. Space, radius, elevation

- Spacing scale `--sp-1..8` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.
- Radius `--r-sm 8` · `--r-md 12` · `--r-lg 16` · `--r-xl 22` · `--r-pill 999`.
- Shadows: `--sh-1` hairline card · `--sh-2` lifted hover · `--sh-3` modal/hero. Gold never carries a glow.

## 5. Components

- **Header (`header.site`)** — brand mark + title + sub, closed by a 2px gold rule.
- **Hero band** — 1200×300 inline SVG from the cover system; carries kicker + title + G watermark + seal.
- **Callout** — four semantic tints; gold tint (`c-gold`) for welcome tone.
- **Card** — white, hairline border, `--sh-1`, `--r-md`.
- **Steps** — mono-numbered forest discs, dotted separators.
- **Link card** — icon + bold label; hover lifts by 2px and turns the border gold.
- **Pill** — 12px, semantic tint, optional 13px icon.
- **Footer** — hairline top rule, mono meta on the right.

## 6. Icon set

24×24, 1.7px stroke, `currentColor`, rounded caps/joins, no fills. Ship as a `<symbol>` sprite (`assets/icons/gaia-icons.svg`) plus individual files.
Database glyphs: `estates` `units` `tenants` `tenancies` `payments` `tasks`.
Roles: `role-principal` `role-pa` `role-legal` `role-field`.
UI: `calendar` `timeline` `chart` `notice` `shield` `seal` `ai` `link` `drive` `clock` `search` `print` `download` `arrow` `check` `key` `document`.
**No emoji** as interface icons anywhere in the library.

## 7. Cover system

Five reproducible themes at **3000×1200** (print-ready): `navy-blueprint` · `emerald-executive` · `charcoal-gold` · `forest-gold` · `ivory-minimal`. Each: gradient ground, per-theme decor, gold spine-rule, 300px `GAIA` wordmark, title + subtitle, gold seal, mono reference. The wiki takes a 1200×300 **hero band** from the same system, one theme per page.

## 8. Data plates & title cards

- **Charts** — drawn from the frozen QA baseline: arrears by estate (Alpha 120k / Beta 450k / Gamma 475k), collections (₦5,055,000 of ₦5,800,000 = 87%), occupancy (6 of 10 = 60%).
- **Title cards** — 1920×1080, one per video scene (9), forest gradient + gold motif.

## 9. Print

Every artifact includes `@media print`: A4, drop shadows off, hairlines kept, breadcrumb + non-essential meta hidden, cards/steps kept off page breaks. Documents remain **single-file and offline-usable**.

## 10. Non-negotiables honored

- Numbers stay exactly as written (frozen dummy baseline; verified arithmetic).
- No client PII, no live data, nothing from the client workspace.
- Plain-English voice is the point — design around the words.
- Free-tier + Pro-compatible, zero dependencies, offline/single-file.
