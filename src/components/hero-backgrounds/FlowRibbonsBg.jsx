import React, { useEffect, useRef } from 'react';

/**
 * Option 1: Production Flow Ribbons
 * Continuous horizontal Lean manufacturing value streams (Material, Info, Takt).
 * Soft glowing bezier ribbons with traveling energy pulses and smooth cursor interaction.
 */
export const FlowRibbonsBg = ({ className = '', shockwaveTrigger = 0 }) => {
  const canvasRef = useRef(null);

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
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
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

    // Flow Ribbons definitions
    const ribbons = [
      { yRatio: 0.18, amplitude: 28, wavelength: 0.0018, speed: 0.008, color: '#3B82F6', alpha: 0.35, width: 2.5, pulseSpeed: 2.2, pulses: [0.1, 0.45, 0.8] },
      { yRatio: 0.32, amplitude: 38, wavelength: 0.0014, speed: 0.006, color: '#6366F1', alpha: 0.4, width: 3.0, pulseSpeed: 1.8, pulses: [0.2, 0.6, 0.9] },
      { yRatio: 0.50, amplitude: 32, wavelength: 0.0016, speed: 0.009, color: '#0EA5E9', alpha: 0.32, width: 2.0, pulseSpeed: 2.5, pulses: [0.05, 0.5, 0.75] },
      { yRatio: 0.68, amplitude: 44, wavelength: 0.0012, speed: 0.005, color: '#8B5CF6', alpha: 0.3, width: 2.5, pulseSpeed: 1.5, pulses: [0.3, 0.7] },
      { yRatio: 0.84, amplitude: 30, wavelength: 0.0020, speed: 0.007, color: '#2563EB', alpha: 0.25, width: 2.0, pulseSpeed: 2.0, pulses: [0.15, 0.65] },
    ];

    let time = 0;

    const render = () => {
      time += 1;
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw each production ribbon
      ribbons.forEach((ribbon, rIdx) => {
        const baseY = height * ribbon.yRatio;
        const phase = time * ribbon.speed;

        ctx.beginPath();
        const step = 8;
        let prevX = 0;
        let prevY = baseY;

        for (let x = 0; x <= width + step; x += step) {
          // Sine wave oscillation
          let y = baseY + Math.sin(x * ribbon.wavelength + phase) * ribbon.amplitude;
          // Harmonic wave for organic flow feel
          y += Math.sin(x * ribbon.wavelength * 2 + phase * 1.5) * (ribbon.amplitude * 0.35);

          // Interactive mouse deflection
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 260) {
              const force = (1 - dist / 260) * 35;
              y += Math.sin((dy / 260) * Math.PI) * force;
            }
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            const cx = (prevX + x) / 2;
            const cy = (prevY + y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
          }
          prevX = x;
          prevY = y;
        }

        // Stroke line with gradient
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, 'rgba(59, 130, 246, 0)');
        grad.addColorStop(0.15, ribbon.color);
        grad.addColorStop(0.85, ribbon.color);
        grad.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.strokeStyle = grad;
        ctx.globalAlpha = ribbon.alpha;
        ctx.lineWidth = ribbon.width;
        ctx.stroke();

        // Traveling takt/energy pulses
        ribbon.pulses.forEach((pOffset, pIdx) => {
          const progress = ((time * ribbon.pulseSpeed * 0.5 + pOffset * width) % width) / width;
          const px = progress * width;
          let py = baseY + Math.sin(px * ribbon.wavelength + phase) * ribbon.amplitude;
          py += Math.sin(px * ribbon.wavelength * 2 + phase * 1.5) * (ribbon.amplitude * 0.35);

          if (mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 260) {
              const force = (1 - dist / 260) * 35;
              py += Math.sin((dy / 260) * Math.PI) * force;
            }
          }

          // Pulse glow aura
          const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 18);
          pulseGrad.addColorStop(0, ribbon.color);
          pulseGrad.addColorStop(0.4, ribbon.color);
          pulseGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = pulseGrad;
          ctx.beginPath();
          ctx.arc(px, py, 16, 0, Math.PI * 2);
          ctx.fill();

          // Bright center nucleus
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 0.95;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      });

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
      {/* Soft warm/cool backdrop glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[360px] bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-sky-100/20 blur-3xl rounded-full" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
};
