import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const cursorRootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!supportsFinePointer) {
      return undefined;
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursor = { x: target.x, y: target.y };
    let frameId = 0;

    const isInteractiveTarget = (element: HTMLElement | null) => {
      if (!element) return false;

      return Boolean(element.closest('[data-cursor="highlight"]'));
    };

    const render = () => {
      cursor.x += (target.x - cursor.x) * 0.22;
      cursor.y += (target.y - cursor.y) * 0.22;

      if (cursorRootRef.current) {
        cursorRootRef.current.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      setIsInteractive(isInteractiveTarget(event.target as HTMLElement));
    };

    const handlePointerLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
      setIsInteractive(false);
    };

    const handlePointerEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseenter', handlePointerEnter);
    window.addEventListener('blur', handlePointerLeave);

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter);
      window.removeEventListener('blur', handlePointerLeave);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const hiddenClass = isVisible ? 'opacity-100' : 'opacity-0';

  return (
    <>
      <div
        ref={cursorRootRef}
        className={cn('fixed left-0 top-0 pointer-events-none z-[9999] transition-opacity duration-300', hiddenClass)}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300',
            isInteractive ? 'scale-100 opacity-100' : 'scale-75 opacity-35',
          )}
          style={{
            background:
              'radial-gradient(circle, rgba(255,45,0,0.12) 0%, rgba(255,45,0,0.05) 30%, rgba(0,0,0,0) 72%)',
            filter: 'blur(10px)',
          }}
        />

        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300',
            isInteractive
              ? 'border-primary/75 scale-[1.28] rotate-45'
              : 'border-white/25 scale-100 rotate-0',
          )}
          style={{
            boxShadow: isInteractive
              ? '0 0 24px rgba(255, 45, 0, 0.2), inset 0 0 12px rgba(255, 45, 0, 0.14)'
              : '0 0 12px rgba(255, 255, 255, 0.06), inset 0 0 10px rgba(255, 255, 255, 0.03)',
          }}
        />

        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300',
            isInteractive ? 'border-secondary/65 scale-110' : 'border-white/10 scale-100',
          )}
        />

        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300',
            isInteractive ? 'scale-150 bg-primary' : 'scale-100 bg-white',
          )}
          style={{
            boxShadow: isInteractive
              ? '0 0 18px rgba(255, 45, 0, 0.8)'
              : '0 0 14px rgba(255, 255, 255, 0.55)',
          }}
        />

        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
            isInteractive ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
          )}
        >
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-gradient-to-b from-secondary/0 to-secondary/70" />
          <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-gradient-to-t from-secondary/0 to-secondary/70" />
          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-gradient-to-r from-secondary/0 to-secondary/70" />
          <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-gradient-to-l from-secondary/0 to-secondary/70" />
        </div>
      </div>
    </>
  );
}
