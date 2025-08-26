
import { createScriptClient } from '../src/supabase/script-client';

// Load environment variables directly
import { readFileSync } from 'fs';

const envContent = readFileSync('.env.local', 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    process.env[key.trim()] = value.trim();
  }
  return acc;
}, {});

console.log('Testing Supabase connection...');
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key present:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testConnection() {
  try {
    const supabase = createScriptClient();
    
    // Test a simple query
    const { data, error } = await supabase
      .from('page_colors')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Connection error:', error);
    } else {
      console.log('Connection successful! Data:', data);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testConnection();
