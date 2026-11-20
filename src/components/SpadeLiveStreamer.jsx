import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw,
  Sliders,
  Flame,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

export const SpadeLiveStreamer = ({ onOpenTrial }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [streamSpeed, setStreamSpeed] = useState(1); // 1x or 2x
  const [activeFilter, setActiveFilter] = useState('all');
  const [injectedSpike, setInjectedSpike] = useState(false);
  const [processedCount, setProcessedCount] = useState(14820);

  // Auto-increment telemetry count
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProcessedCount((prev) => prev + (injectedSpike ? 8 : 3));
    }, 1000 / streamSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, streamSpeed, injectedSpike]);

  // Raw incoming shop-floor telemetry queue (The Spade Cryptic Strings)
  const rawEvents = [
    {
      id: 'e1',
      source: 'PLC_L1_STN03',
      type: 'CYCLE_EXCEED',
      time: '09:44:12.108',
      rawText: 'CYCLE_TIME: 142.4s > TAKT: 120s (+18.6% SKEW) [STN-03_LASER]',
      status: 'error',
      severity: 'CRITICAL',
      station: 'Laser Weld Cell #03',
      wipImpact: '+3.4 Days Queue'
    },
    {
      id: 'e2',
      source: 'MES_BATCH_PUSH',
      type: 'BATCH_OVERLOAD',
      time: '09:44:13.442',
      rawText: 'ERP_WO_#8841: PUSH_BATCH: 5,000pcs (BUFFER CLOG STN-02)',
      status: 'warning',
      severity: 'HIGH',
      station: 'Annealing Furnace',
      wipImpact: '+1,850 pcs Unneeded WIP'
    },
    {
      id: 'e3',
      source: 'ANDON_ALERT',
      type: 'CHANGEOVER_SPIKE',
      time: '09:44:15.820',
      rawText: 'SMED_EXCEED: DIE_CHANGE_DOWNTIME = 52min (TARGET: 10min)',
      status: 'warning',
      severity: 'MEDIUM',
      station: '500T Stamping Press',
      wipImpact: 'Downstream Starvation'
    },
    {
      id: 'e4',
      source: 'OPC_UA_LINE02',
      type: 'DEFECT_REWORK',
      time: '09:44:17.204',
      rawText: 'INSPECT_FAIL: 14 pcs REJECTED @ AOI (RETEST LOOP TRAPPED)',
      status: 'error',
      severity: 'HIGH',
      station: '3D Optical AOI',
      wipImpact: '+45min Rework Delay'
    }
  ];

  // Enriched, structured output stream (The Spade Verified Cards)
  const enrichedCards = [
    {
      id: 'c1',
      pacemaker: 'CELL_03 // LASER WELD PACEMAKER',
      action: 'TAKT SYNCHRONIZED',
      cycleTime: '108s / 120s (90% Buffer)',
      leadTimeDelta: '-8.4 Days PLT',
      capitalFreed: '+$380,000 Free Cash',
      kaizenRule: 'Offload non-value deburr to Station 04',
      tag: 'PACEMAKER BALANCED',
      tagColor: 'emerald'
    },
    {
      id: 'c2',
      pacemaker: 'BUFFER_02 // KANBAN SUPERMARKET',
      action: 'PULL DECOUPLING ACTIVE',
      cycleTime: 'FIFO Lane Cap: 120 units',
      leadTimeDelta: '-3.2 Days Queue',
      capitalFreed: '+$190,000 Inventory Cut',
      kaizenRule: 'Replace push batch with 2-bin pull trigger',
      tag: 'WIP CONSTRAINED',
      tagColor: 'blue'
    },
    {
      id: 'c3',
      pacemaker: 'STN_01 // HIGH-SPEED STAMPING',
      action: 'SMED OPTIMIZATION APPLIED',
      cycleTime: 'Changeover: 9.4m (was 52m)',
      leadTimeDelta: '+34% Line Availability',
      capitalFreed: '+$240,000 Output Capacity',
      kaizenRule: 'Pre-heat die externalized; single-turn bolts',
      tag: 'FLOW ACCELERATED',
      tagColor: 'emerald'
    }
  ];

  const handleTriggerSpike = () => {
    setInjectedSpike(true);
    setTimeout(() => {
      setInjectedSpike(false);
    }, 4000);
  };

  return (
    <section className="py-20 md:py-28 bg-[#070D08] text-slate-100 border-b border-emerald-950 relative overflow-hidden select-none">
      
      {/* 1. TOPOGRAPHIC CONTOUR WATERMARK (Spade Aesthetic) */}
      <div className="pointer-events-none absolute inset-0 opacity-10 overflow-hidden">
        <svg 
          viewBox="0 0 1440 900" 
          className="w-full h-full object-cover text-[#B6F076]" 
          fill="none" 
          stroke="currentColor"
        >
          <path d="M-200 300 C 200 200, 600 500, 1000 350 C 1300 250, 1600 400, 1800 300" strokeWidth="1.5" strokeDasharray="6 4" />
          <path d="M-200 400 C 220 300, 620 600, 1020 450 C 1320 350, 1620 500, 1800 400" strokeWidth="1.8" />
          <path d="M-200 500 C 240 400, 640 700, 1040 550 C 1340 450, 1640 600, 1800 500" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M-200 600 C 260 500, 660 800, 1060 650 C 1360 550, 1660 700, 1800 600" strokeWidth="2" />
        </svg>

        {/* CAD Grid Mesh */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(182, 240, 118, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(182, 240, 118, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-950/80 border border-emerald-800/80 text-[#B6F076] mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B6F076] animate-pulse" />
            <span>CONTINUOUS SHOP-FLOOR TELEMETRY INGESTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.12]">
            Watch raw plant chaos transform into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B6F076] via-emerald-400 to-teal-300">
              synchronized flow in real time.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Just like Spade enriches messy credit card POS strings into structured merchant identities, VSM Cloud enriches noisy PLC and MES signals into mathematically balanced lean value streams.
          </p>
        </div>

        {/* Top Control Bar (Spade Style Controls) */}
        <div className="mb-6 p-3 rounded-2xl bg-black/60 border border-emerald-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          
          {/* Left: Stream Velocity & Telemetry Counters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-[#B6F076] animate-ping' : 'bg-amber-400'}`} />
              <span>STATUS: <strong className={isPlaying ? 'text-[#B6F076]' : 'text-amber-400'}>{isPlaying ? 'STREAMING LIVE' : 'STREAM PAUSED'}</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <span>EVENTS_ENRICHED: <strong className="text-white">{processedCount.toLocaleString()}</strong></span>
              <span>•</span>
              <span>LATENCY: <strong className="text-[#B6F076]">8.2ms</strong></span>
            </div>
          </div>

          {/* Right: Interactive Simulator Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800 hover:border-emerald-600 text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-[#B6F076]" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => setStreamSpeed(streamSpeed === 1 ? 2 : 1)}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800 hover:border-emerald-600 text-slate-200 hover:text-white cursor-pointer transition-colors"
            >
              Speed: {streamSpeed}x
            </button>

            <button
              onClick={handleTriggerSpike}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                injectedSpike 
                  ? 'bg-rose-600 text-white animate-pulse' 
                  : 'bg-emerald-900/80 hover:bg-emerald-800 text-[#B6F076] border border-[#B6F076]/40'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{injectedSpike ? 'Spike Active (+35% Skew)' : 'Inject Demand Spike'}</span>
            </button>
          </div>

        </div>

        {/* MAIN SPLIT STREAMING CONDUIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT COLUMN: RAW FRAGMENTED SIGNALS (Before) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                RAW SHOP-FLOOR TELEMETRY (MES / PLC)
              </span>
              <span className="text-[10px] text-slate-500">FORMAT: UNSTRUCTURED</span>
            </div>

            <div className="space-y-3">
              {rawEvents.map((evt, idx) => (
                <div 
                  key={evt.id}
                  className={`p-3.5 rounded-xl border font-mono text-xs transition-all duration-300 relative ${
                    injectedSpike && idx === 0
                      ? 'bg-rose-950/80 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-102'
                      : 'bg-[#0E1610]/90 border-slate-800/90 text-slate-300 hover:border-rose-500/40'
                  }`}
                >
                  {/* Corner marks */}
                  <div className="absolute top-1.5 left-1.5 text-[8px] text-slate-600 select-none">┌</div>
                  <div className="absolute top-1.5 right-1.5 text-[8px] text-slate-600 select-none">┐</div>

                  <div className="flex items-center justify-between mb-1.5 text-[10px]">
                    <span className="text-rose-400 font-bold">{evt.source}</span>
                    <span className="text-slate-500">{evt.time}</span>
                  </div>

                  <div className="p-2 rounded bg-black/60 border border-slate-800/80 font-mono text-[11px] text-slate-200 mb-2 overflow-x-auto">
                    {evt.rawText}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Target: <strong className="text-white font-sans">{evt.station}</strong></span>
                    <span className="text-rose-300 font-semibold">{evt.wipImpact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: THE VSM CLOUD REAL-TIME ENRICHMENT FILTER (The Spade Bridge) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 text-center">
            
            {/* Topographic Ring Pulsing Core */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer rotating pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#B6F076]/40 border-dashed animate-spin" style={{ animationDuration: '24s' }} />
              <div className="absolute inset-2 rounded-full border border-emerald-500/30 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-950 via-[#0B170F] to-black border border-emerald-500/60 shadow-[0_0_25px_rgba(182,240,118,0.3)] flex flex-col items-center justify-center">
                <Zap className="w-6 h-6 text-[#B6F076] animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-300 font-bold mt-1">VSM AI</span>
              </div>
            </div>

            {/* Connecting Data Highway (Animated Travelling Photon) */}
            <div className="mt-4 font-mono text-[11px] text-slate-400">
              <span className="text-[#B6F076] font-bold block mb-1">AUTO-ENRICHING</span>
              <span className="text-[10px] text-slate-500">Little's Law Engine</span>
            </div>

            {/* Live Throughput Badge */}
            <div className="mt-3 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 font-mono text-[10px] text-[#B6F076]">
              340% Flow Velocity
            </div>

          </div>

          {/* RIGHT COLUMN: ENRICHED, SYNCHRONIZED VALUE STREAM (After) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-950 text-xs font-mono">
              <span className="text-[#B6F076] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ENRICHED VALUE STREAM ARTIFACTS
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-[#B6F076]/10 border border-[#B6F076]/30 px-2 py-0.5 rounded">
                VERIFIED FLOW
              </span>
            </div>

            <div className="space-y-3">
              {enrichedCards.map((card) => (
                <div 
                  key={card.id}
                  className="p-4 rounded-xl border border-emerald-500/30 bg-[#0C1B11]/95 text-xs font-mono shadow-[0_8px_25px_-5px_rgba(182,240,118,0.18)] transition-all hover:border-[#B6F076]/60 relative"
                >
                  {/* Corner marks */}
                  <div className="absolute top-1.5 left-1.5 text-[8px] text-[#B6F076]/60 select-none">┌</div>
                  <div className="absolute top-1.5 right-1.5 text-[8px] text-[#B6F076]/60 select-none">┐</div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold font-sans text-xs">{card.pacemaker}</span>
                    <span className="text-[10px] font-mono text-black font-bold bg-[#B6F076] px-2 py-0.5 rounded">
                      {card.tag}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-black/40 border border-emerald-900/60 mb-2">
                    <div>
                      <span className="text-[9px] text-slate-400 block">CADENCE</span>
                      <span className="text-xs font-bold text-white">{card.cycleTime}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">LEAD TIME DROP</span>
                      <span className="text-xs font-bold text-[#B6F076]">{card.leadTimeDelta}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-300 pt-1 border-t border-emerald-950">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Capital Unlocked:</span>
                      <strong className="text-emerald-400">{card.capitalFreed}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Kaizen Rule:</span>
                      <span className="text-slate-200">{card.kaizenRule}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Pre-Footer Action Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#0C1B11] to-black border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-base tracking-tight font-sans">
              Connect your shop-floor PLCs and MES in less than 30 minutes.
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Direct OPC-UA, MQTT, and CSV connectors. Zero hardware changes or downtime required.
            </p>
          </div>

          <button
            onClick={() => onOpenTrial({ mode: 'trial', plan: 'Enterprise' })}
            className="shrink-0 px-6 py-3 rounded-full bg-[#B6F076] hover:bg-[#a3e35d] text-black font-bold text-xs font-mono transition-all shadow-md active:scale-98 flex items-center gap-2 cursor-pointer"
          >
            <span>Deploy Live Pilot</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </div>

      </div>

    </section>
  );
};
