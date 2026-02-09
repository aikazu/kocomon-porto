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
        boxShadow: "0 0 25px rgba(212, 175, 55, 0.2)"
      }}
      className="luxury-card flex flex-col items-center text-center h-full hover:border-luxury-gold transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-4 rounded-full bg-luxury-gold/5 text-luxury-gold mb-6 group-hover:bg-luxury-gold/10 group-hover:scale-110 transition-all duration-300 relative z-10">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-serif font-semibold text-luxury-white mb-2 relative z-10">
        {cert.name}
      </h3>

      <div className="mt-auto space-y-1 relative z-10">
        <p className="text-luxury-gold font-medium">
          {cert.issuer}
        </p>
        <p className="text-sm text-luxury-muted font-mono">
          Issued {cert.date}
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
    <section ref={ref} className="py-24 relative overflow-hidden bg-luxury-charcoal/30" id="certifications">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
            Professional <span className="text-gradient-gold">Certifications</span>
          </h2>
          <p className="text-luxury-muted max-w-2xl mx-auto text-lg font-light">
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
