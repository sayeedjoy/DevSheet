import { Metadata } from "next";

import { title } from "@/config/primitives";
import { siteConfig } from "@/config/site";

// Enable static generation
export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate once per day

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description:
    "ডেভ চিটশিট সম্পর্কে জানুন - বাংলায় ডেভেলপারদের জন্য চিটশিট সংগ্রহ",
  keywords: [
    "about",
    "সম্পর্কে",
    "devsheet",
    "বাংলা চিটশিট",
    "developer resources",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `আমাদের সম্পর্কে | ${siteConfig.name}`,
    description:
      "ডেভ চিটশিট সম্পর্কে জানুন - বাংলায় ডেভেলপারদের জন্য চিটশিট সংগ্রহ",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: `আমাদের সম্পর্কে | ${siteConfig.name}`,
    description: "ডেভ চিটশিট সম্পর্কে জানুন",
  },
};

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="inline-block max-w-3xl text-center justify-center">
        <h1 className={title({ class: "bangla-text" })}>সম্পর্কে</h1>
        <div className="mt-8 text-left space-y-4 bangla-text">
          <p className="text-lg">
            ডেভ চিটশিট হল বাংলা ভাষায় ডেভেলপারদের জন্য একটি চিটশিট সংগ্রহ।
            এখানে আপনি বিভিন্ন প্রোগ্রামিং ভাষা, টুলস এবং টেকনোলজির জন্য সহজ এবং
            দ্রুত রেফারেন্স খুঁজে পাবেন।
          </p>
          <p className="text-lg">
            আমাদের লক্ষ্য হল বাংলাভাষী ডেভেলপারদের জন্য একটি সহজ এবং দ্রুত
            রেফারেন্স সরবরাহ করা, যাতে তারা তাদের দৈনন্দিন কাজে আরও কার্যকরভাবে
            কাজ করতে পারে।
          </p>
        </div>
      </div>
    </section>
  );
}
