


import { createScriptClient } from '../src/supabase/script-client';
import { readFileSync } from 'fs';

// Load environment variables
const envContent = readFileSync('.env.local', 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    // Remove quotes from values if present
    let cleanedValue = value.trim();
    if (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) {
      cleanedValue = cleanedValue.slice(1, -1);
    }
    process.env[key.trim()] = cleanedValue;
  }
  return acc;
}, {});

console.log('Environment variables loaded');

async function checkMatches() {
    console.log('Checking for matches between color_info and color_sets...');
    
    try {
        const supabase = createScriptClient(true);
        
        // Get a sample of color_info records to check for matches
        const { data: colorInfoSample, error: sampleError } = await supabase
            .from('color_info')
            .select('hex')
            .limit(20);
            
        if (sampleError) {
            console.error('Error fetching color_info sample:', sampleError);
            return;
        }
        
        console.log('Checking sample of color_info hex values:');
        
        let totalMatches = 0;
        
        for (const info of colorInfoSample || []) {
            const { data: matches, error: matchError } = await supabase
                .from('color_sets')
                .select('id, hex')
                .eq('hex', info.hex.toLowerCase())
                .limit(5);
                
            if (matchError) {
                console.error(`Error checking ${info.hex}:`, matchError);
                continue;
            }
            
            console.log(`- ${info.hex}: ${matches?.length || 0} matches`);
            totalMatches += matches?.length || 0;
        }
        
        console.log(`\nTotal matches found in sample: ${totalMatches}`);
        
        // Check if there are any matches at all
        if (totalMatches === 0) {
            console.log('\nNo matches found. Checking if color_sets have different hex format...');
            
            // Get a sample of color_sets to see their hex format
            const { data: colorSetsSample, error: setsError } = await supabase
                .from('color_sets')
                .select('hex')
                .limit(10);
                
            if (setsError) {
                console.error('Error fetching color_sets sample:', setsError);
            } else {
                console.log('Color_sets hex format sample:', colorSetsSample);
            }
        }
        
    } catch (err) {
        console.error('Error:', err);
    }
}

checkMatches();


