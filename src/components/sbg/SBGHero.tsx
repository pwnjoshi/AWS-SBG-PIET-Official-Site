"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  SparklesIcon,
  Globe02Icon,
  UserGroupIcon,
  CodeCircleIcon,
  Rocket01Icon,
} from "@hugeicons/core-free-icons";
import { EVENT_DETAILS } from "@/lib/data";

export default function SBGHero() {
  const stats = [
    { value: "500+", label: "Student Builders", desc: "Across PIET & NCR", icon: UserGroupIcon },
    { value: "5+", label: "Cloud Projects", desc: "Production AWS Apps", icon: CodeCircleIcon },
    { value: "100%", label: "Hands-on Practice", desc: "Real AWS Consoles", icon: SparklesIcon },
    { value: "#1", label: "AWS Student Chapter", desc: "In Haryana Region", icon: Rocket01Icon },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] w-full flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Background Ambient Radial Lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-[#AD5CFF]/[0.08] dark:bg-[#AD5CFF]/[0.12] blur-[150px] rounded-full" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-[#8E35EA]/[0.06] blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#0EA5E9]/[0.05] blur-[120px] rounded-full" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Animated Lightning Shimmer Chapter Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex p-[1.5px] rounded-full overflow-hidden shadow-md shadow-[#AD5CFF]/15 group mb-5 sm:mb-6 cursor-default"
        >
          <div className="absolute -inset-[150%] animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_70%,#AD5CFF_85%,#FFFFFF_94%,#BE7BFF_100%)] opacity-90" />

          <div className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#080D1E]/95 backdrop-blur-xl text-[10px] sm:text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap">
            <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 relative shrink-0">
              <Image src="/images/sbg-logo.png" alt="AWS SBG Logo" fill className="object-contain" />
            </div>
            <span className="text-[#8E35EA] dark:text-[#AD5CFF] font-bold">AWS SBG PIET</span>
            <span className="text-slate-400 dark:text-slate-600 font-bold">•</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">PANIPAT</span>
          </div>
        </motion.div>

        {/* Monumental Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-950 dark:text-white max-w-4xl leading-[1.15] mb-4 sm:mb-6 drop-shadow-sm px-1"
        >
          Where Student Builders Engineer the{" "}
          <span className="bg-gradient-to-r from-[#8E35EA] via-[#AD5CFF] to-[#BE7BFF] bg-clip-text text-transparent">
            Future on AWS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed mb-6 sm:mb-8 px-2"
        >
          Official AWS Student Builder Group at PIET Panipat — GenAI, DevOps, Serverless & certification programs for the next generation of cloud engineers.
        </motion.p>

        {/* Dual Primary Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10 sm:mb-12 px-2"
        >
          <Link
            href="/scd-panipat-2026"
            className="w-full sm:w-auto group px-7 py-3 rounded-full bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.97] cursor-pointer"
          >
            <span>Explore AWS SCD 2026</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <a
            href="#about"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4 text-[#8E35EA] dark:text-[#AD5CFF]" />
            <span>Learn About SBG</span>
          </a>
        </motion.div>

      </div>

      {/* Bottom Hero 4-Metric Bar */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/90 dark:border-white/[0.08]"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="group relative rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.07] overflow-hidden shadow-sm hover:shadow-md hover:border-[#AD5CFF]/40 dark:hover:border-[#AD5CFF]/30 transition-all duration-300"
          >
            {/* Accent top bar */}
            <div
              className="h-[3px] w-full"
              style={{
                background: i === 0
                  ? "linear-gradient(90deg,#8E35EA,#AD5CFF)"
                  : i === 1
                  ? "linear-gradient(90deg,#0EA5E9,#38BDF8)"
                  : i === 2
                  ? "linear-gradient(90deg,#10B981,#34D399)"
                  : "linear-gradient(90deg,#FF9900,#FFBA49)",
              }}
            />

            <div className="p-4 sm:p-5 flex flex-col gap-2">
              {/* Icon pill */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: i === 0
                    ? "rgba(142,53,234,0.1)"
                    : i === 1
                    ? "rgba(14,165,233,0.1)"
                    : i === 2
                    ? "rgba(16,185,129,0.1)"
                    : "rgba(255,153,0,0.1)",
                }}
              >
                <HugeiconsIcon
                  icon={stat.icon}
                  className="h-4 w-4"
                  style={{
                    color: i === 0 ? "#AD5CFF" : i === 1 ? "#0EA5E9" : i === 2 ? "#10B981" : "#FF9900",
                  }}
                />
              </div>

              {/* Value */}
              <span className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-mono tracking-tight leading-none">
                {stat.value}
              </span>

              {/* Label & desc */}
              <div className="flex flex-col gap-0.5">
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {stat.label}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  {stat.desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
