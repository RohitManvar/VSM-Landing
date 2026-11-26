import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_URL } from '../../config/app';
import { MEANING_ONE, MEANING_TWO } from './storyContent';

// Phone / small-screen version of the About story (the 3D scroll story is desktop-only).
function NodeList({ eyebrow, nodes }) {
  return (
    <section className="px-5 py-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">{eyebrow}</div>
      <div className="mt-6 space-y-8">
        {nodes.map((n) => (
          <div key={n.key}>
            <h3 className={`text-4xl font-extrabold tracking-[-0.04em] ${n.textClass}`}>{n.word}</h3>
            <p className="mt-2 text-lg font-bold tracking-tight text-black dark:text-white">{n.headline}</p>
            <p className="mt-1.5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">{n.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export const AboutMobile = ({ onOpenTrial }) => (
  <div className="max-w-xl mx-auto">
    <section className="px-5 pt-14 pb-10">
      <img src="/assets/vsm-icon-black.png" alt="" className="h-14 w-auto dark:hidden" />
      <img src="/assets/vsm-icon-white.png" alt="" className="h-14 w-auto hidden dark:block" />
      <div className="mt-8 text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
        About VSM 4.0
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.035em] leading-[1.08] text-black dark:text-white">
        Three nodes. One value stream.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        Our logo is three connected nodes. They stand for what every value stream is made of, and for how VSM 4.0
        helps you improve it.
      </p>
    </section>

    <NodeList eyebrow="What VSM connects" nodes={MEANING_ONE} />
    <NodeList eyebrow="How VSM 4.0 works" nodes={MEANING_TWO} />

    <section className="px-5 py-12 border-t border-neutral-200 dark:border-neutral-800">
      <img src="/assets/faber-logo.png" alt="Faber Infinite" className="h-12 w-auto" />
      <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.035em] leading-[1.1] text-black dark:text-white">
        {/* Always three lines: From the shop / floors of / Faber Infinite. */}
        <span className="block">From the shop</span>
        <span className="block">floors of</span>
        <span className="block whitespace-nowrap">
          <span className="text-[#D94438]">Faber</span>{' '}
          <span className="text-[#374F72] dark:text-[#8EA8D6]">Infinite.</span>
        </span>
      </h2>
      <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        Lean transformation specialists in global operational excellence. VSM 4.0 puts their value stream mapping
        practice into one digital platform for your team.
      </p>
      <a
        href={COMPANY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-black dark:text-white hover:underline"
      >
        Visit faberinfinite.com <ArrowUpRight className="w-4 h-4" />
      </a>
      <div className="mt-8">
        <button
          onClick={() => onOpenTrial({ mode: 'trial' })}
          className="px-7 py-3 rounded-full font-semibold text-sm shadow-md bg-black text-white dark:bg-white dark:text-black"
        >
          Start free trial
        </button>
      </div>
    </section>
  </div>
);

export default AboutMobile;
