import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LiveWinnersTicker } from "./components/LiveWinnersTicker";
import { GameCatalog } from "./components/GameCatalog";
import { PromotionsSection } from "./components/PromotionsSection";
import { VipSection } from "./components/VipSection";
import { Footer } from "./components/Footer";
import { TelegramFloat } from "./components/TelegramFloat";
import { CasinoWinCelebration } from "./components/CasinoWinCelebration";
import { FloatingCoinsBackground } from "./components/FloatingCoinsBackground";
import { CoinShower } from "./components/CoinShower";
import { ImageUploaderModal } from "./components/ImageUploaderModal";
import { GlobalDropZone } from "./components/GlobalDropZone";
import { Image as ImageIcon } from "lucide-react";

export default function App() {
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0a12] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      {/* Global Drag & Drop Listener for Instant Game Artwork Updates */}
      <GlobalDropZone onImagesUploaded={() => {}} />

      {/* Ambient Floating 3D Gold Coins Background */}
      <FloatingCoinsBackground />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Live Jackpot & Game Showcase */}
        <Hero />

        {/* Live Winners Continuous Marquee Ticker */}
        <LiveWinnersTicker />

        {/* All Platforms & Game Catalog with Filter Tabs */}
        <GameCatalog onOpenImageUploader={() => setIsImageUploaderOpen(true)} />

        {/* Promotions (Welcome Bonus, Daily Rewards, VIP Access) */}
        <PromotionsSection />

        {/* VIP Lounge & Security Highlights */}
        <VipSection />
      </main>

      {/* Official Footer with Sweepstakes Disclaimers */}
      <Footer />

      {/* Floating 24/7 Telegram Support Widget */}
      <TelegramFloat />

      {/* Floating Artwork Manager Quick Access Button */}
      <button
        onClick={() => setIsImageUploaderOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 shadow-xl shadow-black/60 flex items-center gap-2 text-xs font-bold transition active:scale-95 group cursor-pointer backdrop-blur-md"
        title="Upload or sync the 16 game artwork images"
      >
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950">
          <ImageIcon className="w-3 h-3" />
        </div>
        <span>Game Artwork (16)</span>
      </button>

      {/* Artwork Manager Modal */}
      <ImageUploaderModal
        isOpen={isImageUploaderOpen}
        onClose={() => setIsImageUploaderOpen(false)}
      />

      {/* Interactive Casino Win Celebration & Sound Alert Overlay */}
      <CasinoWinCelebration />

      {/* Explosive Gold Coin Shower Burst Effect */}
      <CoinShower />
    </div>
  );
}
