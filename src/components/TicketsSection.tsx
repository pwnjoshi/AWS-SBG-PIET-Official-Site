"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  ArrowUpRight01Icon,
  Award02Icon,
  QrCodeIcon,
} from "@hugeicons/core-free-icons";
import confetti from "canvas-confetti";
import { TICKET_TIERS } from "@/lib/data";

interface TicketsSectionProps {
  onOpenTicketsModal: (tierId?: string) => void;
}

export default function TicketsSection({ onOpenTicketsModal }: TicketsSectionProps) {
  const [userName, setUserName] = useState("Aarav Sharma");
  const [userCollege, setUserCollege] = useState("PIET Panipat");
  const [selectedPassType, setSelectedPassType] = useState<string>("Student Pass — FREE");
  const [ticketNumber, setTicketNumber] = useState("AWS-SCD-8492");

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTicketNumber(`AWS-SCD-${randomNum}`);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#AD5CFF", "#BE7BFF", "#FFFFFF"],
      });
    } catch {
      // ignore
    }
  };

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
          PASSES & REGISTRATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Claim your event pass
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          100% Free for enrolled students. Registered via Commudle with verified Credly digital badge eligibility.
        </p>
      </motion.div>

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 items-stretch">
        {TICKET_TIERS.map((tier, index) => {
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-colors border shadow-sm ${
                tier.popular
                  ? "bg-purple-50/40 dark:bg-[#100E2C] border-[#AD5CFF] shadow-xl shadow-purple-500/10 dark:shadow-[#AD5CFF]/15"
                  : "bg-white dark:bg-[#090E1E] border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                  {tier.popular && (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#AD5CFF] text-white">
                      Free Pass
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold text-slate-950 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/{tier.period}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">{tier.forWhom}</p>

                <p className="text-xs text-slate-600 dark:text-slate-300 pb-4 mb-4 border-b border-slate-100 dark:border-white/[0.06] leading-relaxed">
                  {tier.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenTicketsModal(tier.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] cursor-pointer ${
                  tier.popular
                    ? "bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white shadow-md shadow-[#AD5CFF]/25"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10"
                }`}
              >
                <span>{tier.buttonText}</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Pass Customizer */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-slate-50 dark:bg-[#070B1A] border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Form */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              LIVE PASS PREVIEW
            </span>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Customize your summit badge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Enter your details to generate your official attendee pass serial ID before registering on Commudle.
            </p>

            <form onSubmit={handleGeneratePass} className="space-y-3 mt-1">
              <div>
                <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 block mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 block mb-1">
                  COLLEGE / INSTITUTION
                </label>
                <input
                  type="text"
                  value={userCollege}
                  onChange={(e) => setUserCollege(e.target.value)}
                  placeholder="e.g. PIET Panipat"
                  required
                  className="w-full px-3.5 py-2 rounded-lg bg-white dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-900 dark:text-white text-xs font-semibold border border-slate-300 dark:border-white/10 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Generate Badge ID
                </button>
                <button
                  type="button"
                  onClick={() => onOpenTicketsModal()}
                  className="px-4 py-2 rounded-lg bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-[#AD5CFF]/25 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Claim on Commudle</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
                </button>
              </div>
            </form>
          </div>

          {/* Badge Card Graphic with 3D Float */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              whileHover={{ rotateY: 6, rotateX: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm rounded-xl bg-slate-950 dark:bg-[#04060E] border border-slate-800 dark:border-[#AD5CFF]/30 p-5 shadow-2xl shadow-slate-900/30 dark:shadow-[#AD5CFF]/10 perspective-1000 text-white"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[9px] font-mono text-[#BE7BFF] font-bold uppercase tracking-wider block">
                    AWS STUDENT COMMUNITY DAY 2026
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    BUILDER PASS
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    PIET Panipat • 14 Sept 2026
                  </span>
                </div>
                <div className="h-8 w-8 rounded-lg bg-[#AD5CFF]/15 text-[#BE7BFF] flex items-center justify-center">
                  <HugeiconsIcon icon={Award02Icon} className="h-4 w-4" />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-3 space-y-1.5">
                <div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">Attendee</span>
                  <p className="text-sm font-bold text-white">{userName || "Your Name"}</p>
                </div>
                <div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">College</span>
                  <p className="text-xs text-slate-300 truncate">{userCollege || "Your College"}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-dashed border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase block">Serial</span>
                  <span className="font-mono text-xs font-bold text-white">{ticketNumber}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.05] px-2 py-1 rounded border border-white/10">
                  <HugeiconsIcon icon={QrCodeIcon} className="h-4 w-4 text-white" />
                  <span className="text-[8px] font-mono text-emerald-400">VERIFIED</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
