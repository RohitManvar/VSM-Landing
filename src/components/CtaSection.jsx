import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_DATA } from '../config/siteData';
import { MagneticButton } from './MagneticButton';
import { CursorSpotlight } from './CursorSpotlight';
import { ScrollReveal } from './ScrollReveal';

export const CtaSection = ({ onOpenTrial, onOpenDemo }) => {
  return (
    <section className="py-24 md:py-36 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-100/40 via-indigo-50/40 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <CursorSpotlight spotlightColor="rgba(37, 99, 235, 0.04)" spotlightSize={700}>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          
          <ScrollReveal direction="up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-100 border border-slate-200 text-slate-700 mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>TRANSFORM YOUR PLANT FLOW</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] leading-[1.08] max-w-4xl mx-auto text-slate-900">
              Make your value stream visible.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 block mt-2">
                Make improvement possible.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              {SITE_DATA.finalCta.description}
            </p>

            {/* Action Buttons in ChatGPT Overview Pill Style */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                onClick={() => onOpenTrial({ mode: 'trial' })}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-base shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{SITE_DATA.finalCta.primaryButton}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={() => onOpenDemo({ mode: 'demo' })}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-2xs transition-colors cursor-pointer flex items-center justify-center"
              >
                <span>{SITE_DATA.finalCta.secondaryButton}</span>
              </MagneticButton>
            </div>

            {/* Confidence Checkpoints */}
            <div className="mt-14 pt-10 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Free tier available • Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No credit card required upfront</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Built by Faber Infinite Lean specialists</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </CursorSpotlight>
    </section>
  );
};
