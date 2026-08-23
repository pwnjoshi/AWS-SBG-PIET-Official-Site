"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { TRACKS, EVENT_DETAILS } from "@/lib/data";

interface CFPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CFPModal({ isOpen, onClose }: CFPModalProps) {
  const [submitted, setSubmitted] = useState(false);
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
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Proposal Received</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
              Thank you, <span className="text-slate-900 dark:text-white font-semibold">{formData.name}</span>. The review committee will review your proposal for &ldquo;{formData.title}&rdquo; and follow up at <span className="text-[#8E35EA] dark:text-[#BE7BFF]">{formData.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-900 dark:text-white text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF] block mb-1">
              CALL FOR SPEAKERS
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Submit Your Session Proposal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              AWS Student Community Day Panipat 2026 • 2 September @ PIET
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    SPEAKER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="speaker@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    ORGANIZATION / ROLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roleCompany}
                    onChange={(e) => setFormData({ ...formData, roleCompany: e.target.value })}
                    placeholder="e.g. Cloud Engineer @ Tech"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                    TARGET TRACK *
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
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
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                  PROPOSED TALK TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Building Serverless Event-Driven Architectures on AWS"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1">
                  SESSION ABSTRACT *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Summary of topics, demo details, and target takeaways..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Direct: {EVENT_DETAILS.email}
                </span>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-xs transition-all shadow-sm shadow-[#AD5CFF]/25 cursor-pointer"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
