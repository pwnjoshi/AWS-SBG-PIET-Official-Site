"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

interface NavbarProps {
  onOpenCFP: () => void;
  onOpenTickets: () => void;
}

export default function Navbar({ onOpenCFP, onOpenTickets }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Tracks", href: "#tracks" },
    { name: "Schedule", href: "#agenda" },
    { name: "Speakers", href: "#speakers" },
    { name: "Passes", href: "#tickets" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Venue", href: "#venue" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 transition-all duration-300">
      <div
        className={`w-full max-w-6xl rounded-full px-5 py-2.5 transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-[#060814]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl shadow-black/80"
            : "bg-[#080D1E]/60 backdrop-blur-lg border border-white/[0.08]"
        }`}
      >
        {/* Brand Typographic Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-white group-hover:text-[#AD5CFF] transition-colors">
                AWS SCD
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#AD5CFF]/15 text-[#BE7BFF] border border-[#AD5CFF]/30 tracking-wider">
                PANIPAT 2026
              </span>
            </div>
            <span className="text-[9px] font-medium text-slate-400 tracking-wider uppercase">
              PIET Campus • 2 Sept 2026
            </span>
          </div>
        </Link>

        {/* Center Pill Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-2.5 py-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenCFP}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10 rounded-full transition-all"
          >
            Submit CFP
          </button>
          <button
            onClick={onOpenTickets}
            className="group px-4 py-1.5 text-xs font-bold text-white bg-[#AD5CFF] hover:bg-[#BE7BFF] rounded-full transition-all flex items-center gap-1.5 shadow-sm shadow-[#AD5CFF]/30"
          >
            <span>Claim Free Pass</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-full bg-white/[0.06] border border-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
          ) : (
            <HugeiconsIcon icon={Menu01Icon} className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 rounded-2xl bg-[#080D1E]/95 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#AD5CFF] hover:bg-white/[0.04] rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCFP();
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl"
              >
                Submit Speaker CFP
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTickets();
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#AD5CFF] hover:bg-[#BE7BFF] rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#AD5CFF]/25"
              >
                <span>Claim Free Pass on Commudle</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
