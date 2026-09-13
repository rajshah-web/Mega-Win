import React from "react";
import { ShieldCheck, Zap, Headphones, Coins, Crown, Sparkles, ArrowRight } from "lucide-react";
import { handlePlayRedirect } from "../config";

export const VipSection: React.FC = () => {
  const perks = [
    {
      icon: Zap,
      title: "Instant Reloads",
      desc: "Instant coin additions and fast withdrawals via direct Telegram agent support.",
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/40",
    },
    {
      icon: ShieldCheck,
      title: "100% Certified RNG",
      desc: "All 15 platforms tested and certified for authentic fair gaming algorithms.",
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-800/40",
    },
    {
      icon: Headphones,
      title: "24/7 Telegram Host",
      desc: "Real human customer representatives available around the clock to assist you.",
      color: "text-purple-400",
      bg: "bg-purple-950/40 border-purple-800/40",
    },
    {
      icon: Coins,
      title: "High Roller Jackpots",
      desc: "Access VIP-only tables with progressive pooled prizes reaching six figures.",
      color: "text-cyan-400",
      bg: "bg-cyan-950/40 border-cyan-800/40",
    },
  ];

  return (
    <section id="vip" className="py-20 bg-[#090812] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-700/40 text-purple-300 text-xs font-semibold">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>VIP Excellence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
            Built for Serious Players
          </h2>
          <p className="text-slate-400 text-base">
            Enjoy premium benefits, priority redemptions, and dedicated support directly in our private Everest gaming room.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#130f24] border border-purple-900/30 hover:border-purple-600/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${perk.bg}`}>
                  <Icon className={`w-6 h-6 ${perk.color}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{perk.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{perk.desc}</p>
              </div>
            );
          })}
        </div>

        {/* VIP Banner CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 via-[#1e153d] to-purple-900/40 border border-purple-700/50 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-40 h-40 bg-fuchsia-500/10 blur-3xl pointer-events-none" />
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
            Ready to experience MegaWins?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of active players enjoying Fire Kirin, Orion Stars, Milky Way and 12+ other platforms today.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handlePlayRedirect("VIP Banner CTA")}
              className="px-8 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:shadow-xl hover:shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Connect On Telegram</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
