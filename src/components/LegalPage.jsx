import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LEGAL_ENTITY, POLICIES, policyHref } from '../config/legal';

export const LegalPage = ({ policy }) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${policy.title} | ${LEGAL_ENTITY.productName}`;
    return () => { document.title = previous; };
  }, [policy]);

  return (
    <section className="bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 pt-28 pb-20 sm:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
        <aside className="lg:sticky lg:top-28 self-start">
          <a href="#" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </a>
          <span className="block text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
            Terms &amp; Policies
          </span>
          <nav className="flex flex-wrap lg:flex-col gap-x-4 gap-y-2 text-sm">
            {POLICIES.map((p) => (
              <a
                key={p.slug}
                href={policyHref(p.slug)}
                aria-current={p.slug === policy.slug ? 'page' : undefined}
                className={p.slug === policy.slug
                  ? 'font-medium text-black dark:text-white'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white transition-colors'}
              >
                {p.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{policy.title}</h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">{policy.summary}</p>
          <p className="mt-2 text-xs text-neutral-500">Last updated: {LEGAL_ENTITY.lastUpdated}</p>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {policy.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-semibold text-black dark:text-white mb-2">{s.heading}</h2>
                {s.paragraphs?.map((t, i) => <p key={i} className="mb-2">{t}</p>)}
                {s.bullets && (
                  <ul className="list-disc pl-5 space-y-1.5">
                    {s.bullets.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
