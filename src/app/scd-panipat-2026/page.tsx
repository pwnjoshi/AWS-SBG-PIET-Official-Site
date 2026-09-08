"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
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
import SponsorModal from "@/components/SponsorModal";
import TicketModal from "@/components/TicketModal";
import SCDLoadingScreen from "@/components/SCDLoadingScreen";
import CompetitionsSection from "@/components/CompetitionsSection";

export default function SCDPanipatPage() {
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [selectedSponsorTier, setSelectedSponsorTier] = useState<string | undefined>(undefined);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicketTier, setSelectedTicketTier] = useState<string | undefined>(undefined);

  const handleOpenTickets = (tierId?: string) => {
    setSelectedTicketTier(tierId);
    setTicketModalOpen(true);
  };

  const handleOpenSponsorModal = (tierName?: string) => {
    setSelectedSponsorTier(tierName || "Title Sponsor (Rs. 1,50,000)");
    setSponsorModalOpen(true);
  };

  return (
    <>
      <SCDLoadingScreen />

      <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-slate-100 selection:bg-[#AD5CFF]/30 selection:text-slate-950 dark:selection:text-white overflow-x-hidden font-sans transition-colors duration-300">
          <ScrollProgressBar />
          <ParticleNetworkCanvas />

          <Navbar
            onOpenTickets={() => handleOpenTickets("builder-pass")}
          />

          <main>
            <Hero
              onOpenTickets={() => handleOpenTickets("builder-pass")}
            />

            <WhyAttend onOpenTickets={() => handleOpenTickets("builder-pass")} />
            <LearningTracks onOpenTickets={() => handleOpenTickets("builder-pass")} />
            <Agenda />
            <CompetitionsSection />
            <SpeakersCFP />
            <TicketsSection onOpenTicketsModal={(tierId) => handleOpenTickets(tierId)} />
            <SponsorsSection onOpenSponsorModal={handleOpenSponsorModal} />
            <VenueSection />
            <FAQSection />
            <CommunitySocials />
          </main>

          <FloatingActions />
          <MobileBottomDock onOpenTickets={() => handleOpenTickets("builder-pass")} />
          <Footer />

          <SponsorModal
            isOpen={sponsorModalOpen}
            onClose={() => setSponsorModalOpen(false)}
            selectedTier={selectedSponsorTier}
          />
          <TicketModal
            isOpen={ticketModalOpen}
            onClose={() => setTicketModalOpen(false)}
            selectedTierId={selectedTicketTier}
          />
        </div>
    </>
  );
}