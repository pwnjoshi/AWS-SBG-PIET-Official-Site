"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      try {
        (window as unknown as { Tawk_API?: { hideWidget?: () => void } }).Tawk_API?.hideWidget?.();
      } catch {}
    }
    return () => {
      document.body.classList.remove("modal-open");
      try {
        (window as unknown as { Tawk_API?: { showWidget?: () => void } }).Tawk_API?.showWidget?.();
      } catch {}
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTier = TICKET_TIERS.find((t) => t.id === activeTierId) || TICKET_TIERS[0];
  const isBlackPass = currentTier.id === "black-pass";

  return (
    <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Dialog / Native Mobile Bottom Sheet */}
      <div className="relative w-full max-w-lg max-h-[85dvh] sm:max-h-[90vh] flex flex-col rounded-t-[28px] sm:rounded-3xl bg-white dark:bg-[#080D1E] border-t sm:border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200">
        {/* Modal Top Bar (Always Visible & Pinned) */}
        <div className="flex items-center justify-between px-5 sm:px-7 pt-4 sm:pt-6 pb-3 border-b border-slate-100 dark:border-white/[0.08] bg-white dark:bg-[#080D1E] z-30 shrink-0">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block">
              SUMMIT PASSES
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
              Choose Your Pass
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.16] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-sm"
            aria-label="Close dialog"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-4 space-y-4 overscroll-contain">
          {/* Segmented Native Mobile Pass Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06]">
            {TICKET_TIERS.map((tier) => {
              const isSelected = activeTierId === tier.id;
              const isVIP = tier.id === "black-pass";

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTierId(tier.id)}
                  className={`py-2.5 px-3 rounded-xl text-center transition-all cursor-pointer select-none active:scale-[0.98] ${
                    isSelected
                      ? isVIP
                        ? "bg-slate-950 dark:bg-[#151034] text-white shadow-md border border-[#AD5CFF] ring-1 ring-[#AD5CFF]"
                        : "bg-white dark:bg-[#120E2C] text-slate-950 dark:text-white shadow-md border border-[#AD5CFF] ring-1 ring-[#AD5CFF]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <span className="text-xs font-bold truncate">{tier.name}</span>
                    {isVIP ? (
                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[#AD5CFF] text-white shrink-0">
                        VIP
                      </span>
                    ) : (
                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shrink-0">
                        Standard
                      </span>
                    )}
                  </div>
                  <span className="text-sm sm:text-base font-black font-mono text-[#8E35EA] dark:text-[#BE7BFF] block">
                    {tier.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Pass Details Card */}
          <div className="rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/[0.08] p-4 sm:p-5">
            {/* Header info */}
            <div className="flex items-baseline justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <div>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                  {currentTier.name} Privileges
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentTier.forWhom}
                </span>
              </div>
              <span className="text-base font-black font-mono text-[#8E35EA] dark:text-[#AD5CFF]">
                {currentTier.price}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {currentTier.description}
            </p>

            {/* Checklist items */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500 block">
                Included Benefits:
              </span>
              {currentTier.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 leading-snug">
                  <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-mono">
            <span>Offline Event • Friday, 11 September 2026 • PIET Panipat</span>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-white/[0.08] bg-white/95 dark:bg-[#080D1E]/95 backdrop-blur-xl shrink-0 flex flex-col gap-2">
          <a
            href={currentTier.commudleLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#AD5CFF]/30 active:scale-[0.98] cursor-pointer"
          >
            <span>Proceed to Commudle ({currentTier.price})</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" />
          </a>

          <a
            href={EVENT_DETAILS.commudleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="text-[11px] text-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            View Full Event Page on Commudle →
          </a>
        </div>
      </div>
    </div>
  );
}
