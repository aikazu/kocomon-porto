# Portfolio Refactor: React + Vite + Dark Luxury Redesign

## TL;DR

> **Quick Summary**: Total refactor dari Next.js ke React + Vite dengan redesign tema Dark Luxury/Executive. Membangun portfolio premium dengan 3D interactive hero, bold animations (Framer Motion + GSAP), dan gold/amber color scheme. Single-page, desktop-first, deploy ke Vercel.
>
> **Deliverables**:
> - Fresh Vite + React 19 + TypeScript project
> - 7 sections: Hero, About, Stats, Skills, Experience, Certifications, Contact
> - 3D Interactive Hero dengan React Three Fiber
> - Dark Luxury design system dengan Gold/Amber accents
> - Responsive (desktop-first, 3D optimized untuk semua device)
> - Deployed ke Vercel/Netlify
>
> **Estimated Effort**: Large (15-20 tasks)
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Setup → Design System → Components → 3D Hero → Integration

---

## Context

### Original Request
"Rombak total refaktor ke react, vite, tailwind, shadcn, design ulang juga halaman nya menjadi professional, premium, estetik"

### Interview Summary
**Key Discussions**:
- Design Direction: Dark Luxury/Executive dengan Gold/Amber accents
- Animation Level: Bold & Impressive (Framer Motion + GSAP kombinasi)
- 3D Hero: React Three Fiber dengan geometric shapes (cubes, spheres, icosahedrons)
- Layout: Single page dengan 7 extended sections
- Responsive: Desktop-first dengan 3D untuk semua device
- Content: Keep existing data, ubah title ke "Cybersecurity Enthusiast | Part-time Fullstack Developer"
- Testing: Tests after development + Agent QA
- SEO: Tidak prioritas (direct sharing only)
- Deployment: Vercel/Netlify

**Research Findings**:
- Current codebase menggunakan Next.js 16, React 19, Tailwind 4 - bleeding edge
- Data personal hardcoded di dalam widget components
- 11 dashboard components dengan Cyber theme CSS classes
- shadcn/ui sudah terinstall dan configured

### Metis Review
**Identified Gaps** (addressed):
- SEO Impact: User confirmed direct sharing only, Vite SPA acceptable
- Mobile 3D Strategy: User wants 3D for all devices (dengan optimisasi)
- Library Consolidation: GSAP untuk 3D/Hero, Framer Motion untuk UI transitions
- Data Extraction: Will centralize ke `src/data/content.ts`
- Color Contrast: Will ensure WCAG AA compliance (4.5:1 ratio)

---

## Work Objectives

### Core Objective
Migrasi portfolio Next.js ke React + Vite dengan redesign total menjadi Dark Luxury theme yang premium, professional, dan impressive dengan 3D interactive hero.

### Concrete Deliverables
- `src/` - Complete React 19 + Vite application
- `src/components/` - 7 section components + UI components
- `src/components/ui/` - shadcn/ui components migrated
- `src/components/3d/` - React Three Fiber components
- `src/data/content.ts` - Centralized portfolio data
- `src/styles/` - Dark Luxury design system
- `public/` - Assets (images, fonts)
- `vite.config.ts` - Optimized Vite configuration
- Deployed site on Vercel/Netlify

### Definition of Done
- [ ] `bun run build` completes dengan zero errors
- [ ] All 7 sections render correctly di browser
- [ ] 3D Hero loads dan interactive di desktop dan mobile
- [ ] Gold/Amber color scheme consistent across all sections
- [ ] No horizontal overflow di 375px width
- [ ] FPS > 30 pada 3D scene (mobile tolerable)
- [ ] Deployed dan accessible via public URL

### Must Have
- React 19 + Vite + TypeScript setup
- Tailwind CSS 4 dengan custom Dark Luxury theme
- shadcn/ui components migrated
- Framer Motion untuk UI animations
- GSAP + ScrollTrigger untuk complex animations
- React Three Fiber untuk 3D hero
- 7 sections: Hero, About, Stats, Skills, Experience, Certifications, Contact
- Mobile responsive (3D included)
- Centralized data layer
- Vercel/Netlify deployment

### Must NOT Have (Guardrails)
- NO leftover Cyber/Matrix theme classes
- NO hardcoded personal data in components
- NO Next.js specific code (next/image, next/link, etc.)
- NO excessive glow/gradient that looks "tacky"
- NO blocking animations yang menghambat interaction
- NO unoptimized 3D assets yang membuat lag
- NO horizontal scroll di any viewport
- NO broken responsive layouts
- NO tests during development (tests-after approach)

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
> All verification is executed by the agent using Playwright, bash, or curl.

### Test Decision
- **Infrastructure exists**: NO (fresh Vite project)
- **Automated tests**: YES (Tests-after - simple Vitest tests)
- **Framework**: Vitest (Vite-native)
- **Agent-Executed QA**: ALWAYS (mandatory for all tasks)

### Test Setup (Task 15)
Tests will be added after all development complete:
- Component render tests
- Data layer tests
- Build verification tests

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Initialize Vite + React 19 project
└── Task 2: Create centralized data layer

Wave 2 (After Wave 1):
├── Task 3: Setup Dark Luxury design system
├── Task 4: Migrate shadcn/ui components
└── Task 5: Setup animation libraries (Framer + GSAP)

Wave 3 (After Wave 2):
├── Task 6: Build Hero Section (3D)
├── Task 7: Build About Section
├── Task 8: Build Stats Section
├── Task 9: Build Skills Section
├── Task 10: Build Experience Section
├── Task 11: Build Certifications Section
└── Task 12: Build Contact Section

Wave 4 (After Wave 3):
├── Task 13: Integrate all sections + Layout
├── Task 14: Mobile optimization
├── Task 15: Add simple tests
└── Task 16: Deploy to Vercel

Critical Path: Task 1 → Task 3 → Task 6 → Task 13 → Task 16
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2-16 | None |
| 2 | 1 | 6-13 | 3, 4, 5 |
| 3 | 1 | 6-13 | 2, 4, 5 |
| 4 | 1 | 6-13 | 2, 3, 5 |
| 5 | 1 | 6-13 | 2, 3, 4 |
| 6 | 2, 3, 5 | 13 | 7, 8, 9, 10, 11, 12 |
| 7 | 2, 3 | 13 | 6, 8, 9, 10, 11, 12 |
| 8 | 2, 3 | 13 | 6, 7, 9, 10, 11, 12 |
| 9 | 2, 3 | 13 | 6, 7, 8, 10, 11, 12 |
| 10 | 2, 3 | 13 | 6, 7, 8, 9, 11, 12 |
| 11 | 2, 3 | 13 | 6, 7, 8, 9, 10, 12 |
| 12 | 2, 3 | 13 | 6, 7, 8, 9, 10, 11 |
| 13 | 6-12 | 14, 15, 16 | None |
| 14 | 13 | 16 | 15 |
| 15 | 13 | 16 | 14 |
| 16 | 14, 15 | None | None |

---

## TODOs

### Wave 1: Foundation

- [x] 1. Initialize Vite + React 19 Project

  **What to do**:
  - Create fresh Vite project dengan React 19 + TypeScript template
  - Install core dependencies: tailwindcss@4, @tailwindcss/vite, postcss
  - Configure vite.config.ts dengan optimizations
  - Setup tsconfig.json dengan path aliases (@/)
  - Create basic folder structure: src/components, src/data, src/styles, src/lib
  - Add .gitignore, README.md

  **Must NOT do**:
  - Do not copy any Next.js specific files
  - Do not install testing libraries yet
  - Do not add any components yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward project initialization, well-documented steps
  - **Skills**: [`git-master`]
    - `git-master`: Clean initial commit after setup

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (solo - must complete first)
  - **Blocks**: Tasks 2-16
  - **Blocked By**: None

  **References**:
  - `package.json` - Current dependencies to reference (React 19, Tailwind 4)
  - `tsconfig.json` - Current TypeScript config for reference
  - Vite docs: https://vitejs.dev/guide/

  **Acceptance Criteria**:
  - [ ] `bun run dev` starts server on localhost:5173
  - [ ] `bun run build` completes with zero errors
  - [ ] Folder structure exists: src/components, src/data, src/styles, src/lib
  - [ ] Path alias @/ resolves correctly

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Dev server starts successfully
    Tool: Bash
    Preconditions: Project initialized
    Steps:
      1. Run: bun run dev &
      2. Wait 5 seconds for server startup
      3. curl http://localhost:5173 -o /dev/null -w "%{http_code}"
      4. Assert: HTTP status is 200
      5. Kill dev server
    Expected Result: Server responds with 200
    Evidence: HTTP response code captured

  Scenario: Production build succeeds
    Tool: Bash
    Preconditions: Project initialized
    Steps:
      1. Run: bun run build
      2. Assert: Exit code is 0
      3. Assert: dist/ folder exists
      4. Assert: dist/index.html exists
    Expected Result: Build completes without errors
    Evidence: Build output and file listing captured
  ```

  **Commit**: YES
  - Message: `feat(setup): initialize Vite + React 19 project with Tailwind 4`
  - Files: `package.json, vite.config.ts, tsconfig.json, src/, public/`

---

- [x] 2. Create Centralized Data Layer

  **What to do**:
  - Create `src/data/content.ts` dengan TypeScript interfaces
  - Extract profile data dari existing `profile-widget.tsx`
  - Extract skills data dari existing `skill-matrix.tsx`
  - Extract experience data dari existing `experience-log.tsx`
  - Extract certifications data dari existing files
  - Update title: "Cybersecurity Enthusiast | Part-time Fullstack Developer"
  - Add stats/metrics data structure
  - Add contact information

  **Must NOT do**:
  - Do not create UI components
  - Do not hardcode in Indonesian (keep English for data)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Data extraction and typing, straightforward task
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1b (with Tasks 3, 4, 5)
  - **Blocks**: Tasks 6-13
  - **Blocked By**: Task 1

  **References**:
  - `components/dashboard/profile-widget.tsx:18-28` - Contact and social links data
  - `components/dashboard/skill-matrix.tsx:7-43` - Skill categories and levels
  - `components/dashboard/experience-log.tsx:7-52` - Experience timeline data
  - `components/dashboard/summary-widget.tsx:11-33` - Professional summary text

  **Acceptance Criteria**:
  - [ ] `src/data/content.ts` exports typed data objects
  - [ ] Profile interface includes: name, title, tagline, avatar, contacts, socials
  - [ ] Skills interface includes: categories with name, icon, skills array
  - [ ] Experience interface includes: array of jobs with title, company, period, highlights
  - [ ] Title updated to "Cybersecurity Enthusiast | Part-time Fullstack Developer"
  - [ ] TypeScript compilation passes: `bun run build`

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Data file exports correctly
    Tool: Bash
    Preconditions: Data file created
    Steps:
      1. Run: grep -E "export (const|interface)" src/data/content.ts
      2. Assert: Output contains "profile" export
      3. Assert: Output contains "skills" export
      4. Assert: Output contains "experiences" export
    Expected Result: All main exports present
    Evidence: Grep output captured

  Scenario: New title is present
    Tool: Bash
    Preconditions: Data file created
    Steps:
      1. Run: grep "Cybersecurity Enthusiast" src/data/content.ts
      2. Assert: Match found
      3. Run: grep "Fullstack Developer" src/data/content.ts
      4. Assert: Match found
    Expected Result: Updated title present in data
    Evidence: Grep output captured
  ```

  **Commit**: YES
  - Message: `feat(data): centralize portfolio content with TypeScript interfaces`
  - Files: `src/data/content.ts`

---

### Wave 2: Design System & Libraries

- [ ] 3. Setup Dark Luxury Design System

  **What to do**:
  - Create `src/styles/globals.css` dengan Tailwind 4 @theme
  - Define Dark Luxury color palette:
    - Background: #0a0a0a (deep black), #121212 (eerie black), #1a1a1a (night)
    - Gold accents: #D4AF37 (gold leaf), #F5D061 (amber glow), #B8860B (dark gold)
    - Text: #FAFAFA (white), #A3A3A3 (muted), #737373 (subtle)
  - Setup typography scale dengan premium fonts (Inter, Playfair Display)
  - Create utility classes untuk luxury effects (subtle glows, gradients)
  - Define spacing and border-radius tokens
  - Create .luxury-card, .luxury-button base styles
  - Ensure WCAG AA contrast compliance (4.5:1 minimum)

  **Must NOT do**:
  - Do not use any .cyber-* class names
  - Do not use cyan/purple/pink neon colors
  - Do not create overly bright gradients

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Design system creation requires visual expertise
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Premium aesthetic guidance

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4, 5)
  - **Blocks**: Tasks 6-13
  - **Blocked By**: Task 1

  **References**:
  - `app/globals.css` - Current CSS structure untuk reference pattern
  - `app/globals.css:12-33` - Current :root variables pattern
  - Tailwind 4 docs: @theme syntax

  **Acceptance Criteria**:
  - [ ] `src/styles/globals.css` exists dengan @theme definitions
  - [ ] Color palette includes gold (#D4AF37), dark backgrounds (#0a0a0a)
  - [ ] No cyber/matrix color variables remain
  - [ ] .luxury-card class defined dengan subtle styling
  - [ ] Typography tokens defined (font-display, font-body)
  - [ ] Gold text on dark background passes contrast check (4.5:1)

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Dark Luxury colors defined
    Tool: Bash
    Preconditions: CSS file created
    Steps:
      1. Run: grep "#D4AF37\|#0a0a0a\|gold" src/styles/globals.css
      2. Assert: Gold color variable found
      3. Assert: Dark background color found
      4. Run: grep -i "cyber\|matrix\|cyan" src/styles/globals.css
      5. Assert: No matches (exit code 1)
    Expected Result: Luxury colors present, cyber colors absent
    Evidence: Grep output captured

  Scenario: Build compiles with new CSS
    Tool: Bash
    Preconditions: CSS file created
    Steps:
      1. Run: bun run build
      2. Assert: Exit code is 0
    Expected Result: Tailwind processes new theme correctly
    Evidence: Build output captured
  ```

  **Commit**: YES
  - Message: `feat(design): implement Dark Luxury design system with gold accents`
  - Files: `src/styles/globals.css`

---

- [ ] 4. Migrate shadcn/ui Components

  **What to do**:
  - Copy components/ui/ folder ke src/components/ui/
  - Update imports to remove "use client" directives
  - Update imports from @/lib/utils to local paths
  - Copy lib/utils.ts ke src/lib/utils.ts
  - Update color references ke Dark Luxury palette
  - Test that components render without errors

  **Must NOT do**:
  - Do not modify component logic significantly
  - Do not add new shadcn components yet
  - Do not break existing API contracts

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Migration task with clear file copying
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 5)
  - **Blocks**: Tasks 6-13
  - **Blocked By**: Task 1

  **References**:
  - `components/ui/` - All existing shadcn components
  - `lib/utils.ts` - cn() utility function
  - `components.json` - shadcn configuration

  **Acceptance Criteria**:
  - [ ] `src/components/ui/` contains all migrated components
  - [ ] `src/lib/utils.ts` exists dengan cn() function
  - [ ] No "use client" directives in migrated files
  - [ ] Import paths updated to @/ aliases
  - [ ] `bun run build` succeeds

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: UI components migrated
    Tool: Bash
    Preconditions: Migration complete
    Steps:
      1. Run: ls src/components/ui/
      2. Assert: button.tsx exists
      3. Assert: card.tsx exists
      4. Assert: input.tsx exists
      5. Run: grep "use client" src/components/ui/*.tsx | wc -l
      6. Assert: Count is 0
    Expected Result: Components migrated without Next.js directives
    Evidence: Directory listing and grep count

  Scenario: Utils function available
    Tool: Bash
    Preconditions: Migration complete
    Steps:
      1. Run: grep "export function cn" src/lib/utils.ts
      2. Assert: Match found
    Expected Result: cn utility exported
    Evidence: Grep output
  ```

  **Commit**: YES
  - Message: `feat(ui): migrate shadcn/ui components for Vite`
  - Files: `src/components/ui/, src/lib/utils.ts`

---

- [ ] 5. Setup Animation Libraries

  **What to do**:
  - Install framer-motion (latest)
  - Install gsap dengan ScrollTrigger plugin
  - Create `src/lib/animations.ts` dengan reusable animation variants
  - Create Framer Motion variants: fadeIn, slideUp, stagger, scaleIn
  - Create GSAP utility hooks: useScrollTrigger, useTimeline
  - Test basic animations render

  **Must NOT do**:
  - Do not create complex animations yet
  - Do not integrate with components yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Library setup and basic config
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3, 4)
  - **Blocks**: Task 6 (3D Hero needs GSAP)
  - **Blocked By**: Task 1

  **References**:
  - Framer Motion docs: https://www.framer.com/motion/
  - GSAP ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/

  **Acceptance Criteria**:
  - [ ] framer-motion installed in package.json
  - [ ] gsap installed in package.json
  - [ ] `src/lib/animations.ts` exports animation variants
  - [ ] fadeIn, slideUp, stagger variants defined
  - [ ] `bun run build` succeeds

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Animation libraries installed
    Tool: Bash
    Preconditions: Setup complete
    Steps:
      1. Run: grep "framer-motion" package.json
      2. Assert: Match found
      3. Run: grep "gsap" package.json
      4. Assert: Match found
    Expected Result: Both libraries in dependencies
    Evidence: Grep output

  Scenario: Animation utilities exported
    Tool: Bash
    Preconditions: Utilities created
    Steps:
      1. Run: grep "fadeIn\|slideUp\|stagger" src/lib/animations.ts
      2. Assert: Matches found for all three
    Expected Result: Reusable variants available
    Evidence: Grep output
  ```

  **Commit**: YES
  - Message: `feat(animation): setup Framer Motion and GSAP with reusable variants`
  - Files: `package.json, src/lib/animations.ts`

---

### Wave 3: Section Components

- [ ] 6. Build 3D Interactive Hero Section

  **What to do**:
  - Install @react-three/fiber, @react-three/drei, three
  - Create `src/components/3d/GeometricScene.tsx` dengan:
    - Floating geometric shapes (icosahedron, octahedron, torus)
    - Gold metallic material dengan environment reflections
    - Subtle rotation animations
    - Mouse/touch interactivity (shapes follow cursor)
  - Create `src/components/sections/Hero.tsx` dengan:
    - Full viewport height
    - Name dan title overlay dengan Framer Motion entrance
    - Tagline: "Cybersecurity Enthusiast | Part-time Fullstack Developer"
    - Scroll indicator di bottom
    - 3D scene sebagai background
  - Optimize untuk mobile: reduce geometry complexity, limit FPS

  **Must NOT do**:
  - Do not use heavy textures atau HDR environments
  - Do not create more than 5 geometric shapes
  - Do not block main thread dengan heavy computations

  **Recommended Agent Profile**:
  - **Category**: `artistry`
    - Reason: Creative 3D implementation requiring artistic judgment
  - **Skills**: [`frontend-ui-ux`, `frontend-design`]
    - `frontend-ui-ux`: Premium visual execution
    - `frontend-design`: Creative 3D composition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 7-12)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 2, 3, 5

  **References**:
  - `src/data/content.ts` - Profile name and title data
  - `src/styles/globals.css` - Gold color values
  - R3F docs: https://docs.pmnd.rs/react-three-fiber
  - Drei docs: https://github.com/pmndrs/drei

  **Acceptance Criteria**:
  - [ ] @react-three/fiber, @react-three/drei, three installed
  - [ ] `src/components/3d/GeometricScene.tsx` renders 3D shapes
  - [ ] `src/components/sections/Hero.tsx` displays full viewport
  - [ ] Name "Iqbal Attila" visible dan animated
  - [ ] Title "Cybersecurity Enthusiast | Part-time Fullstack Developer" visible
  - [ ] 3D shapes have gold metallic appearance
  - [ ] Shapes respond to mouse movement
  - [ ] FPS > 30 on mobile (Chrome DevTools Performance)

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Hero section renders with 3D
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:5173
    Steps:
      1. Navigate to: http://localhost:5173
      2. Wait for: canvas element visible (timeout: 10s)
      3. Wait for: text "Iqbal Attila" visible (timeout: 5s)
      4. Assert: h1 or .hero-name contains "Iqbal Attila"
      5. Assert: text contains "Cybersecurity Enthusiast"
      6. Screenshot: .sisyphus/evidence/task-6-hero-desktop.png
    Expected Result: Hero section with 3D canvas and text overlay
    Evidence: .sisyphus/evidence/task-6-hero-desktop.png

  Scenario: 3D responds to mouse
    Tool: Playwright (playwright skill)
    Preconditions: Hero loaded
    Steps:
      1. Navigate to: http://localhost:5173
      2. Wait for: canvas visible
      3. Move mouse to coordinates (400, 300)
      4. Wait 500ms
      5. Move mouse to coordinates (600, 400)
      6. Wait 500ms
      7. Screenshot: .sisyphus/evidence/task-6-hero-interactive.png
    Expected Result: No errors, scene remains stable
    Evidence: .sisyphus/evidence/task-6-hero-interactive.png

  Scenario: Mobile viewport renders
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport: 375x812 (iPhone X)
      2. Navigate to: http://localhost:5173
      3. Wait for: canvas visible (timeout: 15s)
      4. Assert: No horizontal overflow
      5. Screenshot: .sisyphus/evidence/task-6-hero-mobile.png
    Expected Result: Hero adapts to mobile, no overflow
    Evidence: .sisyphus/evidence/task-6-hero-mobile.png
  ```

  **Commit**: YES
  - Message: `feat(hero): implement 3D interactive hero with geometric shapes`
  - Files: `src/components/3d/, src/components/sections/Hero.tsx`

---

- [ ] 7. Build About Section

  **What to do**:
  - Create `src/components/sections/About.tsx`
  - Display professional summary dari data layer
  - Include profile photo dengan luxury frame treatment
  - Add Framer Motion scroll reveal animations
  - Gold accent highlights untuk key phrases
  - Two-column layout: photo left, text right (stack on mobile)

  **Must NOT do**:
  - Do not use terminal/code styling
  - Do not hardcode content

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Layout and visual treatment focus
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 8-12)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 2, 3

  **References**:
  - `src/data/content.ts` - Profile summary and photo
  - `components/dashboard/summary-widget.tsx` - Original summary content
  - `components/dashboard/profile-widget.tsx:47-58` - Photo treatment reference
  - `src/lib/animations.ts` - Framer Motion variants

  **Acceptance Criteria**:
  - [ ] `src/components/sections/About.tsx` exists
  - [ ] Professional summary text displays
  - [ ] Profile photo renders dengan frame
  - [ ] Scroll reveal animation triggers
  - [ ] Two-column pada desktop, stack pada mobile
  - [ ] Gold accent colors used for highlights

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: About section renders content
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #about section
      3. Wait for: section visible
      4. Assert: Text contains "10 years" or experience mention
      5. Assert: img element exists within section
      6. Screenshot: .sisyphus/evidence/task-7-about.png
    Expected Result: About section with summary and photo
    Evidence: .sisyphus/evidence/task-7-about.png

  Scenario: Mobile layout stacks
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport: 375x812
      2. Navigate to: http://localhost:5173
      3. Scroll to: #about section
      4. Assert: No horizontal overflow
      5. Screenshot: .sisyphus/evidence/task-7-about-mobile.png
    Expected Result: Content stacks vertically
    Evidence: .sisyphus/evidence/task-7-about-mobile.png
  ```

  **Commit**: YES (groups with Task 8)
  - Message: `feat(sections): add About and Stats sections`

---

- [ ] 8. Build Stats Section

  **What to do**:
  - Create `src/components/sections/Stats.tsx`
  - Display key metrics: Years Experience, Projects, Certifications, etc.
  - Animated number counters (count up on scroll)
  - Gold icons atau accent borders
  - Grid layout: 4 columns desktop, 2 columns mobile

  **Must NOT do**:
  - Do not animate too fast (jarring)
  - Do not use more than 4-6 stats

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Animation and layout focus
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6, 7, 9-12)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 2, 3

  **References**:
  - `src/data/content.ts` - Stats/metrics data
  - `components/dashboard/metrics-widget.tsx` - Original metrics reference

  **Acceptance Criteria**:
  - [ ] `src/components/sections/Stats.tsx` exists
  - [ ] 4 stat cards display dengan numbers
  - [ ] Numbers animate/count up on scroll reveal
  - [ ] Gold accents present
  - [ ] Grid responsive: 4 cols desktop, 2 cols mobile

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Stats section with counters
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #stats section
      3. Wait for: stat numbers visible
      4. Assert: At least 4 stat items present
      5. Screenshot: .sisyphus/evidence/task-8-stats.png
    Expected Result: Stats display with animated counters
    Evidence: .sisyphus/evidence/task-8-stats.png
  ```

  **Commit**: YES (grouped with Task 7)
  - Message: `feat(sections): add About and Stats sections`
  - Files: `src/components/sections/About.tsx, src/components/sections/Stats.tsx`

---

- [ ] 9. Build Skills Section

  **What to do**:
  - Create `src/components/sections/Skills.tsx`
  - Display skill categories dari data layer (Cybersecurity, Infrastructure, Dev)
  - Modern skill visualization: progress bars ATAU skill tags dengan levels
  - Category icons dengan gold styling
  - Staggered animation on scroll reveal
  - Grid/flex layout yang clean

  **Must NOT do**:
  - Do not use cyber/matrix styling
  - Do not overcrowd dengan too many skills per category

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Data visualization focus
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6-8, 10-12)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 2, 3

  **References**:
  - `src/data/content.ts` - Skills categories and levels
  - `components/dashboard/skill-matrix.tsx` - Original skill data structure
  - `src/lib/animations.ts` - Stagger animation variant

  **Acceptance Criteria**:
  - [ ] `src/components/sections/Skills.tsx` exists
  - [ ] 3 skill categories display (Cybersecurity, Infrastructure, Dev)
  - [ ] Skills have visual level indicators
  - [ ] Staggered animation on scroll
  - [ ] Gold accent colors used
  - [ ] No cyber/matrix styling

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Skills section displays categories
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #skills section
      3. Wait for: section visible
      4. Assert: Text "Cybersecurity" present
      5. Assert: Text "Infrastructure" present
      6. Assert: At least 5 skill items visible
      7. Screenshot: .sisyphus/evidence/task-9-skills.png
    Expected Result: All skill categories with items
    Evidence: .sisyphus/evidence/task-9-skills.png
  ```

  **Commit**: YES
  - Message: `feat(sections): add Skills section with category visualization`
  - Files: `src/components/sections/Skills.tsx`

---

- [ ] 10. Build Experience Section

  **What to do**:
  - Create `src/components/sections/Experience.tsx`
  - Timeline layout: vertical dengan alternating cards
  - Display job title, company, period, highlights dari data
  - Gold timeline line dan dots
  - Scroll-triggered reveal animations per card
  - Clean typography hierarchy

  **Must NOT do**:
  - Do not use terminal log styling
  - Do not use timestamps format [YYYY.MM]

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Timeline layout complexity
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6-9, 11-12)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 2, 3

  **References**:
  - `src/data/content.ts` - Experience array
  - `components/dashboard/experience-log.tsx` - Original experience data
  - `src/lib/animations.ts` - Scroll trigger utilities

  **Acceptance Criteria**:
  - [ ] `src/components/sections/Experience.tsx` exists
  - [ ] 4 experience entries display
  - [ ] Timeline visual dengan gold accents
  - [ ] Each entry shows: title, company, period, highlights
  - [ ] Cards animate on scroll
  - [ ] Mobile: single column timeline

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Experience timeline renders
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #experience section
      3. Wait for: section visible
      4. Assert: Text "Solution Architect" present
      5. Assert: Text "PT Global Infotech" present
      6. Assert: At least 4 timeline items
      7. Screenshot: .sisyphus/evidence/task-10-experience.png
    Expected Result: Timeline with all jobs
    Evidence: .sisyphus/evidence/task-10-experience.png

  Scenario: Experience cards have highlights
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #experience section
      3. Assert: List items (ul/li) present within cards
      4. Assert: Text contains "enterprise" or "clients"
    Expected Result: Job highlights visible
    Evidence: DOM inspection log
  ```

  **Commit**: YES
  - Message: `feat(sections): add Experience timeline section`
  - Files: `src/components/sections/Experience.tsx`

---

- [ ] 11. Build Certifications Section

  **What to do**:
  - Create `src/components/sections/Certifications.tsx`
  - Display certification badges/cards
  - Include: CompTIA Security+, ISO certifications, etc.
  - Hover effects dengan gold glow
  - Grid layout: 3 columns desktop, 1-2 mobile
  - Optional: link to Credly verification

  **Must NOT do**:
  - Do not use busy/crowded layouts
  - Do not add fake certifications

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card layout and hover effects
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6-10, 12)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 2, 3

  **References**:
  - `src/data/content.ts` - Certifications data
  - `components/dashboard/certifications-widget.tsx` - Original cert data
  - `components/dashboard/profile-widget.tsx:77` - CompTIA Security+ mention

  **Acceptance Criteria**:
  - [ ] `src/components/sections/Certifications.tsx` exists
  - [ ] CompTIA Security+ certification displays
  - [ ] Cards have hover glow effect
  - [ ] Grid responsive
  - [ ] Links to Credly if available

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Certifications display
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #certifications section
      3. Wait for: section visible
      4. Assert: Text "Security+" or "CompTIA" present
      5. Screenshot: .sisyphus/evidence/task-11-certs.png
    Expected Result: Certification cards visible
    Evidence: .sisyphus/evidence/task-11-certs.png

  Scenario: Hover effect works
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #certifications section
      3. Hover over first certification card
      4. Wait 300ms
      5. Screenshot: .sisyphus/evidence/task-11-certs-hover.png
    Expected Result: Card has visible hover state
    Evidence: .sisyphus/evidence/task-11-certs-hover.png
  ```

  **Commit**: YES (groups with Task 12)
  - Message: `feat(sections): add Certifications and Contact sections`

---

- [ ] 12. Build Contact Section

  **What to do**:
  - Create `src/components/sections/Contact.tsx`
  - Call-to-action dengan email link
  - Social links: LinkedIn, GitHub, Portfolio, Credly
  - Elegant button styling dengan gold accents
  - Optional: simple contact form (mailto: based)
  - Footer integration

  **Must NOT do**:
  - Do not create working form backend
  - Do not use aggressive CTAs

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: CTA and footer design
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 6-11)
  - **Blocks**: Task 13
  - **Blocked By**: Tasks 2, 3

  **References**:
  - `src/data/content.ts` - Contact info and social links
  - `components/dashboard/profile-widget.tsx:18-28` - Contact and social data

  **Acceptance Criteria**:
  - [ ] `src/components/sections/Contact.tsx` exists
  - [ ] Email link functional (mailto:)
  - [ ] Social links present: LinkedIn, GitHub, Credly
  - [ ] Gold accent button styling
  - [ ] Footer dengan copyright

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Contact section renders
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #contact section
      3. Wait for: section visible
      4. Assert: Email address or mailto link present
      5. Assert: Link to linkedin.com present
      6. Assert: Link to github.com present
      7. Screenshot: .sisyphus/evidence/task-12-contact.png
    Expected Result: Contact CTA with social links
    Evidence: .sisyphus/evidence/task-12-contact.png

  Scenario: Email link works
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Scroll to: #contact section
      3. Get href of email link
      4. Assert: href contains "mailto:"
    Expected Result: Email link properly formatted
    Evidence: Link href captured
  ```

  **Commit**: YES (grouped with Task 11)
  - Message: `feat(sections): add Certifications and Contact sections`
  - Files: `src/components/sections/Certifications.tsx, src/components/sections/Contact.tsx`

---

### Wave 4: Integration & Deployment

- [ ] 13. Integrate All Sections + Layout

  **What to do**:
  - Create `src/App.tsx` dengan all sections composed
  - Add smooth scrolling behavior
  - Create navigation header (sticky, transparent)
  - Add section anchors (Hero, About, Stats, Skills, Experience, Certifications, Contact)
  - Implement GSAP ScrollTrigger untuk section transitions
  - Ensure proper section spacing dan flow

  **Must NOT do**:
  - Do not change individual section logic
  - Do not add complex navigation menu

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Layout composition and scroll behavior
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (depends on all sections)
  - **Blocks**: Tasks 14, 15, 16
  - **Blocked By**: Tasks 6-12

  **References**:
  - `src/components/sections/*` - All section components
  - `src/lib/animations.ts` - ScrollTrigger utilities
  - `app/page.tsx` - Original page layout reference

  **Acceptance Criteria**:
  - [ ] `src/App.tsx` renders all 7 sections in order
  - [ ] Navigation header dengan section links
  - [ ] Smooth scroll when clicking nav links
  - [ ] Section anchors work (#about, #skills, etc.)
  - [ ] ScrollTrigger animations fire correctly
  - [ ] Consistent spacing between sections
  - [ ] `bun run build` succeeds

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: All sections render in order
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Assert: Hero section is first visible
      3. Scroll down through entire page
      4. Assert in order: Hero, About, Stats, Skills, Experience, Certifications, Contact
      5. Full page screenshot: .sisyphus/evidence/task-13-full-page.png
    Expected Result: All 7 sections in correct order
    Evidence: .sisyphus/evidence/task-13-full-page.png

  Scenario: Navigation links work
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:5173
      2. Click navigation link for "Skills" or #skills
      3. Wait for scroll animation (500ms)
      4. Assert: Skills section is in viewport
      5. Screenshot: .sisyphus/evidence/task-13-nav-click.png
    Expected Result: Smooth scroll to Skills section
    Evidence: .sisyphus/evidence/task-13-nav-click.png

  Scenario: All 7 sections exist in DOM
    Tool: Bash
    Preconditions: Build complete
    Steps:
      1. Run: grep -E "Hero|About|Stats|Skills|Experience|Certifications|Contact" src/App.tsx
      2. Assert: All 7 section names found
    Expected Result: All sections imported and used
    Evidence: Grep output
  ```

  **Commit**: YES
  - Message: `feat(app): integrate all sections with navigation and scroll behavior`
  - Files: `src/App.tsx, src/components/layout/`

---

- [ ] 14. Mobile Optimization

  **What to do**:
  - Test all sections di mobile viewports (375px, 414px)
  - Fix any horizontal overflow issues
  - Optimize 3D hero untuk mobile:
    - Reduce geometry complexity atau shape count
    - Lower shadow quality
    - Implement device detection untuk performance
  - Ensure touch interactions work
  - Test hamburger menu jika ada
  - Fix typography scaling

  **Must NOT do**:
  - Do not completely disable 3D on mobile
  - Do not break desktop layout

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Responsive debugging and optimization
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `playwright`: Viewport testing

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 15)
  - **Blocks**: Task 16
  - **Blocked By**: Task 13

  **References**:
  - All section components
  - `src/components/3d/GeometricScene.tsx` - 3D optimization target

  **Acceptance Criteria**:
  - [ ] No horizontal overflow di 375px width
  - [ ] 3D hero renders di mobile (may be simplified)
  - [ ] All text readable di mobile
  - [ ] Touch scroll works smoothly
  - [ ] Navigation usable di mobile
  - [ ] FPS > 25 pada 3D scene mobile

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: No horizontal overflow
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport: 375x812
      2. Navigate to: http://localhost:5173
      3. Scroll through entire page
      4. Execute JS: document.documentElement.scrollWidth > document.documentElement.clientWidth
      5. Assert: Result is false (no overflow)
      6. Screenshot: .sisyphus/evidence/task-14-mobile-full.png
    Expected Result: No horizontal scroll at any point
    Evidence: .sisyphus/evidence/task-14-mobile-full.png

  Scenario: 3D renders on mobile
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Set viewport: 375x812
      2. Navigate to: http://localhost:5173
      3. Wait for: canvas element visible (timeout: 20s)
      4. Assert: Canvas has non-zero dimensions
      5. Screenshot: .sisyphus/evidence/task-14-mobile-3d.png
    Expected Result: 3D canvas renders on mobile
    Evidence: .sisyphus/evidence/task-14-mobile-3d.png

  Scenario: Multiple mobile viewports
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Test viewport 375x667 (iPhone SE)
      2. Test viewport 390x844 (iPhone 14)
      3. Test viewport 412x915 (Pixel 7)
      4. Assert: No overflow on any
      5. Screenshots: .sisyphus/evidence/task-14-mobile-*.png
    Expected Result: Works across mobile sizes
    Evidence: Multiple screenshots
  ```

  **Commit**: YES
  - Message: `fix(responsive): optimize mobile layouts and 3D performance`
  - Files: Various component fixes

---

- [ ] 15. Add Simple Tests

  **What to do**:
  - Install vitest dan @testing-library/react
  - Create test config: vitest.config.ts
  - Write basic tests:
    - Data layer exports correctly
    - Key components render without errors
    - Build produces expected output
  - Run tests dan fix any issues

  **Must NOT do**:
  - Do not write exhaustive tests
  - Do not test styling/visual details
  - Do not test 3D rendering (hard to test)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple test setup
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 14)
  - **Blocks**: Task 16
  - **Blocked By**: Task 13

  **References**:
  - Vitest docs: https://vitest.dev/
  - `src/data/content.ts` - Data to test
  - `src/components/sections/` - Components to test

  **Acceptance Criteria**:
  - [ ] vitest installed
  - [ ] vitest.config.ts exists
  - [ ] `bun run test` passes all tests
  - [ ] At least 5 basic tests written
  - [ ] Data layer tests pass
  - [ ] Component render tests pass

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Tests pass
    Tool: Bash
    Preconditions: Tests written
    Steps:
      1. Run: bun run test
      2. Assert: Exit code is 0
      3. Assert: Output shows passing tests
    Expected Result: All tests green
    Evidence: Test output captured

  Scenario: Test coverage exists
    Tool: Bash
    Preconditions: Tests written
    Steps:
      1. Run: ls src/**/*.test.ts src/**/*.test.tsx 2>/dev/null | wc -l
      2. Assert: Count >= 3
    Expected Result: Multiple test files exist
    Evidence: File count
  ```

  **Commit**: YES
  - Message: `test: add basic component and data layer tests`
  - Files: `vitest.config.ts, src/**/*.test.ts`

---

- [ ] 16. Deploy to Vercel

  **What to do**:
  - Ensure `bun run build` produces clean dist/
  - Create vercel.json jika diperlukan
  - Connect repo ke Vercel
  - Deploy dan verify live site
  - Test production URL

  **Must NOT do**:
  - Do not expose secrets
  - Do not skip build verification

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Deployment is straightforward
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Final (sequential after 14, 15)
  - **Blocks**: None
  - **Blocked By**: Tasks 14, 15

  **References**:
  - Vercel docs: https://vercel.com/docs
  - `vite.config.ts` - Build configuration

  **Acceptance Criteria**:
  - [ ] `bun run build` succeeds dengan zero errors
  - [ ] dist/ folder contains index.html dan assets
  - [ ] Deployed ke Vercel dengan public URL
  - [ ] Live site loads correctly
  - [ ] 3D hero works on production
  - [ ] All sections visible

  **Agent-Executed QA Scenarios**:

  ```
  Scenario: Production build clean
    Tool: Bash
    Preconditions: All development complete
    Steps:
      1. Run: bun run build
      2. Assert: Exit code is 0
      3. Assert: dist/index.html exists
      4. Assert: dist/assets/ contains JS and CSS files
    Expected Result: Clean production build
    Evidence: Build output and file listing

  Scenario: Live site works
    Tool: Playwright (playwright skill)
    Preconditions: Deployed to Vercel
    Steps:
      1. Navigate to: [VERCEL_URL]
      2. Wait for: page load complete
      3. Assert: Title contains "Iqbal" or portfolio name
      4. Assert: Hero section visible
      5. Scroll through all sections
      6. Screenshot: .sisyphus/evidence/task-16-production.png
    Expected Result: Production site fully functional
    Evidence: .sisyphus/evidence/task-16-production.png
  ```

  **Commit**: YES
  - Message: `chore(deploy): configure and deploy to Vercel`
  - Files: `vercel.json (if needed)`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `feat(setup): initialize Vite + React 19 project` | package.json, vite.config.ts, tsconfig.json | bun run build |
| 2 | `feat(data): centralize portfolio content` | src/data/content.ts | bun run build |
| 3 | `feat(design): implement Dark Luxury design system` | src/styles/globals.css | bun run build |
| 4 | `feat(ui): migrate shadcn/ui components` | src/components/ui/, src/lib/utils.ts | bun run build |
| 5 | `feat(animation): setup Framer Motion and GSAP` | src/lib/animations.ts | bun run build |
| 6 | `feat(hero): implement 3D interactive hero` | src/components/3d/, src/components/sections/Hero.tsx | bun run dev visual check |
| 7-8 | `feat(sections): add About and Stats sections` | src/components/sections/About.tsx, Stats.tsx | bun run dev |
| 9 | `feat(sections): add Skills section` | src/components/sections/Skills.tsx | bun run dev |
| 10 | `feat(sections): add Experience timeline` | src/components/sections/Experience.tsx | bun run dev |
| 11-12 | `feat(sections): add Certifications and Contact` | src/components/sections/Certifications.tsx, Contact.tsx | bun run dev |
| 13 | `feat(app): integrate all sections` | src/App.tsx, src/components/layout/ | bun run build |
| 14 | `fix(responsive): optimize mobile layouts` | Various fixes | bun run dev mobile |
| 15 | `test: add basic tests` | vitest.config.ts, *.test.ts | bun run test |
| 16 | `chore(deploy): configure Vercel` | vercel.json | Deploy verification |

---

## Success Criteria

### Verification Commands
```bash
# Build succeeds
bun run build  # Expected: Exit 0, no errors

# Tests pass
bun run test   # Expected: All tests pass

# Dev server runs
bun run dev    # Expected: Server on localhost:5173
```

### Final Checklist
- [ ] React + Vite project running successfully
- [ ] All 7 sections render correctly (Hero, About, Stats, Skills, Experience, Certifications, Contact)
- [ ] 3D Interactive Hero dengan geometric shapes dan gold metallic material
- [ ] Dark Luxury theme dengan gold/amber accents throughout
- [ ] Bold animations (Framer Motion + GSAP) working
- [ ] Data centralized di src/data/content.ts
- [ ] Title updated: "Cybersecurity Enthusiast | Part-time Fullstack Developer"
- [ ] Mobile responsive dengan 3D optimized
- [ ] No cyber/matrix theme remnants
- [ ] No horizontal overflow
- [ ] WCAG AA color contrast
- [ ] Deployed dan live di Vercel
- [ ] Production site loads < 5 seconds
