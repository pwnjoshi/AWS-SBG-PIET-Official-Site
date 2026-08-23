"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import { AGENDA } from "@/lib/data";

export default function Agenda() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "Full Schedule (9:00 AM – 5:45 PM)" },
    { id: "keynote", label: "Keynotes & Ceremonies" },
    { id: "tracks", label: "Parallel Tracks & Labs" },
    { id: "networking", label: "Expo & Networking" },
  ];

  const filteredAgenda = AGENDA.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "keynote") {
      return (
        item.badge?.includes("Keynote") ||
        item.badge?.includes("Inauguration") ||
        item.badge?.includes("Celebration")
      );
    }
    if (activeFilter === "tracks") {
      return (
        item.badge?.includes("Deep Dives") ||
        item.badge?.includes("Live Labs") ||
        item.badge?.includes("Demos")
      );
    }
    if (activeFilter === "networking") {
      return (
        item.badge?.includes("Networking") ||
        item.badge?.includes("Lunch") ||
        item.badge?.includes("Panel")
      );
    }
    return true;
  });

  const handleDownloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AWS Student Builder Group PIET//AWS SCD 2026//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:aws-scd-panipat-2026@piet.co.in",
      "DTSTAMP:20260902T033000Z",
      "DTSTART:20260902T033000Z",
      "DTEND:20260902T121500Z",
      "SUMMARY:AWS Student Community Day Panipat 2026",
      "DESCRIPTION:Largest student-led cloud event in Haryana. 6 technical tracks, hands-on labs, AWS Heroes, and Credly badges.",
      "LOCATION:Panipat Institute of Engineering & Technology (PIET), NH-44, Samalkha, Panipat, Haryana - 132102",
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

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AWS+Student+Community+Day+Panipat+2026&dates=20260902T033000Z/20260902T121500Z&details=Largest+student-led+cloud+event+in+Haryana.+6+tracks%2C+hands-on+labs%2C+AWS+Heroes%2C+Credly+badges.&location=PIET+Campus%2C+Panipat+NH-44%2C+Haryana`;

  return (
    <section id="agenda" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
      >
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD5CFF] block mb-2">
            AGENDA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Event Day Schedule
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Wednesday, 2 September 2026 • 9:00 AM – 5:45 PM IST
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <HugeiconsIcon icon={Calendar03Icon} className="h-3.5 w-3.5 text-[#AD5CFF]" />
            <span>Google Cal</span>
          </a>
          <button
            onClick={handleDownloadICS}
            className="px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <HugeiconsIcon icon={Download01Icon} className="h-3.5 w-3.5 text-slate-400" />
            <span>.ics Export</span>
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {filters.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === tab.id
                ? "bg-[#AD5CFF] text-white font-bold shadow-md shadow-[#AD5CFF]/25 scale-[1.02]"
                : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Timeline List with Staggered Scroll Animation */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {filteredAgenda.map((item, index) => {
              return (
                <motion.div
                  key={item.time + item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  className={`rounded-xl p-5 transition-colors border ${
                    item.highlight
                      ? "bg-[#0E122A] border-[#AD5CFF]/40 shadow-lg shadow-[#AD5CFF]/5"
                      : "bg-[#080D1E] border-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#BE7BFF]">
                        {item.time}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#AD5CFF]/15 text-[#BE7BFF] border border-[#AD5CFF]/25">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {item.title}
                  </h4>
                  {item.speaker && (
                    <span className="text-xs font-medium text-[#BE7BFF] mt-0.5 block">
                      {item.speaker}
                    </span>
                  )}
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.details}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
