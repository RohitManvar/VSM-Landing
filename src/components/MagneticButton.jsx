import React, { useRef, useState } from 'react';

export const MagneticButton = ({ 
  children, 
  className = '', 
  onClick, 
  strength = 0.35, 
  activeGlow = true,
  as: Component = 'button',
  ...props 
}) => {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Cap movement to keep it professional and subtle
    const maxDistance = 10;
    const distance = Math.hypot(deltaX, deltaY);
    const clampedDistance = Math.min(distance, maxDistance);
    const angle = Math.atan2(deltaY, deltaX);

    setOffset({
      x: Math.cos(angle) * clampedDistance,
      y: Math.sin(angle) * clampedDistance,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
      className={`relative inline-flex items-center justify-center transition-transform duration-200 ease-out cursor-pointer ${
        isHovered && activeGlow ? 'shadow-glow' : ''
      } ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        willChange: 'transform',
      }}
      {...props}
    >
      {/* Inner text shift layer for added depth */}
      <span
        className="inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${offset.x * 0.4}px, ${offset.y * 0.4}px, 0)`,
        }}
      >
        {children}
      </span>
    </Component>
  );
};
