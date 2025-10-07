import { Metadata } from "next";

import { HomeHero } from "@/components/home/home-hero";
import { CheatsheetGrid } from "@/components/cheatsheet/cheatsheet-grid";
import { siteConfig } from "@/config/site";

// Enable static generation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

// Home page metadata
export const metadata: Metadata = {
  title: "হোম | ডেভ চিটশিট",
  description: siteConfig.description,
  keywords: [
    "বাংলা চিটশিট",
    "developer cheatsheet",
    "programming reference",
    "git cheatsheet",
    "linux commands",
    "বাংলা প্রোগ্রামিং",
  ],
  openGraph: {
    title: `হোম | ${siteConfig.name}`,
    description: siteConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `হোম | ${siteConfig.name}`,
    description: siteConfig.description,
  },
};

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8">
      <HomeHero />
      <CheatsheetGrid />
    </section>
  );
}
