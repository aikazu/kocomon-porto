import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Shield, 
  Briefcase, 
  Mail, 
  Menu, 
  X, 
  Activity
} from "lucide-react";
import { cn } from "../../lib/utils";

const navLinks = [
  { name: "Identity", href: "#hero", icon: Terminal },
  { name: "About", href: "#about", icon: Cpu },
  { name: "Skills", href: "#skills", icon: Shield },
  { name: "Logs", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Use window.innerHeight to make it safer
          return rect.top >= -100 && rect.top <= (window.innerHeight / 2);
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col justify-between w-20 hover:w-64 bg-surface/90 backdrop-blur-xl border-r border-white/10 transition-all duration-500 group overflow-hidden"
      >
        <div className="p-6 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shrink-0 animate-pulse">
            <Activity size={16} className="text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-white">
            KCMN_OS
          </span>
        </div>

        <div className="flex flex-col gap-2 px-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.substring(1);
            
            return (
              <button
                type="button"
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-md transition-all duration-300 relative overflow-hidden group/btn",
                  isActive 
                    ? "bg-white/5 text-primary border border-primary/30" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="shrink-0 relative z-10" />
                <span className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap relative z-10">
                  {link.name}
                </span>
                
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
            System Status
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            ONLINE_SECURE
          </div>
        </div>
      </motion.nav>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-void/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center"
      >
        <span className="font-display font-bold text-xl tracking-widest text-white">
          KCMN<span className="text-primary">.</span>OS
        </span>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                type="button"
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="font-display text-3xl font-bold text-white hover:text-primary transition-colors"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
