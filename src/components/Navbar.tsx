import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Send, ShieldCheck, Flame, Volume2, VolumeX } from "lucide-react";
import { CONFIG, handlePlayRedirect } from "../config";
import { casinoAudio } from "../utils/casinoAudio";
import { useGameImage } from "../services/imageStore";
import { EMBEDDED_GAME_LOGOS } from "../data/embeddedLogos";

interface NavbarProps {
  onOpenSupport?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const logoSrc = useGameImage("mega-win", CONFIG.LOGO_IMAGE_URL || "/games/mega-win.png");
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setIsMuted(casinoAudio.getMuted());
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = casinoAudio.toggleMute();
    setIsMuted(muted);
  };

  const testWinSound = () => {
    casinoAudio.playCasinoWinningSound();
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0c0a17]/90 backdrop-blur-md border-b border-purple-900/30 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <img
            src={(!logoError && logoSrc) || EMBEDDED_GAME_LOGOS["mega-win"] || CONFIG.LOGO_IMAGE_URL || "/games/mega-win.png"}
            alt="MegaWins Logo"
            onError={() => {
              if (!logoError && EMBEDDED_GAME_LOGOS["mega-win"]) {
                setLogoError(true);
              }
            }}
            className="w-10 h-10 object-contain rounded-xl shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
              Mega<span className="text-purple-400">Wins</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-amber-400/90 font-semibold -mt-1 flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 inline text-amber-400" /> Social Casino
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection("games")}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Games
          </button>
          <button
            onClick={() => scrollToSection("promotions")}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Promotions
          </button>
          <button
            onClick={() => scrollToSection("vip")}
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            VIP
          </button>
          <a
            href={CONFIG.TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition-colors flex items-center gap-1.5 py-1 text-slate-300 hover:text-white"
          >
            <Send className="w-3.5 h-3.5 text-purple-400" />
            Support
          </a>
        </nav>

        {/* Action Buttons & Casino Sound Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Casino Sound Toggle Button */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Sound is Muted (Click to Unmute)" : "Sound is Active (Click to Mute)"}
            className={`p-2.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              isMuted
                ? "bg-slate-900/60 text-slate-400 border-slate-700/60 hover:text-white"
                : "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:bg-amber-500/25"
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            )}
            <span className="hidden lg:inline">{isMuted ? "Muted" : "Sound"}</span>
          </button>

          {/* Test Win Sound Quick Trigger */}
          <button
            onClick={testWinSound}
            title="Play Win Sound"
            className="px-3 py-2 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 rounded-full transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Win Sound</span>
          </button>

          <button
            onClick={() => handlePlayRedirect("Sign In")}
            className="px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 rounded-full transition-all duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => handlePlayRedirect("Join Now")}
            className="relative group px-6 py-2.5 text-sm font-bold text-white rounded-full overflow-hidden shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join Now
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0a18] border-b border-purple-900/40 px-5 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-slate-200">
            <button
              onClick={() => scrollToSection("games")}
              className="text-left py-2 hover:text-purple-400 transition-colors border-b border-slate-800/60"
            >
              Games Catalog
            </button>
            <button
              onClick={() => scrollToSection("promotions")}
              className="text-left py-2 hover:text-purple-400 transition-colors border-b border-slate-800/60"
            >
              Promotions & Bonuses
            </button>
            <button
              onClick={() => scrollToSection("vip")}
              className="text-left py-2 hover:text-purple-400 transition-colors border-b border-slate-800/60"
            >
              VIP Lounge
            </button>
            <a
              href={CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2 text-purple-400 hover:text-purple-300 border-b border-slate-800/60"
            >
              <span>Telegram Support</span>
              <Send className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-800/60 text-xs">
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 text-slate-300 hover:text-white"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
              <span>Sound: {isMuted ? "Muted" : "Active"}</span>
            </button>
            <button
              onClick={testWinSound}
              className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Test Win</span>
            </button>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <button
              onClick={() => handlePlayRedirect("Sign In")}
              className="w-full py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
            >
              Sign In
            </button>
            <button
              onClick={() => handlePlayRedirect("Join Now")}
              className="w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md shadow-purple-600/30 flex items-center justify-center gap-1.5"
            >
              <span>Join Now</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
