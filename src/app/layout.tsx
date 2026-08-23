import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS Student Community Day Panipat 2026 | Largest Student Cloud Event in Haryana",
  description:
    "Join 500+ student builders, AWS Heroes, and cloud architects on 2 September 2026 at PIET Campus, Panipat. Powering the next generation of cloud innovators across Haryana & NCR.",
  keywords: [
    "AWS Student Community Day",
    "AWS SCD Panipat 2026",
    "PIET Panipat",
    "AWS Student Builder Group",
    "Cloud Computing Haryana",
    "Generative AI on AWS",
    "DevOps",
    "AWS Community",
    "Student Cloud Conference",
  ],
  authors: [{ name: "AWS Student Builder Group PIET" }],
  openGraph: {
    title: "AWS Student Community Day Panipat 2026 — 2 Sept 2026",
    description:
      "Largest student-led cloud event in Haryana. 6 tracks, 100% hands-on labs, AWS Heroes, Credly Badges & Free Student Passes.",
    url: "https://aws-sbg-piet.org",
    siteName: "AWS Student Community Day Panipat 2026",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Community Day Panipat 2026",
    description: "Powering the next generation of cloud innovators. 2 Sept 2026 at PIET Panipat.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#05070E] text-slate-100 font-sans selection:bg-[#AD5CFF]/30 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
