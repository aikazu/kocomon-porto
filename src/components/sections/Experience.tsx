import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '@/data/content';
import { slideUp } from '@/lib/animations';

const Experience = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-luxury-black" id="experience">
      <div className="container px-4 mx-auto">
        <motion.div
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full opacity-50" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-luxury-gold via-luxury-amber to-transparent opacity-30 md:transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {portfolioData.experience.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={`${item.company}-${index}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.3, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 w-10 h-10 flex items-center justify-center transform md:-translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-luxury-gold shadow-[0_0_10px_var(--color-luxury-gold)] ring-4 ring-luxury-black" />
                  </div>

                  <div className="hidden md:block md:w-1/2" />

                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="luxury-card group relative p-6 md:p-8 hover:border-luxury-gold/30 transition-colors duration-300">
                      <div 
                        className={`hidden md:block absolute top-6 w-4 h-4 bg-luxury-charcoal border-l border-t border-luxury-gold/10 transform rotate-45 
                        ${isEven ? '-right-2 border-r border-b border-l-0 border-t-0' : '-left-2'} 
                        group-hover:border-luxury-gold/30 transition-colors duration-300`} 
                      />

                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xl md:text-2xl font-sans font-bold text-luxury-white group-hover:text-luxury-gold transition-colors">
                            {item.role}
                          </h3>
                          <div className="flex items-center gap-2 text-luxury-gold font-serif text-lg">
                            <Briefcase className="w-4 h-4" />
                            <span>{item.company}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-serif border-b border-white/5 pb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-luxury-gold" />
                            <span>{item.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-luxury-gold" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        <ul className="space-y-2">
                          {item.highlights.map((highlight, idx) => (
                            <li key={`${item.company}-highlight-${idx}`} className="flex items-start gap-2 text-gray-300 text-sm md:text-base">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-luxury-gold flex-shrink-0" />
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
