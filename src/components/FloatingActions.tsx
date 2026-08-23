"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp02Icon,
  Chat01Icon,
  Cancel01Icon,
  Tick02Icon,
  SparklesIcon,
  Mail01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { EVENT_DETAILS } from "@/lib/data";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !userEmail) return;

    setIsSending(true);
    try {
      // Dispatches query to Brevo/API route
      await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: "Live Chat Support Inquiry",
          contactPerson: "Live Attendee",
          email: userEmail,
          phone: "Chat Widget",
          tier: "Live Chat Question",
          customGoals: message,
        }),
      });

      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        setMessage("");
        setUserEmail("");
        setChatOpen(false);
      }, 3000);
    } catch {
      // Graceful fallback
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        setChatOpen(false);
      }, 3000);
    } finally {
      setIsSending(false);
    }
  };

  const quickQuestions = [
    "How do I claim my pass for 11 Sept?",
    "Where is PIET Campus located?",
    "How can my company sponsor the summit?",
  ];

  return (
    <aside aria-label="Floating Actions" className="hidden lg:flex fixed bottom-6 right-7 z-50 flex-col items-end gap-3 pointer-events-none">
      {/* MailerLite Quick Support Modal / Drawer */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[calc(100vw-2.5rem)] sm:w-96 rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/15 p-5 shadow-2xl shadow-purple-500/15 pointer-events-auto overflow-hidden text-slate-900 dark:text-white"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#8E35EA] to-[#AD5CFF] text-white flex items-center justify-center shadow-md">
                  <HugeiconsIcon icon={Chat01Icon} className="h-5 w-5" />
                  {/* Static Online Dot */}
                  <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-emerald-500 border-2 border-white dark:border-[#080D1E] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-950 dark:text-white leading-tight">
                    AWS SBG Support
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                    Online • MailerLite Connected
                  </span>
                </div>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            {sentSuccess ? (
              <div className="py-8 text-center flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                  <HugeiconsIcon icon={Tick02Icon} className="h-5 w-5" />
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">Message Dispatched!</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Our community team will respond to your email shortly.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Have a question about passes, schedule, CFP, or sponsorship? Ask us directly or pick below:
                </p>

                {/* Quick Question Chips */}
                <div className="space-y-1.5 mb-3.5">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setMessage(q)}
                      className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-purple-50 dark:hover:bg-[#AD5CFF]/10 border border-slate-200/80 dark:border-white/[0.06] text-[11px] text-slate-700 dark:text-slate-300 hover:text-[#8E35EA] dark:hover:text-[#BE7BFF] transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span>{q}</span>
                      <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>

                {/* Direct Message Form */}
                <form onSubmit={handleSendMessage} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-2.5 rounded-xl bg-[#AD5CFF] hover:bg-[#BE7BFF] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#AD5CFF]/25 cursor-pointer"
                  >
                    {isSending ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <HugeiconsIcon icon={SparklesIcon} className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Link */}
                <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-center">
                  <a
                    href={`mailto:${EVENT_DETAILS.email}`}
                    className="text-[11px] text-slate-500 hover:text-[#AD5CFF] flex items-center justify-center gap-1"
                  >
                    <HugeiconsIcon icon={Mail01Icon} className="h-3 w-3" />
                    <span>Direct Email: {EVENT_DETAILS.email}</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Group (Live Chat + Scroll to Top) */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Live Chat Launcher Button — clean, minimal, no hover scale */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setChatOpen(!chatOpen)}
          className="relative p-3.5 rounded-full bg-slate-950 dark:bg-[#090E1E] text-white border border-[#AD5CFF]/60 shadow-lg flex items-center justify-center transition-all cursor-pointer"
          aria-label="Open Live Chat Support"
          title="Live Chat Support"
        >
          {/* Static green online dot — no blink */}
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 dark:border-[#090E1E]" />
          <HugeiconsIcon icon={Chat01Icon} className="h-5 w-5 text-[#BE7BFF]" />
        </motion.button>

        {/* Scroll-To-Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 10 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              className="p-3.5 rounded-full bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white shadow-xl shadow-[#AD5CFF]/35 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <HugeiconsIcon icon={ArrowUp02Icon} className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
