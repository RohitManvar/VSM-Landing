import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Compass, Activity, Sparkles, BarChart3, FileText, Users } from 'lucide-react';
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
  smooth,
  stageVisibility,
  stepIndex,
  storyLength,
  storyStart
} from './storyContent';

// three.js is heavy; load it after the text so the hero paints immediately.
const LogoScene = lazy(() => import('./LogoScene'));

const ICONS = { Compass, Activity, Sparkles, BarChart3, FileText, Users };
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

export const ScrollStory = ({ story = STORIES.landing, onOpenTrial, onIntroChange }) => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const cardSlotsRef = useRef([]);
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

  const openOn = stageVisibility(t, 0);
  const e = explodeAmount(t, story);
  const explodeAt = stepIndex(story, 'explode');
  const gridHeader = explodeAt < 0 ? 0 : smooth((t - (explodeAt + 0.25)) / 0.5);
  const currentStep = Math.max(0, Math.min(lastStep, Math.round(t - 0.5)));

  const renderPanel = (key, i) => {
    const node = NODE_STEPS[key];
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
      case 'hero':
        return (
          <LeftPanel key={key} style={panelStyle(t, i, { drift: 90 })}>
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
            <CtaButtons onOpenTrial={onOpenTrial} />
          </LeftPanel>
        );
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
              VSM 4.0 is built by <span className="text-[#D94438]">Faber</span>{' '}
              <span className="text-[#374F72] dark:text-[#8EA8D6]">Infinite.</span>
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
      <div className="sticky overflow-hidden" style={{ top: NAV_HEIGHT, height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
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
          />
        </Suspense>

        {/* ---------- Text overlay ---------- */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {steps.map(renderPanel)}

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
            const label = RAIL_LABELS[key] || NODE_STEPS[key]?.word || key;
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
