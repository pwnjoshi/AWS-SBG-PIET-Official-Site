"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { SPONSOR_BENEFITS, SPONSOR_TIERS, EVENT_DETAILS } from "@/lib/data";

interface SponsorsSectionProps {
  onOpenSponsorModal: () => void;
}

export default function SponsorsSection({ onOpenSponsorModal }: SponsorsSectionProps) {
  return (
    <section id="sponsors" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-8 sm:mb-12"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          PARTNERSHIPS & HIRING
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Partner with Haryana’s largest cloud builder community
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Position your tech brand in front of 500+ ambitious student engineers and recruit pre-screened cloud and AI developers.
        </p>
      </motion.div>

      {/* Metrics Row with Stagger */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-12">
        {[
          { label: "Community Reach", val: "6+", sub: "Regional SBGs & Partners" },
          { label: "Summit Attendees", val: "500+", sub: "Student Builders & Devs" },
          { label: "Core Skills", val: "Cloud & AI", sub: "AWS, DevOps, Bedrock" },
          { label: "Campus Venue", val: "PIET Panipat", sub: "1,000+ Seater Infra" },
        ].map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-xl bg-white dark:bg-[#090E1E] border border-slate-200/80 dark:border-white/[0.08] p-4 flex flex-col justify-between shadow-sm"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {metric.label}
            </span>
            <span className="text-2xl font-extrabold text-slate-950 dark:text-white my-1">
              {metric.val}
            </span>
            <span className="text-xs text-[#8E35EA] dark:text-[#BE7BFF] font-medium">{metric.sub}</span>
          </motion.div>
        ))}
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {SPONSOR_BENEFITS.map((benefit, idx) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-xl bg-white dark:bg-[#090E1E] border border-slate-200/80 dark:border-white/[0.08] hover:border-[#AD5CFF]/40 dark:hover:border-[#AD5CFF]/30 p-6 flex flex-col justify-between transition-colors shadow-sm"
          >
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{benefit.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sponsor Tiers Grid — 2 columns on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
        {SPONSOR_TIERS.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col justify-between border transition-all duration-300 shadow-sm ${
              tier.highlight
                ? "bg-gradient-to-b from-purple-900/20 via-purple-900/10 to-transparent dark:from-[#18113E] dark:via-[#0F0B28] dark:to-[#090E1E] border-[#AD5CFF] shadow-lg shadow-purple-500/10 dark:shadow-[#AD5CFF]/15 ring-1 ring-[#AD5CFF]"
                : "bg-white dark:bg-[#090E1E] border-slate-200/90 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span
                  className={`text-[8px] sm:text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    tier.highlight
                      ? "bg-[#AD5CFF] text-white border-[#AD5CFF]"
                      : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10"
                  }`}
                >
                  {tier.tag || (tier.highlight ? "FEATURED" : "AVAILABLE")}
                </span>
              </div>

              <h4 className="text-xs sm:text-base font-black text-slate-950 dark:text-white uppercase tracking-tight mt-0.5 sm:mt-1">
                {tier.name}
              </h4>

              <div className="text-base sm:text-2xl font-black text-[#8E35EA] dark:text-[#AD5CFF] font-mono my-1.5 sm:my-2.5">
                {tier.price}
              </div>

              <div className="h-[1px] w-full bg-slate-100 dark:bg-white/[0.08] my-2 sm:my-3" />

              <ul className="space-y-1.5 sm:space-y-2.5 mb-4 sm:mb-6">
                {tier.perks.slice(0, 4).map((perk) => (
                  <li key={perk} className="flex items-start gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
                    <span className="text-[#8E35EA] dark:text-[#AD5CFF] font-bold text-xs sm:text-sm leading-none shrink-0">›</span>
                    <span className="line-clamp-2 sm:line-clamp-none">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onOpenSponsorModal}
              className={`w-full py-2 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 shadow-sm active:scale-[0.98] cursor-pointer ${
                tier.highlight
                  ? "bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white shadow-[#AD5CFF]/30"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10"
              }`}
            >
              <span>Select →</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Direct Contact */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="rounded-xl bg-slate-50 dark:bg-[#070B1A] border border-slate-200 dark:border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
      >
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Custom hiring partnerships or tech booth inquiries?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Contact the sponsorship coordinator directly at{" "}
            <a href={`mailto:${EVENT_DETAILS.email}`} className="text-[#8E35EA] dark:text-[#BE7BFF] hover:underline">
              {EVENT_DETAILS.email}
            </a>
          </p>
        </div>

        <button
          onClick={onOpenSponsorModal}
          className="px-5 py-2.5 rounded-full bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-md shadow-[#AD5CFF]/25 hover:scale-[1.02] cursor-pointer"
        >
          <span>Request Sponsor Deck</span>
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </section>
  );
}
