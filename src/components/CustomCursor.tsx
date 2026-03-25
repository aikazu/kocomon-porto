import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef<{ x: number; y: number }[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    trailPos.current = Array.from({ length: 12 }, () => ({ x: 0, y: 0 }));
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setHasMoved(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        !!target.closest('a') || 
        !!target.closest('button') ||
        target.dataset.cursor === 'pointer' ||
        getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const animate = () => {
      if (cursorRef.current && dotRef.current) {
        cursorX += (mousePos.current.x - 20 - cursorX) * 0.22;
        cursorY += (mousePos.current.y - 20 - cursorY) * 0.22;
        dotX += (mousePos.current.x - 4 - dotX) * 0.35;
        dotY += (mousePos.current.y - 4 - dotY) * 0.35;

        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }

      if (trailRef.current.length > 0) {
        let { x, y } = mousePos.current;
        
        trailRef.current.forEach((dot, index) => {
          const prevX = index === 0 ? mousePos.current.x : trailPos.current[index - 1].x;
          const prevY = index === 0 ? mousePos.current.y : trailPos.current[index - 1].y;

          const lag = 0.25 - (index * 0.01); 
          
          x = prevX + (x - prevX) * lag;
          y = prevY + (y - prevY) * lag;
          
          const currentX = trailPos.current[index].x + (prevX - trailPos.current[index].x) * (0.15 + index * 0.005);
          const currentY = trailPos.current[index].y + (prevY - trailPos.current[index].y) * (0.15 + index * 0.005);

          trailPos.current[index] = { x: currentX, y: currentY };

          if (dot) {
            dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          }
        });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Effect for cursor state changes (hover/pointer)
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: isPointer ? 1.5 : 1,
        borderColor: isPointer ? '#FF2D00' : 'rgba(255, 255, 255, 0.3)',
        backgroundColor: isPointer ? 'rgba(255, 45, 0, 0.05)' : 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isPointer]);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  
  if (isTouchDevice || !hasMoved) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            ref={el => { if (el) trailRef.current[index] = el }}
              className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full mix-blend-screen"
              style={{
                backgroundColor: `rgba(255, 45, 0, ${0.6 - index * 0.04})`,
                transform: 'translate3d(-10px, -10px, 0)',
                scale: 1 - index * 0.05,
              }}
            />
          ))}
      </div>
      
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF2D00] pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ boxShadow: '0 0 10px rgba(255, 45, 0, 0.8)' }}
      />
    </>
  );
}
