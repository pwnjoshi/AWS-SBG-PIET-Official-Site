"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

interface SoundtrackContextType {
  isPlaying: boolean;
  toggleSoundtrack: () => void;
  play: () => void;
  pause: () => void;
}

const SoundtrackContext = createContext<SoundtrackContextType | undefined>(undefined);

// Indian Raag Bhupali Pentatonic Frequencies (Sa, Re, Ga, Pa, Dha) in Hz
const RAAG_NOTES = [
  { name: "Sa", freq: 261.63 }, // C4
  { name: "Re", freq: 293.66 }, // D4
  { name: "Ga", freq: 329.63 }, // E4
  { name: "Pa", freq: 392.00 }, // G4
  { name: "Dha", freq: 440.00 }, // A4
  { name: "Taar Sa", freq: 523.25 }, // C5
  { name: "Taar Re", freq: 587.33 }, // D5
  { name: "Taar Ga", freq: 659.25 }, // E5
];

export function SoundtrackProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize HTML5 audio element with rise_awssbg_geu.mp3
    const audio = new Audio("/audio/rise_awssbg_geu.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = () => {
    setIsPlaying(true);
    try {
      if (!audioRef.current) {
        const audio = new Audio("/audio/rise_awssbg_geu.mp3");
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;
      }
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback note:", err);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  };

  const pause = () => {
    setIsPlaying(false);
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } catch (e) {
      console.warn("Audio pause error:", e);
    }
  };

  const toggleSoundtrack = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <SoundtrackContext.Provider
      value={{
        isPlaying,
        toggleSoundtrack,
        play,
        pause,
      }}
    >
      {children}
    </SoundtrackContext.Provider>
  );
}

export function useSoundtrack() {
  const context = useContext(SoundtrackContext);
  if (!context) {
    throw new Error("useSoundtrack must be used within a SoundtrackProvider");
  }
  return context;
}
