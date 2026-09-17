const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F201B"/>
      <stop offset="50%" stop-color="#18332B"/>
      <stop offset="100%" stop-color="#1E3D34"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0D7A7"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B8860B"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative geometric / oriental rings -->
  <circle cx="1100" cy="120" r="280" stroke="#2A5243" stroke-width="1.5" fill="none" opacity="0.4"/>
  <circle cx="1100" cy="120" r="220" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 8" fill="none" opacity="0.3"/>
  <circle cx="100" cy="560" r="240" stroke="#2A5243" stroke-width="1.5" fill="none" opacity="0.3"/>
  <circle cx="100" cy="560" r="180" stroke="#D4AF37" stroke-width="1" stroke-dasharray="6 6" fill="none" opacity="0.2"/>

  <!-- Framing Border -->
  <rect x="30" y="30" width="1140" height="570" rx="16" stroke="#D4AF37" stroke-width="1.5" fill="none" opacity="0.4"/>
  <rect x="38" y="38" width="1124" height="554" rx="12" stroke="#2A5243" stroke-width="1" fill="none" opacity="0.6"/>

  <!-- Top Category Badge -->
  <g transform="translate(80, 80)">
    <rect width="360" height="36" rx="18" fill="#132B24" stroke="#D4AF37" stroke-width="1" opacity="0.9"/>
    <text x="180" y="23" fill="#F0D7A7" font-family="'Noto Serif JP', serif, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="2">
      鍼灸師・臨床家・医学生のための学習ポータル
    </text>
  </g>

  <!-- Main Brand Title -->
  <text x="80" y="210" fill="#FAF8F5" font-family="'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif" font-size="64" font-weight="bold" letter-spacing="4">
    はり太郎の東洋医学
  </text>

  <!-- Gold Accent Divider Line -->
  <line x1="80" y1="245" x2="680" y2="245" stroke="url(#gold)" stroke-width="3" stroke-linecap="round"/>

  <!-- Subtitle -->
  <text x="80" y="300" fill="#E8E1D1" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" font-size="24" font-weight="bold" letter-spacing="1.5">
    基礎理論から臨床実践までを体系化する学術データベース
  </text>

  <!-- Description -->
  <text x="80" y="350" fill="#A8B8A6" font-family="'Noto Sans JP', sans-serif" font-size="16">
    数千年の臨床智慧と現代神経科学が結実。丸暗記を脱却し、人体の構造と思考体系から本質を修得。
  </text>

  <!-- Feature Pills -->
  <g transform="translate(80, 410)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="240" height="52" rx="12" fill="#162F27" stroke="#2A5243" stroke-width="1.5"/>
    <text x="24" y="32" fill="#FAF8F5" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="bold">📍 WHO標準361経穴図鑑</text>

    <!-- Pill 2 -->
    <rect x="260" y="0" width="240" height="52" rx="12" fill="#162F27" stroke="#2A5243" stroke-width="1.5"/>
    <text x="284" y="32" fill="#FAF8F5" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="bold">🧭 8大体系カリキュラム</text>

    <!-- Pill 3 -->
    <rect x="520" y="0" width="230" height="52" rx="12" fill="#162F27" stroke="#2A5243" stroke-width="1.5"/>
    <text x="544" y="32" fill="#FAF8F5" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="bold">🌿 気血水・五労診断</text>

    <!-- Pill 4 -->
    <rect x="770" y="0" width="250" height="52" rx="12" fill="#162F27" stroke="#2A5243" stroke-width="1.5"/>
    <text x="794" y="32" fill="#FAF8F5" font-family="'Noto Sans JP', sans-serif" font-size="15" font-weight="bold">⚡ 臨床推論シミュレーター</text>
  </g>

  <!-- Footer Info -->
  <g transform="translate(80, 545)">
    <text x="0" y="0" fill="#D4AF37" font-family="'Noto Sans JP', monospace, sans-serif" font-size="16" font-weight="bold" letter-spacing="1">
      https://www.haritaro.jp
    </text>
    <text x="1040" y="0" fill="#88A096" font-family="'Noto Sans JP', sans-serif" font-size="13" text-anchor="end">
      執筆・監修：はり太郎（鍼灸師・鍼灸院院長）
    </text>
  </g>
</svg>
`;

const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');

sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(outputPath)
  .then((info) => {
    console.log('Successfully generated public/og-image.png:', info);
  })
  .catch((err) => {
    console.error('Error generating og-image:', err);
    process.exit(1);
  });
