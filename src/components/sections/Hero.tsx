import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GeometricScene from '../3d/GeometricScene';
import { portfolioData } from '@/data/content';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { profile } = portfolioData;

  const [primaryRole, secondaryRole] = profile.title
    .split('|')
    .map((segment) => segment.trim());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 160]),
    { stiffness: 120, damping: 26, mass: 0.25 }
  );
  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.35, 0]),
    { stiffness: 130, damping: 28, mass: 0.3 }
  );
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <GeometricScene reducedMotion={shouldReduceMotion} />
      </div>

      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-4 text-center"
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: 0.15, staggerChildren: 0.1 }
            }
          }}
          className="pointer-events-none max-w-4xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: easeOutExpo }
              }
            }}
            className="mb-4 text-xs uppercase tracking-[0.28em] text-yellow-300/80 sm:text-sm"
          >
            {primaryRole}
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.95, ease: easeOutExpo }
              }
            }}
            className="mb-4 text-4xl font-bold tracking-tighter text-transparent drop-shadow-lg sm:text-6xl md:text-8xl"
          >
            <span className="bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-600 bg-clip-text">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.85, ease: easeOutExpo }
              }
            }}
            className="mx-auto max-w-2xl text-lg font-light tracking-wide text-yellow-100/85 sm:text-xl md:text-2xl"
          >
            {secondaryRole}
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: easeOutExpo }
              }
            }}
            className="mx-auto mt-6 max-w-2xl text-sm text-yellow-100/60 sm:text-base"
          >
            {profile.tagline}
          </motion.p>
        </motion.div>

        <motion.div
          style={shouldReduceMotion ? undefined : { opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-yellow-500"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
