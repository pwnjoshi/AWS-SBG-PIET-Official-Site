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
    <section id="sponsors" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-12"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          PARTNERSHIPS & HIRING
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Partner with Haryana’s largest cloud builder community
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Position your tech brand in front of 4,000+ ambitious student engineers and recruit pre-screened cloud and AI developers.
        </p>
      </motion.div>

      {/* Metrics Row with Stagger */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {[
          { label: "Student Outreach", val: "4,000+", sub: "25+ Regional Colleges" },
          { label: "Summit Attendees", val: "500+", sub: "Screened Builders & Devs" },
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

      {/* Sponsor Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {SPONSOR_TIERS.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`rounded-xl p-5 flex flex-col justify-between border transition-colors shadow-sm ${
              tier.highlight
                ? "bg-purple-50/40 dark:bg-[#100E2C] border-[#AD5CFF] shadow-lg shadow-purple-500/5 dark:shadow-[#AD5CFF]/10"
                : "bg-white dark:bg-[#090E1E] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/15"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tier.name}</h4>
                {tier.highlight && (
                  <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#AD5CFF] text-white uppercase">
                    Title
                  </span>
                )}
              </div>
              <div className="text-xl font-extrabold text-[#8E35EA] dark:text-[#BE7BFF] mb-4">
                {tier.price}
              </div>

              <ul className="space-y-2 mb-6">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onOpenSponsorModal}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-[#AD5CFF] hover:text-white dark:bg-white/[0.06] dark:hover:bg-[#AD5CFF] dark:hover:text-white text-slate-900 dark:text-white text-xs font-bold transition-all border border-slate-200 dark:border-white/10 flex items-center justify-center gap-1 hover:scale-[1.02] cursor-pointer"
            >
              <span>Inquire for {tier.name}</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
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
