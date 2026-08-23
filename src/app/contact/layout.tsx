import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Support | AWS SBG PIET",
  description:
    "Get in touch with the AWS Student Builder Group team at PIET for pass inquiries, sponsorship, CFP speaker submissions, and campus outreach.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Support | AWS SBG PIET",
    description:
      "Get in touch with the AWS Student Builder Group team at PIET for pass inquiries, sponsorship, CFP speaker submissions, and campus outreach.",
    url: "https://awssbgpiet.in/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
