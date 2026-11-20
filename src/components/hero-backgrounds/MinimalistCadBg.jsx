import React, { useState, useEffect } from 'react';

/**
 * Option 5: Minimalist CAD Schematic (Swiss / Precision Blueprint)
 * Clean, distraction-free aesthetic with engineering crosshairs, technical coordinate marks,
 * and a soft ambient spotlight.
 */
export const MinimalistCadBg = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: Math.round((e.clientX / innerWidth) * 100),
        y: Math.round((e.clientY / innerHeight) * 100)
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* 1. Subtle hairline grid */}
      <div 
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0F172A 1px, transparent 1px),
            linear-gradient(to bottom, #0F172A 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* 2. Responsive Radial Ambient Spotlight following mouse */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 550px at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.055) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 80%)`
        }}
      />

      {/* 3. Top Decorative Engineering Ruler / Coordinates */}
      <div className="absolute top-6 left-8 right-8 flex justify-between items-center text-[10px] font-mono text-slate-400/80 select-none">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 border border-slate-300 rounded-[1px]" />
          <span>[SYS: DIGITAL-VSM // V2.4]</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>LATENCY &lt; 8ms</span>
          <span>TAKT-ALIGNED</span>
          <span>CYCLE-SYNCHRONIZED</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
          <span>LIVE TELEMETRY</span>
        </div>
      </div>

      {/* 4. Left & Right Architectural Crosshair Crop Marks */}
      <div className="absolute top-28 left-6 text-slate-300 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-28 right-6 text-slate-300 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-1/2 left-6 text-slate-300 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-1/2 right-6 text-slate-300 font-mono text-xs select-none">
        +
      </div>

      {/* 5. Minimalist Corner Framing Accents */}
      <div className="absolute top-16 left-12 w-6 h-6 border-t-2 border-l-2 border-slate-200/90 rounded-tl-sm" />
      <div className="absolute top-16 right-12 w-6 h-6 border-t-2 border-r-2 border-slate-200/90 rounded-tr-sm" />
      <div className="absolute bottom-16 left-12 w-6 h-6 border-b-2 border-l-2 border-slate-200/90 rounded-bl-sm" />
      <div className="absolute bottom-16 right-12 w-6 h-6 border-b-2 border-r-2 border-slate-200/90 rounded-br-sm" />

      {/* 6. Soft Center Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, transparent 60%, rgba(255,255,255,0.7) 90%, #FFFFFF 100%)'
        }}
      />
    </div>
  );
};
