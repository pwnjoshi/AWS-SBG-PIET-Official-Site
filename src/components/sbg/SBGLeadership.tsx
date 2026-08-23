"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Linkedin01Icon,
  SparklesIcon,
  QuoteDownIcon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  GithubIcon,
} from "@hugeicons/core-free-icons";

export default function SBGLeadership() {
  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-12 sm:mb-16"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          STUDENT LEADERSHIP &amp; VISION
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Words from the Community Lead
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Pioneering hands-on cloud education, Generative AI labs, and regional builder culture at PIET.
        </p>
      </motion.div>

      {/* Leader Spotlight Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/10 p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-black/60 overflow-hidden"
      >
        {/* Ambient Radial Accent Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8E35EA]/10 dark:bg-[#AD5CFF]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center relative z-10">
          {/* Left: Leader Portrait Frame */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="relative h-60 w-60 sm:h-64 sm:w-64 rounded-3xl overflow-hidden border-2 border-[#8E35EA]/30 dark:border-[#AD5CFF]/40 shadow-2xl bg-slate-900">
                <Image
                  src="/images/rehan-poonia.png"
                  alt="Rehan Poonia — AWS Student Builder Group Leader | CSE @ PIET"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Verified Lead Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8E35EA] dark:bg-[#AD5CFF] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg shadow-purple-500/30 flex items-center gap-1.5 whitespace-nowrap">
                <HugeiconsIcon icon={SparklesIcon} className="h-3.5 w-3.5" />
                <span>AWS SBG LEADER</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                Rehan Poonia
              </h3>
              <span className="text-xs font-mono font-semibold text-[#8E35EA] dark:text-[#BE7BFF] block mt-0.5">
                AWS Student Builder Group Leader | CSE @ PIET
              </span>

              {/* LinkedIn Button */}
              <div className="flex items-center justify-center gap-2.5 mt-3">
                <a
                  href="https://www.linkedin.com/in/rehan-poonia-50b241383/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.98]"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Authentic Vision Message & Key Milestones */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-[#8E35EA] dark:text-[#AD5CFF]">
                <HugeiconsIcon icon={QuoteDownIcon} className="h-6 w-6 opacity-80" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  MESSAGE FROM THE LEADER
                </span>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-800 dark:text-slate-100 font-medium leading-relaxed italic mb-6">
                &ldquo;Our vision with the AWS Student Builder Group at PIET is to replace passive learning with true engineering ownership. We empower students to build production-grade cloud architectures, explore Amazon Bedrock and Generative AI, and step into the global tech ecosystem with real, verified credentials. Hosting Haryana&apos;s first-ever AWS Student Community Day is our commitment to putting our regional developer community on the national tech map.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-6">
                Under Rehan&apos;s leadership, the AWS SBG PIET chapter hosts regular hands-on CloudShell bootcamps, architecture review circles, and connects student developers directly with AWS Community Heroes, industry architects, and tech hiring partners.
              </p>
            </div>

            {/* Core Leadership Milestones */}
            <div className="pt-5 border-t border-slate-100 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                <span className="text-lg font-black text-slate-900 dark:text-white block font-mono">500+</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Active Student Builders</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                <span className="text-lg font-black text-[#8E35EA] dark:text-[#AD5CFF] block font-mono">SCD 2026</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Haryana&apos;s 1st Flagship Summit</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]">
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block font-mono">100%</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Hands-on Sandbox Labs</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

