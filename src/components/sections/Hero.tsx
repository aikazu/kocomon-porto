import { motion, useReducedMotion } from 'framer-motion';
import GeometricScene from '../3d/GeometricScene';
import { portfolioData } from '@/data/content';
import { Terminal, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { profile } = portfolioData;

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-void text-white">
      <div className="absolute inset-0 z-0 opacity-50">
        <GeometricScene reducedMotion={shouldReduceMotion} />
      </div>

      <div className="absolute inset-0 z-10 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 z-50 scanline-overlay pointer-events-none" />

      <div className="relative z-20 h-full flex items-center px-6 md:px-32">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="font-mono text-primary text-sm tracking-widest uppercase">
                  System_Initialized
                </span>
              </div>

              <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
                <span className="block text-white">IQBAL</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glitch-text" data-text="ATTILA">
                  ATTILA
                </span>
              </h1>

              <p className="font-mono text-gray-400 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">
                <span className="text-primary">{">"}</span> {profile.tagline}
              </p>

              <div className="flex flex-wrap gap-4 mt-12">
                <button 
                  type="button" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cyber-border px-8 py-4 bg-primary/10 hover:bg-primary/20 transition-colors group flex items-center gap-3"
                >
                  <Terminal size={18} className="text-primary" />
                  <span className="font-mono text-sm tracking-widest text-white group-hover:text-primary transition-colors">
                    INITIATE_CONTACT
                  </span>
                </button>
                <button 
                  type="button" 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-white/10 hover:border-white/30 transition-colors flex items-center gap-3"
                >
                  <ShieldCheck size={18} className="text-secondary" />
                  <span className="font-mono text-sm tracking-widest text-gray-300">
                    VIEW_SECURITY_CLEARANCE
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          <div className="hidden md:flex md:col-span-4 flex-col justify-center items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-full max-w-xs p-6 border border-white/5 bg-surface/50 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <span className="font-mono text-xs text-gray-500">RUNTIME_ENV</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>
              
              <div className="space-y-3 font-mono text-xs text-primary">
                <div className="flex justify-between">
                  <span className="text-gray-500">LOC</span>
                  <span>JAKARTA, ID</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ROLE</span>
                  <span>ARCHITECT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">SEC_LEVEL</span>
                  <span>L5_CLEARANCE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">STATUS</span>
                  <span className="animate-pulse">AVAILABLE</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="h-1 w-full bg-white/10 overflow-hidden">
                  <motion.div 
                    className="h-full bg-secondary"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-600 font-mono">
                  <span>PROCESSING</span>
                  <span>99.9%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-surface/80 border-t border-white/5 flex items-center overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap font-mono text-xs text-gray-500"
        >
          {Array(10).fill(" // SYSTEM SECURE // ENCRYPTED CONNECTION // AUTHORIZED ACCESS ONLY ").map((text, i) => (
            <span key={`ticker-${i}`}>{text}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
