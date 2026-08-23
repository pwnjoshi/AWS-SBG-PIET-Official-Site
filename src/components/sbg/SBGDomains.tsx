"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CloudIcon,
  CpuIcon,
  TerminalIcon,
  CodeCircleIcon,
  Rocket01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

export default function SBGDomains() {
  const domains = [
    {
      icon: CloudIcon,
      name: "Cloud Architecture & Core Services",
      tag: "INFRASTRUCTURE",
      color: "#0EA5E9",
      desc: "Deep diving into AWS EC2, S3, IAM security, VPC multi-tier networking, and high-availability architectures.",
      skills: ["VPC Design", "IAM Security", "S3 Storage", "EC2 & Lambda"],
    },
    {
      icon: CpuIcon,
      name: "Generative AI & Machine Learning",
      tag: "AI / ML",
      color: "#AD5CFF",
      desc: "Building real-world LLM apps, agentic workflows, and RAG pipelines using Amazon Bedrock, SageMaker, and Titan models.",
      skills: ["Amazon Bedrock", "RAG Workflows", "Vector DBs", "Prompt Engineering"],
    },
    {
      icon: TerminalIcon,
      name: "DevOps & Cloud Automation",
      tag: "CI / CD",
      color: "#F59E0B",
      desc: "Automating cloud provisioning with AWS CDK, Docker container orchestration with ECS & EKS, and GitHub Actions CI/CD.",
      skills: ["AWS CDK", "Docker & ECS", "CodePipeline", "Kubernetes"],
    },
    {
      icon: CodeCircleIcon,
      name: "Full Stack & Serverless Dev",
      tag: "APPLICATION DEV",
      color: "#10B981",
      desc: "Creating modern serverless applications with AWS Lambda, DynamoDB, API Gateway, and Next.js frontend architectures.",
      skills: ["AWS Lambda", "DynamoDB", "API Gateway", "Next.js & TypeScript"],
    },
    {
      icon: Rocket01Icon,
      name: "Buildathons & Open Source",
      tag: "COMPETITIONS",
      color: "#F43F5E",
      desc: "Organizing rapid cloud prototyping hackathons (including KIRO Buildathon), Ideathons, and student open-source contributions.",
      skills: ["Hackathons", "Ideation", "Rapid MVP", "Open Source"],
    },
    {
      icon: UserGroupIcon,
      name: "Community Operations & Outreach",
      tag: "COMMUNITY",
      color: "#8B5CF6",
      desc: "Managing events, sponsorships, social media campaigns, student mentorship cohorts, and cross-college collaborations.",
      skills: ["Event Ops", "Outreach", "PR & Media", "Mentorship"],
    },
  ];

  return (
    <section id="domains" className="relative py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-8 sm:mb-12"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          TECHNICAL DIVISIONS
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Club Domains & Specializations
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Members choose specialized tracks to build real production-grade cloud portfolios.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
        {domains.map((d, index) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/50 transition-all flex flex-col justify-between shadow-sm hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                <div
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${d.color}20`, color: d.color }}
                >
                  <HugeiconsIcon icon={d.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span
                  className="text-[8px] sm:text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase"
                  style={{
                    backgroundColor: `${d.color}15`,
                    borderColor: `${d.color}35`,
                    color: d.color,
                  }}
                >
                  {d.tag}
                </span>
              </div>

              <h3 className="text-xs sm:text-base font-extrabold text-slate-950 dark:text-white mb-1.5 sm:mb-2 leading-snug">
                {d.name}
              </h3>

              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-snug sm:leading-relaxed mb-3 sm:mb-6 font-normal line-clamp-3 sm:line-clamp-none">
                {d.desc}
              </p>
            </div>

            <div className="pt-2 sm:pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap gap-1">
              {d.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[8.5px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
