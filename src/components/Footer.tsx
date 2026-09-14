import React, { useState } from "react";
import { Sparkles, Shield, Send, HeartHandshake, AlertCircle } from "lucide-react";
import { CONFIG, handlePlayRedirect } from "../config";
import { EMBEDDED_GAME_LOGOS } from "../data/embeddedLogos";

interface ModalContent {
  title: string;
  content: React.ReactNode;
}

export const Footer: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openLegal = (title: string, content: React.ReactNode) => {
    setModalData({ title, content });
  };

  return (
    <>
      <footer className="bg-[#07060d] border-t border-purple-900/30 text-slate-400 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Top Footer: Brand, Statement, and Badges */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <img
                src={EMBEDDED_GAME_LOGOS["mega-win"] || CONFIG.LOGO_IMAGE_URL || "/games/mega-win.png"}
                alt="MegaWins Logo"
                className="w-8 h-8 object-contain rounded-lg shadow-sm"
              />
              <span className="font-display font-black text-xl text-white tracking-tight">
                Mega<span className="text-purple-400">Wins</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-amber-300">
                <Shield className="w-3.5 h-3.5" /> 18+ Age Restricted
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-emerald-400">
                <HeartHandshake className="w-3.5 h-3.5" /> Free to Play
              </span>
              <a
                href={CONFIG.TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/50 hover:bg-purple-900/60 text-purple-300 flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Everest Gaming Room
              </a>
            </div>
          </div>

          {/* Legal Navigation Links (Identical to video) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-400">
            <button
              onClick={() =>
                openLegal(
                  "Terms of Service",
                  <div>
                    <p className="mb-3">Welcome to MegaWins. By accessing our platform, you acknowledge and agree that MegaWins operates solely as a free-to-play social gaming and sweepstakes showcase.</p>
                    <p className="mb-3">1. Eligibility: You must be at least 18 years of age or the legal age of majority in your jurisdiction to participate.</p>
                    <p className="mb-3">2. Virtual Credits: All credits, sweeps, and coins are virtual tokens for entertainment purposes only and carry no direct cash value without compliance with official sweepstakes rules.</p>
                    <p>3. Everest Gaming Community: Account access, private tables, and reload assistance are facilitated through our verified Telegram channel.</p>
                  </div>
                )
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() =>
                openLegal(
                  "Privacy Policy",
                  <div>
                    <p className="mb-3">Your privacy is important to us. MegaWins does not sell, rent, or trade your personal information to third parties.</p>
                    <p className="mb-3">Data Protection: We maintain industry-standard physical, electronic, and procedural safeguards to protect confidentiality.</p>
                    <p>Contact the Everest gaming room administrators for any data management or removal requests.</p>
                  </div>
                )
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() =>
                openLegal(
                  "Refund Policy",
                  <div>
                    <p className="mb-3">All virtual entertainment package reloads are considered final once delivered to your platform player ID.</p>
                    <p>If you experience technical errors or coin loading delays, please contact our 24/7 Everest Support team immediately with your transaction reference.</p>
                  </div>
                )
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <button
              onClick={() =>
                openLegal(
                  "Responsible Gaming",
                  <div>
                    <p className="mb-3">MegaWins advocates responsible entertainment. Social gaming is meant to be fun, exciting, and recreational.</p>
                    <p className="mb-3">• Set personal time and credit limits.</p>
                    <p className="mb-3">• Never treat social gaming as an income source.</p>
                    <p>• If you or someone you know needs support, contact national helpline resources or request account self-exclusion through our Telegram staff.</p>
                  </div>
                )
              }
              className="hover:text-white transition-colors cursor-pointer"
            >
              Responsible Gaming
            </button>
            <button
              onClick={() => handlePlayRedirect("Footer Contact Us")}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              Contact Us
            </button>
          </div>

          {/* Sweepstakes Official Rules Bar (from video) */}
          <div className="text-center pt-2">
            <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold max-w-3xl mx-auto leading-relaxed">
              NO PURCHASE NECESSARY. AMOE AVAILABLE OR MAIL DETAILS. OFFICIAL RULES & FREE ENTRY. VOID WHERE PROHIBITED BY LAW.
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-xs text-slate-500">
              © 2026 MegaWins. All rights reserved. 18+ Only. Play Responsibly.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Dialog Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#141026] border border-purple-800/60 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
              <h3 className="font-display font-bold text-lg text-white">
                {modalData.title}
              </h3>
              <button
                onClick={() => setModalData(null)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded-lg text-sm bg-slate-900 border border-slate-800"
              >
                Close
              </button>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed max-h-96 overflow-y-auto pr-2">
              {modalData.content}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalData(null)}
                className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
