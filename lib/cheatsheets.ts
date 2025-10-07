import fs from "fs";
import path from "path";

import matter from "gray-matter";

export interface CheatsheetMetadata {
  title: string;
  description: string;
  icon: string;
  slug: string;
  category?: string;
}

export interface CheatsheetContent extends CheatsheetMetadata {
  content: string;
}

/**
 * Get all cheatsheets from the data folder
 * This automatically reads all .mdx files and extracts their frontmatter
 */
export function getAllCheatsheets(): CheatsheetMetadata[] {
  const dataDirectory = path.join(process.cwd(), "data");

  try {
    const filenames = fs.readdirSync(dataDirectory);

    const cheatsheets = filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => {
        const filePath = path.join(dataDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          title: data.title || filename.replace(".mdx", ""),
          description: data.description || "",
          icon: data.icon || "terminal",
          slug: filename.replace(".mdx", ""),
          category: data.category || "general",
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically

    return cheatsheets;
  } catch {
    return [];
  }
}

/**
 * Get a single cheatsheet by slug
 */
export function getCheatsheetBySlug(slug: string): CheatsheetContent | null {
  try {
    const filePath = path.join(process.cwd(), "data", `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title || slug,
      description: data.description || "",
      icon: data.icon || "terminal",
      slug,
      category: data.category || "general",
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Get all slugs for static generation
 */
export function getAllCheatsheetSlugs(): string[] {
  const dataDirectory = path.join(process.cwd(), "data");

  try {
    const filenames = fs.readdirSync(dataDirectory);

    return filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => filename.replace(".mdx", ""));
  } catch {
    return [];
  }
}
