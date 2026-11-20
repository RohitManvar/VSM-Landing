import React, { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ 
  children, 
  className = '', 
  threshold = 0.05, 
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'none'
  duration = 600
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) {
      setIsVisible(true);
      return;
    }

    // Immediately show if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      setIsVisible(true);
      return;
    }

    // Safety fallback: reveal after 600ms so content is never stuck invisible
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      clearTimeout(safetyTimer);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(safetyTimer);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      clearTimeout(safetyTimer);
      observer.unobserve(el);
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    if (direction === 'up') return 'translate3d(0, 20px, 0)';
    if (direction === 'down') return 'translate3d(0, -20px, 0)';
    return 'none';
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
