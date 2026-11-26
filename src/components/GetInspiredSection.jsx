import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, Sparkles, TrendingUp, CheckCircle2, Layers, Cpu, Compass, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const GetInspiredSection = ({ onOpenTrial }) => {
  const { theme } = useTheme();
  const [selectedStory, setSelectedStory] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedStory(null);
      }
    };
    if (selectedStory) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStory]);

  const stories = [
    {
      id: 'automotive-ev',
      company: 'Tier-1 EV Powertrain',
      industry: 'Automotive EV',
      title: 'Compressing battery pack lead time by 64% with digital pull supermarkets',
      subtitle: 'Replaced rigid batch-push schedules with AI-balanced Takt flow and digital Kanban supermarkets across 14 pack assembly cells.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      highlightBadge: '-64% Lead Time',
      metrics: [
        { label: 'Total Lead Time', before: '22 days', after: '7.9 days', change: '-64%' },
        { label: 'WIP Buffer', before: '420 packs', after: '140 packs', change: '-67%' },
        { label: 'Takt Adherence', before: '72%', after: '98%', change: '+26%' },
        { label: 'Floor Space Saved', before: 'Baseline', after: '3,800 sq ft', change: '-35%' }
      ],
      platformWorkflow: {
        csm: {
          step: '1. Current State Mapping',
          headline: 'Gemba reality & hidden waste identified',
          description: 'Digitally mapped 14 sub-assembly stations and battery module queuing. Uncovered 18.5 days of dead inventory buffered between ultrasonic cell weld and pack integration caused by monthly batch-push scheduling.'
        },
        smartImprove: {
          step: '2. Smart Improve (FSPlanner AI)',
          headline: 'Automated line balancing & Kaizen burst simulation',
          description: 'Smart Improve flagged the deburring station as the bottleneck against takt and recommended replacing batch push with a pull supermarket between weld and pack integration.'
        },
        fsm: {
          step: '3. Future State Deployment',
          headline: 'Continuous flow with standardized work',
          description: 'Designed future-state continuous flow with standardized work-in-process (SWIP) buffers, cutting pack cycle variance to under 4% and liberating 3,800 sq ft of high-value clean floor space.'
        }
      },
    },
    {
      id: 'medtech-cleanroom',
      company: 'Precision Medical Devices',
      industry: 'Cleanroom MedTech',
      title: 'Eliminating catheter sterilization starvation and doubling Process Cycle Efficiency',
      subtitle: 'Synchronized ISO Class 7 cleanroom extrusion with dynamic ethylene oxide sterilization queues under strict FDA 21 CFR compliance.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      highlightBadge: '2.2x PCE Efficiency',
      metrics: [
        { label: 'Process Cycle Efficiency', before: '14%', after: '31%', change: '+121%' },
        { label: 'Cleanroom Quarantine WIP', before: '12 days', after: '3.5 days', change: '-71%' },
        { label: 'Sterilization Starvation', before: '18 hrs/wk', after: '0 hrs/wk', change: '-100%' },
        { label: 'Audit Readiness', before: 'Manual logs', after: 'PDF + Excel report', change: 'Digital' }
      ],
      platformWorkflow: {
        csm: {
          step: '1. Current State Mapping',
          headline: 'Complete process & sterile barrier timeline',
          description: 'Mapped end-to-end catheter extrusion, laser micromachining, tipping, and sterile packaging. Revealed that sterilization chamber validation batching was starving downstream packaging lines by 18 hours per week.'
        },
        smartImprove: {
          step: '2. Smart Improve (FSPlanner AI)',
          headline: 'Dynamic queue leveling & constraint relief',
          description: 'The Future State Planner flagged the sterilization step as the constraint, and the team planned a dual FIFO lane with smaller, levelled batches, eliminating packaging starvation without adding cleanroom square footage.'
        },
        fsm: {
          step: '3. Future State Deployment',
          headline: 'Continuous flow future state',
          description: 'Built the future-state map with its timeline ladder and compared it to the current state in VSM Analytics, showing Process Cycle Efficiency rising from 14% to 31%.'
        }
      },
    },
    {
      id: 'aerospace-defense',
      company: 'Commercial Aviation Systems',
      industry: 'Aerospace & Defense',
      title: 'Synchronizing 18 assembly cells to 120s Takt under AS9100 continuous flow',
      subtitle: 'Balanced avionics wire harness and structural sub-assembly to strict customer Takt with automated bottleneck alerts and line leveling.',
      image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
      highlightBadge: '120s Takt Synchronized',
      metrics: [
        { label: 'Takt Time Adherence', before: '58%', after: '99.4%', change: '+71%' },
        { label: 'Station Cycle Variance', before: '45s – 310s', after: '112s – 118s', change: 'Synchronized' },
        { label: 'Overtime Shift Spend', before: '$48k/mo', after: '$3.2k/mo', change: '-93%' },
        { label: 'First-Pass Quality Yield', before: '91.2%', after: '99.1%', change: '+8.6%' }
      ],
      platformWorkflow: {
        csm: {
          step: '1. Current State Mapping',
          headline: 'Full 18-cell avionics workflow diagnosis',
          description: 'Documented 18 manual assembly stations for flight-control avionics. Identified severe cycle time imbalances ranging from 45s up to 310s, triggering systemic line stoppages and expensive overtime work.'
        },
        smartImprove: {
          step: '2. Smart Improve (FSPlanner AI)',
          headline: 'Multi-station work rebalancing',
          description: 'The Future State Planner flagged stations over takt, and the team rebalanced 14 assembly sub-steps, moving non-critical harness pre-forming into feeder sub-assembly to balance every main station below the 120s Takt line.'
        },
        fsm: {
          step: '3. Future State Deployment',
          headline: 'Balanced future state',
          description: 'Exported the Future State Map and analytics as a PDF report for the steering committee, with every main station now below the 120s takt line.'
        }
      },
    }
  ];

  return (
    <section id="examples" className="py-20 md:py-32 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER (Clean ChatGPT Overview Style)                             */}
        {/* ========================================================================= */}
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.12] text-black dark:text-white">
              Example use cases
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Illustrative scenarios showing how a team could apply VSM 4.0 in different industries. Figures are examples, not customer results.
            </p>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 3 STORY CARDS (Clean Minimalist Photo Cards with Authentic Platform Data) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
          {stories.map((story, idx) => (
            <ScrollReveal key={story.id} direction="up" delay={idx * 120} duration={600}>
              <div 
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer text-left flex flex-col h-full rounded-2xl transition-all duration-300"
              >
                {/* Photo Container */}
                <div className="aspect-[4/3] sm:aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-5 relative shadow-sm border border-neutral-200/60 dark:border-neutral-800/80">
                  <img 
                    src={story.image} 
                    alt={story.company} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Top-Left Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-black/80 dark:bg-black/90 text-white backdrop-blur-md shadow-xs">
                      {story.industry}
                    </span>
                  </div>

                  {/* Impact Highlight Badge (Top-Right) */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500 text-black backdrop-blur-md shadow-xs">
                      {story.highlightBadge}
                    </span>
                  </div>

                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>View example walkthrough</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Typography Block */}
                <div className="flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                      {story.company}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white leading-snug flex items-start gap-1 transition-colors">
                      <span>{story.title}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CASE STUDY MODAL (Detailed Platform-Grounded Story)           */}
      {/* ========================================================================= */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="relative bg-white dark:bg-[#141414] text-neutral-900 dark:text-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-neutral-200 dark:border-neutral-800 text-left my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: Industry & Company */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {selectedStory.industry}
              </span>
              <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                • {selectedStory.company}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-neutral-900 dark:text-white pr-8">
              {selectedStory.title}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {selectedStory.subtitle}
            </p>

            {/* Before vs After Metrics Grid */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Example Metrics (Illustrative, Before vs After)</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {selectedStory.metrics.map((m, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#1E1E1E] border border-neutral-200/70 dark:border-neutral-800/80">
                    <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate mb-1">
                      {m.label}
                    </div>
                    <div className="text-base sm:text-lg font-black text-black dark:text-white">
                      {m.after}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 line-through">
                      Was: {m.before}
                    </div>
                    <div className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {m.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Workflow: Current State Map -> Smart Improve -> Future State Map */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>How VSM 4.0 Would Be Used</span>
              </h4>

              {/* Step 1: Current State Map */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#181818] border border-neutral-200/70 dark:border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-black dark:text-white mb-1">
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-white inline-block"></span>
                  {selectedStory.platformWorkflow.csm.step}
                </div>
                <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1">
                  {selectedStory.platformWorkflow.csm.headline}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {selectedStory.platformWorkflow.csm.description}
                </p>
              </div>

              {/* Step 2: Smart Improve */}
              <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {selectedStory.platformWorkflow.smartImprove.step}
                </div>
                <div className="font-semibold text-sm text-amber-950 dark:text-amber-200 mb-1">
                  {selectedStory.platformWorkflow.smartImprove.headline}
                </div>
                <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
                  {selectedStory.platformWorkflow.smartImprove.description}
                </p>
              </div>

              {/* Step 3: Future State Map */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedStory.platformWorkflow.fsm.step}
                </div>
                <div className="font-semibold text-sm text-emerald-950 dark:text-emerald-200 mb-1">
                  {selectedStory.platformWorkflow.fsm.headline}
                </div>
                <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                  {selectedStory.platformWorkflow.fsm.description}
                </p>
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                Ready to map and transform your value stream?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    onOpenTrial({ mode: 'trial' });
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
                >
                  Start free trial
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
