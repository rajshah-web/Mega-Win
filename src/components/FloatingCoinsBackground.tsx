import React, { useMemo } from "react";

interface CoinParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingCoinsBackground: React.FC = React.memo(() => {
  // Ultra-lightweight ambient golden ambient accents (isolated GPU composited plane)
  const coins: CoinParticle[] = useMemo(() => {
    return [
      { id: 1, left: 6, top: 12, size: 26, duration: 11, delay: 0, opacity: 0.18 },
      { id: 2, left: 88, top: 22, size: 32, duration: 13, delay: 1.5, opacity: 0.2 },
      { id: 3, left: 14, top: 48, size: 24, duration: 10, delay: 0.8, opacity: 0.16 },
      { id: 4, left: 92, top: 65, size: 30, duration: 12, delay: 2.2, opacity: 0.18 },
      { id: 5, left: 8, top: 82, size: 28, duration: 14, delay: 1.2, opacity: 0.16 },
    ];
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none contain-strict"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
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
          className="absolute"
          style={{
            left: `${coin.left}%`,
            top: `${coin.top}%`,
            opacity: coin.opacity,
            animation: `floatAmbient ${coin.duration}s infinite ease-in-out ${coin.delay}s`,
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <div
            style={{
              width: `${coin.size}px`,
              height: `${coin.size}px`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
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
            transform: translate3d(8px, -18px, 0);
          }
        }
      `}</style>
    </div>
  );
});
