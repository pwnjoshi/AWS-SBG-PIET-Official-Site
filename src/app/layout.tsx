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
    "Join 500+ student builders, AWS Heroes, and cloud architects on 11 September 2026 at PIET Campus, Panipat. Haryana's first-ever AWS Student Community Day.",
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
    title: "AWS Student Community Day Panipat 2026 — 11 Sept 2026",
    description:
      "Haryana's first-ever AWS Student Community Day. 6 tracks, KIRO Buildathon, Ideathon, AWS Heroes, Credly Badges & Builder Passes.",
    url: "https://www.commudle.com/communities/aws-student-builder-group-piet/events/aws-student-community-day-panipat",
    siteName: "AWS Student Community Day Panipat 2026",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Community Day Panipat 2026",
    description: "Powering the next generation of cloud innovators. 11 Sept 2026 at PIET Panipat.",
  },
};

import TawkChat from "@/components/TawkChat";

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
        {children}
        <TawkChat />
      </body>
    </html>
  );
}
