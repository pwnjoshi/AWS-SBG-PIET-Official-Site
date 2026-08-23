"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  SparklesIcon,
  Tick02Icon,
  Linkedin01Icon,
  Camera01Icon,
  Copy01Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import confetti from "canvas-confetti";
import { EVENT_DETAILS } from "@/lib/data";

const ROLES = [
  "Student Builder",
  "GenAI & Bedrock Explorer",
  "DevOps Specialist",
  "Cloud Architect in the Making",
  "KIRO Buildathon Competitor",
  "Campus Innovator",
];

export default function BadgeGenerator() {
  const [name, setName] = useState("Aarav Sharma");
  const [college, setCollege] = useState("PIET Panipat");
  const [role, setRole] = useState(ROLES[0]);
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/sbg-logo.png");
  const [isCustomAvatar, setIsCustomAvatar] = useState(false);
  const [copied, setCopied] = useState(false);
  const [serialId, setSerialId] = useState("AWS-SCD-2026-8492");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Generate unique serial
  useEffect(() => {
    const num = Math.floor(1000 + Math.random() * 9000);
    setSerialId(`AWS-SCD-2026-${num}`);
  }, []);

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
              particleCount: 40,
              spread: 50,
              origin: { y: 0.6 },
              colors: ["#AD5CFF", "#BE7BFF", "#FFFFFF"],
            });
          } catch {
            // ignore
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getLinkedInShareUrl = () => {
    const shareText = `🚀 I'm attending Haryana's first-ever AWS Student Community Day (SCD) at PIET Panipat on 11th September 2026!\n\nExcited for technical keynotes by Praful Bagai, deep-dives on Generative AI with Amazon Bedrock, KIRO Buildathon, DevOps, and connecting with AWS Heroes & 500+ student builders.\n\nReserve your pass on Commudle: ${EVENT_DETAILS.commudleUrl}\n\n#AWSSCDPanipat #AWSSBGPIET #AWSCommunity #CloudBuilders #PIETPanipat #GenerativeAI`;
    return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
  };

  const handleCopyPostText = () => {
    const text = `🚀 I'm attending Haryana's first-ever AWS Student Community Day (SCD) at PIET Panipat on 11th September 2026!\n\nExcited for technical keynotes by Praful Bagai, deep-dives on Generative AI with Amazon Bedrock, KIRO Buildathon, DevOps, and connecting with AWS Heroes & 500+ student builders.\n\nReserve your pass on Commudle: ${EVENT_DETAILS.commudleUrl}\n\n#AWSSCDPanipat #AWSSBGPIET #AWSCommunity #CloudBuilders #PIETPanipat #GenerativeAI`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // High-Resolution 1200x1200px Badge Export via HTML5 Canvas
  const handleDownloadBadge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 1200;

    // Background Gradient (Deep Cosmic Void)
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 1200);
    bgGrad.addColorStop(0, "#05070E");
    bgGrad.addColorStop(0.5, "#0A0D24");
    bgGrad.addColorStop(1, "#120B2E");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1200);

    // Glowing Ambient Orbs
    const glow1 = ctx.createRadialGradient(1000, 200, 50, 1000, 200, 450);
    glow1.addColorStop(0, "rgba(173, 92, 255, 0.4)");
    glow1.addColorStop(1, "rgba(173, 92, 255, 0)");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, 1200, 1200);

    const glow2 = ctx.createRadialGradient(200, 1000, 50, 200, 1000, 450);
    glow2.addColorStop(0, "rgba(142, 53, 234, 0.35)");
    glow2.addColorStop(1, "rgba(142, 53, 234, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, 1200, 1200);

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

    // Inner Card Border Container
    ctx.strokeStyle = "rgba(173, 92, 255, 0.4)";
    ctx.lineWidth = 4;
    drawRoundedRect(60, 60, 1080, 1080, 40, false, true);

    // Header Badge Pill
    ctx.fillStyle = "rgba(173, 92, 255, 0.15)";
    ctx.strokeStyle = "rgba(173, 92, 255, 0.5)";
    ctx.lineWidth = 2;
    drawRoundedRect(120, 110, 480, 55, 28, true, true);

    ctx.font = "bold 20px monospace";
    ctx.fillStyle = "#BE7BFF";
    ctx.fillText("AWS STUDENT COMMUNITY DAY 2026", 145, 145);

    // Date & Venue Top Right
    ctx.font = "bold 22px monospace";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "right";
    ctx.fillText("11 SEPT 2026 • PIET PANIPAT", 1080, 145);
    ctx.textAlign = "left";

    // Main Title: "I'M ATTENDING"
    ctx.font = "900 68px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("I'M ATTENDING", 120, 250);

    // Subtitle Gradient: "HARYANA'S 1ST AWS SUMMIT"
    ctx.font = "900 36px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#AD5CFF";
    ctx.fillText("HARYANA'S FIRST AWS STUDENT COMMUNITY DAY", 120, 305);

    // Draw Attendee Image (Circle with glowing border)
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = avatarUrl;
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(600, 520, 160, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 440, 360, 320, 320);
      ctx.restore();

      // Outer Glowing Ring around Avatar
      ctx.strokeStyle = "#AD5CFF";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(600, 520, 164, 0, Math.PI * 2, true);
      ctx.stroke();

      // Attendee Name
      ctx.font = "900 52px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.fillText(name || "Student Builder", 600, 750);

      // College / Institution
      ctx.font = "600 28px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText(college || "PIET Panipat", 600, 795);

      // Role Pill Box
      ctx.fillStyle = "rgba(173, 92, 255, 0.2)";
      ctx.strokeStyle = "rgba(190, 123, 255, 0.6)";
      ctx.lineWidth = 2;
      drawRoundedRect(350, 830, 500, 55, 28, true, true);

      ctx.font = "bold 22px monospace";
      ctx.fillStyle = "#BE7BFF";
      ctx.fillText(`★ ${role.toUpperCase()} ★`, 600, 865);

      // Footer Divider
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(120, 950);
      ctx.lineTo(1080, 950);
      ctx.stroke();

      // Footer Meta
      ctx.textAlign = "left";
      ctx.font = "bold 20px monospace";
      ctx.fillStyle = "#64748B";
      ctx.fillText(`SERIAL: ${serialId}`, 120, 1020);

      ctx.font = "bold 20px monospace";
      ctx.fillStyle = "#10B981";
      ctx.fillText("✓ VERIFIED SUMMIT BADGE", 120, 1055);

      ctx.textAlign = "right";
      ctx.font = "bold 22px monospace";
      ctx.fillStyle = "#AD5CFF";
      ctx.fillText("ORG: AWS SBG AT PIET", 1080, 1020);

      ctx.font = "18px monospace";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText("commudle.com/events/aws-scd-panipat", 1080, 1055);

      // Trigger Instant Download
      const link = document.createElement("a");
      link.download = `AWS-SCD-2026-Badge-${name.replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#AD5CFF", "#BE7BFF", "#10B981", "#FFFFFF"],
        });
      } catch {
        // ignore
      }
    };
  };

  return (
    <div id="badge-generator" className="relative w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hidden Canvas for High-Resolution Export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-2">
          VIRAL MARKETING STUDIO
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          Create Your &ldquo;I&apos;m Attending&rdquo; Summit Badge
        </h2>
        <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Upload your photo, generate your official holographic attendee card, and share on LinkedIn to get featured by AWS Heroes and enter the exclusive VIP Swag giveaway!
        </p>
      </motion.div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customization Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 rounded-3xl bg-white dark:bg-[#080D1E] border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-white/[0.06]">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Badge Customizer
            </h3>
            <span className="text-[10px] font-mono font-bold text-[#8E35EA] dark:text-[#AD5CFF] bg-[#AD5CFF]/10 px-2 py-0.5 rounded-full border border-[#AD5CFF]/20">
              LIVE PREVIEW
            </span>
          </div>

          <div className="space-y-4">
            {/* Photo Upload Zone */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1.5 font-bold">
                ATTENDEE PHOTO / AVATAR
              </label>
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08]">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#AD5CFF] shrink-0 bg-slate-900 flex items-center justify-center shadow-md">
                  <Image
                    src={avatarUrl}
                    alt="Attendee Avatar"
                    fill
                    className="object-cover"
                    unoptimized={avatarUrl.startsWith("data:")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
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
                    className="px-3.5 py-1.5 rounded-xl bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-[#AD5CFF]/25 cursor-pointer"
                  >
                    <HugeiconsIcon icon={Camera01Icon} className="h-3.5 w-3.5" />
                    <span>Upload Profile Photo</span>
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {isCustomAvatar ? "✓ Custom photo uploaded" : "PNG / JPG format supported"}
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none transition-colors"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none transition-colors"
              />
            </div>

            {/* Role Selector */}
            <div>
              <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 block mb-1 font-bold">
                SUMMIT TRACK & ROLE
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#04060E] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-[#AD5CFF] focus:outline-none cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Action CTAs: Download & LinkedIn Share */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleDownloadBadge}
                className="flex-1 py-3 rounded-xl bg-[#AD5CFF] hover:bg-[#BE7BFF] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#AD5CFF]/25 hover:scale-[1.02] cursor-pointer"
              >
                <HugeiconsIcon icon={Download01Icon} className="h-4 w-4" />
                <span>Download Badge (HD PNG)</span>
              </button>

              <a
                href={getLinkedInShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02] cursor-pointer"
              >
                <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />
                <span>Share on LinkedIn</span>
              </a>
            </div>

            {/* Copy Share Copy Hook */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyPostText}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} className={`h-3.5 w-3.5 ${copied ? "text-emerald-500" : ""}`} />
                <span>{copied ? "LinkedIn Post Copy Copied to Clipboard!" : "Copy Ready-to-Post LinkedIn Caption"}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Live Holographic Badge Graphic */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col items-center justify-center"
        >
          {/* Card Graphic with Parallax 3D Hover */}
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 4, rotateX: -3 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md rounded-3xl bg-gradient-to-br from-[#05070E] via-[#0A0D24] to-[#120B2E] border-2 border-[#AD5CFF]/50 p-7 shadow-2xl shadow-purple-500/20 text-white relative overflow-hidden perspective-1000"
          >
            {/* Top Conic Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#AD5CFF]/20 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8E35EA]/20 blur-[90px] rounded-full pointer-events-none" />

            {/* Top Pill & Event Details */}
            <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10 relative z-10">
              <span className="text-[10px] font-mono font-bold text-[#BE7BFF] uppercase tracking-wider bg-[#AD5CFF]/15 px-2.5 py-1 rounded-full border border-[#AD5CFF]/30">
                AWS SCD PANIPAT 2026
              </span>
              <span className="text-[10px] font-mono text-slate-300">
                11 SEPT 2026
              </span>
            </div>

            {/* Main Header Tag */}
            <div className="text-center relative z-10 mb-4">
              <span className="text-[10px] font-mono font-bold text-[#AD5CFF] uppercase tracking-widest block mb-1">
                OFFICIAL ATTENDEE
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                I&apos;M ATTENDING
              </h4>
            </div>

            {/* Avatar Spotlight */}
            <div className="flex justify-center relative z-10 my-4">
              <div className="relative h-28 w-28 rounded-full p-1 bg-gradient-to-tr from-[#AD5CFF] via-[#BE7BFF] to-white shadow-xl shadow-[#AD5CFF]/30">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900">
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
            <div className="text-center relative z-10">
              <h5 className="text-xl font-extrabold text-white tracking-tight">
                {name || "Student Builder"}
              </h5>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {college || "PIET Panipat"}
              </p>

              {/* Role Chip */}
              <div className="inline-flex items-center gap-1 mt-2.5 px-3 py-1 rounded-full bg-[#AD5CFF]/15 border border-[#AD5CFF]/35 text-[11px] font-mono font-bold text-[#BE7BFF]">
                <HugeiconsIcon icon={SparklesIcon} className="h-3 w-3" />
                <span>{role}</span>
              </div>
            </div>

            {/* Card Footer Bar */}
            <div className="pt-4 mt-6 border-t border-dashed border-white/15 flex items-center justify-between text-[9px] font-mono text-slate-400 relative z-10">
              <div>
                <span className="block text-slate-500">SERIAL ID</span>
                <span className="font-bold text-white text-[10px]">{serialId}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <HugeiconsIcon icon={Tick02Icon} className="h-3 w-3" />
                <span>VERIFIED</span>
              </div>
            </div>
          </motion.div>

          {/* Social Proof & Giveaway Incentive Callout */}
          <div className="mt-4 p-4 rounded-2xl bg-purple-500/10 border border-[#AD5CFF]/25 max-w-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#BE7BFF] mb-1">
              <HugeiconsIcon icon={Share01Icon} className="h-3.5 w-3.5" />
              <span>Viral Community Spotlight Hook</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Post your badge on LinkedIn with <strong>#AWSSCDPanipat</strong> and tag <strong>AWS SBG PIET</strong>. Our AWS Heroes & team will comment on your post and select 10 builders for exclusive <strong>VIP Swag Packs</strong>!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
