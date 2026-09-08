"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Linkedin01Icon,
  Mic01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";

export default function SpeakersCFP() {
  const keynoteSpeaker = {
    name: "Praful Bagai",
    badge: "OPENING KEYNOTE SPEAKER",
    company: "Amazon Web Services (AWS)",
    roleTitle: "Head of Developer Relations – India & South Asia",
    meta: "Speaker • Community Builder • Founder",
    linkedin: "https://www.linkedin.com/in/prafulbagai/",
    image: "/images/praful-bagai.jpg",
  };

  const technicalSpeakers = [
    {
      name: "Amit Kumar",
      track: "Cloud Architecture",
      trackTag: "Track A",
      company: "Amazon Web Services",
      role: "Senior Solutions Architect @ Amazon Web Services | Hybrid Cloud Specialist",
      linkedin: "https://www.linkedin.com/in/amitkyvmw/",
      image: "/images/amit-kumar.jpg",
      accent: "#0284C7",
      badgeColor: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      name: "Chhavi Garg",
      track: "Generative AI & XR",
      trackTag: "Track B",
      company: "BharatXR & Arexa",
      role: "Founder @ BharatXR & @ Arexa | Snapchat AR Partner | XR & AI Specialist",
      linkedin: "https://www.linkedin.com/in/chhavigg/",
      image: "/images/chhavi-garg.jpg",
      accent: "#9333EA",
      badgeColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      name: "Shivani Singh Vimal",
      track: "Global Career & Mentorship",
      trackTag: "Track C",
      company: "Altiora French Academy",
      role: "Founder, Altiora French Academy | French Language Trainer | DELF • TEF Coach | Career Mentor",
      linkedin: "https://www.linkedin.com/in/shivani-singh-vimal-438449267/",
      image: "/images/shivani-singh-vimal.jpg",
      accent: "#059669",
      badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Prof. Amit Dubey",
      track: "Cyber Security & Quantum",
      trackTag: "Special Session",
      company: "Police Technology Mission",
      role: "Author & Cyber Security Evangelist | TEDx Speaker | Chevening Fellow | Quantum Researcher",
      linkedin: "https://www.linkedin.com/in/amitdubey77/",
      image: "/images/amit-dubey.jpg",
      accent: "#E11D48",
      badgeColor: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <section id="speakers" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-10 sm:mb-14"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E35EA]/10 dark:bg-[#AD5CFF]/15 border border-[#8E35EA]/20 dark:border-[#AD5CFF]/25 text-[#8E35EA] dark:text-[#AD5CFF] text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
          <HugeiconsIcon icon={SparklesIcon} className="h-3 w-3" />
          <span>OFFICIAL SUMMIT FACULTY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Featured Speakers
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Learn directly from distinguished AWS engineering leaders, enterprise architects, and innovative founders.
        </p>
      </motion.div>

      {/* ── Opening Keynote Speaker Hero Card (Praful Bagai) ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#0C1226] via-[#090D1E] to-[#050711] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl mb-12 sm:mb-16 overflow-hidden text-white group"
      >
        {/* Ambient Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-[#FF9900]/15 via-[#8E35EA]/15 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-[#0A66C2]/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 sm:gap-8 lg:gap-10">
          {/* Left: Speaker Portrait */}
          <div className="relative shrink-0 flex flex-col items-center sm:items-start">
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56 rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-black/50 bg-slate-800">
              <Image
                src={keynoteSpeaker.image}
                alt={keynoteSpeaker.name}
                fill
                sizes="(max-width: 768px) 208px, 224px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Middle: Details & Bio */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left min-w-0">
            {/* Keynote Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9900]/15 border border-[#FF9900]/30 text-[#FF9900] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase mb-3 self-center md:self-start">
              <HugeiconsIcon icon={Mic01Icon} className="h-3 w-3" />
              <span>{keynoteSpeaker.badge}</span>
            </div>

            {/* Speaker Name */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {keynoteSpeaker.name}
            </h3>

            {/* Role & Org */}
            <p className="text-sm sm:text-base font-semibold text-slate-200 mt-1.5 leading-snug">
              {keynoteSpeaker.roleTitle}
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#FF9900] mt-0.5">
              {keynoteSpeaker.company}
            </p>

            {/* Meta Tags */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-lg">
                Speaker
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-lg">
                Community Builder
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-lg">
                Founder
              </span>
            </div>
          </div>

          {/* Right: Connect Button */}
          <div className="flex items-center justify-center md:justify-end shrink-0 w-full md:w-auto">
            <a
              href={keynoteSpeaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl bg-white/[0.06] hover:bg-[#0A66C2] text-white border border-white/15 hover:border-transparent text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 active:scale-95 group/btn"
            >
              <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4 text-[#0A66C2] group-hover/btn:text-white transition-colors" />
              <span>Connect on LinkedIn</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Technical Session Leaders Grid (4 Cards) ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Technical Session Leaders
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            4 Industry Specialists
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {technicalSpeakers.map((speaker, idx) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/[0.08] hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl dark:hover:shadow-purple-500/5"
            >
              <div>
                {/* Photo Container */}
                <div className="relative aspect-[4/4.2] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-104 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Track Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-white border border-white/15 shadow-sm">
                      {speaker.trackTag}
                    </span>
                  </div>
                </div>

                {/* Details Container */}
                <div className="p-4 sm:p-5">
                  <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border mb-2 ${speaker.badgeColor}`}>
                    {speaker.track}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-[#8E35EA] dark:group-hover:text-[#AD5CFF] transition-colors">
                    {speaker.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {speaker.role}
                  </p>
                </div>
              </div>

              {/* Card Footer Connect Button */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#0A66C2] dark:bg-white/[0.04] dark:hover:bg-[#0A66C2] text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 group/btn active:scale-95"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} className="h-3.5 w-3.5 text-[#0A66C2] group-hover/btn:text-white transition-colors" />
                  <span>Connect</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}