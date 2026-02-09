import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Code2, Server, type LucideIcon } from 'lucide-react';
import { portfolioData, type SkillCategory, type SkillItem } from '../../data/content';

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Code2,
  Server,
};

const SkillBar: React.FC<{ level: number; delay: number }> = ({ level, delay }) => {
  return (
    <div className="h-1 w-full bg-luxury-muted/20 rounded-full overflow-hidden mt-1">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full bg-luxury-gold rounded-full"
      />
    </div>
  );
};

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
  const IconComponent = iconMap[category.icon] || Server;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="luxury-card flex flex-col h-full hover:border-luxury-gold/30 transition-colors duration-300 group"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-luxury-gold/10 text-luxury-gold group-hover:scale-110 transition-transform duration-300">
          <IconComponent size={24} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-serif font-medium text-luxury-white">
          {category.title}
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        {category.skills.map((skill: SkillItem, idx: number) => (
          <div key={skill.name} className="flex flex-col gap-1">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-luxury-white/80">
                {skill.name}
              </span>
              <span className="text-xs font-mono text-luxury-gold/80">
                {skill.level}%
              </span>
            </div>
            <SkillBar level={skill.level} delay={0.2 + (idx * 0.1)} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-luxury-black" id="skills">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-luxury-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-luxury-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
            Technical <span className="text-gradient-gold">Expertise</span>
          </h2>
          <p className="text-luxury-muted max-w-2xl mx-auto text-lg font-light">
            A comprehensive overview of my technical capabilities across security, development, and architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
