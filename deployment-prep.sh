#!/bin/bash

# Prepare assets for deployment
echo "Preparing assets for deployment..."

# Create the necessary directories
mkdir -p public/attached_assets

# Copy all assets to the public/attached_assets directory
echo "Copying assets..."
cp -r attached_assets/* public/attached_assets/

# Create a .gitkeep file to ensure the directory is tracked
touch public/attached_assets/.gitkeep

echo "Assets prepared for deployment!"
echo "Note: You can now use 'npm run build' to generate the build files."
echo "The build will include your assets properly structured for Netlify."