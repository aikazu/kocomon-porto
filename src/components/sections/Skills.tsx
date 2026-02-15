import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { portfolioData } from '@/data/content';
import { Hexagon, Lock, Server, Code, type LucideIcon, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck: Lock,
  Code2: Code,
  Server: Server,
};

export default function Skills() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { skills } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (!cards) return;

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
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} id="skills" className="py-32 md:py-48 bg-void relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">Expertise</span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-mono text-xs text-text-muted">02</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-responsive-lg text-white mb-4">Technical Skills</h2>
          <p className="font-heading text-lg text-text-muted max-w-2xl">
            Deploying advanced countermeasures and architectural robustness.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {skills.map((category, idx) => {
            const Icon = iconMap[category.icon] || Hexagon;
            const accentColor = idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-tertiary';
            const accentBorder = idx === 0 ? 'border-primary' : idx === 1 ? 'border-secondary' : 'border-tertiary';
            const accentBg = idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-tertiary';

            return (
              <motion.div
                key={category.title}
                className="skill-card group relative bg-surface-elevated/50 backdrop-blur-sm border border-white/5 p-1 overflow-hidden"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Active scan line */}
                <div className={cn("absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20", accentBg, "shadow-[0_0_20px_2px_currentColor]")} />
                <div className={cn("absolute bottom-0 right-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20", accentBg, "shadow-[0_0_20px_2px_currentColor]")} />

                <div className="relative h-full bg-void p-8 border border-white/5 group-hover:border-white/10 transition-colors duration-500">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                  <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300", accentBorder)} />

                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className={cn("w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500", accentBorder)}>
                        <Icon size={24} className={cn(accentColor, "group-hover:animate-pulse")} />
                      </div>
                      {/* Decorative dots */}
                      <div className="absolute -top-1 -right-1 w-1 h-1 bg-white/50" />
                      <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white/50" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white tracking-wide">{category.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim mt-1">
                        <Activity size={10} />
                        <span>SYSTEM_ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-heading text-sm text-text-muted group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className={cn("font-mono text-xs", accentColor)}>
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Segmented Progress Bar */}
                        <div className="flex gap-[2px] h-1.5">
                          {Array.from({ length: 10 }).map((_, i) => {
                            const isActive = (i + 1) * 10 <= skill.level;
                            return (
                              <div
                                key={i}
                                className={cn(
                                  "flex-1 h-full transition-all duration-300",
                                  isActive ? accentBg : "bg-white/5",
                                  isActive ? "opacity-100" : "opacity-30",
                                  "first:rounded-l-[1px] last:rounded-r-[1px]"
                                )}
                                style={{
                                  transitionDelay: `${i * 0.05}s`
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-text-dim">
                    <span>ID: 0{idx + 1}</span>
                    <span className="flex items-center gap-1">
                      <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", accentBg)} />
                      ONLINE
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

