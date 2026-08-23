"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

interface SpeakersCFPProps {
  onOpenCFP: () => void;
}

export default function SpeakersCFP({ onOpenCFP }: SpeakersCFPProps) {
  const speakerRoles = [
    {
      category: "AWS Heroes & Community Builders",
      desc: "Distinguished global cloud architects sharing cutting-edge architectures and real-world lessons.",
      tag: "Keynotes",
    },
    {
      category: "Industry Leaders & Tech Leads",
      desc: "Engineering managers and cloud practitioners from top tech companies and startups.",
      tag: "Technical Sessions",
    },
    {
      category: "Workshop Facilitators",
      desc: "Experienced trainers guiding students through live build-alongs and AWS architecture labs.",
      tag: "Cloud Labs",
    },
    {
      category: "Career Mentors & Cloud Recruiters",
      desc: "Talent partners and hiring managers providing career roadmaps, resume audits & 1-on-1 advice.",
      tag: "Career Panel",
    },
  ];

  return (
    <section id="speakers" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-12"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD5CFF] block mb-2">
          SPEAKERS & CFP
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Learn from practitioners, or step up to the stage
        </h2>
        <p className="mt-3 text-base text-slate-300 leading-relaxed">
          Hear directly from global AWS community leaders. Have an architecture pattern, AI project, or open-source tool to showcase? Call for Proposals is open.
        </p>
      </motion.div>

      {/* Speaker Categories Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, staggerChildren: 0.08 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
      >
        {speakerRoles.map((role, idx) => (
          <motion.div
            key={role.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-xl bg-[#090E1E] border border-white/[0.08] hover:border-[#AD5CFF]/30 p-5 flex flex-col justify-between transition-colors"
          >
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                {role.tag}
              </span>
              <h4 className="text-sm font-bold text-white mb-2">{role.category}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{role.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">Status</span>
              <span className="text-[#BE7BFF] font-semibold">Lineup TBA</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CFP Submission Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-[#070B1A] border border-white/10 p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="max-w-xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#AD5CFF] block mb-1">
            CALL FOR PROPOSALS
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Submit a talk or workshop proposal
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
            We welcome talks on Cloud Foundations, Generative AI with Amazon Bedrock, DevOps automation, Serverless, and student project showcases.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenCFP}
            className="px-5 py-2.5 rounded-full bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#AD5CFF]/25 hover:scale-[1.02]"
          >
            <span>Submit Your Talk</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
          </button>

          <a
            href="mailto:aws-sbg@piet.co.in"
            className="px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all hover:scale-[1.02]"
          >
            Speaker Questions
          </a>
        </div>
      </motion.div>
    </section>
  );
}
