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
  const smoothMouseRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isHoveringInteractiveRef = useRef<boolean>(false);
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

  const symbols = ["♪", "♫", "✦", "★", "✨", "◆", "♬", "🎉"];

  useEffect(() => {
    if (isPlaying) {
      document.documentElement.classList.add("ambience-mode-active");
      document.body.classList.add("ambience-mode-active");

      // Grand Opening Multi-Stage Confetti Blast
      try {
        confetti({
          particleCount: 120,
          spread: 150,
          origin: { y: 0.5 },
          colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF", "#38BDF8", "#FFFFFF"],
        });

        setTimeout(() => {
          confetti({
            particleCount: 70,
            angle: 60,
            spread: 90,
            origin: { x: 0, y: 0.65 },
            colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF"],
          });
          confetti({
            particleCount: 70,
            angle: 120,
            spread: 90,
            origin: { x: 1, y: 0.65 },
            colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF"],
          });
        }, 350);
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
        const speed = burst ? Math.random() * 5.5 + 2.5 : Math.random() * 2.2 + 0.6;
        const isNote = Math.random() > 0.6;
        const isConfetti = !isNote && Math.random() > 0.5;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 18,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 1.0 : 1.4), // upward float
          size: isNote ? Math.random() * 9 + 13 : isConfetti ? Math.random() * 7 + 6 : Math.random() * 4.5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: burst ? Math.random() * 0.015 + 0.01 : Math.random() * 0.018 + 0.012,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.14,
          type: isNote ? "note" : isConfetti ? "confetti" : "star",
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
      if (particlesRef.current.length > 280) {
        particlesRef.current = particlesRef.current.slice(-280);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('button, a, input, [role="button"], .interactive-hover');
      isHoveringInteractiveRef.current = isInteractive;

      setCursorVisible(true);
      spawnParticles(e.clientX, e.clientY, isInteractive ? 3 : 2, false);
    };

    const handleClick = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY, 30, true);
    };

    const handleScroll = () => {
      if (mousePosRef.current.x > 0) {
        spawnParticles(mousePosRef.current.x, mousePosRef.current.y, 2, false);
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mousePosRef.current = { x: t.clientX, y: t.clientY };
        smoothMouseRef.current = { x: t.clientX, y: t.clientY };
        spawnParticles(t.clientX, t.clientY, 6, false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    let timer = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timer++;
      // Continuous celebratory drifting embers & notes from bottom
      if (timer % 7 === 0) {
        spawnParticles(
          Math.random() * canvas.width,
          canvas.height - Math.random() * 80,
          1,
          false
        );
      }

      // Smooth interpolation for magic cursor wand follower
      if (mousePosRef.current.x > 0 && mousePosRef.current.y > 0) {
        if (smoothMouseRef.current.x < 0) {
          smoothMouseRef.current = { ...mousePosRef.current };
        } else {
          smoothMouseRef.current.x += (mousePosRef.current.x - smoothMouseRef.current.x) * 0.35;
          smoothMouseRef.current.y += (mousePosRef.current.y - smoothMouseRef.current.y) * 0.35;
        }

        const mx = smoothMouseRef.current.x;
        const my = smoothMouseRef.current.y;
        const isHovering = isHoveringInteractiveRef.current;

        ctx.save();
        // Inner core star spark
        ctx.shadowColor = isHovering ? "#FF9900" : "#AD5CFF";
        ctx.shadowBlur = isHovering ? 20 : 14;
        ctx.fillStyle = isHovering ? "#FF9900" : "#AD5CFF";
        ctx.beginPath();
        ctx.arc(mx, my, isHovering ? 6 : 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Outer rotating planetary celebration ring
        ctx.strokeStyle = isHovering ? "#AD5CFF" : "#FF9900";
        ctx.lineWidth = isHovering ? 2 : 1.5;
        ctx.shadowColor = isHovering ? "#AD5CFF" : "#FF9900";
        ctx.shadowBlur = isHovering ? 15 : 10;
        ctx.beginPath();
        const ringRadius = (isHovering ? 18 : 13) + Math.sin(timer * 0.12) * 3;
        ctx.arc(mx, my, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 4 small orbit dots around the wand
        for (let k = 0; k < 4; k++) {
          const orbitAngle = timer * 0.06 + (k * Math.PI) / 2;
          const ox = mx + Math.cos(orbitAngle) * ringRadius;
          const oy = my + Math.sin(orbitAngle) * ringRadius;
          ctx.fillStyle = isHovering ? "#FFFFFF" : "#38BDF8";
          ctx.shadowColor = "#FFFFFF";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

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
          ctx.shadowBlur = 12;
          ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
        } else if (p.type === "confetti") {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
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
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
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
        className="fixed inset-0 pointer-events-none z-[4] select-none mix-blend-screen transition-all duration-1000 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(173, 92, 255, 0.18) 0%, rgba(255, 153, 0, 0.10) 45%, rgba(14, 165, 233, 0.06) 75%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      {/* Floating Celebratory Animated Stardust Badges */}
      <div className="fixed top-20 right-6 sm:right-10 z-[50] pointer-events-none select-none hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 backdrop-blur-xl border border-[#AD5CFF]/60 text-white shadow-2xl shadow-purple-500/40 animate-bounce">
        <span className="text-sm">🎵</span>
        <span className="text-xs font-mono font-bold bg-gradient-to-r from-[#FF9900] via-[#AD5CFF] to-[#38BDF8] bg-clip-text text-transparent">
          Celebration Ambience Active
        </span>
      </div>
    </div>
  );
}
