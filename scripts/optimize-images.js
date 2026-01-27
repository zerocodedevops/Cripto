
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/features/projects/salon/src/assets');

async function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
            const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            console.log(`Converting: ${file} -> ${path.basename(webpPath)}`);

            try {
                await sharp(fullPath)
                    .webp({ quality: 85 })
                    .toFile(webpPath);

                // Optional: Delete original if needed, but for safety lets keep them for now 
                // or user can delete them manually.
                // fs.unlinkSync(fullPath); 
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

console.log(`Scanning directory: ${ASSETS_DIR}`);
processDirectory(ASSETS_DIR).then(() => {
    console.log('Image optimization complete.');
});
