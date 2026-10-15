# Jarvis Luk / 陆俊荣 portfolio

A bilingual React + Vite portfolio. The active site presents the seven projects in the supplied portfolio: SoundBricks, PawPals, SF Eats, Bambu Lab, FlexBench, Matrix and Just A 2nd. Personal identity remains a small signature; philosophy and project work lead the experience.

## Run

```sh
npm install
npm run dev
npm run check:assets
npm run build
```

`npm run build` prerenders every route — Chinese at `/` and `/project/<id>/`, English at `/en/` and `/en/project/<id>/` — to static HTML via `src/entry-server.jsx` and `scripts/prerender.mjs`, so pages are indexable without JavaScript. Set `SITE_URL=https://your-domain` when building to add canonical / hreflang URLs and `sitemap.xml`.

Case pages use native bilingual text from the language packs, independently extracted imagery, bounded figures, chapter navigation and a keyboard-accessible image viewer. Bambu Lab includes two H.264 MP4 demonstrations with native playback controls. No whole PDF pages are used as case-page slides.

## Content

- `src/locales/zh.json`, `src/locales/en.json`: the language packs. Every piece of site copy lives here, keyed by where it appears (`ui.*` interface text, `categories.*`, `projects.<id>.*` summaries, `studies.<id>.<section>.*` case pages, `lab.*` side projects, `drafts.*` inactive drafts). Edit copy here; both files must have the same keys.
- `src/i18n.js`: `t(key)` returns `{zh, en}` from the packs and throws on a missing key, so the build fails instead of shipping a gap. `{name}` placeholders are filled with `format()`.
- `scripts/export-copy.mjs`: dumps the packs in page order (`node scripts/export-copy.mjs > copy.json`) for the review sheet in `design/copy/`.
- `src/data.js`: active project order and summaries (text via `t()`).
- `src/caseStudies.js`: the seven reflowed case studies.
- `src/libraryStudies.js`: additional research and media for existing cases; supplemental case drafts are not registered.
- `src/libraryProjects.js`: inactive project drafts, retained for later work.
- `public/assets/elements`: published independent media.
- `source-assets`: original object archive, extraction manifests and retained page previews.
- `content-library/polyu-final`: supplemental originals, page text, extracted image objects and previews. Keep this library intact.

Run `scripts/extract_elements.py` with Python / PyMuPDF / Pillow to rebuild the portfolio extraction, then `scripts/import_library.py` for selected higher-quality supplemental assets and updated dimensions. The original extraction uses the supplied local PDF path. Video originals remain in the content library; served versions are compressed H.264/AAC with fast-start metadata.

The interactive demo pages in `public/embeds/` are standalone HTML and keep their own bilingual text in `data-zh` attributes; they are not part of the language packs.

Source artwork retains its original language. Website copy is reflowed and translated. Repeated decorative fragments and references are preserved in the extraction library; the website groups meaningful project figures for reading. Complex PDF transparency is rasterised when SVG export alters the appearance. Valid vector figures remain SVG.

## Scope and known source limitations

The user requested prioritising the original seven projects. Mirs Bay, VA Catering and Guangzhou e-bike parking are therefore retained as drafts and omitted from navigation and routes.

The supplied `VA final.pdf` has corrupt middle data: pages 10–19 lack their referenced page objects. Both the desktop and library copies have the same SHA-256. PyMuPDF, Poppler and forced xref reconstruction could not recover them. The original file remains unchanged; replacement export or original design assets are required when this deferred case is resumed.
