import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { portfolioData } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';

export default function Experience() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { experience } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (!items) return;

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
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
    <section ref={sectionRef} id="experience" className="py-32 md:py-48 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">Experience</span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-mono text-xs text-text-muted">03</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="font-display text-responsive-lg text-white mb-4">Career History</h2>
          <p className="font-heading text-lg text-text-muted max-w-2xl">
            A decade of expertise in cybersecurity, architecture, and full-stack development.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-0 md:left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

          <div className="space-y-12">
            {experience.map((exp) => (
              <div key={`${exp.company}-${exp.role}`} className="timeline-item relative pl-8 md:pl-0 md:grid md:grid-cols-4 md:gap-8 group">
                <div className="absolute left-[-4px] md:left-[calc(25%-4px)] top-2 z-10">
                  <div className="w-2 h-2 rounded-full bg-surface border-2 border-primary group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
                </div>

                <div className="md:col-span-1 md:text-right">
                  <div className="font-mono text-xs text-primary mb-1">{exp.period}</div>
                  <div className="font-mono text-[10px] text-text-dim uppercase tracking-wider">{exp.location}</div>
                </div>

                <div className="md:col-span-3 group/card">
                  <div className="relative bg-void border border-white/5 p-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl text-white mb-1 group-hover/card:text-primary transition-colors duration-300">{exp.role}</h3>
                        <div className="flex items-center gap-2 font-mono text-sm text-text-muted">
                          <span className="text-secondary">@</span>
                          {exp.company}
                        </div>
                      </div>
                      <ArrowUpRight size={20} className="text-text-dim group-hover/card:text-primary transition-colors duration-300" />
                    </div>

                    <ul className="space-y-3">
                      {exp.highlights.map((highlight) => (
                        <li key={highlight.slice(0, 20)} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                          <span className="text-primary/50 mt-1">›</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
