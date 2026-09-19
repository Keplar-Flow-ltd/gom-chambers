# GAIA Asset Library

Brand system and applied client-facing artifacts for **Project GAIA** (Gom Chambers × Keplar Flow Limited), built as a facelift of the client-facing library from the design-team brief. Locked direction: **GAIA Forest + Gold** on warm neutrals, blueprint-navy accents.

> The core GAIA Notion workspace (databases / views / portals) is **out of scope** — this library matches it, it does not redesign it.

## Start here

Open the showcase: **`V1 GAIA Asset Library.html`** — logo, palette, type, icons, covers, charts, title cards and the applied artifacts in one page.

## What's in the kit

```
V1 GAIA Asset Library.html        the kit showcase (browsing index)
DESIGN.md                         design-system handoff (tokens, components, rules)
assets/
  gaia-tokens.css                 the canonical token + component stylesheet
  logo/                           mark, monogram, wordmark, lockups (light + reverse)
  icons/gaia-icons.svg            full icon sprite
  icons/gaia-*.svg                individual icons (24×24, 1.7px line)
  covers/gaia-cover-*.svg         5 cover themes, 3000×1200, print-ready
  charts/gaia-chart-*.svg         3 data plates from the frozen QA baseline
  cards/gaia-card-01..09.svg      9 video title cards, 1920×1080
  film/                           1080p product films (gaia-product-film.mp4, gaia-product-film-15s.mp4)
wiki/                             13 branded onboarding-wiki pages (cover + print CSS)
demo-day/                         agenda · demo one-pager · pre-session checklist
storyboard/                       9-scene product-video storyboard
source/                           the provided source assets (provenance)
tools/                            the generators (build_assets.py · build_pages.py · build_film.py)
```

## Using the assets

- **Drop-in stylesheet** — link `assets/gaia-tokens.css` for the token + component layer, or copy the inline `<style>` from any page to keep a document single-file.
- **Logos** — `gaia-mark.svg` (app mark), `gaia-lockup-horizontal.svg` / `-reverse.svg` (documents), `gaia-monogram.svg` (small surfaces). Clearspace = stroke height of the G.
- **Icons** — reference the sprite (`<use href="…gaia-icons.svg#g-estates">`) or inline the individual SVGs; they inherit `currentColor`.
- **Covers** — pick a theme, edit the title/subtitle/reference text inside the SVG; export at 3000×1200.
- **Rebuild everything** — `python tools/build_assets.py && python tools/build_pages.py`.

## Non-negotiables (kept)

- Numbers stay exactly as written — frozen dummy baseline (`₦745,000` active arrears, `₦1,045,000` portfolio, `₦5,055,000/₦5,800,000` collections, 6/10 occupancy).
- No client PII, no live data, nothing from the client workspace.
- Plain-English voice preserved; design wraps the words.
- Offline / single-file / zero-dependency; print-friendly (A4).

— Keplar Flow Limited · 2026-09-19
