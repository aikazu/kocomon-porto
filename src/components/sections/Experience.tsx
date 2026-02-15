import { motion } from 'framer-motion';
import { portfolioData } from '@/data/content';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-32 bg-surface relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 border border-primary/30 rounded-full bg-primary/5 text-primary font-mono text-xs tracking-widest mb-4">
            AUDIT_LOGS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            CAREER_HISTORY
          </h2>
        </motion.div>

        <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-12">
          {experience.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 md:gap-8 group"
            >
              <div className="absolute left-[-5px] top-2 md:left-auto md:right-auto md:col-start-4 md:col-end-4 md:-ml-[5px] z-10">
                <div className="w-2.5 h-2.5 bg-void border border-white/50 rounded-full group-hover:border-primary group-hover:bg-primary transition-colors duration-300" />
              </div>

              <div className="md:col-span-3 md:text-right font-mono text-xs text-primary pt-1.5 mb-2 md:mb-0">
                [{exp.period}]
              </div>

              <div className="md:col-span-9 bg-void border border-white/5 p-6 hover:border-white/10 transition-colors relative">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 border-t border-r border-primary" />
                </div>
                
                <h3 className="font-display text-xl font-bold text-white mb-1">{exp.role}</h3>
                <div className="text-sm font-mono text-gray-400 mb-4 flex items-center gap-2">
                  <span className="text-secondary">@</span> {exp.company}
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span>{exp.location}</span>
                </div>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={`${highlight.substring(0, 5)}-${hIdx}`} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                      <span className="text-primary/50 mt-1.5">›</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
