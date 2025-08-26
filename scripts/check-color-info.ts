
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

async function checkColorInfo() {
    console.log('Checking color_info table structure...');
    
    try {
        const supabase = createScriptClient(true);
        
        // Get sample data from color_info
        const { data: colorInfo, error } = await supabase
            .from('color_info')
            .select('*')
            .limit(5);
            
        if (error) {
            console.error('Error fetching color_info:', error);
            return;
        }
        
        console.log('Color info sample:', colorInfo);
        
        // Check if there are any color_info records with hex values that match color_sets
        if (colorInfo && colorInfo.length > 0) {
            const sampleHex = colorInfo[0].hex;
            console.log(`Checking for color_sets with hex: ${sampleHex}`);
            
            const { data: matchingColorSets, error: matchError } = await supabase
                .from('color_sets')
                .select('*')
                .eq('hex', sampleHex)
                .limit(5);
                
            if (matchError) {
                console.error('Error fetching matching color_sets:', matchError);
            } else {
                console.log(`Matching color_sets for ${sampleHex}:`, matchingColorSets);
            }
        }
        
    } catch (err) {
        console.error('Error:', err);
    }
}

checkColorInfo();
