# Linkims

Link-in-bio platform for [Lemonims](https://lemonims.com) artists. Record label, booking, and management. Live product with real users.

[Home](https://link.lemonims.com/) · [Marces](https://link.lemonims.com/marces/) · [Blanca Ferrer](https://link.lemonims.com/blanca-ferrer/)

---

## Context

Lemonims needed a centralized hub where each artist had a profile with links to their platforms (Spotify, YouTube, Instagram, etc.). Solutions like Linktree fell short — no brand control, no per-artist visual identity, and third-party branding on a product that represents a label.

The main constraint was not technical but product-driven: **Each profile must feel like an extension of the artist's brand, not a generic template with swapped colors.**

---

## Technical Decisions

| Decision | Why |
|---|---|
| **No framework — vanilla TypeScript** | The product has no state, reactivity, or composition at scale. These are static pages rendered from JSON. Introducing a framework would have added ~40 kB of runtime for what `document.createElement` handles in **227 lines**. Result: **0 production dependencies**. |
| **Design tokens (SCSS)** | Spacing (base 4px), typography, radius, motion, and blur defined as custom properties on `:root`. Tokens change at breakpoints — components that consume them adapt with no additional CSS. The token is the contract between design and components. |
| **Per-artist themes via CSS custom properties** | Each artist (`.theme--marces`, `.theme--arodav`, `.theme--blanca-ferrer`) overrides custom properties: palette, gradient, typography, glass effects. Blanca Ferrer was the stress test: she required a custom serif (Prociono), different font weights, and distinct CTA padding — all solved with 6 custom properties without touching component CSS. |
| **JSON-driven grid layout** | CSS Grid 6×5. Each card defines its position (`row`, `col`, `rowSpan`, `colSpan`) in the profile JSON. TypeScript injects those coordinates as custom properties. **Each profile's layout is data, not code.** Adding an artist = one JSON + one HTML file. |
| **Multi-page build (Vite)** | 4 entry points in `rollupOptions`. Each artist has their own `index.html` with a dedicated `<title>`, meta tags, and favicon. Clean URLs (`/arodav/`), native SEO, no SPA routing. |

### Notable Patterns

- **Double `requestAnimationFrame`** for entry animations — ensures the browser paints the initial state (`opacity: 0`) before triggering transitions.
- **Animated favicon** with the Page Visibility API — alternates colors every 2s when the tab is hidden, cleans up on return.
- **Icons via CSS `mask`** + `currentColor` — icons inherit the theme color automatically, no inline SVG needed.
- **`prefers-reduced-motion`** respected — all animations are disabled.
- **Progressive enhancement** — semantic HTML works without JavaScript (skip link, `<nav>`, ARIA labels, `lang="es"`).

---

## Results

**Final bundle** (minified, hashed):

| | Size |
|---|---|
| JavaScript | 6.2 KB |
| CSS | 12 KB |
| **Total core** | **18.2 KB** |

**Source code:** 226 lines of TypeScript (all logic) · 778 lines of SCSS (entire visual system) · 0 production dependencies.

**Design system:** 42 design tokens on `:root` · 3 themes with ~20 custom properties each · 4 breakpoints — automatic responsiveness via tokens.

**Accessibility:** Semantic HTML with landmarks (`header`, `main`, `nav`, `footer`) · 14 ARIA attributes · skip links on every page · `prefers-reduced-motion` respected.

---

## Structure

```
linkims/
├─ index.html                    → Lemonims landing page
├─ arodav/index.html             → profile (Vite entry point)
├─ marces/index.html
├─ blanca-ferrer/index.html
├─ src/
│  ├─ main.ts                    → render JSON → DOM (227 lines)
│  ├─ profiles/
│  │  └─ {artist}/{artist}.json  → profile data + layout
│  └─ styles/
│     ├─ tokens/_tokens.scss     → design tokens
│     ├─ tokens/_themes.scss     → per-artist themes
│     ├─ components/             → profile, links, footer
│     └─ pages/_index.scss       → landing page
├─ public/icons/                 → platform SVGs
└─ vite.config.ts                → multi-page build
```

**4 devDependencies. 0 production.**

---

## Local Development

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc + vite build
```

---

Built by [arodav](https://arodav.com) for [lemonims](https://link.lemonims.com).
