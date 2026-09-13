import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Flame, Play, Volume2, RotateCcw } from "lucide-react";
import { handlePlayRedirect } from "../config";
import { casinoAudio } from "../utils/casinoAudio";

interface SymbolItem {
  id: string;
  char: string;
  name: string;
  payout: string;
  color: string;
}

const SYMBOLS: SymbolItem[] = [
  { id: "seven", char: "7️⃣", name: "Lucky 7", payout: "5,000x", color: "#f43f5e" },
  { id: "diamond", char: "💎", name: "Diamond", payout: "2,500x", color: "#38bdf8" },
  { id: "crown", char: "👑", name: "Royal Crown", payout: "1,000x", color: "#fbbf24" },
  { id: "coin", char: "🪙", name: "Gold Coin", payout: "500x", color: "#eab308" },
  { id: "bell", char: "🔔", name: "Golden Bell", payout: "300x", color: "#f59e0b" },
  { id: "cherry", char: "🍒", name: "Wild Cherry", payout: "150x", color: "#ef4444" },
  { id: "star", char: "⭐", name: "Cosmic Star", payout: "100x", color: "#a855f7" },
];

export const SlotMachineWidget: React.FC = () => {
  const [reels, setReels] = useState<SymbolItem[]>([SYMBOLS[0], SYMBOLS[0], SYMBOLS[0]]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winAnnouncement, setWinAnnouncement] = useState<string | null>("HIT 7-7-7 FOR 5,000X JACKPOT!");
  const [winCredits, setWinCredits] = useState<number | null>(7770);
  const [leverPulled, setLeverPulled] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const spinReels = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLeverPulled(true);
    setWinAnnouncement(null);
    setWinCredits(null);

    // Audio effect: rapid clicks & reel spinning
    casinoAudio.playSpinEffect();

    // Sound effect interval during spin
    const spinSoundInterval = setInterval(() => {
      casinoAudio.playSpinEffect();
    }, 280);

    // Lever spring back
    setTimeout(() => setLeverPulled(false), 300);

    // Progressive reel stopping
    // Reel 1 stops at 1.0s, Reel 2 at 1.4s, Reel 3 at 1.8s
    setTimeout(() => {
      // Pick exciting winning combination (mostly 7-7-7, 💎-💎-💎, or 👑-👑-👑)
      const winningCombos = [
        [SYMBOLS[0], SYMBOLS[0], SYMBOLS[0]], // 7-7-7 Jackpot
        [SYMBOLS[1], SYMBOLS[1], SYMBOLS[1]], // 💎-💎-💎 Diamond Rush
        [SYMBOLS[2], SYMBOLS[2], SYMBOLS[2]], // 👑-👑-👑 Royal Win
        [SYMBOLS[3], SYMBOLS[3], SYMBOLS[3]], // 🪙-🪙-🪙 Gold Vault
      ];
      const outcome = winningCombos[spinCount % winningCombos.length];

      clearInterval(spinSoundInterval);
      setReels(outcome);
      setIsSpinning(false);
      setSpinCount((prev) => prev + 1);

      // Trigger Grand Casino Winning Sound & Celebratory Effects
      casinoAudio.playCasinoWinningSound();

      // Trigger Global Coin Shower & Event
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("megawins-win-celebration", {
            detail: { gameName: "MegaWins Slot Machine 777" },
          })
        );
      }

      setWinAnnouncement(`MEGA JACKPOT HIT! ${outcome[0].name.toUpperCase()} TRIPLE MATCH`);
      setWinCredits(12500);
    }, 1800);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 select-none">
      {/* Slot Machine Outer Cabinet */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#2a1b4e] via-[#17122e] to-[#0c0a18] p-1.5 sm:p-2 border-4 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.35)] animate-jackpot-glow">
        {/* Marquee Chaser Bulbs along the top rim */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0e0a1f] rounded-t-[20px] border-b border-amber-500/40">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full border border-amber-300 ${
                  i % 2 === 0
                    ? "bg-amber-400 animate-chaser-odd"
                    : "bg-yellow-200 animate-chaser-even"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="font-display font-black text-xs sm:text-sm tracking-widest text-amber-300 uppercase drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
              LUCKY 777 SPIN TERMINAL
            </span>
            <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
          </div>

          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full border border-amber-300 ${
                  i % 2 === 0
                    ? "bg-yellow-200 animate-chaser-even"
                    : "bg-amber-400 animate-chaser-odd"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Machine Main Body */}
        <div className="relative p-4 sm:p-8 bg-gradient-to-b from-[#18112e] to-[#0d0918] rounded-b-[20px] overflow-hidden">
          {/* Top Marquee Screen Display */}
          <div className="mb-6 p-3 sm:p-4 rounded-xl bg-[#090613] border-2 border-purple-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center shadow-md shadow-amber-500/40 animate-coin-spin">
                <Trophy className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                  Current Round Status
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-300 font-display tracking-wide animate-pulse">
                  {winAnnouncement || "SPINNING REELS... GOOD LUCK!"}
                </span>
              </div>
            </div>

            {winCredits && (
              <div className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-black text-sm sm:text-base flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                <span>+${winCredits.toLocaleString()} COINS</span>
              </div>
            )}
          </div>

          {/* 3 Slot Reels Display Window */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-6 bg-[#080512] rounded-2xl border-4 border-amber-500/60 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] relative overflow-hidden">
            {/* Horizontal Payline Visual Marker */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent z-20 pointer-events-none opacity-80" />
            <div className="absolute left-1 top-1/2 -translate-y-1/2 text-rose-400 font-black text-[10px] z-20 pointer-events-none">
              ▶
            </div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-rose-400 font-black text-[10px] z-20 pointer-events-none">
              ◀
            </div>

            {reels.map((symbol, idx) => (
              <div
                key={idx}
                className={`relative aspect-[3/4] sm:aspect-square rounded-xl bg-gradient-to-b from-slate-900 via-[#1b1536] to-slate-900 border-2 border-purple-500/40 flex flex-col items-center justify-center p-2 sm:p-4 shadow-xl overflow-hidden ${
                  isSpinning ? "animate-reel-spin" : ""
                }`}
              >
                {/* Reel glass reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/60 pointer-events-none" />

                {/* Symbol Character */}
                <span className="text-4xl sm:text-6xl md:text-7xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] transform hover:scale-110 transition-transform">
                  {symbol.char}
                </span>

                {/* Symbol Name & Payout */}
                <span className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-200">
                  {symbol.name}
                </span>
                <span className="text-[9px] font-bold text-amber-400">
                  {symbol.payout}
                </span>

                {/* Winning Highlight Glow */}
                {!isSpinning && winCredits && (
                  <div className="absolute inset-0 border-2 border-amber-400 rounded-xl bg-amber-400/10 animate-pulse pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Machine Controls & Lever */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Payout Table Mini Quick Glance */}
            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
              <span className="text-amber-400 flex items-center gap-1">
                7️⃣7️⃣7️⃣ = 5,000x
              </span>
              <span>•</span>
              <span className="text-cyan-400 flex items-center gap-1">
                💎💎💎 = 2,500x
              </span>
              <span>•</span>
              <span className="text-yellow-400 flex items-center gap-1">
                👑👑👑 = 1,000x
              </span>
            </div>

            {/* Action Buttons: Spin & Claim */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={spinReels}
                disabled={isSpinning}
                className={`flex-1 sm:flex-none relative px-8 py-3.5 rounded-full font-display font-black text-base text-slate-950 uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  isSpinning
                    ? "bg-slate-600 opacity-70 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:scale-105 active:scale-95 shadow-amber-500/40 animate-shimmer"
                }`}
              >
                <RotateCcw className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`} />
                <span>{isSpinning ? "SPINNING..." : "SPIN FREE"}</span>
              </button>

              <button
                onClick={() => handlePlayRedirect("Slot Terminal Claim")}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 hover:scale-102 transition-all cursor-pointer"
              >
                <span>CLAIM BONUS</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
