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
  UserIcon,
} from "@hugeicons/core-free-icons";
import { AGENDA } from "@/lib/data";

export default function Agenda() {
  const [activePhase, setActivePhase] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Clean time phases aligned with 9:00 AM – 5:00 PM schedule
  const phases = [
    { id: "all", label: "All Sessions", shortLabel: "All (10)" },
    { id: "morning", label: "Morning Keynotes", shortLabel: "Morning" },
    { id: "afternoon", label: "Labs & Buildathon", shortLabel: "Afternoon" },
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
      "LOCATION:Panipat Institute of Engineering & Technology, NH-44, Samalkha, Panipat, Haryana 132102",
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

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AWS+Student+Community+Day+Panipat+2026&dates=20260911T033000Z/20260911T113000Z&details=Haryana's+first-ever+AWS+Student+Community+Day.+Keynotes+by+Praful+Bagai%2C+Technical+Tracks+by+Amit+Kumar%2C+Chhavi+Garg+%26+Shivani+Singh+Vimal%2C+KIRO+Buildathon%2C+Ideathon%2C+and+Tech+Panel.&location=Panipat+Institute+of+Engineering+%26+Technology%2C+NH-44%2C+Samalkha%2C+Panipat%2C+Haryana+132102`;

  return (
    <section id="agenda" className="relative py-14 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 w-full overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-12 w-full"
      >
        <div className="w-full sm:w-auto">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
            EVENT TIMELINE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Summit Schedule
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Friday, 11 September 2026 • 9:00 AM – 5:00 PM • PIET Panipat
          </p>
        </div>

        {/* Action Controls: 2-Column Grid on Mobile (No overflow) */}
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center shrink-0">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl sm:rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer text-center truncate"
          >
            <HugeiconsIcon icon={Calendar03Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0" />
            <span className="truncate">Google Cal</span>
          </a>
          <button
            onClick={handleDownloadICS}
            className="py-2.5 px-3 rounded-xl sm:rounded-full bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer text-center truncate"
          >
            <HugeiconsIcon icon={Download01Icon} className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
            <span className="truncate">Export .ICS</span>
          </button>
        </div>
      </motion.div>

      {/* Interactive Phase Bar & Search Widget (Zero Overflow App Card) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="w-full rounded-2xl bg-white/90 dark:bg-[#080D1E]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/[0.08] p-2 mb-6 sm:mb-8 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 overflow-hidden"
      >
        {/* Horizontal Segmented Phase Switcher */}
        <div className="grid grid-cols-3 gap-1 p-0.5 sm:flex sm:items-center sm:gap-1.5 w-full sm:w-auto">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`py-2 px-2.5 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all text-center cursor-pointer active:scale-95 truncate ${
                activePhase === phase.id
                  ? "bg-[#AD5CFF] text-white shadow-md shadow-[#AD5CFF]/30 font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              }`}
            >
              <span className="sm:hidden">{phase.shortLabel}</span>
              <span className="hidden sm:inline">{phase.label}</span>
            </button>
          ))}
        </div>

        {/* Real-time Session Search Box */}
        <div className="relative w-full sm:w-64 shrink-0">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter sessions..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#AD5CFF] focus:outline-none transition-colors"
          />
        </div>
      </motion.div>

      {/* Main Timeline List */}
      <div className="relative w-full overflow-hidden">
        {/* Vertical Connected Timeline Spine (Desktop Only) */}
        <div className="hidden md:block absolute left-[150px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#AD5CFF]/40 via-slate-200 dark:via-white/10 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase + searchQuery}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 sm:space-y-4 w-full"
          >
            {filteredAgenda.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/[0.08]">
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  No sessions match &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActivePhase("all");
                  }}
                  className="mt-2.5 px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-xs font-bold text-[#8E35EA] dark:text-[#AD5CFF]"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredAgenda.map((item, index) => {
                const badgeStyle = getBadgeStyle(item.badge);

                return (
                  <motion.div
                    key={item.time + item.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="group relative md:grid md:grid-cols-12 gap-6 items-start w-full"
                  >
                    {/* Left Desktop Time Stamp */}
                    <div className="hidden md:flex md:col-span-3 flex-col items-end pt-5 text-right pr-6 relative">
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

                    {/* Right Session App Card (Strictly width-bounded) */}
                    <div className="md:col-span-9 w-full">
                      <div
                        className={`rounded-2xl p-4 sm:p-6 transition-all duration-200 border shadow-sm w-full overflow-hidden ${
                          item.highlight
                            ? "bg-purple-50/50 dark:bg-[#0C0F28] border-[#AD5CFF]/40 shadow-md shadow-purple-500/5 dark:shadow-[#AD5CFF]/10"
                            : "bg-white dark:bg-[#090E1E] border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/30"
                        }`}
                      >
                        {/* Mobile App Time Bar & Category Header */}
                        <div className="flex items-center justify-between gap-1.5 mb-2 pb-2 border-b border-slate-100 dark:border-white/[0.06] w-full">
                          {/* Time with Clock */}
                          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold text-slate-900 dark:text-white shrink-0">
                            <HugeiconsIcon icon={Clock01Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0" />
                            <span>{item.time}</span>
                          </div>

                          {/* Category Badge */}
                          {item.badge && (
                            <span
                              className={`text-[8px] sm:text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase truncate max-w-[130px] sm:max-w-none ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Session Title */}
                        <h3 className="text-sm sm:text-lg font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug my-1 group-hover:text-[#8E35EA] dark:group-hover:text-[#BE7BFF] transition-colors break-words">
                          {item.title}
                        </h3>

                        {/* Speaker & Venue Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2 mb-2 w-full">
                          {item.speaker && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#AD5CFF]/10 text-[#8E35EA] dark:text-[#BE7BFF] text-[10px] sm:text-[11px] font-bold shrink-0">
                              <HugeiconsIcon icon={UserIcon} className="h-3 w-3 shrink-0" />
                              <span className="truncate max-w-[140px] sm:max-w-none">{item.speaker}</span>
                            </div>
                          )}

                          <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-md truncate max-w-full">
                            <HugeiconsIcon icon={Location01Icon} className="h-3 w-3 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>

                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
                            • {item.track}
                          </span>
                        </div>

                        {/* Details Paragraph */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal break-words">
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
