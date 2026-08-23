"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowUpRight01Icon,
  Sun01Icon,
  Moon02Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "@/context/ThemeContext";
import { EVENT_DETAILS } from "@/lib/data";

interface NavbarProps {
  onOpenCFP?: () => void;
  onOpenTickets?: () => void;
}

export default function Navbar({ onOpenCFP, onOpenTickets }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isSCDPage = pathname?.includes("/scd-panipat-2026");

  interface NavItem {
    name: string;
    href: string;
    highlight?: boolean;
  }

  // Dynamic Navigation Links based on route
  const navLinks: NavItem[] = isSCDPage
    ? [
        { name: "Overview", href: "/scd-panipat-2026#overview" },
        { name: "Tracks", href: "/scd-panipat-2026#tracks" },
        { name: "Schedule", href: "/scd-panipat-2026#agenda" },
        { name: "Passes", href: "/scd-panipat-2026#tickets" },
        { name: "Badge Maker", href: "/scd-panipat-2026/badge" },
        { name: "Sponsors", href: "/scd-panipat-2026#sponsors" },
        { name: "Venue", href: "/scd-panipat-2026#venue" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "About", href: "/#about" },
        { name: "Domains", href: "/#domains" },
        { name: "Leadership", href: "/#team" },
        { name: "Community", href: "/#community" },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2.5 sm:px-4 py-2.5 sm:py-3.5 transition-all duration-300">
      <div
        className={`w-full max-w-7xl rounded-full px-3.5 sm:px-5 py-2 transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-white/90 dark:bg-[#060814]/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] shadow-xl shadow-slate-200/50 dark:shadow-black/80"
            : "bg-white/80 dark:bg-[#080D1E]/75 backdrop-blur-lg border border-slate-200/80 dark:border-white/[0.08]"
        }`}
      >
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-[#AD5CFF]/15 dark:bg-[#AD5CFF]/20 border border-[#AD5CFF]/30 p-1 flex items-center justify-center overflow-hidden">
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
              AWS SBG PIET
            </span>
            <span className="text-[8px] sm:text-[9px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              Student Community
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] rounded-full px-2.5 py-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
                link.highlight
                  ? "bg-[#AD5CFF] text-white font-bold shadow-sm shadow-[#AD5CFF]/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]"
              }`}
            >
              {link.highlight && <HugeiconsIcon icon={SparklesIcon} className="h-3 w-3" />}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Theme Toggle (Desktop) */}
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

          {isSCDPage ? (
            <>
              {onOpenCFP && (
                <button
                  onClick={onOpenCFP}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/10 rounded-full transition-all cursor-pointer"
                >
                  Submit CFP
                </button>
              )}
              {onOpenTickets ? (
                <button
                  onClick={onOpenTickets}
                  className="group px-3.5 py-1.5 text-xs font-bold text-white bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] rounded-full transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Get Event Pass</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              ) : (
                <a
                  href={EVENT_DETAILS.commudleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-3.5 py-1.5 text-xs font-bold text-white bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] rounded-full transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Register on Commudle</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </>
          ) : (
            <Link
              href="/scd-panipat-2026"
              className="group px-4 py-1.5 text-xs font-bold text-white bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] rounded-full transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Explore SCD Summit 2026</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mobile Header Controls (Theme Toggle + Menu Hamburger) */}
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
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Native-like Sheet */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
          />

          <div className="lg:hidden fixed inset-x-3 top-16 z-50 rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/15 p-5 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-7 w-7 rounded-lg bg-[#AD5CFF]/15 dark:bg-[#AD5CFF]/20 border border-[#AD5CFF]/30 p-1 flex items-center justify-center">
                    <Image
                      src="/images/sbg-logo.png"
                      alt="AWS SBG Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-slate-950 dark:text-white">
                      AWS SBG PIET
                    </span>
                    <span className="text-[9px] font-mono text-[#8E35EA] dark:text-[#AD5CFF]">
                      Panipat, Haryana
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-500"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-semibold rounded-2xl transition-all flex items-center justify-between ${
                      link.highlight
                        ? "bg-[#AD5CFF] text-white shadow-md shadow-[#AD5CFF]/25"
                        : "text-slate-700 dark:text-slate-200 hover:text-[#AD5CFF] dark:hover:text-[#AD5CFF] hover:bg-slate-50 dark:hover:bg-white/[0.04] active:bg-slate-100"
                    }`}
                  >
                    <span>{link.name}</span>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                ))}
              </div>

              {/* Action Buttons in Drawer */}
              <div className="pt-3 mt-2 border-t border-slate-100 dark:border-white/10 flex flex-col gap-2">
                {isSCDPage ? (
                  <>
                    <a
                      href={EVENT_DETAILS.commudleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 text-xs font-bold text-white bg-[#AD5CFF] hover:bg-[#BE7BFF] rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-[#AD5CFF]/25 active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <span>Register Pass on Commudle</span>
                      <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
                    </a>

                    <Link
                      href="/scd-panipat-2026/badge"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] rounded-2xl text-center"
                    >
                      Create &ldquo;I&apos;m Attending&rdquo; Badge
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/scd-panipat-2026"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-xs font-bold text-white bg-[#AD5CFF] hover:bg-[#BE7BFF] rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-[#AD5CFF]/25 active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    <span>AWS SCD Summit 2026 (11 Sept)</span>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
