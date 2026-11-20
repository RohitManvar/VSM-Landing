import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  Maximize2,
  TrendingDown,
  GitCompare,
  Activity,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { CursorSpotlight } from './CursorSpotlight';
import { MagneticButton } from './MagneticButton';

export const ProductStorytelling = ({ onOpenTrial }) => {
  const [fsmMode, setFsmMode] = useState('after'); // 'before' | 'after'
  const [activeKpiTab, setActiveKpiTab] = useState('takt');

  return (
    <section id="storytelling" className="py-24 md:py-36 bg-white text-slate-900 border-b border-slate-200/80 overflow-hidden">
      <CursorSpotlight spotlightColor="rgba(37, 99, 235, 0.04)" spotlightSize={700}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 md:space-y-40">
          
          {/* SECTION A: Map your value stream without the complexity */}
          <ScrollReveal direction="up" duration={700}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Text Column */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-100 border border-slate-200 text-slate-700 mb-5">
                  <span>SECTION 01</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-blue-600 font-bold">VISUAL VSM STUDIO</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
                  Map your value stream without the complexity.
                </h2>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Eliminate rigid whiteboard drawings and disconnected Visio files. Build professional current-state maps with standard Lean symbols, automated connections, and structured station data boxes designed specifically for industrial environments.
                </p>

                <div className="mt-8 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Full library of standard manufacturing symbols (Inventory, Push/Pull, Supermarket, Truck)
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Dynamic station data boxes tracking Cycle Time, Changeover, Uptime, Batch Size, and Shifts
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Magnetic snapping and auto-routed material &amp; information flow connectors
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <MagneticButton
                    onClick={() => onOpenTrial({ mode: 'trial' })}
                    className="inline-flex items-center gap-2 font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors group p-0"
                  >
                    <span>Try the visual canvas in free trial</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                </div>
              </div>

              {/* Right Visual Column: Large Editor Screenshot View */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="rounded-2xl border border-slate-200 bg-[#0B0F19] p-2.5 sm:p-3.5 shadow-elevated group" data-cursor="zoom">
                  <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 border-b border-slate-800 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span className="ml-2 font-mono text-[11px] text-slate-300">VSM Cloud — Visual Editor</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      Live Telemetry
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src="/assets/vsm-csm-preview.png"
                      alt="VSM Cloud Visual Mapping Experience"
                      className="w-full h-auto object-cover max-h-[500px] rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/assets/vsm-current-state.png';
                      }}
                    />
                  </div>

                  <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Direct production canvas from active manufacturing deployment</span>
                    <span className="font-mono text-slate-500">Auto-align enabled</span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>


          {/* SECTION B: Turn process data into meaningful insights */}
          <ScrollReveal direction="up" duration={700}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Visual Column: Metrics & Analysis Engine Visual */}
              <div className="lg:col-span-7 order-1">
                <div className="rounded-2xl border border-slate-200/90 bg-[#FAFAF9] p-6 sm:p-8 shadow-sm text-slate-900">
                  
                  {/* Header inside visual card */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                        Manufacturing KPI Engine
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                        Production Timeline &amp; Station Balance
                      </h3>
                    </div>

                    {/* KPI Sub-tabs */}
                    <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => setActiveKpiTab('takt')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          activeKpiTab === 'takt' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Takt Balance
                      </button>
                      <button
                        onClick={() => setActiveKpiTab('pce')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          activeKpiTab === 'pce' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        PCE %
                      </button>
                      <button
                        onClick={() => setActiveKpiTab('lead')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          activeKpiTab === 'lead' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        WIP Days
                      </button>
                    </div>
                  </div>

                  {/* Station Cycle Time vs Takt Chart */}
                  <div className="py-6 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-600">Customer Takt Time Threshold</span>
                      <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                        120 Seconds
                      </span>
                    </div>

                    {/* Station 1 Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>1. CNC Machining</span>
                        <span className="font-mono text-slate-600">85s (71% Takt)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden relative">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '71%' }} />
                        <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-slate-400 border-dashed" />
                      </div>
                    </div>

                    {/* Station 2 Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>2. Heat Treatment &amp; Wash</span>
                        <span className="font-mono text-slate-600">110s (92% Takt)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden relative">
                        <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '92%' }} />
                        <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-slate-400" />
                      </div>
                    </div>

                    {/* Station 3 Bar (Bottleneck) */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-rose-900 mb-1">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          3. Assembly &amp; Testing (Over-Takt Bottleneck)
                        </span>
                        <span className="font-mono text-rose-600 font-bold">142s (118% Takt)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden relative">
                        <div className="h-full bg-rose-600 rounded-full animate-pulse" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>

                  {/* KPI Summary Tiles */}
                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-200 text-center">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block">Total Lead Time</span>
                      <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">13.2 Days</span>
                      <span className="text-[10px] text-slate-500">Across 4 buffers</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block">Value-Added (VAT)</span>
                      <span className="text-xl font-extrabold text-emerald-700 font-mono mt-0.5 block">337 sec</span>
                      <span className="text-[10px] text-slate-500">5.6 mins touch time</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase block">Process Efficiency</span>
                      <span className="text-xl font-extrabold text-blue-700 font-mono mt-0.5 block">0.12%</span>
                      <span className="text-[10px] text-slate-500">VAT / PLT ratio</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Text Column */}
              <div className="lg:col-span-5 order-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-100 border border-slate-200 text-slate-700 mb-5">
                  <span>SECTION 02</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-blue-600 font-bold">AUTOMATED CALCULATIONS</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
                  Turn process data into meaningful insights.
                </h2>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Never re-calculate takt time, lead time ladders, or cycle efficiency manually again. As process numbers and inventory counts are entered, VSM Cloud updates the entire mathematical model across shifts, demand changes, and operating parameters in real time.
                </p>

                <div className="mt-8 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Takt Time calculated dynamically from net operating hours and customer demand
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Instant Process Cycle Efficiency (PCE %) quantifying non-value-added waiting waste
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Automated total lead-time ladder showing exact days of supply at each inventory point
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <MagneticButton
                    onClick={() => onOpenTrial({ mode: 'trial' })}
                    className="inline-flex items-center gap-2 font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors group p-0"
                  >
                    <span>Calculate your plant metrics</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                </div>
              </div>

            </div>
          </ScrollReveal>


          {/* SECTION C: Understand where time and inventory are lost */}
          <ScrollReveal direction="up" duration={700}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Text Column */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-rose-50 border border-rose-200 text-rose-800 mb-5">
                  <span>SECTION 03</span>
                  <span className="text-rose-400">•</span>
                  <span className="text-rose-700 font-bold">BOTTLENECK DIAGNOSIS</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
                  Understand where time and inventory are lost.
                </h2>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Most factories lose over 95% of total lead time in queues and buffers. VSM Cloud visually exposes the exact station causing inventory backups, calculates the capacity gap against customer takt, and guides targeted Kaizen bursts.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/90 text-xs text-rose-950">
                    <div className="font-bold flex items-center gap-2 text-sm text-rose-900 mb-1">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Sample Diagnosis: Process 3 (Assembly &amp; Test)</span>
                    </div>
                    <p className="leading-relaxed text-rose-800 font-normal">
                      Station cycle time is 142s against a 120s takt time. Because Process 3 cannot sustain customer demand, Buffer 2 has accumulated 1,530 pieces (3.4 days of WIP), trapping working capital.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Instant visual flags when station cycle times exceed customer takt time
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Pinpoint exact days of supply sitting between specific machines
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <MagneticButton
                    onClick={() => onOpenTrial({ mode: 'trial' })}
                    className="inline-flex items-center gap-2 font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors group p-0"
                  >
                    <span>Run diagnostic on your value stream</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                </div>
              </div>

              {/* Right Visual Column: Live Bottleneck Highlight Visual */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="rounded-2xl border border-slate-200 bg-[#0B0F19] p-4 sm:p-6 shadow-elevated text-white">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span className="font-mono text-rose-300 font-semibold">Active Bottleneck Flagged</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">Process ID: PR-003</span>
                  </div>

                  {/* Workstation Deep-Dive Card */}
                  <div className="mt-6 bg-slate-900/90 rounded-xl p-5 border border-rose-500/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs font-mono text-slate-400">Workstation 3</span>
                        <h4 className="text-lg font-bold text-white tracking-tight">Final Assembly &amp; In-Line Inspection</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold font-mono">
                        118% Takt Utilization
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-3 border-t border-slate-800">
                      <div className="bg-slate-800/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 text-[10px] block">Cycle Time</span>
                        <span className="text-base font-bold text-rose-400">142 sec</span>
                      </div>
                      <div className="bg-slate-800/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 text-[10px] block">Takt Target</span>
                        <span className="text-base font-bold text-slate-200">120 sec</span>
                      </div>
                      <div className="bg-slate-800/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 text-[10px] block">Upstream WIP</span>
                        <span className="text-base font-bold text-amber-400">3.4 Days</span>
                      </div>
                      <div className="bg-slate-800/60 p-2.5 rounded-lg">
                        <span className="text-slate-400 text-[10px] block">Uptime</span>
                        <span className="text-base font-bold text-slate-200">89%</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 text-rose-300">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recommended Kaizen: Rebalance 25s manual testing to Station 4
                      </span>
                    </div>
                  </div>

                  {/* Impact Callout */}
                  <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Result of fixing this bottleneck:</span>
                    <span className="font-semibold text-emerald-400">+22% Daily Throughput Potential</span>
                  </div>

                </div>
              </div>

            </div>
          </ScrollReveal>


          {/* SECTION D: Make your improvements visible */}
          <ScrollReveal direction="up" duration={700}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Left Visual Column: Interactive Before/After Comparison */}
              <div className="lg:col-span-7 order-1">
                <div className="rounded-2xl border border-slate-200/90 bg-[#FAFAF9] p-6 sm:p-8 shadow-sm text-slate-900">
                  
                  {/* Header & Toggle */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                        Transformation Impact
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                        Current State vs. Future State Comparison
                      </h3>
                    </div>

                    <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => setFsmMode('before')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          fsmMode === 'before' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Current State (CSM)
                      </button>
                      <button
                        onClick={() => setFsmMode('after')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          fsmMode === 'after' ? 'bg-blue-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Future State (FSM)
                      </button>
                    </div>
                  </div>

                  {/* Side-by-Side Comparison Metrics */}
                  <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Metric 1: Lead Time */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
                      <span className="text-xs font-semibold text-slate-500 block mb-1">Production Lead Time</span>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-sm text-slate-400 line-through font-mono">13.2d</span>
                        <span className="text-2xl font-extrabold text-slate-900 font-mono">4.8 Days</span>
                      </div>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <TrendingDown className="w-3 h-3" />
                        63% Lead Time Cut
                      </span>
                    </div>

                    {/* Metric 2: WIP Inventory */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
                      <span className="text-xs font-semibold text-slate-500 block mb-1">Total WIP Units</span>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-sm text-slate-400 line-through font-mono">5,940</span>
                        <span className="text-2xl font-extrabold text-slate-900 font-mono">2,160</span>
                      </div>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <TrendingDown className="w-3 h-3" />
                        3,780 Units Released
                      </span>
                    </div>

                    {/* Metric 3: Process Cycle Efficiency */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center">
                      <span className="text-xs font-semibold text-slate-500 block mb-1">Process Efficiency</span>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-sm text-slate-400 line-through font-mono">0.12%</span>
                        <span className="text-2xl font-extrabold text-blue-700 font-mono">0.39%</span>
                      </div>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        <Zap className="w-3 h-3" />
                        3.25x Efficiency Gain
                      </span>
                    </div>

                  </div>

                  {/* Implementation Roadmap Preview */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
                    <span className="font-semibold text-slate-800">
                      Key Future-State Enablers:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-white text-slate-700 border border-slate-200 shadow-2xs font-mono text-[11px]">
                        Kanban Supermarket
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white text-slate-700 border border-slate-200 shadow-2xs font-mono text-[11px]">
                        FIFO Line Balance
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white text-slate-700 border border-slate-200 shadow-2xs font-mono text-[11px]">
                        Pacemaker Cell
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Text Column */}
              <div className="lg:col-span-5 order-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-emerald-50 border border-emerald-200 text-emerald-800 mb-5">
                  <span>SECTION 04</span>
                  <span className="text-emerald-400">•</span>
                  <span className="text-emerald-700 font-bold">CONTINUOUS IMPROVEMENT</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
                  Make your improvements visible.
                </h2>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  Continuous improvement fails when stakeholders cannot visualize the end goal. VSM Cloud allows teams to model future-state scenarios, quantify lead-time reductions before investing capital, and export professional reports for leadership alignment.
                </p>

                <div className="mt-8 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Side-by-side Current State (CSM) vs Future State (FSM) comparison deltas
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      One-click export to board-ready PDFs, high-resolution PNGs, and structured Excel tables
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      Version history &amp; revision audit tracking for multi-plant standardization
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <MagneticButton
                    onClick={() => onOpenTrial({ mode: 'trial' })}
                    className="inline-flex items-center gap-2 font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors group p-0"
                  >
                    <span>Export your first future-state map</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </CursorSpotlight>
    </section>
  );
};
