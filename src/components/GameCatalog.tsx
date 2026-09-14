import React, { useState, useMemo } from "react";
import { Search, Play, Sparkles, Filter, ExternalLink, Flame } from "lucide-react";
import { GameCategory, Game } from "../types";
import { GAMES_DATA } from "../data/games";
import { handlePlayRedirect } from "../config";
import { GameArtwork } from "./GameArtwork";

const CATEGORIES: { id: GameCategory; label: string }[] = [
  { id: "all", label: "All Games" },
  { id: "fish", label: "Fish Games" },
  { id: "slots", label: "Slots" },
  { id: "keno", label: "Keno" },
  { id: "cards", label: "Card Games" },
  { id: "jackpot", label: "Jackpots" },
];

export const GameCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredGameId, setHoveredGameId] = useState<string | null>(null);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const matchesCategory =
        selectedCategory === "all" || game.category.includes(selectedCategory);
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="games" className="py-20 bg-[#0b0914] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-purple-900/20">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              All Platforms
              <span className="text-sm font-semibold text-purple-400 bg-purple-950/70 border border-purple-800/40 px-3 py-1 rounded-full">
                {filteredGames.length} Available
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Browse our complete collection of licensed sweepstakes arcades and slots.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search platform or game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#141026] border border-purple-900/30 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs matching the video */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                    : "bg-[#141026] text-slate-300 hover:text-white hover:bg-[#1b1535] border border-purple-900/30"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Game Cards Grid */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-16 bg-[#120e24] rounded-2xl border border-purple-900/30 my-6">
            <p className="text-slate-400 text-base">No games found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 text-sm font-semibold text-purple-400 hover:text-purple-300 underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {filteredGames.map((game, idx) => {
              const isHovered = hoveredGameId === game.id;
              return (
                <div
                  key={game.id}
                  onMouseEnter={() => setHoveredGameId(game.id)}
                  onMouseLeave={() => setHoveredGameId(null)}
                  onClick={() => handlePlayRedirect(game.title)}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#141026] border border-purple-900/30 hover:border-purple-500 transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/60 cursor-pointer game-card-contain"
                >
                  {/* Badge */}
                  {game.badge && (
                    <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r ${game.badgeColor} text-white shadow-md shadow-black/80 flex items-center gap-1`}
                      >
                        {game.badge === "HOT" && <Flame className="w-2.5 h-2.5 fill-white" />}
                        {game.badge === "JACKPOT" && <Sparkles className="w-2.5 h-2.5" />}
                        {game.badge}
                      </span>
                    </div>
                  )}

                  {/* Artwork Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <GameArtwork game={game} isHovered={isHovered} priority={idx < 4} />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-purple-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-fuchsia-500 shadow-xl shadow-purple-600/60 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-150">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-3.5 bg-[#120e24] flex items-center justify-between border-t border-white/5">
                    <div className="truncate pr-2">
                      <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-purple-300 transition-colors truncate">
                        {game.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[11px] text-slate-400 truncate">
                          {game.playersCount}
                        </span>
                      </div>
                    </div>

                    {/* Play trigger button */}
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 group-hover:bg-purple-600 flex items-center justify-center text-purple-300 group-hover:text-white transition-all shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Telegram Direct Play Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#181233] to-indigo-950/60 border border-purple-800/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-black text-xl text-white">
              Want instant access or custom coin loads?
            </h4>
            <p className="text-slate-300 text-sm">
              Connect directly with our 24/7 Everest gaming room team on Telegram.
            </p>
          </div>
          <button
            onClick={() => handlePlayRedirect("Catalog Banner")}
            className="px-7 py-3 rounded-full bg-white text-purple-950 font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg shadow-white/10 shrink-0 cursor-pointer"
          >
            <span>Open Everest Gaming Room</span>
            <ExternalLink className="w-4 h-4 text-purple-900" />
          </button>
        </div>
      </div>
    </section>
  );
};
