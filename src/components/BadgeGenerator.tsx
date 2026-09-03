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
  { id: "builder",   label: "Student Cloud Builder",     icon: CloudIcon,    tag: "Student Cloud Builder"    },
  { id: "genai",     label: "GenAI & Bedrock Specialist", icon: SparklesIcon, tag: "GenAI & Bedrock"          },
  { id: "architect", label: "Cloud Solutions Architect",  icon: Layers01Icon, tag: "Cloud Architect"          },
  { id: "devops",    label: "DevOps & Platform Engineer", icon: GitBranchIcon,tag: "DevOps Engineer"          },
  { id: "hackathon", label: "KIRO Buildathon Competitor", icon: FlashIcon,    tag: "Buildathon Competitor"   },
  { id: "leader",    label: "Cloud Community Leader",     icon: UserGroupIcon,tag: "Community Leader"         },
];

export default function BadgeGenerator() {
  const [name, setName]                     = useState("Aarav Sharma");
  const [college, setCollege]               = useState("PIET Panipat");
  const [selectedTrackId, setSelectedTrackId] = useState(TRACK_OPTIONS[0].id);
  const [isTrackOpen, setIsTrackOpen]       = useState(false);
  const [avatarUrl, setAvatarUrl]           = useState<string>("/images/sbg-logo.png");
  const [isCustomAvatar, setIsCustomAvatar] = useState(false);
  const [copied, setCopied]                 = useState(false);

  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
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
            confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 }, colors: ["#FF9900", "#8E35EA", "#FFFFFF"] });
          } catch { /* ignore */ }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  /* ── Canvas Export ─────────────────────────────────────────────── */
  const generateBadgeBlob = (): Promise<{ blob: Blob; dataUrl: string } | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) { resolve(null); return; }
      const ctx = canvas.getContext("2d");
      if (!ctx)   { resolve(null); return; }

      const W = 1080, H = 1350;
      canvas.width  = W;
      canvas.height = H;

      // ── 1. Background gradient ──────────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
      bg.addColorStop(0,   "#0D1B4B");
      bg.addColorStop(0.5, "#091535");
      bg.addColorStop(1,   "#060D25");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Subtle radial glow top-center
      const radial = ctx.createRadialGradient(W / 2, 300, 0, W / 2, 300, 500);
      radial.addColorStop(0, "rgba(30,90,200,0.35)");
      radial.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Top branding ─────────────────────────────────────────
      ctx.textAlign = "center";

      // Logo placeholder area (text-based since we can't easily load logos in canvas)
      ctx.font = "bold 28px system-ui, sans-serif";
      ctx.fillStyle = "#FF9900";
      ctx.fillText("AWS SBG PIET", W / 2, 80);

      // Thin separator line
      const sep = ctx.createLinearGradient(200, 0, W - 200, 0);
      sep.addColorStop(0, "rgba(255,255,255,0)");
      sep.addColorStop(0.5, "rgba(255,255,255,0.4)");
      sep.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = sep;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(200, 100); ctx.lineTo(W - 200, 100); ctx.stroke();

      // Date
      ctx.font = "900 52px system-ui, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("11 SEPTEMBER 2026", W / 2, 170);

      ctx.font = "600 24px system-ui, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText("AWS Student Community Day • PIET Panipat", W / 2, 210);

      // ── 3. Avatar circle with glow ──────────────────────────────
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = avatarUrl;
      img.onload = () => {
        const cx = W / 2, cy = 530, r = 220;

        // Outer glow ring
        const glowGrad = ctx.createRadialGradient(cx, cy, r - 10, cx, cy, r + 40);
        glowGrad.addColorStop(0, "rgba(80,140,255,0.55)");
        glowGrad.addColorStop(1, "rgba(80,140,255,0)");
        ctx.fillStyle = glowGrad;
        ctx.beginPath(); ctx.arc(cx, cy, r + 40, 0, Math.PI * 2); ctx.fill();

        // Ring border
        ctx.strokeStyle = "rgba(100,160,255,0.8)";
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.arc(cx, cy, r + 6, 0, Math.PI * 2); ctx.stroke();

        // Photo circle clip
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
        ctx.restore();

        // ── 4. Name ─────────────────────────────────────────────
        ctx.textAlign = "center";
        ctx.font = "900 68px system-ui, sans-serif";
        ctx.fillStyle = "#F5B942";
        ctx.fillText(name || "Student Builder", W / 2, 830);

        // ── 5. College / role ────────────────────────────────────
        ctx.font = "500 30px system-ui, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fillText(college || "PIET Panipat", W / 2, 882);

        // ── 6. Tag pills ─────────────────────────────────────────
        const tags = [currentTrack.tag, "AWS Community", "I'm Attending ✦"];
        const pillH = 64, pillR = 32, gap = 20;
        const pillWidths = tags.map(t => {
          ctx.font = "bold 22px system-ui, sans-serif";
          return ctx.measureText(t).width + 60;
        });
        const totalW = pillWidths.reduce((a, b) => a + b, 0) + gap * (tags.length - 1);
        let px = (W - totalW) / 2;
        const py = 940;

        tags.forEach((tag, i) => {
          const pw = pillWidths[i];
          // Pill bg
          ctx.fillStyle = "rgba(255,255,255,0.08)";
          ctx.strokeStyle = "rgba(255,255,255,0.2)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(px, py, pw, pillH, pillR);
          ctx.fill(); ctx.stroke();

          // Pill text
          ctx.font = "bold 22px system-ui, sans-serif";
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(tag, px + pw / 2, py + pillH / 2 + 8);
          px += pw + gap;
        });

        // ── 7. Footer strip ──────────────────────────────────────
        const footerY = 1060;
        const footerGrad = ctx.createLinearGradient(0, footerY, W, footerY);
        footerGrad.addColorStop(0, "rgba(255,255,255,0)");
        footerGrad.addColorStop(0.5, "rgba(255,255,255,0.08)");
        footerGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = footerGrad;
        ctx.fillRect(0, footerY, W, H - footerY);

        // Footer text
        ctx.font = "600 22px monospace";
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillText("awssbgpiet.in  •  11 Sept 2026  •  PIET Panipat", W / 2, 1200);

        ctx.font = "bold 18px monospace";
        ctx.fillStyle = "rgba(173,92,255,0.6)";
        ctx.fillText("#AWSSCDPanipat", W / 2, 1240);

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
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ["#FF9900", "#8E35EA", "#10B981", "#FFFFFF"] });
    } catch { /* ignore */ }
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(getCustomShareText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    handleDownloadBadge();
  };

  /* ── JSX ────────────────────────────────────────────────────────── */
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
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          OFFICIAL ATTENDEE STUDIO
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Create Your AWS SCD 2026 Badge
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Personalize your badge, download in HD, and share on LinkedIn to connect with 500+ builders across Delhi-NCR &amp; Haryana.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200 dark:border-white/10 p-5 sm:p-7 shadow-sm"
        >
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/[0.06]">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">Customize Your Badge</h3>
            <span className="text-[10px] font-mono font-bold text-[#8E35EA] dark:text-[#AD5CFF] bg-[#8E35EA]/10 dark:bg-[#AD5CFF]/15 px-2.5 py-0.5 rounded-full border border-[#8E35EA]/20 dark:border-[#AD5CFF]/30">
              LIVE PREVIEW
            </span>
          </div>

          <div className="space-y-4">
            {/* Photo */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">YOUR PHOTO</label>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-[#8E35EA] dark:border-[#AD5CFF] shrink-0 bg-slate-900">
                  <Image src={avatarUrl} alt="Avatar" fill className="object-cover" unoptimized={avatarUrl.startsWith("data:")} />
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-fit px-3.5 py-1.5 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
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
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#8E35EA] dark:focus:border-[#AD5CFF] focus:outline-none transition-colors"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#8E35EA] dark:focus:border-[#AD5CFF] focus:outline-none transition-colors"
              />
            </div>

            {/* Track */}
            <div className="relative">
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">YOUR TRACK TAG</label>
              <button
                type="button"
                onClick={() => setIsTrackOpen(!isTrackOpen)}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isTrackOpen
                    ? "bg-white dark:bg-[#0E1430] border-[#8E35EA] dark:border-[#AD5CFF]"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-[#8E35EA] dark:bg-[#AD5CFF] text-white shrink-0">
                    <HugeiconsIcon icon={currentTrack.icon} className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentTrack.label}</span>
                    <span className="text-[10px] font-mono text-[#8E35EA] dark:text-[#AD5CFF] truncate">{currentTrack.tag}</span>
                  </div>
                </div>
                <div className={`p-1 text-slate-500 transition-transform duration-200 ${isTrackOpen ? "rotate-180 text-[#8E35EA]" : ""}`}>
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
                          sel ? "bg-[#8E35EA]/15 dark:bg-[#AD5CFF]/20 text-[#8E35EA] dark:text-[#BE7BFF] font-bold"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${sel ? "bg-[#8E35EA] text-white dark:bg-[#AD5CFF]" : "bg-slate-200/80 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400"}`}>
                            <HugeiconsIcon icon={track.icon} className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs truncate">{track.label}</span>
                        </div>
                        {sel && <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-[#8E35EA] dark:text-[#AD5CFF] shrink-0" />}
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
                className="flex-1 py-3 rounded-xl bg-[#8E35EA] hover:bg-[#7828C8] dark:bg-[#AD5CFF] dark:hover:bg-[#9B4AE8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={Download01Icon} className="h-4 w-4" />
                <span>Download Badge (HD)</span>
              </button>
              <button
                type="button"
                onClick={handleShareLinkedIn}
                className="flex-1 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
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

        {/* ── Badge Preview ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center justify-center"
        >
          {/* Badge Card */}
          <div
            className="w-full max-w-xs sm:max-w-sm rounded-[32px] relative overflow-hidden shadow-2xl text-white"
            style={{ background: "linear-gradient(145deg, #0D1B4B 0%, #091535 50%, #060D25 100%)" }}
          >
            {/* Radial glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(30,90,200,0.3) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center px-6 pt-8 pb-7">
              {/* Top branding */}
              <div className="flex items-center gap-2 mb-1">
                <div className="relative h-7 w-7 rounded-md overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center p-0.5">
                  <Image src="/images/sbg-logo.png" alt="AWS SBG" fill className="object-contain p-0.5" />
                </div>
                <span className="text-xs font-black tracking-wide text-[#FF9900]">AWS SBG PIET</span>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent my-2" />

              {/* Date */}
              <p className="text-lg sm:text-xl font-black tracking-tight text-white leading-none">11 SEPTEMBER 2026</p>
              <p className="text-[10px] font-semibold text-white/50 mt-0.5 tracking-wide">AWS Student Community Day • PIET Panipat</p>

              {/* Avatar */}
              <div className="mt-5 mb-4 relative">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(80,140,255,0.4) 60%, transparent 80%)",
                    transform: "scale(1.18)",
                  }}
                />
                {/* Ring border */}
                <div className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full border-[3px] border-blue-400/70 shadow-[0_0_30px_rgba(80,140,255,0.5)] overflow-hidden bg-slate-800">
                  <Image
                    src={avatarUrl}
                    alt="Attendee"
                    fill
                    className="object-cover"
                    unoptimized={avatarUrl.startsWith("data:")}
                  />
                </div>
              </div>

              {/* Name */}
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-center" style={{ color: "#F5B942" }}>
                {name || "Student Builder"}
              </h4>

              {/* College */}
              <p className="text-xs text-white/60 font-semibold mt-1 text-center">
                {college || "PIET Panipat"}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white bg-white/10 border border-white/20">
                  {currentTrack.tag}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white bg-white/10 border border-white/20">
                  AWS Community
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white bg-white/10 border border-white/20">
                  I&apos;m Attending ✦
                </span>
              </div>

              {/* Footer */}
              <div className="mt-5 w-full pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[9px] font-mono text-white/30">awssbgpiet.in</span>
                <span className="text-[9px] font-mono text-[#AD5CFF]/70">#AWSSCDPanipat</span>
              </div>
            </div>
          </div>

          {/* Giveaway callout */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] max-w-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#8E35EA] dark:text-[#AD5CFF] mb-1">
              <HugeiconsIcon icon={Share01Icon} className="h-3.5 w-3.5" />
              <span>Enter the VIP Swag Giveaway</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Post your badge on LinkedIn with <strong>#AWSSCDPanipat</strong> and tag <strong>AWS Student Builder Group at PIET</strong>. AWS Heroes &amp; mentors will select 10 builders for exclusive <strong>VIP Swag Packs</strong>!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
