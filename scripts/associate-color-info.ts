

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

async function associateColorInfo() {
    console.log('Associating color_info with color_sets...');
    
    try {
        const supabase = createScriptClient(true);
        
        // Get all color_info records
        const { data: allColorInfo, error: colorInfoError } = await supabase
            .from('color_info')
            .select('*');
            
        if (colorInfoError) {
            console.error('Error fetching color_info:', colorInfoError);
            return;
        }
        
        console.log(`Found ${allColorInfo?.length || 0} color_info records`);
        
        if (!allColorInfo || allColorInfo.length === 0) {
            console.log('No color_info records found');
            return;
        }
        
        let updatedCount = 0;
        let matchedCount = 0;
        
        // For each color_info record, find matching color_sets and update them
        for (const colorInfo of allColorInfo) {
            // Find color_sets with matching hex
            const { data: matchingColorSets, error: matchError } = await supabase
                .from('color_sets')
                .select('id, hex, info')
                .eq('hex', colorInfo.hex.toLowerCase()) // Ensure case matching
                .limit(100);
                
            if (matchError) {
                console.error(`Error fetching color_sets for ${colorInfo.hex}:`, matchError);
                continue;
            }
            
            if (matchingColorSets && matchingColorSets.length > 0) {
                matchedCount += matchingColorSets.length;
                console.log(`Found ${matchingColorSets.length} color_sets matching ${colorInfo.hex}`);
                
                // Update each matching color_set with the color_info
                for (const colorSet of matchingColorSets) {
                    const updatedInfo = {
                        ...(colorSet.info || {}),
                        name: colorInfo.name,
                        color_info_id: colorInfo.id
                    };
                    
                    const { error: updateError } = await supabase
                        .from('color_sets')
                        .update({ 
                            info: updatedInfo,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', colorSet.id);
                        
                    if (updateError) {
                        console.error(`Error updating color_set ${colorSet.id}:`, updateError);
                    } else {
                        updatedCount++;
                        if (updatedCount % 50 === 0) {
                            console.log(`Updated ${updatedCount} color_sets so far...`);
                        }
                    }
                }
            }
        }
        
        console.log(`\nAssociation completed:`);
        console.log(`- Total color_info records: ${allColorInfo.length}`);
        console.log(`- Matched color_sets: ${matchedCount}`);
        console.log(`- Updated color_sets: ${updatedCount}`);
        
    } catch (err) {
        console.error('Error:', err);
    }
}

associateColorInfo();

