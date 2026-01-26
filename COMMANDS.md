# 🎯 Quick Start Commands

## Initial Setup (Run Once)

```bash
# 1. Setup database tables
npx prisma migrate dev --name init_supabase

# 2. Setup storage bucket
node scripts/setup-storage.mjs

# 3. Verify everything is configured
node scripts/verify-setup.mjs
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/backstage-beauty.git
git branch -M main
git push -u origin main

# Deploy to Vercel (after setting up on vercel.com)
# Vercel auto-deploys on every push to main
```

## Database Management

```bash
# View database in browser
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Generate Prisma client after schema changes
npx prisma generate
```

## Troubleshooting

```bash
# Clear Next.js cache
npm run dev
# (The dev script automatically clears .next folder)

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## Environment Variables Needed

For Vercel deployment, add these in Settings → Environment Variables:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

## Useful Links

- **Local Dev**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Supabase Dashboard**: https://supabase.com/dashboard/project/amudiavyphslqydqupmv
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Prisma Studio**: http://localhost:5555 (when running `npx prisma studio`)
