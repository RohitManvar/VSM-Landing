import React, { useState, useRef, useEffect } from 'react';
import { 
  Cog, 
  Layers, 
  Box, 
  Cpu, 
  Radio, 
  ArrowRight, 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export const SpadeTopographicArtifacts = ({ onOpenTrial }) => {
  const [selectedArtifact, setSelectedArtifact] = useState('gear');
  const [activeSlice, setActiveSlice] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothTilt, setSmoothTilt] = useState({ rx: 20, ry: -15 });
  const containerRef = useRef(null);

  const artifacts = {
    gear: {
      id: 'gear',
      number: '01',
      title: 'The Pacemaker Gear',
      subtitle: 'Takt Rhythm & Flow Cadence',
      cadCode: 'CAD_ISO_VSM_89201 // HELICAL TAKT PACEMAKER',
      slices: 8,
      leadMetric: '42.5s Takt Beat',
      metricDelta: '±0.12s Rhythm Skew',
      formula: 'Takt Time = Available Operating Seconds / Customer Demand',
      description: 'The single shop-floor process that dictates the production heartbeat for the entire plant. Everything upstream and downstream synchronizes to this rhythm.'
    },
    supermarket: {
      id: 'supermarket',
      number: '02',
      title: 'The Pull Supermarket Bin',
      subtitle: 'Decoupled FIFO Buffer Architecture',
      cadCode: 'CAD_ISO_VSM_33102 // KANBAN GRAVITY SLIDE',
      slices: 7,
      leadMetric: '120 Units Cap',
      metricDelta: '-68% Buffer Trapped',
      formula: 'Little’s Law: WIP = Throughput Rate × Lead Time',
      description: 'Replaces erratic batch-and-push staging with strict pull supermarkets. When the downstream pacemaker consumes one unit, an automated Kanban card triggers replenishment.'
    },
    robot: {
      id: 'robot',
      number: '03',
      title: 'The Standardized Work Cell',
      subtitle: 'Precision Cycle-Time Balancing',
      cadCode: 'CAD_ISO_VSM_55419 // MULTI-AXIS AUTOMATION JIG',
      slices: 9,
      leadMetric: '96.2% OEE Rating',
      metricDelta: '108s Cycle (Balanced)',
      formula: 'Line Balance Efficiency = Total Work Content / (Stations × Takt)',
      description: 'Eliminates operator waiting and line imbalance. Tasks are dynamically rebalanced so no workstation exceeds customer takt time.'
    },
    andon: {
      id: 'andon',
      number: '04',
      title: 'The Andon Telemetry Beacon',
      subtitle: 'Zero-Latency Constraint Escalation',
      cadCode: 'CAD_ISO_VSM_10928 // OPTICAL STATUS TOWER',
      slices: 6,
      leadMetric: '< 2.5s Alarm Latency',
      metricDelta: 'Zero Dark Downtime',
      formula: 'MTTR = Total Unplanned Stoppage Time / Total Failures',
      description: 'Instant visual and digital notification the millisecond a cycle exceeds takt. Prevents micro-stoppages from cascading into program-wide delivery delays.'
    }
  };

  const current = artifacts[selectedArtifact];

  // Mouse parallax tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  useEffect(() => {
    let animId;
    let t = 0;
    const loop = () => {
      t += 0.02;
      const targetRx = 20 - mousePos.y * 24;
      const targetRy = -15 + mousePos.x * 28 + (isRotating ? Math.sin(t * 0.7) * 4 : 0);
      setSmoothTilt((prev) => ({
        rx: prev.rx + (targetRx - prev.rx) * 0.08,
        ry: prev.ry + (targetRy - prev.ry) * 0.08,
      }));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, isRotating]);

  return (
    <section className="py-24 md:py-32 bg-[#0A140D] text-slate-100 border-b border-emerald-950 relative overflow-hidden select-none">
      
      {/* Background Topographic Watermark */}
      <div className="pointer-events-none absolute inset-0 opacity-15 overflow-hidden">
        <svg viewBox="0 0 1200 800" className="w-full h-full object-cover text-[#B6F076]" fill="none" stroke="currentColor">
          <ellipse cx="600" cy="400" rx="550" ry="260" strokeWidth="1.5" strokeDasharray="8 6" />
          <ellipse cx="600" cy="400" rx="460" ry="210" strokeWidth="1.2" />
          <ellipse cx="600" cy="400" rx="370" ry="160" strokeWidth="1.5" strokeDasharray="6 4" />
          <ellipse cx="600" cy="400" rx="280" ry="120" strokeWidth="1.8" />
          <ellipse cx="600" cy="400" rx="190" ry="80" strokeWidth="1.2" />
        </svg>

        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(182, 240, 118, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(182, 240, 118, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-950 border border-emerald-800 text-[#B6F076] mb-5">
            <Layers className="w-3.5 h-3.5" />
            <span>TOPOGRAPHIC CONTOUR ARTIFACTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12]">
            The physical building blocks of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B6F076] via-emerald-400 to-teal-300">
              lean manufacturing, decoded.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Inspired by Spade’s signature architectural contour illustrations, we turn complex physical manufacturing fixtures into precision-sliced digital telemetry.
          </p>
        </div>

        {/* 4 Interactive Selector Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {Object.keys(artifacts).map((key) => {
            const item = artifacts[key];
            const isSelected = selectedArtifact === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedArtifact(key)}
                className={`p-4 rounded-2xl border text-left font-mono transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-emerald-950/90 border-[#B6F076] shadow-[0_0_25px_rgba(182,240,118,0.25)] -translate-y-1'
                    : 'bg-[#0E1B13]/70 border-emerald-950 hover:border-emerald-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-[#B6F076]' : 'text-slate-500'}`}>
                    {item.number}
                  </span>
                  <span className="text-[10px] text-slate-500">{item.slices} Slices</span>
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm font-sans tracking-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {item.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Centerpiece 3D Interactive Stage */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="rounded-3xl border border-emerald-900/60 bg-[#08120A]/95 p-6 sm:p-10 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(5,20,10,0.6)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          {/* LEFT: 3D Topographic Contour Slices Render */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px] relative">
            
            {/* Ambient Spotlight */}
            <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-[#B6F076]/15 to-transparent blur-[80px] pointer-events-none" />

            {/* 3D Isometric Projection Box */}
            <div
              className="relative cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${smoothTilt.rx}deg) rotateY(${smoothTilt.ry}deg)`
              }}
            >
              <svg 
                viewBox="0 0 500 500" 
                className="w-[300px] sm:w-[400px] h-auto drop-shadow-2xl overflow-visible"
              >
                <defs>
                  <linearGradient id="slice-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1B3B26" />
                    <stop offset="50%" stopColor="#122619" />
                    <stop offset="100%" stopColor="#0B170F" />
                  </linearGradient>

                  <pattern id="cad-grid-pattern" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#B6F076" strokeWidth="0.75" strokeOpacity="0.25" />
                  </pattern>
                </defs>

                {/* Slices Generator based on current artifact */}
                {[...Array(current.slices)].map((_, sIdx) => {
                  const yOff = (current.slices - 1 - sIdx) * 14;
                  const scale = 1 - (current.slices - 1 - sIdx) * 0.025;
                  const isTop = sIdx === current.slices - 1;

                  return (
                    <g
                      key={sIdx}
                      transform={`translate(0, ${yOff}) scale(${scale})`}
                      style={{ transformOrigin: '250px 250px' }}
                      className="transition-all duration-300"
                      onMouseEnter={() => setActiveSlice(sIdx)}
                      onMouseLeave={() => setActiveSlice(null)}
                    >
                      {/* Outer Stepped Geometry */}
                      {selectedArtifact === 'gear' && (
                        <circle
                          cx="250"
                          cy="250"
                          r={160 - sIdx * 6}
                          fill={isTop ? 'url(#slice-dark-grad)' : '#0E2014'}
                          stroke="#B6F076"
                          strokeWidth={isTop ? "1.6" : "1"}
                          strokeOpacity={isTop ? "0.95" : "0.5"}
                        />
                      )}

                      {selectedArtifact === 'supermarket' && (
                        <rect
                          x={110 + sIdx * 5}
                          y={130 + sIdx * 5}
                          width={280 - sIdx * 10}
                          height={240 - sIdx * 10}
                          rx="24"
                          fill={isTop ? 'url(#slice-dark-grad)' : '#0E2014'}
                          stroke="#B6F076"
                          strokeWidth={isTop ? "1.6" : "1"}
                          strokeOpacity={isTop ? "0.95" : "0.5"}
                        />
                      )}

                      {selectedArtifact === 'robot' && (
                        <polygon
                          points={`250,${90 + sIdx * 6} ${390 - sIdx * 6},${350 - sIdx * 6} ${110 + sIdx * 6},${350 - sIdx * 6}`}
                          fill={isTop ? 'url(#slice-dark-grad)' : '#0E2014'}
                          stroke="#B6F076"
                          strokeWidth={isTop ? "1.6" : "1"}
                          strokeOpacity={isTop ? "0.95" : "0.5"}
                        />
                      )}

                      {selectedArtifact === 'andon' && (
                        <ellipse
                          cx="250"
                          cy="250"
                          rx={130 - sIdx * 6}
                          ry={180 - sIdx * 8}
                          fill={isTop ? 'url(#slice-dark-grad)' : '#0E2014'}
                          stroke="#B6F076"
                          strokeWidth={isTop ? "1.6" : "1"}
                          strokeOpacity={isTop ? "0.95" : "0.5"}
                        />
                      )}

                      {/* CAD Grid Hatching on top layer */}
                      {isTop && (
                        <circle
                          cx="250"
                          cy="250"
                          r="150"
                          fill="url(#cad-grid-pattern)"
                          pointerEvents="none"
                        />
                      )}

                      {/* Inner Topographic Rings */}
                      <circle cx="250" cy="250" r={90 - sIdx * 6} fill="none" stroke="#34D399" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.6" />
                      <circle cx="250" cy="250" r={45 - sIdx * 3} fill="#09140C" stroke="#B6F076" strokeWidth="1.2" />
                    </g>
                  );
                })}

                {/* Center Pulse Beacon */}
                <circle cx="250" cy="250" r="5" fill="#B6F076" />
                <circle cx="250" cy="250" r="14" fill="none" stroke="#B6F076" strokeWidth="1.5" className="animate-ping" />
              </svg>
            </div>

            {/* Floating CAD Slice Tag */}
            {activeSlice !== null && (
              <div className="absolute top-2 px-3 py-1 rounded-full bg-black/90 border border-emerald-700 text-[#B6F076] font-mono text-[11px] shadow-lg pointer-events-none">
                Slice Layer 0{activeSlice + 1} / 0{current.slices} • CAD Precision Elevation
              </div>
            )}

            {/* Rotation toggle */}
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="mt-4 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-slate-300 hover:text-white text-[11px] font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'text-[#B6F076]' : 'text-slate-500'}`} />
              <span>{isRotating ? '3D Orbit: Active' : '3D Orbit: Paused'}</span>
            </button>
          </div>

          {/* RIGHT: Technical Telemetry Specifications & Formula */}
          <div className="lg:col-span-5 space-y-4 text-left font-mono text-xs">
            
            {/* Monospace Code Pill */}
            <div className="p-3 rounded-xl bg-black/60 border border-emerald-900/60 text-[11px] text-[#B6F076]">
              {current.cadCode}
            </div>

            {/* Metric Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0F2015] border border-emerald-800/80">
                <span className="text-[10px] text-slate-400 block mb-1">FLOW PARAMETER</span>
                <span className="text-base font-bold text-white font-sans">{current.leadMetric}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0F2015] border border-emerald-800/80">
                <span className="text-[10px] text-slate-400 block mb-1">IMPACT DELTA</span>
                <span className="text-base font-bold text-[#B6F076] font-sans">{current.metricDelta}</span>
              </div>
            </div>

            {/* Mathematical Formula Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-emerald-950">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                MATHEMATICAL FOUNDATION
              </span>
              <div className="text-xs text-emerald-300 font-bold">
                {current.formula}
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              {current.description}
            </p>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenTrial({ mode: 'trial', plan: 'Professional' })}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#B6F076] hover:bg-[#a5e065] text-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                <span>Model {current.title} in Digital VSM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
