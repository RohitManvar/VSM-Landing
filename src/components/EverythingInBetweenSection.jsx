import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Table2, Workflow, Layers, Sparkles, FileText, Users } from 'lucide-react';
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

  // Every card is a feature that ships in the VSM 4.0 app (same list as the desktop story).
  const features = [
    {
      id: 'builder',
      tag: 'Process Builder',
      title: 'Import Steps from Excel',
      description: 'Bring in your process steps from an Excel sheet, or build them by hand: cycle time, changeover, OEE, rework, rejection and inventory for every step.',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="text-neutral-500">Fields per process step:</div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Cycle time</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Changeover</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">OEE</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Rework</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Rejection</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Inventory</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Table2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">Excel import with field mapping</div>
          </div>
        </div>
      )
    },
    {
      id: 'canvas',
      tag: 'Auto-drawn maps',
      title: 'The Map Draws Itself',
      description: 'Enter the data once and the current state map appears with standard Lean symbols: process boxes, inventory, information flow and the timeline.',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-neutral-500"><span>Takt time:</span><span className="text-black dark:text-white font-bold">28.2 s</span></div>
            <div className="flex justify-between text-neutral-500"><span>Lead time:</span><span className="text-black dark:text-white font-bold">16.5 days</span></div>
            <div className="flex justify-between text-neutral-500"><span>Value-add time:</span><span className="text-black dark:text-white font-bold">156 s</span></div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">Calculated live from your process data</div>
          </div>
        </div>
      )
    },
    {
      id: 'levels',
      tag: 'Process · Facility · Extended',
      title: 'Three Levels of Mapping',
      description: 'Map one line, a whole plant, or the chain from supplier to customer. Each level has its own current state map, planner and future state map.',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-neutral-500"><span>Process level:</span><span className="text-black dark:text-white font-bold">One line</span></div>
            <div className="flex justify-between text-neutral-500"><span>Facility level:</span><span className="text-black dark:text-white font-bold">Whole plant</span></div>
            <div className="flex justify-between text-neutral-500"><span>Extended level:</span><span className="text-black dark:text-white font-bold">Supplier to customer</span></div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">CSM, FS Planner and FSM at every level</div>
          </div>
        </div>
      )
    },
    {
      id: 'improve',
      tag: 'Smart Improve',
      title: 'Rules plus AI Recommendations',
      description: 'Every step is checked against takt, balance loss and yield, and AI reads the notes you take on the floor. Client and site names never leave the app.',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center text-neutral-500">
              <span>Gear Hobbing vs takt:</span>
              <span className="text-rose-600 font-bold">31 s &gt; 28.2 s</span>
            </div>
            <p className="text-[10px] text-neutral-500 font-sans leading-snug">
              Bottleneck. Add a parallel workstation or cut 2.8 s.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">One click applies it to the future state</div>
          </div>
        </div>
      )
    },
    {
      id: 'exports',
      tag: 'Exports',
      title: 'PDF, SVG and Excel',
      description: 'Export maps as multi-page PDFs with a print preview, as SVG for your slides, and your improvement points as an Excel summary sheet.',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="text-neutral-500">Export formats:</div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">PDF (multi-page)</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">SVG</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Excel summary</span>
              <span className="p-1 rounded bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 text-center">Print preview</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">Ready for Kaizen reviews</div>
          </div>
        </div>
      )
    },
    {
      id: 'teams',
      tag: 'Collaboration',
      title: 'Roles and Edit Locks',
      description: 'Invite your team as Admin, Editor or Viewer. Only one person edits a value stream at a time, and everyone else sees the changes live.',
      visual: (
        <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
          <div className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex justify-between text-neutral-500"><span>Admin:</span><span className="text-black dark:text-white font-bold">Manage team</span></div>
            <div className="flex justify-between text-neutral-500"><span>Editor:</span><span className="text-black dark:text-white font-bold">Edit maps</span></div>
            <div className="flex justify-between text-neutral-500"><span>Viewer:</span><span className="text-black dark:text-white font-bold">View only</span></div>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500 shrink-0" />
            <div className="text-[11px] font-sans font-semibold text-black dark:text-white">One editor at a time, live updates for all</div>
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
              From the first walk on the floor to the future state, in one place.
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
