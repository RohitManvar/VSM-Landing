import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Official VSM 4.0 Adaptive Brand Logo Component
 * Automatically switches between Black and White based on Light/Dark mode:
 * - Light Mode: Black logo & black wordmark
 * - Dark Mode: White logo & white wordmark
 */
export const VsmLogo = ({ 
  size = 'md', // 'sm' | 'md' | 'lg'
  iconOnly = false,
  showText = true,
  className = '' 
}) => {
  const heights = {
    sm: 'h-[20px] sm:h-[22px]',
    md: 'h-[21px] sm:h-[26px]',
    lg: 'h-[30px] sm:h-[36px]'
  };

  const textSizes = {
    sm: 'text-[15px]',
    md: 'text-[15px] sm:text-[17px]',
    lg: 'text-[20px] sm:text-[22px]'
  };

  const hClass = heights[size] || heights.md;
  const tClass = textSizes[size] || textSizes.md;

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      {/* Light Mode: Black Icon */}
      <img
        src="/assets/vsm-icon-black.png"
        alt="VSM 4.0"
        className={`${hClass} w-auto object-contain block dark:hidden transition-transform duration-200 hover:scale-105 shrink-0`}
      />
      {/* Dark Mode: White Icon */}
      <img
        src="/assets/vsm-icon-white.png"
        alt="VSM 4.0"
        className={`${hClass} w-auto object-contain hidden dark:block transition-transform duration-200 hover:scale-105 shrink-0`}
      />

      {showText && !iconOnly && (
        <span className={`font-bold ${tClass} tracking-tight font-sans text-black dark:text-white transition-colors duration-200 whitespace-nowrap`}>
          VSM 4.0
        </span>
      )}
    </div>
  );
};

export default VsmLogo;
