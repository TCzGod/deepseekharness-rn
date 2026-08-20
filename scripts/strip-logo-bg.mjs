// Remove white background from rntec-logo.png and produce three assets:
//   1) rntec-logo.png           — transparent logo for the centered hero mark
//   2) rntec-watermark.png      — light-theme repeating tile (blue #3793DB)
//   3) rntec-watermark-dark.png — dark-theme repeating tile (brighter blue)
import { createRequire } from 'node:module';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
const sharp = require('D:/PycharmProjects/deepseek-harness/node_modules/.pnpm/sharp@0.35.3_@types+node@22.20.0/node_modules/sharp');

const distPublic = join(process.cwd(), 'apps', 'web', 'public');
const src = join(distPublic, 'rntec-logo.png');

// Step 1: strip white background.
const raw = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { data, info } = raw;
const out = Buffer.alloc(data.length);
const threshold = 245, edge = 218;
for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3] ?? 255;
  let na = a;
  const minCh = Math.min(r, g, b);
  if (r >= threshold && g >= threshold && b >= threshold) { na = 0; }
  else if (minCh >= edge) {
    const k = (255 - minCh) / (255 - edge);
    na = Math.round(a * Math.max(0, Math.min(1, k)));
  }
  out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = na;
}

const transparent = sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
await transparent.png().toFile(join(distPublic, 'rntec-logo.png'));
console.log(`transparent hero logo: ${info.width}x${info.height}`);

// Step 2: build a watermark tile for a given brand color and opacities.
async function buildTile({ outFile, logoColor, logoAlpha, strokeColor, strokeAlpha, labelAlpha }) {
  const tileW = 560, tileH = 420;
  // Tint the logo to the requested color at the requested alpha: composite a
  // solid-color layer using dest-in so the logo shape becomes a uniform
  // colored silhouette at uniform alpha, then composite battery + label.
  const tint = await sharp({
    create: { width: 1, height: 1, channels: 4, background: { ...logoColor, alpha: logoAlpha } },
  }).png().toBuffer();
  const logoTinted = await transparent.clone().resize({ width: 200 })
    .composite([{ input: tint, raw: { width: 1, height: 1, channels: 4 }, tile: true, blend: 'dest-in' }])
    .png().toBuffer();
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${tileW}" height="${tileH}" viewBox="0 0 ${tileW} ${tileH}">
  <g transform="translate(${tileW / 2 - 30}, 158)" fill="none" stroke="${strokeColor}" stroke-opacity="${strokeAlpha}" stroke-width="2.5">
    <rect width="60" height="30"/>
    <rect x="60" y="9" width="7" height="12" fill="${strokeColor}" fill-opacity="${strokeAlpha}" stroke="none"/>
    <rect x="8" y="8" width="10" height="14" fill="${strokeColor}" fill-opacity="${strokeAlpha}" stroke="none"/>
    <rect x="23" y="8" width="10" height="14" fill="${strokeColor}" fill-opacity="${strokeAlpha}" stroke="none"/>
    <rect x="38" y="8" width="10" height="14" fill="${strokeColor}" fill-opacity="${strokeAlpha}" stroke="none"/>
  </g>
  <text x="${tileW / 2}" y="210" text-anchor="middle" font-family="Consolas, 'Courier New', monospace" font-size="12" letter-spacing="6" fill="${strokeColor}" fill-opacity="${labelAlpha}">BMS · Li-ion · 400V</text>
</svg>`;
  await sharp({ create: { width: tileW, height: tileH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: Buffer.from(svg) },
      { input: logoTinted, top: 50, left: Math.round((tileW - 200) / 2) },
    ])
    .png()
    .toFile(join(distPublic, outFile));
  console.log(`watermark tile: ${outFile}`);
}

await buildTile({
  outFile: 'rntec-watermark.png',
  logoColor: { r: 0x37, g: 0x93, b: 0xdb }, // #3793DB
  logoAlpha: 0.18,
  strokeColor: '#3793DB',
  strokeAlpha: 0.22,
  labelAlpha: 0.18,
});

await buildTile({
  outFile: 'rntec-watermark-dark.png',
  logoColor: { r: 0x8F, g: 0xC7, b: 0xEB }, // lighter blue for dark bg
  logoAlpha: 0.28,
  strokeColor: '#8FC7EB',
  strokeAlpha: 0.32,
  labelAlpha: 0.26,
});
