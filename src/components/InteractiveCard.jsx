import React, { useRef, useState } from 'react';

export const InteractiveCard = ({ 
  children, 
  className = '', 
  tiltDegree = 5, 
  spotlightColor = 'rgba(37, 99, 235, 0.08)',
  ...props 
}) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMouseCoord({ x, y });

    // Normalize coordinates from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Subtle 3D tilt calculation
    const rotX = -normY * tiltDegree;
    const rotY = normX * tiltDegree;

    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ease-out ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        willChange: 'transform',
      }}
      {...props}
    >
      {/* Pointer Spotlight Sheen Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mouseCoord.x}px ${mouseCoord.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Reactive Border Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl border border-transparent transition-opacity duration-300 z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          borderImage: `radial-gradient(200px circle at ${mouseCoord.x}px ${mouseCoord.y}px, rgba(37, 99, 235, 0.4), transparent) 1`,
        }}
      />

      {/* Card Content with subtle depth */}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};
