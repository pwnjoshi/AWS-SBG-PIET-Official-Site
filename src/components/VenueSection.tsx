"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { EVENT_DETAILS } from "@/lib/data";

export default function VenueSection() {
  const photoContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"delhi" | "chandigarh" | "train">("delhi");

  const { scrollYProgress } = useScroll({
    target: photoContainerRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const directions = {
    delhi: {
      title: "From Delhi / NCR & Airport",
      distance: "Approx. 65 km via NH-44 (GT Road)",
      time: "60–75 min drive",
      desc: "Drive North on NH-44 through Sonipat. PIET Campus is located directly on the main highway at Samalkha before Panipat toll plaza.",
    },
    chandigarh: {
      title: "From Chandigarh / North Haryana",
      distance: "Approx. 160 km via NH-44",
      time: "2.5 hours drive",
      desc: "Head South on NH-44 past Karnal. Continue past Panipat city for 15 km towards Samalkha. Campus entrance has dedicated highway access.",
    },
    train: {
      title: "By Train / Public Transit",
      distance: "Samalkha Station (3 km) / Panipat Junction (18 km)",
      time: "Frequent local trains",
      desc: "Regular trains from New Delhi and Old Delhi stop directly at Samalkha railway station. Auto-rickshaws are available directly to campus gates.",
    },
  };

  return (
    <section id="venue" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-12"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          VENUE & CAMPUS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Panipat Institute of Engineering & Technology (PIET)
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          NH-44, Samalkha, Panipat, Haryana – 132102. State-of-the-art auditorium, Gigabit fiber labs, and sprawling tech expo arenas.
        </p>
      </motion.div>

      {/* Campus Panoramic Photo Banner with Scroll Parallax */}
      <motion.div
        ref={photoContainerRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 mb-8 h-48 sm:h-64 shadow-2xl group"
      >
        <motion.div style={{ y: photoY }} className="absolute inset-0 scale-110">
          <Image
            src="/images/piet-campus.png"
            alt="PIET Panipat Campus Main Building"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent dark:from-[#05070E] dark:via-[#05070E]/40 dark:to-transparent" />
        <div className="absolute bottom-4 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 z-10 text-white">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#BE7BFF] uppercase tracking-wider block">
              OFFICIAL HOST CAMPUS
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              PIET Main Academic & Central Auditorium Block
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-200 bg-black/60 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md self-start sm:self-auto">
            NH-44 SAMALKHA, PANIPAT
          </span>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8"
      >
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-2xl bg-white dark:bg-[#090E1E] border border-slate-200/80 dark:border-white/[0.08] p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Campus Facilities & Summit Infrastructure
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                "1,000+ Seater Central Auditorium",
                "High-Speed Cloud Computing Labs",
                "Innovation Expo Arena & Lawns",
                "Dedicated Dining & Food Court",
              ].map((fac) => (
                <div
                  key={fac}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.05] text-xs text-slate-700 dark:text-slate-300"
                >
                  <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{fac}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06]">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
                Directions & Transit:
              </span>
              <div className="flex gap-1.5 mb-3">
                <button
                  onClick={() => setActiveTab("delhi")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "delhi"
                      ? "bg-[#AD5CFF] text-white font-bold"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  Delhi/NCR
                </button>
                <button
                  onClick={() => setActiveTab("chandigarh")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "chandigarh"
                      ? "bg-[#AD5CFF] text-white font-bold"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  Chandigarh
                </button>
                <button
                  onClick={() => setActiveTab("train")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "train"
                      ? "bg-[#AD5CFF] text-white font-bold"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  Train / Transit
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-200 dark:border-white/[0.06] text-xs">
                <div className="flex items-center justify-between text-slate-900 dark:text-white font-semibold mb-1">
                  <span>{directions[activeTab].title}</span>
                  <span className="text-[#8E35EA] dark:text-[#BE7BFF] font-mono text-[11px]">{directions[activeTab].time}</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1.5 font-mono">
                  {directions[activeTab].distance}
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {directions[activeTab].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Map */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl bg-white dark:bg-[#090E1E] border border-slate-200/80 dark:border-white/[0.08] overflow-hidden h-[400px] flex flex-col shadow-sm">
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                PIET Panipat • NH-44 Samalkha
              </span>
              <a
                href="https://maps.google.com/?q=Panipat+Institute+of+Engineering+and+Technology+PIET+Samalkha+Panipat+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#8E35EA] dark:text-[#BE7BFF] hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
              </a>
            </div>

            <div className="relative flex-1 w-full h-full">
              <iframe
                title="PIET Panipat Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13904.646736207185!2d76.99341499999999!3d29.239384799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dbbf0e8e97f09%3A0x6b8764a8523c91a3!2sPanipat%20Institute%20of%20Engineering%20and%20Technology%20(PIET)!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full dark:invert-[90%] dark:hue-rotate-[240deg] dark:brightness-[90%] dark:contrast-[95%]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
