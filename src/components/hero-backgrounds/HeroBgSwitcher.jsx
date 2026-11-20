import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, Sparkles, Check, RefreshCw } from 'lucide-react';

export const BG_OPTIONS = [
  {
    id: 'chatgpt-overview',
    label: 'ChatGPT Overview',
    tag: 'Flagship',
    description: 'Exact 2.5D Spring Artifacts, Parallax & Interactive Mode Headline'
  },
  {
    id: 'flow-ribbons',
    label: 'Flow Ribbons',
    tag: 'Lean Flow',
    description: 'Continuous value streams with traveling takt-time pulses'
  },
  {
    id: 'blueprint-grid',
    label: 'Blueprint Grid',
    tag: 'Precision',
    description: 'Clean architectural grid with traveling laser beams'
  },
  {
    id: 'aurora-mesh',
    label: 'Aurora Mesh',
    tag: 'Soft Ambient',
    description: 'Calm, organic morphing gradient clouds with parallax'
  },
  {
    id: 'dot-matrix',
    label: 'Dot Matrix',
    tag: 'Interactive',
    description: 'Precision 2D dot matrix with mouse proximity ripple'
  },
  {
    id: 'minimalist-cad',
    label: 'Minimalist CAD',
    tag: 'Ultra-Clean',
    description: 'Distraction-free Swiss engineering layout with crosshairs'
  },
  {
    id: 'particle-vortex',
    label: 'Original Vortex',
    tag: 'Legacy',
    description: 'Original swirling particle vortex canvas'
  }
];

export const HeroBgSwitcher = ({ currentBg, onSelectBg }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-full px-4 select-none pointer-events-auto">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl p-2 sm:p-2.5 transition-all duration-300">
        
        {/* Header Bar with Toggle */}
        <div className="flex items-center justify-between gap-3 px-2 py-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              Hero Style Preview
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono">
              ({BG_OPTIONS.find(o => o.id === currentBg)?.label || 'Selected'})
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title={isExpanded ? 'Minimize Toolbar' : 'Expand Toolbar'}
          >
            <span className="text-[11px] font-mono">{isExpanded ? 'Hide' : 'Options'}</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Option Pills */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-1.5 max-w-[95vw]">
            {BG_OPTIONS.map((option) => {
              const isActive = currentBg === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onSelectBg(option.id)}
                  className={`group relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-102 font-semibold'
                      : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50'
                  }`}
                  title={option.description}
                >
                  {isActive && <Check className="w-3 h-3 text-white" />}
                  <span>{option.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-mono ${
                    isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-700 text-slate-400 group-hover:text-slate-300'
                  }`}>
                    {option.tag}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
