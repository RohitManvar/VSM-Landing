import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Rotate3d, Table2, Layers, Sparkles, Workflow, FileText, Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { COMPANY_URL } from '../../config/app';
import {
  MEANING_ONE,
  MEANING_TWO,
  NODE_STEPS,
  STORIES,
  STORY_FEATURES,
  clamp01,
  explodeAmount,
  heroLogoAnchor,
  fsmAmount,
  improveAmount,
  mapVisibility,
  smooth,
  stageVisibility,
  stepIndex,
  storyLength,
  storyStart
} from './storyContent';
import { LEAD_TIME_REDUCTION, MAP_STEP_COPY, MAP_STEP_SCREENS, SCREEN_FOCUS, VSM_EXAMPLE } from './vsmExample';
import { IntroFlow } from './IntroFlow';

// three.js is heavy; load it after the text so the hero paints immediately.
const LogoScene = lazy(() => import('./LogoScene'));

const ICONS = { Table2, Layers, Sparkles, Workflow, FileText, Users };
const NAV_HEIGHT = 60; // matches the sticky Navbar (sm:h-[60px])
const VH_PER_STEP = 68; // how much page scroll one step takes

const RAIL_LABELS = {
  hero: 'Start',
  aboutHero: 'Start',
  switch: 'Two meanings',
  explode: 'Features',
  faber: 'Faber Infinite'
};

// Scroll progress through the pinned section, as a position on the story's timeline.
function useStoryTimeline(sectionRef, story) {
  const start = storyStart(story);
  const span = storyLength(story) - start;
  const timeRef = useRef(start);
  const [t, setT] = useState(start);
  const [active, setActive] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pinned = el.offsetHeight - (window.innerHeight - NAV_HEIGHT);
      const p = clamp01((NAV_HEIGHT - rect.top) / pinned);
      const next = p * span + start;
      timeRef.current = next;
      setT((prev) => (Math.abs(prev - next) > 0.002 ? next : prev));
      setActive(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef, start, span]);

  return { t, timeRef, active, start, span };
}

// Fade + drift for a text panel tied to one step. The last step stays on once reached.
function panelStyle(t, step, { drift = 70, last = false } = {}) {
  const v = last && t > step + 0.5 ? 1 : stageVisibility(t, step);
  const offset = last && t > step + 0.5 ? 0 : (step + 0.5 - t) * drift;
  return {
    opacity: v,
    // The opening step rises gently into place (after the intro, if any), then stays put.
    transform: `translate3d(0, ${step === 0 && t < 0.5 ? Math.max(0, -t) * 90 : offset}px, 0)`,
    pointerEvents: v > 0.6 ? 'auto' : 'none',
    visibility: v < 0.01 ? 'hidden' : 'visible'
  };
}

function CtaButtons({ onOpenTrial }) {
  return (
    <div className="mt-9 flex items-center gap-6">
      <button
        onClick={() => onOpenTrial({ mode: 'trial' })}
        className="px-7 py-3 rounded-full font-semibold text-sm shadow-md active:scale-98 cursor-pointer bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
      >
        Start free trial
      </button>
      <button
        onClick={() => onOpenTrial({ mode: 'demo' })}
        className="text-sm font-medium flex items-center gap-1 group py-1 text-black hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300 cursor-pointer"
      >
        <span>Book a demo</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}

// Where the hero logo is on screen (fractions of the stage width), kept current on resize.
function useHeroLogoAnchor(ref) {
  const [anchor, setAnchor] = useState({ center: 0.75, side: 0.9 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setAnchor(heroLogoAnchor(el.clientWidth, el.clientHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return anchor;
}

// Text on the left half (the logo sits on the right).
function LeftPanel({ style, children }) {
  return (
    <div className="absolute inset-0 max-w-7xl mx-auto px-10 xl:px-16 flex items-center">
      <div className="w-1/2 max-w-[600px]" style={style}>
        {children}
      </div>
    </div>
  );
}

function NodePanel({ t, step, node, index, eyebrow, showImage }) {
  return (
    <div className="absolute inset-0 max-w-7xl mx-auto px-10 xl:px-16 flex items-center justify-end">
      <div className="w-[44%] max-w-[540px]" style={panelStyle(t, step)}>
        <div className="flex items-center gap-3 mb-5 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          <span>{eyebrow}</span>
          <span className="h-px w-8 bg-neutral-300 dark:bg-neutral-700" />
          <span>0{index + 1} / 03</span>
        </div>
        <h2
          className={`${
            showImage ? 'text-6xl xl:text-7xl' : 'text-7xl xl:text-8xl'
          } font-extrabold tracking-[-0.045em] leading-none ${node.textClass}`}
        >
          {node.word}
        </h2>
        <p className="mt-5 text-2xl xl:text-3xl font-bold tracking-tight text-black dark:text-white">{node.headline}</p>
        <p className="mt-4 text-base xl:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{node.body}</p>
        {showImage && node.image && (
          // The real screen from the app, so each step shows the product itself.
          <div className="mt-6 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] bg-neutral-100 dark:bg-[#181818]">
            <img
              src={node.image}
              alt={`${node.headline.replace(/\.$/, '')} in VSM 4.0`}
              className="w-full max-h-[28vh] object-cover object-top"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Left-hand stage on the landing page: the real VSM 4.0 screens for the worked example,
// in a slightly tilted app window. It takes over from the logo as Map arrives and
// crossfades CSM → FS Planner → FSM as the steps go by. Each screen opens on the whole
// value stream, then zooms into the part that matters for its step and pins it.
const SCREEN_ASPECT = 19 / 10; // the window's screen area
const PIN_TONES = {
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  green: 'bg-emerald-500',
  violet: 'bg-violet-500'
};

// 0 = whole screen, 1 = zoomed into the step's focus. `u` is the step's own progress (0..1).
const zoomAmount = (u) => smooth((u - 0.28) / 0.3);

// Visitors who ask for less motion get the still screens (zoom + pins), never autoplaying video.
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

// A screen with a recording (`screen.video`) plays it once, silently, each time its step
// becomes the active one; when the clip ends the window zooms into the step's focus and shows
// the pins. Without a recording (or with reduced motion, or if it fails to load) the zoom
// follows the scroll instead.
function useClipPhase(screen, active) {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'playing' | 'done'
  const hasClip = !!screen.video && !reduced && !failed;
  useEffect(() => {
    const v = videoRef.current;
    if (!hasClip || !v) return;
    if (active) {
      setPhase('playing');
      v.currentTime = 0;
      v.play().catch(() => setPhase('done')); // autoplay refused: go straight to the highlights
    } else {
      v.pause();
      setPhase('idle');
    }
  }, [active, hasClip]);
  return { videoRef, hasClip, phase, setPhase, setFailed };
}

function ZoomedScreen({ screen, focus, amount: scrollAmount, weight, active }) {
  const { videoRef, hasClip, phase, setPhase, setFailed } = useClipPhase(screen, active);
  const amount = hasClip ? (phase === 'done' ? 1 : 0) : scrollAmount;
  const zoomEase = hasClip ? 'transform 1100ms cubic-bezier(0.65, 0, 0.35, 1)' : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)';
  // A box with the screenshot's own aspect, centred in the window, so x/y fractions of the
  // capture are fractions of this box.
  const aspect = screen.w / screen.h;
  const box =
    aspect >= SCREEN_ASPECT
      ? { width: '100%', height: `${(SCREEN_ASPECT / aspect) * 100}%`, left: 0, top: `${(1 - SCREEN_ASPECT / aspect) * 50}%` }
      : { height: '100%', width: `${(aspect / SCREEN_ASPECT) * 100}%`, top: 0, left: `${(1 - aspect / SCREEN_ASPECT) * 50}%` };
  const z = 1 + (focus.zoom - 1) * amount;
  const fx = 0.5 + (focus.x - 0.5) * amount;
  const fy = 0.5 + (focus.y - 0.5) * amount;
  const pinsOn = smooth((amount - 0.75) / 0.25);
  return (
    <div className="absolute inset-0" style={{ opacity: weight, visibility: weight < 0.01 ? 'hidden' : 'visible' }}>
      <div
        className="absolute"
        style={{
          ...box,
          transform: `translate(${-z * (fx - 0.5) * 100}%, ${-z * (fy - 0.5) * 100}%) scale(${z})`,
          transition: zoomEase,
          willChange: 'transform'
        }}
      >
        <img src={screen.src} alt={screen.alt} className="absolute inset-0 w-full h-full" />
        {focus.box && (
          <div
            className="absolute rounded-md ring-2 ring-orange-500/80 shadow-[0_0_0_9999px_rgba(248,249,251,0.35)] transition-all duration-500"
            style={{
              left: `${focus.box.x0 * 100}%`,
              top: `${focus.box.y0 * 100}%`,
              width: `${(focus.box.x1 - focus.box.x0) * 100}%`,
              height: `${(focus.box.y1 - focus.box.y0) * 100}%`,
              opacity: pinsOn
            }}
          />
        )}
        {focus.pins.map((pin) => (
          <div
            key={pin.label}
            className="absolute"
            style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%`, width: 0, height: 0, opacity: pinsOn }}
          >
            {/* Counter-scaled so pins keep their size while the screen zooms */}
            <div style={{ transform: `scale(${1 / z})`, transformOrigin: '0 0', transition: zoomEase }}>
              <span className={`absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full ${PIN_TONES[pin.tone]} ring-4 ring-white/80`} />
              <span className={`absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full ${PIN_TONES[pin.tone]} animate-ping opacity-60`} />
              <span
                className={`absolute top-0 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg ${PIN_TONES[pin.tone]} ${
                  pin.side === 'left' ? 'right-3' : 'left-3'
                }`}
              >
                {pin.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      {hasClip && (
        // The recording, over the still screen; it fades out when it ends, revealing the zoom.
        <video
          ref={videoRef}
          src={screen.video}
          poster={screen.src}
          muted
          playsInline
          preload="metadata"
          aria-label={screen.alt}
          className="absolute inset-0 w-full h-full object-contain bg-[#F8F9FB]"
          style={{ opacity: phase === 'playing' ? 1 : 0, transition: 'opacity 500ms ease' }}
          onEnded={() => setPhase('done')}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

// The hint above the app window: types out what the step's screen is showing.
function TypedHint({ text, tone }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const id = setInterval(() => setShown((n) => (n >= text.length ? n : n + 1)), 24);
    return () => clearInterval(id);
  }, [text]);
  const typing = shown < text.length;
  return (
    <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-neutral-700 dark:text-neutral-300" aria-live="polite">
      <span className={`w-1.5 h-1.5 rounded-full ${tone}`} />
      <span>
        {text.slice(0, shown)}
        <span className={`inline-block w-[2px] h-[1em] -mb-[2px] ml-0.5 bg-current ${typing ? '' : 'animate-pulse'}`} />
      </span>
    </div>
  );
}

function ScreenStage({ t, story, finding = 0 }) {
  const v = mapVisibility(t, story);
  if (v < 0.01) return null;
  const imp = improveAmount(t, story);
  const fsm = fsmAmount(t, story);
  const weights = { csm: 1 - imp, improve: imp * (1 - fsm), fsm };
  const active = fsm > 0.5 ? 'fsm' : imp > 0.5 ? 'improve' : 'csm';
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-0 w-[56%] flex items-center pl-8 xl:pl-14 pr-6"
      style={{ opacity: v, perspective: '1600px' }}
      aria-hidden={v < 0.5}
    >
      <div className="w-full">
      <TypedHint text={MAP_STEP_SCREENS[active].hint} tone={MAP_STEP_SCREENS[active].dot} />
      <div
        className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] overflow-hidden"
        style={{
          transform: `rotateY(${7 - 3 * v}deg) rotateX(2deg) scale(${0.92 + 0.08 * v}) translateY(${(1 - v) * 24}px)`,
          transformOrigin: '30% 50%'
        }}
      >
        {/* App-style top bar with the VSM 4.0 step tracker, in each step's colour */}
        <div className="h-10 px-4 flex items-center gap-3 border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A1A]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 text-[11px] font-medium">
            {Object.entries(MAP_STEP_SCREENS).map(([key, s], i) => (
              <React.Fragment key={key}>
                {i > 0 && <span className="w-5 h-px bg-neutral-300 dark:bg-neutral-700" />}
                <span
                  className={`px-2.5 py-0.5 rounded-full transition-colors duration-300 ${
                    key === active ? s.tone : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {s.label}
                </span>
              </React.Fragment>
            ))}
          </div>
          <span className="w-12" />
        </div>
        {/* The three screens, stacked and crossfading */}
        <div className="relative overflow-hidden bg-[#F8F9FB]" style={{ aspectRatio: `${SCREEN_ASPECT}` }}>
          {Object.entries(MAP_STEP_SCREENS).map(([key, s]) => {
            const focuses = SCREEN_FOCUS[key];
            const focus = focuses[Math.min(key === 'improve' ? finding : 0, focuses.length - 1)];
            return (
              <ZoomedScreen
                key={key}
                screen={s}
                focus={focus}
                amount={zoomAmount(t - stepIndex(story, key))}
                weight={weights[key]}
                // Playing only while the step is the one on screen (and the stage is fully in)
                active={key === active && v > 0.9}
              />
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

// Right-hand explanation next to the product screens (landing page).
function MapPanel({ t, step, stepKey, index, finding = 0, onFinding }) {
  const copy = MAP_STEP_COPY[stepKey];
  // Improve: the lead time shrinks from the current to the future state as the screen zooms in.
  const k = stepKey === 'fsm' ? zoomAmount(t - step) : 0;
  const leadNow = VSM_EXAMPLE.leadTimeDays - (VSM_EXAMPLE.leadTimeDays - VSM_EXAMPLE.fsmLeadTimeDays) * k;
  const stats = stepKey === 'fsm' ? copy.stats.filter((st) => st.label !== 'Lead time') : copy.stats;
  return (
    <div className="absolute inset-0 max-w-7xl mx-auto px-10 xl:px-16 flex items-center justify-end">
      <div className="w-[42%] max-w-[520px]" style={panelStyle(t, step)}>
        <div className="flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          <span>{VSM_EXAMPLE.context}</span>
          <span className="h-px w-6 bg-neutral-300 dark:bg-neutral-700" />
          <span>0{index + 1} / 03</span>
        </div>
        <h2 className={`text-6xl xl:text-7xl font-extrabold tracking-[-0.045em] leading-none ${copy.textClass}`}>
          {copy.word}
        </h2>
        <p className="mt-5 text-2xl xl:text-3xl font-bold tracking-tight text-black dark:text-white">{copy.headline}</p>
        <p className="mt-3 text-base xl:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{copy.body}</p>

        {stepKey === 'fsm' && (
          <div className="mt-6 rounded-xl bg-neutral-100/80 dark:bg-neutral-900 px-4 py-3.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Lead time</span>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                was {VSM_EXAMPLE.leadTimeDays} days
              </span>
            </div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-black dark:text-white tabular-nums">
              {leadNow.toFixed(1)} days
            </div>
            {/* Grey = the current state's lead time, green = the future state's */}
            <div className="mt-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${(leadNow / VSM_EXAMPLE.leadTimeDays) * 100}%` }}
              />
            </div>
          </div>
        )}

        {stats && (
          <div className={`${stepKey === 'fsm' ? 'mt-3' : 'mt-6'} grid ${stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-neutral-100/80 dark:bg-neutral-900 px-3.5 py-3">
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{s.label}</div>
                <div className="mt-0.5 text-[15px] font-bold tracking-tight text-black dark:text-white whitespace-nowrap">
                  {s.label === 'Reduction' ? `−${Math.round(LEAD_TIME_REDUCTION * k)}%` : s.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {stepKey === 'improve' && (
          // Smart Improve's ranked recommendations; the numbers match the bursts on the map.
          <ol className="mt-6 space-y-2.5">
            {VSM_EXAMPLE.recommendations.map((r, i) => (
              // The first two findings are the two cards in the screen: hovering one zooms to it.
              <li
                key={r.title}
                className={`flex gap-3 items-start rounded-xl -mx-2 px-2 py-1 transition-colors ${
                  i < 2 ? 'cursor-default hover:bg-neutral-100 dark:hover:bg-neutral-900' : ''
                } ${i === finding ? 'bg-neutral-100/70 dark:bg-neutral-900/70' : ''}`}
                onMouseEnter={() => i < 2 && onFinding?.(i)}
                onMouseLeave={() => onFinding?.(0)}
              >
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-amber-400 text-amber-950 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-black dark:text-white">{r.title}</span>
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
                  <p className="text-sm leading-snug text-neutral-600 dark:text-neutral-400">{r.detail}</p>
                </div>
              </li>
            ))}
            <li className="pl-9 text-xs text-neutral-500 dark:text-neutral-400">
              + 2 more findings, ranked by impact
            </li>
          </ol>
        )}
      </div>
    </div>
  );
}

export const ScrollStory = ({ story = STORIES.landing, onOpenTrial, onIntroChange }) => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const cardSlotsRef = useRef([]);
  const stageRef = useRef(null);
  // Hero flip: the visitor turns the VSM logo over to the Faber Infinite side.
  const flipApiRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  // Which Smart Improve finding the visitor is pointing at (the screen zooms to its card).
  const [finding, setFinding] = useState(0);
  const anchor = useHeroLogoAnchor(stageRef);
  const { t, timeRef, active, start, span } = useStoryTimeline(sectionRef, story);
  const steps = story.steps;
  const lastStep = steps.length - 1;
  const isLanding = story === STORIES.landing;

  // The header stays minimal while the intro statement is on screen.
  const inIntro = story.intro && t < -0.35;
  useEffect(() => {
    onIntroChange?.(inIntro);
  }, [inIntro, onIntroChange]);
  useEffect(() => () => onIntroChange?.(false), [onIntroChange]);

  const jumpTo = useCallback(
    (step) => {
      const el = sectionRef.current;
      if (!el) return;
      const pinned = el.offsetHeight - (window.innerHeight - NAV_HEIGHT);
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      const target = step === lastStep ? storyLength(story) - 0.15 : step === 0 ? 0.05 : step + 0.5;
      window.scrollTo({ top: top + ((target - start) / span) * pinned, behavior: 'smooth' });
    },
    [lastStep, story, start, span]
  );

  // Header links (#csm, #smart-improve, #fsm) jump to their step in this story — on a click
  // (the 'vsm:goto' event) and when the page opens with one of them in the address.
  useEffect(() => {
    const SECTION_STEPS = { csm: 'csm', 'smart-improve': 'improve', fsm: 'fsm', features: 'explode' };
    const go = (id) => {
      const i = stepIndex(story, SECTION_STEPS[id]);
      if (i >= 0) jumpTo(i);
    };
    const onGoto = (e) => go(e.detail);
    window.addEventListener('vsm:goto', onGoto);
    const initial = window.location.hash.replace(/^#/, '');
    let timer;
    if (SECTION_STEPS[initial]) timer = setTimeout(() => go(initial), 300); // after layout settles
    return () => {
      window.removeEventListener('vsm:goto', onGoto);
      clearTimeout(timer);
    };
  }, [story, jumpTo]);

  const openOn = stageVisibility(t, 0);
  const e = explodeAmount(t, story);
  const explodeAt = stepIndex(story, 'explode');
  const gridHeader = explodeAt < 0 ? 0 : smooth((t - (explodeAt + 0.25)) / 0.5);
  const currentStep = Math.max(0, Math.min(lastStep, Math.round(t - 0.5)));

  const renderPanel = (key, i) => {
    const node = NODE_STEPS[key];
    if (node && story.map && MAP_STEP_COPY[key]) {
      return (
        <MapPanel
          key={key}
          t={t}
          step={i}
          stepKey={key}
          index={MEANING_TWO.indexOf(node)}
          finding={finding}
          onFinding={setFinding}
        />
      );
    }
    if (node) {
      const second = MEANING_TWO.includes(node);
      return (
        <NodePanel
          key={key}
          t={t}
          step={i}
          node={node}
          index={(second ? MEANING_TWO : MEANING_ONE).indexOf(node)}
          eyebrow={second ? 'How VSM 4.0 works' : 'What VSM connects'}
          showImage={isLanding}
        />
      );
    }
    switch (key) {
      case 'hero': {
        // The hero text swaps to the Faber Infinite message while the logo shows its Faber side.
        const swap = (on) => ({
          gridArea: '1 / 1',
          opacity: on ? 1 : 0,
          transform: `translate3d(0, ${on ? 0 : 10}px, 0)`,
          transition: 'opacity 450ms ease, transform 450ms ease',
          pointerEvents: on ? 'auto' : 'none'
        });
        return (
          <LeftPanel key={key} style={panelStyle(t, i, { drift: 90 })}>
            <div className="grid">
              <div style={swap(!flipped)} aria-hidden={flipped}>
                <h1 className="text-5xl xl:text-[4.25rem] font-extrabold tracking-[-0.035em] leading-[1.06] text-black dark:text-white">
                  Now you can{' '}
                  <span className="bg-gradient-to-r from-emerald-500 via-amber-500 to-violet-500 bg-clip-text text-transparent">
                    Map, Analyze, Improve
                  </span>{' '}
                  all in one place.
                </h1>
                <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
                  From Current State to Future State. Smarter Value Stream Mapping with VSM 4.0.
                </p>
              </div>
              <div style={swap(flipped)} aria-hidden={!flipped}>
                <h2 className="text-5xl xl:text-[4.25rem] font-extrabold tracking-[-0.035em] leading-[1.06] text-black dark:text-white">
                  {/* Always three lines: From the shop / floors of / Faber Infinite. */}
                  <span className="block">From the shop</span>
                  <span className="block">floors of</span>
                  <span className="block whitespace-nowrap">
                    <span className="text-[#D94438]">Faber</span>{' '}
                    <span className="text-[#374F72] dark:text-[#8EA8D6]">Infinite.</span>
                  </span>
                </h2>
                <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
                  Lean transformation specialists in global operational excellence. VSM 4.0 puts their value stream
                  mapping practice into one digital platform for your team.
                </p>
                <a
                  href={COMPANY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={flipped ? 0 : -1}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-black dark:text-white hover:underline group"
                >
                  <span>About Faber Infinite</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
            <CtaButtons onOpenTrial={onOpenTrial} />
          </LeftPanel>
        );
      }
      case 'aboutHero':
        return (
          <LeftPanel key={key} style={panelStyle(t, i, { drift: 90 })}>
            <div className="mb-5 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
              About VSM 4.0
            </div>
            <h1 className="text-5xl xl:text-[4.25rem] font-extrabold tracking-[-0.035em] leading-[1.06] text-black dark:text-white">
              Three nodes. One value stream.
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
              Our logo is three connected nodes. They stand for what every value stream is made of, and for how
              VSM 4.0 helps you improve it. Scroll to see both.
            </p>
          </LeftPanel>
        );
      case 'switch':
        return (
          <div key={key} className="absolute inset-x-0 bottom-[9%] flex justify-center px-10">
            <div className="text-center max-w-2xl" style={panelStyle(t, i)}>
              <h2 className="text-4xl xl:text-5xl font-extrabold tracking-[-0.035em] text-black dark:text-white">
                Same three nodes. A second meaning.
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                People, process and data are what a value stream is made of. CSM, Improve and FSM are how VSM 4.0
                moves it forward.
              </p>
            </div>
          </div>
        );
      case 'faber':
        return (
          <LeftPanel key={key} style={panelStyle(t, i, { last: i === lastStep })}>
            <div className="mb-5 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
              Who builds it
            </div>
            <h2 className="text-5xl xl:text-[4.25rem] font-extrabold tracking-[-0.035em] leading-[1.06] text-black dark:text-white">
              {/* Always three lines: From the shop / floors of / Faber Infinite. */}
              <span className="block">From the shop</span>
              <span className="block">floors of</span>
              <span className="block whitespace-nowrap">
                <span className="text-[#D94438]">Faber</span>{' '}
                <span className="text-[#374F72] dark:text-[#8EA8D6]">Infinite.</span>
              </span>
            </h2>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
              Lean transformation specialists in global operational excellence. VSM 4.0 puts their value stream
              mapping practice into one digital platform for your team.
            </p>
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-black dark:text-white hover:underline group"
            >
              <span>Visit faberinfinite.com</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <CtaButtons onOpenTrial={onOpenTrial} />
          </LeftPanel>
        );
      case 'explode':
        return (
          // The logo breaks apart into the feature cards
          <div
            key={key}
            className="absolute inset-0 max-w-6xl mx-auto px-10 flex flex-col justify-center"
            style={{ visibility: e < 0.01 ? 'hidden' : 'visible', pointerEvents: e > 0.9 ? 'auto' : 'none' }}
          >
            <div
              className="text-center mb-8 xl:mb-10"
              style={{ opacity: gridHeader, transform: `translate3d(0, ${(1 - gridHeader) * 24}px, 0)` }}
            >
              <h2 className="text-4xl xl:text-5xl font-extrabold tracking-[-0.035em] text-black dark:text-white">
                Everything in between.
              </h2>
              <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
                From the first walk on the floor to the future state, in one place.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {STORY_FEATURES.map((f, j) => {
                const Icon = ICONS[f.icon];
                // A logo piece lands in this slot first (LogoScene), then the card grows out of it.
                const c = smooth((e - 0.45 - j * 0.03) / 0.4);
                return (
                  <div key={f.id} ref={(el) => (cardSlotsRef.current[j] = el)}>
                    <div
                      className="h-full rounded-3xl bg-[#F9F9FB] dark:bg-[#151515] border border-neutral-200/80 dark:border-neutral-800/80 p-6 xl:p-7 text-left shadow-sm"
                      style={{
                        opacity: c,
                        transform: `translate3d(0, ${(1 - c) * 14}px, 0) scale(${0.55 + 0.45 * c})`,
                        filter: c < 1 ? `blur(${(1 - c) * 6}px)` : undefined
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-xl bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-black dark:text-white" />
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                          {f.tag}
                        </span>
                      </div>
                      <h3 className="text-lg xl:text-xl font-bold tracking-tight text-black dark:text-white">{f.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{f.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white dark:bg-[#0D0D0D]"
      style={{ height: `${Math.round(span * VH_PER_STEP)}vh` }}
      aria-label={isLanding ? 'VSM 4.0 overview' : 'The story behind VSM 4.0'}
    >
      <div ref={stageRef} className="sticky overflow-hidden" style={{ top: NAV_HEIGHT, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        {/* Soft backdrop glow behind the logo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.035),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]" />

        {/* 3D logo */}
        <Suspense fallback={null}>
          <LogoScene
            story={story}
            timeRef={timeRef}
            dark={theme === 'dark'}
            active={active}
            cardSlotsRef={cardSlotsRef}
            flipApiRef={flipApiRef}
            onFlipChange={setFlipped}
          />
        </Suspense>

        {/* ---------- Text overlay ---------- */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* Intro: the old way flows into the logo, VSM 4.0 comes out the other side */}
          {story.intro && <IntroFlow visible={1 - smooth((t + 0.85) / 0.35)} />}
          {story.map && <ScreenStage t={t} story={story} finding={finding} />}
          {steps.map(renderPanel)}

          {/* Flip hint beside the hero logo: subtle until hovered */}
          {story.heroFlip && (
            <button
              type="button"
              onClick={() => flipApiRef.current?.flip()}
              className="absolute top-1/2 flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 opacity-[0.55] hover:opacity-100 transition-opacity cursor-pointer"
              style={{
                left: `${anchor.side * 100}%`,
                transform: 'translate(8px, -50%)',
                visibility: openOn < 0.05 ? 'hidden' : 'visible',
                pointerEvents: openOn > 0.5 && t < 0.5 ? 'auto' : 'none'
              }}
              aria-label={flipped ? 'Flip the logo back to VSM 4.0' : 'Flip the logo to see who builds VSM 4.0'}
            >
              <span style={{ opacity: openOn * (1 - smooth(t / 0.4)) }} className="flex items-center gap-1.5">
                <Rotate3d className="w-3.5 h-3.5" />
                {flipped ? 'flip back' : 'drag to flip'}
              </span>
            </button>
          )}

          {/* Scroll cue */}
          <button
            onClick={() => jumpTo(inIntro ? 0 : 1)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 cursor-pointer"
            style={{ opacity: 1 - smooth(t / 0.4), pointerEvents: t < 0.3 ? 'auto' : 'none' }}
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        {/* Progress rail */}
        <nav
          className="absolute right-6 xl:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3"
          aria-label="Story progress"
          style={{
            opacity: (t < 0.5 ? openOn : 1) * (1 - e * 0.85),
            pointerEvents: t < 0.5 && openOn < 0.5 ? 'none' : 'auto'
          }}
        >
          {steps.map((key, i) => {
            const on = i === currentStep;
            const label =
              RAIL_LABELS[key] || (story.map && MAP_STEP_COPY[key]?.word) || NODE_STEPS[key]?.word || key;
            return (
              <button
                key={key}
                onClick={() => jumpTo(i)}
                className="group relative flex items-center justify-center w-4 h-4 cursor-pointer"
                aria-label={label}
                aria-current={on ? 'step' : undefined}
              >
                {/* Label floats left of the dot; hidden on the opening step so it never sits on the logo */}
                <span
                  className={`pointer-events-none absolute right-full mr-2 whitespace-nowrap text-[11px] font-medium transition-opacity duration-200 ${
                    on && t > 0.6
                      ? 'opacity-100 text-black dark:text-white'
                      : 'opacity-0 group-hover:opacity-100 text-neutral-500'
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    on ? 'w-2.5 h-2.5 bg-black dark:bg-white' : 'w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default ScrollStory;
