# Valentina Morana — Portfolio

Personal portfolio site built with vanilla HTML, CSS and JavaScript. No frameworks, no build step — just clean, hand-written code deployed via Vercel.

**Live:** [valentinamorana.vercel.app](https://valentinamorana.vercel.app)

---

## Features

- **Bilingual** — full EN / ES toggle, all content translated including CV download
- **Dark / light theme** — persisted via `localStorage`
- **Custom cursor** — heart-shaped with particle trail
- **Scroll spy** — active nav link tracks current section
- **Scroll reveal** — staggered entrance animations per section
- **Parallax** — photo responds to mouse position in hero
- **Heart rain** — easter egg triggered by clicking the photo
- **CV download** — serves the correct language PDF based on active locale

## Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 — custom properties, keyframe animations, scroll-driven reveals |
| Logic | Vanilla JS (ES2020) — no dependencies |
| Fonts | Inter via Google Fonts |
| Deploy | Vercel |

## Structure

```
portfolio/
├── index.html   # markup
├── style.css    # all styles and animations
├── main.js      # interactivity and i18n
├── images/
│   ├── photo.jpg     # hero photo
│   ├── og-image.jpg  # social preview
│   └── favicon.svg   # VM site icon
└── CV/
    ├── Resume - Valentina Morana.pdf
    └── CV - Valentina Morana.pdf
```

## Run locally

No install needed — just serve the folder:

```bash
npx serve .
```

Then open `http://localhost:3000`.
