import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cog, 
  Gauge, 
  Sliders, 
  RotateCw,
  Cpu
} from 'lucide-react';

export const PacemakerGear = ({ isDark = false }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothTilt, setSmoothTilt] = useState({ rx: 18, ry: -14, rz: -6 });
  const [activeLayer, setActiveLayer] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [taktPulse, setTaktPulse] = useState(0);

  // Smooth mouse parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Animation frame for organic tilt spring and continuous pacemaker rhythm
  useEffect(() => {
    let animId;
    let time = 0;

    const loop = () => {
      time += 0.02;
      
      // Target tilt based on mouse position + subtle breathing wobble
      const targetRx = 18 - mousePos.y * 22;
      const targetRy = -14 + mousePos.x * 26 + (isRotating ? Math.sin(time * 0.8) * 3 : 0);
      const targetRz = -6 + mousePos.x * 8;

      setSmoothTilt((prev) => ({
        rx: prev.rx + (targetRx - prev.rx) * 0.08,
        ry: prev.ry + (targetRy - prev.ry) * 0.08,
        rz: prev.rz + (targetRz - prev.rz) * 0.08
      }));

      // Rhythmic heartbeat beat (takt pacemaker beat every ~2 seconds visual pulse)
      setTaktPulse((Math.sin(time * 2.5) + 1) / 2);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, isRotating]);

  // Generate gear teeth and contour slice coordinates
  const numTeeth = 18;
  const numSlices = 7;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto py-8 select-none flex flex-col items-center justify-center"
    >
      {/* Container Grid with flanking telemetry */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT FLANKING: Technical Monospace Telemetry Cards (Spade Style) */}
        <div className="lg:col-span-3 space-y-4 text-left z-20 order-2 lg:order-1">
          
          {/* Card 1: Pacemaker Identification */}
          <div className={`relative p-4 rounded-xl border font-mono text-xs backdrop-blur-xs transition-transform duration-200 ${
            isDark 
              ? 'bg-[#0E1A12]/95 border-emerald-500/30 text-white shadow-lg' 
              : 'bg-white/95 border-slate-300/80 text-slate-900 shadow-2xs hover:border-slate-400'
          }`}>
            {/* Corner Bracket Marks */}
            <div className={`absolute top-1.5 left-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>┌</div>
            <div className={`absolute top-1.5 right-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>┐</div>
            <div className={`absolute bottom-1.5 left-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>└</div>
            <div className={`absolute bottom-1.5 right-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>┘</div>

            <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1 text-[11px] uppercase tracking-wider">
              <span className="text-emerald-500">▸</span>
              <span>PACEMAKER PROCESS</span>
            </div>
            <div className={`font-bold text-sm tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CNC Milling Cell #04
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              TAKT_ID: <span className={`font-semibold ${isDark ? 'text-[#B6F076]' : 'text-slate-800'}`}>89201-PACE-B</span>
            </div>
          </div>

          {/* Card 2: Rhythm & Synchronization Telemetry */}
          <div className={`relative p-4 rounded-xl border font-mono text-xs backdrop-blur-xs transition-transform duration-200 ${
            isDark 
              ? 'bg-[#0E1A12]/95 border-emerald-500/30 text-white shadow-lg' 
              : 'bg-white/95 border-slate-300/80 text-slate-900 shadow-2xs hover:border-slate-400'
          }`}>
            {/* Corner Bracket Marks */}
            <div className={`absolute top-1.5 left-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>┌</div>
            <div className={`absolute top-1.5 right-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>┐</div>
            <div className={`absolute bottom-1.5 left-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>└</div>
            <div className={`absolute bottom-1.5 right-1.5 text-[9px] select-none ${isDark ? 'text-[#B6F076]/70' : 'text-slate-400'}`}>┘</div>

            <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-2 text-[11px] uppercase tracking-wider">
              <span className="text-[#B6F076]">▸</span>
              <span>FLOW SYNCHRONIZATION</span>
            </div>
            
            <div className={`space-y-1.5 text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">TAKT TIME:</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>42.5s / unit</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">PITCH BATCH:</span>
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>20 pcs (14.1m)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">RHYTHM SKEW:</span>
                <span className="font-bold text-[#B6F076]">±0.12s (Optimal)</span>
              </div>
              <div className={`pt-2 border-t flex items-center justify-between text-[10px] ${isDark ? 'border-emerald-900/60' : 'border-slate-200/80'}`}>
                <span className="text-slate-400">STATUS:</span>
                <span className={`inline-flex items-center gap-1 font-bold px-1.5 py-0.5 rounded border ${
                  isDark 
                    ? 'text-[#B6F076] bg-emerald-950 border-emerald-800' 
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  SYNCHRONIZED
                </span>
              </div>
            </div>
          </div>

          {/* Interactive layer slider / switch */}
          <div className={`hidden sm:flex items-center justify-between px-3 py-2 rounded-lg border text-[11px] font-mono ${
            isDark 
              ? 'bg-black/50 border-emerald-950 text-slate-300' 
              : 'bg-slate-50/80 border-slate-200 text-slate-600'
          }`}>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Contour Slices:</span>
            </span>
            <span className={`font-bold ${isDark ? 'text-[#B6F076]' : 'text-slate-900'}`}>7 Slices (CAD)</span>
          </div>

        </div>

        {/* CENTERPIECE: The 3D Topographic Sliced Pacemaker Gear */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] order-1 lg:order-2">
          
          {/* Subtle Ambient Radial Glow Behind the Object */}
          <div 
            className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-emerald-100/40 via-blue-50/40 to-slate-100/50 blur-[70px] pointer-events-none"
            style={{
              transform: `scale(${1 + taktPulse * 0.08})`
            }}
          />

          {/* 3D Isometric Transform Canvas Wrapper */}
          <div 
            className="relative cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${smoothTilt.rx}deg) rotateY(${smoothTilt.ry}deg) rotateZ(${smoothTilt.rz}deg)`
            }}
          >
            {/* The Topographic Contour Gear SVG */}
            <svg
              viewBox="0 0 540 540"
              className="w-[320px] sm:w-[420px] lg:w-[460px] h-auto drop-shadow-2xl overflow-visible"
              style={{
                filter: 'drop-shadow(0 25px 35px rgba(15, 23, 42, 0.12))'
              }}
            >
              <defs>
                {/* Surface hatching gradient */}
                <pattern id="cad-hatch-pattern" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke={isDark ? '#B6F076' : '#0F172A'} strokeWidth="0.75" strokeOpacity={isDark ? '0.28' : '0.18'} />
                </pattern>

                {/* Sliced face linear gradients */}
                <linearGradient id="gear-top-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? '#1C3826' : '#FFFFFF'} />
                  <stop offset="45%" stopColor={isDark ? '#14291B' : '#F8FAFC'} />
                  <stop offset="100%" stopColor={isDark ? '#0C1B11' : '#F1F5F9'} />
                </linearGradient>

                <linearGradient id="slice-rim-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isDark ? '#14291B' : '#E2E8F0'} />
                  <stop offset="50%" stopColor={isDark ? '#0C1B11' : '#CBD5E1'} />
                  <stop offset="100%" stopColor={isDark ? '#08140C' : '#94A3B8'} />
                </linearGradient>

                <linearGradient id="notch-depth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? '#14291B' : '#F1F5F9'} />
                  <stop offset="60%" stopColor={isDark ? '#0C1B11' : '#E2E8F0'} />
                  <stop offset="100%" stopColor={isDark ? '#08140C' : '#CBD5E1'} />
                </linearGradient>
              </defs>

              {/* STACKED TOPOGRAPHIC CONTOUR SLICES (Rendered from bottom to top for true 3D occlusion) */}
              {[...Array(numSlices)].map((_, sIdx) => {
                // Layer height offset
                const yOffset = (numSlices - 1 - sIdx) * 12;
                const scale = 1 - (numSlices - 1 - sIdx) * 0.018;
                const isTopSlice = sIdx === numSlices - 1;
                const opacity = 0.85 + (sIdx / numSlices) * 0.15;

                return (
                  <g 
                    key={`slice-${sIdx}`}
                    transform={`translate(0, ${yOffset}) scale(${scale})`}
                    style={{ transformOrigin: '270px 270px' }}
                    className="transition-all duration-300"
                    onMouseEnter={() => setActiveLayer(sIdx)}
                    onMouseLeave={() => setActiveLayer(null)}
                  >
                    {/* Gear Teeth Base Geometry / Extrusion Silhouette */}
                    <path
                      d={createGearTopographicPath(270, 270, 185, 215, numTeeth, 55, sIdx)}
                      fill={isTopSlice ? 'url(#gear-top-grad)' : isDark ? '#0D1E13' : '#E2E8F0'}
                      stroke={isDark ? '#B6F076' : '#0F172A'}
                      strokeWidth={isTopSlice ? (isDark ? "1.5" : "1.75") : "1"}
                      strokeLinejoin="round"
                      strokeOpacity={isTopSlice ? (isDark ? "0.9" : "0.9") : (isDark ? "0.4" : "0.5")}
                    />

                    {/* Top Surface CAD Contour Hatching Lines (Exact Spade Aesthetic) */}
                    {isTopSlice && (
                      <path
                        d={createGearTopographicPath(270, 270, 185, 215, numTeeth, 55, sIdx)}
                        fill="url(#cad-hatch-pattern)"
                        stroke="none"
                        pointerEvents="none"
                      />
                    )}

                    {/* Concentric Topographic Elevation Rings inside the gear body */}
                    <ellipse
                      cx="270"
                      cy="270"
                      rx={145 - sIdx * 10}
                      ry={145 - sIdx * 10}
                      fill="none"
                      stroke={isDark ? '#B6F076' : '#0F172A'}
                      strokeWidth="1"
                      strokeDasharray={sIdx % 2 === 0 ? "4 3" : "none"}
                      strokeOpacity={isDark ? "0.5" : "0.4"}
                    />

                    <ellipse
                      cx="270"
                      cy="270"
                      rx={105 - sIdx * 6}
                      ry={105 - sIdx * 6}
                      fill="none"
                      stroke={isDark ? '#34D399' : '#0F172A'}
                      strokeWidth="0.9"
                      strokeOpacity={isDark ? "0.45" : "0.35"}
                    />

                    {/* Inner Central Bore / Spindle with Keyway Notch (Flow Coupling) */}
                    <path
                      d="M 245 270 A 25 25 0 0 1 295 270 A 25 25 0 0 1 245 270 Z M 264 245 L 276 245 L 276 256 L 264 256 Z"
                      fill={isDark ? '#0B150F' : '#FFFFFF'}
                      stroke={isDark ? '#B6F076' : '#0F172A'}
                      strokeWidth="1.5"
                    />

                    {/* Sliced Vertical Stepped Notch (Like the Spade cutaway) */}
                    <path
                      d="M 270 270 L 360 210 L 400 240 L 320 310 Z"
                      fill={isTopSlice ? 'url(#notch-depth-grad)' : isDark ? '#0A180F' : '#CBD5E1'}
                      stroke={isDark ? '#B6F076' : '#0F172A'}
                      strokeWidth="1.25"
                      strokeOpacity={isDark ? "0.85" : "0.7"}
                    />

                    {/* Stepped Parallel Slice Contour Lines across the cutaway notch */}
                    <line x1="285" y1="260" x2="370" y2="225" stroke={isDark ? '#B6F076' : '#0F172A'} strokeWidth="0.8" strokeOpacity={isDark ? '0.7' : '0.5'} />
                    <line x1="295" y1="275" x2="385" y2="240" stroke={isDark ? '#B6F076' : '#0F172A'} strokeWidth="0.8" strokeOpacity={isDark ? '0.7' : '0.5'} />
                    <line x1="305" y1="290" x2="395" y2="255" stroke={isDark ? '#B6F076' : '#0F172A'} strokeWidth="0.8" strokeOpacity={isDark ? '0.7' : '0.5'} />
                  </g>
                );
              })}

              {/* Rhythmic Pacemaker Flow Indicator (Pulse Beacon at gear center) */}
              <circle
                cx="270"
                cy="270"
                r="6"
                fill={isDark ? '#B6F076' : '#10B981'}
                className="transition-transform duration-150"
              />
              <circle
                cx="270"
                cy="270"
                r={12 + taktPulse * 8}
                fill="none"
                stroke={isDark ? '#B6F076' : '#10B981'}
                strokeWidth="1.5"
                strokeOpacity={1 - taktPulse}
              />
            </svg>
          </div>

          {/* Interactive Inspection Tag Floating Near Gear */}
          {activeLayer !== null && (
            <div className={`absolute top-6 px-3 py-1.5 rounded-full font-mono text-[11px] shadow-lg animate-in fade-in zoom-in-95 pointer-events-none ${
              isDark ? 'bg-black/90 text-[#B6F076] border border-emerald-800' : 'bg-slate-900 text-white'
            }`}>
              CAD Slice Layer 0{activeLayer + 1} / 07 • Elevation +{(7 - activeLayer) * 2.5}mm
            </div>
          )}

        </div>

        {/* RIGHT FLANKING: Live Telemetry Preview Card (Spade Style Starbucks equivalent) */}
        <div className="lg:col-span-3 space-y-4 text-left z-20 order-3">
          
          {/* Floating Pill Card with High Contrast Telemetry */}
          <div className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-xs transition-all duration-200 ${
            isDark 
              ? 'bg-[#0E1A12]/95 border-emerald-500/30 text-white shadow-lg' 
              : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-lg hover:border-slate-300'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                isDark 
                  ? 'bg-emerald-950 text-[#B6F076] border-emerald-800' 
                  : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
              }`}>
                <Cog className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
              </div>
              <div>
                <h4 className={`font-bold text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Helical Gear Batch #8920
                </h4>
                <span className="text-[11px] font-mono text-slate-400 block">
                  2026-11-18 15:40:12
                </span>
              </div>
            </div>

            <div className={`pt-3 border-t flex items-center justify-between ${isDark ? 'border-emerald-900/60' : 'border-slate-100'}`}>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Lead Time Delta
                </span>
                <span className={`text-base font-extrabold font-mono tracking-tight ${isDark ? 'text-[#B6F076]' : 'text-emerald-600'}`}>
                  -3.8 hrs
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  OEE Rating
                </span>
                <span className={`text-base font-extrabold font-mono tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  94.8%
                </span>
              </div>
            </div>
          </div>

          {/* Quick Explanatory Badge */}
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-sans ${
            isDark 
              ? 'bg-[#0A140D]/90 border-emerald-950 text-slate-300' 
              : 'bg-slate-50 border-slate-200/80 text-slate-600 shadow-2xs'
          }`}>
            <span className={`font-bold block mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              What is the Pacemaker Process?
            </span>
            In Lean manufacturing, the pacemaker sets the production rhythm for the entire facility. Downstream pull and upstream replenishment synchronize to this single heartbeat.
          </div>

        </div>

      </div>

      {/* Editorial Headline & Mission Statement directly below the 3D Object (Spade Style) */}
      <div className="mt-8 sm:mt-12 text-center max-w-2xl mx-auto px-4 z-10">
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          VSM Cloud takes complex shop-floor steps and turns them into synchronized, continuous flow — with AI diagnostics and takt telemetry that keep every cell running in rhythm.
        </p>

        {/* Centered Black Pill CTA Button (Spade 'Contact sales' counterpart) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#pricing"
            className="px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer flex items-center gap-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </a>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className="px-4 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isRotating ? 'Motion: On' : 'Motion: Paused'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper to generate precise SVG path for a gear with involute teeth and topographic contour cuts
function createGearTopographicPath(cx, cy, innerR, outerR, numTeeth, toothWidthDeg, sliceIndex) {
  let path = '';
  const angleStep = (Math.PI * 2) / numTeeth;
  const halfTooth = (angleStep * (toothWidthDeg / 100)) / 2;

  for (let i = 0; i < numTeeth; i++) {
    const midAngle = i * angleStep;
    const a1 = midAngle - halfTooth;
    const a2 = midAngle - halfTooth * 0.65;
    const a3 = midAngle + halfTooth * 0.65;
    const a4 = midAngle + halfTooth;
    const aNext = (i + 1) * angleStep - halfTooth;

    // Outer and root points
    const p1x = cx + Math.cos(a1) * innerR;
    const p1y = cy + Math.sin(a1) * innerR;

    const p2x = cx + Math.cos(a2) * outerR;
    const p2y = cy + Math.sin(a2) * outerR;

    const p3x = cx + Math.cos(a3) * outerR;
    const p3y = cy + Math.sin(a3) * outerR;

    const p4x = cx + Math.cos(a4) * innerR;
    const p4y = cy + Math.sin(a4) * innerR;

    const pRootX = cx + Math.cos(aNext) * innerR;
    const pRootY = cy + Math.sin(aNext) * innerR;

    if (i === 0) {
      path += `M ${p1x} ${p1y} `;
    } else {
      path += `L ${p1x} ${p1y} `;
    }

    path += `L ${p2x} ${p2y} L ${p3x} ${p3y} L ${p4x} ${p4y} L ${pRootX} ${pRootY} `;
  }

  path += 'Z';
  return path;
}
