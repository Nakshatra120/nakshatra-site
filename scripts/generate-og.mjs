// Generates public/og-image.png (1200×630) — the social share banner.
// Matches the site's minimal style: cool paper, ink serif name, the
// damped-oscillation accent signature, mono eyebrow, muted serif tagline,
// and the accent-preset dots (the "tunable parameter" motif).
//
// Re-run after changing name/tagline:  node scripts/generate-og.mjs
// Keep NAME/TAGLINE_LINES in sync with src/consts.ts.

import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const W = 1200, H = 630, PAD = 90;

// tokens (mirror src/styles/global.css)
const BG = '#f8f8f6', INK = '#16181d', MUTED = '#565b62', FAINT = '#8a9099';
const ACCENT = '#2a45d4';
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = 'Menlo, monospace';
const PRESETS = ['#2a45d4', '#c5462f', '#6c3fd1', '#1f8a5b', '#16181d'];

const NAME = 'Nakshatra Bansal';
const EYEBROW = 'NEUROMORPHIC · SPINTRONICS · PHYSICS OF LEARNING';
const TAGLINE_LINES = [
  'Physics PhD working where neuromorphic',
  'hardware, spintronics, and the physics',
  'of learning meet.',
];

// Damped sinusoid — same procedure as src/components/Oscillation.astro.
const oscW = 520, oscH = 56, mid = oscH / 2;
const pts = [];
for (let x = 0; x <= oscW; x += 4) {
  const t = x / oscW;
  const y = mid - Math.sin(t * 34) * (mid - 3) * Math.exp(-3.2 * t);
  pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
}
const oscPath = `M ${pts.join(' L ')}`;

const tagline = TAGLINE_LINES.map(
  (line, i) =>
    `<tspan x="${PAD}" y="${430 + i * 44}">${line}</tspan>`
).join('');

const dots = PRESETS.map(
  (c, i) => `<circle cx="${1010 + i * 25}" cy="555" r="7" fill="${c}" />`
).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}" />
  <text x="${PAD}" y="165" font-family="${MONO}" font-size="22"
        letter-spacing="3" fill="${ACCENT}">${EYEBROW}</text>
  <text x="${PAD}" y="285" font-family="${SERIF}" font-size="92"
        font-weight="500" letter-spacing="-1.8" fill="${INK}">${NAME}</text>
  <g transform="translate(${PAD}, 300)">
    <line x1="0" y1="${mid}" x2="${oscW}" y2="${mid}" stroke="#e4e5e1" stroke-width="1" />
    <path d="${oscPath}" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round" />
  </g>
  <text font-family="${SERIF}" font-size="33" fill="${MUTED}">${tagline}</text>
  <text x="${PAD}" y="565" font-family="${MONO}" font-size="16"
        letter-spacing="2" fill="${FAINT}">ACCENT — A TUNABLE PARAMETER</text>
  ${dots}
</svg>`;

const out = new URL('../public/og-image.png', import.meta.url);
await sharp(Buffer.from(svg)).png().toFile(out.pathname);
console.log('wrote', out.pathname);
