"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ParticleNetworkCanvas from "@/components/ParticleNetworkCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyAttend from "@/components/WhyAttend";
import LearningTracks from "@/components/LearningTracks";
import Agenda from "@/components/Agenda";
import SpeakersCFP from "@/components/SpeakersCFP";
import TicketsSection from "@/components/TicketsSection";
import SponsorsSection from "@/components/SponsorsSection";
import VenueSection from "@/components/VenueSection";
import FAQSection from "@/components/FAQSection";
import CommunitySocials from "@/components/CommunitySocials";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import MobileBottomDock from "@/components/MobileBottomDock";
import CFPModal from "@/components/CFPModal";
import SponsorModal from "@/components/SponsorModal";
import TicketModal from "@/components/TicketModal";
import SCDLoadingScreen from "@/components/SCDLoadingScreen";

export default function SCDPanipatPage() {
  const [cfpModalOpen, setCfpModalOpen] = useState(false);
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicketTier, setSelectedTicketTier] = useState<string | undefined>(undefined);

  const handleOpenTickets = (tierId?: string) => {
    setSelectedTicketTier(tierId);
    setTicketModalOpen(true);
  };

  return (
    <ThemeProvider>
      {/* Light Mode Terminal Auto-Correcting Loading Screen */}
      <SCDLoadingScreen />

      <SmoothScroll>
        <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-slate-100 selection:bg-[#AD5CFF]/30 selection:text-slate-950 dark:selection:text-white overflow-x-hidden font-sans transition-colors duration-300">
          {/* Top Violet Scroll Progress Indicator */}
          <ScrollProgressBar />

          {/* Background Interactive Ambient Canvas */}
          <ParticleNetworkCanvas />

          {/* Floating Pill Navigation Bar */}
          <Navbar
            onOpenCFP={() => setCfpModalOpen(true)}
            onOpenTickets={() => handleOpenTickets("builder-pass")}
          />

          {/* Main Content Layout */}
          <main className="relative z-10 flex flex-col gap-8 sm:gap-16">
            {/* Cinematic Monumental Hero Section with Ambient Video */}
            <Hero
              onOpenCFP={() => setCfpModalOpen(true)}
              onOpenTickets={() => handleOpenTickets("builder-pass")}
            />

            {/* Why Attend & Credly Badge Spotlight & Previous SCDs */}
            <WhyAttend onOpenTickets={() => handleOpenTickets("builder-pass")} />

            {/* 6 Technical Learning Tracks with Visual Architecture Cards */}
            <LearningTracks onOpenTickets={() => handleOpenTickets("builder-pass")} />

            {/* Full-Day Schedule Timeline */}
            <Agenda />

            {/* Speakers Lineup & Call for Proposals (CFP) */}
            <SpeakersCFP onOpenCFP={() => setCfpModalOpen(true)} />

            {/* Passes & Viral Badge Generator */}
            <TicketsSection onOpenTicketsModal={(tierId) => handleOpenTickets(tierId)} />

            {/* Sponsorship Tiers & ROI Deck */}
            <SponsorsSection onOpenSponsorModal={() => setSponsorModalOpen(true)} />

            {/* PIET Panipat Venue, Transit & Photo Parallax */}
            <VenueSection />

            {/* Frequently Asked Questions */}
            <FAQSection />

            {/* Community Channels & Alert Subscriptions */}
            <CommunitySocials />
          </main>

          {/* Sticky Bottom Right Actions: Scroll To Top & Brevo Live Chat */}
          <FloatingActions />

          {/* Native Mobile Bottom Navigation Dock */}
          <MobileBottomDock onOpenTickets={() => handleOpenTickets("builder-pass")} />

          {/* Global Footer */}
          <Footer />

          {/* Interactive Modals */}
          <CFPModal
            isOpen={cfpModalOpen}
            onClose={() => setCfpModalOpen(false)}
          />

          <SponsorModal
            isOpen={sponsorModalOpen}
            onClose={() => setSponsorModalOpen(false)}
          />

          <TicketModal
            isOpen={ticketModalOpen}
            onClose={() => setTicketModalOpen(false)}
            selectedTierId={selectedTicketTier}
          />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
