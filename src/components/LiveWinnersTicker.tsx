import React from "react";
import { Sparkles, Trophy } from "lucide-react";
import { WINNERS_DATA } from "../data/winners";

export const LiveWinnersTicker: React.FC = () => {
  // Duplicate array to achieve seamless infinite looping in CSS marquee
  const tickerItems = [...WINNERS_DATA, ...WINNERS_DATA];

  return (
    <div className="w-full bg-[#0d0a19] border-y border-purple-900/30 overflow-hidden py-3 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        {/* Static Left Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-[#17122b] border border-purple-800/50 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>LIVE Winners</span>
        </div>

        {/* Scrolling Ticker Line */}
        <div className="overflow-hidden relative flex-1 mask-linear">
          {/* Subtle gradient fades on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0d0a19] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0d0a19] to-transparent z-10 pointer-events-none" />

          <div className="animate-ticker flex items-center gap-6 whitespace-nowrap transform-gpu">
            {tickerItems.map((winner, idx) => (
              <div
                key={`${winner.id}-${idx}`}
                className="inline-flex items-center gap-2.5 bg-[#141026]/90 hover:bg-[#1b1535] transition-colors border border-purple-900/20 px-3.5 py-1 rounded-lg text-xs font-medium cursor-default"
              >
                <span className="font-display font-black text-amber-400 text-sm">
                  ${winner.amount.toLocaleString()}
                </span>
                <span className="text-slate-300 font-semibold">{winner.username}</span>
                <span className="text-purple-400/70 text-[11px] bg-purple-950/60 px-1.5 py-0.5 rounded">
                  {winner.game}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
