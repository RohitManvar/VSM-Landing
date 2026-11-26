import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const FinalCtaSection = ({ onOpenTrial }) => {
  const { theme } = useTheme();

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Availability footnote note directly above banner */}
        <p className="text-center text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-8 sm:mb-10 max-w-3xl mx-auto">
          *Available to all plans on macOS and Windows desktop, and to Trial, Professional, Professional Plus, and Enterprise on web and cloud.
        </p>

        <ScrollReveal direction="up" duration={600}>
          {/* Rounded Final CTA Card (Exact ChatGPT Reference) */}
          <div className="rounded-[28px] sm:rounded-[32px] bg-[#F4F4F6] dark:bg-[#161616] py-14 sm:py-18 px-8 sm:px-14 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all duration-200 text-left border border-transparent dark:border-neutral-800/60">
            
            {/* Left Headline & Supporting Text */}
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-black dark:text-white leading-[1.12]">
                Ready to improve the way you map value streams?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Start with your current state and move towards a smarter future state with VSM 4.0.
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Primary: Get Started */}
              <button
                onClick={() => onOpenTrial({ mode: 'trial', plan: 'Professional' })}
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 cursor-pointer shadow-xs active:scale-98 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Secondary: Explore Plans */}
              <a
                href="#pricing"
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-800"
              >
                <span>Explore Plans</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
