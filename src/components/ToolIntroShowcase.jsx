import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  Send, 
  Play, 
  Layers, 
  Activity, 
  ChevronRight,
  Database,
  Compass,
  FileCode2,
  FolderTree
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { CursorSpotlight } from './CursorSpotlight';

export const ToolIntroShowcase = ({ onOpenTrial }) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState('');
  const [executionStep, setExecutionStep] = useState(4); // 1..4

  const prompts = [
    {
      id: 'bottleneck',
      label: 'Bottleneck Discovery',
      project: 'precision-gearbox-line.vsm',
      query: 'Identify the primary constraint in this line, quantify trapped WIP, and draft future-state line balancing.',
      status: 'Constraint detected at Station 3 (+18% over Takt)',
      steps: [
        { title: 'Takt Time Formulation', detail: 'Net Operating: 54,000s / 450 units demand = 120.0s Takt threshold', done: true },
        { title: 'Workstation Telemetry Scan', detail: 'St 1 (85s / 71%), St 2 (110s / 92%), St 3 (142s / 118% - BOTTLENECK)', done: true },
        { title: 'WIP Capital Assessment', detail: 'Buffer 2 queue accumulated 1,530 pieces (3.4 days of unneeded buffer)', done: true },
        { title: 'Future-State Optimization', detail: 'Rebalance 25s inspection to Station 4; cut total lead time from 13.2d to 4.8d', done: true }
      ]
    },
    {
      id: 'leadtime',
      label: 'WIP & Lead Time Cut',
      project: 'precision-gearbox-line.vsm',
      query: 'Model Kanban pull supermarkets to eliminate 94% waiting time across all 4 buffer stages.',
      status: 'Pull architecture modeled: 63% WIP reduction',
      steps: [
        { title: 'Inventory Lead Time Ladder', detail: 'Total PLT is 13.2 Days; Touch time is 337s (Process Cycle Efficiency: 0.12%)', done: true },
        { title: 'Supermarket Sizing Calculation', detail: 'Replacing push buffers with 2-bin Kanban sizes buffers to 450 units each', done: true },
        { title: 'Pacemaker Placement', detail: 'Designate Final Assembly as Pacemaker; establish FIFO lane from Heat Treat', done: true },
        { title: 'Projected Delta', detail: 'WIP reduced by 3,780 units; Working capital freed: ₹4.2M equivalent', done: true }
      ]
    },
    {
      id: 'balancing',
      label: 'Line Balancing',
      project: 'precision-gearbox-line.vsm',
      query: 'Rebalance tasks across Station 1 to 4 to eliminate operator downtime and sustain 450 pcs/day demand.',
      status: 'Line balanced to 105s maximum station cycle',
      steps: [
        { title: 'Task Element Breakdown', detail: 'Extracted 18 standardized work elements across Machining, Wash, Assembly', done: true },
        { title: 'Yamazumi Chart Balance', detail: 'Shifted manual deburring (15s) from St 2 to St 1; shifted leak test (25s) to St 4', done: true },
        { title: 'New Line Rhythm', detail: 'St 1: 100s, St 2: 95s, St 3: 117s, St 4: 105s (All stations <= 120s Takt)', done: true },
        { title: 'Capacity Validation', detail: 'Throughput capacity increases from 380 to 475 units/day (+25%)', done: true }
      ]
    }
  ];

  const current = prompts[activePromptIndex];

  // Progressive typewriter effect on prompt change
  useEffect(() => {
    let i = 0;
    setTypedPrompt('');
    const text = current.query;
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypedPrompt((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 14);

    return () => clearInterval(interval);
  }, [activePromptIndex]);

  return (
    <section className="py-20 md:py-32 bg-[#0D0D11] border-b border-white/[0.08] overflow-hidden relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Antigravity Deep Cinematic Showcase Container */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#070A13] border border-slate-800/90 shadow-elevated p-4 sm:p-8 lg:p-10 relative overflow-hidden text-white">
          
          {/* Subtle Ambient Background Gradient in Dark Space */}
          <div className="pointer-events-none absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-blue-600/10 via-violet-600/10 to-transparent blur-3xl rounded-full" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-gradient-to-t from-indigo-600/10 to-transparent blur-3xl rounded-full" />

          {/* Top Label & Headline */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-300 border border-blue-400/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>THE DIGITAL VSM STUDIO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-white">
              Where industrial engineering meets AI execution
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal max-w-2xl mx-auto">
              A single digital environment replacing whiteboard diagrams and fragmented spreadsheets with live, calculable process intelligence.
            </p>
          </div>

          {/* Split Screen Workspace Window (Left: Studio Canvas, Right: AI Execution Terminal) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pb-24 sm:pb-28">
            
            {/* LEFT: High-Fidelity VSM Studio Window */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0C101D] border border-slate-800 shadow-elevated overflow-hidden flex flex-col justify-between">
              
              {/* Studio Window Titlebar */}
              <div className="bg-[#090D18] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="h-3 w-px bg-slate-800 mx-1" />
                  <span className="font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
                    <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
                    {current.project}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-400/20 rounded">
                    Active Study
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Takt: 120s</span>
                </div>
              </div>

              {/* Studio Canvas Interior Preview */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Visual Canvas Nodes Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pb-2 border-b border-slate-800/60">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <FolderTree className="w-3.5 h-3.5 text-blue-400" />
                      Station Sequence: 4 Operations • 3 Buffers
                    </span>
                    <span className="text-emerald-400">PCE: 0.12%</span>
                  </div>

                  {/* Horizontal Mini Process Diagram */}
                  <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
                    
                    {/* Station 1 */}
                    <div className="bg-[#101524] p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-200">1. CNC Machining</span>
                        <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">1 Op</span>
                      </div>
                      <div className="space-y-0.5 text-[11px] text-slate-400">
                        <div>C/T: <strong className="text-white">85s</strong></div>
                        <div>C/O: <strong className="text-slate-300">45m</strong></div>
                        <div>Uptime: <strong className="text-emerald-400">94%</strong></div>
                      </div>
                    </div>

                    {/* Station 2 */}
                    <div className="bg-[#101524] p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-200">2. Heat &amp; Wash</span>
                        <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">1 Op</span>
                      </div>
                      <div className="space-y-0.5 text-[11px] text-slate-400">
                        <div>C/T: <strong className="text-white">110s</strong></div>
                        <div>C/O: <strong className="text-slate-300">60m</strong></div>
                        <div>Uptime: <strong className="text-emerald-400">98%</strong></div>
                      </div>
                    </div>

                    {/* Station 3 (Constraint) */}
                    <div className="bg-rose-950/40 p-3 rounded-xl border-2 border-rose-500 shadow-glow relative">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-rose-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          3. Assembly &amp; Test
                        </span>
                        <span className="text-[9px] bg-rose-900 text-rose-200 px-1.5 py-0.5 rounded font-bold">2 Op</span>
                      </div>
                      <div className="space-y-0.5 text-[11px] text-slate-300">
                        <div>C/T: <strong className="text-rose-400 font-bold">142s &gt; 120s</strong></div>
                        <div>Queue: <strong className="text-amber-400">3.4 Days</strong></div>
                        <div>Constraint: <strong className="text-rose-300">+22s Over</strong></div>
                      </div>
                    </div>

                  </div>

                  {/* Production Timeline Ladder Visual */}
                  <div className="mt-3 p-3 rounded-xl bg-[#090D18] border border-slate-800/80 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400 pb-1 mb-1 border-b border-slate-800/60">
                      <span>Timeline Ladder</span>
                      <span>Total Lead Time: <strong className="text-white">13.2 Days</strong></span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                      <div className="bg-slate-800/50 py-1 rounded">Wait: 4.5d</div>
                      <div className="bg-emerald-950/50 text-emerald-400 py-1 rounded font-bold">Work: 85s</div>
                      <div className="bg-slate-800/50 py-1 rounded">Wait: 2.8d</div>
                      <div className="bg-rose-950/60 text-rose-300 py-1 rounded font-bold">Work: 142s</div>
                    </div>
                  </div>
                </div>

                {/* Footer status */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Standard ISO Lean Icons • Push/Pull Logic Enabled</span>
                  <span className="text-blue-400 font-mono">Auto-Calculated</span>
                </div>

              </div>

            </div>

            {/* RIGHT: VSM Cloud AI Execution & Diagnostics Window (Exact Antigravity Agent card) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0E1322] border border-slate-800 shadow-elevated p-5 sm:p-6 flex flex-col justify-between">
              
              <div>
                {/* Agent Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">VSM Cloud AI Agent</h4>
                      <span className="text-[10px] text-slate-400 font-mono">v3.2 • Continuous Optimization</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>

                {/* Active Goal / Prompt in Agent Box */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-mono text-slate-500 block mb-1 uppercase tracking-wider">
                    Instruction Payload:
                  </span>
                  <p className="font-medium text-slate-200">
                    "{current.query}"
                  </p>
                </div>

                {/* Step-by-Step Execution Sequence */}
                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Execution Stream:</span>
                    <span className="text-blue-400">4/4 Steps Done</span>
                  </div>

                  {current.steps.map((st, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-2 text-slate-200 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{st.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-5 leading-relaxed font-sans font-normal">
                        {st.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Outcome Banner */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-emerald-400 font-medium">{current.status}</span>
                <span className="font-mono text-[10px] text-slate-500">Latency: 48ms</span>
              </div>

            </div>

          </div>

          {/* BOTTOM FLOATING COMMAND PROMPT BAR (Exact match to Google Antigravity screenshot!) */}
          <div className="absolute inset-x-4 sm:inset-x-8 lg:inset-x-12 bottom-4 sm:bottom-6 z-20">
            <div className="rounded-2xl bg-white text-slate-900 p-4 sm:p-5 shadow-elevated border border-slate-200/90 max-w-4xl mx-auto">
              
              {/* Header inside Prompt Bar: project-name + Open in Editor link */}
              <div className="flex items-center justify-between text-xs pb-2 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-900 font-mono tracking-tight text-xs sm:text-sm">
                    {current.project}
                  </span>
                </div>
                <button
                  onClick={() => onOpenTrial({ mode: 'trial' })}
                  data-cursor="pointer"
                  className="font-semibold text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Open in VSM Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Simulated Typewriter Input Field */}
              <div className="py-1">
                <div className="text-sm sm:text-base font-medium text-slate-900 leading-snug min-h-[28px] flex items-center">
                  <span>{typedPrompt}</span>
                  <span className="inline-block w-1.5 h-4 bg-blue-600 ml-1 animate-pulse" />
                </div>
              </div>

              {/* Interactive Action Tags & Run Button */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                
                {/* Prompt Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">
                    Examples:
                  </span>
                  {prompts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePromptIndex(idx)}
                      data-cursor="pointer"
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        activePromptIndex === idx
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Model and Action Send Button */}
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200">
                    VSM Cloud Agent 3.0
                  </span>
                  <button
                    onClick={() => onOpenTrial({ mode: 'trial' })}
                    data-cursor="pointer"
                    className="w-8 h-8 rounded-full bg-slate-950 hover:bg-black text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    title="Execute in trial"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
