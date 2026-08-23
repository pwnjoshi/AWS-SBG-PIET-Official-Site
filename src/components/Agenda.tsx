"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Download01Icon,
  Search01Icon,
  Clock01Icon,
  Location01Icon,
  ArrowUpRight01Icon,
  Tick02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { AGENDA, EVENT_DETAILS } from "@/lib/data";

export default function Agenda() {
  const [activePhase, setActivePhase] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Time-of-day phases aligned with 9:00 AM – 5:00 PM schedule
  const phases = [
    { id: "all", label: "Full Day", time: "9:00 AM – 5:00 PM" },
    { id: "morning", label: "Morning Sessions", time: "9:00 AM – 1:00 PM" },
    { id: "afternoon", label: "Afternoon & Competitions", time: "1:00 PM – 5:00 PM" },
  ];

  // Helper to determine session phase
  const getSessionPhase = (timeStr: string) => {
    if (
      timeStr.includes("9:00") ||
      timeStr.includes("10:00") ||
      timeStr.includes("10:25") ||
      timeStr.includes("11:00") ||
      timeStr.includes("12:00")
    ) {
      return "morning";
    }
    return "afternoon";
  };

  // Color mapping based on badge type
  const getBadgeStyle = (badge?: string) => {
    if (!badge) return { color: "#AD5CFF", bg: "bg-[#AD5CFF]/10", border: "border-[#AD5CFF]/25", text: "text-[#8E35EA] dark:text-[#AD5CFF]" };
    if (badge.includes("Keynote") || badge.includes("Inauguration")) {
      return { color: "#AD5CFF", bg: "bg-purple-500/10", border: "border-purple-500/25", text: "text-purple-600 dark:text-[#BE7BFF]" };
    }
    if (badge.includes("Technical") || badge.includes("Deep Dives")) {
      return { color: "#0EA5E9", bg: "bg-sky-500/10", border: "border-sky-500/25", text: "text-sky-600 dark:text-sky-400" };
    }
    if (badge.includes("Competition") || badge.includes("Buildathon") || badge.includes("Ideathon")) {
      return { color: "#F43F5E", bg: "bg-rose-500/10", border: "border-rose-500/25", text: "text-rose-600 dark:text-rose-400" };
    }
    if (badge.includes("Labs") || badge.includes("Workshops")) {
      return { color: "#10B981", bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-600 dark:text-emerald-400" };
    }
    if (badge.includes("Lunch") || badge.includes("Expo")) {
      return { color: "#F59E0B", bg: "bg-amber-500/10", border: "border-amber-500/25", text: "text-amber-600 dark:text-amber-400" };
    }
    if (badge.includes("Panel")) {
      return { color: "#8B5CF6", bg: "bg-indigo-500/10", border: "border-indigo-500/25", text: "text-indigo-600 dark:text-indigo-400" };
    }
    return { color: "#AD5CFF", bg: "bg-[#AD5CFF]/10", border: "border-[#AD5CFF]/25", text: "text-[#8E35EA] dark:text-[#AD5CFF]" };
  };

  // Filtered sessions
  const filteredAgenda = useMemo(() => {
    return AGENDA.filter((item) => {
      const matchesPhase = activePhase === "all" || getSessionPhase(item.time) === activePhase;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.speaker && item.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPhase && matchesSearch;
    });
  }, [activePhase, searchQuery]);

  const handleDownloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AWS Student Builder Group PIET//AWS SCD 2026//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:aws-scd-panipat-2026@piet.co.in",
      "DTSTAMP:20260911T033000Z",
      "DTSTART:20260911T033000Z",
      "DTEND:20260911T113000Z",
      "SUMMARY:AWS Student Community Day Panipat 2026",
      "DESCRIPTION:Haryana's first-ever AWS Student Community Day. Keynotes by Praful Bagai, Technical Tracks by Amit Kumar, Chhavi Garg & Shivani Singh Vimal, KIRO Buildathon, Ideathon, and Tech Panel.",
      "LOCATION:70 Milestone, G.T. Road, Pattikalyana, Samalkha, Panipat, Haryana - 132102, India",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "AWS-SCD-Panipat-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AWS+Student+Community+Day+Panipat+2026&dates=20260911T033000Z/20260911T113000Z&details=Haryana's+first-ever+AWS+Student+Community+Day.+Keynotes+by+Praful+Bagai%2C+Technical+Tracks+by+Amit+Kumar%2C+Chhavi+Garg+%26+Shivani+Singh+Vimal%2C+KIRO+Buildathon%2C+Ideathon%2C+and+Tech+Panel.&location=70+Milestone%2C+G.T.+Road%2C+Pattikalyana%2C+Samalkha%2C+Panipat%2C+Haryana+-+132102`;

  return (
    <section id="agenda" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
            EVENT SCHEDULE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            Event Day Schedule
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Friday, 11 September 2026 • 9:00 AM – 5:00 PM IST • PIET Campus Panipat (Offline)
          </p>
        </div>

        {/* Action Controls: Export Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02] cursor-pointer"
          >
            <HugeiconsIcon icon={Calendar03Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF]" />
            <span>Add to Google Cal</span>
          </a>
          <button
            onClick={handleDownloadICS}
            className="px-3.5 py-2 rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02] cursor-pointer"
          >
            <HugeiconsIcon icon={Download01Icon} className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
            <span>.ics Export</span>
          </button>
        </div>
      </motion.div>

      {/* Interactive Phase Bar & Search Widget */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-10 p-2 rounded-2xl bg-white dark:bg-[#080D1E] border border-slate-200/90 dark:border-white/[0.08] shadow-sm"
      >
        {/* Segmented Phase Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 scrollbar-none">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activePhase === phase.id
                  ? "bg-[#AD5CFF] text-white shadow-md shadow-[#AD5CFF]/25 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              }`}
            >
              <span>{phase.label}</span>
              {phase.id !== "all" && (
                <span className="text-[10px] opacity-80 hidden md:inline font-mono">
                  ({phase.time})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Real-time Session Search Box */}
        <div className="relative sm:w-72 shrink-0 px-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Praful, Bedrock, Buildathon..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#AD5CFF] focus:outline-none transition-colors"
          />
        </div>
      </motion.div>

      {/* Main Responsive Timeline */}
      <div className="relative">
        {/* Connected Vertical Spine Line (Desktop) */}
        <div className="hidden md:block absolute left-[150px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#AD5CFF]/40 via-slate-200 dark:via-white/10 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredAgenda.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/[0.08]">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  No scheduled sessions found matching &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActivePhase("all");
                  }}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-xs font-semibold text-[#8E35EA] dark:text-[#AD5CFF] hover:underline"
                >
                  Clear filter & view all
                </button>
              </div>
            ) : (
              filteredAgenda.map((item, index) => {
                const badgeStyle = getBadgeStyle(item.badge);

                return (
                  <motion.div
                    key={item.time + item.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group relative md:grid md:grid-cols-12 gap-6 items-start"
                  >
                    {/* Left Column: Desktop Time Badge & Connector Node */}
                    <div className="hidden md:flex md:col-span-3 flex-col items-end pt-5 text-right pr-6 relative">
                      {/* Timeline Dot Node */}
                      <div
                        className="absolute -right-[7px] top-[26px] h-3.5 w-3.5 rounded-full border-2 border-white dark:border-[#05070E] shadow-sm transition-transform group-hover:scale-125 duration-200"
                        style={{ backgroundColor: badgeStyle.color }}
                      />
                      <span className="text-xs font-mono font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {item.time.split("–")[0]?.trim()}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                        to {item.time.split("–")[1]?.trim() || "End"}
                      </span>
                    </div>

                    {/* Right Column: High-End Session Card */}
                    <div className="md:col-span-9">
                      <div
                        className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 border shadow-sm ${
                          item.highlight
                            ? "bg-purple-50/40 dark:bg-[#0B0E24] border-[#AD5CFF]/40 shadow-md shadow-purple-500/5 dark:shadow-[#AD5CFF]/10 hover:border-[#AD5CFF]"
                            : "bg-white dark:bg-[#090E1E] border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/40 dark:hover:border-white/20 hover:shadow-md"
                        }`}
                      >
                        {/* Mobile Time Stamp Header */}
                        <div className="md:hidden flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-white/[0.06]">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 dark:text-white">
                            <HugeiconsIcon icon={Clock01Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF]" />
                            <span>{item.time}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Desktop Header Row: Badges & Venue */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span
                                className={`hidden md:inline-flex text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
                              >
                                {item.badge}
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-md">
                              {item.track}
                            </span>
                          </div>

                          {/* Venue Location Chip */}
                          <div className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-300">
                            <HugeiconsIcon icon={Location01Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug my-1 group-hover:text-[#8E35EA] dark:group-hover:text-white transition-colors">
                          {item.title}
                        </h3>

                        {/* Speaker (if applicable) */}
                        {item.speaker && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8E35EA] dark:text-[#BE7BFF] mt-1 mb-2">
                            <HugeiconsIcon icon={UserIcon} className="h-3.5 w-3.5" />
                            <span>Speaker:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{item.speaker}</span>
                          </div>
                        )}

                        {/* Details Paragraph */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2 font-normal">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
