"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Layers01Icon,
  Calendar03Icon,
  Ticket01Icon,
  SparklesIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

interface MobileBottomDockProps {
  onOpenTickets?: () => void;
}

interface TabItem {
  name: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  active: boolean;
  highlight?: boolean;
  onClick?: () => void;
}

export default function MobileBottomDock({ onOpenTickets }: MobileBottomDockProps) {
  const pathname = usePathname();
  const isSCDPage = pathname?.includes("/scd-panipat-2026");
  const isBadgePage = pathname === "/scd-panipat-2026/badge";

  const scdTabs: TabItem[] = [
    {
      name: "Summit",
      href: "/scd-panipat-2026#overview",
      icon: Home01Icon,
      active: isSCDPage && !isBadgePage,
    },
    {
      name: "Tracks",
      href: "/scd-panipat-2026#tracks",
      icon: Layers01Icon,
      active: false,
    },
    {
      name: "Schedule",
      href: "/scd-panipat-2026#agenda",
      icon: Calendar03Icon,
      active: false,
    },
    {
      name: "Passes",
      href: "/scd-panipat-2026#tickets",
      icon: Ticket01Icon,
      active: false,
      onClick: onOpenTickets,
    },
    {
      name: "Badge",
      href: "/scd-panipat-2026/badge",
      icon: SparklesIcon,
      active: isBadgePage,
      highlight: true,
    },
  ];

  const homeTabs: TabItem[] = [
    {
      name: "Home",
      href: "/#hero",
      icon: Home01Icon,
      active: pathname === "/",
    },
    {
      name: "About",
      href: "/#about",
      icon: UserGroupIcon,
      active: false,
    },
    {
      name: "Domains",
      href: "/#domains",
      icon: Layers01Icon,
      active: false,
    },
    {
      name: "Projects",
      href: "/#projects",
      icon: Calendar03Icon,
      active: false,
    },
    {
      name: "SCD 2026",
      href: "/scd-panipat-2026",
      icon: SparklesIcon,
      active: false,
      highlight: true,
    },
  ];

  const tabs = isSCDPage ? scdTabs : homeTabs;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1 pointer-events-none select-none">
      <nav
        className="pointer-events-auto max-w-md mx-auto rounded-3xl bg-white/95 dark:bg-[#060814]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 p-1.5 shadow-2xl shadow-black/30 dark:shadow-black/80 flex items-center justify-around"
        aria-label="Mobile Bottom App Bar"
      >
        {tabs.map((tab) => {
          if (tab.onClick) {
            return (
              <button
                key={tab.name}
                type="button"
                onClick={tab.onClick}
                className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-90 cursor-pointer flex-1"
              >
                <div className="h-9 w-9 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#AD5CFF] dark:hover:text-[#AD5CFF]">
                  <HugeiconsIcon icon={tab.icon} className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 mt-0.5 tracking-tight">
                  {tab.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-90 flex-1 ${
                tab.highlight
                  ? "text-[#8E35EA] dark:text-[#AD5CFF]"
                  : tab.active
                  ? "text-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.highlight ? (
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#8E35EA] to-[#AD5CFF] text-white flex items-center justify-center shadow-md shadow-[#AD5CFF]/30">
                  <HugeiconsIcon icon={tab.icon} className="h-5 w-5" />
                </div>
              ) : (
                <div
                  className={`h-9 w-9 rounded-2xl flex items-center justify-center transition-colors ${
                    tab.active
                      ? "bg-slate-100 dark:bg-white/[0.08] text-[#8E35EA] dark:text-[#AD5CFF]"
                      : ""
                  }`}
                >
                  <HugeiconsIcon icon={tab.icon} className="h-5 w-5" />
                </div>
              )}

              <span
                className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
                  tab.highlight
                    ? "font-extrabold text-[#8E35EA] dark:text-[#AD5CFF]"
                    : tab.active
                    ? "font-bold text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
