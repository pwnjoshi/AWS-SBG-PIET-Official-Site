"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { SPONSOR_TIERS, EVENT_DETAILS } from "@/lib/data";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    tier: "Platinum Sponsor (₹50,000)",
    customGoals: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#090E1E] border border-slate-200 dark:border-white/15 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <HugeiconsIcon icon={Tick02Icon} className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Inquiry Received</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
              Thank you, <span className="text-slate-900 dark:text-white font-semibold">{formData.contactPerson}</span> from <span className="text-slate-900 dark:text-white font-semibold">{formData.companyName}</span>. Our sponsorship lead will share the deck with you at <span className="text-[#8E35EA] dark:text-[#BE7BFF]">{formData.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-900 dark:text-white text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
              PARTNERSHIP INQUIRY
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Request Sponsorship Deck
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Connect with 4,000+ student engineers across Haryana & Delhi-NCR
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    COMPANY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. CloudScale Tech"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    CONTACT PERSON *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    TARGET TIER
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  >
                    {SPONSOR_TIERS.map((tier) => (
                      <option key={tier.name} value={`${tier.name} (${tier.price})`}>
                        {tier.name} — {tier.price}
                      </option>
                    ))}
                    <option value="Custom Hiring Partner">Custom Hiring Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                  PARTNERSHIP OBJECTIVES (HIRING, BOOTH, LAB SPONSOR)
                </label>
                <textarea
                  rows={3}
                  value={formData.customGoals}
                  onChange={(e) => setFormData({ ...formData, customGoals: e.target.value })}
                  placeholder="Share any specific goals or queries..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`mailto:${EVENT_DETAILS.email}`}
                  className="text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Direct: {EVENT_DETAILS.email}
                </a>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-xs transition-all shadow-sm shadow-[#AD5CFF]/25 cursor-pointer"
                >
                  Request Deck
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
