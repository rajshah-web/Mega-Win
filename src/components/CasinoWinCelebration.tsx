import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Volume2, X, ExternalLink, Flame } from "lucide-react";
import { CONFIG } from "../config";
import { casinoAudio } from "../utils/casinoAudio";
import { useGameImage } from "../services/imageStore";
import { EMBEDDED_GAME_LOGOS } from "../data/embeddedLogos";

export const CasinoWinCelebration: React.FC = () => {
  const [active, setActive] = useState(false);
  const [gameTitle, setGameTitle] = useState("Fire Kirin");
  const [winAmount, setWinAmount] = useState(4850);
  const megaWinImg = useGameImage("mega-win", CONFIG.MEGA_WIN_IMAGE_URL || "/games/mega-win.png");
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleCelebration = (e: Event) => {
      const customEvent = e as CustomEvent<{ gameName?: string }>;
      const name = customEvent.detail?.gameName || "MegaWins Game";
      setGameTitle(name);

      // Random exciting win amount
      const amounts = [3250, 4850, 6200, 7850, 9400, 12500];
      const randomWin = amounts[Math.floor(Math.random() * amounts.length)];
      setWinAmount(randomWin);

      setActive(true);
    };

    window.addEventListener("megawins-win-celebration", handleCelebration);
    return () => {
      window.removeEventListener("megawins-win-celebration", handleCelebration);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Falling Gold Coins Animation Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl select-none animate-bounce"
            style={{
              left: `${(i * 6.2).toFixed(1)}%`,
              top: `${(Math.sin(i) * 20 + 20).toFixed(1)}%`,
              animationDuration: `${1 + (i % 3) * 0.4}s`,
              animationDelay: `${(i * 0.08).toFixed(2)}s`,
            }}
          >
            🪙
          </div>
        ))}
      </div>

      {/* Celebration Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#21183c] via-[#141026] to-[#0d0918] border-2 border-amber-400/80 p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.4)] animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setActive(false)}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close celebration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Custom Mega Win Image or Trophy Icon with Glowing Rings */}
        <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping opacity-75" />
          <img
            src={(!imgError && megaWinImg) || EMBEDDED_GAME_LOGOS["mega-win"] || CONFIG.MEGA_WIN_IMAGE_URL || "/games/mega-win.webp"}
            alt="Mega Win"
            loading="lazy"
            decoding="async"
            onError={() => {
              if (!imgError && EMBEDDED_GAME_LOGOS["mega-win"]) {
                setImgError(true);
              }
            }}
            className="relative w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
          />
        </div>

        {/* Win Banner Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          JACKPOT WIN ALERT
        </div>

        <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
          YOU HIT A WIN!
        </h3>

        {/* Animated Win Amount */}
        <div className="my-3 py-2 bg-black/40 rounded-2xl border border-amber-500/30">
          <span className="font-display font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
            +${winAmount.toLocaleString()}
          </span>
          <span className="block text-xs font-semibold text-amber-300/80 uppercase tracking-widest mt-1">
            {gameTitle} Credits Added
          </span>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
          Loading game room on Telegram! Play real sweepstakes arcades and claim your welcome credit bonus now.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => casinoAudio.playCasinoWinningSound()}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Replay Win Sound</span>
          </button>

          <a
            href={CONFIG.TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setActive(false)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/40 hover:opacity-95 transition-opacity"
          >
            <span>Open Room</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
