import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Pause, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Truck, 
  Building2, 
  Factory, 
  Sparkles, 
  Maximize2,
  ZoomIn,
  ZoomOut,
  Layers,
  ChevronRight
} from 'lucide-react';

export const AnimatedVsmCanvas = ({ onOpenTrial }) => {
  // Step 1 to 8
  const [step, setStep] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredStation, setHoveredStation] = useState(null);
  const [speed, setSpeed] = useState(1); // 1x or 1.5x
  const timerRef = useRef(null);

  // Animated KPI numbers that count up when step >= 7
  const [kpiCounts, setKpiCounts] = useState({
    takt: 120,
    leadTime: 13.2,
    vat: 337,
    pce: 0.12
  });

  // Choreographed step descriptions
  const stepMeta = [
    { num: 1, label: 'Nodes', desc: 'Supplier & Customer entities establish demand and boundary conditions.' },
    { num: 2, label: 'Processes', desc: 'Workstations populated with cycle time (C/T), changeover, and uptime data.' },
    { num: 3, label: 'Inventory', desc: 'WIP triangles quantified into days-of-supply between operations.' },
    { num: 4, label: 'Material Flow', desc: 'Physical push and pull routes drawn connecting workstations.' },
    { num: 5, label: 'Information', desc: 'Production Control, electronic signals (EDI), and scheduling lines linked.' },
    { num: 6, label: 'Timeline', desc: 'Classic Lean staircase ladder calculates value-added vs waiting time.' },
    { num: 7, label: 'KPIs', desc: 'Automated calculation of Takt Time, Total Lead Time, and Bottleneck.' },
    { num: 8, label: 'Interactive Live', desc: 'Complete digital Value Stream Map ready for analysis and simulation.' }
  ];

  // Play sequence controller
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = 1800 / speed;
      timerRef.current = setTimeout(() => {
        setStep((prev) => {
          if (prev >= 8) {
            setIsPlaying(false);
            return 8;
          }
          return prev + 1;
        });
      }, stepDuration);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, step, speed]);

  const handleReplay = () => {
    setStep(1);
    setIsPlaying(true);
  };

  const handleStepClick = (s) => {
    setIsPlaying(false);
    setStep(s);
  };

  // KPI count animation logic
  useEffect(() => {
    if (step >= 7) {
      let start = 0;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        setKpiCounts({
          takt: Math.round(120 * ease),
          leadTime: Math.round(13.2 * ease * 10) / 10,
          vat: Math.round(337 * ease),
          pce: Math.round(0.12 * ease * 100) / 100
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    } else {
      setKpiCounts({ takt: 0, leadTime: 0, vat: 0, pce: 0 });
    }
  }, [step]);

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-elevated overflow-hidden ring-1 ring-slate-900/[0.04]">
      
      {/* Top Application Ribbon */}
      <div className="bg-[#0B0F19] text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-200 tracking-tight">
              Machining &amp; Assembly Line — Current State Map
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
              {step === 8 ? 'Active Canvas' : `Building Phase ${step}/8`}
            </span>
          </div>
        </div>

        {/* Animation Scrubber & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700/60 text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-md text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
              title={isPlaying ? 'Pause animation' : 'Play animation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-blue-400" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play Sequence'}</span>
            </button>
            <button
              onClick={handleReplay}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="Replay sequence from Step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onOpenTrial({ mode: 'trial' })}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Mode</span>
          </button>
        </div>
      </div>

      {/* Step Sequence Scrubber Bar */}
      <div className="bg-slate-50/95 border-b border-slate-200/80 px-4 sm:px-6 py-2 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-max">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-2 hidden lg:inline">
            Sequence:
          </span>
          {stepMeta.map((s) => (
            <button
              key={s.num}
              onClick={() => handleStepClick(s.num)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                step === s.num
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : step > s.num
                    ? 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {s.num}. {s.label}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-500 font-mono hidden md:block pl-4">
          {stepMeta[step - 1]?.desc}
        </div>
      </div>

      {/* Real-time KPI Ribbon (Visible when step >= 7) */}
      <div className="bg-white border-b border-slate-200/60 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs transition-opacity duration-300">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Takt Time:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded border transition-all duration-300 ${
              step >= 7 ? 'text-slate-900 bg-slate-50 border-slate-200' : 'text-slate-300 bg-slate-50/50 border-transparent'
            }`}>
              {step >= 7 ? `${kpiCounts.takt} sec` : '—'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Production Lead Time:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded border transition-all duration-300 ${
              step >= 7 ? 'text-slate-900 bg-slate-50 border-slate-200' : 'text-slate-300 bg-slate-50/50 border-transparent'
            }`}>
              {step >= 7 ? `${kpiCounts.leadTime} Days` : '—'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Value-Added Time:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded border transition-all duration-300 ${
              step >= 7 ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' : 'text-slate-300 bg-slate-50/50 border-transparent'
            }`}>
              {step >= 7 ? `${kpiCounts.vat} sec (5.6 min)` : '—'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Process Cycle Efficiency:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded border transition-all duration-300 ${
              step >= 7 ? 'text-blue-700 bg-blue-50/50 border-blue-200' : 'text-slate-300 bg-slate-50/50 border-transparent'
            }`}>
              {step >= 7 ? `${kpiCounts.pce}%` : '—'}
            </span>
          </div>
        </div>

        {/* Bottleneck Warning Banner */}
        <div className={`transition-all duration-300 ${step >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-medium text-[11px] shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Bottleneck: Process 3 (142s &gt; 120s Takt)</span>
          </div>
        </div>
      </div>

      {/* Main Animated VSM Canvas Area */}
      <div className="p-4 sm:p-6 lg:p-8 bg-[#FCFCFD] overflow-x-auto relative min-h-[500px]">
        <div className="min-w-[960px] relative select-none">

          {/* SVG Overlay for Vector Material & Information Connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 960 480" fill="none">
            
            {/* STEP 5: Information Flow Lines (Production Control to Supplier & Customer) */}
            {step >= 5 && (
              <g className="transition-opacity duration-700">
                {/* Lightning Bolt line to Supplier */}
                <path
                  d="M 400 60 L 320 60 L 320 65 L 180 65"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-flow-dash"
                />
                <polygon points="175,65 185,61 185,69" fill="#3B82F6" />
                <text x="240" y="55" fill="#64748B" fontSize="10" fontFamily="monospace" fontWeight="500">
                  Weekly EDI Forecast
                </text>

                {/* Lightning Bolt line to Customer */}
                <path
                  d="M 560 60 L 640 60 L 640 65 L 780 65"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-flow-dash"
                />
                <polygon points="785,65 775,61 775,69" fill="#3B82F6" />
                <text x="660" y="55" fill="#64748B" fontSize="10" fontFamily="monospace" fontWeight="500">
                  Daily Orders (EDI)
                </text>

                {/* Scheduling Arrows down from Production Control to Workstations */}
                <path
                  d="M 480 90 L 480 185"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                />
                <polygon points="480,190 476,182 484,182" fill="#0F172A" />
                <text x="490" y="140" fill="#0F172A" fontSize="9" fontWeight="600">
                  Daily Kanban Dispatch
                </text>
              </g>
            )}

            {/* STEP 4: Material Flow Connectors (Progressive Draw) */}
            {step >= 4 && (
              <g className="transition-opacity duration-700">
                {/* Truck to Buffer 1 */}
                <path d="M 85 240 L 125 240" stroke="#94A3B8" strokeWidth="2.5" />
                <polygon points="128,240 120,236 120,244" fill="#94A3B8" />

                {/* Buffer 1 to Process 1 */}
                <path d="M 215 240 L 255 240" stroke="#94A3B8" strokeWidth="2.5" />
                <polygon points="258,240 250,236 250,244" fill="#94A3B8" />

                {/* Process 1 to Buffer 2 */}
                <path d="M 395 240 L 435 240" stroke="#94A3B8" strokeWidth="2.5" />
                <polygon points="438,240 430,236 430,244" fill="#94A3B8" />

                {/* Buffer 2 to Process 2 */}
                <path d="M 525 240 L 565 240" stroke="#94A3B8" strokeWidth="2.5" />
                <polygon points="568,240 560,236 560,244" fill="#94A3B8" />

                {/* Process 2 to Buffer 3 */}
                <path d="M 705 240 L 745 240" stroke="#94A3B8" strokeWidth="2.5" />
                <polygon points="748,240 740,236 740,244" fill="#94A3B8" />

                {/* Buffer 3 to Process 3 */}
                <path d="M 835 240 L 870 240" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="3 3" />
                <polygon points="873,240 865,236 865,244" fill="#EF4444" />
              </g>
            )}
          </svg>

          {/* LAYER 1: Top Boundary Nodes (Supplier, Production Control, Customer) */}
          <div className="grid grid-cols-12 gap-4 items-center pb-8 border-b border-dashed border-slate-200">
            
            {/* Supplier Node (Step >= 1) */}
            <div className={`col-span-3 transition-all duration-500 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs mb-1">
                  <div className="p-1 rounded-md bg-blue-50 text-blue-600">
                    <Factory className="w-4 h-4" />
                  </div>
                  <span>Supplier: Apex Alloys</span>
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <p>Raw Forgings • 500 pcs/batch</p>
                  <p className="text-slate-400 font-mono">Lead Time: 14 Days (Shipment)</p>
                </div>
              </div>
            </div>

            {/* Gap for Info line */}
            <div className="col-span-1" />

            {/* Production Control Node (Step >= 5) */}
            <div className={`col-span-4 transition-all duration-500 ${
              step >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="bg-[#0B0F19] text-white p-4 rounded-xl border border-slate-800 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span>Production Planning &amp; MRP</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-blue-300 px-2 py-0.5 rounded font-mono font-medium">
                    Daily Schedule
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-800 font-mono">
                  <div>Customer: 450 pcs/day</div>
                  <div>Shift: 15.0 hrs (2 shifts)</div>
                </div>
              </div>
            </div>

            {/* Gap for Info line */}
            <div className="col-span-1" />

            {/* Customer Node (Step >= 1) */}
            <div className={`col-span-3 transition-all duration-500 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs mb-1">
                  <div className="p-1 rounded-md bg-emerald-50 text-emerald-600">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span>Customer: Automotive OEM</span>
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <p className="font-semibold text-slate-800">450 units / day</p>
                  <p className="text-slate-400 font-mono">Takt Time: 120s (Available: 54,000s)</p>
                </div>
              </div>
            </div>

          </div>

          {/* LAYER 2: Material Flow Line with Workstations & Inventory */}
          <div className="pt-8 pb-6 flex items-start justify-between gap-2">
            
            {/* Inbound Shipping Truck (Step >= 4) */}
            <div className={`flex flex-col items-center shrink-0 w-16 pt-6 transition-all duration-500 ${
              step >= 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-slate-500 mt-1.5 font-medium">Inbound</span>
            </div>

            {/* Buffer 1: Raw Material Inventory (Step >= 3) */}
            <div className={`flex flex-col items-center shrink-0 w-24 transition-all duration-500 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}>
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-amber-100 border-b-solid" />
                <span className="absolute font-bold text-[11px] text-amber-900 top-2.5">I</span>
              </div>
              <div className="text-center mt-1 bg-amber-50/90 px-2 py-1 rounded border border-amber-200 text-[10px] font-mono text-amber-900 shadow-2xs">
                2,025 pcs<br />
                <strong className="text-slate-700">4.5 Days</strong>
              </div>
            </div>

            {/* Process 1: CNC Machining (Step >= 2) */}
            <div 
              onMouseEnter={() => setHoveredStation('p1')}
              onMouseLeave={() => setHoveredStation(null)}
              className={`flex-1 min-w-[180px] bg-white rounded-xl border transition-all duration-500 ${
                step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              } ${hoveredStation === 'p1' ? 'border-blue-500 ring-2 ring-blue-100 shadow-md' : 'border-slate-200 shadow-2xs'}`}
            >
              <div className="bg-slate-50 px-3 py-1.5 rounded-t-xl border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">1. CNC Machining</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-mono">1 Op</span>
              </div>
              <div className="p-3 text-[11px] space-y-1 font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Cycle Time (C/T):</span>
                  <span className="font-semibold text-slate-900">85s</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Changeover (C/O):</span>
                  <span className="font-semibold text-slate-900">45m</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Uptime:</span>
                  <span className="font-semibold text-emerald-600">94%</span>
                </div>
              </div>
            </div>

            {/* Buffer 2: Intermediate Inventory (Step >= 3) */}
            <div className={`flex flex-col items-center shrink-0 w-24 transition-all duration-500 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}>
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-amber-100 border-b-solid" />
                <span className="absolute font-bold text-[11px] text-amber-900 top-2.5">I</span>
              </div>
              <div className="text-center mt-1 bg-amber-50/90 px-2 py-1 rounded border border-amber-200 text-[10px] font-mono text-amber-900 shadow-2xs">
                1,260 pcs<br />
                <strong className="text-slate-700">2.8 Days</strong>
              </div>
            </div>

            {/* Process 2: Heat Treatment & Wash (Step >= 2) */}
            <div 
              onMouseEnter={() => setHoveredStation('p2')}
              onMouseLeave={() => setHoveredStation(null)}
              className={`flex-1 min-w-[180px] bg-white rounded-xl border transition-all duration-500 ${
                step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              } ${hoveredStation === 'p2' ? 'border-blue-500 ring-2 ring-blue-100 shadow-md' : 'border-slate-200 shadow-2xs'}`}
            >
              <div className="bg-slate-50 px-3 py-1.5 rounded-t-xl border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">2. Heat &amp; Wash</span>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-mono">1 Op</span>
              </div>
              <div className="p-3 text-[11px] space-y-1 font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Cycle Time (C/T):</span>
                  <span className="font-semibold text-slate-900">110s</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Changeover (C/O):</span>
                  <span className="font-semibold text-slate-900">60m</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Uptime:</span>
                  <span className="font-semibold text-emerald-600">98%</span>
                </div>
              </div>
            </div>

            {/* Buffer 3: Pre-Assembly WIP Queue (Bottleneck Buffer) (Step >= 3) */}
            <div className={`flex flex-col items-center shrink-0 w-24 transition-all duration-500 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}>
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-rose-200 border-b-solid" />
                <span className="absolute font-bold text-[11px] text-rose-900 top-2.5">!</span>
              </div>
              <div className="text-center mt-1 bg-rose-50 px-2 py-1 rounded border border-rose-200 text-[10px] font-mono text-rose-800 shadow-2xs">
                1,530 pcs<br />
                <strong className="text-rose-700 font-bold">3.4 Days WIP</strong>
              </div>
            </div>

            {/* Process 3: Assembly & Testing (The Bottleneck) (Step >= 2) */}
            <div 
              onMouseEnter={() => setHoveredStation('p3')}
              onMouseLeave={() => setHoveredStation(null)}
              className={`flex-1 min-w-[180px] bg-white rounded-xl border transition-all duration-500 ${
                step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              } ${
                step >= 7 
                  ? 'border-rose-400 ring-2 ring-rose-100 shadow-md bg-rose-50/20' 
                  : 'border-slate-200 shadow-2xs'
              }`}
            >
              <div className="bg-rose-50/80 px-3 py-1.5 rounded-t-xl border-b border-rose-200 flex items-center justify-between">
                <span className="font-bold text-xs text-rose-950 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  3. Assembly &amp; Test
                </span>
                <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded font-mono font-bold">2 Op</span>
              </div>
              <div className="p-3 text-[11px] space-y-1 font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Cycle Time (C/T):</span>
                  <span className="font-bold text-rose-600">142s &gt; Takt</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Changeover (C/O):</span>
                  <span className="font-semibold text-slate-900">15m</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Uptime:</span>
                  <span className="font-semibold text-amber-700">89%</span>
                </div>
              </div>
            </div>

            {/* Buffer 4: Finished Goods (Step >= 3) */}
            <div className={`flex flex-col items-center shrink-0 w-24 transition-all duration-500 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}>
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-amber-100 border-b-solid" />
                <span className="absolute font-bold text-[11px] text-amber-900 top-2.5">I</span>
              </div>
              <div className="text-center mt-1 bg-amber-50/90 px-2 py-1 rounded border border-amber-200 text-[10px] font-mono text-amber-900 shadow-2xs">
                1,125 pcs<br />
                <strong className="text-slate-700">2.5 Days</strong>
              </div>
            </div>

            {/* Outbound Daily Truck (Step >= 4) */}
            <div className={`flex flex-col items-center shrink-0 w-16 pt-6 transition-all duration-500 ${
              step >= 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-slate-500 mt-1.5 font-medium">Daily</span>
            </div>

          </div>

          {/* LAYER 3: Lean VSM Timeline Ladder (Step >= 6) */}
          <div className={`mt-6 pt-5 border-t border-slate-200 transition-all duration-700 ${
            step >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Automated Lean VSM Timeline Ladder
              </span>
              <span className="font-mono text-slate-500">
                Lead Time = <strong className="text-slate-900">13.2 Days</strong> | Value-Added Time = <strong className="text-emerald-700">337 Seconds</strong>
              </span>
            </div>

            {/* Step Ladder Visual Representation */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs shadow-2xs">
              <div className="grid grid-cols-7 gap-1.5 text-center">
                
                {/* Upper step 1: Raw Wait */}
                <div className="border-b-2 border-slate-400 pb-1.5">
                  <span className="text-slate-800 font-bold">4.5 Days</span>
                  <span className="block text-[10px] text-slate-500 font-sans">Raw Buffer</span>
                </div>

                {/* Lower step 1: Machining VAT */}
                <div className="border-t-2 border-emerald-600 pt-1.5 bg-emerald-50/40 rounded-b">
                  <span className="text-emerald-700 font-bold">85 sec</span>
                  <span className="block text-[10px] text-emerald-600 font-sans font-medium">CNC Machining</span>
                </div>

                {/* Upper step 2: Heat Treat Wait */}
                <div className="border-b-2 border-slate-400 pb-1.5">
                  <span className="text-slate-800 font-bold">2.8 Days</span>
                  <span className="block text-[10px] text-slate-500 font-sans">Queue Buffer</span>
                </div>

                {/* Lower step 2: Heat/Wash VAT */}
                <div className="border-t-2 border-emerald-600 pt-1.5 bg-emerald-50/40 rounded-b">
                  <span className="text-emerald-700 font-bold">110 sec</span>
                  <span className="block text-[10px] text-emerald-600 font-sans font-medium">Heat &amp; Wash</span>
                </div>

                {/* Upper step 3: Bottleneck Wait */}
                <div className="border-b-2 border-rose-500 pb-1.5 bg-rose-50/50 rounded-t">
                  <span className="text-rose-700 font-bold">3.4 Days</span>
                  <span className="block text-[10px] text-rose-600 font-sans font-bold">Excess WIP</span>
                </div>

                {/* Lower step 3: Assembly VAT (Over Takt) */}
                <div className="border-t-2 border-rose-600 pt-1.5 bg-rose-50/60 rounded-b">
                  <span className="text-rose-700 font-bold">142 sec</span>
                  <span className="block text-[10px] text-rose-600 font-sans font-bold">Assembly (&gt; Takt)</span>
                </div>

                {/* Upper step 4: FG Wait */}
                <div className="border-b-2 border-slate-400 pb-1.5">
                  <span className="text-slate-800 font-bold">2.5 Days</span>
                  <span className="block text-[10px] text-slate-500 font-sans">Finished Goods</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Strip */}
      <div className="bg-slate-50/80 px-4 sm:px-6 py-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Standard Lean Symbols
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Automatic Takt &amp; PCE
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Instant Bottleneck Detection
          </span>
        </div>

        <button
          onClick={() => onOpenTrial({ mode: 'trial' })}
          className="font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors"
        >
          <span>Launch Full Interactive Canvas</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
