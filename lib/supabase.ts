import { createClient } from '@supabase/supabase-js';

const sanitizeEnv = (key: string) => {
    const value = process.env[key];
    if (value && (value.startsWith('"') || value.startsWith("'"))) {
        return value.slice(1, -1);
    }
    return value;
};

const supabaseUrl = sanitizeEnv("NEXT_PUBLIC_SUPABASE_URL")!;
const supabaseKey = sanitizeEnv("SUPABASE_SERVICE_ROLE_KEY") || sanitizeEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")!;

// Note: Using Service Role Key is recommended for server-side admin operations 
// to bypass Row Level Security (RLS) policies if you are not using Supabase Auth.
export const supabase = createClient(supabaseUrl, supabaseKey);
