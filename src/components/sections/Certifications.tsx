import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Shield, FileCheck, type LucideIcon } from 'lucide-react';
import { portfolioData, type Certification } from '../../data/content';

const iconMap: Record<string, LucideIcon> = {
  Award,
  Shield,
  FileCheck,
};

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const IconComponent = iconMap[cert.icon] || FileCheck;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        borderColor: "rgba(0, 240, 255, 0.5)"
      }}
      className="bg-surface/50 border border-white/10 flex flex-col items-center text-center h-full transition-all duration-300 group relative overflow-hidden p-8"
    >
      <div className="absolute inset-0 bg-grid opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-50" />

      <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 group-hover:text-white transition-all duration-300 relative z-10 border border-primary/20">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-display font-bold text-white mb-2 relative z-10 tracking-wide">
        {cert.name}
      </h3>

      <div className="mt-auto space-y-1 relative z-10 w-full">
        <div className="h-px w-full bg-white/10 my-4" />
        <p className="text-secondary font-mono text-sm">
          {cert.issuer}
        </p>
        <p className="text-xs text-gray-500 font-mono">
          ISSUED: {cert.date}
        </p>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  const { certifications } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-void" id="certifications">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
            Credentials_Verified
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Certifications</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-mono text-sm">
            Recognized qualifications validating expertise in cybersecurity and specialized technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.name}
              cert={cert}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
