#!/bin/bash

echo "🚀 Manual Deployment to Hostinger"
echo "=================================="

# Build the site
echo "📦 Building Next.js site..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Upload using curl (alternative method)
echo "📤 Uploading files to Hostinger..."

# Create a simple upload using curl
# This is a fallback method if FTP doesn't work

echo "🎯 Your site files are ready in the /out folder"
echo "📋 Manual upload instructions:"
echo "1. Go to Hostinger File Manager"
echo "2. Navigate to public_html"
echo "3. Delete everything in public_html"
echo "4. Upload all files from the /out folder"
echo ""
echo "🔗 Your site will be live at: https://subjectphoto.com"

echo "✅ Manual deployment script completed!" 