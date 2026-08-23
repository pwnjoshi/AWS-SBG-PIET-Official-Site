"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  ArrowUpRight01Icon,
  SparklesIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { TICKET_TIERS } from "@/lib/data";

interface TicketsSectionProps {
  onOpenTicketsModal: (tierId?: string) => void;
}

export default function TicketsSection({ onOpenTicketsModal }: TicketsSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubscribing(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section id="tickets" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-8 sm:mb-12"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          OFFICIAL SUMMIT PASSES
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Reserve Your Event Pass
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Official registration is hosted on Commudle. Secure your pass for Friday, 11 September 2026 at PIET Panipat.
        </p>
      </motion.div>

      {/* Ticket Cards Grid (Builder Pass & Black Pass) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-10 items-stretch">
        {TICKET_TIERS.map((tier, index) => {
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-colors border shadow-sm ${
                tier.id === "black-pass"
                  ? "bg-slate-950 dark:bg-[#07061A] border-[#8E35EA] dark:border-[#AD5CFF]/60 shadow-md text-white"
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
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer shadow-sm ${
                  tier.id === "black-pass"
                    ? "bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white"
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

      {/* Summit Alerts Newsletter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-purple-50/30 dark:from-[#090E1E] dark:via-[#090E1E] dark:to-[#8E35EA]/10 border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 max-w-4xl mx-auto mb-6 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
              SUMMIT ALERTS
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
              Receive lab repositories &amp; prerequisites
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              We will send you the official workshop GitHub repos and AWS Free Tier setup instructions 1 week before the summit.
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[340px]">
            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <HugeiconsIcon icon={Tick02Icon} className="h-4 w-4 shrink-0" />
                <span>You&apos;re in! A confirmation email has been dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your student email"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#8E35EA] dark:focus:border-[#AD5CFF] focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-5 py-2.5 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer active:scale-95"
                >
                  <HugeiconsIcon icon={Mail01Icon} className="h-3.5 w-3.5" />
                  <span>{isSubscribing ? "Subscribing..." : "Subscribe for Updates"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>

      {/* Dedicated Badge Maker Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-sm"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="h-10 w-10 rounded-2xl bg-[#8E35EA]/10 dark:bg-[#AD5CFF]/15 text-[#8E35EA] dark:text-[#AD5CFF] flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={SparklesIcon} className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Already have your pass? Create your &ldquo;I&apos;m Attending&rdquo; badge
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize your official attendee graphic with your photo and share on LinkedIn.
            </p>
          </div>
        </div>

        <Link
          href="/scd-panipat-2026/badge"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0"
        >
          <span>Open Badge Studio</span>
          <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </section>
  );
}

