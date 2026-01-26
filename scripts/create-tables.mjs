import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔧 Creating database tables via Supabase SQL...\n');

const createTablesSQL = `
-- Create Post table
CREATE TABLE IF NOT EXISTS "Post" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "shortDesc" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "heroImage" TEXT NOT NULL,
  "duration" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Admin table
CREATE TABLE IF NOT EXISTS "Admin" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Post_createdAt_idx" ON "Post"("createdAt" DESC);
`;

try {
    const { data, error } = await supabase.rpc('exec_sql', { sql: createTablesSQL });

    if (error) {
        // Try alternative method - direct SQL execution
        console.log('⚠️  RPC method not available, trying direct SQL...\n');

        // Execute each statement separately
        const statements = [
            `CREATE TABLE IF NOT EXISTS "Post" (
        "id" SERIAL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "shortDesc" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "heroImage" TEXT NOT NULL,
        "duration" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
            `CREATE TABLE IF NOT EXISTS "Admin" (
        "id" SERIAL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL
      )`,
            `CREATE INDEX IF NOT EXISTS "Post_createdAt_idx" ON "Post"("createdAt" DESC)`
        ];

        console.log('📝 Please run these SQL statements manually in Supabase SQL Editor:\n');
        console.log('1. Go to: https://supabase.com/dashboard/project/amudiavyphslqydqupmv/editor');
        console.log('2. Click "New Query"');
        console.log('3. Copy and paste this SQL:\n');
        console.log('```sql');
        console.log(createTablesSQL);
        console.log('```\n');
        console.log('4. Click "Run" or press Ctrl+Enter\n');

        console.log('✅ After running the SQL, your database will be ready!');
    } else {
        console.log('✅ Tables created successfully!');
    }

    // Verify tables exist
    console.log('\n🔍 Checking if tables exist...');
    const { data: posts, error: postError } = await supabase.from('Post').select('*').limit(1);

    if (!postError) {
        console.log('✅ Post table exists!');
    } else {
        console.log('⚠️  Post table check:', postError.message);
    }

} catch (err) {
    console.error('❌ Error:', err.message);
}
