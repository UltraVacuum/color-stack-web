


import { NextRequest } from "next/server";

// Mock data for testing
const mockThemes = [
  {
    id: "1",
    name: "GitHub Dark",
    website_domain: "github.com",
    primary_color: "#0d1117",
    secondary_color: "#161b22",
    accent_color: "#58a6ff",
    popularity_score: 95
  },
  {
    id: "2", 
    name: "GitHub Light",
    website_domain: "github.com",
    primary_color: "#ffffff",
    secondary_color: "#f6f8fa",
    accent_color: "#0366d6",
    popularity_score: 90
  },
  {
    id: "3",
    name: "Twitter Dark",
    website_domain: "twitter.com",
    primary_color: "#15202b",
    secondary_color: "#192734",
    accent_color: "#1da1f2",
    popularity_score: 85
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 12;

  // Return mock data for testing
  return Response.json(mockThemes.slice(0, limit));
}


