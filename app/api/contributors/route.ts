import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 3600; // Cache for 1 hour

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export async function GET() {
  try {
    // Extract owner and repo from the GitHub URL
    // You should update this with your actual repository
    const repoUrl = "https://github.com/sayeedjoy/GymBro"; // UPDATE THIS
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);

    if (!match) {
      return NextResponse.json(
        { error: "Invalid GitHub repository URL" },
        { status: 400 },
      );
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(".git", "");

    // Fetch contributors from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}/contributors?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "DevSheet-App",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch contributors" },
        { status: response.status },
      );
    }

    const contributors: Contributor[] = await response.json();

    // Filter out bots and return
    const filteredContributors = contributors.filter(
      (contributor) => contributor.type !== "Bot",
    );

    return NextResponse.json(filteredContributors, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
