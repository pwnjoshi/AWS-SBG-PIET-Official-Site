"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { TRACKS } from "@/lib/data";

interface LearningTracksProps {
  onOpenTickets: () => void;
}

export default function LearningTracks({ onOpenTickets }: LearningTracksProps) {
  const [selectedTrackId, setSelectedTrackId] = useState<string>("gen-ai-aws");
  const selectedTrack = TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[1];

  return (
    <section id="tracks" className="relative pt-6 sm:pt-10 pb-14 sm:pb-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 overflow-hidden sm:overflow-visible">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-8 sm:mb-12"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          TECHNICAL TRACKS
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          6 specialized tracks for every cloud builder
        </h2>
        <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Select a track below to explore curriculum, hands-on build goals, and architectural deep-dives.
        </p>
      </motion.div>

      {/* Track Selector Tabs - Mobile First Responsive Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-6 w-full"
      >
        {TRACKS.map((track) => {
          const isSelected = track.id === selectedTrackId;

          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setSelectedTrackId(track.id)}
              className={`w-full rounded-2xl p-2.5 sm:p-3.5 text-left transition-all duration-200 border flex flex-col justify-between cursor-pointer active:scale-[0.98] ${
                isSelected
                  ? "bg-[#8E35EA] dark:bg-[#AD5CFF] text-white border-[#8E35EA] dark:border-[#AD5CFF] shadow-md shadow-purple-500/20"
                  : "bg-white dark:bg-[#090E1E] border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/15 text-slate-900 dark:text-white"
              }`}
            >
              <span className={`font-mono text-[9px] sm:text-xs font-bold mb-0.5 sm:mb-1 block ${isSelected ? "text-white/90" : "text-[#8E35EA] dark:text-[#AD5CFF]"}`}>
                TRACK {track.number}
              </span>
              <h4 className="text-[11px] sm:text-xs font-bold leading-snug line-clamp-2">
                {track.title}
              </h4>
            </button>
          );
        })}
      </motion.div>

      {/* Detailed Card with Animated Transition */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/10 p-4 sm:p-8 shadow-sm overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTrack.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
          >
            {/* Left Column: Track Details */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-semibold text-[#8E35EA] dark:text-[#BE7BFF] bg-[#AD5CFF]/15 border border-[#AD5CFF]/30 px-2.5 py-0.5 sm:py-1 rounded-full inline-block mb-2 sm:mb-3">
                  Track {selectedTrack.number} • Hands-on Workshop
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-950 dark:text-white break-words">
                  {selectedTrack.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedTrack.tagline}
                </p>
              </div>

              {/* Curriculum Checklist */}
              <div className="space-y-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Curriculum &amp; Build Goals:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTrack.topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.05]"
                    >
                      <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 mr-1">Skills:</span>
                {selectedTrack.skillsGained.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenTickets}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Register for Track {selectedTrack.number}</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: High-End Custom Visual Artwork Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative rounded-2xl bg-slate-950 dark:bg-[#04060E] border border-slate-800 dark:border-white/15 p-6 overflow-hidden shadow-2xl shadow-slate-900/30 dark:shadow-black/80 flex flex-col justify-between min-h-[340px] group text-white">
                {/* Subtle background glow */}
                <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#AD5CFF]/20 blur-[90px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-[#8E35EA]/15 blur-[90px] rounded-full pointer-events-none" />

                {/* Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10">
                  <span className="text-[10px] font-mono font-bold text-[#BE7BFF] uppercase tracking-widest">
                    TRACK 0{selectedTrack.number.replace(/^0+/, "")} ARCHITECTURE
                  </span>
                </div>

                {/* Graphic Visual Representation based on selected track */}
                <div className="py-6 flex flex-col items-center justify-center relative z-10">
                  {selectedTrack.id === "cloud-foundations" && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <svg viewBox="0 0 260 140" className="w-full max-w-[240px] h-auto drop-shadow-[0_10px_25px_rgba(173,92,255,0.25)]">
                        <defs>
                          <linearGradient id="cfGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#AD5CFF" />
                            <stop offset="100%" stopColor="#5E17EB" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="20" width="220" height="100" rx="14" fill="#0A0F24" stroke="rgba(173, 92, 255, 0.4)" strokeWidth="1.5" />
                        <rect x="35" y="35" width="50" height="40" rx="8" fill="#131B3A" stroke="#AD5CFF" strokeWidth="1" />
                        <text x="60" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">EC2</text>
                        <rect x="105" y="35" width="50" height="40" rx="8" fill="#131B3A" stroke="#BE7BFF" strokeWidth="1" />
                        <text x="130" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">S3</text>
                        <rect x="175" y="35" width="50" height="40" rx="8" fill="#131B3A" stroke="#AD5CFF" strokeWidth="1" />
                        <text x="200" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">IAM</text>
                        <path d="M60 75 L60 100 L200 100 L200 75" stroke="#AD5CFF" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.8" />
                        <circle cx="130" cy="100" r="4" fill="#BE7BFF" />
                      </svg>
                      <span className="text-xs font-mono font-bold text-slate-200">
                        Core AWS Cloud VPC & Multi-AZ Infrastructure
                      </span>
                    </div>
                  )}

                  {selectedTrack.id === "gen-ai-aws" && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <svg viewBox="0 0 260 140" className="w-full max-w-[240px] h-auto drop-shadow-[0_10px_25px_rgba(173,92,255,0.3)]">
                        <circle cx="130" cy="70" r="32" fill="#151238" stroke="#AD5CFF" strokeWidth="2" />
                        <text x="130" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">BEDROCK</text>
                        <circle cx="50" cy="40" r="16" fill="#0A0F24" stroke="#BE7BFF" strokeWidth="1" />
                        <text x="50" y="44" textAnchor="middle" fill="#BE7BFF" fontSize="8">Claude</text>
                        <circle cx="50" cy="100" r="16" fill="#0A0F24" stroke="#BE7BFF" strokeWidth="1" />
                        <text x="50" y="104" textAnchor="middle" fill="#BE7BFF" fontSize="8">Llama</text>
                        <circle cx="210" cy="70" r="20" fill="#0A0F24" stroke="#AD5CFF" strokeWidth="1" />
                        <text x="210" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="8">RAG</text>
                        <line x1="66" y1="46" x2="100" y2="60" stroke="#AD5CFF" strokeWidth="1.5" />
                        <line x1="66" y1="94" x2="100" y2="80" stroke="#AD5CFF" strokeWidth="1.5" />
                        <line x1="162" y1="70" x2="190" y2="70" stroke="#AD5CFF" strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                      <span className="text-xs font-mono font-bold text-slate-200">
                        Amazon Bedrock • Foundation Models & RAG
                      </span>
                    </div>
                  )}

                  {selectedTrack.id === "devops-iac" && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <svg viewBox="0 0 260 140" className="w-full max-w-[240px] h-auto drop-shadow-[0_10px_25px_rgba(173,92,255,0.25)]">
                        <rect x="25" y="45" width="55" height="50" rx="10" fill="#10142C" stroke="#AD5CFF" strokeWidth="1.5" />
                        <text x="52" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">CDK</text>
                        <path d="M80 70 L105 70" stroke="#BE7BFF" strokeWidth="2" markerEnd="url(#arrow)" />
                        <rect x="105" y="45" width="55" height="50" rx="10" fill="#10142C" stroke="#AD5CFF" strokeWidth="1.5" />
                        <text x="132" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">CI/CD</text>
                        <path d="M160 70 L185 70" stroke="#BE7BFF" strokeWidth="2" />
                        <rect x="185" y="45" width="55" height="50" rx="10" fill="#10142C" stroke="#AD5CFF" strokeWidth="1.5" />
                        <text x="212" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">ECS</text>
                      </svg>
                      <span className="text-xs font-mono font-bold text-slate-200">
                        Automated AWS CDK & Container Pipelines
                      </span>
                    </div>
                  )}

                  {selectedTrack.id === "hands-on-labs" && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <svg viewBox="0 0 260 140" className="w-full max-w-[240px] h-auto drop-shadow-[0_10px_25px_rgba(173,92,255,0.25)]">
                        <rect x="30" y="25" width="200" height="90" rx="12" fill="#0C1028" stroke="#AD5CFF" strokeWidth="1.5" />
                        <rect x="45" y="40" width="170" height="60" rx="6" fill="#05070E" />
                        <circle cx="55" cy="50" r="3" fill="#FF5F56" />
                        <circle cx="65" cy="50" r="3" fill="#FFBD2E" />
                        <circle cx="75" cy="50" r="3" fill="#27C93F" />
                        <text x="55" y="72" fill="#BE7BFF" fontSize="9" fontFamily="monospace">$ aws start-lab --track 04</text>
                        <text x="55" y="88" fill="#34D399" fontSize="8" fontFamily="monospace">✓ Sandbox Connected: Active</text>
                      </svg>
                      <span className="text-xs font-mono font-bold text-slate-200">
                        Interactive Live CloudLab Sandbox
                      </span>
                    </div>
                  )}

                  {selectedTrack.id === "career-certifications" && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <svg viewBox="0 0 260 140" className="w-full max-w-[240px] h-auto drop-shadow-[0_10px_25px_rgba(173,92,255,0.3)]">
                        <polygon points="130,20 180,45 180,95 130,120 80,95 80,45" fill="#131038" stroke="#AD5CFF" strokeWidth="2" />
                        <text x="130" y="65" textAnchor="middle" fill="#BE7BFF" fontSize="10" fontWeight="bold">AWS</text>
                        <text x="130" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">CERTIFIED</text>
                        <circle cx="130" cy="98" r="4" fill="#34D399" />
                      </svg>
                      <span className="text-xs font-mono font-bold text-slate-200">
                        Solutions Architect & Developer Roadmap
                      </span>
                    </div>
                  )}

                  {selectedTrack.id === "student-showcase" && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <svg viewBox="0 0 260 140" className="w-full max-w-[240px] h-auto drop-shadow-[0_10px_25px_rgba(173,92,255,0.3)]">
                        <polygon points="130,25 145,65 190,65 155,90 170,130 130,105 90,130 105,90 70,65 115,65" fill="#18113E" stroke="#AD5CFF" strokeWidth="1.5" />
                        <circle cx="130" cy="78" r="14" fill="#AD5CFF" />
                        <text x="130" y="82" textAnchor="middle" fill="#04060E" fontSize="9" fontWeight="bold">#1</text>
                      </svg>
                      <span className="text-xs font-mono font-bold text-slate-200">
                        Campus Builder Innovation Awards
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Footer Info */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400 relative z-10">
                  <span>AWS AP-SOUTH-1 (MUMBAI)</span>
                  <span className="text-[#BE7BFF] font-bold">100% HANDS-ON</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
