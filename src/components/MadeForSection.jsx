import React, { useEffect, useState } from 'react';
import { Briefcase, Check, Factory, Maximize2, Ruler, Sparkles, X } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

// "Made for…" — who VSM 4.0 is built for. Honest by design: no customer stories or results
// (there are none yet), just each audience's daily problem in their words, what VSM 4.0 gives
// them, and a real screen from the app (the sample GR-24 value stream).

const AUDIENCES = [
  {
    id: 'engineers',
    icon: Ruler,
    role: 'Industrial & process engineers',
    pain: 'I spend days in Excel and Visio before I can even start analysing.',
    gets: [
      'Enter process data once and the map draws itself',
      'Takt, lead time and PCE calculated for every step',
      'Standard Lean symbols, editable on the canvas'
    ],
    image: '/assets/vsm-for-engineers.webp',
    fit: 'object-contain',
    screen: 'Current state map'
  },
  {
    id: 'managers',
    icon: Factory,
    role: 'Plant & production managers',
    pain: 'I need to see where the line loses time, without reading a 40-page report.',
    gets: [
      'Lead time and value-add at a glance',
      'Bottlenecks flagged against customer takt',
      'Current and future state side by side'
    ],
    image: '/assets/vsm-for-managers.webp',
    fit: 'object-contain',
    screen: 'Timeline and summary'
  },
  {
    id: 'lean',
    icon: Sparkles,
    role: 'Lean, OpEx & CI leaders',
    pain: 'Our kaizen maps go stale on the whiteboard the week after the workshop.',
    gets: [
      'AI ranks what to fix first, by impact',
      'Apply a finding straight into the future state',
      'One shared, always-current map for the team'
    ],
    image: '/assets/vsm-for-lean.webp',
    fit: 'object-cover object-right-bottom', // the AI findings corner of the planner
    screen: 'Future State Planner · AI recommendations'
  },
  {
    id: 'consultants',
    icon: Briefcase,
    role: 'Lean consultants & trainers',
    pain: 'Every client engagement starts from a blank sheet and ends in PowerPoint.',
    gets: [
      'A separate organization for every client',
      'Future-state maps with FIFO lanes, supermarkets and kaizen bursts',
      'PDF and Excel reports ready to hand over'
    ],
    image: '/assets/vsm-for-consultants.webp',
    fit: 'object-contain',
    screen: 'Future state map'
  }
];

const INDUSTRIES = [
  'Automotive',
  'Engineering & machining',
  'Metals',
  'Electronics',
  'FMCG & food',
  'Pharma & medical devices',
  'Plastics',
  'Textiles'
];

function Lightbox({ item, onClose }) {
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
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.screen} in VSM 4.0`}
    >
      <div
        className="relative w-full max-w-6xl rounded-2xl bg-white dark:bg-[#141414] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="text-sm">
            <span className="font-semibold text-black dark:text-white">{item.screen}</span>
            <span className="text-neutral-500 dark:text-neutral-400"> · Sample value stream, Transmission gear GR-24</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-[#F8F9FB] max-h-[78vh] overflow-auto">
          <img src={item.image} alt={`${item.screen} in VSM 4.0`} className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export const MadeForSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="who-its-for"
      className="py-20 md:py-32 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
              Who it&apos;s for
            </div>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.12] text-black dark:text-white">
              Made for the people who improve flow.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Whether you map one line or run Lean across plants, VSM 4.0 fits the way your team already works.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon;
            return (
              <ScrollReveal key={a.id} direction="up" delay={i * 80} duration={600}>
                <article className="h-full flex flex-col rounded-3xl bg-[#F9F9FB] dark:bg-[#151515] border border-neutral-200/80 dark:border-neutral-800/80 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-white dark:bg-[#1F1F1F] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-black dark:text-white" />
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">{a.role}</h3>
                  </div>

                  <p className="mt-5 text-[17px] sm:text-lg leading-snug text-neutral-800 dark:text-neutral-200">
                    &ldquo;{a.pain}&rdquo;
                  </p>

                  <div className="mt-5 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                    With VSM 4.0
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {a.gets.map((g) => (
                      <li key={g} className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>

                  {/* The real screen; click to see it full size */}
                  <button
                    onClick={() => setOpen(a)}
                    className="group mt-auto pt-6 block w-full text-left cursor-zoom-in"
                    aria-label={`Open ${a.screen} screenshot`}
                  >
                    <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-[#F8F9FB] h-44 sm:h-48">
                      <img
                        src={a.image}
                        alt={`${a.screen} in VSM 4.0`}
                        className={`absolute inset-0 w-full h-full ${a.fit} transition-transform duration-500 group-hover:scale-[1.03]`}
                        loading="lazy"
                      />
                      <span className="absolute right-2.5 top-2.5 w-7 h-7 rounded-full bg-white/90 dark:bg-black/70 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-200" />
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{a.screen}</div>
                  </button>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Industries — where it fits, not who has bought it */}
        <ScrollReveal direction="up" duration={600}>
          <div className="mt-12 sm:mt-16 text-center">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Built for any discrete manufacturing line</div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {INDUSTRIES.map((x) => (
                <span
                  key={x}
                  className="px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  {x}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
              Screens show a sample value stream built in VSM 4.0.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
};

export default MadeForSection;
