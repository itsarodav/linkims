# Linkims

Plataforma de enlaces para artistas de [Lemonims](https://lemonims.com) — sello discográfico, booking y management. Producto en producción con usuarios reales.

[Arodav](https://link.lemonims.com/arodav/) · [Marces](https://link.lemonims.com/marces/) · [Blanca Ferrer](https://link.lemonims.com/blanca-ferrer/)

---

## Contexto

Lemonims necesitaba un hub centralizado donde cada artista tuviera un perfil con enlaces a sus plataformas (Spotify, YouTube, Instagram, etc.). Soluciones como Linktree no funcionaban: sin control de marca, sin identidad visual por artista, con branding de terceros en un producto que representa a un sello.

La restricción principal no era técnica sino de producto: **cada perfil debe sentirse como una extensión de la marca del artista, no como una plantilla genérica con colores intercambiados.**

---

## Decisiones Técnicas

| Decisión | Por qué |
|---|---|
| **Sin framework — TypeScript vanilla** | El producto no tiene estado, reactividad ni composición a escala. Son páginas estáticas con render desde JSON. Introducir un framework habría añadido ~40 kB de runtime para lo que `document.createElement` resuelve en **227 líneas**. Resultado: **0 dependencias de producción**. |
| **Tokens de diseño (SCSS)** | Spacing (base 4px), tipografía, radius, motion y blur definidos como custom properties en `:root`. Los tokens cambian en breakpoints — los componentes que los consumen se adaptan sin CSS adicional. El token es el contrato entre diseño y componentes. |
| **Temas por artista via CSS custom properties** | Cada artista (`.theme--marces`, `.theme--arodav`, `.theme--blanca-ferrer`) sobrescribe custom properties: paleta, gradiente, tipografía, glass effects. Blanca Ferrer fue la prueba de estrés: requirió serif propia (Prociono), pesos distintos y padding de CTA diferente — todo resuelto con 6 custom properties sin tocar CSS de componentes. |
| **Grid layout JSON-driven** | CSS Grid 6×5. Cada card define su posición (`row`, `col`, `rowSpan`, `colSpan`) en el JSON del perfil. TypeScript inyecta esas coordenadas como custom properties. **El layout de cada perfil es datos, no código.** Agregar un artista = un JSON + un HTML. |
| **Build multi-página (Vite)** | 4 entry points en `rollupOptions`. Cada artista tiene su propio `index.html` con `<title>`, meta tags y favicon propios. URLs limpias (`/arodav/`), SEO nativo, sin SPA routing. |

### Patrones destacables

- **Double `requestAnimationFrame`** para animaciones de entrada - garantiza que el browser pinte el estado inicial (`opacity: 0`) antes de activar transiciones.
- **Favicon animado** con Page Visibility API - alterna colores cada 2s cuando el tab está oculto, cleanup al volver.
- **Iconos via CSS `mask`** + `currentColor` - los iconos heredan el color del tema automáticamente, sin inline SVG.
- **`prefers-reduced-motion`** respetado - todas las animaciones se desactivan.
- **Progressive enhancement** - HTML semántico funcional sin JavaScript (skip link, `<nav>`, ARIA labels, `lang="es"`).

---

## Estructura

```
linkims/
├─ index.html                    → landing Lemonims
├─ arodav/index.html             → perfil (entry point Vite)
├─ marces/index.html
├─ blanca-ferrer/index.html
├─ src/
│  ├─ main.ts                    → render JSON → DOM (227 líneas)
│  ├─ profiles/
│  │  └─ {artista}/{artista}.json → datos + layout del perfil
│  └─ styles/
│     ├─ tokens/_tokens.scss     → design tokens
│     ├─ tokens/_themes.scss     → temas por artista
│     ├─ components/             → profile, links, footer
│     └─ pages/_index.scss       → landing
├─ public/icons/                 → SVGs de plataformas
└─ vite.config.ts                → build multi-página
```

**4 devDependencies. 0 producción.**

---

## Desarrollo local

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc + vite build
```

---

Desarrollado por [Arodav](https://arodav.com) para [Lemonims](https://link.lemonims.com).
