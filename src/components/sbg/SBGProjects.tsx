"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CloudIcon,
  CpuIcon,
  CodeCircleIcon,
  TerminalIcon,
  Tick02Icon,
  ArrowUpRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

export default function SBGProjects() {
  const projects = [
    {
      title: "Campus AI Assistant on Bedrock",
      category: "GENERATIVE AI & RAG",
      desc: "An intelligent student query assistant powered by Amazon Bedrock, Anthropic Claude 3.5, and Amazon Titan vector embeddings for instant academic insights.",
      architecture: ["Amazon Bedrock", "OpenSearch Serverless", "AWS Lambda", "Next.js"],
      icon: CpuIcon,
      accent: "#AD5CFF",
      accentBg: "rgba(173, 92, 255, 0.12)",
    },
    {
      title: "Serverless Summit Ticketing Engine",
      category: "CLOUD ARCHITECTURE",
      desc: "High-concurrency event registration and verifiable Credly pass generation engine handling 1000+ student registrations with sub-second latency.",
      architecture: ["AWS Lambda", "Amazon DynamoDB", "API Gateway", "Amazon S3"],
      icon: CloudIcon,
      accent: "#0EA5E9",
      accentBg: "rgba(14, 165, 233, 0.12)",
    },
    {
      title: "Automated CDK CI/CD Pipeline",
      category: "DEVOPS & AUTOMATION",
      desc: "Infrastructure as Code (IaC) deployment pipelines using AWS CDK (TypeScript) and GitHub Actions for continuous automated multi-environment deployments.",
      architecture: ["AWS CDK", "CodePipeline", "GitHub Actions", "Docker / ECS"],
      icon: TerminalIcon,
      accent: "#10B981",
      accentBg: "rgba(16, 185, 129, 0.12)",
    },
    {
      title: "Smart Campus IoT Analytics Hub",
      category: "IOT & DATA STREAMING",
      desc: "Real-time campus environmental and energy telemetry monitoring connecting edge sensor nodes to AWS IoT Core and time-series dashboards.",
      architecture: ["AWS IoT Core", "Amazon Kinesis", "Amazon Timestream", "Grafana"],
      icon: CodeCircleIcon,
      accent: "#F59E0B",
      accentBg: "rgba(245, 158, 11, 0.12)",
    },
  ];

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-14"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          STUDENT ARCHITECTURES
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Production Systems Built at PIET
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore real cloud architectures designed and deployed by student builders in our chapter.
        </p>
      </motion.div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, index) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#AD5CFF]/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="h-10 w-10 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: proj.accentBg, color: proj.accent }}
                >
                  <HugeiconsIcon icon={proj.icon} className="h-5 w-5" />
                </div>
                <span
                  className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase"
                  style={{
                    backgroundColor: `${proj.accent}15`,
                    borderColor: `${proj.accent}30`,
                    color: proj.accent,
                  }}
                >
                  {proj.category}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white mb-2 group-hover:text-[#8E35EA] dark:group-hover:text-[#BE7BFF] transition-colors">
                {proj.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                {proj.desc}
              </p>
            </div>

            {/* Architecture Stack Chips */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-slate-500 mr-1">STACK:</span>
              {proj.architecture.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.05] text-slate-700 dark:text-slate-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
