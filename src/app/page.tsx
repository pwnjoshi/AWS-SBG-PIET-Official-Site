"use client";

import { useState } from "react";
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
import CFPModal from "@/components/CFPModal";
import SponsorModal from "@/components/SponsorModal";
import TicketModal from "@/components/TicketModal";

export default function Home() {
  const [cfpModalOpen, setCfpModalOpen] = useState(false);
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicketTier, setSelectedTicketTier] = useState<string | undefined>(undefined);

  const handleOpenTickets = (tierId?: string) => {
    setSelectedTicketTier(tierId);
    setTicketModalOpen(true);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#05070E] text-slate-100 selection:bg-[#AD5CFF]/30 selection:text-white overflow-x-hidden font-sans">
        {/* Top Violet Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Background Interactive Ambient Canvas */}
        <ParticleNetworkCanvas />

        {/* Floating Pill Navigation Bar */}
        <Navbar
          onOpenCFP={() => setCfpModalOpen(true)}
          onOpenTickets={() => handleOpenTickets("student-pass")}
        />

        {/* Main Content Layout */}
        <main className="relative z-10 flex flex-col gap-8 sm:gap-16">
          {/* Cinematic Monumental Hero Section with Scroll Parallax */}
          <Hero
            onOpenCFP={() => setCfpModalOpen(true)}
            onOpenTickets={() => handleOpenTickets("student-pass")}
          />

          {/* Why Attend & Credly Badge Spotlight */}
          <WhyAttend onOpenTickets={() => handleOpenTickets("student-pass")} />

          {/* 6 Technical Learning Tracks with Visual Architecture Cards */}
          <LearningTracks onOpenTickets={() => handleOpenTickets("student-pass")} />

          {/* Full-Day Schedule Timeline */}
          <Agenda />

          {/* Speakers Lineup & Call for Proposals (CFP) */}
          <SpeakersCFP onOpenCFP={() => setCfpModalOpen(true)} />

          {/* Passes, Pricing & Live Holographic Pass Generator */}
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
  );
}
