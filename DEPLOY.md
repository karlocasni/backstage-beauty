# Backstage Beauty - Complete Deployment Guide

## 🎯 Current Status

✅ **Environment configured** - All Supabase credentials are set
✅ **Code migrated** - Ready for PostgreSQL and Supabase Storage
✅ **Scripts created** - Storage setup script ready

## 🚀 Step-by-Step Deployment

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit - Backstage Beauty with Supabase"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `backstage-beauty`
3. Make it **Public** (required for custom domain on free plan)
4. **DO NOT** initialize with README (we already have code)
5. Click "Create repository"

### Step 3: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/backstage-beauty.git
git branch -M main
git push -u origin main
```

### Step 4: Setup Supabase Database

Run this command to create all database tables:

```bash
npx prisma migrate dev --name init_supabase
```

Expected output: "Your database is now in sync with your schema."

### Step 5: Setup Supabase Storage

Run this command to create the images bucket:

```bash
node scripts/setup-storage.mjs
```

Expected output: "✅ Images bucket created successfully!"

### Step 6: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and verify:
- Homepage loads
- Blog posts display
- Admin panel accessible at /admin

### Step 7: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `backstage-beauty` repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: `.next`

5. **Add Environment Variables** (click "Environment Variables"):
   
   Copy and paste each of these:

   ```
   DATABASE_URL
   ```
   Value:
   ```
   postgresql://postgres.amudiavyphslqydqupmv:2804Karlo!*@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

   ```
   DIRECT_URL
   ```
   Value:
   ```
   postgresql://postgres.amudiavyphslqydqupmv:2804Karlo!*@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```
   Value:
   ```
   https://amudiavyphslqydqupmv.supabase.co
   ```

   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
   Value:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdWRpYXZ5cGhzbHF5ZHF1cG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMzE2NTIsImV4cCI6MjA4NDkwNzY1Mn0.gfHa5vttL0P9EG4WTI_CWlaLd7mzwjtyMHaauVxCPm4
   ```

   ```
   SUPABASE_SERVICE_ROLE_KEY
   ```
   Value:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdWRpYXZ5cGhzbHF5ZHF1cG12Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTMzMTY1MiwiZXhwIjoyMDg0OTA3NjUyfQ.JeFu0fKXjlEoklAGO9qjUyD9zQMt5q32QEPyViH2JXA
   ```

   ```
   JWT_SECRET
   ```
   Value:
   ```
   supersecret-change-this-to-random-string
   ```

6. Click **"Deploy"**

7. Wait for deployment (2-3 minutes)

#### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Follow the prompts and add environment variables when asked.

### Step 8: Configure Custom Domain (Optional)

If you have a custom domain:

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `backstagebeauty.com`)
3. Update your domain's DNS records:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   
   OR
   
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

4. Wait for DNS propagation (5-30 minutes)

## ✅ Post-Deployment Verification

Visit your deployed site and check:

- [ ] Homepage loads correctly
- [ ] Blog posts are visible
- [ ] Images load from Supabase
- [ ] Navigation works
- [ ] Admin login works (`/admin`)
- [ ] Can create new posts with images
- [ ] Social media links work

## 🔧 Updating Your Site

After deployment, to make changes:

```bash
# Make your changes in code
git add .
git commit -m "Description of changes"
git push

# Vercel will automatically redeploy!
```

## 📊 Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard/project/amudiavyphslqydqupmv
- **Analytics**: Vercel provides free analytics

## 🐛 Common Issues

### Build fails with "DATABASE_URL not found"
- Make sure all environment variables are added in Vercel
- Redeploy after adding variables

### Images not uploading
- Check Supabase Storage → images bucket exists
- Verify bucket is set to "Public"
- Check SUPABASE_SERVICE_ROLE_KEY is correct

### Database connection timeout
- Verify password in DATABASE_URL is correct
- Check Supabase project is not paused

### Admin login not working
- Ensure JWT_SECRET is set in Vercel
- Check if Admin table exists in database

## 🎉 You're Done!

Your Backstage Beauty podcast site is now live on the internet! 🚀

**Next Steps:**
- Share your site URL
- Add more episodes
- Monitor analytics
- Consider adding SEO optimization
