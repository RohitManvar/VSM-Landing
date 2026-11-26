import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const PlansPricingBanner = ({ onOpenTrial }) => {
  const { theme } = useTheme();

  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={600}>
          {/* Rounded Plans and Pricing Banner Card (Exact ChatGPT Reference) */}
          <div className="rounded-3xl bg-[#F9F9FB] dark:bg-[#151515] border border-neutral-200/80 dark:border-neutral-800/80 p-8 sm:p-12 md:p-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-200 text-left">
            
            {/* Left Text */}
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white mb-2">
                Plans and pricing
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                VSM 4.0 has plans for individual engineers, Lean teams and multi-plant enterprises — start with a free trial.
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <a
                href="#pricing"
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-xs active:scale-98 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <span>Learn more</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
