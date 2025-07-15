# 🚀 Auto-Deployment Setup Guide

This guide will set up automatic deployment from GitHub to Hostinger every time you push to the `main` branch.

## 📋 Prerequisites

- GitHub repository: `https://github.com/VULUxOMID/Project-1-vulu-photo.git`
- Hostinger hosting account with `subjectphoto.com`
- FTP access to your Hostinger account

## 🔑 Step 1: Get Your Hostinger FTP Credentials

1. Login to your **Hostinger account**
2. Go to **Websites** → **subjectphoto.com** → **Files** → **FTP Accounts**
3. Note down these details:
   - **FTP Host**: Usually `ftp.subjectphoto.com` or an IP address
   - **FTP Username**: Your FTP username
   - **FTP Password**: Your FTP password

## 🔒 Step 2: Add GitHub Secrets

1. Go to your GitHub repository: `https://github.com/VULUxOMID/Project-1-vulu-photo`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these:

### Required FTP Secrets:
```
Secret Name: FTP_HOST
Value: ftp.subjectphoto.com (or your FTP host)

Secret Name: FTP_USERNAME  
Value: your-ftp-username

Secret Name: FTP_PASSWORD
Value: your-ftp-password
```

### Optional Environment Secrets (for real payment integration):
```
Secret Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_live_... (your real Stripe key)

Secret Name: NEXT_PUBLIC_PAYPAL_CLIENT_ID
Value: your-real-paypal-client-id

Secret Name: NEXT_PUBLIC_FORMSPREE_FORM_ID
Value: your-formspree-form-id

Secret Name: NEXT_PUBLIC_SUPABASE_URL
Value: your-supabase-project-url

Secret Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: your-supabase-anon-key
```

## ✅ Step 3: Test the Deployment

1. **Commit and push** this workflow file to your repository:
   ```bash
   git add .
   git commit -m "Add auto-deployment workflow"
   git push origin main
   ```

2. **Watch the deployment** in your GitHub repository:
   - Go to **Actions** tab
   - You should see the deployment running
   - It will take 2-3 minutes to complete

3. **Check your website**: https://subjectphoto.com

## 🎯 How It Works

- **Trigger**: Every push to `main` branch
- **Process**: 
  1. Checks out your code
  2. Installs Node.js and dependencies
  3. Builds the Next.js static export
  4. Uploads the `/out` folder to Hostinger via FTP
- **Result**: Your website is automatically updated!

## 🔧 Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab in your GitHub repo
2. Click **Deploy to Hostinger**
3. Click **Run workflow**

## 🚨 Troubleshooting

### Common Issues:
- **FTP connection failed**: Check your FTP credentials in GitHub Secrets
- **Build failed**: Check if all dependencies are in `package.json`
- **Site not updating**: Clear browser cache and check deployment logs

### Deployment Logs:
- Go to **Actions** tab → Click on latest deployment → View logs

## 🎉 Success!

Once set up, every time you:
- Edit your website code
- Push to GitHub
- Your live site automatically updates at https://subjectphoto.com

No more manual uploads! 🚀 