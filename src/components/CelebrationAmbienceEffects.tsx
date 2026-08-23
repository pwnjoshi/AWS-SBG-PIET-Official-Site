"use client";

import { useEffect, useRef, useState } from "react";
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
  type: "star" | "note" | "spark" | "confetti";
  symbol?: string;
}

export default function CelebrationAmbienceEffects() {
  const { isPlaying } = useSoundtrack();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const colors = [
    "#FF9900", // AWS Orange
    "#FFB84D", // Gold
    "#AD5CFF", // Violet
    "#BE7BFF", // Purple
    "#38BDF8", // Sky Cyan
    "#F43F5E", // Coral Pink
    "#22C55E", // Emerald Green
    "#FFFFFF", // Sparkle White
  ];

  const symbols = ["♪", "♫", "✦", "★", "✨", "◆", "♬"];

  useEffect(() => {
    if (isPlaying) {
      document.documentElement.classList.add("ambience-mode-active");
      document.body.classList.add("ambience-mode-active");

      // Grand Opening Confetti Blast
      try {
        confetti({
          particleCount: 100,
          spread: 140,
          origin: { y: 0.5 },
          colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF", "#38BDF8", "#FFFFFF"],
        });

        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 0.7 },
            colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF"],
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 80,
            origin: { x: 1, y: 0.7 },
            colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF"],
          });
        }, 300);
      } catch (e) {
        console.warn("Confetti blast note:", e);
      }
    } else {
      document.documentElement.classList.remove("ambience-mode-active");
      document.body.classList.remove("ambience-mode-active");
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
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const spawnParticles = (x: number, y: number, count = 3, burst = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 5 + 2 : Math.random() * 2 + 0.5;
        const isNote = Math.random() > 0.65;
        const isConfetti = !isNote && Math.random() > 0.5;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0.8 : 1.2), // float upward
          size: isNote ? Math.random() * 8 + 12 : isConfetti ? Math.random() * 6 + 6 : Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: burst ? Math.random() * 0.016 + 0.012 : Math.random() * 0.02 + 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.12,
          type: isNote ? "note" : isConfetti ? "confetti" : "star",
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
      if (particlesRef.current.length > 250) {
        particlesRef.current = particlesRef.current.slice(-250);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setCursorVisible(true);
      spawnParticles(e.clientX, e.clientY, 2, false);
    };

    const handleClick = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY, 24, true);
    };

    const handleScroll = () => {
      if (mousePosRef.current.x > 0) {
        spawnParticles(mousePosRef.current.x, mousePosRef.current.y, 2, false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let timer = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timer++;
      // Continuous celebratory drifting embers from bottom
      if (timer % 8 === 0) {
        spawnParticles(
          Math.random() * canvas.width,
          canvas.height - Math.random() * 80,
          1,
          false
        );
      }

      // Draw custom glowing cursor sparkler if mouse is inside window
      if (mousePosRef.current.x > 0 && mousePosRef.current.y > 0) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;

        ctx.save();
        ctx.shadowColor = "#AD5CFF";
        ctx.shadowBlur = 15;
        ctx.fillStyle = "#AD5CFF";
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fill();

        // Outer rotating glowing star ring
        ctx.strokeStyle = "#FF9900";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#FF9900";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(mx, my, 12 + Math.sin(timer * 0.1) * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
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
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "note" && p.symbol) {
          ctx.font = `bold ${Math.round(p.size)}px sans-serif`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
        } else if (p.type === "confetti") {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
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
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.documentElement.classList.remove("ambience-mode-active");
      document.body.classList.remove("ambience-mode-active");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying]);

  return (
    <div className={`transition-opacity duration-700 pointer-events-none ${isPlaying ? "opacity-100" : "opacity-0"}`}>
      {/* Fullscreen Interactive Canvas for Cursor Sparks, Notes, and Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] select-none"
        aria-hidden="true"
      />

      {/* Atmospheric Celebratory Beam & Aurora Waves Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-[3] select-none mix-blend-screen transition-all duration-1000"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(173, 92, 255, 0.28) 0%, rgba(255, 153, 0, 0.16) 45%, rgba(14, 165, 233, 0.1) 75%, transparent 90%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
