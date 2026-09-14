import React, { useState } from "react";
import { Game } from "../types";
import { useGameImage } from "../services/imageStore";
import { EMBEDDED_GAME_LOGOS } from "../data/embeddedLogos";

interface GameArtworkProps {
  game: Game;
  isHovered?: boolean;
  priority?: boolean;
}

export const GameArtwork: React.FC<GameArtworkProps> = ({ game, isHovered = false, priority = false }) => {
  const { title, accentColor, imageUrl, badge } = game;
  const embeddedDataUri = EMBEDDED_GAME_LOGOS[game.id];
  const dynamicSrc = useGameImage(game.id, embeddedDataUri || imageUrl);
  const [imgError, setImgError] = useState(false);

  // Use dynamic source or embedded data URI, guaranteeing image visibility
  const imageSource = (!imgError && (dynamicSrc || embeddedDataUri || imageUrl)) || embeddedDataUri || imageUrl;

  return (
    <div
      id={`game-artwork-${game.id}`}
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${game.bgGradient} flex items-center justify-center select-none transform-gpu`}
    >
      {/* Dynamic Ambient Color Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accentColor}33 0%, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0.4,
        }}
      />

      {/* Primary Game Image */}
      {imageSource ? (
        <img
          src={imageSource}
          alt={`${title} arcade game logo`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            if (!imgError && embeddedDataUri && imageSource !== embeddedDataUri) {
              setImgError(true);
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out will-change-transform ${
            isHovered ? "scale-105 brightness-105 contrast-105" : "scale-100 brightness-100"
          }`}
        />
      ) : null}

      {/* Subtle bottom vignette for badge legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent z-10 pointer-events-none" />

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
        className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-200 rounded-lg ${
          isHovered ? "opacity-100 ring-2 ring-inset ring-amber-400/80" : "opacity-0"
        }`}
      />

      {/* Floating 3D Coin Badge on Hover */}
      <div
        className={`absolute top-2 right-2 z-30 transition-all duration-200 transform-gpu ${
          isHovered ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/50">
          <div className="w-full h-full bg-[#18112e] rounded-full flex items-center justify-center text-[10px] text-amber-300 font-black">
            $
          </div>
        </div>
      </div>
    </div>
  );
};
