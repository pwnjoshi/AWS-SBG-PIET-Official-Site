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
  Location01Icon,
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
            confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 }, colors: ["#FF9900", "#8E35EA", "#FFFFFF"] });
          } catch { /* ignore */ }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  /* ── Canvas Export: Authentic Haryana Panipat Summit Edition ───── */
  const generateBadgeBlob = (): Promise<{ blob: Blob; dataUrl: string } | null> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) { resolve(null); return; }
      const ctx = canvas.getContext("2d");
      if (!ctx)   { resolve(null); return; }

      const W = 1080, H = 1480;
      canvas.width  = W;
      canvas.height = H;

      // ── 1. Deep Midnight Navy & Royal Saffron Gradient Background ──
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   "#090E24");
      bg.addColorStop(0.4, "#060A1D");
      bg.addColorStop(0.8, "#040714");
      bg.addColorStop(1,   "#02040B");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Warm Saffron/Amber Solar Glow from Top-Center (Haryana Valor Accent)
      const topSun = ctx.createRadialGradient(W / 2, 0, 10, W / 2, 0, 650);
      topSun.addColorStop(0,   "rgba(255, 153, 0, 0.28)");
      topSun.addColorStop(0.5, "rgba(245, 158, 11, 0.12)");
      topSun.addColorStop(1,   "rgba(0, 0, 0, 0)");
      ctx.fillStyle = topSun;
      ctx.fillRect(0, 0, W, H);

      // Ambient Violet / Cyan Accent at Bottom Right
      const bottomViolet = ctx.createRadialGradient(W, H, 50, W, H, 600);
      bottomViolet.addColorStop(0, "rgba(142, 53, 234, 0.22)");
      bottomViolet.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bottomViolet;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Cultural Watermark: Devanagari "पानीपत" & "हरियाणा" ────
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "900 160px system-ui, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.022)";
      ctx.fillText("पानीपत", W / 2, 420);

      ctx.font = "bold 70px system-ui, sans-serif";
      ctx.fillStyle = "rgba(255, 153, 0, 0.025)";
      ctx.fillText("हरियाणा", W / 2, 1140);
      ctx.restore();

      // Delicate Heritage Geometric Border Frame
      ctx.strokeStyle = "rgba(255, 153, 0, 0.15)";
      ctx.lineWidth = 2;
      ctx.strokeRect(36, 36, W - 72, H - 72);

      // Outer thin border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(48, 48, W - 96, H - 96);

      // ── 3. Top Branding: Haryana's 1st AWS Summit ─────────────────
      ctx.textAlign = "center";

      // Top Tag
      ctx.font = "bold 20px monospace";
      ctx.fillStyle = "#FF9900";
      ctx.fillText("✦  HARYANA'S FIRST AWS STUDENT COMMUNITY DAY  ✦", W / 2, 110);

      // Event Main Title
      ctx.font = "900 50px system-ui, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("AWS STUDENT COMMUNITY DAY", W / 2, 175);

      // Subtitle & Venue
      ctx.font = "bold 32px system-ui, sans-serif";
      ctx.fillStyle = "#F59E0B";
      ctx.fillText("PANIPAT 2026", W / 2, 222);

      ctx.font = "500 22px system-ui, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.fillText("PIET Panipat  •  Friday, 11 September 2026", W / 2, 262);

      // Golden Filigree Separator
      const sep = ctx.createLinearGradient(160, 0, W - 160, 0);
      sep.addColorStop(0, "rgba(255, 153, 0, 0)");
      sep.addColorStop(0.5, "rgba(255, 153, 0, 0.6)");
      sep.addColorStop(1, "rgba(255, 153, 0, 0)");
      ctx.strokeStyle = sep;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(160, 290); ctx.lineTo(W - 160, 290); ctx.stroke();

      // Attendee Delegate Pill
      const attPillW = 280, attPillH = 46, attPillX = (W - attPillW) / 2, attPillY = 312;
      ctx.fillStyle = "rgba(255, 153, 0, 0.12)";
      ctx.strokeStyle = "rgba(255, 153, 0, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(attPillX, attPillY, attPillW, attPillH, 23);
      ctx.fill(); ctx.stroke();

      ctx.font = "bold 19px monospace";
      ctx.fillStyle = "#FFB020";
      ctx.fillText("ATTENDEE DELEGATE", W / 2, attPillY + 30);

      // ── 4. Avatar Portrait with Saffron-Gold Royal Glow ───────────
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = avatarUrl;
      img.onload = () => {
        const cx = W / 2, cy = 570, r = 180;

        // Radiant Saffron Aura
        const aura = ctx.createRadialGradient(cx, cy, r - 20, cx, cy, r + 55);
        aura.addColorStop(0,   "rgba(255, 153, 0, 0.45)");
        aura.addColorStop(0.6, "rgba(245, 158, 11, 0.2)");
        aura.addColorStop(1,   "rgba(0, 0, 0, 0)");
        ctx.fillStyle = aura;
        ctx.beginPath(); ctx.arc(cx, cy, r + 55, 0, Math.PI * 2); ctx.fill();

        // Outer Gold Ring
        ctx.strokeStyle = "rgba(255, 153, 0, 0.85)";
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.arc(cx, cy, r + 8, 0, Math.PI * 2); ctx.stroke();

        // Inner White Accent Ring
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, r + 1, 0, Math.PI * 2); ctx.stroke();

        // Photo circle clip
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
        ctx.restore();

        // ── 5. Attendee Name & College ─────────────────────────────
        ctx.textAlign = "center";
        ctx.font = "900 64px system-ui, sans-serif";
        ctx.fillStyle = "#F5B942"; // Royal Amber Gold
        ctx.fillText(name || "Student Builder", W / 2, 830);

        ctx.font = "600 30px system-ui, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
        ctx.fillText(college || "PIET Panipat", W / 2, 880);

        // ── 6. Skill & Attribute Tags (Requested by User) ──────────
        const tags = [currentTrack.tag, "AWS Community", "I'm Attending ✦"];
        const pillH = 58, pillR = 29, gap = 16;
        const pillWidths = tags.map(t => {
          ctx.font = "bold 20px system-ui, sans-serif";
          return ctx.measureText(t).width + 56;
        });
        const totalW = pillWidths.reduce((a, b) => a + b, 0) + gap * (tags.length - 1);
        let px = (W - totalW) / 2;
        const py = 935;

        tags.forEach((tag, i) => {
          const pw = pillWidths[i];
          // Pill background with Kesari/Gold subtle tint
          ctx.fillStyle = i === 0 ? "rgba(255, 153, 0, 0.12)" : "rgba(255, 255, 255, 0.07)";
          ctx.strokeStyle = i === 0 ? "rgba(255, 153, 0, 0.45)" : "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(px, py, pw, pillH, pillR);
          ctx.fill(); ctx.stroke();

          // Pill text
          ctx.font = "bold 20px system-ui, sans-serif";
          ctx.fillStyle = i === 0 ? "#FFB020" : "#FFFFFF";
          ctx.fillText(tag, px + pw / 2, py + pillH / 2 + 7);
          px += pw + gap;
        });

        // ── 7. Panipat Heritage & Barcode Footer Ribbon ────────────
        const footerY = 1040;
        const footerSep = ctx.createLinearGradient(120, 0, W - 120, 0);
        footerSep.addColorStop(0, "rgba(255, 255, 255, 0)");
        footerSep.addColorStop(0.5, "rgba(255, 255, 255, 0.18)");
        footerSep.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = footerSep;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(120, footerY); ctx.lineTo(W - 120, footerY); ctx.stroke();

        // Barcode lines
        const barY = 1080;
        const bars = [4, 2, 6, 3, 7, 2, 5, 3, 7, 2, 4, 6, 3, 5, 2, 6, 4, 3, 7, 2, 5, 3, 6, 2, 4, 6, 3, 5, 2, 7];
        const barStartX = (W - (bars.length * 9)) / 2;
        bars.forEach((h, i) => {
          ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
          ctx.fillRect(barStartX + (i * 9), barY, 4, h * 4.5 + 18);
        });

        // Verification Serial & Heritage Note
        ctx.font = "600 18px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("CREDENTIAL: HR-PIET-2026-DELEGATE", W / 2, 1170);

        // Official Links
        ctx.font = "bold 24px monospace";
        ctx.fillStyle = "#FF9900";
        ctx.fillText("awssbgpiet.in", W / 2 - 180, 1230);

        ctx.fillStyle = "#AD5CFF";
        ctx.fillText("#AWSSCDPanipat", W / 2 + 180, 1230);

        ctx.font = "500 18px system-ui, sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillText("From Panipat to a Brighter Tomorrow  •  AWS Student Builder Group PIET", W / 2, 1280);

        canvas.toBlob((blob) => {
          if (blob) resolve({ blob, dataUrl: canvas.toDataURL("image/png") });
          else resolve(null);
        }, "image/png");
      };
    });
  };

  const getCustomShareText = () =>
    `🚀 I'm attending Haryana's first-ever AWS Student Community Day organized by AWS Student Builder Group at PIET on 11th September 2026!\n\n👤 Attendee: ${name || "Student Builder"}\n🏛️ Campus: ${college || "PIET Panipat"}\n🎯 Focus: ${currentTrack.label}\n\nPost your badge on LinkedIn with #AWSSCDPanipat and tag AWS Student Builder Group at PIET. AWS Heroes & mentors will select 10 builders for exclusive VIP Swag Packs!\n\nReserve your pass: ${EVENT_DETAILS.commudleUrl}\n\n#AWSSCDPanipat #AWSSBGPIET #AWSCommunity #CloudBuilders #Haryana`;

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
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF9900] block mb-1.5">
          HARYANA SUMMIT 2026 • OFFICIAL ATTENDEE BADGE
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Create Your Panipat Summit Badge
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Celebrate Haryana&apos;s biggest cloud milestone. Personalize your badge, download in HD, and share on LinkedIn to win VIP Swag!
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
            <span className="text-[10px] font-mono font-bold text-[#FF9900] bg-[#FF9900]/10 px-2.5 py-0.5 rounded-full border border-[#FF9900]/20">
              HARYANA EDITION
            </span>
          </div>

          <div className="space-y-4">
            {/* Photo */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">ATTENDEE PHOTO</label>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-[#FF9900] shrink-0 bg-slate-900 shadow-md">
                  <Image src={avatarUrl} alt="Avatar" fill className="object-cover" unoptimized={avatarUrl.startsWith("data:")} />
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-fit px-3.5 py-1.5 rounded-xl bg-[#FF9900] hover:bg-[#E58A00] text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#FF9900] focus:outline-none transition-colors"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#FF9900] focus:outline-none transition-colors"
              />
            </div>

            {/* Track Selector */}
            <div className="relative">
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">SUMMIT TRACK FOCUS</label>
              <button
                type="button"
                onClick={() => setIsTrackOpen(!isTrackOpen)}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isTrackOpen
                    ? "bg-white dark:bg-[#0E1430] border-[#FF9900]"
                    : "bg-slate-50 dark:bg-white/[0.02] border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-[#FF9900] text-slate-950 shrink-0">
                    <HugeiconsIcon icon={currentTrack.icon} className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentTrack.label}</span>
                    <span className="text-[10px] font-mono text-[#FF9900] truncate">{currentTrack.tag}</span>
                  </div>
                </div>
                <div className={`p-1 text-slate-500 transition-transform duration-200 ${isTrackOpen ? "rotate-180 text-[#FF9900]" : ""}`}>
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
                          sel ? "bg-[#FF9900]/15 text-[#FF9900] font-bold"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-1.5 rounded-lg shrink-0 ${sel ? "bg-[#FF9900] text-slate-950" : "bg-slate-200/80 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400"}`}>
                            <HugeiconsIcon icon={track.icon} className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs truncate">{track.label}</span>
                        </div>
                        {sel && <HugeiconsIcon icon={Tick02Icon} className="h-3.5 w-3.5 text-[#FF9900] shrink-0" />}
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
                className="flex-1 py-3 rounded-xl bg-[#FF9900] hover:bg-[#E58A00] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={Download01Icon} className="h-4 w-4" />
                <span>Download Badge (HD)</span>
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

        {/* ── Right: Live Haryana / Panipat Heritage Preview ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center justify-center"
        >
          {/* Badge Card: Authentic Haryana Panipat Summit Pass */}
          <div
            className="w-full max-w-sm rounded-[36px] relative overflow-hidden shadow-2xl text-white border border-[#FF9900]/25"
            style={{
              background: "linear-gradient(155deg, #090E24 0%, #060A1D 45%, #03050F 100%)",
            }}
          >
            {/* Top Saffron Solar Flare & Ambient Lighting */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(255, 153, 0, 0.25) 0%, transparent 60%)",
              }}
            />

            {/* Cultural Watermark: Devanagari "पानीपत" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <span className="text-[100px] font-black text-white/[0.025] transform -rotate-12 tracking-wider">
                पानीपत
              </span>
            </div>

            {/* Heritage Geometric Inner Border Line */}
            <div className="absolute inset-2.5 rounded-[28px] border border-white/[0.06] pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col items-center px-6 pt-7 pb-6">

              {/* Top Community Crest & Summit Tagline */}
              <div className="flex items-center gap-2 mb-1">
                <div className="relative h-7 w-7 rounded-lg overflow-hidden bg-white/10 border border-[#FF9900]/30 p-1 flex items-center justify-center">
                  <Image src="/images/sbg-logo.png" alt="AWS SBG PIET" fill className="object-contain p-0.5" />
                </div>
                <span className="text-xs font-mono font-black tracking-widest text-[#FF9900]">
                  AWS SBG PIET
                </span>
                <span className="text-[9px] font-mono text-white/40 uppercase">
                  • PANIPAT
                </span>
              </div>

              {/* Event Title */}
              <p className="text-[11px] font-mono font-bold tracking-widest uppercase text-white/80 mt-1">
                AWS Student Community Day • PIET Panipat
              </p>

              {/* Gold Filigree Line */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF9900]/40 to-transparent my-2" />

              {/* Attendee Ribbon */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF9900]/15 border border-[#FF9900]/35 text-[#FFB020] text-[10px] font-mono font-bold tracking-widest uppercase shadow-sm">
                <span>✦ ATTENDEE ✦</span>
              </div>

              {/* Profile Avatar with Royal Saffron Aura */}
              <div className="mt-4 mb-3 relative">
                {/* Radiant Saffron Aura */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255, 153, 0, 0.4) 55%, transparent 75%)",
                    transform: "scale(1.22)",
                  }}
                />
                {/* Double Gold Ring Border */}
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full border-[3px] border-[#FF9900] shadow-[0_0_25px_rgba(255,153,0,0.4)] overflow-hidden bg-slate-900 ring-2 ring-white/30">
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
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-center leading-tight" style={{ color: "#F5B942" }}>
                {name || "Aarav Sharma"}
              </h4>

              {/* College / Institution */}
              <div className="flex items-center gap-1 text-xs text-white/70 font-semibold mt-1 text-center">
                <HugeiconsIcon icon={Location01Icon} className="h-3 w-3 text-[#FF9900]" />
                <span>{college || "PIET Panipat"}</span>
              </div>

              {/* Tag Pills: Student Cloud Builder • AWS Community • I'm Attending ✦ */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                <span className="px-3 py-1 rounded-full text-[10.5px] font-bold text-[#FFB020] bg-[#FF9900]/15 border border-[#FF9900]/30 shadow-sm">
                  {currentTrack.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-[10.5px] font-semibold text-white bg-white/10 border border-white/20">
                  AWS Community
                </span>
                <span className="px-3 py-1 rounded-full text-[10.5px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30">
                  I&apos;m Attending ✦
                </span>
              </div>

              {/* Footer: awssbgpiet.in • #AWSSCDPanipat */}
              <div className="mt-5 w-full pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#FF9900]">
                  awssbgpiet.in
                </span>
                <span className="text-[10px] font-mono font-bold text-[#AD5CFF]">
                  #AWSSCDPanipat
                </span>
              </div>
            </div>
          </div>

          {/* Social Proof Giveaway Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] max-w-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#FF9900] mb-1">
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