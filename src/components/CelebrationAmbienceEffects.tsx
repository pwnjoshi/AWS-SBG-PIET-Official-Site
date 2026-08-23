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
  type: "star" | "note" | "spark" | "confetti";
  symbol?: string;
}

export default function CelebrationAmbienceEffects() {
  const { isPlaying } = useSoundtrack();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isHoveringInteractiveRef = useRef<boolean>(false);

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
  const lastScrollYRef = useRef<number>(0);
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

    // Grand Opening Multi-Stage Confetti Blast
    try {
      confetti({
        particleCount: 90,
        spread: 120,
        origin: { y: 0.5 },
        colors: ["#FF9900", "#FFB84D", "#AD5CFF", "#BE7BFF", "#38BDF8", "#FFFFFF"],
      });
    } catch (e) {
      console.warn("Confetti blast note:", e);
    }

    const dpr = typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio || 1) : 1;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Lightweight particle spawner with strict max capacity (max 75 particles)
    const spawnParticles = (x: number, y: number, count = 2, burst = false) => {
      if (particlesRef.current.length >= 75) return;

      const toAdd = Math.min(count, 75 - particlesRef.current.length);
      for (let i = 0; i < toAdd; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 5 + 2 : Math.random() * 2 + 0.6;
        const isNote = Math.random() > 0.45;
        const isConfetti = !isNote && Math.random() > 0.6;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 0.8 : 1.2),
          size: isNote ? Math.random() * 6 + 13 : isConfetti ? Math.random() * 6 + 5 : Math.random() * 4 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: burst ? 0.02 : 0.016,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          type: isNote ? "note" : isConfetti ? "confetti" : "star",
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('button, a, input, [role="button"], .interactive-hover');
      isHoveringInteractiveRef.current = isInteractive;

      // Update DOM pointer and ring follower instantly
      const pointerEl = document.getElementById("ambience-wand-pointer");
      const ringEl = document.getElementById("ambience-wand-ring");
      if (pointerEl) {
        pointerEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        pointerEl.style.opacity = "1";
      }
      if (ringEl) {
        ringEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        ringEl.style.opacity = "1";
        if (isInteractive) {
          ringEl.classList.add("ring-interactive");
        } else {
          ringEl.classList.remove("ring-interactive");
        }
      }

      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trailRef.current.length > 16) trailRef.current.shift();

      spawnParticles(e.clientX, e.clientY, isInteractive ? 2 : 1, false);
    };

    const handleClick = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY, 28, true);
    };

    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollTimeRef.current < 45) return; // throttle scroll emitter for 60fps
      lastScrollTimeRef.current = now;

      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollDiff = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      const count = Math.min(4, Math.max(1, Math.floor(scrollDiff / 30)));
      for (let k = 0; k < count; k++) {
        spawnParticles(
          Math.random() * window.innerWidth,
          Math.random() * (window.innerHeight * 0.7) + window.innerHeight * 0.3,
          1,
          false
        );
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mousePosRef.current = { x: t.clientX, y: t.clientY };

        trailRef.current.push({ x: t.clientX, y: t.clientY, alpha: 1 });
        if (trailRef.current.length > 16) trailRef.current.shift();

        spawnParticles(t.clientX, t.clientY, 2, false);
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

      // Background ambient note every 12 frames
      if (timer % 12 === 0 && particlesRef.current.length < 50) {
        spawnParticles(
          Math.random() * window.innerWidth,
          window.innerHeight - Math.random() * 60,
          1,
          false
        );
      }

      // 1. Draw Ribbon Trail (batch rendered for extreme speed)
      if (trailRef.current.length > 1) {
        for (let i = 1; i < trailRef.current.length; i++) {
          const pt1 = trailRef.current[i - 1];
          const pt2 = trailRef.current[i];
          pt1.alpha *= 0.94;

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = i % 2 === 0 ? `rgba(173, 92, 255, ${pt1.alpha * 0.75})` : `rgba(255, 153, 0, ${pt1.alpha * 0.75})`;
          ctx.lineWidth = (i / trailRef.current.length) * 4.5;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // 2. Custom Celebratory Magic Wand Pointer & Celestial Ring (Canvas rendered with 0 latency)
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      const isHoveringNow = isHoveringInteractiveRef.current;

      if (mx > 0 && my > 0) {
        // A. Rotating planetary celebration ring
        ctx.beginPath();
        const ringRadius = (isHoveringNow ? 22 : 14) + Math.sin(timer * 0.12) * 2;
        ctx.arc(mx, my, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHoveringNow ? "#FF9900" : "#AD5CFF";
        ctx.lineWidth = isHoveringNow ? 2.2 : 1.6;
        ctx.stroke();

        // B. 3 orbiting stardust sparks around the cursor
        for (let k = 0; k < 3; k++) {
          const orbitAngle = timer * 0.08 + (k * Math.PI * 2) / 3;
          const ox = mx + Math.cos(orbitAngle) * ringRadius;
          const oy = my + Math.sin(orbitAngle) * ringRadius;
          ctx.fillStyle = isHoveringNow ? "#FFE600" : "#38BDF8";
          ctx.beginPath();
          ctx.arc(ox, oy, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // C. Sharp, glowing diamond wand pointer tip
        ctx.save();
        ctx.translate(mx, my);
        if (isHoveringNow) {
          ctx.scale(1.25, 1.25);
        }
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(7, 18);
        ctx.lineTo(9.5, 9.5);
        ctx.lineTo(18, 7);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 18, 18);
        if (isHoveringNow) {
          grad.addColorStop(0, "#FFE600");
          grad.addColorStop(0.5, "#FF9900");
          grad.addColorStop(1, "#EC4899");
        } else {
          grad.addColorStop(0, "#FF9900");
          grad.addColorStop(0.5, "#AD5CFF");
          grad.addColorStop(1, "#38BDF8");
        }
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render and animate celebratory particles
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
          ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
        } else if (p.type === "confetti") {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.fillStyle = p.color;
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
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying]);

  return (
    <div className={`pointer-events-none transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
      {/* Fullscreen Interactive Canvas for Cursor Sparks, Celestial Follower, Ribbon Trails, and Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] select-none"
        aria-hidden="true"
      />

      {/* 1. Real-time Zero-Latency Magic Wand Pointer Tip (DOM Layer z-index 999999999) */}
      <div
        id="ambience-wand-pointer"
        className="fixed top-0 left-0 pointer-events-none z-[999999999] select-none hidden md:block opacity-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div className="relative -top-1 -left-1">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              filter: "drop-shadow(0 0 8px #FF9900) drop-shadow(0 0 3px #FFFFFF)",
            }}
          >
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="url(#ambience-wand-grad)"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="ambience-wand-grad" x1="3" y1="3" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF9900" />
                <stop offset="0.5" stopColor="#AD5CFF" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. Trailing Radiant Celestial Ring Follower (DOM Layer z-index 99999999) */}
      <div
        id="ambience-wand-ring"
        className="fixed top-0 left-0 pointer-events-none z-[99999998] select-none hidden md:block opacity-0 will-change-transform transition-all duration-75 ease-out"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div className="relative -top-4 -left-4 h-8 w-8 rounded-full border border-[#AD5CFF] shadow-[0_0_12px_#AD5CFF] flex items-center justify-center animate-spin">
          <div className="absolute top-0 h-1.5 w-1.5 rounded-full bg-[#FFE600] shadow-[0_0_6px_#FFE600]" />
        </div>
      </div>

      {/* Atmospheric Celebratory Beam & Aurora Waves Layer (Active on Ambience Mode) */}
      {isPlaying && (
        <div
          className="fixed inset-0 pointer-events-none z-[4] select-none mix-blend-screen transition-all duration-1000 opacity-75"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(173, 92, 255, 0.25) 0%, rgba(255, 153, 0, 0.14) 45%, rgba(14, 165, 233, 0.08) 75%, transparent 90%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating Celebratory Animated Stardust Badge (Active on Ambience Mode) */}
      {isPlaying && (
        <div className="fixed top-20 right-6 sm:right-10 z-[50] pointer-events-none select-none hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 backdrop-blur-xl border border-[#AD5CFF]/60 text-white shadow-2xl shadow-purple-500/40 animate-bounce">
          <span className="text-sm">🎵</span>
          <span className="text-xs font-mono font-bold bg-gradient-to-r from-[#FF9900] via-[#AD5CFF] to-[#38BDF8] bg-clip-text text-transparent">
            Celebration Ambience Active
          </span>
        </div>
      )}
    </div>
  );
}
