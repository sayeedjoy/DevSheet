import { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "কন্ট্রিবিউটর",
  description: "ডেভ চিটশিট প্রকল্পে অবদান রাখা সকল ডেভেলপারদের তালিকা",
  keywords: [
    "contributors",
    "কন্ট্রিবিউটর",
    "developers",
    "ডেভেলপার",
    "open source",
    "github",
  ],
  alternates: {
    canonical: "/contributor",
  },
  openGraph: {
    title: `কন্ট্রিবিউটর | ${siteConfig.name}`,
    description: "ডেভ চিটশিট প্রকল্পে অবদান রাখা সকল ডেভেলপারদের তালিকা",
    type: "website",
    url: "/contributor",
  },
  twitter: {
    card: "summary_large_image",
    title: `কন্ট্রিবিউটর | ${siteConfig.name}`,
    description: "ডেভ চিটশিট প্রকল্পে অবদান রাখা সকল ডেভেলপারদের তালিকা",
  },
};

export default function ContributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
