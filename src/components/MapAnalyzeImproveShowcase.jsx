import React, { useState } from 'react';
import { 
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const MapAnalyzeImproveShowcase = ({ onOpenTrial }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('csm'); // 'csm' | 'smart-improve' | 'fsm'

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Left 3 Tabs (CSM, Smart Improve, FSM) + Right Mac App Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: 3 INTERACTIVE TABS (CSM, Smart Improve, FSM)                 */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* --- TAB 1: CSM (Current State Map) --- */}
            <div 
              onClick={() => setActiveTab('csm')}
              onMouseEnter={() => setActiveTab('csm')}
              className={`cursor-pointer transition-all duration-200 pb-6 border-b border-neutral-200 dark:border-neutral-800 text-left ${
                activeTab === 'csm' ? 'opacity-100' : 'opacity-40 hover:opacity-75'
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white mb-2">
                CSM
              </h2>
              
              {activeTab === 'csm' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    Current State Map — Capture your baseline reality.
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Map your as-is shop floor value stream. Digitize station cycle times, changeovers, uptime, and WIP accumulation across every work cell into a live visual canvas without whiteboard chaos.
                  </p>
                  <div className="pt-1">
                    <button 
                      onClick={() => onOpenTrial({ mode: 'trial' })}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore CSM map page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- TAB 2: SMART IMPROVE (FSPlanner) --- */}
            <div 
              onClick={() => setActiveTab('smart-improve')}
              onMouseEnter={() => setActiveTab('smart-improve')}
              className={`cursor-pointer transition-all duration-200 pb-6 border-b border-neutral-200 dark:border-neutral-800 text-left ${
                activeTab === 'smart-improve' ? 'opacity-100' : 'opacity-40 hover:opacity-75'
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white mb-2">
                Smart Improve
              </h2>

              {activeTab === 'smart-improve' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    FSPlanner — AI-powered Future State Planning.
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Instantly pinpoint bottlenecks, takt violations, and line starvation. Run AI Kaizen rebalancing simulations, calculate pull supermarkets, and evaluate Process Cycle Efficiency (PCE) before moving physical steel.
                  </p>
                  <div className="pt-1">
                    <button 
                      onClick={() => onOpenTrial({ mode: 'trial' })}
                      className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Launch FSPlanner engine</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* --- TAB 3: FSM (Future State Map) --- */}
            <div 
              onClick={() => setActiveTab('fsm')}
              onMouseEnter={() => setActiveTab('fsm')}
              className={`cursor-pointer transition-all duration-200 pb-6 text-left ${
                activeTab === 'fsm' ? 'opacity-100' : 'opacity-40 hover:opacity-75'
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white mb-2">
                FSM
              </h2>

              {activeTab === 'fsm' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    Future State Map — Deploy continuous flow.
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Deploy your optimized target state with zero bottlenecks. Establish pull supermarkets, compress total manufacturing lead time by over 60%, and release trapped working capital into productive capacity.
                  </p>
                  <div className="pt-1">
                    <button 
                      onClick={() => onOpenTrial({ mode: 'trial' })}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View FSM target map</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: MAC STUDIO WINDOW (Real Screenshot of CSM / FSPlanner / FSM) */}
          {/* ========================================================================= */}
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
                  {activeTab === 'csm' && <span>csm-map-page.vsm</span>}
                  {activeTab === 'smart-improve' && <span>fsplanner-engine.vsm</span>}
                  {activeTab === 'fsm' && <span>fsm-map-page.vsm</span>}
                </div>

                <div className="flex items-center gap-2 text-neutral-400">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Window Body: Real Full-Res Screenshots */}
              <div className="relative overflow-hidden bg-neutral-100 dark:bg-[#181818] min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
                
                {/* --- 1. CSM MAP PAGE --- */}
                {activeTab === 'csm' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-csm-preview.png" 
                      alt="CSM Current State Map Page" 
                      className="w-full h-auto object-cover object-top max-h-[520px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/85 dark:bg-white/90 text-white dark:text-black backdrop-blur-md shadow-md">
                        CSM: Current State Map Page
                      </span>
                    </div>
                  </div>
                )}

                {/* --- 2. SMART IMPROVE (FSPLANNER) --- */}
                {activeTab === 'smart-improve' && (
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

                {/* --- 3. FSM MAP PAGE --- */}
                {activeTab === 'fsm' && (
                  <div className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                    <img 
                      src="/assets/vsm-fsm-preview.png" 
                      alt="FSM Future State Map Page" 
                      className="w-full h-auto object-cover object-top max-h-[520px]"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-600 text-white backdrop-blur-md shadow-md">
                        FSM: Future State Map Page
                      </span>
                    </div>
                  </div>
                )}

              </div>

              {/* Window Footer Status Bar */}
              <div className="h-10 px-4 bg-neutral-50 dark:bg-[#1A1A1A] border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span>
                  {activeTab === 'csm' && "Active: Current State Map Page (CSM)"}
                  {activeTab === 'smart-improve' && "Active: Smart Improve — FSPlanner Engine"}
                  {activeTab === 'fsm' && "Active: Future State Map Page (FSM)"}
                </span>
                <button 
                  onClick={() => onOpenTrial({ mode: 'trial' })}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Canvas</span>
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
