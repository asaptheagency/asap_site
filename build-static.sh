#!/bin/bash

# Create a static build directory
echo "Starting static build process..."

# Build the frontend
npx vite build --outDir=static-build

# Skip attached_assets directory to avoid build conflicts
# mkdir -p static-build/attached_assets
# echo "Copying assets..."
# cp -r attached_assets/* static-build/attached_assets/

# Create public directory for Netlify
mkdir -p dist/public

# Copy the build to dist/public for Netlify
cp -r static-build/* dist/public/

echo "Build complete! Files are ready in dist/public for Netlify deployment."