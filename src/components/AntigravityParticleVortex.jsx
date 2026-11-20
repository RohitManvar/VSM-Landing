import React, { useEffect, useRef } from 'react';

export const AntigravityParticleVortex = ({ className = '', shockwaveTrigger = 0 }) => {
  const canvasRef = useRef(null);
  const shockwavesRef = useRef([]);

  // Trigger a gravitational burst whenever shockwaveTrigger changes
  useEffect(() => {
    if (shockwaveTrigger > 0) {
      const canvas = canvasRef.current;
      const x = canvas ? canvas.width * 0.5 : window.innerWidth * 0.5;
      const y = canvas ? canvas.height * 0.45 : window.innerHeight * 0.45;
      
      shockwavesRef.current.push({
        x,
        y,
        currentRadius: 10,
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.9,
        speed: 18,
        strength: 14,
        life: 1.0
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

    // Mouse coordinates (default to center-right like Google Antigravity)
    const mouse = {
      x: width * 0.65,
      y: height * 0.45,
      targetX: width * 0.65,
      targetY: height * 0.45,
      isActive: false
    };

    // Color palette inspired by Google Antigravity (Violet, Indigo, Blue, Slate)
    const colors = [
      '#6366F1', // Indigo
      '#4F46E5', // Deep Indigo
      '#8B5CF6', // Purple
      '#7C3AED', // Deep Violet
      '#3B82F6', // Blue
      '#2563EB', // Royal Blue
      '#93C5FD', // Light Blue
      '#94A3B8', // Slate
      '#64748B'  // Muted Slate
    ];

    const PARTICLE_COUNT = Math.min(window.innerWidth < 768 ? 220 : 480, 520);
    const particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.radius = initial 
          ? Math.random() * (Math.max(width, height) * 0.7) + 40
          : Math.max(width, height) * (0.6 + Math.random() * 0.2);
        
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (0.0016 + Math.random() * 0.0026);
        this.radialSpeed = -0.15 - Math.random() * 0.35; // inward drift

        // Shape properties (elongated dashes aligned with orbital tangent)
        this.length = 3.5 + Math.random() * 6.5; // dash length
        this.width = 1.3 + Math.random() * 1.5; // dash thickness
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0.25 + Math.random() * 0.65;
        this.tangentOffset = (Math.random() - 0.5) * 0.2;
        
        this.shockOffsetX = 0;
        this.shockOffsetY = 0;
      }

      update(centerX, centerY, activeShockwaves) {
        // Update angle along orbit
        this.angle += this.angularSpeed * (1 + 100 / (this.radius + 50));
        this.radius += this.radialSpeed;

        // Reset if sucked into core
        if (this.radius < 30) {
          this.radius = Math.max(width, height) * 0.65;
        }

        // Calculate base position
        const currentCenterX = mouse.isActive ? mouse.x : centerX;
        const currentCenterY = mouse.isActive ? mouse.y : centerY;

        this.x = currentCenterX + Math.cos(this.angle) * this.radius * 1.2;
        this.y = currentCenterY + Math.sin(this.angle) * this.radius * 0.8;

        // Mouse gravity pull
        if (mouse.isActive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 220 && dist > 10) {
            this.x += (dx / dist) * 1.8;
            this.y += (dy / dist) * 1.8;
          }
        }

        // Apply Antigravity Shockwave physics from active switch bursts
        for (let i = 0; i < activeShockwaves.length; i++) {
          const sw = activeShockwaves[i];
          const dx = this.x - sw.x;
          const dy = this.y - sw.y;
          const dist = Math.hypot(dx, dy);
          const diff = Math.abs(dist - sw.currentRadius);

          // If the shockwave wavefront is hitting this particle
          if (diff < 60) {
            const force = (1 - diff / 60) * sw.strength * sw.life;
            const normX = dx / (dist || 1);
            const normY = dy / (dist || 1);
            this.shockOffsetX += normX * force;
            this.shockOffsetY += normY * force;
            this.angle += force * 0.015; // rotational kick
          }
        }

        // Dampen shock offsets smoothly back to 0
        this.shockOffsetX *= 0.92;
        this.shockOffsetY *= 0.92;

        this.x += this.shockOffsetX;
        this.y += this.shockOffsetY;
      }

      draw(context) {
        // Draw oriented elongated dash along tangent
        const tangentAngle = this.angle + Math.PI / 2 + this.tangentOffset;
        const halfLen = this.length / 2;

        const x1 = this.x - Math.cos(tangentAngle) * halfLen;
        const y1 = this.y - Math.sin(tangentAngle) * halfLen;
        const x2 = this.x + Math.cos(tangentAngle) * halfLen;
        const y2 = this.y + Math.sin(tangentAngle) * halfLen;

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.lineCap = 'round';
        context.globalAlpha = this.opacity;
        context.stroke();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      mouse.targetX = width * 0.65;
      mouse.targetY = height * 0.45;
    };

    // Mouse movement handler
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = width * 0.65;
      mouse.targetY = height * 0.45;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render Loop
    let defaultCenterX = width * 0.62;
    let defaultCenterY = height * 0.45;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      defaultCenterX = width * 0.62;
      defaultCenterY = height * 0.45;

      // Update shockwaves
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.currentRadius += sw.speed;
        sw.life *= 0.96;
        if (sw.currentRadius > sw.maxRadius || sw.life < 0.02) {
          shockwaves.splice(i, 1);
        }
      }

      // Draw all particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(defaultCenterX, defaultCenterY, shockwaves);
        p.draw(ctx);
      }

      ctx.globalAlpha = 1.0;
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
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
};
