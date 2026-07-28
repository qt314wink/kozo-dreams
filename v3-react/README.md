# Kozo Dreams v3

A complete design system fusing Japanese washi papercraft with dark fantasy aesthetics.

## What's New in v3

- **30+ Components** across 5 architectural layers (L0 Foundation → L4 Flows)
- **Studio Mode / Pattern Atelier** — Interactive paper crafting with kirigami cutting, origami folding, tessellation, ink wash, light/shadow, and crystal prism refraction
- **8 Japanese Pattern Types** — Seigaiha, Asanoha, Kikkou, Sayagata, Shippo, Great Wave, Sakura, Kumo
- **6 Tessellation Types** — Diamond, Hexagonal, Triangle Net, Star Fold, Cube, Kusudama
- **7 Interaction Flow Stages** — Threshold, Discover, Compose, Refine, Validate, Govern, Remember
- **Motion Governance** — Parameter sliders bounded by spec limits, reduced-motion toggle, semantic animation jobs
- **Provenance Ledger** — Append-only trace with JSON export
- **Full Accessibility** — Skip link, 44px targets, focus-visible, semantic dialog, prefers-reduced-motion, aria-live
- **5 Sacred Dyes** — Ai-Iro, Kakishibu, Sakura, Kyo-Murasaki, Sumi

## Stack

React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + GSAP

## Quick Start

```bash
npm install
npm run build
npm run preview
npx serve dist
```

## Architecture

| Layer | Components |
|-------|-----------|
| L0 Foundation | PaperSurface, TypeRole, MotionBoundary, FocusRing, Grid |
| L1 Primitives | PaperButton, DyeChip, Glyph, RangeControl, TokenBadge |
| L2 Patterns | KirigamiCard, DragonflyFloat, SeigaihaBackground, HalftoneOverlay, CalligraphyStrokeReveal, PatternSwatch |
| L3 Composites | ScreenFrame, FlowStage, MotionLab, ComponentGallery, StudioCanvas, FilterChip |
| L4 Flows | ConversionCTA, NewsletterCapture, ProgressTrack, ExportFlow |

## Studio Mode

The Pattern Atelier provides an interactive canvas for composing Japanese patterns:
- **Pattern Selection**: 8 traditional Japanese motifs
- **Sacred Dye Palette**: 5 dye colors with live preview
- **Tessellation**: 6 fold types for geometric overlays
- **Material Controls**: Depth, light angle, ink opacity, paper texture
- **Crystal Prism**: Toggle light refraction with animated hue shifts
- **Kirigami Cutting**: Freehand SVG path drawing on the canvas
- **SVG Export**: Download composed patterns as SVG files

## Design Tokens

All tokens are CSS custom properties in `:root`:
- `--kozo-ai-iro`, `--kozo-kakishibu`, `--kozo-sakura`, `--kozo-murasaki`, `--kozo-sumi`
- `--t-instant`, `--t-fast`, `--t-medium`, `--t-slow`
- `--ease-paper`, `--ease-ink`, `--ease-origami`
- `--motion-distance`, `--motion-duration`, `--motion-intensity`

## License

MIT
