import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = cursorTrailRef.current;
    
    if (!cursor || !trail) return;

    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      trail.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      
      gsap.to(trail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, trail], { opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, trail], { opacity: 0, duration: 0.3 });
    };

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 2, duration: 0.3 });
        gsap.to(trail, { scale: 1.5, opacity: 0.5, duration: 0.3 });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(trail, { scale: 1, opacity: 0.3, duration: 0.3 });
      });
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          backgroundColor: '#00F0FF',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] opacity-30"
        style={{
          border: '1px solid #00F0FF',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
