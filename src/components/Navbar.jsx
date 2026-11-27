import { APP_LOGIN_URL } from '../config/app';
import React, { useState, useRef } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Check, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { VsmLogo } from './VsmLogo';
import { LEAD_TIME_REDUCTION, MAP_STEP_SCREENS, VSM_EXAMPLE } from './story/vsmExample';

// `minimal`: only the logo (left) and Login + Try VSM 4.0 (right) — used during the intro.
const minimalHide = (minimal) => ({
  opacity: minimal ? 0 : 1,
  pointerEvents: minimal ? 'none' : undefined,
  transition: 'opacity 300ms ease'
});

// Hover previews for Current State Map / Smart Improve / Future State Map. Everything here is
// real: the screens and figures come from the GR-24 example built in the VSM 4.0 app, and the
// points are features the app ships. Each link scrolls to that step on the page.
const finding = VSM_EXAMPLE.recommendations[0];
const NAV_PREVIEWS = {
  csm: {
    title: 'Current State Map',
    dot: 'bg-cyan-500',
    link: 'text-cyan-600 dark:text-cyan-400',
    summary: 'See the line as it runs today.',
    points: [
      'Drawn automatically from your process data',
      'Standard Lean symbols and the timeline',
      'Takt, lead time and value-add time calculated'
    ],
    stats: [
      ['Lead time', `${VSM_EXAMPLE.leadTimeDays} days`],
      ['Value-add', `${VSM_EXAMPLE.valueAddSeconds} s`],
      ['Takt', `${VSM_EXAMPLE.taktSeconds} s`]
    ],
    screen: MAP_STEP_SCREENS.csm
  },
  'smart-improve': {
    title: 'Smart Improve',
    dot: 'bg-orange-500',
    link: 'text-orange-600 dark:text-orange-400',
    summary: 'Find what to fix first.',
    points: [
      'Every step checked against takt, breakdown and changeover',
      'AI reads your floor notes; client names stay private',
      'One click applies a finding to the future state'
    ],
    finding: `${finding.title}: ${finding.detail}`,
    screen: MAP_STEP_SCREENS.improve
  },
  fsm: {
    title: 'Future State Map',
    dot: 'bg-emerald-500',
    link: 'text-emerald-600 dark:text-emerald-400',
    summary: 'Design the leaner line.',
    points: [
      'Supermarkets, FIFO lanes and pull loops',
      'Kaizen points marked on the map',
      'The whole stream recalculated as you plan'
    ],
    stats: [
      ['Lead time', `${VSM_EXAMPLE.leadTimeDays} → ${VSM_EXAMPLE.fsmLeadTimeDays} days`],
      ['Reduction', `−${LEAD_TIME_REDUCTION}%`],
      ['Gear Hobbing', '31 → 26 s']
    ],
    screen: MAP_STEP_SCREENS.fsm
  }
};

function NavPreview({ id, onGo }) {
  const p = NAV_PREVIEWS[id];
  return (
    <div className="w-[420px] rounded-2xl p-5 border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-left">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${p.dot}`} />
        <h4 className="font-bold text-sm text-black dark:text-white">{p.title}</h4>
      </div>
      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{p.summary}</p>

      <ul className="mt-3 space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
        {p.points.map((pt) => (
          <li key={pt} className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 mt-px text-neutral-400 shrink-0" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      {/* The real app screen, with no text laid over it */}
      <div className="mt-4 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121212]">
        <img src={p.screen.src} alt={p.screen.alt} className="w-full h-32 object-cover object-left-top" />
      </div>
      <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400">{VSM_EXAMPLE.context}</div>

      {p.stats && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {p.stats.map(([label, value]) => (
            <div key={label} className="rounded-lg bg-neutral-50 dark:bg-[#121212] border border-neutral-200/70 dark:border-neutral-800/70 px-2.5 py-1.5">
              <div className="text-[10px] text-neutral-500">{label}</div>
              <div className="text-xs font-semibold text-black dark:text-white whitespace-nowrap">{value}</div>
            </div>
          ))}
        </div>
      )}
      {p.finding && (
        <div className="mt-2 rounded-lg bg-neutral-50 dark:bg-[#121212] border border-neutral-200/70 dark:border-neutral-800/70 px-2.5 py-2 text-[11px] leading-snug text-neutral-700 dark:text-neutral-300">
          {p.finding}
        </div>
      )}

      <a
        href={`#${id}`}
        onClick={onGo}
        className={`mt-3 flex items-center justify-between text-xs font-semibold ${p.link} hover:underline`}
      >
        <span>See it in the example</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// Features menu: each item is a feature that ships in the VSM 4.0 app (same set as the
// feature cards on the page, which these links scroll to).
const FEATURE_MENU = [
  'Auto-drawn CSM & FSM Maps',
  'Smart Improve (AI)',
  'Future State Planner',
  'Excel Data Import',
  'Process, Facility & Extended Maps',
  'PDF, SVG & Excel Exports',
  'Roles & Edit Locks',
  'Teams & Organizations'
];

export const Navbar = ({ onOpenTrial, onOpenDemo, onNavigatePricing, onNavigateHome, minimal = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  // Jump to a product step (Map / Analyze / Improve) in the landing page's scroll story.
  // The href updates the address; the event makes a repeat click on the same item still scroll.
  const goToSection = (id) => () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('vsm:goto', { detail: id }));
  };

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
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-8 h-[56px] sm:h-[60px] relative flex items-center justify-between gap-2">
        
        {/* 1. LEFT: VSM 4.0 Logo and Wordmark (Auto switches Black <-> White) */}
        <div className="flex items-center shrink-0">
          <a 
            href="#" 
            onClick={(e) => {
              if (onNavigateHome) {
                e.preventDefault();
                onNavigateHome();
              }
            }}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0 whitespace-nowrap"
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
              href="#csm" onClick={goToSection('csm')}
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
                <NavPreview id="csm" onGo={goToSection('csm')} />
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
              href="#smart-improve" onClick={goToSection('smart-improve')}
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
                <NavPreview id="smart-improve" onGo={goToSection('smart-improve')} />
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
              href="#fsm" onClick={goToSection('fsm')}
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
                <NavPreview id="fsm" onGo={goToSection('fsm')} />
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
              onClick={goToSection('features')}
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
                <div className="w-[500px] rounded-2xl p-5 border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative text-left">
                  
                  {/* Subtle Center Vertical Divider Line */}
                  <div className="absolute top-5 bottom-5 left-1/2 w-px bg-neutral-200/70 dark:border-neutral-800/70 -translate-x-1/2" />

                  <div className="grid grid-cols-2 gap-x-5 text-[13px] font-sans">
                    {[FEATURE_MENU.slice(0, 4), FEATURE_MENU.slice(4)].map((column, c) => (
                      <div key={c} className="space-y-1">
                        {column.map((label) => (
                          <a
                            key={label}
                            href="#features"
                            onClick={goToSection('features')}
                            className="block whitespace-nowrap px-2.5 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors"
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    ))}
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
        </nav>

        {/* 3. RIGHT: Login + Try VSM 4.0 (Primary Black Pill Button) + Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Theme Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            style={minimalHide(minimal)}
            tabIndex={minimal ? -1 : undefined}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
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
            className="hidden sm:inline-block px-3 py-1.5 text-[13px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Login
          </a>

          {/* Try VSM 4.0 (Primary Black Pill Button) */}
          <button
            onClick={() => onOpenTrial({ mode: 'trial' })}
            className="h-[34px] sm:h-[36px] px-3.5 sm:px-5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-150 cursor-pointer shadow-xs active:scale-98 flex items-center justify-center bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 whitespace-nowrap shrink-0"
          >
            Try VSM 4.0
          </button>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-1.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white shrink-0"
            style={minimalHide(minimal)}
            tabIndex={minimal ? -1 : undefined}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-h-[calc(100dvh-56px)] overflow-y-auto border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] px-5 sm:px-6 pt-3 pb-5 space-y-3 shadow-xl">
          <div className="space-y-2 text-[15px] font-sans text-neutral-800 dark:text-neutral-200">
            <a href="#csm" onClick={goToSection('csm')} className="block py-1 hover:text-black dark:hover:text-white">Current State Map</a>
            <a href="#smart-improve" onClick={goToSection('smart-improve')} className="block py-1 hover:text-black dark:hover:text-white">Smart Improve (FSPlanner)</a>
            <a href="#fsm" onClick={goToSection('fsm')} className="block py-1 hover:text-black dark:hover:text-white">Future State Map</a>
            <a href="#features" onClick={goToSection('features')} className="block py-1 hover:text-black dark:hover:text-white">Features</a>
            <a
              href="#product-showcase"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (!document.getElementById('product-showcase')) {
                  e.preventDefault();
                  goToSection('csm')();
                }
              }}
              className="block py-1 hover:text-black dark:hover:text-white"
            >
              Learn
            </a>
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
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
            <a
              href={APP_LOGIN_URL}
              className="px-4 h-[38px] rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold flex items-center whitespace-nowrap"
            >
              Login
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial({ mode: 'trial' });
              }}
              className="flex-1 h-[38px] rounded-full text-center text-xs font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 flex items-center justify-center whitespace-nowrap"
            >
              Try VSM 4.0
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
