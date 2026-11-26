import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const UseNexVsmCta = ({ onOpenTrial }) => {
  const { theme } = useTheme();

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={600}>
          {/* Prominent Horizontal Banner Card (ChatGPT Style) */}
          <div className="rounded-[28px] sm:rounded-[32px] bg-[#F4F4F6] dark:bg-[#161616] p-8 sm:p-12 md:p-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-200 text-left border border-transparent dark:border-neutral-800/60">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black dark:text-white mb-2">
                Use VSM 4.0 for Current State Map, Future State Map, and everything in between.
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Map your current state. Discover improvements. Design your future state.
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <button
                onClick={() => onOpenTrial({ mode: 'trial', plan: 'Professional' })}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-xs active:scale-98 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <span>Explore VSM 4.0</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
