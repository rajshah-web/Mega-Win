const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const outDir = path.resolve(__dirname, '../public/games');
const distDir = path.resolve(__dirname, '../dist/games');
[outDir, distDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Custom vector paths for each game so NO emojis or missing font glyphs are used
const vectorSymbols = {
  crown: `
    <!-- Royal Imperial Crown -->
    <path d="M 280,360 L 290,260 L 340,310 L 400,230 L 460,310 L 510,260 L 520,360 Z" fill="url(#goldGrad)" stroke="#78350f" stroke-width="6" filter="url(#glow)"/>
    <circle cx="290" cy="255" r="14" fill="#ef4444" stroke="#fef08a" stroke-width="3"/>
    <circle cx="400" cy="225" r="18" fill="#38bdf8" stroke="#fef08a" stroke-width="4"/>
    <circle cx="510" cy="255" r="14" fill="#ef4444" stroke="#fef08a" stroke-width="3"/>
    <rect x="280" y="340" width="240" height="24" rx="6" fill="#78350f"/>
    <circle cx="320" cy="352" r="6" fill="#38bdf8"/>
    <circle cx="360" cy="352" r="6" fill="#ef4444"/>
    <circle cx="400" cy="352" r="8" fill="#facc15"/>
    <circle cx="440" cy="352" r="6" fill="#ef4444"/>
    <circle cx="480" cy="352" r="6" fill="#38bdf8"/>
  `,
  fire: `
    <!-- Flaming Dragon Fire Swirl -->
    <path d="M 400,210 Q 450,270 420,310 Q 480,290 460,360 Q 410,390 400,380 Q 390,390 340,360 Q 320,290 380,310 Q 350,270 400,210 Z" fill="url(#fireGrad)" filter="url(#glow)"/>
    <path d="M 400,260 Q 430,300 410,330 Q 440,320 420,360 Q 400,370 380,360 Q 360,320 390,330 Q 370,300 400,260 Z" fill="#fef08a"/>
    <circle cx="400" cy="340" r="15" fill="#ffffff" filter="url(#glow)"/>
  `,
  stars: `
    <!-- Orion Cosmic Starburst & Roulette Ring -->
    <circle cx="400" cy="310" r="80" fill="none" stroke="url(#secGrad)" stroke-width="8" stroke-dasharray="20 12"/>
    <polygon points="400,220 415,285 480,300 415,315 400,380 385,315 320,300 385,285" fill="url(#goldGrad)" filter="url(#glow)"/>
    <circle cx="400" cy="300" r="16" fill="#ffffff" filter="url(#glow)"/>
    <circle cx="330" cy="240" r="10" fill="#facc15" filter="url(#glow)"/>
    <circle cx="470" cy="240" r="10" fill="#38bdf8" filter="url(#glow)"/>
    <circle cx="480" cy="370" r="8" fill="#ec4899" filter="url(#glow)"/>
    <circle cx="320" cy="370" r="8" fill="#38bdf8" filter="url(#glow)"/>
  `,
  galaxy: `
    <!-- Milky Way Triple Slot Reel with 7s -->
    <rect x="290" y="240" width="220" height="130" rx="16" fill="#0f0728" stroke="url(#goldGrad)" stroke-width="6"/>
    <line x1="363" y1="240" x2="363" y2="370" stroke="url(#goldGrad)" stroke-width="4"/>
    <line x1="436" y1="240" x2="436" y2="370" stroke="url(#goldGrad)" stroke-width="4"/>
    <text x="326" y="325" fill="#f43f5e" font-family="Impact, sans-serif" font-weight="900" font-size="64" text-anchor="middle">7</text>
    <text x="400" y="325" fill="#facc15" font-family="Impact, sans-serif" font-weight="900" font-size="64" text-anchor="middle">7</text>
    <text x="473" y="325" fill="#f43f5e" font-family="Impact, sans-serif" font-weight="900" font-size="64" text-anchor="middle">7</text>
  `,
  temple: `
    <!-- Juwa 2.0 Royal Cards Fan -->
    <!-- Card 1 -->
    <rect x="270" y="250" width="70" height="100" rx="8" fill="#ffffff" stroke="#78350f" stroke-width="3" transform="rotate(-20 305 300)"/>
    <text x="290" y="280" fill="#dc2626" font-family="sans-serif" font-weight="bold" font-size="24" transform="rotate(-20 305 300)">A♥</text>
    <!-- Card 2 -->
    <rect x="365" y="240" width="70" height="100" rx="8" fill="#ffffff" stroke="#78350f" stroke-width="3"/>
    <text x="385" y="270" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="24">K♠</text>
    <!-- Card 3 -->
    <rect x="460" y="250" width="70" height="100" rx="8" fill="#ffffff" stroke="#78350f" stroke-width="3" transform="rotate(20 495 300)"/>
    <text x="480" y="280" fill="#dc2626" font-family="sans-serif" font-weight="bold" font-size="24" transform="rotate(20 495 300)">A♦</text>
  `,
  panda: `
    <!-- Panda Master Golden Fortune Cauldron -->
    <ellipse cx="400" cy="330" rx="90" ry="45" fill="url(#goldGrad)" stroke="#78350f" stroke-width="6"/>
    <path d="M 310,330 Q 320,380 400,385 Q 480,380 490,330 Z" fill="url(#goldGrad)" stroke="#78350f" stroke-width="6"/>
    <circle cx="370" cy="315" r="22" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
    <circle cx="430" cy="315" r="22" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
    <circle cx="400" cy="300" r="24" fill="#fbbf24" stroke="#ca8a04" stroke-width="4"/>
    <text x="400" y="308" fill="#78350f" font-weight="bold" font-size="18" text-anchor="middle">$</text>
  `,
  cyber_panda: `
    <!-- Ultra Panda Cyber Shield & Lightning -->
    <polygon points="400,220 490,260 470,360 400,390 330,360 310,260" fill="#090514" stroke="#2dd4bf" stroke-width="8" filter="url(#glow)"/>
    <polygon points="415,240 370,305 410,305 385,370 440,295 400,295" fill="#facc15" stroke="#ca8a04" stroke-width="2" filter="url(#glow)"/>
  `,
  letter_e: `
    <!-- Golden Faceted Diamond & Casino Coin -->
    <polygon points="400,230 460,270 440,350 400,375 360,350 340,270" fill="url(#goldGrad)" stroke="#fef08a" stroke-width="6" filter="url(#glow)"/>
    <polygon points="400,240 445,275 400,360 355,275" fill="#fef08a" opacity="0.6"/>
    <text x="400" y="325" fill="#78350f" font-family="Impact, sans-serif" font-weight="900" font-size="75" text-anchor="middle">E</text>
  `,
  arcade: `
    <!-- Game Room Slot Machine -->
    <rect x="300" y="230" width="200" height="140" rx="20" fill="url(#goldGrad)" stroke="#78350f" stroke-width="6" filter="url(#glow)"/>
    <rect x="320" y="250" width="160" height="60" rx="10" fill="#000000"/>
    <text x="350" y="295" fill="#f43f5e" font-family="Impact, sans-serif" font-size="40">7</text>
    <text x="400" y="295" fill="#facc15" font-family="Impact, sans-serif" font-size="40">7</text>
    <text x="450" y="295" fill="#38bdf8" font-family="Impact, sans-serif" font-size="40">7</text>
    <circle cx="515" cy="260" r="14" fill="#ef4444" stroke="#fef08a" stroke-width="3"/>
    <line x1="500" y1="310" x2="515" y2="260" stroke="#facc15" stroke-width="6"/>
  `,
  lightning: `
    <!-- VBlink Magic Top Hat & Wand -->
    <ellipse cx="400" cy="350" rx="90" ry="24" fill="#3b0764" stroke="#c084fc" stroke-width="5"/>
    <path d="M 330,350 L 345,245 L 455,245 L 470,350 Z" fill="#581c87" stroke="#c084fc" stroke-width="5"/>
    <rect x="338" y="315" width="124" height="20" fill="#facc15"/>
    <polygon points="400,210 408,230 428,238 408,246 400,266 392,246 372,238 392,230" fill="#38bdf8" filter="url(#glow)"/>
  `,
  vegas_sign: `
    <!-- Vegas Sweeps Diamond Marquee Sign -->
    <polygon points="400,220 500,300 400,380 300,300" fill="#581c87" stroke="url(#goldGrad)" stroke-width="8" filter="url(#glow)"/>
    <circle cx="400" cy="235" r="5" fill="#fef08a"/>
    <circle cx="485" cy="300" r="5" fill="#fef08a"/>
    <circle cx="400" cy="365" r="5" fill="#fef08a"/>
    <circle cx="315" cy="300" r="5" fill="#fef08a"/>
    <text x="400" y="295" fill="#fef08a" font-family="Impact, sans-serif" font-size="28" letter-spacing="2" text-anchor="middle">VEGAS</text>
    <text x="400" y="330" fill="#ffffff" font-family="Impact, sans-serif" font-size="34" letter-spacing="3" text-anchor="middle">777</text>
  `,
  dragon: `
    <!-- Blue Dragon Crest -->
    <circle cx="400" cy="305" r="80" fill="#0c1d38" stroke="url(#goldGrad)" stroke-width="8"/>
    <path d="M 340,320 Q 370,230 430,245 Q 470,260 450,310 Q 430,360 380,350 Q 350,340 340,320 Z" fill="none" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" filter="url(#glow)"/>
    <circle cx="430" cy="270" r="8" fill="#facc15" filter="url(#glow)"/>
    <text x="400" y="380" fill="#fbbf24" font-family="Impact, sans-serif" font-size="26" text-anchor="middle">888 LUCK</text>
  `,
  cards: `
    <!-- Mafia Ace of Spades & Gold Dice -->
    <path d="M 400,230 C 430,265 460,290 460,315 C 460,335 440,350 420,350 C 405,350 395,340 400,325 C 405,340 395,350 380,350 C 360,350 340,335 340,315 C 340,290 370,265 400,230 Z" fill="url(#goldGrad)" filter="url(#glow)"/>
    <path d="M 395,335 L 385,370 L 415,370 L 405,335 Z" fill="url(#goldGrad)"/>
    <rect x="435" y="325" width="40" height="40" rx="8" fill="#ffffff" stroke="#000000" stroke-width="2"/>
    <circle cx="445" cy="335" r="3" fill="#dc2626"/>
    <circle cx="465" cy="355" r="3" fill="#dc2626"/>
    <circle cx="455" cy="345" r="3" fill="#dc2626"/>
  `,
  river_r: `
    <!-- River Sweeps Neon R & Power Ring -->
    <circle cx="400" cy="305" r="80" fill="#041b2d" stroke="#06b6d4" stroke-width="8" filter="url(#glow)"/>
    <path d="M 370,260 L 410,260 Q 435,260 435,285 Q 435,310 410,310 L 370,310 Z" fill="none" stroke="url(#goldGrad)" stroke-width="12"/>
    <line x1="370" y1="260" x2="370" y2="350" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>
    <line x1="405" y1="310" x2="435" y2="350" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>
  `,
  vault: `
    <!-- Game Vault Wheel & Diamonds -->
    <circle cx="400" cy="305" r="75" fill="#1e1136" stroke="url(#goldGrad)" stroke-width="10" filter="url(#glow)"/>
    <circle cx="400" cy="305" r="28" fill="#facc15" stroke="#78350f" stroke-width="4"/>
    <!-- Vault Spokes -->
    <line x1="400" y1="230" x2="400" y2="380" stroke="#facc15" stroke-width="6"/>
    <line x1="325" y1="305" x2="475" y2="305" stroke="#facc15" stroke-width="6"/>
    <polygon points="350,250 365,250 372,265 358,265" fill="#38bdf8"/>
    <polygon points="440,250 455,250 462,265 448,265" fill="#38bdf8"/>
  `,
  cash: `
    <!-- Cash Machine Stacks of Dollar Bills -->
    <rect x="300" y="270" width="180" height="95" rx="8" fill="#15803d" stroke="#facc15" stroke-width="5" transform="rotate(-12 390 315)"/>
    <rect x="320" y="250" width="180" height="95" rx="8" fill="#16a34a" stroke="#facc15" stroke-width="5"/>
    <circle cx="410" cy="297" r="28" fill="#22c55e" stroke="#facc15" stroke-width="3"/>
    <text x="410" y="310" fill="#ffffff" font-family="Impact, sans-serif" font-weight="900" font-size="40" text-anchor="middle">$</text>
    <rect x="385" y="248" width="50" height="98" fill="#facc15" opacity="0.3"/>
  `,
};

const games = [
  {
    filename: 'mega-win.png',
    bgStart: '#1a0b2e',
    bgEnd: '#0d0417',
    primaryColor: '#fbbf24',
    secondaryColor: '#38bdf8',
    glowColor: '#f59e0b',
    title: 'MEGA WIN',
    subtitle: 'ROYAL GRAND JACKPOT',
    category: '777 VIP SLOTS',
    badge: 'EXCLUSIVE',
    symbolKey: 'crown',
  },
  {
    filename: 'fire-kirin.png',
    bgStart: '#2d0808',
    bgEnd: '#130202',
    primaryColor: '#f97316',
    secondaryColor: '#facc15',
    glowColor: '#ef4444',
    title: 'FIRE KIRIN',
    subtitle: 'DRAGON FISH HUNTER',
    category: '777 FISH & SLOTS',
    badge: 'HOTTEST',
    symbolKey: 'fire',
  },
  {
    filename: 'orion-stars.png',
    bgStart: '#08142c',
    bgEnd: '#020617',
    primaryColor: '#38bdf8',
    secondaryColor: '#ec4899',
    glowColor: '#6366f1',
    title: 'ORION STARS',
    subtitle: 'CELESTIAL REELS & ROULETTE',
    category: '777 SPACE ARCADE',
    badge: 'POPULAR',
    symbolKey: 'stars',
  },
  {
    filename: 'milky-way.png',
    bgStart: '#1e082b',
    bgEnd: '#0a0210',
    primaryColor: '#facc15',
    secondaryColor: '#a855f7',
    glowColor: '#eab308',
    title: 'MILKY WAY',
    subtitle: 'COSMIC CASINO MARQUEE',
    category: '777 RETRO SLOTS',
    badge: 'TOP WIN',
    symbolKey: 'galaxy',
  },
  {
    filename: 'juwa-2.png',
    bgStart: '#291206',
    bgEnd: '#100602',
    primaryColor: '#fbbf24',
    secondaryColor: '#ef4444',
    glowColor: '#f59e0b',
    title: 'JUWA 2.0',
    subtitle: 'IMPERIAL GOLD CABINET',
    category: 'FISH & KENO ROYALE',
    badge: 'UPDATED',
    symbolKey: 'temple',
  },
  {
    filename: 'panda-master.png',
    bgStart: '#062315',
    bgEnd: '#010f08',
    primaryColor: '#4ade80',
    secondaryColor: '#facc15',
    glowColor: '#22c55e',
    title: 'PANDA MASTER',
    subtitle: 'TREASURE DOJO POT OF GOLD',
    category: 'MARTIAL SLOTS',
    badge: 'HIGH RTP',
    symbolKey: 'panda',
  },
  {
    filename: 'ultra-panda.png',
    bgStart: '#180828',
    bgEnd: '#090214',
    primaryColor: '#2dd4bf',
    secondaryColor: '#f43f5e',
    glowColor: '#a855f7',
    title: 'ULTRA PANDA',
    subtitle: 'NEON CYBER FISH ARENA',
    category: 'ARCADE SHOOTER',
    badge: 'FEATURED',
    symbolKey: 'cyber_panda',
  },
  {
    filename: 'egame.png',
    bgStart: '#241a06',
    bgEnd: '#0d0901',
    primaryColor: '#facc15',
    secondaryColor: '#fb923c',
    glowColor: '#eab308',
    title: 'EGAME',
    subtitle: 'VIRTUAL LUXURY LOUNGE',
    category: 'ELECTRONIC CASINO',
    badge: 'VERIFIED',
    symbolKey: 'letter_e',
  },
  {
    filename: 'game-room.png',
    bgStart: '#20072b',
    bgEnd: '#0c0212',
    primaryColor: '#f43f5e',
    secondaryColor: '#38bdf8',
    glowColor: '#ec4899',
    title: 'GAME ROOM',
    subtitle: 'ONLINE DIAMOND ARCADE',
    category: 'VEGAS MULTI-PLAY',
    badge: 'CLASSIC',
    symbolKey: 'arcade',
  },
  {
    filename: 'vblink.png',
    bgStart: '#1d0a33',
    bgEnd: '#090214',
    primaryColor: '#c084fc',
    secondaryColor: '#38bdf8',
    glowColor: '#9333ea',
    title: 'VBLINK',
    subtitle: 'MIDNIGHT ILLUSION JACKPOT',
    category: 'NEON 777 SLOTS',
    badge: 'TRENDING',
    symbolKey: 'lightning',
  },
  {
    filename: 'vegas-sweeps.png',
    bgStart: '#270815',
    bgEnd: '#100208',
    primaryColor: '#fb7185',
    secondaryColor: '#facc15',
    glowColor: '#f43f5e',
    title: 'VEGAS SWEEPS',
    subtitle: 'FABULOUS STRIP DIAMOND',
    category: 'SWEEPSTAKES SLOTS',
    badge: 'TOP PICK',
    symbolKey: 'vegas_sign',
  },
  {
    filename: 'blue-dragon.png',
    bgStart: '#051b2c',
    bgEnd: '#010a12',
    primaryColor: '#38bdf8',
    secondaryColor: '#fbbf24',
    glowColor: '#0ea5e9',
    title: 'BLUE DRAGON',
    subtitle: '888 IMPERIAL OCEAN ARENA',
    category: 'DRAGON FISH GAME',
    badge: '888 LUCKY',
    symbolKey: 'dragon',
  },
  {
    filename: 'mafia.png',
    bgStart: '#18121a',
    bgEnd: '#08060a',
    primaryColor: '#e2e8f0',
    secondaryColor: '#dc2626',
    glowColor: '#ef4444',
    title: 'MAFIA',
    subtitle: 'UNDERWORLD HIGH STAKES',
    category: 'NOIR HEIST SLOTS',
    badge: 'VIP HIGH ROLLER',
    symbolKey: 'cards',
  },
  {
    filename: 'river-sweeps.png',
    bgStart: '#041d2f',
    bgEnd: '#010a12',
    primaryColor: '#06b6d4',
    secondaryColor: '#facc15',
    glowColor: '#0891b2',
    title: 'RIVER SWEEPS',
    subtitle: 'ELECTRIC SURGE JACKPOT',
    category: 'PRECISION ARCADE',
    badge: 'FAST PAY',
    symbolKey: 'river_r',
  },
  {
    filename: 'game-vault.png',
    bgStart: '#1c102b',
    bgEnd: '#090412',
    primaryColor: '#eab308',
    secondaryColor: '#c084fc',
    glowColor: '#f59e0b',
    title: 'GAME VAULT',
    subtitle: 'UNLOCK UNLIMITED GOLD',
    category: 'FORTRESS JACKPOT',
    badge: 'SECURE',
    symbolKey: 'vault',
  },
  {
    filename: 'cash-machine.png',
    bgStart: '#2d081f',
    bgEnd: '#12020b',
    primaryColor: '#4ade80',
    secondaryColor: '#f472b6',
    glowColor: '#10b981',
    title: 'CASH MACHINE',
    subtitle: 'DIRECT DOLLAR BILL SLOTS',
    category: 'INSTANT GREEN CASH',
    badge: '100X WIN',
    symbolKey: 'cash',
  },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSvg(game) {
  const bgStart = game.bgStart;
  const bgEnd = game.bgEnd;
  const primaryColor = game.primaryColor;
  const secondaryColor = game.secondaryColor;
  const glowColor = game.glowColor;
  const title = escapeXml(game.title);
  const subtitle = escapeXml(game.subtitle);
  const category = escapeXml(game.category);
  const badge = escapeXml(game.badge);
  const symbolMarkup = vectorSymbols[game.symbolKey] || vectorSymbols.crown;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
    <defs>
      <!-- Background radial & linear gradients -->
      <radialGradient id="bgGlow" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.45"/>
        <stop offset="55%" stop-color="${bgStart}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${bgEnd}" stop-opacity="1"/>
      </radialGradient>

      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb"/>
        <stop offset="25%" stop-color="${primaryColor}"/>
        <stop offset="50%" stop-color="#fef08a"/>
        <stop offset="75%" stop-color="${primaryColor}"/>
        <stop offset="100%" stop-color="#ca8a04"/>
      </linearGradient>

      <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#dc2626"/>
        <stop offset="50%" stop-color="#ea580c"/>
        <stop offset="100%" stop-color="#fef08a"/>
      </linearGradient>

      <linearGradient id="secGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${secondaryColor}"/>
        <stop offset="100%" stop-color="${primaryColor}"/>
      </linearGradient>

      <linearGradient id="bezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="25%" stop-color="${primaryColor}"/>
        <stop offset="50%" stop-color="#78350f"/>
        <stop offset="75%" stop-color="${primaryColor}"/>
        <stop offset="100%" stop-color="#fef08a"/>
      </linearGradient>

      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="12" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.9"/>
      </filter>
    </defs>

    <!-- Deep Background Canvas -->
    <rect width="800" height="800" fill="url(#bgGlow)"/>

    <!-- Geometric Sunburst Rays -->
    <g opacity="0.22">
      ${[...Array(24)]
        .map((_, i) => {
          const angle = (i * 360) / 24;
          return `<polygon points="400,400 370,0 430,0" transform="rotate(${angle} 400 400)" fill="${primaryColor}"/>`;
        })
        .join('')}
    </g>

    <!-- Glowing Marquee Frame -->
    <rect x="24" y="24" width="752" height="752" rx="36" fill="none" stroke="url(#bezelGrad)" stroke-width="8" filter="url(#shadow)"/>
    <rect x="36" y="36" width="728" height="728" rx="26" fill="none" stroke="#000000" stroke-width="4" opacity="0.7"/>

    <!-- Chaser Light Bulbs around border -->
    ${[...Array(16)]
      .map((_, i) => {
        const x = 70 + (i * 660) / 15;
        return `<circle cx="${x}" cy="48" r="5" fill="#fef08a" filter="url(#glow)"/>
                <circle cx="${x}" cy="752" r="5" fill="#fef08a" filter="url(#glow)"/>`;
      })
      .join('')}
    ${[...Array(14)]
      .map((_, i) => {
        const y = 80 + (i * 640) / 13;
        return `<circle cx="48" cy="${y}" r="5" fill="#fef08a" filter="url(#glow)"/>
                <circle cx="752" cy="${y}" r="5" fill="#fef08a" filter="url(#glow)"/>`;
      })
      .join('')}

    <!-- Top Badge Pill -->
    <g transform="translate(400, 105)">
      <rect x="-150" y="-22" width="300" height="44" rx="22" fill="#0b071a" stroke="url(#secGrad)" stroke-width="3" filter="url(#shadow)"/>
      <text x="0" y="7" fill="${primaryColor}" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="18" letter-spacing="3" text-anchor="middle">
        ★ ${badge} • ${category} ★
      </text>
    </g>

    <!-- Center Emblem Ring Frame -->
    <circle cx="400" cy="305" r="160" fill="${glowColor}" opacity="0.25" filter="url(#glow)"/>
    <circle cx="400" cy="305" r="130" fill="#0c071d" stroke="url(#bezelGrad)" stroke-width="6" filter="url(#shadow)"/>
    <circle cx="400" cy="305" r="112" fill="none" stroke="${secondaryColor}" stroke-dasharray="14 10" stroke-width="4" opacity="0.75"/>

    <!-- Pure Vector Symbol (NO EMOJIS, NO TOFU BOXES) -->
    <g id="centerSymbol">
      ${symbolMarkup}
    </g>

    <!-- Triple Lucky 777 Ribbon -->
    <g transform="translate(400, 465)">
      <rect x="-160" y="-18" width="320" height="36" rx="18" fill="url(#secGrad)" filter="url(#shadow)"/>
      <text x="0" y="8" fill="#0b071a" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="22" letter-spacing="8" text-anchor="middle">
        ★★★ 7 7 7 ★★★
      </text>
    </g>

    <!-- Main Embossed 3D Game Title -->
    <g transform="translate(400, 580)">
      <text x="0" y="8" fill="#000000" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="64" letter-spacing="3" text-anchor="middle" opacity="0.9">
        ${title}
      </text>
      <text x="0" y="4" fill="#78350f" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="64" letter-spacing="3" text-anchor="middle">
        ${title}
      </text>
      <text x="0" y="0" fill="url(#goldGrad)" stroke="#1c1917" stroke-width="3" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="64" letter-spacing="3" text-anchor="middle" filter="url(#glow)">
        ${title}
      </text>
    </g>

    <!-- Subtitle Banner -->
    <g transform="translate(400, 640)">
      <text x="0" y="0" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="22" letter-spacing="4" text-anchor="middle" filter="url(#shadow)">
        ${subtitle}
      </text>
    </g>

    <!-- Bottom Gold Coin Accents -->
    <g transform="translate(400, 705)">
      <circle cx="-180" cy="0" r="14" fill="#fbbf24" stroke="#78350f" stroke-width="2"/>
      <text x="-180" y="5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#78350f">$</text>

      <circle cx="-150" cy="4" r="16" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
      <text x="-150" y="10" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle" fill="#78350f">$</text>

      <rect x="-120" y="-14" width="240" height="28" rx="14" fill="#000000" opacity="0.8"/>
      <text x="0" y="5" fill="#facc15" font-family="'Arial Black', Impact, sans-serif" font-size="15" letter-spacing="3" text-anchor="middle">
        PLAY &amp; WIN REAL CASH
      </text>

      <circle cx="150" cy="4" r="16" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
      <text x="150" y="10" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle" fill="#78350f">$</text>

      <circle cx="180" cy="0" r="14" fill="#fbbf24" stroke="#78350f" stroke-width="2"/>
      <text x="180" y="5" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#78350f">$</text>
    </g>
  </svg>`;
}

console.log('Generating high-definition vector game logos without emojis...');

for (const game of games) {
  const svg = buildSvg(game);
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 800,
    },
  });
  const pngData = resvg.render().asPng();
  
  [outDir, distDir].forEach((dir) => {
    fs.writeFileSync(path.join(dir, game.filename), pngData);
  });
  console.log(`Generated: ${game.filename} (${(pngData.length / 1024).toFixed(1)} KB)`);

  if (game.filename === 'mega-win.png') {
    [outDir, distDir].forEach((dir) => {
      fs.writeFileSync(path.join(dir, 'Gemini_Generated_Image_2pe3972pe3972pe3.png'), pngData);
    });
  }
}

console.log('All 16 clean vector game logos written to public/games/ and dist/games/!');
