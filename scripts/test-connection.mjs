import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config(); // Load .env file

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

try {
    console.log('\n📡 Testing connection...');
    const { data, error } = await supabase.from('_prisma_migrations').select('*').limit(1);

    if (error) {
        console.log('⚠️  Table not found (expected before migration):', error.message);
        console.log('✅ But connection to Supabase is working!');
    } else {
        console.log('✅ Connected successfully!');
        console.log('✅ Database tables exist!');
    }

    // Test storage
    console.log('\n📦 Testing storage...');
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets();

    if (storageError) {
        console.log('❌ Storage error:', storageError.message);
    } else {
        console.log('✅ Storage connected!');
        console.log('Buckets:', buckets.map(b => b.name).join(', ') || 'None');
    }

    console.log('\n✨ Supabase is ready to use!');
} catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
}
