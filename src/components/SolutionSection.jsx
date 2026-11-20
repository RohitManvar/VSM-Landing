import React from 'react';
import { 
  GitBranch, 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  Check, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SITE_DATA } from '../config/siteData';
import { InteractiveCard } from './InteractiveCard';
import { ScrollReveal } from './ScrollReveal';

const iconMap = {
  map: GitBranch,
  measure: Calculator,
  analyse: Sparkles,
  improve: TrendingUp,
};

export const SolutionSection = ({ onOpenTrial }) => {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#FAFAF9] text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-blue-50 border border-blue-200/80 text-blue-700 mb-5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>{SITE_DATA.solutions.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
              {SITE_DATA.solutions.headline}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {SITE_DATA.solutions.subheadline}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Clean Solution Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(SITE_DATA.solutions.cards || []).map((card, idx) => {
            const IconComponent = iconMap[card.id] || GitBranch;
            const isAi = card.id === 'analyse';
            const featureList = card.features || card.bullets || [];

            return (
              <ScrollReveal key={card.id || idx} direction="up" delay={idx * 100}>
                <InteractiveCard
                  tiltDegree={3}
                  className={`h-full rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group border ${
                    isAi
                      ? 'bg-gradient-to-b from-blue-50/60 to-white border-blue-200/90 shadow-sm hover:shadow-md'
                      : 'bg-white hover:bg-slate-50/50 border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Bar: Icon + Step */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-2xs transition-transform duration-300 group-hover:scale-105 ${
                          isAi
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <IconComponent className="w-6 h-6 stroke-[1.8]" />
                      </div>

                      <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        Step 0{idx + 1}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {card.title}
                    </h3>
                    <div className="text-xs font-mono text-blue-600 font-semibold mt-1">
                      {card.action || card.subtitle}
                    </div>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                      {card.description}
                    </p>

                    {/* Features / Bullets list */}
                    {featureList.length > 0 && (
                      <div className="mt-5 space-y-2">
                        {featureList.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Link */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <button
                      onClick={() => onOpenTrial({ mode: 'trial' })}
                      className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore workflow</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
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
