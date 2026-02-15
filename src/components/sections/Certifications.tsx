import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Shield, FileCheck, type LucideIcon } from 'lucide-react';
import { portfolioData, type Certification } from '../../data/content';

const iconMap: Record<string, LucideIcon> = {
  Award,
  Shield,
  FileCheck,
};

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const IconComponent = iconMap[cert.icon] || FileCheck;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, margin: "-50px", once: false }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        borderColor: "rgba(255, 45, 0, 0.5)"
      }}
      className="bg-surface border border-white/5 flex flex-col items-center text-center h-full transition-all duration-300 group relative overflow-hidden p-8 hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-grid opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-4 bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 relative z-10 border border-primary/20">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-display font-bold text-white mb-2 relative z-10 tracking-wide group-hover:text-primary transition-colors duration-300">
        {cert.name}
      </h3>

      <div className="mt-auto space-y-1 relative z-10 w-full">
        <div className="h-px w-full bg-white/10 my-4" />
        <p className="text-secondary font-mono text-sm">
          {cert.issuer}
        </p>
        <p className="text-xs text-text-dim font-mono">
          ISSUED: {cert.date}
        </p>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const { certifications, trainings } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section ref={ref} className="py-32 md:py-48 relative overflow-hidden bg-void" id="certifications">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            Certifications
          </span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-mono text-xs text-text-muted">04</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-responsive-lg text-white mb-4">
            Professional Credentials
          </h2>
          <p className="font-heading text-lg text-text-muted max-w-2xl">
            Industry-recognized certifications and specialized training validating expertise in cybersecurity and IT architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.name}
              cert={cert}
              index={index}
            />
          ))}
        </div>


        {trainings.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs tracking-[0.2em] text-text-muted uppercase">
                Additional Training
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainings.map((training, index) => (
                <motion.div
                  key={training.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-primary/30 transition-colors duration-300 group"
                >
                  <div>
                    <h4 className="font-heading text-white group-hover:text-primary transition-colors duration-300">
                      {training.name}
                    </h4>
                    <p className="font-mono text-xs text-text-muted">{training.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-text-dim">{training.date}</span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Certifications;
