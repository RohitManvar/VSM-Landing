import React from 'react';
import { Factory, Briefcase, Compass, Check, Users } from 'lucide-react';
import { SITE_DATA } from '../config/siteData';
import { InteractiveCard } from './InteractiveCard';
import { ScrollReveal } from './ScrollReveal';

const iconMap = {
  'manufacturing-companies': Factory,
  'lean-consultants': Briefcase,
  'industrial-engineers': Compass,
};

export const AudienceSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAF9] text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-white border border-slate-200 text-slate-700 mb-5 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>{SITE_DATA.audience.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
              {SITE_DATA.audience.headline}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {SITE_DATA.audience.subheadline}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Elevated Bento Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_DATA.audience.cards.map((card, idx) => {
            const IconComponent = iconMap[card.id] || Factory;
            const impactStat = card.stat || (
              card.id === 'manufacturing-companies'
                ? 'Up to 40% WIP Reduction'
                : card.id === 'lean-consultants'
                  ? '10x Faster VSM Reporting'
                  : '100% Takt Alignment'
            );

            return (
              <ScrollReveal key={card.id} direction="up" delay={idx * 120}>
                <InteractiveCard
                  tiltDegree={3}
                  className="h-full bg-white hover:bg-[#FAFBFD] rounded-2xl p-7 sm:p-8 border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon & Role Title */}
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center mb-6 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {card.role}
                    </h3>

                    <p className="mt-1 text-xs font-mono text-blue-600 font-medium">
                      {card.headline || card.highlight}
                    </p>

                    <p className="mt-4 text-sm text-slate-600 leading-relaxed font-normal">
                      {card.description}
                    </p>

                    {/* Value Points */}
                    <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
                      {(card.points || card.useCases || []).map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3 text-xs text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="leading-relaxed font-normal">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome Tag */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="text-slate-400">Measurable Impact</span>
                    <span className="font-bold text-emerald-600">{impactStat}</span>
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
