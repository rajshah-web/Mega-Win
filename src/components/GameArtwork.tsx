import React, { useState } from "react";
import { Game } from "../types";

interface GameArtworkProps {
  game: Game;
  isHovered?: boolean;
}

export const GameArtwork: React.FC<GameArtworkProps> = ({ game, isHovered = false }) => {
  const { title, accentColor, imageUrl, badge } = game;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      id={`game-artwork-${game.id}`}
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${game.bgGradient} flex items-center justify-center select-none`}
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
      {imageUrl && !imageError && (
        <img
          src={imageUrl}
          alt={`${title} arcade game thumbnail`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? "scale-110 brightness-110 contrast-105" : "scale-100 brightness-95"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Cinematic Vignette & Gradient Overlays for High-End Arcade Finish */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[at_center_center] from-transparent via-transparent to-black/70 z-10 pointer-events-none" />

      {/* Micro Arcade Grid Pattern for authentic sweeps terminal texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_14px] z-10 pointer-events-none opacity-40" />

      {/* Game Center 3D Brand Badge - Styled like FiestaSweeps arcade marques */}
      <div className="relative z-20 flex flex-col items-center justify-center p-3 text-center pointer-events-none">
        {/* Glowing Halo behind title */}
        <div
          className="absolute w-24 h-12 rounded-full blur-xl pointer-events-none -z-10 transition-transform duration-300"
          style={{
            backgroundColor: accentColor,
            opacity: isHovered ? 0.9 : 0.5,
            transform: isHovered ? "scale(1.4)" : "scale(1)",
          }}
        />

        {/* Embossed 3D Title */}
        <span className="font-display font-black text-lg md:text-xl tracking-wide uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] text-stroke-sm">
          {title}
        </span>

        <span className="mt-0.5 text-[10px] font-bold tracking-widest text-amber-300/90 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          {game.category.includes("fish") ? "FISH ARCADE" : "MEGA SLOTS"}
        </span>
      </div>

      {/* Bottom Status Overlay */}
      <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
        <span className="text-[10px] font-semibold text-slate-300 bg-black/65 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 shadow-sm flex items-center gap-1">
          <span className="text-amber-400 text-[11px]">★</span>
          {game.playersCount}
        </span>

        {badge && (
          <span className="text-[9px] font-black uppercase tracking-wider text-amber-200 bg-amber-500/20 backdrop-blur-md px-1.5 py-0.5 rounded border border-amber-400/30">
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
