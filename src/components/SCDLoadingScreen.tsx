"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface SCDLoadingScreenProps {
  onComplete?: () => void;
}

const TARGET_TEXT = "AWS Student Community Day Panipat 2026";
const SUB_TARGET_TEXT = "THE SUMMIT // 11 SEPT 2026 • PIET PANIPAT";
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789/$_#@%!*&";

export default function SCDLoadingScreen({ onComplete }: SCDLoadingScreenProps) {
  const [displayText, setDisplayText] = useState("aws/u6pfd8dswy9x10_init");
  const [subDisplayText, setSubDisplayText] = useState("THE NIGHT SHIFT · 00:00");
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState("INIT_REGION: ap-south-1");
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const iterationRef = useRef(0);
  const subIterationRef = useRef(0);

  useEffect(() => {
    // 1. Progress Counter Animation (0 -> 100% in ~1.1s)
    const startTime = Date.now();
    const duration = 1100;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusLog("CONNECTING_EDGE: cloudfront.ap-south-1.aws");
      } else if (pct < 65) {
        setStatusLog("RESOLVING_TRACKS: Bedrock / GenAI / DevOps");
      } else if (pct < 90) {
        setStatusLog("VERIFYING_DELEGATE_CREDENTIALS: [OK]");
      } else {
        setStatusLog("ALL_SYSTEMS_OPERATIONAL: [READY]");
      }

      if (pct >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            setShouldRender(false);
            onComplete?.();
          }, 450);
        }, 120);
      }
    }, 16);

    // 2. Main Title Text Scramble & Auto-Correction Effect (Snappy & Fast)
    const textInterval = setInterval(() => {
      setDisplayText((prev) => {
        return TARGET_TEXT.split("")
          .map((char, index) => {
            if (index < iterationRef.current) {
              return TARGET_TEXT[index];
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iterationRef.current >= TARGET_TEXT.length) {
        clearInterval(textInterval);
      }

      iterationRef.current += 1 / 1.1;
    }, 20);

    // 3. Subtitle Text Scramble (Fast)
    const subTextInterval = setInterval(() => {
      setSubDisplayText((prev) => {
        return SUB_TARGET_TEXT.split("")
          .map((char, index) => {
            if (index < subIterationRef.current) {
              return SUB_TARGET_TEXT[index];
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (subIterationRef.current >= SUB_TARGET_TEXT.length) {
        clearInterval(subTextInterval);
      }

      subIterationRef.current += 1 / 0.9;
    }, 22);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearInterval(subTextInterval);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#FAFAFC] text-slate-900 flex flex-col justify-between p-6 sm:p-12 font-mono select-none overflow-hidden transition-all duration-500 ${
        isDone ? "opacity-0 pointer-events-none scale-102" : "opacity-100"
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(255, 153, 0, 0.05) 0%, rgba(142, 53, 234, 0.04) 40%, transparent 80%),
          linear-gradient(to right, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.025) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 36px 36px, 36px 36px",
      }}
    >
      {/* Top Header Information HUD */}
      <div className="flex items-center justify-between text-xs tracking-wider text-slate-500 uppercase">
        <div className="flex items-center gap-2.5">
          <div className="relative h-6 w-6 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30 p-1 flex items-center justify-center">
            <Image
              src="/images/sbg-logo.png"
              alt="AWS SBG PIET"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-slate-800 tracking-tight">
            AWS SBG PIET
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>ap-south-1 • 28.6139° N, 77.2090° E</span>
        </div>
      </div>

      {/* Center Auto-Correcting Hero Statement (Matching Reference Layout) */}
      <div className="flex flex-col items-center justify-center text-center my-auto px-4">
        {/* Main Auto-Correcting Title with Live Scramble Decryption */}
        <div className="relative flex items-center justify-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {displayText.split("").map((char, idx) => {
              const isCorrected = idx < Math.floor(iterationRef.current);
              return (
                <span
                  key={idx}
                  className={`transition-colors duration-150 ${
                    isCorrected
                      ? idx < 3
                        ? "text-[#FF9900]" // AWS in Gold
                        : idx > TARGET_TEXT.length - 5
                        ? "text-[#8E35EA]" // 2026 in Violet
                        : "text-slate-950"
                      : "text-slate-400 font-normal opacity-75"
                  }`}
                >
                  {char}
                </span>
              );
            })}
            <span className="inline-block w-2 sm:w-3 h-7 sm:h-10 ml-1 bg-gradient-to-b from-[#FF9900] to-[#8E35EA] animate-pulse align-middle" />
          </h1>
        </div>

        {/* Subtitle Scramble */}
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-widest text-slate-500 uppercase">
          {subDisplayText}
        </p>

        {/* Minimal Progress Track Line */}
        <div className="w-48 sm:w-64 h-1 bg-slate-200/80 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF9900] via-[#8E35EA] to-[#AD5CFF] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Status Bar & Huge Percentage Display */}
      <div className="flex items-end justify-between">
        {/* Bottom Left Status Diagnostics */}
        <div className="flex flex-col gap-1 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">●</span>
            <span className="font-semibold text-slate-700">{statusLog}</span>
          </div>
          <span className="text-[10px] text-slate-400">
            HARYANA&apos;S FIRST AWS STUDENT COMMUNITY DAY
          </span>
        </div>

        {/* Bottom Right Monospace Percentage Counter (000% - 100%) */}
        <div className="text-right">
          <span className="text-3xl sm:text-5xl font-black font-mono tracking-tighter text-slate-900">
            {String(progress).padStart(3, "0")}
            <span className="text-xs sm:text-base font-bold text-[#8E35EA] ml-0.5">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
