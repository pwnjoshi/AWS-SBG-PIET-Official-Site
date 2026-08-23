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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF", "#38BDF8", "#F43F5E", "#FFFFFF"];
    const noteSymbols = ["♪", "♫", "✦", "★", "♬"];

    const particles: Particle[] = [];
    const particleCount = isPlaying ? 36 : 24;

    for (let i = 0; i < particleCount; i++) {
      const isNote = isPlaying && Math.random() > 0.7;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isPlaying ? 0.9 : 0.4),
        vy: (Math.random() - 0.5) * (isPlaying ? 0.9 : 0.4) - (isPlaying ? 0.15 : 0),
        radius: isNote ? Math.random() * 3 + 8 : Math.random() * 2 + (isPlaying ? 1.2 : 1),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2,
        symbol: isNote ? noteSymbols[Math.floor(Math.random() * noteSymbols.length)] : undefined,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Soft Subtle Celebratory Ambient Focal Glow
      const glowColor = isPlaying
        ? "rgba(173, 92, 255, 0.08)"
        : isDark
        ? "rgba(173, 92, 255, 0.03)"
        : "rgba(173, 92, 255, 0.05)";

      const radialGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.15,
        30,
        width * 0.5,
        height * 0.4,
        width * 0.65
      );

      radialGradient.addColorStop(0, glowColor);
      if (isPlaying) {
        radialGradient.addColorStop(0.4, "rgba(255, 153, 0, 0.04)");
        radialGradient.addColorStop(0.7, "rgba(56, 189, 248, 0.02)");
      } else {
        radialGradient.addColorStop(0.5, isDark ? "rgba(142, 53, 234, 0.015)" : "rgba(142, 53, 234, 0.03)");
      }
      radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      if (!isPlaying) {
        // Delicate subtle grid lines in default mode
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.018)" : "rgba(0, 0, 0, 0.03)";
        ctx.lineWidth = 1;
        const gridSize = 80;

        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Render Floating Celebratory Constellation Network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (isPlaying && p.symbol) {
          ctx.save();
          ctx.font = `bold ${Math.round(p.radius)}px sans-serif`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.globalAlpha = p.alpha * 0.65;
          ctx.fillText(p.symbol, p.x, p.y);
          ctx.restore();
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isPlaying ? p.color : isDark ? "rgba(255,255,255,0.4)" : "rgba(142, 53, 234, 0.3)";
          ctx.shadowColor = isPlaying ? p.color : "#AD5CFF";
          ctx.shadowBlur = isPlaying ? 6 : 3;
          ctx.globalAlpha = p.alpha * 0.7;
          ctx.fill();
          ctx.restore();
        }

        // Draw glowing lines between neighboring particles
        if (isPlaying) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = (1 - dist / 110) * 0.16;
              ctx.lineWidth = 1;
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

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
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${isPlaying ? "opacity-60" : "opacity-80"}`}
    />
  );
}
