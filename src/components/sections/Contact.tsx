import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight, Github, Twitter, Linkedin, type LucideIcon, Copy, Check } from 'lucide-react';
import { portfolioData } from '@/data/content';
import gsap from 'gsap';

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Twitter
};

const MagneticButton = ({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const { left, top, width, height } = rect;
    
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    
    gsap.to(buttonRef.current, { x, y, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      boundingRef.current = buttonRef.current.getBoundingClientRect();
    }
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={className}
    >
      {children}
    </a>
  );
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
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden bg-void">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase">Contact</span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-mono text-xs text-text-muted">05</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-responsive-lg text-white mb-6"
            >
              Lets work<br />together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-lg text-text-muted max-w-md mb-12"
            >
              Ready to secure your infrastructure? Whether its a security audit, architecture design, or full-stack development, Im here to help.
            </motion.p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-white/5 border border-white/10 text-primary group-hover:border-primary/50 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Email</div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-white">{contact.email}</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-text-muted hover:text-white"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={14} className="text-secondary" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/5 border border-white/10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Location</div>
                  <span className="font-heading text-white">{contact.location}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {socials.map((social) => {
                const Icon = iconMap[social.icon] || Github;
                return (
                  <MagneticButton
                    key={social.platform}
                    href={social.url}
                    className="p-4 bg-surface border border-white/10 hover:border-primary/50 transition-colors duration-300"
                  >
                    <Icon size={20} className="text-text-muted hover:text-primary transition-colors" />
                  </MagneticButton>
                );
              })}
            </div>
          </div>

          <div className="bg-surface border border-white/5 p-8 lg:p-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-50" />

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-void border border-white/10 px-4 py-3 font-heading text-white focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <MagneticButton
                href={`mailto:${contact.email}`}
                className="w-full py-4 bg-primary text-void font-display font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
              >
                <span>Send Message</span>
                <ArrowUpRight size={18} />
              </MagneticButton>
            </form>
          </div>
        </div>

        <footer className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-text-dim">
            &copy; {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="font-mono text-xs text-text-muted hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="font-mono text-xs text-text-muted hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;