"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Globe02Icon,
  Mail01Icon,
  Linkedin01Icon,
  InstagramIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { EVENT_DETAILS } from "@/lib/data";

export default function SBGJoinCommunity() {
  const channels = [
    {
      name: "Commudle Official Chapter",
      handle: "Indian dev community",
      desc: "Join our official chapter to RSVP for all workshops, buildathons, and summits.",
      href: EVENT_DETAILS.commudleUrl,
      icon: Globe02Icon,
      accent: "#AD5CFF",
    },
    {
      name: "Join WhatsApp",
      handle: "Get quick updates",
      desc: "Instant announcements, daily cloud tips, study groups, and direct discussions.",
      href: EVENT_DETAILS.whatsappUrl,
      icon: UserGroupIcon,
      accent: "#25D366",
    },
    {
      name: "Meetup Events",
      handle: "Register for events",
      desc: "Regional tech meetups, hackathons, and cross-college developer gatherings.",
      href: EVENT_DETAILS.meetupUrl,
      icon: SparklesIcon,
      accent: "#F59E0B",
    },
    {
      name: "LinkedIn Page",
      handle: "AWS Student Builder Group PIET",
      desc: "Professional spotlights, event recaps, project showcases, and student achievements.",
      href: EVENT_DETAILS.linkedinUrl,
      icon: Linkedin01Icon,
      accent: "#0A66C2",
    },
    {
      name: "Instagram",
      handle: "@aws.sbg.piet",
      desc: "Campus event highlights, reels, behind-the-scenes, and builder stories.",
      href: EVENT_DETAILS.instagramUrl,
      icon: InstagramIcon,
      accent: "#E4405F",
    },
    {
      name: "Email Contact",
      handle: EVENT_DETAILS.email,
      desc: "Partnerships, speaker enquiries, and sponsorship collaborations.",
      href: `mailto:${EVENT_DETAILS.email}`,
      icon: Mail01Icon,
      accent: "#8E35EA",
    },
  ];

  return (
    <section id="community" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          CONNECT & BUILD
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Join the AWS Builder Community
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Stay connected with 500+ student developers, mentors, and cloud enthusiasts across our official channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
        {channels.map((ch, index) => (
          <motion.a
            key={ch.name}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/50 transition-all flex flex-col justify-between shadow-sm group"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                <div
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${ch.accent}15`, color: ch.accent }}
                >
                  <HugeiconsIcon icon={ch.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 group-hover:text-[#AD5CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>

              <h3 className="text-xs sm:text-base font-extrabold text-slate-950 dark:text-white mb-0.5 sm:mb-1 leading-snug">
                {ch.name}
              </h3>
              <span className="text-[10px] sm:text-xs font-mono text-[#8E35EA] dark:text-[#BE7BFF] block mb-1.5 sm:mb-2 truncate">
                {ch.handle}
              </span>
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                {ch.desc}
              </p>
            </div>

            <div className="pt-2.5 sm:pt-4 mt-2 sm:mt-4 border-t border-slate-100 dark:border-white/[0.06] text-[10px] sm:text-xs font-bold text-[#8E35EA] dark:text-[#AD5CFF]">
              Join Channel →
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
