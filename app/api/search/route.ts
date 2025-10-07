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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const dataDirectory = path.join(process.cwd(), "data");
    const filenames = fs.readdirSync(dataDirectory);
    const results: SearchResult[] = [];

    for (const filename of filenames) {
      if (!filename.endsWith(".mdx")) continue;

      const filePath = path.join(dataDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const slug = filename.replace(".mdx", "");
      const lines = content.split("\n");
      const matchedLines: string[] = [];

      // Search in title
      if (data.title?.toLowerCase().includes(query)) {
        results.push({
          title: data.title,
          slug,
          icon: data.icon || "terminal",
          excerpt: data.description || "",
          matchedLine: data.description || data.title,
        });
        continue;
      }

      // Search in content
      for (const line of lines) {
        const cleanLine = line.replace(/[#*`]/g, "").trim();

        if (cleanLine.toLowerCase().includes(query) && cleanLine.length > 0) {
          matchedLines.push(cleanLine);
          if (matchedLines.length >= 1) break;
        }
      }

      if (matchedLines.length > 0) {
        results.push({
          title: data.title,
          slug,
          icon: data.icon || "terminal",
          excerpt: data.description || "",
          matchedLine:
            matchedLines[0].substring(0, 150) +
            (matchedLines[0].length > 150 ? "..." : ""),
        });
      }
    }

    // Sort results by relevance (title matches first)
    results.sort((a, b) => {
      const aInTitle = a.title.toLowerCase().includes(query) ? 1 : 0;
      const bInTitle = b.title.toLowerCase().includes(query) ? 1 : 0;

      return bInTitle - aInTitle;
    });

    return NextResponse.json(results.slice(0, 10)); // Return top 10 results
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
