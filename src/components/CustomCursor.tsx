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
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Initialize trail positions
    trailPos.current = Array(12).fill({ x: 0, y: 0 });

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
      // Main cursor follow with eased movement
      if (cursorRef.current && dotRef.current) {
        const x = mousePos.current.x;
        const y = mousePos.current.y;

        // Smooth follow for main cursor ring
        gsap.to(cursorRef.current, {
          x: x - 20,
          y: y - 20,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        // Tighter follow for center dot
        gsap.to(dotRef.current, {
          x: x - 4,
          y: y - 4,
          duration: 0.05,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }

      // Trail animation (Fluid Stream)
      if (trailRef.current.length > 0) {
        let { x, y } = mousePos.current;
        
        trailRef.current.forEach((dot, index) => {
          // Calculate previous position (or mouse position for first dot)
          const prevX = index === 0 ? mousePos.current.x : trailPos.current[index - 1].x;
          const prevY = index === 0 ? mousePos.current.y : trailPos.current[index - 1].y;

          // Lerp for fluid follow effect
          // Increasing lag factor for dots further back in the trail
          const lag = 0.25 - (index * 0.01); 
          
          x = prevX + (x - prevX) * lag;
          y = prevY + (y - prevY) * lag;
          
          // Current position calculation with smoothing
          const currentX = trailPos.current[index].x + (prevX - trailPos.current[index].x) * (0.15 + index * 0.005);
          const currentY = trailPos.current[index].y + (prevY - trailPos.current[index].y) * (0.15 + index * 0.005);

          trailPos.current[index] = { x: currentX, y: currentY };

          if (dot) {
            dot.style.transform = `translate(${currentX}px, ${currentY}px)`;
            
            // Dynamic scale based on movement speed could go here, 
            // but keeping it simple for stability
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
      {/* Trail Elements */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            ref={el => { if (el) trailRef.current[index] = el }}
            className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full mix-blend-screen"
            style={{
              backgroundColor: `rgba(255, 45, 0, ${0.6 - index * 0.04})`, // Fading trail opacity
              transform: 'translate(-10px, -10px)', // Initial off-screen
              scale: 1 - index * 0.05, // Tapering size
            }}
          />
        ))}
      </div>
      
      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Center Dot */}
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
