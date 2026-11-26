import React from 'react';

/**
 * Official LFD Cloud Brand Mark Component (Icon only)
 */
export const LfdIcon = ({
  size = 32,
  variant = 'color', // 'color' | 'darkmode' | 'black' | 'white' | 'navy' | 'teal'
  className = ''
}) => {
  const iconMap = {
    color: '/logo/vector/svg/mark/lfd-mark-color.svg',
    darkmode: '/logo/vector/svg/mark/lfd-mark-darkmode.svg',
    black: '/logo/vector/svg/mark/lfd-mark-black.svg',
    white: '/logo/vector/svg/mark/lfd-mark-white.svg',
    navy: '/logo/vector/svg/mark/lfd-mark-navy.svg',
    teal: '/logo/vector/svg/mark/lfd-mark-teal.svg'
  };

  const src = iconMap[variant] || iconMap.color;

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="LFD Cloud Mark"
      className={`inline-block select-none object-contain ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default LfdIcon;
