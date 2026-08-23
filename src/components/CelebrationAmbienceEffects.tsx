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
  const cursorPointerRef = useRef<HTMLDivElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const smoothMouseRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isHoveringInteractiveRef = useRef<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);

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
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const lastScrollYRef = useRef<number>(0);

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
      trailRef.current = [];
      if (cursorPointerRef.current) cursorPointerRef.current.style.opacity = "0";
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
        const speed = burst ? Math.random() * 6 + 2.5 : Math.random() * 2.2 + 0.8;
        const isNote = Math.random() > 0.5;
        const isConfetti = !isNote && Math.random() > 0.5;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 1.0 : 1.5),
          size: isNote ? Math.random() * 10 + 14 : isConfetti ? Math.random() * 8 + 6 : Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: burst ? Math.random() * 0.012 + 0.008 : Math.random() * 0.014 + 0.009,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
          type: isNote ? "note" : isConfetti ? "confetti" : "star",
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
      if (particlesRef.current.length > 320) {
        particlesRef.current = particlesRef.current.slice(-320);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('button, a, input, [role="button"], .interactive-hover');
      if (isInteractive !== isHoveringInteractiveRef.current) {
        isHoveringInteractiveRef.current = isInteractive;
        setIsHovering(isInteractive);
      }

      // Move custom wand pointer instantly with 0 latency
      if (cursorPointerRef.current) {
        cursorPointerRef.current.style.opacity = "1";
        cursorPointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trailRef.current.length > 20) trailRef.current.shift();

      spawnParticles(e.clientX, e.clientY, isInteractive ? 3 : 2, false);
    };

    const handleClick = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY, 36, true);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollDiff = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      // Spawn festive stardust & notes across the viewport on scroll
      const count = Math.min(10, Math.max(3, Math.floor(scrollDiff / 10)));
      for (let k = 0; k < count; k++) {
        spawnParticles(
          Math.random() * window.innerWidth,
          Math.random() * (window.innerHeight * 0.8) + window.innerHeight * 0.2,
          1,
          false
        );
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mousePosRef.current = { x: t.clientX, y: t.clientY };
        smoothMouseRef.current = { x: t.clientX, y: t.clientY };

        trailRef.current.push({ x: t.clientX, y: t.clientY, alpha: 1 });
        if (trailRef.current.length > 20) trailRef.current.shift();

        spawnParticles(t.clientX, t.clientY, 4, false);
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timer++;
      // Continuous celebratory drifting lantern embers & notes from bottom
      if (timer % 5 === 0) {
        spawnParticles(
          Math.random() * canvas.width,
          canvas.height - Math.random() * 70,
          1,
          false
        );
      }

      // 1. Draw Luminous Ribbon Trail connecting recent cursor coordinates
      if (trailRef.current.length > 1) {
        for (let i = 1; i < trailRef.current.length; i++) {
          const pt1 = trailRef.current[i - 1];
          const pt2 = trailRef.current[i];
          pt1.alpha *= 0.96;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = i % 2 === 0 ? "#AD5CFF" : "#FF9900";
          ctx.lineWidth = (i / trailRef.current.length) * 5;
          ctx.shadowColor = i % 2 === 0 ? "#AD5CFF" : "#FF9900";
          ctx.shadowBlur = 14;
          ctx.globalAlpha = pt1.alpha * (i / trailRef.current.length) * 0.85;
          ctx.lineCap = "round";
          ctx.stroke();
          ctx.restore();
        }
      }

      // 2. Smooth trailing celestial ring & orbiting stardust sparks
      if (mousePosRef.current.x > 0 && mousePosRef.current.y > 0) {
        if (smoothMouseRef.current.x < 0) {
          smoothMouseRef.current = { ...mousePosRef.current };
        } else {
          smoothMouseRef.current.x += (mousePosRef.current.x - smoothMouseRef.current.x) * 0.4;
          smoothMouseRef.current.y += (mousePosRef.current.y - smoothMouseRef.current.y) * 0.4;
        }

        const mx = smoothMouseRef.current.x;
        const my = smoothMouseRef.current.y;
        const isHoveringNow = isHoveringInteractiveRef.current;

        ctx.save();
        // Outer rotating planetary celebration ring
        ctx.strokeStyle = isHoveringNow ? "#FF9900" : "#AD5CFF";
        ctx.lineWidth = isHoveringNow ? 2.5 : 1.8;
        ctx.shadowColor = isHoveringNow ? "#FF9900" : "#AD5CFF";
        ctx.shadowBlur = isHoveringNow ? 20 : 12;
        ctx.beginPath();
        const ringRadius = (isHoveringNow ? 22 : 14) + Math.sin(timer * 0.14) * 3;
        ctx.arc(mx, my, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 4 orbiting radiant planetary dots around the cursor
        for (let k = 0; k < 4; k++) {
          const orbitAngle = timer * 0.08 + (k * Math.PI) / 2;
          const ox = mx + Math.cos(orbitAngle) * ringRadius;
          const oy = my + Math.sin(orbitAngle) * ringRadius;
          ctx.fillStyle = isHoveringNow ? "#FFE600" : "#38BDF8";
          ctx.shadowColor = isHoveringNow ? "#FFE600" : "#FFFFFF";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(ox, oy, isHoveringNow ? 2.8 : 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

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
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 14;
          ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
        } else if (p.type === "confetti") {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 14;
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
    <div className={`transition-opacity duration-700 pointer-events-none ${isPlaying ? "opacity-100" : "opacity-0"}`}>
      {/* Fullscreen Interactive Canvas for Cursor Sparks, Celestial Follower, Ribbon Trails, and Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] select-none"
        aria-hidden="true"
      />

      {/* Real-time Celebratory Magic Pointer Tip (Desktop only, 0 latency DOM translate) */}
      <div
        ref={cursorPointerRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] select-none hidden md:block opacity-0 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div className="relative -top-1 -left-1">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform duration-150 ${isHovering ? "scale-125 rotate-12" : "scale-100"}`}
            style={{
              filter: isHovering
                ? "drop-shadow(0 0 10px #FF9900) drop-shadow(0 0 4px #FFFFFF)"
                : "drop-shadow(0 0 8px #AD5CFF) drop-shadow(0 0 3px #FFFFFF)",
            }}
          >
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill={isHovering ? "url(#hover-wand-grad)" : "url(#wand-grad)"}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="wand-grad" x1="3" y1="3" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF9900" />
                <stop offset="0.5" stopColor="#AD5CFF" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="hover-wand-grad" x1="3" y1="3" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFE600" />
                <stop offset="0.5" stopColor="#FF9900" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Atmospheric Celebratory Beam & Aurora Waves Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-[4] select-none mix-blend-screen transition-all duration-1000 opacity-75"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(173, 92, 255, 0.25) 0%, rgba(255, 153, 0, 0.14) 45%, rgba(14, 165, 233, 0.08) 75%, transparent 90%)",
        }}
        aria-hidden="true"
      />

      {/* Floating Celebratory Animated Stardust Badge */}
      <div className="fixed top-20 right-6 sm:right-10 z-[50] pointer-events-none select-none hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 backdrop-blur-xl border border-[#AD5CFF]/60 text-white shadow-2xl shadow-purple-500/40 animate-bounce">
        <span className="text-sm">🎵</span>
        <span className="text-xs font-mono font-bold bg-gradient-to-r from-[#FF9900] via-[#AD5CFF] to-[#38BDF8] bg-clip-text text-transparent">
          Celebration Ambience Active
        </span>
      </div>
    </div>
  );
}
