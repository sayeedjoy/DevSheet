/**
 * SEO Utility Functions
 * Helper functions for generating SEO-friendly content
 */

/**
 * Generate a page title with site branding
 * Format: "Page Title | Site Title"
 */
export function generatePageTitle(
  pageTitle: string,
  siteTitle: string,
): string {
  return `${pageTitle} | ${siteTitle}`;
}

/**
 * Truncate description to optimal length for SEO (150-160 chars)
 */
export function truncateDescription(
  description: string,
  maxLength: number = 155,
): string {
  if (description.length <= maxLength) {
    return description;
  }

  return description.slice(0, maxLength - 3) + "...";
}

/**
 * Generate keywords from content
 */
export function extractKeywords(content: string, limit: number = 10): string[] {
  // Remove markdown syntax and split into words
  const words = content
    .replace(/[#*`\[\]()]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);

  // Count word frequency
  const frequency: Record<string, number> = {};

  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Generate structured data for article pages
 */
export function generateArticleStructuredData(data: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    url: data.url,
    datePublished: data.datePublished || new Date().toISOString(),
    dateModified: data.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: data.author || "DevSheet Team",
    },
    publisher: {
      "@type": "Organization",
      name: "DevSheet",
      logo: {
        "@type": "ImageObject",
        url: data.image || "/logo.png",
      },
    },
    image: data.image || "/og-image.png",
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{
    name: string;
    url: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
