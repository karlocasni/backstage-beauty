import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Note: Using Service Role Key is recommended for server-side admin operations 
// to bypass Row Level Security (RLS) policies if you are not using Supabase Auth.
export const supabase = createClient(supabaseUrl, supabaseKey);
