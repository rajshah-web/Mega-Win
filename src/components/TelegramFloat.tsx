import React, { useState } from "react";
import { Send, MessageCircle, Sparkles, X } from "lucide-react";
import { CONFIG, handlePlayRedirect } from "../config";

export const TelegramFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Popover helper bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#17122b] border border-purple-700/60 text-slate-200 px-4 py-2.5 rounded-2xl shadow-2xl shadow-purple-950/80 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <div className="text-xs">
            <span className="font-bold text-white block">Everest Support Online</span>
            <span className="text-purple-300 text-[11px]">Chat on Telegram</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="ml-2 text-slate-400 hover:text-white p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => handlePlayRedirect("Floating Chat")}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-fuchsia-600 text-white shadow-xl shadow-purple-600/40 hover:shadow-purple-600/70 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border-2 border-white/20"
        aria-label="Open Telegram Channel"
      >
        <Send className="w-6 h-6 transform -translate-y-0.5 translate-x-0.5 group-hover:rotate-12 transition-transform duration-300" />

        {/* Pulse badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0b0a12]"></span>
        </span>
      </button>
    </div>
  );
};
