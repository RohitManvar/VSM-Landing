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
  ChevronRight,
  Info,
  Sliders,
  Zap,
  HelpCircle
} from 'lucide-react';

export const InteractiveVSM = ({ onOpenTrial }) => {
  const [step, setStep] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredStation, setHoveredStation] = useState(null); // 'p1' | 'p2' | 'p3' | 'b1' | 'b2' | 'b3' | 'b4'
  const [pinnedStation, setPinnedStation] = useState('p3'); // default focus on the bottleneck!
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const activeFocus = hoveredStation || pinnedStation;

  // Station Telemetry Data
  const stationData = {
    p1: {
      id: 'p1',
      name: '1. CNC Machining',
      short: 'Machining',
      cycleTime: '85s',
      taktRatio: '71% of Takt',
      changeover: '45m',
      uptime: '94%',
      operators: '1 Op',
      wipUpstream: '4.5 Days (Buffer 1)',
      wipDownstream: '2.8 Days (Buffer 2)',
      status: 'balanced',
      statusText: 'Optimal Balance',
      statusColor: 'emerald',
      notes: 'Station runs within takt. Changeover batch sized to 500 pcs.'
    },
    p2: {
      id: 'p2',
      name: '2. Heat Treatment & Wash',
      short: 'Heat & Wash',
      cycleTime: '110s',
      taktRatio: '92% of Takt',
      changeover: '60m',
      uptime: '98%',
      operators: '1 Op',
      wipUpstream: '2.8 Days (Buffer 2)',
      wipDownstream: '3.4 Days (Buffer 3)',
      status: 'balanced',
      statusText: 'Near Capacity',
      statusColor: 'blue',
      notes: 'Operating near takt limit. Batch annealing queue requires pull supermarket.'
    },
    p3: {
      id: 'p3',
      name: '3. Final Assembly & Inspection',
      short: 'Assembly',
      cycleTime: '142s',
      taktRatio: '118% of Takt',
      changeover: '15m',
      uptime: '89%',
      operators: '2 Op',
      wipUpstream: '3.4 Days (Buffer 3)',
      wipDownstream: '2.5 Days (Buffer 4)',
      status: 'bottleneck',
      statusText: 'Bottleneck Active',
      statusColor: 'rose',
      notes: 'Station cycle time (142s) exceeds 120s takt time. Causes 3.4 days queue.'
    }
  };

  const activeTelemetry = stationData[activeFocus] || stationData.p3;

  // Sequence controller
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setStep((prev) => {
          if (prev >= 8) {
            setIsPlaying(false);
            return 8;
          }
          return prev + 1;
        });
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, step]);

  return (
    <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-elevated overflow-hidden ring-1 ring-slate-900/[0.04]">
      
      {/* Top Application Bar */}
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
              Machining &amp; Assembly Line — Interactive VSM
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
              Hover to Inspect
            </span>
          </div>
        </div>

        {/* Playback & Inspection Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700/60 text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-md text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-blue-400" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play Sequence'}</span>
            </button>
            <button
              onClick={() => { setStep(1); setIsPlaying(true); }}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="Replay sequence"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onOpenTrial({ mode: 'trial' })}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
        </div>
      </div>

      {/* Interactive Process Inspection HUD Ribbon */}
      <div className="bg-slate-50/95 border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Inspecting:
          </span>
          <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
            {activeTelemetry.name}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
            activeTelemetry.status === 'bottleneck'
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            {activeTelemetry.statusText}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 font-sans">Cycle Time: </span>
            <strong className={activeTelemetry.status === 'bottleneck' ? 'text-rose-600' : 'text-slate-900'}>
              {activeTelemetry.cycleTime}
            </strong>
          </div>
          <div>
            <span className="text-slate-500 font-sans">Takt Match: </span>
            <strong className="text-slate-800">{activeTelemetry.taktRatio}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-sans">Changeover: </span>
            <strong className="text-slate-800">{activeTelemetry.changeover}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-sans">Uptime: </span>
            <strong className="text-emerald-700">{activeTelemetry.uptime}</strong>
          </div>
        </div>
      </div>

      {/* Interactive VSM Canvas Area */}
      <div className="p-4 sm:p-6 lg:p-8 bg-[#FCFCFD] overflow-x-auto relative min-h-[490px]">
        <div className="min-w-[960px] relative select-none">
          
          {/* Dynamic Vector Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 960 480" fill="none">
            {/* Information Flow to Supplier and Customer */}
            <path
              d="M 400 60 L 320 60 L 320 65 L 180 65"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-flow-dash"
            />
            <polygon points="175,65 185,61 185,69" fill="#3B82F6" />

            <path
              d="M 560 60 L 640 60 L 640 65 L 780 65"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-flow-dash"
            />
            <polygon points="785,65 775,61 775,69" fill="#3B82F6" />

            {/* Downward Kanban dispatch lines */}
            <path d="M 480 90 L 480 185" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="2 3" />
            <polygon points="480,190 476,182 484,182" fill="#0F172A" />

            {/* Material Flow Paths with Dynamic Highlights based on activeFocus */}
            <path 
              d="M 85 240 L 125 240" 
              stroke="#94A3B8" 
              strokeWidth="2.5" 
            />
            <path 
              d="M 215 240 L 255 240" 
              stroke={activeFocus === 'p1' ? '#2563EB' : '#94A3B8'} 
              strokeWidth={activeFocus === 'p1' ? '3.5' : '2.5'} 
              className={activeFocus === 'p1' ? 'animate-pulse' : ''}
            />
            <path 
              d="M 395 240 L 435 240" 
              stroke={activeFocus === 'p1' || activeFocus === 'p2' ? '#2563EB' : '#94A3B8'} 
              strokeWidth={activeFocus === 'p1' || activeFocus === 'p2' ? '3.5' : '2.5'} 
            />
            <path 
              d="M 525 240 L 565 240" 
              stroke={activeFocus === 'p2' ? '#2563EB' : '#94A3B8'} 
              strokeWidth={activeFocus === 'p2' ? '3.5' : '2.5'} 
            />
            <path 
              d="M 705 240 L 745 240" 
              stroke={activeFocus === 'p3' ? '#EF4444' : '#94A3B8'} 
              strokeWidth={activeFocus === 'p3' ? '3.5' : '2.5'} 
            />
            <path 
              d="M 835 240 L 870 240" 
              stroke="#EF4444" 
              strokeWidth="2.5" 
              strokeDasharray="3 3" 
            />
          </svg>

          {/* Top Layer: Boundary Nodes */}
          <div className="grid grid-cols-12 gap-4 items-center pb-8 border-b border-dashed border-slate-200">
            {/* Supplier */}
            <div className="col-span-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
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

            <div className="col-span-1" />

            {/* Production Control */}
            <div className="col-span-4 bg-[#0B0F19] text-white p-4 rounded-xl border border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>Production Planning &amp; MRP</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-blue-300 px-2 py-0.5 rounded font-mono font-medium">
                  Daily Schedule
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1.5 border-t border-slate-800 font-mono">
                <div>Customer: 450 pcs/day</div>
                <div>Shift: 15.0 hrs (2 shifts)</div>
              </div>
            </div>

            <div className="col-span-1" />

            {/* Customer */}
            <div className="col-span-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
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

          {/* Middle Layer: Material Flow with Interactive Hover Highlights */}
          <div className="pt-8 pb-6 flex items-start justify-between gap-2">
            
            {/* Inbound Truck */}
            <div className="flex flex-col items-center shrink-0 w-16 pt-6">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-slate-500 mt-1.5 font-medium">Inbound</span>
            </div>

            {/* Buffer 1 */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className={`w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-solid transition-colors ${
                  activeFocus === 'p1' ? 'border-b-blue-200' : 'border-b-amber-100'
                }`} />
                <span className="absolute font-bold text-[11px] text-amber-900 top-2.5">I</span>
              </div>
              <div className={`text-center mt-1 px-2 py-1 rounded border text-[10px] font-mono shadow-2xs transition-colors ${
                activeFocus === 'p1' ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' : 'bg-amber-50/90 border-amber-200 text-amber-900'
              }`}>
                2,025 pcs<br />
                <strong className="text-slate-700">4.5 Days</strong>
              </div>
            </div>

            {/* PROCESS 1: CNC Machining */}
            <div 
              onMouseEnter={() => setHoveredStation('p1')}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => setPinnedStation('p1')}
              className={`flex-1 min-w-[180px] bg-white rounded-xl border transition-all duration-200 cursor-pointer ${
                activeFocus === 'p1' 
                  ? 'border-blue-600 ring-4 ring-blue-50 shadow-elevated scale-[1.02] -translate-y-1' 
                  : 'border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className={`px-3 py-1.5 rounded-t-xl border-b flex items-center justify-between transition-colors ${
                activeFocus === 'p1' ? 'bg-blue-50/80 border-blue-200 text-blue-950' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}>
                <span className="font-bold text-xs">1. CNC Machining</span>
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

            {/* Buffer 2 */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className={`w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-solid transition-colors ${
                  activeFocus === 'p2' ? 'border-b-blue-200' : 'border-b-amber-100'
                }`} />
                <span className="absolute font-bold text-[11px] text-amber-900 top-2.5">I</span>
              </div>
              <div className={`text-center mt-1 px-2 py-1 rounded border text-[10px] font-mono shadow-2xs transition-colors ${
                activeFocus === 'p2' ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold' : 'bg-amber-50/90 border-amber-200 text-amber-900'
              }`}>
                1,260 pcs<br />
                <strong className="text-slate-700">2.8 Days</strong>
              </div>
            </div>

            {/* PROCESS 2: Heat Treatment & Wash */}
            <div 
              onMouseEnter={() => setHoveredStation('p2')}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => setPinnedStation('p2')}
              className={`flex-1 min-w-[180px] bg-white rounded-xl border transition-all duration-200 cursor-pointer ${
                activeFocus === 'p2' 
                  ? 'border-blue-600 ring-4 ring-blue-50 shadow-elevated scale-[1.02] -translate-y-1' 
                  : 'border-slate-200 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className={`px-3 py-1.5 rounded-t-xl border-b flex items-center justify-between transition-colors ${
                activeFocus === 'p2' ? 'bg-blue-50/80 border-blue-200 text-blue-950' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}>
                <span className="font-bold text-xs">2. Heat &amp; Wash</span>
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

            {/* Buffer 3: Pre-Assembly Queue (Bottleneck Buffer) */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-rose-200 border-b-solid" />
                <span className="absolute font-bold text-[11px] text-rose-900 top-2.5">!</span>
              </div>
              <div className={`text-center mt-1 px-2 py-1 rounded border text-[10px] font-mono shadow-2xs transition-colors ${
                activeFocus === 'p3' ? 'bg-rose-100 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-200' : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}>
                1,530 pcs<br />
                <strong className="text-rose-700 font-bold">3.4 Days WIP</strong>
              </div>
            </div>

            {/* PROCESS 3: Assembly & Test (Active Bottleneck) */}
            <div 
              onMouseEnter={() => setHoveredStation('p3')}
              onMouseLeave={() => setHoveredStation(null)}
              onClick={() => setPinnedStation('p3')}
              className={`flex-1 min-w-[180px] bg-white rounded-xl border transition-all duration-200 cursor-pointer ${
                activeFocus === 'p3' 
                  ? 'border-rose-500 ring-4 ring-rose-100 shadow-elevated scale-[1.02] -translate-y-1 bg-rose-50/20' 
                  : 'border-rose-300 shadow-2xs hover:border-rose-400'
              }`}
            >
              <div className="bg-rose-50/90 px-3 py-1.5 rounded-t-xl border-b border-rose-200 flex items-center justify-between">
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

            {/* Buffer 4: Finished Goods */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-11 h-10 relative flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-amber-100 border-b-solid" />
                <span className="absolute font-bold text-[11px] text-amber-900 top-2.5">I</span>
              </div>
              <div className="text-center mt-1 bg-amber-50/90 px-2 py-1 rounded border border-amber-200 text-[10px] font-mono text-amber-900 shadow-2xs">
                1,125 pcs<br />
                <strong className="text-slate-700">2.5 Days</strong>
              </div>
            </div>

            {/* Outbound Daily Truck */}
            <div className="flex flex-col items-center shrink-0 w-16 pt-6">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-slate-500 mt-1.5 font-medium">Daily</span>
            </div>

          </div>

          {/* Bottom Layer: Timeline Ladder */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Lean VSM Production Timeline Ladder
              </span>
              <span className="font-mono text-slate-500">
                Lead Time = <strong className="text-slate-900">13.2 Days</strong> | Value-Added Time = <strong className="text-emerald-700">337 Seconds</strong>
              </span>
            </div>

            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs shadow-2xs">
              <div className="grid grid-cols-7 gap-1.5 text-center">
                <div className="border-b-2 border-slate-400 pb-1.5">
                  <span className="text-slate-800 font-bold">4.5 Days</span>
                  <span className="block text-[10px] text-slate-500 font-sans">Raw Buffer</span>
                </div>
                <div className={`border-t-2 pt-1.5 rounded-b transition-colors ${
                  activeFocus === 'p1' ? 'border-blue-600 bg-blue-100/60 font-bold text-blue-900' : 'border-emerald-600 bg-emerald-50/40 text-emerald-700'
                }`}>
                  <span>85 sec</span>
                  <span className="block text-[10px] font-sans font-medium">Machining</span>
                </div>
                <div className="border-b-2 border-slate-400 pb-1.5">
                  <span className="text-slate-800 font-bold">2.8 Days</span>
                  <span className="block text-[10px] text-slate-500 font-sans">Queue Buffer</span>
                </div>
                <div className={`border-t-2 pt-1.5 rounded-b transition-colors ${
                  activeFocus === 'p2' ? 'border-blue-600 bg-blue-100/60 font-bold text-blue-900' : 'border-emerald-600 bg-emerald-50/40 text-emerald-700'
                }`}>
                  <span>110 sec</span>
                  <span className="block text-[10px] font-sans font-medium">Heat/Wash</span>
                </div>
                <div className="border-b-2 border-rose-500 pb-1.5 bg-rose-50/50 rounded-t">
                  <span className="text-rose-700 font-bold">3.4 Days</span>
                  <span className="block text-[10px] text-rose-600 font-sans font-bold">Excess WIP</span>
                </div>
                <div className={`border-t-2 pt-1.5 rounded-b transition-colors ${
                  activeFocus === 'p3' ? 'border-rose-600 bg-rose-100/80 font-bold text-rose-900 ring-2 ring-rose-200' : 'border-rose-600 bg-rose-50/60 text-rose-700'
                }`}>
                  <span>142 sec</span>
                  <span className="block text-[10px] font-sans font-bold">Assembly (&gt; Takt)</span>
                </div>
                <div className="border-b-2 border-slate-400 pb-1.5">
                  <span className="text-slate-800 font-bold">2.5 Days</span>
                  <span className="block text-[10px] text-slate-500 font-sans">Finished Goods</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="bg-slate-50/90 px-4 sm:px-6 py-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Click or hover on any station to view cycle time, changeover, and WIP telemetry.</span>
        </div>
        <button
          onClick={() => onOpenTrial({ mode: 'trial' })}
          className="font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors"
        >
          <span>Launch Interactive VSM Editor</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
