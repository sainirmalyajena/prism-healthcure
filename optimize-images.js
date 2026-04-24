const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = ['hero_clinic', 'laser_tech', 'dr_siddharth', 'dr_ananya', 'dr_vikram'];

async function convertImages() {
  console.log('Converting PNG images to WebP...');
  
  for (const img of images) {
    const pngPath = path.join(__dirname, `${img}.png`);
    const webpPath = path.join(__dirname, `${img}.webp`);
    
    if (fs.existsSync(pngPath)) {
      await sharp(pngPath)
        .webp({ quality: 78, effort: 6 })
        .toFile(webpPath);
      
      const pngSize = Math.round(fs.statSync(pngPath).size / 1024);
      const webpSize = Math.round(fs.statSync(webpPath).size / 1024);
      console.log(`✓ ${img}: ${pngSize}KB PNG → ${webpSize}KB WebP (${Math.round((1-webpSize/pngSize)*100)}% smaller)`);
    }
  }
  
  console.log('Image optimization complete!');
}

convertImages().catch(console.error);
