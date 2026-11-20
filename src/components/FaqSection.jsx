import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { SITE_DATA } from '../config/siteData';

export const FaqSection = ({ onOpenDemo }) => {
  // Keep first open by default
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleIndex = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#FAFAF9] text-slate-900 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-white border border-slate-200 text-slate-700 mb-5 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>{SITE_DATA.faq.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
            {SITE_DATA.faq.headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {SITE_DATA.faq.subheadline}
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-14 space-y-4">
          {SITE_DATA.faq.items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 overflow-hidden transition-all duration-150 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-200 border border-slate-200 ${
                      isOpen ? 'rotate-180 bg-slate-200 text-slate-900' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-base">Have specific engineering questions?</h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Talk with a Faber Infinite Lean transformation specialist.</p>
          </div>
          <button
            onClick={() => onOpenDemo({ mode: 'demo' })}
            className="shrink-0 px-6 py-2.5 text-xs font-semibold text-white bg-black hover:bg-neutral-800 rounded-full transition-all cursor-pointer shadow-xs"
          >
            Speak with an Engineer
          </button>
        </div>

      </div>
    </section>
  );
};
