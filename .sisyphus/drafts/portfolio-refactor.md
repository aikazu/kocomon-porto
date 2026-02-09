# Draft: Portfolio Refactor - React + Vite + Redesign

## Project Background
- **Current Stack**: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui
- **Owner**: Iqbal Attila (Cybersecurity Solution Architect)
- **Domain**: me.kcmon.id
- **Current Theme**: Cybersecurity/Matrix with glassmorphism effects

## Current Components (from codebase analysis)
- ProfileWidget - Avatar, name, contact info, social links
- SummaryWidget - Professional summary text
- SkillMatrix - Skill bars with categories (Cybersecurity, Infrastructure, Dev)
- ExperienceLog - Timeline of work experience
- CertificationsWidget - Certification badges
- MetricsWidget - Statistics/metrics display
- ScanButton - Interactive security scan animation
- CopyTerminal - Terminal with copy functionality
- MatrixBackground - Animated matrix rain effect
- DashboardCard - Reusable card wrapper

## User Request
- Migrate from Next.js to React + Vite
- Keep Tailwind CSS + shadcn/ui
- Redesign to be: professional, premium, aesthetic

## Requirements (CONFIRMED)

### Design Direction: Dark Luxury/Executive
- Gelap, elegan, premium feel seperti brand luxury
- Gold/silver accents
- Professional & sophisticated

### Page Structure: Single Page
- Semua konten di satu halaman dengan smooth scrolling
- Tidak perlu React Router

### Animation Level: Bold & Impressive
- 3D elements, complex transitions, wow-factor
- Showcase technical capability

### Content Scope
- Konten yang ada dipakai dulu
- PERUBAHAN KONTEKS: Cybersecurity Enthusiast + Part-time Fullstack Developer
- Bukan lagi "Cybersecurity Solution Architect"

## Detailed Decisions (CONFIRMED)

### Color Palette: Gold/Amber Accent
- Dark background (#0a0a0a, #1a1a1a range)
- Gold/amber for primary accents (#D4AF37, #F5D061)
- Warm highlights yang mewah dan eye-catching

### Animation Stack: Maximum Impact
- Framer Motion: UI animations, page transitions, scroll reveals
- GSAP: Complex sequences, 3D animations, parallax effects
- Kombinasi keduanya untuk wow-factor maksimal

### Sections: Extended Layout
1. Hero (3D Interactive) - Wow-factor opening
2. About/Summary - Personal introduction  
3. Stats/Metrics - Quick numbers highlight
4. Skills Matrix - Technical competencies
5. Experience Timeline - Work history
6. Certifications - Credentials showcase
7. Contact/CTA - Call to action

### Hero Style: 3D Interactive
- 3D elements dan interaktif
- High wow-factor
- Memorable first impression

## Final Technical Decisions

### 3D Implementation
- Library: React Three Fiber (R3F)
- Element: Geometric Shapes (cubes, spheres, icosahedrons)
- With elegant lighting effects

### Responsive: Desktop-first
- Optimal untuk desktop showcase
- Graceful degradation untuk mobile
- 3D elements may simplify/disable on mobile

### Deployment: Vercel/Netlify
- Static site deployment
- Auto-deploy dari git
- Vite build optimizations

### Testing: Tests After (Simple)
- Basic component tests setelah development
- Visual regression testing via Playwright QA
- Focus on functionality verification

---

## FINAL SUMMARY

### Scope Overview
**Migrasi Next.js → React + Vite dengan redesign total ke Dark Luxury/Executive theme**

### Tech Stack Target
- React 19 + Vite
- Tailwind CSS 4 + shadcn/ui
- Framer Motion + GSAP (animations)
- React Three Fiber (3D hero)

### Design Theme
- Dark Luxury/Executive
- Gold/Amber accents
- Bold & Impressive animations

### Content Change
- Title: "Cybersecurity Enthusiast | Part-time Fullstack Developer"
- Keep existing data: skills, experience, certifications
- New layout: 7 sections

### Sections
1. Hero - 3D Interactive with geometric shapes
2. About - Personal introduction
3. Stats - Key metrics
4. Skills - Technical competencies
5. Experience - Work timeline
6. Certifications - Credentials
7. Contact - CTA

## Research Findings
(To be filled after agent exploration)
