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
  metadataBase: new URL("https://awssbgpiet.in"),
  title: {
    default: "AWS Student Builder Group PIET | Cloud Community at PIET Panipat",
    template: "%s | AWS SBG PIET",
  },
  description:
    "AWS Student Builder Group (SBG) at PIET Panipat — India's official AWS student community building the next generation of cloud builders through events, projects, and mentorship.",
  keywords: [
    "AWS Student Builder Group PIET",
    "AWS SBG PIET",
    "Cloud Community PIET Panipat",
    "AWS Student Community",
    "Cloud Computing Haryana",
    "AWS Community India",
    "Student Cloud Community",
    "PIET Panipat Tech Club",
  ],
  authors: [{ name: "AWS Student Builder Group PIET" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AWS Student Builder Group PIET | Cloud Community",
    description:
      "AWS Student Builder Group at PIET Panipat — building the next generation of cloud leaders through events, mentorship, and real-world projects.",
    url: "https://awssbgpiet.in",
    siteName: "AWS Student Community Day Panipat 2026",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Where Student Builders Engineer the Future on AWS - AWS Student Builder Group at PIET",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Community Day Panipat 2026 | AWS SBG PIET",
    description: "Where Student Builders Engineer the Future on AWS. AWS Student Builder Group at PIET.",
    images: ["/images/og-homepage.jpg"],
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
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/context/ThemeContext";
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
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFC] dark:bg-[#05070E] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#AD5CFF]/30 selection:text-slate-950 dark:selection:text-white antialiased transition-colors duration-300"
      >
        <ScrollToTop />
        <ThemeProvider>
          <SoundtrackProvider>
            <CelebrationAmbienceEffects />
            {children}
          </SoundtrackProvider>
        </ThemeProvider>
        <TawkChat />
      </body>
    </html>
  );
}
