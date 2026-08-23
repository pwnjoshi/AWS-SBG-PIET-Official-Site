"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useSoundtrack } from "@/context/SoundtrackContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  symbol?: string;
}

export default function ParticleNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const { isPlaying } = useSoundtrack();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const colors = ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF", "#38BDF8", "#FFFFFF"];
    const noteSymbols = ["♪", "♫", "✦", "★", "♬"];

    const particles: Particle[] = [];
    const particleCount = isPlaying ? 24 : 18;

    for (let i = 0; i < particleCount; i++) {
      const isNote = isPlaying && Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isPlaying ? 0.7 : 0.3),
        vy: (Math.random() - 0.5) * (isPlaying ? 0.7 : 0.3) - (isPlaying ? 0.15 : 0),
        radius: isNote ? Math.random() * 3 + 10 : Math.random() * 1.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.35,
        symbol: isNote ? noteSymbols[Math.floor(Math.random() * noteSymbols.length)] : undefined,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Render Particles in a fast single batch
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha * 0.85;

        if (isPlaying && p.symbol) {
          ctx.font = `bold ${Math.round(p.radius)}px sans-serif`;
          ctx.fillStyle = p.color;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isPlaying ? p.color : isDark ? "rgba(255,255,255,0.4)" : "rgba(142, 53, 234, 0.35)";
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${isPlaying ? "opacity-90" : "opacity-80"}`}
    />
  );
}
