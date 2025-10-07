import Link from "next/link";
import { Metadata } from "next";

import { title } from "@/config/primitives";
import { siteConfig } from "@/config/site";

// Enable static generation
export const dynamic = "force-static";

// 404 page metadata
export const metadata: Metadata = {
  title: "৪০৪ - পেজ পাওয়া যায়নি", // Will become "৪০৪ - পেজ পাওয়া যায়নি | ডেভ চিটশিট"
  description: "দুঃখিত, আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নেই।",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: `৪০৪ - পেজ পাওয়া যায়নি | ${siteConfig.name}`,
    description: "পেজ খুঁজে পাওয়া যায়নি",
  },
};

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ class: "bangla-text" })}>৪০৪</h1>
        <h2 className="text-2xl font-bold mt-4 bangla-text">
          পেজ খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-default-500 mt-4 bangla-text">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন তা বিদ্যমান নেই।
        </p>
        <Link
          className="mt-8 inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors bangla-text"
          href="/"
        >
          হোমে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
