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

import Image from "next/image";

interface SpeakersCFPProps {
  onOpenCFP: () => void;
}

export default function SpeakersCFP({ onOpenCFP }: SpeakersCFPProps) {
  const keynoteSpeaker = {
    name: "Praful Bagai",
    role: "Head of Developer Relations – India & South Asia at Amazon Web Services (AWS) | Speaker • Community Builder • Founder",
    badge: "OPENING KEYNOTE SPEAKER",
    linkedin: "https://www.linkedin.com/in/prafulbagai/",
    image: "/images/praful-bagai.jpg",
  };

  const technicalSpeakers = [
    {
      name: "Amit Kumar",
      role: "Senior Solutions Architect @ Amazon Web Services | Hybrid Cloud Specialist",
      track: "Track A • Cloud Architecture",
      linkedin: "https://www.linkedin.com/in/amitkyvmw/",
      image: "/images/amit-kumar.png",
      initials: "AK",
      accent: "#0EA5E9",
    },
    {
      name: "Chhavi Garg",
      role: "Founder @ BharatXR & @ Arexa | Snapchat AR Partner | XR & AI Specialist",
      track: "Track B • Generative AI & ML",
      linkedin: "https://www.linkedin.com/in/chhavigg/",
      image: "/images/chhavi-garg.png",
      initials: "CG",
      accent: "#C084FC",
    },
    {
      name: "Shivani Singh Vimal",
      role: "Founder, Altiora French Academy | French Language Trainer | DELF • TEF Exam Coach | Career Mentor",
      track: "Track C • Career & Mentorship",
      linkedin: "https://www.linkedin.com/in/shivani-singh-vimal-438449267/",
      image: "/images/shivani-singh-vimal.png",
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
        className="max-w-2xl mb-8 sm:mb-12"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          KEYNOTE &amp; TECHNICAL SESSIONS
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Featured Speakers &amp; Industry Leaders
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Learn directly from distinguished AWS community architects and engineering practitioners on 11 Sept 2026.
        </p>
      </motion.div>

      {/* Main Keynote Spotlight Card — Praful Bagai */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-slate-900 dark:bg-[#070B1A] border border-[#AD5CFF]/40 p-6 sm:p-8 shadow-xl shadow-purple-500/10 mb-10 sm:mb-14 overflow-hidden text-white"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#AD5CFF]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 text-center sm:text-left w-full md:w-auto">
            {/* Keynote Photo Portrait - Large & Commanding */}
            <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 border-2 border-white/25 shrink-0 bg-slate-800">
              <Image
                src={keynoteSpeaker.image}
                alt={keynoteSpeaker.name}
                fill
                sizes="(max-width: 768px) 144px, 176px"
                className="object-cover object-center"
                priority
              />
            </div>

            <div>
              {/* Refined Premium Keynote Pill */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-[#BE7BFF] text-[10.5px] font-mono font-bold tracking-widest uppercase border border-[#AD5CFF]/40 mb-2.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#AD5CFF]"></span>
                </span>
                <HugeiconsIcon icon={Mic01Icon} className="h-3.5 w-3.5 text-[#AD5CFF]" />
                <span>{keynoteSpeaker.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {keynoteSpeaker.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-purple-200/90 mt-1 max-w-xl leading-relaxed">
                {keynoteSpeaker.role}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-center md:justify-end shrink-0">
            <a
              href={keynoteSpeaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 shrink-0"
            >
              <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />
              <span>Connect</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Technical Session Speakers 3-Column Grid */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 mb-6">
          <HugeiconsIcon icon={Layers01Icon} className="h-4 w-4 text-[#8E35EA] dark:text-[#AD5CFF]" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Technical Session Leaders
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {technicalSpeakers.map((speaker, idx) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/50 overflow-hidden flex flex-col justify-between shadow-sm transition-all group hover:shadow-xl"
            >
              <div>
                {/* Full Uncropped Portrait Photo Container */}
                <div className="relative aspect-[4/4.5] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
                      style={{
                        background: `radial-gradient(circle at 50% 40%, ${speaker.accent}35 0%, rgba(10,14,30,0.95) 75%)`,
                      }}
                    >
                      <div
                        className="h-20 w-20 rounded-2xl flex items-center justify-center font-mono font-black text-2xl text-white shadow-xl border border-white/20"
                        style={{ backgroundColor: speaker.accent }}
                      >
                        {speaker.initials}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 bg-slate-50/50 dark:bg-white/[0.02]">
                  <h4 className="text-lg font-black text-slate-950 dark:text-white group-hover:text-[#8E35EA] dark:group-hover:text-[#BE7BFF] transition-colors mb-1">
                    {speaker.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-snug">
                    {speaker.role}
                  </p>
                </div>
              </div>

              {/* Bottom Connect Button */}
              <div className="p-4 sm:p-5 pt-0 bg-slate-50/50 dark:bg-white/[0.02]">
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] text-slate-800 dark:text-white hover:text-white dark:hover:text-white border border-slate-200/80 dark:border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-sm active:scale-95"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4 text-[#0A66C2] group-hover/btn:text-white transition-colors" />
                  <span>Connect</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                </a>
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

