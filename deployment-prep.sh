#!/bin/bash

# Prepare assets for deployment
echo "Preparing assets for deployment..."

# Create all necessary directories
mkdir -p public/images
mkdir -p public/assets
mkdir -p dist/public/images
mkdir -p dist/public/assets

# Copy all assets to the public/images directory
echo "Copying assets to public/images..."
cp -r attached_assets/*.webp public/images/
cp -r attached_assets/*.png public/images/
cp -r attached_assets/*.jpg public/images/ 2>/dev/null || :
cp -r attached_assets/*.jpeg public/images/ 2>/dev/null || :

# Create a .gitkeep file to ensure the directory is tracked
touch public/images/.gitkeep

# Ensure Netlify _redirects is in place
if [ ! -f public/_redirects ]; then
  echo "Creating _redirects file..."
  cat > public/_redirects << EOL
# Netlify redirects file
# Redirect all routes to index.html for SPA routing
/*    /index.html   200

# Ensure image paths are properly resolved
/attached_assets/*  /images/:splat  200
/images/*           /images/:splat  200
EOL
fi

# Also create a copy directly in dist/public (for safety)
echo "Copying assets to dist/public/images..."
cp -r public/images/* dist/public/images/ 2>/dev/null || :

echo "Assets prepared for deployment!"
echo "Note: You can now use 'npm run build' to generate the build files."
echo "The build will include your assets properly structured for Netlify."