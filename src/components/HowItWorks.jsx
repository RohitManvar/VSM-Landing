import React, { useState } from 'react';
import { 
  FolderPlus, 
  Network, 
  LineChart, 
  Flag, 
  ArrowRight, 
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { SITE_DATA } from '../config/siteData';

const iconMap = [FolderPlus, Network, LineChart, Flag];

export const HowItWorks = ({ onOpenTrial }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-100 border border-slate-200 text-slate-700 mb-5 shadow-2xs">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>{SITE_DATA.howItWorks.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12]">
            {SITE_DATA.howItWorks.headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {SITE_DATA.howItWorks.subheadline}
          </p>
        </div>

        {/* Horizontal 4-Step Process Timeline */}
        <div className="mt-16 sm:mt-20 relative">
          
          {/* Subtle Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-px bg-slate-200 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {SITE_DATA.howItWorks.steps.map((step, idx) => {
              const StepIcon = iconMap[idx] || FolderPlus;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-xl ring-2 ring-slate-900/5 -translate-y-1'
                      : 'bg-[#FAFAF9] border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-2xs'
                  }`}
                >
                  {/* Step Number & Icon Circle */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border font-bold text-sm transition-colors ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 group-hover:text-slate-900 group-hover:border-slate-300'
                      }`}
                    >
                      <StepIcon className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${
                      isSelected 
                        ? 'text-slate-900 bg-slate-100 border-slate-300' 
                        : 'text-slate-500 bg-white border-slate-200'
                    }`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Step Badge */}
                  <div className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
                    {step.badge}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  {/* Selected Indicator dot */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Step {idx + 1} of 4</span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Step Preview & Methodology Details */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#FAFAF9] border border-slate-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900 tracking-tight">
              Ready to map your production line?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Start with standard templates for machining, assembly, fabrication, or packaging lines.
            </p>
          </div>
          <button
            onClick={() => onOpenTrial({ mode: 'trial' })}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
