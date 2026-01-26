# Deploying to Hostinger (VPS)

**Yes, you can use Hostinger!**

However, because your application uses:
1.  **Server Actions & Dynamic Content** (Admin Panel, Logins)
2.  **Local Database** (SQLite `dev.db`)
3.  **Local Image Uploads** (`public/uploads`)

You **CANNOT** use standard "Shared Web Hosting" or just "deploy a static site".
You **MUST** use a **VPS (Virtual Private Server)** plan on Hostinger (e.g., KVM 1, KVM 2, etc.).

Why? A VPS gives you a persistent file system (so your uploaded images and database don't disappear) and allows you to run a Node.js server permanently.

---

## Step-by-Step Guide for Hostinger VPS (Ubuntu)

### 1. Prepare your Hostinger VPS
1.  Go to your Hostinger Dashboard -> VPS.
2.  Choose **Ubuntu 22.04** (or 24.04) as your Operating System.
3.  Note your **Public IP Address** and **Root Password**.

### 2. Connect to your VPS
Open your terminal (PowerShell or CMD on Windows) and run:
```bash
ssh root@<YOUR_VPS_IP>
# Example: ssh root@123.456.78.90
# Enter your password when prompted (it won't show on screen).
```

### 3. Install Node.js, Nginx, and Git
Run these commands inside your VPS terminal one by one:

```bash
# Update system
apt update && apt upgrade -y

# Install Curl
apt install curl -y

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify Node version
node -v 
# Should show v20.x.x

# Install Nginx (Web Server)
apt install nginx -y

# Install PM2 (Process Manager to keep app running)
npm install -g pm2
```

### 4. Deploy Your Code
You can clone from GitHub (easiest) or copy files manually. Assuming you pushed to GitHub:

```bash
# Clone your repository
git clone https://github.com/<YOUR_USERNAME>/backstage-beauty.git

# Enter folder
cd backstage-beauty

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Create production build
npm run build
```

### 5. Start the App using PM2
PM2 will keep your app running in the background, even if you close the terminal.

```bash
# Start the app on port 3000
pm2 start npm --name "backstage-beauty" -- start

# Save the process list so it restarts on reboot
pm2 save
pm2 startup
# (Run the command outputted by the startup command if any)
```

At this point, your app is running on deployment locally at `http://localhost:3000`.

### 6. Setup Domain & Nginx (Important for public access)
Now you need to point your domain to this server.

1.  **DNS**: Go to your domain registrar (Hostinger or other).
    *   Create an **A Record**.
    *   Host: `@`
    *   Points to: `<YOUR_VPS_IP>`

2.  **Configure Nginx**:
    ```bash
    # Create config file
    nano /etc/nginx/sites-available/backstage-beauty
    ```

    Paste this content (Right click to paste in standard SSH terminals usually works):
    *Replace `your-domain.com` with your actual domain.*
    ```nginx
    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
    *   Press `Ctrl+X`, then `Y`, then `Enter` to save and exit.

3.  **Enable Site**:
    ```bash
    ln -s /etc/nginx/sites-available/backstage-beauty /etc/nginx/sites-enabled/
    rm /etc/nginx/sites-enabled/default  # Remove default page
    nginx -t  # Test configuration
    systemctl restart nginx
    ```

### 7. Add SSL (HTTPS)
Hostinger doesn't do this automatically for VPS like Vercel does, but it's easy with Certbot.

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d your-domain.com -d www.your-domain.com
```
Follow prompts (enter email, agree terms). It will automatically secure your site.

---

## IMPORTANT: Managing Uploads & Database
Since you are on a VPS:
*   **Database**: Your `dev.db` file will live on the server. It will be persistent.
*   **Uploads**: Images uploaded via your admin panel will be saved to `public/uploads` on the server. They will persist.

**Backups**: You are responsible for backing up your `dev.db` file and `public/uploads` folder! If the server crashes or is deleted, you lose them. 

## Updating the Site
When you make changes locally and push to GitHub:
1.  SSH into server: `ssh root@<IP>`
2.  `cd backstage-beauty`
3.  `git pull`
4.  `npm install` (if you added packages)
5.  `npx prisma migrate deploy` (if you changed schema)
6.  `npm run build`
7.  `pm2 restart backstage-beauty`
