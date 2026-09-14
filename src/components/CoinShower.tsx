import React, { useState, useEffect } from "react";

interface ShowerCoin {
  id: number;
  startX: number;
  startY: number;
  destX: number;
  destY: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
}

export const CoinShower: React.FC = () => {
  const [active, setActive] = useState(false);
  const [coins, setCoins] = useState<ShowerCoin[]>([]);

  useEffect(() => {
    const handleTrigger = () => {
      // 24 smooth GPU coins (instant, butter-smooth 60fps burst)
      const newCoins: ShowerCoin[] = Array.from({ length: 24 }, (_, i) => {
        const startX = 50 + (Math.random() * 16 - 8);
        const startY = 85;
        const destX = Math.random() * 92 + 4;
        const destY = Math.random() * 35 + 5;
        const size = Math.floor(Math.random() * 16 + 22); // 22px - 38px
        const rotation = Math.floor(Math.random() * 360 - 180);
        const duration = Number((1.2 + Math.random() * 0.8).toFixed(2));
        const delay = Number((Math.random() * 0.25).toFixed(2));

        return {
          id: Date.now() + i,
          startX,
          startY,
          destX,
          destY,
          size,
          rotation,
          duration,
          delay,
        };
      });

      setCoins(newCoins);
      setActive(true);

      const timer = setTimeout(() => {
        setActive(false);
        setCoins([]);
      }, 3000);

      return () => clearTimeout(timer);
    };

    window.addEventListener("megawins-win-celebration", handleTrigger);
    return () => {
      window.removeEventListener("megawins-win-celebration", handleTrigger);
    };
  }, []);

  if (!active || coins.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none transform-gpu">
      {coins.map((c) => (
        <div
          key={c.id}
          className="absolute transform-gpu"
          style={{
            left: `${c.startX}%`,
            top: `${c.startY}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            animation: `coinBurst ${c.duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards ${c.delay}s`,
            ["--dest-x" as string]: `${c.destX - c.startX}vw`,
            ["--dest-y" as string]: `${c.destY - c.startY}vh`,
            ["--rot" as string]: `${c.rotation}deg`,
          }}
        >
          {/* Tumbling 3D Gold Coin SVG */}
          <div className="animate-coin-spin w-full h-full drop-shadow-[0_4px_10px_rgba(245,158,11,0.6)] transform-gpu">
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <circle cx="30" cy="30" r="28" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
              <circle cx="30" cy="30" r="22" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
              <text
                x="30"
                y="38"
                textAnchor="middle"
                fill="#fef08a"
                fontSize="24"
                fontWeight="900"
                fontFamily="sans-serif"
              >
                $
              </text>
            </svg>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes coinBurst {
          0% {
            transform: translate3d(0, 0, 0) scale(0.3) rotate(0deg);
            opacity: 1;
          }
          45% {
            transform: translate3d(var(--dest-x), var(--dest-y), 0) scale(1.15) rotate(var(--rot));
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--dest-x), 110vh, 0) scale(0.9) rotate(calc(var(--rot) * 2));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
