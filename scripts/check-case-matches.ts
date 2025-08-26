


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

async function checkCaseMatches() {
    console.log('Checking for matches with case normalization...');
    
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
        
        console.log('Checking sample of color_info hex values (normalized to lowercase):');
        
        let totalMatches = 0;
        
        for (const info of colorInfoSample || []) {
            const normalizedHex = info.hex.toLowerCase();
            const { data: matches, error: matchError } = await supabase
                .from('color_sets')
                .select('id, hex')
                .eq('hex', normalizedHex)
                .limit(5);
                
            if (matchError) {
                console.error(`Error checking ${normalizedHex}:`, matchError);
                continue;
            }
            
            console.log(`- ${info.hex} -> ${normalizedHex}: ${matches?.length || 0} matches`);
            totalMatches += matches?.length || 0;
        }
        
        console.log(`\nTotal matches found in sample: ${totalMatches}`);
        
    } catch (err) {
        console.error('Error:', err);
    }
}

checkCaseMatches();


