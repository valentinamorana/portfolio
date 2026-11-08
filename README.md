# Valentina Morana · Portfolio

Personal portfolio built with vanilla HTML, CSS and JavaScript. No frameworks and no build step: hand-written code deployed on Vercel.

**Live:** [valentinamorana.com](https://www.valentinamorana.com)

---

## Features

- **Bento layout** with light and dark themes, following the system preference and remembered per visitor
- **Bilingual EN / ES**: detects the browser language, remembers the choice, and supports `?lang=es` links (also used for SEO via `hreflang`)
- **Now building**: live card that reads the latest pushed repo and commit from the GitHub API (cached for 10 minutes)
- **Sparkle cursor** with a short fading trail, on devices with a mouse
- **Scroll reveal**, scroll spy and parallax background shapes
- **Heart rain** easter egg when clicking the photo
- **Copy email** button and language-aware CV download
- Respects `prefers-reduced-motion`

## Stack

| Layer | Choice |
|---|---|
| Markup | HTML5, English content lives in `index.html` |
| Styles | CSS custom properties for both themes |
| Logic | Vanilla JS, no dependencies |
| Fonts | Inter and Plus Jakarta Sans, self-hosted in `fonts/` |
| Deploy | Vercel, headers and caching in `vercel.json` |

## Structure

```
portfolio/
├── index.html      page markup and English copy
├── 404.html        not found page
├── style.css       layout, themes and animations
├── theme-init.js   sets theme and language before first paint
├── main.js         Spanish copy, theme/language toggles, GitHub card, interactions
├── cursor.js       sparkle cursor
├── vercel.json     security headers and cache rules
├── data/now.json   "Now learning" text, EN and ES
├── fonts/          self-hosted woff2 files
├── images/         photo, Open Graph image and icons
└── CV/             English resume and Spanish CV
```

## Editing content

- English text: edit it directly in `index.html`.
- Spanish text: edit the `es` object at the top of `main.js`, using the same key as the `data-i18n` attribute.
- The repo shown in "Now building" is the most recently pushed public repo. To hide a repo, add its name to `GH_SKIP` in `main.js`.
- "Now learning": edit `data/now.json` (English and Spanish) and push; no code changes needed.

## Run locally

```bash
npx serve .
```

Then open `http://localhost:3000`.
