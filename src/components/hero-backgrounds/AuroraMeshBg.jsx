import React, { useEffect, useState } from 'react';

/**
 * Option 3: Soft Aurora Ambient Gradient Mesh (Stripe / Apple / Raycast style)
 * Zero particles or harsh lines. Floating, morphing atmospheric color clouds
 * with subtle mouse parallax and breathing glow.
 */
export const AuroraMeshBg = ({ className = '' }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 40;
      targetY = (e.clientY / innerHeight - 0.5) * 40;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setOffset({ x: currentX, y: currentY });
      animationId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Background base radial wash */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(241, 245, 249, 0.8) 0%, rgba(255, 255, 255, 1) 70%)'
        }}
      />

      {/* Floating Orb 1: Primary Indigo (Top-Left) */}
      <div
        className="absolute top-[-10%] left-[15%] w-[680px] h-[580px] rounded-full blur-[110px] opacity-45 mix-blend-multiply transition-transform duration-75 ease-out"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, #818CF8 50%, transparent 75%)',
          transform: `translate3d(${offset.x * 1.5}px, ${offset.y * 1.5}px, 0) scale(1.05)`,
          animation: 'float-slow 18s ease-in-out infinite alternate'
        }}
      />

      {/* Floating Orb 2: Royal Blue & Sky (Center-Right) */}
      <div
        className="absolute top-[5%] right-[12%] w-[620px] h-[520px] rounded-full blur-[120px] opacity-40 mix-blend-multiply transition-transform duration-75 ease-out"
        style={{
          background: 'radial-gradient(circle, #3B82F6 0%, #60A5FA 45%, transparent 75%)',
          transform: `translate3d(${-offset.x * 1.2}px, ${-offset.y * 1.2}px, 0)`,
          animation: 'float-slow-reverse 22s ease-in-out infinite alternate'
        }}
      />

      {/* Floating Orb 3: Violet Glow (Center Bottom) */}
      <div
        className="absolute top-[35%] left-[30%] w-[580px] h-[480px] rounded-full blur-[130px] opacity-30 mix-blend-multiply transition-transform duration-75 ease-out"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, #C084FC 50%, transparent 75%)',
          transform: `translate3d(${offset.x * 0.8}px, ${offset.y * 0.8}px, 0)`,
          animation: 'float-slow 26s ease-in-out infinite alternate-reverse'
        }}
      />

      {/* Floating Orb 4: Soft Cyan Accent (Far Left) */}
      <div
        className="absolute top-[25%] left-[-5%] w-[450px] h-[400px] rounded-full blur-[100px] opacity-35 mix-blend-multiply transition-transform duration-75 ease-out"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, #67E8F9 50%, transparent 75%)',
          transform: `translate3d(${-offset.x * 0.9}px, ${offset.y * 0.9}px, 0)`
        }}
      />

      {/* Fine architectural mesh texture layer (super faint) */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h32v32H0z' fill='none'/%3E%3Cpath d='M0 32V0h1v32H0zm32 0V0h1v32h-1z' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundSize: '28px 28px'
        }}
      />

      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.08); }
          100% { transform: translateY(15px) scale(0.96); }
        }
        @keyframes float-slow-reverse {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(28px) scale(1.06); }
          100% { transform: translateY(-20px) scale(0.95); }
        }
      `}</style>
    </div>
  );
};
