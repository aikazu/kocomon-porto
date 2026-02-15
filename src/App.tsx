import { Navigation } from "./components/layout/Navigation";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const pathname = typeof window !== "undefined" ? window.location.pathname.replace(/\/$/, "") : "/";

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
    <div className="bg-void min-h-screen text-text font-mono selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navigation />
      <main className="flex flex-col md:pl-20 w-full relative z-10">
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
