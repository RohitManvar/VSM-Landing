import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const MapAnalyzeImproveShowcase = ({ onOpenTrial }) => {
  const { theme } = useTheme();
  // 'csm' | 'improve-intelligence' | 'fsm'
  const [activeTab, setActiveTab] = useState('csm');
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the 3 tabs every 5 seconds if user is not hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 'csm') return 'improve-intelligence';
        if (prev === 'improve-intelligence') return 'fsm';
        return 'csm';
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const tabs = [
    {
      id: 'csm',
      title: 'Current State Map',
      subtitle: 'For baseline gemba mapping and process data.',
      description: 'Map your as-is value stream from gemba data: cycle time, changeover, OEE, rework, rejection and inventory for every step. Type it in or import it from Excel, and VSM 4.0 draws the current-state map with lead time and value-add time.',
      linkText: 'Explore Current State Map Page',
      image: '/assets/vsm-csm-preview.png',
      badge: 'Current State Map Page',
      fileBreadcrumb: 'csm-map-page.vsm',
      badgeColor: 'bg-black/85 dark:bg-white/90 text-white dark:text-black',
      statusText: 'Active: Current State Map Page'
    },
    {
      id: 'improve-intelligence',
      title: 'Smart Improve',
      subtitle: 'For automated bottleneck diagnostics and AI recommendations.',
      description: 'The Future State Planner checks every step against takt time and data coverage, then ranks findings by impact (bottlenecks, long changeovers, excess inventory) with a recommended action for each. Optional AI refinement adds deeper suggestions.',
      linkText: 'See Smart Improve',
      image: '/assets/vsm-smart-improve-preview.png',
      badge: 'Smart Improve: Future State Planner',
      fileBreadcrumb: 'improve-intelligence.vsm',
      badgeColor: 'bg-amber-500 text-black',
      statusText: 'Active: Smart Improve — Future State Planner'
    },
    {
      id: 'fsm',
      title: 'Future State Map',
      subtitle: 'For future-state continuous flow and pull systems.',
      description: 'Generate the future-state map from your plan: supermarkets, FIFO lanes and Kaizen bursts. Then compare it with the current state in VSM Analytics (lead time, value-add time, PCE and cost) and export it as a PDF report.',
      linkText: 'View target Future State Map',
      image: '/assets/vsm-fsm-preview.png',
      badge: 'Future State Map Page',
      fileBreadcrumb: 'fsm-map-page.vsm',
      badgeColor: 'bg-emerald-600 text-white',
      statusText: 'Active: Future State Map Page'
    }
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section 
      id="product-showcase" 
      className="py-20 md:py-32 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 border-b border-neutral-100 dark:border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Left Vertical Interactive Tabs (ChatGPT Reference) + Right Mac App Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: 3 INTERACTIVE TABS (Current State Map, Improve Intelligence, Future State Map)          */}
          {/* ========================================================================= */}
          <div 
            className="lg:col-span-5 text-left"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="border-t border-neutral-200 dark:border-neutral-800">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsPaused(true);
                    }}
                    onMouseEnter={() => {
                      setActiveTab(tab.id);
                      setIsPaused(true);
                    }}
                    className="border-b border-neutral-200 dark:border-neutral-800 py-6 sm:py-8 cursor-pointer transition-all duration-200 group"
                  >
                    {/* Tab Header Title */}
                    <h3 
                      className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-200 ${
                        isActive 
                          ? 'text-black dark:text-white' 
                          : 'text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300'
                      }`}
                    >
                      {tab.title}
                    </h3>

                    {/* Expanded Content when Active (Matching ChatGPT Reference) */}
                    {isActive && (
                      <div className="mt-4 space-y-4 animate-in fade-in duration-200">
                        <p className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-neutral-200 leading-snug">
                          {tab.subtitle}
                        </p>
                        
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                          {tab.description}
                        </p>

                        <div className="pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenTrial({ mode: 'trial' });
                            }}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer group/link"
                          >
                            <span>{tab.linkText}</span>
                            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/link:text-black dark:group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: MAC STUDIO WINDOW (Real Screenshot of Current State Map / Improve / Future State Map)   */}
          {/* ========================================================================= */}
          <div 
            className="lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-[#141414] text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-200 text-left">
              
              {/* Window Title Bar */}
              <div className="min-h-[44px] px-3 sm:px-4 py-2 bg-[#1E1E1E] border-b border-neutral-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]" />
                </div>

                <div className="min-w-0 flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-neutral-400">
                  <span className="text-white font-semibold font-sans shrink-0">VSM 4.0 Studio</span>
                  <span className="shrink-0">/</span>
                  <span className="text-neutral-300 truncate">{currentTab.fileBreadcrumb}</span>
                </div>

                <div className="flex items-center gap-2 text-neutral-400 shrink-0">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Window Body: Real Full-Res Screenshots */}
              <div className="relative overflow-hidden bg-[#181818] aspect-video">
                
                {/* Image Display */}
                <div key={currentTab.id} className="w-full h-full animate-in fade-in zoom-in-98 duration-200 relative group">
                  <img 
                    src={currentTab.image} 
                    alt={currentTab.badge} 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold backdrop-blur-md shadow-md ${currentTab.badgeColor}`}>
                      {currentTab.badge}
                    </span>
                  </div>
                </div>

              </div>

              {/* Window Footer Status Bar */}
              <div className="min-h-[40px] px-3 sm:px-4 py-2 bg-[#1A1A1A] border-t border-neutral-800 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-neutral-400">
                <span className="min-w-0 truncate">{currentTab.statusText}</span>
                <button 
                  onClick={() => onOpenTrial({ mode: 'trial' })}
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
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
