"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowUpRight01Icon,
  Sun01Icon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  onOpenCFP: () => void;
  onOpenTickets: () => void;
}

export default function Navbar({ onOpenCFP, onOpenTickets }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 py-3.5 transition-all duration-300">
      <div
        className={`w-full max-w-7xl rounded-full px-4 sm:px-5 py-2 transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-white/90 dark:bg-[#060814]/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] shadow-xl shadow-slate-200/50 dark:shadow-black/80"
            : "bg-white/75 dark:bg-[#080D1E]/65 backdrop-blur-lg border border-slate-200/80 dark:border-white/[0.08]"
        }`}
      >
        {/* Brand Logo & Professional Name (Clean, No Hover Animations) */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative h-8 w-8 rounded-lg bg-[#AD5CFF]/15 dark:bg-[#AD5CFF]/20 border border-[#AD5CFF]/30 p-1 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/sbg-logo.png"
              alt="AWS Student Builder Group Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              AWS Student Builder Group
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600 dark:text-slate-300 tracking-wide uppercase">
              PIET Panipat
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] rounded-full px-2 py-0.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-white/[0.06] transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <HugeiconsIcon icon={Sun01Icon} className="h-4 w-4 text-amber-400" />
            ) : (
              <HugeiconsIcon icon={Moon02Icon} className="h-4 w-4 text-[#8E35EA]" />
            )}
          </button>

          <button
            onClick={onOpenCFP}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/10 rounded-full transition-all cursor-pointer"
          >
            Submit CFP
          </button>
          <button
            onClick={onOpenTickets}
            className="group px-3.5 py-1.5 text-xs font-bold text-white bg-[#AD5CFF] hover:bg-[#BE7BFF] rounded-full transition-all flex items-center gap-1.5 shadow-sm shadow-[#AD5CFF]/30 cursor-pointer"
          >
            <span>Claim Free Pass</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="lg:hidden flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <HugeiconsIcon icon={Sun01Icon} className="h-4 w-4 text-amber-400" />
            ) : (
              <HugeiconsIcon icon={Moon02Icon} className="h-4 w-4 text-[#8E35EA]" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 rounded-2xl bg-white/95 dark:bg-[#080D1E]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/15 p-5 shadow-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 pb-3 mb-1 border-b border-slate-200 dark:border-white/10">
              <Image
                src="/images/sbg-logo.png"
                alt="AWS SBG Logo"
                width={26}
                height={26}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-950 dark:text-white">
                  AWS Student Builder Group
                </span>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  PIET Panipat
                </span>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#AD5CFF] dark:hover:text-[#AD5CFF] hover:bg-slate-100 dark:hover:bg-white/[0.04] rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCFP();
                }}
                className="w-full py-2.5 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 rounded-xl"
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
