"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  VolumeHighIcon,
  VolumeMute01Icon,
  Calendar03Icon,
  Location01Icon,
  Ticket01Icon,
} from "@hugeicons/core-free-icons";
import { TRACKS } from "@/lib/data";
import { useSoundtrack } from "@/context/SoundtrackContext";

interface HeroProps {
  onOpenCFP: () => void;
  onOpenTickets: () => void;
}

export default function Hero({ onOpenCFP, onOpenTickets }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isPlaying: isPlayingAudio, toggleSoundtrack } = useSoundtrack();

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const panipatY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const campusY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const campusScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-09-11T09:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative min-h-0 lg:min-h-[88vh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-4 sm:pb-8 px-3 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* PIET Campus Video Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <motion.div
          style={{ y: campusY, scale: campusScale }}
          className="absolute inset-0 w-full h-full transform will-change-transform opacity-30 sm:opacity-40 dark:opacity-22 dark:sm:opacity-28 filter grayscale contrast-105 brightness-95 dark:contrast-125 dark:mix-blend-luminosity transition-opacity duration-500 overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/piet-campus.png"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          >
            <source src="/videos/piet.mp4" type="video/mp4" />
            <img
              src="/images/piet-campus.png"
              alt="PIET Panipat Campus"
              className="w-full h-full object-cover object-center"
            />
          </video>
        </motion.div>

        {/* Atmospheric overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/75 via-[#F8FAFC]/50 to-[#F8FAFC] dark:from-[#05070E]/80 dark:via-[#05070E]/70 dark:to-[#05070E]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8FAFC] dark:from-[#05070E] to-transparent" />
      </div>

      {/* Monumental Background Typography */}
      <motion.div
        style={{ y: panipatY }}
        className="absolute inset-x-0 top-16 sm:top-20 flex justify-center pointer-events-none select-none z-0 will-change-transform"
      >
        <span className="text-[18vw] font-black tracking-widest text-slate-900/[0.03] dark:text-white/[0.02] leading-none uppercase">
          PANIPAT
        </span>
      </motion.div>

      {/* Center Hero Content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroContentY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center mt-2 sm:mt-6 will-change-transform"
      >
        {/* Animated Lightning Border Event Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pill-lightning inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm mb-4 sm:mb-5 cursor-default"
        >
          <span className="text-[#8E35EA] dark:text-[#AD5CFF] font-bold tracking-tight">AWS SCD 2026</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">PIET Panipat</span>
        </motion.div>

        {/* Main Headline — max 2 lines on all screens */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[28px] sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 dark:text-white max-w-3xl leading-[1.1] mb-3 sm:mb-5 px-1"
        >
          Haryana&apos;s First{" "}
          <span className="text-[#8E35EA] dark:text-[#AD5CFF]">AWS Student Community Day</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8 px-2"
        >
          Haryana&apos;s first-ever AWS Student Community Day organized by AWS Student Builder Group at PIET. 500+ builders, 6 technical tracks, hands-on AWS labs, KIRO Buildathon, and direct mentorship from AWS Heroes.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-6 sm:mb-8 px-2"
        >
          <button
            onClick={onOpenTickets}
            className="w-full sm:w-auto group px-7 py-3 rounded-full bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.97] cursor-pointer"
          >
            <span>Register Now</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#agenda"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HugeiconsIcon icon={Calendar03Icon} className="h-4 w-4 text-[#8E35EA] dark:text-[#AD5CFF]" />
            <span>View Schedule</span>
          </a>
        </motion.div>

        {/* Mobile Countdown + Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden flex flex-col items-center gap-3 mb-2 select-none w-full"
        >
          {/* Countdown row */}
          <div className="flex items-center justify-center gap-1.5">
            {[
              { val: timeLeft.days, label: "Days" },
              { val: timeLeft.hours, label: "Hrs" },
              { val: timeLeft.minutes, label: "Min" },
              { val: timeLeft.seconds, label: "Sec" },
            ].map((unit, idx) => (
              <div key={unit.label} className="flex items-center gap-1.5">
                <div className="flex flex-col items-center justify-center w-[50px] h-[50px] rounded-2xl bg-white/95 dark:bg-[#080D1E]/90 border border-slate-200 dark:border-white/[0.08] shadow-sm">
                  <span className="text-sm font-black text-slate-900 dark:text-white font-mono leading-none">
                    {String(unit.val).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                    {unit.label}
                  </span>
                </div>
                {idx < 3 && <span className="text-slate-300 dark:text-slate-600 font-mono text-sm font-bold leading-none mb-3">:</span>}
              </div>
            ))}
          </div>

          {/* Info chips */}
          <div className="flex items-center justify-center gap-2">
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-[11px] font-medium border border-slate-200 dark:border-white/[0.06]">
              <HugeiconsIcon icon={Location01Icon} className="h-3 w-3 text-[#8E35EA] dark:text-[#AD5CFF]" />
              PIET Panipat
            </span>
            <span className="flex items-center gap-1 bg-[#8E35EA]/10 dark:bg-[#AD5CFF]/15 text-[#8E35EA] dark:text-[#BE7BFF] px-3 py-1 rounded-full text-[11px] font-bold border border-[#8E35EA]/20 dark:border-[#AD5CFF]/30">
              <HugeiconsIcon icon={Ticket01Icon} className="h-3 w-3" />
              From ₹399
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Hero Bar (Visible ONLY on Desktop/PC screens lg+) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block relative z-20 max-w-6xl mx-auto w-full mt-auto pt-8 border-t border-slate-200 dark:border-white/[0.08]"
      >
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left: 3 Monumental Summit Metrics */}
          <div className="col-span-7 grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="text-3xl xl:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                500+
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                Builders & Students
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Regional SBG Community
              </span>
            </div>

            <div className="flex flex-col border-x border-slate-200/80 dark:border-white/[0.08] px-6">
              <span className="text-3xl xl:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                6 Tracks
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                Cloud Domains
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                GenAI, DevOps, Labs
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-3xl xl:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                100%
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                Hands-on Focus
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Live Labs & Buildathon
              </span>
            </div>
          </div>

          {/* Right: Creative Live Summit Access & Countdown Glass HUD Card */}
          <div className="col-span-5">
            <div className="rounded-3xl bg-white/95 dark:bg-[#090E1E]/95 border border-slate-200/90 dark:border-white/10 p-5 shadow-sm">
              {/* HUD Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8E35EA] dark:bg-[#AD5CFF]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    SUMMIT COUNTDOWN • 11 SEPT 2026
                  </span>
                </div>

                <button
                  onClick={toggleSoundtrack}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#8E35EA] dark:hover:text-[#AD5CFF] bg-slate-100 dark:bg-white/[0.04] transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono"
                  title={isPlayingAudio ? "Mute Background Ambiance" : "Play Background Indian Raag Ambiance"}
                >
                  {isPlayingAudio ? (
                    <>
                      <HugeiconsIcon icon={VolumeHighIcon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF]" />
                      <span className="text-[#8E35EA] dark:text-[#AD5CFF]">Audio On</span>
                    </>
                  ) : (
                    <>
                      <HugeiconsIcon icon={VolumeMute01Icon} className="h-3.5 w-3.5" />
                      <span>Ambiance</span>
                    </>
                  )}
                </button>
              </div>

              {/* Desktop Live Countdown Digits */}
              <div className="grid grid-cols-4 gap-2 mb-3 text-center">
                {[
                  { val: timeLeft.days, label: "Days" },
                  { val: timeLeft.hours, label: "Hours" },
                  { val: timeLeft.minutes, label: "Mins" },
                  { val: timeLeft.seconds, label: "Secs" },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]"
                  >
                    <span className="text-lg font-black font-mono text-slate-900 dark:text-white block leading-none">
                      {String(unit.val).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500 mt-1 block">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Venue & Pass Quick Info Chip */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/[0.06] text-[11px] text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1 font-semibold">
                  <HugeiconsIcon icon={Location01Icon} className="h-3 w-3 text-[#8E35EA] dark:text-[#AD5CFF]" />
                  PIET Panipat (Samalkha)
                </span>
                <button
                  onClick={onOpenTickets}
                  className="font-bold text-[#8E35EA] dark:text-[#BE7BFF] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Passes from ₹399</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
