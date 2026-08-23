"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ParticleNetworkCanvas from "@/components/ParticleNetworkCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import MobileBottomDock from "@/components/MobileBottomDock";

// SBG Homepage Specific Components
import SBGHero from "@/components/sbg/SBGHero";
import SBGFlagshipBanner from "@/components/sbg/SBGFlagshipBanner";
import SBGAbout from "@/components/sbg/SBGAbout";
import SBGProjects from "@/components/sbg/SBGProjects";
import SBGDomains from "@/components/sbg/SBGDomains";
import SBGLeadership from "@/components/sbg/SBGLeadership";
import SBGJoinCommunity from "@/components/sbg/SBGJoinCommunity";

export default function SBGHomePage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-slate-100 selection:bg-[#AD5CFF]/30 selection:text-slate-950 dark:selection:text-white overflow-x-hidden font-sans transition-colors duration-300">
        {/* Top Violet Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Background Interactive Ambient Canvas */}
        <ParticleNetworkCanvas />

        {/* Floating Pill Navigation Bar */}
        <Navbar onOpenCFP={() => {}} onOpenTickets={() => {}} />

        {/* Main Homepage Layout */}
        <main className="relative z-10 flex flex-col gap-12 sm:gap-20">
          {/* Club Hero */}
          <SBGHero />

          {/* Featured Flagship Summit 2026 Spotlight Banner */}
          <SBGFlagshipBanner />

          {/* About the Chapter & University Credentials */}
          <SBGAbout />

          {/* Technical Domains & Focus Areas */}
          <SBGDomains />

          {/* Leadership & Faculty Mentorship */}
          <SBGLeadership />

          {/* Join Community Channels & Commudle Hub */}
          <SBGJoinCommunity />
        </main>

        {/* Sticky Bottom Right Actions: Scroll To Top & Brevo Live Chat */}
        <FloatingActions />

        {/* Native Mobile Bottom Navigation Dock */}
        <MobileBottomDock />

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
