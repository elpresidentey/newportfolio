'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; alpha: number;
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const COUNT = 60;
    const CONNECT_DIST = 130;
    const MOUSE_RADIUS = 200;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function init() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.15,
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx -= (dx / dist) * force * 0.15;
          p.vy -= (dy / dist) * force * 0.15;
        }

        p.vx += (Math.random() - 0.5) * 0.08;
        p.vy += (Math.random() - 0.5) * 0.08;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx = (p.vx / speed) * 1.5; p.vy = (p.vy / speed) * 1.5; }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(42, 96%, 50%, ${p.alpha})`;
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cd = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cd < CONNECT_DIST) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            const alpha = (1 - cd / CONNECT_DIST) * 0.1;
            ctx!.strokeStyle = `hsla(42, 96%, 50%, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onResize() { resize(); init(); }

    resize();
    init();
    draw();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 80%, transparent)' }}
    />
  );
}
