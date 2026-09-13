import { Promotion } from "../types";

export const PROMOTIONS_DATA: Promotion[] = [
  {
    id: "welcome-bonus",
    tag: "Welcome Bonus",
    title: "50% Extra Credits",
    description: "Get 50% bonus credits on your first reload. Play longer, hit multipliers, win bigger.",
    ctaText: "Claim Now →",
    highlight: true,
  },
  {
    id: "daily-rewards",
    tag: "Daily Rewards",
    title: "Free Credits Daily",
    description: "Log in every day for free bonus credits. Stack rewards with your daily login streak.",
    ctaText: "Start Streak →",
  },
  {
    id: "vip-access",
    tag: "VIP Access",
    title: "Exclusive Games",
    description: "Unlock high-limit VIP platforms, personal 24/7 account manager, and rapid payouts.",
    ctaText: "Join VIP →",
  },
];
