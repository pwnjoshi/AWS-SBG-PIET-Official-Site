"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Download01Icon,
  Location01Icon,
  UserIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
} from "@hugeicons/core-free-icons";
import { AGENDA } from "@/lib/data";

const getBadgeColor = (badge?: string) => {
  if (!badge) return { dot: "bg-violet-500", text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/8 dark:bg-violet-500/10", border: "border-violet-500/20" };
  if (badge.includes("Keynote")) return { dot: "bg-violet-500", text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/8 dark:bg-violet-500/10", border: "border-violet-500/20" };
  if (badge.includes("Inauguration")) return { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/8 dark:bg-amber-500/10", border: "border-amber-500/20" };
  if (badge.includes("Technical") || badge.includes("Special") || badge.includes("Open Source") || badge.includes("Fireside")) return { dot: "bg-sky-500", text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/8 dark:bg-sky-500/10", border: "border-sky-500/20" };
  if (badge.includes("Competition")) return { dot: "bg-rose-500", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/8 dark:bg-rose-500/10", border: "border-rose-500/20" };
  if (badge.includes("Lunch") || badge.includes("Expo")) return { dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/8 dark:bg-emerald-500/10", border: "border-emerald-500/20" };
  if (badge.includes("Celebration") || badge.includes("Results") || badge.includes("Registration")) return { dot: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/8 dark:bg-orange-500/10", border: "border-orange-500/20" };
  return { dot: "bg-slate-400", text: "text-slate-600 dark:text-slate-400", bg: "bg-slate-500/8 dark:bg-slate-500/10", border: "border-slate-300 dark:border-slate-600" };
};

export default function Agenda() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const handleDownloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR", "VERSION:2.0",
      "PRODID:-//AWS Student Builder Group PIET//AWS SCD 2026//EN",
      "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT", "UID:aws-scd-panipat-2026@piet.co.in",
      "DTSTAMP:20260911T033000Z", "DTSTART:20260911T033000Z", "DTEND:20260911T113000Z",
      "SUMMARY:AWS Student Community Day Panipat 2026",
      "DESCRIPTION:Haryana's first-ever AWS Student Community Day. Keynotes, Technical Tracks, KIRO Buildathon, Ideathon, and more.",
      "LOCATION:Panipat Institute of Engineering & Technology, NH-44, Samalkha, Panipat, Haryana 132102",
      "STATUS:CONFIRMED", "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "AWS-SCD-Panipat-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AWS+Student+Community+Day+Panipat+2026&dates=20260911T033000Z/20260911T113000Z&details=Haryana%27s+first-ever+AWS+Student+Community+Day&location=PIET+Panipat`;

  return (
    <section id="agenda" className="relative py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 w-full">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12"
      >
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
            SUMMIT ITINERARY - 11 SEPT 2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            Event Schedule
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Friday, 11 September 2026 - PIET, Panipat
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <HugeiconsIcon icon={Calendar03Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF]" />
            <span>Google Cal</span>
          </a>
          <button
            onClick={handleDownloadICS}
            className="px-3 py-1.5 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <HugeiconsIcon icon={Download01Icon} className="h-3.5 w-3.5" />
            <span>.ICS</span>
          </button>
        </div>
      </motion.div>

      {/* Schedule Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-slate-200 dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#080D1E] shadow-sm"
      >
        {AGENDA.map((item, index) => {
          const key = item.time + item.title;
          const isOpen = !!expanded[key];
          const color = getBadgeColor(item.badge);
          const isLast = index === AGENDA.length - 1;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <button
                onClick={() => toggle(key)}
                className={`w-full text-left transition-colors ${
                  item.highlight
                    ? "bg-slate-50/80 dark:bg-white/[0.025]"
                    : "hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                } ${!isLast ? "border-b border-slate-100 dark:border-white/[0.05]" : ""}`}
              >
                <div className="flex items-start gap-3 sm:gap-4 px-4 sm:px-6 py-4">

                  {/* Colored left indicator */}
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${color.dot}`} />

                  {/* Time */}
                  <div className="w-36 sm:w-44 shrink-0">
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400 leading-tight">
                      {item.time}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white leading-snug">
                          {item.title}
                        </h3>
                        {item.speaker && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <HugeiconsIcon icon={UserIcon} className="h-3 w-3 text-slate-400 shrink-0" />
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.speaker}</span>
                          </div>
                        )}
                      </div>

                      {/* Right side: location + badge + toggle */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${color.bg} ${color.border} ${color.text}`}>
                          {item.badge}
                        </span>
                        <HugeiconsIcon
                          icon={isOpen ? ArrowUp01Icon : ArrowDown01Icon}
                          className="h-3.5 w-3.5 text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Location row */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <HugeiconsIcon icon={Location01Icon} className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 pt-0">
                    <div className={`ml-[calc(0.5rem+9rem+1rem)] sm:ml-[calc(0.5rem+11rem+1rem)] pl-0 border-l-2 ${color.border} pl-3`}>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer note */}
      <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-5">
        Schedule subject to minor adjustments. All sessions at PIET, Panipat, Haryana.
      </p>
    </section>
  );
}