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
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  const melodyIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Play a soft, soothing Indian flute / sitar chime note
  const triggerSoothingNote = (ctx: AudioContext, destination: AudioNode) => {
    try {
      const now = ctx.currentTime;
      const note = RAAG_NOTES[Math.floor(Math.random() * RAAG_NOTES.length)];

      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm triangle wave with lowpass filtering
      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.freq, now);

      // Subtle Indian classical meend (micro-pitch inflection)
      const pitchBend = note.freq * (Math.random() > 0.5 ? 1.015 : 0.985);
      osc.frequency.exponentialRampToValueAtTime(pitchBend, now + 1.2);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);

      // Pleasant, audible, soothing envelope
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.25);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(destination);

      osc.start(now);
      osc.stop(now + 2.6);
    } catch (e) {
      console.error("Error playing note:", e);
    }
  };

  const startSoundtrack = async () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const now = ctx.currentTime;

      // Master Gain (Pleasantly audible, warm and soothing)
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(0.20, now + 0.8);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // 1. Tanpura Foundation Drone (Root Sa: 130.81Hz, Pa: 196Hz, C4: 261.63Hz)
      const droneFreqs = [
        { freq: 130.81, type: "sine" as OscillatorType, gain: 0.12 },
        { freq: 196.00, type: "triangle" as OscillatorType, gain: 0.08 },
        { freq: 261.63, type: "sine" as OscillatorType, gain: 0.06 },
      ];

      const droneNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

      droneFreqs.forEach((item, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = item.type;
        osc.frequency.setValueAtTime(item.freq, now);
        osc.detune.setValueAtTime((idx - 1) * 3, now);

        g.gain.setValueAtTime(item.gain, now);

        osc.connect(g);
        g.connect(master);
        osc.start(now);

        droneNodes.push({ osc, gain: g });
      });

      droneNodesRef.current = droneNodes;

      // 2. Play initial melodic note immediately
      triggerSoothingNote(ctx, master);

      // 3. Loop Indian Raag melody notes every 2 seconds
      melodyIntervalRef.current = setInterval(() => {
        if (ctx && ctx.state === "running" && masterGainRef.current) {
          triggerSoothingNote(ctx, masterGainRef.current);
        }
      }, 2000);

      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to start Indian Raag ambiance:", err);
    }
  };

  const stopSoundtrack = () => {
    if (melodyIntervalRef.current) {
      clearInterval(melodyIntervalRef.current);
      melodyIntervalRef.current = null;
    }

    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    }

    setTimeout(() => {
      droneNodesRef.current.forEach(({ osc, gain }) => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
        } catch {
          // ignore
        }
      });
      droneNodesRef.current = [];
      setIsPlaying(false);
    }, 450);
  };

  const toggleSoundtrack = () => {
    if (isPlaying) {
      stopSoundtrack();
    } else {
      startSoundtrack();
    }
  };

  const play = () => {
    if (!isPlaying) startSoundtrack();
  };

  const pause = () => {
    if (isPlaying) stopSoundtrack();
  };

  useEffect(() => {
    return () => {
      if (melodyIntervalRef.current) clearInterval(melodyIntervalRef.current);
      droneNodesRef.current.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch {
          // ignore
        }
      });
    };
  }, []);

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
