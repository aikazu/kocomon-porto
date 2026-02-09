import { Navigation } from "./components/layout/Navigation";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <div className="bg-luxury-black min-h-screen text-luxury-white font-sans selection:bg-luxury-gold/30 selection:text-luxury-white">
      <Navigation />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}

export default App
