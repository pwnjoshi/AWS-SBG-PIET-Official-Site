"use client";

import Link from "next/link";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ParticleNetworkCanvas from "@/components/ParticleNetworkCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import MobileBottomDock from "@/components/MobileBottomDock";
import BadgeGenerator from "@/components/BadgeGenerator";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { EVENT_DETAILS } from "@/lib/data";

export default function BadgeStudioPage() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-slate-100 selection:bg-[#AD5CFF]/30 selection:text-slate-950 dark:selection:text-white overflow-x-hidden font-sans transition-colors duration-300">
          <ScrollProgressBar />
          <ParticleNetworkCanvas />
          <Navbar onOpenCFP={() => {}} onOpenTickets={() => {}} />

          <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8">
            {/* Breadcrumb / Back Link */}
            <div className="flex items-center justify-between">
              <Link
                href="/scd-panipat-2026"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#AD5CFF] transition-colors"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="h-4 w-4" />
                <span>Back to AWS SCD Panipat 2026</span>
              </Link>

              <a
                href={EVENT_DETAILS.commudleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#8E35EA] dark:text-[#AD5CFF] flex items-center gap-1 hover:underline"
              >
                <span>Register on Commudle</span>
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3 w-3" />
              </a>
            </div>

            {/* Badge Generator Component */}
            <BadgeGenerator />
          </main>

          {/* Sticky Bottom Right Actions: Scroll To Top & Brevo Live Chat */}
          <FloatingActions />

          {/* Native Mobile Bottom Navigation Dock */}
          <MobileBottomDock />

          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
