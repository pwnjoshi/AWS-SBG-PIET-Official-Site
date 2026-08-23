"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  SparklesIcon,
  Calendar03Icon,
  Location01Icon,
  Award02Icon,
  UserGroupIcon,
  CpuIcon,
} from "@hugeicons/core-free-icons";

export default function SBGFlagshipBanner() {
  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-gradient-to-br from-[#060814] via-[#0B0F2A] to-[#150D38] border-2 border-[#AD5CFF]/45 p-6 sm:p-10 md:p-12 shadow-2xl shadow-purple-500/20 overflow-hidden text-white"
      >
        {/* Dynamic Glowing Radial Cones */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#AD5CFF]/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8E35EA]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Event Pitch */}
          <div className="lg:col-span-8 flex flex-col gap-3">

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              AWS Student Community Day Panipat 2026
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Marking Haryana&apos;s first-ever AWS Student Community Day hosted at PIET Campus. Join 500+ builders, AWS Heroes, technical deep-dives on Generative AI with Amazon Bedrock, KIRO Buildathon hackathon, Ideathon, and cloud career hubs.
            </p>

            {/* Quick Meta Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-white/[0.06] px-3 py-1.5 rounded-xl border border-white/10">
                <HugeiconsIcon icon={Calendar03Icon} className="h-4 w-4 text-[#BE7BFF]" />
                <span>Friday, 11 September 2026</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/[0.06] px-3 py-1.5 rounded-xl border border-white/10">
                <HugeiconsIcon icon={Location01Icon} className="h-4 w-4 text-[#BE7BFF]" />
                <span>PIET Central Auditorium</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/[0.06] px-3 py-1.5 rounded-xl border border-white/10">
                <HugeiconsIcon icon={Award02Icon} className="h-4 w-4 text-emerald-400" />
                <span>Credly Digital Badge</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Card */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md mb-1">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Featured Keynote:</span>
                <span className="text-[#BE7BFF] font-mono font-bold">10:25 AM</span>
              </div>
              <p className="text-sm font-extrabold text-white">
                Praful Bagai & AWS Leaders
              </p>
              <span className="text-[11px] text-slate-300 block mt-0.5">
                Cloud Architecture & Generative AI Systems
              </span>
            </div>

            <Link
              href="/scd-panipat-2026"
              className="w-full py-4 rounded-2xl bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#AD5CFF]/30 active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Summit & Passes</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" />
            </Link>

            <Link
              href="/scd-panipat-2026/badge"
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <HugeiconsIcon icon={SparklesIcon} className="h-3.5 w-3.5 text-[#BE7BFF]" />
              <span>Make &ldquo;I&apos;m Attending&rdquo; Badge</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
