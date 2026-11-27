import React, { useEffect, useState } from 'react';
import { AlertTriangle, Sparkles, TrendingDown, Timer } from 'lucide-react';

// The intro's "old way → VSM 4.0" story around the still glass logo.
// Left: how value stream maps are usually made (paper, sticky notes, whiteboards, generic
// drag-and-drop shapes). Those drift into the logo and vanish. Right: what comes out of
// VSM 4.0 — calculated boxes, AI findings and real numbers (from the GR-24 example).
// The logo itself never moves; only the content flows through it.

const NAV_HEIGHT = 60;
const LOGO_Y = 0.336; // logo centre, as a fraction of the stage height (INTRO_POSE in LogoScene)
const CYCLE = 9; // seconds for one item to make its trip

const HAND = { fontFamily: '"Segoe Print", "Bradley Hand", "Ink Free", "Comic Sans MS", cursive' };

// ---------- The old way (left) ----------

function PaperSketch() {
  return (
    <div className="w-[190px] rounded-sm bg-[#FBF8F1] border border-[#E7E0CF] shadow-md p-3" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 17px, #ECE6D6 17px 18px)' }}>
      <svg viewBox="0 0 170 80" className="w-full h-auto" fill="none" stroke="#55534E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22 L44 20 L45 46 L7 47 Z" />
        <path d="M66 22 L104 21 L104 47 L65 46 Z" />
        <path d="M126 21 L163 22 L162 46 L125 47 Z" />
        <path d="M47 34 C52 33 57 35 63 34 M59 31 L63 34 L59 37" />
        <path d="M107 34 C112 35 117 33 123 34 M119 31 L123 34 L119 37" />
        <path d="M52 62 L58 52 L64 62 Z" />
        <path d="M112 62 L118 52 L124 62 Z" />
        <path d="M10 72 C40 70 70 74 100 71 C120 70 140 73 160 71" strokeDasharray="3 3" />
      </svg>
      <div className="mt-1 text-[11px] text-[#55534E] leading-tight" style={HAND}>
        C/T = ?? <span className="line-through">42s</span> 38s?
      </div>
    </div>
  );
}

function StickyNote({ text, color = '#FDE68A' }) {
  return (
    <div className="w-[118px] h-[104px] p-2.5 shadow-md text-[12px] leading-snug text-[#4B4434]" style={{ background: color, ...HAND }}>
      {text}
    </div>
  );
}

function Whiteboard() {
  return (
    <div className="w-[176px] rounded-md bg-white border-[5px] border-[#C9CED6] shadow-md p-2.5">
      <svg viewBox="0 0 160 70" className="w-full h-auto" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14 L50 12 L50 38 L8 40 Z" stroke="#2563EB" strokeWidth="2" />
        <path d="M100 13 L146 15 L144 40 L101 39 Z" stroke="#2563EB" strokeWidth="2" />
        <path d="M54 26 C70 22 84 30 96 26" stroke="#2563EB" strokeWidth="2" />
        <path d="M60 50 C80 46 100 56 124 48" stroke="#DC2626" strokeWidth="2" />
        <ellipse cx="128" cy="58" rx="26" ry="8" fill="#EEF0F3" stroke="none" />
      </svg>
      <div className="text-[11px] text-[#DC2626] leading-tight" style={HAND}>
        WIP?? ask shift 2
      </div>
    </div>
  );
}

function DragDropTool() {
  return (
    <div className="w-[184px] rounded-md bg-[#F3F4F6] border border-neutral-300 shadow-md overflow-hidden">
      <div className="h-5 bg-neutral-200 flex items-center gap-1 px-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
        ))}
      </div>
      <div className="relative h-[82px]">
        <div className="absolute left-3 top-4 w-14 h-9 bg-white border border-neutral-400 text-[9px] text-neutral-500 flex items-center justify-center">Box 1</div>
        <div className="absolute left-[104px] top-9 w-14 h-9 bg-white border border-neutral-400 text-[9px] text-neutral-500 flex items-center justify-center">Box 2</div>
        <div className="absolute left-[60px] top-[34px] w-10 h-px bg-neutral-400 rotate-[18deg]" />
        {/* cursor dragging a shape */}
        <svg className="absolute left-[118px] top-[54px] w-3.5 h-3.5" viewBox="0 0 24 24" fill="#111">
          <path d="M3 2l7 19 2.5-7.5L20 11z" />
        </svg>
      </div>
    </div>
  );
}

// ---------- VSM 4.0 (right) ----------

function ProcessCard() {
  return (
    <div className="w-[196px] rounded-xl bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 shadow-lg overflow-hidden text-[11px]">
      <div className="px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <span className="font-semibold text-black dark:text-white">Gear Hobbing</span>
        <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
          Over takt
        </span>
      </div>
      {[
        ['Cycle time', '31 s'],
        ['Takt', '28.2 s'],
        ['OEE', '76.3 %'],
        ['Changeover', '60 min']
      ].map(([k, v]) => (
        <div key={k} className="px-3 py-1 flex justify-between text-neutral-600 dark:text-neutral-400">
          <span>{k}</span>
          <span className="font-mono text-black dark:text-white">{v}</span>
        </div>
      ))}
    </div>
  );
}

function AiCard() {
  return (
    <div className="w-[214px] rounded-xl bg-white dark:bg-[#161616] border border-violet-200 dark:border-violet-900 shadow-lg p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-300">
        <Sparkles className="w-3.5 h-3.5" /> AI Smart Recommendation
      </div>
      <div className="mt-1.5 flex gap-1.5 items-start">
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
        <div className="text-[12px] font-semibold leading-snug text-black dark:text-white">Bottleneck at Gear Hobbing</div>
      </div>
      <div className="mt-1 text-[11px] leading-snug text-neutral-600 dark:text-neutral-400">
        Add a parallel workstation or cut 2.8 s to meet takt.
      </div>
    </div>
  );
}

function LeadTimeCard() {
  return (
    <div className="w-[178px] rounded-xl bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 shadow-lg p-3">
      <div className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Lead time</div>
      <div className="mt-0.5 text-[18px] font-bold tracking-tight text-black dark:text-white">16.5 → 10.3 d</div>
      <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
        <TrendingDown className="w-3.5 h-3.5" /> −38% future state
      </div>
    </div>
  );
}

function TaktChip() {
  return (
    <div className="rounded-full bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 shadow-md pl-2 pr-3 py-1.5 flex items-center gap-1.5 text-[11px]">
      <span className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300 flex items-center justify-center">
        <Timer className="w-3 h-3" />
      </span>
      <span className="text-neutral-600 dark:text-neutral-400">Takt</span>
      <span className="font-semibold text-black dark:text-white">28.2 s</span>
      <span className="text-neutral-400">· calculated</span>
    </div>
  );
}

// Where each item rests (fractions of the stage) and how it's tilted.
const OLD_WAY = [
  // Kept left of ~34% so nothing rests on the logo (it spans roughly the middle 36–64%).
  { el: <PaperSketch />, x: 0.05, y: 0.08, r: -6, delay: 0 },
  { el: <StickyNote text="Lead time? ~2 wks?? check w/ stores" />, x: 0.235, y: 0.06, r: 5, delay: CYCLE * 0.25 },
  { el: <StickyNote text="Redraw after kaizen :(" color="#FBCFE8" />, x: 0.15, y: 0.25, r: -8, delay: CYCLE * 0.125 },
  { el: <Whiteboard />, x: 0.03, y: 0.33, r: 3, delay: CYCLE * 0.5 },
  { el: <DragDropTool />, x: 0.2, y: 0.38, r: -3, delay: CYCLE * 0.75 }
];
const VSM_WAY = [
  { el: <ProcessCard />, x: 0.65, y: 0.08, delay: CYCLE * 0.15 },
  { el: <AiCard />, x: 0.74, y: 0.2, delay: CYCLE * 0.4 },
  { el: <TaktChip />, x: 0.66, y: 0.4, delay: CYCLE * 0.65 },
  { el: <LeadTimeCard />, x: 0.78, y: 0.41, delay: CYCLE * 0.9 }
];

function useStageSize() {
  const read = () => ({ w: window.innerWidth, h: window.innerHeight - NAV_HEIGHT });
  const [size, setSize] = useState(read);
  useEffect(() => {
    const onResize = () => setSize(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
}

export function IntroFlow({ visible }) {
  const { w, h } = useStageSize();
  if (visible < 0.01) return null;

  // Each item's trip, in pixels, between its resting spot and the logo's centre.
  const toLogo = (x, y) => ({ '--dx': `${(0.5 - x) * w - 80}px`, '--dy': `${(LOGO_Y - y) * h - 40}px` });

  return (
    <div className="pointer-events-none absolute inset-0 z-[5]" style={{ opacity: visible }} aria-hidden="true">
      <style>{`
        @keyframes vsmIntoLogo {
          0%   { opacity: 0; transform: translate(0,0) rotate(var(--r)) scale(1); }
          12%  { opacity: 1; }
          62%  { opacity: 1; transform: translate(0,0) rotate(var(--r)) scale(1); }
          100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(0deg) scale(0.2); }
        }
        @keyframes vsmOutOfLogo {
          0%   { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0.2); }
          30%  { opacity: 1; transform: translate(0,0) scale(1); }
          85%  { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(0,0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vsm-flow-item { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {OLD_WAY.map((it, i) => (
        <div
          key={`old-${i}`}
          className="vsm-flow-item absolute"
          style={{
            left: `${it.x * 100}%`,
            top: `${it.y * 100}%`,
            '--r': `${it.r}deg`,
            ...toLogo(it.x, it.y),
            opacity: 0,
            animation: `vsmIntoLogo ${CYCLE}s cubic-bezier(0.55, 0, 0.75, 0.4) ${it.delay}s infinite`
          }}
        >
          {it.el}
        </div>
      ))}

      {VSM_WAY.map((it, i) => (
        <div
          key={`new-${i}`}
          className="vsm-flow-item absolute"
          style={{
            left: `${it.x * 100}%`,
            top: `${it.y * 100}%`,
            ...toLogo(it.x, it.y),
            opacity: 0,
            animation: `vsmOutOfLogo ${CYCLE}s cubic-bezier(0.2, 0.7, 0.2, 1) ${it.delay}s infinite`
          }}
        >
          {it.el}
        </div>
      ))}

      {/* Quiet captions under each side */}
      <div className="absolute left-[7%] top-[52%] text-[12px] text-neutral-500 dark:text-neutral-400">
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">The old way</span> · paper, whiteboards,
        drag-and-drop shapes
      </div>
      <div className="absolute right-[5%] top-[52%] text-[12px] text-neutral-500 dark:text-neutral-400 text-right">
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">VSM 4.0</span> · calculated, connected,
        AI-powered
      </div>
    </div>
  );
}

export default IntroFlow;
