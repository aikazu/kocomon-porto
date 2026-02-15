import { motion } from 'framer-motion';
import { portfolioData } from '@/data/content';
import { User, MapPin, Mail, Calendar } from 'lucide-react';

export default function About() {
  const { profile } = portfolioData;

  return (
    <section id="about" className="py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 bg-white/10" />
          <h2 className="font-display text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase">
            Profile_Decryption
          </h2>
          <div className="h-px flex-1 bg-white/10" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 border border-primary/20 rounded-sm" />
            <div className="absolute -inset-4 border border-secondary/20 rounded-sm translate-x-2 translate-y-2" />
            
            <div className="relative aspect-square bg-void border border-white/10 overflow-hidden group-hover:border-primary/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 mix-blend-overlay z-10 pointer-events-none" />
              
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full bg-surface-light flex items-center justify-center text-gray-700 font-mono text-xs">
                  [IMAGE_DATA_CORRUPTED]
                </div>
              )}
              
              {/* Scanline overlay for the image */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%] pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md border-t border-white/10 z-30">
                <div className="flex justify-between text-xs font-mono text-primary">
                  <span>ID: KCMN-001</span>
                  <span>STATUS: ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-6"
            >
              <div className="p-6 bg-white/5 border-l-2 border-primary">
                <p className="text-lg leading-relaxed text-gray-300">
                  {profile.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 text-gray-400">
                  <User size={16} className="text-secondary" />
                  <span className="text-sm">{profile.name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={16} className="text-secondary" />
                  <span className="text-sm">{profile.contact.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={16} className="text-secondary" />
                  <span className="text-sm">{profile.contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar size={16} className="text-secondary" />
                  <span className="text-sm">10+ Years Exp.</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Social_Uplink</h3>
                <div className="flex gap-4">
                  {profile.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-white/20 text-xs hover:bg-white/10 transition-colors uppercase tracking-widest"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
