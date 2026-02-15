import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight, Github, Twitter, Linkedin, type LucideIcon, Copy, Check } from 'lucide-react';
import { portfolioData } from '@/data/content';
import { slideUp, stagger } from '@/lib/animations';
import { useState } from 'react';

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Twitter
};

const Contact = () => {
  const { contact, socials } = portfolioData.profile;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-void text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 0.3 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div variants={slideUp} className="mb-6 flex justify-center">
            <span className="px-3 py-1 border border-primary/30 bg-primary/10 rounded-full text-xs font-mono text-primary tracking-widest uppercase">
              Transmission_Open
            </span>
          </motion.div>
          
          <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="text-white">
              SECURE YOUR INFRASTRUCTURE
            </span>
          </motion.h2>
          <motion.p variants={slideUp} className="text-gray-400 font-mono text-sm md:text-base max-w-2xl mx-auto">
            Ready to deploy? Whether it's a security audit, full-stack architecture, or a handshake protocol, my terminal is open.
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
                className="bg-surface/50 border border-white/10 p-8 hover:border-primary/50 transition-colors duration-300 relative group overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Mail className="text-primary w-12 h-12 opacity-20" />
                </div>

                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white mb-2">Direct Uplink</h3>
                        <p className="text-gray-400 font-mono text-xs mb-8 leading-relaxed">
                            Initiate encrypted communication channel. Responses typically within 24 hours.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group/email">
                                <div className="p-3 bg-white/5 border border-white/10 text-primary">
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Email Protocol</div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-white text-sm">{contact.email}</span>
                                        <button 
                                            onClick={handleCopyEmail}
                                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                                            title="Copy to clipboard"
                                        >
                                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 border border-white/10 text-primary">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Base of Operations</div>
                                    <span className="font-mono text-white text-sm">
                                        {contact.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <a 
                            href={`mailto:${contact.email}`}
                            className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-black font-bold font-display uppercase tracking-wider hover:bg-white transition-colors"
                        >
                            <span>Execute Send</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                variants={slideUp}
                className="bg-surface/50 border border-white/10 p-8 hover:border-secondary/50 transition-colors duration-300 flex flex-col justify-center items-center text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-grid opacity-20" />
                
                <h3 className="text-xl font-display font-bold text-white mb-8 relative z-10">Social_Network_Nodes</h3>
                
                <div className="flex flex-wrap justify-center gap-6 relative z-10">
                    {socials.map((social) => {
                        const Icon = iconMap[social.icon] || Github;
                        return (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-3"
                                aria-label={social.platform}
                            >
                                <div className="p-4 bg-void border border-white/20 group-hover:border-secondary group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300">
                                    <Icon size={24} className="text-gray-400 group-hover:text-secondary transition-colors" />
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                    {social.platform}
                                </span>
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
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-mono"
        >
            <div className="mb-4 md:mb-0">
                <p>SYSTEM_ID: {portfolioData.profile.name} | COPYRIGHT {new Date().getFullYear()}</p>
            </div>
            <div className="flex gap-6">
               <a href="/privacy" className="hover:text-primary transition-colors">PRIVACY_PROTOCOL</a>
               <a href="/terms" className="hover:text-primary transition-colors">TERMS_OF_SERVICE</a>
            </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;