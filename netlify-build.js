import fs from 'fs';
import path from 'path';

// Clean build script for Netlify that avoids problematic files
function main() {
  console.log('Starting clean Netlify build...');
  
  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }
  
  // Create _redirects file for SPA routing
  const redirectsContent = `/*    /index.html   200`;
  fs.writeFileSync('public/_redirects', redirectsContent);
  console.log('Created _redirects file');
  
  // Copy only essential image assets from client/src/assets if they exist
  if (fs.existsSync('client/src/assets')) {
    if (!fs.existsSync('public/images')) {
      fs.mkdirSync('public/images', { recursive: true });
    }
    
    try {
      const files = fs.readdirSync('client/src/assets');
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (['.webp', '.png', '.jpg', '.jpeg', '.svg'].includes(ext)) {
          fs.copyFileSync(
            path.join('client/src/assets', file),
            path.join('public/images', file)
          );
          console.log(`Copied asset: ${file}`);
        }
      });
    } catch (err) {
      console.log('No client assets to copy');
    }
  }
  
  console.log('Clean build preparation complete!');
}

main();