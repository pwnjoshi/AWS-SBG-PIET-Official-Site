"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FlashIcon,
  SparklesIcon,
  Download01Icon,
  ArrowUpRight01Icon,
  Tick02Icon,
  ArrowDown01Icon,
  TrophyIcon,
} from "@hugeicons/core-free-icons";
import { EVENT_DETAILS } from "@/lib/data";

const RULES = [
  {
    num: "01",
    title: "Eligibility",
    points: [
      "Open to all college/university students with a valid student ID.",
      "Participate individually or in teams of up to 4 members.",
      "Register for only one competition - Ideathon & Buildathon run simultaneously.",
      "Participants must be physically present at the event.",
    ],
  },
  {
    num: "02",
    title: "Common Rules",
    points: [
      "Each team must designate one Team Leader.",
      "A participant cannot be a member of multiple teams.",
      "Team composition cannot be changed once the competition begins.",
      "Plagiarism or impersonation will result in disqualification.",
    ],
  },
  {
    num: "03",
    title: "Ideathon",
    points: [
      "Choose your own problem statement addressing a genuine need.",
      "Prepare your core idea and supporting material before the event.",
      "Pitch: Problem > Importance > Solution > Approach > Feasibility > Impact.",
      "AWS integration is encouraged but not mandatory.",
    ],
  },
  {
    num: "04",
    title: "Buildathon (KIRO)",
    points: [
      "Problem statement is provided by organizers at the start.",
      "Official build time is 60 minutes.",
      "AI tools (Kiro, Claude Code, Cursor, Copilot) are permitted and encouraged.",
      "Install and test all dev tools beforehand - build time is for building.",
    ],
  },
];

export default function CompetitionsSection() {
  const [openRule, setOpenRule] = useState<string | null>("01");

  return (
    <section id="competitions" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
      >
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-500 dark:text-amber-400 block mb-2">
          COMPETITIONS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Ideathon &amp; Buildathon
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Two simultaneous competitions. One prize pool of{" "}
          <span className="font-bold text-amber-500">Rs. 30,000</span>. Register for the one that matches your style.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-5">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30"
          >
            <div className="p-2.5 rounded-xl bg-amber-400/20 dark:bg-amber-400/10 shrink-0">
              <HugeiconsIcon icon={TrophyIcon} className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-black text-amber-600 dark:text-amber-400">Total Prize Pool: Rs. 30,000</p>
              <p className="text-[11px] text-amber-600/70 dark:text-amber-400/60 font-medium">Distributed across Ideathon &amp; Buildathon winners</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="group rounded-2xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/10 p-5 sm:p-6 shadow-sm hover:border-violet-400/50 dark:hover:border-violet-500/40 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 border border-violet-500/20 shrink-0">
                  <HugeiconsIcon icon={SparklesIcon} className="h-5 w-5 text-violet-500 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Ideathon</h3>
                  <p className="text-[11px] font-mono text-violet-500 dark:text-violet-400 font-bold">Solo / Team (max 4) - Own problem statement</p>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-mono font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                PITCH COMPETITION
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Identify a real problem, develop a solution concept, and pitch it to a jury of AWS mentors. Strong ideas with feasibility and impact will win.
            </p>
            <ul className="space-y-1.5 mb-5">
              {["Choose your own problem statement", "Prepare idea and materials before the event", "7-point pitch: Problem to Impact to AWS integration", "Prototype not mandatory - strong concept wins"].map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-violet-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <a
              href={EVENT_DETAILS.ideathonFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
            >
              <span>Register for Ideathon</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="group rounded-2xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/10 p-5 sm:p-6 shadow-sm hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 shrink-0">
                  <HugeiconsIcon icon={FlashIcon} className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">KIRO Buildathon</h3>
                  <p className="text-[11px] font-mono text-amber-500 dark:text-amber-400 font-bold">Solo / Team (max 4) - Organizer-provided problem</p>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                60-MIN BUILD
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Build a functional MVP in 60 minutes from an organizer-provided problem statement. AI tools like Kiro, Claude Code, and Cursor are encouraged.
            </p>
            <ul className="space-y-1.5 mb-5">
              {["Problem statement revealed at event start", "60-minute official build window", "AI tools permitted and encouraged (Kiro, Cursor, Claude)", "Install all dev tools and set up environment beforehand"].map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <a
              href={EVENT_DETAILS.ideathonFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
            >
              <span>Register for Buildathon</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm"
        >
          <div className="px-5 py-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Official Rules</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">Ideathon &amp; Buildathon Guidelines</p>
            </div>
            <a
              href={EVENT_DETAILS.competitionGuidelinesPdf}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-[11px] font-bold transition-all"
            >
              <HugeiconsIcon icon={Download01Icon} className="h-3.5 w-3.5" />
              <span>PDF</span>
            </a>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {RULES.map((rule) => (
              <div key={rule.num}>
                <button
                  onClick={() => setOpenRule(openRule === rule.num ? null : rule.num)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 w-5">{rule.num}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{rule.title}</span>
                  </div>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${openRule === rule.num ? "rotate-180 text-[#AD5CFF]" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openRule === rule.num && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="px-5 pb-4 space-y-2">
                        {rule.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
            <a
              href={EVENT_DETAILS.competitionGuidelinesPdf}
              download
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white/[0.08] hover:bg-slate-800 dark:hover:bg-white/[0.12] text-white text-xs font-bold transition-all active:scale-95"
            >
              <HugeiconsIcon icon={Download01Icon} className="h-3.5 w-3.5" />
              <span>Download Full Guidelines PDF</span>
            </a>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-2 font-mono">
              PANIPAT, HARYANA - COMPETITION REGISTRATION &amp; EVENT GUIDELINES
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
