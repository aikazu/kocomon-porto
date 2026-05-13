import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Cpu,
  Shield,
  Briefcase,
  Mail,
  Menu,
  X,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Focus trap + ESC to close for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    // Move focus to first link in menu
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
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
      {/* Desktop sidebar nav */}
      <motion.nav
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col justify-between w-20 hover:w-64 bg-surface/90 backdrop-blur-xl border-r border-white/10 transition-all duration-500 group overflow-hidden"
        aria-label="Primary navigation"
      >
        <div className="p-6 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shrink-0 animate-pulse">
            <Activity size={16} className="text-primary" aria-hidden="true" />
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
              <a
                key={link.name}
                href={link.href}
                data-cursor={isActive ? "highlight" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.href);
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-md transition-all duration-300 relative overflow-hidden group/btn",
                  isActive
                    ? "bg-white/5 text-primary border border-primary/20"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.03]",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="shrink-0 relative z-10" aria-hidden="true" />
                <span className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap relative z-10">
                  {link.name}
                </span>

                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}
              </a>
            );
          })}
        </div>

        <div className="p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
            System Status
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
            ONLINE_SECURE
          </div>
        </div>
      </motion.nav>

      {/* Mobile top bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-void/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center"
        aria-label="Primary navigation"
      >
        <span className="font-display font-bold text-xl tracking-widest text-white">
          KCMN<span className="text-primary">.</span>OS
        </span>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="text-white p-2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
            onClick={(e) => {
              // Close on backdrop click (not on link clicks)
              if (e.target === e.currentTarget) closeMenu();
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                data-cursor="highlight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-display text-3xl font-bold text-white hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
