import React, { useState, useRef } from 'react';
import { 
  Sliders, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  TrendingDown, 
  Clock, 
  Zap,
  RotateCcw
} from 'lucide-react';

export const SpadeSplitScrubber = ({ onOpenTrial }) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0..100
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pct = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF9] text-slate-900 border-b border-slate-200/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-900 text-white mb-5 shadow-xs">
            <Sliders className="w-3.5 h-3.5 text-[#B6F076]" />
            <span>INTERACTIVE FLOW SCRUBBER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-slate-950 leading-[1.12]">
            Drag to compare:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600">
              Chaos vs. Continuous Flow.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Grab the center divider and slide horizontally to reveal the quantifiable transformation between traditional push manufacturing and VSM Cloud synchronized flow.
          </p>

          {/* Quick Preset Buttons */}
          <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs">
            <button
              onClick={() => setSliderPos(15)}
              className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Inspect Raw Chaos (90%)
            </button>
            <button
              onClick={() => setSliderPos(50)}
              className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              50/50 Split View
            </button>
            <button
              onClick={() => setSliderPos(85)}
              className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Inspect Synchronized Stream (90%)
            </button>
          </div>
        </div>

        {/* INTERACTIVE COMPARISON STAGE */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-300 shadow-2xl bg-white min-h-[480px] sm:min-h-[520px] cursor-ew-resize"
        >
          
          {/* RIGHT SIDE LAYER: THE SYNCHRONIZED STREAM (Full Width Base Layer) */}
          <div className="absolute inset-0 bg-[#0A160F] text-slate-100 p-6 sm:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-emerald-950 pb-4 text-xs font-mono">
              <span className="text-[#B6F076] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                AFTER: VSM CLOUD SYNCHRONIZED STREAM
              </span>
              <span className="text-emerald-400 font-bold bg-[#B6F076]/10 border border-[#B6F076]/30 px-2 py-0.5 rounded text-[10px]">
                TAKT-SYNCHRONIZED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto pt-6 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#0F2216] border border-emerald-800/80">
                <span className="text-[10px] text-slate-400 block mb-1">TOTAL LEAD TIME</span>
                <span className="text-3xl font-extrabold text-[#B6F076] font-sans">4.8 Days</span>
                <span className="text-[11px] text-emerald-400 block mt-1">-63.6% Lead Time Drop</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F2216] border border-emerald-800/80">
                <span className="text-[10px] text-slate-400 block mb-1">TRAPPED INVENTORY WIP</span>
                <span className="text-3xl font-extrabold text-white font-sans">120 Units</span>
                <span className="text-[11px] text-emerald-400 block mt-1">+$380,000 Cash Unlocked</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F2216] border border-emerald-800/80">
                <span className="text-[10px] text-slate-400 block mb-1">LINE BALANCING</span>
                <span className="text-3xl font-extrabold text-[#B6F076] font-sans">96.2%</span>
                <span className="text-[11px] text-emerald-400 block mt-1">Zero Pacemaker Starvation</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-emerald-950 text-xs text-slate-300 font-sans">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B6F076]" />
                <span>Pull Supermarket regulates replenishment with automated electronic Kanban triggers.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B6F076]" />
                <span>Station cycle times mathematically leveled below 120s customer takt time.</span>
              </div>
            </div>
          </div>

          {/* LEFT SIDE LAYER: THE RAW FACTORY CHAOS (Clipped by slider position) */}
          <div 
            className="absolute inset-y-0 left-0 bg-[#160B0F] text-slate-100 p-6 sm:p-10 flex flex-col justify-between overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="min-w-[420px] sm:min-w-[540px]">
              <div className="flex items-center justify-between border-b border-rose-950 pb-4 text-xs font-mono">
                <span className="text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  BEFORE: RAW SHOP-FLOOR REALITY
                </span>
                <span className="text-rose-300 font-bold bg-rose-950 border border-rose-800 px-2 py-0.5 rounded text-[10px]">
                  PUSH &amp; BOTTLENECKS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto pt-6 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#261016] border border-rose-900/80">
                  <span className="text-[10px] text-slate-400 block mb-1">TOTAL LEAD TIME</span>
                  <span className="text-3xl font-extrabold text-rose-400 font-sans">13.2 Days</span>
                  <span className="text-[11px] text-rose-300 block mt-1">98% Idle Waiting Time</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#261016] border border-rose-900/80">
                  <span className="text-[10px] text-slate-400 block mb-1">TRAPPED INVENTORY WIP</span>
                  <span className="text-3xl font-extrabold text-white font-sans">1,530 Pcs</span>
                  <span className="text-[11px] text-amber-400 block mt-1">Locked Working Capital</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#261016] border border-rose-900/80">
                  <span className="text-[10px] text-slate-400 block mb-1">LINE BALANCING</span>
                  <span className="text-3xl font-extrabold text-rose-400 font-sans">81.6%</span>
                  <span className="text-[11px] text-rose-400 block mt-1">+18.6% Takt Overload</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-rose-950 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Push scheduling generates mountain queues between stamping and assembly.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Station 03 cycle time (142s) chronically chokes line throughput.</span>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDER DIVIDER HANDLE */}
          <div 
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-white text-white flex items-center justify-center shadow-2xl">
              <Sliders className="w-4 h-4 text-[#B6F076]" />
            </div>
          </div>

        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenTrial({ mode: 'trial', plan: 'Professional' })}
            className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md active:scale-98 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Quantify Your Factory Lead Time Savings</span>
            <ArrowRight className="w-4 h-4 text-[#B6F076]" />
          </button>
        </div>

      </div>
    </section>
  );
};
