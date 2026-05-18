import { useEffect, useState, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { SpeedInsights } from "@vercel/speed-insights/react";
import CustomCursor from "@/components/CustomCursor";
import { Navigation } from "@/components/layout/Navigation";
import About from "@/components/sections/About";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import Skills from "@/components/sections/Skills";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFound from "@/components/NotFound";

function normalizePathname(pathname: string) {
   if (pathname === "/") {
      return pathname;
   }

   return pathname.replace(/\/$/, "");
}

function App() {
   const [pathname, setPathname] = useState(() =>
      typeof window !== "undefined"
         ? normalizePathname(window.location.pathname)
         : "/",
   );

   useEffect(() => {
      if (typeof window === "undefined") {
         return undefined;
      }

      // Respect prefers-reduced-motion — skip smooth scroll for users who prefer it
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
         return undefined;
      }

      const lenis = new Lenis({
         duration: 1.2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         orientation: "vertical",
         smoothWheel: true,
      });
      let rafId = 0;

      function raf(time: number) {
         lenis.raf(time);
         rafId = window.requestAnimationFrame(raf);
      }

      rafId = window.requestAnimationFrame(raf);

      return () => {
         window.cancelAnimationFrame(rafId);
         lenis.destroy();
      };
   }, []);

   useEffect(() => {
      if (typeof window === "undefined") {
         return undefined;
      }

      const syncPathname = () => {
         setPathname(normalizePathname(window.location.pathname));
         window.scrollTo(0, 0);
      };

      syncPathname();
      window.addEventListener("popstate", syncPathname);

      return () => {
         window.removeEventListener("popstate", syncPathname);
      };
   }, []);

   let page: ReactNode;

   if (pathname === "/privacy") {
      page = <PrivacyPage />;
   } else if (pathname === "/terms") {
      page = <TermsPage />;
   } else if (pathname !== "/") {
      page = <NotFound />;
   }

   if (page) {
      return (
         <>
            {page}
            <SpeedInsights />
         </>
      );
   }

   return (
      <div className="bg-void min-h-screen text-text font-heading selection:bg-primary/30 selection:text-white overflow-x-hidden">
         <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-none"
         >
            Skip to content
         </a>
         <CustomCursor />
         <Navigation />
         <main
            id="main-content"
            className="flex flex-col w-full relative z-10 md:pl-20"
         >
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Certifications />
            <Contact />
            <Footer />
         </main>
         <SpeedInsights />
      </div>
   );
}

export default App;
