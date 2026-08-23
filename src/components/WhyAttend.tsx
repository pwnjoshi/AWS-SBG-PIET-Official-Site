"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

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
      highlights: ["6+ SBG Chapters", "Peer Collabs", "Dev Hackathons"],
    },
    {
      num: "02",
      tag: "Curriculum",
      title: "6 Technical Learning Tracks",
      desc: "From Cloud Foundations to Generative AI with Amazon Bedrock, DevOps automation, and serverless architectures.",
      accent: "#0EA5E9",
      accentBg: "rgba(14, 165, 233, 0.12)",
      borderColor: "hover:border-sky-500/60",
      glowColor: "group-hover:bg-sky-500/5",
      badgeColor: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25",
      highlights: ["Amazon Bedrock", "AWS CDK & IaC", "Serverless Arch"],
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
      tag: "Mentorship",
      title: "AWS Heroes & Industry Mentors",
      desc: "Learn directly from distinguished global AWS Heroes, Community Builders, and tech leads sharing real production insights.",
      accent: "#F59E0B",
      accentBg: "rgba(245, 158, 11, 0.12)",
      borderColor: "hover:border-amber-500/60",
      glowColor: "group-hover:bg-amber-500/5",
      badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
      highlights: ["Global AWS Heroes", "Community Builders", "1-on-1 AMAs"],
    },
    {
      num: "05",
      tag: "Career",
      title: "Career & Recruiter Hub",
      desc: "Get 1-on-1 resume reviews, certification roadmap guidance, and direct interaction with hiring managers in the tech expo.",
      accent: "#F43F5E",
      accentBg: "rgba(244, 63, 94, 0.12)",
      borderColor: "hover:border-rose-500/60",
      glowColor: "group-hover:bg-rose-500/5",
      badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/25",
      highlights: ["Resume Reviews", "Hiring Booths", "AWS Cert Roadmaps"],
    },
    {
      num: "06",
      tag: "Access",
      title: "Free Passes for All Students",
      desc: "Full-day summit access including keynotes, technical tracks, labs, networking sessions, and commemorative event kit.",
      accent: "#8B5CF6",
      accentBg: "rgba(139, 92, 246, 0.12)",
      borderColor: "hover:border-purple-500/60",
      glowColor: "group-hover:bg-purple-500/5",
      badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25",
      highlights: ["100% Free Entry", "Swag Kits Included", "Verified Certificate"],
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
    <section id="overview" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-14"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          WHY ATTEND
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Built by student leaders, designed for real cloud mastery
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          AWS Student Community Day Panipat is Haryana’s focal gathering for student developers to transition from classroom theory to building production cloud systems.
        </p>
      </motion.div>

      {/* Redesigned Premium Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {valueProps.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className={`group relative rounded-2xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] ${item.borderColor} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/60 overflow-hidden`}
          >
            {/* Ambient Background Glow Effect */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${item.glowColor}`}
            />
            
            {/* Top Accent Gradient Line */}
            <div
              className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
              }}
            />

            {/* Card Content Top */}
            <div className="relative z-10">
              {/* Header: Tag, Indicator, & Index */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase border ${item.badgeColor}`}
                  >
                    {item.tag}
                  </span>
                </div>

                <span className="text-xl font-mono font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {item.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2.5 group-hover:text-[#8E35EA] dark:group-hover:text-white transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                {item.desc}
              </p>
            </div>

            {/* Card Footer: Micro-Pills */}
            <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap gap-1.5">
              {item.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.05] text-[11px] font-medium text-slate-700 dark:text-slate-300"
                >
                  <HugeiconsIcon icon={Tick02Icon} className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span>{highlight}</span>
                </span>
              ))}
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
        className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-[#070B1A] dark:to-[#0B1024] border border-slate-200 dark:border-white/10 p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD5CFF]/[0.06] dark:bg-[#AD5CFF]/[0.08] blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
            CREDENTIAL VERIFICATION
          </span>
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
              Included with Free Pass
            </span>
          </div>
        </div>

        {/* Static Credly Badge Display - No Hover Scaling */}
        <div className="relative z-10 shrink-0 flex flex-col items-center">
          <div className="w-56 rounded-2xl bg-white dark:bg-[#0B1024] border border-[#AD5CFF]/35 p-5 flex flex-col items-center text-center shadow-xl shadow-[#AD5CFF]/10 backdrop-blur-sm">
            <div className="relative h-24 w-24 mb-2 drop-shadow-md">
              <Image
                src="/images/credly-badge.png"
                alt="AWS Student Community Day Participant Credly Badge"
                width={96}
                height={96}
                className="object-contain"
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
