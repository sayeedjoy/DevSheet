import { MetadataRoute } from "next";

import { getAllCheatsheetSlugs } from "@/lib/cheatsheets";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const slugs = getAllCheatsheetSlugs();

  const cheatsheetPages = slugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contributor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...cheatsheetPages,
  ];
}
