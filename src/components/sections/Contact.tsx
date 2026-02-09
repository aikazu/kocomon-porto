import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight, Github, Twitter, Linkedin, type LucideIcon } from 'lucide-react';
import { portfolioData } from '@/data/content';
import { slideUp, stagger } from '@/lib/animations';

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Twitter
};

const Contact = () => {
  const { contact, socials } = portfolioData.profile;

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-luxury-black text-luxury-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-luxury-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-luxury-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 0.3 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-serif font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-white via-luxury-gold to-luxury-amber">
              Ready to Secure Your Infrastructure?
            </span>
          </motion.h2>
          <motion.p variants={slideUp} className="text-luxury-muted text-lg md:text-xl max-w-2xl mx-auto">
            Whether you need a security audit, a full-stack application, or just want to say hi, my inbox is always open.
          </motion.p>
        </motion.div>

        <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20"
        >
            <motion.div 
                variants={slideUp}
                className="luxury-card flex flex-col justify-between group"
            >
                <div>
                    <h3 className="text-2xl font-serif font-bold text-luxury-gold mb-2">Get in Touch</h3>
                    <p className="text-luxury-muted mb-8">
                        Let's discuss how we can work together to build secure and scalable solutions.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-luxury-gold/10 text-luxury-gold">
                                <Mail size={20} />
                            </div>
                            <a href={`mailto:${contact.email}`} className="text-luxury-white hover:text-luxury-gold transition-colors">
                                {contact.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-luxury-gold/10 text-luxury-gold">
                                <MapPin size={20} />
                            </div>
                            <span className="text-luxury-white">
                                {contact.location}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <a 
                        href={`mailto:${contact.email}`}
                        className="luxury-button inline-flex items-center gap-2 w-full justify-center md:w-auto"
                    >
                        <span>Send Message</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </motion.div>

            <motion.div 
                variants={slideUp}
                className="luxury-card flex flex-col justify-center items-center text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-transparent opacity-50" />
                
                <h3 className="text-2xl font-serif font-bold text-luxury-white mb-8 relative z-10">Connect on Social</h3>
                
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                    {socials.map((social) => {
                        const Icon = iconMap[social.icon] || Github;
                        return (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-full bg-luxury-black/50 border border-luxury-muted/20 hover:border-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold text-luxury-muted transition-all duration-300 transform hover:-translate-y-1"
                                aria-label={social.platform}
                            >
                                <Icon size={24} />
                            </a>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>

        <motion.footer 
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.3 }}
            className="border-t border-luxury-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center text-luxury-muted text-sm"
        >
            <div className="mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
               <a href="/privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</a>
               <a href="/terms" className="hover:text-luxury-gold transition-colors">Terms of Service</a>
            </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
