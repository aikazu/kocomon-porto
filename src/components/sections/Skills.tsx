import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';

import { portfolioData } from '@/data/content';
import { Hexagon, Lock, Server, Code, type LucideIcon } from 'lucide-react';
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
          { y: 80, opacity: 0, rotateX: 15 },
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
            Years of experience across multiple domains, delivering secure and scalable solutions.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {skills.map((category, idx) => {
            const Icon = iconMap[category.icon] || Hexagon;

            return (
              <div
                key={category.title}
                className="skill-card group relative bg-surface border border-white/5 p-8 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="relative p-4 bg-white/5 group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon size={28} className="text-primary" />
                    <div className="absolute inset-0 border border-primary/20 group-hover:border-primary/50 transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl text-white">{category.title}</h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-heading text-sm text-text-muted">{skill.name}</span>
                        <span className="font-mono text-xs text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          viewport={{ once: true }}
                          className={cn(
                            'h-full relative',
                            idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-secondary' : 'bg-tertiary'
                          )}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 font-mono text-[10px] text-text-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {String(idx + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
