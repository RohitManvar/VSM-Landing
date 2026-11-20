import React, { useEffect, useRef, useState } from 'react';

export const AnimatedGrid = ({ className = '', children }) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationId;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 20; // max 20px drift
      targetY = (e.clientY / innerHeight - 0.5) * 20;
    };

    const loop = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setParallax({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      
      {/* Animated Subtle Grid Lines with Parallax */}
      <div 
        className="pointer-events-none absolute -inset-8 bg-grid-subtle opacity-40 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      {/* Slow Moving Soft Radial Ambient Glow */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-200/30 via-indigo-100/25 to-blue-50/20 blur-3xl rounded-full transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${-parallax.x * 1.5}px), calc(-50% + ${-parallax.y * 1.5}px), 0)`,
          willChange: 'transform'
        }}
      />

      {/* Floating Micro Light Nodes */}
      <div 
        className="pointer-events-none absolute top-12 left-1/4 w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[0.5px] animate-pulse-subtle"
        style={{ transform: `translate3d(${parallax.x * 2}px, ${parallax.y * 2}px, 0)` }}
      />
      <div 
        className="pointer-events-none absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-indigo-400/35 blur-[0.5px] animate-pulse-subtle"
        style={{ transform: `translate3d(${parallax.x * -1.8}px, ${parallax.y * -1.8}px, 0)` }}
      />
      <div 
        className="pointer-events-none absolute bottom-20 left-1/3 w-1 h-1 rounded-full bg-sky-400/50 blur-[0.5px]"
        style={{ transform: `translate3d(${parallax.x * 1.2}px, ${parallax.y * 1.2}px, 0)` }}
      />

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
