import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { portfolioData } from '@/data/content';
import GeometricScene from '../3d/GeometricScene';

export default function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { profile } = portfolioData;
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            delay: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: 'power3.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={`${char}-${index}`} className="char inline-block" style={{ perspective: '1000px' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-void"
    >
      <div className="absolute inset-0 z-0">
        <GeometricScene reducedMotion={shouldReduceMotion} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void z-[1]" />
      <div className="absolute inset-0 bg-grid opacity-10 z-[2] pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-[90vw] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent" />
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-text-muted uppercase">
              {profile.title}
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="font-display text-responsive-xl text-white mb-6 overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            {splitText(profile.name)}
          </h1>

          <div ref={subtitleRef} className="max-w-2xl">
            <p className="font-heading text-responsive-md text-text-muted leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-primary text-void font-heading font-bold uppercase tracking-wider overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,45,0,0.5)]"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>

            <a
              href="#about"
              className="group px-8 py-4 border border-white/20 font-heading uppercase tracking-wider text-white hover:border-primary hover:text-primary transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex gap-12 mt-20"
          >
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Completed' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        onClick={handleScrollDown}
        type="button"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border border-current rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-current rounded-full"
          />
        </div>
      </motion.button>

      <div className="absolute top-8 right-8 z-20">
        <div className="w-20 h-20 border-t-2 border-r-2 border-white/10" />
      </div>
      <div className="absolute bottom-8 left-8 z-20">
        <div className="w-20 h-20 border-b-2 border-l-2 border-white/10" />
      </div>
    </section>
  );
}
