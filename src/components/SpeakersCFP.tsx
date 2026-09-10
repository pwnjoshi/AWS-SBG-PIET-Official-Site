"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Linkedin01Icon,
  Mic01Icon,
  SparklesIcon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";

export default function SpeakersCFP() {
  const mainSpeakers = [
    {
      name: "Praful Bagai",
      badge: "OPENING TECHNICAL KEYNOTE",
      badgeColor: "bg-[#FF9900]/15 border-[#FF9900]/30 text-[#FF9900]",
      roleTitle: "Head of Developer Relations – India & South Asia",
      company: "Amazon Web Services (AWS)",
      meta: ["Keynote Speaker", "Community Leader", "Founder"],
      linkedin: "https://www.linkedin.com/in/prafulbagai/",
      image: "/images/praful-bagai.jpg",
      glowColor: "from-[#FF9900]/20 via-[#FF9900]/5",
    },
    {
      name: "Lisa Bagley",
      badge: "COMMUNITY KEYNOTE SPEAKER",
      badgeColor: "bg-[#AD5CFF]/15 border-[#AD5CFF]/30 text-[#BE7BFF]",
      roleTitle: "Lead – Content, Education & Research",
      company: "AWS Community Groups",
      meta: ["Global AWS Lead", "Education & Research", "Keynote"],
      linkedin: "https://www.linkedin.com/in/lisa-bagley-0b16b47/",
      image: "/images/lisa-bagley.jpg",
      glowColor: "from-[#AD5CFF]/20 via-[#AD5CFF]/5",
    },
    {
      name: "Prof. Amit Dubey",
      badge: "SPECIAL KEYNOTE • CYBER & QUANTUM",
      badgeColor: "bg-rose-500/15 border-rose-500/30 text-rose-400",
      roleTitle: "Author & Cyber Security Evangelist",
      company: "Member, Police Technology Mission",
      meta: ["Cyber Security", "TEDx Speaker", "IIT KGP Alumnus"],
      linkedin: "https://www.linkedin.com/in/amitdubey77/",
      image: "/images/amit-dubey.jpg",
      glowColor: "from-rose-500/20 via-rose-500/5",
    },
  ];

  const technicalSpeakers = [
    {
      name: "Amit Kumar",
      track: "Cloud Architecture",
      trackTag: "Track A",
      company: "Amazon Web Services",
      role: "Senior Solutions Architect @ Amazon Web Services | Hybrid Cloud Specialist",
      linkedin: "https://www.linkedin.com/in/amitkyvmw/",
      image: "/images/amit-kumar.jpg",
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
      badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Manvendra Singh",
      track: "DevRel & Community",
      trackTag: "Session Speaker",
      company: "Rel-In-Dev & Ex-AWS SBGL",
      role: "Developer Advocate 🥑 | Ex-SBGL @ AWS SBG JECRC | Ex-AWS SBCL | Building @ Rel-In-Dev | Technical Writer",
      linkedin: "https://www.linkedin.com/in/manvendra-singh%F0%9F%A5%91-509836222/",
      image: "/images/manvendra-singh.jpg",
      badgeColor: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20",
    },
    {
      name: "Hardik Bandhiya",
      track: "Open Source & DevRel",
      trackTag: "Session Speaker",
      company: "NavraCoders & NavraGaming",
      role: "Founder - NavraCoders | AWS Student Builder Groups Leader | DevRel 🥑 | Open Source Chairperson",
      linkedin: "https://www.linkedin.com/in/bandhiya-hardik/",
      image: "/images/hardik-bandhiya.jpg",
      badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Pawan Joshi",
      track: "Cloud & AI Architecture",
      trackTag: "Session Speaker",
      company: "Tech Sangi",
      role: "Co-Founder Tech Sangi | AWS SBGL | 1x AWS, 1x Google, 1x MS | AWS AI/ML Scholar | AWS New Voices 2026",
      linkedin: "https://www.linkedin.com/in/pwnjoshi/",
      image: "/images/pawan-joshi.png",
      badgeColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
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
          Learn directly from distinguished AWS engineering leaders, enterprise architects, and innovative founders on 11 Sept 2026.
        </p>
      </motion.div>

      {/* ── Main Stage Keynote Speakers (3 Spotlight Cards) ── */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-center gap-2 mb-6">
          <HugeiconsIcon icon={Mic01Icon} className="h-4 w-4 text-[#FF9900]" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Keynote &amp; Main Stage Speakers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainSpeakers.map((speaker, idx) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[28px] bg-gradient-to-br from-[#0C1226] via-[#090D1E] to-[#050711] border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden text-white flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
            >
              {/* Ambient Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${speaker.glowColor} to-transparent blur-[80px] rounded-full pointer-events-none`} />

              <div>
                {/* Speaker Photo */}
                <div className="relative aspect-[4/4.2] w-full rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-xl bg-slate-800 mb-5">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-104 transition-transform duration-600 ease-out"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Keynote Pill */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${speaker.badgeColor} shadow-sm`}>
                      <HugeiconsIcon icon={Mic01Icon} className="h-3 w-3" />
                      <span>{speaker.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Speaker Info */}
                <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {speaker.name}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1 leading-snug">
                  {speaker.roleTitle}
                </p>
                <p className="text-xs font-bold text-[#FF9900] mt-0.5">
                  {speaker.company}
                </p>

                {/* Meta Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {speaker.meta.map((tag) => (
                    <span key={tag} className="text-[10.5px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connect Button */}
              <div className="pt-5 mt-4 border-t border-white/10">
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-[#0A66C2] text-white border border-white/15 hover:border-transparent text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group/btn active:scale-95"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4 text-[#0A66C2] group-hover/btn:text-white transition-colors" />
                  <span>Connect on LinkedIn</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Technical & Community Session Leaders Grid (5 Cards) ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Layers01Icon} className="h-4 w-4 text-[#8E35EA] dark:text-[#AD5CFF]" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Technical &amp; Session Leaders
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {technicalSpeakers.length} Session Specialists
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <div className="p-5">
                  <span className={`inline-block text-[10.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border mb-2 ${speaker.badgeColor}`}>
                    {speaker.track}
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-[#8E35EA] dark:group-hover:text-[#AD5CFF] transition-colors">
                    {speaker.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {speaker.role}
                  </p>
                </div>
              </div>

              {/* Card Footer Connect Button */}
              <div className="px-5 pb-5 pt-0">
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#0A66C2] dark:bg-white/[0.04] dark:hover:bg-[#0A66C2] text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 group/btn active:scale-95"
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