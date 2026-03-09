import { createCanvas } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/icons");

mkdirSync(outDir, { recursive: true });

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Background circle
  ctx.fillStyle = "#FF6B35";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Text "BR"
  const fontSize = Math.round(size * 0.35);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("BR", size / 2, size / 2 + size * 0.02);

  return canvas.toBuffer("image/png");
}

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of sizes) {
  const buf = drawIcon(size);
  writeFileSync(join(outDir, name), buf);
  console.log(`Generated ${name} (${size}x${size})`);
}

console.log("Done! Icons saved to public/icons/");
