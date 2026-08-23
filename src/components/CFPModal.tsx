"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick02Icon,
  SparklesIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import confetti from "canvas-confetti";
import { TRACKS, EVENT_DETAILS } from "@/lib/data";

interface CFPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CFPModal({ isOpen, onClose }: CFPModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    roleCompany: "",
    track: "Generative AI on AWS",
    format: "30 min Technical Talk",
    abstract: "",
    bio: "",
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
      const res = await fetch("/api/cfp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit proposal.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/15 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <HugeiconsIcon icon={Tick02Icon} className="h-6 w-6" />
            </div>

            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              CFP DISPATCHED TO REVIEW JURY
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Proposal Received!</h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
              Thank you, <span className="text-slate-900 dark:text-white font-semibold">{formData.name}</span>. The review committee will review your proposal for &ldquo;{formData.title}&rdquo; and follow up at <span className="text-[#8E35EA] dark:text-[#BE7BFF]">{formData.email}</span>.
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
              CALL FOR SPEAKERS
            </span>

            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-1">
              Submit Your Session Proposal
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              AWS Student Community Day Panipat 2026 • 11 September @ PIET Panipat
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
                    SPEAKER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="speaker@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                    ORGANIZATION / ROLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roleCompany}
                    onChange={(e) => setFormData({ ...formData, roleCompany: e.target.value })}
                    placeholder="e.g. Cloud Architect @ Tech"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                    TARGET TRACK *
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none cursor-pointer"
                  >
                    {TRACKS.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.number}. {t.title}
                      </option>
                    ))}
                    <option value="Keynote">Community Keynote</option>
                    <option value="Career Panel">Career & Mentorship Panel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                  PROPOSED TALK TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Building Resilient GenAI Workflows on Amazon Bedrock"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                  SESSION ABSTRACT *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Summary of topics, live architecture demo details, and key builder takeaways..."
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
                      <span>Submitting Proposal...</span>
                    </>
                  ) : (
                    <>
                      <HugeiconsIcon icon={SparklesIcon} className="h-3.5 w-3.5" />
                      <span>Submit Proposal to Jury</span>
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
