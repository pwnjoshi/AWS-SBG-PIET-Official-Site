"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  CpuIcon,
  CloudIcon,
  BookOpen01Icon,
  Share01Icon,
  CodeCircleIcon,
  Rocket01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

export default function SBGAbout() {
  const pillars = [
    {
      num: "01",
      tag: "INFRASTRUCTURE",
      title: "Hands-on Cloud Deployments",
      desc: "Zero boring slides. Build and deploy real VPC networks, serverless microservices, and Infrastructure as Code with AWS CDK & Terraform.",
      accent: "#0EA5E9",
      accentBg: "rgba(14, 165, 233, 0.12)",
      borderColor: "hover:border-sky-500/60",
      glowColor: "group-hover:bg-sky-500/5",
      badgeColor: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/25",
      icon: CloudIcon,
      highlights: ["AWS CDK / IaC", "VPC & Microservices", "Live CloudShell"],
    },
    {
      num: "02",
      tag: "AI & ML",
      title: "Generative AI on Amazon Bedrock",
      desc: "Build production-grade LLM applications, RAG search pipelines, agentic workflows, and Foundation Model fine-tuning with Claude 3.5 & Titan.",
      accent: "#AD5CFF",
      accentBg: "rgba(173, 92, 255, 0.12)",
      borderColor: "hover:border-[#AD5CFF]/60",
      glowColor: "group-hover:bg-[#AD5CFF]/5",
      badgeColor: "text-[#8E35EA] dark:text-[#AD5CFF] bg-[#AD5CFF]/10 border-[#AD5CFF]/25",
      icon: CpuIcon,
      highlights: ["Amazon Bedrock", "RAG Workflows", "Vector DBs"],
    },
    {
      num: "03",
      tag: "CERTIFICATIONS",
      title: "AWS Certification Study Circles",
      desc: "Structured study cohorts and exam roadmaps helping students crack AWS Cloud Practitioner & Solutions Architect Associate certifications.",
      accent: "#10B981",
      accentBg: "rgba(16, 185, 129, 0.12)",
      borderColor: "hover:border-emerald-500/60",
      glowColor: "group-hover:bg-emerald-500/5",
      badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      icon: BookOpen01Icon,
      highlights: ["Study Cohorts", "Exam Vouchers", "Practice Labs"],
    },
    {
      num: "04",
      tag: "HACKATHONS",
      title: "KIRO Buildathons & Prototyping",
      desc: "Host 24-hour rapid prototyping hackathons and startup architecture pitch competitions with mentorship from industry architects.",
      accent: "#F59E0B",
      accentBg: "rgba(245, 158, 11, 0.12)",
      borderColor: "hover:border-amber-500/60",
      glowColor: "group-hover:bg-amber-500/5",
      badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
      icon: Rocket01Icon,
      highlights: ["Live Hackathons", "Cash Prizes", "Startup Pitches"],
    },
    {
      num: "05",
      tag: "OPEN SOURCE",
      title: "Serverless & Full-Stack Apps",
      desc: "Contribute to real open-source student repositories, serverless Next.js web applications, and event ticketing engines on AWS Lambda & DynamoDB.",
      accent: "#F43F5E",
      accentBg: "rgba(244, 63, 94, 0.12)",
      borderColor: "hover:border-rose-500/60",
      glowColor: "group-hover:bg-rose-500/5",
      badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/25",
      icon: CodeCircleIcon,
      highlights: ["Serverless Next.js", "DynamoDB & S3", "GitHub CI/CD"],
    },
    {
      num: "06",
      tag: "CAREERS",
      title: "AWS Heroes & Recruiter Bridges",
      desc: "Direct access to global AWS Heroes, Community Builders, tech recruiters, and hiring managers for 1-on-1 resume reviews and career guidance.",
      accent: "#8B5CF6",
      accentBg: "rgba(139, 92, 246, 0.12)",
      borderColor: "hover:border-purple-500/60",
      glowColor: "group-hover:bg-purple-500/5",
      badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/25",
      icon: Share01Icon,
      highlights: ["AWS Heroes AMAs", "Resume Reviews", "Hiring Booths"],
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-14"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          ABOUT THE CHAPTER
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Pioneering hands-on cloud culture at PIET Panipat
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>AWS Student Builder Group (SBG) at Panipat Institute of Engineering & Technology</strong> is an autonomous, student-led technical chapter recognized under the global AWS Student Builder Group & Cloud Club initiatives. We empower 500+ student developers across Haryana and NCR with real production cloud skills.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className={`group relative rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] ${item.borderColor} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/60 overflow-hidden`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${item.glowColor}`} />

            {/* Top Accent Gradient Line */}
            <div
              className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
              }}
            />

            <div className="relative z-10">
              {/* Header: Tag & Number */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div
                    className="h-8 w-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
                  >
                    <HugeiconsIcon icon={item.icon} className="h-4 w-4" />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase border ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                </div>

                <span className="text-lg font-mono font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {item.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2 group-hover:text-[#8E35EA] dark:group-hover:text-white transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                {item.desc}
              </p>
            </div>

            {/* Footer Micro-Pills */}
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
      </div>
    </section>
  );
}
