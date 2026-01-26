# Deployment Guide for Backstage Beauty

This guide covers how to push your code to GitHub and how to deploy your Next.js application (likely to Vercel, the creators of Next.js, as it's the easiest way) and connect your custom domain.

## 1. Push to GitHub

Since you have your project locally, you need to initialize a git repository and push it to GitHub.

1.  **Create a Repository on GitHub:**
    *   Go to [GitHub.com](https://github.com) and sign in.
    *   Click the "+" icon in the top right and select "New repository".
    *   Name it `backstage-beauty` (or whatever you prefer).
    *   Make it **Private** (recommended for unfinished projects) or Public.
    *   Click "Create repository".

2.  **Push your local code:**
    Open your terminal (VS Code terminal is fine) and run the following commands in your project folder (`f:\APPS\backstage-beauty`):

    ```bash
    # Initialize git if you haven't already
    git init

    # Add all files to staging
    git add .

    # Commit your changes
    git commit -m "Initial commit"

    # Link your local repo to the remote GitHub repo
    # REPLACE <YOUR_USERNAME> with your actual GitHub username
    git remote add origin https://github.com/<YOUR_USERNAME>/backstage-beauty.git

    # Push to GitHub
    git branch -M main
    git push -u origin main
    ```

## 2. Deploy to Vercel

Vercel is the best platform for Next.js apps.

1.  Go to [Vercel.com](https://vercel.com) and sign up/login (you can use your GitHub account).
2.  Click "Add New..." -> "Project".
3.  Select "Continue with GitHub".
4.  Find your `backstage-beauty` repository in the list and click "Import".
5.  **Configure Project:**
    *   **Framework Preset:** Next.js (should be auto-detected).
    *   **Environment Variables:** You need to add your `.env` variables here.
        *   Copy the content of your local `.env` file.
        *   Paste them into the environment variables section on Vercel.
        *   *Note: For SQLite/LibSQL (Turso), ensure your database is accessible from the cloud. If you are using a local SQLite file (`dev.db`), it WILL NOT WORK on Vercel properly because the file system is ephemeral. You should use a cloud database like Turso, Neon (Postgres), or PlanetScale.*
        *   **CRITICAL:** If you are using local file storage for images (`public/uploads`), this also **WILL NOT WORK** on Vercel. Vercel deployments are serverless and immutable. You must use an external image host (like AWS S3, Cloudinary, or UploadThing).
6.  Click "Deploy".

## 3. Connect Custom Domain

Once your site is deployed to Vercel (e.g., `backstage-beauty.vercel.app`):

1.  Go to your Project Dashboard on Vercel.
2.  Click on **Settings** -> **Domains**.
3.  Enter your domain name (e.g., `backstage-beauty.com`) in the input box and click "Add".
4.  Vercel will give you DNS records to add to your domain registrar (where you bought the domain, e.g., Namecheap, GoDaddy, Cloudflare).
    *   **A Record:** Point `@` to `76.76.21.21`.
    *   **CNAME Record:** Point `www` to `cname.vercel-dns.com`.
5.  After adding these records in your domain registrar's panel, wait a few minutes (up to 48h, but usually fast) for propagation.
6.  Vercel will automatically generate an SSL certificate (HTTPS) for you.

## Important Note on Database & Images
*   **Database:** If you are using a local `dev.db` SQLite file, you must switch to a cloud provider. [Turso](https://turso.tech/) is a great option for SQLite compatible databases. You would just update your `DATABASE_URL` env var.
*   **Images:** As mentioned, you cannot upload files to the `public` folder in a Vercel deployment. You need to implement an image upload service like [UploadThing](https://uploadthing.com/) (easiest for Next.js) or Cloudinary.

## How to use UploadThing (Quick Summary)
1.  Create account on uploadthing.com.
2.  Create a new app.
3.  Install their package (`npm install uploadthing @uploadthing/react`).
4.  Update your `createPost` action to accept a URL string instead of a File object, and use their component to upload the image on the client side first, then send the URL to your server action.
