import { useEffect, useRef, useCallback, useState } from 'react';
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { opacity: 0 }
};

export const slideUp: Variants = {
  initial: { y: 30, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { y: 20, opacity: 0 }
};

export const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleIn: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { scale: 0.95, opacity: 0 }
};

export const gsapConfig = {
  ease: "power4.out",
  duration: 0.8
};

export { gsap, ScrollTrigger };

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export const useMagneticEffect = (options: MagneticOptions = {}) => {
  const { strength = 0.3, ease = 0.1 } = options;
  const elementRef = useRef<HTMLElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    if (!elementRef.current) return;
    
    positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
    positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;
    
    elementRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    
    rafIdRef.current = requestAnimationFrame(animate);
  }, [ease]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!boundingRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = boundingRef.current;
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      targetRef.current.x = distanceX * strength;
      targetRef.current.y = distanceY * strength;
    };

    const handleMouseEnter = () => {
      boundingRef.current = element.getBoundingClientRect();
      rafIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      setTimeout(() => {
        if (!element) return;
        positionRef.current.x = 0;
        positionRef.current.y = 0;
        element.style.transform = 'translate(0px, 0px)';
      }, 100);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [animate, strength]);

  return elementRef;
};

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'vertical' } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    if (direction === 'vertical') {
      tl.fromTo(
        element,
        { y: -100 * speed },
        { y: 100 * speed, ease: 'none' }
      );
    } else {
      tl.fromTo(
        element,
        { x: -100 * speed },
        { x: 100 * speed, ease: 'none' }
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [speed, direction]);

  return elementRef;
};

interface TextRevealOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
  ease?: string;
}

export const useTextReveal = (options: TextRevealOptions = {}) => {
  const {
    duration = 0.8,
    stagger = 0.02,
    delay = 0,
    y = 100,
    ease = 'power4.out',
  } = options;
  
  const elementRef = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimatedRef.current) return;

    splitRef.current = new SplitType(element, { types: 'chars,words' });
    const chars = splitRef.current.chars;
    
    if (!chars) return;

    gsap.set(chars, { y, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        hasAnimatedRef.current = true;
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease,
        });
      },
    });

    return () => {
      trigger.kill();
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [duration, stagger, delay, y, ease]);

  return elementRef;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

interface FadeInOptions {
  duration?: number;
  delay?: number;
  y?: number;
  start?: string;
}

export const useFadeIn = (options: FadeInOptions = {}) => {
  const {
    duration = 1,
    delay = 0,
    y = 50,
    start = 'top 85%',
  } = options;
  
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.set(element, { y, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once: true,
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [duration, delay, y, start]);

  return elementRef;
};

interface StaggerOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
  start?: string;
}

export const useStaggerChildren = (options: StaggerOptions = {}) => {
  const {
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    y = 30,
    start = 'top 85%',
  } = options;
  
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    gsap.set(children, { y, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [duration, stagger, delay, y, start]);

  return containerRef;
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = (options: InViewOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            hasTriggeredRef.current = true;
            observer.unobserve(element);
          }
        } else if (!triggerOnce && !hasTriggeredRef.current) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: elementRef, isInView };
};

export const useSmoothScroll = () => {
  const scrollTo = useCallback((target: string | number, options: { offset?: number; duration?: number } = {}) => {
    const { offset = 0, duration = 1.2 } = options;
    
    let element: Element | null = null;
    
    if (typeof target === 'string') {
      element = document.querySelector(target);
    } else {
      element = document.documentElement;
    }

    if (!element && typeof target === 'string') return;

    const targetPosition = typeof target === 'number' 
      ? target 
      : (element as HTMLElement).offsetTop - offset;

    gsap.to(window, {
      duration,
      scrollTo: { y: targetPosition },
      ease: 'power3.inOut',
    });
  }, []);

  return scrollTo;
};
