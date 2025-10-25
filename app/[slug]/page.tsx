import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { Divider } from "@heroui/divider";
import remarkGfm from "remark-gfm";

import { getCheatsheetBySlug, getAllCheatsheetSlugs } from "@/lib/cheatsheets";
import { mdxComponents } from "@/components/common/mdx-components";
import { CopyLinkButton } from "@/components/common/copy-link-button";
import { siteConfig } from "@/config/site";

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
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: cheatsheet.title,
            description: cheatsheet.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}/${slug}`,
            image: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}${siteConfig.ogImage}`,
            author: {
              "@type": "Person",
              name: siteConfig.author.name,
              url: siteConfig.author.url,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.author.name,
              url: siteConfig.author.url,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}/logo.png`,
              },
            },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}/${slug}`,
            },
            articleSection: cheatsheet.category || "Programming",
            keywords: [
              cheatsheet.title,
              slug,
              "cheatsheet",
              "চিটশিট",
              cheatsheet.category || "programming",
            ].join(", "),
            inLanguage: "bn-BD",
            about: {
              "@type": "Thing",
              name: "Programming Reference",
              description:
                "Developer cheatsheet and programming reference guide",
            },
            audience: {
              "@type": "Audience",
              audienceType: "Developers",
            },
          }),
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "হোম",
                item: process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: cheatsheet.title,
                item: `${process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url}/${slug}`,
              },
            ],
          }),
        }}
      />
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
    </>
  );
}

// Generate metadata for each cheatsheet page
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

  const keywords = [
    cheatsheet.title,
    slug,
    "cheatsheet",
    "চিটশিট",
    cheatsheet.category || "programming",
    "বাংলা",
    "reference",
    "commands",
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const url = `${baseUrl}/${slug}`;

  return {
    title: cheatsheet.title,
    description: cheatsheet.description,
    keywords,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: `${cheatsheet.title} | ${siteConfig.name}`,
      description: cheatsheet.description,
      type: "article",
      locale: "bn_BD",
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: cheatsheet.title,
          type: "image/png",
        },
      ],
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      authors: [siteConfig.author.name],
      section: cheatsheet.category || "Technology",
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${cheatsheet.title} | ${siteConfig.name}`,
      description: cheatsheet.description,
      creator: siteConfig.social.twitter,
      site: siteConfig.social.twitter,
      images: [siteConfig.ogImage],
    },
    authors: [{ name: siteConfig.author.name }],
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
