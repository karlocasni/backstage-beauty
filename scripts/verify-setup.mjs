import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySetup() {
    console.log('🔍 Verifying Backstage Beauty Setup...\n');

    let allGood = true;

    // Check environment variables
    console.log('1️⃣ Checking Environment Variables...');
    const requiredEnvVars = [
        'DATABASE_URL',
        'DIRECT_URL',
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'SUPABASE_SERVICE_ROLE_KEY'
    ];

    for (const envVar of requiredEnvVars) {
        if (process.env[envVar]) {
            console.log(`   ✅ ${envVar} is set`);
        } else {
            console.log(`   ❌ ${envVar} is MISSING`);
            allGood = false;
        }
    }

    // Check Supabase connection
    console.log('\n2️⃣ Testing Supabase Connection...');
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            console.log(`   ❌ Supabase connection failed: ${error.message}`);
            allGood = false;
        } else {
            console.log(`   ✅ Supabase connected successfully`);

            const imagesBucket = buckets.find(b => b.name === 'images');
            if (imagesBucket) {
                console.log(`   ✅ Images bucket exists (Public: ${imagesBucket.public})`);
                if (!imagesBucket.public) {
                    console.log(`   ⚠️  WARNING: Images bucket should be public!`);
                }
            } else {
                console.log(`   ❌ Images bucket NOT found - run: node scripts/setup-storage.mjs`);
                allGood = false;
            }
        }
    } catch (error) {
        console.log(`   ❌ Supabase error: ${error}`);
        allGood = false;
    }

    // Check database connection
    console.log('\n3️⃣ Testing Database Connection...');
    try {
        await prisma.$connect();
        console.log(`   ✅ Database connected successfully`);

        // Check if tables exist
        const postCount = await prisma.post.count();
        console.log(`   ✅ Post table exists (${postCount} posts)`);

    } catch (error) {
        console.log(`   ❌ Database error: ${error}`);
        console.log(`   💡 Run: npx prisma migrate dev --name init_supabase`);
        allGood = false;
    } finally {
        await prisma.$disconnect();
    }

    // Final summary
    console.log('\n' + '='.repeat(50));
    if (allGood) {
        console.log('✅ ALL CHECKS PASSED! You\'re ready to deploy! 🚀');
        console.log('\nNext steps:');
        console.log('1. Test locally: npm run dev');
        console.log('2. Push to GitHub: git push');
        console.log('3. Deploy to Vercel');
    } else {
        console.log('❌ Some checks failed. Please fix the issues above.');
    }
    console.log('='.repeat(50) + '\n');
}

verifySetup();
