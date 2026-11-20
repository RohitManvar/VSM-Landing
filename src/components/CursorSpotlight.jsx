import React, { useRef, useState, useEffect } from 'react';

export const CursorSpotlight = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(37, 99, 235, 0.08)', 
  spotlightSize = 550,
  dark = false
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check pointer capabilities
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPosition({ x, y });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const color = dark ? 'rgba(59, 130, 246, 0.12)' : spotlightColor;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Cursor Spotlight Radial Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
