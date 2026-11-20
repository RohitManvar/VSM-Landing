import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  User, 
  ArrowRight, 
  Info, 
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Activity,
  Layers
} from 'lucide-react';

export const AiSection = ({ onOpenTrial }) => {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const queries = [
    {
      id: 'bottleneck',
      label: 'Bottleneck Discovery',
      question: 'Identify the biggest bottleneck in this value stream.',
      answer: 'Based on the sample process data, Process 3 has the highest cycle time relative to takt time. Review its capacity and downtime before selecting an improvement.',
      highlightStation: 'p3',
      metrics: {
        takt: '120s',
        cycleTime: '142s (+18% over takt)',
        wip: '3.4 days (Buffer 2)',
        recommendation: 'Rebalance 25s manual inspection to Station 4'
      }
    },
    {
      id: 'leadtime',
      label: 'Lead Time Reduction',
      question: 'How can we reduce total manufacturing lead time from 13.2 days?',
      answer: 'Inventory buffers contribute 94% of total lead time (12.4 days out of 13.2 days). Introducing a pull supermarket between Machining and Heat Treat can reduce intermediate inventory by an estimated 60% without starving downstream lines.',
      highlightStation: 'p2',
      metrics: {
        takt: '120s',
        cycleTime: '110s (Within Takt)',
        wip: '2.8 days (Buffer 1)',
        recommendation: 'Implement 2-bin Kanban replenishment'
      }
    },
    {
      id: 'balance',
      label: 'Takt Balance Check',
      question: 'Are all stations balanced to customer takt time?',
      answer: 'Process 1 operates at 85s (71% takt), Process 2 at 110s (92% takt), and Process 3 at 142s (118% takt - overloaded). Process 3 is the only station violating line balance.',
      highlightStation: 'p3',
      metrics: {
        takt: '120s',
        cycleTime: '85s / 110s / 142s',
        wip: '1,530 pcs excess',
        recommendation: 'Split inspection task to restore flow'
      }
    }
  ];

  const currentQuery = queries[activeQueryIndex];

  // Progressive typewriter effect for the AI assistant response
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < currentQuery.answer.length) {
        setDisplayedText((prev) => prev + currentQuery.answer.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [activeQueryIndex]);

  return (
    <section id="ai-section" className="py-24 md:py-36 bg-[#FAFAF9] text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-white border border-slate-200 text-indigo-700 mb-5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-ASSISTED OPERATIONAL INTELLIGENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
            More than a map.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-800">
              A clearer understanding of your factory.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            VSM Cloud brings intelligent diagnostic assistance into Value Stream Mapping, helping industrial engineers analyse process parameters, detect capacity mismatches, and explore targeted Kaizen opportunities.
          </p>
        </div>

        {/* Dual Column AI Experience: Left is AI Chat, Right is Linked VSM Canvas Highlight */}
        <div className="mt-14 sm:mt-18 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Chat Terminal */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white shadow-xl overflow-hidden flex flex-col justify-between min-h-[500px]">
            
            {/* Top Bar of the AI Terminal */}
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-slate-900">VSM Cloud Diagnostic Assistant</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Line 01 Context Ready</span>
              </div>
            </div>

            {/* Prompt Selector Pills */}
            <div className="bg-slate-50/60 px-4 sm:px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Sample Queries:
              </span>
              {queries.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setActiveQueryIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeQueryIndex === idx
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="p-5 sm:p-6 space-y-5 flex-1 bg-[#FAFBFD]">
              
              {/* User Bubble */}
              <div className="flex items-start gap-3 max-w-lg ml-auto justify-end">
                <div className="bg-slate-900 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-xs text-sm leading-relaxed font-medium">
                  {currentQuery.question}
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>

              {/* Assistant Bubble */}
              <div className="flex items-start gap-3 max-w-lg mr-auto">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-indigo-600 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl rounded-tl-xs shadow-sm text-sm leading-relaxed text-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 pb-2 border-b border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Analytical Summary
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {isTyping ? 'Generating...' : 'Complete'}
                    </span>
                  </div>

                  <p className="text-slate-800 font-normal leading-relaxed">
                    {displayedText}
                    {isTyping && <span className="inline-block w-1.5 h-4 bg-indigo-600 ml-1 animate-pulse" />}
                  </p>

                  {/* Contextual Metric Pill */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-500 text-[10px] block">Takt Threshold</span>
                      <span className="font-bold text-slate-900">{currentQuery.metrics.takt}</span>
                    </div>
                    <div className="bg-rose-50 p-2 rounded-lg border border-rose-200 text-rose-800">
                      <span className="text-rose-600 text-[10px] block">Observed Cycle</span>
                      <span className="font-bold text-rose-700">{currentQuery.metrics.cycleTime}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Input Bar Placeholder */}
            <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              <input
                type="text"
                readOnly
                value="Select a sample query above to trigger live diagnostic analysis..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
              />
              <button
                onClick={() => onOpenTrial({ mode: 'trial' })}
                className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Try In Trial
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Demonstration based on simulated process parameters. Engineering validation required.</span>
            </div>

          </div>

          {/* Right: Linked Visual VSM Highlight View */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl text-slate-900 flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-mono text-blue-700 font-semibold">Live Visual Context Linked</span>
                </div>
                <span className="text-slate-500 text-[11px]">Dynamic Canvas Reaction</span>
              </div>

              {/* Visual Map Representation Showing Highlighted Process */}
              <div className="mt-6 space-y-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block font-mono">
                  Workstation Telemetry View
                </span>

                {/* Station 1 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold">1</span>
                    <span className="text-slate-800 font-sans font-medium">CNC Machining</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span>C/T: <strong className="text-slate-900">85s</strong></span>
                    <span className="text-emerald-600 font-semibold">Within Takt</span>
                  </div>
                </div>

                {/* Station 2 */}
                <div className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between text-xs font-mono ${
                  currentQuery.highlightStation === 'p2'
                    ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded flex items-center justify-center font-bold ${
                      currentQuery.highlightStation === 'p2' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>2</span>
                    <span className="text-slate-900 font-sans font-medium">Heat &amp; Wash</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>C/T: <strong className="text-slate-900">110s</strong></span>
                    <span className={currentQuery.highlightStation === 'p2' ? 'text-blue-700 font-bold' : 'text-emerald-600 font-semibold'}>
                      {currentQuery.highlightStation === 'p2' ? 'Supermarket Focus' : 'Within Takt'}
                    </span>
                  </div>
                </div>

                {/* Station 3 — The Highlighted Bottleneck */}
                <div className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                  currentQuery.highlightStation === 'p3'
                    ? 'bg-rose-50/90 border-rose-300 ring-2 ring-rose-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded bg-rose-600 text-white flex items-center justify-center font-bold">3</span>
                      <span className="text-slate-900 font-sans font-bold text-sm flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-500 inline" />
                        Final Assembly &amp; Test
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-bold">
                      Bottleneck Detected
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-2 border-t border-slate-200/80 text-slate-700">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Cycle Time</span>
                      <span className="text-rose-600 font-bold">142s &gt; 120s</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">WIP Queue</span>
                      <span className="text-amber-600 font-bold">3.4 Days</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Capacity Gap</span>
                      <span className="text-rose-600 font-bold">-22 sec</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Action Strip */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Explore AI-assisted Lean diagnostics in your own plant</span>
              <button
                onClick={() => onOpenTrial({ mode: 'trial' })}
                className="font-semibold text-slate-900 hover:text-indigo-600 inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Explore AI-powered VSM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
