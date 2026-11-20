import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Maximize2,
  Box,
  Truck,
  Zap,
  Flame,
  ArrowRight,
  TrendingDown,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const Hero = ({ onOpenTrial }) => {
  const { theme } = useTheme();
  
  // Active capability state: 'csm' | 'smart-improve' | 'fsm'
  const [activeTab, setActiveTab] = useState('csm');
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the 3 tabs every 4.5 seconds when user isn't hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 'csm') return 'smart-improve';
        if (prev === 'smart-improve') return 'fsm';
        return 'csm';
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative pt-14 sm:pt-20 lg:pt-24 pb-20 md:pb-28 overflow-hidden bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200">
      
      {/* ========================================================================= */}
      {/* 1. FLOATING 2.5D STICKERS & OBJECTS (ChatGPT Inspired Lean Geometry)       */}
      {/* ========================================================================= */}
      
      {/* Universal 8-Point Asterisks */}
      <div className="pointer-events-none absolute left-6 sm:left-14 top-1/2 -translate-y-20 text-black dark:text-white select-none hidden md:block transition-all duration-300 opacity-80">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L13.5 8.5L22 7L15.5 12L22 17L13.5 15.5L12 24L10.5 15.5L2 17L8.5 12L2 7L10.5 8.5L12 0Z" />
        </svg>
      </div>

      <div className="pointer-events-none absolute right-8 sm:right-20 top-1/4 text-black dark:text-white select-none hidden md:block transition-all duration-300 opacity-80">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L13.5 8.5L22 7L15.5 12L22 17L13.5 15.5L12 24L10.5 15.5L2 17L8.5 12L2 7L10.5 8.5L12 0Z" />
        </svg>
      </div>

      {/* Tomato / Gemba sticker (Top Left) */}
      <div className="pointer-events-none absolute left-12 top-24 select-none hidden xl:block -rotate-12">
        <div className="w-11 h-11 rounded-full bg-rose-500 shadow-md flex items-center justify-center text-white text-lg">
          🍅
        </div>
      </div>

      {/* Pink Flower Sticker (Far Right) */}
      <div className="pointer-events-none absolute right-16 top-1/2 select-none hidden xl:block rotate-12">
        <div className="w-10 h-10 rounded-2xl bg-pink-300 dark:bg-pink-900/60 shadow-md flex items-center justify-center text-pink-700 dark:text-pink-200 text-lg">
          🌸
        </div>
      </div>

      {/* Blue Ribbon Wave Sticker (Bottom Right) */}
      <div className="pointer-events-none absolute right-14 bottom-24 select-none hidden xl:block -rotate-6">
        <svg width="48" height="32" viewBox="0 0 60 40" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round">
          <path d="M4 30C15 10 25 10 35 30C45 50 55 20 58 12" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO HEADLINE: "Now you can / CSM, Smart Improve, FSM / all in one place." */}
      {/* ========================================================================= */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        
        <ScrollReveal direction="up" duration={700}>
          <div className="max-w-4xl mx-auto">
            
            {/* Top Line: "Now you can" */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.035em] text-black dark:text-white leading-[1.05] select-none">
              Now you can
            </h1>

            {/* Middle Line: "CSM, Smart Improve, FSM" (Interactive Hoverable Tabs) */}
            <div className="mt-1 sm:mt-2">
              <div className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.035em] leading-[1.1] inline-flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-3 select-none">
                
                {/* --- 1. WORD: CSM --- */}
                <span
                  onMouseEnter={() => { setActiveTab('csm'); setIsPaused(true); }}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setActiveTab('csm')}
                  className="relative inline-block cursor-pointer px-1 py-0.5 transition-all duration-200"
                >
                  {activeTab === 'csm' ? (
                    <span className="inline-block transition-transform duration-150 scale-102">
                      <span className="text-emerald-500">C</span>
                      <span className="text-teal-400">S</span>
                      <span className="text-cyan-500">M</span>
                    </span>
                  ) : (
                    <span className="text-neutral-300 dark:text-neutral-700 hover:text-black dark:hover:text-white transition-colors duration-200">
                      CSM
                    </span>
                  )}

                  {/* Gradient Underline directly under 'CSM' */}
                  {activeTab === 'csm' && (
                    <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 animate-in fade-in zoom-in-95 duration-200 block shadow-xs" />
                  )}
                </span>

                {/* Comma separator */}
                <span className="text-neutral-300 dark:text-neutral-700">,</span>

                {/* --- 2. WORD: SMART IMPROVE --- */}
                <span
                  onMouseEnter={() => { setActiveTab('smart-improve'); setIsPaused(true); }}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setActiveTab('smart-improve')}
                  className="relative inline-block cursor-pointer px-1 py-0.5 transition-all duration-200"
                >
                  {activeTab === 'smart-improve' ? (
                    <span className="inline-block transition-transform duration-150 scale-102">
                      <span className="text-amber-500">S</span>
                      <span className="text-orange-400">m</span>
                      <span className="text-teal-500">a</span>
                      <span className="text-emerald-500">r</span>
                      <span className="text-sky-500">t</span>
                      <span className="mx-1 text-black dark:text-white"> </span>
                      <span className="text-indigo-400">I</span>
                      <span className="text-purple-400">m</span>
                      <span className="text-rose-400">p</span>
                      <span className="text-pink-400">r</span>
                      <span className="text-amber-400">o</span>
                      <span className="text-emerald-400">v</span>
                      <span className="text-cyan-400">e</span>
                    </span>
                  ) : (
                    <span className="text-neutral-300 dark:text-neutral-700 hover:text-black dark:hover:text-white transition-colors duration-200">
                      Smart Improve
                    </span>
                  )}

                  {/* Gradient Underline directly under 'Smart Improve' */}
                  {activeTab === 'smart-improve' && (
                    <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 via-cyan-400 to-rose-400 animate-in fade-in zoom-in-95 duration-200 block shadow-xs" />
                  )}
                </span>

                {/* Comma separator */}
                <span className="text-neutral-300 dark:text-neutral-700">,</span>

                {/* --- 3. WORD: FSM --- */}
                <span
                  onMouseEnter={() => { setActiveTab('fsm'); setIsPaused(true); }}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setActiveTab('fsm')}
                  className="relative inline-block cursor-pointer px-1 py-0.5 transition-all duration-200"
                >
                  {activeTab === 'fsm' ? (
                    <span className="inline-block transition-transform duration-150 scale-102">
                      <span className="text-indigo-500">F</span>
                      <span className="text-purple-400">S</span>
                      <span className="text-rose-400">M</span>
                    </span>
                  ) : (
                    <span className="text-neutral-300 dark:text-neutral-700 hover:text-black dark:hover:text-white transition-colors duration-200">
                      FSM
                    </span>
                  )}

                  {/* Gradient Underline directly under 'FSM' */}
                  {activeTab === 'fsm' && (
                    <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 via-rose-400 to-emerald-400 animate-in fade-in zoom-in-95 duration-200 block shadow-xs" />
                  )}
                </span>

              </div>
            </div>

            {/* Bottom Line: "all in one place." */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.035em] text-black dark:text-white leading-[1.05] select-none mt-1 sm:mt-2">
              all in one place.
            </h1>

            {/* Supporting Subtitle */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
              From Current State to Future State. Smarter Value Stream Mapping with NexVSM.
            </p>

          </div>
        </ScrollReveal>

        {/* CTA BUTTONS (Matching ChatGPT pill & text link) */}
        <ScrollReveal direction="up" delay={150} duration={600}>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            
            {/* Primary Pill Button */}
            <button
              onClick={() => onOpenTrial({ mode: 'trial', plan: 'Professional' })}
              className="px-7 py-3 rounded-full font-semibold text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center gap-1 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <span>Try it now*</span>
            </button>

            {/* Secondary Text Link with Diagonal Arrow */}
            <button
              onClick={() => onOpenTrial({ mode: 'trial', plan: 'Professional' })}
              className="text-sm font-medium transition-colors flex items-center gap-1 group py-1 text-black hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300 cursor-pointer"
            >
              <span>Try now</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 3. CENTER STAGE MAC APPLICATION WINDOW: REAL APP PREVIEWS                 */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-18 max-w-5xl mx-auto text-left relative">
          
          {/* Tilted Card on the Left (Peeking behind Mac Window) */}
          <div className="pointer-events-none absolute -left-6 sm:-left-16 md:-left-20 top-20 -rotate-12 z-0 hidden lg:block select-none animate-in fade-in duration-500">
            <div className="w-[230px] rounded-2xl p-4 bg-white dark:bg-[#181818] border border-neutral-200/90 dark:border-neutral-800 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-black dark:text-white">
                    VSM Leadership Deck
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    Slides • PPTX (14 pages)
                  </div>
                </div>
              </div>
              <div className="h-14 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 p-2 flex items-center justify-center">
                <span className="text-[10px] font-mono text-neutral-500">
                  Slide 04: Takt vs Cycle Time
                </span>
              </div>
            </div>
          </div>

          {/* Tilted Card on the Right (Peeking behind Mac Window) */}
          <div className="pointer-events-none absolute -right-6 sm:-right-16 md:-right-20 top-28 rotate-12 z-0 hidden lg:block select-none animate-in fade-in duration-500">
            <div className="w-[240px] rounded-2xl p-4 bg-[#EAF3FA] dark:bg-[#132333] border border-blue-200/80 dark:border-blue-900/60 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-blue-950 dark:text-blue-100">
                  Lead Time Projection
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  -64% Cut
                </span>
              </div>
              <div className="text-[10px] text-blue-700/80 dark:text-blue-300 mb-2 font-mono">
                13.2 Days ➔ 4.8 Days Target
              </div>
              <div className="p-2 rounded-lg bg-white/80 dark:bg-neutral-900/80 text-[10px] text-neutral-600 dark:text-neutral-400 font-sans shadow-xs">
                "Continuous pull supermarket eliminates 62% of shop WIP"
              </div>
            </div>
          </div>

          <ScrollReveal direction="up" delay={250} duration={700}>
            
            {/* Window Container */}
            <div className="relative z-10 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden transition-colors">
              
              {/* Mac Window Title Bar */}
              <div className="h-10 px-4 bg-neutral-50 dark:bg-[#1A1A1A] border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between transition-colors">
                
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* Window Center Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="text-black dark:text-white font-semibold font-sans">NexVSM Studio</span>
                  <span>/</span>
                  {activeTab === 'csm' && <span>csm-map-page.vsm</span>}
                  {activeTab === 'smart-improve' && <span>fsplanner-engine.vsm</span>}
                  {activeTab === 'fsm' && <span>fsm-map-page.vsm</span>}
                </div>

                {/* Right Window Controls */}
                <div className="flex items-center gap-2 text-neutral-400">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

              </div>

              {/* Window Body: Real App Page Screenshot Previews */}
              <div className="relative overflow-hidden bg-neutral-100 dark:bg-[#181818] min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
                
                {/* --- 1. CSM MAP PAGE PREVIEW --- */}
                {activeTab === 'csm' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-csm-preview.png" 
                      alt="CSM Current State Map Page" 
                      className="w-full h-auto object-cover object-top max-h-[500px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/80 dark:bg-white/90 text-white dark:text-black backdrop-blur-md shadow-md">
                        CSM: Current State Map Page
                      </span>
                    </div>
                  </div>
                )}

                {/* --- 2. SMART IMPROVE (FSPLANNER) PREVIEW --- */}
                {activeTab === 'smart-improve' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-smart-improve-preview.png" 
                      alt="Smart Improve FSPlanner Engine" 
                      className="w-full h-auto object-cover object-top max-h-[500px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 text-black backdrop-blur-md shadow-md">
                        Smart Improve: FSPlanner Diagnostics
                      </span>
                    </div>
                  </div>
                )}

                {/* --- 3. FSM MAP PAGE PREVIEW --- */}
                {activeTab === 'fsm' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-fsm-preview.png" 
                      alt="FSM Future State Map Page" 
                      className="w-full h-auto object-cover object-top max-h-[500px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-600 text-white backdrop-blur-md shadow-md">
                        FSM: Future State Map Page
                      </span>
                    </div>
                  </div>
                )}

              </div>

              {/* Canvas Bottom Status Bar */}
              <div className="h-10 px-4 bg-neutral-50 dark:bg-[#1A1A1A] border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span>
                  {activeTab === 'csm' && "Viewing: Current State Baseline Map (CSM)"}
                  {activeTab === 'smart-improve' && "Viewing: Smart Improve — FSPlanner Engine"}
                  {activeTab === 'fsm' && "Viewing: Future State Continuous Flow Map (FSM)"}
                </span>
                <button 
                  onClick={() => onOpenTrial({ mode: 'trial', plan: 'Professional' })}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Canvas</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </ScrollReveal>
        </div>

      </div>

    </section>
  );
};
