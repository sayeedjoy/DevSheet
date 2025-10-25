import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/private/",
          "/*.json$",
          "/*.xml$",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
