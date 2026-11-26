import React, { useRef, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Box, 
  FileText, 
  Activity,
  Layers,
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const EverythingInBetweenSection = ({ onOpenTrial }) => {
  const { theme } = useTheme();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const features = [
    {
      id: 'interactive-vsm',
      title: 'Auto-Drawn VSM Canvas',
      description: 'Enter your process data once and VSM 4.0 draws the map — process boxes, supplier and customer, inventory triangles and information flow — with a standard Lean symbol library to add more.',
      tag: 'Digital Canvas',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center text-neutral-500">
              <span>Canvas Objects:</span>
              <span className="text-emerald-600 font-bold">12 Active Nodes</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Process Box</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Supermarket</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">FIFO Lane</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Data Table</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              Drawn automatically from process data
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-analysis',
      title: 'Bottleneck & Takt Analysis',
      description: 'Smart Improve compares every step against takt time, flags bottlenecks, and ranks findings by impact so you know where waiting and waste build up.',
      tag: 'Takt & Cycle Time',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] text-neutral-500">
              <span>Cycle Time vs Takt:</span>
              <span className="text-rose-600 font-bold">⚠️ 1 Over Takt</span>
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-10 text-neutral-400">STN 1</span>
                <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 h-3 rounded overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '60%' }} />
                </div>
                <span className="text-neutral-500">85s</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-10 text-rose-500 font-bold">STN 2</span>
                <div className="flex-1 bg-rose-100 dark:bg-rose-950/40 h-3 rounded overflow-hidden border border-rose-300 dark:border-rose-800">
                  <div className="bg-rose-600 h-full" style={{ width: '95%' }} />
                </div>
                <span className="text-rose-600 font-bold">142s</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-10 text-neutral-400">STN 3</span>
                <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 h-3 rounded overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '70%' }} />
                </div>
                <span className="text-neutral-500">98s</span>
              </div>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-rose-200 dark:border-rose-900 shadow-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-rose-600 dark:text-rose-400">
              Station 2: +18% over 120s Takt
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'smart-planning',
      title: 'Smart Improvement Planning',
      description: 'Turn findings into a future state in the Future State Planner: add supermarkets, FIFO lanes and pull loops, then generate the future-state map.',
      tag: 'Kanban & WIP Control',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="font-bold text-black dark:text-white flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-amber-500" />
                Supermarket #02
              </span>
              <span className="text-emerald-600 font-bold">120 / 150 pcs</span>
            </div>
            <div className="grid grid-cols-6 gap-1 h-5 items-center bg-white dark:bg-[#141414] p-1 rounded border border-neutral-200 dark:border-neutral-800">
              <span className="h-full bg-emerald-500 rounded-xs" />
              <span className="h-full bg-emerald-500 rounded-xs" />
              <span className="h-full bg-emerald-500 rounded-xs" />
              <span className="h-full bg-emerald-500 rounded-xs" />
              <span className="h-full bg-neutral-300 dark:bg-neutral-700 rounded-xs" />
              <span className="h-full bg-neutral-200 dark:bg-neutral-800 rounded-xs border border-dashed border-neutral-400" />
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-emerald-200 dark:border-emerald-800 shadow-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              FIFO Buffer Lane Sized to 120 pcs
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'kaizen-tracking',
      title: 'Kaizen and Improvement Tracking',
      description: 'Mark Kaizen bursts on the future-state map and track every improvement initiative, with its expected impact, across all your value streams.',
      tag: 'Kaizen Bursts',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-black dark:text-white">Kaizen Action #KZ-04</span>
              <span className="text-[10px] text-amber-600 font-bold">In Progress</span>
            </div>
            <p className="text-[10px] text-neutral-500 font-sans leading-snug">
              SMED changeover reduction on Die Cutter #2 from 45m ➔ 12m.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-amber-200 dark:border-amber-800 shadow-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              -73% Changeover Time Target
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'map-levels',
      title: 'Three Levels of Mapping',
      description: 'Map a single process line, a whole facility, or the extended value stream across suppliers, plants and customers, each with the detail it needs.',
      tag: 'Process · Facility · Extended',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1 text-[11px]">
            <div className="flex justify-between text-neutral-500">
              <span>Process level:</span>
              <span className="text-black dark:text-white font-bold">One line</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Facility level:</span>
              <span className="text-black dark:text-white font-bold">Whole plant</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Extended level:</span>
              <span className="text-emerald-600 font-bold">Across sites</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              Parallel flows &amp; sub-assemblies
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'lead-cycle-time',
      title: 'Lead Time and Cycle Time Analysis',
      description: 'Separate true Value-Adding processing touch time from non-value-adding waiting waste. Calculate Process Cycle Efficiency (PCE) in real time.',
      tag: 'PCE & Flow',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1 text-[11px]">
            <div className="flex justify-between text-neutral-500">
              <span>Lead Time:</span>
              <span className="line-through text-neutral-400">13.2d</span>
              <strong className="text-emerald-600 font-bold">4.8d Target</strong>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full w-[36%]" />
              <div className="bg-neutral-300 dark:bg-neutral-700 h-full w-[64%]" />
            </div>
            <div className="flex justify-between text-[10px] text-neutral-500 pt-0.5">
              <span>VA Touch: 429s</span>
              <span>PCE: 34.2%</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-blue-200 dark:border-blue-900 shadow-sm flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-blue-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              Inventory cost: current vs future
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'current-vs-future',
      title: 'Current vs Future State Comparison',
      description: 'Side-by-side analytics for lead time, value-add time, process cycle efficiency, cost and process steps, before and after your improvements.',
      tag: 'Delta Auditing',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2 rounded bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800">
              <span className="text-neutral-400 block font-bold">Current State Map (Before)</span>
              <span className="text-black dark:text-white">WIP: 5,200 pcs</span>
              <span className="text-neutral-500 block">LT: 13.2 Days</span>
            </div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-[#0E2018] border border-emerald-300 dark:border-emerald-800">
              <span className="text-emerald-600 block font-bold">Future State Map (Target)</span>
              <span className="text-emerald-700 dark:text-emerald-300">WIP: 1,420 pcs</span>
              <span className="text-emerald-600 block font-bold">LT: 4.8 Days</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-emerald-200 dark:border-emerald-800 shadow-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              -63.6% Total Lead Time Delta
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'reports',
      title: 'Professional VSM Reports',
      description: 'Export maps and analytics as PDF reports, and process data as Excel, ready for Kaizen reviews and steering committees.',
      tag: 'Executive Exports',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-black dark:text-white font-semibold">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>VSM-Analytics-Report.pdf</span>
            </div>
            <span className="text-[10px] text-neutral-400 block">
              Current State Map, Future State Map & analytics • PDF
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-neutral-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              One-click Excel export
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'consulting',
      title: 'Teams & Multiple Organizations',
      description: 'Run several organizations from one account, invite your team with Admin, Editor and Viewer roles, and see live updates while colleagues edit the same map.',
      tag: 'Collaboration',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-black dark:text-white font-semibold">Org: Plant A — Pune</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-black dark:text-white font-semibold">Org: Plant B — Chennai</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">
              Separate organizations &amp; roles
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 border-b border-neutral-200/70 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* HEADER: "Use VSM 4.0 for Current State Map, Future State Map, and everything in between."             */}
        {/* ========================================================================= */}
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.12] text-black dark:text-white">
              Use VSM 4.0 for Current State Map, Future State Map, and <br className="hidden sm:inline" />
              everything in between.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-xl mx-auto">
              Authentic Lean manufacturing capabilities engineered for modern shop floors.
            </p>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
              <button
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous card"
                className={`w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center transition-all duration-150 cursor-pointer ${
                  canScrollLeft 
                    ? 'text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800' 
                    : 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed border-neutral-200 dark:border-neutral-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next card"
                className={`w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center transition-all duration-150 cursor-pointer ${
                  canScrollRight 
                    ? 'text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800' 
                    : 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed border-neutral-200 dark:border-neutral-800'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* HORIZONTAL CAROUSEL CARDS GRID                                            */}
        {/* ========================================================================= */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="w-[320px] sm:w-[360px] lg:w-[380px] shrink-0 snap-start rounded-3xl bg-[#F9F9FB] dark:bg-[#151515] border border-neutral-200/80 dark:border-neutral-800/80 p-7 sm:p-8 flex flex-col justify-between h-[490px] sm:h-[510px] text-left transition-all duration-200 hover:shadow-lg dark:hover:shadow-2xl overflow-hidden group"
            >
              {/* Top Text Content */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1 block">
                  {feature.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Visual Container Peeking Up */}
              <div className="h-[230px] w-full rounded-t-2xl bg-white dark:bg-[#1C1C1C] border-t border-x border-neutral-200/90 dark:border-neutral-700/80 shadow-md p-4 pt-4 relative overflow-hidden flex flex-col justify-between">
                {feature.visual}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
