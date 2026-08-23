"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Linkedin01Icon,
  SparklesIcon,
  Award02Icon,
  UserIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

export default function SBGLeadership() {
  const leadershipSquad = [
    {
      title: "Student Chapter Leadership",
      sub: "Core Executive Committee",
      category: "EXECUTIVE TEAM",
      desc: "Organizing weekly AWS study circles, cloud architecture bootcamps, community hackathons, and regional inter-college builder alliances.",
      responsibilities: ["Workshop Curation", "CDK Labs", "Student Mentorship"],
      badge: "Student Leads",
      accent: "#AD5CFF",
    },
    {
      title: "Faculty & Department Advisors",
      sub: "Department of CSE & AI, PIET",
      category: "ACADEMIC ADVISORY",
      desc: "Providing institutional governance, academic cloud credits integration, high-performance computing lab support, and university backing.",
      responsibilities: ["Institutional Support", "Lab Infrastructure", "Curriculum Linkage"],
      badge: "University Mentors",
      accent: "#0EA5E9",
    },
    {
      title: "AWS Community Heroes & Mentors",
      sub: "Global AWS Community Network",
      category: "INDUSTRY ADVISORS",
      desc: "Industry cloud architects and AWS Heroes providing session mentorship, technical code reviews, keynote lectures, and career placement guidance.",
      responsibilities: ["Architecture Reviews", "Keynote Talks", "Hiring Referrals"],
      badge: "Industry Advisors",
      accent: "#10B981",
    },
  ];

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-14"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          LEADERSHIP & MENTORSHIP
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Guided by Visionaries & Cloud Architects
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Driven by passionate student builders with mentorship from PIET faculty and industry AWS Community leaders.
        </p>
      </motion.div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leadershipSquad.map((lead, index) => (
          <motion.div
            key={lead.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/50 transition-all flex flex-col justify-between shadow-sm group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase"
                  style={{
                    backgroundColor: `${lead.accent}15`,
                    borderColor: `${lead.accent}30`,
                    color: lead.accent,
                  }}
                >
                  {lead.badge}
                </span>
                <HugeiconsIcon icon={Award02Icon} className="h-4 w-4" style={{ color: lead.accent }} />
              </div>

              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white mb-1 group-hover:text-[#8E35EA] dark:group-hover:text-[#BE7BFF] transition-colors">
                {lead.title}
              </h3>

              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-3">
                {lead.sub}
              </span>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                {lead.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-col gap-2">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">FOCUS AREAS:</span>
              <div className="flex flex-wrap gap-1.5">
                {lead.responsibilities.map((resp) => (
                  <span
                    key={resp}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-white/[0.05]"
                  >
                    <HugeiconsIcon icon={Tick02Icon} className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>{resp}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
