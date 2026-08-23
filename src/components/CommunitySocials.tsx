"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { SOCIAL_LINKS, EVENT_DETAILS } from "@/lib/data";

export default function CommunitySocials() {
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setIsSubscribed(true);
      setSubscribedEmail("");
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl bg-[#070B1A] border border-white/10 p-7 sm:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD5CFF]">
              COMMUNITY & NETWORK
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Stay connected with AWS Student Builder Group
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              Connect with 500+ student peers, get immediate updates on speaker announcements, workshop repositories, and regional cloud hackathons.
            </p>

            {/* Social Channels */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {SOCIAL_LINKS.map((channel, idx) => {
                return (
                  <motion.a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#AD5CFF]/30 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {channel.name}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {channel.handle}
                      </span>
                    </div>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="rounded-xl bg-[#04060E] border border-white/[0.08] p-5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                SUMMIT ALERTS
              </span>

              <h4 className="text-sm font-bold text-white mb-1">
                Receive lab repositories & prerequisites
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                We will send you the official workshop GitHub repos and AWS Free Tier setup instructions 1 week before the summit.
              </p>

              {isSubscribed ? (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <HugeiconsIcon icon={Tick02Icon} className="h-4 w-4 shrink-0" />
                  <span>You are on the attendee notification list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <input
                    type="email"
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    placeholder="Enter your student email"
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-[#080D1E] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[#AD5CFF] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white text-xs font-bold transition-all shadow-md shadow-[#AD5CFF]/25 hover:scale-[1.02]"
                  >
                    Subscribe for Updates
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
