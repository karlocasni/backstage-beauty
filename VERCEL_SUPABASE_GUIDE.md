# Moving to Vercel + Supabase (The "Cloud" Setup)

Great choice! This setup is professional, scalable, and fully free for your current needs.
I have migrated your code to support **Supabase (PostgreSQL)** and **Supabase Storage**.

## 🔴 ACTION REQUIRED: You must follow these steps to turn it on.

### Step 1: Create a Supabase Project
1.  Go to [database.new](https://database.new) (redirects to Supabase) and sign up/in.
2.  Create a new project (Name: `backstage-beauty`, Region: Close to you, e.g., Frankfurt/London).
3.  Set a strong database password (save it!).
4.  Wait for the project to provision (~1 min).

### Step 2: Get Your API Credentials
1.  In your Supabase Dashboard, go to **Project Settings** (gear icon) -> **API**.
2.  Copy these values:
    *   `Project URL` (e.g., https://xyz.supabase.co) -> This is your `NEXT_PUBLIC_SUPABASE_URL`
    *   `anon` public key -> This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   `service_role` secret key (Reveal it) -> `SUPABASE_SERVICE_ROLE_KEY`
3.  Go to **Project Settings** -> **Database**.
4.  Under "Connection String", make sure "Mode" is **Transaction** (port 6543) -> Copy it. This is `DATABASE_URL`.
5.  Change "Mode" to **Session** (port 5432) -> Copy it. This is `DIRECT_URL`.

### Step 3: Setup Storage (Images)
1.  In Supabase Dashboard, click on **Storage** (folder icon) in the left sidebar.
2.  Click **"New Bucket"**.
3.  Name it: `images` (Exact name is important!).
4.  Toggle **"Public bucket"** to **ON**.
5.  Click "Save".
6.  (Optional but recommended) Go to **Policies** for the `images` bucket and ensure "Enable Read Access for all" is ON (it should be by default for public buckets).

### Step 4: Configure Environment Variables
You need to update your local keys to run the app, and also add them to Vercel.

**1. Update Local `.env` file:**
Open your `.env` file in VS Code and REPLACE its content with:
```env
# Database (Prisma)
DATABASE_URL="<PASTE_YOUR_TRANSACTION_URL_HERE>"
DIRECT_URL="<PASTE_YOUR_SESSION_URL_HERE>"

# Supabase (Storage)
NEXT_PUBLIC_SUPABASE_URL="<PASTE_YOUR_PROJECT_URL>"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<PASTE_YOUR_ANON_KEY>"
SUPABASE_SERVICE_ROLE_KEY="<PASTE_YOUR_SERVICE_ROLE_KEY>"

# Admin Auth (Keep your current one or generate new)
JWT_SECRET="supersecret-change-this-to-random"
```

**2. Push Database Schema:**
Once `.env` is saved with real keys, run this in your terminal to create the tables in Supabase:
```bash
npx prisma migrate dev --name init_supabase
```

### Step 5: Push to GitHub & Deploy to Vercel
1.  Push your code changes to GitHub:
    ```bash
    git add .
    git commit -m "Migrate to Supabase"
    git push
    ```
2.  Go to Vercel Dashboard -> Projects -> `backstage-beauty`.
3.  Go to **Settings** -> **Environment Variables**.
4.  Add ALL 5 variables from your `.env` file (`DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, etc.) into Vercel.
5.  Go to **Deployments** tab and "Redeploy" your latest commit.

### Troubleshooting
*   **Images not showing?** Check if you named the bucket `images` and made it **Public**.
*   **Database error?** Ensure you pasted the `DIRECT_URL` (port 5432) correctly.

**Done!** Your app is now running in the cloud.
