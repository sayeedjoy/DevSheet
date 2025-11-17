import fs from "fs";
import path from "path";

import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";

interface SearchResult {
  title: string;
  slug: string;
  icon: string;
  excerpt: string;
  matchedLine: string;
}

interface SearchResultWithRelevance extends SearchResult {
  relevance: number;
}

// Cache file contents in memory for better performance
let fileCache: Map<string, { data: any; content: string; mtime: number }> = new Map();

function getCachedFile(filePath: string) {
  const stats = fs.statSync(filePath);
  const cached = fileCache.get(filePath);

  // Return cached version if file hasn't changed
  if (cached && cached.mtime === stats.mtimeMs) {
    return cached;
  }

  // Read and cache file
  const fileContents = fs.readFileSync(filePath, "utf8");
  const parsed = matter(fileContents);
  const result = {
    data: parsed.data,
    content: parsed.content,
    mtime: stats.mtimeMs,
  };

  fileCache.set(filePath, result);
  return result;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase().trim() || "";

  if (!query || query.length < 2) {
    return NextResponse.json([], {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }

  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const filenames = fs.readdirSync(dataDirectory);
    const results: SearchResultWithRelevance[] = [];

    // Process files in parallel for better performance
    const filePromises = filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => {
        const filePath = path.join(dataDirectory, filename);
        const { data, content } = getCachedFile(filePath);
        const slug = filename.replace(".mdx", "");

        // Search in title first (most relevant)
        if (data.title?.toLowerCase().includes(query)) {
          return {
            title: data.title,
            slug,
            icon: data.icon || "terminal",
            excerpt: data.description || "",
            matchedLine: data.description || data.title,
            relevance: 2, // Title match = higher relevance
          } as SearchResultWithRelevance;
        }

        // Search in content
        const lines = content.split("\n");
        for (const line of lines) {
          const cleanLine = line.replace(/[#*`]/g, "").trim();
          if (cleanLine.toLowerCase().includes(query) && cleanLine.length > 0) {
            return {
              title: data.title,
              slug,
              icon: data.icon || "terminal",
              excerpt: data.description || "",
              matchedLine:
                cleanLine.substring(0, 150) + (cleanLine.length > 150 ? "..." : ""),
              relevance: 1, // Content match = lower relevance
            } as SearchResultWithRelevance;
          }
        }

        return null;
      });

    const fileResults = await Promise.all(filePromises);
    results.push(...fileResults.filter((r): r is SearchResultWithRelevance => r !== null));

    // Sort by relevance (title matches first), then alphabetically
    results.sort((a, b) => {
      if (a.relevance !== b.relevance) {
        return b.relevance - a.relevance;
      }
      return a.title.localeCompare(b.title);
    });

    // Remove relevance property before returning
    const finalResults: SearchResult[] = results.slice(0, 10).map(({ relevance, ...rest }) => rest);

    return NextResponse.json(finalResults, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json([], {
      status: 500,
      headers: {
        "Cache-Control": "public, s-maxage=60",
      },
    });
  }
}
