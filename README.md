# Iqbal Attila (Kocomon) - Portfolio

![Portfolio Badge](https://img.shields.io/badge/Status-Active-success?style=for-the-badge) ![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)

> **"Securing the Future, One Line of Code at a Time."**

A premium, high-performance portfolio website showcasing expertise in **Cybersecurity** and **Fullstack Development**. Featuring luxury brutalist design, advanced animations, and immersive 3D experiences. Built with cutting-edge web technologies for maximum visual impact and smooth interactions.

---

## 🚀 Tech Stack

This project leverages the latest industry-standard tools for optimal performance and developer experience.

### **Core Framework**
- ![React](https://img.shields.io/badge/React_19-20232a?style=for-the-badge&logo=react&logoColor=61DAFB) **React 19** - The library for web and native user interfaces.
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript** - Strongly typed JavaScript for scalable development.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) **Vite** - Next Generation Frontend Tooling.

### **Styling & UI Components**
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS v4** - Utility-first CSS framework for rapid UI development.
- ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white) **Radix UI** - Unstyled, accessible components for building high-quality design systems.
- ![Lucide](https://img.shields.io/badge/Lucide_Icons-F05032?style=for-the-badge&logo=lucide&logoColor=white) **Lucide React** - Beautiful & consistent icons.

### **3D Visualization & Animation**
- ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white) **Three.js** - JavaScript 3D library.
- ![R3F](https://img.shields.io/badge/R3F-000000?style=for-the-badge&logo=react&logoColor=white) **React Three Fiber** - React renderer for Three.js.
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) **Framer Motion** - Production-ready motion library for React.
- ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white) **GSAP** - Professional-grade animation library with ScrollTrigger.
- ![Lenis](https://img.shields.io/badge/Lenis-FF6B6B?style=for-the-badge) **Lenis** - Buttery smooth scroll library.
- ![SplitType](https://img.shields.io/badge/SplitType-FF4785?style=for-the-badge) **SplitType** - Text splitting for kinetic typography effects.

### **Performance & Analytics**
- ![Vercel](https://img.shields.io/badge/Vercel_Speed_Insights-000000?style=for-the-badge&logo=vercel&logoColor=white) **Speed Insights** - Real-time performance monitoring.

---

## ✨ Key Features

### **Design & Aesthetics**
- **🎨 Luxury Brutalist Theme**: Premium dark aesthetic with electric orange, cyan, and magenta accents on deep void black.
- **✨ Kinetic Typography**: Character-by-character text reveal animations using SplitType and GSAP.
- **🖱️ Custom Cursor**: Magnetic cursor with trail effects for desktop users.
- **🌊 Smooth Scrolling**: Buttery-smooth scroll experience powered by Lenis.

### **Animation & Interactions**
- **🌐 Immersive 3D Hero Section**: Interactive network nodes visualization with mouse parallax and bloom effects.
- **🎭 Scroll-Triggered Animations**: Elements animate into view as you scroll using GSAP ScrollTrigger.
- **🧲 Magnetic Buttons**: Buttons that follow the cursor with physics-based motion.
- **⬆️ Parallax Effects**: Depth and movement on scroll for enhanced visual appeal.
- **🎴 3D Card Interactions**: Hover effects with subtle 3D transforms and glows.

### **Performance & Accessibility**
- **⚡ High Performance**: Code splitting, optimized assets, and reduced motion support.
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop.
- **♿ Accessibility**: Reduced motion preferences, keyboard navigation, and semantic HTML.
- **🔍 SEO Optimized**: Complete meta tags, Open Graph, and semantic structure.

### **Technical Excellence**
- **📦 Modern Stack**: React 19, TypeScript, Tailwind CSS v4, Vite.
- **🎬 Advanced Animations**: GSAP + Framer Motion for complex animation sequences.
- **🎨 Design System**: Cohesive color palette, typography, and spacing throughout.
- **⚖️ Legal Compliance**: Privacy Policy and Terms of Service pages.

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── 3d/                 # Three.js scenes and components
│   ├── layout/             # Navigation, Footer
│   ├── sections/           # Homepage sections with premium animations
│   │   ├── Hero.tsx        # Kinetic typography + 3D background
│   │   ├── About.tsx       # Parallax + reveal animations
│   │   ├── Skills.tsx      # Interactive 3D cards with progress bars
│   │   ├── Experience.tsx  # Timeline with line-draw animations
│   │   ├── Certifications.tsx # Hover effects + training section
│   │   └── Contact.tsx     # Magnetic buttons + contact form
│   ├── ui/                 # Reusable UI components
│   └── CustomCursor.tsx    # Magnetic cursor with trail effect
├── data/                   # Static content data
├── lib/                    # Utility functions
│   ├── animations.ts       # Custom hooks: useMagneticEffect, useParallax, etc.
│   └── utils.ts            # Helper functions
├── pages/                  # Route pages
├── styles/                 # Global styles with Tailwind v4
├── App.tsx                 # Main application with Lenis smooth scroll
└── main.tsx                # Entry point
```

---

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (Recommended) or npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aikazu/kocomon-porto.git
   cd kocomon-porto
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

---

## 📦 Build for Production

To create an optimized production build:

```bash
bun run build
# or
npm run build
```

The output will be in the `dist/` directory, ready for deployment.

---

## 🧪 Running Tests

This project uses **Vitest** for unit testing.

```bash
bun test
# or
npm run test
```

---

## 📄 License

This project is open source and available under the **MIT License**.

---

<div align="center">
  <p>Designed & Developed with ❤️ by <strong>Iqbal Attila</strong></p>
  <p>
    <a href="https://github.com/aikazu">GitHub</a> •
    <a href="https://linkedin.com/in/iqbalattila">LinkedIn</a>
  </p>
</div>
