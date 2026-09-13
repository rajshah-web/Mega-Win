export type GameCategory = "all" | "fish" | "slots" | "keno" | "cards" | "jackpot";

export interface Game {
  id: string;
  title: string;
  category: GameCategory[];
  badge?: "HOT" | "NEW" | "JACKPOT" | "POPULAR" | "TOP" | "EXCLUSIVE";
  badgeColor?: string;
  playersCount: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  imageUrl?: string;
  fallbackUrl?: string;
  iconType:
    | "dragon"
    | "star"
    | "galaxy"
    | "maya"
    | "panda"
    | "cyber"
    | "slots"
    | "vault"
    | "cash"
    | "cards"
    | "flame"
    | "lightning";
}

export interface Winner {
  id: string;
  username: string;
  amount: number;
  game: string;
  timeAgo: string;
}

export interface Promotion {
  id: string;
  tag: string;
  title: string;
  description: string;
  ctaText: string;
  highlight?: boolean;
}
