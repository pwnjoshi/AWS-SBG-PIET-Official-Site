import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AWS Student Community Day Panipat 2026 | PIET Summit",
  description:
    "Official AWS SCD 2026 at PIET Panipat on 11 Sept. Keynotes by Praful Bagai, 6 technical tracks, KIRO Buildathon, live labs, and Credly badges.",
  alternates: {
    canonical: "/scd-panipat-2026",
  },
  openGraph: {
    title: "AWS Student Community Day Panipat 2026 | PIET Summit",
    description:
      "Official AWS SCD 2026 at PIET Panipat on 11 Sept. Keynotes by Praful Bagai, 6 technical tracks, KIRO Buildathon, live labs, and Credly badges.",
    url: "https://awssbgpiet.in/scd-panipat-2026",
    type: "website",
    images: [
      {
        url: "/images/og-scd-panipat-2026.jpg",
        width: 1200,
        height: 630,
        alt: "Haryana's First AWS Student Community Day - 11 Sept 2026 at PIET Panipat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Student Community Day Panipat 2026 | PIET Summit",
    description: "Official AWS SCD 2026 at PIET Panipat on 11 Sept. Keynotes, 6 technical tracks, KIRO Buildathon, live labs, and Credly badges.",
    images: ["/images/og-scd-panipat-2026.jpg"],
  },
};

export default function SCDLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
