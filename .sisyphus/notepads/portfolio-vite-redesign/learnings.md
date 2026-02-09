- Created centralized data layer in src/data/content.ts with strict typing.
- Used string identifiers for icons to keep data layer clean.
- **Animation Setup**: Framer Motion and GSAP work well together for Dark Luxury feel. Framer Motion for UI, GSAP for scroll-driven/heavy interactions.
- **TypeScript Import Type**: When 'verbatimModuleSyntax' is enabled, type-only imports must be explicit: `import type { Variants } from "framer-motion"`.

- **Tailwind 4 Setup**: Used CSS-first configuration via `@theme` block in `globals.css` instead of `tailwind.config.js`.
- **Import Order**: Standard CSS `@import` (for fonts) must come before `@import "tailwindcss"` in the entry CSS file to avoid warnings.
- **Design Tokens**: Defined luxury palette (`--color-luxury-*`) directly in CSS variables within the `@theme` block for seamless Tailwind utility generation.
- **Utility Abstraction**: Used `@apply` in `@layer components` for complex reusable styles like `.luxury-card` and `.luxury-button` to maintain clean markup.
