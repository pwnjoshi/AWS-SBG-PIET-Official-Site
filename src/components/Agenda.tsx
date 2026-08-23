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
  ArrowDown01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { AGENDA } from "@/lib/data";

export default function Agenda() {
  const [activePhase, setActivePhase] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({});

  const toggleSession = (key: string) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAll = () => {
    const allExpanded = filteredAgenda.every((item) => expandedSessions[item.time + item.title]);
    const newState: Record<string, boolean> = {};
    filteredAgenda.forEach((item) => {
      newState[item.time + item.title] = !allExpanded;
    });
    setExpandedSessions(newState);
  };

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

  const isAllExpanded = filteredAgenda.length > 0 && filteredAgenda.every((item) => expandedSessions[item.time + item.title]);

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
        <div className="max-w-2xl">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
            SUMMIT ITINERARY • 11 SEPT 2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Schedule &amp; Session Timeline
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Full 1-day itinerary spanning AWS keynotes, technical tracks, KIRO Buildathon, and networking expo.
          </p>
        </div>

        {/* Action Buttons: Add to Cal & Expand All */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleAll}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            {isAllExpanded ? "Collapse All" : "Expand All"}
          </button>

          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={Calendar03Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF]" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={handleDownloadICS}
            type="button"
            className="px-3.5 py-2 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <HugeiconsIcon icon={Download01Icon} className="h-3.5 w-3.5" />
            <span>.ICS File</span>
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.06] overflow-x-auto">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                activePhase === phase.id
                  ? "bg-[#8E35EA] dark:bg-[#AD5CFF] text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {phase.shortLabel}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <HugeiconsIcon icon={Search01Icon} className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sessions or speakers..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#8E35EA] dark:focus:border-[#AD5CFF] transition-colors"
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative">
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
                const sessionKey = item.time + item.title;
                const isExpanded = !!expandedSessions[sessionKey];
                const badgeStyle = getBadgeStyle(item.badge);

                return (
                  <motion.div
                    key={sessionKey}
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

                    {/* Right Session App Card (Expandable Accordion) */}
                    <div className="md:col-span-9 w-full">
                      <div
                        className={`rounded-2xl p-4 sm:p-5 transition-all duration-200 border shadow-sm w-full overflow-hidden cursor-pointer ${
                          item.highlight
                            ? "bg-purple-50/40 dark:bg-[#0C0F28] border-[#AD5CFF]/40 shadow-md shadow-purple-500/5 dark:shadow-[#AD5CFF]/10"
                            : "bg-white dark:bg-[#090E1E] border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/30"
                        }`}
                        onClick={() => toggleSession(sessionKey)}
                      >
                        {/* Mobile App Time Bar & Category Header */}
                        <div className="flex items-center justify-between gap-1.5 mb-2 pb-2 border-b border-slate-100 dark:border-white/[0.06] w-full">
                          {/* Time with Clock */}
                          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold text-slate-900 dark:text-white shrink-0">
                            <HugeiconsIcon icon={Clock01Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0" />
                            <span>{item.time}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Category Badge */}
                            {item.badge && (
                              <span
                                className={`text-[8px] sm:text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase truncate max-w-[130px] sm:max-w-none ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
                              >
                                {item.badge}
                              </span>
                            )}

                            {/* Accordion Chevron Icon */}
                            <div className="p-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400">
                              <HugeiconsIcon
                                icon={isExpanded ? ArrowUp01Icon : ArrowDown01Icon}
                                className="h-3 w-3 transition-transform"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Session Title */}
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug my-1 group-hover:text-[#8E35EA] dark:group-hover:text-[#BE7BFF] transition-colors break-words">
                          {item.title}
                        </h3>

                        {/* Speaker & Venue Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2 w-full">
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

                        {/* Animated Expandable Details Section */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden pt-3 mt-3 border-t border-slate-100 dark:border-white/[0.06]"
                            >
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal break-words">
                                {item.details}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
