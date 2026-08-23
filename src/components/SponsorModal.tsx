"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick02Icon,
  SparklesIcon,
  Mail01Icon,
  Call02Icon,
} from "@hugeicons/core-free-icons";
import confetti from "canvas-confetti";
import { SPONSOR_TIERS, EVENT_DETAILS } from "@/lib/data";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    tier: "Title Sponsor (₹1,50,000)",
    customGoals: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#AD5CFF", "#BE7BFF", "#10B981", "#FFFFFF"],
        });
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again or email us directly.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-t-[32px] sm:rounded-3xl bg-white dark:bg-[#080D1E] border-t sm:border border-slate-200 dark:border-white/15 p-5 sm:p-8 shadow-2xl overflow-y-auto animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 duration-200">
        {/* Mobile Pull Handle Indicator */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 mx-auto -mt-1 mb-3 sm:hidden shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <HugeiconsIcon icon={Tick02Icon} className="h-6 w-6" />
            </div>

            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              EMAIL DISPATCHED TO AWS SBG TEAM
            </span>

            <h3 className="text-xl font-bold text-slate-950 dark:text-white">
              Sponsorship Inquiry Received!
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-slate-900 dark:text-white font-semibold">{formData.contactPerson}</span> from <span className="text-slate-900 dark:text-white font-semibold">{formData.companyName}</span>.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 w-full text-left text-xs text-slate-700 dark:text-slate-300 space-y-1.5 my-2">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Target Tier:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formData.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Work Email:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Phone / WhatsApp:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Sent To:</span>
                <span className="font-semibold text-[#8E35EA] dark:text-[#BE7BFF]">info@awssbgpiet.in</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Our sponsorship lead will review your objectives and email you the official brochure & deck shortly.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-3 px-6 py-2.5 rounded-xl bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white text-xs font-bold transition-all shadow-md shadow-[#AD5CFF]/25 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
              PARTNERSHIP & SPONSORSHIP INQUIRY
            </span>

            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-1">
              Request Sponsorship Deck
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              Connect with 500+ student engineers across regional SBGs, AWS Heroes & NCR tech leaders.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                    COMPANY / BRAND NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. CloudScale Technologies"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                    CONTACT PERSON *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Full Name / Title"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                  TARGET SPONSORSHIP TIER
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none cursor-pointer"
                >
                  {SPONSOR_TIERS.map((tier) => (
                    <option key={tier.name} value={`${tier.name} (${tier.price})`}>
                      {tier.name} — {tier.price}
                    </option>
                  ))}
                  <option value="Custom Hiring Partner">Custom Hiring Partner</option>
                  <option value="Community Partner (In-kind / Co-host)">Community Partner (In-kind / Co-host)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                  PARTNERSHIP OBJECTIVES (HIRING, BOOTH, LAB SPONSOR, SWAG)
                </label>
                <textarea
                  rows={3}
                  value={formData.customGoals}
                  onChange={(e) => setFormData({ ...formData, customGoals: e.target.value })}
                  placeholder="Share any specific goals, brand deliverables, or queries..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <a
                  href={`mailto:${EVENT_DETAILS.email}`}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <HugeiconsIcon icon={Mail01Icon} className="h-3.5 w-3.5" />
                  <span>Direct: {EVENT_DETAILS.email}</span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#AD5CFF] hover:bg-[#BE7BFF] disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-[#AD5CFF]/25 cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <HugeiconsIcon icon={SparklesIcon} className="h-3.5 w-3.5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
