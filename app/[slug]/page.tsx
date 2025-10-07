import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Divider } from "@heroui/divider";
import remarkGfm from "remark-gfm";

import { getCheatsheetBySlug, getAllCheatsheetSlugs } from "@/lib/cheatsheets";
import { mdxComponents } from "@/components/common/mdx-components";
import { siteConfig } from "@/config/site";
import { CopyLinkButton } from "@/components/common/copy-link-button";

interface CheatsheetPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CheatsheetPage({ params }: CheatsheetPageProps) {
  const { slug } = await params;

  // Exclude special Next.js routes and other app routes
  const excludedRoutes = ["about", "api", "_not-found"];

  if (excludedRoutes.includes(slug)) {
    notFound();
  }

  const cheatsheet = getCheatsheetBySlug(slug);

  if (!cheatsheet) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-4xl font-bold bangla-text flex-1">
            {cheatsheet.title}
          </h1>
          <CopyLinkButton />
        </div>
        <p className="text-xl text-default-500 bangla-text">
          {cheatsheet.description}
        </p>
        <Divider className="my-6" />
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown components={mdxComponents} remarkPlugins={[remarkGfm]}>
          {cheatsheet.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

// Generate metadata for each cheatsheet page
// Format: "Page Title | Site Title"
export async function generateMetadata({
  params,
}: CheatsheetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cheatsheet = getCheatsheetBySlug(slug);

  if (!cheatsheet) {
    return {
      title: "Not Found",
      description: "পেজ খুঁজে পাওয়া যায়নি",
    };
  }

  // Extract keywords from content
  const keywords = [
    cheatsheet.title,
    slug,
    "cheatsheet",
    "চিটশিট",
    cheatsheet.category || "programming",
  ];

  return {
    title: cheatsheet.title, // Template will add "| Site Title"
    description: cheatsheet.description,
    keywords,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: `${cheatsheet.title} | ${siteConfig.name}`,
      description: cheatsheet.description,
      type: "article",
      url: `/${slug}`,
      images: [
        {
          url: `/og-image.png`,
          width: 1200,
          height: 630,
          alt: cheatsheet.title,
        },
      ],
      publishedTime: new Date().toISOString(),
      authors: ["DevSheet Team"],
      section: cheatsheet.category || "Technology",
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${cheatsheet.title} | ${siteConfig.name}`,
      description: cheatsheet.description,
      images: ["/og-image.png"],
    },
    authors: [{ name: "DevSheet Team" }],
    category: cheatsheet.category || "Technology",
  };
}

export async function generateStaticParams() {
  const slugs = getAllCheatsheetSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Enable static generation with revalidation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour
