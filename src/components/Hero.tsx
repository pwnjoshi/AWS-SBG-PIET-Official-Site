"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  VolumeHighIcon,
  VolumeMute01Icon,
} from "@hugeicons/core-free-icons";
import { STATS, TRACKS, EVENT_DETAILS } from "@/lib/data";

interface HeroProps {
  onOpenCFP: () => void;
  onOpenTickets: () => void;
}

export default function Hero({ onOpenCFP, onOpenTickets }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [oscillatorNodes, setOscillatorNodes] = useState<OscillatorNode[]>([]);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const panipatY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const campusY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const campusScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
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
    const targetDate = new Date("2026-09-02T09:00:00+05:30").getTime();

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

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TRACKS.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);

  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      oscillatorNodes.forEach((node) => {
        try {
          node.stop();
          node.disconnect();
        } catch {
          // ignore
        }
      });
      setOscillatorNodes([]);
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(146.83, ctx.currentTime);

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(220.0, ctx.currentTime);

        gain.gain.setValueAtTime(0.025, ctx.currentTime);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        setOscillatorNodes([osc1, osc2]);
        setIsPlayingAudio(true);
      } catch (err) {
        console.error("Audio synth error:", err);
      }
    }
  };

  const currentTrack = TRACKS[activeSlide];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Clean PIET Campus Architectural Silhouette with Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Real Campus Image with parallax transform */}
        <motion.div
          style={{ y: campusY, scale: campusScale }}
          className="absolute inset-x-0 bottom-0 top-[18%] w-full bg-cover bg-bottom opacity-20 sm:opacity-25 filter grayscale contrast-125 mix-blend-luminosity transform will-change-transform"
          style-extra={{ backgroundImage: "url('/images/piet-campus.png')" }}
          ref={(node) => {
            if (node) {
              node.style.backgroundImage = "url('/images/piet-campus.png')";
            }
          }}
        />

        {/* Seamless gradient mask overlays to guarantee 100% crisp typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070E] via-[#05070E]/75 to-[#05070E]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-transparent to-transparent h-48 bottom-0" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#05070E] to-transparent" />

        {/* Subtle focal glow at campus horizon in #AD5CFF */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#AD5CFF]/[0.07] blur-[120px] rounded-full" />
      </div>

      {/* Monumental Depth Background Typography with Parallax Drift */}
      <motion.div
        style={{ y: panipatY }}
        className="absolute inset-x-0 top-16 sm:top-20 flex justify-center pointer-events-none select-none z-0 will-change-transform"
      >
        <span className="text-[18vw] font-black tracking-widest text-white/[0.03] leading-none uppercase">
          PANIPAT
        </span>
      </motion.div>

      {/* Hero Content with Smooth Entrance and Scroll Parallax Fade */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroContentY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center mt-4 sm:mt-8 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-mono text-slate-300 mb-6"
        >
          <span className="text-[#AD5CFF] font-bold">AWS SCD 2026</span>
          <span className="text-slate-600">/</span>
          <span>PIET Panipat, Haryana</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">2 September</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
        >
          Powering the Next Generation of{" "}
          <span className="text-[#AD5CFF]">
            Cloud Innovators
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-6"
        >
          Haryana’s premier student-led cloud summit. 500+ builders, 6 technical tracks, hands-on AWS labs, and direct mentorship from AWS Heroes and community leaders.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <button
            onClick={onOpenTickets}
            className="group px-6 py-3 rounded-full bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#AD5CFF]/25 hover:scale-[1.02]"
          >
            <span>Claim Free Student Pass</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenCFP}
            className="px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-medium text-sm transition-all"
          >
            Call for Speakers
          </button>
        </motion.div>

        {/* Minimalist Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 sm:gap-3 mb-6"
        >
          {[
            { val: timeLeft.days, label: "Days" },
            { val: timeLeft.hours, label: "Hours" },
            { val: timeLeft.minutes, label: "Mins" },
            { val: timeLeft.seconds, label: "Secs" },
          ].map((unit, idx) => (
            <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[64px] h-[54px] sm:h-[60px] rounded-xl bg-[#080D1E]/80 border border-white/[0.08] backdrop-blur-md">
                <span className="text-lg sm:text-xl font-bold text-white font-mono">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
                  {unit.label}
                </span>
              </div>
              {idx < 3 && <span className="text-slate-600 font-mono text-sm">:</span>}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Hero Bar: Stats & Mini Track Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-6xl mx-auto w-full mt-auto pt-8 border-t border-white/[0.08]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Stats */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-slate-300 mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Mini Track Widget */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full max-w-sm rounded-xl bg-[#090E1E]/90 backdrop-blur-xl border border-white/10 p-3.5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Track Preview
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAmbientSound}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                    title={isPlayingAudio ? "Mute Ambiance" : "Play Ambiance"}
                  >
                    {isPlayingAudio ? (
                      <HugeiconsIcon icon={VolumeHighIcon} className="h-3.5 w-3.5 text-[#AD5CFF]" />
                    ) : (
                      <HugeiconsIcon icon={VolumeMute01Icon} className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <span className="text-[11px] font-mono text-slate-400">
                    {currentTrack.number}/06
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">
                    {currentTrack.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {currentTrack.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/[0.06]">
                <a
                  href="#tracks"
                  className="text-[11px] font-medium text-[#AD5CFF] hover:underline flex items-center gap-1"
                >
                  View All Tracks <HugeiconsIcon icon={ArrowRight01Icon} className="h-3 w-3" />
                </a>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setActiveSlide((prev) => (prev === 0 ? TRACKS.length - 1 : prev - 1))
                    }
                    className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveSlide((prev) => (prev + 1) % TRACKS.length)
                    }
                    className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
