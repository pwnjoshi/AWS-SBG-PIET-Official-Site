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
    url: "https://aws-sbg-piet.co.in/scd-panipat-2026",
    type: "website",
    images: [
      {
        url: "/images/piet-campus.png",
        width: 1200,
        height: 630,
        alt: "AWS Student Community Day Panipat 2026",
      },
    ],
  },
};

export default function SCDLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
