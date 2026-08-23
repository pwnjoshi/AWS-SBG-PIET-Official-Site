"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import confetti from "canvas-confetti";
import { TICKET_TIERS } from "@/lib/data";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTierId?: string;
}

export default function TicketModal({ isOpen, onClose, selectedTierId }: TicketModalProps) {
  const [activeTierId, setActiveTierId] = useState<string>(selectedTierId || "student-pass");
  const [registered, setRegistered] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");

  if (!isOpen) return null;

  const currentTier = TICKET_TIERS.find((t) => t.id === activeTierId) || TICKET_TIERS[0];

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#AD5CFF", "#BE7BFF", "#FFFFFF"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#090E1E] border border-slate-200 dark:border-white/15 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
        </button>

        {registered ? (
          <div className="py-6 text-center flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <HugeiconsIcon icon={Tick02Icon} className="h-6 w-6" />
            </div>

            <span className="text-[10px] font-mono font-bold text-[#8E35EA] dark:text-[#BE7BFF] uppercase tracking-wider">
              REGISTRATION CONFIRMED
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              See you in Panipat, {fullName}!
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
              Your <span className="text-slate-900 dark:text-white font-semibold">{currentTier.name}</span> has been confirmed for 2 September 2026 at PIET Panipat. Confirmation details sent to <span className="text-[#8E35EA] dark:text-[#BE7BFF] font-mono">{email}</span>.
            </p>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-200 dark:border-white/10 w-full text-left text-xs text-slate-700 dark:text-slate-300 space-y-1 my-2">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Date:</span>
                <span className="font-semibold text-slate-900 dark:text-white">2 September 2026 (9:00 AM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Venue:</span>
                <span className="font-semibold text-slate-900 dark:text-white">PIET Campus, Samalkha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Credly Badge:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Eligible</span>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <a
                href="https://commudle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-xs flex items-center gap-1 transition-all shadow-md shadow-[#AD5CFF]/25 cursor-pointer"
              >
                <span>View on Commudle</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
              </a>
              <button
                onClick={() => {
                  setRegistered(false);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-900 dark:text-white text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
              COMMUDLE REGISTRATION
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Reserve Your Summit Pass
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Select tier and provide attendee details for badge issuing.
            </p>

            {/* Tier Selector */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {TICKET_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTierId(tier.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    activeTierId === tier.id
                      ? "bg-purple-50/80 dark:bg-[#14112E] border-[#AD5CFF]"
                      : "bg-slate-50 dark:bg-[#04060E] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">{tier.name}</div>
                  <div className="text-xs font-mono font-bold text-[#8E35EA] dark:text-[#BE7BFF] mt-0.5">{tier.price}</div>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleQuickRegister} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@student.college.edu"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    COLLEGE / INSTITUTION *
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. PIET Panipat"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  {currentTier.priceNum === 0 ? "STUDENT ID VERIFIED" : "COMMUDLE GATEWAY"}
                </span>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-xs transition-all shadow-sm shadow-[#AD5CFF]/25 cursor-pointer"
                >
                  Confirm Pass
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
