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
  metadataBase: new URL("https://aws-sbg-piet.co.in"),
  title: {
    default: "AWS Student Community Day Panipat 2026 | AWS SBG PIET",
    template: "%s | AWS SBG PIET",
  },
  description:
    "Official AWS Student Community Day in Haryana. Join 500+ builders on 11 Sept 2026 at PIET Panipat for keynotes, 6 cloud tracks, and KIRO Buildathon.",
  keywords: [
    "AWS Student Community Day",
    "AWS SCD Panipat 2026",
    "PIET Panipat",
    "AWS Student Builder Group",
    "Cloud Computing Haryana",
    "Generative AI on AWS",
    "DevOps",
    "AWS Community Day India",
    "Student Cloud Conference",
  ],
  authors: [{ name: "AWS Student Builder Group PIET" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AWS Student Community Day Panipat 2026 | AWS SBG PIET",
    description:
      "Haryana's premier AWS Student Community Day. 6 tracks, KIRO Buildathon, AWS Heroes, Credly Badges & Builder Passes on 11 Sept 2026.",
    url: "https://aws-sbg-piet.co.in",
    siteName: "AWS Student Community Day Panipat 2026",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/piet-campus.png",
        width: 1200,
        height: 630,
        alt: "AWS Student Community Day Panipat 2026 at PIET Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Community Day Panipat 2026",
    description: "Powering the next generation of cloud innovators. 11 Sept 2026 at PIET Panipat.",
    images: ["/images/piet-campus.png"],
  },
  icons: {
    icon: [
      { url: "/images/sbg-logo.png", sizes: "any" },
      { url: "/images/sbg-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/images/sbg-logo.png", type: "image/png", sizes: "192x192" },
      { url: "/images/sbg-logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/images/sbg-logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/sbg-logo.png",
  },
};

import TawkChat from "@/components/TawkChat";
import JsonLd from "@/components/JsonLd";
import { SoundtrackProvider } from "@/context/SoundtrackContext";
import CelebrationAmbienceEffects from "@/components/CelebrationAmbienceEffects";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/images/sbg-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/sbg-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/sbg-logo.png" />
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#AD5CFF]/30 selection:text-slate-950 dark:selection:text-white antialiased transition-colors duration-300">
        <SoundtrackProvider>
          <CelebrationAmbienceEffects />
          {children}
        </SoundtrackProvider>
        <TawkChat />
      </body>
    </html>
  );
}
