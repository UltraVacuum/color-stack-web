

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
  },
  {
    id: "4",
    name: "Twitter Light",
    website_domain: "twitter.com",
    primary_color: "#ffffff",
    secondary_color: "#f7f9fa",
    accent_color: "#1da1f2",
    popularity_score: 80
  },
  {
    id: "5",
    name: "Netflix",
    website_domain: "netflix.com",
    primary_color: "#141414",
    secondary_color: "#e50914",
    accent_color: "#b9090b",
    popularity_score: 88
  },
  {
    id: "6",
    name: "Spotify",
    website_domain: "spotify.com",
    primary_color: "#121212",
    secondary_color: "#1db954",
    accent_color: "#1ed760",
    popularity_score: 87
  },
  {
    id: "7",
    name: "YouTube Dark",
    website_domain: "youtube.com",
    primary_color: "#0f0f0f",
    secondary_color: "#272727",
    accent_color: "#ff0000",
    popularity_score: 86
  },
  {
    id: "8",
    name: "YouTube Light",
    website_domain: "youtube.com",
    primary_color: "#ffffff",
    secondary_color: "#f9f9f9",
    accent_color: "#ff0000",
    popularity_score: 82
  },
  {
    id: "9",
    name: "Discord",
    website_domain: "discord.com",
    primary_color: "#36393f",
    secondary_color: "#2f3136",
    accent_color: "#5865f2",
    popularity_score: 89
  },
  {
    id: "10",
    name: "Notion Dark",
    website_domain: "notion.com",
    primary_color: "#2f3437",
    secondary_color: "#37352f",
    accent_color: "#9b9a97",
    popularity_score: 84
  },
  {
    id: "11",
    name: "Notion Light",
    website_domain: "notion.com",
    primary_color: "#ffffff",
    secondary_color: "#f7f6f3",
    accent_color: "#37352f",
    popularity_score: 83
  },
  {
    id: "12",
    name: "Figma Dark",
    website_domain: "figma.com",
    primary_color: "#2c2c2c",
    secondary_color: "#444444",
    accent_color: "#0acf83",
    popularity_score: 81
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const website = searchParams.get('website');
  
  if (!website) {
    return Response.json({ error: 'Website parameter is required' }, { status: 400 });
  }

  // Use mock data for now while database is being set up
  const filteredThemes = mockThemes.filter(theme => 
    theme.website_domain.toLowerCase().includes(website.toLowerCase())
  ).sort((a, b) => b.popularity_score - a.popularity_score);

  return Response.json({ themes: filteredThemes.slice(0, 50) });
  
  /* Database code (commented out for now)
  const supabase = createClient();
  
  try {
    // Search for themes by website domain
    const { data, error } = await supabase
      .from('theme_collections')
      .select('*')
      .ilike('website_domain', `%${website}%`)
      .order('popularity_score', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error searching colors by website:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ themes: data || [] });
  } catch (error) {
    console.error('Unexpected error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
  */
}

