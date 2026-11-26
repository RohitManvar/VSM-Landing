import React from 'react';

/**
 * Official LFD Cloud Brand Logo Component (High Quality Vector)
 * 
 * Props:
 * - variant: 'horizontal' | 'stacked' | 'iconOnly' (default: 'horizontal')
 * - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * - theme: 'auto' | 'light' | 'dark' (default: 'auto')
 * - className: string
 */
export const LfdLogo = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'auto',
  className = ''
}) => {
  const heights = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-12',
    xl: 'h-16'
  };

  const hClass = heights[size] || heights.md;

  if (variant === 'iconOnly') {
    return (
      <span className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo/vector/svg/mark/lfd-mark-color.svg"
          alt="LFD Cloud Logo"
          className={`${hClass} w-auto object-contain transition-transform duration-200 hover:scale-105`}
        />
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <span className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src={
            theme === 'dark'
              ? '/logo/vector/svg/stacked/lfd-logo-stacked-darkmode.svg'
              : '/logo/vector/svg/stacked/lfd-logo-stacked-color.svg'
          }
          alt="LFD Cloud Logo"
          className={`${hClass} w-auto object-contain`}
        />
      </span>
    );
  }

  // Default: Horizontal Lockup
  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      {theme === 'auto' ? (
        <>
          <img
            src="/logo/vector/svg/horizontal/lfd-logo-horizontal-color.svg"
            alt="LFD Cloud"
            className={`${hClass} w-auto object-contain block dark:hidden transition-transform duration-200`}
          />
          <img
            src="/logo/vector/svg/horizontal/lfd-logo-horizontal-darkmode.svg"
            alt="LFD Cloud"
            className={`${hClass} w-auto object-contain hidden dark:block transition-transform duration-200`}
          />
        </>
      ) : theme === 'dark' ? (
        <img
          src="/logo/vector/svg/horizontal/lfd-logo-horizontal-darkmode.svg"
          alt="LFD Cloud"
          className={`${hClass} w-auto object-contain`}
        />
      ) : (
        <img
          src="/logo/vector/svg/horizontal/lfd-logo-horizontal-color.svg"
          alt="LFD Cloud"
          className={`${hClass} w-auto object-contain`}
        />
      )}
    </span>
  );
};

export default LfdLogo;
