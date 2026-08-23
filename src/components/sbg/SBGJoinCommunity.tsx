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
      handle: "aws-student-builder-group-piet",
      desc: "Join our official chapter to RSVP for all workshops, buildathons, and summits.",
      href: EVENT_DETAILS.commudleUrl,
      icon: Globe02Icon,
      accent: "#AD5CFF",
    },
    {
      name: "WhatsApp Community Group",
      handle: "AWS SBG PIET Community",
      desc: "Instant announcements, daily cloud tips, study groups, and direct discussions.",
      href: "https://chat.whatsapp.com",
      icon: UserGroupIcon,
      accent: "#25D366",
    },
    {
      name: "LinkedIn Page",
      handle: "AWS Student Builder Group PIET",
      desc: "Professional spotlights, event recaps, project showcases, and student achievements.",
      href: "https://linkedin.com",
      icon: Linkedin01Icon,
      accent: "#0A66C2",
    },
    {
      name: "Instagram",
      handle: "@awssbg_piet",
      desc: "Campus event highlights, reels, behind-the-scenes, and builder stories.",
      href: "https://instagram.com",
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
    {
      name: "Student Meetup Circle",
      handle: "AWS Panipat Community",
      desc: "Regional tech meetups, hackathons, and cross-college developer gatherings.",
      href: "https://meetup.com",
      icon: SparklesIcon,
      accent: "#F59E0B",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {channels.map((ch, index) => (
          <motion.a
            key={ch.name}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 rounded-3xl bg-white dark:bg-[#090E1E] border border-slate-200/90 dark:border-white/[0.08] hover:border-[#AD5CFF]/50 transition-all flex flex-col justify-between shadow-sm group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className="h-10 w-10 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${ch.accent}15`, color: ch.accent }}
                >
                  <HugeiconsIcon icon={ch.icon} className="h-5 w-5" />
                </div>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="h-4 w-4 text-slate-400 group-hover:text-[#AD5CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>

              <h3 className="text-base font-extrabold text-slate-950 dark:text-white mb-1">
                {ch.name}
              </h3>
              <span className="text-xs font-mono text-[#8E35EA] dark:text-[#BE7BFF] block mb-2">
                {ch.handle}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ch.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.06] text-xs font-bold text-[#8E35EA] dark:text-[#AD5CFF]">
              Join Channel →
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
