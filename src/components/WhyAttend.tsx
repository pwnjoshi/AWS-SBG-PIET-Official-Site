"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Award02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

interface WhyAttendProps {
  onOpenTickets: () => void;
}

export default function WhyAttend({ onOpenTickets }: WhyAttendProps) {
  const valueProps = [
    {
      title: "500+ Student Builders",
      desc: "Connect with aspiring engineers, developers, and founders across 25+ colleges in Haryana and the Delhi-NCR region.",
      tag: "Networking",
    },
    {
      title: "6 Technical Learning Tracks",
      desc: "From Cloud Foundations to Generative AI with Amazon Bedrock, DevOps automation, and serverless architectures.",
      tag: "Curriculum",
    },
    {
      title: "100% Hands-on Practice",
      desc: "Zero boring slides. Build and deploy live architectures on AWS CloudShell with real-time mentor guidance.",
      tag: "Live Labs",
    },
    {
      title: "AWS Heroes & Industry Mentors",
      desc: "Learn directly from distinguished global AWS Heroes, Community Builders, and tech leads sharing real production insights.",
      tag: "Mentorship",
    },
    {
      title: "Career & Recruiter Hub",
      desc: "Get 1-on-1 resume reviews, certification roadmap guidance, and direct interaction with hiring managers in the tech expo.",
      tag: "Career",
    },
    {
      title: "Free Passes for All Students",
      desc: "Full-day summit access including keynotes, technical tracks, labs, networking sessions, and commemorative event kit.",
      tag: "Access",
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
          EVENT OVERVIEW
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Built by student leaders, designed for real cloud mastery
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          AWS Student Community Day Panipat is Haryana’s focal gathering for student developers to transition from classroom theory to building production cloud systems.
        </p>
      </motion.div>

      {/* Structured Clean Grid with Staggered Scroll Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
      >
        {valueProps.map((item, index) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl bg-white dark:bg-[#090E1E] border border-slate-200/80 dark:border-white/[0.08] hover:border-[#AD5CFF]/40 dark:hover:border-[#AD5CFF]/30 p-6 flex flex-col justify-between transition-colors duration-200 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {item.tag}
                </span>
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>
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
        className="rounded-2xl bg-slate-50 dark:bg-[#070B1A] border border-slate-200 dark:border-white/10 p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm"
      >
        <div className="max-w-xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
            CREDENTIAL VERIFICATION
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
            Official Credly Digital Badge & Certificate
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
            Every registered attendee receives an official, cryptographically verifiable Credly digital badge and participation certificate to showcase verified cloud skills on LinkedIn and GitHub.
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>• Shareable on LinkedIn</span>
            <span>• Issued by AWS SBG</span>
            <span>• Included with Free Pass</span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 flex flex-col items-center"
        >
          <div className="w-48 rounded-xl bg-white dark:bg-[#0B1024] border border-[#AD5CFF]/30 p-4 flex flex-col items-center text-center shadow-lg shadow-[#AD5CFF]/10">
            <div className="h-10 w-10 rounded-lg bg-[#AD5CFF]/15 text-[#8E35EA] dark:text-[#BE7BFF] flex items-center justify-center mb-2">
              <HugeiconsIcon icon={Award02Icon} className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-[#8E35EA] dark:text-[#AD5CFF] uppercase tracking-wider">
              Credly Verified
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              AWS SCD Panipat 2026
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              PIET Campus
            </span>
          </div>

          <button
            onClick={onOpenTickets}
            className="mt-3 text-xs font-semibold text-[#8E35EA] dark:text-[#AD5CFF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Register to claim badge</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
