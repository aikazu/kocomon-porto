import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorDot {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<CursorDot[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const trailId = useRef(0);

  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setHasMoved(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'A' || 
                         target.tagName === 'BUTTON' || 
                         !!target.closest('a') || 
                         !!target.closest('button') ||
                         target.dataset.cursor === 'pointer';
      
      setIsPointer(isClickable);

      if (Math.random() > 0.8) {
        const newDot: CursorDot = {
          x: e.clientX,
          y: e.clientY,
          id: trailId.current++,
        };
        setTrail(prev => [...prev.slice(-8), newDot]);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.35;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
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
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: isPointer ? 1.5 : 1,
        borderColor: isPointer ? '#FF2D00' : 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isPointer]);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  
  if (isTouchDevice || !hasMoved) return null;

  return (
    <>
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9998] mix-blend-difference"
          style={{
            left: 0,
            top: 0,
            width: 6 - index * 0.5,
            height: 6 - index * 0.5,
            borderRadius: '50%',
            backgroundColor: `rgba(255, 45, 0, ${0.4 - index * 0.04})`,
            transform: `translate(${dot.x - (6 - index * 0.5) / 2}px, ${dot.y - (6 - index * 0.5) / 2}px)`,
            transition: 'opacity 0.3s ease',
            opacity: 1 - index * 0.1,
          }}
        />
      ))}
      
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9999] transition-colors duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          borderColor: isPointer ? '#FF2D00' : 'rgba(255, 255, 255, 0.5)',
          backgroundColor: isPointer ? 'rgba(255, 45, 0, 0.1)' : 'transparent',
        }}
      />
      
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF2D00] pointer-events-none z-[9999] ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: '0 0 10px rgba(255, 45, 0, 0.5)',
        }}
      />
    </>
  );
}
