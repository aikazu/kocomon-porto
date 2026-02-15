# Project Context & Agent Guidelines

This document provides context, conventions, and guidelines for AI agents and developers working on the **Kocomon Portfolio** project.

## 1. Project Overview
- **Type**: Interactive 3D Portfolio Website
- **Stack**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Core Libs**: Framer Motion, Three.js (R3F), Radix UI, GSAP
- **Package Manager**: Bun (preferred) or npm

## 2. Build & Test Commands
Run these commands from the project root:

- **Development Server**: `bun dev` (or `npm run dev`)
- **Build Production**: `bun run build` (or `npm run build`)
- **Lint Code**: `bun run lint` (or `npm run lint`)
- **Run All Tests**: `bun test` (or `npm run test`)
- **Run Single Test**: `bun test src/__tests__/App.test.tsx` (Replace path as needed)
- **Preview Build**: `bun run preview`

## 3. Directory Structure
```
src/
├── components/
│   ├── 3d/           # R3F scenes and 3D objects (GeometricScene, etc.)
│   ├── layout/       # Global layout (Navigation, Footer)
│   ├── sections/     # Page sections (Hero, About, Skills) - Business logic here
│   └── ui/           # Reusable primitives (Button, Card) - Shadcn-like style
├── data/             # Static content (content.ts)
├── lib/              # Utilities (utils.ts, animations.ts)
├── pages/            # Full page routes (Privacy, Terms)
├── styles/           # Global CSS & Tailwind config
└── App.tsx           # Main entry point & Routing logic
```

## 4. Code Style & Conventions

### Imports
- Use **Absolute Imports** with `@/` alias where possible.
  - ✅ `import { cn } from "@/lib/utils"`
  - ❌ `import { cn } from "../../lib/utils"`
- Group imports: Built-ins -> External Libs -> Internal Components -> Styles/Types.

### Component Structure
- **Definition**: Use `export default function ComponentName() {}` for main components.
- **UI Primitives**: Use `const Component = ...; export { Component }` for UI library code (like `button.tsx`).
- **Naming**: PascalCase for files and components (`Hero.tsx`, `GeometricScene.tsx`).
- **Props**: Use `interface` or `type` for props. Use `React.ComponentProps<"div">` for extending HTML elements.

### TypeScript
- **Strict Mode**: Enabled. No `any` unless absolutely necessary (and commented).
- **Types**: Prefer `interface` for object shapes, `type` for unions/intersections.
- **Event Handlers**: Explicitly type events (e.g., `React.FormEvent<HTMLFormElement>`).

### Styling (Tailwind CSS v4)
- **Utility First**: Use Tailwind utility classes directly in `className`.
- **Merging**: ALWAYS use `cn(...)` (from `@/lib/utils`) when allowing `className` overrides or conditional classes.
  ```tsx
  // Example
  <div className={cn("flex items-center", className)}>...</div>
  ```
- **Variants**: Use `class-variance-authority` (cva) for complex component variants (see `src/components/ui/button.tsx`).
- **Colors**: Use semantic names (`bg-luxury-black`, `text-luxury-white`, `text-yellow-400`) defined in config.

### Animation (Framer Motion)
- Use `motion.div` / `motion.section` for animated elements.
- **Accessibility**: Always respect `reducedMotion` preferences (see `Hero.tsx` for pattern).
  ```tsx
  const shouldReduceMotion = Boolean(useReducedMotion());
  // ...
  style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}
  ```
- **Variants**: Define animation variants outside the render cycle or memoize them to prevent re-renders.

### 3D (React Three Fiber)
- Keep 3D components in `src/components/3d`.
- Use `useFrame` for loop logic.
- Performance: Be mindful of heavy geometries/shaders. Use standard materials where possible.

## 5. Testing Guidelines
- **Framework**: Vitest + React Testing Library.
- **Location**: Co-locate tests or place in `src/__tests__/`.
- **Naming**: `Component.test.tsx` or `Component.spec.tsx`.
- **Focus**: Test user interactions and accessibility (Role-based queries) rather than implementation details.

## 6. Error Handling
- Use Error Boundaries for 3D scenes (Canvas crashes shouldn't break the UI).
- Handle `undefined` checks for browser APIs (window, document) since Vite builds can run in SS/SSR-like contexts during generation.

## 7. AI Agent Behavior Rules
- **No Hallucinations**: Do not invent imports or libraries not in `package.json`.
- **Consistency**: Match existing code style (check `Hero.tsx` for complex logic, `Button.tsx` for UI patterns).
- **Refactoring**: If refactoring, ensure no functionality is lost. Run tests after changes.
- **Comments**: Add TSDoc comments for complex utility functions.
