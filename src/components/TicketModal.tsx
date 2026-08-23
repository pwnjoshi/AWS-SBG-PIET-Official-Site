"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick02Icon,
  ArrowUpRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { TICKET_TIERS, EVENT_DETAILS } from "@/lib/data";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTierId?: string;
}

export default function TicketModal({ isOpen, onClose, selectedTierId }: TicketModalProps) {
  const [activeTierId, setActiveTierId] = useState<string>(selectedTierId || "builder-pass");

  if (!isOpen) return null;

  const currentTier = TICKET_TIERS.find((t) => t.id === activeTierId) || TICKET_TIERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/15 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 pr-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
            SUMMIT TICKETS
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Choose Your Summit Pass
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Friday, 11 September 2026 • PIET Panipat (Offline Summit)
          </p>
        </div>

        {/* Pass Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {TICKET_TIERS.map((tier) => {
            const isSelected = activeTierId === tier.id;
            const isBlackPass = tier.id === "black-pass";

            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTierId(tier.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? isBlackPass
                      ? "bg-slate-950 dark:bg-[#120E2E] border-[#AD5CFF] shadow-lg shadow-[#AD5CFF]/15 text-white ring-2 ring-[#AD5CFF]"
                      : "bg-purple-50/60 dark:bg-[#100D28] border-[#AD5CFF] shadow-lg shadow-[#AD5CFF]/15 ring-2 ring-[#AD5CFF]"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-extrabold ${isSelected && isBlackPass ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {tier.name}
                  </span>
                  {isBlackPass ? (
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#AD5CFF] text-white flex items-center gap-0.5">
                      <HugeiconsIcon icon={SparklesIcon} className="h-2.5 w-2.5" />
                      VIP
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                      Standard
                    </span>
                  )}
                </div>
                <div className="text-xl font-black text-[#8E35EA] dark:text-[#BE7BFF] font-mono mt-0.5">
                  {tier.price}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  {tier.forWhom}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Pass Features Breakdown */}
        <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] p-5 mb-6">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/[0.06]">
            <div>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                {currentTier.name} Perks & Access
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                {currentTier.description}
              </span>
            </div>
            <span className="text-lg font-black font-mono text-[#8E35EA] dark:text-[#AD5CFF] shrink-0">
              {currentTier.price}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentTier.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={currentTier.commudleLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#AD5CFF]/25 hover:scale-[1.02] cursor-pointer"
          >
            <span>Proceed to Commudle ({currentTier.price})</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" />
          </a>

          <a
            href={EVENT_DETAILS.commudleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 text-xs font-semibold text-center transition-all cursor-pointer"
          >
            View Event on Commudle
          </a>
        </div>
      </div>
    </div>
  );
}
