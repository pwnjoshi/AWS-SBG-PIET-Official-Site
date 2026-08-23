"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Linkedin01Icon,
  SparklesIcon,
  UserIcon,
  Mic01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";

interface SpeakersCFPProps {
  onOpenCFP: () => void;
}

export default function SpeakersCFP({ onOpenCFP }: SpeakersCFPProps) {
  const keynoteSpeaker = {
    name: "Praful Bagai",
    role: "AWS Community Leader & Cloud Architect",
    topic: "Next-Gen Cloud Innovations & Enterprise Generative AI",
    badge: "FEATURED KEYNOTE",
    linkedin: "https://www.linkedin.com/in/prafulbagai",
    desc: "Renowned AWS Community Leader and cloud strategist delivering the summit's opening visionary keynote on scalable cloud infrastructure, Bedrock agentic pipelines, and the future of cloud computing.",
    initials: "PB",
    accent: "#AD5CFF",
  };

  const technicalSpeakers = [
    {
      name: "Amit Kumar",
      role: "Solutions Architect & Cloud Specialist",
      topic: "Enterprise AWS Architectures & Serverless Scalability",
      track: "Track A • Cloud Architecture",
      linkedin: "https://www.linkedin.com/in/amitkyvmw",
      desc: "Deep-dive session covering resilient multi-region architectures, serverless event-driven patterns, and cost-optimized AWS implementations.",
      initials: "AK",
      accent: "#0EA5E9",
    },
    {
      name: "Chhavi Garg",
      role: "Generative AI Specialist & Cloud Engineer",
      topic: "Building Production GenAI Apps with Amazon Bedrock",
      track: "Track B • Generative AI & ML",
      linkedin: "https://www.linkedin.com/in/chhavigg",
      desc: "Hands-on exploration of Amazon Bedrock foundation models, Retrieval-Augmented Generation (RAG), vector embeddings, and autonomous agent workflows.",
      initials: "CG",
      accent: "#C084FC",
    },
    {
      name: "Shivani Singh Vimal",
      role: "DevOps & Cloud Security Engineer",
      topic: "Zero-Trust Cloud Security & Automated CI/CD on AWS",
      track: "Track C • DevOps & Security",
      linkedin: "https://www.linkedin.com/in/shivani-singh-vimal-438449267",
      desc: "Comprehensive guide to IAM least privilege, automated Infrastructure as Code pipelines with AWS CDK, and automated compliance auditing.",
      initials: "SV",
      accent: "#10B981",
    },
  ];

  return (
    <section id="speakers" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-10 sm:mb-14"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          KEYNOTES &amp; TECHNICAL SESSIONS
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Featured Speakers &amp; Industry Leaders
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Learn directly from global AWS community architects, Generative AI specialists, and engineering practitioners on 11 Sept 2026.
        </p>
      </motion.div>

      {/* Main Keynote Spotlight Card — Praful Bagai */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-gradient-to-br from-purple-50/70 via-white to-purple-50/30 dark:from-[#0B0F2A] dark:via-[#090D22] dark:to-[#060818] border-2 border-[#AD5CFF]/40 p-6 sm:p-9 shadow-xl shadow-purple-500/10 mb-8 sm:mb-12 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AD5CFF]/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            {/* Keynote Avatar Badge */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-[#8E35EA] to-[#AD5CFF] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg shadow-purple-500/30 shrink-0 font-mono">
              {keynoteSpeaker.initials}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8E35EA]/15 text-[#8E35EA] dark:text-[#AD5CFF] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#8E35EA]/30">
                  <HugeiconsIcon icon={Mic01Icon} className="h-3 w-3" />
                  {keynoteSpeaker.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                {keynoteSpeaker.name}
              </h3>
              <span className="text-xs sm:text-sm font-semibold text-[#8E35EA] dark:text-[#BE7BFF] block mt-0.5">
                {keynoteSpeaker.role}
              </span>
            </div>
          </div>

          <a
            href={keynoteSpeaker.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
          >
            <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>

        <div className="relative z-10 mt-6 pt-5 border-t border-purple-100 dark:border-white/[0.08]">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500 block mb-1">
            KEYNOTE TOPIC
          </span>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
            {keynoteSpeaker.topic}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-4xl">
            {keynoteSpeaker.desc}
          </p>
        </div>
      </motion.div>

      {/* Technical Session Speakers 3-Column Grid */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 mb-6">
          <HugeiconsIcon icon={Layers01Icon} className="h-4 w-4 text-[#8E35EA] dark:text-[#AD5CFF]" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Technical Track Leaders
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {technicalSpeakers.map((speaker, idx) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/40 p-5 sm:p-6 flex flex-col justify-between shadow-sm transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center font-mono font-black text-sm text-white shadow-md"
                    style={{ backgroundColor: speaker.accent }}
                  >
                    {speaker.initials}
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] px-2.5 py-1 rounded-md">
                    {speaker.track}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-[#8E35EA] dark:group-hover:text-[#BE7BFF] transition-colors mb-0.5">
                  {speaker.name}
                </h4>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-3">
                  {speaker.role}
                </span>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.05] mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
                    SESSION TOPIC
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block leading-snug">
                    {speaker.topic}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {speaker.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} className="h-3.5 w-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CFP Submission Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-slate-50 dark:bg-[#070B1A] border border-slate-200 dark:border-white/10 p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
      >
        <div className="max-w-xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
            CALL FOR PROPOSALS
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
            Submit a talk or workshop proposal
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
            Have an architecture pattern, AI project, or open-source tool to showcase? Call for Proposals is open for student builders and community speakers.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenCFP}
            className="px-5 py-2.5 rounded-full bg-[#8E35EA] dark:bg-[#AD5CFF] hover:bg-[#7828C8] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-500/25 active:scale-95 cursor-pointer"
          >
            <span>Submit Your Talk</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
          </button>

          <a
            href="mailto:aws-sbg@piet.co.in"
            className="px-4 py-2.5 rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
          >
            Speaker Questions
          </a>
        </div>
      </motion.div>
    </section>
  );
}

