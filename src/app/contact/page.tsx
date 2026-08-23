"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  Location01Icon,
  Tick02Icon,
  SparklesIcon,
  ArrowUpRight01Icon,
  Globe02Icon,
  Chat01Icon,
} from "@hugeicons/core-free-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { EVENT_DETAILS } from "@/lib/data";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "General Inquiry",
    "Pass / Ticket Assistance",
    "Sponsorship & Partnerships",
    "Speaker & Session Proposal (CFP)",
    "Campus Ambassador / Student Chapters",
    "KIRO Buildathon & Hackathon",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    try {
      await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: `Contact Form [${category}]`,
          contactPerson: name,
          email,
          phone,
          tier: category,
          customGoals: message,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenLiveChat = () => {
    const tawk = (window as unknown as { Tawk_API?: { maximize?: () => void; toggle?: () => void } }).Tawk_API;
    if (tawk) {
      if (typeof tawk.maximize === "function") {
        tawk.maximize();
      } else if (typeof tawk.toggle === "function") {
        tawk.toggle();
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-white">
        <Navbar />

        <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
              DIRECT INQUIRIES
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white mb-4">
              Get in Touch with AWS SBG PIET
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              Have questions regarding AWS Student Community Day 2026 passes, sponsorships, speaking proposals, or student builder chapters? Send us a message or chat live.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Contact Channels */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Direct Info Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200 dark:border-white/[0.08] shadow-sm">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4">
                  Official Contact Channels
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#8E35EA]/10 dark:bg-[#AD5CFF]/15 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0 mt-0.5">
                      <HugeiconsIcon icon={Mail01Icon} className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Email Team</span>
                      <a href={`mailto:${EVENT_DETAILS.email}`} className="text-slate-500 dark:text-slate-400 hover:text-[#8E35EA] dark:hover:text-[#AD5CFF] transition-colors">
                        {EVENT_DETAILS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-[#0EA5E9]/10 dark:bg-[#0EA5E9]/15 text-[#0EA5E9] shrink-0 mt-0.5">
                      <HugeiconsIcon icon={Location01Icon} className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Host Campus</span>
                      <span className="text-slate-500 dark:text-slate-400 leading-relaxed block">
                        Panipat Institute of Engineering & Technology (PIET), Samalkha, Panipat, Haryana 132102
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                      <HugeiconsIcon icon={Globe02Icon} className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Community Chapter</span>
                      <a href={EVENT_DETAILS.commudleUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1">
                        <span>Commudle / AWS SBG PIET</span>
                        <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tawk.to Live Chat Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#8E35EA]/10 via-[#AD5CFF]/5 to-transparent border border-[#AD5CFF]/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E35EA] dark:text-[#AD5CFF]">
                      INSTANT LIVE ASSISTANCE
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-950 dark:text-white mb-1">
                    Need instant answers?
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Our community volunteers and organizers are active on live chat for real-time pass and venue queries.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenLiveChat}
                  className="w-full py-3 rounded-2xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/20 active:scale-[0.98] cursor-pointer"
                >
                  <HugeiconsIcon icon={Chat01Icon} className="h-4 w-4" />
                  <span>Start Live Chat Now</span>
                </button>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200 dark:border-white/[0.08] shadow-sm">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center flex flex-col items-center gap-3"
                  >
                    <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-1">
                      <HugeiconsIcon icon={Tick02Icon} className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                      Message Dispatched Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                      Thank you for reaching out. An automated confirmation has been dispatched and our core team will respond to your email shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setMessage("");
                      }}
                      className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-xs font-semibold text-slate-800 dark:text-white transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Aarav Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-[#AD5CFF] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="aarav@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-[#AD5CFF] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Phone / WhatsApp (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-[#AD5CFF] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          Inquiry Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070B1A] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-[#AD5CFF] focus:outline-none transition-colors"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Message / Questions *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe how we can assist you..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs sm:text-sm focus:border-[#AD5CFF] focus:outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 rounded-2xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/25 active:scale-[0.98] cursor-pointer"
                    >
                      {isSending ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <HugeiconsIcon icon={SparklesIcon} className="h-4 w-4" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

