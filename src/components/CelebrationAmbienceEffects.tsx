"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useSoundtrack } from "@/context/SoundtrackContext";

interface Particle {
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
  type: "star" | "note" | "circle";
  symbol?: string;
}

export default function CelebrationAmbienceEffects() {
  const { isPlaying } = useSoundtrack();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

  const colors = [
    "#FF9900", // AWS Orange
    "#FFB84D", // Gold
    "#AD5CFF", // Violet
    "#BE7BFF", // Purple
    "#38BDF8", // Sky Cyan
    "#F43F5E", // Rose Coral
    "#FFFFFF", // Sparkle White
  ];

  const symbols = ["♪", "♫", "✦", "★", "✨", "◆"];

  useEffect(() => {
    if (isPlaying) {
      document.documentElement.classList.add("ambience-mode-active");

      // Launch Celebratory Confetti Burst on Activation
      try {
        confetti({
          particleCount: 90,
          spread: 120,
          origin: { y: 0.55 },
          colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF", "#38BDF8", "#FFFFFF"],
        });
      } catch {
        // ignore
      }
    } else {
      document.documentElement.classList.remove("ambience-mode-active");
      particlesRef.current = [];
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

    const spawnParticle = (x: number, y: number, count = 2, burst = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 4.5 + 2 : Math.random() * 1.8 + 0.4;
        const isSymbol = Math.random() > 0.6;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0.6 : 0.9), // upward float
          size: isSymbol ? Math.random() * 7 + 10 : Math.random() * 3.5 + (burst ? 2.5 : 1),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: burst ? Math.random() * 0.018 + 0.012 : Math.random() * 0.022 + 0.016,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          type: isSymbol ? "note" : Math.random() > 0.4 ? "star" : "circle",
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
      if (particlesRef.current.length > 220) {
        particlesRef.current = particlesRef.current.slice(-220);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      spawnParticle(x, y, 2, false);
      lastMousePosRef.current = { x, y };
    };

    const handleClick = (e: MouseEvent) => {
      spawnParticle(e.clientX, e.clientY, 18, true);
    };

    const handleScroll = () => {
      if (lastMousePosRef.current) {
        spawnParticle(lastMousePosRef.current.x, lastMousePosRef.current.y, 2, false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Ambient floating celebratory stardust & notes periodically drift up
    let timer = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timer++;
      if (timer % 10 === 0) {
        spawnParticle(
          Math.random() * canvas.width,
          canvas.height - Math.random() * 60,
          1,
          false
        );
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "note" && p.symbol) {
          ctx.font = `bold ${Math.round(p.size)}px sans-serif`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
        } else if (p.type === "star") {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          const r = p.size;
          for (let j = 0; j < 4; j++) {
            ctx.lineTo(Math.cos((j * Math.PI) / 2) * r, Math.sin((j * Math.PI) / 2) * r);
            ctx.lineTo(
              Math.cos(((j + 0.5) * Math.PI) / 2) * (r * 0.35),
              Math.sin(((j + 0.5) * Math.PI) / 2) * (r * 0.35)
            );
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.documentElement.classList.remove("ambience-mode-active");
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
      {/* Fullscreen Interactive Canvas for Cursor Sparks & Notes */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999] select-none"
        aria-hidden="true"
      />

      {/* Atmospheric Celebratory Beam & Aura Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-[4] select-none opacity-50 mix-blend-screen transition-all duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(173, 92, 255, 0.22) 0%, rgba(255, 153, 0, 0.12) 40%, rgba(14, 165, 233, 0.08) 65%, transparent 80%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
