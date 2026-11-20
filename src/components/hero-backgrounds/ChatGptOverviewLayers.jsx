import React, { useEffect, useState } from 'react';
import { ArrowUpRight, AlertTriangle, Sparkles, CheckCircle2, Activity, Layers, TrendingDown } from 'lucide-react';

/**
 * 2.5D Spring Artifact Layer System for Clean White Theme.
 * Floating stickers & artifacts that dynamically glide, scale, and rotate with 720ms spring physics
 * (cubic-bezier(0.22, 1, 0.36, 1)) on mode change, with subtle cursor parallax depth.
 */
export const ChatGptOverviewLayers = ({ mode = 'map' }) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 26;
      targetY = (e.clientY / innerHeight - 0.5) * 26;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setParallax({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Mode-dependent coordinates & transforms for the 5 signature 2.5D layers
  const configs = {
    map: {
      badge: { x: '11%', y: '16%', rot: '-11deg', scale: 1 },
      arrow: { x: '51%', y: '8%', rot: '0deg', scale: 1 },
      globe: { x: '88%', y: '17%', rot: '7deg', scale: 1 },
      token: { x: '7%', y: '64%', rot: '4deg', scale: 1 },
      asterisk: { x: '91%', y: '58%', rot: '12deg', scale: 1 }
    },
    analyze: {
      badge: { x: '13%', y: '14%', rot: '-8deg', scale: 1.03 },
      arrow: { x: '49%', y: '6%', rot: '15deg', scale: 0.95 },
      globe: { x: '86%', y: '19%', rot: '-4deg', scale: 0.98 },
      token: { x: '8%', y: '60%', rot: '-6deg', scale: 1.02 },
      asterisk: { x: '89%', y: '62%', rot: '28deg', scale: 1.05 }
    },
    optimize: {
      badge: { x: '10%', y: '18%', rot: '-14deg', scale: 1.02 },
      arrow: { x: '52%', y: '9%', rot: '-10deg', scale: 1.05 },
      globe: { x: '89%', y: '15%', rot: '14deg', scale: 1.02 },
      token: { x: '6%', y: '66%', rot: '8deg', scale: 0.98 },
      asterisk: { x: '92%', y: '55%', rot: '4deg', scale: 1 }
    }
  };

  const current = configs[mode] || configs.map;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none">
      
      {/* LAYER 1: Top-Left Architectural Glassmorphic Badge */}
      <div
        className="absolute transition-all duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: current.badge.x,
          top: current.badge.y,
          transform: `translate(-50%, -50%) translate3d(${parallax.x * 1.5}px, ${parallax.y * 1.5}px, 0) rotate(${current.badge.rot}) scale(${current.badge.scale})`,
        }}
      >
        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 text-slate-900 shadow-xl">
          {mode === 'map' && (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <div>
                <div className="text-[11px] font-mono font-bold text-blue-700 tracking-wider uppercase">VSM Flow 2.4</div>
                <div className="text-[10px] font-mono text-slate-500">Cycle Time: 85s (Line 1)</div>
              </div>
            </>
          )}
          {mode === 'analyze' && (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <div>
                <div className="text-[11px] font-mono font-bold text-rose-700 tracking-wider uppercase">Bottleneck Radar</div>
                <div className="text-[10px] font-mono text-slate-500">St 03 (118% Takt Overload)</div>
              </div>
            </>
          )}
          {mode === 'optimize' && (
            <>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div>
                <div className="text-[11px] font-mono font-bold text-emerald-700 tracking-wider uppercase">-63% Lead Time</div>
                <div className="text-[10px] font-mono text-slate-500">13.2d → 4.8d (Target Flow)</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* LAYER 2: Top-Center Minimalist Arrow */}
      <div
        className="absolute transition-all duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: current.arrow.x,
          top: current.arrow.y,
          transform: `translate(-50%, -50%) translate3d(${parallax.x * 1.1}px, ${parallax.y * 1.1}px, 0) rotate(${current.arrow.rot}) scale(${current.arrow.scale})`,
        }}
      >
        <div className="hidden lg:block opacity-75 hover:opacity-100 transition-opacity">
          <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* LAYER 3: Top-Right 3D Wireframe Globe */}
      <div
        className="absolute transition-all duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: current.globe.x,
          top: current.globe.y,
          transform: `translate(-50%, -50%) translate3d(${parallax.x * 1.8}px, ${parallax.y * 1.8}px, 0) rotate(${current.globe.rot}) scale(${current.globe.scale})`,
        }}
      >
        <div className="hidden md:block opacity-65 drop-shadow-sm">
          <svg className="w-20 h-20 lg:w-24 lg:h-24 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="50" cy="50" r="46" />
            <ellipse cx="50" cy="50" rx="46" ry="18" />
            <ellipse cx="50" cy="50" rx="46" ry="32" />
            <line x1="4" y1="50" x2="96" y2="50" />
            <ellipse cx="50" cy="50" rx="18" ry="46" />
            <ellipse cx="50" cy="50" rx="32" ry="46" />
            <line x1="50" y1="4" x2="50" y2="96" />
          </svg>
        </div>
      </div>

      {/* LAYER 4: Bottom-Left Monospace ASCII / Kanban Token */}
      <div
        className="absolute transition-all duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: current.token.x,
          top: current.token.y,
          transform: `translate(-50%, -50%) translate3d(${parallax.x * 1.3}px, ${parallax.y * 1.3}px, 0) rotate(${current.token.rot}) scale(${current.token.scale})`,
        }}
      >
        <div className="hidden lg:block">
          <div className="px-3.5 py-2 rounded-xl bg-white/95 border border-slate-200/90 text-slate-800 font-mono text-[11px] shadow-lg backdrop-blur-md">
            {mode === 'map' && (
              <span className="text-blue-700 font-bold">[TAKT: 120s // PULL-FLOW]</span>
            )}
            {mode === 'analyze' && (
              <span className="text-amber-700 font-bold">[WIP: 3.4d / 1,530 PCS]</span>
            )}
            {mode === 'optimize' && (
              <span className="text-emerald-700 font-bold">[SUPERMARKET KANBAN ACTIVE]</span>
            )}
          </div>
        </div>
      </div>

      {/* LAYER 5: Right 8-Point Asterisk Star */}
      <div
        className="absolute transition-all duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          left: current.asterisk.x,
          top: current.asterisk.y,
          transform: `translate(-50%, -50%) translate3d(${parallax.x * 1.7}px, ${parallax.y * 1.7}px, 0) rotate(${current.asterisk.rot}) scale(${current.asterisk.scale})`,
        }}
      >
        <div className="hidden md:block opacity-75 drop-shadow-sm">
          <svg className="w-14 h-14 lg:w-16 lg:h-16 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
            <rect x="44" y="8" width="12" height="84" rx="6" />
            <rect x="8" y="44" width="84" height="12" rx="6" />
            <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(45 50 50)" />
            <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(-45 50 50)" />
          </svg>
        </div>
      </div>

    </div>
  );
};
