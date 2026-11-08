"use client";

import { useEffect, useRef } from "react";

interface Particle2D {
  sx: number; // scatter x
  sy: number; // scatter y
  tx: number; // target x
  ty: number; // target y
  size: number;
  color: string;
  delay: number;
  phase: number;
  isTriangle: boolean;
  angle: number;
}

const PALETTE = ["#c9a227", "#faf9f6", "#1a7a7a", "#6b5b95", "#e2bc43"];

export function BrainParticlesFallback() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    let isPaused = false;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Setup canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || window.innerHeight;

    // Responsive brain center
    const isDesktop = width >= 1024;
    const isTablet = width >= 640 && width < 1024;
    const brainCenterX = isDesktop ? width * 0.68 : isTablet ? width * 0.60 : width * 0.50;
    const brainCenterY = isDesktop ? height * 0.48 : height * 0.42;
    const brainScale = isDesktop ? 1.0 : isTablet ? 0.85 : 0.68;

    // Generate ~500 particles for the 2D silhouette
    const count = isDesktop ? 550 : isTablet ? 420 : 320;
    const particles: Particle2D[] = [];

    for (let i = 0; i < count; i++) {
      // Pick region: 80% cerebrum (two lobes), 12% cerebellum, 8% brainstem
      const rand = Math.random();
      let tx = brainCenterX;
      let ty = brainCenterY;

      if (rand < 0.8) {
        // Dual lobe cerebrum
        const hemi = i % 2 === 0 ? -1 : 1;
        const lobeCenterX = brainCenterX + hemi * 70 * brainScale;
        const lobeCenterY = brainCenterY - 15 * brainScale;
        const angle = Math.random() * Math.PI * 2;
        // Elliptical lobe
        const rx = (45 + Math.random() * 40) * brainScale;
        const ry = (55 + Math.random() * 45) * brainScale;
        
        // Fissure indent: keep particles slightly outward from center
        let px = lobeCenterX + Math.cos(angle) * rx;
        const py = lobeCenterY + Math.sin(angle) * ry;
        if (hemi === -1 && px > brainCenterX - 8 * brainScale) {
          px = brainCenterX - 8 * brainScale - Math.random() * 12 * brainScale;
        }
        if (hemi === 1 && px < brainCenterX + 8 * brainScale) {
          px = brainCenterX + 8 * brainScale + Math.random() * 12 * brainScale;
        }
        tx = px;
        ty = py;
      } else if (rand < 0.92) {
        // Cerebellum
        const hemi = i % 2 === 0 ? -1 : 1;
        const cbX = brainCenterX + hemi * 45 * brainScale;
        const cbY = brainCenterY + 75 * brainScale;
        const angle = Math.random() * Math.PI * 2;
        tx = cbX + Math.cos(angle) * (28 * brainScale * Math.random());
        ty = cbY + Math.sin(angle) * (20 * brainScale * Math.random());
      } else {
        // Brainstem
        const t = Math.random();
        const stemWidth = (22 - t * 10) * brainScale;
        tx = brainCenterX + (Math.random() - 0.5) * stemWidth;
        ty = brainCenterY + (75 + t * 55) * brainScale;
      }

      // Scattered position (t=0)
      const scatterAngle = Math.random() * Math.PI * 2;
      const scatterDist = Math.max(width, height) * (0.35 + Math.random() * 0.5);
      const sx = brainCenterX + Math.cos(scatterAngle) * scatterDist;
      const sy = brainCenterY + Math.sin(scatterAngle) * scatterDist;

      particles.push({
        sx,
        sy,
        tx,
        ty,
        size: (2.5 + Math.random() * 3.5) * brainScale,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        delay: Math.random() * 0.4, // 0 to 400ms delay
        phase: Math.random() * Math.PI * 2,
        isTriangle: Math.random() > 0.35,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const drawTriangle = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.866, size * 0.5);
      ctx.lineTo(-size * 0.866, size * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawDot = (x: number, y: number, radius: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleVisibilityChange = () => {
      isPaused = document.visibilityState === "hidden";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = (timestamp: number) => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // in seconds

      ctx.clearRect(0, 0, width, height);

      const convergenceDuration = 2.2;

      for (const p of particles) {
        let curX = p.tx;
        let curY = p.ty;
        let curAngle = p.angle;

        if (prefersReducedMotion) {
          // Immediately at target position, no drift
          curX = p.tx;
          curY = p.ty;
        } else {
          const t = Math.max(0, elapsed - p.delay);
          if (t < convergenceDuration) {
            const progress = t / convergenceDuration;
            // Cubic ease out
            const ease = 1 - Math.pow(1 - progress, 3);
            curX = p.sx + (p.tx - p.sx) * ease;
            curY = p.sy + (p.ty - p.sy) * ease;
            curAngle = p.angle + (1 - ease) * Math.PI * 3;
          } else {
            // Settled with gentle ambient drift & shimmer
            const idleTime = elapsed - convergenceDuration;
            const driftX = Math.sin(idleTime * 1.2 + p.phase) * 3;
            const driftY = Math.cos(idleTime * 0.9 + p.phase * 1.3) * 3;
            curX = p.tx + driftX;
            curY = p.ty + driftY;
          }
        }

        if (p.isTriangle) {
          drawTriangle(curX, curY, p.size, curAngle, p.color);
        } else {
          drawDot(curX, curY, p.size * 0.5, p.color);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
