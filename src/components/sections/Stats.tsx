import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Calendar, FileCheck, Briefcase, Award, Shield, type LucideIcon } from 'lucide-react';
import { portfolioData } from '../../data/content';

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  FileCheck,
  Briefcase,
  Award,
  Shield,
};

interface StatCardProps {
  label: string;
  value: string;
  iconName: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, iconName, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '') || '';
  
  const count = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2.0,
  });

  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      count.set(numericValue);
    }
  }, [isInView, numericValue, count]);

  const IconComponent = iconMap[iconName] || Briefcase;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-6 rounded-xl border border-luxury-gold/20 bg-luxury-black/50 backdrop-blur-sm group hover:border-luxury-gold/40 transition-colors"
    >
      <div className="mb-4 p-3 rounded-full bg-luxury-gold/10 text-luxury-gold group-hover:scale-110 transition-transform duration-300">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>
      
      <div className="flex items-baseline gap-1 mb-1">
        <motion.span className="text-4xl font-bold text-white font-serif">
          {rounded}
        </motion.span>
        <span className="text-2xl font-bold text-luxury-gold">{suffix}</span>
      </div>
      
      <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">{label}</p>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const { stats } = portfolioData;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-luxury-black/80 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              iconName={stat.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
