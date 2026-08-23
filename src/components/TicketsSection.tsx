"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  ArrowUpRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { TICKET_TIERS } from "@/lib/data";
import BadgeGenerator from "@/components/BadgeGenerator";

interface TicketsSectionProps {
  onOpenTicketsModal: (tierId?: string) => void;
}

export default function TicketsSection({ onOpenTicketsModal }: TicketsSectionProps) {
  return (
    <section id="tickets" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-12"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          OFFICIAL SUMMIT PASSES
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Reserve Your Event Pass
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Official registration is hosted on Commudle. Secure your pass for Friday, 11 September 2026 at PIET Panipat.
        </p>
      </motion.div>

      {/* Ticket Cards Grid (Builder Pass & Black Pass) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 items-stretch">
        {TICKET_TIERS.map((tier, index) => {
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-colors border shadow-sm ${
                tier.id === "black-pass"
                  ? "bg-slate-950 dark:bg-[#07061A] border-[#AD5CFF] shadow-xl shadow-purple-500/10 dark:shadow-[#AD5CFF]/15 text-white"
                  : "bg-white dark:bg-[#090E1E] border-slate-200/90 dark:border-white/[0.1] hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xl font-extrabold ${tier.id === "black-pass" ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {tier.name}
                  </h3>
                  {tier.id === "black-pass" ? (
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#AD5CFF] text-white flex items-center gap-1">
                      <HugeiconsIcon icon={SparklesIcon} className="h-3 w-3" />
                      VIP Priority
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className={`text-4xl font-black tracking-tight ${tier.id === "black-pass" ? "text-white" : "text-slate-950 dark:text-white"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-xs font-mono ${tier.id === "black-pass" ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
                    / attendee
                  </span>
                </div>

                <p className={`text-xs font-medium mb-4 ${tier.id === "black-pass" ? "text-[#BE7BFF]" : "text-[#8E35EA] dark:text-[#AD5CFF]"}`}>
                  {tier.forWhom}
                </p>

                <p className={`text-xs pb-4 mb-5 border-b leading-relaxed ${tier.id === "black-pass" ? "text-slate-300 border-white/10" : "text-slate-600 dark:text-slate-300 border-slate-100 dark:border-white/[0.06]"}`}>
                  {tier.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className={`flex items-start gap-2.5 text-xs ${tier.id === "black-pass" ? "text-slate-200" : "text-slate-700 dark:text-slate-200"}`}>
                      <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Direct Commudle Form */}
              <a
                href={tier.commudleLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] cursor-pointer shadow-md ${
                  tier.id === "black-pass"
                    ? "bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white shadow-[#AD5CFF]/30"
                    : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900"
                }`}
              >
                <span>{tier.buttonText}</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Embedded Viral "I'm Attending" Badge Generator */}
      <BadgeGenerator />
    </section>
  );
}
