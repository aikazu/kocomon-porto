# Kocomon Portfolio

Interactive portfolio site for **Iqbal Attila**, focused on cybersecurity, solution architecture, and part-time fullstack development. The project combines a cinematic 3D hero, motion-heavy section reveals, and a calmer editorial layout through the rest of the page.

## Overview

- Stack: `React 19`, `TypeScript`, `Vite`, `Tailwind CSS v4`
- Motion: `Framer Motion`, `GSAP`, `Lenis`
- 3D: `Three.js`, `@react-three/fiber`, `@react-three/postprocessing`
- Testing: `Vitest`, `React Testing Library`
- Package manager: `bun` preferred, `npm` supported

## Current Design Direction

- Hero-first visual hierarchy: the 3D scene and kinetic name treatment carry the spectacle.
- Editorial section rhythm: shared section headers, restrained metadata styling, and quieter content surfaces after the hero.
- Targeted interaction cues: the custom cursor only expands on explicitly marked highlight targets.
- Dark technical palette: void black base with orange as the primary action color, cyan as a secondary accent, and magenta used sparingly.

## Key Features

- Lazy-loaded 3D hero scene with reduced-motion support.
- Scroll-triggered reveals and parallax accents across content sections.
- Centralized content model in [`src/data/content.ts`](./src/data/content.ts).
- Legal pages for `/privacy` and `/terms`.
- Contact form that composes a prefilled email via `mailto:`.
- Desktop-only custom cursor with centered hover state and explicit highlight targeting.

## Project Structure

```text
src/
├── components/
│   ├── 3d/                 # R3F scene and post-processing
│   ├── layout/             # Navigation shell
│   ├── sections/           # Hero, About, Skills, Experience, Certifications, Contact
│   ├── ui/                 # Reusable primitives
│   └── CustomCursor.tsx    # Desktop cursor overlay
├── data/                   # Static portfolio content
├── lib/                    # Utilities and animation helpers
├── pages/                  # Privacy and terms pages
├── styles/                 # Global styles and section-system helpers
├── __tests__/              # App-level tests
├── App.tsx                 # App shell and route switching
└── main.tsx                # Entry point
```

## Getting Started

### Prerequisites

- `Node.js 18+`
- `bun` recommended, or `npm`

### Install

```bash
bun install
# or
npm install
```

### Run locally

```bash
bun dev
# or
npm run dev
```

The dev server runs on `http://localhost:5173` by default.

## Scripts

```bash
bun run dev
bun run build
bun run lint
bun run test --run
bun run preview
```

`npm` equivalents work for all of the above.

## Validation

Recommended pre-commit validation:

```bash
bun run lint
bun run test --run
bun run build
```

## Implementation Notes

### Routing

- The project uses lightweight pathname-based rendering in [`src/App.tsx`](./src/App.tsx) for the homepage and legal pages.

### Motion

- GSAP handles scroll-linked and imperative section motion.
- Framer Motion handles component-level entry and hover transitions.
- Reduced motion is respected across the UI and the 3D hero.

### 3D Hero

- The hero scene is lazy-loaded to keep initial page execution lighter.
- Post-processing is reduced on mobile and when reduced motion is enabled.

### Cursor

- The cursor is only enhanced for fine pointers.
- Hover expansion is opt-in via `data-cursor="highlight"`.

## Documentation Map

- [`README.md`](./README.md): project overview, setup, and operational guidance.
- [`AGENTS.md`](./AGENTS.md): codebase conventions and agent/developer instructions.

## License

MIT
