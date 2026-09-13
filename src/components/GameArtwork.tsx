import React, { useState, useEffect } from "react";
import { Game } from "../types";
import { useGameImage, saveGameImage } from "../services/imageStore";

interface GameArtworkProps {
  game: Game;
  isHovered?: boolean;
}

export const GameArtwork: React.FC<GameArtworkProps> = ({ game, isHovered = false }) => {
  const { title, accentColor, imageUrl, badge } = game;
  const storedSrc = useGameImage(game.id, imageUrl);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(storedSrc || imageUrl);
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const [isCardDropping, setIsCardDropping] = useState(false);

  useEffect(() => {
    if (storedSrc) {
      setCurrentSrc(storedSrc);
      setHasFailedAll(false);
      setImageLoaded(true);
    } else if (imageUrl) {
      setCurrentSrc(imageUrl);
      setHasFailedAll(false);
      setImageLoaded(true);
    }
  }, [storedSrc, imageUrl]);

  const handleImageError = () => {
    // If the image fails to load, show the stylized fallback badge
    setHasFailedAll(true);
    setImageLoaded(false);
  };

  const handleCardDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCardDropping(false);
    if (e.dataTransfer?.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async () => {
          await saveGameImage(game.id, reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div
      id={`game-artwork-${game.id}`}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCardDropping(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCardDropping(false);
      }}
      onDrop={handleCardDrop}
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${game.bgGradient} flex items-center justify-center select-none ${
        isCardDropping ? "ring-4 ring-amber-400" : ""
      }`}
    >
      {/* Dynamic Ambient Color Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 z-10"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accentColor}33 0%, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0.4,
        }}
      />

      {/* Primary Game Image */}
      {currentSrc && !hasFailedAll && (
        <img
          src={currentSrc}
          alt={`${title} arcade game logo`}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${
            isHovered ? "scale-105 brightness-105 contrast-105" : "scale-100 brightness-100"
          }`}
        />
      )}

      {/* Subtle bottom vignette for badge legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent z-10 pointer-events-none" />

      {/* Center 3D Brand Badge - shown ONLY when image completely fails to load */}
      {hasFailedAll && (
        <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center pointer-events-none transition-opacity duration-300">
          <div
            className="absolute w-28 h-14 rounded-full blur-xl pointer-events-none -z-10 transition-transform duration-300"
            style={{
              backgroundColor: accentColor,
              opacity: isHovered ? 0.9 : 0.5,
              transform: isHovered ? "scale(1.4)" : "scale(1)",
            }}
          />

          {/* Embossed Title */}
          <span className="font-display font-black text-lg md:text-xl tracking-wide uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
            {title}
          </span>

          <span className="mt-0.5 text-[10px] font-bold tracking-widest text-amber-300/90 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            {game.category.includes("fish") ? "FISH ARCADE" : "MEGA SLOTS"}
          </span>
        </div>
      )}

      {/* Bottom Status Overlay */}
      <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
        <span className="text-[10px] font-semibold text-slate-300 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 shadow-sm flex items-center gap-1">
          <span className="text-amber-400 text-[11px]">★</span>
          {game.playersCount}
        </span>

        {badge && (
          <span className="text-[9px] font-black uppercase tracking-wider text-amber-200 bg-amber-500/30 backdrop-blur-md px-1.5 py-0.5 rounded border border-amber-400/40">
            {badge}
          </span>
        )}
      </div>

      {/* Hover Neon Highlight Border with Shimmer */}
      <div
        className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-300 rounded-lg ${
          isHovered ? "opacity-100 ring-2 ring-inset ring-amber-400/80 animate-shimmer" : "opacity-0"
        }`}
      />

      {/* Floating 3D Coin Badge on Hover */}
      <div
        className={`absolute top-2 right-2 z-30 transition-all duration-300 transform ${
          isHovered ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/50 animate-coin-spin">
          <div className="w-full h-full bg-[#18112e] rounded-full flex items-center justify-center text-[10px] text-amber-300 font-black">
            $
          </div>
        </div>
      </div>
    </div>
  );
};
