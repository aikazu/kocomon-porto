import { motion } from 'framer-motion';
import { portfolioData } from '../../data/content';
import { fadeIn, slideUp, stagger, scaleIn } from '../../lib/animations';

const About = () => {
  const { profile } = portfolioData;

  return (
    <section id="about" className="py-24 bg-luxury-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-luxury-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 0.3, margin: "-100px" }}
        >
          <motion.div 
            className="w-full md:w-5/12 order-1 md:order-2 flex justify-center md:justify-end"
            variants={scaleIn}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 group">
              <div className="absolute inset-0 border-2 border-luxury-gold rounded-2xl translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 z-0" />
              
              <div className="absolute inset-0 bg-luxury-gold/20 blur-2xl rounded-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl z-10 bg-luxury-charcoal border border-luxury-gold/10">
                <img 
                  src="/photo.png" 
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2 order-2 md:order-1"
            variants={slideUp}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-serif text-white mb-8"
              variants={fadeIn}
            >
              About <span className="text-luxury-gold">Me</span>
            </motion.h2>
            
            <motion.div 
              className="space-y-6 text-luxury-muted text-lg leading-relaxed"
              variants={fadeIn}
            >
              <p>{profile.summary}</p>
              
              <div className="w-20 h-1 bg-luxury-gold/30 rounded-full mt-8 mb-6" />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-luxury-gold/20 rounded-lg bg-luxury-charcoal/50 hover:border-luxury-gold/40 transition-colors duration-300">
                    <span className="block text-3xl font-bold text-luxury-gold mb-1">10+</span>
                    <span className="text-xs uppercase tracking-wider text-luxury-muted">Years Exp.</span>
                </div>
                <div className="p-4 border border-luxury-gold/20 rounded-lg bg-luxury-charcoal/50 hover:border-luxury-gold/40 transition-colors duration-300">
                    <span className="block text-3xl font-bold text-luxury-gold mb-1">50+</span>
                    <span className="text-xs uppercase tracking-wider text-luxury-muted">Projects</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
