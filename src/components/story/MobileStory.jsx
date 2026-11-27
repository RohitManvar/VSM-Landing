import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Layers,
  Maximize2,
  Rotate3d,
  Sparkles,
  Table2,
  Users,
  Workflow,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { COMPANY_URL } from '../../config/app';
import { STORY_FEATURES, smooth } from './storyContent';
import { LEAD_TIME_REDUCTION, MAP_STEP_COPY, MAP_STEP_SCREENS, SCREEN_FOCUS, VSM_EXAMPLE } from './vsmExample';

const ICONS = { Table2, Layers, Sparkles, Workflow, FileText, Users };
const STEP_ORDER = ['csm', 'improve', 'fsm'];
const STEP_FROM_HASH = {
  csm: 'csm',
  'smart-improve': 'improve',
  improve: 'improve',
  fsm: 'fsm'
};

const PIN_TONES = {
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  green: 'bg-emerald-500',
  violet: 'bg-violet-500'
};

const STEP_ACCENTS = {
  csm: {
    pillActive: 'bg-cyan-500 text-white shadow-sm',
    dot: 'bg-cyan-500'
  },
  improve: {
    pillActive: 'bg-orange-500 text-white shadow-sm',
    dot: 'bg-orange-500'
  },
  fsm: {
    pillActive: 'bg-emerald-500 text-white shadow-sm',
    dot: 'bg-emerald-500'
  }
};

function scrollToWithNav(el) {
  if (!el) return;
  const nav = document.querySelector('header')?.offsetHeight || 60;
  const top = el.getBoundingClientRect().top + window.scrollY - nav;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function FlipEmblem({ flipped, onFlip }) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onFlip}
        aria-label={flipped ? 'Flip the logo back to VSM 4.0' : 'Flip the logo to see who builds VSM 4.0'}
        className="group relative w-36 h-36 sm:w-44 sm:h-44 cursor-pointer focus:outline-none"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front: VSM 4.0 mark */}
          <div
            className="absolute inset-0 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-[#F9F9FB] dark:bg-[#151515] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] flex items-center justify-center p-6"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img src="/assets/vsm-icon-black.png" alt="VSM 4.0" className="w-20 h-20 sm:w-24 sm:h-24 object-contain dark:hidden" />
            <img src="/assets/vsm-icon-white.png" alt="VSM 4.0" className="w-20 h-20 sm:w-24 sm:h-24 object-contain hidden dark:block" />
          </div>

          {/* Back: Faber Infinite mark */}
          <div
            className="absolute inset-0 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#151515] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] flex items-center justify-center p-4"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="rounded-xl dark:bg-white/95 dark:px-3 dark:py-2">
              <img src="/assets/faber-logo.png" alt="Faber Infinite" className="w-full h-auto max-h-14 object-contain" />
            </div>
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={onFlip}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
      >
        <Rotate3d className="w-3.5 h-3.5" />
        <span>{flipped ? 'tap to flip back' : 'tap to flip'}</span>
      </button>
    </div>
  );
}

function MobileZoomedScreen({ screen, focus, zoomed, onExpand }) {
  const aspect = screen.w / screen.h;
  const frameAspect = 16 / 10;
  const box =
    aspect >= frameAspect
      ? {
          width: '100%',
          height: `${(frameAspect / aspect) * 100}%`,
          left: 0,
          top: `${(1 - frameAspect / aspect) * 50}%`
        }
      : {
          height: '100%',
          width: `${(aspect / frameAspect) * 100}%`,
          top: 0,
          left: `${(1 - aspect / frameAspect) * 50}%`
        };

  const amount = zoomed ? 1 : 0;
  const mobileZoom = 1 + (focus.zoom - 1) * 0.72;
  const z = 1 + (mobileZoom - 1) * amount;
  const fx = 0.5 + (focus.x - 0.5) * amount;
  const fy = 0.5 + (focus.y - 0.5) * amount;
  const pinsOn = smooth((amount - 0.5) / 0.5);

  return (
    <div
      className="relative overflow-hidden bg-[#F8F9FB] cursor-zoom-in"
      style={{ aspectRatio: '16 / 10' }}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onExpand()}
      aria-label={`Open full ${screen.label} screen`}
    >
      <div
        className="absolute transition-transform duration-500 ease-out"
        style={{
          ...box,
          transform: `translate(${-z * (fx - 0.5) * 100}%, ${-z * (fy - 0.5) * 100}%) scale(${z})`,
          willChange: 'transform'
        }}
      >
        <img src={screen.src} alt={screen.alt} className="absolute inset-0 w-full h-full" />

        {focus.box && (
          <div
            className="absolute rounded-md ring-2 ring-orange-500/80 shadow-[0_0_0_9999px_rgba(248,249,251,0.35)] transition-opacity duration-300"
            style={{
              left: `${focus.box.x0 * 100}%`,
              top: `${focus.box.y0 * 100}%`,
              width: `${(focus.box.x1 - focus.box.x0) * 100}%`,
              height: `${(focus.box.y1 - focus.box.y0) * 100}%`,
              opacity: pinsOn
            }}
          />
        )}

        {focus.pins.map((pin) => {
          // Keep callout labels inside narrow mobile/tablet frames by keeping edge pins inward or compact.
          const screenX = 0.5 + (pin.x - fx) * z;
          const pinSide =
            screenX > 0.68 ? 'left' : screenX < 0.24 ? 'right' : pin.side;
          const tightLeft = pinSide === 'left' && screenX < 0.42;
          return (
            <div
              key={pin.label}
              className="absolute transition-opacity duration-300"
              style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%`, width: 0, height: 0, opacity: pinsOn }}
            >
              <div style={{ transform: `scale(${1 / z})`, transformOrigin: '0 0' }}>
                <span className={`absolute -left-1.5 -top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${PIN_TONES[pin.tone]} ring-4 ring-white/80`} />
                <span
                  className={`absolute top-0 -translate-y-1/2 rounded-2xl px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold leading-tight text-white shadow-lg ${PIN_TONES[pin.tone]} ${
                    tightLeft
                      ? 'w-max max-w-[82px] sm:max-w-[112px] text-center'
                      : 'w-max max-w-[130px] sm:max-w-[175px]'
                  } ${
                    pinSide === 'left' ? 'right-2.5 sm:right-3' : 'left-2.5 sm:left-3'
                  }`}
                >
                  {pin.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <span className="absolute right-2.5 bottom-2.5 w-7 h-7 rounded-full bg-white/90 border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 pointer-events-none">
        <Maximize2 className="w-3.5 h-3.5" />
      </span>
    </div>
  );
}

function ScreenLightbox({ screen, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={screen.alt}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-[#141414] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="text-xs sm:text-sm min-w-0">
            <span className="font-semibold text-black dark:text-white">{screen.label}</span>
            <span className="text-neutral-500 dark:text-neutral-400"> · {VSM_EXAMPLE.line}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-[#F8F9FB] max-h-[78vh] overflow-auto">
          <img src={screen.src} alt={screen.alt} className="min-w-[680px] sm:min-w-0 w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export const MobileStory = ({ onOpenTrial }) => {
  const [flipped, setFlipped] = useState(false);
  const [activeStep, setActiveStep] = useState('csm');
  const [finding, setFinding] = useState(0);
  const [zoomed, setZoomed] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Sync with header/footer navigation events (#csm, #smart-improve, #fsm, #features)
  useEffect(() => {
    const handleTarget = (id) => {
      if (id === 'features') {
        scrollToWithNav(document.getElementById('features'));
        return;
      }
      const mapped = STEP_FROM_HASH[id];
      if (mapped) {
        setActiveStep(mapped);
        setFinding(0);
        setZoomed(true);
        scrollToWithNav(document.getElementById('product-showcase'));
      }
    };

    const onGoto = (e) => handleTarget(e.detail);
    const onHash = () => handleTarget(window.location.hash.replace(/^#\/?/, ''));

    window.addEventListener('vsm:goto', onGoto);
    window.addEventListener('hashchange', onHash);

    const initial = window.location.hash.replace(/^#\/?/, '');
    if (STEP_FROM_HASH[initial]) {
      setActiveStep(STEP_FROM_HASH[initial]);
    }

    return () => {
      window.removeEventListener('vsm:goto', onGoto);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  const copy = MAP_STEP_COPY[activeStep];
  const screen = MAP_STEP_SCREENS[activeStep];
  const focuses = SCREEN_FOCUS[activeStep];
  const focus = focuses[Math.min(activeStep === 'improve' ? finding : 0, focuses.length - 1)];
  const stepIndex = STEP_ORDER.indexOf(activeStep);

  return (
    <>
      {/* 1. HERO (Matches desktop ScrollStory hero + Faber Infinite flip) */}
      <section className="relative pt-10 pb-14 sm:pt-14 sm:pb-20 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045),transparent_65%)]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Emblem on top on phones, on right on tablets (md+) */}
            <div className="md:col-span-5 md:order-2 flex justify-center">
              <FlipEmblem flipped={flipped} onFlip={() => setFlipped((prev) => !prev)} />
            </div>

            {/* Hero Copy + CTAs */}
            <div className="md:col-span-7 md:order-1 text-center md:text-left">
              {!flipped ? (
                <div>
                  <h1 className="text-[2.15rem] sm:text-5xl font-extrabold tracking-[-0.035em] leading-[1.08] text-black dark:text-white">
                    Now you can{' '}
                    <span className="bg-gradient-to-r from-emerald-500 via-amber-500 to-violet-500 bg-clip-text text-transparent">
                      Map, Analyze, Improve
                    </span>{' '}
                    all in one place.
                  </h1>
                  <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                    From Current State to Future State. Smarter Value Stream Mapping with VSM 4.0.
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-[2.15rem] sm:text-5xl font-extrabold tracking-[-0.035em] leading-[1.08] text-black dark:text-white">
                    <span className="block">From the shop</span>
                    <span className="block">floors of</span>
                    <span className="block whitespace-nowrap">
                      <span className="text-[#D94438]">Faber</span>{' '}
                      <span className="text-[#374F72] dark:text-[#8EA8D6]">Infinite.</span>
                    </span>
                  </h2>
                  <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                    Lean transformation specialists in global operational excellence. VSM 4.0 puts their value stream
                    mapping practice into one digital platform for your team.
                  </p>
                  <a
                    href={COMPANY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-black dark:text-white hover:underline"
                  >
                    <span>About Faber Infinite</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}

              <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-5">
                <button
                  onClick={() => onOpenTrial({ mode: 'trial' })}
                  className="px-7 py-3 rounded-full font-semibold text-sm shadow-md active:scale-98 cursor-pointer bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
                >
                  Start free trial
                </button>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToWithNav(document.getElementById('features'));
                  }}
                  className="text-sm font-medium flex items-center gap-1 group py-1 text-black hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300 cursor-pointer"
                >
                  <span>Explore features</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAP / ANALYZE / IMPROVE WORKED EXAMPLE (GR-24 real screens + zoom & findings) */}
      <section
        id="product-showcase"
        className="py-14 sm:py-20 bg-white dark:bg-[#0D0D0D] text-black dark:text-white border-t border-b border-neutral-100 dark:border-neutral-800/80 transition-colors duration-200"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          {/* Step Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-neutral-100 dark:bg-[#171717] border border-neutral-200/80 dark:border-neutral-800">
              {STEP_ORDER.map((key, idx) => {
                const active = activeStep === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActiveStep(key);
                      setFinding(0);
                      setZoomed(true);
                    }}
                    className={`px-2.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? STEP_ACCENTS[key].pillActive
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    0{idx + 1} · {MAP_STEP_COPY[key].word}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#171717] transition-colors cursor-pointer"
            >
              {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span>{zoomed ? 'Full stream' : 'Focus view'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-8 items-start">
            {/* Screen Window (GR-24 capture) */}
            <div className="md:col-span-7">
              <div className="mb-2.5 flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${screen.dot}`} />
                <span>{screen.hint}</span>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.22)] overflow-hidden">
                <div className="h-9 sm:h-10 px-3 sm:px-4 flex items-center gap-2 border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A1A]">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium min-w-0">
                    <span className={`px-2.5 py-0.5 rounded-full whitespace-nowrap ${screen.tone}`}>
                      {screen.label}
                    </span>
                  </div>
                  <span className="w-8 sm:w-10 shrink-0" />
                </div>

                <MobileZoomedScreen
                  screen={screen}
                  focus={focus}
                  zoomed={zoomed}
                  onExpand={() => setLightboxOpen(true)}
                />
              </div>
            </div>

            {/* Step Copy, Stats & Findings */}
            <div className="md:col-span-5 text-left">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2.5 text-[11px] font-mono uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                <span>{VSM_EXAMPLE.context}</span>
                <span className="h-px w-5 bg-neutral-300 dark:bg-neutral-700" />
                <span className="whitespace-nowrap">0{stepIndex + 1} / 03</span>
              </div>

              <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] leading-none ${copy.textClass}`}>
                {copy.word}
              </h2>
              <p className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
                {copy.headline}
              </p>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {copy.body}
              </p>

              {activeStep === 'fsm' && (
                <div className="mt-5 rounded-xl bg-neutral-100/80 dark:bg-neutral-900 px-4 py-3.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Lead time</span>
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                      was {VSM_EXAMPLE.leadTimeDays} days
                    </span>
                  </div>
                  <div className="mt-1 text-2xl font-bold tracking-tight text-black dark:text-white tabular-nums">
                    {VSM_EXAMPLE.fsmLeadTimeDays} days
                  </div>
                  <div className="mt-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${(VSM_EXAMPLE.fsmLeadTimeDays / VSM_EXAMPLE.leadTimeDays) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {copy.stats && (
                <div
                  className={`${activeStep === 'fsm' ? 'mt-3' : 'mt-5'} grid ${
                    activeStep === 'fsm' ? 'grid-cols-2' : 'grid-cols-3'
                  } gap-2 sm:gap-2.5`}
                >
                  {(activeStep === 'fsm' ? copy.stats.filter((st) => st.label !== 'Lead time') : copy.stats).map((s) => (
                    <div key={s.label} className="rounded-xl bg-neutral-100/80 dark:bg-neutral-900 px-2.5 sm:px-3 py-2 sm:py-2.5">
                      <div className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 truncate">{s.label}</div>
                      <div className="mt-0.5 text-xs sm:text-[15px] font-bold tracking-tight text-black dark:text-white whitespace-nowrap">
                        {s.label === 'Reduction' ? `−${LEAD_TIME_REDUCTION}%` : s.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeStep === 'improve' && (
                <ol className="mt-5 space-y-2">
                  {VSM_EXAMPLE.recommendations.map((r, i) => (
                    <li
                      key={r.title}
                      onClick={() => {
                        if (i < 2) {
                          setFinding(i);
                          setZoomed(true);
                        }
                      }}
                      className={`flex gap-2.5 items-start rounded-xl px-2.5 py-2 transition-colors ${
                        i < 2 ? 'cursor-pointer' : ''
                      } ${
                        i === finding
                          ? 'bg-neutral-100 dark:bg-neutral-900'
                          : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/60'
                      }`}
                    >
                      <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-amber-400 text-amber-950 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-sm font-semibold text-black dark:text-white">{r.title}</span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              r.impact === 'High'
                                ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {r.impact}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm leading-snug text-neutral-600 dark:text-neutral-400 mt-0.5">
                          {r.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                  <li className="pl-11 text-xs text-neutral-500 dark:text-neutral-400">
                    + 2 more findings, ranked by impact
                  </li>
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVERYTHING IN BETWEEN (Exact same 6 cards as desktop ScrollStory) */}
      <section
        id="features"
        className="py-16 sm:py-20 bg-white dark:bg-[#0D0D0D] text-black dark:text-white border-b border-neutral-200/70 dark:border-neutral-800/80 transition-colors duration-200"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.035em] text-black dark:text-white">
              Everything in between.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
              From the first walk on the floor to the future state, in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {STORY_FEATURES.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <div
                  key={f.id}
                  className="rounded-3xl bg-[#F9F9FB] dark:bg-[#151515] border border-neutral-200/80 dark:border-neutral-800/80 p-6 text-left shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-black dark:text-white" />
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-black dark:text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {lightboxOpen && <ScreenLightbox screen={screen} onClose={() => setLightboxOpen(false)} />}
    </>
  );
};

export default MobileStory;
