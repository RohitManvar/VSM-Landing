import { APP_LOGIN_URL } from '../config/app';
import React, { useState, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight,
  Sun,
  Moon,
  Box,
  Truck,
  Zap,
  Flame,
  AlertTriangle,
  Sparkles,
  TrendingDown,
  Layers,
  Activity,
  Users,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { VsmLogo } from './VsmLogo';

// `minimal`: only the logo (left) and Login + Try VSM 4.0 (right) — used during the intro.
const minimalHide = (minimal) => ({
  opacity: minimal ? 0 : 1,
  pointerEvents: minimal ? 'none' : undefined,
  transition: 'opacity 300ms ease'
});

export const Navbar = ({ onOpenTrial, onOpenDemo, onNavigatePricing, onNavigateHome, minimal = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header className="sticky top-0 z-50 select-none bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/80 transition-colors duration-200">
      
      {/* ChatGPT Standard Header Height: h-[56px] sm:h-[60px] */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 h-[56px] sm:h-[60px] relative flex items-center justify-between">
        
        {/* 1. LEFT: VSM 4.0 Logo and Wordmark (Auto switches Black <-> White) */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => {
              if (onNavigateHome) {
                e.preventDefault();
                onNavigateHome();
              }
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <VsmLogo size="md" showText={true} />
          </a>
        </div>

        {/* 2. CENTER: Navigation Links (Current State Map, Smart Improve, Future State Map, Features, Learn, Pricing) */}
        <nav 
          className="hidden xl:flex items-center gap-2 whitespace-nowrap text-[14px] font-normal text-neutral-600 dark:text-neutral-300 absolute left-1/2 -translate-x-1/2"
          style={minimalHide(minimal)}
          aria-hidden={minimal || undefined}
          onMouseLeave={handleMouseLeave}
        >
          {/* ------------------------------------------------------------- */}
          {/* ITEM 1: Current State Map (CURRENT STATE MAP) - INTERACTIVE HOVER PREVIEW   */}
          {/* ------------------------------------------------------------- */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('csm')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#product-showcase"
              className={`transition-all duration-150 cursor-pointer block ${
                activeDropdown === 'csm' 
                  ? 'px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-medium' 
                  : 'px-2.5 py-1 hover:text-black dark:hover:text-white'
              }`}
            >
              Current State Map
            </a>

            {/* Current State Map Hover Dropdown Panel */}
            {activeDropdown === 'csm' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('csm')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-[420px] rounded-2xl p-5 border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-left">
                  
                  {/* Header & Description */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h4 className="font-bold text-sm text-black dark:text-white">
                          Current State Map
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                        Create and visualize your current-state value stream.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      Baseline
                    </span>
                  </div>

                  {/* VSM Symbols & Icons Grid */}
                  <div className="bg-neutral-50 dark:bg-[#121212] rounded-xl p-3 border border-neutral-200/70 dark:border-neutral-800/70 mb-3.5">
                    <div className="text-[10px] font-mono font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      Standard VSM Symbols Supported:
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-[11px] font-sans text-neutral-700 dark:text-neutral-300">
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">Customer</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <Truck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">Supplier</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <Box className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="truncate">Process</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <span className="text-amber-500 font-bold leading-none shrink-0">▲</span>
                        <span className="truncate">Inventory</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <Zap className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span className="truncate">Info Flow</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <Activity className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="truncate">Operator</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <Layers className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">Data Box</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800">
                        <Truck className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span className="truncate">Transport</span>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Preview of Current State Map Canvas */}
                  <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-3 relative group/img">
                    <img 
                      src="/assets/vsm-csm-preview.png" 
                      alt="Current State Map Canvas Preview" 
                      className="w-full h-28 object-cover object-top transition-transform duration-300 group-hover/img:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-mono text-white font-medium">
                        Live Digital VSM Canvas • Cycle time, C/O &amp; WIP
                      </span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <a
                    href="#product-showcase"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 pt-1"
                  >
                    <span>Open Current State Map Page</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>

                </div>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ITEM 2: SMART IMPROVE (FSPLANNER) - INTERACTIVE HOVER PREVIEW */}
          {/* ------------------------------------------------------------- */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('smart-improve')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#product-showcase"
              className={`transition-all duration-150 cursor-pointer block ${
                activeDropdown === 'smart-improve' 
                  ? 'px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-medium' 
                  : 'px-2.5 py-1 hover:text-black dark:hover:text-white'
              }`}
            >
              Smart Improve
            </a>

            {/* Smart Improve Hover Dropdown Panel */}
            {activeDropdown === 'smart-improve' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('smart-improve')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-[430px] rounded-2xl p-5 border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-left">
                  
                  {/* Header & Description */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <h4 className="font-bold text-sm text-black dark:text-white">
                          Smart Improve (FSPlanner)
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                        Analyze your current state and discover smarter ways to improve.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                      AI Diagnostics
                    </span>
                  </div>

                  {/* Lean Improvement Tags Grid */}
                  <div className="bg-neutral-50 dark:bg-[#121212] rounded-xl p-3 border border-neutral-200/70 dark:border-neutral-800/70 mb-3.5 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                      <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800 text-rose-700 dark:text-rose-300">
                        <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="font-semibold">Kaizen Bursts</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800 text-amber-700 dark:text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-semibold">Bottleneck Alerts</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800 text-teal-700 dark:text-teal-300">
                        <TrendingDown className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span className="font-semibold">Lead-Time Cut (-64%)</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-white dark:bg-[#1E1E1E] border border-neutral-200/60 dark:border-neutral-800 text-purple-700 dark:text-purple-300">
                        <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="font-semibold">AI Recommendations</span>
                      </div>
                    </div>

                    {/* AI Recommendation Simulation Pill */}
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/70 text-[10px] text-purple-900 dark:text-purple-200 font-mono">
                      ✨ AI: Rebalance 25s deburring from STN 03 ➔ STN 04 to balance Takt.
                    </div>
                  </div>

                  {/* Thumbnail Preview of FSPlanner */}
                  <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-3 relative group/img">
                    <img 
                      src="/assets/vsm-smart-improve-preview.png" 
                      alt="FSPlanner Engine Preview" 
                      className="w-full h-28 object-cover object-top transition-transform duration-300 group-hover/img:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-mono text-white font-medium">
                        FSPlanner Diagnostics • Takt, OEE &amp; Line Balancing
                      </span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <a
                    href="#product-showcase"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 pt-1"
                  >
                    <span>Launch FSPlanner Page</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>

                </div>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ITEM 3: Future State Map (FUTURE STATE MAP) - INTERACTIVE HOVER PREVIEW    */}
          {/* ------------------------------------------------------------- */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('fsm')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#product-showcase"
              className={`transition-all duration-150 cursor-pointer block ${
                activeDropdown === 'fsm' 
                  ? 'px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-medium' 
                  : 'px-2.5 py-1 hover:text-black dark:hover:text-white'
              }`}
            >
              Future State Map
            </a>

            {/* Future State Map Hover Dropdown Panel */}
            {activeDropdown === 'fsm' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('fsm')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-[420px] rounded-2xl p-5 border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-left">
                  
                  {/* Header & Description */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <h4 className="font-bold text-sm text-black dark:text-white">
                          Future State Map
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                        Transform improvement ideas into your future-state value stream.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      Target State
                    </span>
                  </div>

                  {/* Future-State Key Capabilities */}
                  <div className="bg-neutral-50 dark:bg-[#121212] rounded-xl p-3 border border-neutral-200/70 dark:border-neutral-800/70 mb-3.5 space-y-1.5 text-[11px] font-sans">
                    <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                      <span>• 3 Map Levels &amp; Kanban</span>
                      <strong className="text-emerald-600">Zero Overproduction</strong>
                    </div>
                    <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                      <span>• Continuous Flow Connections</span>
                      <strong className="text-black dark:text-white">Balanced to Takt</strong>
                    </div>
                    <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                      <span>• Total Lead Time Compression</span>
                      <strong className="text-emerald-600 font-mono">13.2d ➔ 4.8d</strong>
                    </div>
                    <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                      <span>• Working Capital Freed</span>
                      <strong className="text-emerald-600 font-mono">+$380,000</strong>
                    </div>
                  </div>

                  {/* Thumbnail Preview of Future State Map Canvas */}
                  <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-3 relative group/img">
                    <img 
                      src="/assets/vsm-fsm-preview.png" 
                      alt="Future State Map Canvas Preview" 
                      className="w-full h-28 object-cover object-top transition-transform duration-300 group-hover/img:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-mono text-white font-medium">
                        Future State Digital Map • Synchronized Flow &amp; Pull
                      </span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <a
                    href="#product-showcase"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 pt-1"
                  >
                    <span>View Future State Map Page</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>

                </div>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ITEM 4: FEATURES - 2-COLUMN FROSTED-GLASS DROPDOWN            */}
          {/* ------------------------------------------------------------- */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('features')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#features"
              className={`transition-all duration-150 cursor-pointer block ${
                activeDropdown === 'features' 
                  ? 'px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-medium' 
                  : 'px-2.5 py-1 hover:text-black dark:hover:text-white'
              }`}
            >
              Features
            </a>

            {activeDropdown === 'features' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('features')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-[390px] rounded-2xl p-5 border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative text-left">
                  
                  {/* Subtle Center Vertical Divider Line */}
                  <div className="absolute top-5 bottom-5 left-1/2 w-px bg-neutral-200/70 dark:border-neutral-800/70 -translate-x-1/2" />

                  <div className="grid grid-cols-2 gap-x-5 text-[13px] font-sans">
                    <div className="space-y-1">
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        Current State Map &amp; Future State Map Canvas
                      </a>
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        Smart Improve (AI)
                      </a>
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        Bottleneck Detection
                      </a>
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        Excel Data Import
                      </a>
                    </div>

                    <div className="space-y-1">
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        Pull Supermarkets
                      </a>
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        Lead Time &amp; PCE Analytics
                      </a>
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        PDF &amp; Excel Reports
                      </a>
                      <a 
                        href="#features" 
                        onClick={() => setActiveDropdown(null)}
                        className="block px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                      >
                        Multi-Organization Teams
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ITEM 5: LEARN - SLEEK 1-COLUMN DROPDOWN                       */}
          {/* ------------------------------------------------------------- */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('learn')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#learn"
              className={`transition-all duration-150 cursor-pointer block ${
                activeDropdown === 'learn' 
                  ? 'px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-medium' 
                  : 'px-2.5 py-1 hover:text-black dark:hover:text-white'
              }`}
            >
              Learn
            </a>

            {activeDropdown === 'learn' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={() => handleMouseEnter('learn')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-[220px] rounded-2xl p-2.5 border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-left">
                  <div className="space-y-0.5 text-[13px] font-sans">
                    <a 
                      href="#product-showcase" 
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                    >
                      VSM Transformation Guide
                    </a>
                    <a 
                      href="#pricing" 
                      onClick={() => {
                        setActiveDropdown(null);
                        if (onNavigatePricing) onNavigatePricing();
                      }}
                      className="block px-3 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                    >
                      Plans &amp; Pricing
                    </a>
                    <a 
                      href="#security" 
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                    >
                      Security &amp; Data Control
                    </a>
                    <a 
                      href="#faq" 
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors group"
                    >
                      <span>Lean Practitioner FAQ</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* ITEM 6: PRICING - DIRECT LINK                                 */}
          {/* ------------------------------------------------------------- */}
          <a 
            href="#pricing" 
            onClick={(e) => {
              if (onNavigatePricing) {
                e.preventDefault();
                onNavigatePricing();
              }
            }}
            className="hover:text-black dark:hover:text-white transition-colors px-2.5 py-1 cursor-pointer"
          >
            Pricing
          </a>

          {/* ITEM 7: ABOUT - the brand story page (#/about) */}
          <a
            href="#/about"
            className="hover:text-black dark:hover:text-white transition-colors px-2.5 py-1 cursor-pointer"
          >
            About
          </a>
        </nav>

        {/* 3. RIGHT: Login + Try VSM 4.0 (Primary Black Pill Button) + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            style={minimalHide(minimal)}
            tabIndex={minimal ? -1 : undefined}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>

          {/* Login Text Link */}
          <a
            href={APP_LOGIN_URL}
            className="hidden sm:inline-block px-3 py-1.5 text-[13px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Login
          </a>

          {/* Try VSM 4.0 (Primary Black Pill Button) */}
          <button
            onClick={() => onOpenTrial({ mode: 'trial' })}
            className="h-[36px] px-5 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer shadow-xs active:scale-98 flex items-center justify-center bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Try VSM 4.0
          </button>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
            style={minimalHide(minimal)}
            tabIndex={minimal ? -1 : undefined}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] px-6 pt-3 pb-5 space-y-3 shadow-xl">
          <div className="space-y-2 text-[15px] font-sans text-neutral-800 dark:text-neutral-200">
            <a href="#product-showcase" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black dark:hover:text-white">Current State Map</a>
            <a href="#product-showcase" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black dark:hover:text-white">Smart Improve (FSPlanner)</a>
            <a href="#product-showcase" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black dark:hover:text-white">Future State Map</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black dark:hover:text-white">Features</a>
            <a href="#product-showcase" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black dark:hover:text-white">Learn</a>
            <a 
              href="#pricing" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigatePricing) onNavigatePricing();
              }} 
              className="block py-1 hover:text-black dark:hover:text-white"
            >
              Pricing
            </a>
            <a href="#/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-black dark:hover:text-white">About</a>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
            <a
              href={APP_LOGIN_URL}
              className="px-4 h-[38px] rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold flex items-center"
            >
              Login
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial({ mode: 'trial' });
              }}
              className="flex-1 h-[38px] rounded-full text-center text-xs font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 flex items-center justify-center"
            >
              Try VSM 4.0
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
