# Portfolio reflow verification

## Reference and intentional differences

Compared `design/02-work.png` with `design/qa/current-work.png` using image inspection. The implementation retains the off-white/deep-green palette, asymmetric image columns, fine metadata and open spacing. Actual supplied project imagery replaces generated concept imagery. Chinese typography and small author signatures reflect user steering; the site foregrounds philosophy and projects. Detail pages follow `design/04-case-study.png` with independent figures and native editorial text.

## Verified

- Seven active project cards and routes; supplemental projects removed from the active list.
- 279 project asset references validated for files, dimensions and bilingual captions; no duplicated chapter IDs.
- All seven detail routes: no full-page PDF image elements, no broken visible hero images and no horizontal document overflow at desktop width 926 and mobile width 390.
- Phone screens and diagrams reflow at mobile width; diagrams use 342px content width.
- Image dialog opens with focus on Close; zoom provides scrollable detail; close returns to page. Arrow navigation and Escape checked during the reflow pass.
- Bambu workshop and demo videos played with readyState 4, advancing currentTime, no media error. Durations 35.833s and 82.004s.
- Production build and asset validation pass.
- Existing work filter and language switch checked during initial implementation; summaries and added content have both locales.

## Limits

The in-app viewport override produced a scaled screenshot canvas despite correct DOM viewport dimensions. Mobile layout was checked with rendered DOM measurements and visible content; saved final screenshot uses the reliable native desktop viewport. Low-resolution original images are retained faithfully, without invented detail. Supplemental cases and the corrupt VA source remain outside the prioritised scope.
