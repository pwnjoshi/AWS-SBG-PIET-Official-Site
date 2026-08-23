"use client";

import Link from "next/link";
import Image from "next/image";
import { EVENT_DETAILS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-slate-100 dark:bg-[#03050C] border-t border-slate-200 dark:border-white/[0.08] pt-14 pb-10 px-4 sm:px-6 lg:px-8 z-10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200 dark:border-white/[0.06]">
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-lg bg-[#AD5CFF]/15 dark:bg-[#AD5CFF]/20 border border-[#AD5CFF]/30 p-1 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/images/sbg-logo.png"
                  alt="AWS Student Builder Group Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">
                  AWS Student Builder Group at PIET
                </span>
                <span className="text-[10px] font-mono text-[#8E35EA] dark:text-[#BE7BFF] font-semibold">
                  Panipat Institute of Engineering & Technology
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mt-1">
              Empowering 500+ student developers across Haryana and NCR with hands-on AWS cloud computing, Generative AI, and career mentorship.
            </p>

            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              <span>Contact: </span>
              <a href={`mailto:${EVENT_DETAILS.email}`} className="text-[#8E35EA] dark:text-[#BE7BFF] hover:underline">
                {EVENT_DETAILS.email}
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  SBG PIET Homepage
                </Link>
              </li>
              <li>
                <Link href="/scd-panipat-2026" className="text-[#8E35EA] dark:text-[#AD5CFF] font-semibold hover:underline">
                  ★ AWS SCD Summit 2026
                </Link>
              </li>
              <li>
                <Link href="/scd-panipat-2026/badge" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  &ldquo;I&apos;m Attending&rdquo; Badge Maker
                </Link>
              </li>
              <li>
                <Link href="/scd-panipat-2026#tracks" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  6 Technical Tracks
                </Link>
              </li>
              <li>
                <Link href="/scd-panipat-2026#agenda" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Summit Day Schedule
                </Link>
              </li>
              <li>
                <a
                  href={EVENT_DETAILS.commudleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Official Commudle Chapter
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              About the Organization
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Organized by <span className="text-slate-900 dark:text-white font-semibold">AWS Student Builder Group at PIET</span> under the global AWS Student Builder Group & Cloud Club initiatives.
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Venue: 70 Milestone, G.T. Road, Pattikalyana, Samalkha, Panipat, Haryana – 132102.
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            © 2026 AWS Student Builder Group at PIET. Amazon Web Services, AWS, and the AWS logo are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
          <p className="font-mono text-[10px] text-[#8E35EA] dark:text-[#BE7BFF]">
            PIET SAMALKHA • HARYANA
          </p>
        </div>
      </div>
    </footer>
  );
}
