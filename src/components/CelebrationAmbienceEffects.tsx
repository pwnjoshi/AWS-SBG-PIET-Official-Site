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
  type: "star" | "note" | "confetti";
  symbol?: string;
}

export default function CelebrationAmbienceEffects() {
  const { isPlaying } = useSoundtrack();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isHoveringInteractiveRef = useRef<boolean>(false);
  const isTouchRef = useRef<boolean>(false);

  const colors = [
    "#FF9900", // AWS Orange
    "#FFB84D", // Gold
    "#AD5CFF", // Violet
    "#BE7BFF", // Purple
    "#38BDF8", // Sky Cyan
    "#FFFFFF", // Sparkle White
  ];

  const symbols = ["♪", "♫", "✦", "★", "✨", "♬"];
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const lastScrollTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (!isPlaying) {
      document.documentElement.classList.remove("ambience-mode-active");
      document.body.classList.remove("ambience-mode-active");
      particlesRef.current = [];
      trailRef.current = [];
      mousePosRef.current = { x: -100, y: -100 };
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // When Ambience Mode is active:
    document.documentElement.classList.add("ambience-mode-active");
    document.body.classList.add("ambience-mode-active");

    // Check if device is primarily touch/mobile
    isTouchRef.current =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || !window.matchMedia("(hover: hover)").matches);

    // Initial Confetti Blast
    try {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF", "#38BDF8", "#FFFFFF"],
      });
    } catch (e) {
      console.warn("Confetti blast note:", e);
    }

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Ultra-lightweight particle spawner (strictly capped at 25 particles)
    const spawnParticles = (x: number, y: number, count = 1, burst = false) => {
      if (particlesRef.current.length >= 25) return;

      const toAdd = Math.min(count, 25 - particlesRef.current.length);
      for (let i = 0; i < toAdd; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 4 + 1.5 : Math.random() * 1.5 + 0.5;
        const isNote = Math.random() > 0.5;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0.6 : 1),
          size: isNote ? Math.random() * 4 + 12 : Math.random() * 3 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: burst ? 0.03 : 0.025,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          type: isNote ? "note" : "star",
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('button, a, input, [role="button"], .interactive-hover');
      isHoveringInteractiveRef.current = isInteractive;

      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trailRef.current.length > 10) trailRef.current.shift();

      if (Math.random() > 0.4) {
        spawnParticles(e.clientX, e.clientY, 1, false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY, 16, true);
    };

    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollTimeRef.current < 60) return; // throttle scroll emitter for 120fps
      lastScrollTimeRef.current = now;

      // On phone and desktop scroll: spawn 1-2 floating sparks into the atmosphere (never draw a cursor)
      spawnParticles(
        Math.random() * window.innerWidth,
        window.innerHeight * 0.7 + Math.random() * (window.innerHeight * 0.3),
        1,
        false
      );
    };

    const handleTouch = (e: TouchEvent) => {
      isTouchRef.current = true;
      if (e.touches.length > 0) {
        const t = e.touches[0];
        // On touch: do NOT set mousePos (prevent cursor rendering on phones), only spawn soft sparkles
        if (Math.random() > 0.5) {
          spawnParticles(t.clientX, t.clientY, 1, false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    let timer = 0;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      timer++;

      // 1. Draw Subtle Ribbon Trail (Desktop only)
      if (!isTouchRef.current && trailRef.current.length > 1) {
        for (let i = 1; i < trailRef.current.length; i++) {
          const pt1 = trailRef.current[i - 1];
          const pt2 = trailRef.current[i];
          pt1.alpha *= 0.9;

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = i % 2 === 0 ? `rgba(173, 92, 255, ${pt1.alpha * 0.5})` : `rgba(255, 153, 0, ${pt1.alpha * 0.5})`;
          ctx.lineWidth = (i / trailRef.current.length) * 3;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // 2. Render and animate celebratory particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.type === "note" && p.symbol) {
          ctx.font = `bold ${Math.round(p.size)}px sans-serif`;
          ctx.fillStyle = p.color;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
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
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying]);

  return (
    <div className={`pointer-events-none transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
      {/* Fullscreen Interactive Lightweight Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] select-none"
        aria-hidden="true"
      />
    </div>
  );
}
