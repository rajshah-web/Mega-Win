import React from "react";
import { Sparkles, Gift, Flame, Crown, ArrowRight } from "lucide-react";
import { PROMOTIONS_DATA } from "../data/promotions";
import { handlePlayRedirect } from "../config";

export const PromotionsSection: React.FC = () => {
  return (
    <section id="promotions" className="py-20 bg-[#0c0a18] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-white">
            Promotions
          </h2>
          <p className="text-slate-400 text-base mt-1">
            Boost your play with daily bonuses, match multipliers, and exclusive rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Welcome Bonus */}
          <div className="relative rounded-2xl bg-[#141026] border border-purple-800/40 p-7 flex flex-col justify-between hover:border-purple-600 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-purple-950/50 group">
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold text-purple-300 bg-purple-950/80 border border-purple-700/50">
                Welcome Bonus
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-purple-300 transition-colors">
                50% Extra Credits
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Get 50% bonus credits on your first purchase. Play longer, hit big multipliers, and win bigger jackpots.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handlePlayRedirect("50% Extra Credits")}
                className="w-fit px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Claim Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Daily Rewards */}
          <div className="relative rounded-2xl bg-[#141026] border border-amber-500/30 p-7 flex flex-col justify-between hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-amber-950/40 group">
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-amber-950/70 border border-amber-600/50">
                Daily Rewards
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors">
                Free Credits Daily
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Log in every day for free bonus credits. Stack rewards with your daily streak and earn weekly treasure mystery boxes.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handlePlayRedirect("Free Credits Daily")}
                className="w-fit px-6 py-3 rounded-full text-sm font-bold text-amber-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Start Streak</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: VIP Access */}
          <div className="relative rounded-2xl bg-[#141026] border border-purple-800/40 p-7 flex flex-col justify-between hover:border-purple-600 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-purple-950/50 group">
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold text-purple-300 bg-purple-950/80 border border-purple-700/50">
                VIP Access
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-purple-300 transition-colors">
                Exclusive Games
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Unlock premium high-limit platforms, customized cashout speeds, and your dedicated 24/7 VIP concierge host.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => handlePlayRedirect("Join VIP")}
                className="w-fit px-6 py-3 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Join VIP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
