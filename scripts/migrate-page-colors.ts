
import { createScriptClient } from '../src/supabase/script-client';
import { revelJson } from '../src/lib/utils';

// Load environment variables directly
import { readFileSync } from 'fs';

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

interface PageColor {
  id: string;
  page_colors: string | any[]; // JSON string or array
  user_id?: string;
  created_at: string;
  updated_at: string;
  page_url?: string;
  page_title?: string;
}

interface ColorSet {
  hex: string;
  rgba?: number[];
  hsl?: string;
  hsv?: string;
  a?: number; // alpha is stored as 'a' not 'alpha'
  created_at?: string;
  updated_at?: string;
  info?: any;
}

async function migratePageColorsToColorSets() {
    console.log('Starting migration from page_colors to color_sets...');
    
    try {
        // Create Supabase client for scripts with service role to bypass RLS
        const supabase = createScriptClient(true);
        
        // Fetch all page_colors
        console.log('Fetching page_colors...');
        const { data: pageColors, error: fetchError } = await supabase
            .from('page_colors')
            .select('*');
        
        if (fetchError) {
            console.error('Error fetching page_colors:', fetchError);
            return;
        }
        
        console.log(`Found ${pageColors?.length || 0} page_colors records`);
        
        if (!pageColors || pageColors.length === 0) {
            console.log('No page_colors found to migrate');
            return;
        }
        
        // Transform page_colors data to color_sets format
        const colorSetsToInsert: ColorSet[] = [];
        let skippedCount = 0;
        let totalColorsProcessed = 0;
        
        for (const pageColor of pageColors) {
            try {
                // Parse the page_colors JSON data
                const colorsData = revelJson(pageColor.page_colors);
                
                if (!Array.isArray(colorsData) || colorsData.length === 0) {
                    console.log(`Skipping record ${pageColor.id} - no valid color data`);
                    skippedCount++;
                    continue;
                }
                
                // Create individual color_set entries for each color in the array
                for (const colorData of colorsData) {
                    try {
                        const colorSet: ColorSet = {
                            hex: colorData.hex || colorData.color || '#000000',
                            rgba: colorData.rgba,
                            hsl: colorData.hsl ? JSON.stringify(colorData.hsl) : undefined,
                            hsv: colorData.hsv,
                            a: colorData.alpha || colorData.a || 1,
                            created_at: pageColor.created_at,
                            updated_at: pageColor.updated_at,
                            info: colorData.info || null
                        };
                        
                        colorSetsToInsert.push(colorSet);
                        totalColorsProcessed++;
                        
                    } catch (colorError) {
                        console.error(`Error processing color in record ${pageColor.id}:`, colorError);
                    }
                }
                
            } catch (error) {
                console.error(`Error processing record ${pageColor.id}:`, error);
                skippedCount++;
            }
        }
        
        console.log(`Prepared ${colorSetsToInsert.length} individual color records for insertion`);
        console.log(`Processed ${totalColorsProcessed} colors from ${pageColors.length} page_colors records`);
        console.log(`Skipped ${skippedCount} page_colors records due to errors`);
        
        if (colorSetsToInsert.length === 0) {
            console.log('No valid color_sets to insert');
            return;
        }
        
        console.log('Inserting into color_sets table...');
        
        // Insert in batches to avoid overwhelming the database
        const batchSize = 50;
        let successfulInserts = 0;
        let errorCount = 0;
        
        for (let i = 0; i < colorSetsToInsert.length; i += batchSize) {
            const batch = colorSetsToInsert.slice(i, i + batchSize);
            
            const { data, error: insertError } = await supabase
                .from('color_sets')
                .insert(batch)
                .select();
            
            if (insertError) {
                console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, insertError);
                errorCount += batch.length;
            } else {
                successfulInserts += data?.length || 0;
                console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${data?.length || 0} records`);
            }
            
            // Add a small delay between batches
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        console.log(`\nMigration completed:`);
        console.log(`- Successfully inserted: ${successfulInserts} records`);
        console.log(`- Failed to insert: ${errorCount} records`);
        console.log(`- Skipped: ${skippedCount} records`);
        console.log(`- Total processed: ${pageColors.length} page_colors records`);
        
    } catch (error) {
        console.error('Unexpected error during migration:', error);
    }
}

// Run the migration if this script is executed directly
if (require.main === module) {
    migratePageColorsToColorSets()
        .then(() => {
            console.log('Migration process finished');
            process.exit(0);
        })
        .catch(error => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}

export { migratePageColorsToColorSets };
