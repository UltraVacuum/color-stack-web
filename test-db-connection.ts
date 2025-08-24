
import { createClient } from '@supabase/supabase-js';

async function testConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SEVER_KEY!;

  console.log('Testing connection to:', supabaseUrl);
  
  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    // Test connection by querying a system table
    const { data, error } = await supabase.from('pg_tables').select('*').limit(1);
    
    if (error) {
      console.error('Connection error:', error);
    } else {
      console.log('Connection successful! Available tables:', data);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testConnection();
