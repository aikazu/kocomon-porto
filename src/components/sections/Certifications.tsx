import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Award, Shield, FileCheck, type LucideIcon } from "lucide-react";
import { portfolioData, type Certification } from "@/data/content";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Shield,
  FileCheck,
};

const CertificationCard = ({ cert }: { cert: Certification }) => {
  const IconComponent = iconMap[cert.icon] || FileCheck;

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(255, 45, 0, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="cert-card bg-surface border border-white/6 flex flex-col items-center text-center h-full transition-all duration-300 group relative overflow-hidden p-8 hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-grid opacity-12 group-hover:opacity-20 transition-opacity duration-500" />

      <div className="p-4 bg-primary/10 text-primary mb-6 group-hover:bg-primary/16 group-hover:scale-105 transition-all duration-300 relative z-10 border border-primary/15">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-display font-bold text-white mb-2 relative z-10 tracking-wide group-hover:text-primary transition-colors duration-300">
        {cert.name}
      </h3>

      <div className="mt-auto space-y-1 relative z-10 w-full">
        <div className="h-px w-full bg-white/10 my-4" />
        <p className="text-secondary text-sm">{cert.issuer}</p>
        <p className="meta-label">ISSUED: {cert.date}</p>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { certifications, trainings } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trainingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // Cert cards reveal
      const cards = cardsRef.current?.querySelectorAll(".cert-card");
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, rotateX: 10 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      }

      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Training items reveal
      const items = trainingsRef.current?.querySelectorAll(".training-item");
      if (items) {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 relative overflow-hidden bg-void"
      id="certifications"
      aria-label="Certifications"
    >
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="section-shell">
        <div className="section-header">
          <div className="section-header-row">
            <span className="section-kicker">Certifications</span>
            <div className="section-rule" />
            <span className="section-index">04</span>
          </div>

          <div ref={headingRef}>
            <h2 className="font-display text-responsive-lg text-white mb-4">
              Professional Credentials
            </h2>
            <p className="font-heading text-lg section-copy">
              Industry-recognized certifications and specialized training
              validating expertise in cybersecurity and IT architecture.
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
          style={{ perspective: "1000px" }}
        >
          {certifications.map((cert) => (
            <CertificationCard key={cert.name} cert={cert} />
          ))}
        </div>

        {trainings.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <span className="meta-label text-text-muted">
                Additional Training
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div
              ref={trainingsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {trainings.map((training) => (
                <div
                  key={training.name}
                  className="training-item flex items-center justify-between p-4 bg-white/5 border border-white/6 hover:border-primary/20 transition-colors duration-300 group"
                >
                  <div>
                    <h4 className="font-heading text-white group-hover:text-primary transition-colors duration-300">
                      {training.name}
                    </h4>
                    <p className="meta-label text-text-muted">
                      {training.issuer}
                    </p>
                  </div>
                  <span className="meta-label">{training.date}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Certifications;
