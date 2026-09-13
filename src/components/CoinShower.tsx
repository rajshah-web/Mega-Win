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
      // Generate 45 bursting coins
      const newCoins: ShowerCoin[] = Array.from({ length: 48 }, (_, i) => {
        const startX = 50 + (Math.random() * 20 - 10); // Center burst origin
        const startY = 85;
        const destX = Math.random() * 96 + 2; // Spread across 2% to 98% width
        const destY = Math.random() * 35 + 5; // Arch up to top 5-40% height
        const size = Math.floor(Math.random() * 22 + 20); // 20px - 42px
        const rotation = Math.floor(Math.random() * 720 - 360);
        const duration = Number((1.2 + Math.random() * 1.2).toFixed(2));
        const delay = Number((Math.random() * 0.4).toFixed(2));

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
      }, 3500);

      return () => clearTimeout(timer);
    };

    window.addEventListener("megawins-win-celebration", handleTrigger);
    return () => {
      window.removeEventListener("megawins-win-celebration", handleTrigger);
    };
  }, []);

  if (!active || coins.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {coins.map((c) => (
        <div
          key={c.id}
          className="absolute"
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
          <div className="animate-coin-spin w-full h-full drop-shadow-[0_4px_12px_rgba(245,158,11,0.7)]">
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
            transform: translate(0, 0) scale(0.3) rotate(0deg);
            opacity: 1;
          }
          45% {
            transform: translate(var(--dest-x), var(--dest-y)) scale(1.2) rotate(var(--rot));
            opacity: 1;
          }
          100% {
            transform: translate(var(--dest-x), 110vh) scale(0.9) rotate(calc(var(--rot) * 2));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
