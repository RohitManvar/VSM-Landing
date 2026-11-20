import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Maximize2,
  Box,
  Activity,
  Zap,
  TrendingDown,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const ProductWorkflowSection = ({ onOpenTrial }) => {
  const { theme } = useTheme();
  const [activeWorkflow, setActiveWorkflow] = useState('csm'); // 'csm' | 'smart-improve' | 'fsm'

  return (
    <section id="workflow" className="py-20 md:py-32 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 border-b border-neutral-200/70 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 mb-4 border border-neutral-200/80 dark:border-neutral-700">
              <span>Continuous Lean Transformation</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.12] text-black dark:text-white">
              Everything you need to transform <br className="hidden sm:inline" />
              your value stream.
            </h2>
            
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto">
              From mapping your current processes to designing an improved future state, NexVSM brings your entire VSM workflow together.
            </p>

            {/* Continuous Workflow Visual Breadcrumb: CSM ➔ Smart Improve ➔ FSM */}
            <div className="mt-8 inline-flex items-center gap-2 sm:gap-4 p-1.5 rounded-full bg-neutral-100 dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveWorkflow('csm')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeWorkflow === 'csm' 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                1. CSM
              </button>

              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />

              <button
                onClick={() => setActiveWorkflow('smart-improve')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeWorkflow === 'smart-improve' 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                2. Smart Improve
              </button>

              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />

              <button
                onClick={() => setActiveWorkflow('fsm')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeWorkflow === 'fsm' 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                3. FSM
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* INTERCONNECTED 3-STAGE WORKFLOW SHOWCASE                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          
          {/* Left Column: 3 Connected Stage Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* STAGE 1: CSM */}
            <div
              id="csm"
              onClick={() => setActiveWorkflow('csm')}
              className={`p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 cursor-pointer text-left ${
                activeWorkflow === 'csm'
                  ? 'bg-white dark:bg-[#161616] border-black dark:border-white shadow-xl ring-2 ring-black/5 dark:ring-white/10'
                  : 'bg-[#F9F9FB] dark:bg-[#121212] border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Step 01 • Baseline
                </span>
                <span className="text-xs font-mono text-neutral-400">01 / 03</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white mb-2">
                CSM – Current State Mapping
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Build current-state value stream maps</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Visualize material flow and electronic information flow</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Add process data, cycle times &amp; operational metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Identify inventory triangles, lead time &amp; WIP</span>
                </li>
              </ul>
            </div>

            {/* STAGE 2: SMART IMPROVE */}
            <div
              id="smart-improve"
              onClick={() => setActiveWorkflow('smart-improve')}
              className={`p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 cursor-pointer text-left ${
                activeWorkflow === 'smart-improve'
                  ? 'bg-white dark:bg-[#161616] border-black dark:border-white shadow-xl ring-2 ring-black/5 dark:ring-white/10'
                  : 'bg-[#F9F9FB] dark:bg-[#121212] border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Step 02 • AI Planning
                </span>
                <span className="text-xs font-mono text-neutral-400">02 / 03</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white mb-2">
                Smart Improve – AI Improvement Planning
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Analyze the current-state map with automated algorithms</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Identify station bottlenecks &amp; Takt violations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Generate AI-powered Kaizen recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Plan future-state line balancing using FSPlanner</span>
                </li>
              </ul>
            </div>

            {/* STAGE 3: FSM */}
            <div
              id="fsm"
              onClick={() => setActiveWorkflow('fsm')}
              className={`p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 cursor-pointer text-left ${
                activeWorkflow === 'fsm'
                  ? 'bg-white dark:bg-[#161616] border-black dark:border-white shadow-xl ring-2 ring-black/5 dark:ring-white/10'
                  : 'bg-[#F9F9FB] dark:bg-[#121212] border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Step 03 • Continuous Flow
                </span>
                <span className="text-xs font-mono text-neutral-400">03 / 03</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white mb-2">
                FSM – Future State Mapping
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>Generate future-state value stream maps with 1 click</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>Establish pull supermarkets &amp; FIFO buffer lanes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>Compare current-state vs future-state PCE performance</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>Export audit-ready executive transformation roadmaps</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Mac Studio Window with Live High-Res Product Screenshot */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 text-left">
              
              {/* Window Title Bar */}
              <div className="h-10 px-4 bg-neutral-50 dark:bg-[#1A1A1A] border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="text-black dark:text-white font-semibold font-sans">NexVSM Studio</span>
                  <span>/</span>
                  {activeWorkflow === 'csm' && <span>01-csm-current-state-canvas.vsm</span>}
                  {activeWorkflow === 'smart-improve' && <span>02-fsplanner-ai-engine.vsm</span>}
                  {activeWorkflow === 'fsm' && <span>03-fsm-future-state-canvas.vsm</span>}
                </div>

                <div className="flex items-center gap-2 text-neutral-400">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Window Body: Actual High-Res Screenshots */}
              <div className="relative overflow-hidden bg-neutral-100 dark:bg-[#181818] min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
                
                {activeWorkflow === 'csm' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-csm-preview.png" 
                      alt="CSM Current State Map" 
                      className="w-full h-auto object-cover object-top max-h-[520px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/85 dark:bg-white/90 text-white dark:text-black backdrop-blur-md shadow-md">
                        CSM: Current State Map Page
                      </span>
                    </div>
                  </div>
                )}

                {activeWorkflow === 'smart-improve' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-smart-improve-preview.png" 
                      alt="Smart Improve FSPlanner Engine" 
                      className="w-full h-auto object-cover object-top max-h-[520px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 text-black backdrop-blur-md shadow-md">
                        Smart Improve: FSPlanner Diagnostics
                      </span>
                    </div>
                  </div>
                )}

                {activeWorkflow === 'fsm' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-fsm-preview.png" 
                      alt="FSM Future State Map" 
                      className="w-full h-auto object-cover object-top max-h-[520px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-600 text-white backdrop-blur-md shadow-md">
                        FSM: Future State Map Page
                      </span>
                    </div>
                  </div>
                )}

              </div>

              {/* Status Bar */}
              <div className="h-10 px-4 bg-neutral-50 dark:bg-[#1A1A1A] border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span>
                  {activeWorkflow === 'csm' && "Connected: 1. Current State Baseline ➔ FSPlanner"}
                  {activeWorkflow === 'smart-improve' && "Connected: 2. FSPlanner AI Engine ➔ FSM Canvas"}
                  {activeWorkflow === 'fsm' && "Connected: 3. Future State Deployment ➔ Complete"}
                </span>
                <button 
                  onClick={() => onOpenTrial({ mode: 'trial' })}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Test in Sandbox</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
