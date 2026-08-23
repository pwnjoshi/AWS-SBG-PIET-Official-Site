"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  SparklesIcon,
  Linkedin01Icon,
  Camera01Icon,
  Copy01Icon,
  Tick02Icon,
  Share01Icon,
  CloudIcon,
  Layers01Icon,
  GitBranchIcon,
  FlashIcon,
  UserGroupIcon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import confetti from "canvas-confetti";
import { EVENT_DETAILS } from "@/lib/data";

const TRACK_OPTIONS = [
  {
    id: "builder",
    label: "Student Cloud Builder",
    icon: CloudIcon,
    symbol: "☁",
    tag: "STUDENT CLOUD BUILDER",
  },
  {
    id: "genai",
    label: "GenAI & Bedrock Specialist",
    icon: SparklesIcon,
    symbol: "✦",
    tag: "GENAI & BEDROCK SPECIALIST",
  },
  {
    id: "architect",
    label: "Cloud Solutions Architect",
    icon: Layers01Icon,
    symbol: "◈",
    tag: "CLOUD SOLUTIONS ARCHITECT",
  },
  {
    id: "devops",
    label: "DevOps & Platform Engineer",
    icon: GitBranchIcon,
    symbol: "⑂",
    tag: "DEVOPS & PLATFORM ENGINEER",
  },
  {
    id: "hackathon",
    label: "KIRO Buildathon Competitor",
    icon: FlashIcon,
    symbol: "⚡",
    tag: "KIRO BUILDATHON COMPETITOR",
  },
  {
    id: "leader",
    label: "Cloud Community Leader",
    icon: UserGroupIcon,
    symbol: "★",
    tag: "CLOUD COMMUNITY LEADER",
  },
];

export default function BadgeGenerator() {
  const [name, setName] = useState("Aarav Sharma");
  const [college, setCollege] = useState("PIET Panipat");
  const [selectedTrackId, setSelectedTrackId] = useState(TRACK_OPTIONS[0].id);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/sbg-logo.png");
  const [isCustomAvatar, setIsCustomAvatar] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentTrack = TRACK_OPTIONS.find((t) => t.id === selectedTrackId) || TRACK_OPTIONS[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
          setIsCustomAvatar(true);
          try {
            confetti({
              particleCount: 35,
              spread: 45,
              origin: { y: 0.6 },
              colors: ["#FF9900", "#8E35EA", "#FFFFFF"],
            });
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBadgeBlob = (): Promise<{ blob: Blob; dataUrl: string } | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve(null);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      canvas.width = 1200;
      canvas.height = 1500;

      // Helper for rounded rectangles
      const drawRoundedRect = (
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
        fill = false,
        stroke = true
      ) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
      };

      // 1. Clean Obsidian Badge Body
      ctx.fillStyle = "#0A0D1E";
      ctx.fillRect(0, 0, 1200, 1500);

      // 2. Subtle Geometric Grid & Tech Circuit Pattern
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x < 1200; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1500);
        ctx.stroke();
      }
      for (let y = 0; y < 1500; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1200, y);
        ctx.stroke();
      }

      // 2.1 Monumental Hindi Devanagari "पानीपत" Watermark in Background
      ctx.save();
      ctx.font = "900 180px 'Noto Sans Devanagari', 'Mangal', 'Nirmala UI', system-ui, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.032)";
      ctx.textAlign = "center";
      ctx.fillText("पानीपत", 600, 520);
      ctx.restore();

      // 2.2 AWS Cloud Architecture Circuit Lines (Subtle decorative lines)
      ctx.save();
      ctx.strokeStyle = "rgba(255, 153, 0, 0.08)";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(600, 500, 320, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(173, 92, 255, 0.08)";
      ctx.beginPath();
      ctx.arc(600, 500, 380, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 3. Card Outer Border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 4;
      drawRoundedRect(50, 50, 1100, 1400, 48, false, true);

      // 4. Lanyard Clip Slot Cutout (Top)
      ctx.fillStyle = "#05070E";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 2;
      drawRoundedRect(500, 75, 200, 24, 12, true, true);

      // 5. Header Section
      ctx.fillStyle = "#111736";
      ctx.strokeStyle = "rgba(142, 53, 234, 0.4)";
      ctx.lineWidth = 2;
      drawRoundedRect(100, 130, 1000, 120, 28, true, true);

      // Header Branding
      ctx.font = "900 28px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "left";
      ctx.fillText("AWS COMMUNITY DAY", 140, 185);

      ctx.font = "700 20px monospace";
      ctx.fillStyle = "#AD5CFF";
      ctx.fillText("PANIPAT 2026 • HARYANA", 140, 218);

      // Header Right Accent
      ctx.textAlign = "right";
      ctx.font = "700 18px monospace";
      ctx.fillStyle = "#FF9900";
      ctx.fillText("AWS STUDENT BUILDER GROUP", 1060, 185);

      ctx.font = "600 16px monospace";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText("PIET CAMPUS • 11 SEPT", 1060, 218);
      ctx.textAlign = "left";

      // 6. Accent Separator Ribbon (AWS Orange & Purple)
      const ribbonGrad = ctx.createLinearGradient(100, 270, 1100, 270);
      ribbonGrad.addColorStop(0, "#FF9900");
      ribbonGrad.addColorStop(0.5, "#8E35EA");
      ribbonGrad.addColorStop(1, "#AD5CFF");
      ctx.fillStyle = ribbonGrad;
      ctx.fillRect(100, 270, 1000, 4);

      // 7. Attendee Avatar Portrait
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = avatarUrl;
      img.onload = () => {
        // Portrait Frame Box
        ctx.fillStyle = "#151B3D";
        ctx.strokeStyle = "rgba(173, 92, 255, 0.4)";
        ctx.lineWidth = 3;
        drawRoundedRect(420, 320, 360, 360, 36, true, true);

        // Clip image inside rounded rect
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(430 + 30, 330);
        ctx.lineTo(430 + 340 - 30, 330);
        ctx.quadraticCurveTo(430 + 340, 330, 430 + 340, 330 + 30);
        ctx.lineTo(430 + 340, 330 + 340 - 30);
        ctx.quadraticCurveTo(430 + 340, 330 + 340, 430 + 340 - 30, 330 + 340);
        ctx.lineTo(430 + 30, 330 + 340);
        ctx.quadraticCurveTo(430, 330 + 340, 430, 330 + 340 - 30);
        ctx.lineTo(430, 330 + 30);
        ctx.quadraticCurveTo(430, 330, 430 + 30, 330);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 430, 330, 340, 340);
        ctx.restore();

        // 8. Attendee Name (Bold, Clear, Centered)
        ctx.font = "900 56px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.fillText(name || "Student Builder", 600, 760);

        // 9. College / Organization
        ctx.font = "700 28px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "#94A3B8";
        ctx.fillText(college || "PIET Panipat", 600, 805);

        // 10. Role Credential Pill with Specific Track Symbol
        ctx.fillStyle = "#1E1A4A";
        ctx.strokeStyle = "#8E35EA";
        ctx.lineWidth = 2;
        drawRoundedRect(320, 845, 560, 60, 30, true, true);

        ctx.font = "bold 22px monospace";
        ctx.fillStyle = "#BE7BFF";
        ctx.fillText(`${currentTrack.symbol}  ${currentTrack.tag}`, 600, 882);

        // 11. Conference Credential Grid (2 Columns)
        ctx.fillStyle = "#0F142E";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 2;
        drawRoundedRect(100, 940, 1000, 240, 28, true, true);

        // Left Column
        ctx.textAlign = "left";
        ctx.font = "700 16px monospace";
        ctx.fillStyle = "#64748B";
        ctx.fillText("EVENT", 140, 990);
        ctx.font = "800 22px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("AWS Student Community Day 2026", 140, 1022);

        ctx.font = "700 16px monospace";
        ctx.fillStyle = "#64748B";
        ctx.fillText("DATE & TIME", 140, 1080);
        ctx.font = "800 22px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Friday, 11 September 2026 • 9:00 AM", 140, 1112);

        // Right Column
        ctx.font = "700 16px monospace";
        ctx.fillStyle = "#64748B";
        ctx.fillText("VENUE", 660, 990);
        ctx.font = "800 22px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("PIET Panipat (Samalkha, NCR)", 660, 1022);

        ctx.font = "700 16px monospace";
        ctx.fillStyle = "#64748B";
        ctx.fillText("ACCESS LEVEL", 660, 1080);
        ctx.font = "800 22px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "#10B981";
        ctx.fillText("All-Access Delegate Credential", 660, 1112);

        // 12. Footer Barcode & Security Strip
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100, 1220);
        ctx.lineTo(1100, 1220);
        ctx.stroke();

        // Barcode graphic
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        const barcodeX = 140;
        const barcodeY = 1260;
        const bars = [4, 2, 6, 3, 5, 2, 4, 8, 3, 2, 5, 3, 7, 4, 5, 2, 4, 6, 2, 4, 3, 5, 2, 6, 4, 2, 5, 3, 6, 2, 4, 7];
        let currX = barcodeX;
        bars.forEach((w) => {
          ctx.fillRect(currX, barcodeY, w, 65);
          currX += w + 5;
        });

        // Right Footer Notes
        ctx.textAlign = "right";
        ctx.font = "bold 20px monospace";
        ctx.fillStyle = "#AD5CFF";
        ctx.fillText("AWS SBG AT PIET", 1060, 1290);

        ctx.font = "16px monospace";
        ctx.fillStyle = "#64748B";
        ctx.fillText("commudle.com/events/aws-scd-panipat", 1060, 1320);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve({ blob, dataUrl: canvas.toDataURL("image/png") });
          } else {
            resolve(null);
          }
        }, "image/png");
      };
    });
  };

  const getCustomShareText = () => {
    return `🚀 I'm attending Haryana's first-ever AWS Student Community Day (SCD) at PIET Panipat on 11th September 2026!\n\n👤 Attendee: ${name || "Student Builder"}\n🏛️ Campus: ${college || "PIET Panipat"}\n🎯 Focus Track: ${currentTrack.label}\n\nExcited for technical keynotes by AWS Leaders, deep-dives on Generative AI with Amazon Bedrock, KIRO Buildathon, DevOps, and connecting with 500+ builders across Delhi-NCR.\n\nReserve your pass on Commudle: ${EVENT_DETAILS.commudleUrl}\n\n#AWSSCDPanipat #AWSSBGPIET #AWSCommunity #CloudBuilders #PIETPanipat #GenerativeAI #AWSCloud`;
  };

  const handleCopyPostText = () => {
    const text = getCustomShareText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // High-Resolution 1200x1500px Official Conference Badge Export
  const handleDownloadBadge = async () => {
    const result = await generateBadgeBlob();
    if (!result) return;

    const link = document.createElement("a");
    link.download = `AWS-SCD-2026-Pass-${(name || "Attendee").replace(/\s+/g, "_")}.png`;
    link.href = result.dataUrl;
    link.click();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FF9900", "#8E35EA", "#10B981", "#FFFFFF"],
      });
    } catch {
      // ignore
    }
  };

  // Direct LinkedIn Share: Instantly opens LinkedIn post composer and auto-downloads the badge PNG
  const handleShareLinkedIn = () => {
    // 1. Open LinkedIn directly (synchronous call ensures 0 popup blocking)
    const shareText = getCustomShareText();
    const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");

    // 2. Auto-download the high-res badge so attendee can easily attach it
    handleDownloadBadge();
  };

  return (
    <div id="badge-generator" className="relative w-full max-w-6xl mx-auto py-6 sm:py-10">
      {/* Hidden Canvas for High-Resolution Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          OFFICIAL ATTENDEE STUDIO
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Create Your Official Summit Delegate Pass
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Personalize your official AWS SCD 2026 delegate credential, download in HD, and share on LinkedIn to connect with 500+ builders and AWS leaders across Delhi-NCR & Haryana.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Customization Controls */}
        <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/10 p-5 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/[0.06]">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              Customize Your Pass
            </h3>
            <span className="text-[10px] font-mono font-bold text-[#8E35EA] dark:text-[#AD5CFF] bg-[#8E35EA]/10 dark:bg-[#AD5CFF]/15 px-2.5 py-0.5 rounded-full border border-[#8E35EA]/20 dark:border-[#AD5CFF]/30">
              LIVE PREVIEW
            </span>
          </div>

          <div className="space-y-4">
            {/* Photo Upload Zone */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">
                ATTENDEE PHOTO / AVATAR
              </label>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-[#8E35EA] dark:border-[#AD5CFF] shrink-0 bg-slate-900 flex items-center justify-center shadow-sm">
                  <Image
                    src={avatarUrl}
                    alt="Attendee Avatar"
                    fill
                    className="object-cover"
                    unoptimized={avatarUrl.startsWith("data:")}
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-fit px-3.5 py-1.5 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <HugeiconsIcon icon={Camera01Icon} className="h-3.5 w-3.5" />
                    <span>Upload Photo</span>
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono truncate">
                    {isCustomAvatar ? "Custom photo loaded" : "PNG / JPG format supported"}
                  </span>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                FULL NAME *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#8E35EA] dark:focus:border-[#AD5CFF] focus:outline-none transition-colors"
              />
            </div>

            {/* College Input */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                COLLEGE / INSTITUTION *
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. PIET Panipat"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#8E35EA] dark:focus:border-[#AD5CFF] focus:outline-none transition-colors"
              />
            </div>

            {/* Expandable Summit Track Focus Selector */}
            <div className="relative">
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">
                SUMMIT TRACK FOCUS
              </label>

              {/* Main Expandable Trigger Button */}
              <button
                type="button"
                onClick={() => setIsTrackOpen(!isTrackOpen)}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isTrackOpen
                    ? "bg-white dark:bg-[#0E1430] border-[#8E35EA] dark:border-[#AD5CFF] shadow-sm"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-[#8E35EA] dark:bg-[#AD5CFF] text-white dark:text-slate-950 shrink-0">
                    <HugeiconsIcon icon={currentTrack.icon} className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {currentTrack.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#8E35EA] dark:text-[#AD5CFF] truncate">
                      {currentTrack.tag}
                    </span>
                  </div>
                </div>

                <div className={`p-1 text-slate-500 transition-transform duration-200 ${isTrackOpen ? "rotate-180 text-[#8E35EA] dark:text-[#AD5CFF]" : ""}`}>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4" />
                </div>
              </button>

              {/* Expandable Options Panel */}
              {isTrackOpen && (
                <div className="mt-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0B1024] border border-slate-200 dark:border-white/15 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-20">
                  {TRACK_OPTIONS.map((track) => {
                    const isSelected = track.id === selectedTrackId;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => {
                          setSelectedTrackId(track.id);
                          setIsTrackOpen(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#8E35EA]/15 dark:bg-[#AD5CFF]/20 text-[#8E35EA] dark:text-[#BE7BFF] font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
                              isSelected
                                ? "bg-[#8E35EA] text-white dark:bg-[#AD5CFF] dark:text-slate-950"
                                : "bg-slate-200/80 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            <HugeiconsIcon icon={track.icon} className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs truncate">{track.label}</span>
                        </div>

                        {isSelected && (
                          <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons: Native Tactile Phone Press Animation */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleDownloadBadge}
                className="flex-1 py-3 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={Download01Icon} className="h-4 w-4" />
                <span>Download Pass (HD PNG)</span>
              </button>

              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="flex-1 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer text-center"
              >
                <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />
                <span>Share on LinkedIn</span>
              </button>
            </div>

            {/* Copy Share Caption */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleCopyPostText}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} className={`h-3.5 w-3.5 ${copied ? "text-emerald-500" : ""}`} />
                <span>{copied ? "LinkedIn Caption Copied to Clipboard!" : "Copy Ready-to-Post LinkedIn Caption"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Real World-Class Conference Badge Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          {/* Card Graphic: Authentic Conference Badge */}
          <div className="w-full max-w-md rounded-3xl bg-[#0A0D1E] border border-slate-700/80 dark:border-white/15 p-6 sm:p-7 shadow-xl text-white relative overflow-hidden">
            {/* Background Watermark: Monumental Hindi Devanagari "पानीपत" */}
            <div className="absolute inset-0 pointer-events-none select-none flex flex-col items-center justify-center overflow-hidden z-0">
              <span className="text-[120px] font-black text-white/[0.035] leading-none tracking-tight transform -rotate-12 translate-y-[-10px]">
                पानीपत
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#AD5CFF]/[0.05] uppercase mt-2">
                AWS COMMUNITY DAY • PANIPAT
              </span>
              {/* Subtle Tech Circuit Ring */}
              <div className="absolute h-64 w-64 rounded-full border border-dashed border-[#FF9900]/[0.06] pointer-events-none" />
              <div className="absolute h-80 w-80 rounded-full border border-[#8E35EA]/[0.05] pointer-events-none" />
            </div>

            {/* Lanyard Clip Slot Cutout */}
            <div className="relative z-10 h-2 w-16 rounded-full bg-slate-950 border border-white/20 mx-auto mb-4" />

            {/* Official Branding Header */}
            <div className="relative z-10 rounded-2xl bg-[#111736]/90 backdrop-blur-sm border border-[#8E35EA]/30 p-3.5 mb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black tracking-tight text-white block">
                  AWS COMMUNITY DAY
                </span>
                <span className="text-[9px] font-mono text-[#AD5CFF] font-bold">
                  PANIPAT 2026 • HARYANA
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold text-[#FF9900] block">
                  AWS SBG PIET
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  11 SEPT 2026
                </span>
              </div>
            </div>

            {/* Subtle Gradient Accent Line */}
            <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#FF9900] via-[#8E35EA] to-[#AD5CFF] mb-5" />

            {/* Avatar Frame Box */}
            <div className="flex justify-center mb-4">
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl p-1 border-2 border-[#8E35EA] dark:border-[#AD5CFF] bg-[#151B3D] shadow-md">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">
                  <Image
                    src={avatarUrl}
                    alt="Attendee"
                    fill
                    className="object-cover"
                    unoptimized={avatarUrl.startsWith("data:")}
                  />
                </div>
              </div>
            </div>

            {/* Attendee Name & College */}
            <div className="text-center mb-4">
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {name || "Student Builder"}
              </h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                {college || "PIET Panipat"}
              </p>

              {/* Dynamic Contextual Role Ribbon with Specialized Icon */}
              <div className="inline-flex items-center gap-1.5 mt-2.5 px-4 py-1.5 rounded-full bg-[#8E35EA]/20 border border-[#8E35EA]/40 text-[11px] font-mono font-bold text-[#BE7BFF] shadow-sm">
                <HugeiconsIcon icon={currentTrack.icon} className="h-3.5 w-3.5 text-[#AD5CFF]" />
                <span>{currentTrack.tag}</span>
              </div>
            </div>

            {/* Conference Credential Details */}
            <div className="rounded-2xl bg-[#0F142E] border border-white/[0.08] p-3.5 mb-4 text-[10px] font-mono text-slate-300">
              <div className="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-white/[0.06]">
                <div>
                  <span className="block text-[8px] text-slate-500 font-bold uppercase">EVENT</span>
                  <span className="font-bold text-white">AWS SCD 2026</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-500 font-bold uppercase">VENUE</span>
                  <span className="font-bold text-white">PIET Panipat</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-[8px] text-slate-500 font-bold uppercase">DATE</span>
                  <span className="font-bold text-white">11 Sept 2026</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-500 font-bold uppercase">ACCESS</span>
                  <span className="font-bold text-emerald-400">All-Access Pass</span>
                </div>
              </div>
            </div>

            {/* Barcode & Security Strip */}
            <div className="pt-2 flex items-center justify-between opacity-70 text-[9px] font-mono text-slate-400">
              <div className="flex items-center gap-0.5">
                {[3, 1, 4, 2, 5, 2, 3, 6, 2, 4, 1, 5, 2, 4, 3, 5].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-white rounded-full"
                    style={{ height: `${h * 2.5 + 8}px` }}
                  />
                ))}
              </div>
              <span className="font-bold text-[#AD5CFF]">PANIPAT-NCR-2026</span>
            </div>
          </div>

          {/* Social Proof & Giveaway Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] max-w-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#8E35EA] dark:text-[#AD5CFF] mb-1">
              <HugeiconsIcon icon={Share01Icon} className="h-3.5 w-3.5" />
              <span>Enter the VIP Swag Giveaway</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Post your badge on LinkedIn with <strong>#AWSSCDPanipat</strong> and tag <strong>AWS SBG PIET</strong>. AWS Heroes & mentors will select 10 builders for exclusive <strong>VIP Swag Packs</strong>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
