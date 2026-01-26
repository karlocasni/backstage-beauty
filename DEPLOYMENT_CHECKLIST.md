# 🚀 Deployment Checklist - Backstage Beauty

## ✅ Completed Steps

1. **Environment Configuration**
   - ✅ Supabase credentials added to `.env`
   - ✅ Database connection strings configured
   - ✅ API keys set up (Anon + Service Role)

2. **Code Migration**
   - ✅ Prisma schema updated to PostgreSQL
   - ✅ Image upload refactored to use Supabase Storage
   - ✅ Supabase client initialized

## 📋 Next Steps (Run These Commands)

### Step 1: Database Migration
Run this command to create tables in Supabase:
```bash
npx prisma migrate dev --name init_supabase
```

### Step 2: Setup Storage Bucket
Run this command to create the images bucket:
```bash
node scripts/setup-storage.mjs
```

### Step 3: Test Locally
Start your dev server to verify everything works:
```bash
npm run dev
```
- Visit http://localhost:3000
- Try creating a post with an image
- Verify images upload to Supabase

### Step 4: Push to GitHub
```bash
git add .
git commit -m "Migrate to Supabase for production deployment"
git push origin main
```

### Step 5: Deploy to Vercel

#### Option A: Connect via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add these environment variables:
   ```
   DATABASE_URL=postgresql://postgres.amudiavyphslqydqupmv:2804Karlo!*@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   DIRECT_URL=postgresql://postgres.amudiavyphslqydqupmv:2804Karlo!*@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
   NEXT_PUBLIC_SUPABASE_URL=https://amudiavyphslqydqupmv.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdWRpYXZ5cGhzbHF5ZHF1cG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMzE2NTIsImV4cCI6MjA4NDkwNzY1Mn0.gfHa5vttL0P9EG4WTI_CWlaLd7mzwjtyMHaauVxCPm4
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdWRpYXZ5cGhzbHF5ZHF1cG12Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTMzMTY1MiwiZXhwIjoyMDg0OTA3NjUyfQ.JeFu0fKXjlEoklAGO9qjUyD9zQMt5q32QEPyViH2JXA
   JWT_SECRET=supersecret-change-this-to-random
   ```
4. Click "Deploy"

#### Option B: Use Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Step 6: Configure Custom Domain (Optional)
1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 🔍 Verification Checklist

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] Blog posts display properly
- [ ] Images are loading from Supabase
- [ ] Admin panel login works
- [ ] Can create new posts with images
- [ ] Social media links work

## 🐛 Troubleshooting

### Images not showing?
- Check Supabase Storage → images bucket is public
- Verify NEXT_PUBLIC_SUPABASE_URL is correct

### Database connection error?
- Verify password in DATABASE_URL is correct
- Check Supabase project is active

### Build fails on Vercel?
- Check all environment variables are set
- Review build logs for specific errors

## 📞 Support Resources

- Supabase Dashboard: https://supabase.com/dashboard/project/amudiavyphslqydqupmv
- Vercel Dashboard: https://vercel.com/dashboard
- Next.js Docs: https://nextjs.org/docs
