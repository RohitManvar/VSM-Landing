import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Cpu, 
  Layers, 
  Cog, 
  BarChart3, 
  RotateCcw,
  Sliders,
  Flame,
  Check,
  ShieldCheck
} from 'lucide-react';
import { PacemakerGear } from './PacemakerGear';

export const SpadeFlowConsole = ({ onOpenTrial }) => {
  // Scenarios: automotive, medtech, aerospace, semiconductor
  const [selectedIndustry, setSelectedIndustry] = useState('automotive');
  // Console tabs: 'transformation' (Spade Before/After) | 'pacemaker' (3D CAD Gear) | 'radar' (Cycle vs Takt)
  const [consoleTab, setConsoleTab] = useState('transformation');
  const [isBalanced, setIsBalanced] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Industry Scenario Datasets
  const scenarios = {
    automotive: {
      id: 'automotive',
      badge: '01 AUTOMOTIVE',
      title: 'EV Battery Module Line',
      station: 'STN-03 Cell Pack Laser Welding',
      rawTelemetry: {
        code: 'MES_AUTO_PACK_03 // CRITICAL TAKT SKEW',
        cycleTime: '142s',
        taktTime: '120s',
        skew: '+18.3% Over Takt',
        wipAccum: '1,530 units (3.4 Days)',
        bottleneckRoot: 'Thermal busbar cooling hold & manual probe recheck',
        impact: 'Restricts factory-wide line throughput to 81.6%'
      },
      enrichedStream: {
        pacemakerId: 'CELL_03 // DUAL-HEAD AUTOMATED LASER PACEMAKER',
        cycleTime: '108s',
        taktTime: '120s',
        status: 'Synchronized (90% Takt Buffer)',
        leadTime: '13.2 Days → 4.8 Days (-63.6%)',
        capitalFreed: '+$380,000 / line',
        pullMechanism: 'Pull Supermarket (FIFO Cap: 120 modules)',
        flowVelocity: '3.8x Velocity Multiplier'
      },
      stations: [
        { name: '1. Cell Stacking', ct: 85, takt: 120, status: 'ok' },
        { name: '2. Plasma Clean', ct: 110, takt: 120, status: 'warning' },
        { name: '3. Laser Welding', ct: 142, takt: 120, status: 'bottleneck' },
        { name: '4. EOL Testing', ct: 92, takt: 120, status: 'ok' },
      ]
    },
    medtech: {
      id: 'medtech',
      badge: '02 MEDTECH',
      title: 'Cardiac Stent & Catheter Fab',
      station: 'STN-02 Femtosecond Laser Slitting',
      rawTelemetry: {
        code: 'MES_MED_CLEANROOM // BIO-BURDEN QUEUE SPIKE',
        cycleTime: '210s',
        taktTime: '180s',
        skew: '+16.7% Over Takt',
        wipAccum: '4,200 pcs (5.2 Days)',
        bottleneckRoot: 'Manual micrometer optical inspection bottleneck',
        impact: 'Cleanroom inventory exceeds ISO-14644 sterile holding limits'
      },
      enrichedStream: {
        pacemakerId: 'CELL_02 // IN-LINE AI OPTICAL METROLOGY PACEMAKER',
        cycleTime: '162s',
        taktTime: '180s',
        status: 'Synchronized (90% Takt Buffer)',
        leadTime: '18.5 Days → 6.1 Days (-67.0%)',
        capitalFreed: '+$620,000 / cleanroom',
        pullMechanism: 'Sterile Kanban Tray Pull (Cap: 80 cassettes)',
        flowVelocity: '4.2x Velocity Multiplier'
      },
      stations: [
        { name: '1. Nitinol Tube Extrusion', ct: 135, takt: 180, status: 'ok' },
        { name: '2. Femto Laser Cut', ct: 210, takt: 180, status: 'bottleneck' },
        { name: '3. Electropolish & Wash', ct: 155, takt: 180, status: 'ok' },
        { name: '4. Sterile Packaging', ct: 120, takt: 180, status: 'ok' },
      ]
    },
    aerospace: {
      id: 'aerospace',
      badge: '03 AEROSPACE',
      title: 'Fly-By-Wire Avionics Loom',
      station: 'STN-04 Connector Pin Routing & Looming',
      rawTelemetry: {
        code: 'MES_AERO_787 // HARNESS ROUTING CHOKE',
        cycleTime: '340s',
        taktTime: '280s',
        skew: '+21.4% Over Takt',
        wipAccum: '48 assemblies (8.4 Days)',
        bottleneckRoot: 'Multi-pin continuity manual re-probe & rework',
        impact: 'Final aircraft assembly bay starved for shipset delivery'
      },
      enrichedStream: {
        pacemakerId: 'CELL_04 // DYNAMIC DIGITAL HARNESS JIG PACEMAKER',
        cycleTime: '252s',
        taktTime: '280s',
        status: 'Synchronized (90% Takt Buffer)',
        leadTime: '24.0 Days → 9.2 Days (-61.7%)',
        capitalFreed: '+$850,000 / program',
        pullMechanism: 'Sequential Kitting Cart Pull (Cap: 12 sub-assemblies)',
        flowVelocity: '3.6x Velocity Multiplier'
      },
      stations: [
        { name: '1. Wire Cut & Strip', ct: 190, takt: 280, status: 'ok' },
        { name: '2. Auto Crimping', ct: 220, takt: 280, status: 'ok' },
        { name: '3. Shield Braiding', ct: 260, takt: 280, status: 'warning' },
        { name: '4. Pin Insertion & Loom', ct: 340, takt: 280, status: 'bottleneck' },
      ]
    },
    semiconductor: {
      id: 'semiconductor',
      badge: '04 SEMICONDUCTOR',
      title: 'SMT Microcontroller Assembly',
      station: 'STN-01 High-Speed Pick & Place',
      rawTelemetry: {
        code: 'MES_SMT_LINE_01 // COMPONENT FEEDER STALL',
        cycleTime: '18.4s',
        taktTime: '15.0s',
        skew: '+22.7% Over Takt',
        wipAccum: '12,800 PCBAs (2.9 Days)',
        bottleneckRoot: 'Reel splicing manual reload pauses and reel feeder jams',
        impact: 'Reflow oven running at half thermal capacity'
      },
      enrichedStream: {
        pacemakerId: 'CELL_01 // SMART SPLICING FEEDER CELL (PACEMAKER)',
        cycleTime: '13.2s',
        taktTime: '15.0s',
        status: 'Synchronized (88% Takt Buffer)',
        leadTime: '7.4 Days → 2.3 Days (-68.9%)',
        capitalFreed: '+$440,000 / SMT bay',
        pullMechanism: 'Cassette Buffer Supermarket (Cap: 400 PCBAs)',
        flowVelocity: '5.1x Velocity Multiplier'
      },
      stations: [
        { name: '1. Solder Screen Print', ct: 12.0, takt: 15.0, status: 'ok' },
        { name: '2. Pick & Place SMT', ct: 18.4, takt: 15.0, status: 'bottleneck' },
        { name: '3. Reflow Convection', ct: 14.5, takt: 15.0, status: 'warning' },
        { name: '4. Automated 3D AOI', ct: 11.2, takt: 15.0, status: 'ok' },
      ]
    }
  };

  const current = scenarios[selectedIndustry];

  // Handle auto-balance simulation click
  const handleAutoBalance = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsBalanced((prev) => !prev);
      setIsOptimizing(false);
    }, 650);
  };

  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-emerald-500/25 bg-[#09110B] text-slate-100 shadow-[0_25px_70px_-15px_rgba(5,25,12,0.65)] select-none">
      
      {/* 1. TOPOGRAPHIC CONTOUR VECTOR BACKDROP WATERMARK (Spade Signature Aesthetic) */}
      <div className="pointer-events-none absolute inset-0 opacity-15 overflow-hidden">
        <svg 
          viewBox="0 0 1200 800" 
          className="w-full h-full object-cover text-emerald-400"
          fill="none" 
          stroke="currentColor"
        >
          {/* Topographic Elevation Contour Rings */}
          <path d="M-100 200 C 200 150, 450 350, 700 250 C 950 150, 1150 300, 1300 200" strokeWidth="1.2" strokeDasharray="6 4" />
          <path d="M-100 280 C 220 220, 470 420, 720 320 C 970 220, 1180 370, 1300 280" strokeWidth="1.4" />
          <path d="M-100 360 C 240 290, 490 490, 740 390 C 990 290, 1200 440, 1300 360" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M-100 440 C 260 360, 510 560, 760 460 C 1010 360, 1220 510, 1300 440" strokeWidth="1.6" />
          <path d="M-100 520 C 280 430, 530 630, 780 530 C 1030 430, 1240 580, 1300 520" strokeWidth="1.2" />
          <path d="M-100 600 C 300 500, 550 700, 800 600 C 1050 500, 1260 650, 1300 600" strokeWidth="1.4" strokeDasharray="8 6" />

          {/* Precision Elevation Coordinate Markers */}
          <circle cx="480" cy="460" r="4" fill="#B6F076" />
          <circle cx="760" cy="460" r="3" fill="#34D399" />
          <line x1="480" y1="460" x2="760" y2="460" stroke="#B6F076" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {/* CAD Crosshair grid mesh */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(182, 240, 118, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(182, 240, 118, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B6F076]/70 to-transparent" />

      {/* 2. CONSOLE HEADER: TELEMETRY STATUS HUD & INDUSTRY TABS */}
      <div className="relative z-10 px-4 sm:px-6 py-4 border-b border-emerald-950/80 bg-[#070D08]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Engine Status Beacon & Live Latency */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-mono text-[#B6F076]">
            <span className="w-2 h-2 rounded-full bg-[#B6F076] animate-pulse" />
            <span className="font-semibold tracking-wider">VSM_ENGINE // REAL-TIME ENRICHMENT</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-emerald-300/70">
            <span>LATENCY: <strong className="text-white">12ms</strong></span>
            <span>•</span>
            <span>TAKT_CLOCK: <strong className="text-[#B6F076]">SYNCHRONIZED</strong></span>
            <span>•</span>
            <span>PRECISION: <strong className="text-white">99.9%</strong></span>
          </div>
        </div>

        {/* Right: Industry Scenario Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-emerald-900/60 overflow-x-auto max-w-full">
          {Object.keys(scenarios).map((key) => {
            const sc = scenarios[key];
            const isActive = selectedIndustry === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedIndustry(key);
                  setIsBalanced(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#B6F076] text-black font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-emerald-950/40'
                }`}
              >
                {sc.badge}
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. VIEW MODE SWITCHER TABS (Spade Signature Controls) */}
      <div className="relative z-10 px-4 sm:px-6 py-3 border-b border-emerald-950/60 bg-[#0B150F]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setConsoleTab('transformation')}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-all cursor-pointer ${
              consoleTab === 'transformation'
                ? 'bg-emerald-900/60 text-[#B6F076] border border-[#B6F076]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-emerald-950/30 border border-transparent'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#B6F076]" />
            <span>01 Live Flow Transformation</span>
          </button>

          <button
            onClick={() => setConsoleTab('pacemaker')}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-all cursor-pointer ${
              consoleTab === 'pacemaker'
                ? 'bg-emerald-900/60 text-[#B6F076] border border-[#B6F076]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-emerald-950/30 border border-transparent'
            }`}
          >
            <Cog className="w-3.5 h-3.5 text-[#B6F076]" />
            <span>02 3D Topographic Pacemaker</span>
          </button>

          <button
            onClick={() => setConsoleTab('radar')}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs flex items-center gap-2 transition-all cursor-pointer ${
              consoleTab === 'radar'
                ? 'bg-emerald-900/60 text-[#B6F076] border border-[#B6F076]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-emerald-950/30 border border-transparent'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#B6F076]" />
            <span>03 Takt Kaizen Radar</span>
          </button>
        </div>

        {/* Live Scenario Headline */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span>ACTIVE LINE:</span>
          <span className="text-white font-semibold font-sans">{current.title}</span>
        </div>

      </div>

      {/* 4. MAIN STAGE CONTENT AREA */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">

        {/* TAB 1: THE SPADE LIVE STREAM TRANSFORMATION (The Core Hook) */}
        {consoleTab === 'transformation' && (
          <div className="space-y-6">
            
            {/* The Before / Transformation / After Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* LEFT CARD: RAW SHOP-FLOOR REALITY (The Cryptic String / Messy Data) */}
              <div className="lg:col-span-5 relative rounded-2xl bg-[#0F1C12]/90 border border-rose-500/30 p-5 font-mono text-xs backdrop-blur-md shadow-lg transition-all">
                {/* Technical Precision Corner Brackets */}
                <div className="absolute top-2 left-2 text-[10px] text-rose-400/60 select-none">┌</div>
                <div className="absolute top-2 right-2 text-[10px] text-rose-400/60 select-none">┐</div>
                <div className="absolute bottom-2 left-2 text-[10px] text-rose-400/60 select-none">└</div>
                <div className="absolute bottom-2 right-2 text-[10px] text-rose-400/60 select-none">┘</div>

                {/* Header Strip */}
                <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-rose-400 font-bold uppercase tracking-wider text-[11px]">
                      RAW SHOP-FLOOR TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded text-rose-300">
                    UNSTRUCTURED MES
                  </span>
                </div>

                {/* Simulated Raw Industrial Log Output (Spade-like Cryptic String) */}
                <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 mb-4 overflow-x-auto">
                  <div className="text-rose-400 font-semibold">{current.rawTelemetry.code}</div>
                  <div className="text-slate-400">&gt; STATION_ID: {current.station}</div>
                  <div className="text-amber-300">&gt; CYCLE_TIME: {current.rawTelemetry.cycleTime} (TAKT: {current.rawTelemetry.taktTime})</div>
                  <div className="text-rose-400">&gt; BOTTLENECK_SKEW: {current.rawTelemetry.skew}</div>
                  <div className="text-slate-400">&gt; ACCUMULATED_WIP: {current.rawTelemetry.wipAccum}</div>
                </div>

                {/* Pain Point Summary */}
                <div className="space-y-2 text-[11px] text-slate-300 border-t border-slate-800/80 pt-3">
                  <div className="flex items-start gap-2 text-rose-300/90">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                    <span><strong>Root Cause:</strong> {current.rawTelemetry.bottleneckRoot}</span>
                  </div>
                  <div className="text-slate-400 text-[10px] pl-5">
                    {current.rawTelemetry.impact}
                  </div>
                </div>

                {/* Interactive Chaos Trigger */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">STATUS: BOTTLENECK ACTIVE</span>
                  <button
                    onClick={() => {
                      setIsBalanced(false);
                      setIsOptimizing(true);
                      setTimeout(() => setIsOptimizing(false), 400);
                    }}
                    className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Simulate Shift Surge</span>
                  </button>
                </div>
              </div>

              {/* CENTER CONDUIT: REAL-TIME AI ENRICHMENT (The Bridge) */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 text-center">
                
                {/* Animated Pulsing Connector Beam */}
                <div className="relative w-full flex items-center justify-center my-2">
                  <div className="w-full h-0.5 bg-gradient-to-r from-rose-500/40 via-[#B6F076] to-emerald-500/40 relative">
                    {/* Animated Travelling Data Photon */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B6F076] shadow-[0_0_10px_#B6F076] animate-pulse" />
                  </div>
                </div>

                {/* Action Button: Auto-Balance Flow */}
                <button
                  onClick={handleAutoBalance}
                  disabled={isOptimizing}
                  className={`mt-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 flex flex-col items-center gap-1 cursor-pointer shadow-lg ${
                    isBalanced
                      ? 'bg-emerald-950 border border-emerald-500/50 text-[#B6F076] hover:bg-emerald-900/80'
                      : 'bg-[#B6F076] text-black hover:bg-[#a5e065] hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {isOptimizing ? (
                      <Cog className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>{isOptimizing ? 'SYNCHRONIZING...' : isBalanced ? '✓ SYNCHRONIZED' : '⚡ AUTO-BALANCE'}</span>
                  </div>
                  <span className="text-[9px] font-normal opacity-80">
                    {isBalanced ? 'Click to reset flow' : 'Run VSM AI Kaizen'}
                  </span>
                </button>

                <div className="mt-2 text-[10px] font-mono text-emerald-400/80">
                  {isBalanced ? 'OEE: 96.4%' : 'OEE: 81.6%'}
                </div>

              </div>

              {/* RIGHT CARD: ENRICHED VALUE STREAM (The Verified Clean Card) */}
              <div className="lg:col-span-5 relative rounded-2xl bg-[#0C1F14]/95 border-2 border-[#B6F076]/70 p-5 font-mono text-xs backdrop-blur-md shadow-[0_10px_35px_-5px_rgba(182,240,118,0.25)] transition-all">
                {/* Technical Precision Corner Brackets */}
                <div className="absolute top-2 left-2 text-[10px] text-[#B6F076]/80 select-none">┌</div>
                <div className="absolute top-2 right-2 text-[10px] text-[#B6F076]/80 select-none">┐</div>
                <div className="absolute bottom-2 left-2 text-[10px] text-[#B6F076]/80 select-none">└</div>
                <div className="absolute bottom-2 right-2 text-[10px] text-[#B6F076]/80 select-none">┘</div>

                {/* Header Strip */}
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B6F076] animate-pulse" />
                    <span className="text-[#B6F076] font-bold uppercase tracking-wider text-[11px]">
                      ENRICHED LEAN VALUE STREAM
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-black font-bold bg-[#B6F076] px-2 py-0.5 rounded">
                    VERIFIED FLOW
                  </span>
                </div>

                {/* Structured Pacemaker Station Header */}
                <div className="mb-3">
                  <div className="text-[10px] text-emerald-400/80 uppercase tracking-wider">PACEMAKER PROCESS</div>
                  <div className="text-white font-bold text-sm font-sans tracking-tight">
                    {current.enrichedStream.pacemakerId}
                  </div>
                </div>

                {/* Key Metrics Grid (Spade Style Value Badges) */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-black/40 border border-emerald-900/60 mb-3 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block">BALANCED TAKT RATIO</span>
                    <span className="text-sm font-extrabold text-[#B6F076]">
                      {current.enrichedStream.cycleTime} / {current.enrichedStream.taktTime}
                    </span>
                    <span className="text-[9px] text-emerald-400 block">Optimal 90% Buffer</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">LEAD TIME COMPRESSION</span>
                    <span className="text-sm font-extrabold text-[#B6F076]">
                      {current.enrichedStream.leadTime.split(' ')[2]}
                    </span>
                    <span className="text-[9px] text-slate-400 block">{current.enrichedStream.leadTime}</span>
                  </div>
                </div>

                {/* Value Add Summary */}
                <div className="space-y-1.5 text-[11px] text-slate-300 border-t border-emerald-900/60 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Working Capital Freed:</span>
                    <span className="text-emerald-300 font-bold">{current.enrichedStream.capitalFreed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pull Mechanism:</span>
                    <span className="text-slate-200 text-[10px]">{current.enrichedStream.pullMechanism}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-950">
                    <span className="text-slate-400">Flow Velocity:</span>
                    <span className="text-[#B6F076] font-bold">{current.enrichedStream.flowVelocity}</span>
                  </div>
                </div>

                {/* Action CTA within card */}
                <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    TAKT SYNCHRONIZED
                  </span>
                  <button
                    onClick={() => onOpenTrial({ mode: 'trial', plan: 'Enterprise' })}
                    className="text-[11px] text-[#B6F076] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span>Deploy Pilot</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Status Ticker Bar */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-950 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B6F076]" />
                <span>CONTINUOUS ENRICHMENT: <strong className="text-white">Active on Shop Floor</strong></span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>TOTAL VALUE-ADD TIME: <strong className="text-[#B6F076]">8.4 min</strong></span>
                <span>TOTAL LEAD TIME: <strong className="text-[#B6F076]">4.8 days</strong></span>
                <span>EFFICIENCY RATIO: <strong className="text-white">34.2%</strong></span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 3D TOPOGRAPHIC PACEMAKER GEAR (CAD Contour Slices) */}
        {consoleTab === 'pacemaker' && (
          <div className="py-2">
            <div className="mb-4 text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-[11px] font-mono text-[#B6F076] mb-2">
                <Cog className="w-3 h-3 animate-spin" />
                <span>3D ISOMETRIC PACEMAKER TELEMETRY (SPADE TOPOGRAPHY)</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Interactive CAD sliced contour model. Move your cursor to tilt the 3D projection; hover over layers to inspect slice elevation coordinates.
              </p>
            </div>

            {/* Render PacemakerGear in Dark Mode */}
            <PacemakerGear isDark={true} />
          </div>
        )}

        {/* TAB 3: TAKT KAIZEN RADAR (Cycle Time vs Takt Line Analysis) */}
        {consoleTab === 'radar' && (
          <div className="space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-950 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B6F076] animate-ping" />
                <span className="text-[#B6F076] font-bold uppercase tracking-wider">
                  STATION CYCLE TIME VS TAKT TIME (LINE ANALYSIS)
                </span>
              </div>
              <div className="text-slate-400">
                TARGET TAKT TIME: <strong className="text-white">{current.rawTelemetry.taktTime}</strong>
              </div>
            </div>

            {/* Interactive Station Balance Chart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {current.stations.map((stn, idx) => {
                const taktVal = parseInt(current.rawTelemetry.taktTime);
                const isOver = stn.ct > taktVal;
                const pct = Math.min(Math.round((stn.ct / taktVal) * 100), 140);

                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl font-mono text-xs border transition-all ${
                      isOver 
                        ? 'bg-rose-950/40 border-rose-500/60 shadow-lg' 
                        : 'bg-[#0F1C12]/80 border-emerald-900/60'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white font-sans">{stn.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        isOver 
                          ? 'bg-rose-900 text-rose-200 border border-rose-700 font-bold' 
                          : 'bg-emerald-950 text-[#B6F076] border border-emerald-800'
                      }`}>
                        {pct}% TAKT
                      </span>
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Cycle Time:</span>
                        <strong className={isOver ? 'text-rose-400 font-bold' : 'text-white'}>
                          {stn.ct}s
                        </strong>
                      </div>

                      {/* Visual Bar vs Takt Marker */}
                      <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOver ? 'bg-rose-500' : 'bg-[#B6F076]'
                          }`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>

                      <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                        {isOver ? (
                          <span className="text-rose-400 font-semibold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            CRITICAL BOTTLENECK CONSTRAINT
                          </span>
                        ) : (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Synchronized with Pacemaker
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Kaizen Auto-Proposal Bar */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#B6F076] shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white">AI Kaizen Recommendation:</strong> Offload non-value-add prep work to upstream sub-assembly to bring Station 03 to 108s, freeing 1,530 pcs in bottleneck WIP.
                </span>
              </div>
              <button
                onClick={() => onOpenTrial({ mode: 'trial' })}
                className="shrink-0 px-4 py-2 rounded-lg bg-[#B6F076] hover:bg-[#a5e065] text-black font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Model Future State
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
