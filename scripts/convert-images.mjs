import sharp from 'sharp';
import { readdirSync, unlinkSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const assetsDir = join(process.cwd(), 'public', 'assets');

const files = readdirSync(assetsDir).filter(f => extname(f) === '.png');

for (const file of files) {
  const inputPath = join(assetsDir, file);
  const outputPath = join(assetsDir, basename(file, '.png') + '.webp');
  
  const info = await sharp(inputPath)
    .webp({ quality: 82 })
    .toFile(outputPath);
  
  console.log(`✅ ${file} → ${basename(outputPath)} (${(info.size / 1024).toFixed(0)} KB)`);
}

// Also convert hero-clinic.png in public root if it exists
const heroPath = join(process.cwd(), 'public', 'hero-clinic.png');
if (existsSync(heroPath)) {
  console.log('🗑️  Deleting unused hero-clinic.png');
  unlinkSync(heroPath);
}

console.log('\nDone! Now update code references from .png to .webp');
