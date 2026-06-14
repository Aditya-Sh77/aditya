import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  baseX: number; baseY: number;
  vx: number; vy: number;
  radius: number; baseRadius: number;
  opacity: number; baseOpacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const count = 80;
    const mouseRadius = 180;
    const connectionDist = 140;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.5 + 0.5;
      const o = Math.random() * 0.3 + 0.08;
      particles.push({
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: r, baseRadius: r,
        opacity: o, baseOpacity: o,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.baseX += p.vx;
        p.baseY += p.vy;
        if (p.baseX < 0) p.baseX = canvas.width;
        if (p.baseX > canvas.width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = canvas.height;
        if (p.baseY > canvas.height) p.baseY = 0;

        // Mouse interaction — repel + glow
        const dx = mx - p.baseX;
        const dy = my - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          // Push particles away from mouse
          const pushX = (dx / dist) * force * -30;
          const pushY = (dy / dist) * force * -30;
          p.x += (p.baseX + pushX - p.x) * 0.1;
          p.y += (p.baseY + pushY - p.y) * 0.1;
          // Glow up
          p.radius += (p.baseRadius + force * 3 - p.radius) * 0.15;
          p.opacity += (Math.min(p.baseOpacity + force * 0.7, 1) - p.opacity) * 0.15;
        } else {
          // Return to base
          p.x += (p.baseX - p.x) * 0.06;
          p.y += (p.baseY - p.y) * 0.06;
          p.radius += (p.baseRadius - p.radius) * 0.08;
          p.opacity += (p.baseOpacity - p.opacity) * 0.08;
        }

        // Draw particle with glow
        if (p.opacity > p.baseOpacity + 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity * 0.08})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < connectionDist) {
            // Brighter connections near mouse
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            const mouseDist = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
            const mouseBoost = mouseDist < mouseRadius ? (1 - mouseDist / mouseRadius) * 0.15 : 0;
            const baseAlpha = 0.04 * (1 - cdist / connectionDist);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${baseAlpha + mouseBoost})`;
            ctx.lineWidth = mouseBoost > 0.02 ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
