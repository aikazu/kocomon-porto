- Created centralized data layer in src/data/content.ts with strict typing.
- Used string identifiers for icons to keep data layer clean.
- **Animation Setup**: Framer Motion and GSAP work well together for Dark Luxury feel. Framer Motion for UI, GSAP for scroll-driven/heavy interactions.
- **TypeScript Import Type**: When 'verbatimModuleSyntax' is enabled, type-only imports must be explicit: `import type { Variants } from "framer-motion"`.

- **Tailwind 4 Setup**: Used CSS-first configuration via `@theme` block in `globals.css` instead of `tailwind.config.js`.
- **Import Order**: Standard CSS `@import` (for fonts) must come before `@import "tailwindcss"` in the entry CSS file to avoid warnings.
- **Design Tokens**: Defined luxury palette (`--color-luxury-*`) directly in CSS variables within the `@theme` block for seamless Tailwind utility generation.
- **Utility Abstraction**: Used `@apply` in `@layer components` for complex reusable styles like `.luxury-card` and `.luxury-button` to maintain clean markup.
## Shadcn/UI Migration
- Migrated 13 components from legacy to src.
- Configured Tailwind v4 theme to map shadcn/ui variables to luxury theme.
- Installed missing dependencies: class-variance-authority, clsx, radix-ui, tailwind-merge, @base-ui/react, @tabler/icons-react.

## 3D Hero Section
- **R3F Setup**: Used `@react-three/fiber` and `@react-three/drei` for abstract geometry.
- **Performance**: Optimized Canvas with `dpr={[1, 2]}` and simpler geometries (Icosahedron, Octahedron, Torus) for mobile performance.
- **Layering**: Successful integration of Framer Motion text overlay on top of R3F Canvas using absolute positioning (`absolute inset-0 z-0` for canvas, `relative z-10` for content).

## Stats Section Implementation
- Implemented animated number counters using `framer-motion`'s `useSpring` and `useTransform`.
- Used `luxury-gold` and `luxury-black` theme colors for consistent design.
- Mapped string icon names from `portfolioData` to `lucide-react` components dynamically.
- Adhered to strict grid requirements (4 cols desktop, 2 cols mobile) for the stats cards.

## About Section Implementation
- Created `About.tsx` with a responsive two-column layout.
- Used `framer-motion` for staggered animations (`stagger`, `slideUp`, `scaleIn`, `fadeIn`).
- Implemented "Luxury Frame" using absolute positioning with `translate` for offset border and `blur` for glow.
- Used `order-1` and `order-2` utility classes to handle responsive stacking (Photo first on mobile, Text first on desktop).
- Extracted content from `portfolioData.profile.summary`.
- Used `bg-luxury-gold/5` and `text-luxury-gold` for consistent theming.

## Task 9: Skills Section
- **Tailwind v4 Variables**: The codebase uses Tailwind v4 `@theme` block for custom colors (`luxury-gold`, `luxury-black`).
- **Data Location**: Portfolio data resides in `src/data/content.ts`, not `src/data/portfolioData.ts`.
- **Motion Patterns**: Consistent use of `framer-motion` with `useInView` for scroll-triggered animations.

## Experience Section Implementation
- Implemented vertical timeline with alternating layout using `flex-row` (even) and `flex-row-reverse` (odd) logic + spacer div for center alignment.
- Utilized Tailwind v4 `@theme` variables (`bg-luxury-gold`, `text-luxury-gold`) for consistent gold styling.
- Used `Framer Motion` `viewport={{ once: true }}` for scroll reveal animations.
- Ensured responsiveness with mobile-first approach (stacked on mobile, alternating on desktop).

## Certifications Section
- Created `Certifications` component consistent with `Skills` section styling.
- Used `luxury-card` utility class for base card styling.
- Implemented `framer-motion` for enter animations and hover effects (scale + shadow).
- Integrated Lucide icons mapped from `portfolioData`.
- Added responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop).

## Contact Section Implementation
- Implemented Contact section with `src/components/sections/Contact.tsx`.
- Utilized `luxury-gold` and `luxury-black` theme consistent with previous sections.
- Created "Luxury Button" using `.luxury-button` utility class from `globals.css` for CTA.
- Integrated `lucide-react` icons for social links (`Linkedin`, `Github`, `Twitter`).
- Used `framer-motion` for staggered animations (`stagger`, `slideUp`) from `@/lib/animations`.
- Added Footer with copyright and simple links ("Privacy Policy", "Terms of Service").
- Verified build passed successfully.

## Task 13: Integrate All Sections + Layout
- **Navigation Component**:
  - Implemented sticky header with transparent-to-blur effect using `framer-motion` and `useState`.
  - Added responsive mobile hamburger menu with overlay.
  - Used semantic `<button type="button">` elements for accessibility and lint compliance.
- **App Composition**:
  - Structured `App.tsx` with all 7 sections wrapped in a luxury-themed container.
  - Fixed default export vs named export issues in imports.
- **Global Styles**:
  - Cleaned up duplicate layer definitions in `src/styles/globals.css`.
  - Added `html { scroll-behavior: smooth; }` to `@layer base` for native smooth scrolling.
- **Linting**:
  - Addressed lint errors regarding `<a>` tags (replaced with `<button>`) and missing `type` attributes.
- Updated Navigation.tsx with luxury theme colors (Gold/Amber).
- Replaced blue/purple gradients with luxury-gold/luxury-amber.
- Replaced gray text with luxury-muted and white text with luxury-white.
### Testing with Vitest and JSDOM
- When testing React components that use Three.js or Framer Motion, it's often necessary to mock certain browser APIs that are not available in JSDOM, such as `matchMedia` and `IntersectionObserver`.
- `@react-three/fiber` and `@react-three/drei` components should be mocked if they cause issues in the test environment.
- Using `vi.mock` with a simple replacement component or `null` is often enough for basic render tests.

## Mobile Optimization
- Optimized 3D GeometricScene for mobile:
  - Reduced `dpr` to `[1, 1.5]` on screens < 768px.
  - Adjusted positions, scales, and removed some shapes on mobile to improve performance and fit.
- Adjusted Typography:
  - `Hero.tsx`: `text-4xl sm:text-6xl md:text-8xl` for responsive title.
  - `Stats.tsx`: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` to prevent overflow on very small screens (375px).
- Verified with Playwright:
  - No horizontal overflow on 375px viewport.
  - Navigation menu works correctly.
