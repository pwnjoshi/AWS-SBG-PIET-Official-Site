import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official SCD 2026 Badge Studio | AWS SBG PIET",
  description:
    "Generate and download your custom official 3D participant badge for AWS Student Community Day Panipat 2026. Share on LinkedIn and X.",
  alternates: {
    canonical: "/scd-panipat-2026/badge",
  },
  openGraph: {
    title: "Official SCD 2026 Badge Studio | AWS SBG PIET",
    description:
      "Generate and download your custom official 3D participant badge for AWS Student Community Day Panipat 2026. Share on LinkedIn and X.",
    url: "https://aws-sbg-piet.co.in/scd-panipat-2026/badge",
    type: "website",
  },
};

export default function BadgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
