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
}

export const FloatingCoinsBackground: React.FC = () => {
  // Balanced set of 8 ambient coins with GPU accelerated transform animations
  const coins: CoinParticle[] = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.round((i * 12 + 6) % 94),
      top: Math.round((i * 18 + 8) % 90),
      size: Math.round(20 + (i % 3) * 10),
      duration: Math.round(9 + (i % 3) * 3),
      delay: Number(((i * 0.7) % 3).toFixed(1)),
      rotationSpeed: Number((3 + (i % 3) * 1.5).toFixed(1)),
      opacity: Number((0.15 + (i % 2) * 0.08).toFixed(2)),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transform-gpu">
      {/* Shared defs to eliminate repeated SVG overhead */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="global-coin-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <radialGradient id="global-coin-inner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
        </defs>
      </svg>

      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute transform-gpu"
          style={{
            left: `${coin.left}%`,
            top: `${coin.top}%`,
            opacity: coin.opacity,
            animation: `floatAmbient ${coin.duration}s infinite ease-in-out ${coin.delay}s`,
          }}
        >
          {/* 3D Spinning Golden Coin SVG */}
          <div
            className="animate-coin-spin inline-block drop-shadow-[0_0_6px_rgba(245,158,11,0.3)] transform-gpu"
            style={{
              width: `${coin.size}px`,
              height: `${coin.size}px`,
              animationDuration: `${coin.rotationSpeed}s`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="46" fill="url(#global-coin-outer)" stroke="#fbbf24" strokeWidth="2" />
              <circle cx="50" cy="50" r="37" fill="url(#global-coin-inner)" stroke="#78350f" strokeWidth="1.5" />
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
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(12px, -24px, 0);
          }
        }
      `}</style>
    </div>
  );
};
