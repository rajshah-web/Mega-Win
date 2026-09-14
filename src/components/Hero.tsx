import React, { useState, useEffect } from "react";
import { Play, Flame, Sparkles, Trophy, ChevronRight, Layers } from "lucide-react";
import { CONFIG, handlePlayRedirect } from "../config";
import { GAMES_DATA } from "../data/games";
import { GameArtwork } from "./GameArtwork";

export const Hero: React.FC = () => {
  // Live ticking jackpot counter for authentic casino excitement
  const [jackpot, setJackpot] = useState(CONFIG.INITIAL_JACKPOT);

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot((prev) => {
        const increment = Math.floor(Math.random() * 85 + 15) / 100;
        return Number((prev + increment).toFixed(2));
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const featuredGames = GAMES_DATA.slice(0, 6);

  const formattedJackpot = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(jackpot);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-purple-700/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, CTAs, and Live Mega Jackpot */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>16 Premium Platforms</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
                No.1 Free-to-Play <br />
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                  Social Casino
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed pt-2">
                Play Fire Kirin, Orion Stars, Milky Way & 12 more premium platforms. 500+ games, instant load, no purchase necessary.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => handlePlayRedirect("Hero Start Playing")}
                className="group relative px-8 py-3.5 text-base font-bold text-white rounded-full overflow-hidden shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 cursor-pointer flex items-center gap-3"
              >
                <span>Start Playing</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("games");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 text-base font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2 group"
              >
                <span>Browse Games</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* LIVE MEGA JACKPOT Card with Chaser Bulbs & Animated Coin Accents */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1c1435] to-[#100d1d] border-2 border-amber-500/50 p-5 shadow-[0_0_35px_rgba(245,158,11,0.25)] group hover:border-amber-400 transition-all animate-jackpot-glow">
              {/* Marquee Chaser Bulbs along the top rim */}
              <div className="flex justify-between items-center px-1 pb-3 -mt-1 border-b border-amber-500/30 mb-3">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i % 2 === 0 ? "bg-amber-400 animate-chaser-odd" : "bg-yellow-200 animate-chaser-even"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-300 uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  LIVE MEGA JACKPOT
                </div>
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i % 2 === 0 ? "bg-yellow-200 animate-chaser-even" : "bg-amber-400 animate-chaser-odd"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center shadow-lg shadow-amber-500/40 animate-coin-spin shrink-0">
                    <span className="text-slate-950 font-black text-sm">$</span>
                  </div>
                  <span className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 tracking-tight drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                    {formattedJackpot}
                  </span>
                </div>

                <button
                  onClick={() => handlePlayRedirect("Mega Jackpot Hit")}
                  className="px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-500/30 hover:from-amber-500/40 hover:to-yellow-500/40 border border-amber-400 text-amber-200 text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-amber-500/20 w-fit animate-shimmer cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>Win Sound Alert</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 font-medium pt-1">
                Active on: <span className="text-slate-300">Fire Kirin • Ultra Panda • Mega Win • Milky Way</span>
              </p>
            </div>
          </div>

          {/* Right Column: Top Games Showcase Grid (Matching FiestaSweeps Hero) */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Outer soft glow border container */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 p-3 rounded-2xl bg-[#120e24]/70 border border-purple-900/40 backdrop-blur-sm shadow-2xl">
                {featuredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handlePlayRedirect(game.title)}
                    className="group relative flex flex-col rounded-xl overflow-hidden bg-[#18142b] border border-purple-900/30 hover:border-purple-500/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/60 cursor-pointer"
                  >
                    {/* Badge */}
                    {game.badge && (
                      <div className="absolute top-2 left-2 z-20">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${game.badgeColor} text-white shadow-md shadow-black/60`}
                        >
                          {game.badge}
                        </span>
                      </div>
                    )}

                    {/* Artwork Container with Aspect Ratio */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <GameArtwork game={game} priority={true} />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 shadow-lg shadow-purple-600/50 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-200">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="p-2.5 bg-[#141124] flex items-center justify-between border-t border-white/5">
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                          {game.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {game.playersCount}
                        </span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-purple-900/40 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Callout */}
              <div className="mt-3 flex items-center justify-between px-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Instant play on all desktop, iOS & Android browsers
                </span>
                <button
                  onClick={() => handlePlayRedirect("Hero View All")}
                  className="text-purple-400 hover:text-purple-300 font-semibold hover:underline flex items-center gap-0.5"
                >
                  Join Room <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
