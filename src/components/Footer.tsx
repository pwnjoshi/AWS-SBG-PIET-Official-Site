"use client";

import Link from "next/link";
import { EVENT_DETAILS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-slate-100 dark:bg-[#03050C] border-t border-slate-200 dark:border-white/[0.08] pt-14 pb-10 px-4 sm:px-6 lg:px-8 z-10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200 dark:border-white/[0.06]">
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                AWS Student Community Day
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#AD5CFF]/15 text-[#8E35EA] dark:text-[#BE7BFF] border border-[#AD5CFF]/25">
                PANIPAT 2026
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {EVENT_DETAILS.tagline} Hosted at PIET Campus, Samalkha, Panipat (NH-44), Haryana – 132102.
            </p>

            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              <span>Contact: </span>
              <a href={`mailto:${EVENT_DETAILS.email}`} className="text-[#8E35EA] dark:text-[#BE7BFF] hover:underline">
                {EVENT_DETAILS.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#overview" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  6 Technical Tracks
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Schedule
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Call for Speakers
                </a>
              </li>
              <li>
                <a href="#tickets" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Claim Passes
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Sponsors
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Venue & Transit
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Organizing Team
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Organized by <span className="text-slate-900 dark:text-white font-medium">AWS Student Builder Group PIET</span> in collaboration with regional student community leaders, AWS Heroes, and Community Builders.
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Committed to an inclusive and respectful learning environment for all attendees.
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © 2026 AWS Student Builder Group PIET. Amazon Web Services, AWS, and the AWS logo are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
          <p className="font-mono text-[10px] text-[#8E35EA] dark:text-[#BE7BFF]">
            PIET SAMALKHA • HARYANA
          </p>
        </div>
      </div>
    </footer>
  );
}
