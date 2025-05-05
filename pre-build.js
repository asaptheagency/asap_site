const fs = require('fs');
const path = require('path');

// Ensure all directories exist
function ensureDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    console.log(`Created directory: ${directoryPath}`);
  }
}

// Copy files from source to destination
function copyFiles(sourceDir, destDir, fileExtensions) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`Source directory does not exist: ${sourceDir}`);
    return;
  }

  ensureDirectoryExists(destDir);

  try {
    const files = fs.readdirSync(sourceDir);
    
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      
      const stats = fs.statSync(sourcePath);
      
      if (stats.isDirectory()) {
        copyFiles(sourcePath, destPath, fileExtensions);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (fileExtensions.includes(ext)) {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied: ${sourcePath} -> ${destPath}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error copying files from ${sourceDir} to ${destDir}: ${err.message}`);
  }
}

// Main function
function main() {
  console.log('Starting pre-build image preparation...');
  
  // Create all necessary directories
  ensureDirectoryExists('public/images');
  ensureDirectoryExists('dist/public/images');
  
  // Copy image files
  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif'];
  
  // Copy from attached_assets to public/images
  copyFiles('attached_assets', 'public/images', imageExtensions);
  
  // Copy from client/src/assets to public/images
  copyFiles('client/src/assets', 'public/images', imageExtensions);
  
  // Create _redirects file if it doesn't exist
  const redirectsPath = 'public/_redirects';
  if (!fs.existsSync(redirectsPath)) {
    const redirectsContent = `# Netlify redirects file
# Redirect all routes to index.html for SPA routing
/*    /index.html   200

# Ensure image paths are properly resolved
/attached_assets/*  /images/:splat  200
/images/*           /images/:splat  200`;
    
    fs.writeFileSync(redirectsPath, redirectsContent);
    console.log('Created Netlify _redirects file');
  }
  
  console.log('Pre-build image preparation complete!');
}

// Run main function
main();