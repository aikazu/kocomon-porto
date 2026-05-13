import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { portfolioData } from "@/data/content";
import { MapPin, Mail, Calendar, ExternalLink } from "lucide-react";
import { useParallax } from "@/lib/animations";

export default function About() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { profile } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useParallax({ speed: 0.3 });
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll(".reveal-item");

        gsap.fromTo(
          elements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About"
      className="relative py-32 md:py-48 bg-void overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-grid-dense opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px]" />

      <div className="section-shell">
        <div className="section-header">
          <div className="section-header-row">
            <span className="section-kicker">About Me</span>
            <div ref={lineRef} className="section-rule" />
            <span className="section-index">01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute -inset-5 border border-white/8 z-10 pointer-events-none" />

              <div className="relative w-full h-full bg-surface overflow-hidden group">
                {profile.avatar ? (
                  <>
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      width={600}
                      height={750}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const fb = t.nextElementSibling as HTMLElement | null;
                        if (fb) fb.style.display = "flex";
                      }}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div style={{ display: "none" }} className="w-full h-full items-center justify-center bg-surface-elevated">
                      <span className="font-mono text-text-muted text-sm">[Image]</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-elevated">
                    <span className="font-mono text-text-muted text-sm">
                      [Image]
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(3,3,3,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 right-6 bg-void/80 border border-white/10 px-4 py-3 backdrop-blur-md z-20 max-w-[200px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-secondary animate-pulse shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-heading text-sm text-white whitespace-nowrap">
                        Available for Work
                      </span>
                      <span className="font-mono text-[10px] text-text-muted whitespace-nowrap">
                        Open to opportunities
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div ref={contentRef}>
            <div className="reveal-item mb-8">
              <h2 className="font-display text-responsive-lg text-white mb-6">
                Building secure and scalable solutions for the future
              </h2>
            </div>

            <div className="reveal-item mb-8">
              <p className="font-heading text-lg section-copy">
                {profile.summary}
              </p>
            </div>

            <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: profile.contact.location,
                },
                { icon: Mail, label: "Email", value: profile.contact.email },
                { icon: Calendar, label: "Experience", value: "10+ Years" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 border-t border-white/8 pt-4"
                >
                  <div className="p-3 bg-white/4">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="meta-label mb-1">{item.label}</div>
                    <div className="font-heading text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal-item">
              <div className="flex flex-wrap gap-3">
                {profile.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="highlight"
                    className="group flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-primary/60 hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <span className="meta-label text-text-muted group-hover:text-white transition-colors">
                      {social.platform}
                    </span>
                    <ExternalLink
                      size={12}
                      className="text-text-muted group-hover:text-primary transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
