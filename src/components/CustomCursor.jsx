import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'pointer' | 'text' | 'zoom' | 'hidden'
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!hasFinePointer || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Update central dot immediately for instant responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check target element to adjust cursor styling
      const target = e.target;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [data-cursor="pointer"]');
        const zoomable = target.closest('[data-cursor="zoom"]');
        const textTarget = target.closest('h1, h2, h3, p, [data-cursor="text"]');

        if (interactive) {
          setCursorState('pointer');
        } else if (zoomable) {
          setCursorState('zoom');
        } else if (textTarget && !interactive) {
          setCursorState('text');
        } else {
          setCursorState('default');
        }
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setCursorState('hidden');
    const onMouseEnter = () => setCursorState('default');

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth RAF loop for the outer ring follower with natural easing (lerp)
    let animationFrameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const renderLoop = () => {
      // Lerp ring position toward mouse position (ease factor ~0.18 for smooth natural fluid trail)
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      
      {/* Central High-Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-600 pointer-events-none transition-opacity duration-150 ${
          cursorState === 'hidden' ? 'opacity-0' : 'opacity-100'
        } ${cursorState === 'pointer' ? 'scale-150 bg-blue-700' : ''}`}
        style={{ willChange: 'transform' }}
      />

      {/* Smooth Outer Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full transition-all duration-200 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2 ${
          cursorState === 'hidden'
            ? 'opacity-0 scale-50'
            : cursorState === 'pointer'
              ? 'w-12 h-12 -ml-6 -mt-6 border-2 border-blue-500/40 bg-blue-500/10 backdrop-blur-[0.5px] scale-100 opacity-100'
              : cursorState === 'zoom'
                ? 'w-14 h-14 -ml-7 -mt-7 border-2 border-blue-600 bg-blue-600/15 text-[9px] font-bold text-blue-900 tracking-wider'
                : cursorState === 'text'
                  ? 'w-8 h-8 -ml-4 -mt-4 border border-slate-400/30 bg-transparent opacity-60 scale-75'
                  : 'w-8 h-8 -ml-4 -mt-4 border border-slate-400/50 bg-blue-400/[0.04] opacity-80 scale-100'
        } ${isMouseDown ? 'scale-75 !border-blue-600' : ''}`}
        style={{ willChange: 'transform' }}
      >
        {cursorState === 'zoom' && (
          <span className="text-[9px] font-bold font-mono text-blue-700">VIEW</span>
        )}
      </div>

    </div>
  );
};
