import { Metadata } from "next";
import dynamicImport from "next/dynamic";
import { HomeHero } from "@/components/home/home-hero";
import { siteConfig } from "@/config/site";

const CheatsheetGrid = dynamicImport(() => import("@/components/cheatsheet/cheatsheet-grid").then(mod => mod.CheatsheetGrid), {
  loading: () => <div className="h-[400px] w-full flex items-center justify-center">Loading...</div>,
  ssr: true,
});

// Enable static generation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "হোম",
  description: siteConfig.description,
  keywords: [
    "বাংলা চিটশিট",
    "developer cheatsheet",
    "programming reference",
    "git cheatsheet",
    "linux commands",
    "বাংলা প্রোগ্রামিং",
    "কোডিং গাইড",
    "ডেভেলপার টুলস",
    "terminal commands",
    "programming guide",
  ],
  openGraph: {
    title: `হোম | ${siteConfig.name}`,
    description: siteConfig.description,
    type: "website",
    locale: "bn_BD",
    url: process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `হোম | ${siteConfig.name}`,
    description: siteConfig.description,
    creator: siteConfig.social.twitter,
    site: siteConfig.social.twitter,
    images: [siteConfig.ogImage],
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
