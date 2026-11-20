import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Activity, Layers, ArrowUpRight, Zap, Play, Cog } from 'lucide-react';

export const AntigravitySwitch = ({ activeMode, onModeChange }) => {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 140 });
  const [ripple, setRipple] = useState(null);

  const modes = [
    {
      id: 'pacemaker',
      label: 'Pacemaker Gear',
      icon: Cog,
      accent: 'emerald',
      badge: '3D Topography'
    },
    {
      id: 'interactive',
      label: 'Interactive VSM',
      icon: Activity,
      accent: 'blue',
      badge: 'Live Telemetry'
    },
    {
      id: 'ai-radar',
      label: 'AI Bottleneck Radar',
      icon: Sparkles,
      accent: 'violet',
      badge: 'Diagnostics'
    },
    {
      id: 'future',
      label: 'Future-State Flow',
      icon: Layers,
      accent: 'emerald',
      badge: 'Target Architecture'
    }
  ];

  // Calculate sliding pill coordinates on change
  useEffect(() => {
    if (!containerRef.current) return;
    const activeIndex = modes.findIndex((m) => m.id === activeMode);
    const buttons = containerRef.current.querySelectorAll('button[data-mode]');
    
    if (buttons[activeIndex]) {
      const btn = buttons[activeIndex];
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width
      });
    }
  }, [activeMode]);

  const handleSelect = (modeId, e) => {
    onModeChange(modeId);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Dynamic Status HUD Beacon */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-slate-900 text-white shadow-2xs border border-slate-800 animate-in fade-in duration-300">
        <span className={`w-2 h-2 rounded-full animate-ping ${
          activeMode === 'pacemaker' ? 'bg-emerald-400' :
          activeMode === 'interactive' ? 'bg-blue-400' : 
          activeMode === 'ai-radar' ? 'bg-violet-400' : 'bg-emerald-400'
        }`} />
        <span>
          {activeMode === 'pacemaker' && 'VIEW: 3D TOPOGRAPHIC PACEMAKER GEAR (FLOW RHYTHM)'}
          {activeMode === 'interactive' && 'VIEW: REAL-TIME WORKSTATION TELEMETRY'}
          {activeMode === 'ai-radar' && 'VIEW: AI BOTTLENECK RADAR ACTIVE'}
          {activeMode === 'future' && 'VIEW: FUTURE-STATE KANBAN ARCHITECTURE'}
        </span>
      </div>

      {/* Floating Antigravity Glass Switch Bar */}
      <div
        ref={containerRef}
        className="relative inline-flex items-center p-1.5 rounded-full bg-slate-100/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs overflow-x-auto max-w-full"
      >
        {/* Sliding Fluid Indicator Pill with Spring Easing */}
        <div
          className="absolute top-1.5 bottom-1.5 rounded-full bg-black text-white shadow-sm transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] duration-300 pointer-events-none"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />

        {/* Mode Switch Buttons */}
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              data-mode={mode.id}
              onClick={(e) => handleSelect(mode.id, e)}
              data-cursor="pointer"
              className={`relative z-10 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none shrink-0 ${
                isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isActive ? 'scale-110 text-emerald-400' : 'text-slate-500'
              }`} />

              <span>{mode.label}</span>

              {/* Mode Accent Dot */}
              {isActive && (
                <span className={`w-1.5 h-1.5 rounded-full ${
                  mode.accent === 'blue' ? 'bg-blue-400' : mode.accent === 'violet' ? 'bg-violet-400' : 'bg-emerald-400'
                }`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
