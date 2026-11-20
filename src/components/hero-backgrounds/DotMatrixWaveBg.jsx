import React, { useEffect, useRef } from 'react';

/**
 * Option 4: Interactive Precision Dot Matrix with Proximity Waves (Raycast / Framer style)
 * Clean, structured 2D grid of micro-dots with mouse proximity illumination and ambient ripple.
 */
export const DotMatrixWaveBg = ({ className = '', shockwaveTrigger = 0 }) => {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);

  useEffect(() => {
    if (shockwaveTrigger > 0) {
      const canvas = canvasRef.current;
      const x = canvas ? canvas.width * 0.5 : window.innerWidth * 0.5;
      const y = canvas ? canvas.height * 0.4 : window.innerHeight * 0.4;
      ripplesRef.current.push({
        x,
        y,
        radius: 10,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.8,
        speed: 16,
        strength: 22,
        alpha: 1.0
      });
    }
  }, [shockwaveTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: width * 0.5,
      y: height * 0.35,
      targetX: width * 0.5,
      targetY: height * 0.35,
      active: false
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const SPACING = 30; // Dot pitch in pixels
    let time = 0;

    const render = () => {
      time += 0.02;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Process ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha -= 0.015;
        if (r.radius > r.maxRadius || r.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
        }
      }

      // Draw dot matrix
      for (let x = SPACING; x < width - SPACING / 2; x += SPACING) {
        for (let y = SPACING; y < height - SPACING / 2; y += SPACING) {
          // Ambient gentle breathing sine wave
          const wave = Math.sin(x * 0.008 + y * 0.008 + time) * 1.5;

          // Mouse distance calculation
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let dotX = x;
          let dotY = y + wave;
          let dotRadius = 1.2;
          let dotAlpha = 0.22;
          let dotColor = '#94A3B8'; // Default slate-400

          // Proximity effect
          if (dist < 200) {
            const factor = 1 - dist / 200;
            // Magnetic gentle displacement
            dotX += (dx / dist) * factor * 8;
            dotY += (dy / dist) * factor * 8;
            dotRadius = 1.2 + factor * 2.2;
            dotAlpha = 0.25 + factor * 0.75;
            dotColor = factor > 0.5 ? '#4F46E5' : '#3B82F6';
          }

          // Ripples check
          ripplesRef.current.forEach((r) => {
            const rDx = x - r.x;
            const rDy = y - r.y;
            const rDist = Math.sqrt(rDx * rDx + rDy * rDy);
            const diff = Math.abs(rDist - r.radius);
            if (diff < 60) {
              const rFactor = (1 - diff / 60) * r.alpha;
              dotRadius = Math.max(dotRadius, 1.2 + rFactor * 2.8);
              dotAlpha = Math.min(1.0, dotAlpha + rFactor * 0.8);
              dotColor = '#6366F1';
            }
          });

          // Draw the dot
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.globalAlpha = dotAlpha;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Soft gradient wash */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, transparent 30%, rgba(255, 255, 255, 0.7) 70%, #FFFFFF 100%)'
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
