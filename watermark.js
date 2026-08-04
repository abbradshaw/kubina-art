import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// We need to import sharp. If not installed, the user will run npm install.
import sharp from 'sharp';

const contentDir = 'src/content/work';
const uploadsDir = 'src/assets/uploads';
const backupDir = 'src/assets/uploads_backup';

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

async function run() {
  console.log('Starting watermarking process...');
  
  if (!fs.existsSync(contentDir)) {
    console.error(`Content directory ${contentDir} does not exist.`);
    return;
  }

  // 1. Scan work markdown files for image paths
  const mdFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  const galleryImages = [];

  for (const file of mdFiles) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Simple frontmatter regex to extract image path
    const match = content.match(/^image:\s*["']?([^"\n'\r]+)["']?/m);
    if (match) {
      const relImagePath = match[1];
      // Resolve the relative path from src/content/work/ to its actual path
      const actualPath = path.resolve(contentDir, relImagePath);
      galleryImages.push({
        markdownFile: file,
        imagePath: actualPath,
        relPath: relImagePath
      });
    }
  }

  console.log(`Found ${galleryImages.length} gallery images in markdown frontmatter.`);

  // 2. Process each image
  for (const item of galleryImages) {
    const { imagePath } = item;
    
    if (!fs.existsSync(imagePath)) {
      console.warn(`[WARNING] Image not found: ${imagePath} (referenced in ${item.markdownFile})`);
      continue;
    }

    // Determine relative path from uploadsDir to keep structure in backup
    const relToUploads = path.relative(uploadsDir, imagePath);
    const backupPath = path.join(backupDir, relToUploads);

    // Ensure backup directory exists
    ensureDirectoryExistence(backupPath);

    // Only back up if the backup file doesn't exist yet (to avoid overwriting our original with already-watermarked ones on subsequent runs)
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(imagePath, backupPath);
      console.log(`[BACKUP] Copied original to: ${backupPath}`);
    }

    try {
      // Get image dimensions to scale watermark properly
      const metadata = await sharp(backupPath).metadata();
      const width = metadata.width || 800;
      const height = metadata.height || 600;

      // Calculate watermark sizing dynamically based on image size (extremely large - 50% width)
      const fontSize = Math.max(300, Math.round(width * 0.50)); // ~50% of image width
      const padding = Math.max(120, Math.round(width * 0.10));

      // Create an SVG text overlay
      // White text with a solid black outline, fully opaque
      const svgText = `
        <svg width="${width}" height="${height}">
          <style>
            .watermark {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: ${fontSize}px;
              font-weight: bold;
              fill: #ffffff;
              fill-opacity: 1.0;
              stroke: #000000;
              stroke-width: ${Math.max(2, Math.round(fontSize * 0.15))}px;
              stroke-opacity: 1.0;
              paint-order: stroke fill;
              text-anchor: end;
            }
          </style>
          <text x="${width - padding}" y="${height - padding}" class="watermark">© Peter Kubina</text>
        </svg>
      `;

      // Composite the watermark and overwrite original file in uploadsDir
      await sharp(backupPath)
        .composite([
          {
            input: Buffer.from(svgText),
            top: 0,
            left: 0,
          }
        ])
        .toFile(imagePath);

      console.log(`[WATERMARKED] ${item.relPath}`);
    } catch (err) {
      console.error(`[ERROR] Failed to watermark ${item.relPath}:`, err.message);
    }
  }

  console.log('\nWatermarking complete! Clean backups are stored in src/assets/uploads_backup/');
}

run().catch(err => {
  console.error('Fatal error:', err);
});
