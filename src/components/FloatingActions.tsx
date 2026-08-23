"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { VolumeHighIcon, VolumeMute01Icon } from "@hugeicons/core-free-icons";
import { useSoundtrack } from "@/context/SoundtrackContext";

export default function FloatingActions() {
  const { isPlaying, toggleSoundtrack } = useSoundtrack();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!scrolled && !isPlaying) return null;

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-40 flex items-center gap-2 select-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={toggleSoundtrack}
        aria-label={isPlaying ? "Mute Celebratory Ambience Mode" : "Activate Celebratory Ambience Mode"}
        className={`px-3 py-2 rounded-full transition-all cursor-pointer flex items-center gap-2 text-xs font-mono font-bold backdrop-blur-xl shadow-xl active:scale-95 ${
          isPlaying
            ? "bg-slate-950/90 dark:bg-[#070B1A]/95 text-white border-2 border-[#AD5CFF] shadow-purple-500/30"
            : "bg-white/90 dark:bg-[#070B1A]/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/15 hover:border-[#AD5CFF]/60 hover:text-[#8E35EA] dark:hover:text-[#AD5CFF]"
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-1 h-2.5 bg-gradient-to-t from-[#AD5CFF] to-[#FF9900] rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-gradient-to-t from-[#AD5CFF] to-[#FF9900] rounded-full animate-bounce" />
              <span className="w-1 h-2 bg-gradient-to-t from-[#AD5CFF] to-[#FF9900] rounded-full animate-pulse" />
            </div>
            <span className="text-[#BE7BFF] hidden sm:inline">✨ Ambience Mode</span>
          </>
        ) : (
          <>
            <HugeiconsIcon icon={VolumeMute01Icon} className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">✨ Ambience</span>
          </>
        )}
      </button>
    </div>
  );
}



