import React, { useMemo } from "react";

interface CoinParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  rotationSpeed: number;
  opacity: number;
  driftX: number;
}

export const FloatingCoinsBackground: React.FC = () => {
  // Generate deterministic floating coins across the background
  const coins: CoinParticle[] = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.round((i * 4.7 + 3) % 96),
      top: Math.round((i * 7.3 + 5) % 92),
      size: Math.round(18 + (i % 5) * 8), // 18px to 50px
      duration: Math.round(7 + (i % 6) * 2.5), // 7s to 19s float cycle
      delay: Number(((i * 0.4) % 4).toFixed(1)),
      rotationSpeed: Number((2 + (i % 4) * 0.8).toFixed(1)),
      opacity: Number((0.15 + (i % 4) * 0.08).toFixed(2)),
      driftX: (i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 10),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute will-change-transform"
          style={{
            left: `${coin.left}%`,
            top: `${coin.top}%`,
            opacity: coin.opacity,
            animation: `floatAmbient ${coin.duration}s infinite ease-in-out ${coin.delay}s`,
          }}
        >
          {/* 3D Spinning Golden Coin SVG */}
          <div
            className="animate-coin-spin inline-block drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
            style={{
              width: `${coin.size}px`,
              height: `${coin.size}px`,
              animationDuration: `${coin.rotationSpeed}s`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id={`coin-outer-${coin.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="30%" stopColor="#f59e0b" />
                  <stop offset="70%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>
                <radialGradient id={`coin-inner-${coin.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef9c3" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#78350f" />
                </radialGradient>
              </defs>
              {/* Outer Coin Rim */}
              <circle cx="50" cy="50" r="46" fill={`url(#coin-outer-${coin.id})`} stroke="#fbbf24" strokeWidth="2" />
              {/* Inner Rim */}
              <circle cx="50" cy="50" r="37" fill={`url(#coin-inner-${coin.id})`} stroke="#78350f" strokeWidth="1.5" />
              {/* Star / Dollar symbol */}
              <path
                d="M50 24 L56 38 L72 40 L60 52 L64 68 L50 60 L36 68 L40 52 L28 40 L44 38 Z"
                fill="#fef08a"
                opacity="0.9"
                stroke="#b45309"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes floatAmbient {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-28px) translateX(14px);
          }
        }
      `}</style>
    </div>
  );
};
