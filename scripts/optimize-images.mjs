// scripts/optimize-images.mjs
// Converts all JPG/PNG images to WebP format using sharp
// Usage: node scripts/optimize-images.mjs

import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const QUALITY = 80;
const dirs = [
    "src/assets/blog",
    "src/assets/projects",
    "public/assets/projects/ecommerce",
    "public/assets/projects/j-barranco",
    "public/assets/projects/thumbnails",
];

let totalSaved = 0;
let filesConverted = 0;

async function convertDir(dir) {
    let files;
    try {
        files = readdirSync(dir);
    } catch {
        console.log(`⚠️  Skipping ${dir} (not found)`);
        return;
    }

    for (const file of files) {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        if (stat.isDirectory()) continue;

        const ext = extname(file).toLowerCase();
        if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

        const name = basename(file, ext);
        const outPath = join(dir, `${name}.webp`);
        const originalSize = stat.size;

        try {
            await sharp(filePath)
                .webp({ quality: QUALITY })
                .toFile(outPath);

            const newSize = statSync(outPath).size;
            const saved = originalSize - newSize;
            const pct = ((saved / originalSize) * 100).toFixed(0);
            totalSaved += saved;
            filesConverted++;

            console.log(
                `✅ ${file} → ${name}.webp  (${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB, -${pct}%)`
            );

            // Delete original
            unlinkSync(filePath);
        } catch (err) {
            console.error(`❌ ${file}: ${err.message}`);
        }
    }
}

console.log("🖼️  Converting images to WebP...\n");
for (const dir of dirs) {
    console.log(`\n📁 ${dir}`);
    await convertDir(dir);
}

console.log(`\n🎉 Done! ${filesConverted} files converted.`);
console.log(`💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`);
