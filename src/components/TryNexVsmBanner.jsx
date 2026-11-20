import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const TryNexVsmBanner = ({ onOpenTrial }) => {
  const { theme } = useTheme();

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Availability footnote note directly above banner (Exact ChatGPT style) */}
        <p className="text-center text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-8 sm:mb-10 max-w-3xl mx-auto">
          *Available to all plans on macOS and Windows desktop, and to Professional, Enterprise, and Consultants on web and cloud.
        </p>

        <ScrollReveal direction="up" duration={600}>
          {/* Rounded "Try NexVSM today" Card (Exact ChatGPT Reference) */}
          <div className="rounded-3xl bg-[#F9F9FB] dark:bg-[#151515] border border-neutral-200/80 dark:border-neutral-800/80 py-12 sm:py-16 px-8 sm:px-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-200 text-left">
            
            {/* Left Headline */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-black dark:text-white">
                Try NexVSM today
              </h2>
            </div>

            {/* Right Action Button (Black pill in Light mode, White in Dark mode) */}
            <div className="shrink-0">
              <button
                onClick={() => onOpenTrial({ mode: 'trial' })}
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 cursor-pointer shadow-xs active:scale-98 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <span>Try now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
