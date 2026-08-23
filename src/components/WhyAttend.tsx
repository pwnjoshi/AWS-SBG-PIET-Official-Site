"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Tick02Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons";
import { PREVIOUS_SCDS } from "@/lib/data";

interface WhyAttendProps {
  onOpenTickets: () => void;
}

export default function WhyAttend({ onOpenTickets }: WhyAttendProps) {
  const valueProps = [
    {
      num: "01",
      tag: "Networking",
      title: "500+ Student Builders",
      desc: "Connect with aspiring engineers, developers, and founders from 6+ AWS Student Builder Groups and regional tech communities.",
      accent: "#AD5CFF",
      accentBg: "rgba(173, 92, 255, 0.12)",
      borderColor: "hover:border-[#AD5CFF]/60",
      glowColor: "group-hover:bg-[#AD5CFF]/5",
      badgeColor: "text-[#8E35EA] dark:text-[#AD5CFF] bg-[#AD5CFF]/10 border-[#AD5CFF]/25",
      highlights: ["6+ SBG Chapters", "Peer Collabs", "Developer Network"],
    },
    {
      num: "02",
      tag: "Keynotes",
      title: "Praful Bagai & Industry Leaders",
      desc: "Gain vision-shaping insights from technical leaders, AWS Heroes, and cloud architects on production systems and Generative AI.",
      accent: "#0EA5E9",
      accentBg: "rgba(14, 165, 233, 0.12)",
      borderColor: "hover:border-sky-500/60",
      glowColor: "group-hover:bg-sky-500/5",
      badgeColor: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25",
      highlights: ["Technical Keynotes", "AWS Heroes", "1-on-1 AMAs"],
    },
    {
      num: "03",
      tag: "Live Labs",
      title: "100% Hands-on Practice",
      desc: "Zero boring slides. Build and deploy live architectures on AWS CloudShell with real-time mentor guidance.",
      accent: "#10B981",
      accentBg: "rgba(16, 185, 129, 0.12)",
      borderColor: "hover:border-emerald-500/60",
      glowColor: "group-hover:bg-emerald-500/5",
      badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      highlights: ["CloudShell Ready", "Guided Code-Along", "Live Deployments"],
    },
    {
      num: "04",
      tag: "Competitions",
      title: "KIRO Buildathon & Ideathon",
      desc: "Participate in intense rapid-prototyping competitions and startup architecture pitches to win prestigious awards and cash pool prizes.",
      accent: "#F59E0B",
      accentBg: "rgba(245, 158, 11, 0.12)",
      borderColor: "hover:border-amber-500/60",
      glowColor: "group-hover:bg-amber-500/5",
      badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
      highlights: ["Live Hackathon", "Startup Pitches", "Jury Awards"],
    },
    {
      num: "05",
      tag: "Career",
      title: "Career & Tech Recruiter Hub",
      desc: "Get 1-on-1 resume reviews, certification roadmap guidance, and direct interaction with hiring managers during the Tech Expo.",
      accent: "#F43F5E",
      accentBg: "rgba(244, 63, 94, 0.12)",
      borderColor: "hover:border-rose-500/60",
      glowColor: "group-hover:bg-rose-500/5",
      badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/25",
      highlights: ["Resume Reviews", "Hiring Booths", "AWS Cert Roadmaps"],
    },
    {
      num: "06",
      tag: "All-Inclusive",
      title: "Official Passes with Full Perks",
      desc: "Full-day summit access including keynotes, technical tracks, labs, networking sessions, complimentary lunch, and event kits.",
      accent: "#8B5CF6",
      accentBg: "rgba(139, 92, 246, 0.12)",
      borderColor: "hover:border-purple-500/60",
      glowColor: "group-hover:bg-purple-500/5",
      badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25",
      highlights: ["Lunch Included", "Official Swag Kit", "Credly Badge"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="why-attend" className="relative pt-4 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header with Panipat Hindi Typography on the right */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
            WHY ATTEND
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            Built by student leaders, designed for real cloud mastery
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Marking a historic milestone for Haryana&apos;s tech ecosystem, PIET is proud to host the state&apos;s first-ever AWS Student Community Day (SCD).
          </p>
        </motion.div>

        {/* Right Clean Panipat in Hindi Monumental Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center justify-end select-none pointer-events-none shrink-0"
        >
          <span className="text-7xl lg:text-8xl font-black tracking-tight text-slate-200/90 dark:text-white/[0.08] leading-none select-none">
            पानीपत
          </span>
        </motion.div>
      </div>

      {/* Bento Grid — 2 columns on mobile, 3 columns on desktop */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-12 sm:mb-16"
      >
        {valueProps.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className={`group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] ${item.borderColor} p-3.5 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 dark:hover:shadow-black/60 overflow-hidden min-h-[170px] sm:min-h-[250px]`}
          >
            {/* Engraved Background Typography Watermark */}
            <div className="absolute top-1 sm:top-2 right-2 sm:right-4 pointer-events-none select-none overflow-hidden z-0">
              <span className="text-2xl sm:text-6xl font-black uppercase tracking-tighter text-slate-100 dark:text-white/[0.03] group-hover:text-slate-200/90 dark:group-hover:text-white/[0.06] transition-all duration-300 transform group-hover:translate-x-1 block leading-none">
                {item.tag}
              </span>
            </div>

            {/* Ambient Accent Glow Line */}
            <div
              className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
              }}
            />

            {/* Card Content Top */}
            <div className="relative z-10 pt-0.5">
              {/* Title */}
              <h3 className="text-xs sm:text-lg font-extrabold text-slate-950 dark:text-white tracking-tight mb-1 sm:mb-2 group-hover:text-[#8E35EA] dark:group-hover:text-[#BE7BFF] transition-colors leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-snug sm:leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                {item.desc}
              </p>
            </div>

            {/* Card Footer: Engraved Number in Bottom Right */}
            <div className="relative z-10 pt-2.5 sm:pt-4 mt-2 flex items-end justify-between border-t border-slate-100 dark:border-white/[0.04]">
              <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                <span className="h-1 w-2.5 sm:w-4 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-[#AD5CFF] transition-colors" />
                <span className="hidden sm:inline">AWS SCD 2026</span>
                <span className="sm:hidden">SCD</span>
              </div>

              <span className="text-2xl sm:text-4xl font-mono font-black tracking-tighter text-slate-200 dark:text-white/10 group-hover:text-[#8E35EA]/35 dark:group-hover:text-[#AD5CFF]/40 transition-colors leading-none select-none">
                {item.num}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Credly Digital Credential Verification Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-[#070B1A] dark:to-[#0B1024] border border-slate-200 dark:border-white/10 p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm overflow-hidden mb-2 sm:mb-4"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD5CFF]/[0.06] dark:bg-[#AD5CFF]/[0.08] blur-[80px] rounded-full pointer-events-none" />


        <div className="relative z-10 max-w-xl">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
            Official Credly Digital Badge & Certificate
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
            Every registered attendee receives an official, cryptographically verifiable Credly digital badge and participation certificate to showcase verified cloud skills on LinkedIn and GitHub.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500" />
              Shareable on LinkedIn
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500" />
              Issued via Credly
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500" />
              Included with Builder & Black Passes
            </span>
          </div>
        </div>

        {/* Static Credly Badge Display */}
        <div className="relative z-10 shrink-0 flex flex-col items-center">
          <div className="w-56 rounded-2xl bg-white dark:bg-[#0B1024] border border-[#AD5CFF]/35 p-5 flex flex-col items-center text-center shadow-xl shadow-[#AD5CFF]/10 backdrop-blur-sm">
            <div className="relative h-24 w-24 mb-2.5 rounded-2xl p-1.5 border border-slate-200/90 dark:border-white/15 bg-slate-50/80 dark:bg-white/[0.04] shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/credly-badge.png"
                alt="AWS Student Community Day Participant Credly Badge"
                width={84}
                height={84}
                className="object-contain rounded-xl drop-shadow-sm"
              />
            </div>
            <span className="text-[9px] font-mono font-bold text-[#8E35EA] dark:text-[#AD5CFF] uppercase tracking-wider">
              Official Digital Badge
            </span>
            <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">
              AWS SCD Participant 2026
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              Issued via Credly.com
            </span>
          </div>

          <button
            onClick={onOpenTickets}
            className="mt-3.5 text-xs font-bold text-[#8E35EA] dark:text-[#AD5CFF] flex items-center gap-1 cursor-pointer"
          >
            <span>Register to claim badge</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}

