#!/bin/bash

echo "🚀 Deploying to Hostinger Git"
echo "=============================="

# Build the site
echo "📦 Building Next.js site..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Switch to deploy branch
echo "🔄 Switching to deploy branch..."
git checkout deploy

# Remove all files
echo "🧹 Cleaning deploy branch..."
git rm -rf . || true
git clean -fdx || true

# Copy built files to root
echo "📁 Copying built files..."
cp -r out/* . || true
cp out/.htaccess . 2>/dev/null || true

# Remove out folder
rm -rf out

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit
echo "💾 Committing deployment files..."
git commit -m "Deploy built site for Hostinger Git"

# Push to deploy branch
echo "📤 Pushing to deploy branch..."
git push origin deploy

# Switch back to main
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment completed!"
echo "🎯 Your site will be live at: https://subjectphoto.com" 