import React, { useEffect, useRef } from 'react';

/**
 * Option 2: Architectural Blueprint Grid with Traveling Beams (Linear / Vercel style)
 * Clean precision engineering grid with crosshairs and luminous traveling laser beams.
 */
export const BlueprintGridBg = ({ className = '' }) => {
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
      y: height * 0.4,
      targetX: width * 0.5,
      targetY: height * 0.4,
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

    const GRID_SIZE = 54;

    // Laser beam tracks
    const beams = [
      { axis: 'x', pos: 3, progress: 0.1, speed: 0.0035, len: 260, color: '#3B82F6' },
      { axis: 'x', pos: 6, progress: 0.65, speed: 0.0042, len: 320, color: '#6366F1' },
      { axis: 'x', pos: 10, progress: 0.35, speed: 0.0028, len: 220, color: '#0EA5E9' },
      { axis: 'y', pos: 5, progress: 0.2, speed: 0.0030, len: 200, color: '#6366F1' },
      { axis: 'y', pos: 12, progress: 0.7, speed: 0.0045, len: 280, color: '#3B82F6' },
      { axis: 'y', pos: 20, progress: 0.45, speed: 0.0032, len: 240, color: '#8B5CF6' },
    ];

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Static Fine Grid Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#E2E8F0'; // Slate-200
      ctx.globalAlpha = 0.5;

      // Vertical lines
      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Crosshair (+) markers at intersections near mouse
      ctx.strokeStyle = '#94A3B8'; // Slate-400
      ctx.lineWidth = 1.2;
      const arm = 3.5;

      for (let x = 0; x <= width; x += GRID_SIZE) {
        for (let y = 0; y <= height; y += GRID_SIZE) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only brighten crosshairs within spotlight radius
          if (dist < 320) {
            const alpha = (1 - dist / 320) * 0.7;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(x - arm, y);
            ctx.lineTo(x + arm, y);
            ctx.moveTo(x, y - arm);
            ctx.lineTo(x, y + arm);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Traveling Laser Beams along grid lines
      beams.forEach((beam) => {
        beam.progress = (beam.progress + beam.speed) % 1.0;

        ctx.save();
        if (beam.axis === 'x') {
          const y = beam.pos * GRID_SIZE;
          const headX = beam.progress * (width + beam.len) - beam.len / 2;
          const tailX = headX - beam.len;

          const grad = ctx.createLinearGradient(tailX, y, headX, y);
          grad.addColorStop(0, 'rgba(59, 130, 246, 0)');
          grad.addColorStop(0.7, beam.color);
          grad.addColorStop(1, '#FFFFFF');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.moveTo(tailX, y);
          ctx.lineTo(headX, y);
          ctx.stroke();

          // Laser head glow
          const headGlow = ctx.createRadialGradient(headX, y, 0, headX, y, 12);
          headGlow.addColorStop(0, '#FFFFFF');
          headGlow.addColorStop(0.4, beam.color);
          headGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(headX, y, 10, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const x = beam.pos * GRID_SIZE;
          const headY = beam.progress * (height + beam.len) - beam.len / 2;
          const tailY = headY - beam.len;

          const grad = ctx.createLinearGradient(x, tailY, x, headY);
          grad.addColorStop(0, 'rgba(99, 102, 241, 0)');
          grad.addColorStop(0.7, beam.color);
          grad.addColorStop(1, '#FFFFFF');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.moveTo(x, tailY);
          ctx.lineTo(x, headY);
          ctx.stroke();

          // Laser head glow
          const headGlow = ctx.createRadialGradient(x, headY, 0, x, headY, 12);
          headGlow.addColorStop(0, '#FFFFFF');
          headGlow.addColorStop(0.4, beam.color);
          headGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(x, headY, 10, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
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
      {/* Vignette mask around edges so grid gently fades away */}
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'radial-gradient(circle at 50% 35%, transparent 40%, rgba(255,255,255,0.85) 85%, #FFFFFF 100%)'
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
