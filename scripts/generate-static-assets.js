const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');
fs.mkdirSync(iconsDir, { recursive: true });

async function generate() {
  const logoSvg = fs.readFileSync(path.join(publicDir, 'logo.svg'), 'utf8');
  const svgBuffer = Buffer.from(logoSvg);

  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'logo.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'logo-maskable.png'));
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(iconsDir, 'icon-192.png'));
  await sharp(svgBuffer).resize(384, 384).png().toFile(path.join(iconsDir, 'icon-384.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(iconsDir, 'icon-512.png'));

  const ogSvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#00572b" />
          <stop offset="100%" stop-color="#009f4d" />
        </linearGradient>
        <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
        <style>
          .title { font-family: Inter, Arial, sans-serif; font-size: 64px; font-weight: 800; fill: #ffffff; }
          .subtitle { font-family: Inter, Arial, sans-serif; font-size: 32px; fill: rgba(255,255,255,0.88); }
          .badge { font-family: Inter, Arial, sans-serif; font-size: 24px; fill: rgba(255,255,255,0.78); }
        </style>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)" />
      <rect x="80" y="120" width="1040" height="390" rx="56" fill="rgba(255,255,255,0.08)" />
      <rect x="80" y="120" width="1040" height="90" rx="40" fill="rgba(255,255,255,0.1)" />
      <rect x="100" y="160" width="980" height="16" fill="url(#stripe)" />
      <rect x="100" y="220" width="980" height="16" fill="url(#stripe)" />
      <rect x="100" y="280" width="980" height="16" fill="url(#stripe)" />
      <circle cx="1020" cy="160" r="110" fill="rgba(255,255,255,0.1)" />
      <text x="100" y="170" class="badge">Sporting Clube de Portugal</text>
      <text x="100" y="280" class="title">Site do Leão</text>
      <text x="100" y="340" class="subtitle">Notícias, jogos, plantel, resultados e transferências.</text>
      <text x="100" y="395" class="subtitle">Fã site dedicado aos adeptos do Sporting CP.</text>
      <g transform="translate(860 340) scale(0.7)">
        <path d="M96 4c-31-3-90 31-90 84v108c0 53 46 94 102 100l14 3 22-3c56-6 102-47 102-100V88c0-53-59-87-90-84-.1 0-35 2-65 2-30 0-65-2-65-2z" fill="#ffffff" opacity="0.12" />
        <text x="0" y="80" font-size="90" font-family="Inter, Arial, sans-serif" font-weight="800" fill="#ffffff">SCP</text>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 90 }).toFile(path.join(publicDir, 'og-image.jpg'));

  console.log('Created valid image assets in public/');
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
