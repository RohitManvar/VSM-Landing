import React from 'react';
import { Unplug, EyeOff, Clock, AlertCircle } from 'lucide-react';
import { SITE_DATA } from '../config/siteData';
import { InteractiveCard } from './InteractiveCard';
import { ScrollReveal } from './ScrollReveal';

const iconMap = {
  'disconnected-processes': Unplug,
  'limited-visibility': EyeOff,
  'manual-reporting': Clock,
};

export const ProblemSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-100 border border-slate-200 text-slate-700 mb-5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>{SITE_DATA.problems.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
              {SITE_DATA.problems.headline}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {SITE_DATA.problems.subheadline}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Clean Surface Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SITE_DATA.problems.cards.map((card, idx) => {
            const IconComponent = iconMap[card.id] || Unplug;
            return (
              <ScrollReveal key={card.id} direction="up" delay={idx * 120}>
                <InteractiveCard
                  tiltDegree={3}
                  className="h-full bg-[#FAFAF9] hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Bar: Icon + Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-105 group-hover:border-blue-500/40 transition-all shadow-2xs">
                        <IconComponent className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        {card.number}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-950 transition-colors">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Sub-label Stat Row */}
                  <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900 tracking-tight">{card.stat}</span>
                    <span className="text-slate-500">{card.statLabel}</span>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
