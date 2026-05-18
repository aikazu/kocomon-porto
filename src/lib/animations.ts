import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
   gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxOptions {
   speed?: number;
   direction?: "vertical" | "horizontal";
}

export const useParallax = (options: ParallaxOptions = {}) => {
   const { speed = 0.5, direction = "vertical" } = options;
   const elementRef = useRef<HTMLElement>(null);

   useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
         },
      });

      if (direction === "vertical") {
         tl.fromTo(element, { y: -100 * speed }, { y: 100 * speed, ease: "none" });
      } else {
         tl.fromTo(element, { x: -100 * speed }, { x: 100 * speed, ease: "none" });
      }

      return () => {
         tl.kill();
         ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === element) {
               st.kill();
            }
         });
      };
   }, [speed, direction]);

   return elementRef;
};
