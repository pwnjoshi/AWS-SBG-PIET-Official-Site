"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  { id: "builder",   label: "Student Cloud Builder",      icon: CloudIcon,     tag: "Student Cloud Builder"   },
  { id: "genai",     label: "GenAI & Bedrock Specialist",  icon: SparklesIcon,  tag: "GenAI & Bedrock"         },
  { id: "architect", label: "Cloud Solutions Architect",   icon: Layers01Icon,  tag: "Cloud Architect"         },
  { id: "devops",    label: "DevOps & Platform Engineer",  icon: GitBranchIcon, tag: "DevOps Engineer"         },
  { id: "hackathon", label: "KIRO Buildathon Competitor",  icon: FlashIcon,     tag: "Buildathon Competitor"  },
  { id: "leader",    label: "Cloud Community Leader",      icon: UserGroupIcon, tag: "Community Leader"        },
];

export default function BadgeGenerator() {
  const [name, setName]                         = useState("Aarav Sharma");
  const [college, setCollege]                   = useState("PIET Panipat");
  const [selectedTrackId, setSelectedTrackId]   = useState(TRACK_OPTIONS[0].id);
  const [isTrackOpen, setIsTrackOpen]           = useState(false);
  const [avatarUrl, setAvatarUrl]               = useState<string>("/images/sbg-logo.png");
  const [isCustomAvatar, setIsCustomAvatar]     = useState(false);
  const [copied, setCopied]                     = useState(false);

  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
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
            confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 }, colors: ["#00E5FF", "#76FF03", "#FFFFFF"] });
          } catch { /* ignore */ }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  /* ── Canvas Export: Authentic Tech Summit Card (IMC Reference Style) ── */
  const generateBadgeBlob = (): Promise<{ blob: Blob; dataUrl: string } | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) { resolve(null); return; }
      const ctx = canvas.getContext("2d");
      if (!ctx)   { resolve(null); return; }

      const W = 1080, H = 1520;
      canvas.width  = W;
      canvas.height = H;

      // ── 1. Vibrant Royal Blue Gradient Background ──
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0,   "#0B3A94");
      bg.addColorStop(0.35,"#08276D");
      bg.addColorStop(0.7, "#061A4F");
      bg.addColorStop(1,   "#030F33");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Top Cyan Light Ambient Glow
      const glow = ctx.createRadialGradient(W / 2, 220, 0, W / 2, 220, 550);
      glow.addColorStop(0, "rgba(0, 210, 255, 0.22)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Outer Border Pill
      ctx.strokeStyle = "rgba(0, 210, 255, 0.35)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(28, 28, W - 56, H - 56, 40);
      ctx.stroke();

      // ── 2. Top Header & Event Date ──
      ctx.textAlign = "center";

      // Top Community Brand
      ctx.font = "bold 22px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText("AWS SBG PIET  •  COMMUNITY DAY", W / 2, 100);

      // Main Summit Date (Hero Date like IMC Reference)
      ctx.font = "900 52px system-ui, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("11 SEPTEMBER 2026", W / 2, 168);

      // Subtitle
      ctx.font = "600 24px system-ui, sans-serif";
      ctx.fillStyle = "rgba(0, 229, 255, 0.9)";
      ctx.fillText("AWS Student Community Day • PIET Panipat", W / 2, 212);

      ctx.font = "500 18px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillText("PANIPAT, HARYANA • INDIA", W / 2, 244);

      // ── 3. Hexagon Photo Frame with Speech Pin Tail ──
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = avatarUrl;
      img.onload = () => {
        const cx = W / 2, cy = 560;
        const hw = 210; // half width
        const hh = 230; // half height

        // Helper path function for the hexagon with speech pin
        const buildHexPath = () => {
          ctx.beginPath();
          ctx.moveTo(cx, cy - hh); // top vertex
          ctx.lineTo(cx + hw, cy - hh * 0.5); // top-right
          ctx.lineTo(cx + hw, cy + hh * 0.48); // bottom-right
          ctx.lineTo(cx, cy + hh); // bottom vertex
          ctx.lineTo(cx, cy + hh + 28); // speech bubble pin point!
          ctx.lineTo(cx - 32, cy + hh * 0.9); // pin return
          ctx.lineTo(cx - hw, cy + hh * 0.48); // bottom-left
          ctx.lineTo(cx - hw, cy - hh * 0.5); // top-left
          ctx.closePath();
        };

        // Outer Glow for Hexagon
        ctx.save();
        ctx.shadowColor = "rgba(0, 229, 255, 0.55)";
        ctx.shadowBlur = 35;
        const borderGrad = ctx.createLinearGradient(cx - hw, cy - hh, cx + hw, cy + hh);
        borderGrad.addColorStop(0, "#00E5FF"); // Cyan
        borderGrad.addColorStop(1, "#76FF03"); // Neon Lime Green
        ctx.strokeStyle = borderGrad;
        ctx.lineWidth = 8;
        ctx.lineJoin = "round";
        buildHexPath();
        ctx.stroke();
        ctx.restore();

        // Dark background inside hexagon
        ctx.save();
        buildHexPath();
        ctx.fillStyle = "#020B24";
        ctx.fill();

        // Clip Image Inside Hexagon
        ctx.clip();
        ctx.drawImage(img, cx - hw, cy - hh, hw * 2, hh * 2 + 20);
        ctx.restore();

        // ── 4. Attendee Name in Electric Lime / Golden Yellow ──
        ctx.textAlign = "center";
        ctx.font = "900 62px system-ui, sans-serif";
        ctx.fillStyle = "#C6FF00"; // Electric Lime Yellow from IMC Reference
        ctx.fillText(name || "Aarav Sharma", W / 2, 885);

        // ── 5. Role & Institution (White text like IMC reference) ──
        ctx.font = "bold 28px system-ui, sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Attendee  •  " + (college || "PIET Panipat"), W / 2, 938);

        ctx.font = "500 20px system-ui, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.fillText("AWS Student Builder Group • Haryana Chapter", W / 2, 974);

        // ── 6. Three Clean Pill Tags (2 on top row, 1 centered below) ──
        const pillH = 58, pillR = 29;

        // Row 1: Track Pill + AWS Community Pill
        const row1Pills = [currentTrack.tag, "AWS Community"];
        ctx.font = "bold 22px system-ui, sans-serif";
        const w1 = ctx.measureText(row1Pills[0]).width + 60;
        const w2 = ctx.measureText(row1Pills[1]).width + 60;
        const row1Gap = 18;
        const row1Total = w1 + w2 + row1Gap;
        let r1X = (W - row1Total) / 2;
        const r1Y = 1040;

        [w1, w2].forEach((pw, i) => {
          // Dark Translucent Pill with Cyan Border
          ctx.fillStyle = "rgba(3, 16, 52, 0.85)";
          ctx.strokeStyle = "rgba(0, 210, 255, 0.45)";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(r1X, r1Y, pw, pillH, pillR);
          ctx.fill();
          ctx.stroke();

          // Pill text
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(row1Pills[i], r1X + pw / 2, r1Y + pillH / 2 + 8);
          r1X += pw + row1Gap;
        });

        // Row 2: "I'm Attending ✦" Pill (Centered)
        const row2Pill = "I'm Attending ✦";
        const w3 = ctx.measureText(row2Pill).width + 64;
        const r2X = (W - w3) / 2;
        const r2Y = r1Y + pillH + 16;

        ctx.fillStyle = "rgba(3, 16, 52, 0.85)";
        ctx.strokeStyle = "rgba(118, 255, 3, 0.55)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(r2X, r2Y, w3, pillH, pillR);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#76FF03";
        ctx.fillText(row2Pill, r2X + w3 / 2, r2Y + pillH / 2 + 8);

        // ── 7. Clean Minimal Footer ──
        const footerY = 1270;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(140, footerY);
        ctx.lineTo(W - 140, footerY);
        ctx.stroke();

        ctx.font = "bold 22px monospace";
        ctx.fillStyle = "#00E5FF";
        ctx.fillText("awssbgpiet.in", W / 2 - 160, footerY + 50);

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("•", W / 2, footerY + 50);

        ctx.fillStyle = "#76FF03";
        ctx.fillText("#AWSSCDPanipat", W / 2 + 160, footerY + 50);

        canvas.toBlob((blob) => {
          if (blob) resolve({ blob, dataUrl: canvas.toDataURL("image/png") });
          else resolve(null);
        }, "image/png");
      };
    });
  };

  const getCustomShareText = () =>
    `🚀 I'm attending Haryana's first-ever AWS Student Community Day organized by AWS Student Builder Group at PIET on 11th September 2026!\n\n👤 Attendee: ${name || "Student Builder"}\n🏛️ Campus: ${college || "PIET Panipat"}\n🎯 Focus: ${currentTrack.label}\n\nPost your badge on LinkedIn with #AWSSCDPanipat and tag AWS Student Builder Group at PIET. AWS Heroes & mentors will select 10 builders for exclusive VIP Swag Packs!\n\nReserve your pass: ${EVENT_DETAILS.commudleUrl}\n\n#AWSSCDPanipat #AWSSBGPIET #AWSCommunity #CloudBuilders`;

  const handleCopyPostText = () => {
    navigator.clipboard.writeText(getCustomShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadBadge = async () => {
    const result = await generateBadgeBlob();
    if (!result) return;
    const link = document.createElement("a");
    link.download = `AWS-SCD-2026-Badge-${(name || "Attendee").replace(/\s+/g, "_")}.png`;
    link.href = result.dataUrl;
    link.click();
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ["#00E5FF", "#76FF03", "#FF9900", "#FFFFFF"] });
    } catch { /* ignore */ }
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(getCustomShareText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    handleDownloadBadge();
  };

  /* ── JSX Interface ──────────────────────────────────────────────── */
  return (
    <div id="badge-generator" className="relative w-full max-w-6xl mx-auto py-6 sm:py-10">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
      >
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00E5FF] block mb-1.5">
          OFFICIAL ATTENDEE STUDIO
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Create Your Official Summit Delegate Pass
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Personalize your credential card, download in HD, and share on LinkedIn to connect with 500+ builders across Delhi-NCR &amp; Haryana.
        </p>
      </motion.div>

      {/* Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

        {/* ── Left Controls ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/10 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/[0.06]">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">Customize Pass</h3>
            <span className="text-[10px] font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded-full border border-[#00E5FF]/30">
              SUMMIT PASS
            </span>
          </div>

          <div className="space-y-4">
            {/* Photo Upload */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">ATTENDEE PHOTO</label>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-[#00E5FF] shrink-0 bg-slate-900 shadow-md">
                  <Image src={avatarUrl} alt="Avatar" fill className="object-cover" unoptimized={avatarUrl.startsWith("data:")} />
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-fit px-3.5 py-1.5 rounded-xl bg-[#00E5FF] hover:bg-[#00B4D8] text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <HugeiconsIcon icon={Camera01Icon} className="h-3.5 w-3.5" />
                    <span>Upload Photo</span>
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono truncate">
                    {isCustomAvatar ? "Custom photo loaded ✓" : "PNG / JPG supported"}
                  </span>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">FULL NAME *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#00E5FF] focus:outline-none transition-colors"
              />
            </div>

            {/* College */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">COLLEGE / INSTITUTION *</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. PIET Panipat"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#00E5FF] focus:outline-none transition-colors"
              />
            </div>

            {/* Track Focus Selector */}
            <div className="relative">
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">SUMMIT TRACK FOCUS</label>
              <button
                type="button"
                onClick={() => setIsTrackOpen(!isTrackOpen)}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isTrackOpen
                    ? "bg-white dark:bg-[#0E1430] border-[#00E5FF]"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-[#00E5FF] text-slate-950 shrink-0">
                    <HugeiconsIcon icon={currentTrack.icon} className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentTrack.label}</span>
                    <span className="text-[10px] font-mono text-[#00E5FF] truncate">{currentTrack.tag}</span>
                  </div>
                </div>
                <div className={`p-1 text-slate-500 transition-transform duration-200 ${isTrackOpen ? "rotate-180 text-[#00E5FF]" : ""}`}>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4" />
                </div>
              </button>

              {isTrackOpen && (
                <div className="mt-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0B1024] border border-slate-200 dark:border-white/15 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-20">
                  {TRACK_OPTIONS.map((track) => {
                    const sel = track.id === selectedTrackId;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => { setSelectedTrackId(track.id); setIsTrackOpen(false); }}
                        className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                          sel ? "bg-[#00E5FF]/15 text-[#00E5FF] font-bold"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${sel ? "bg-[#00E5FF] text-slate-950" : "bg-slate-200/80 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400"}`}>
                            <HugeiconsIcon icon={track.icon} className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs truncate">{track.label}</span>
                        </div>
                        {sel && <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-[#00E5FF] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleDownloadBadge}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#76FF03] hover:opacity-95 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={Download01Icon} className="h-4 w-4 text-slate-950" />
                <span>Download Pass (HD PNG)</span>
              </button>
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="flex-1 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />
                <span>Share on LinkedIn</span>
              </button>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleCopyPostText}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} className={`h-3.5 w-3.5 ${copied ? "text-emerald-500" : ""}`} />
                <span>{copied ? "LinkedIn Caption Copied!" : "Copy Ready-to-Post LinkedIn Caption"}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Authentic Modern Reference Style Live Preview ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center justify-center"
        >
          {/* Card Container with IMC Reference proportions & styling */}
          <div
            className="w-full max-w-[340px] sm:max-w-[370px] rounded-[36px] relative overflow-hidden shadow-2xl text-white border-2 border-[#00D2FF]/40"
            style={{
              background: "linear-gradient(175deg, #0B3A94 0%, #08276D 38%, #061A4F 72%, #030F33 100%)",
            }}
          >
            {/* Top Light Ambient Sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 18%, rgba(0, 229, 255, 0.25) 0%, transparent 65%)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center px-6 pt-7 pb-7">

              {/* 1. Header Logos & Community Name */}
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <div className="relative h-6 w-6 rounded-md overflow-hidden bg-white/10 p-0.5 flex items-center justify-center border border-white/20">
                  <Image src="/images/sbg-logo.png" alt="AWS SBG" fill className="object-contain p-0.5" />
                </div>
                <span className="text-[11px] font-mono font-bold tracking-wider text-white/90 uppercase">
                  AWS SBG PIET  •  PANIPAT
                </span>
              </div>

              {/* 2. Prominent Event Date */}
              <p className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none mt-1">
                11 SEPTEMBER 2026
              </p>
              <p className="text-[10px] font-semibold text-[#00E5FF] mt-1 tracking-wide">
                AWS Student Community Day • PIET Panipat
              </p>

              {/* 3. Centerpiece: Hexagon Avatar Frame with Cyan-to-Lime Neon Glow */}
              <div className="mt-5 mb-4 relative flex items-center justify-center">
                <svg className="w-48 h-56 sm:w-52 sm:h-60 filter drop-shadow-[0_0_18px_rgba(0,229,255,0.45)]" viewBox="0 0 200 230">
                  <defs>
                    <linearGradient id="previewHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="100%" stopColor="#76FF03" />
                    </linearGradient>
                    <clipPath id="previewHexClip">
                      <path d="M 100 8 L 188 56 L 188 152 L 100 200 L 100 220 L 84 192 L 12 152 L 12 56 Z" />
                    </clipPath>
                  </defs>

                  {/* Dark Fill */}
                  <path
                    d="M 100 8 L 188 56 L 188 152 L 100 200 L 100 220 L 84 192 L 12 152 L 12 56 Z"
                    fill="#041235"
                  />

                  {/* Avatar Image Clipped */}
                  <image
                    href={avatarUrl}
                    x="10"
                    y="6"
                    width="180"
                    height="198"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#previewHexClip)"
                  />

                  {/* Glowing Neon Hexagon Stroke */}
                  <path
                    d="M 100 8 L 188 56 L 188 152 L 100 200 L 100 220 L 84 192 L 12 152 L 12 56 Z"
                    fill="none"
                    stroke="url(#previewHexGrad)"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* 4. Attendee Name (Electric Lime-Yellow Accent from reference) */}
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-center leading-tight" style={{ color: "#C6FF00" }}>
                {name || "Aarav Sharma"}
              </h4>

              {/* 5. Role / College Title */}
              <p className="text-xs text-white font-bold mt-1 text-center">
                Attendee  •  {college || "PIET Panipat"}
              </p>
              <p className="text-[10.5px] text-white/60 font-medium mt-0.5 text-center">
                AWS Student Builder Group • Haryana Chapter
              </p>

              {/* 6. Pill Badges (IMC reference style: 2 pills top row, 1 pill bottom row) */}
              <div className="w-full flex flex-col items-center gap-2 mt-4">
                {/* Row 1 */}
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white bg-[#031034]/85 border border-[#00D2FF]/45 shadow-sm">
                    {currentTrack.tag}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white bg-[#031034]/85 border border-[#00D2FF]/45 shadow-sm">
                    AWS Community
                  </span>
                </div>

                {/* Row 2 */}
                <div>
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-bold text-[#76FF03] bg-[#031034]/85 border border-[#76FF03]/60 shadow-sm">
                    I&apos;m Attending ✦
                  </span>
                </div>
              </div>

              {/* 7. Minimal Clean Footer Links */}
              <div className="mt-5 w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#00E5FF] font-bold">
                  awssbgpiet.in
                </span>
                <span className="text-[#76FF03] font-bold">
                  #AWSSCDPanipat
                </span>
              </div>
            </div>
          </div>

          {/* Giveaway Notice */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] max-w-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#00E5FF] mb-1">
              <HugeiconsIcon icon={Share01Icon} className="h-3.5 w-3.5" />
              <span>Enter the VIP Swag Giveaway</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Post your badge on LinkedIn with <strong>#AWSSCDPanipat</strong> and tag <strong>AWS Student Builder Group at PIET</strong> to win exclusive <strong>VIP Swag Packs</strong>!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}