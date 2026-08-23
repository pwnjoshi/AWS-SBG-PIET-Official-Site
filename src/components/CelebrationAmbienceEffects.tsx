"use client";

import { useEffect, useRef } from "react";
import { useSoundtrack } from "@/context/SoundtrackContext";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
}

export default function CelebrationAmbienceEffects() {
  const { isPlaying } = useSoundtrack();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

  const colors = [
    "#FF9900", // AWS Orange
    "#FFB84D", // Gold
    "#AD5CFF", // Violet
    "#C084FC", // Purple
    "#38BDF8", // Cyan
    "#FFFFFF", // Sparkle White
  ];

  useEffect(() => {
    if (!isPlaying) {
      sparklesRef.current = [];
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const spawnSparkle = (x: number, y: number, count = 2, burst = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 4 + 1.5 : Math.random() * 1.5 + 0.3;
        sparklesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0.5 : 0.8), // gentle upward float
          size: Math.random() * 3.5 + (burst ? 2 : 1),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: burst ? Math.random() * 0.02 + 0.015 : Math.random() * 0.025 + 0.02,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
      if (sparklesRef.current.length > 250) {
        sparklesRef.current = sparklesRef.current.slice(-250);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      spawnSparkle(x, y, 2, false);
      lastMousePosRef.current = { x, y };
    };

    const handleClick = (e: MouseEvent) => {
      spawnSparkle(e.clientX, e.clientY, 16, true);
    };

    const handleScroll = () => {
      if (lastMousePosRef.current) {
        spawnSparkle(lastMousePosRef.current.x, lastMousePosRef.current.y, 2, false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Ambient floating embers automatically drift up periodically
    let ambientTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ambientTimer++;
      if (ambientTimer % 8 === 0) {
        // Random gentle ambient ember from bottom of viewport
        spawnSparkle(
          Math.random() * canvas.width,
          canvas.height - Math.random() * 100,
          1,
          false
        );
      }

      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const s = sparklesRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        s.rotation += s.rotSpeed;

        if (s.alpha <= 0) {
          sparklesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);

        // Draw 4-point star sparkle
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;

        ctx.beginPath();
        const r = s.size;
        for (let j = 0; j < 4; j++) {
          ctx.lineTo(Math.cos((j * Math.PI) / 2) * r, Math.sin((j * Math.PI) / 2) * r);
          ctx.lineTo(
            Math.cos(((j + 0.5) * Math.PI) / 2) * (r * 0.35),
            Math.sin(((j + 0.5) * Math.PI) / 2) * (r * 0.35)
          );
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <>
      {/* Interactive Cursor & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] select-none"
        aria-hidden="true"
      />

      {/* Atmospheric Aurora Background Glow when Ambience is Active */}
      <div
        className="fixed inset-0 pointer-events-none z-[5] select-none opacity-40 dark:opacity-30 mix-blend-screen transition-opacity duration-1000 animate-pulse"
        style={{
          background:
            "radial-gradient(ellipse at 50% 10%, rgba(173, 92, 255, 0.18) 0%, rgba(255, 153, 0, 0.10) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
