import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
    console.log('🔧 Setting up Supabase Storage...');

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error('❌ Error listing buckets:', listError);
        return;
    }

    const imagesBucket = buckets.find(b => b.name === 'images');

    if (imagesBucket) {
        console.log('✅ Images bucket already exists!');
    } else {
        console.log('📦 Creating images bucket...');

        const { data, error } = await supabase.storage.createBucket('images', {
            public: true,
            fileSizeLimit: 5242880, // 5MB
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
        });

        if (error) {
            console.error('❌ Error creating bucket:', error);
        } else {
            console.log('✅ Images bucket created successfully!');
        }
    }

    console.log('✨ Storage setup complete!');
}

setupStorage();
