import React from "react";
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0a12] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
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
        <GameCatalog />

        {/* Promotions (Welcome Bonus, Daily Rewards, VIP Access) */}
        <PromotionsSection />

        {/* VIP Lounge & Security Highlights */}
        <VipSection />
      </main>

      {/* Official Footer with Sweepstakes Disclaimers */}
      <Footer />

      {/* Floating 24/7 Telegram Support Widget */}
      <TelegramFloat />

      {/* Interactive Casino Win Celebration & Sound Alert Overlay */}
      <CasinoWinCelebration />

      {/* Explosive Gold Coin Shower Burst Effect */}
      <CoinShower />
    </div>
  );
}
