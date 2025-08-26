
import { createClient } from '@supabase/supabase-js';

async function exploreDatabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SEVER_KEY!;

  console.log('Connecting to Supabase database...');
  
  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    // First, let's check what tables exist
    console.log('Checking available tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');

    if (tablesError) {
      console.error('Error fetching tables:', tablesError);
      return;
    }

    console.log('Available tables:', tables?.map(t => t.tablename));

    // Check if pages table exists and examine its structure
    if (tables?.some(t => t.tablename === 'pages')) {
      console.log('\nExamining pages table structure...');
      const { data: pages, error: pagesError } = await supabase
        .from('pages')
        .select('*')
        .limit(5);

      if (pagesError) {
        console.error('Error fetching pages:', pagesError);
      } else {
        console.log('Sample pages data:', pages);
        
        // Check if page_colors exists and its format
        if (pages && pages.length > 0 && pages[0].page_colors) {
          console.log('\nPage colors format:', typeof pages[0].page_colors);
          console.log('Page colors sample:', pages[0].page_colors);
        }
      }
    }

    // Check if color_sets table already exists
    if (tables?.some(t => t.tablename === 'color_sets')) {
      console.log('\ncolor_sets table already exists. Checking structure...');
      const { data: colorSets, error: colorSetsError } = await supabase
        .from('color_sets')
        .select('*')
        .limit(5);

      if (colorSetsError) {
        console.error('Error fetching color_sets:', colorSetsError);
      } else {
        console.log('Existing color_sets data:', colorSets);
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the exploration if this script is executed directly
if (require.main === module) {
  exploreDatabase();
}

export { exploreDatabase };
