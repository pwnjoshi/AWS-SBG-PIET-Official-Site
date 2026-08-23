import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  SparklesIcon,
  Layers01Icon,
  Mail01Icon,
  ArrowRight01Icon,
  CompassIcon,
} from "@hugeicons/core-free-icons";

export default function NotFound() {
  const popularLinks = [
    {
      title: "AWS SCD Panipat 2026",
      desc: "Haryana's first-ever premier AWS Student Summit",
      href: "/scd-panipat-2026",
      icon: SparklesIcon,
      accent: "from-orange-500/20 to-purple-500/20 text-[#FF9900]",
    },
    {
      title: "Delegate Badge Studio",
      desc: "Generate your official conference pass & share on LinkedIn",
      href: "/scd-panipat-2026/badge",
      icon: Layers01Icon,
      accent: "from-purple-500/20 to-indigo-500/20 text-[#AD5CFF]",
    },
    {
      title: "Community & Leadership",
      desc: "Meet the student builder council and core leads",
      href: "/#team",
      icon: CompassIcon,
      accent: "from-blue-500/20 to-cyan-500/20 text-[#38BDF8]",
    },
    {
      title: "Contact & Inquiries",
      desc: "Get in touch for pass, CFP, or partnership inquiries",
      href: "/contact",
      icon: Mail01Icon,
      accent: "from-emerald-500/20 to-teal-500/20 text-[#10B981]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#AD5CFF]/30 selection:text-white">
      {/* Background Ambience & Glow Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial Aurora Top Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#8E35EA]/20 via-[#FF9900]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[#38BDF8]/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-[#AD5CFF]/15 blur-[140px] rounded-full" />

        {/* Tech Circuit Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* Minimal Top Header Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8 rounded-xl bg-[#AD5CFF]/15 border border-[#AD5CFF]/30 p-1 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            <Image
              src="/images/sbg-logo.png"
              alt="AWS SBG PIET"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
            AWS SBG PIET
          </span>
        </Link>

        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-slate-200/80 dark:bg-white/[0.06] hover:bg-slate-300 dark:hover:bg-white/[0.1] text-xs font-bold text-slate-700 dark:text-slate-200 transition-all border border-slate-300/60 dark:border-white/10 flex items-center gap-1.5"
        >
          <HugeiconsIcon icon={Home01Icon} className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
      </header>

      {/* Center 404 Hero Visual & Message */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 sm:py-14 text-center">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-[#FF9900] text-xs font-mono font-bold mb-6 animate-pulse">
          <span className="h-2 w-2 rounded-full bg-[#FF9900]" />
          <span>ERROR 404 • ROUTE NOT FOUND IN CLOUD</span>
        </div>

        {/* Giant Holographic 404 Typography */}
        <div className="relative mb-4">
          <h1 className="text-7xl sm:text-9xl font-black tracking-tighter leading-none select-none bg-gradient-to-r from-[#FF9900] via-[#AD5CFF] to-[#38BDF8] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(173,92,255,0.3)]">
            404
          </h1>
          {/* Subtle Hindi Watermark behind 404 */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-9xl font-black text-slate-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none">
            पानीपत
          </span>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          Lost in Cloud Architecture?
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          The requested endpoint or resource does not exist in this region. Don&apos;t worry, you can easily deploy back to safe ground below.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF9900] to-[#AD5CFF] hover:from-[#e68a00] hover:to-[#9a45f0] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
          >
            <HugeiconsIcon icon={Home01Icon} className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/scd-panipat-2026"
            className="px-6 py-3 rounded-2xl bg-white dark:bg-[#0E1430] hover:bg-slate-50 dark:hover:bg-[#151D44] text-slate-900 dark:text-white text-xs sm:text-sm font-bold transition-all border border-slate-200 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/30 shadow-sm flex items-center gap-2"
          >
            <HugeiconsIcon icon={SparklesIcon} className="h-4 w-4 text-[#AD5CFF]" />
            <span>AWS SCD Panipat 2026</span>
          </Link>
        </div>

        {/* Quick Nav Destination Hubs Grid */}
        <div className="text-left">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              EXPLORE POPULAR DESTINATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {popularLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-4 rounded-2xl bg-white dark:bg-[#080D1E]/90 hover:bg-slate-50 dark:hover:bg-[#0E1530] border border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${item.accent} border border-current/20`}
                    >
                      <HugeiconsIcon icon={item.icon} className="h-4 w-4" />
                    </div>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-transform group-hover:translate-x-1"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#AD5CFF] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-slate-200/80 dark:border-white/[0.06] text-center">
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
          © 2026 AWS Student Builder Group at PIET • <a href="https://awssbgpiet.in" className="hover:text-[#AD5CFF] transition-colors">awssbgpiet.in</a>
        </p>
      </footer>
    </main>
  );
}