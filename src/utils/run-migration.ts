

import { createClient } from '@supabase/supabase-js';

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SEVER_KEY!; // Note: typo in env variable name

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing Supabase URL or service key');
    return;
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    // Read the SQL migration file
    const migrationSQL = `
      -- Create theme_collections table for Color Stack application
      CREATE TABLE IF NOT EXISTS public.theme_collections (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          website_domain TEXT NOT NULL,
          primary_color TEXT NOT NULL,
          secondary_color TEXT,
          accent_color TEXT,
          popularity_score NUMERIC DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_theme_collections_popularity ON public.theme_collections(popularity_score DESC);
      CREATE INDEX IF NOT EXISTS idx_theme_collections_website ON public.theme_collections(website_domain);
      CREATE INDEX IF NOT EXISTS idx_theme_collections_primary_color ON public.theme_collections(primary_color);
      CREATE INDEX IF NOT EXISTS idx_theme_collections_secondary_color ON public.theme_collections(secondary_color);
      CREATE INDEX IF NOT EXISTS idx_theme_collections_accent_color ON public.theme_collections(accent_color);

      -- Insert some sample data
      INSERT INTO public.theme_collections (name, website_domain, primary_color, secondary_color, accent_color, popularity_score) VALUES
      ('GitHub Dark', 'github.com', '#0d1117', '#161b22', '#58a6ff', 95),
      ('GitHub Light', 'github.com', '#ffffff', '#f6f8fa', '#0366d6', 90),
      ('Twitter Dark', 'twitter.com', '#15202b', '#192734', '#1da1f2', 85),
      ('Twitter Light', 'twitter.com', '#ffffff', '#f7f9fa', '#1da1f2', 80),
      ('Netflix', 'netflix.com', '#141414', '#e50914', '#b9090b', 88),
      ('Spotify', 'spotify.com', '#121212', '#1db954', '#1ed760', 87),
      ('YouTube Dark', 'youtube.com', '#0f0f0f', '#272727', '#ff0000', 86),
      ('YouTube Light', 'youtube.com', '#ffffff', '#f9f9f9', '#ff0000', 82),
      ('Discord', 'discord.com', '#36393f', '#2f3136', '#5865f2', 89),
      ('Notion Dark', 'notion.com', '#2f3437', '#37352f', '#9b9a97', 84),
      ('Notion Light', 'notion.com', '#ffffff', '#f7f6f3', '#37352f', 83),
      ('Figma Dark', 'figma.com', '#2c2c2c', '#444444', '#0acf83', 81)
      ON CONFLICT DO NOTHING;

      -- Create a trigger to update the updated_at timestamp
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      CREATE OR REPLACE TRIGGER update_theme_collections_updated_at 
          BEFORE UPDATE ON public.theme_collections 
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `;

    // Execute the SQL using Supabase's RPC (Remote Procedure Call)
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });

    if (error) {
      console.error('Error running migration:', error);
    } else {
      console.log('Migration completed successfully:', data);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  runMigration();
}

export { runMigration };

