import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Navigation } from "./components/layout/Navigation";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CustomCursor from "./components/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const pathname = typeof window !== "undefined" ? window.location.pathname.replace(/\/$/, "") : "/";

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (pathname === "/privacy") {
    return (
      <>
        <PrivacyPage />
        <SpeedInsights />
      </>
    );
  }

  if (pathname === "/terms") {
    return (
      <>
        <TermsPage />
        <SpeedInsights />
      </>
    );
  }

  return (
    <div className="bg-void min-h-screen text-text font-heading selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      <main className="flex flex-col w-full relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <SpeedInsights />
    </div>
  );
}

export default App
