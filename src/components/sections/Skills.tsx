import { motion } from 'framer-motion';
import { portfolioData } from '@/data/content';
import { Hexagon, Lock, Server, Code, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  "ShieldCheck": Lock,
  "Code2": Code,
  "Server": Server,
};

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-32 bg-void relative">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest">SYSTEM_CAPABILITIES</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-white">
            SKILL_MATRIX
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category, idx) => {
            const Icon = iconMap[category.icon] || Hexagon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-surface/50 border border-white/10 p-6 hover:border-primary/50 transition-colors duration-500"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-primary transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-hover:border-primary transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 group-hover:border-primary transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-primary transition-colors" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white/5 rounded-sm text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn(
                            "h-full",
                            idx === 0 ? "bg-primary" : idx === 1 ? "bg-secondary" : "bg-white"
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
