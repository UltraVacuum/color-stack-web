
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client for scripts (without Next.js cookies)
export const createScriptClient = (serviceRole = false) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = serviceRole 
        ? process.env.SUPABASE_SEVER_KEY! // Note: typo in env var name, should be SERVER
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    return createClient(supabaseUrl, supabaseKey);
};

// Don't create client at import time - create it when needed
